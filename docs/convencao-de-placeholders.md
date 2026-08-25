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

## Requisitos por peça

Cada entrada de `PLACEHOLDERS` carrega o requisito da peça real no bloco de comentário acima dela: proporção, teto de bytes, formato e a vedação normativa que recai sobre ela, quando houver. O teto sai da tabela do [ADR-0003](adr/0003-orcamento-folgado-para-profundidade.md) e não é repetido aqui — tabela duplicada diverge.

| Peça | Proporção | Teto | Formato do asset real |
| --- | --- | --- | --- |
| Foto de fachada (herói) | 16:9 | 400 KB, a linha da imagem de LCP | Raster, pelo pipeline do Astro |
| Retrato de advogado | a fixar no ticket do retrato, junto com o enquadramento | 120 KB cada | Raster, pelo pipeline do Astro |
| Logo horizontal | ~4:1 | dentro da folga de CSS/imagem | SVG com traçados vetoriais |

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
