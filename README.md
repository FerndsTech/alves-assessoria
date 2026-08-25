# Alves Assessoria — one-pager

Site de um escritório de direito bancário no Ceará, especializado em fraude bancária contra beneficiários do INSS. **One-pager estático, num único URL, zero rota além da raiz.**

O que decide o quê:

- **[Spec #23](https://github.com/FerndsTech/alves-assessoria/issues/23)** — o esqueleto inteiro, as sete seções e sua ordem.
- **[`docs/adr/`](docs/adr/)** — as decisões que não se reabrem sem ticket: site único responsivo, stack e orçamento, direção visual, gate de acessibilidade.
- **[`docs/brand/brief-de-marca.md`](docs/brand/brief-de-marca.md)** — fonte da verdade dos tokens de cor e tipografia.
- **[`docs/convencao-de-placeholders.md`](docs/convencao-de-placeholders.md)** — como fotos, logo e copy que ainda não existem entram no site.
- **[`scripts/orcamento/tabela.ts`](scripts/orcamento/tabela.ts)** — a tabela do orçamento e os limiares de Core Web Vitals, no único lugar onde vivem em forma que a máquina lê.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Constrói o site estático em `dist/` |
| `npm run check` | Verificação de tipos do site e dos testes |
| `npm test` | **A costura** — ver abaixo |
| `npm run orcamento` | **O gate de bytes** — mede o `dist/` contra a tabela e reprova ao estourar |
| `npm run farol` | Lighthouse sobre o site construído, informativo, nunca reprova |
| `npm run placeholders` | Regera os placeholders rasterizados a partir dos SVGs de origem |
| `npm run fontes` | Baixa de novo os `woff2` da marca e regera `src/styles/fontes.css` |
| `npm run metricas-de-fonte` | Recalcula os números do `@font-face` de fallback |

## A costura

Existe **uma costura de teste**, e ela é a mais alta que este projeto tem: **construir o site, servir a saída estática e dirigir um navegador sem interface contra ela**. É literalmente o artefato que o visitante recebe.

Ela é única de propósito. Parsear o HTML por fora seria uma segunda lista de asserções sobre as mesmas decisões, e duas listas divergem — então não há testes de componente, e não há uma segunda costura para acessibilidade.

`npm test` é o comando, **o mesmo no local e no CI**: `globalSetup` constrói, o `webServer` serve o `dist/` recém-construído, e os testes rodam contra ele em três recortes — acima do ponto de quebra, abaixo dele, e com o JavaScript desligado.

### O gate de acessibilidade

O `axe-core` é injetado **na sessão que a costura já abre** e **bloqueia o merge** ([ADR-0004](docs/adr/0004-gate-de-acessibilidade.md)):

- Recorte por **tag WCAG A/AA**, nunca por severidade — há falha AA classificada abaixo de `serious`.
- `best-practice` fora por padrão, com uma lista curta e nomeada de opt-in em `tests/harness/axe.ts`. Os ids e as tags são **conferidos contra a tabela de regras do axe** na montagem do harness, não deduzidos.
- Qualquer `violation` reprova. **`incomplete` também reprova** — o axe rodou a regra e não conseguiu julgar, e num gate que só olhasse `violations` isso passaria por omissão.
- As exceções de `incomplete` vivem em `tests/harness/excecoes-incomplete.ts`, cada uma com justificativa escrita e o par de cor conferido à mão. A primeira é o contraste do herói, que é texto sobre imagem.

Se essa lista passar de meia dúzia de entradas, o sinal a ler não é *"afrouxar o gate"* — é que o tratamento visual está pondo texto sobre imagem em lugares demais.

### O que a máquina não pega

Verificação automática pega da ordem de 30–40% das barreiras reais. O resto está na lista manual pré-publicação do [ADR-0004](docs/adr/0004-gate-de-acessibilidade.md), decisão 7: ampliação a 200% e reflow a 400%, tabulação ponta a ponta, uma passada de leitor de tela, e o par de contraste do herói.

## Os três portões

Bytes bloqueiam, acessibilidade bloqueia, Lighthouse informa ([ADR-0002](docs/adr/0002-stack-e-orcamento-de-performance.md), decisão 5, emendada pelo [ADR-0004](docs/adr/0004-gate-de-acessibilidade.md)). O critério que separa os dois lados é **determinismo**, não importância: o que dá o mesmo número no mesmo commit pode reprovar um merge; o que varia com a CPU do runner, não — gate que falha por ruído é gate que se aprende a ignorar, e isso é pior que nenhum, por dar sensação falsa de cobertura.

### O gate de bytes — `npm run orcamento`

Mede **bytes transferidos, comprimidos**. Peso em disco não interessa: o que se cobra é o que o pacote de dados do visitante paga.

- **Os números vivem num arquivo só**, [`scripts/orcamento/tabela.ts`](scripts/orcamento/tabela.ts). O ADR-0003 é o registro da decisão que os fixou; nem este README nem o CI repetem número nenhum daqui.
- **Comprimido em brotli** o que a rede comprime — HTML, CSS, JS, SVG. **Cru** o que já vem comprimido: `woff2`, `webp`, `avif`, `jpg`.
- **De um conjunto responsivo conta a maior variante, nunca a soma.** Três larguras de uma foto ocupam três arquivos e custam uma ao visitante; somar as três mediria um site que ninguém recebe.
- **Duas linhas são sobre papel, não sobre formato** — a imagem do LCP e a foto de advogado. Elas se marcam no template com `data-orcamento="lcp"` e `data-orcamento="foto-de-advogado"`, porque nenhuma regra de extensão distingue uma fachada de um retrato, e adivinhar produziria um gate que mede a linha errada em silêncio.
- **O relatório imprime o número de cada linha**, não só passa/falha, e no CI ele vai para o resumo do job. Um PR que triplica o CSS sem estourar o teto passa — e tem de dar para ver isso sem rodar nada à mão.

A régua tem teste próprio (`tests/orcamento.spec.ts`, projeto `orcamento`). **Não é uma segunda costura sobre o site**: não abre navegador e não afirma nada sobre a página. Testa o instrumento, porque um gate que fica verde por medir a coisa errada é o único modo de falha que um gate não pode ter.

**Uma conservadoria conhecida:** a linha de fontes conta todo `woff2` publicado, inclusive o subconjunto `latin-ext`, que uma visita em português nunca baixa — o `unicode-range` a impede. Se um dia a linha estourar por isso, a decisão visível é cortar o `latin-ext`, e é exatamente esse o efeito que o orçamento existe para produzir.

### O farol — `npm run farol`

Lighthouse em preset mobile, Slow 4G simulado e CPU 4×, reportando LCP, CLS, TBT e score. **Nunca reprova** — o script sai sempre com 0, e se um dia reprovar é bug dele. INP fica fora por ser métrica exclusivamente de campo: o CrUX nunca terá amostra deste site, e o TBT é o proxy de laboratório dela.

### A cópia construída

O `dist/` é **versionado**, e não ignorado ([ADR-0002](docs/adr/0002-stack-e-orcamento-de-performance.md), decisão 1): build step traz apodrecimento de dependência, e daqui a alguns anos `npm install` neste projeto pode não rodar. A cópia é o seguro de que existe sempre uma versão que abre sem Node.

Quem a atualiza é o CI, no master, **depois** dos gates — cópia velha é pior que nenhuma, porque parece boa. No dia a dia isso significa que `npm test` deixa o `dist/` sujo na árvore de trabalho; é esperado.

## As fontes

Auto-hospedadas em `public/fontes/`, subconjuntos `latin` e `latin-ext` (brief de marca, seção Carregamento). Três faces: Spectral 600 e Source Sans 3 em 400 e 600 — que o Google serve como **um arquivo variável por subconjunto**, e não como dois.

- `src/styles/fontes.css` é **gerado** por `npm run fontes` e não se edita à mão: as faixas de `unicode-range` são o que decide qual subconjunto o navegador baixa.
- **`preload` só do Spectral 600 `latin`.** É caminho crítico e linha própria do orçamento; o português cabe inteiro na primeira faixa.
- Os `@font-face` de **fallback** ficam em `global.css`, com `size-adjust` e os três `*-override` calculados por `npm run metricas-de-fonte` a partir dos `woff2` reais. São o que impede a troca de fonte de gerar CLS — **o único número que o ADR-0003 se recusou a afrouxar**. São dois fallbacks por família porque `size-adjust` corrige largura e depende de qual fonte o aparelho tem: Georgia e Arial no Windows e no macOS, Noto Serif e Roboto no Android, que é o aparelho de 99% deste público.
