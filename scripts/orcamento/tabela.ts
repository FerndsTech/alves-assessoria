/**
 * **A tabela do orçamento, e o único lugar onde ela vive.**
 *
 * Os números são os do [ADR-0003](../../docs/adr/0003-orcamento-folgado-para-profundidade.md),
 * que emendou as decisões 2 e 3 do ADR-0002. Aquele ADR é o **registro da
 * decisão** que os fixou; este arquivo é a cópia que a máquina lê. Não há uma
 * terceira: nem o README nem o CI repetem número nenhum daqui, porque tabela
 * copiada é tabela que diverge — e a que diverge em silêncio é sempre a que
 * bloqueia o merge.
 *
 * Mudar um teto é mudar aqui **e** emendar o ADR. Se um dia isso doer, é o
 * sintoma pretendido: subir o teto tem de ser uma decisão visível.
 */

const KB = 1024;
const MB = 1024 * KB;

/**
 * As linhas do orçamento. O `id` é o que o relatório imprime e o que o teste
 * nomeia; o `rotulo` é a linha da tabela do ADR, palavra por palavra.
 */
export const ORCAMENTO = [
  { id: "html", rotulo: "HTML", teto: 40 * KB, criterio: "soma" },
  { id: "css", rotulo: "CSS", teto: 80 * KB, criterio: "soma" },
  { id: "fontes", rotulo: "Fontes", teto: 150 * KB, criterio: "soma" },
  { id: "preload-de-fonte", rotulo: "Fontes no preload", teto: 40 * KB, criterio: "soma" },
  { id: "js", rotulo: "JS — o site inteiro", teto: 100 * KB, criterio: "soma" },
  { id: "imagem-do-lcp", rotulo: "Imagem do LCP", teto: 400 * KB, criterio: "soma" },
  { id: "foto-de-advogado", rotulo: "Cada foto de advogado", teto: 120 * KB, criterio: "cada" },
  { id: "total", rotulo: "Total, primeira visita", teto: 3 * MB, criterio: "soma" },
] as const satisfies readonly { id: string; rotulo: string; teto: number; criterio: Criterio }[];

/**
 * `soma` cobra o conjunto inteiro contra o teto; `cada` cobra o **maior arquivo
 * isolado**. A tabela do ADR tem uma linha de cada tipo escrita em português —
 * *"JS, o site inteiro"* contra *"cada foto de advogado"* — e confundir as duas
 * é o erro que faz seis fotos de 70 KB reprovarem um teto de 120 KB por arquivo.
 */
export type Criterio = "soma" | "cada";

export type Linha = (typeof ORCAMENTO)[number]["id"];

/**
 * Os limiares que o Lighthouse **reporta sem nunca reprovar** (ADR-0003,
 * decisão 2; ADR-0002, decisão 5).
 *
 * Ficam nesta tabela e não junto do script do Lighthouse pelo mesmo motivo dos
 * tetos de bytes: são números de ADR, e ADR não se lê em dois lugares.
 *
 * **INP não está aqui, e a ausência é decisão.** É métrica exclusivamente de
 * campo, e o CrUX nunca terá amostra de um one-pager de escritório em quatro
 * cidades do interior do Ceará. O TBT entra como o proxy de laboratório dele.
 */
export const LIMIARES_DE_CWV = [
  { id: "lcp", rotulo: "LCP", sentido: "teto", limiar: 3.5, unidade: " s", casas: 2 },
  { id: "cls", rotulo: "CLS", sentido: "teto", limiar: 0.1, unidade: "", casas: 3 },
  { id: "tbt", rotulo: "TBT", sentido: "teto", limiar: 400, unidade: " ms", casas: 0 },
  { id: "score", rotulo: "Score Performance", sentido: "piso", limiar: 80, unidade: "", casas: 0 },
] as const satisfies readonly {
  id: string;
  rotulo: string;
  sentido: "teto" | "piso";
  limiar: number;
  unidade: string;
  /** Casas decimais na hora de imprimir. CLS precisa de três; o score, de nenhuma. */
  casas: number;
}[];

export type Metrica = (typeof LIMIARES_DE_CWV)[number]["id"];
