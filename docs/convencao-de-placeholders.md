# Convenção de placeholder de asset

Fotos, logo e copy não existem ainda e são **produção externa**. Eles entram no site como placeholder com requisito escrito, e esta é a convenção que todos seguem — fixada no [#25](https://github.com/FerndsTech/alves-assessoria/issues/25) para que os dez tickets seguintes a reaproveitem em vez de reinventar.

A restrição permanente do mapa é a razão da forma: **toda informação fictícia precisa ser trocável sem refatoração.** Se trocar placeholder por asset real exigir mexer num template, a convenção falhou.

---

## Onde as coisas moram

| Coisa | Lugar | Por quê |
| --- | --- | --- |
| Arquivo do placeholder | `src/assets/placeholders/` | Passa pelo pipeline de imagem do Astro, que é por onde o asset real vai passar |
| Ponteiro e requisito | `src/lib/placeholders.ts` | Um `import` e um bloco de requisito por peça. Trocar o asset é trocar o `import` |
| Copy de placeholder | `src/lib/copy.ts` | Mesma ideia: string num lugar só, requisito escrito ao lado |
| Texto alternativo | `src/lib/texto-alternativo.ts` | Ver abaixo — é a regra que mais custa se for afrouxada |
| Desenho de origem do raster | `src/assets/placeholders/*.svg` | Fonte do que `npm run placeholders` rasteriza |

**Nenhum template contém o caminho de um asset.** Componentes importam de `src/lib/placeholders.ts` e mais nada.

### Asset nomeado por dado

O retrato do advogado é a exceção que confirma a regra: o contrato do [#7](https://github.com/FerndsTech/alves-assessoria/issues/7) tem `foto: z.string()`, e não `image()`. A collection guarda o **nome do arquivo**, e `retratoDe()` — em `src/lib/placeholders.ts` — o resolve contra `src/assets/placeholders/` por `import.meta.glob`.

As duas propriedades sobrevivem ao mesmo tempo: o dado nomeia um arquivo, e **um lugar só sabe onde arquivos moram**. Nome que não existe quebra o build, com o erro dizendo quais existem.

A fachada da unidade não precisa disso — lá o campo é `image()`, e o Astro resolve o caminho relativo ao próprio arquivo de conteúdo.

## Requisitos por peça

Cada entrada de `PLACEHOLDERS` carrega o requisito da peça real no bloco de comentário acima dela: proporção, teto de bytes, formato e a vedação normativa que recai sobre ela, quando houver. O teto sai da tabela do [ADR-0003](adr/0003-orcamento-folgado-para-profundidade.md) e não é repetido aqui — tabela duplicada diverge.

| Peça | Proporção | Teto | Formato do asset real |
| --- | --- | --- | --- |
| Foto de fachada (herói) | 16:9 | 400 KB, a linha da imagem de LCP | Raster, pelo pipeline do Astro |
| Foto de fachada (unidade) | 16:9 | dentro da folga do total | Raster, pelo pipeline do Astro |
| Retrato de advogado | **3:4** | 120 KB cada | Raster, pelo pipeline do Astro |
| Logo horizontal | ~4:1 | dentro da folga de CSS/imagem | SVG com traçados vetoriais |

### O retrato é 3:4, e o enquadramento vem junto

Fixado no [#27](https://github.com/FerndsTech/alves-assessoria/issues/27), que é o ticket que trouxe os seis retratos.

**3:4 porque o painel manda.** O card recorta em **4:5**; o painel do advogado ([#30](https://github.com/FerndsTech/alves-assessoria/issues/30)) usa a foto num terço-e-meio de tela cheia, e é lá que ela precisa ser mais alta. Entregar em 4:5 e esticar no painel destruiria a foto; entregar em 3:4 e recortar no card tira 32px de cada lado do arquivo de 768×1024, que é o que o enquadramento já reserva.

O enquadramento é **o mesmo nos seis**, e é ele que faz uma grade parecer uma grade em vez de seis fotos avulsas:

- topo da cabeça a **8%** da altura,
- olhos na **linha de um terço**,
- corpo nos **75% centrais**,
- **zona segura central**, para que qualquer recorte continue enquadrando o rosto.

**Uma foto só por advogado.** Duas quebrariam o FLIP do painel, que só é honesto porque é literalmente a mesma imagem que cresce.

**O tratamento — cor natural dessaturada ~10% — entra na geração, nunca em filtro de CSS.** Assim, trocar por foto real é trocar arquivo.

## O placeholder de foto é raster, e isso não é detalhe

O placeholder de qualquer peça **fotográfica** é gerado por `npm run placeholders`, que rasteriza o SVG irmão para JPEG e aplica grão gaussiano por cima.

O grão parece capricho e não é. O Chromium **descarta do LCP** qualquer imagem abaixo de 0,05 bit por pixel — a heurística existe justamente para não deixar um placeholder contar como conteúdo. Um SVG chapado de 1,5 KB cobrindo 1,4 milhão de pixels fica duas ordens de grandeza abaixo do corte, e com ele o elemento de LCP da página passa a ser o `h1`. O site mediria uma coisa hoje e outra quando a foto real chegasse, e o teste que afirma *"a foto de fachada é o elemento de LCP da página inteira"* estaria verde medindo a coisa errada.

Regra geral, então: **o placeholder tem de percorrer o mesmo caminho e cair na mesma faixa de bytes que o asset real**, ou ele não substitui o asset real — apenas ocupa o lugar dele.

## Texto alternativo: derivado no template, num lugar só

**Nenhuma content collection ganha campo de texto alternativo.** Isto está decidido no [ADR-0004](adr/0004-gate-de-acessibilidade.md), decisão 6, e não reabre com o [#7](https://github.com/FerndsTech/alves-assessoria/issues/7) nem com o [#10](https://github.com/FerndsTech/alves-assessoria/issues/10).

Todo `alt` do site sai de `src/lib/texto-alternativo.ts`:

- **Retrato do advogado** — montado a partir do `nome`. O alt de um retrato é inteiramente determinado por quem está nele; seis strings livres divergiriam em tom sem que nada as reconciliasse. Mesmo raciocínio que o spec já aplica a `dias`.
- **Fachada** — `alt=""`. É decorativa: o que ela carrega, o endereço, está em texto ao lado dela. `alt=""` é a forma correta e passa na regra `image-alt`, que é `wcag2a` e reprova o merge.
- **Logo** — carrega o nome do escritório, porque a imagem contém esse nome em texto. Sem "logo" nem "logotipo de": o leitor de tela já anuncia que encontrou uma imagem.

Quem for acrescentar imagem ao site acrescenta uma função nesse arquivo. **Se a imagem não couber em nenhuma delas, o que falta não é um campo na collection — é uma decisão sobre o que aquela imagem carrega.**

## Marcação de ficção

Todo elemento que renderiza placeholder leva um atributo no HTML entregue:

- `data-placeholder="asset"` — imagem ainda não produzida
- `data-placeholder="copy"` — texto ainda não escrito

É o mesmo raciocínio de `oab.numero === "000.000"`: **a ficção se deriva do dado e nunca se armazena em paralelo**, e o portão de lançamento é mecânico em vez de disciplina. Um campo `ficticio` separado seria um segundo lugar que pode discordar do primeiro.

Trocar o placeholder por conteúdo real é trocar o valor **e apagar o atributo**.

Onde a peça vem de uma content collection, nem isso: o atributo **se deriva**. O card do advogado marca `data-placeholder` a partir de `eFicticio()` em `src/lib/ficcao.ts`, que é uma leitura de `oab.numero === "000.000"` e nada mais. Trocar por uma pessoa real apaga a marcação sozinha, e o mesmo predicado é o que o portão de lançamento do [#29](https://github.com/FerndsTech/alves-assessoria/issues/29) conta.
