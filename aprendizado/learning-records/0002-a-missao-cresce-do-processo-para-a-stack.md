# A missão cresceu do processo para a stack, e a primeira aula foi uma correção

Em 24/08/2026 o Murilo pediu para aprender **Astro** — tecnologia, não processo. A `MISSION.md`
vigente coloca isso explicitamente **fora de escopo**: _"Desenho gráfico e front-end propriamente
dito — o assunto aqui é o processo"_. O pedido não é desvio: é consequência do próprio fluxo
funcionando. O ADR-0002 escolheu Astro no dia 22/08, e agora existe uma decisão tomada que ele
não consegue avaliar sem conhecer a coisa decidida.

**A mudança de missão está proposta, não confirmada.** Aguardando resposta do Murilo antes de
editar a `MISSION.md`.

## Evidence

Ele chegou com um modelo mental já formado, e ele estava **meio certo**, que é o estado mais
interessante para ensinar:

> _"Ela é melhor pra desenvolvimento web, pois não carrega a parte do JavaScript. É isso? Ele
> deixa em segundo plano quando carrega em 1s."_

Duas ideias fundidas numa. A primeira está certa e ele não sabia por quê — zero JS por padrão,
mas porque componentes `.astro` não têm runtime de cliente, não porque algo foi adiado. A
segunda descreve um mecanismo **real e diferente**: `client:idle` e `client:visible`, que são
opt-in, por componente, e exigem framework de UI instalado.

## Implications

- **A correção virou o eixo da aula**, não uma nota de rodapé. O par _adiar × não existir_ é o
  que separa entender Astro de repetir o slogan — e é o par que decide o teto de 15 KB do
  ADR-0002, porque diretiva muda *quando*, nunca *quanto*.
- **Confirmou o diagnóstico do [[0001-missao-tripla-e-wayfinder-ja-dominado]]**: o gargalo dele
  é nomenclatura, e o remédio é o par, não o termo. Ele próprio pediu as duas linguagens de
  novo, sem ser lembrado — a preferência está estabilizada e vale tratá-la como permanente.
- **A aula produziu um achado sobre o projeto, não só sobre o Murilo.** O ADR-0002 usa "ilha"
  no sentido frouxo de "região interativa" ao dizer que o modelo de ilhas casa com painel e
  mapa. No vocabulário estrito do Astro, ilha exige framework de UI instalado + diretiva
  `client:`. O substantivo da decisão continua certo; a palavra pode induzir um leitor futuro a
  achar que o projeto instala React — o oposto do que o orçamento quer. **Correção pendente no
  ADR.**
- **A pergunta de aprendizado mais valiosa deste conjunto não é "como usar ilha"** e sim
  "quando não usar" — é a única decisão da lista que economiza bytes de verdade. A rota de
  quatro sessões termina nela de propósito.
- **Formato:** o material saiu como artifact (interativo: busca, simulador, mapa mental) mais
  uma referência local que imprime. Seguiu a regra dele registrada em `NOTES.md`, sem precisar
  perguntar.
