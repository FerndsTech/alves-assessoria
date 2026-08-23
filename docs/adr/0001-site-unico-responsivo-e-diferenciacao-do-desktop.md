# ADR-0001 — Site único responsivo; grau de diferenciação do desktop em aberto

- **Status:** ✅ **Aceito.** ~~🟡 Em aberto — parte decidida, parte a detalhar pelo autor.~~ As seções **A, B e C foram resolvidas em 22/08/2026** pelo [ADR-0002 — Stack e orçamento de performance](0002-stack-e-orcamento-de-performance.md).
- **Data:** 22/08/2026
- **Decisor:** Murilo (FerndsTech)
- **Pesquisa de apoio:** [acesso-a-internet-por-dispositivo-brasil.md](../research/acesso-a-internet-por-dispositivo-brasil.md)

---

## Contexto

A pesquisa de acesso à internet por dispositivo fechada em 21/08/2026 descreveu o público-alvo do site com números de fonte primária (TIC Domicílios 2025 e PNAD Contínua TIC 2025). Os que pesam nesta decisão:

| Dado | Valor | Fonte |
| --- | --- | --- |
| Usuários de internet de 60+ que **não usam computador** | **81%** | TIC 2025, C16A |
| Usuários de internet no Nordeste que usaram **somente celular** | **43,6%** | PNAD 2025, SIDRA 7387 |
| Usuários rurais do Nordeste que usaram **microcomputador** | **5,0%** | PNAD 2025, SIDRA 7343 |
| Idosos que **pedem a outra pessoa** para acessar o gov.br por si | **17%** (maior taxa de qualquer faixa) | TIC 2025, G6 |
| Usuários de celular no Nordeste que **ficaram sem pacote de dados** em 3 meses | **49%** | TIC 2025, J7 |
| Usuários rurais que **não conseguiram usar nenhum aplicativo** depois disso | **24%** | TIC 2025, J8A |

Duas leituras decorrem disso e enquadram a decisão:

1. **O celular não é o dispositivo majoritário — é praticamente o único.** Desktop é minoria estrutural neste público.
2. **Mas existe um usuário de desktop, e ele é específico:** o intermediário (filho, neto, vizinho) que opera em nome do beneficiário. Os 17% do indicador G6 são a evidência de que ele é parte do fluxo real, não exceção.

Sobre indexação, a documentação vigente do Google Search Central (*Mobile site and mobile-first indexing best practices*, últ. atualização 10/12/2025) estabelece que a migração para mobile-first está concluída (31/10/2023; rastreamento exclusivo por Googlebot Smartphone desde 05/07/2024) e que **"Only the content shown on the mobile site is used for indexing."**

---

## Decisão (a parte que já está fechada)

### 1. Um site só, responsivo — não HTML separado por dispositivo

O site será **um único HTML servido a todos os dispositivos**, com o layout se adaptando por CSS. Nada de *dynamic serving* (servidor detectando user-agent), nada de `m.site.com`, nada de rotas `/desktop` e `/mobile`.

Isso já corresponde à prática estabelecida do autor: sites responsivos com **sections que se adaptam no mobile** — mesmo site, mesmas seções, arranjo diferente.

**Por que fica registrado como decisão e não como detalhe:** a documentação do Google afirma que as regras de mobile-first indexing *"only apply to dynamic serving and separate URL configurations"*. Ao escolher responsivo, o projeto sai inteiramente desse regime de risco. É uma escolha de arquitetura difícil de reverter depois, e por isso vale ser explícita.

### 2. Paridade de conteúdo entre as versões — restrição, não preferência

**Apresentação pode divergir entre desktop e mobile. Conteúdo, não.**

Todo conteúdo que existir na visualização desktop precisa existir no HTML entregue ao mobile, ainda que apresentado de outra forma (empilhado, em sanfona, reordenado). Conteúdo presente só no desktop **não é indexado** e não alcança os ~99% do público que está no celular.

Corolário técnico da mesma página de documentação: *"Don't lazy-load primary content upon user interaction. Google won't load content that requires user interactions."* Componentes que buscam conteúdo sob clique (carrossel que faz `fetch` do próximo slide, "carregar mais") deixam esse conteúdo invisível ao rastreador. Componentes cujo conteúdo já está no HTML e que apenas controlam visibilidade via CSS/JS são rastreados normalmente.

Esta não é uma escolha de projeto — é uma condição imposta por como o Google indexa hoje. Fica registrada para não ser reaberta por engano.

---

## ~~O que fica em aberto~~ — **resolvido em 22/08/2026 pelo [ADR-0002](0002-stack-e-orcamento-de-performance.md)**

> ⚠️ **Esta seção não vale mais como pauta aberta.** Ela foi escrita quando A, B e C estavam por detalhar; o texto abaixo fica preservado como registro do estado da discussão em 22/08/2026. **As respostas estão no [ADR-0002](0002-stack-e-orcamento-de-performance.md)**, e cada bloco abaixo aponta para onde.
>
> Uma delas inverte a posição registrada aqui: a seção C dizia que _"otimização será pontuada mais adiante"_. O ADR-0002 decidiu o contrário — **performance é requisito de primeira classe**, e os números saíram na hora. A tensão com o mapa [#1](https://github.com/FerndsTech/alves-assessoria/issues/1) foi resolvida a favor do mapa.

### A. Grau de diferenciação do desktop

> ✅ **Resolvido — [ADR-0002, decisão 9](0002-stack-e-orcamento-de-performance.md).** A diferenciação foi decidida **item a item e na direção aditiva**: layouts próprios de desktop e botões estilizados entram (custo ~0); animação de scroll entra com trava; carrossel cai; preloader vira **intro só de desktop, só na primeira visita**. O papel de "tela do intermediário" não foi assumido — o desktop permanece institucional, com arranjo próprio e conteúdo idêntico.

O autor enxerga o desktop **como uma opção entre "vitrine" e o mobile** — uma posição intermediária ainda não definida. A definir:

- Quanto o desktop se afasta do mobile em riqueza visual, e em quais seções.
- Se o desktop assume o papel de **tela do intermediário** (conteúdo denso: tabelas comparativas, passo a passo longo, documentação de fluxos operados em nome de terceiro), se permanece predominantemente institucional/vitrine, ou se combina os dois por seção.
- Quais seções ganham tratamento distinto e quais permanecem idênticas.

### B. Animações, carrossel e auto-avanço

> ✅ **Resolvido — [ADR-0002, decisões 9, 10 e 11](0002-stack-e-orcamento-de-performance.md).** Técnica: **só `transform` e `opacity`**, nunca propriedade que dispare layout. Carregamento condicional por `matchMedia` fica restrito à intro de desktop. **O carrossel caiu**, e com ele a questão de auto-avanço — **a WCAG 2.2.2 deixa de incidir**, porque não há conteúdo que se mova sozinho. `prefers-reduced-motion` vale **em toda largura de tela** e reduz para fade cruzado, não para corte seco.

Cogitados para o desktop: carrossel e efeito de transição automática. A definir:

- Técnica: CSS puro (`scroll-snap`) ou biblioteca JS.
- Se houver JS, como ele é carregado sem custo para o mobile (import condicional por `matchMedia`, code splitting, ou equivalente).
- Se o auto-avanço permanece. **Ponto levantado e não resolvido:** conteúdo que se move sozinho por mais de 5 s exige mecanismo de pausa pela WCAG 2.2.2 (*Pause, Stop, Hide*), e o tratamento de `prefers-reduced-motion: reduce` precisa ser definido junto.

### C. Orçamento de performance

> ✅ **Resolvido, e com inversão de posição — [ADR-0002, decisões 0 a 6](0002-stack-e-orcamento-de-performance.md).** Stack: **Astro**, com build step, `dist/` versionado. Metas: LCP ≤ 2,5 s, CLS ≤ 0,10, TBT ≤ 200 ms, score ≥ 90, em Lighthouse mobile Slow 4G. Orçamento: JS 15 KB, fontes 100 KB, total 1 MB, entre outras sete linhas. Hospedagem: **Cloudflare Pages** (PoP em Fortaleza). Gate: **bytes bloqueiam o PR**, Lighthouse informa. Contra a intermitência de conexão: `immutable` nos assets com hash mais **service worker mínimo**.
>
> A frase abaixo — _"otimização será pontuada mais adiante"_ — **foi superada**. O parágrafo fica como registro do que se pensava antes.

**Posição do autor, registrada como tal:** otimização será pontuada mais adiante; o risco de um site rico compensa quando feito em meio-termo entre qualidade estética e desempenho, e as técnicas de otimização necessárias já são de domínio do time — de modo que um site bonito *e* rápido é considerado alcançável para este público. O detalhamento fica para depois.

A definir quando o tema for retomado:

- Números concretos de orçamento (peso da primeira renderização, teto de JS, política de fontes e imagens) e se viram *gate* de CI ou meta informal.
- Escolha de stack de renderização à luz desses números.
- Como o orçamento se relaciona com o dado de intermitência de conexão (49% no Nordeste ficando sem pacote; 24% dos usuários rurais sem conseguir abrir nenhum aplicativo depois disso) — o modo de falha relevante aqui é **indisponibilidade**, não lentidão.

---

## Consequências

**Do que já foi decidido:**

- O projeto fica fora do regime de risco de mobile-first indexing. Não haverá divergência de índice entre versões.
- Revisões de conteúdo passam a ter um critério objetivo de aceite: *este bloco existe no HTML entregue ao celular?*
- Componentes que carregam conteúdo primário sob interação ficam vedados enquanto este ADR valer.

**~~Do que ficou em aberto~~ — resolvido em 22/08/2026:**

- ~~O ADR **não** autoriza nem veda animações, carrossel ou auto-avanço.~~ O [ADR-0002](0002-stack-e-orcamento-de-performance.md) **autoriza animação restrita a `transform`/`opacity`** e **veda o carrossel**. Decisões pontuais sobre isso passam a ter respaldo documentado.
- ~~Sem os números de C, "otimizado" permanece um termo sem critério de verificação no projeto.~~ **Os números existem.** "Otimizado", neste projeto, passa a significar sete linhas de orçamento de bytes e quatro limiares de Lighthouse — e o gate de bytes torna a afirmação verificável a cada PR.

---

## Revisitar quando

- ~~O autor detalhar qualquer um dos pontos A, B ou C~~ — **cumprido em 22/08/2026**: A, B e C viraram o [ADR-0002](0002-stack-e-orcamento-de-performance.md), conforme previsto aqui. Revisões futuras desses temas vão para lá, não para cá.
- Sair nova edição da TIC Domicílios (anual; a de 2025 foi apresentada em 09/12/2025) ou da PNAD Contínua TIC (a de 2025 saiu em 02/07/2026), alterando os números que sustentam o contexto.
- O Google alterar a página *Mobile site and mobile-first indexing best practices* (últ. atualização registrada: 10/12/2025).

---

## Referências

- [Pesquisa: acesso à internet por dispositivo no Brasil](../research/acesso-a-internet-por-dispositivo-brasil.md) — números, universos e limites
- [Google Search Central — Mobile site and mobile-first indexing best practices](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)
- [WCAG 2.2 — 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
