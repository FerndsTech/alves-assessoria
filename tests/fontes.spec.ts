import { expect, test } from "@playwright/test";

/**
 * As fontes da marca, afirmadas sobre o site entregue.
 *
 * A linha de orçamento existe desde o ADR-0003 e os arquivos existem desde o
 * #26; o que estes testes guardam é o que separa "os `woff2` estão no `dist/`"
 * de "a página os usa" — pilha de `font-family` errada, `@font-face` que não
 * casa, `preload` apontando para arquivo renomeado. Nada disso reprova no gate
 * de bytes: o peso fica igual e a página cai no fallback em silêncio.
 */
test.describe("fontes", () => {
  test("a fonte da marca carrega de fato, e a página não fica no fallback", async ({ page }) => {
    await page.goto("/");

    const carregadas = await page.evaluate(async () => {
      await document.fonts.ready;
      return {
        titulo: document.fonts.check('600 52px "Spectral"'),
        texto: document.fonts.check('400 17px "Source Sans 3"'),
      };
    });

    expect(carregadas.titulo).toBe(true);
    expect(carregadas.texto).toBe(true);
  });

  test("nada é buscado no Google: as fontes são auto-hospedadas", async ({ page }) => {
    // Auto-hospedar evita a conexão a um terceiro no caminho crítico (brief de
    // marca, seção Carregamento). Um `@import` do Google que voltasse a entrar
    // não mudaria byte nenhum das linhas do orçamento — só o tempo até a
    // primeira pintura, e só para quem está em rede ruim.
    const terceiros: string[] = [];
    page.on("request", (requisicao) => {
      const { hostname } = new URL(requisicao.url());
      if (hostname !== "127.0.0.1") terceiros.push(requisicao.url());
    });

    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    expect(terceiros).toEqual([]);
  });

  test("só o Spectral 600 latin é pré-carregado", async ({ page }) => {
    // A linha de `preload` é a única do orçamento que o ADR-0003 se recusou a
    // afrouxar: folga em caminho crítico não compra nada. Um `preload` a mais
    // cabe no teto de bytes e mesmo assim é regressão.
    await page.goto("/");
    const precarregadas = await page
      .locator('link[rel="preload"][as="font"]')
      .evaluateAll((elementos) => elementos.map((elemento) => elemento.getAttribute("href")));

    expect(precarregadas).toEqual(["/fontes/spectral-600-latin.woff2"]);
  });

  test("os fallbacks de métrica casada estão declarados", async ({ page }) => {
    // Eles são invisíveis quando funcionam — a fonte real chega e ninguém vê o
    // fallback. Apagar o bloco não quebra nada que se olhe: só volta o pulo de
    // layout durante a troca, e CLS é o número que o ADR-0003 não afrouxou.
    await page.goto("/");
    const familias = await page.evaluate(() => {
      const declaradas = new Set<string>();
      document.fonts.forEach((face) => declaradas.add(face.family.replaceAll('"', "")));
      return [...declaradas];
    });

    expect(familias).toEqual(
      expect.arrayContaining([
        "Spectral em Georgia",
        "Spectral em Noto Serif",
        "Source Sans em Arial",
        "Source Sans em Roboto",
      ]),
    );
  });
});
