import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const RAIZ = fileURLToPath(new URL("../..", import.meta.url));

/**
 * A primeira metade da costura: **construir o site**. A segunda — servir a saída
 * estática e dirigir o navegador contra ela — é o `webServer` da configuração.
 *
 * O build fica aqui, e não encadeado no `webServer`, por um motivo de máquina:
 * um comando composto (`build && preview`) faz o Playwright matar o interpretador
 * de shell e deixar o servidor órfão segurando a porta. Com o build fora, o
 * `webServer` é um processo só, e derrubá-lo derruba o servidor.
 */
export default function construir(): void {
  execFileSync(process.execPath, [`${RAIZ}node_modules/astro/bin/astro.mjs`, "build"], {
    cwd: RAIZ,
    stdio: "inherit",
  });
}
