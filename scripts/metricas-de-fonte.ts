import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";

/**
 * Calcula os números do `@font-face` de fallback — `size-adjust`,
 * `ascent-override`, `descent-override`, `line-gap-override` — que impedem a
 * troca de fonte de gerar CLS (brief de marca, seção Carregamento).
 *
 * Roda **à mão**, `npm run metricas-de-fonte`, e o que ele imprime é copiado
 * para `src/styles/global.css`. Nem o build nem o CI dependem dele: o CSS
 * carrega os números, e este script é como se confere de onde vieram.
 *
 * **CLS é o único número que o ADR-0003 se recusou a afrouxar**, e um fallback
 * sem métrica casada é a fonte de CLS mais barata de se ter sem perceber.
 *
 * ## Por que dois fallbacks por família
 *
 * `size-adjust` corrige **largura**, e a largura depende de qual fonte o
 * aparelho de fato tem. Georgia e Arial existem no Windows e no macOS; o Android
 * — que é 99% deste público — não tem nenhuma das duas e cai em Noto Serif e
 * Roboto. Um número só estaria errado num dos dois mundos, então saem dois
 * `@font-face` de fallback por família, cada um preso à sua fonte local.
 *
 * Os três `*-override` **não** dependem do fallback: eles copiam as métricas
 * verticais da fonte real, e é delas que sai a altura da linha.
 */

const RAIZ = fileURLToPath(new URL("..", import.meta.url));

/**
 * O texto de referência da razão de largura.
 *
 * Não é pangrama: é prosa em português com a acentuação que o site de fato
 * escreve, porque o que se quer casar é a largura do texto desta página, não a
 * de um alfabeto uniforme.
 */
const AMOSTRA =
  "Se aparece um desconto que você não reconhece no seu benefício do INSS, " +
  "a associação precisa provar que você autorizou. Advocacia em direito bancário.";

type Origem = { rotulo: string; carregar: () => Promise<Buffer> };

const doDisco = (caminho: string): Origem["carregar"] => () => readFile(caminho);

const doGoogle =
  (familia: string, peso: number): Origem["carregar"] =>
  async () => {
    const ua =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${encodeURIComponent(familia)}:wght@${peso}`,
        { headers: { "user-agent": ua } },
      )
    ).text();
    const bloco = /\/\* latin \*\/\s*@font-face \{([\s\S]*?)\}/.exec(css);
    const url = bloco === null ? null : /url\((https[^)]+)\)/.exec(bloco[1]!)?.[1];
    if (url === undefined || url === null) throw new Error(`Sem face latin para ${familia}`);
    return Buffer.from(await (await fetch(url, { headers: { "user-agent": ua } })).arrayBuffer());
  };

/** A fonte real e as fontes de sistema em que ela vai cair enquanto não chega. */
const FAMILIAS = [
  {
    real: { rotulo: "Spectral 600", carregar: doDisco(`${RAIZ}public/fontes/spectral-600-latin.woff2`) },
    fallbacks: [
      { rotulo: 'local("Georgia")', carregar: doDisco("C:/Windows/Fonts/georgia.ttf") },
      { rotulo: 'local("Noto Serif")', carregar: doGoogle("Noto Serif", 400) },
    ],
  },
  {
    real: { rotulo: "Source Sans 3 400", carregar: doDisco(`${RAIZ}public/fontes/source-sans-3-latin.woff2`) },
    fallbacks: [
      { rotulo: 'local("Arial")', carregar: doDisco("C:/Windows/Fonts/arial.ttf") },
      { rotulo: 'local("Roboto")', carregar: doGoogle("Roboto", 400) },
    ],
  },
] satisfies { real: Origem; fallbacks: Origem[] }[];

async function abrir(origem: Origem): Promise<fontkit.Font> {
  const fonte = fontkit.create(await origem.carregar());
  // Um `woff2` de coleção devolveria `FontCollection`; nenhuma das fontes aqui é.
  if (!("unitsPerEm" in fonte)) throw new Error(`${origem.rotulo} não é uma fonte única`);
  return fonte;
}

/** Largura da amostra em ems — a unidade em que as duas fontes são comparáveis. */
function larguraEmEms(fonte: fontkit.Font): number {
  return fonte.layout(AMOSTRA).advanceWidth / fonte.unitsPerEm;
}

function porcentagem(valor: number): string {
  return `${(valor * 100).toFixed(2)}%`;
}

for (const { real, fallbacks } of FAMILIAS) {
  const fonte = await abrir(real);
  const { ascent, descent, lineGap } = fonte;
  const largura = larguraEmEms(fonte);

  console.log(`\n${real.rotulo} — unitsPerEm ${fonte.unitsPerEm}`);
  for (const fallback of fallbacks) {
    const outra = await abrir(fallback);
    const ajuste = largura / larguraEmEms(outra);
    // Os `*-override` são divididos pelo `size-adjust` porque o navegador aplica
    // o ajuste de tamanho **depois** deles: sem a divisão, a altura da linha
    // sairia escalada pelo mesmo fator e o casamento vertical se perderia.
    console.log(`  ${fallback.rotulo}`);
    console.log(`    size-adjust: ${porcentagem(ajuste)};`);
    console.log(`    ascent-override: ${porcentagem(ascent / fonte.unitsPerEm / ajuste)};`);
    console.log(`    descent-override: ${porcentagem(Math.abs(descent) / fonte.unitsPerEm / ajuste)};`);
    console.log(`    line-gap-override: ${porcentagem(lineGap / fonte.unitsPerEm / ajuste)};`);
  }
}
