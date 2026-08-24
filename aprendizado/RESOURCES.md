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

## Conhecimento — Astro (a stack do site)

- **[Astro em Duas Linguagens](https://claude.ai/code/artifact/9783dfde-6410-4ffc-8efc-91e0f0ede719)** (artifact)
  Os 15 termos do Astro em linguagem natural e técnica, os diagramas da fronteira build/navegador,
  simulador das diretivas `client:*`, mapa mental do projeto e rota de quatro sessões.
  Use para: entender *por que* o Astro cabe no orçamento do ADR-0002, não só *como* se usa.

- **[Referência: Astro, consulta rápida](./reference/astro-consulta-rapida.html)** (local, imprime bem)
  Anatomia de um `.astro`, estrutura de pastas, tabela das seis diretivas, os cinco pares que se
  confundem e o mapeamento exigência-do-ADR → recurso-do-Astro.
  Use para: ter ao lado do editor enquanto escreve.

- **[Astro Docs — Components](https://docs.astro.build/en/basics/astro-components/)**
  A fonte da frase que resolve a dúvida original: *"HTML-only templating components with no
  client-side runtime… They don't render on the client."*
  Use para: qualquer dúvida sobre o que o frontmatter faz e o que ele não faz.

- **[Astro Docs — Islands](https://docs.astro.build/en/concepts/islands/)**
  Ilha de cliente × ilha de servidor, hidratação parcial/seletiva, e o exemplo de duas ilhas
  hidratando em paralelo. Use para: decidir se algo precisa mesmo ser ilha (quase nunca precisa).

- **[Astro Docs — Directives reference](https://docs.astro.build/en/reference/directives-reference/)**
  As seis diretivas com prioridade, caso de uso e semântica exata de carregamento, incluindo
  `timeout` do `client:idle` e `rootMargin` do `client:visible`.
  Use para: o "segundo plano" que o Murilo perguntou — está tudo aqui, e é opt-in.

- **[Astro Docs — Client-side scripts](https://docs.astro.build/en/guides/client-side-scripts/)**
  O que o Astro faz com um `<script>` num `.astro`: vira módulo, empacota imports, deduplica,
  embute se for pequeno. Use para: entender o JavaScript que este projeto de fato vai escrever.

- **[Astro Docs — Images](https://docs.astro.build/en/guides/images/)**
  `<Image />`, `<Picture />`, AVIF/WebP, `srcset`, `lazy`/`async` por padrão, e a diferença
  crítica entre `src/` e `public/`. Use para: a maior linha variável do orçamento de bytes.

- **[Jason Miller — Islands Architecture](https://jasonformat.com/islands-architecture/)**
  A origem do padrão, cunhado por Katie Sylor-Miller (Etsy, 2019). Explica o problema que a
  hidratação total das SPAs cria. Use para: entender de onde vem a ideia, não só a API.

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
- **Nenhuma comunidade de Astro mapeada.** O Discord oficial e o r/astrojs existem, mas a
  preferência do Murilo sobre participar de comunidade continua não declarada. Perguntar antes
  de sugerir.
- **Nada sobre o gate de bytes.** O ADR-0002 exige um script que confira o tamanho do `dist/`
  contra a tabela e bloqueie o PR. Isso não vem do Astro e ainda não tem fonte nem exemplar.

- **Nada sobre quando o fluxo é exagero.** Todo método tem um piso abaixo do qual
  custa mais do que entrega. O `ask-vini` diz "não é multi-sessão? vá direto ao
  `/implement`", mas não ensina a reconhecer o limiar.
