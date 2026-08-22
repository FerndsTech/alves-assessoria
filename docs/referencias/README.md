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

> ⚠️ **Regra de leitura destas duas entradas, fixada pelo Murilo em 22/08/2026.**
>
> **Nenhum elemento destas referências entra no projeto. Só a ideia por trás delas.**
>
> Não é para copiar um botão, um ícone, um espaçamento, um texto ou uma cor. É para entender o **princípio** que a referência demonstra e implementá-lo com os elementos que **este** projeto já decidiu. Quando a referência e uma decisão do mapa divergirem, **a decisão do mapa vence** — a referência não tem voto.
>
> Isto é o que separa referência de alvo. Uma referência lida como alvo produz um site que é a média de sites alheios.

### Seção de advogados — AG Sociedade de Advogados

- **Tipo:** prints de site de terceiro (2 telas)
- **Onde:** [`ModeloSectionAdv1.png`](ModeloSectionAdv1.png) (a grade de cards) · [`ModeloSectionAdv2.png`](ModeloSectionAdv2.png) (o painel aberto)
- **O que eu quero daqui:** **o princípio da seção de advogados, e só ele** — uma grade de cards de advogado onde **clicar num card abre um layout maior daquele advogado**, sem sair da página. É o *estilo de painel* que eu quero, não o painel dela.
- **O que eu NÃO quero:** **nenhum elemento dela.** Nada de texto, rótulo, paleta, tipografia, ícone, enquadramento ou disposição interna. O nosso painel carrega **o que já foi decidido no mapa** — número de OAB, botão de WhatsApp próprio, áreas de atuação, unidade e endereço, dias de atuação, redes sociais, foto ampliada — e nenhum desses elementos vem daqui.
- **Alimenta:** [#20 — Layout do painel do advogado](https://github.com/FerndsTech/alves-assessoria/issues/20)

> ⚠️ **Insumo obrigatório de [#20](https://github.com/FerndsTech/alves-assessoria/issues/20)** — aquele ticket não começava sem esta entrada. Foi por falta dela que o layout do painel saiu de [#7](https://github.com/FerndsTech/alves-assessoria/issues/7) e virou ticket próprio, em 22/08/2026.

### Modelo de home — Chaib, Ribeiro & Severo Advogados

- **Tipo:** print de página inteira + PDF
- **Onde:** [`ModeloHome.jpg`](ModeloHome.jpg) · [`Home.pdf`](Home.pdf)
- **O que eu quero daqui:** **o modelo de home, no sentido de esqueleto** — como as seções se empilham no eixo **Y** e como o conteúdo se organiza no eixo **X** dentro de cada uma. Ritmo vertical, largura útil, alternância entre blocos, respiro entre seções.
- **O que eu NÃO quero:** **as seções dela, o conteúdo dela e as funcionalidades dela.** As 7 seções do nosso site e a ordem delas já estão fixadas em [#17](https://github.com/FerndsTech/alves-assessoria/issues/17) e não se discutem por esta referência. Nada de paleta, tipografia, textos, formulário ou recursos.
- **Alimenta:** o esqueleto da home · [#6](https://github.com/FerndsTech/alves-assessoria/issues/6) itens 9–11 (linha de base × enriquecimento)

---

## Achados de conformidade nestas referências

Registro separado, porque **não** são coisas a copiar nem a evitar por gosto — são coisas que, se entrassem por descuido, violariam norma da OAB já apurada em [Limites da OAB](https://github.com/FerndsTech/alves-assessoria/issues/2). Ficam aqui como alerta, não como instrução de design.

| Presente na referência | Por que não pode existir no nosso |
|---|---|
| Selo *"avaliado em 5 estrelas no Google"* | CED art. 42, IV — avaliação é prova social, vedada |
| Rótulo *"Especialista em ..."* sob o nome | Prov. 205 art. 3º, III — só com título certificado ou notória especialização. O nosso escreve *"Atua em: ..."* |
| *"altamente qualificados"*, *"vasta experiência"*, *"resultados eficazes"* | Prov. 205 art. 3º, IV (superlativo) e art. 6º (promessa de resultado) |
| *"Plantão 24h para urgências"* | Colide com o horário publicado e afirma sobre estrutura do escritório (Prov. 205 art. 6º) |
| Formulário de contato | Não é vedação da OAB, é decisão do projeto: [#9](https://github.com/FerndsTech/alves-assessoria/issues/9) fixou site **100% estático, sem backend** |
| Ausência de número de OAB nos cards | O nosso é **obrigado** a exibir (CED art. 44, caput) |
