import { createRequire } from "node:module";
import type { Page } from "@playwright/test";
import type { Estado } from "./estados";
import { EXCECOES_INCOMPLETE, type ExcecaoIncomplete } from "./excecoes-incomplete";

const exigir = createRequire(import.meta.url);
const CAMINHO_DO_AXE = exigir.resolve("axe-core/axe.min.js");

/**
 * O recorte que bloqueia o merge: tags WCAG de nível A e AA (ADR-0004, decisão 3).
 *
 * Recorta-se por **tag e não por severidade**. A severidade do axe não é a mesma
 * coisa que nível WCAG, e há falha de conformidade AA classificada abaixo de
 * `serious` — filtrar por `serious`/`critical` pareceria mais tolerante e seria
 * pior, porque deixaria passar falha AA real.
 */
export const TAGS_WCAG_A_AA = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
] as const;

/**
 * `best-practice` fica fora por padrão. Estas são as regras que o projeto opta
 * por incluir, nomeadas uma a uma.
 *
 * `tagEsperada` não é decoração: ela é conferida contra a tabela de regras do
 * `axe-core` na montagem do harness. A fronteira entre `wcag2aa` e
 * `best-practice` no axe não bate um-a-um com a intuição, e chutar aqui
 * produziria um gate que não cobre o que se pensa que cobre.
 */
export const REGRAS_OPT_IN = [
  {
    id: "heading-order",
    tagEsperada: "best-practice",
    porque:
      "Ordem de cabeçalhos é como o leitor de tela navega uma página longa, e o site inteiro é um one-pager de sete seções.",
  },
  {
    id: "aria-dialog-name",
    tagEsperada: "best-practice",
    porque:
      "O painel do advogado é o único diálogo do site; sem nome acessível ele abre como uma região anônima.",
  },
] as const;

type RegraDaTabela = { ruleId: string; tags: string[] };

type NoDoAxe = { target: string[] };
type ResultadoDoAxe = {
  id: string;
  impact: string | null;
  help: string;
  helpUrl: string;
  nodes: NoDoAxe[];
};
type RetornoDoAxe = {
  violations: ResultadoDoAxe[];
  incomplete: ResultadoDoAxe[];
};

declare global {
  interface Window {
    axe: {
      getRules(): RegraDaTabela[];
      run(contexto: unknown, opcoes: unknown): Promise<RetornoDoAxe>;
    };
  }
}

/**
 * Injeta o axe na sessão de navegador que a costura já abriu — não se abre uma
 * segunda costura para acessibilidade (ADR-0004, decisão 2).
 */
async function injetarAxe(pagina: Page): Promise<void> {
  const jaEsta = await pagina.evaluate(() => typeof window.axe !== "undefined");
  if (!jaEsta) await pagina.addScriptTag({ path: CAMINHO_DO_AXE });
}

/**
 * Monta o conjunto de regras a partir da **tabela de regras do próprio axe**, e
 * não de uma lista escrita à mão que envelheceria em silêncio.
 *
 * Devolve os ids das regras que carregam alguma tag WCAG A/AA, mais os opt-in
 * nomeados — depois de conferir que cada opt-in existe e ainda carrega a tag que
 * registramos para ele.
 */
export async function montarConjuntoDeRegras(pagina: Page): Promise<string[]> {
  await injetarAxe(pagina);
  const tabela = await pagina.evaluate(() => window.axe.getRules());
  const porId = new Map(tabela.map((regra) => [regra.ruleId, regra]));

  for (const optIn of REGRAS_OPT_IN) {
    const regra = porId.get(optIn.id);
    if (!regra) {
      throw new Error(
        `Regra de opt-in "${optIn.id}" não existe na tabela de regras do axe-core ` +
          `(${tabela.length} regras conferidas). Ou o id está errado, ou a regra saiu numa ` +
          `atualização — decida qual antes de seguir.`,
      );
    }
    if (!regra.tags.includes(optIn.tagEsperada)) {
      throw new Error(
        `Regra de opt-in "${optIn.id}" não carrega mais a tag "${optIn.tagEsperada}" ` +
          `(tags atuais: ${regra.tags.join(", ")}). Se ela virou WCAG, o opt-in ficou ` +
          `redundante; se mudou de faixa, a escolha precisa ser retomada.`,
      );
    }
  }

  /*
   * As tags do recorte também se conferem contra a tabela, e não só os opt-in.
   * Uma tag escrita errada — `wcag22aaa`, `wcag21AA` — não é erro em lugar
   * nenhum: ela apenas casa com zero regra. O conjunto encolheria em silêncio,
   * a suíte seguiria verde, e o gate passaria a não cobrir o que se pensa que
   * cobre. É o modo de falha exato que o ticket nomeia ao exigir que os ids e
   * as tags sejam conferidos, "não deduzidos por intuição".
   */
  for (const tag of TAGS_WCAG_A_AA) {
    const quantas = tabela.filter((regra) => regra.tags.includes(tag)).length;
    if (quantas === 0) {
      throw new Error(
        `A tag "${tag}" do recorte WCAG A/AA não casa com nenhuma das ${tabela.length} ` +
          `regras da tabela do axe-core. Ou ela está escrita errada, ou o axe a renomeou — ` +
          `nos dois casos o gate está recortando menos do que se pensa.`,
      );
    }
  }

  const porTagWcag = tabela
    .filter((regra) =>
      regra.tags.some((tag) => (TAGS_WCAG_A_AA as readonly string[]).includes(tag)),
    )
    .map((regra) => regra.ruleId);

  return [...new Set([...porTagWcag, ...REGRAS_OPT_IN.map((r) => r.id)])];
}

function formatar(titulo: string, resultados: ResultadoDoAxe[]): string {
  const corpo = resultados
    .map((r) => {
      const alvos = r.nodes.map((no) => `      ${no.target.join(" ")}`).join("\n");
      return `  - ${r.id} (${r.impact ?? "sem impacto declarado"}) - ${r.help}\n${alvos}\n      ${r.helpUrl}`;
    })
    .join("\n");
  return `${titulo}\n${corpo}`;
}

/**
 * Para cada nó `incomplete`, decide se ele está coberto por uma exceção escrita.
 * A cobertura é por **escopo no DOM**, não por igualdade de seletor: o seletor
 * que o axe devolve muda quando o CSS muda, e a exceção não deveria.
 */
async function separarIncompletePorExcecao(
  pagina: Page,
  incomplete: ResultadoDoAxe[],
  estado: Estado,
): Promise<{ descobertos: ResultadoDoAxe[]; excecoesUsadas: Set<ExcecaoIncomplete> }> {
  const aplicaveis = EXCECOES_INCOMPLETE.filter(
    (e) => e.estados === "todos" || e.estados.includes(estado),
  );
  const excecoesUsadas = new Set<ExcecaoIncomplete>();
  const descobertos: ResultadoDoAxe[] = [];

  for (const resultado of incomplete) {
    const candidatas = aplicaveis.filter((e) => e.regra === resultado.id);
    const naoCobertos: NoDoAxe[] = [];

    for (const no of resultado.nodes) {
      const indiceCoberto =
        candidatas.length === 0
          ? -1
          : await pagina.evaluate(
              ({ seletorDoNo, escopos }) => {
                const elemento = document.querySelector(seletorDoNo);
                if (!elemento) return -1;
                return escopos.findIndex((escopo) => elemento.closest(escopo) !== null);
              },
              { seletorDoNo: no.target.join(" "), escopos: candidatas.map((e) => e.escopo) },
            );

      if (indiceCoberto >= 0) excecoesUsadas.add(candidatas[indiceCoberto]!);
      else naoCobertos.push(no);
    }

    if (naoCobertos.length > 0) descobertos.push({ ...resultado, nodes: naoCobertos });
  }

  return { descobertos, excecoesUsadas };
}

/**
 * Roda o gate de acessibilidade sobre um estado do site e **lança** se ele
 * reprovar. Qualquer `violation` reprova; `incomplete` também reprova, salvo o
 * que estiver na lista de exceções justificadas (ADR-0004, decisão 4).
 */
export async function conferirAcessibilidade(pagina: Page, estado: Estado): Promise<void> {
  const regras = await montarConjuntoDeRegras(pagina);

  const resultado = await pagina.evaluate(
    async (ids) =>
      await window.axe.run(document, {
        runOnly: { type: "rule", values: ids },
        resultTypes: ["violations", "incomplete"],
      }),
    regras,
  );

  const { descobertos, excecoesUsadas } = await separarIncompletePorExcecao(
    pagina,
    resultado.incomplete,
    estado,
  );

  const problemas: string[] = [];
  if (resultado.violations.length > 0) {
    problemas.push(
      formatar(
        `${resultado.violations.length} violacao(oes) de WCAG A/AA em "${estado}":`,
        resultado.violations,
      ),
    );
  }
  if (descobertos.length > 0) {
    problemas.push(
      formatar(
        `${descobertos.length} resultado(s) "incomplete" sem excecao escrita em "${estado}". ` +
          `O axe rodou a regra e nao conseguiu julgar. Confira o par a mao e registre a ` +
          `justificativa em tests/harness/excecoes-incomplete.ts, ou corrija o desenho:`,
        descobertos,
      ),
    );
  }

  if (problemas.length > 0) throw new Error(problemas.join("\n\n"));

  // Exceção que não foi usada é dívida quitada — ou desenho que mudou sem que
  // ninguém apagasse a linha. Informa, não reprova: a lista é para tornar
  // visível o que a máquina não julgou, e uma linha a mais nunca esconde nada.
  const naoUsadas = EXCECOES_INCOMPLETE.filter(
    (e) => (e.estados === "todos" || e.estados.includes(estado)) && !excecoesUsadas.has(e),
  );
  for (const excecao of naoUsadas) {
    console.warn(
      `[a11y] excecao nao usada em "${estado}": ${excecao.regra} @ ${excecao.escopo}. ` +
        `Se o axe passou a julgar esse par, a linha pode sair da lista.`,
    );
  }
}
