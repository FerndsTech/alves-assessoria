import { defineConfig, devices } from "@playwright/test";

/**
 * A costura única do projeto (spec #23, "Testing Decisions"): construir o site,
 * servir a saída estática e dirigir um navegador sem interface contra ela.
 *
 * Um comando só — `npm test` —, idêntico no local e no CI: o `globalSetup`
 * constrói, o `webServer` serve o `dist/` recém-construído, e nada é
 * reaproveitado entre execuções.
 */

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
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
      testIgnore: /sem-javascript\.spec\.ts$/,
    },
    {
      name: "celular",
      use: { ...devices["Pixel 7"] },
      testIgnore: /sem-javascript\.spec\.ts$/,
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

  // Construir o site é a primeira metade da costura; ela roda antes de tudo.
  globalSetup: "./tests/harness/construir.ts",

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
