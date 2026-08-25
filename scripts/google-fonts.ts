/**
 * **O que os dois scripts de fonte sabem sobre o Google Fonts**, num lugar só.
 *
 * `baixar-fontes.ts` busca os `woff2` da marca; `metricas-de-fonte.ts` busca as
 * fontes de fallback do Android para medir a largura delas. São tarefas
 * diferentes, mas o caminho até os bytes é o mesmo: pedir o `css2`, achar a
 * `url()` dentro do bloco de `@font-face`, baixar o arquivo.
 *
 * O que essa repetição escondia era o **User-Agent**, e ele não é detalhe: sem
 * um de navegador moderno o Google devolve `ttf` em vez de `woff2`, calado e com
 * 200. Numa cópia só, a explicação vive ao lado do valor; em duas, uma delas
 * perde a explicação — e a próxima pessoa a mexer apaga o cabeçalho "inútil" e
 * versiona uns `ttf` que o gate de bytes reprova sem dizer por quê.
 *
 * Nada aqui roda no build nem no CI: os dois scripts são de mão (ADR-0002,
 * decisão 7), e os arquivos que eles produzem é que são versionados.
 */

/** Sem User-Agent de navegador moderno, o Google devolve `ttf` em vez de `woff2`. */
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function buscar(url: string): Promise<Response> {
  const resposta = await fetch(url, { headers: { "user-agent": UA } });
  if (!resposta.ok) throw new Error(`${resposta.status} ao buscar ${url}`);
  return resposta;
}

/**
 * O CSS do `css2` para uma consulta já montada — tudo depois do `?`.
 *
 * A consulta fica com quem chama porque é ela que diz o que o script quer: a
 * lista de famílias da marca com `display=swap`, ou uma família só de fallback.
 */
export async function cssDoGoogle(consulta: string): Promise<string> {
  return (await buscar(`https://fonts.googleapis.com/css2?${consulta}`)).text();
}

/** A `url()` do `woff2` dentro de um bloco de `@font-face` devolvido pelo `css2`. */
export function urlDoWoff2(bloco: string): string | undefined {
  return /url\((https[^)]+)\)/.exec(bloco)?.[1];
}

/** Os bytes de um `woff2`, prontos para o disco ou para o fontkit. */
export async function baixarWoff2(url: string): Promise<Buffer> {
  return Buffer.from(await (await buscar(url)).arrayBuffer());
}
