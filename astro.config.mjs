// @ts-check
import { defineConfig } from "astro/config";

// Zero rota além da raiz (ADR-0001 / spec #23). Saída HTML estático.
export default defineConfig({
  output: "static",
  build: {
    // Um único URL: `/index.html`, nunca `/index/index.html`.
    format: "file",

    /*
     * A folha nunca é embutida no HTML, e isso é decisão de orçamento, não de
     * gosto. Duas razões, nesta ordem:
     *
     * 1. **O orçamento tem uma linha de HTML e outra de CSS** (40 KB e 80 KB).
     *    Embutida, a folha some dentro da linha de HTML e o gate mede errado as
     *    duas — no automático do Astro isso ainda muda de lado sozinho quando a
     *    folha cruza o limiar de tamanho.
     * 2. **Cache imutável.** A decisão 6 do ADR-0002 quer os assets com hash de
     *    conteúdo guardados por um ano; folha embutida é rebaixada e volta pela
     *    rede a cada visita, junto com o HTML.
     */
    inlineStylesheets: "never",
  },
});
