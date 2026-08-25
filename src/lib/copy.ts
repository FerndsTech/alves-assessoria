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

export const ADVOGADOS = {
  /**
   * A âncora da seção, e o destino do segundo botão do herói.
   *
   * `#advogados` **não estava** na lista de fragmentos do spec #23 — a lista
   * nomeia `#confira-seu-beneficio`, as quatro cidades e `#<slug-do-advogado>`,
   * e nenhuma âncora de seção para Advogados. O #25 entregou o botão apontando
   * para cá mesmo assim, e o ticket desta seção era o lugar natural de decidir.
   * Decidido: **`#advogados` é fixado**, e a lista do spec ganha mais uma
   * entrada. É a saída mais simples, e a seção precisaria de âncora de qualquer
   * forma para o botão do herói fazer sentido.
   */
  ancora: "advogados",

  /**
   * Requisito do título: nomear a seção e nada mais.
   *
   * Uma linha de apoio dizendo quantos advogados ou quantas unidades existem
   * seria afirmação sobre **tamanho e estrutura** do escritório, que é o que o
   * Prov. 205 art. 6º veda ao anúncio. A seção responde *"e quem resolve isso?"*
   * mostrando as pessoas — não contando-as.
   */
  titulo: "Advogados",

  /**
   * A afordância de clique é **texto visível de ação**, e não só o cursor: mão
   * de cursor não existe em celular, que é o aparelho de praticamente todo o
   * público.
   *
   * O nome entra no rótulo acessível — visível só para leitor de tela — porque
   * seis links dizendo "Ver perfil" soam idênticos para quem navega pulando de
   * link em link.
   */
  acaoDoCard: "Ver perfil",

  /**
   * O disclosure da vitrine. **Três cards, e "ver mais" abre os seis** — grade,
   * nunca carrossel.
   *
   * Sem número no rótulo pelo mesmo motivo do título: "ver os seis advogados"
   * afirma o tamanho do escritório.
   */
  verMais: "Ver mais advogados",
  verMenos: "Ver menos",
} as const;

/**
 * **O bloco de CTA de quatro elementos:** botão · texto de assunto · horário
 * visível · alternativa de telefone (#9, "o que este ticket entrega ao layout").
 *
 * Aparece **exatamente duas vezes** no site — fim de *Advogados* e rodapé. Uma
 * terceira aparição foi derrubada duas vezes, no #17 e no #22.
 */
export const CTA = {
  /**
   * Requisito, e é fato do cliente pendente do #16: o número que atende o
   * escritório. Este é fictício, em E.164 sem formatação, que é o que o `wa.me`
   * consome.
   *
   * Por que aqui e não derivado de um advogado: este botão fala **pelo
   * escritório**, e mandar quem clicou nele para o WhatsApp pessoal de uma das
   * seis pessoas rotularia o número de alguém como se fosse o do escritório —
   * exatamente a informação falsa que o Prov. 205 art. 1º, §1º veda. O número do
   * advogado é do painel, onde ele é o número **daquela** pessoa.
   */
  whatsapp: "5588999900000",

  /**
   * O **texto de assunto** desta seção. Uma string só: é o que aparece na tela
   * *e* o que o `wa.me` pré-preenche, para que o visitante veja exatamente o que
   * vai mandar antes de sair do site.
   *
   * Regra de redação (#9, decisão 4, herdada do #2): **primeira pessoa**, o
   * visitante falando de si. É essa gramática que mantém o texto do lado
   * informativo — sem oferecimento de serviço (CED art. 46, p.ú.), sem incitar
   * ao litígio (Prov. 205 art. 3º, §1º) e sem menção a gratuidade.
   *
   * **Sem código embutido**: nada de advogado, origem ou identificador. O
   * `wa.me` sugere em vez de enviar, e um `[ADV-03]` na tela de um aposentado
   * parece rastreamento e é apagado. O texto por assunto já é, ele próprio, a
   * impressão digital de origem que a secretária lê.
   *
   * O catálogo completo dos quatro textos é do #19; este é o desta seção.
   */
  assunto:
    "Olá. Vi um desconto no meu benefício do INSS que eu não reconheço e queria entender o que fazer.",

  /**
   * O verbo é **"Falar"**, nunca "Agendar": agendar ergue barreira alta para
   * quem ainda não sabe se tem um problema.
   */
  botao: "Falar com o escritório",

  /**
   * Publicado estático, e não calculado em JS. Rótulo dinâmico ("estamos
   * fechados agora") precisa acertar fuso, feriado, recesso e o dia em que a
   * secretária faltou — e rótulo que mente é pior que rótulo nenhum.
   *
   * Publicar horário é expressamente permitido: CED art. 44, §1º lista "horário
   * de atendimento" entre as informações admitidas.
   */
  horario: "Seg a sex, 08h às 16h · atendimento presencial mediante hora marcada",

  /**
   * O quarto elemento — a alternativa para quem não usa WhatsApp, que neste
   * público é **telefone** e nunca e-mail.
   *
   * `null` porque o elemento é **condicional e o fato não existe ainda**: o #9,
   * decisão 7, deixou a regra escrita (telefone local por cidade se houver quem
   * atenda nas quatro praças; senão, um número único) e o fato que a resolve é a
   * questão do #16. Quatro números tocando em salas vazias são piores que
   * nenhum.
   *
   * Quando o fato chegar, isto vira string e o bloco ganha a quarta linha sem
   * que nenhum template mude.
   */
  telefone: null as string | null,
} as const;

/**
 * O link de WhatsApp, montado num lugar só.
 *
 * `wa.me` e nada mais: o site é 100% estático, não há backend e não há coleta —
 * quem envia é o visitante, do próprio aparelho, pelo app dele.
 */
export function linkDeWhatsapp(numero: string, assunto: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(assunto)}`;
}
