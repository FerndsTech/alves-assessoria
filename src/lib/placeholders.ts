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
