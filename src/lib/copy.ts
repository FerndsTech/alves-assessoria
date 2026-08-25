/**
 * Copy de **placeholder**. A copy real é produção externa (#19), e entra aqui
 * trocando string — nunca mexendo no template.
 *
 * Todo elemento que renderiza copy daqui leva `data-placeholder="copy"` no HTML,
 * para que o portão de lançamento tenha o que contar. É o mesmo raciocínio do
 * `oab.numero === "000.000"`: a ficção **se deriva do dado**, e o gate é
 * mecânico em vez de disciplina.
 */

/**
 * Requisito: a razão social é fato do cliente e ainda não foi conferida — este
 * é o nome pelo qual o projeto se refere ao escritório enquanto isso.
 */
export const NOME_DO_ESCRITORIO = "Alves Assessoria";

export const HEROI = {
  /**
   * Requisito da frase de efeito: nomear o problema pelo nome que ele tem no
   * contracheque do visitante, não pelo nome que ele tem no processo. Nada
   * sobre tamanho, estrutura ou ostentação do escritório (Prov. 205 art. 6º).
   */
  fraseDeEfeito: "Um desconto que você não reconhece no seu benefício",

  /**
   * Requisito da descrição do serviço: dizer o recorte técnico em uma frase, e
   * dizer o que o visitante ganha antes de qualquer contato. Sem promessa de
   * resultado (CED art. 44, §1º).
   */
  descricao:
    "Fraude bancária contra quem recebe do INSS, no Ceará. Aqui você aprende a achar o desconto no seu próprio extrato e decide sozinho se precisa de um advogado.",

  /**
   * O herói **roteia, não converte**: os dois botões são internos, e nenhum
   * deles é WhatsApp. Os destinos são as duas perguntas que o visitante tem
   * nesta ordem — *"o que é isso no meu contracheque?"* e *"quem resolve?"*.
   */
  botoes: [
    { texto: "Confira seu benefício", destino: "#confira-seu-beneficio" },
    { texto: "Conheça os advogados", destino: "#advogados" },
  ],
} as const;
