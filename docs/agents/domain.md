# Documentos de domínio

Como as skills de engenharia devem consumir a documentação de domínio deste repositório ao explorar o código.

## Antes de explorar, leia estes

- **`CONTEXT.md`** na raiz do repositório, ou
- **`CONTEXT-MAP.md`** na raiz, se existir — ele aponta para um `CONTEXT.md` por contexto. Leia cada um que for relevante ao tema.
- **`docs/adr/`** — leia os ADRs que tocam a área em que você está prestes a trabalhar. Em repositórios multi-contexto, verifique também `src/<context>/docs/adr/` para decisões restritas a um contexto.

Se algum desses arquivos não existir, **siga em silêncio**. Não sinalize a ausência; não sugira criá-los de antemão. A skill `/domain-modeling` (alcançada via `/grill-with-docs` e `/improve-codebase-architecture`) os cria de forma preguiçosa, quando termos ou decisões de fato surgirem.

## Estrutura de arquivos

Repositório de contexto único (a maioria dos repositórios):

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

Repositório multi-contexto (indicado pela presença de `CONTEXT-MAP.md` na raiz):

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← decisões que valem para todo o sistema
└── src/
    ├── ordering/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← decisões específicas do contexto
    └── billing/
        ├── CONTEXT.md
        └── docs/adr/
```

## Use o vocabulário do glossário

Quando o seu resultado nomear um conceito de domínio (num título de issue, numa proposta de refatoração, numa hipótese, no nome de um teste), use o termo como definido no `CONTEXT.md`. Não escorregue para sinônimos que o glossário evita explicitamente.

Se o conceito de que você precisa ainda não estiver no glossário, isso é um sinal — ou você está inventando uma linguagem que o projeto não usa (reconsidere), ou existe uma lacuna real (anote-a para o `/domain-modeling`).

## Sinalize conflitos com ADRs

Se o seu resultado contradisser um ADR existente, traga isso à tona explicitamente em vez de sobrescrevê-lo em silêncio:

> _Contradiz o ADR-0007 (pedidos com event sourcing) — mas vale reabrir porque…_
