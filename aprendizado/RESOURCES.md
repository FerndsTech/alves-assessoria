# Recursos: o fluxo ideia → ship

## Conhecimento

- **[Dicionário do Fluxo](https://claude.ai/code/artifact/a587a9b3-47e3-48c0-9160-ee92ec9a2635)** (artifact)
  Os 42 termos do fluxo, cada um em linguagem natural e em linguagem técnica, com analogia e o
  termo vizinho de que se confunde. Busca, filtro por família e modo flashcard.
  Use para: destravar quando uma palavra aparecer numa skill e não fizer sentido.

- **[Manual das Skills](https://claude.ai/code/artifact/7d49c3d2-6c6d-4078-b67a-757abf92df7b)** (artifact)
  O que uma skill é por dentro, quem pode invocá-la, bússola interativa de decisão, higiene de
  contexto em detalhe e o que simplificar quer dizer. Use para: operar, não para consultar termo.

- **Skill `to-spec` — `~/.claude/skills/to-spec/SKILL.md`** (local)
  A definição autoritativa do que é um spec neste fluxo: o template de sete seções,
  a proibição de caminho de arquivo e trecho de código, e a regra de que não há
  entrevista — só síntese. Use para: qualquer dúvida sobre o que entra num spec.

- **Skill `to-tickets` — `~/.claude/skills/to-tickets/SKILL.md`** (local)
  Define o consumidor do spec: como ele vira fatias verticais ("tracer bullets"),
  o que são arestas de bloqueio, e o padrão expand–contract para refactor amplo.
  Use para: entender o que o spec precisa entregar para ser fatiável.

- **Skill `wayfinder` — `~/.claude/skills/wayfinder/SKILL.md`** (local)
  O que produz o material bruto do spec. Mapa, tickets, névoa, fora de escopo.
  Use para: entender de onde vêm as decisões que o spec vai registrar.

- **Skill `ask-vini` — `~/.claude/skills/ask-vini/SKILL.md`** (local)
  O mapa de todas as skills e como elas se conectam: fluxo principal, rampas de
  entrada, vocabulário por baixo. Use para: "qual skill uso agora?".

- **[AI Hero — Smart Zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**
  A janela (~120k tokens) dentro da qual o modelo ainda raciocina bem. É a razão
  técnica de o fluxo mandar limpar contexto entre etapas. Use para: entender por que
  a higiene de contexto não é superstição.

## Sabedoria (comunidades)

- **[AI Hero](https://www.aihero.dev/)** — material do autor destas skills (Matt Pocock).
  Use para: ver o método sendo aplicado por quem o desenhou.

- **[r/ClaudeAI](https://reddit.com/r/ClaudeAI)** — comunidade ativa sobre uso de agentes.
  Use para: comparar o seu fluxo com o de outros, e detectar quando você está
  cerimoniando à toa.

> Preferência de comunidade ainda não declarada pelo Murilo. Perguntar antes de
> insistir em participação.

## Gaps

- **Nenhum exemplo de spec real e bom** à mão. O template diz a forma, não mostra
  a substância. Buscar ou construir um exemplar antes da lição sobre *julgar* um spec.
- **Nada sobre quando o fluxo é exagero.** Todo método tem um piso abaixo do qual
  custa mais do que entrega. O `ask-vini` diz "não é multi-sessão? vá direto ao
  `/implement`", mas não ensina a reconhecer o limiar.
