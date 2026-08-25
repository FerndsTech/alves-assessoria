import type { Page } from "@playwright/test";

/**
 * Os links de WhatsApp que estão visíveis na primeira tela, com a página no
 * topo.
 *
 * Esta é a porta lateral que o spec fechou duas vezes (#17 e #22): o herói
 * **roteia, não converte**, e nenhum WhatsApp aparece antes de o visitante ter
 * entendido alguma coisa. A asserção é sobre a página inteira e não sobre o
 * herói, porque a regra é sobre a dobra — qualquer seção que suba até ali fica
 * sujeita a ela.
 */
export async function whatsappAcimaDaDobra(pagina: Page): Promise<string[]> {
  await pagina.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  return await pagina.evaluate(() => {
    const eWhatsApp = (href: string) => /wa\.me|whatsapp/i.test(href);
    return [...document.querySelectorAll("a[href]")]
      .filter((elo) => eWhatsApp(elo.getAttribute("href") ?? ""))
      .filter((elo) => {
        const caixa = elo.getBoundingClientRect();
        const temArea = caixa.width > 0 && caixa.height > 0;
        return temArea && caixa.top < window.innerHeight && caixa.bottom > 0;
      })
      .map((elo) => elo.getAttribute("href") ?? "");
  });
}
