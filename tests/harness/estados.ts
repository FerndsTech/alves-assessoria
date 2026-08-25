import type { TestInfo } from "@playwright/test";

/**
 * Os quatro estados que o gate de acessibilidade varre, com os nomes que o
 * ADR-0004, decisão 5, lhes dá.
 *
 * São uma união fechada e não `string` de propósito: a lista de exceções de
 * `incomplete` é indexada por estado, e um estado escrito com um typo casaria
 * com exceção nenhuma — o gate passaria por acidente, que é exatamente o modo
 * de falha que o ADR-0004 existe para não ter.
 *
 * A distinção entre os dois estados de repouso é **DOM genuinamente diferente**,
 * não a mesma página numa janela menor: abaixo do ponto de quebra o SVG do mapa
 * fica invisível e a tabela de autoconsulta colapsa em cinco elementos nativos.
 * Daí os nomes serem sobre o ponto de quebra e não sobre o aparelho.
 */
export const ESTADOS = [
  "repouso, acima do ponto de quebra",
  "repouso, abaixo do ponto de quebra",
  "painel aberto, acima do ponto de quebra",
  "painel aberto, abaixo do ponto de quebra",
] as const;

export type Estado = (typeof ESTADOS)[number];

/** Os projetos do Playwright que varrem um estado, e qual estado cada um varre. */
const REPOUSO_POR_PROJETO: Record<string, Estado> = {
  desktop: "repouso, acima do ponto de quebra",
  celular: "repouso, abaixo do ponto de quebra",
};

/**
 * O estado de repouso que este projeto varre.
 *
 * Os dois estados de painel aberto chegam junto com o painel do advogado; até
 * lá, pedir o estado de repouso de um projeto que não varre nenhum é erro, e
 * não um estado inventado na hora.
 */
export function estadoDeRepouso(info: TestInfo): Estado {
  const estado = REPOUSO_POR_PROJETO[info.project.name];
  if (estado === undefined) {
    throw new Error(
      `O projeto "${info.project.name}" não tem estado de repouso declarado em ` +
        `tests/harness/estados.ts. Todo estado que o gate varre precisa de nome — ` +
        `é por ele que a lista de exceções de incomplete casa.`,
    );
  }
  return estado;
}
