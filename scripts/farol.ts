import { spawn } from "node:child_process";
import { appendFile, writeFile } from "node:fs/promises";
import { setTimeout as esperar } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import lighthouse from "lighthouse";
import { LIMIARES_DE_CWV, type Metrica } from "./orcamento/tabela.ts";

/**
 * **O farol.** Roda o Lighthouse sobre o site construído e **reporta sem nunca
 * reprovar** (ADR-0002, decisão 5; ADR-0003, decisão 4).
 *
 * O motivo de não bloquear é instrumental, não político: LCP e TBT medidos em
 * runner compartilhado variam entre execuções do **mesmo commit**, porque a CPU
 * varia. Gate que falha por ruído é gate que a equipe aprende a ignorar — e isso
 * é pior que não ter gate, por dar sensação falsa de cobertura. Quem bloqueia é
 * o gate de bytes, que é determinístico.
 *
 * Preset mobile, Slow 4G simulado e CPU 4× são o instrumento que os dois ADRs
 * nomeiam. Trocá-lo torna o número incomparável com a série anterior, que é a
 * única coisa que este script produz de valor.
 *
 * **Sai sempre com código 0**, inclusive quando ele próprio quebra. É a asserção
 * mais importante do arquivo — e quando não mede, ele diz que não mediu, no log
 * e no resumo do job.
 */

const RAIZ = fileURLToPath(new URL("..", import.meta.url));

/** Porta própria: o farol não disputa a 4321 com a costura rodando ao lado. */
const PORTA = 4322;
const URL_BASE = `http://127.0.0.1:${PORTA}`;
const PORTA_DO_CHROME = 9222;
const RELATORIO = `${RAIZ}relatorio-lighthouse.html`;

/**
 * Slow 4G simulado e CPU 4×, escritos aqui em vez de herdados do padrão do
 * Lighthouse: são números de ADR, e um padrão de ferramenta pode mudar de versão
 * sem avisar — a série histórica quebraria em silêncio.
 */
const REDE_LENTA = { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 };

async function esperarOServidor(): Promise<void> {
  for (let tentativa = 0; tentativa < 120; tentativa += 1) {
    const respondeu = await fetch(URL_BASE)
      .then((resposta) => resposta.ok)
      .catch(() => false);
    if (respondeu) return;
    await esperar(1000);
  }
  throw new Error(`O servidor não respondeu em ${URL_BASE} depois de 120 s.`);
}

function formatar(valor: number, { unidade, casas }: { unidade: string; casas: number }): string {
  return `${valor.toFixed(casas)}${unidade}`;
}

/** O mesmo servidor da costura: mesmo build, mesmo `dist/`, mesma forma de servir. */
const servidor = spawn(process.execPath, [`${RAIZ}tests/harness/servidor.ts`], {
  cwd: RAIZ,
  env: { ...process.env, PORTA: String(PORTA) },
  stdio: "inherit",
});

const navegador = await chromium.launch({
  args: [`--remote-debugging-port=${PORTA_DO_CHROME}`],
});

try {
  await esperarOServidor();

  const execucao = await lighthouse(URL_BASE, {
    port: PORTA_DO_CHROME,
    output: "html",
    logLevel: "error",
    onlyCategories: ["performance"],
    formFactor: "mobile",
    throttlingMethod: "simulate",
    throttling: REDE_LENTA,
  });
  if (execucao === undefined) throw new Error("O Lighthouse não devolveu resultado.");

  const { lhr, report } = execucao;
  await writeFile(RELATORIO, Array.isArray(report) ? report.join("") : report);

  const medido: Record<Metrica, number> = {
    lcp: (lhr.audits["largest-contentful-paint"]?.numericValue ?? NaN) / 1000,
    cls: lhr.audits["cumulative-layout-shift"]?.numericValue ?? NaN,
    tbt: lhr.audits["total-blocking-time"]?.numericValue ?? NaN,
    score: (lhr.categories["performance"]?.score ?? NaN) * 100,
  };

  const linhas = LIMIARES_DE_CWV.map((limiar) => {
    const valor = medido[limiar.id];
    const dentro =
      limiar.sentido === "teto" ? valor <= limiar.limiar : valor >= limiar.limiar;
    const alvo = `${limiar.sentido === "teto" ? "≤" : "≥"} ${formatar(limiar.limiar, limiar)}`;
    return { ...limiar, valor, dentro, alvo };
  });

  console.log("\nFarol — Lighthouse mobile, Slow 4G simulado, CPU 4× (informativo)\n");
  for (const linha of linhas) {
    console.log(
      [
        linha.dentro ? "✓" : "!",
        linha.rotulo.padEnd(17),
        formatar(linha.valor, linha).padStart(9),
        `alvo ${linha.alvo}`,
      ].join("  "),
    );
  }
  console.log("\nNenhuma destas linhas reprova o merge. Quem reprova é o gate de bytes.");

  const resumo = process.env.GITHUB_STEP_SUMMARY;
  if (resumo !== undefined) {
    await appendFile(
      resumo,
      [
        "## Farol — Lighthouse (informativo)",
        "",
        "Preset mobile, Slow 4G simulado, CPU 4×. **Nenhuma linha aqui reprova o",
        "merge**: em runner compartilhado, LCP e TBT variam entre execuções do mesmo",
        "commit, e gate que falha por ruído vira gate ignorado.",
        "",
        "INP fica fora por ser métrica exclusivamente de campo; o TBT é o proxy dela.",
        "",
        "| | Métrica | Medido | Alvo |",
        "| --- | --- | ---: | ---: |",
        ...linhas.map((linha) =>
          ["", linha.dentro ? "✓" : "!", linha.rotulo, formatar(linha.valor, linha), linha.alvo, ""].join(" | "),
        ),
        "",
      ].join("\n"),
    );
  }
} catch (erro) {
  // O farol quebrar não pode derrubar o CI: seria o gate ruidoso que os dois
  // ADRs recusaram, só que sem nem medir nada. Mas silêncio também não serve —
  // um farol que parou de funcionar e ninguém viu é pior que nenhum.
  const motivo = erro instanceof Error ? erro.message : String(erro);
  console.error(`\nO farol não conseguiu medir: ${motivo}`);
  console.error("Isto não reprova nada — mas também não é medição. Vale investigar.");

  const resumo = process.env.GITHUB_STEP_SUMMARY;
  if (resumo !== undefined) {
    await appendFile(
      resumo,
      `## Farol — Lighthouse (informativo)\n\n**Não mediu neste commit:** ${motivo}\n\n`,
    );
  }
} finally {
  await navegador.close();
  servidor.kill();
}
