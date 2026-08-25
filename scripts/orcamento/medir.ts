import { extname } from "node:path";
import { brotliCompressSync } from "node:zlib";
import { ORCAMENTO, type Criterio, type Linha } from "./tabela.ts";

/**
 * A régua do gate de bytes: dado o `dist/` construído, quanto pesa cada linha do
 * orçamento.
 *
 * Ela é pura de propósito — recebe os arquivos já lidos e devolve números, sem
 * tocar disco. É o que permite testar a régua contra casos que o site ainda não
 * tem (seis fotos de advogado, um `<picture>` com AVIF e WebP) antes de eles
 * existirem.
 */

export type ArquivoDoDist = { caminho: string; conteudo: Buffer };

export type MedicaoDeLinha = {
  linha: Linha;
  rotulo: string;
  criterio: Criterio;
  teto: number;
  medido: number;
  estourou: boolean;
  /** O arquivo que responde pelo número, quando a linha é medida uma a uma. */
  responsavel: string | null;
};

/**
 * As extensões que **a rede comprime**, e por isso são medidas comprimidas.
 *
 * O critério do ADR-0002 é *bytes transferidos, comprimidos* — peso em disco não
 * interessa. Do outro lado, `woff2`, `webp`, `avif` e `jpg` já embutem a própria
 * compressão: nenhum servidor os comprime de novo, e medi-los comprimidos daria
 * um número que ninguém paga.
 *
 * Brotli e não gzip porque é o que a Cloudflare (ADR-0002, decisão 4) serve a
 * qualquer navegador deste século. Na qualidade padrão do Node, o mesmo
 * conteúdo dá sempre o mesmo número — que é a propriedade que põe este gate do
 * lado que bloqueia o merge.
 */
const COMPRIMIDAS_NA_REDE = new Set([
  ".html",
  ".css",
  ".js",
  ".mjs",
  ".json",
  ".svg",
  ".xml",
  ".txt",
  ".map",
  ".webmanifest",
]);

export function bytesTransferidos({ caminho, conteudo }: ArquivoDoDist): number {
  return COMPRIMIDAS_NA_REDE.has(extname(caminho).toLowerCase())
    ? brotliCompressSync(conteudo).length
    : conteudo.length;
}

/** `/fontes/x.woff2?v=1` e `fontes/x.woff2` são o mesmo arquivo do `dist/`. */
function normalizar(url: string): string {
  const semQuery = url.split(/[?#]/)[0] ?? "";
  try {
    return decodeURI(semQuery).replace(/^\/+/, "");
  } catch {
    // URL malformada não é arquivo do dist; segue como veio e não casa com nada.
    return semQuery.replace(/^\/+/, "");
  }
}

/** Os arquivos citados por `src` e `srcset` dentro de um trecho de HTML. */
function urlsDe(trecho: string): string[] {
  const urls: string[] = [];
  for (const [, valor] of trecho.matchAll(/(?<![\w-])src="([^"]*)"/gi)) {
    urls.push(normalizar(valor!));
  }
  for (const [, valor] of trecho.matchAll(/(?<![\w-])srcset="([^"]*)"/gi)) {
    for (const candidato of valor!.split(",")) {
      const url = candidato.trim().split(/\s+/)[0];
      if (url !== undefined && url !== "") urls.push(normalizar(url));
    }
  }
  return urls;
}

const PICTURE = /<picture\b[^>]*>[\s\S]*?<\/picture>/gi;
const IMAGEM_SOLTA = /<(?:img|source)\b[^>]*>/gi;

/**
 * Os **conjuntos de escolha** do documento: grupos de arquivos dos quais uma
 * visita baixa exatamente **um**.
 *
 * É a diferença entre o que o `dist/` guarda e o que a rede entrega. Três
 * variantes de uma foto responsiva ocupam três arquivos no disco e custam uma ao
 * visitante — somar as três mediria um site que ninguém recebe, e um teto que
 * ninguém consegue cumprir é um teto que se aprende a suspender.
 *
 * Um `<picture>` inteiro é **um** conjunto, não um por `<source>`: o navegador
 * escolhe uma vez entre AVIF, WebP e o `img` de fallback.
 */
function conjuntosDeEscolha(documento: string): string[][] {
  const conjuntos: string[][] = [];
  const solto = documento.replace(PICTURE, (bloco) => {
    conjuntos.push(urlsDe(bloco));
    return "";
  });
  for (const [tag] of solto.matchAll(IMAGEM_SOLTA)) {
    conjuntos.push(urlsDe(tag));
  }
  return conjuntos.filter((conjunto) => conjunto.length > 0);
}

/**
 * Os conjuntos que o template marcou com `data-orcamento="…"`.
 *
 * A marcação é explícita e não deduzida do nome do arquivo por um motivo: duas
 * linhas da tabela — a imagem do LCP e a foto de advogado — são sobre **papel**,
 * não sobre formato. Nenhuma regra de extensão distingue a fachada do herói de
 * um retrato, e adivinhar produziria um gate que mede a linha errada em silêncio.
 */
function conjuntosMarcados(documento: string, marca: string): string[][] {
  const alvo = new RegExp(`data-orcamento="${marca}"`);
  const blocos = [...documento.matchAll(PICTURE)].map(([bloco]) => bloco);
  const soltas = [...documento.replace(PICTURE, "").matchAll(IMAGEM_SOLTA)].map(([tag]) => tag);
  return [...blocos, ...soltas].filter((trecho) => alvo.test(trecho)).map(urlsDe);
}

/** As fontes que o HTML manda buscar no caminho crítico. */
function preloadsDeFonte(documento: string): string[] {
  const preloads: string[] = [];
  for (const [tag] of documento.matchAll(/<link\b[^>]*>/gi)) {
    if (!/rel="preload"/i.test(tag) || !/as="font"/i.test(tag)) continue;
    const href = /href="([^"]*)"/i.exec(tag)?.[1];
    if (href !== undefined) preloads.push(normalizar(href));
  }
  return preloads;
}

const POR_EXTENSAO: Partial<Record<string, Linha>> = {
  ".html": "html",
  ".css": "css",
  ".js": "js",
  ".mjs": "js",
  ".woff2": "fontes",
};

export function medir(arquivos: ArquivoDoDist[]): MedicaoDeLinha[] {
  const bytes = new Map(arquivos.map((arquivo) => [arquivo.caminho, bytesTransferidos(arquivo)]));
  const documentos = arquivos.filter((arquivo) => arquivo.caminho.endsWith(".html"));
  if (documentos.length !== 1) {
    throw new Error(
      `O gate espera um documento só no dist/ e achou ${documentos.length}. Zero rota ` +
        `além da raiz é decisão do ADR-0001 — se ela caiu, o gate precisa saber qual ` +
        `página medir antes de voltar a rodar.`,
    );
  }
  const documento = documentos[0]!.conteudo.toString("utf8");

  const peso = (caminho: string): number => bytes.get(caminho) ?? 0;
  const maiorDoConjunto = (urls: string[]): { bytes: number; caminho: string | null } =>
    urls.reduce<{ bytes: number; caminho: string | null }>(
      (maior, url) => (peso(url) > maior.bytes ? { bytes: peso(url), caminho: url } : maior),
      { bytes: 0, caminho: null },
    );

  // Cada arquivo pertence a um conjunto no máximo: o primeiro que o cita. Sem
  // isso, um arquivo citado por dois conjuntos entraria duas vezes no total.
  const jaContado = new Set<string>();
  let total = 0;
  for (const conjunto of conjuntosDeEscolha(documento)) {
    const ineditos = conjunto.filter((url) => !jaContado.has(url));
    for (const url of conjunto) jaContado.add(url);
    total += maiorDoConjunto(ineditos).bytes;
  }
  for (const { caminho } of arquivos) {
    if (!jaContado.has(caminho)) total += peso(caminho);
  }

  const preloads = new Set(preloadsDeFonte(documento));
  const lcp = conjuntosMarcados(documento, "lcp");
  const fotos = conjuntosMarcados(documento, "foto-de-advogado");

  return ORCAMENTO.map(({ id, rotulo, teto, criterio }): MedicaoDeLinha => {
    let medido = 0;
    let responsavel: string | null = null;

    if (id === "total") {
      medido = total;
    } else if (id === "preload-de-fonte") {
      medido = [...preloads].reduce((soma, url) => soma + peso(url), 0);
    } else if (id === "imagem-do-lcp") {
      medido = lcp.reduce((soma, conjunto) => soma + maiorDoConjunto(conjunto).bytes, 0);
    } else if (id === "foto-de-advogado") {
      // O número da linha é o da foto mais pesada, e é ela que o relatório
      // nomeia: "a linha estourou" sem dizer qual foto manda quem lê o PR
      // refazer a medição à mão.
      for (const conjunto of fotos) {
        const maior = maiorDoConjunto(conjunto);
        if (maior.bytes > medido) ({ bytes: medido, caminho: responsavel } = maior);
      }
    } else {
      for (const arquivo of arquivos) {
        if (POR_EXTENSAO[extname(arquivo.caminho).toLowerCase()] === id) {
          medido += peso(arquivo.caminho);
        }
      }
    }

    return { linha: id, rotulo, criterio, teto, medido, estourou: medido > teto, responsavel };
  });
}
