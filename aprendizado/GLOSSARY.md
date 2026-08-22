# Glossário: o fluxo ideia → ship

A linguagem canônica deste workspace. Um termo só entra aqui depois que o Murilo
**demonstrou** usá-lo corretamente — não quando foi apresentado a ele.

## Wayfinder

**Mapa**:
A issue única que indexa um esforço grande e nebuloso, com destino, decisões tomadas,
névoa e fora de escopo. É índice, não depósito — cada decisão mora no seu ticket.
_Evitar_: Board, backlog, épico

**Destino**:
O que este esforço está buscando alcançar — o spec, a decisão ou a mudança. Fixa o
escopo, e por isso é a primeira coisa que se decide.
_Evitar_: Objetivo, meta, visão

**Névoa**:
Questão que dá para pressentir mas ainda não dá para enunciar com precisão. Mora na
seção "Ainda não especificado" do mapa e gradua para ticket quando fica formulável.
_Evitar_: Backlog futuro, ideias, pendências

**Ticket**:
Uma issue filha do mapa que resolve **uma** decisão, dimensionada para caber numa
sessão. O teste contra névoa é conseguir enunciar a pergunta, não respondê-la.
_Evitar_: Tarefa, card, item

**Fronteira**:
Os tickets abertos, sem bloqueador e sem responsável — a borda do que já se conhece.
É o conjunto de onde a próxima sessão escolhe.
_Evitar_: To-do, próximos, disponíveis

**Reivindicar**:
Atribuir o ticket a si antes de qualquer trabalho, para que sessões paralelas o pulem.
A atribuição **é** a reivindicação: ticket aberto e sem responsável está livre.
_Evitar_: Pegar, assumir, alocar

**Fora de escopo**:
Trabalho conscientemente colocado além do destino. Nunca gradua — só volta se o
destino for redesenhado, e aí como esforço novo.
_Evitar_: Depois, versão 2, adiado

---

## A entrar

Termos apresentados na [Lição 01](./lessons/0001-o-que-e-um-spec.html) e desenvolvidos por
inteiro no [Dicionário do Fluxo](https://claude.ai/code/artifact/a587a9b3-47e3-48c0-9160-ee92ec9a2635)
— cada um em linguagem natural e técnica, com analogia e o termo vizinho de que se confunde.
Ainda sem evidência de uso correto. Promover para cima quando o Murilo os usar bem numa conversa real:

- **Spec** — o documento de sete seções que registra decisões, não instruções
- **Tracer bullet** — fatia vertical que atravessa todas as camadas e é demonstrável só
- **Aresta de bloqueio** — a declaração de que um ticket precisa de outro antes de começar
- **Smart zone** — a janela de contexto dentro da qual o modelo ainda raciocina bem
- **Blast radius** — quantos lugares quebram de uma vez; é o que escolhe entre fatia e expand–contract
- **Profundidade / seam / alavancagem / localidade** — o vocabulário de forma do código
- **Higiene de contexto** — o que fica junto numa janela e onde se corta
