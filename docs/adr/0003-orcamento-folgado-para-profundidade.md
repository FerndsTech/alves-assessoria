# ADR-0003 — Orçamento folgado para uma direção visual com profundidade

- **Status:** ✅ **Aceito.**
- **Data:** 24/08/2026
- **Decisor:** Murilo (FerndsTech)
- **Emenda:** as decisões **2** e **3** do [ADR-0002](0002-stack-e-orcamento-de-performance.md), e revisa em parte a decisão **0** daquele ADR
- **Origem:** a virada de direção visual registrada em [Tratamento visual do site além dos tokens (#21)](https://github.com/FerndsTech/alves-assessoria/issues/21)
- **Canvas:** [Tratamento Visual Alves](https://claude.ai/code/artifact/62fc2716-6ea6-4cf3-b1a1-7d6f7cf4b711)

---

## Contexto

O [#21](https://github.com/FerndsTech/alves-assessoria/issues/21) fechou de manhã escolhendo **escala** — herói tipográfico, sem sombra, sem grão. No mesmo dia, olhando o canvas, o dono do projeto trocou por **profundidade**: camada, sombra, herói com foto de fachada, hover nos advogados e micro-interações.

Duas dessas coisas não cabem no ADR-0002, e é bom separá-las porque só uma é problema:

- **A foto no herói já cabia.** O ADR-0002 reservou 180 KB para a imagem do LCP. A escala simplesmente não gastava essa linha; a profundidade gasta. Nada a emendar aqui.
- **As micro-interações não cabem.** O teto de **15 KB de JS** não comporta uma biblioteca de animação ligada ao scroll — GSAP com ScrollTrigger dá ~34 KB comprimidos sozinho. Escrever tudo à mão é possível, mas o dono do projeto pediu explicitamente folga para experimentar, e não um exercício de economia de bytes.

O pedido foi literal: *"não precisa ser à risca essa questão do orçamento do site"*, com uma margem *"relativamente boa"* para rodar interações e animações. Entre três níveis oferecidos, foi escolhido o **mais folgado**.

---

## Decisão

### 0. A posição do ADR-0002 é revista, não revogada

O ADR-0002 decidiu que *"performance é requisito de primeira classe, não acabamento"*, derrubando a posição contrária do ADR-0001. **Essa estrutura fica de pé:** continua existindo teto, continua existindo gate no CI, e *"otimizado"* continua tendo critério de verificação.

O que muda é **o patamar**, e a escolha é do dono do projeto. O que **não** volta é a posição do ADR-0001 — *rico agora, medimos depois*. Aqui é *rico dentro de um teto maior*, que continua sendo posição coerente.

### 1. Novo orçamento de bytes

Bytes transferidos, comprimidos — o critério do ADR-0002 não muda, só os números.

| Linha | ADR-0002 | **ADR-0003** |
| --- | --- | --- |
| HTML | 25 KB | **40 KB** |
| CSS | 20 KB | **80 KB** |
| Fontes | 100 KB (40 no `preload`) | **150 KB** (40 no `preload`) |
| **JS (site inteiro)** | 15 KB | **100 KB** |
| Imagem do LCP | 180 KB | **400 KB** |
| Foto de advogado | 70 KB | **120 KB** |
| **Total** | 1 MB | **3 MB** |

A linha de `preload` **não sobe**: continua sendo só o Spectral 600. Ela é caminho crítico, e é a única linha desta tabela em que folga não compra nada.

> ✅ **Implementada em 24/08/2026 pelo [#26](https://github.com/FerndsTech/alves-assessoria/issues/26).** A tabela acima é o **registro da decisão**; a cópia que a máquina lê vive em `scripts/orcamento/tabela.ts`, e é de lá que o gate mede. Não há uma terceira: nem o README nem o CI repetem número nenhum. **Mudar um teto é mudar no módulo e emendar este ADR** — se isso doer, é o sintoma pretendido.

### 2. Novas metas de Core Web Vitals

Mesmo instrumento — Lighthouse, preset mobile, Slow 4G simulado e CPU 4×.

| Métrica | ADR-0002 | **ADR-0003** |
| --- | --- | --- |
| LCP | ≤ 2,5 s | **≤ 3,5 s** |
| CLS | ≤ 0,10 | **≤ 0,10** — sem mudança |
| TBT | ≤ 200 ms | **≤ 400 ms** |
| Score Performance | ≥ 90 | **≥ 80** |

> ✅ **Implementada em 24/08/2026 pelo [#26](https://github.com/FerndsTech/alves-assessoria/issues/26)**, junto dos tetos de bytes e no mesmo módulo — `scripts/orcamento/tabela.ts`. O farol lê os quatro limiares de lá e os **reporta sem nunca reprovar**.

**CLS não afrouxa, e isso não é rigor decorativo.** Layout que pula não é lentidão, é defeito — e o público que este site atende erra o toque quando o alvo se move. Folga em CLS não compra liberdade nenhuma de design; só esconde bug.

### 3. As três travas de animação ficam, e o motivo não é orçamento

Nenhuma das três é sobre peso, então nenhuma das três cede com o teto:

1. **Só `transform` e `opacity`.** Animar `width`, `top` ou `height` força recálculo de layout a cada quadro e engasga em qualquer Android barato, com teto de 15 KB ou de 100 KB. Obedecer é de graça e não limita nada do que foi pedido.
2. **Nenhum estado inicial invisível dependente de JS.** Se o JS falhar, a seção some. Com 24% dos usuários rurais não conseguindo abrir aplicativo nenhum ao fim do pacote, *"o site abriu mas o texto não apareceu"* continua sendo o pior modo de falha disponível — e o tamanho do bundle não muda isso.
3. **`prefers-reduced-motion` em toda largura**, reduzindo para fade cruzado. É acessibilidade, não performance.

### 4. O gate continua sendo bytes; o Lighthouse continua informando

A decisão 5 do ADR-0002 sobrevive inteira. O motivo dela era instrumental e não mudou: Lighthouse em CI é ruidoso e um gate ruidoso vira gate ignorado. Bytes bloqueiam o merge; Lighthouse roda e reporta.

### 5. Uma medição em aparelho real antes de lançar

**Requisito novo, e é o contrapeso desta folga.** Antes do lançamento público, abrir o site uma vez num **Android de entrada real**, em rede móvel, e olhar. Não é gate de CI e não tem número — é uma pessoa olhando a página no aparelho que 99% do público usa.

Triplicar o teto sem nunca ver a página no aparelho alvo é como o ADR-0002 descreveu o retrofit: descobrir tarde, quando cortar já é conversa política.

### 6. O que este ADR não toca

- **Decisão 9 do ADR-0002 — enriquecimento aditivo, nunca subtrativo.** Continua valendo, e agora com mais espaço para ser aditivo.
- **Decisão 11 — vedado embutir mapa de terceiro.** Um `iframe` de Google Maps carrega da ordem de 1 MB de JS de terceiro; com 4 unidades, continua não havendo conversa possível nem sob um teto de 3 MB.
- **Decisão 1 — Astro, com build step.** Intocada.
- **A grade em vez de carrossel**, e o preloader reformado. Intocados.

---

## Consequências

**Assumidas de olhos abertos.** Os números do público que motivaram o ADR-0002 continuam verdadeiros: 43,6% dos usuários de internet do Nordeste usaram **somente celular**, 49% dos usuários de celular ficaram **sem pacote de dados** em algum momento do trimestre, e 81% dos usuários de 60+ **não usam computador**. Uma página de 3 MB é uma página que alguns desses visitantes não vão abrir.

O que reduz o dano, e é por isso que a folga é defensável:

- **A maior parte do peso está abaixo da dobra e em `lazy`.** Os 6 retratos e as 4 fachadas — que sozinhos podem responder por 2/3 do total — só carregam se a pessoa rolar.
- **O caminho crítico continua apertado.** HTML, CSS, o `preload` do Spectral e a imagem do herói somam ~560 KB no pior caso, e é isso que decide se a página abre.
- **O gate não sumiu.** Estourar 3 MB continua reprovando o build.

**Um risco que fica registrado sem mitigação:** 100 KB de JS é espaço suficiente para uma dependência entrar sem ninguém notar. O teto de 15 KB funcionava como alarme; 100 KB não alarma. Se aparecer uma segunda biblioteca, a conversa é sobre qual das duas fica — não sobre subir o teto de novo.

---

## Nota sobre a foto de fachada

A virada criou um requisito que não existia: com herói fotográfico, **a foto de fachada é o elemento de LCP da página inteira**, e ela entra no caminho crítico de produção. Geometria, tratamento e a vedação da OAB (Prov. 205 art. 6º — nada que afirme sobre tamanho, estrutura ou ostentação do escritório) estão no artboard *Tratamento fotográfico* do canvas e no comentário de emenda do [#21](https://github.com/FerndsTech/alves-assessoria/issues/21).
