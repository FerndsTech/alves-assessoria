# Rastreador de issues: GitHub

As issues e PRDs deste repositório vivem como issues do GitHub. Use a CLI `gh` para todas as operações.

## Convenções

- **Criar uma issue**: `gh issue create --title "..." --body "..."`. Use um heredoc para corpos de múltiplas linhas.
- **Ler uma issue**: `gh issue view <number> --comments`, filtrando os comentários com `jq` e buscando também os rótulos.
- **Listar issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` com os filtros `--label` e `--state` apropriados.
- **Comentar numa issue**: `gh issue comment <number> --body "..."`
- **Aplicar / remover rótulos**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Fechar**: `gh issue close <number> --comment "..."`

Deduza o repositório a partir de `git remote -v` — o `gh` faz isso automaticamente quando rodado dentro de um clone.

## Pull requests como superfície de triagem

**PRs as a request surface: no.** _(Mude para `yes` se este repositório tratar PRs externos como pedidos de funcionalidade; o `/triage` lê esta flag. Mantenha a linha em inglês — é assim que a skill a reconhece.)_

Quando estiver como `yes`, os PRs passam pelos mesmos rótulos e estados das issues, usando os equivalentes `gh pr`:

- **Ler um PR**: `gh pr view <number> --comments` e `gh pr diff <number>` para o diff.
- **Listar PRs externos para triagem**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` e então manter apenas os de `authorAssociation` igual a `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR` ou `NONE` (descartar `OWNER`/`MEMBER`/`COLLABORATOR`).
- **Comentar / rotular / fechar**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

O GitHub compartilha um único espaço de numeração entre issues e PRs, então um `#42` sozinho pode ser qualquer um dos dois — resolva com `gh pr view 42` e caia de volta para `gh issue view 42`.

## Quando uma skill disser "publique no rastreador de issues"

Crie uma issue no GitHub.

## Quando uma skill disser "busque o ticket relevante"

Rode `gh issue view <number> --comments`.

## Operações de wayfinding

Usadas pelo `/wayfinder`. O **mapa** é uma única issue, com issues **filhas** como tickets.

- **Mapa**: uma única issue rotulada com `wayfinder:map`, contendo o corpo de Notas / Decisões-até-agora / Névoa. `gh issue create --label wayfinder:map`.
- **Ticket filho**: uma issue ligada ao mapa como sub-issue do GitHub (`gh api` no endpoint de sub-issues). Onde sub-issues não estiverem habilitadas, adicione a filha a uma lista de tarefas no corpo do mapa e coloque `Part of #<map>` no topo do corpo da filha. Rótulos: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Uma vez reivindicado, o ticket é atribuído ao dev que o está conduzindo.
- **Bloqueio**: as **dependências nativas de issues** do GitHub — a representação canônica e visível na UI. Adicione uma aresta com `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, onde `<blocker-db-id>` é o **id numérico de banco de dados** do bloqueador (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _não_ o `#number` nem o `node_id`). O GitHub reporta `issue_dependencies_summary.blocked_by` (apenas bloqueadores abertos — o portão ao vivo). Onde as dependências não estiverem disponíveis, caia de volta para uma linha `Blocked by: #<n>, #<n>` no topo do corpo da filha. Um ticket está desbloqueado quando todos os seus bloqueadores estiverem fechados.
- **Consulta da fronteira**: liste as filhas abertas do mapa (`gh issue list --state open`, restrito às sub-issues / lista de tarefas do mapa), descarte as que tiverem um bloqueador aberto (`issue_dependencies_summary.blocked_by > 0`, ou uma issue aberta na linha `Blocked by`) ou um responsável atribuído; a primeira na ordem do mapa vence.
- **Reivindicar**: `gh issue edit <n> --add-assignee @me` — a primeira escrita da sessão.
- **Resolver**: `gh issue comment <n> --body "<answer>"`, depois `gh issue close <n>`, depois anexe um ponteiro de contexto (resumo + link) às Decisões-até-agora do mapa.
