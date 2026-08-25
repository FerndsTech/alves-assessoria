import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { baixarWoff2, cssDoGoogle, urlDoWoff2 } from "./google-fonts.ts";

/**
 * Baixa os `woff2` da marca do Google Fonts para `public/fontes/` e escreve o
 * `@font-face` de cada um em `src/styles/fontes.css`, de onde passam a ser
 * **auto-hospedados** (brief de marca, seção Carregamento; ADR-0002, decisão 7).
 *
 * Roda **uma vez**, à mão — `npm run fontes`. Os arquivos e o CSS gerado são
 * versionados, então nem o build nem o CI tocam a rede. O script existe para que
 * a origem de cada byte seja reproduzível, não para rodar sozinho.
 *
 * O CSS é gerado e não escrito à mão por causa de uma coisa só: o
 * `unicode-range`. É dele que depende o subconjunto **não** ser baixado quando
 * a página não tem nenhum caractere dele — transcrever à mão trinta faixas de
 * código é a maneira mais barata de pagar 60 KB de `latin-ext` que ninguém lê.
 *
 * Só `latin` e `latin-ext` entram. As demais faixas do Google (cirílico, grego,
 * vietnamita) custam bytes de uma linha nomeada do orçamento e não têm leitor
 * neste site.
 */

const RAIZ = fileURLToPath(new URL("..", import.meta.url));
const DESTINO = `${RAIZ}public/fontes`;
const FOLHA = `${RAIZ}src/styles/fontes.css`;

/** As famílias da marca, na consulta que o `css2` do Google espera. */
const CONSULTA = [
  "family=Spectral:wght@600",
  "family=Source+Sans+3:wght@400;600",
  "display=swap",
].join("&");

const SUBCONJUNTOS = new Set(["latin", "latin-ext"]);

/**
 * O nome do arquivo no repositório, por família.
 *
 * O nome não carrega hash de conteúdo, e isso é deliberado: ele é escrito à mão
 * no `preload` do layout. A política de cache imutável (ADR-0002, decisão 6)
 * depende de o conteúdo nunca mudar sob o mesmo nome — trocar de versão de fonte
 * é **renomear o arquivo**, não sobrescrevê-lo.
 */
const NOMES: Record<string, string> = {
  Spectral: "spectral-600",
  "Source Sans 3": "source-sans-3",
};

type Face = {
  familia: string;
  subconjunto: string;
  peso: string;
  url: string;
  arquivo: string;
  unicodeRange: string;
};

function extrairFaces(css: string): Face[] {
  const faces: Face[] = [];
  const bloco = /\/\* ([a-z0-9-]+) \*\/\s*@font-face \{([\s\S]*?)\}/g;
  for (const [, subconjunto, corpo] of css.matchAll(bloco)) {
    if (!SUBCONJUNTOS.has(subconjunto!)) continue;
    const familia = /font-family: '([^']+)'/.exec(corpo!)?.[1];
    const peso = /font-weight: ([^;]+);/.exec(corpo!)?.[1];
    const url = urlDoWoff2(corpo!);
    const unicodeRange = /unicode-range: ([^;]+);/.exec(corpo!)?.[1];
    if (familia === undefined || peso === undefined) continue;
    if (url === undefined || unicodeRange === undefined) continue;
    const base = NOMES[familia];
    if (base === undefined) throw new Error(`Família sem nome de arquivo declarado: ${familia}`);
    faces.push({
      familia,
      subconjunto: subconjunto!,
      peso,
      url,
      arquivo: `${base}-${subconjunto}.woff2`,
      unicodeRange,
    });
  }
  return faces;
}

function declaracao(face: Face): string {
  return [
    `/* ${face.subconjunto} */`,
    "@font-face {",
    `  font-family: "${face.familia}";`,
    "  font-style: normal;",
    `  font-weight: ${face.peso};`,
    "  font-display: swap;",
    `  src: url("/fontes/${face.arquivo}") format("woff2");`,
    `  unicode-range: ${face.unicodeRange};`,
    "}",
  ].join("\n");
}

const faces = extrairFaces(await cssDoGoogle(CONSULTA));
if (faces.length === 0) throw new Error("Nenhuma face latin/latin-ext no CSS devolvido pelo Google.");

// O Source Sans 3 é variável: o mesmo arquivo serve 400 e 600, e o Google
// devolve a mesma URL nos dois blocos. Baixar por nome de arquivo elimina a
// duplicata sem precisar saber de antemão quais famílias são variáveis — mas as
// duas declarações de `@font-face` continuam saindo, que é o que faz o navegador
// instanciar cada peso.
await mkdir(DESTINO, { recursive: true });
const baixados = new Set<string>();
for (const face of faces) {
  if (baixados.has(face.arquivo)) continue;
  baixados.add(face.arquivo);
  const bytes = await baixarWoff2(face.url);
  await writeFile(`${DESTINO}/${face.arquivo}`, bytes);
  console.log(`${face.arquivo.padEnd(34)} ${String(bytes.length).padStart(7)} B`);
}

await writeFile(
  FOLHA,
  [
    "/*",
    " * GERADO por `npm run fontes` (scripts/baixar-fontes.ts). Não edite à mão:",
    " * as faixas de `unicode-range` vêm do Google e são o que decide qual",
    " * subconjunto o navegador baixa.",
    " *",
    " * Os `@font-face` de **fallback**, com as métricas casadas que impedem CLS,",
    " * não estão aqui — são escritos à mão em `global.css`, ao lado dos tokens.",
    " */",
    "",
    ...faces.map(declaracao),
    "",
  ].join("\n"),
);
console.log(`\n${FOLHA} — ${faces.length} declarações`);
