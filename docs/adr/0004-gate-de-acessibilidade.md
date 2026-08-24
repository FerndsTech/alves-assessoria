# ADR-0004 — Gate de acessibilidade no CI

- **Status:** ✅ **Aceito.**
- **Data:** 24/08/2026
- **Decisor:** Murilo (FerndsTech)
- **Emenda:** a decisão **5** do [ADR-0002](0002-stack-e-orcamento-de-performance.md) — que listava dois portões e passa a listar três
- **Ticket de origem:** [Gate de acessibilidade no CI: existe, bloqueia ou informa, e cobre o que (#24)](https://github.com/FerndsTech/alves-assessoria/issues/24)
- **Spec afetado:** [Spec: one-pager do escritório de direito bancário (#23)](https://github.com/FerndsTech/alves-assessoria/issues/23), seções _Testing Decisions_ e _Acessibilidade_

---

## Contexto

O projeto tinha gate de bytes bloqueante e Lighthouse informativo no CI, e **nenhuma verificação de acessibilidade**. O buraco foi o único que o spec [#23](https://github.com/FerndsTech/alves-assessoria/issues/23) encontrou e não pôde fechar sozinho, porque fechá-lo é decisão, não redação.

Três fatos moldaram a decisão mais do que o argumento genérico de "acessibilidade é importante":

**1. O repositório está vazio de código.** Sem `package.json`, sem `.github/`. Não existe pipeline no qual enfiar um gate depois — o CI inteiro nasce junto com a primeira fatia vertical. Decidido agora, o harness nasce uma vez com o gate dentro; decidido depois, alguém mexe no arranjo do qual **todos** os testes dependem.

**2. A mecânica de foco do painel já estava coberta à mão.** O spec já afirma, como teste de comportamento, foco preso dentro, foco de volta ao card de origem, fundo inerte e trava de rolagem. Isso reenquadra o que a verificação automática acrescenta: **não** é mecânica de foco — é o que humano nenhum reconfere toda vez. Nome acessível do diálogo, `alt` de imagem, ordem de cabeçalhos, rótulo de link, e **os pares de cor que nasceram do [#21](https://github.com/FerndsTech/alves-assessoria/issues/21) e nunca passaram pelo brief de marca**. Ninguém vai reabrir a planilha de 26 pares a cada ajuste de sombra em rampa.

**3. O público é o argumento, e já estava medido.** **81% dos usuários de internet de 60+ não usam computador**, e a operação por intermediário — filho ou neto agindo em nome do beneficiário — é fluxo real, **17%** no indicador G6, a maior taxa de qualquer faixa. Leitor de tela, ampliação e navegação por teclado não são hipótese aqui.

Do outro lado da balança, o modo de falha que o próprio [ADR-0002](0002-stack-e-orcamento-de-performance.md) nomeou: **gate que reprova por ruído ou por cosmética é gate que se aprende a contornar**, e isso é pior que não ter gate, por dar sensação falsa de cobertura. A decisão abaixo responde a esse medo recortando o **conjunto de regras**, não afrouxando a severidade.

---

## Decisão

### 1. Existe um terceiro portão mecânico

A decisão 5 do ADR-0002 listava dois: **bytes bloqueiam** (medição determinística), **Lighthouse informa** (runner compartilhado é ruidoso). Entra o terceiro:

> **Acessibilidade bloqueia.**

O critério do ADR-0002 é determinismo, e o axe cai do lado determinístico: **mesmo HTML, mesmas violações**, sem CPU no meio. Não há o ruído que empurrou o Lighthouse para o lado informativo.

### 2. Roda dentro da costura que já existe — não se abre uma segunda

`axe-core` injetado na sessão de navegador sem interface que a costura do spec já abre sobre o site construído. Mesmo build, mesmo servidor estático, mesma sessão.

**Não se abre uma segunda costura para acessibilidade.** O spec já decidiu costura única de propósito — duas listas de asserções sobre as mesmas decisões divergem —, e o mesmo raciocínio vale aqui.

### 3. Bloqueia por tag WCAG A/AA, com opt-in nomeado

- **Conjunto de regras:** as tags WCAG de nível A e AA (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`).
- **`best-practice` fica de fora por padrão**, com uma **lista curta e nomeada** de regras que o projeto opta por incluir. Candidatas: ordem de cabeçalhos e nome acessível do diálogo. **Os ids exatos e a tag de cada uma se conferem contra a tabela de regras do `axe-core` na montagem do harness** — a fronteira entre `wcag2aa` e `best-practice` no axe não bate um-a-um com a intuição, e chutar aqui produziria um gate que não cobre o que se pensa que cobre.
- Qualquer `violation` dentro desse conjunto **reprova o merge**.

**Por que recortar por tag e não por severidade.** Filtrar por `serious`/`critical` parece mais tolerante e é pior: a severidade do axe não é a mesma coisa que nível WCAG, e há falha de conformidade AA classificada abaixo de `serious`. Recortar por tag deixa de fora o que é cosmético **sem** deixar passar falha AA real. Severidade não tem essa propriedade.

### 4. `incomplete` reprova, com lista de exceções justificadas

O axe tem **três baldes**, não dois: além de `violations` e `passes`, existe `incomplete` — regras que rodaram e **não conseguiram julgar**.

Isso incide exatamente onde dói neste projeto. `color-contrast` devolve _incomplete_ quando o fundo não é cor sólida, e **o herói é texto sobre foto de fachada com véu escuro em CSS** ([#21](https://github.com/FerndsTech/alves-assessoria/issues/21)). O par de contraste mais crítico da página — o do elemento de **LCP** — é justamente o que o axe não vai julgar. Num gate que só olhasse `violations`, o herói passaria **por omissão**, e ninguém veria que não foi julgado.

Então:

- **`incomplete` conta como falha**, por padrão.
- Cada caso conhecido entra numa **lista de exceções**, e cada entrada exige **justificativa escrita e o par de cor conferido à mão**.
- **Primeira entrada da lista: o herói.**

**Custo assumido:** todo estado novo com texto sobre imagem exige uma entrada na lista. É o preço de tornar visível o que a máquina não julgou, em vez de deixar passar em silêncio.

### 5. Cobertura: quatro estados, um advogado representativo

| Estado                            | Por que é estado próprio                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repouso, acima do ponto de quebra | O caso base                                                                                                                                         |
| Repouso, abaixo do ponto de quebra | **DOM genuinamente diferente**: o SVG do mapa fica invisível, a tabela de autoconsulta colapsa em cinco elementos nativos                          |
| Painel aberto, desktop            | Tela inteira dividida ao meio, sem véu — o único estado do site que **não existe no HTML entregue**                                                |
| Painel aberto, mobile             | Geometria diferente: deslizante em tela cheia, WhatsApp fixo no pé fora da rolagem                                                                  |

**Um advogado representativo, não os seis.** Varrer os seis afirmaria a mesma marcação seis vezes: testaria o **dado**, e o dado já tem o portão do Zod.

**Estados deliberadamente fora:** JavaScript desligado não acrescenta — o spec já garante que nada nasce transparente e que o preloader não existe no HTML entregue, então a árvore em repouso é a mesma. `prefers-reduced-motion` também não muda a árvore, só o movimento.

### 6. `alt` derivado no template, sem campo novo

Nenhuma das duas collections tem campo de texto alternativo — `foto: z.string()` e `fachada: image().optional()`. Como `image-alt` é `wcag2a` e reprova, isso precisava de destino antes do primeiro card existir.

- **O retrato recebe `alt` montado a partir do `nome`, no template, num lugar só.** Mesmo raciocínio que o spec já aplicou a `dias`: _"a prosa é montada no template, num lugar só"_. O alt de um retrato é inteiramente determinado por quem está nele; seis strings livres divergiriam em tom sem que nada as reconciliasse.
- **A fachada, decorativa ao lado do endereço em texto, leva `alt=""`** — a forma correta, e que passa no `image-alt`.

**Nem o [#7](https://github.com/FerndsTech/alves-assessoria/issues/7) nem o [#10](https://github.com/FerndsTech/alves-assessoria/issues/10) reabrem.** Nenhum schema muda.

### 7. Lista manual pré-publicação — o que a máquina não pega

Verificação automática pega da ordem de **30–40%** das barreiras reais. O resto entra na **conferência manual que o ADR-0002 já criou** (decisão 5, _"manual, antes de publicar"_) e que o [ADR-0003](0003-orcamento-folgado-para-profundidade.md) ampliou com a medição em Android real. **Nenhum ritual novo** — mesmo momento, mesmo aparelho.

A lista é **fechada e curta**, porque lista longa não se cumpre:

1. **Ampliação a 200% e reflow a 400%.** O maior buraco estrutural: WCAG 1.4.4 e 1.4.10 **não têm regra automática** no axe, e num público 60+ são provavelmente a barreira mais frequente do site inteiro. Nenhum ajuste de gate fecha isto.
2. **Tabulação ponta a ponta**, conferindo que a ordem de foco acompanha a ordem visual e que nada fica inalcançável.
3. **Uma passada de leitor de tela com o painel aberto.**
4. **O par de contraste do herói** — a exceção `incomplete` da decisão 4.

### 8. Alvo declarado: WCAG 2.2 nível AA, com a fronteira escrita

O projeto declara **WCAG 2.2 nível AA**, e escreve ao lado **quem verifica o quê**:

| Faixa                                                    | Quem verifica                                                     |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| Regras A/AA automatizáveis, nos 4 estados                | Gate bloqueante no CI                                             |
| Contraste dos 26 pares do brief                          | Verificado uma vez, no [brief de marca](https://github.com/FerndsTech/alves-assessoria/issues/5) |
| Contraste sobre imagem (herói)                           | Lista de exceções `incomplete` + conferência manual               |
| Ampliação, reflow, ordem de tabulação, leitor de tela    | Lista manual pré-publicação                                       |
| **Semântica errada que passa em regra nenhuma**          | **Ninguém, de forma recorrente.** Fica escrito.                   |

O ADR-0001 chamou de armadilha _"termo sem critério de verificação no projeto"_. **Declarar AA escapa da armadilha pela ressalva, não pelo silêncio** — a última linha da tabela é o que separa um alvo declarado de uma promessa.

---

## Consequências

**O CI ganha um portão que pode reprovar por algo que ninguém quebrou de propósito.** É o desenho pretendido — sobretudo na linha de contraste, onde a direção de profundidade do ADR-0003 (camada, sombra em rampa, véu) produz pares de cor novos fora do brief. O gate é a única coisa que os olha.

**A lista de exceções `incomplete` é dívida que cresce.** Cada texto sobre imagem que aparecer depois exige uma entrada com par conferido à mão. Se a lista passar de meia dúzia de entradas, o sinal a ler não é "afrouxar o gate" — é que o tratamento visual está pondo texto sobre imagem em lugares demais.

**Não se compra conformidade com isto.** 30–40% das barreiras, mais quatro itens manuais conferidos raramente. Um site com suíte verde e lista manual cumprida ainda pode ter semântica errada de ponta a ponta. Isso está na tabela da decisão 8 exatamente para não virar surpresa.

---

## Nota normativa — não conferida

A **LBI (Lei 13.146/2015), art. 63** aparentemente torna acessibilidade de sítio obrigação legal para empresas com sede no país, remetendo às _"melhores práticas e diretrizes de acessibilidade adotadas internacionalmente"_ — que é como a lei brasileira aponta para a WCAG sem citá-la.

**Isto está registrado como fato a conferir em fonte primária, não como fato conferido.** Se confirmado, muda a natureza da decisão 8: declarar AA deixa de ser aspiração de qualidade e vira enquadramento, e um escritório de advocacia publicando site inacessível passa a ser problema de outra ordem.

**Não muda nenhuma decisão deste ADR** — AA já foi declarado e a lista manual já existe. Confirmá-la só reforçaria o porquê. Por isso ficou como névoa no [mapa](https://github.com/FerndsTech/alves-assessoria/issues/1), junto das outras lacunas normativas, e não como ticket: ticket que não destrava nada é ruído na fronteira.
