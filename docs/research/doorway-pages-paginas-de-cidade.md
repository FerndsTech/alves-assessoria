# Doorway pages e as 4 páginas de cidade

Resolve o ticket [Evitar doorway pages nas 4 paginas de cidade](https://github.com/FerndsTech/alves-assessoria/issues/4).

## Fontes primárias

Toda regra citada abaixo sai de um destes documentos, lidos na íntegra em 2026-08-19. Nenhuma conclusão vem de blog de agência ou de resumo de terceiro. Os trechos em inglês são cópia literal; a tradução ao lado é minha.

| Fonte | O que é |
| --- | --- |
| **Spam policies for Google web search** — [developers.google.com/search/docs/essentials/spam-policies](https://developers.google.com/search/docs/essentials/spam-policies) (*Last updated 2026-05-15 UTC*) | Onde a regra de doorway vive **hoje**. A seção chama-se **"Doorway abuse"**, âncora `#doorways` |
| **An update on doorway pages** — [Search Central Blog, 16/03/2015](https://developers.google.com/search/blog/2015/03/an-update-on-doorway-pages) | Post oficial do Google, ainda publicado no Search Central. Traz as 5 perguntas de autoavaliação que a política atual não repete |
| **Creating helpful, reliable, people-first content** — [developers.google.com/search/docs/fundamentals/creating-helpful-content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) (*2025-12-10*) | As perguntas de autoavaliação de conteúdo. É aqui que o Google diz que **não** tem contagem de palavras preferida |
| **What is URL canonicalization** — [developers.google.com/search/docs/crawling-indexing/canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization) (*2026-07-10*) | A política de conteúdo duplicado atual. Diz expressamente que duplicação não é violação de spam |
| **How to specify a canonical URL** — [.../consolidate-duplicate-urls](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) (*2026-07-10*) | O mecanismo (`rel="canonical"`, redirecionamento, sitemap) |
| **Guidelines for representing your business on Google** — [support.google.com/business/answer/3038177](https://support.google.com/business/answer/3038177) | NAP, um perfil por local, endereço real, e a seção *Individual practitioners* que rege advogados |
| **Business eligibility and ownership guidelines** — [support.google.com/business/answer/13763036](https://support.google.com/business/answer/13763036) | Critério de elegibilidade do perfil (contato presencial no horário declarado) |
| **Tips to improve your local ranking on Google** — [support.google.com/business/answer/7091](https://support.google.com/business/answer/7091) | Os três fatores que o Google declara para o pacote local: relevância, distância, proeminência |
| **Local business (LocalBusiness) structured data** — [developers.google.com/search/docs/appearance/structured-data/local-business](https://developers.google.com/search/docs/appearance/structured-data/local-business) (*2025-12-10*) | O que o Google **de fato** suporta em dados estruturados de negócio local |
| **Organization structured data** — [.../structured-data/organization](https://developers.google.com/search/docs/appearance/structured-data/organization) | Conferida para saber se `areaServed` é documentado. Não é |
| **General structured data guidelines** — [.../structured-data/sd-policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) (*2026-07-10*) | Diretriz de qualidade: não marcar o que não está visível na página |
| **schema.org/LegalService**, **schema.org/areaServed**, **schema.org/Attorney** | O vocabulário. Note-se que `Attorney` está **deprecado** |

### Atenção: a política mudou de lugar e de nome

Muito material que circula sobre este tema aponta para a antiga página autônoma "Doorway pages" das *Quality Guidelines*. Ela não existe mais como documento próprio. Verificado hoje por requisição HTTP:

```
GET /search/docs/advanced/guidelines/doorway-pages
→ 301 Moved Permanently
→ location: /search/docs/essentials/spam-policies#doorways
```

O conteúdo virou uma seção das *Spam policies for Google web search*, e o **título mudou de "Doorway pages" para "Doorway abuse"** — a âncora `#doorways` foi preservada, que é o rastro da migração. Quem cita "as diretrizes de qualidade do Google sobre doorway pages" está citando um documento que já não existe.

---

## Quadro de vereditos

| # | Questão | Veredito |
| --- | --- | --- |
| 1 | Política vigente sobre doorway | Vive em **Spam policies → "Doorway abuse"**. Nomeia expressamente páginas segmentadas por **cidade**. O que caracteriza a infração é o *funil*, não a segmentação |
| 2 | Quanto conteúdo único por cidade | **O Google não dá número, e diz isso literalmente.** Dá critério de propósito e de valor comparativo. O critério prático deste documento é engenharia derivada, não regra citada |
| 3 | Sinais locais legítimos | **Existem e são fortes.** A própria doc do Google Business Profile pede um URL que represente o local individual — o que legitima as 4 páginas |
| 4 | Os mesmos 6 advogados nas 4 páginas | **Não é problema**, sob duas condições. Duplicação parcial é explicitamente normal. O risco não é penalidade, é desindexação por deduplicação |
| 5 | 4 páginas de cidade ou 1 página de cobertura | **Manter as 4**, com piso de conteúdo único obrigatório. Sem o piso, 1 página honesta performa melhor que 4 quase idênticas |

---

## 1. A política vigente: "Doorway abuse"

**Dispositivo, na íntegra e literal** (*Spam policies for Google web search*, seção *Doorway abuse*):

> "Doorway abuse is when sites or pages are created to rank for specific, similar search queries. They lead users to intermediate pages that are not as useful as the final destination. Examples of doorway abuse include:
> - Having multiple websites with slight variations to the URL and home page to maximize their reach for any specific query
> - **Having multiple domain names or pages targeted at specific regions or cities that funnel users to one page**
> - Generating pages to funnel visitors into the actual usable or relevant portion of a site
> - Creating substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy"

Tradução do dispositivo central: *"Ter múltiplos nomes de domínio ou páginas direcionadas a regiões ou cidades específicas que **canalizam os usuários para uma única página**."*

**Consequência declarada** (mesma página, introdução):

> "We detect policy-violating practices both through automated systems and, as needed, human review that can result in a manual action. Sites that violate our policies may rank lower in results or not appear in results at all."

Ou seja: detecção automática, ação manual quando necessário, e o efeito vai de queda de posição a desindexação.

### A leitura fina — onde exatamente está a linha

Duas expressões fazem todo o trabalho normativo, e nenhuma das duas é "página por cidade":

1. **`funnel users to one page`** — a infração descrita é a página de cidade que existe para *empurrar* o visitante para outra página. A página de cidade que é ela própria o destino não está descrita no dispositivo.
2. **`intermediate pages that are not as useful as the final destination`** — o defeito é a página ser *intermediária e inferior*. Uma página que contém o endereço, o mapa, o telefone local, o horário e quem atende ali não é inferior ao destino: ela é o destino.

Isto importa muito para este projeto, porque a arquitetura escolhida é **home one-pager + 4 páginas de cidade**. Um one-pager é exatamente o formato que transforma páginas satélite em pedágio, se elas forem construídas como isca com um botão "conheça o escritório" apontando para a home. Esse desenho é literalmente o exemplo proibido.

### As cinco perguntas de autoavaliação

O post oficial *An update on doorway pages* (16/03/2015, ainda publicado no Search Central) traz o teste operacional que a política enxuta de hoje não repete:

> "Here are questions to ask of pages that could be seen as doorway pages:
> - Is the purpose to optimize for search engines and funnel visitors into the actual usable or relevant portion of your site, or are they an integral part of your site's user experience?
> - Are the pages intended to rank on generic terms yet the content presented on the page is very specific?
> - Do the pages duplicate useful aggregations of items (locations, products, etc.) that already exist on the site for the purpose of capturing more search traffic?
> - Are these pages made solely for drawing affiliate traffic and sending users along without creating unique value in content or functionality?
> - Do these pages exist as an 'island?' Are they difficult or impossible to navigate to from other parts of your site? Are links to such pages from other pages within the site or network of sites created just for search engines?"

O mesmo post explica o dano que a política combate: *"Over time, we've seen sites try to maximize their 'search footprint' without adding clear, unique value."* — maximizar a pegada de busca sem acrescentar valor único e claro.

**Marcação de status:** este post é de 2015. Ele **não** é a norma vigente — a norma vigente é a seção *Doorway abuse* citada acima. Mas continua hospedado pelo Google, não foi retratado, e é a única fonte primária que oferece um checklist. Uso-o como interpretação autêntica, não como dispositivo.

**Veredito da questão 1.** A conduta proibida é *canalizar*. Quatro páginas de cidade, para um escritório com quatro endereços reais, não estão descritas em nenhum dos quatro exemplos — **desde que** cada uma seja destino e não pedágio, e desde que não sejam ilhas navegacionais.

---

## 2. Quanto conteúdo único por cidade — o Google não dá número

**Isto precisa ser dito com todas as letras: não existe limiar quantitativo publicado pelo Google.** Não há número de palavras, não há percentual de texto único, não há contagem mínima de blocos. Quem afirma "300 palavras únicas por página de cidade" está inventando.

O Google chega a antecipar a pergunta e a responder pela negativa, na página *Creating helpful, reliable, people-first content*, na lista de sinais de alerta de conteúdo feito para buscador:

> "Are you writing to a particular word count because you've heard or read that Google has a preferred word count? **(No, we don't.)**"

### O que o Google enuncia no lugar do número

Critério de **valor e originalidade** (*Content and quality questions*, literal):

> - "Does the content provide original information, reporting, research, or analysis?"
> - "Does the content provide a substantial, complete, or comprehensive description of the topic?"
> - "If the content draws on other sources, does it avoid simply copying or rewriting those sources, and instead provide substantial additional value and originality?"
> - "**Does the content provide substantial value when compared to other pages in search results?**"
> - "Is the content mass-produced by or outsourced to a large number of creators, or spread across a large network of sites, so that individual pages or sites don't get as much attention or care?"

Critério de **conteúdo feito para pessoas** (*Focus on people-first content*, literal):

> - "Do you have an existing or intended audience for your business or site that would find the content useful if they came directly to you?"
> - "Does your content clearly demonstrate **first-hand expertise and a depth of knowledge** (for example, expertise that comes from having actually used a product or service, or **visiting a place**)?"
> - "After reading your content, will someone leave feeling they've learned enough about a topic to help achieve their goal?"

E o alerta correlato em *Scaled content abuse*, na política de spam:

> "Scaled content abuse is when many pages are generated for the primary purpose of manipulating search rankings and not helping users. This abusive practice is typically focused on creating large amounts of unoriginal content that provides little to no value to users, **no matter how it's created**."

Note-se a cláusula final: *"não importa como foi criado"* — gerar as 4 páginas por template a partir de uma lista de cidades cai aqui, mesmo que um humano escreva o template.

### O teste que a própria documentação sugere, por analogia

A página *What is URL canonicalization* dá, sobre versões em idiomas diferentes, um critério que se transporta direto para este caso:

> "Different language versions of a single page are considered duplicates only if the primary content is in the same language (that is, **if only the header, footer, and other non-critical text is translated, but the body remains the same, then the pages are considered to be duplicates**)."

Transportando: se só o **nome da cidade** muda no cabeçalho e no rodapé, e o corpo permanece o mesmo, o Google trata as páginas como duplicatas. Este é o teste, e é o Google quem o formula — só que a respeito de idioma.

### Critério prático e verificável — **recomendação de engenharia, não regra citada**

Daqui para baixo nesta seção nada é dispositivo do Google. É a tradução operacional que proponho para o spec.

**Teste da troca de nome.** Pegue a página de uma cidade, troque toda ocorrência do topônimo pelo de outra cidade e leia. Se o texto continuar verdadeiro e completo, a página **não** tem conteúdo único e não deve existir. Esse é o teste de aceitação, e é automatizável: um script que substitui o topônimo e compara com a página irmã por similaridade.

**Piso mínimo de blocos únicos por página de cidade.** Cada página de `/advocacia-em-<cidade>` deve conter, obrigatoriamente, os seis blocos abaixo, e todos os seis devem ser específicos daquela cidade:

| # | Bloco | Por que conta como valor único |
| --- | --- | --- |
| 1 | **NAP completo do escritório daquela cidade** — endereço, telefone local, horário de atendimento, mapa | Fato verificável, existente só ali. É o que descaracteriza o funil |
| 2 | **Foto real da fachada e do interior daquele escritório** | Prova de existência física. Uma foto de banco de imagens repetida nas 4 é sinal contrário |
| 3 | **Quais dos 6 advogados atendem naquele endereço, e em que dias** | Ver questão 4. Lista idêntica nas 4 páginas é o sinal de que ninguém atende ali |
| 4 | **Como chegar** — ponto de referência urbano, estacionamento, linha de ônibus, acessibilidade | O público-alvo é aposentado e beneficiário de BPC; esta informação é utilidade real, não enfeite |
| 5 | **Conteúdo de comarca** — foro competente, Juizado Especial Federal de referência, endereço da agência do INSS da cidade | Ver questão 3(d). É o bloco que responde a "original information" |
| 6 | **Perguntas frequentes cuja resposta muda por cidade** | Ex.: onde resolver presencialmente, prazos de atendimento local, o que levar |

**Piso quantitativo derivado (meu, não do Google):** ao menos **60% do texto visível** da página deve ser específico da cidade, e os blocos compartilhados entre as 4 páginas (o que é RMC, o que é seguro prestamista, o bloco institucional dos advogados) devem vir **abaixo** dos blocos únicos na ordem do documento. A ordem importa porque o Google identifica o *centerpiece* — o conteúdo principal — da página; ver questão 4.

**Regra de portão.** Cidade sem endereço real com atendimento presencial **não ganha página**. Nunca gerar `/advocacia-em-<cidade>` para cidade onde o escritório apenas "atende". Isso é exatamente `Having multiple ... pages targeted at specific regions or cities`.

---

## 3. Sinais locais legítimos

### 3a. NAP e elegibilidade do perfil — o que a documentação exige

**Elegibilidade** (*Business eligibility and ownership guidelines*, literal):

> "To qualify for a Business Profile, a business must make in-person contact with customers during its stated hours."

**Endereço real** (*Guidelines for representing your business on Google*, literal):

> "Use a precise, accurate address and/or service area to describe your business location. P.O. boxes or mailboxes located at remote locations aren't acceptable."
>
> "**Create your Business Profile for your actual, real-world location.**"
>
> "If your business rents a physical mailing address but doesn't operate out of that location, also known as a virtual office, that location isn't eligible for a Business Profile."
>
> "Businesses can't list an office at a co-working space unless that office maintains clear signage, receives customers at the location during business hours, and is staffed during business hours by your business staff."
>
> "Businesses showing their address on Google should maintain **permanent fixed signage** of their business name at the address."

**Consistência do NAP** (mesma fonte, *Understand basic guidelines*):

> "Represent your business as it's consistently represented and recognized in the real world across signage, stationery, and other branding."
>
> "Make sure your address and/or service area is accurate and precise."

**Telefone e site por local** — este é o dispositivo mais importante desta pesquisa para a decisão da questão 5 (seção *Website & phone*, literal):

> "**Provide a phone number that connects to your individual business location, or provide a website that represents your individual business location.**"
>
> "**Use a local phone number instead of a central call center helpline number whenever possible.**"
>
> "Do not provide phone numbers or URLs that redirect or 'refer' users to landing pages or phone numbers other than those of the actual business, including pages created on social media sites."

**Veredito 3a.** O Google **pede** um URL que represente o local individual. As 4 páginas de cidade não são apenas toleradas — elas são o artefato que a documentação do Business Profile assume que existe. Consequências duras para o spec:

- Telefone **local por cidade** (DDD e número da praça), não um 0800 central. É diretriz citada, não preferência.
- O campo *Website* de cada perfil aponta para a `/advocacia-em-<cidade>` correspondente, **nunca** para a home.
- Placa fixa permanente com o nome do escritório em cada um dos 4 endereços. Sem isso, o perfil com endereço visível é irregular.
- O NAP no site tem de bater caractere a caractere com o do perfil.

### 3b. Um perfil por escritório? Um perfil por advogado?

**Um perfil por escritório: sim, quatro perfis.** Dispositivo (literal):

> "Do not create more than one page for each location of your business, either in a single account or multiple accounts."

A regra é *um por local*, não *um por empresa* — e a frase geral *"There should only be one profile per business"* das *basic guidelines* é lida em conjunto com esta, que a especializa por local. Quatro escritórios com endereço real, placa, atendimento presencial no horário declarado ⇒ quatro perfis, legítimos.

O escritório **não** deve se declarar *service-area business*, porque tem storefront. O regime de área de serviço é para quem viaja até o cliente: *"Service-area businesses, or businesses that serve customers at their locations, should have one profile for the central office or location with a designated service area."* Repare que esse regime daria **um** perfil, não quatro — motivo adicional para configurar corretamente como estabelecimento com endereço.

**Um perfil por advogado: sim, é exceção expressa — e advogados são nomeados.** Dispositivo (literal, seção *Individual practitioners*):

> "An individual practitioner is a public-facing professional, typically with their own customer base. Doctors, dentists, **lawyers**, financial planners, and insurance or real estate agents are all individual practitioners. Business Profiles for practitioners may include title or degree certification (for example Dr., MD, JD, Esq., CFA)."
>
> "An individual practitioner should create their own dedicated Business Profile if:
> - They operate in a public-facing role. Support staff should not create their own Business Profiles.
> - **They can be contacted directly at the verified location during stated hours.**"
>
> "**A practitioner shouldn't have multiple Business Profiles to cover all of their specializations.** Sales associates or lead generation agents for corporations aren't individual practitioners and aren't eligible for a Business Profile."

E, para o caso de vários advogados no mesmo endereço:

> "**Multiple practitioners at one location** — If the practitioner is one of several public-facing practitioners at this location:
> - The organization should create a Business Profile for this location, separate from that of the practitioner.
> - The title of the Business Profile for the practitioner should include only the name of the practitioner, and shouldn't include the name of the organization."

E para o advogado solitário numa unidade de marca:

> "If a practitioner is the only public-facing practitioner at a location and represents a branded organization, it's best for the practitioner to share a Business Profile with the organization. Create a single Business Profile, named using the following format: [brand/company]: [practitioner name]."

Exemplo dado pela própria documentação: *"Allstate: Joe Miller"*.

**O ponto que a documentação NÃO cobre — e por isso marco como derivado.** Nenhum documento do Google trata do praticante que circula entre vários endereços. Seis advogados × quatro cidades poderia sugerir 24 perfis. Contra isso pesa o critério literal de elegibilidade do praticante: *"They can be contacted directly at the verified location during stated hours."* Um advogado não pode ser contatado diretamente em quatro endereços no mesmo horário declarado. **Recomendação (minha):** no máximo **um perfil de praticante por advogado**, no endereço onde ele efetivamente é encontrado, com o nome apenas do advogado no título. Perfis de praticante replicados por cidade são o caminho mais curto para suspensão em massa dos perfis do escritório.

**Alerta de interação com a OAB.** O perfil do Business Profile carrega avaliações de clientes por desenho, e a doc de ranking local diz que *"More reviews and positive ratings can help your business's local ranking"*. A pesquisa [Limites da OAB para a publicidade deste site](./limites-oab-publicidade.md) concluiu que **depoimentos e avaliações de clientes não podem ser publicados no site**. São coisas distintas — avaliação de terceiro numa plataforma que o escritório não edita não é o mesmo que o escritório exibir depoimento como peça publicitária — mas **importar as avaliações do Google para dentro do site apaga essa distinção**. O spec deve proibir widget de avaliações do Google no site.

### 3c. `schema.org/LegalService` e `areaServed`

**O que o schema.org define** (literal):

> `LegalService`: "A LegalService is a business that provides legally-oriented services, advice and representation, e.g. law firms."
> Hierarquia: `Thing > Organization > LocalBusiness > LegalService` e `Thing > Place > LocalBusiness > LegalService`.

> `Attorney`: "Professional service: Attorney. **This type is deprecated - `LegalService` is more inclusive and less ambiguous.**"

> `areaServed`: "The geographic area where a service or offered item is provided."
> Tipos esperados: `AdministrativeArea`, `GeoShape`, `Place`, `Text`.
> Usado em: `ContactPoint`, `DeliveryChargeSpecification`, `Demand`, `FinancialIncentive`, `Offer`, `Organization`, `Service`.
> "Supersedes `serviceArea`."

**O que o Google efetivamente documenta — e o que não documenta.** Verificado nas duas páginas de referência do Google (*Local business* e *Organization*):

| Item | Documentado pelo Google? |
| --- | --- |
| `LocalBusiness` — obrigatórios `address`, `name` | **Sim** |
| `LocalBusiness` — recomendados `geo`, `telephone`, `url`, `openingHoursSpecification`, `department`, `image`, `priceRange`, `aggregateRating`, `review`, `menu`, `servesCuisine` | **Sim** |
| Usar o subtipo mais específico | **Sim**: *"Use the most specific `LocalBusiness` sub-type possible; for example, `Restaurant`, `DaySpa`, `HealthClub`, and so on."* |
| Herdar campos de `Organization` | **Sim**: *"Since `LocalBusiness` is a subtype of `Organization`, we recommend following the fields for `Organization` in addition to the fields required and recommended below."* |
| Múltiplos tipos | **Sim**: *"If you have multiple types, specify them as an array (`additionalType` isn't supported)."* |
| **`LegalService` nomeado como subtipo suportado** | **Não.** Não aparece em nenhuma das duas páginas |
| **`areaServed`** | **Não.** Não aparece em nenhuma das duas páginas |

**Veredito 3c.** `LegalService` e `areaServed` são **semânticos, não geradores de rich result**. Nenhum dos dois é documentado pelo Google como insumo de um recurso de aparência. Isso não os torna inúteis — o Google usa dados estruturados para entender a página, e `LegalService` é o subtipo correto pela própria regra "use o subtipo mais específico" —, mas o spec não deve prometer nenhum resultado visual a partir deles.

O que o `LocalBusiness` de fato pode render está descrito na página do Google: *"Search results may display a prominent Google knowledge panel with details about a business that matched the query"*, e um carrossel para consultas por tipo de negócio. Com a ressalva geral de que o Google não garante rich result mesmo com marcação correta, e de que a marcação pode ser descartada quando *"The structured data is not representative of the main content of the page, or is potentially misleading."*

**Limite de qualidade que atinge diretamente o `areaServed`** (*General structured data guidelines*, literal):

> "**Don't** mark up content that is not visible to readers of the page. For example, if the JSON-LD markup describes a performer, the HTML body must describe that same performer."
>
> "**Don't** mark up irrelevant or misleading content, such as fake reviews or content unrelated to the focus of a page."

Tradução prática: colocar as 4 cidades no `areaServed` de todas as 4 páginas, quando cada página fala de uma só, é marcar conteúdo que não está visível. **Cada página de cidade leva um `LegalService` só, o daquele escritório**, com `address`, `geo`, `telephone`, `openingHoursSpecification` e `url` daquele local, e com o `areaServed` limitado aos municípios que aquele escritório atende — lista que precisa **também aparecer como texto visível** na página.

Usar `LegalService`, não `Attorney` (deprecado). Se for preciso expressar duas facetas, array de tipos, nunca `additionalType`.

### 3d. Conteúdo sobre a comarca local — há base documental?

**Base direta: não.** Nenhum documento do Google diz "escreva sobre o foro competente da comarca". Quem afirmar que existe tal recomendação está inventando.

**Base indireta: sim, e é sólida.** O conteúdo de comarca é a forma mais direta de satisfazer critérios que o Google enuncia expressamente:

- *"Does the content provide original information, reporting, research, or analysis?"* — a competência do JEF que atende a comarca, o endereço da agência do INSS local e o rito prático ali não estão em nenhuma outra página da web sobre consignado.
- *"Does your content clearly demonstrate first-hand expertise and a depth of knowledge (for example, expertise that comes from having actually used a product or service, or **visiting a place**)?"* — o Google nomeia o conhecimento que vem de *estar num lugar*.
- *"Does the content provide substantial value when compared to other pages in search results?"* — a comparação é com as demais páginas de "advogado consignado <cidade>", que são, em geral, template com o topônimo trocado.

E é o antídoto exato ao defeito descrito na política de doorway: *"intermediate pages that are not as useful as the final destination"*. Uma página que explica onde a pessoa resolve o problema **na cidade dela** não é intermediária.

**Veredito 3d.** Base indireta, forte e citável. Trato o conteúdo de comarca como bloco **obrigatório** (bloco 5 da tabela da questão 2), sinalizando que a obrigatoriedade é decisão de engenharia derivada dos critérios acima, não regra do Google.

**Alerta OAB:** conteúdo de comarca é técnico-informativo e está do lado permitido pela pesquisa da OAB (Anexo Único do Prov. 205, item "Criação de conteúdo"). Mas não pode virar relato de casos concretos, resultados obtidos ou nomes de clientes — ver item 6 daquela pesquisa.

---

## 4. Os mesmos 6 advogados nas 4 páginas

**Dispositivo, literal** (*What is URL canonicalization*):

> "**Some duplicate content on a site is normal and it's not a violation of Google's spam policies.** However, having the same content accessible through many different URLs can be a bad user experience (for example, people might wonder which is the right page, and whether there's a difference between the two) and it may make it harder for you to track how your content performs in search results."

**O que o Google faz com duplicatas** (mesma fonte, literal):

> "When Google indexes a page, it determines the primary content (or **centerpiece**) of each page. If Google finds multiple pages that seem to be the same or the primary content very similar, it **clusters them together**. Google then chooses the page that, based on the factors (or signals) the indexing process collected, is objectively the most complete and useful for search users, and marks it as the canonical."

E: *"Google uses the canonical page as the main source to evaluate content and quality."*

### A distinção que o ticket pede

| Situação | Como o Google trata | Gravidade |
| --- | --- | --- |
| **Bloco secundário repetido** — a seção de advogados, o glossário de RMC, o rodapé institucional aparecem nas 4 páginas | *"Some duplicate content on a site is normal and it's not a violation"*. O centerpiece de cada página continua sendo distinto | **Nenhuma.** É o funcionamento normal de um site |
| **Centerpiece repetido** — o miolo das 4 páginas é o mesmo texto genérico sobre consignado, com o topônimo trocado | Clusterização e escolha de **uma** canônica. As outras 3 deixam de aparecer | **Alta, e é o cenário mais provável.** Não é penalidade; é irrelevância. Três das quatro páginas simplesmente somem do índice |
| **Conjunto criado para maximizar pegada de busca**, canalizando para a home | *Doorway abuse* e/ou *Scaled content abuse* | **Máxima.** Aqui sim é spam: rebaixamento ou remoção, com possibilidade de ação manual |

**Veredito da questão 4.** Os mesmos 6 advogados nas 4 páginas **não são problema** — é duplicação parcial, expressamente normal. O ticket #4 aponta para o lugar certo pelo motivo errado: o risco não está nos advogados repetidos, está em o **miolo** das páginas ser o mesmo.

**Duas condições para o bloco de advogados:**

1. **O bloco não pode ser o centerpiece.** Ele entra abaixo dos blocos de NAP, comarca e como-chegar, e não pode ocupar a maior parte da página. Se o conteúdo principal detectado for a lista de advogados, as 4 páginas viram um cluster.
2. **O bloco tem de ser filtrado ou anotado por cidade.** Quem atende naquele endereço, em que dias. Uma lista rigorosamente idêntica dos 6 nas 4 páginas é, além de sinal de duplicação, informação enganosa ao visitante — que vai ao escritório procurar alguém que nunca esteve lá. Se todos os 6 realmente atendem nas 4 cidades, a página deve dizer **como** (dia fixo, agendamento, atendimento remoto) — o "como" é, ele próprio, conteúdo único.

Nota de arquitetura: os perfis completos dos advogados devem ter uma URL canônica única cada um (na home one-pager ou em página própria), e as páginas de cidade exibem cartões resumidos que linkam para lá. Assim o conteúdo biográfico longo existe uma vez só, e não há o que deduplicar.

---

## 5. Quatro páginas de cidade, ou uma página única de cobertura?

**Veredito: manter as quatro — condicionadas ao piso de conteúdo único da questão 2.** A recomendação não é incondicional, e a condição é séria: sem o piso, **uma página única honesta performa melhor** que quatro quase idênticas.

### Fundamentos a favor das quatro

1. **A documentação do Business Profile pede um URL por local.** *"Provide a phone number that connects to your individual business location, or provide a website that represents your individual business location."* Com uma página única de cobertura, os quatro perfis apontam para a mesma URL — permitido, mas desperdiça um encaixe que a própria documentação do Google descreve. É o argumento mais forte deste documento, e é regra citada, não opinião.

2. **O endereço real descaracteriza o doorway.** O exemplo proibido é *"pages targeted at specific regions or cities that **funnel users to one page**"*. Com escritório real, a página de cidade é onde a conversão acontece — telefone local, mapa, horário, agendamento. Não há funil: há destino.

3. **O ranking local é decidido no perfil, mas o site alimenta a relevância.** *"Local results are mainly based on relevance, distance, and popularity"*, e *"Relevance is how well a Business Profile matches what someone is searching for. To help Google better understand your business and match it to relevant searches, provide complete and detailed business info."* Uma página específica por local dá ao Google conteúdo específico para casar com cada perfil. Uma página de cobertura dá a mesma informação difusa para os quatro.

4. **O custo de performance é desprezível.** Quatro páginas geradas a partir dos mesmos componentes, com dados por cidade, não pesam mais que uma — e performance é requisito de primeira classe neste projeto.

### O contra-argumento honesto

Se o escritório **não conseguir produzir conteúdo genuinamente único por cidade** — se não houver foto real de cada fachada, se não se souber quem atende onde, se o texto de comarca não for escrito —, então as quatro páginas são estritamente piores que uma:

- No melhor caso, o Google clusteriza e indexa **uma** delas. O trabalho das outras três é perdido, e o resultado é idêntico ao de ter uma só página — com mais superfície para manter.
- No pior caso, o conjunto lê como *doorway abuse* ou *scaled content abuse*, e o rebaixamento atinge o **site inteiro**, não apenas as páginas fracas.

A escolha real, portanto, não é "4 páginas vs 1 página". É **"4 páginas com substância vs 1 página honesta"** — e a segunda opção é largamente preferível à terceira, que é 4 páginas sem substância.

### Regra de decisão, cidade por cidade

A decisão **não é do conjunto**. Aplica-se por cidade:

> Uma cidade ganha `/advocacia-em-<cidade>` se, e somente se: (a) há endereço real com placa fixa e atendimento presencial em horário declarado; (b) há ao menos um advogado identificável que atende naquele endereço; (c) os seis blocos únicos da questão 2 estão efetivamente preenchidos com conteúdo daquela cidade.

Cidade que falhe em qualquer item vira **seção** de uma página de cobertura, não página própria. É melhor lançar com 3 páginas de cidade e 1 seção do que com 4 páginas, uma delas oca.

---

## Recomendação — o que o spec do site deve mandar fazer

**Manter as 4 páginas de cidade em `/advocacia-em-<cidade>`**, sujeitas às regras abaixo. Cada uma é um requisito verificável; nenhuma é opcional.

**R1 — Portão de existência.** A página de uma cidade só é construída se houver endereço real com placa fixa, atendimento presencial em horário declarado, e ao menos um advogado que atenda ali. Cidade que falhe vira seção da página de cobertura. Proibido gerar página para cidade sem escritório.

**R2 — Piso de conteúdo único: os seis blocos.** Toda página de cidade contém, específicos daquela cidade: (1) NAP completo com mapa; (2) foto real da fachada e do interior daquele escritório; (3) quais advogados atendem ali e em que dias; (4) como chegar, com referência urbana, estacionamento e transporte; (5) conteúdo de comarca — foro competente, JEF de referência, endereço da agência do INSS local; (6) FAQ cujas respostas mudem por cidade. *(Regra derivada; o Google não enumera blocos.)*

**R3 — Ordem do documento.** Os blocos únicos vêm **antes** dos blocos compartilhados. O centerpiece detectável tem de ser o conteúdo local. O bloco dos 6 advogados e os textos genéricos sobre RMC, consignado e seguro prestamista ficam abaixo.

**R4 — Teste de aceitação da troca de nome.** Substituir o topônimo da página por outro. Se o texto resultante permanecer verdadeiro, a página reprova e não vai ao ar. Automatizável como teste de build, comparando similaridade entre páginas irmãs. *(Derivado, por analogia ao critério de duplicata por idioma da doc de canonicalização.)*

**R5 — Meta de 60% de texto único visível por página.** *(Número meu. O Google não publica limiar e diz expressamente que não tem contagem de palavras preferida.)*

**R6 — A página de cidade é destino, não pedágio.** A conversão acontece nela: telefone local clicável, WhatsApp, mapa, horário, agendamento. Proibido o padrão "página de cidade com CTA que leva à home para converter" — é literalmente o exemplo `funnel users to one page` da política.

**R7 — Nada de ilhas.** As 4 páginas entram no menu principal, a home linka para as 4, e cada página de cidade linka para as outras 3 num bloco "outros escritórios". *(Responde à quinta pergunta do post oficial de 2015.)*

**R8 — Canonical autorreferencial.** Cada página de cidade declara `rel="canonical"` para si mesma. **Nunca** canonical apontando para a home — isso removeria as 4 páginas do índice.

**R9 — Dados estruturados.** Um `LegalService` por página de cidade (não `Attorney`, deprecado), com `name`, `address`, `geo`, `telephone` local, `openingHoursSpecification` e `url` daquela unidade. `areaServed` restrito aos municípios daquele escritório **e** replicado como texto visível na página. Sem prometer rich result: nem `LegalService` nem `areaServed` são documentados pelo Google como geradores de aparência.

**R10 — Telefone local por cidade.** DDD e número da praça, sob controle direto do escritório. Nada de 0800 central nas páginas de cidade nem nos perfis. *(Regra citada: "Use a local phone number instead of a central call center helpline number whenever possible.")*

**R11 — NAP idêntico ao do perfil**, caractere a caractere, em todas as superfícies: página de cidade, rodapé, dados estruturados, Business Profile.

**R12 — Business Profile.** Quatro perfis, um por escritório, configurados como estabelecimento com endereço (**não** como *service-area business*). Campo *Website* de cada perfil aponta para a página daquela cidade. No máximo um perfil de praticante por advogado, no endereço onde ele efetivamente atende, com o título contendo só o nome do advogado. *(A parte "um por advogado" é derivada: a doc não trata do praticante multi-endereço, mas exige que ele possa ser contatado diretamente no local verificado no horário declarado.)*

**R13 — Nunca gerar as páginas por template a partir de uma lista.** As 4 são escritas, não produzidas. *(Regra citada: scaled content abuse, "no matter how it's created".)*

**R14 — Sem widget de avaliações do Google no site.** Interação com a pesquisa da OAB: avaliações no perfil ajudam a proeminência local e não são publicidade do escritório; importá-las para o site as transforma em depoimento publicado, que é vedado.

---

## Limites desta pesquisa

- **O Google não publica limiar quantitativo algum** para conteúdo único por página de localidade, e afirma expressamente não ter contagem de palavras preferida. Todo número deste documento que não esteja entre aspas — os 60%, os seis blocos — é recomendação de engenharia minha, derivada dos critérios qualitativos citados. Está marcado como tal em cada ocorrência, e deve ser tratado como parâmetro ajustável, não como regra.
- **Nenhum documento do Google trata do praticante com vários endereços.** A conclusão de "um perfil de praticante por advogado" é derivada do critério de contato no local verificado, não citada. É o ponto de menor respaldo textual deste documento.
- **O post *An update on doorway pages* é de 2015.** Continua publicado pelo Google e não foi retratado, mas não é a norma vigente — é interpretação autêntica. A norma vigente é a seção *Doorway abuse* das *Spam policies*, atualizada em 2026-05-15.
- **A documentação do Google Business Profile muda sem changelog público.** As páginas do Search Central trazem data de atualização; as de suporte do Business Profile, não. Reconferir as regras de praticante e de endereço imediatamente antes de criar os perfis.
- **Não usei as *Search Quality Rater Guidelines*.** São documento do Google, mas o próprio Google afirma que não descrevem fatores de ranqueamento; usá-las como fonte de regra produziria conclusões mais fortes do que a evidência sustenta.
- **Nada aqui trata de direito.** As interações com a OAB estão em [Limites da OAB para a publicidade deste site](./limites-oab-publicidade.md) e foram apenas sinalizadas onde colidem: avaliações de clientes, fotos da estrutura física do escritório e conteúdo de comarca que resvale em casos concretos.
