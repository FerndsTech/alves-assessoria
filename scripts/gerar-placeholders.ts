import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

/**
 * Rasteriza os placeholders que substituem **fotografia**, a partir do SVG que
 * os desenha.
 *
 * Por que um raster e não o próprio SVG no site: o Chromium não considera para
 * LCP imagens abaixo de 0,05 bit por pixel — a heurística existe justamente para
 * descartar placeholders. Um SVG de 1,5 KB cobrindo 1,4 milhão de pixels fica
 * duas ordens de grandeza abaixo do corte, e o elemento de LCP da página passa a
 * ser o `h1`. O placeholder tem de percorrer o mesmo caminho que a foto real vai
 * percorrer, ou ele mede outra coisa.
 *
 * O mesmo raciocínio vale fora do LCP, e é por isso que o retrato também leva
 * grão: a linha de **cada foto de advogado** do orçamento é de 120 KB, e um
 * desenho chapado mediria uns poucos KB. O gate ficaria verde a vida inteira e
 * só reprovaria no dia em que as seis fotos reais entrassem — que é o dia em que
 * cortar já é conversa política.
 *
 * Rodar com: `npm run placeholders`
 */

const RAIZ = new URL("../", import.meta.url);

type Peca = {
  origem: string;
  destino: string;
  largura: number;
  altura: number;
  qualidade: number;
  /** Trocas de texto no SVG antes de rasterizar, para famílias de placeholder. */
  substituicoes?: Record<string, string>;
};

/**
 * Os seis retratos saem do **mesmo desenho**, variando só tom e iniciais.
 *
 * Seis SVGs quase idênticos seria seis lugares para divergir no enquadramento —
 * e o enquadramento é justamente o que precisa ser igual nos seis. O tom varia
 * porque uma grade de seis tiles idênticos não deixa ver que são seis pessoas.
 */
const RETRATOS = [
  { slug: "ana-beatriz-vasconcelos", iniciais: "AV", fundo: "#DFE3E9", silhueta: "#AEB6C2" },
  { slug: "raimundo-nonato-filho", iniciais: "RF", fundo: "#E4E2DE", silhueta: "#B7B2A9" },
  { slug: "claudia-sampaio-feitosa", iniciais: "CF", fundo: "#DEE5E4", silhueta: "#A9B6B4" },
  { slug: "iran-bezerra-de-lima", iniciais: "IL", fundo: "#E6E1E3", silhueta: "#BAAFB4" },
  { slug: "maria-celia-andrade", iniciais: "MA", fundo: "#E1E4DD", silhueta: "#AFB6A8" },
  { slug: "tarcisio-rocha-alencar", iniciais: "TA", fundo: "#DDE2E7", silhueta: "#ACB4BE" },
];

/** As quatro unidades, na ordem em que a collection as ordena. */
const UNIDADES = [
  { slug: "acopiara", cidade: "ACOPIARA" },
  { slug: "juazeiro-do-norte", cidade: "JUAZEIRO DO NORTE" },
  { slug: "senador-pompeu", cidade: "SENADOR POMPEU" },
  { slug: "fortim", cidade: "FORTIM" },
];

const PECAS: Peca[] = [
  {
    origem: "src/assets/placeholders/fachada-do-heroi.svg",
    destino: "src/assets/placeholders/fachada-do-heroi.jpg",
    largura: 1600,
    altura: 900,
    qualidade: 82,
  },
  ...RETRATOS.map(
    ({ slug, iniciais, fundo, silhueta }): Peca => ({
      origem: "src/assets/placeholders/retrato.svg",
      destino: `src/assets/placeholders/retrato-${slug}.jpg`,
      // 768×1024 é o 3:4 do painel. O card recorta em 4:5 por `object-fit`, e o
      // desenho tem zona segura central justamente para sobreviver ao recorte.
      largura: 768,
      altura: 1024,
      qualidade: 78,
      substituicoes: { "{{INICIAIS}}": iniciais, "{{FUNDO}}": fundo, "{{SILHUETA}}": silhueta },
    }),
  ),
  ...UNIDADES.map(
    ({ slug, cidade }): Peca => ({
      origem: "src/assets/placeholders/fachada-de-unidade.svg",
      destino: `src/assets/placeholders/fachada-de-${slug}.jpg`,
      largura: 1600,
      altura: 900,
      qualidade: 82,
      substituicoes: { "{{CIDADE}}": cidade },
    }),
  ),
];

function aplicar(svg: string, substituicoes: Record<string, string> = {}): string {
  let saida = svg;
  for (const [marca, valor] of Object.entries(substituicoes)) {
    saida = saida.replaceAll(marca, valor);
  }
  const pendente = /\{\{[A-Z_]+\}\}/.exec(saida);
  if (pendente !== null) {
    throw new Error(
      `O desenho ainda tem a marca ${pendente[0]} depois das substituições. Um ` +
        `placeholder com marca crua vira texto literal na foto — e ninguém repara ` +
        `numa foto de placeholder até ela estar publicada.`,
    );
  }
  return saida;
}

for (const peca of PECAS) {
  const svg = aplicar(
    await readFile(fileURLToPath(new URL(peca.origem, RAIZ)), "utf8"),
    peca.substituicoes,
  );

  /*
   * Grão gaussiano por cima do desenho. Não é enfeite: um desenho chapado
   * comprime a quase nada em qualquer formato, e um placeholder que comprime a
   * nada não cai na faixa de bytes da foto real — some do LCP no herói, e
   * esvazia a linha de foto de advogado no orçamento. O grão põe o placeholder
   * na mesma faixa de uma fotografia, que é o que ele precisa imitar para medir
   * a mesma coisa.
   */
  const grao = await sharp({
    create: {
      width: peca.largura,
      height: peca.altura,
      channels: 3,
      background: { r: 128, g: 128, b: 128 },
      noise: { type: "gaussian", mean: 128, sigma: 22 },
    },
  })
    .png()
    .toBuffer();

  const jpeg = await sharp(Buffer.from(svg), { density: 144 })
    .resize({ width: peca.largura, height: peca.altura })
    .composite([{ input: grao, blend: "overlay" }])
    .jpeg({ quality: peca.qualidade, mozjpeg: true })
    .toBuffer();

  await writeFile(fileURLToPath(new URL(peca.destino, RAIZ)), jpeg);
  console.log(`${peca.destino} — ${(jpeg.length / 1024).toFixed(1)} KB`);
}
