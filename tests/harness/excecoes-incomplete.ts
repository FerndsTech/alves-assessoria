/**
 * A lista de exceções de `incomplete` (ADR-0004, decisão 4).
 *
 * O axe tem três baldes, não dois: além de `violations` e `passes`, existe
 * `incomplete` — regras que rodaram e **não conseguiram julgar**. Num gate que
 * só olhasse `violations`, o par de contraste mais crítico da página passaria
 * **por omissão**, e ninguém veria que ele não foi julgado.
 *
 * Então `incomplete` reprova por padrão, e cada caso conhecido entra aqui com
 * **justificativa escrita e o par de cor conferido à mão**.
 *
 * Custo assumido: todo estado novo com texto sobre imagem exige uma entrada.
 * Se a lista passar de meia dúzia de entradas, o sinal a ler não é "afrouxar o
 * gate" — é que o tratamento visual está pondo texto sobre imagem em lugares
 * demais.
 */

import type { Estado } from "./estados";

export type ExcecaoIncomplete = {
  /** O id da regra do axe, exatamente como ele o devolve. */
  regra: string;
  /**
   * O escopo no DOM que a exceção cobre. A cobertura é por ancestralidade
   * (`closest`), não por igualdade de seletor: o seletor que o axe devolve muda
   * quando o CSS muda, e a exceção não deveria.
   */
  escopo: string;
  /** Em que estados a exceção vale. `"todos"` para os quatro. */
  estados: Estado[] | "todos";
  /** Por que o axe não consegue julgar isto. */
  justificativa: string;
  /** O par de cor conferido à mão, com o número. Não "parece ok". */
  parConferido: string;
  /** Quando o par foi conferido, para que a linha envelheça à vista. */
  conferidoEm: string;
};

export const EXCECOES_INCOMPLETE: ExcecaoIncomplete[] = [
  {
    regra: "color-contrast",
    escopo: "#heroi",
    estados: "todos",
    justificativa:
      "O herói é texto sobre a foto de fachada com véu escuro em CSS. O axe devolve " +
      "`incomplete` para `color-contrast` sempre que não consegue resolver o fundo até uma " +
      "cor sólida, e este é justamente o elemento de LCP da página — o par mais crítico do " +
      "site é o que a máquina não julga. São quatro nós: o `h1`, a descrição, e os dois " +
      "botões (que têm preenchimento sólido, mas herdam a incerteza do ancestral). A " +
      "conferência é manual e está na lista pré-publicação do ADR-0004, decisão 7, item 4.",
    parConferido:
      "Texto sobre o véu — pior caso calculado, não estimado. O véu é " +
      "`rgba(20, 23, 28, 0.72)`, e a foto mais clara que pode existir sob ele é branco puro, " +
      "então o fundo composto mais claro possível é rgb(86, 88, 92). `#FFFFFF` sobre " +
      "rgb(86, 88, 92) dá 7.13:1. Como o número é o pior caso, ele vale para qualquer foto " +
      "que entre no lugar do placeholder — o que se confere quando a foto real chegar é o " +
      "véu, não a foto. " +
      "Botões — não dependem do véu, porque têm preenchimento sólido: `#FFFFFF` sobre " +
      "`--accent` `#A82520` dá 7.12:1 no primário, e `--accent` sobre `--surface` `#FFFFFF` " +
      "dá 7.12:1 no secundário (brief de marca, tabela de verificação). " +
      "Os quatro passam AA para qualquer tamanho de texto.",
    conferidoEm: "2026-08-24",
  },
];
