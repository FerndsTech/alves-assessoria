# Alves Assessoria — one-pager

Site de um escritório de direito bancário no Ceará, especializado em fraude bancária contra beneficiários do INSS. **One-pager estático, num único URL, zero rota além da raiz.**

O que decide o quê:

- **[Spec #23](https://github.com/FerndsTech/alves-assessoria/issues/23)** — o esqueleto inteiro, as sete seções e sua ordem.
- **[`docs/adr/`](docs/adr/)** — as decisões que não se reabrem sem ticket: site único responsivo, stack e orçamento, direção visual, gate de acessibilidade.
- **[`docs/brand/brief-de-marca.md`](docs/brand/brief-de-marca.md)** — fonte da verdade dos tokens de cor e tipografia.
- **[`docs/convencao-de-placeholders.md`](docs/convencao-de-placeholders.md)** — como fotos, logo e copy que ainda não existem entram no site.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Constrói o site estático em `dist/` |
| `npm run check` | Verificação de tipos do site e dos testes |
| `npm test` | **A costura** — ver abaixo |
| `npm run placeholders` | Regera os placeholders rasterizados a partir dos SVGs de origem |

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
