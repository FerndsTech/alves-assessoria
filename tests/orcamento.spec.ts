import { brotliCompressSync } from "node:zlib";
import { expect, test } from "@playwright/test";
import { medir, type ArquivoDoDist } from "../scripts/orcamento/medir.ts";

/**
 * O **instrumento** do gate de bytes, e só ele.
 *
 * Isto não é uma segunda costura sobre o site: nada aqui abre navegador nem
 * afirma comportamento de página. O que se testa é a régua — qual arquivo cai em
 * qual linha, o que conta comprimido e o que conta cru, e qual variante de um
 * conjunto responsivo uma visita de fato paga. Errar a régua produz o pior
 * resultado possível num gate: verde por medir a coisa errada.
 *
 * Quem afirma que **este** site cabe no orçamento é `npm run orcamento`, contra
 * o `dist/` recém-construído.
 */

/** Texto que comprime muito, para separar "medido comprimido" de "medido cru". */
const REPETITIVO = "a".repeat(20_000);

function arquivo(caminho: string, conteudo: string | Buffer): ArquivoDoDist {
  return { caminho, conteudo: Buffer.isBuffer(conteudo) ? conteudo : Buffer.from(conteudo) };
}

function documento(corpo = ""): string {
  return `<!doctype html><html lang="pt-BR"><head></head><body>${corpo}</body></html>`;
}

function linha(medicoes: ReturnType<typeof medir>, nome: string) {
  const encontrada = medicoes.find((medicao) => medicao.linha === nome);
  if (encontrada === undefined) throw new Error(`Linha ausente do relatório: ${nome}`);
  return encontrada;
}

test.describe("a régua do orçamento de bytes", () => {
  test("HTML e CSS medem comprimidos: é o que o pacote de dados paga", () => {
    const html = documento(REPETITIVO);
    const css = `body { content: "${REPETITIVO}" }`;
    const medicoes = medir([arquivo("index.html", html), arquivo("_astro/x.css", css)]);

    expect(linha(medicoes, "html").medido).toBe(brotliCompressSync(Buffer.from(html)).length);
    expect(linha(medicoes, "css").medido).toBe(brotliCompressSync(Buffer.from(css)).length);
    expect(linha(medicoes, "html").medido).toBeLessThan(html.length);
  });

  test("fonte e imagem medem cruas: a rede não recomprime o que já veio comprimido", () => {
    const woff2 = Buffer.from(REPETITIVO);
    const medicoes = medir([
      arquivo("index.html", documento()),
      arquivo("fontes/spectral-600-latin.woff2", woff2),
    ]);

    expect(linha(medicoes, "fontes").medido).toBe(woff2.length);
  });

  test("estourar o teto reprova, e medir exatamente o teto não", () => {
    const noTeto = medir([
      arquivo("index.html", documento()),
      arquivo("fontes/a.woff2", Buffer.alloc(150 * 1024)),
    ]);
    expect(linha(noTeto, "fontes").estourou).toBe(false);

    const acima = medir([
      arquivo("index.html", documento()),
      arquivo("fontes/a.woff2", Buffer.alloc(150 * 1024 + 1)),
    ]);
    expect(linha(acima, "fontes").estourou).toBe(true);
  });

  test("de um conjunto responsivo conta só a maior variante: uma visita baixa uma", () => {
    const medicoes = medir([
      arquivo(
        "index.html",
        documento('<img src="/p.webp" srcset="/p.webp 720w, /g.webp 1600w" data-orcamento="lcp">'),
      ),
      arquivo("p.webp", Buffer.alloc(10_000)),
      arquivo("g.webp", Buffer.alloc(40_000)),
    ]);

    expect(linha(medicoes, "imagem-do-lcp").medido).toBe(40_000);
    expect(linha(medicoes, "total").medido).toBe(40_000 + linha(medicoes, "html").medido);
  });

  test("a imagem do LCP é a que o template marca, não a maior da página", () => {
    const medicoes = medir([
      arquivo(
        "index.html",
        documento('<img src="/heroi.webp" data-orcamento="lcp"><img src="/outra.webp">'),
      ),
      arquivo("heroi.webp", Buffer.alloc(10_000)),
      arquivo("outra.webp", Buffer.alloc(90_000)),
    ]);

    expect(linha(medicoes, "imagem-do-lcp").medido).toBe(10_000);
  });

  test("a foto de advogado é medida uma a uma, não somada", () => {
    const medicoes = medir([
      arquivo(
        "index.html",
        documento(
          '<img src="/a.webp" data-orcamento="foto-de-advogado">' +
            '<img src="/b.webp" data-orcamento="foto-de-advogado">',
        ),
      ),
      arquivo("a.webp", Buffer.alloc(100 * 1024)),
      arquivo("b.webp", Buffer.alloc(110 * 1024)),
    ]);

    expect(linha(medicoes, "foto-de-advogado").medido).toBe(110 * 1024);
    expect(linha(medicoes, "foto-de-advogado").estourou).toBe(false);
  });

  test("linha sem nenhum arquivo mede zero e não reprova", () => {
    const medicoes = medir([arquivo("index.html", documento())]);

    expect(linha(medicoes, "foto-de-advogado").medido).toBe(0);
    expect(linha(medicoes, "js").medido).toBe(0);
    expect(medicoes.every((medicao) => !medicao.estourou)).toBe(true);
  });

  test("a linha de preload conta só a fonte que o HTML pré-carrega", () => {
    const medicoes = medir([
      arquivo(
        "index.html",
        documento().replace(
          "</head>",
          '<link rel="preload" href="/fontes/critica.woff2" as="font" type="font/woff2" crossorigin></head>',
        ),
      ),
      arquivo("fontes/critica.woff2", Buffer.alloc(30_000)),
      arquivo("fontes/depois.woff2", Buffer.alloc(60_000)),
    ]);

    expect(linha(medicoes, "preload-de-fonte").medido).toBe(30_000);
    expect(linha(medicoes, "fontes").medido).toBe(90_000);
  });

  test("todo arquivo do dist entra no total, mesmo o que nenhuma linha nomeia", () => {
    const medicoes = medir([
      arquivo("index.html", documento()),
      arquivo("favicon.ico", Buffer.alloc(5_000)),
    ]);

    expect(linha(medicoes, "total").medido).toBe(5_000 + linha(medicoes, "html").medido);
  });
});
