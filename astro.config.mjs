// @ts-check
import { defineConfig } from "astro/config";

// Zero rota além da raiz (ADR-0001 / spec #23). Saída HTML estático.
export default defineConfig({
  output: "static",
  build: {
    // Um único URL: `/index.html`, nunca `/index/index.html`.
    format: "file",
  },
});
