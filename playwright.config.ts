import { defineConfig, devices } from "@playwright/test";

/**
 * A costura única do projeto (spec #23, "Testing Decisions"): construir o site,
 * servir a saída estática e dirigir um navegador sem interface contra ela.
 *
 * Um comando só — `npm test` —, idêntico no local e no CI: o `webServer`
 * constrói o site e só então passa a servi-lo, e nada é reaproveitado entre
 * execuções.
 */

/** Os arquivos que não são asserção de navegador, e por isso não se repetem por largura. */
const SEM_NAVEGADOR = [/sem-javascript\.spec\.ts$/, /orcamento\.spec\.ts$/, /contrato\.spec\.ts$/];

const PORTA = 4321;
export const URL_BASE = `http://127.0.0.1:${PORTA}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],

  use: {
    baseURL: URL_BASE,
    trace: "retain-on-failure",
  },

  projects: [
    {
      /*
       * A régua do gate de bytes, testada sem navegador nenhum.
       *
       * **Não é uma segunda costura sobre o site** — a proibição que o spec #23
       * escreveu vale para asserções sobre a página, e não há nenhuma aqui. O que
       * roda é a lógica do instrumento: qual arquivo cai em qual linha, o que
       * conta comprimido, qual variante uma visita paga. Sem isso, o gate pode
       * ficar verde por medir a coisa errada, que é o único modo de falha que um
       * gate não pode ter.
       */
      name: "orcamento",
      testMatch: /orcamento\.spec\.ts$/,
    },
    {
      /*
       * O contrato das duas content collections, também sem navegador nenhum e
       * pela mesma razão que o gate de bytes: o que se afirma é o **portão**, e
       * não a página. Um `.min(140)` apagado por acidente não reprova nada e não
       * aparece em revisão — some, e o build para de quebrar onde deveria.
       */
      name: "contrato",
      testMatch: /contrato\.spec\.ts$/,
    },
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
      testIgnore: SEM_NAVEGADOR,
    },
    {
      name: "celular",
      use: { ...devices["Pixel 7"] },
      testIgnore: SEM_NAVEGADOR,
    },
    {
      // A robustez sem JS é asserção própria, não uma terceira largura:
      // roda só o arquivo que a afirma (ADR-0004, decisão 5).
      name: "sem-javascript",
      use: {
        ...devices["Pixel 7"],
        javaScriptEnabled: false,
      },
      testMatch: /sem-javascript\.spec\.ts$/,
    },
  ],

  webServer: {
    command: "node ./tests/harness/servidor.ts",
    url: URL_BASE,
    // Sempre serve do zero, do mesmo `dist/` recém-construído: é o que faz
    // "igual no local e no CI" ser verdade em vez de intenção.
    reuseExistingServer: false,
    timeout: 120_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
