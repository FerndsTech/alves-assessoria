# Referências

Matéria-prima visual e conceitual do site: links de sites, prints, telas do Figma, material impresso do cliente. **Não é ticket** — é uma *superfície de entrada*, da mesma classe que a [caixa de entrada de ideias](../ideias-caixa-de-entrada.md).

A distinção que vale fixar: **ticket é pergunta, documento é insumo.** Referência não se "resolve" — ela é *consumida* por um ticket. Por isso toda entrada aqui termina apontando para o ticket que vai usá-la.

## Como escrever uma entrada

Copie o bloco abaixo e preencha. Os cinco campos são obrigatórios.

```markdown
### <nome curto e reconhecível>

- **Tipo:** link · print · tela do Figma · material do cliente
- **Onde:** URL, e/ou o nome do arquivo nesta pasta
- **O que eu quero daqui:** a ideia específica, em uma ou duas frases
- **O que eu NÃO quero:** o que existe na referência e não deve vir junto
- **Alimenta:** #<número do ticket>
```

**O campo "o que eu NÃO quero" é o que faz este documento valer.** Referência sem ele é copiada por inteiro, e o resultado é um site que é a média de cinco sites alheios. Com ele, a referência vira uma *instrução*, não um alvo.

**O campo "Alimenta" é o que impede o documento de virar cemitério.** Referência que não aponta para ticket nenhum precisa virar uma de três coisas: um ticket novo, uma linha na névoa do [mapa](https://github.com/FerndsTech/alves-assessoria/issues/1) ("Ainda não especificado"), ou nada — e sai daqui.

## Como nomear arquivos

`<assunto>-<origem>-<AAAA-MM-DD>.<ext>` — o mesmo padrão do material do cliente. Data no nome porque referência envelhece: um site muda de layout e o print vira o único registro do que você viu.

---

## Catálogo

### Endereços e horário — material impresso do escritório

- **Tipo:** material do cliente (foto da peça gráfica)
- **Onde:** [`enderecos-e-horario-cliente-2026-08-17.jpeg`](enderecos-e-horario-cliente-2026-08-17.jpeg)
- **O que eu quero daqui:** os **fatos**, não a forma — os 4 endereços (Acopiara, Juazeiro do Norte, Senador Pompeu, Fortim sala 05), o horário *seg–sex 08h–16h*, e a linha *"atendimento mediante hora marcada"*
- **O que eu NÃO quero:** nada da linguagem visual da peça. Ela não é referência de design
- **Alimenta:** já consumido por [#16](https://github.com/FerndsTech/alves-assessoria/issues/16) e [#17](https://github.com/FerndsTech/alves-assessoria/issues/17); segue sendo a fonte dos 4 blocos ancorados de [#10](https://github.com/FerndsTech/alves-assessoria/issues/10)

<!-- ── novas entradas abaixo ── -->

> 📝 **As duas entradas abaixo foram redigidas em 22/08/2026 a partir dos arquivos.** Os campos *Tipo*, *Onde* e as observações são descrição do que está nas imagens. Os campos **"O que eu quero"** e **"O que eu NÃO quero"** estão marcados como **PROPOSTA** — são julgamento do Murilo e devem ser editados ou confirmados por ele antes de o #20 e o #6 os consumirem.

### Seção de sócios e painel do advogado — AG Sociedade de Advogados

- **Tipo:** prints de site de terceiro (2 telas)
- **Onde:** [`ModeloSectionAdv1.png`](ModeloSectionAdv1.png) (a grade de cards) · [`ModeloSectionAdv2.png`](ModeloSectionAdv2.png) (o painel aberto)
- **O que eu quero daqui:** *(PROPOSTA — confirmar)*
  - **A estrutura do painel:** divisão em duas metades, **texto à esquerda e foto grande à direita**, ocupando a tela inteira
  - **O X circular e contornado**, no alto da coluna de texto — não um X pequeno no canto extremo. Bate com o requisito de "X grande, alto e sempre visível"
  - **A foto do card vira a foto do painel** — mesma pessoa, mesmo enquadramento, ampliada. Confirma a decisão de *expandir* em vez de trocar
  - **Ícones de rede social discretos ao pé do texto**, sem rótulo
  - **A descrição escrita como prosa de credenciais** — graduação, pós, comissões da OAB, institutos, diretorias. Sem adjetivo sobre si mesmo. É exatamente a lista taxativa do CED art. 44, §1º (título acadêmico, distinção honorífica, instituição jurídica) redigida em texto corrido
  - **O tratamento fotográfico uniforme:** meio corpo, fundo de estante, mesma luz e mesmo recorte nos quatro. Insumo direto do item 4 de [#7](https://github.com/FerndsTech/alves-assessoria/issues/7)
- **O que eu NÃO quero:** *(PROPOSTA — confirmar)*
  - **O texto de abertura da seção** — *"altamente qualificados"*, *"vasta experiência"*, *"foco em resultados eficazes"*. Superlativo (Prov. 205 art. 3º, IV) e promessa de resultado (art. 6º). **Vedado**
  - **O rótulo "Especialista em ..."** sob cada nome. [#2](https://github.com/FerndsTech/alves-assessoria/issues/2) fechou: só com título certificado que sustente. O nosso escreve **"Atua em: ..."**
  - **A ausência do número da OAB.** A referência não mostra nenhum; o nosso card e o nosso painel são **obrigados** a mostrar (CED art. 44, caput)
  - A paleta verde e a tipografia
- **Alimenta:** [#20 — Layout do painel do advogado](https://github.com/FerndsTech/alves-assessoria/issues/20) (principal) · [#7](https://github.com/FerndsTech/alves-assessoria/issues/7) item 4 (requisitos da foto) e item 1 (forma do campo `descricao`)

> ⚠️ **Insumo obrigatório de [#20](https://github.com/FerndsTech/alves-assessoria/issues/20)** — aquele ticket não começa sem esta entrada. Foi por falta dela que o layout do painel saiu de [#7](https://github.com/FerndsTech/alves-assessoria/issues/7) e virou ticket próprio, em 22/08/2026.

### Home de referência — Chaib, Ribeiro & Severo Advogados

- **Tipo:** print de página inteira + PDF
- **Onde:** [`ModeloHome.jpg`](ModeloHome.jpg) · [`Home.pdf`](Home.pdf)
- **O que eu quero daqui:** *(PROPOSTA — confirmar)*
  - **O "+" no canto do card de advogado** como sinal visível de que o card abre algo. Responde direto ao requisito de afordância de clique da emenda 2 do [#17](https://github.com/FerndsTech/alves-assessoria/issues/17)
  - **A barra de navegação fixa no topo**, com âncoras para as seções
  - **A faixa corrida de áreas de atuação** entre seções, como divisor
  - **As áreas de atuação como cards que expandem**, em vez de lista
  - **A densidade e o ritmo** — seções alternando fundo claro e escuro, com respiro entre elas
  - **O nível de acabamento** em geral: é a régua de "premium" que o mapa pede
- **O que eu NÃO quero:** *(PROPOSTA — confirmar)*
  - **O selo "avaliado em 5 estrelas no Google"** no herói. **Vedado** — CED art. 42, IV e toda a família de prova social derrubada por [#2](https://github.com/FerndsTech/alves-assessoria/issues/2)
  - **O formulário de contato.** Contradiz [#9](https://github.com/FerndsTech/alves-assessoria/issues/9): o site é **100% estático, sem backend**, e emite `wa.me` e nada mais. Formulário traz coleta de dado e LGPD junto
  - **"Plantão 24h para urgências".** Colide com o horário publicado (*seg–sex, 08h–16h, mediante hora marcada*) e é afirmação sobre estrutura do escritório (Prov. 205 art. 6º)
  - **A densidade de CTA** — a referência repete "Entre em contato" seis vezes ou mais. [#17](https://github.com/FerndsTech/alves-assessoria/issues/17), emendado, fixou **dois** blocos no corpo mais o do rodapé
  - **A seção "Como é o processo"** — descrever o método de trabalho como etapas se aproxima de ofertar serviço
  - **A paleta preto e dourado.** A nossa é vermelho, preto e branco, com os tokens já verificados em AA por [#5](https://github.com/FerndsTech/alves-assessoria/issues/5)
  - **O herói com foto dos sócios em cenário de escritório** — o nosso herói é logo de fundo, e a vedação de estrutura física (Prov. 205 art. 6º) recomenda cautela com cenário
- **Alimenta:** [#6](https://github.com/FerndsTech/alves-assessoria/issues/6) itens 9–11 (linha de base × enriquecimento) · [#20](https://github.com/FerndsTech/alves-assessoria/issues/20) (afordância do card) · [#10](https://github.com/FerndsTech/alves-assessoria/issues/10) e [#11](https://github.com/FerndsTech/alves-assessoria/issues/11) como referência de forma
