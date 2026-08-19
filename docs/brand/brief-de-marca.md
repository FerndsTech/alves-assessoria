# Brief de marca e tokens

Resolve o ticket [Brief de marca: paleta, tipografia e tom](https://github.com/FerndsTech/alves-assessoria/issues/5).

Este documento é a **fonte da verdade** dos tokens. O [specimen visual](https://claude.ai/code/artifact/33526667-cfae-4af3-b0c3-5d3579d7a793) publicado à parte serve para julgar cor e tipografia com os olhos; os valores canônicos são os daqui.

## Decisões tomadas

| Questão | Decisão |
| --- | --- |
| Ordem paleta ↔ logo | **A paleta manda.** Os valores abaixo entram como restrição no redesenho da logo, não o contrário |
| Público prioritário | **Equilíbrio** — corpo 17px/1.6, contraste AA, revelação no scroll, duas colunas em desktop |
| Vermelho | **Contido** — `#A82520` no tema claro, `#E4635E` no escuro |
| Tipografia | **Spectral** (títulos) + **Source Sans 3** (texto) |
| Tratamento | **"você"** — o mesmo do Meu INSS e do gov.br |

---

## Paleta

Neutros com viés frio (azulado), para acompanhar o vermelho contido. Nenhum cinza puro — todos carregam o viés.

| Token | Claro | Escuro | Papel |
| --- | --- | --- | --- |
| `--bg` | `#F7F8FA` | `#101318` | Fundo da página |
| `--surface` | `#FFFFFF` | `#181C23` | Cartão, painel do advogado |
| `--ink` | `#14171C` | `#E7EBF1` | Texto corrido |
| `--muted` | `#5A6270` | `#98A1B0` | Texto secundário, legendas |
| `--rule` | `#DDE1E7` | `#282E38` | Divisor **decorativo** |
| `--border` | `#8590A0` | `#5E6877` | Contorno de **componente** (campo, botão) |
| `--accent` | `#A82520` | `#E4635E` | Marca: links, botão primário, filetes |
| `--accent-soft` | `#FBEDEC` | `#26191A` | Fundo de destaque da marca |
| `--on-accent` | `#FFFFFF` | `#101318` | Texto sobre preenchimento de marca |
| `--caution` | `#8A5300` | `#E3A648` | Atenção |
| `--caution-soft` | `#FDF3E3` | `#2B2113` | Fundo de atenção |
| `--ok` | `#1E6B45` | `#63BE90` | Confirmação |
| `--ok-soft` | `#E8F4ED` | `#142A20` | Fundo de confirmação |

### `--rule` e `--border` são tokens diferentes, de propósito

O critério da WCAG 1.4.11 exige **3:1** para contorno de componente de interface — campo de formulário, botão de contorno, checkbox. Um divisor entre parágrafos é decoração e **não** tem essa exigência.

Juntar os dois num token só força a escolha entre um divisor pesado demais e um campo de formulário ilegal. Por isso são dois: `--rule` é fino e discreto (1.24:1 no claro — e está correto assim), `--border` passa em 3:1 contra fundo e superfície.

### O vermelho é identidade, nunca é prejuízo

Regra dura do design system, e ela não é estética.

O site fala com alguém que descobriu que some dinheiro do benefício. Vermelho, para essa pessoa, já é a cor do extrato ruim. Se a marca for vermelha **e** o valor negativo for vermelho **e** o alerta for vermelho, a página inteira lê como ameaça.

- `--accent` é usado em: logo, links, botão primário, filetes estruturais, títulos de seção.
- `--accent` **nunca** é usado em: valor negativo, mensagem de erro, aviso de risco, contador de prejuízo.
- Alerta e erro usam `--caution`. Confirmação usa `--ok`. Nenhum dos dois é a cor da marca.

---

## Tipografia

**Spectral** nos títulos — serifada desenhada para tela, não uma serifada de papel adaptada. **Source Sans 3** no texto corrido.

Três arquivos no total: Spectral 600, Source Sans 3 400 e 600. Nada além disso sem justificativa.

### Escala

| Papel | Tamanho | Entrelinha | Fonte |
| --- | --- | --- | --- |
| `h1` | 52px | 1.10 | Spectral 600 |
| `h2` | 36px | 1.15 | Spectral 600 |
| `h3` | 28px | 1.20 | Spectral 600 |
| `h4` | 23px | 1.30 | Spectral 600 |
| `lead` | 19px | 1.55 | Source Sans 400 |
| `body` | 17px | 1.60 | Source Sans 400 |
| `small` | 15px | 1.50 | Source Sans 400 |
| `micro` | 13px | 1.40 | Source Sans 600, `letter-spacing: 0.08em`, caixa alta |

Em telas abaixo de 640px, `h1` cai para 36px e `h2` para 28px. O corpo **não** encolhe — 17px é o piso, em qualquer largura.

**Medida de linha:** máximo 68 caracteres no texto corrido. Acima disso o olho perde a linha de retorno, e esse público perde mais rápido.

### Carregamento

O `h1` é quase certamente o elemento de LCP, e ele usa Spectral. Isso torna o carregamento da fonte um problema de performance, não de estética.

- **Auto-hospedar** os `woff2`, subconjunto `latin` + `latin-ext`. Evita a conexão a um terceiro no caminho crítico.
- **`preload`** apenas do Spectral 600. As demais carregam normalmente.
- **`font-display: swap`** em todas.
- Declarar `@font-face` de fallback com `size-adjust` casando as métricas, para que a troca não gere CLS.

---

## Espaçamento e ritmo

Escala de 4px: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`. Nenhum valor fora dela.

- Espaçamento vertical entre seções: 96px em desktop, 64px em mobile.
- Alvo de toque: **44px** mínimo em qualquer elemento clicável.
- Raio de canto: 4px em componentes, 8px em cartões. Nada mais arredondado — arredondamento alto puxa para linguagem de aplicativo de consumo.

### Movimento

A revelação no scroll foi escolhida, com duas condições que não são negociáveis:

1. Animar **apenas** `opacity` e `transform`. Nunca altura, nunca `margin` — isso gera CLS e a performance é requisito de primeira classe aqui.
2. Respeitar `prefers-reduced-motion: reduce`, revelando o conteúdo instantaneamente. Parte relevante do público tem sensibilidade vestibular.

---

## Voz

Tratamento por **"você"**. É o que o público já lê no Meu INSS e no gov.br, e evita a concordância de gênero que degradaria o texto em `o(a) senhor(a)`.

### Como o site soa

| | |
| --- | --- |
| **É** | direto, calmo, concreto. Frase curta. Explica antes de propor |
| **Não é** | jurídico-formal, urgente, alarmista, nem publicitário |

Escreva **"Se aparece um desconto que você não reconhece"**, não *"Vítima de fraude bancária? Aja agora!"*.

### Limites que vêm da OAB

Vindos de [Limites da OAB para a publicidade deste site](https://github.com/FerndsTech/alves-assessoria/issues/2) — não são preferência de estilo, são vedação normativa:

- Sem promessa de resultado. Nada de "recupere seu dinheiro".
- Sem menção a honorários, gratuidade ou desconto. **"Consulta gratuita" é proibido.**
- Sem superlativo nem comparação. Nada de "o melhor", "líder".
- Sem incitar ao litígio. O texto informa; quem decide agir é o visitante.

### Vocabulário

Usar a palavra que o público usa, não a do processo.

| Escreva | Não escreva |
| --- | --- |
| desconto no seu benefício | débito em folha de pagamento de benefício |
| empréstimo que você não fez | contratação fraudulenta |
| cartão com desconto na aposentadoria | RMC / RCC |
| conferir seu extrato | consultar histórico consignatário |

Os termos técnicos (RMC, RCC, consignado) podem **aparecer explicados**, nunca como rótulo principal.

---

## Brief da logo

O que quem for redesenhar recebe. O desenho em si está fora deste mapa.

### Restrições

| Item | Exigência |
| --- | --- |
| Formato | SVG com traçados vetoriais, sem texto convertido em imagem |
| Cor | Só `#A82520`, `#14171C` e `#F7F8FA`. Sem gradiente, sem sombra |
| Monocromática | Versão em uma cor só que sobreviva a fax, carimbo e impressão a laser |
| Fundo escuro | Versão que funcione sobre `#101318`, usando `#E4635E` no lugar do vermelho claro |
| Favicon | Legível a 16×16px. Se o símbolo completo não sobreviver, entregar uma marca reduzida |
| Área de respiro | Mínimo igual à altura da inicial, em todos os lados |
| Proporção | Versão horizontal (cabeçalho) e versão empilhada (rodapé, redes) |

### O que a marca precisa comunicar

Solidez e permanência. O cliente está entregando a um desconhecido um problema de dinheiro que ele não entende. A marca tem de parecer algo que existe há tempo e que continuará existindo.

### Vedação normativa

**Não pode usar logotipo, brasão ou símbolos oficiais da OAB.** Provimento 205/2021, art. 5º, §2º, parte final.

---

## Verificação de contraste

Cada par abaixo foi calculado, não estimado. **26 de 26 passam.**

| Par | Claro | Escuro | Mínimo |
| --- | --- | --- | --- |
| `ink` sobre `bg` | 16.90:1 | 15.55:1 | 4.5 |
| `ink` sobre `surface` | 17.96:1 | 14.28:1 | 4.5 |
| `muted` sobre `bg` | 5.79:1 | 7.14:1 | 4.5 |
| `accent` sobre `bg` | 6.70:1 | 5.53:1 | 4.5 |
| `accent` sobre `surface` | 7.12:1 | 5.08:1 | 4.5 |
| `accent` sobre `accent-soft` | 6.25:1 | 5.05:1 | 4.5 |
| `on-accent` sobre `accent` | 7.12:1 | 5.53:1 | 4.5 |
| `caution` sobre `bg` | 5.96:1 | 8.70:1 | 4.5 |
| `caution` sobre `caution-soft` | 5.76:1 | 7.38:1 | 4.5 |
| `ok` sobre `bg` | 6.09:1 | 8.24:1 | 4.5 |
| `ok` sobre `ok-soft` | 5.73:1 | 6.73:1 | 4.5 |
| `border` sobre `bg` | 3.04:1 | 3.30:1 | 3.0 |
| `border` sobre `surface` | 3.23:1 | 3.03:1 | 3.0 |

Foco visível usa `--accent` com contorno de 2px e deslocamento de 2px — 6.70:1 no claro e 5.53:1 no escuro, bem acima dos 3:1 exigidos.

---

## O que este brief não decide

- **Se existe tema escuro no site.** Os tokens estão definidos e verificados de qualquer forma; se o site sair só claro, a metade escura fica sem uso e sem custo.
- **Fotografia.** Tratamento, enquadramento e peso das fotos dos advogados pertencem ao [Modelo de dados do advogado](https://github.com/FerndsTech/alves-assessoria/issues/7).
- **Layout.** Onde cada token é aplicado é decisão de outras sessões; aqui só existe o vocabulário.
