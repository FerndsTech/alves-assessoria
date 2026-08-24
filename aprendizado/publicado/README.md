# Material publicado como artifact

As páginas desta pasta são **interativas** — por isso viraram artifacts, e não `.html` local
como as de `lessons/` e `reference/`. Ficam num link que abre no celular e dá para compartilhar.

| Página | Link | O que é |
| --- | --- | --- |
| Dicionário do Fluxo | https://claude.ai/code/artifact/a587a9b3-47e3-48c0-9160-ee92ec9a2635 | 42 termos, cada um em linguagem natural e técnica, com analogia e o vizinho que se confunde. Busca, filtro por família e modo flashcard |
| Manual das Skills | https://claude.ai/code/artifact/7d49c3d2-6c6d-4078-b67a-757abf92df7b | Anatomia de uma skill, bússola interativa de decisão, higiene de contexto em detalhe e o que simplificar quer dizer |
| Astro em Duas Linguagens | https://claude.ai/code/artifact/9783dfde-6410-4ffc-8efc-91e0f0ede719 | 15 termos do Astro nas duas linguagens, diagramas da fronteira build/navegador, simulador das diretivas `client:*`, mapa mental do projeto e rota de quatro sessões |

## Formato dos arquivos

São **fragmentos**, não documentos completos: sem `<!doctype>`, sem `<html>`, sem `<body>`, e
com o CSS embutido em vez de linkar `../assets/estilo.css`. É o formato que o publicador de
artifact exige — ele embrulha o arquivo no esqueleto na hora de publicar.

Consequência prática: abrir esses arquivos direto no navegador funciona, mas o lugar certo de
ler é o link. As páginas de `lessons/` e `reference/` continuam sendo documentos completos e
locais, porque não são interativas além do quiz.

## Como atualizar

Peça a atualização **nesta mesma pasta de trabalho**, citando o arquivo. Republicar o mesmo
caminho mantém o mesmo link — quem já salvou não perde nada. Publicar um caminho novo cria um
artifact separado.
