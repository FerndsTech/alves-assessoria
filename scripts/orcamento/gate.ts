import { appendFile, readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { medir, type ArquivoDoDist, type MedicaoDeLinha } from "./medir.ts";

/**
 * **O gate de bytes.** Mede o `dist/` construído contra a tabela do orçamento e
 * **reprova o merge** ao estourar qualquer linha (ADR-0002, decisão 5; ADR-0003,
 * decisão 4).
 *
 * Ele bloqueia porque é **determinístico**: mesmo commit, mesmo número, sempre.
 * É o mesmo critério que manda o Lighthouse para o lado informativo — lá o
 * runner compartilhado põe ruído no meio, e gate que falha por ruído é gate que
 * a equipe aprende a ignorar.
 *
 * O relatório imprime **o número medido de cada linha**, e não só passa/falha. É
 * o que faz a regressão ser legível: um PR que sobe o CSS de 4 KB para 60 KB
 * passa no gate, e tem de dar para ver isso sem rodar nada à mão.
 */

const RAIZ = fileURLToPath(new URL("../..", import.meta.url));
const DIST = `${RAIZ}dist`;

async function lerDist(diretorio: string, prefixo = ""): Promise<ArquivoDoDist[]> {
  const entradas = await readdir(diretorio, { withFileTypes: true });
  const arquivos: ArquivoDoDist[] = [];
  for (const entrada of entradas) {
    const caminho = `${prefixo}${entrada.name}`;
    if (entrada.isDirectory()) {
      arquivos.push(...(await lerDist(`${diretorio}/${entrada.name}`, `${caminho}/`)));
    } else {
      arquivos.push({ caminho, conteudo: await readFile(`${diretorio}/${entrada.name}`) });
    }
  }
  return arquivos;
}

function humano(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

/** Quanto da linha já foi gasto — é o número que denuncia a regressão antes de ela reprovar. */
function ocupacao({ medido, teto }: MedicaoDeLinha): string {
  return `${Math.round((medido / teto) * 100)}%`;
}

function rotuloCompleto(medicao: MedicaoDeLinha): string {
  return medicao.responsavel === null
    ? medicao.rotulo
    : `${medicao.rotulo} (${medicao.responsavel})`;
}

const arquivos = await lerDist(DIST).catch(() => {
  throw new Error(`Não há ${DIST} para medir. Rode \`npm run build\` antes do gate.`);
});
const medicoes = medir(arquivos);
const estouradas = medicoes.filter((medicao) => medicao.estourou);

const largura = Math.max(...medicoes.map((medicao) => rotuloCompleto(medicao).length));
console.log("\nOrçamento de bytes — transferidos, comprimidos (ADR-0003)\n");
for (const medicao of medicoes) {
  console.log(
    [
      medicao.estourou ? "✗" : "✓",
      rotuloCompleto(medicao).padEnd(largura),
      humano(medicao.medido).padStart(9),
      "/",
      humano(medicao.teto).padStart(9),
      ocupacao(medicao).padStart(5),
    ].join("  "),
  );
}

const resumo = process.env.GITHUB_STEP_SUMMARY;
if (resumo !== undefined) {
  await appendFile(
    resumo,
    [
      "## Orçamento de bytes",
      "",
      "Transferidos e comprimidos, contra a tabela do ADR-0003. Uma variante por",
      "conjunto responsivo — é o que a visita de fato baixa.",
      "",
      "| | Linha | Medido | Teto | Ocupação |",
      "| --- | --- | ---: | ---: | ---: |",
      ...medicoes.map((medicao) =>
        [
          "",
          medicao.estourou ? "✗" : "✓",
          rotuloCompleto(medicao),
          humano(medicao.medido),
          humano(medicao.teto),
          ocupacao(medicao),
          "",
        ].join(" | "),
      ),
      "",
    ].join("\n"),
  );
}

if (estouradas.length > 0) {
  console.error(
    `\n${estouradas.length} linha(s) do orçamento estouraram: ` +
      `${estouradas.map((medicao) => medicao.rotulo).join(", ")}.\n` +
      `A conversa aqui é sobre qual linha cede — não sobre suspender o orçamento ` +
      `(ADR-0002, "revisitar quando").`,
  );
  process.exit(1);
}
