# Limites da OAB para a publicidade deste site

Resolve o ticket [Limites da OAB para a publicidade deste site](https://github.com/FerndsTech/alves-assessoria/issues/2).

## Fontes primárias

Toda regra abaixo sai de um destes três textos. Nenhuma conclusão vem de blog ou de resumo de terceiro.

| Fonte | O que é |
| --- | --- |
| **CED** — Código de Ética e Disciplina da OAB, Resolução 02/2015, Capítulo VIII (arts. 39 a 47) | Norma deontológica vigente. Substituiu o CED de 1995, cujo capítulo de publicidade era outro (arts. 28 a 34) — cuidado com material desatualizado na internet |
| **Prov. 205** — Provimento 205/2021 do CFOAB + **Anexo Único** | Regulamenta a publicidade para a era digital. Revogou o Provimento 94/2000 (art. 12). Em vigor; não localizei revogação ou alteração posterior |
| **EAOAB** — Lei 8.906/94 (Estatuto da Advocacia) | Base legal. Art. 34 lista as infrações disciplinares; art. 3º-A define notória especialização |

O Anexo Único é parte integrante do Provimento (art. 11) e é onde estão os critérios práticos por canal — chatbot, Google Ads, WhatsApp, cartão de visitas.

---

## Quadro de vereditos

| # | Questão | Veredito |
| --- | --- | --- |
| 1 | Número de inscrição na OAB no card | **Obrigatório** |
| 2 | Barras/notas de "skills" e "habilidades" | **Não pode** — áreas de atuação, sim, com condição |
| 3 | Botão de WhatsApp direto por advogado | **Pode**, com condição sobre a mensagem |
| 4 | Ferramenta de autoconsulta de benefício | **Pode como guia e triagem; não pode como veredito automatizado** |
| 5 | Advogado fictício com número de OAB inventado | **Não publicar** — há caminho legítimo alternativo |
| 6 | Vedações gerais | Atingem em cheio 6 elementos comuns de site "premium" |

---

## 1. Número de inscrição na OAB — obrigatório

**Dispositivo.** CED art. 44, caput: *"Na publicidade profissional que promover ou nos cartões e material de escritório de que se utilizar, o advogado fará constar seu nome ou o da sociedade de advogados, o número ou os números de inscrição na OAB."*

Que o site conta como publicidade profissional está em CED art. 46, caput: *"A publicidade veiculada pela internet ou por outros meios eletrônicos deverá observar as diretrizes estabelecidas neste capítulo."*

**Veredito: obrigatório.** Não é enfeite de credibilidade — é requisito normativo. O campo `oab` no modelo de dados do advogado não é opcional.

**Condições.** Prov. 205 art. 1º, §1º: as informações devem ser *"objetivas e verdadeiras"*. O §2º impõe o dever de comprovar a veracidade quando a OAB solicitar, sob pena do art. 34, XVI, do EAOAB.

**Nota sobre a sociedade.** O art. 44 admite o nome da sociedade e o número dela. Na prática, para este site: cada card exibe o número do próprio advogado, e o rodapé exibe o número da sociedade.

---

## 2. "Skills" e "habilidades" — não na forma que você desenhou

**Dispositivo central.** CED art. 44, §1º: *"Poderão ser referidos **apenas** os títulos acadêmicos do advogado e as distinções honoríficas relacionadas à vida profissional, bem como as instituições jurídicas de que faça parte, e as especialidades a que se dedicar, o endereço, e-mail, site, página eletrônica, QR code, logotipo e a fotografia do escritório, o horário de atendimento e os idiomas em que o cliente poderá ser atendido."*

O "apenas" torna a lista **taxativa**. Barra de proficiência, nota, estrela, percentual e selo não estão nela.

**Reforço.** Prov. 205 art. 3º, IV veda *"utilização de orações ou expressões persuasivas, de autoengrandecimento ou de comparação"*. Uma barra dizendo "Direito Bancário 95%" é, ao mesmo tempo, autoengrandecimento e comparação implícita com os outros cinco advogados da mesma página. O art. 3º, §1º fecha: *"sendo vedada a promoção pessoal"*.

**Veredito.**

| Elemento | Pode? |
| --- | --- |
| Barra de proficiência, nota, percentual, estrelas | **Não** |
| Selo de "top", "expert", "referência" | **Não** |
| Lista de **áreas de atuação** em texto | **Sim**, com a condição abaixo |
| Títulos acadêmicos (LL.M., mestrado, especialização) | **Sim**, se verdadeiros e comprováveis |
| Instituições jurídicas de que faça parte (IBDFAM, comissões da OAB) | **Sim** |
| Idiomas de atendimento e horário | **Sim** |

**A condição sobre áreas de atuação.** Prov. 205 art. 3º, III veda *"anúncio de especialidades para as quais não possua título certificado ou notória especialização, nos termos do parágrafo único do art. 3º-A do Estatuto"*. O art. 3º-A, p.ú., define notória especialização por conceito no campo, desempenho anterior, estudos, publicações e equipe.

Tradução para o spec: escrever **"Atua em: revisional de consignado, cartão RMC, seguro prestamista"**. Não escrever **"Especialista em Direito Bancário"** sem título que sustente.

**Fotos do advogado: pode.** Aqui há uma armadilha. CED art. 44, §2º veda fotografias pessoais — mas *"nos cartões de visitas do advogado"*, e só ali. Para os demais meios, Prov. 205 art. 5º, §2º é expresso: *"É permitida a utilização de logomarca e imagens, inclusive fotos dos(as) advogados(as) e do escritório, assim como a identidade visual nos meios de comunicação profissional"*. A seção de advogados com foto está liberada. Vedado, no mesmo dispositivo, usar logo e símbolos oficiais da OAB.

---

## 3. WhatsApp direto por advogado — pode

**Dispositivo.** Prov. 205 art. 4º, §3º: *"Para os fins do previsto no inciso V do art. 40 do Código de Ética e Disciplina, equiparam-se ao e-mail, todos os dados de contato e meios de comunicação do escritório ou advogado(a), inclusive os endereços dos sites, das redes sociais e os **aplicativos de mensagens instantâneas**, podendo também constar o logotipo, desde que em caráter informativo, respeitados os critérios de sobriedade e discrição."*

**Veredito: pode**, inclusive um número por advogado. O WhatsApp é dado de contato, como o e-mail.

**A condição está na mensagem, não no botão.** Duas normas limitam o texto pré-preenchido do link `wa.me`:

- CED art. 46, p.ú.: telefonia e internet podem veicular publicidade *"desde que estas não impliquem o oferecimento de serviços ou representem forma de captação de clientela"*.
- Prov. 205 art. 3º, §1º: a publicidade deve informar *"sem incitar diretamente ao litígio judicial, administrativo ou à contratação de serviços"*.

| Mensagem pré-preenchida | Veredito |
| --- | --- |
| "Olá, gostaria de tirar uma dúvida sobre um desconto no meu benefício." | Pode — informativa, quem inicia é o visitante |
| "Quero processar o banco e recuperar meu dinheiro." | Não — incita ao litígio |
| "Quero minha análise gratuita." | Não — gratuidade é vedada (item 6) |

**O que continua proibido.** Mala direta e disparo em massa: CED art. 40, VI veda *"a utilização de mala direta, a distribuição de panfletos ou formas assemelhadas de publicidade, com o intuito de captação de clientela"*, e o Anexo Único ("Correspondências e comunicados") diz que o envio a uma coletividade *"é expressamente vedado"*. Grupos de WhatsApp só *"de pessoas determinadas, das relações do(a) advogado(a)"*.

Conclusão para o spec: o WhatsApp é canal **passivo** — o visitante clica. Nunca de saída.

---

## 4. Autoconsulta de benefício — a linha passa por quem decide

Esta é a questão mais fina, e o Anexo Único traz dois itens que puxam para lados opostos.

**O que libera — item "Chatbot":** *"Permitida a utilização para o fim de facilitar a comunicação ou melhorar a prestação de serviços jurídicos, não podendo afastar a pessoalidade da prestação do serviço jurídico, nem suprimir a imagem, o poder decisório e as responsabilidades do profissional. É possível, por exemplo, a utilização no site para responder as primeiras dúvidas de um potencial cliente ou para encaminhar as primeiras informações sobre a atuação do escritório. Ou ainda, como uma solução para coletar dados, informações ou documentos."*

**O que barra — item "Aplicativos para responder consultas jurídicas":** *"Não é admitida a utilização de aplicativos de forma indiscriminada para responder automaticamente consultas jurídicas a não clientes por suprimir a imagem, o poder decisório e as responsabilidades do profissional, representando mercantilização dos serviços jurídicos."*

**A linha divisória é o poder decisório.** Ferramenta que **informa, orienta e coleta** e depois entrega a um humano → permitida. Ferramenta que **decide juridicamente no lugar do advogado** e devolve um veredito a quem não é cliente → vedada.

Somam-se dois limites:

- CED art. 41: textos divulgados *"não deverão induzir o leitor a litigar nem promover, dessa forma, captação de clientela"*.
- CED art. 42, I: é vedado ao advogado *"responder com habitualidade a consulta sobre matéria jurídica, nos meios de comunicação social"*.

**Veredito por formato:**

| Formato | Veredito | Fundamento |
| --- | --- | --- |
| **Guia educativo** — passo a passo de Meu INSS e Registrato, sem coletar dado, sem opinar sobre o caso | **Pode** | Anexo "Chatbot"; conteúdo técnico-informativo |
| **Triagem que coleta dados e encaminha a um advogado**, sem emitir juízo | **Pode, com condição** | Anexo "Chatbot" admite expressamente coletar dados e responder primeiras dúvidas — desde que a decisão fique com o profissional |
| **Wizard que devolve veredito** ("você tem direito", "houve fraude", "provável desconto indevido") | **Não** | Anexo "Aplicativos..."; CED art. 41 (induzir a litigar); CED art. 42, I (consulta habitual) |
| Qualquer variante rotulada como **"análise gratuita"** | **Não** | Prov. 205 art. 3º, I — gratuidade como captação |

**Recomendação para o ticket [Forma da seção de autoconsulta do benefício](https://github.com/FerndsTech/alves-assessoria/issues/8):** guia educativo como espinha, com encaminhamento ao WhatsApp posicionado como *"se depois disso você ainda tiver dúvida"* — nunca como *"descubra se você foi lesado"*. A honestidade de resolver o problema de quem não precisa de advogado, além de boa estratégia, é o que mantém a seção do lado informativo da linha.

---

## 5. Advogado fictício com número de OAB inventado — não publicar

Nenhuma norma da OAB trata de "site de demonstração". A análise abaixo é por extensão, e é o ponto de menor certeza deste documento — mas os riscos são concretos e apontam todos na mesma direção.

**Por que o número inventado é diferente da foto genérica.**

- **Prov. 205 art. 1º, §1º:** as informações *"deverão ser objetivas e verdadeiras"* e são de responsabilidade das pessoas identificadas — e, havendo sociedade, *"dos sócios administradores"*. Quem responde perante a OAB é o escritório, não quem programou o site.
- **Prov. 205 art. 3º, II:** vedada *"divulgação de informações que possam induzir a erro ou causar dano a clientes, a outros(as) advogados(as) ou à sociedade"*. Número de OAB não é espaço livre de nomes: um número inventado dentro da faixa de uma seccional **provavelmente pertence a um advogado real e identificável**. Esse é exatamente o dano a outro advogado que o inciso descreve.
- **CED art. 44** exige o número. Um número falso não cumpre a exigência — a viola.
- **Fora do âmbito disciplinar**, atribuir identidade profissional falsa pode tangenciar o art. 307 do Código Penal (falsa identidade) e, se a pessoa fictícia aparentar exercer a advocacia, o art. 34, I do EAOAB (facilitar o exercício a não inscritos). Registro isto como perímetro externo, não como conclusão firme — depende de dolo e de vantagem, que um portfólio declarado não tem.

**Veredito: não publicar número de OAB inventado, em nenhuma hipótese.** A foto genérica é placeholder; o número é identidade de terceiro.

**Caminhos legítimos, em ordem de segurança:**

1. **Não indexar e não publicar como site do escritório.** Manter a versão fictícia em staging com `noindex`, `robots.txt` bloqueado e, de preferência, atrás de autenticação. Sem publicidade, não há publicidade irregular.
2. **Placeholder que não simula um número real.** Nada de `OAB/SP 123.456`. Usar marcação obviamente vazia — `OAB/UF 000.000` — acompanhada de aviso persistente de que o conteúdo é demonstrativo, com nomes de advogados evidentemente fictícios.
3. **Publicar como estudo de design, sob o seu domínio, sem identificar o escritório real.** Deixa de ser publicidade da advocacia e passa a ser peça de portfólio. É o que melhor atende ao seu objetivo de vitrine.

O combinado de 1 e 3 resolve os dois usos sem conflito: staging fechado enquanto é o site do cliente, portfólio aberto e desidentificado enquanto é a sua vitrine.

---

## 6. Vedações gerais — o que elas custam a um site "premium"

Seis elementos que aparecem por padrão em sites de escritório de ponta e que **não podem entrar**:

| Elemento | Veredito | Dispositivo |
| --- | --- | --- |
| **Promessa de resultado** — "recupere seu dinheiro", "receba de volta" | Não | Prov. 205 art. 6º e p.ú. — vedada *em qualquer publicidade* |
| **Contadores de resultado** — "R$ 4,2 mi recuperados", "1.200 casos ganhos" | Não | Prov. 205 art. 6º (casos concretos) e art. 5º, §3º (apresentação de resultados) |
| **Casos de sucesso / estudos de caso** | Não | Prov. 205 art. 5º, §3º e art. 6º |
| **Depoimentos de clientes, avaliações, logos de clientes** | Não | CED art. 42, IV — vedado *"divulgar ou deixar que sejam divulgadas listas de clientes e demandas"*; Anexo Único, item "Criação de conteúdo": *"sem divulgação de resultados concretos obtidos, clientes, valores ou gratuidade"* |
| **Honorários, gratuidade, desconto, êxito** — "consulta gratuita", "só cobramos se você ganhar" | Não | Prov. 205 art. 3º, I |
| **Superlativos e comparações** — "o melhor", "líder em", "nº 1 da região" | Não | Prov. 205 art. 3º, IV |

Mais três que tocam o projeto de lado:

- **Estrutura física do escritório.** Prov. 205 art. 6º veda, na publicidade ativa, informação sobre *"dimensões, qualidades ou estrutura física do escritório"*, e o p.ú. veda ostentação de bens. Foto do escritório é permitida (CED art. 44, §1º), mas o registro tem de ser sóbrio — não ensaio de imóvel de luxo.
- **Vínculo com outras atividades.** CED art. 40, IV e Prov. 205 art. 8º vedam divulgar advocacia junto com outra atividade. Nada de co-branding com correspondente bancário, financeira ou consultoria.
- **Tráfego pago.** Anexo Único: Google Ads é permitido *"quando responsivo a uma busca iniciada pelo potencial cliente"*, vedado anúncio ostensivo em plataforma de vídeo; impulsionamento em rede social é *"permitido, desde que não se trate de publicidade contendo oferta de serviços jurídicos"*. Prov. 205 art. 5º, §1º veda pagar por ranking ou prêmio.

**O que sobra para construir autoridade.** As vedações eliminam prova social convencional, mas não eliminam substância: áreas de atuação, títulos acadêmicos, instituições de que o advogado participa, idiomas, horário, conteúdo técnico-informativo (permitido pelo Anexo, *"orientado pelo caráter técnico informativo"*), e a própria seção de autoconsulta bem executada. O peso da credibilidade tem de migrar de "veja o que ganhamos" para "veja o quanto entendemos disto".

---

## Efeito imediato sobre o mapa

| Ticket | O que muda |
| --- | --- |
| [Modelo de dados do advogado](https://github.com/FerndsTech/alves-assessoria/issues/7) | `oab` obrigatório; sai o campo de skills com nota; "skills" e "habilidades" colapsam em `areasDeAtuacao` (texto); entram `titulos`, `instituicoes`, `idiomas`, `horario`; foto liberada |
| [Forma da seção de autoconsulta](https://github.com/FerndsTech/alves-assessoria/issues/8) | Wizard com veredito está fora; guia educativo e triagem com encaminhamento humano estão dentro |
| [Estratégia de contato por WhatsApp](https://github.com/FerndsTech/alves-assessoria/issues/9) | Botão por advogado liberado; a decisão desloca-se para o texto da mensagem pré-preenchida; canal só passivo |

---

## Limites desta pesquisa

- Não sou advogado e este documento não é parecer. Antes de publicar, o escritório deve submeter o site à Comissão de Fiscalização da sua seccional — o Prov. 205 art. 10 prevê poder coercitivo dessas comissões, e o CED art. 47 admite consulta ao Tribunal de Ética e Disciplina em caso omisso.
- **Os Tribunais de Ética e Disciplina variam por seccional.** Prov. 205 art. 9º, §2º criou o Comitê Regulador do Marketing Jurídico justamente para pacificar interpretações divergentes — ou seja, a divergência é reconhecida pela própria norma. Com quatro escritórios em quatro cidades, verificar se estão todas na mesma seccional; se não, valem os entendimentos de cada uma.
- O Comitê Regulador pode propor alteração dos critérios do Anexo Único (art. 9º, §1º). O Anexo é a parte mais volátil da norma — reconferir antes de publicar.
- O item 5 (advogado fictício) é o de menor respaldo textual direto, porque nenhuma norma trata de site de demonstração. As conclusões ali são por extensão de princípios.
