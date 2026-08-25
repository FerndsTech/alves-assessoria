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
 * Rodar com: `npm run placeholders`
 */

const RAIZ = new URL("../", import.meta.url);

const PECAS = [
  {
    origem: "src/assets/placeholders/fachada-do-heroi.svg",
    destino: "src/assets/placeholders/fachada-do-heroi.jpg",
    largura: 1600,
    qualidade: 82,
  },
];

for (const peca of PECAS) {
  const svg = await readFile(fileURLToPath(new URL(peca.origem, RAIZ)));

  /*
   * Grão gaussiano por cima do desenho. Não é enfeite: um desenho chapado
   * comprime a quase nada em qualquer formato, e um placeholder que comprime a
   * nada volta a cair abaixo do corte de 0,05 bpp depois que o pipeline do Astro
   * o re-encoda. O grão põe o placeholder na mesma faixa de bytes de uma
   * fotografia, que é o que ele precisa imitar para medir a mesma coisa.
   */
  const altura = Math.round((peca.largura * 9) / 16);
  const grao = await sharp({
    create: {
      width: peca.largura,
      height: altura,
      channels: 3,
      background: { r: 128, g: 128, b: 128 },
      noise: { type: "gaussian", mean: 128, sigma: 22 },
    },
  })
    .png()
    .toBuffer();

  const jpeg = await sharp(svg, { density: 144 })
    .resize({ width: peca.largura })
    .composite([{ input: grao, blend: "overlay" }])
    .jpeg({ quality: peca.qualidade, mozjpeg: true })
    .toBuffer();

  await writeFile(fileURLToPath(new URL(peca.destino, RAIZ)), jpeg);
  console.log(`${peca.destino} — ${(jpeg.length / 1024).toFixed(1)} KB`);
}
