# ADR-0002 — Stack de renderização e orçamento de performance

- **Status:** ✅ **Aceito**, com as decisões 2 e 3 **emendadas**.
- **Emendado por:** [ADR-0003](0003-orcamento-folgado-para-profundidade.md) em 24/08/2026 — o orçamento de bytes e as metas de Core Web Vitals foram afrouxados para acomodar a direção visual com profundidade. A estrutura deste ADR (existe teto, existe gate, existem as três travas de animação) continua valendo.
- **Data:** 22/08/2026
- **Decisor:** Murilo (FerndsTech)
- **Ticket de origem:** [Stack e orçamento de performance (#6)](https://github.com/FerndsTech/alves-assessoria/issues/6)
- **Substitui:** a seção "C. Orçamento de performance" do [ADR-0001](0001-site-unico-responsivo-e-diferenciacao-do-desktop.md), e fecha as seções A e B daquele ADR no que toca a custo
- **Pesquisa de apoio:** [acesso-a-internet-por-dispositivo-brasil.md](../research/acesso-a-internet-por-dispositivo-brasil.md)
- **Insumo de marca:** [brief de marca](../brand/brief-de-marca.md), seção de carregamento de fonte

---

## Contexto

Duas afirmações do projeto não conviviam:

- **Mapa [#1](https://github.com/FerndsTech/alves-assessoria/issues/1):** _"Performance é requisito de primeira classe, não acabamento."_
- **ADR-0001, seção C:** _"otimização será pontuada mais adiante… o risco de um site rico compensa quando feito em meio-termo."_

Elas decidem coisas opostas: a primeira faz o orçamento restringir o design; a segunda faz o design vir primeiro e a medição depois. Enquanto as duas valessem, _"otimizado"_ permanecia — nas palavras do próprio ADR-0001 — _"um termo sem critério de verificação no projeto"_.

O público decide o desempate. Os números da pesquisa que pesam aqui:

| Dado | Valor | Fonte |
| --- | --- | --- |
| Usuários de internet de 60+ que **não usam computador** | **81%** | TIC 2025, C16A |
| Usuários de internet no Nordeste que usaram **somente celular** | **43,6%** | PNAD 2025, SIDRA 7387 |
| Usuários de celular no Nordeste **sem pacote de dados** em 3 meses | **49%** | TIC 2025, J7 |
| Usuários rurais que **não conseguiram usar nenhum aplicativo** depois disso | **24%** | TIC 2025, J8A |

Deles decorre a premissa que atravessa todas as decisões abaixo: **o modo de falha relevante neste projeto é indisponibilidade, não lentidão.** Um site que "otimiza depois" não é, para metade deste público, um site um pouco mais lento — é um site que não abre.

---

## Decisão

### 0. A tensão: o mapa vence

**Performance é requisito de primeira classe.** Os números deste ADR passam a restringir as decisões de design a partir de agora, incluindo as do [#21](https://github.com/FerndsTech/alves-assessoria/issues/21). A posição registrada no ADR-0001 — otimização como acabamento pontuado adiante — **fica superada**.

Três razões, na ordem em que pesaram:

1. **O modo de falha é indisponibilidade.** Ver contexto.
2. **O mapa já havia ligado o fio nessa direção.** O #21 está bloqueado por este ticket, com a justificativa _"é o orçamento que diz quanto enriquecimento cabe"_. Sob a posição do ADR-0001, esse bloqueio não faria sentido.
3. **Retrofit de performance sobre design aprovado é o modo clássico de perder.** Cortar animação já aprovada é conversa política; recusar animação que não cabe no teto é conversa técnica.

O que sobrevive da posição do autor: **o teto não precisa ser ascético.** Foi escolhido deliberadamente o limiar mais generoso disponível (ver decisão 2). _Rico dentro do teto_ é posição coerente; _rico agora, medimos depois_ não é.

### 1. Stack: Astro, com build step

O site é construído com **Astro**. Existe build step; a saída é HTML estático, coerente com o site 100% estático decidido no [#9](https://github.com/FerndsTech/alves-assessoria/issues/9).

**Por que um build step, e não HTML escrito à mão.** A página tem muita estrutura movida por dados: 6 cards de advogado que reaparecem em 6 painéis com os mesmos campos, 4 blocos de unidade, 4 áreas de atuação, 4 textos de assunto do WhatsApp — cerca de 12 lugares que renderizam o mesmo advogado, sobre um modelo que o [#7](https://github.com/FerndsTech/alves-assessoria/issues/7) ainda vai mexer. Mantê-los à mão contraria a restrição permanente do mapa: _"toda informação fictícia precisa ser trocável sem refatoração"_.

A alternativa de renderizar os cards no cliente a partir de um objeto JS **está vedada pelo ADR-0001** — conteúdo primário tem de estar no HTML entregue. Então a escolha era binária: HTML duplicado à mão ou build step.

**Por que Astro entre os geradores.** Envia **zero JS por padrão** (o JS da página é só o que escrevermos); o modelo de ilhas casa com as duas ilhas que de fato existem — painel do advogado e mapa; e o pipeline de imagem gera AVIF/WebP com `srcset` responsivo, o que importa porque as fotos são a maior linha variável do orçamento (6 fotos × 3 larguras × 2 formatos = 36 arquivos que ninguém quer manter à mão).

**Custo assumido e sua mitigação.** Build step traz toolchain Node e apodrecimento de dependência: daqui a alguns anos, `npm install` neste projeto pode não rodar. Mitigação: **o `dist/` construído é versionado no repositório**, de modo que exista sempre uma cópia que abre sem Node.

### 2. Metas de Core Web Vitals

> ⚠️ **Emendado em 24/08/2026 pelo [ADR-0003](0003-orcamento-folgado-para-profundidade.md).** Os números abaixo não são mais os vigentes — consulte o ADR-0003. O critério e o instrumento não mudaram, só os valores.

**Medição em laboratório, não em campo — e isso é fato, não preferência.** Dados de campo vêm do CrUX, que só publica relatório com volume de amostra suficiente; um one-pager de escritório local em quatro cidades do interior do Ceará não terá esse volume. Gate de campo seria gate que nunca dispara. Consequência: **INP fica fora do gate** por ser métrica exclusivamente de campo, e **TBT** entra como seu proxy de laboratório.

Instrumento: **Lighthouse, preset mobile** (Slow 4G simulado — 1,6 Mbps, 150 ms RTT — e CPU 4×).

| Métrica | Meta |
| --- | --- |
| LCP | ≤ **2,5 s** |
| CLS | ≤ **0,10** |
| TBT | ≤ **200 ms** |
| Score Performance | ≥ **90** |

São os limiares "bom" do Google, escolhidos entre eles e um conjunto mais estrito. A escolha é deliberada: a folga entre o estrito e o "bom" **é o orçamento que o #21 vai gastar** em enriquecimento visual.

### 3. Orçamento de bytes

> ⚠️ **Emendado em 24/08/2026 pelo [ADR-0003](0003-orcamento-folgado-para-profundidade.md).** Os números abaixo não são mais os vigentes — consulte o ADR-0003. O critério e o instrumento não mudaram, só os valores.

**Bytes transferidos, comprimidos** — é o que o pacote de dados do visitante paga. Peso em disco não interessa.

Como o site é um one-pager num único URL, o teto se parte em caminho crítico e peso total, com as fotos abaixo da dobra em `loading="lazy"`.

| Linha | Teto | Nota |
| --- | --- | --- |
| HTML | **25 KB** | contém os 6 advogados e os 6 painéis inteiros |
| CSS | **20 KB** | folha única |
| Fontes | **100 KB** total, dos quais **40 KB** no `preload` | Spectral 600, Source Sans 3 400/600 |
| **JS — o site inteiro** | **15 KB** | todas as ilhas somadas |
| Imagem do LCP | **180 KB** | AVIF, variante servida ao mobile |
| Cada foto de advogado | **70 KB** | maior variante servida ao mobile |
| **Peso total, primeira visita** | **1 MB** | herói + 6 advogados + 4 fachadas + mapa |

**Sobre o teto de JS.** A necessidade real — abrir/fechar painel, FLIP da foto, `pushState`, animação do mapa, service worker — cabe em torno de 5 KB. Os 15 KB dão três vezes de folga, e a função disso não é apertar o nosso código: é fazer com que _"vou trazer uma biblioteca"_ seja uma decisão visível que estoura um número, em vez de um `npm install` silencioso.

**Sobre as fontes.** 100 KB é a maior linha fixa da página, mais que HTML e CSS somados, e o `preload` do Spectral 600 está no caminho crítico do LCP por decisão do brief de marca. É caro de propósito: o brief decidiu que a tipografia carrega o "premium".

**O elemento de LCP ainda não tem identidade.** Se o herói do #21 for imagem, é a imagem (linha de 180 KB); se for tipográfico, é o `h1` com o Spectral pré-carregado (linha de 40 KB). O orçamento cobre os dois casos, e a linha não gasta se o caso não ocorrer.

### 4. Hospedagem: Cloudflare Pages

**Cloudflare Pages**, com domínio próprio e HTTPS.

O desempate é geográfico e concreto: **as 4 praças são todas no Ceará** — Acopiara, Juazeiro do Norte, Senador Pompeu e Fortim. A Cloudflare tem PoP em **Fortaleza**, além de Recife, Brasília, Rio e São Paulo. RTT pesa mais que largura de banda numa página pequena, e nenhum concorrente do mesmo preço tem presença no Nordeste.

Somam-se: banda ilimitada no plano gratuito, build a partir do git (que o Astro requer) e arquivo `_headers` sob nosso controle — necessário porque a política de cache da decisão 6 é linha do orçamento.

**O nome do domínio não é decidido aqui** — é fato do cliente, e vai para o [#16](https://github.com/FerndsTech/alves-assessoria/issues/16). O que este ADR fixa é que haverá domínio próprio com HTTPS.

### 5. Validação: bytes bloqueiam, Lighthouse informa

**Numa página estática, o orçamento de bytes é indicador antecedente do LCP** — não há servidor lento, consulta a banco nem renderização no cliente. Não se estoura LCP sem antes estourar bytes. É isso que permite pôr o gate duro na medição determinística.

- **Gate duro, bloqueia o PR:** tamanho dos arquivos do `dist/` conferido contra a tabela da decisão 3. Mesmo commit, mesmo número, sempre.
- **Informativo, não bloqueia:** Lighthouse CI roda a cada PR e publica os números para dar visibilidade da tendência. Medir LCP e TBT em runner compartilhado é ruidoso — CPU variável entre execuções do mesmo commit —, e gate que falha por ruído é gate que a equipe aprende a ignorar, o que é pior que nenhum por dar sensação falsa de cobertura.
- **Manual, antes de publicar:** conferência dos limiares absolutos de CWV. Publicações são raras o bastante para isso ser realista.

**Custo assumido:** uma regressão de LCP que não venha de bytes — uma animação cara, por exemplo — passa pelo gate duro e só é pega no Lighthouse informativo ou na conferência manual.

### 6. Cache e disponibilidade

- **Assets com hash de conteúdo** (o Astro já os nomeia assim): `Cache-Control: max-age=31536000, immutable`. Visita repetida não paga de novo os 100 KB de fonte.
- **HTML:** revalidação a cada visita.
- **Service worker mínimo**, ~1,5 KB dentro do teto de JS: _cache-first_ nos assets versionados, _stale-while-revalidate_ no HTML.

**Por que o service worker, e qual é honestamente o tamanho do prêmio.** Ele é a ferramenta que responde ao modo de falha nomeado no contexto. Mas quem está sem dados **também não consegue enviar o WhatsApp**, que é a conversão do site — então o SW não salva a conversão. O que ele salva é o **endereço, o horário e o telefone**, legíveis sem rede. O ganho maior está no cenário mais frequente: **rede ruim**, onde a segunda visita passa a ser instantânea porque nada é buscado.

**Risco a controlar:** service worker malfeito serve conteúdo velho para sempre. Mitigação por escopo — ele só armazena o que já tem hash no nome, e o HTML sempre revalida em segundo plano.

### 7. Fonte: a política do brief cabe na stack sem ginástica

Confirmado contra a stack escolhida. `woff2` auto-hospedado, `<link rel="preload">` do Spectral 600 no layout e `@font-face` com `size-adjust` numa folha global são HTML e CSS comuns dentro de um layout Astro. Nada na política do brief exige tratamento especial.

### 8. Tema escuro: só o claro é publicado, por ora

Os tokens escuros do brief de marca **continuam válidos e verificados** (26/26 pares em AA) — ficam guardados como ativo pronto. O site publica apenas o tema claro.

Bytes não são o argumento (um bloco `prefers-color-scheme` custa 1 ou 2 KB). Os custos reais batem em coisas fora de escopo:

1. **A logo.** A paleta é vermelho, preto e branco; o preto **desaparece** no fundo escuro, e um tema escuro exigiria variante clara da logo — arte que o mapa lista como **fora de escopo**.
2. **As fotos.** Retrato recortado em fundo branco ganha halo no escuro, e o tratamento fotográfico ainda não existe (#21 e #18). Publicar dois temas obrigaria o #21 a resolver duas vezes cada escolha visual.

**Registrado como não confirmado:** o modo economia de bateria do Android pode ligar o tema escuro automaticamente. Se isso valer para os aparelhos deste público, a fração em modo escuro seria maior do que a escolha deliberada sugere. Um site só-claro **não quebra** nesse cenário — o navegador serve o tema claro normalmente —, então o risco é estético, não funcional.

### 9. Enriquecimento: aditivo, nunca subtrativo

A regra que governa a lista: **enriquecimento somado sobre uma base que já funciona.** Se o enriquecimento falhar, nada pode quebrar.

| Item | Decisão |
| --- | --- |
| Layouts próprios de desktop | **Entra.** Media queries, custo ~0; é o que "responsivo" significa e o ADR-0001 já autoriza |
| Botões estilizados | **Entra.** Custo de bytes desprezível; o desenho pertence ao #21 |
| Animação de scroll | **Entra, com trava** (ver abaixo) |
| Carrossel de advogados | **Fora. Vence a grade** |
| Preloader | **Entra reformado** (ver abaixo) |

**Trava da animação de scroll.** Ou 100% CSS, ou JS que apenas enriquece um **estado inicial já visível**. É **proibido** estado inicial invisível dependente de JS (`opacity: 0` até o `IntersectionObserver` disparar): se o JS falhar, a seção some. Com 24% dos usuários rurais não conseguindo abrir aplicativo nenhum ao fim do pacote, _"o site abriu mas o texto não apareceu"_ é o pior modo de falha disponível.

**Grade em vez de carrossel.** O [#2](https://github.com/FerndsTech/alves-assessoria/issues/2) eliminou depoimento, resultado, caso de sucesso e logo de cliente — o material típico de carrossel. Sobravam os 6 advogados, e escondê-los atrás de interação contraria a lógica de conteúdo visível e o hábito de toque de um público de 60+. Consequência: a questão de **auto-avanço e WCAG 2.2.2** (_Pause, Stop, Hide_), levantada em aberto pelo ADR-0001, **deixa de existir** — não há conteúdo que se mova sozinho.

**Preloader, reformado.** Ele foi mantido por decisão do dono do projeto, contra a recomendação registrada de cortar. A forma escolhida é a que o faz caber no orçamento:

- **Intro só de desktop**, carregada por `matchMedia` acima do ponto de quebra
- **Só na primeira visita**, gravada em `sessionStorage`
- **Inserida por JS, nunca presente no HTML.** Regra de segurança: se viesse no HTML e o JS falhasse, o visitante ficaria com tela cheia permanente sobre o site — falha total em vez de degradação
- **Desligada por `prefers-reduced-motion`**

O fato que determinou a forma: **LCP mede a pintura do maior elemento de conteúdo visível**, então um overlay que cobre o herói impede o herói de pintar — preloader oclusivo _é_ o LCP. Restrita ao desktop, a intro não toca o LCP que o gate mede em Lighthouse mobile, e não alcança os ~99% que chegam pelo celular com pacote intermitente.

### 10. Animação: só compositor

**Apenas `transform` e `opacity`.** Animar `left`, `top`, `width` ou `height` força recálculo de layout a cada quadro — no Android barato deste público, é o caminho direto para travamento e para estourar o TBT.

Isso corrige diretamente o insumo deixado pelo protótipo do [#20](https://github.com/FerndsTech/alves-assessoria/issues/20), cujo FLIP animava `left/top/width/height`.

**Abertura do painel do advogado: FLIP só na foto.** A foto do card transiciona para o painel via `transform`; título, biografia e botão entram em fade. A continuidade que faz o gesto parecer caro vem da foto — é ela que o olho segue. Evita-se a contra-escala em texto, que é onde o FLIP fica feio (texto esticando durante a transição) e caro. Custo estimado: ~2 KB.

**`prefers-reduced-motion` vale em toda largura de tela.** É preferência de pessoa, não de tela: quem tem distúrbio vestibular precisa da animação desligada no desktop também. Sob ela, as transições reduzem para **fade cruzado sem movimento** — não para corte seco, porque troca instantânea de conteúdo também desorienta, e o que a preferência pede é ausência de _movimento_, não de transição.

### 11. Mapa: SVG desenhado, sem mapa de terceiro embutido

**Vedado embutir mapa de terceiro.** Um `iframe` de Google Maps embed carrega da ordem de 1 MB de JavaScript de terceiro — sozinho estoura o orçamento total da página, e com 4 unidades não há conversa possível.

A seção do mapa é **SVG inline desenhado** (~15 KB, dentro do teto de imagem), com os 4 pinos animáveis em CSS puro — o que entrega o pino animado sem custo de JS —, na paleta da marca em vez do cinza-Google, e escalável sem perda.

Cada bloco de unidade leva o **endereço em texto** (o NAP que a pesquisa do [#4](https://github.com/FerndsTech/alves-assessoria/issues/4) apontou como o que de fato serve o visitante) e um **link que abre o aplicativo de mapas do telefone**. É o mesmo padrão que o #9 fixou para o WhatsApp: **o site emite um link e não hospeda nada**. Quem quer rota quer sair do site e usar o app que já tem GPS, trânsito e navegação por voz.

A **forma** dos 4 blocos permanece com o [#10](https://github.com/FerndsTech/alves-assessoria/issues/10); o que sai daqui é o teto e a vedação.

> ✅ **Resolvido em 24/08/2026 pelo [#10](https://github.com/FerndsTech/alves-assessoria/issues/10)**, com duas correções a esta decisão.
>
> **(1) O teto de ~15 KB era 18× generoso demais.** O SVG medido — contorno de 42 pontos, 4 pinos, rótulos — pesa **848 bytes comprimidos**. A vedação a mapa de terceiro segue firme e é o que importava; o número de 15 KB deixa de ser restrição de projeto e vira folga disponível ao [#21](https://github.com/FerndsTech/alves-assessoria/issues/21) para tratar a massa de terra.
>
> **(2) O desenho não existe no celular.** Abaixo do ponto de quebra ele sai por `display: none`, porque em 260px os rótulos ficam ilegíveis e três dos quatro pinos se sobrepõem. Isso o alinha à decisão 9 — enriquecimento **aditivo**, de desktop — e **não** fere a paridade de conteúdo do ADR-0001, porque o mapa é decoração: endereço, quem atende, dias e link de rota vivem nos 4 blocos, entregues nas duas larguras.
>
> Consequência prática: **nada de `matchMedia` para injetar o desenho.** Ele fica inline no HTML sempre. O JS economizado é o ponto — a decisão 3 fez do teto de JS um alarme contra dependência silenciosa, e um `display: none` não dispara alarme nenhum.

---

## Consequências

- **"Otimizado" passa a ter critério de verificação.** A afirmação que o ADR-0001 marcava como não verificável agora tem sete linhas de tabela e quatro limiares.
- **O #21 fica destravado e nasce restrito.** O enriquecimento visual tem um teto conhecido antes de começar.
- **O #7 tem resposta ao item que dependia daqui:** existe build step.
- **O #10 herda teto e vedação:** ~15 KB de SVG, nenhum mapa de terceiro embutido. ✅ **Consumido em 24/08/2026** — a vedação segurou, o teto sobrou (848 bytes medidos), e o desenho saiu do celular. Ver a nota na decisão 11.
- **O #12 recebe um fato novo e desconfortável:** URLs de pré-visualização de deploy são **públicas e indexáveis** em todos os planos gratuitos — proteção por senha é recurso pago. A premissa de _"o cliente valida por link sem o modo demonstração"_ precisa ser reexaminada lá.
- **A questão de auto-avanço e WCAG 2.2.2 deixa de existir**, com a queda do carrossel.
- **Duas dependências de arte ficam abertas:** o SVG do mapa não existe, e a variante clara da logo não será produzida enquanto o tema escuro estiver fora. **Sobre a primeira, em 24/08/2026:** o que falta virou **fidelidade**, não bytes — geometria do IBGE simplificada —, e as posições dos 4 pinos já estão resolvidas por latitude e longitude reais.

---

## Revisitar quando

- O #21 apresentar tratamento visual que não caiba na tabela — a conversa é sobre qual linha cede, não sobre suspender o orçamento
- O site passar a ter volume de tráfego suficiente para o CrUX publicar dados de campo, momento em que INP entra e as metas podem migrar de laboratório para campo
- A logo ganhar variante clara e o #21 definir o tratamento fotográfico, reabrindo o tema escuro
- O `dist/` deixar de ser construível por apodrecimento de dependência — a cópia versionada é o seguro, não a solução

---

## Referências

- [Pesquisa: acesso à internet por dispositivo no Brasil](../research/acesso-a-internet-por-dispositivo-brasil.md)
- [ADR-0001 — Site único responsivo](0001-site-unico-responsivo-e-diferenciacao-do-desktop.md)
- [Brief de marca](../brand/brief-de-marca.md) — política de fonte e tokens de tema
- [WCAG 2.2 — 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) — deixa de incidir com a queda do carrossel
