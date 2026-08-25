import fachadaDoHeroi from "../assets/placeholders/fachada-do-heroi.jpg";
import logoHorizontal from "../assets/placeholders/logo-horizontal.svg";

/**
 * Os placeholders de produção externa, **num lugar só**, com o requisito escrito
 * ao lado de cada um. A convenção completa está em
 * `docs/convencao-de-placeholders.md`; aqui ficam os valores.
 *
 * Trocar placeholder por asset real é trocar o `import` acima e apagar a linha
 * de requisito — nunca mexer no template.
 */

export const PLACEHOLDERS = {
  /**
   * Requisito: foto da fachada de uma das quatro unidades, 16:9, teto de 400 KB
   * comprimidos (ADR-0003 — é a linha da imagem de LCP), entregue em raster.
   *
   * O placeholder é gerado por `npm run placeholders` a partir do SVG irmão, e
   * é raster pelo mesmo motivo que a foto real será: o Chromium descarta do LCP
   * imagem abaixo de 0,05 bit por pixel, e um placeholder vetorial faria o `h1`
   * virar o elemento de LCP — o site mediria uma coisa hoje e outra depois.
   *
   * Vedação que recai sobre esta foto: Prov. 205 art. 6º — o enquadramento não
   * pode afirmar sobre tamanho, estrutura ou ostentação do escritório.
   */
  fachadaDoHeroi,
  /**
   * Requisito: versão **horizontal** da logo (a empilhada é do rodapé), SVG com
   * traçados vetoriais e sem texto convertido em imagem, só nas três cores do
   * brief. Área de respiro mínima igual à altura da inicial.
   */
  logoHorizontal,
} as const;

/**
 * Requisito do retrato: **3:4**, cor natural dessaturada ~10% e **sem filtro em
 * CSS** — o tratamento entra na geração, então trocar por foto real é trocar
 * arquivo. Teto de 120 KB comprimidos por foto (ADR-0003).
 *
 * O enquadramento é o mesmo nos seis, e é ele que faz a grade parecer uma grade:
 * topo da cabeça a 8% da altura, olhos na linha de um terço, corpo nos 75%
 * centrais, e **zona segura central** para que qualquer recorte — o 4:5 do card,
 * o 3:4 do painel — continue enquadrando o rosto.
 *
 * **Uma foto só por advogado.** Duas quebrariam o FLIP do painel (#30), que só é
 * honesto porque é literalmente a mesma imagem que cresce.
 */
const RETRATOS = import.meta.glob<ImageMetadata>("../assets/placeholders/retrato-*.jpg", {
  eager: true,
  import: "default",
});

/**
 * O retrato de um advogado, a partir do **nome do arquivo** que a collection
 * guarda em `foto`.
 *
 * Por que um registro e não `foto: image()` no schema: nenhum template contém o
 * caminho de um asset (convenção de placeholder), e o campo é `z.string()` no
 * contrato que veio do #7. O `import.meta.glob` é o que mantém as duas coisas
 * verdadeiras ao mesmo tempo — o dado nomeia um arquivo, e um lugar só sabe onde
 * arquivos moram.
 *
 * Nome que não existe **quebra o build**, e é para quebrar: um advogado sem
 * retrato renderizaria um buraco onde deveria estar o rosto de uma pessoa, e o
 * contrato já diz que `foto` é obrigatório e sem fallback.
 */
export function retratoDe(foto: string): ImageMetadata {
  const encontrado = RETRATOS[`../assets/placeholders/${foto}`];
  if (encontrado === undefined) {
    const disponiveis = Object.keys(RETRATOS)
      .map((caminho) => caminho.split("/").pop())
      .join(", ");
    throw new Error(
      `Nenhum retrato chamado "${foto}" em src/assets/placeholders/. Disponíveis: ` +
        `${disponiveis}. O campo \`foto\` da collection guarda o nome do arquivo, e ` +
        `trocar a foto de um advogado é trocar o arquivo ou trocar esta string.`,
    );
  }
  return encontrado;
}
