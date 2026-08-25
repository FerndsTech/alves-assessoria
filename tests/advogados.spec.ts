import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * A seção **Advogados**: três cards na vitrine, "ver mais" abre os seis, grade
 * nunca carrossel, e um card enxuto — foto · nome · OAB discreto · áreas · a
 * afordância de clique.
 *
 * O que esta costura afirma são as **decisões**, e não o dado: os seis fichários
 * já têm o portão do Zod, e varrer os seis aqui afirmaria a mesma marcação seis
 * vezes. Onde a asserção precisa olhar todos os cards — o `alt`, a ausência de
 * telefone — ela olha o que é *invariante entre eles*, não o conteúdo de cada um.
 */

const SECAO = "#advogados";

/**
 * Palavras e formas que a seção não pode acomodar. **Nenhum componente aqui tem
 * onde pôr depoimento, contador de resultado, caso de sucesso ou logo de
 * cliente** — não é recorte de escopo: promessa de resultado e captação são
 * vedação normativa (CED art. 44, §1º; Prov. 205 art. 3º).
 *
 * Isto é arame de tropeço, não prova: nenhuma lista de palavras decide
 * conformidade. O que ela compra é que a formulação óbvia não chegue ao site em
 * silêncio.
 */
const PALAVRAS_VEDADAS = [
  "depoimento",
  "clientes atendidos",
  "casos de sucesso",
  "caso de sucesso",
  "resultados",
  "recuperamos",
  "recupere",
  "processos ganhos",
  "ações ganhas",
  "acoes ganhas",
  "satisfação garantida",
  "consulta gratuita",
  "gratuito",
  "sem custo",
];

/** Uma sequência de dígitos com cara de telefone brasileiro, em qualquer grafia. */
const CARA_DE_TELEFONE = /(\(?\d{2}\)?[\s.-]?)?9?\d{4}[\s.-]?\d{4}/;

function cards(pagina: Page): Locator {
  return pagina.locator(`${SECAO} .advogado`);
}

/**
 * Tabula até que o seletor tenha o foco, e devolve quantos `Tab` custou.
 *
 * Programar `elemento.focus()` não serve: `:focus-visible` — que é o que decide
 * se o anel aparece — depende de o foco ter chegado por teclado. Um anel afirmado
 * com foco programático seria um anel afirmado num estado que o visitante não
 * alcança.
 */
async function tabularAte(pagina: Page, seletor: string, limite = 12): Promise<number> {
  for (let passo = 1; passo <= limite; passo += 1) {
    await pagina.keyboard.press("Tab");
    const chegou = await pagina.evaluate(
      (alvo) => document.activeElement?.matches(alvo) ?? false,
      seletor,
    );
    if (chegou) return passo;
  }
  throw new Error(`"${seletor}" não recebeu foco em ${limite} tabulações.`);
}

test.describe("seção Advogados", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("existe sob a âncora para onde o herói aponta", async ({ page }) => {
    // O segundo botão do herói aponta para `#advogados` desde o #25. Esta seção
    // é quem passou a ter a âncora — até aqui ela era um destino pendurado.
    await expect(page.locator(SECAO)).toBeVisible();
    const destinos = await page
      .locator("#heroi a[href]")
      .evaluateAll((elos) => elos.map((elo) => elo.getAttribute("href")));
    expect(destinos).toContain("#advogados");
  });

  test("três na vitrine, e os seis estão no HTML entregue", async ({ page }) => {
    // Os seis existem no documento **antes** de qualquer interação: os três de
    // baixo estão escondidos por um `<details>`, não por script. Sem isso eles
    // sumiriam de vez para quem ficou sem pacote de dados no meio do carregamento.
    await expect(cards(page)).toHaveCount(6);
    await expect(page.locator(`${SECAO} .advogado:visible`)).toHaveCount(3);
  });

  test('"ver mais" abre os seis, e o rótulo troca', async ({ page }) => {
    const disclosure = page.locator(`${SECAO} details`);
    const gatilho = disclosure.locator("summary");

    await expect(gatilho).toBeVisible();
    const rotuloFechado = (await gatilho.innerText()).trim();

    await gatilho.click();
    await expect(page.locator(`${SECAO} .advogado:visible`)).toHaveCount(6);

    const rotuloAberto = (await gatilho.innerText()).trim();
    expect(rotuloAberto).not.toBe(rotuloFechado);

    // E fecha de volta: é um disclosure, não um caminho de mão única.
    await gatilho.click();
    await expect(page.locator(`${SECAO} .advogado:visible`)).toHaveCount(3);
  });

  test("grade, nunca carrossel", async ({ page }) => {
    const grades = page.locator(`${SECAO} .advogados__grade`);
    await expect(grades).toHaveCount(2);

    for (const gabarito of await grades.evaluateAll((els) =>
      els.map((el) => getComputedStyle(el).display),
    )) {
      expect(gabarito).toBe("grid");
    }

    // Carrossel se reconhece pela rolagem lateral, não pelo nome da classe.
    const rolaDeLado = await page.locator(SECAO).evaluate((secao) =>
      [secao, ...secao.querySelectorAll("*")].some((elemento) => {
        const estilo = getComputedStyle(elemento);
        return ["auto", "scroll"].includes(estilo.overflowX);
      }),
    );
    expect(rolaDeLado, "seção com rolagem lateral é carrossel disfarçado").toBe(false);
  });

  test("o card é enxuto: foto, nome, OAB e até três áreas", async ({ page }) => {
    const primeiro = cards(page).first();

    await expect(primeiro.locator("img")).toHaveCount(1);
    await expect(primeiro.locator("h3")).toHaveCount(1);
    await expect(primeiro.getByText(/OAB\/CE/)).toBeVisible();

    for (const quantas of await cards(page).evaluateAll((els) =>
      els.map((el) => el.querySelectorAll(".advogado__areas li").length),
    )) {
      expect(quantas).toBeGreaterThan(0);
      expect(quantas).toBeLessThanOrEqual(3);
    }
  });

  test("nível, medida e barra não existem no card", async ({ page }) => {
    // Lista taxativa do CED art. 44, §1º: o que não está nela não se anuncia, e
    // barra de habilidade não está. O contrato já não tem `skills`; aqui se
    // afirma que o template também não tem onde renderizar um.
    const secao = page.locator(SECAO);
    await expect(secao.locator("progress, meter")).toHaveCount(0);
    await expect(secao.locator('[role="progressbar"], [role="meter"]')).toHaveCount(0);

    // `textContent` e não `innerText`: os três de baixo estão dentro do
    // `<details>` fechado, e `innerText` devolve vazio para o que não está na
    // tela — a asserção passaria sem olhar metade dos cards.
    const texto = (
      await cards(page).evaluateAll((els) => els.map((el) => el.textContent ?? ""))
    ).join(" ");
    expect(texto, "porcentagem num card é medida, e medida está vedada").not.toMatch(/%/);
  });

  test("o card não exibe número de telefone", async ({ page }) => {
    // WhatsApp, unidade, cidade e endereço migram para o painel. A vitrine não é
    // lista telefônica — e o número que apareceria aqui é o da pessoa.
    const secao = page.locator(SECAO);
    await expect(secao.locator('.advogado a[href^="tel:"]')).toHaveCount(0);
    await expect(secao.locator('.advogado a[href*="wa.me"]')).toHaveCount(0);

    for (const texto of await cards(page).evaluateAll((els) =>
      els.map((el) => el.textContent ?? ""),
    )) {
      // O número de OAB é dígito e fica: ele não tem forma de telefone.
      const semOab = texto.replace(/OAB\/CE\s*[\d.]+/g, "");
      expect(semOab, `card com algo parecido com telefone: ${semOab}`).not.toMatch(
        CARA_DE_TELEFONE,
      );
    }
  });

  test("a afordância é texto visível, card inteiro clicável e anel de foco", async ({ page }) => {
    const primeiro = cards(page).first();
    const acao = primeiro.locator(".advogado__acao");

    // 1. Texto visível de ação — cursor em forma de mão não existe em celular.
    await expect(acao).toBeVisible();
    expect((await acao.innerText()).trim().length).toBeGreaterThan(0);

    // 2. Card inteiro clicável: o que está sob o canto superior do card é o link.
    //    `elementFromPoint` fala em coordenadas de viewport, então o card precisa
    //    estar na tela antes de a pergunta fazer sentido.
    await primeiro.scrollIntoViewIfNeeded();
    const caixa = await primeiro.boundingBox();
    expect(caixa).not.toBeNull();
    const souOLink = await page.evaluate(
      ({ x, y }) => {
        const alvo = document.elementFromPoint(x, y);
        return alvo?.closest(".advogado__acao") !== null;
      },
      { x: caixa!.x + 12, y: caixa!.y + 12 },
    );
    expect(souOLink, "o canto do card tem de estar dentro da área de clique").toBe(true);

    // 3. Anel de foco, e com o foco chegando por teclado.
    await tabularAte(page, ".advogado__acao");
    const anel = await primeiro.evaluate((card) => {
      const estilo = getComputedStyle(card);
      return { estilo: estilo.outlineStyle, largura: estilo.outlineWidth };
    });
    expect(anel.estilo).not.toBe("none");
    expect(parseFloat(anel.largura)).toBeGreaterThan(0);
  });

  test("o `alt` do retrato é derivado do nome, num lugar só", async ({ page }) => {
    // Nenhuma collection ganha campo de texto alternativo (ADR-0004, decisão 6).
    // A asserção é sobre a **derivação**: o alt de cada card contém o nome
    // daquele card, e os seis seguem a mesma forma.
    const derivados = await cards(page).evaluateAll((els) =>
      els.map((el) => ({
        nome: el.querySelector("h3")?.textContent?.trim() ?? "",
        alt: el.querySelector("img")?.getAttribute("alt") ?? "",
      })),
    );

    expect(derivados).toHaveLength(6);
    const formas = new Set<string>();
    for (const { nome, alt } of derivados) {
      expect(nome.length).toBeGreaterThan(0);
      expect(alt, `alt de "${nome}" não carrega o nome`).toContain(nome);
      formas.add(alt.replace(nome, "{nome}"));
    }
    expect(formas.size, `os seis alt deveriam ter a mesma forma: ${[...formas].join(" | ")}`).toBe(
      1,
    );
  });

  test("os três da vitrine saem de `ordem`, e não do alfabeto", async ({ page }) => {
    // O dado fictício foi arranjado de propósito para que as duas ordens
    // discordem — sem isso, a asserção passaria por acidente com qualquer
    // critério de ordenação.
    const nomes = await page
      .locator(`${SECAO} .advogado:visible h3`)
      .evaluateAll((els) => els.map((el) => el.textContent?.trim() ?? ""));

    expect(nomes).toHaveLength(3);
    const alfabetica = [...nomes].sort((a, b) => a.localeCompare(b, "pt-BR"));
    expect(nomes, "a vitrine está em ordem alfabética — `ordem` deixou de decidir").not.toEqual(
      alfabetica,
    );
  });

  test("a seção fecha no bloco de CTA de quatro elementos", async ({ page }) => {
    const cta = page.locator(`${SECAO} [data-cta]`);
    await expect(cta).toHaveCount(1);

    // O bloco é o último filho da seção: ele fecha, não interrompe.
    const ehOUltimo = await page
      .locator(SECAO)
      .evaluate((secao) => secao.lastElementChild?.hasAttribute("data-cta") ?? false);
    expect(ehOUltimo).toBe(true);

    // 1. O botão, com o verbo certo. "Agendar" ergue barreira alta para quem
    //    ainda não sabe se tem um problema.
    const botao = cta.locator('a[href*="wa.me"]');
    await expect(botao).toHaveCount(1);
    const rotulo = (await botao.innerText()).trim();
    expect(rotulo.toLowerCase()).toContain("falar");
    expect(rotulo.toLowerCase()).not.toContain("agendar");

    // 2. O texto de assunto: o que está na tela é o que o `wa.me` pré-preenche,
    //    e ele não carrega código de origem nenhum.
    const assunto = (await cta.locator(".cta__assunto").innerText()).trim();
    const href = (await botao.getAttribute("href")) ?? "";
    expect(decodeURIComponent(new URL(href).searchParams.get("text") ?? "")).toBe(assunto);
    expect(assunto).not.toMatch(/\[|\]|utm_|ADV-|origem=/i);

    // 3. O horário, visível ali perto e publicado estático.
    await expect(
      cta.getByText("Seg a sex, 08h às 16h · atendimento presencial mediante hora marcada"),
    ).toBeVisible();

    // 4. A alternativa de telefone é condicional e está pendente do #16. Quando
    //    o fato chegar, ela aparece — e este par de asserções vira uma só.
    await expect(cta.locator('a[href^="tel:"]')).toHaveCount(0);
  });

  test("nada acomoda depoimento, contador, caso de sucesso ou logo de cliente", async ({
    page,
  }) => {
    const secao = page.locator(SECAO);

    await expect(secao.locator("blockquote, q, cite")).toHaveCount(0);
    // Logo de cliente entraria como imagem fora dos retratos: seis imagens, seis
    // cards, e nenhuma sobrando.
    await expect(secao.locator("img")).toHaveCount(6);

    const texto = (await secao.innerText()).toLowerCase();
    const encontradas = PALAVRAS_VEDADAS.filter((palavra) => texto.includes(palavra));
    expect(encontradas, `copy da seção contém: ${encontradas.join(", ")}`).toEqual([]);
  });

  test("a ficção se deriva do dado: OAB 000.000 marca o card", async ({ page }) => {
    // Um campo `ficticio` paralelo seria um segundo lugar que pode discordar. A
    // marcação sai do próprio número, então trocar por uma pessoa real apaga a
    // marca sem que ninguém precise lembrar dela.
    await expect(page.locator(`${SECAO} .advogado[data-placeholder="copy"]`)).toHaveCount(6);
    await expect(page.locator(`${SECAO} .advogado img[data-placeholder="asset"]`)).toHaveCount(6);

    const numeros = await cards(page).evaluateAll((els) =>
      els.map((el) => el.querySelector(".advogado__oab")?.textContent?.trim() ?? ""),
    );
    for (const numero of numeros) expect(numero).toContain("000.000");
  });
});
