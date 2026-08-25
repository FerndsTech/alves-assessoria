import { expect, test } from "@playwright/test";

/**
 * *"O site abriu mas o texto não apareceu"* é o pior modo de falha disponível
 * para este público: 24% dos usuários rurais não conseguem abrir aplicativo
 * nenhum ao fim do pacote de dados, e 49% dos usuários de celular do Nordeste
 * ficaram sem pacote em algum momento do trimestre.
 *
 * Daí a trava do ADR-0002, decisão 9: **nenhum estado inicial invisível
 * dependente de JS**. A revelação no scroll nasce visível — o JS só retira o
 * deslocamento.
 */
test.describe("com JavaScript desligado", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("o texto do herói continua visível", async ({ page }) => {
    await expect(page.locator("#heroi h1")).toBeVisible();
    await expect(page.locator("#heroi p")).toBeVisible();

    const texto = (await page.locator("#heroi").innerText()).trim();
    expect(texto.length).toBeGreaterThan(40);
  });

  test('os seis advogados continuam alcançáveis: o "ver mais" não é script', async ({ page }) => {
    /*
     * Os três de baixo ficam atrás de um `<details>`, e é por isso que eles
     * continuam existindo aqui. Um disclosure em JS os teria transformado em
     * conteúdo que **nunca aparece** para quem ficou sem pacote de dados no meio
     * do carregamento — e metade dos advogados do escritório seria invisível sem
     * que nada na tela indicasse que faltava alguém.
     */
    await expect(page.locator("#advogados .advogado")).toHaveCount(6);
    await expect(page.locator("#advogados .advogado:visible")).toHaveCount(3);

    await page.locator("#advogados details summary").click();
    await expect(page.locator("#advogados .advogado:visible")).toHaveCount(6);
  });

  test("nenhum elemento nasce transparente", async ({ page }) => {
    const transparentes = await page.evaluate(() =>
      [...document.body.querySelectorAll("*")]
        .filter((elemento) => getComputedStyle(elemento).opacity === "0")
        .map((elemento) => {
          const id = elemento.id ? `#${elemento.id}` : "";
          const classe = elemento.className
            ? `.${String(elemento.className).trim().split(/\s+/).join(".")}`
            : "";
          return `${elemento.tagName.toLowerCase()}${id}${classe}`;
        }),
    );
    expect(transparentes).toEqual([]);
  });
});
