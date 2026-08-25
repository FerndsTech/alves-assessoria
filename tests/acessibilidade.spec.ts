import { expect, test } from "@playwright/test";
import { conferirAcessibilidade, montarConjuntoDeRegras, REGRAS_OPT_IN } from "./harness/axe";
import { estadoDeRepouso } from "./harness/estados";

/**
 * O gate de acessibilidade (ADR-0004). Roda **dentro da costura que já existe**
 * — mesmo build, mesmo servidor estático, mesma sessão de navegador.
 *
 * Cobertura hoje: os dois estados de repouso, um por largura. O DOM abaixo do
 * ponto de quebra é genuinamente diferente, não é o mesmo estado numa janela
 * menor. Os outros dois estados do ADR — painel aberto em cada geometria —
 * entram junto com o painel do advogado.
 */
test.describe("gate de acessibilidade", () => {
  test("o conjunto de regras confere contra a tabela do axe", async ({ page }, info) => {
    await page.goto("/");
    const regras = await montarConjuntoDeRegras(page);

    // `montarConjuntoDeRegras` lança se um opt-in sumiu da tabela, se trocou de
    // tag, ou se alguma tag do recorte casou com zero regra. O que falta afirmar
    // aqui é o tamanho: um conjunto que encolhesse para um punhado de regras
    // manteria a suíte verde sem cobrir nada, e é assim que um gate morre sem
    // ninguém perceber. O piso é folgado de propósito — ele pega o colapso, não
    // flutuações de versão do axe.
    expect(regras.length).toBeGreaterThan(50);
    for (const optIn of REGRAS_OPT_IN) expect(regras).toContain(optIn.id);

    info.annotations.push({
      type: "conjunto de regras",
      description: `${regras.length} regras: WCAG A/AA por tag + ${REGRAS_OPT_IN.map((r) => r.id).join(", ")}`,
    });
  });

  test("repouso não tem violação nem incomplete sem justificativa", async ({ page }, info) => {
    await page.goto("/");
    await conferirAcessibilidade(page, estadoDeRepouso(info));
  });
});
