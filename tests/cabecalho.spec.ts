import { expect, test } from "@playwright/test";

/**
 * O cabeçalho carrega **uma coisa só**: a logo horizontal à esquerda, sem link.
 * Sem WhatsApp, sem navegação por âncora, zero JS, nenhuma fonte de CLS.
 */
test.describe("cabeçalho", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("existe e carrega só a logo", async ({ page }) => {
    const cabecalho = page.locator("header");
    await expect(cabecalho).toBeVisible();

    // "Só a logo" é literal: um único elemento dentro do cabeçalho, e ele é a
    // imagem. Contar só as imagens deixaria passar qualquer coisa ao lado dela.
    await expect(cabecalho.locator("> *")).toHaveCount(1);
    await expect(cabecalho.locator("img")).toHaveCount(1);
  });

  test("a logo carrega o nome do escritório no texto alternativo", async ({ page }) => {
    // ADR-0004, decisão 6: o `alt` sai de um lugar só. A logo não é decorativa —
    // ela contém o nome em texto, e quem não vê a imagem perde o que quem vê
    // recebe. A fachada, essa sim, é decorativa e leva `alt=""`.
    await expect(page.locator("header img")).toHaveAttribute("alt", /\S/);
    await expect(page.locator("#fachada-do-heroi")).toHaveAttribute("alt", "");
  });

  test("a logo não é link", async ({ page }) => {
    // `href="/"` recarrega a página inteira e `#topo` empilha histórico para não
    // fazer nada. Nenhum dos dois vale o custo.
    await expect(page.locator("header a")).toHaveCount(0);
    await expect(page.locator("header button")).toHaveCount(0);
  });

  test("não há navegação por âncora no cabeçalho", async ({ page }) => {
    await expect(page.locator("header nav")).toHaveCount(0);
    await expect(page.locator('header a[href^="#"]')).toHaveCount(0);
  });

  test("não é persistente: rola junto com o herói e sai da tela com ele", async ({ page }) => {
    const posicao = await page
      .locator("header")
      .evaluate((elemento) => getComputedStyle(elemento).position);
    expect(["static", "relative"]).toContain(posicao);

    // Rolar N pixels tem de mover o cabeçalho N pixels para cima. Faixa fixa
    // ficaria parada; faixa `sticky` pararia ao encostar no topo.
    const cabecalho = page.locator("header");
    const antes = await cabecalho.evaluate((el) => el.getBoundingClientRect().bottom);
    await page.evaluate(() => {
      // `behavior: "instant"` porque a folha liga `scroll-behavior: smooth`, e
      // ler a posição no meio de uma animação mede outra coisa.
      window.scrollTo({ top: Math.round(document.documentElement.scrollHeight / 3), behavior: "instant" });
    });
    const rolagem = await page.evaluate(() => Math.round(window.scrollY));
    expect(rolagem).toBeGreaterThan(0);

    const depois = await cabecalho.evaluate((el) => el.getBoundingClientRect().bottom);
    expect(Math.abs(antes - rolagem - depois)).toBeLessThan(2);
  });
});
