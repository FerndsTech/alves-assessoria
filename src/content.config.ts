import { glob } from "astro/loaders";
import { defineCollection, reference } from "astro:content";
import { esquemaDeAdvogado, esquemaDeUnidade } from "./lib/esquemas";

/**
 * **A fiação das duas content collections.** O contrato mora em
 * `src/lib/esquemas.ts`; aqui fica só o que depende do build — o loader, o
 * `reference` que resolve contra a outra collection, e o `image()` que só existe
 * dentro do `SchemaContext`.
 *
 * **Um arquivo por item, e o nome do arquivo é a identidade.** O `id` que o
 * loader deriva do nome é o `slug`: é ele que `atuacoes[].unidade` cita, é ele
 * que vira a âncora `#acopiara`, e é ele que vira `#<slug-do-advogado>`.
 *
 * YAML e não JSON porque YAML aceita comentário, e o requisito de um campo
 * fictício precisa caber ao lado do valor fictício. Trocar um advogado fictício
 * por um real é **trocar string dentro de um arquivo** — nunca refatoração.
 */

const advogados = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/advogados" }),
  schema: esquemaDeAdvogado(reference("unidades")),
});

const unidades = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/unidades" }),
  schema: ({ image }) => esquemaDeUnidade(image()),
});

export const collections = { advogados, unidades };
