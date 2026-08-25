import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const RAIZ = fileURLToPath(new URL("../..", import.meta.url));

/**
 * A primeira metade da costura: **construir o site**.
 *
 * Ela roda dentro do processo do servidor, antes de ele escutar, e isso não é
 * arranjo à toa: o Playwright sobe o `webServer` **antes** do `globalSetup`.
 * Com o build no `globalSetup`, o servidor começaria a atender antes de o
 * `dist/` existir, responderia 404, e o Playwright esperaria por um 200 que só
 * chegaria depois — no local isso passa despercebido, porque sobra um `dist/`
 * da execução anterior; num checkout limpo, estoura.
 *
 * Construir aqui também mantém o `webServer` como **um processo só**, que é o
 * que faz o Playwright conseguir derrubá-lo sem deixar a porta órfã.
 */
export function construir(): void {
  execFileSync(process.execPath, [`${RAIZ}node_modules/astro/bin/astro.mjs`, "build"], {
    cwd: RAIZ,
    stdio: "inherit",
  });
}
