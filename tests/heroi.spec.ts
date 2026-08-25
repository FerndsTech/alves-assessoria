import { expect, test } from "@playwright/test";
import { whatsappAcimaDaDobra } from "./harness/dobra";

/**
 * Palavras que o herói não pode dizer. Prov. 205/2021 art. 6º veda ao anúncio
 * afirmar sobre **tamanho, estrutura ou ostentação** do escritório.
 *
 * Isto é um arame de tropeço, não uma prova: nenhuma lista de palavras decide
 * conformidade, e copy nova continua passando por leitura humana. O que a lista
 * compra é que a formulação óbvia — a que sai da caneta de quem está escrevendo
 * copy de escritório sem pensar na vedação — não chega ao site em silêncio.
 */
const PALAVRAS_VEDADAS_NO_HEROI = [
  "maior",
  "líder",
  "lider",
  "referência",
  "referencia",
  "o melhor",
  "a melhor",
  "número 1",
  "numero 1",
  "nº 1",
  "renomado",
  "conceituado",
  "premiado",
  "tradicional",
  "sede própria",
  "sede propria",
  "filiais",
  "grande porte",
  "milhares",
  "anos de experiência",
  "anos de experiencia",
];

test.describe("herói", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("roteia em vez de converter: dois botões, ambos internos", async ({ page }) => {
    const elos = page.locator("#heroi a[href]");
    await expect(elos).toHaveCount(2);

    for (const href of await elos.evaluateAll((els) =>
      els.map((el) => el.getAttribute("href") ?? ""),
    )) {
      expect(href, "botão do herói tem de apontar para um fragmento interno").toMatch(/^#/);
    }
  });

  test("nenhum link de WhatsApp acima da dobra", async ({ page }) => {
    expect(await whatsappAcimaDaDobra(page)).toEqual([]);
  });

  test("e o detector de WhatsApp acima da dobra de fato detecta", async ({ page }) => {
    /*
     * O teste acima passa hoje porque o site ainda não tem link de WhatsApp
     * nenhum — ele passaria igual se o detector estivesse quebrado. Este aqui
     * planta um na primeira tela e um bem abaixo dela, e afirma que o detector
     * acha o primeiro e ignora o segundo. É o que faz do outro um portão em vez
     * de um comentário, para quando o #27 e o #31 trouxerem os links de verdade.
     */
    await page.evaluate(() => {
      const acima = document.createElement("a");
      acima.href = "https://wa.me/5585999999999";
      acima.textContent = "plantado acima da dobra";
      document.body.prepend(acima);

      const abaixo = document.createElement("a");
      abaixo.href = "https://wa.me/5585988888888";
      abaixo.textContent = "plantado abaixo da dobra";
      abaixo.style.position = "absolute";
      abaixo.style.top = `${window.innerHeight * 3}px`;
      document.body.append(abaixo);
    });

    expect(await whatsappAcimaDaDobra(page)).toEqual(["https://wa.me/5585999999999"]);
  });

  test("a foto de fachada é o elemento de LCP da página inteira", async ({ page }) => {
    const lcp = await page.evaluate(
      () =>
        new Promise<{ tag: string; id: string } | null>((resolver) => {
          let ultima: LargestContentfulPaint | undefined;
          new PerformanceObserver((lista) => {
            const entradas = lista.getEntries() as LargestContentfulPaint[];
            ultima = entradas[entradas.length - 1] ?? ultima;
          }).observe({ type: "largest-contentful-paint", buffered: true });

          // O LCP só é definitivo quando para de crescer; meio segundo depois do
          // `load` numa página estática servida do disco é folga de sobra.
          setTimeout(() => {
            const elemento = ultima?.element ?? null;
            resolver(elemento ? { tag: elemento.tagName, id: elemento.id } : null);
          }, 500);
        }),
    );

    expect(lcp, "o navegador não reportou nenhum elemento de LCP").not.toBeNull();
    expect(lcp).toEqual({ tag: "IMG", id: "fachada-do-heroi" });
  });

  test("a foto de fachada é buscada com prioridade e nunca preguiçosa", async ({ page }) => {
    const fachada = page.locator("#fachada-do-heroi");
    await expect(fachada).toHaveAttribute("fetchpriority", "high");
    // `eager` exato, e não "diferente de lazy": um `loading` apagado por acidente
    // também passaria na forma negativa.
    await expect(fachada).toHaveAttribute("loading", "eager");

    // Dimensão declarada, na proporção 16:9 que a convenção de placeholder fixa
    // para a fachada. Aqui ela não reserva caixa — a foto é `position: absolute`
    // cobrindo o herói, que já tem altura própria —, mas é dela que sai o
    // `aspect-ratio` implícito, e é ela que mantém a proporção honesta quando a
    // foto real entrar no lugar do placeholder.
    const declarada = await fachada.evaluate((elemento) => {
      const imagem = elemento as HTMLImageElement;
      return {
        largura: Number(imagem.getAttribute("width")),
        altura: Number(imagem.getAttribute("height")),
        // `naturalWidth` não serve para conferir proporção: num aparelho de
        // densidade 3 ele vem corrigido pela densidade e arredondado. Serve,
        // sim, para afirmar que a imagem de fato carregou — um `src` quebrado
        // passaria em qualquer asserção sobre atributo.
        carregou: imagem.complete && imagem.naturalWidth > 0,
      };
    });

    expect(declarada.carregou).toBe(true);
    expect(declarada.largura / declarada.altura).toBeCloseTo(16 / 9, 2);
  });

  test("não afirma nada sobre tamanho, estrutura ou ostentação do escritório", async ({ page }) => {
    const texto = (await page.locator("#heroi").innerText()).toLowerCase();
    const encontradas = PALAVRAS_VEDADAS_NO_HEROI.filter((palavra) => texto.includes(palavra));
    expect(encontradas, `Prov. 205 art. 6º — copy do herói contém: ${encontradas.join(", ")}`).toEqual(
      [],
    );
  });
});
