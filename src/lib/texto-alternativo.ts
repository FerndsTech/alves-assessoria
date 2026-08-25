/**
 * O texto alternativo de toda imagem do site, **num lugar só**.
 *
 * Nenhuma das duas content collections tem campo de texto alternativo, e isso é
 * decisão, não esquecimento (ADR-0004, decisão 6). O `alt` de um retrato é
 * inteiramente determinado por quem está nele: seis strings livres divergiriam
 * em tom sem que nada as reconciliasse. Mesmo raciocínio que o spec já aplicou
 * a `dias` — *a prosa é montada no template, num lugar só*.
 *
 * Consequência: quem for acrescentar imagem ao site acrescenta uma função
 * aqui. Se a imagem não couber em nenhuma delas, o que falta não é um campo na
 * collection — é uma decisão sobre o que aquela imagem carrega.
 */

/**
 * A foto de fachada é **decorativa**: o que ela carrega — onde o escritório
 * fica — está em texto ao lado dela, nos blocos de unidade. `alt=""` é a forma
 * correta e é o que passa na regra `image-alt`.
 */
export const ALT_DA_FACHADA = "";

/**
 * A logo **não** é decorativa: ela contém o nome do escritório em texto, e
 * quem não vê a imagem perde uma informação que quem vê recebe. O `alt` carrega
 * o nome e nada mais — nem "logo", nem "logotipo de", que o leitor de tela já
 * anuncia sozinho ao encontrar uma imagem.
 */
export function altDaLogo(nomeDoEscritorio: string): string {
  return nomeDoEscritorio;
}

/** O retrato do advogado, montado a partir do `nome` da collection. */
export function altDoRetrato(nome: string): string {
  return `Retrato de ${nome}`;
}
