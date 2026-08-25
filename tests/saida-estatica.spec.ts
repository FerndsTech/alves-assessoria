import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const RAIZ = fileURLToPath(new URL("..", import.meta.url));

async function listarRecursivamente(diretorio: string, prefixo = ""): Promise<string[]> {
  const entradas = await readdir(diretorio, { withFileTypes: true });
  const arquivos: string[] = [];
  for (const entrada of entradas) {
    const caminho = `${prefixo}${entrada.name}`;
    if (entrada.isDirectory()) {
      arquivos.push(...(await listarRecursivamente(`${diretorio}/${entrada.name}`, `${caminho}/`)));
    } else {
      arquivos.push(caminho);
    }
  }
  return arquivos;
}

/**
 * Zero rota além da raiz (ADR-0001 e spec #23). Endereçamento interno é sempre
 * **fragmento**, nunca rota — o que significa que a saída construída tem um
 * único documento.
 */
test.describe("saída estática", () => {
  test("o build produz um único HTML: zero rota além da raiz", async () => {
    const arquivos = await listarRecursivamente(`${RAIZ}dist`);
    const documentos = arquivos.filter((arquivo) => arquivo.endsWith(".html"));
    expect(documentos).toEqual(["index.html"]);
  });

  test("a raiz responde e é HTML", async ({ request }) => {
    const resposta = await request.get("/");
    expect(resposta.status()).toBe(200);
    expect(resposta.headers()["content-type"]).toContain("text/html");
  });

  test("é responsivo por CSS: o mesmo HTML muda de gabarito na largura", async ({ page }, info) => {
    // Um HTML só servido a todos os dispositivos (ADR-0001), com a diferença
    // vindo da folha e não de rota, de subdomínio nem de JS. Rodar em duas
    // larguras exercita isso, mas nada falharia se o ponto de quebra sumisse —
    // então aqui se afirma o valor que ele produz.
    await page.goto("/");
    const margem = await page
      .locator("header")
      .evaluate((elemento) => getComputedStyle(elemento).paddingLeft);

    const esperada = info.project.name === "desktop" ? "96px" : "24px";
    expect(margem).toBe(esperada);
  });
});
