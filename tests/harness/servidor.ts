import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer, type ServerResponse } from "node:http";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
// Extensão explícita: este é o único módulo que roda sob `node` puro, fora do
// transform do Playwright, e o ESM do Node exige o `.ts`.
import { construir } from "./construir.ts";

/**
 * A segunda metade da costura: **servir a saída estática**.
 *
 * Não é `astro preview` por um motivo concreto: a partir do Astro 7 ele sobe em
 * segundo plano por padrão, e um servidor que o Playwright não consegue derrubar
 * deixa a porta ocupada para a próxima execução. Um servidor próprio, em
 * primeiro plano, também tira a costura da dependência de uma escolha de CLI que
 * pode mudar de novo — ela precisa de um servidor de arquivos, não do Astro.
 *
 * Ele constrói o site e serve exatamente esse `dist/`, e nada
 * mais. Toda falha vira resposta: uma exceção não tratada aqui derrubaria o
 * servidor no meio da suíte, e a suíte inteira falharia por um motivo que não é
 * o do site.
 */

const DIST = fileURLToPath(new URL("../../dist", import.meta.url));
const PORTA = Number(process.env.PORTA ?? 4321);

const TIPOS: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

function responder(resposta: ServerResponse, codigo: number, texto: string): void {
  resposta.writeHead(codigo, { "content-type": "text/plain; charset=utf-8" }).end(texto);
}

/**
 * Resolve o caminho pedido dentro do `dist/`, recusando qualquer fuga.
 *
 * Devolve `null` tanto para a fuga quanto para o percent-encoding malformado —
 * `decodeURIComponent` lança `URIError` em `%E0%A4%A`, e uma requisição
 * malformada não pode derrubar o servidor.
 */
function resolverDentroDoDist(caminhoPedido: string): string | null {
  let semQuery: string;
  try {
    semQuery = decodeURIComponent(caminhoPedido.split("?")[0] ?? "/");
  } catch {
    return null;
  }
  const relativo = normalize(semQuery).replace(/^([/\\])+/, "");
  const absoluto = join(DIST, relativo);
  return absoluto === DIST || absoluto.startsWith(DIST + sep) ? absoluto : null;
}

const servidor = createServer(async (requisicao, resposta) => {
  try {
    const alvo = resolverDentroDoDist(requisicao.url ?? "/");
    if (alvo === null) {
      responder(resposta, 400, "400");
      return;
    }

    let arquivo = alvo;
    let informacao = await stat(arquivo).catch(() => null);
    if (informacao?.isDirectory()) {
      arquivo = join(arquivo, "index.html");
      informacao = await stat(arquivo).catch(() => null);
    }
    if (informacao === null || !informacao.isFile()) {
      responder(resposta, 404, "404");
      return;
    }

    resposta.writeHead(200, {
      "content-type": TIPOS[extname(arquivo).toLowerCase()] ?? "application/octet-stream",
      "content-length": informacao.size,
    });

    // Os cabeçalhos já foram enviados: uma falha de leitura no meio do fluxo não
    // tem mais como virar resposta, então o que resta é derrubar só esta conexão.
    const fluxo = createReadStream(arquivo);
    fluxo.on("error", () => resposta.destroy());
    fluxo.pipe(resposta);
  } catch (erro) {
    console.error("servidor:", erro);
    if (!resposta.headersSent) responder(resposta, 500, "500");
    else resposta.destroy();
  }
});

// Constrói antes de escutar. A primeira resposta do servidor já é do site
// recém-construído — nunca de um `dist/` que sobrou da execução passada.
construir();

servidor.listen(PORTA, "127.0.0.1", () => {
  console.log(`dist/ servido em http://127.0.0.1:${PORTA}`);
});
