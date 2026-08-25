import { z } from "astro/zod";

/**
 * **O contrato das duas content collections, e o único lugar onde ele vive.**
 *
 * A forma abaixo veio da resolução do [#7] e do [#10] e foi consolidada pelo
 * spec [#23]; ela encoda as decisões com mais precisão que a prosa. Cada
 * restrição tem uma razão escrita ao lado, porque **nenhuma delas pode ser
 * afrouxada sem reabrir ticket**.
 *
 * Por que o contrato mora aqui e não dentro de `src/content.config.ts`: aquele
 * arquivo é onde o Astro procura a **fiação** — o loader, o `defineCollection`,
 * o `image()` que só existe dentro do build. O contrato, esse, é uma função pura
 * de zod, e por ser pura ele pode ser afirmado por teste sem construir o site.
 * É a mesma separação que `scripts/orcamento/medir.ts` já faz com a régua de
 * bytes: o instrumento se testa sozinho, e não é por isso uma segunda costura.
 *
 * `z` vem de `astro/zod`, que é literalmente o módulo que `astro:content`
 * reexporta. Não há duas cópias do zod no projeto, e o teste do contrato afirma
 * sobre o mesmo objeto que reprova o build.
 */

/**
 * Os dias em que um advogado atende numa unidade.
 *
 * **Enum, e a prosa é montada no template, num lugar só.** Sábado e domingo não
 * estão na lista porque o horário publicado é de segunda a sexta — e horário que
 * mente é pior que horário nenhum (#9, decisão 6).
 */
export const DIAS_DA_SEMANA = ["segunda", "terca", "quarta", "quinta", "sexta"] as const;

/**
 * O número de OAB que **é** o sinal de ficção.
 *
 * Um campo `ficticio` paralelo foi rejeitado: dois lugares que podem discordar
 * acabam mentindo. A ficção **se deriva do dado, nunca se armazena** — e é isso
 * que dá ao portão de lançamento do #29 algo mecânico para contar, em vez de
 * disciplina. Quem lê este valor é `src/lib/ficcao.ts`.
 */
export const OAB_FICTICIA = "000.000";

/**
 * O contrato do advogado.
 *
 * `unidade` chega pronto de fora — é `reference("unidades")` dentro do build, e
 * o mesmo `createReference()` dentro do teste. O genérico existe para que o tipo
 * de saída da referência sobreviva até `CollectionEntry<"advogados">`.
 */
export function esquemaDeAdvogado<R extends z.ZodType>(unidade: R) {
  return z.object({
    // ── identidade e credenciais ──────────────────────────────────────────
    nome: z.string(),

    /**
     * Opcional, e só para nome composto onde derivar o primeiro token erraria.
     * O botão do painel diz "Falar com <primeiro nome>", e "Falar com Maria" na
     * ficha de uma Maria Célia é o tipo de erro que ninguém revisa duas vezes.
     */
    nomeCurto: z.string().optional(),

    /**
     * `uf` é literal porque a seccional é uma só. `numero` é string e não
     * número: `"000.000"` tem ponto, e OAB com dígito à esquerda existe.
     */
    oab: z.object({ numero: z.string(), uf: z.literal("CE") }),

    /**
     * Prosa curta em **construção nominal** — *"Graduação em Direito pela UFC"*,
     * nunca *"Graduado em..."*. A regra gramatical não é estilo: dela só se
     * obtém fato verificável (CED art. 44, §1º), é impossível adjetivar a si
     * mesmo, e não há concordância de gênero — logo o texto **troca de pessoa
     * sem reescrita**, que é a restrição permanente do mapa.
     *
     * O intervalo de 140–180 é o que mantém as seis fichas com a mesma altura
     * visual sem que ninguém precise contar caracteres à mão: o build conta.
     */
    descricao: z.string().min(140).max(180),

    /**
     * Texto puro, teto de 3, **sem nível, sem medida e sem barra**. Barra e
     * medidor caem na lista taxativa do CED art. 44, §1º — daí não existir
     * `skills` nem `habilidades` neste contrato, e daí o teto ser do schema e
     * não do CSS.
     */
    areas: z.array(z.string()).min(1).max(3),

    /**
     * O **nome do arquivo** do retrato, resolvido por `retratoDe()` em
     * `src/lib/placeholders.ts`. Obrigatório e sem fallback: advogado sem foto
     * quebra o build em vez de render um buraco.
     *
     * É `string` e não `image()` de propósito — o retrato passa pelo registro de
     * um lugar só, e nenhum template contém caminho de asset.
     */
    foto: z.string(),

    // ── como chegar até a pessoa ──────────────────────────────────────────
    /**
     * E.164 **sem formatação**, que é o que o `wa.me` consome. Um número com
     * parêntese e traço abre um WhatsApp em branco, e a falha é silenciosa do
     * lado do visitante — daí o regex ser do contrato e não uma limpeza no
     * template.
     */
    whatsapp: z.string().regex(/^55\d{10,11}$/),

    /**
     * `unidade` é **referência, nunca texto**: endereço repetido em seis
     * arquivos dessincroniza no dia em que uma sala muda de número.
     *
     * Quem atende numa unidade **não é campo** — deriva daqui, invertendo a
     * relação. Um campo dos dois lados seria um segundo lugar que pode
     * discordar do primeiro.
     */
    atuacoes: z
      .array(
        z.object({
          unidade,
          dias: z.array(z.enum(DIAS_DA_SEMANA)).min(1),
        }),
      )
      .min(1),

    /**
     * Só perfil profissional. Quem clica achando que é credencial não pode cair
     * na vida pessoal de ninguém — daí `rede` ser enum fechado.
     *
     * `z.url()` e não `z.string().url()`: mesma restrição, e a segunda forma
     * está marcada como deprecada no zod 4. A forma do spec continua valendo —
     * o que mudou foi a grafia da mesma checagem, não a checagem.
     */
    redes: z
      .array(
        z.object({
          rede: z.enum(["instagram", "linkedin", "facebook"]),
          url: z.url(),
        }),
      )
      .optional(),

    // ── apresentação ──────────────────────────────────────────────────────
    /**
     * Explícito porque **o alfabeto não deve decidir** quem são os três da
     * vitrine.
     *
     * **Limitação assumida e registrada: o Zod não valida unicidade de `ordem`
     * entre arquivos.** Cada arquivo é validado sozinho, e nenhum deles vê os
     * outros cinco. Dois advogados com `ordem: 2` passam no build e produzem uma
     * vitrine cuja terceira posição é decidida pela ordem em que o loader leu o
     * disco — que é estável, mas não é escolha de ninguém.
     */
    ordem: z.number().int().positive(),
  });
}

/**
 * O contrato da unidade. O `slug` — o nome do arquivo — **é a âncora**:
 * `#acopiara`, `#juazeiro-do-norte`, `#senador-pompeu`, `#fortim`, as mesmas
 * para onde apontam os quatro Business Profiles.
 *
 * `fachada` chega pronto de fora, porque `image()` só existe dentro do build.
 */
export function esquemaDeUnidade<I extends z.ZodType>(fachada: I) {
  return z.object({
    cidade: z.string(),
    uf: z.literal("CE"),
    logradouro: z.string(),

    /** Fortim não tem. */
    bairro: z.string().optional(),

    /** "sala 05". */
    complemento: z.string().optional(),

    /**
     * O campo que **impede mapa e link de rota de discordarem**: o mesmo par
     * posiciona o pino do SVG e monta o "Como chegar". Dois lugares dariam duas
     * respostas para "onde fica", e a errada seria a que abre o aplicativo de
     * mapas.
     */
    geo: z.object({ lat: z.number(), lon: z.number() }),

    /** Opcional enquanto os assets físicos das quatro praças (#18) não chegam. */
    fachada: fachada.optional(),

    ordem: z.number().int().positive(),

    /**
     * **`horario` e `telefone` estão deliberadamente ausentes.** O horário é um
     * só e é publicado no bloco de CTA (#9, decisão 6); o telefone é regra
     * condicional pendente de fato do cliente (#16). Campo por unidade seria
     * duplicação convidando divergência — quatro horários que discordam do
     * publicado, e nenhuma forma de saber qual está certo.
     */
  });
}
