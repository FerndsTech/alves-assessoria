# Notas de trabalho

Preferências e observações sobre como ensinar o Murilo.

## Preferências declaradas

- **Português** em tudo. Preferência permanente registrada no mapa do projeto.
- **Missão tripla**: quer dominar o método, terminar este projeto e entender por que
  o fluxo vale o esforço — as três ao mesmo tempo, não em sequência.
- Material de estudo mora em `aprendizado/`, dentro do repositório do projeto,
  para as lições poderem linkar direto para as issues e as pesquisas.

- **Duas linguagens, sempre.** Pediu explicitamente que cada conceito venha em linguagem natural
  *e* técnica, com analogia e com o termo vizinho de que se confunde. Não é preferência de estilo:
  é como ele verifica se entendeu — se consegue traduzir de um registro para o outro, pegou.
- **Interativo vira artifact; estático fica local.** Regra dele, declarada em 2026-08-22. Página
  com busca, filtro, árvore de decisão → publica como artifact (link abre no celular). Página que
  é só texto com quiz → `.html` local em `lessons/` ou `reference/`.
- **Profundidade acima de cobertura.** Achou as primeiras lições boas e rasas. Quer poder
  *replicar* o método em outro cliente, então explicação que para em "é assim que se faz" não
  serve — precisa do mecanismo por baixo.

## Observações

- Aprende bem por **contraste**: nas sessões de wayfinder, escolheu consistentemente
  a opção recomendada depois de ler o custo declarado das alternativas. Lições devem
  sempre mostrar o trade-off, não só a resposta certa.
- **Interrompe quando fareja colisão.** Parou a sessão do #17 sozinho ao perceber que
  a premissa do WhatsApp podia contaminar a decisão. Esse instinto é bom e vale nomear
  para ele: é exatamente o que separa quem segue um processo de quem o conduz.
- **Nomenclatura foi o gargalo real.** Ele operava o fluxo bem e mesmo assim as palavras não
  colavam. Diagnóstico: as lições apresentavam termos isolados; o que faltava era o *contraste*
  entre termos vizinhos (névoa × ticket, handoff × compact, alavancagem × localidade). Ensinar
  termo sozinho não funciona com ele — ensinar o par funciona.

- Pensa em **paralelismo** naturalmente — perguntou como tocar logo, layout e assets
  enquanto o wayfinder roda. Lições sobre o fluxo devem tratar dependência e bloqueio
  como tema central, não como nota de rodapé.

## A evitar

- Exemplo genérico de software (to-do list, blog). Usar sempre o caso Alves Assessoria.
- Ensinar o fluxo como cerimônia. Ele quer saber *por que* cada etapa existe.
