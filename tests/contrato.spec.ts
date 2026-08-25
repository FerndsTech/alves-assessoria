import { expect, test } from "@playwright/test";
import { createReference } from "astro/content/runtime";
import { z } from "astro/zod";
import { esquemaDeAdvogado, esquemaDeUnidade } from "../src/lib/esquemas.ts";

/**
 * **O contrato das duas content collections, e só ele.**
 *
 * Isto não é uma segunda costura sobre o site — nada aqui abre navegador nem
 * afirma comportamento de página, exatamente como `orcamento.spec.ts` não o faz.
 * O que se testa é o portão: **o build quebra** com campo obrigatório faltando,
 * descrição fora de 140–180 ou WhatsApp fora de E.164 sem formatação.
 *
 * Por que vale a pena afirmar isto: as restrições do schema não são preferência
 * de estilo — são vedação normativa (o teto de 3 áreas, a ausência de medida) e
 * são a diferença entre "trocar um advogado é trocar string" e "trocar um
 * advogado é refatoração". Um `.min(140)` apagado por acidente não reprova nada
 * e não aparece em revisão nenhuma; some, e um dia a ficha de alguém tem duas
 * linhas enquanto a do lado tem oito.
 *
 * `z` e `reference` são os **mesmos módulos** que o build usa: `astro:content`
 * reexporta `z` de `astro/zod`, e `reference` é o `createReference()` daqui. Não
 * há uma segunda cópia do contrato nem uma segunda cópia do zod.
 */

const unidade = createReference()("unidades");
const advogado = esquemaDeAdvogado(unidade);

/** `image()` só existe dentro do build; para o contrato basta a forma. */
const imagem = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
});
const unidadeCompleta = esquemaDeUnidade(imagem);

/** 145 caracteres — dentro de 140–180, em construção nominal. */
const DESCRICAO =
  "Graduação em Direito pela Universidade Federal do Ceará. " +
  "Pós-graduação em Direito Bancário. Atuação em revisão de contrato de crédito consignado.";

function advogadoValido(): Record<string, unknown> {
  return {
    nome: "Ana Beatriz Vasconcelos",
    oab: { numero: "000.000", uf: "CE" },
    descricao: DESCRICAO,
    areas: ["Direito bancário", "Crédito consignado"],
    foto: "retrato-ana-beatriz-vasconcelos.jpg",
    whatsapp: "5588999900001",
    atuacoes: [{ unidade: "acopiara", dias: ["segunda", "terca"] }],
    ordem: 1,
  };
}

function unidadeValida(): Record<string, unknown> {
  return {
    cidade: "Acopiara",
    uf: "CE",
    logradouro: "Rua Coronel José Alves, 210",
    geo: { lat: -6.0958, lon: -39.4522 },
    ordem: 1,
  };
}

/** Uma descrição com exatamente `n` caracteres, para exercitar as duas bordas. */
function descricaoDe(n: number): string {
  return DESCRICAO.padEnd(n, ".").slice(0, n);
}

test.describe("o contrato do advogado", () => {
  test("a ficha fictícia de referência passa", () => {
    expect(advogado.safeParse(advogadoValido()).success).toBe(true);
  });

  test("campo obrigatório faltando quebra o build", () => {
    for (const campo of ["nome", "oab", "descricao", "areas", "foto", "whatsapp", "atuacoes", "ordem"]) {
      const sem = advogadoValido();
      delete sem[campo];
      expect(advogado.safeParse(sem).success, `sem \`${campo}\` deveria reprovar`).toBe(false);
    }
  });

  test("descrição fora de 140–180 quebra o build, e as duas bordas passam", () => {
    // As bordas exatas, e não "um texto curto" e "um texto longo": é aqui que
    // um `.min(139)` digitado errado passaria despercebido para sempre.
    expect(descricaoDe(139).length).toBe(139);
    expect(advogado.safeParse({ ...advogadoValido(), descricao: descricaoDe(139) }).success).toBe(
      false,
    );
    expect(advogado.safeParse({ ...advogadoValido(), descricao: descricaoDe(140) }).success).toBe(
      true,
    );
    expect(advogado.safeParse({ ...advogadoValido(), descricao: descricaoDe(180) }).success).toBe(
      true,
    );
    expect(advogado.safeParse({ ...advogadoValido(), descricao: descricaoDe(181) }).success).toBe(
      false,
    );
  });

  test("WhatsApp fora de E.164 sem formatação quebra o build", () => {
    // A formatação bonita é o modo de falha real: ela é o que uma pessoa digita
    // ao copiar o número de uma agenda, e o `wa.me` abre em branco sem avisar.
    for (const errado of [
      "+55 (88) 99990-0001",
      "5588999900001 ",
      "88999900001",
      "+5588999900001",
      "5588999900",
      "55889999000012",
    ]) {
      expect(
        advogado.safeParse({ ...advogadoValido(), whatsapp: errado }).success,
        `"${errado}" deveria reprovar`,
      ).toBe(false);
    }
    expect(advogado.safeParse({ ...advogadoValido(), whatsapp: "5588999900001" }).success).toBe(
      true,
    );
    // Dez ou onze dígitos depois do 55: fixo antigo e celular com o nono dígito.
    expect(advogado.safeParse({ ...advogadoValido(), whatsapp: "558833330001" }).success).toBe(true);
  });

  test("o teto de três áreas é do contrato, não do CSS", () => {
    // Barra e medidor caem na lista taxativa do CED art. 44, §1º, e um card com
    // oito áreas é o primeiro passo para alguém querer medi-las.
    expect(advogado.safeParse({ ...advogadoValido(), areas: [] }).success).toBe(false);
    expect(advogado.safeParse({ ...advogadoValido(), areas: ["a", "b", "c"] }).success).toBe(true);
    expect(advogado.safeParse({ ...advogadoValido(), areas: ["a", "b", "c", "d"] }).success).toBe(
      false,
    );
  });

  test("não existe `skills` nem `habilidades`: o contrato não os carrega", () => {
    const comMedida = {
      ...advogadoValido(),
      skills: [{ nome: "Direito bancário", nivel: 90 }],
      habilidades: ["Direito bancário"],
    };
    const saida = advogado.parse(comMedida);
    expect(Object.keys(saida)).not.toContain("skills");
    expect(Object.keys(saida)).not.toContain("habilidades");
  });

  test("`atuacoes[].unidade` é referência, e nunca texto", () => {
    // O que sai do parse não é a string que entrou: é um ponteiro para a outra
    // collection. É isso que impede o endereço de ser copiado em seis arquivos.
    const saida = advogado.parse(advogadoValido());
    expect(saida.atuacoes[0]?.unidade).toEqual({ collection: "unidades", id: "acopiara" });
  });

  test("`dias` é enum fechado: sábado não existe no horário publicado", () => {
    const comSabado = {
      ...advogadoValido(),
      atuacoes: [{ unidade: "acopiara", dias: ["sabado"] }],
    };
    expect(advogado.safeParse(comSabado).success).toBe(false);

    const semDia = { ...advogadoValido(), atuacoes: [{ unidade: "acopiara", dias: [] }] };
    expect(advogado.safeParse(semDia).success).toBe(false);
  });

  test("a seccional é uma só, e `ordem` é inteiro positivo", () => {
    expect(
      advogado.safeParse({ ...advogadoValido(), oab: { numero: "000.000", uf: "SP" } }).success,
    ).toBe(false);
    expect(advogado.safeParse({ ...advogadoValido(), ordem: 0 }).success).toBe(false);
    expect(advogado.safeParse({ ...advogadoValido(), ordem: 1.5 }).success).toBe(false);
  });

  test("só perfil profissional entra em `redes`", () => {
    const pessoal = {
      ...advogadoValido(),
      redes: [{ rede: "tiktok", url: "https://exemplo.com/x" }],
    };
    expect(advogado.safeParse(pessoal).success).toBe(false);

    const semUrl = {
      ...advogadoValido(),
      redes: [{ rede: "linkedin", url: "nao-e-url" }],
    };
    expect(advogado.safeParse(semUrl).success).toBe(false);
  });
});

test.describe("o contrato da unidade", () => {
  test("a unidade fictícia de referência passa, e `bairro` é mesmo opcional", () => {
    // Fortim não tem bairro. Campo obrigatório aqui obrigaria a inventar um.
    expect(unidadeCompleta.safeParse(unidadeValida()).success).toBe(true);
    expect(unidadeCompleta.safeParse({ ...unidadeValida(), bairro: "Centro" }).success).toBe(true);
  });

  test("`geo` é obrigatório: é ele que impede mapa e rota de discordarem", () => {
    const sem = unidadeValida();
    delete sem.geo;
    expect(unidadeCompleta.safeParse(sem).success).toBe(false);
    expect(unidadeCompleta.safeParse({ ...unidadeValida(), geo: { lat: -6.09 } }).success).toBe(
      false,
    );
  });

  test("`horario` e `telefone` não existem na unidade, e a ausência é decisão", () => {
    // Duplicação convida divergência: quatro horários por unidade que discordam
    // do horário publicado no bloco de CTA, e nenhuma forma de saber qual vale.
    const saida = unidadeCompleta.parse({
      ...unidadeValida(),
      horario: "08h às 16h",
      telefone: "558833330001",
    });
    expect(Object.keys(saida)).not.toContain("horario");
    expect(Object.keys(saida)).not.toContain("telefone");
  });
});
