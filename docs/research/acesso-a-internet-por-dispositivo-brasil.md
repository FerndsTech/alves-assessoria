# Acesso à internet por dispositivo no Brasil: o idoso, o Nordeste e o celular sozinho

Pesquisa fechada em **21/08/2026**. Duas pesquisas oficiais medem isso no Brasil — a **TIC Domicílios** (CGI.br/NIC.br/Cetic.br) e o **módulo TIC da PNAD Contínua** (IBGE) — e elas **não são intercambiáveis**. Ambas foram usadas aqui, cada número com seu universo declarado. Onde a fonte primária não confirmou, está escrito **"não confirmado em fonte primária"**. A parte de mobile-first indexing foi verificada contra a documentação do Google Search Central, com a data de última atualização da página registrada.

## Fontes primárias

Nenhuma afirmação numérica abaixo vem de blog, portal de notícias privado, agregador ou resumo de terceiro.

| Fonte | O que é |
| --- | --- |
| [**TIC Domicílios 2025 — Tabelas (Indivíduos)**](https://cetic.br/pt/tics/domicilios/2025/individuos/) e [**(Domicílios)**](https://cetic.br/pt/tics/domicilios/2025/domicilios/) (Cetic.br) | Tabelas oficiais de indicadores, edição 2025 — a mais recente publicada. Cada tabela declara sua base (o "olho") e traz os cortes por área, região, sexo, cor/raça, grau de instrução, faixa etária, renda e classe social |
| [**TIC Domicílios 2025 — Coletiva de imprensa, 09/12/2025**](https://cetic.br/media/analises/tic_domicilios_2025_principais_resultados.pdf) (PDF, CGI.br) | Slide de metodologia (amostra, período de coleta) e os recortes destacados pela própria coordenação da pesquisa |
| [**Metodologia da TIC Domicílios**](https://cetic.br/pt/pesquisa/domicilios/) (Cetic.br) | Define unidades de análise, população-alvo e desenho amostral |
| [**PNAD Contínua — Acesso à Internet e à televisão e posse de telefone móvel celular para uso pessoal 2025**](https://biblioteca.ibge.gov.br/index.php/biblioteca-catalogo?view=detalhes&id=2102290) → [informativo em PDF](https://biblioteca.ibge.gov.br/visualizacao/livros/liv102290_informativo.pdf) (IBGE, © IBGE 2026) | Publicação oficial da edição 2025 |
| [**PNAD Contínua — Notas técnicas (v. 1.20)**](https://biblioteca.ibge.gov.br/visualizacao/livros/liv102269_notas_tecnicas.pdf) (IBGE, PDF) | Conceitos e definições. É aqui que está o que conta como "utilizou a Internet" e a lista fechada de equipamentos |
| [**Release IBGE — "Proporção de usuários da internet no país ultrapassou 90%..."**](https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/47408-proporcao-de-usuarios-da-internet-no-pais-ultrapassou-90-da-populacao-de-10-anos-ou-mais-em-2025) | Publicado **02/07/2026**, atualizado em **06/07/2026**. Números de pessoas |
| [**Release IBGE — "Internet chega a 95% de domicílios do país em 2025"**](https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/47410-internet-chega-a-95-de-domicilios-do-pais-em-2025) | Publicado **02/07/2026**, atualizado em **06/07/2026**. Números de domicílios |
| **SIDRA / API de agregados do IBGE** — tabelas [**7387**](https://sidra.ibge.gov.br/tabela/7387), [**7343**](https://sidra.ibge.gov.br/tabela/7343), [**7334**](https://sidra.ibge.gov.br/tabela/7334) | Onde está o corte **"Utilizaram somente telefone móvel celular"**, inclusive por Unidade da Federação. Consultado em 21/08/2026 via `servicodados.ibge.gov.br/api/v3/agregados` |
| [**Google Search Central — "Mobile site and mobile-first indexing best practices"**](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) | Documentação vigente. Rodapé: **"Last updated 2025-12-10 UTC"** |
| [**Search Central Blog, 31/10/2023 — "Mobile-first indexing has landed"**](https://developers.google.com/search/blog/2023/10/mobile-first-is-here) | Anúncio de conclusão da migração |
| [**Search Central Blog, 03/06/2024 — "Mobile-indexing-vLast-final-final.doc"**](https://developers.google.com/search/blog/2024/06/mobile-indexing-vlast-final-final.doc) | Último passo: rastreamento só com Googlebot Smartphone a partir de 05/07/2024 |

---

## Aviso metodológico: por que TIC e PNAD dão números diferentes — e por que os dois estão certos

Este é o ponto que mais se erra ao citar "X% acessa só pelo celular". Existem **três** definições circulando, e elas medem coisas diferentes:

| Indicador | Pesquisa / tabela | Base (universo) | O que exclui | Brasil 2025 |
| --- | --- | --- | --- | --- |
| **"Apenas telefone celular"** | TIC Domicílios 2025, **C16A** | Total de usuários de Internet | Compara **só** celular × computador. **Televisão e tablet não entram na conta** | **65%** |
| **"Apenas telefone celular"** | TIC Domicílios 2025, **C16B** | Total de usuários de Internet | Exclui computador **e** televisão | **32%** |
| **"Utilizaram somente telefone móvel celular"** | PNAD Contínua TIC 2025, SIDRA **7387** | Pessoas de 10 anos ou mais que usaram Internet nos últimos 3 meses | Exclui microcomputador, tablet, televisão **e** outro equipamento eletrônico | **34,2%** |

Os dois números que **de fato conversam** são o **32%** da TIC (C16B) e o **34,2%** do IBGE. Já o **65%** da C16A responde a outra pergunta — *"quem usa celular e não usa computador?"* — e é o número certo quando a preocupação é **"esta pessoa consegue preencher um formulário longo, imprimir, digitalizar?"**.

**Outras diferenças que importam antes de comparar qualquer célula das duas tabelas:**

- **Universo.** TIC Domicílios: indivíduos de **10 anos ou mais** em domicílios particulares, urbanos e rurais, com entrevista **presencial (CAPI)**; amostra de **27.177 domicílios respondentes** e **24.535 indivíduos respondentes**; **coleta de março a agosto de 2025** (coletiva de 09/12/2025). PNAD Contínua: módulo TIC investigado no **quarto trimestre de 2025** (informativo, p. 1), pessoas de **10 anos ou mais**, referência dos **últimos 90 dias que antecederam a entrevista** (Notas técnicas).
- **Quem conta como usuário.** O IBGE é explícito nas Notas técnicas: *"Não se considerou como tendo utilizado a Internet a pessoa que solicitou a outrem para fazer o acesso de seu interesse por não saber usar microcomputador ou a Internet."* Ou seja, **acesso por procuração não conta**. A TIC usa um **"indicador ampliado"** (C2A) que, pela nota da própria tabela, *"inclui os usuários de Internet, os usuários de Internet no telefone celular e os usuários de aplicações que necessitam de conexão à Internet"* — desenhado justamente para capturar quem usa WhatsApp mas não se declara usuário de internet.
- **Resultado prático dessa diferença:** TIC 2025 → **88%** da população é usuária (C2A). PNAD 2025 → **90,5%** das pessoas de 10+ usaram internet nos últimos três meses. São métricas distintas que por acaso chegam perto.
- **Classe social.** Os cortes A/B/C/DE existem **só** na TIC Domicílios (critério de classificação econômica). O IBGE corta por **classes de rendimento** e por **situação do domicílio**, não por classe.

---

## Quadro de vereditos

| Pergunta | Resposta direta | Fonte |
| --- | --- | --- |
| O celular é hegemônico? | **Sim, quase universal.** 98,7% dos usuários de internet de 10+ acessaram por celular (PNAD 2025); 99% (TIC 2025, C16) | PNAD/SIDRA 7387; TIC C16 |
| Quantos idosos usam internet? | **74,5%** das pessoas de 60+ (PNAD 2025) — **+4,4 p.p.** em um ano, a maior alta de qualquer faixa | Release IBGE 02/07/2026 |
| Idoso usuário acessa só pelo celular? | **81%** dos usuários de 60+ usam celular e **não** usam computador (TIC 2025, C16A). Pelo corte mais estrito — nem computador, nem TV — são **55%** (C16B) | TIC C16A / C16B |
| Idoso usa computador? | **Não.** Só **18%** dos usuários de internet de 60+ usaram computador; **4%** usaram tablet | TIC C16 |
| E televisão? | **33%** dos usuários de 60+ acessaram internet pela TV — bem abaixo dos 58% do total | TIC C16 |
| O Nordeste é mais dependente do celular? | **Sim, e por larga margem.** 43,6% dos usuários nordestinos usaram **somente** celular, contra 34,2% no Brasil e 23,2% no Sul | SIDRA 7387 |
| E a área rural do Nordeste? | **Só 5,0%** dos usuários rurais do Nordeste usaram microcomputador; **1,8%** tablet; **34,1%** televisão; **98,7%** celular | SIDRA 7343 |
| Existe recorte "municípios pequenos do interior"? | **Não existe** em nenhuma das duas pesquisas. Ver seção 3 para os cortes que existem de fato | — |
| Conexão é confiável? | **Não para todos.** 49% dos usuários de internet pelo celular no Nordeste tiveram o pacote de dados acabado ao menos uma vez em três meses (39% no Brasil) | TIC J7 |
| WhatsApp é o canal? | **Sim.** 83% dos usuários de internet de 60+ mandaram mensagens instantâneas; só 40% usaram e-mail e 57% redes sociais | TIC C5 |
| Mobile-first indexing acabou? | **Sim.** Google declarou a migração completa em **31/10/2023** e passou a rastrear tudo só com Googlebot Smartphone **após 05/07/2024** | Search Central Blog |
| Site que não abre no celular é indexado? | **Não.** *"If your site's content is not accessible at all with a mobile device, it will no longer be indexable."* | Blog 03/06/2024 |

---

## 1. O retrato nacional em 2025

### 1.1 Quantas pessoas usam, e quantas não usam

| Indicador | Valor | Universo | Fonte |
| --- | --- | --- | --- |
| Usuários de internet (últimos 3 meses) | **90,5%** — 168,7 milhões | Pessoas de 10 anos ou mais (população estimada de 186,4 milhões) | PNAD TIC 2025 |
| Não usuários | **9,5%** — 17,7 milhões | idem | PNAD TIC 2025 |
| Principal motivo de não usar | **44,9%** "não saber utilizar a Internet" | Pessoas de 10+ que não usaram | PNAD TIC 2025 |
| Mesmo motivo, entre idosos | **66,5%** | Pessoas de 60+ que não usaram | PNAD TIC 2025 |
| Usuários de internet (indicador ampliado) | **88%** | Total da população (10+) | TIC Domicílios 2025, C2A |
| Não usuários de internet | **28 milhões de pessoas**, dos quais **16 milhões têm 60 anos ou mais** e **9 milhões estão no Nordeste** | Total da população | TIC Domicílios 2025, coletiva 09/12/2025 |

**A leitura mais dura desses números:** dos 28 milhões de brasileiros fora da internet segundo a TIC, **mais da metade são idosos**. Não é um público marginal para uma assessoria previdenciária — é o público.

### 1.2 Dispositivos — os dois retratos lado a lado

**PNAD Contínua TIC 2025** — base: pessoas de 10+ que utilizaram Internet nos últimos três meses (múltipla escolha):

| Equipamento | Brasil | Nordeste |
| --- | --- | --- |
| Telefone móvel celular | **98,7%** | 98,7% |
| Televisão | 57,8% | 51,1% |
| Microcomputador | 33,4% | 21,1% |
| Tablet | 9,2% | 6,7% |
| **Somente telefone móvel celular** | **34,2%** | **43,6%** |

*(SIDRA 7387, variável 5000, período 2025, consultado em 21/08/2026.)*

**TIC Domicílios 2025, tabela C16** — base: total de usuários de Internet (múltipla escolha):

| Dispositivo | Total | Nordeste | Rural | 60 anos ou mais | Classe DE |
| --- | --- | --- | --- | --- | --- |
| Telefone celular | 99% | 99% | 99% | **98%** | 99% |
| Televisão | 58% | 57% | 49% | **33%** | 46% |
| Computador (total) | 35% | 23% | 16% | **18%** | 12% |
| — computador de mesa | 18% | 11% | 7% | 10% | 5% |
| — notebook | 25% | 16% | 11% | 10% | 6% |
| Tablet | 9% | 6% | 4% | **4%** | 4% |
| Aparelho de videogame | 11% | 5% | 5% | 3% | 3% |

### 1.3 Domicílios (não confundir com pessoas)

| Indicador | Valor | Universo | Fonte |
| --- | --- | --- | --- |
| Domicílios com internet | **95,0%** — 76,0 milhões | Domicílios particulares permanentes | PNAD TIC 2025 |
| — área urbana / rural | 95,8% / **88,0%** | idem | PNAD TIC 2025 |
| Domicílios com microcomputador | **38,7%** | idem | PNAD TIC 2025 |
| Domicílios com celular | **97,4%** (máximo da série) | idem | PNAD TIC 2025 |
| Domicílios onde a rede móvel funciona | 92,9% total, **68,0% na área rural** | idem | PNAD TIC 2025 |
| Domicílios com internet | **86%** | Total de domicílios | TIC 2025, A4 |
| Domicílios com computador | **32%** (Nordeste 22%, rural 15%, classe DE 10%) | Total de domicílios | TIC 2025, A1 |

**Divergência declarada:** PNAD diz 95,0% dos domicílios com internet; TIC diz 86%. São desenhos amostrais, períodos de campo e formulações de pergunta diferentes. **Não some, não faça média, não escolha o mais conveniente** — cite a fonte junto do número.

---

## 2. Recorte 1 — Pessoas de 60 anos ou mais

### 2.1 Quantos estão on-line

| Indicador | Valor | Universo | Fonte |
| --- | --- | --- | --- |
| Usaram internet nos últimos 3 meses | **74,5%** | Pessoas de 60+ | PNAD TIC 2025 |
| Variação 2024→2025 | **+4,4 p.p.** — a maior alta entre todas as faixas | idem | PNAD TIC 2025 |
| Usuários de internet (ampliado) | **59%** | Pessoas de 60+ (total da população da faixa) | TIC 2025, C2A |
| Tinham celular para uso pessoal | **80,3%** | Pessoas de 60+ | PNAD TIC 2025 |
| Faixa imediatamente anterior (50-59) | 91,8% de uso de internet | Pessoas de 50-59 | PNAD TIC 2025 (SIDRA 7334) |

**A queda é abrupta e acontece exatamente na fronteira dos 60 anos:** 91,8% → 74,5% na PNAD. A TIC mostra o mesmo degrau com outra régua: 90% (45-59) → 59% (60+) no C2A.

**Divergência declarada, de novo:** 74,5% (PNAD) contra 59% (TIC). A distância aqui é grande — maior do que na média nacional. **Não confirmado em fonte primária** o motivo exato da diferença nessa faixa; as causas plausíveis são o desenho amostral e a exclusão do acesso por procuração na PNAD, mas isso é hipótese, não dado.

### 2.2 Como acessam — a resposta central desta pesquisa

**TIC Domicílios 2025, C16A** — base: total de usuários de Internet:

| Faixa etária | Apenas computador | **Apenas telefone celular** | Ambos | Nenhum |
| --- | --- | --- | --- | --- |
| De 10 a 15 anos | 2% | 68% | 28% | 2% |
| De 16 a 24 anos | 1% | 56% | 43% | 0% |
| De 25 a 34 anos | 0% | 57% | 43% | 0% |
| De 35 a 44 anos | 0% | 61% | 39% | 0% |
| De 45 a 59 anos | 0% | 71% | 28% | 1% |
| **De 60 anos ou mais** | 1% | **81%** | **17%** | 1% |
| TOTAL | 0% | 65% | 34% | 1% |

**TIC Domicílios 2025, C16B** — base: total de usuários de Internet, combinação exclusiva de dispositivos:

| Recorte | **Apenas celular** | Celular + TV | Computador + celular | Computador + celular + TV | Outras combinações |
| --- | --- | --- | --- | --- | --- |
| TOTAL | 32% | 28% | 8% | 19% | 12% |
| **De 60 anos ou mais** | **55%** | 24% | 10% | 6% | 5% |
| De 45 a 59 anos | 42% | 28% | 8% | 18% | 5% |
| Nordeste | 38% | 36% | 5% | 15% | 7% |
| Rural | 47% | 34% | 4% | 8% | 7% |
| Classe DE | 50% | 35% | 4% | 7% | 5% |

**Resposta à pergunta "quantos idosos acessam exclusivamente por celular":** depende da régua, e as duas são defensáveis.

- **81%** dos usuários de internet de 60+ usam celular e **não usam computador** (C16A).
- **55%** usam **apenas** o celular — nem computador, nem televisão (C16B).
- **Não existe** na PNAD Contínua o cruzamento "somente telefone móvel celular" × faixa etária. Verifiquei os agregados 7337, 7343, 7387, 7327 e 7334: o corte por equipamento e o corte por grupo de idade existem separadamente, **nunca juntos**. Portanto, o equivalente IBGE do "81% dos idosos" **não está publicado** — usar a TIC para essa afirmação, citando-a.

### 2.3 O que fazem quando estão on-line

**TIC 2025, C5** — base: total de usuários de Internet:

| Atividade | Total | **60 anos ou mais** | Nordeste | Rural | Classe DE |
| --- | --- | --- | --- | --- | --- |
| Mandou mensagens instantâneas | 92% | **83%** | 89% | 85% | 84% |
| Conversou por chamada de voz ou vídeo | 80% | **76%** | 75% | 73% | 71% |
| Usou redes sociais | 81% | **57%** | 76% | 73% | 73% |
| Enviou e recebeu e-mails | 59% | **40%** | 49% | 39% | 40% |

**TIC 2025, C4A** (local de acesso individual mais frequente): **95%** dos usuários de 60+ acessam principalmente **em casa** — o maior percentual de qualquer faixa (média nacional: 86%). No Nordeste, 89%; na área rural, 92%.

**TIC 2025, J6** (base: usuários de Internet pelo telefone celular): entre os de 60+, **88%** usam Wi-Fi e **70%** usam rede móvel — ambos abaixo da média. Na área rural, Wi-Fi 96% e rede móvel 62%; no Nordeste, Wi-Fi 97% e rede móvel 66%.

### 2.4 Habilidades digitais — o dado mais incômodo

**TIC 2025, I1A** — base: total de usuários de Internet. Percentual que declarou **"nenhuma das opções"** de habilidade digital:

| Recorte | "Nenhuma das opções" |
| --- | --- |
| TOTAL | 29% |
| **De 60 anos ou mais** | **57%** |
| Rural | 44% |
| Classe DE | 43% |
| Nordeste | 37% |

Nas habilidades individuais, entre os usuários de 60+: **12%** já instalaram um aplicativo; **18%** já anexaram documento, imagem ou vídeo a uma mensagem; **27%** já verificaram se uma informação encontrada na internet era verdadeira; **23%** já adotaram medida de segurança como senha forte ou verificação em duas etapas.

**Consequência direta para um site previdenciário:** um fluxo que dependa de *instalar app*, *anexar documento* ou *habilitar 2FA* elimina a maioria do público-alvo na primeira etapa. Isso conversa diretamente com o gargalo já mapeado em [autoconsulta-beneficio-inss.md](./autoconsulta-beneficio-inss.md), seção 6: o Registrato exige conta gov.br **prata ou ouro com verificação em duas etapas**.

### 2.5 Governo eletrônico e o gov.br

**TIC 2025, G1 e G6** — base: usuários de Internet com **16 anos ou mais**:

| Indicador | Total | **60+** | Nordeste | Rural | Classe DE |
| --- | --- | --- | --- | --- | --- |
| Usou governo eletrônico nos últimos 12 meses (G1) | 71% | **53%** | 63% | 53% | 56% |
| Acessou o gov.br **ou pediu a outra pessoa** (G6, total) | 56% | **34%** | 48% | 41% | 35% |
| Acessou o gov.br **para si mesmo** (G6) | 49% | **24%** | 40% | 32% | 28% |
| **Pediu a outra pessoa** para acessar o gov.br por si (G6) | 12% | **17%** | 13% | 13% | 10% |

**TIC 2025, G2** — informação ou serviço público procurado nos últimos 12 meses, base: usuários de Internet de 16+. Categoria *"Direito do trabalhador ou previdência social, como INSS, FGTS, seguro-desemprego, auxílio-doença ou aposentadoria"*: **29%** no total, **17%** entre os de 60+, **25%** no Nordeste, **20%** na área rural, **22%** na classe DE.

O número que mais diz alguma coisa aqui é o **17% que pediram a outra pessoa** para acessar o gov.br em seu nome — a taxa mais alta de qualquer faixa etária. **O intermediário humano é parte do fluxo real**, não uma exceção.

---

## 3. Recorte 2 — Nordeste, área rural, classes C/D/E

### 3.1 O corte pedido não existe. Estes existem.

**"Municípios pequenos do interior do Nordeste" não é um corte publicado por nenhuma das duas pesquisas.** Isso foi verificado, não presumido:

- **TIC Domicílios 2025:** a tabela expandida da C16A ([versão expandida](https://cetic.br/pt/tics/domicilios/2025/individuos/C16A/expandido/)) tem exatamente estes grupos de corte — TOTAL, ÁREA, REGIÃO, SEXO, COR OU RAÇA, GRAU DE INSTRUÇÃO, FAIXA ETÁRIA, RENDA FAMILIAR, CLASSE SOCIAL, CONDIÇÃO DE ATIVIDADE, TIPO DE OCUPAÇÃO. **Não há porte de município, não há UF, não há "interior".**
- **PNAD Contínua TIC 2025:** o nível territorial mais fino publicado é **Unidade da Federação** (mais Regiões Metropolitanas e RIDEs). **Não há município nem faixa populacional de município.**

Os quatro cortes mais próximos que **de fato existem**, em ordem de utilidade:

1. **Região Nordeste** (as duas pesquisas)
2. **Área rural** (as duas pesquisas) — e o cruzamento **rural × Nordeste** existe na PNAD via SIDRA 7343
3. **Classe social C e DE** (só TIC Domicílios) / **classes de rendimento** (só PNAD)
4. **Unidade da Federação** (só PNAD) — Maranhão e Piauí funcionam como proxies razoáveis de "Nordeste menos metropolitano"

### 3.2 Nordeste × área rural — o cruzamento que existe

**PNAD Contínua TIC 2025, SIDRA 7343** — base: pessoas de 10+ que utilizaram Internet nos últimos três meses:

| Equipamento | Brasil urbano | Brasil rural | **Nordeste urbano** | **Nordeste rural** |
| --- | --- | --- | --- | --- |
| Telefone móvel celular | 98,8% | 98,6% | 98,7% | **98,7%** |
| Televisão | 60,0% | 39,7% | 55,3% | **34,1%** |
| Microcomputador | 36,2% | 9,8% | 25,1% | **5,0%** |
| Tablet | 10,0% | 2,3% | 7,9% | **1,8%** |

**Este é o número mais próximo do recorte pedido: na área rural do Nordeste, 1 usuário de internet em cada 20 usa um computador.**

> **Inferência (não é dado publicado).** O IBGE **não publica** "utilizaram somente telefone móvel celular" cruzado com situação do domicílio. Combinando as incidências acima — e **desconsiderando** a categoria "outro equipamento eletrônico", que não aparece nesse cruzamento —, no máximo 40,9% dos usuários rurais do Nordeste usaram computador, tablet ou TV (5,0 + 1,8 + 34,1, um teto por soma simples que ignora sobreposições). Logo, **pelo menos ~59% usaram nenhum deles**, e como 98,7% usaram celular, **pelo menos ~58% usaram somente o celular**. É um piso, não uma estimativa, e vale só sob a ressalva declarada. Se o site publicar um número, publique o **43,6% do Nordeste inteiro (SIDRA 7387)**, que é dado publicado.

### 3.3 Região e Unidade da Federação

**PNAD 2025, SIDRA 7387 — "Utilizaram somente telefone móvel celular"** (base: usuários de internet de 10+):

| Região | 2023 | 2024 | **2025** |
| --- | --- | --- | --- |
| Brasil | 40,4% | 37,8% | **34,2%** |
| Nordeste | 50,9% | 47,5% | **43,6%** |
| Norte | — | — | **44,3%** |
| Centro-Oeste | — | — | **34,2%** |
| Sudeste | — | — | **30,3%** |
| Sul | — | — | **23,2%** |

**Por UF do Nordeste, 2025** (SIDRA 7387 e 7334, consultados em 21/08/2026):

| UF | Somente celular (usuários 10+) | Usaram microcomputador | Usaram televisão | Uso de internet entre 60+ |
| --- | --- | --- | --- | --- |
| Piauí | **50,3%** | 22,5% | 40,5% | 65,1% |
| Maranhão | **50,1%** | 15,9% | 44,3% | 66,1% |
| Ceará | 47,1% | 18,8% | 47,5% | 63,3% |
| Bahia | 44,4% | 21,3% | 50,3% | 69,6% |
| Rio Grande do Norte | 42,1% | 25,7% | 51,8% | 69,6% |
| Sergipe | 41,2% | 21,7% | 54,6% | 70,4% |
| Alagoas | 40,3% | 20,1% | 56,0% | 63,8% |
| Paraíba | 38,0% | 23,8% | 57,9% | 65,4% |
| Pernambuco | 36,6% | 23,7% | 58,8% | 67,7% |
| *Brasil* | *34,2%* | *33,4%* | *57,8%* | *74,5%* |

E o Nordeste como um todo: **88,5%** de uso de internet entre pessoas de 10+ (urbana 91,5%, rural 83,0%), contra 90,5% no Brasil; **67,0%** entre os de 60 anos ou mais, contra 74,5% no Brasil — a menor taxa de uso entre idosos de todas as grandes regiões.

### 3.4 Classe social — só TIC Domicílios

**C16A**, base: total de usuários de Internet:

| Classe | Apenas computador | **Apenas telefone celular** | Ambos | Nenhum |
| --- | --- | --- | --- | --- |
| A | 0% | 5% | 95% | 0% |
| B | 0% | 35% | 65% | 0% |
| **C** | 0% | **67%** | 32% | 1% |
| **DE** | 1% | **87%** | 11% | 1% |

E por renda familiar: **até 1 salário mínimo, 85%** acessam apenas por celular; de 1 a 2 SM, 76%. Por grau de instrução: **analfabeto/educação infantil, 96%**; ensino fundamental, 84%.

O gradiente é quase perfeito e não é sutil: **classe A, 5% de acesso exclusivo por celular; classe DE, 87%.** Um site desenhado por quem está na classe A é desenhado para 5% do problema.

### 3.5 Domicílios do Nordeste

- **A4 (TIC):** 84% dos domicílios do Nordeste têm acesso à internet (Brasil 86%); classe DE, 73%.
- **A1 (TIC):** 22% dos domicílios do Nordeste têm computador (Brasil 32%); área rural 15%; classe DE 10%.
- **PNAD:** o Nordeste tem a **maior** proporção de domicílios com banda larga fixa (**92,8%**) e a **menor** com banda larga móvel (**72,4%**) entre as regiões.
- **PNAD:** **4,3%** dos domicílios do Nordeste não tinham telefone algum — fixo ou móvel — a maior proporção do país.

---

## 4. A restrição que quase ninguém considera: o pacote de dados acaba

Este bloco é inédito na TIC Domicílios 2025 e é, para efeito de projeto de site, o achado mais acionável desta pesquisa.

**TIC 2025, J7** — base: **usuários de Internet pelo telefone celular**. Pergunta: o pacote de dados do plano acabou pelo menos uma vez nos últimos três meses?

| Recorte | Sim | Não |
| --- | --- | --- |
| TOTAL | **39%** | 55% |
| Norte | **54%** | 37% |
| **Nordeste** | **49%** | 42% |
| Rural | **46%** | 43% |
| **Classe DE** | **49%** | 41% |
| Classe C | 40% | 55% |
| Renda até 1 SM | 46% | 43% |
| De 60 anos ou mais | 22% | 73% |
| Classe A | 12% | 87% |

Da coletiva de 09/12/2025: **64 milhões de indivíduos** afirmaram que o pacote de dados acabou pelo menos uma vez nos últimos três meses, e a proporção foi de **68% entre indivíduos com telefone celular pré-pago**.

**E pré-pago é a norma no público-alvo. TIC 2025, J3** — base: pessoas que possuem telefone celular:

| Recorte | Pré-pago | Pós-pago | Controle |
| --- | --- | --- | --- |
| TOTAL | 52% | 19% | 21% |
| **Nordeste** | **61%** | 9% | 14% |
| Rural | 62% | 11% | 12% |
| **Classe DE** | **61%** | 9% | 14% |
| De 60 anos ou mais | 41% | 24% | 23% |

**TIC 2025, J8A** — o que acontece depois que o pacote acaba. Base: usuários de Internet pelo telefone celular:

| Recorte | Conseguiu usar todos os apps | Só alguns | **Nenhum** | Não se aplica |
| --- | --- | --- | --- | --- |
| TOTAL | 8% | 16% | **15%** | 61% |
| **Rural** | 6% | 17% | **24%** | 54% |
| **Classe DE** | 9% | 18% | **22%** | 51% |
| Nordeste | 11% | 18% | **20%** | 51% |
| De 60 anos ou mais | 2% | 7% | 13% | 78% |

Ou seja: entre todos os usuários de internet pelo celular, **um em cada cinco na classe DE e quase um em cada quatro na área rural ficou sem conseguir usar nenhum aplicativo** depois que o pacote acabou. Isso não é lentidão — é indisponibilidade.

---

## 5. Mobile-first indexing — estado atual na documentação do Google

### 5.1 A migração está concluída, e há duas datas

| Data | O que aconteceu | Fonte |
| --- | --- | --- |
| **31/10/2023** | Google declara a migração concluída: *"We're delighted to announce that the trek to Mobile First Indexing is now complete."* Desliga a informação de crawler de indexação nas configurações do Search Console | [Search Central Blog, "Mobile-first indexing has landed"](https://developers.google.com/search/blog/2023/10/mobile-first-is-here) |
| **05/07/2024** | Último passo: o pequeno conjunto de sites ainda rastreado com o Googlebot Desktop passa a ser rastreado com o Googlebot Smartphone. *"After July 5, 2024, we'll crawl and index these sites with only Googlebot Smartphone."* | [Search Central Blog, "Mobile-indexing-vLast-final-final.doc", 03/06/2024](https://developers.google.com/search/blog/2024/06/mobile-indexing-vlast-final-final.doc) |

**O que a documentação diz hoje sobre sites que não abrem no celular.** A frase operativa está no post de 03/06/2024, assinado por John Mueller:

> *"If your site's content is not accessible at all with a mobile device, it will no longer be indexable."*

O post de 31/10/2023 já descrevia os três modos de falha que o Google encontrou nos sites que sobraram: *"the page shows errors to all mobile users"*, *"the mobile version of the site is blocked with robots.txt while the desktop version is allowed for crawling"*, ou *"all pages on the mobile site redirect to the homepage"* — e concluía: *"These are issues that Google can't resolve."*

**Ressalva textual que precisa ser registrada, porque parece contradizer o acima.** A página de documentação vigente abre com:

> *"While it's not required to have a mobile version of your pages to have your content included in Google's Search results, it is very strongly recommended."*

As duas afirmações convivem: um site **responsivo**, de URL única, não precisa de uma "versão móvel" separada — é isso que a frase da documentação diz. O que o post de 2024 diz é outra coisa: se o conteúdo **não for acessível de forma alguma por um dispositivo móvel**, ele deixa de ser indexável. **Não confirmado em fonte primária** qualquer reconciliação explícita entre as duas frases feita pelo próprio Google; a leitura acima é minha.

### 5.2 Existe ainda página dedicada? Não — foi absorvida

Verificado em 21/08/2026:

| URL | Resultado |
| --- | --- |
| `developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing` | **HTTP 200.** Título da página: **"Mobile site and mobile-first indexing best practices"**. Rodapé: **"Last updated 2025-12-10 UTC"** |
| `developers.google.com/search/mobile-sites/mobile-first-indexing` (URL antiga) | **Redireciona** para a página acima |
| `developers.google.com/search/docs/crawling-indexing/mobile/mobile-first-indexing` | **HTTP 404** |

**Conclusão:** não há mais página dedicada só a "mobile-first indexing". O conteúdo está inteiramente dentro de **"Mobile site and mobile-first indexing best practices"**, que é hoje o documento canônico. Os posts de blog de 2016 a 2024 continuam publicados como registro histórico.

### 5.3 O que a página vigente exige, em síntese

Citações diretas da documentação (últ. atualização 10/12/2025):

- **Configuração recomendada:** *"Google recommends Responsive Web Design because it's the easiest design pattern to implement and maintain."* A própria página avisa que seu conteúdo *"only apply to dynamic serving and separate URL configurations"* — num site responsivo, conteúdo e metadados já são os mesmos.
- **Paridade de conteúdo:** *"Only the content shown on the mobile site is used for indexing."* E: *"If it's your intention that the mobile page should have less content than the desktop page, you can expect some traffic loss."* A recomendação explícita para economizar espaço é *"moving content into accordions or tabs"* — sanfonas são permitidas, esconder conteúdo não é.
- **Lazy-load:** *"Don't lazy-load primary content upon user interaction. Google won't load content that requires user interactions (for example, swiping, clicking, or typing) to load."*
- **Metadados:** `title`, `meta description`, headings, dados estruturados e `alt` de imagens devem ser **equivalentes** entre as versões.
- **`robots`:** *"Use the same robots meta tags on the mobile and desktop site"*, com atenção especial a `noindex` e `nofollow`.
- **Imagens:** *"Don't use images that are too small or have a low resolution on the mobile site"* e *"Don't use URLs that change every time the page loads for images."*
- **Anúncios:** *"Follow the Better Ads Standard when displaying ads on mobile devices. For example, ads at the top of the page can take up too much room on a mobile device, which is a bad user experience."*
- **Capacidade:** *"Ensure that your mobile site has enough capacity to handle a potential increase in crawl rate on the mobile version of your site."*

---

## O que isso significa para o projeto do site — **leitura e implicação, não dado**

> **Esta seção é interpretação minha.** Nenhuma frase abaixo é resultado de pesquisa. Os números que a sustentam estão nas seções 1 a 5, com fonte e universo.

### O usuário modal deste site

Juntando os recortes: uma pessoa de **60 e poucos anos**, no **Nordeste**, classe **C ou DE**, que **acessa em casa** (95%), **por celular** e provavelmente **só por celular** (81% não usam computador), com **plano pré-pago** (61% no Nordeste), com risco relevante de **ficar sem dados antes do fim do mês** (49% no Nordeste), que **manda mensagem instantânea** (83%) mas **quase não usa e-mail** (40%), que **declara nenhuma habilidade digital** (57%), e que, quando precisa do gov.br, tem **17% de chance de pedir para outra pessoa fazer por ela** — a maior taxa de qualquer faixa etária.

### Sete decisões que decorrem disso

1. **Peso de página é requisito funcional, não otimização.** Com 49% dos usuários nordestinos ficando sem pacote e 20% deles não conseguindo usar **nenhum** aplicativo depois disso, uma página pesada não fica lenta — ela não abre. A meta deve ser HTML que renda conteúdo útil sem JavaScript, imagens comprimidas e nenhuma fonte externa bloqueante. Cada MB é um pedaço da franquia de alguém.
2. **Nada de app.** 12% dos usuários de 60+ já instalaram um aplicativo alguma vez. Instalar um app é a maior barreira possível para este público. Tudo tem que funcionar no **navegador do celular**, sem instalação e sem cadastro.
3. **Alvo de toque e tamanho de fonte generosos.** Não há dado sobre acuidade visual nesta pesquisa — isso é norma de acessibilidade (WCAG), fora do escopo. Mas o dado que existe, e que é a justificativa: **81% dos idosos usuários não têm computador**; a tela pequena é a única tela. O que na maioria dos sites é um ajuste de conforto, aqui é o canal inteiro.
4. **WhatsApp é o canal, e-mail não é.** 83% dos idosos usuários mandam mensagens instantâneas contra 40% que usam e-mail; no Nordeste, na área rural e na classe DE a distância é a mesma. Formulário que exija e-mail perde metade do público; botão de WhatsApp encontra-o onde ele já está. (Como esse botão pode ser enquadrado sem virar captação, ver [limites-oab-publicidade.md](./limites-oab-publicidade.md).)
5. **Escreva para o intermediário também.** 17% dos idosos usuários pedem a terceiros para acessar o gov.br por eles — filho, neto, vizinho. Uma página que só fale com o beneficiário perde o leitor que efetivamente executa. Vale ter instruções que funcionem para quem opera em nome de outra pessoa, incluindo os limites legais disso (a Lei 15.327/2026 **veda** contratação e desbloqueio de consignado por procuração — ver [autoconsulta-beneficio-inss.md](./autoconsulta-beneficio-inss.md), seção 3.1).
6. **Não presuma imprimir, digitalizar ou anexar.** Só 18% dos usuários de 60+ usam computador, e 18% já anexaram um arquivo a uma mensagem. Qualquer instrução que termine em "imprima o comprovante" ou "anexe o documento" morre aí. Prefira "salve o PDF no celular" e "mostre o código de autenticação".
7. **Mobile-first indexing não é mais uma checklist de SEO — é o piso.** Desde 05/07/2024 o Google rastreia e indexa **apenas** com o Googlebot Smartphone, e um site inacessível por celular deixa de ser indexável. Para este site, isso é redundante: o público já é 98,7% celular. A implicação prática que sobra é a de **paridade** — se algum conteúdo aparecer só numa versão "desktop" ou for carregado por interação do usuário, ele simplesmente não existe para o Google.

### Nota de manutenção

A TIC Domicílios sai anualmente (a edição 2025 foi apresentada em 09/12/2025). O módulo TIC da PNAD Contínua é coletado no 4º trimestre e divulgado no ano seguinte (a edição 2025 saiu em 02/07/2026). **Toda afirmação numérica publicada no site deve carregar a edição da pesquisa** — "TIC Domicílios 2025" ou "PNAD Contínua TIC 2025" — porque a próxima edição muda os números e não muda o texto sozinha.

---

## Limites desta pesquisa

- **"Municípios pequenos do interior do Nordeste" não existe como recorte.** Verificado nas duas fontes. TIC Domicílios não publica UF nem porte de município; PNAD Contínua TIC desce só até Unidade da Federação (mais RMs e RIDEs). Os substitutos oferecidos — Nordeste, rural, rural × Nordeste, classe DE, MA/PI — são aproximações **nomeadas**, não o corte pedido.
- **"Somente celular" × faixa etária não existe na PNAD.** Verificados os agregados 7327, 7334, 7337, 7343 e 7387: equipamento e grupo de idade nunca aparecem cruzados. O número "81% dos idosos usuários acessam apenas por celular" existe **só** na TIC Domicílios (C16A) e só com a definição dela.
- **"Somente celular" × situação do domicílio não existe na PNAD.** A tabela 7343, que traz rural/urbano por equipamento, **não inclui** as categorias "somente". O piso de ~58% para o Nordeste rural na seção 3.2 é **inferência minha**, rotulada como tal, e ignora a categoria "outro equipamento eletrônico".
- **TIC e PNAD divergem em direção no indicador de exclusividade.** A TIC (C16B) mostra "apenas celular" **subindo** (30% em 2024 → 32% em 2025; entre os de 60+, 50% → 55%). A PNAD mostra "somente celular" **caindo** (37,8% → 34,2%). A explicação plausível é a expansão do acesso pela televisão (57,8% na PNAD 2025, +4,3 p.p.), que retira pessoas da categoria "somente celular" da PNAD sem afetar a C16A da TIC. **Isso é hipótese minha — não confirmado em fonte primária.**
- **A divergência TIC × PNAD na faixa 60+ é grande e não explicada.** 59% (TIC C2A) contra 74,5% (PNAD). As causas prováveis são desenho amostral, período de campo e a exclusão do acesso por procuração na PNAD, mas **nenhuma das duas instituições publica uma reconciliação** — pelo menos não em fonte que eu tenha localizado.
- **O PDF da coletiva da TIC Domicílios 2025 é uma apresentação de slides.** Os valores de gráfico extraídos dela (28 milhões de não usuários; 16 milhões de idosos; 9 milhões no Nordeste; 64 milhões com fim de pacote; 68% entre pré-pagos) vêm de rótulos de gráfico, não de tabela. **Onde o mesmo indicador existe em tabela** (J7, J3, C16A, C16B), usei a tabela, que é a fonte mais forte.
- **Percentuais da TIC Domicílios são arredondados a números inteiros** nas tabelas públicas; intervalos de confiança e coeficientes de variação **não** são exibidos nelas. A PNAD publica coeficiente de variação no SIDRA, mas eu **não** os consultei célula a célula. Para células de subgrupo pequeno (por exemplo, o módulo L da TIC, sobre não usuários que utilizaram aplicações selecionadas), os valores oscilam de forma implausível entre categorias vizinhas — **não os usei** e recomendo não usar.
- **A tensão entre "not required to have a mobile version" (documentação) e "will no longer be indexable" (blog de 2024)** é reconciliada por mim na seção 5.1. O Google não publica essa reconciliação de forma explícita.
- **Data de última modificação:** registrada onde a página exibe. Search Central: "Last updated 2025-12-10 UTC". As páginas de tabela do Cetic.br e as páginas do SIDRA **não exibem** data de última modificação; o que exibem é a citação da fonte com o ano da edição. Os releases do IBGE exibem publicação e atualização (02/07/2026 e 06/07/2026).
- **Microdados não foram usados.** Toda tabulação aqui é a publicada pelas instituições. Recortes que exigiriam tabulação própria dos microdados (por exemplo, 60+ × Nordeste × rural) **não foram feitos** e, portanto, não constam.
