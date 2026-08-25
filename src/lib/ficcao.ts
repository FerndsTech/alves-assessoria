import { OAB_FICTICIA } from "./esquemas";

/**
 * **A ficção se deriva do dado, e nunca se armazena em paralelo.**
 *
 * Um campo `ficticio` ao lado do resto seria um segundo lugar que pode discordar
 * do primeiro — e dois lugares que discordam acabam mentindo justamente no dia
 * do lançamento, que é o único dia em que a resposta importa. O sinal é o
 * próprio `oab.numero === "000.000"`: o número que a OAB nunca emite.
 *
 * Quem lê isto:
 *
 * - **os templates**, para marcar o HTML entregue com `data-placeholder`, que é
 *   o que o portão de lançamento (#29) consegue contar sem abrir o repositório;
 * - **o portão de lançamento**, que reprova o deploy público enquanto existir um
 *   advogado com OAB fictícia.
 *
 * Trocar um advogado fictício por um real é trocar as strings do arquivo. A
 * marcação some sozinha — ninguém precisa lembrar de apagá-la.
 */
export function eFicticio(oab: { numero: string }): boolean {
  return oab.numero === OAB_FICTICIA;
}

/**
 * O valor de `data-placeholder` de um elemento que renderiza conteúdo de
 * advogado, ou `undefined` quando a pessoa é real.
 *
 * `undefined` e não `""`: o Astro omite o atributo inteiro, e um
 * `data-placeholder=""` no HTML entregue contaria como marcação de ficção.
 */
export function marcaDePlaceholder(
  oab: { numero: string },
  tipo: "asset" | "copy",
): "asset" | "copy" | undefined {
  return eFicticio(oab) ? tipo : undefined;
}
