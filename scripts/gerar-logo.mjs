// Gera a marca da Karina Sposito a partir das fontes do site.
// As letras viram desenho (caminhos vetoriais), então o logo fica idêntico em
// qualquer computador, gráfica ou rede social, mesmo sem a fonte instalada.
//
// Rodar:  npm run logo
// Saída:  public/marca/*.svg e *.png, app/icon.svg, app/apple-icon.png
//         e lib/marca.ts (usado pelo componente <Logo/> do site).

import fs from "node:fs";
import opentype from "opentype.js";
import sharp from "sharp";

const fonte = (arquivo) => {
  const b = fs.readFileSync(`node_modules/@fontsource/${arquivo}`);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
const cormorant = fonte("cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff");
const cormorantItalico = fonte("cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff");
const cormorantNome = fonte("cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff");
const jost = fonte("jost/files/jost-latin-400-normal.woff");

const CORES = {
  bronze: "#A88660",
  oliva: "#66704F",
  salvia: "#97A481",
  tinta: "#3A3A2C",
  linho: "#F8F3EC",
};

const r = (n) => Math.round(n * 100) / 100;

// O toPathData() do opentype.js às vezes escreve "NaN" no meio do desenho
// (aconteceu no segundo S de "PSICANÁLISE"), e o navegador para de desenhar
// dali em diante. Montamos o caminho nós mesmos a partir dos comandos.
function paraD(caminho) {
  return caminho.commands
    .map((c) => {
      if (c.type === "M" || c.type === "L") return `${c.type}${r(c.x)} ${r(c.y)}`;
      if (c.type === "Q") return `Q${r(c.x1)} ${r(c.y1)} ${r(c.x)} ${r(c.y)}`;
      if (c.type === "C") return `C${r(c.x1)} ${r(c.y1)} ${r(c.x2)} ${r(c.y2)} ${r(c.x)} ${r(c.y)}`;
      return "Z";
    })
    .join("");
}

// ── Ramo de oliveira ────────────────────────────────────────────────────
// Caule em curva de Bézier com folhas alternadas que diminuem até a ponta.
function bezier(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0];
  const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1];
  const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  return { x, y, ang: Math.atan2(dy, dx) };
}

function folha(x, y, ang, comp, larg) {
  const tx = x + Math.cos(ang) * comp;
  const ty = y + Math.sin(ang) * comp;
  const mx = x + Math.cos(ang) * comp * 0.48;
  const my = y + Math.sin(ang) * comp * 0.48;
  const nx = -Math.sin(ang) * larg;
  const ny = Math.cos(ang) * larg;
  // Folha em forma de amêndoa, levemente assimétrica (mais natural).
  return `M${r(x)} ${r(y)}Q${r(mx + nx * 1.05)} ${r(my + ny * 1.05)} ${r(tx)} ${r(ty)}Q${r(mx - nx * 0.9)} ${r(my - ny * 0.9)} ${r(x)} ${r(y)}Z`;
}

function ramo({ p0, p1, p2, p3, folhas = 7, tamanho = 30, largura = 8 }) {
  const caule = `M${p0.join(" ")}C${p1.join(" ")} ${p2.join(" ")} ${p3.join(" ")}`;
  const partes = [];
  for (let i = 0; i < folhas; i++) {
    const t = 0.16 + (i / folhas) * 0.8;
    const { x, y, ang } = bezier(p0, p1, p2, p3, t);
    const lado = i % 2 === 0 ? -1 : 1;
    const escala = 1 - t * 0.42;
    partes.push(folha(x, y, ang + lado * 0.78, tamanho * escala, largura * escala));
  }
  const ponta = bezier(p0, p1, p2, p3, 1);
  partes.push(folha(ponta.x, ponta.y, ponta.ang, tamanho * 0.62, largura * 0.62));
  return { caule, folhas: partes.join("") };
}

// ── Monograma ───────────────────────────────────────────────────────────
// Caixa 300 × 360. Um arco (a ideia de porta, de lugar seguro), o K em
// bronze, o S em itálico verde-oliva passando por cima da perna do K, e um
// raminho que nasce do S e sai do arco — crescimento além do limite.
const kD = paraD(cormorant.getPath("K", 58, 246, 232));
const sD = paraD(cormorantItalico.getPath("S", 128, 276, 232));

const arco = "M44 330V156A106 106 0 0 1 256 156V222";
const arcoFim = "M256 276V330";
const galho = ramo({ p0: [206, 284], p1: [240, 274], p2: [266, 250], p3: [290, 196], folhas: 7, tamanho: 31, largura: 8.6 });

function monograma({ k, s, linha, folha: corFolha, caule, id = "m", traco = 1.6, fixo = false }) {
  const ve = fixo ? ` vector-effect="non-scaling-stroke"` : "";
  return `
  <defs>
    <mask id="${id}-recorte" maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="360">
      <rect width="300" height="360" fill="#fff"/>
      <path d="${sD}" fill="#000" stroke="#000" stroke-width="7" stroke-linejoin="round"/>
    </mask>
  </defs>
  <path d="${arco}" fill="none" stroke="${linha}" stroke-width="${traco}" stroke-linecap="round"${ve}/>
  <path d="${arcoFim}" fill="none" stroke="${linha}" stroke-width="${traco}" stroke-linecap="round"${ve}/>
  <path d="${kD}" fill="${k}" mask="url(#${id}-recorte)"/>
  <path d="${sD}" fill="${s}"/>
  <path d="${galho.caule}" fill="none" stroke="${caule}" stroke-width="${fixo ? traco : traco * 1.1}" stroke-linecap="round"${ve}/>
  <path d="${galho.folhas}" fill="${corFolha}"/>`;
}

// ── Nome e assinatura ───────────────────────────────────────────────────
function textoEspacado(fonteUsada, texto, tamanho, espacamento) {
  let x = 0;
  const caminhos = [];
  for (const ch of texto) {
    const glifo = fonteUsada.charToGlyph(ch);
    if (ch !== " ") caminhos.push(paraD(glifo.getPath(x, 0, tamanho)));
    x += (glifo.advanceWidth / fonteUsada.unitsPerEm) * tamanho + espacamento;
  }
  const largura = x - espacamento;
  // Caminho único com origem (0,0) na linha de base; transladado depois.
  return { d: caminhos.join(""), largura };
}

const nome = textoEspacado(cormorantNome, "KARINA SPOSITO", 64, 13);
const assinatura = textoEspacado(jost, "PSICANÁLISE CLÍNICA", 20, 8.4);

const PALETAS = {
  cor: { k: CORES.bronze, s: CORES.oliva, linha: CORES.bronze, folha: CORES.salvia, caule: CORES.oliva, nome: CORES.tinta, assin: CORES.bronze },
  escuro: { k: CORES.tinta, s: CORES.oliva, linha: CORES.tinta, folha: CORES.oliva, caule: CORES.oliva, nome: CORES.tinta, assin: CORES.oliva },
  claro: { k: CORES.linho, s: "#DCE1D0", linha: "#C9AE8A", folha: "#CDD5BE", caule: "#DCE1D0", nome: CORES.linho, assin: "#C9AE8A" },
};

function svg(viewBox, conteudo, fundo) {
  const [, , w, h] = viewBox.split(" ").map(Number);
  const rect = fundo ? `<rect width="${w}" height="${h}" fill="${fundo}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${w}" height="${h}">${rect}${conteudo}</svg>\n`;
}

function arquivoMonograma(p, id) {
  return svg("0 0 300 360", monograma({ ...p, id }));
}

function arquivoVertical(p, id) {
  const W = 720;
  const escalaMarca = 0.92;
  const xMarca = (W - 300 * escalaMarca) / 2;
  const yNome = 300 * escalaMarca + 160;
  const xNome = (W - nome.largura) / 2;
  const yLinha = yNome + 46;
  const xAss = (W - assinatura.largura) / 2;
  const yAss = yLinha + 52;
  const conteudo = `
  <g transform="translate(${r(xMarca)} 28) scale(${escalaMarca})">${monograma({ ...p, id, traco: 1.9 })}</g>
  <path transform="translate(${r(xNome)} ${yNome})" d="${nome.d}" fill="${p.nome}"/>
  <path d="M${W / 2 - 120} ${yLinha}H${W / 2 - 14}M${W / 2 + 14} ${yLinha}H${W / 2 + 120}" stroke="${p.linha}" stroke-width="1.2" stroke-linecap="round"/>
  <path d="${folha(W / 2 - 8, yLinha, 0, 16, 4.2)}" fill="${p.folha}"/>
  <path transform="translate(${r(xAss)} ${yAss})" d="${assinatura.d}" fill="${p.assin}"/>`;
  return svg(`0 0 ${W} ${yAss + 40}`, conteudo);
}

function arquivoHorizontal(p, id) {
  const escalaMarca = 0.5;
  const larguraMarca = 300 * escalaMarca;
  const xTexto = larguraMarca + 34;
  const escalaNome = 0.78;
  const W = Math.ceil(xTexto + Math.max(nome.largura * escalaNome, assinatura.largura) + 8);
  const conteudo = `
  <g transform="translate(0 0) scale(${escalaMarca})">${monograma({ ...p, id, traco: 3.2 })}</g>
  <path transform="translate(${xTexto} 98) scale(${escalaNome})" d="${nome.d}" fill="${p.nome}"/>
  <path transform="translate(${xTexto + 1} 136)" d="${assinatura.d}" fill="${p.assin}"/>`;
  return svg(`0 0 ${W} 180`, conteudo);
}

// Ícone do navegador: só o monograma, maior e sem o ramo (fica legível em 16px).
function arquivoIcone() {
  const conteudo = `
  <rect width="512" height="512" rx="112" fill="${CORES.linho}"/>
  <defs>
    <mask id="i-recorte" maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="360">
      <rect width="300" height="360" fill="#fff"/>
      <path d="${sD}" fill="#000" stroke="#000" stroke-width="9" stroke-linejoin="round"/>
    </mask>
  </defs>
  <g transform="translate(36 28) scale(1.38)">
    <path d="${kD}" fill="${CORES.bronze}" mask="url(#i-recorte)"/>
    <path d="${sD}" fill="${CORES.oliva}"/>
  </g>`;
  return svg("0 0 512 512", conteudo);
}

fs.mkdirSync("public/marca", { recursive: true });
const saidas = [];
for (const [nomeVar, p] of Object.entries(PALETAS)) {
  saidas.push([`monograma-${nomeVar}`, arquivoMonograma(p, `m-${nomeVar}`)]);
  saidas.push([`logo-vertical-${nomeVar}`, arquivoVertical(p, `v-${nomeVar}`)]);
  saidas.push([`logo-horizontal-${nomeVar}`, arquivoHorizontal(p, `h-${nomeVar}`)]);
}
for (const [arquivo, conteudo] of saidas) {
  fs.writeFileSync(`public/marca/${arquivo}.svg`, conteudo);
  const fundo = arquivo.endsWith("claro") ? CORES.oliva : null;
  let img = sharp(Buffer.from(conteudo), { density: 400 }).resize({ width: 2000, withoutEnlargement: false });
  if (fundo) img = img.flatten({ background: fundo });
  await img.png().toFile(`public/marca/${arquivo}.png`);
}

// Logo do menu e do rodapé do site: arquivo de imagem (o navegador guarda em
// cache) em vez de desenho embutido em cada página — deixa o site mais leve.
// Os traços finos usam espessura fixa de tela, para não sumirem em tamanho pequeno.
const CORES_SITE = {
  cor: { ...PALETAS.cor, assin: "#6F5434" },
  claro: PALETAS.claro,
};
const larguraLogoSite = Math.ceil(116 + Math.max(nome.largura * 0.62, assinatura.largura * 0.86) + 4);
for (const [variante, p] of Object.entries(CORES_SITE)) {
  const conteudo = `
  <svg x="0" y="0" width="100" height="120" viewBox="0 0 300 360">${monograma({ ...p, id: `site-${variante}`, traco: 1.2, fixo: true })}</svg>
  <path transform="translate(116 66) scale(0.62)" d="${nome.d}" fill="${p.nome}"/>
  <path transform="translate(117 93) scale(0.86)" d="${assinatura.d}" fill="${p.assin}"/>`;
  fs.writeFileSync(`public/marca/logo-site-${variante}.svg`, svg(`0 0 ${larguraLogoSite} 120`, conteudo));
}
fs.writeFileSync("lib/logo-site.ts", `// Gerado por scripts/gerar-logo.mjs — proporção do logo do site.
export const LOGO_SITE = { largura: ${larguraLogoSite}, altura: 120 };
`);

const icone = arquivoIcone();
fs.writeFileSync("app/icon.svg", icone);
await sharp(Buffer.from(icone), { density: 300 }).resize(180, 180).png().toFile("app/apple-icon.png");
await sharp(Buffer.from(icone), { density: 300 }).resize(1080, 1080).png().toFile("public/marca/icone-redes-sociais.png");

// Foto de perfil para redes sociais: fundo cheio (as redes recortam em círculo).
const avatar = svg(
  "0 0 1080 1080",
  `<rect width="1080" height="1080" fill="${CORES.linho}"/>
  <g transform="translate(225 162) scale(2.1)">${monograma({ ...PALETAS.cor, id: "avatar", traco: 1.5 })}</g>`,
);
await sharp(Buffer.from(avatar), { density: 200 }).resize(1080, 1080).png().toFile("public/marca/foto-perfil-redes.png");

// ── Imagem de compartilhamento (aparece quando o link é enviado no WhatsApp,
// Instagram, Facebook…). Mesma linguagem do topo do site.
const newsreader = fonte("newsreader/files/newsreader-latin-400-normal.woff");
const newsreaderItalico = fonte("newsreader/files/newsreader-latin-300-italic.woff");
const linha = (f, texto, tamanho) => ({ d: paraD(f.getPath(texto, 0, 0, tamanho)), largura: f.getAdvanceWidth(texto, tamanho) });
const t1 = linha(newsreader, "Um lugar seguro para", 66);
const t2 = linha(newsreaderItalico, "cuidar do que você sente.", 66);
const rodapeOg = textoEspacado(jost, "ATENDIMENTO ONLINE · ADOLESCENTES, ADULTOS E CASAIS", 14, 3.4);

// Se a foto da Karina existir, ela entra dentro do arco; senão, fica o amanhecer.
const arquivoFoto = ["webp", "jpg", "jpeg", "png"].map((e) => `public/fotos/karina-sobre.${e}`).find((f) => fs.existsSync(f));
const fotoOg = arquivoFoto
  ? (await sharp(arquivoFoto).resize({ width: 680, height: 1080, fit: "cover", position: "top" }).jpeg({ quality: 88 }).toBuffer()).toString("base64")
  : null;
const dentroDoArco = fotoOg
  ? `<image x="790" y="90" width="340" height="540" preserveAspectRatio="xMidYMid slice" href="data:image/jpeg;base64,${fotoOg}"/>`
  : `<rect x="780" y="80" width="360" height="560" fill="url(#og-ceu)"/>
    <circle cx="960" cy="420" r="120" fill="none" stroke="#C9AE8A" stroke-opacity="0.35"/>
    <circle cx="960" cy="420" r="92" fill="none" stroke="#C9AE8A" stroke-opacity="0.45"/>
    <circle cx="960" cy="420" r="66" fill="url(#og-sol)"/>
    <path d="M780 470C840 440 900 446 960 462S1080 484 1140 452V640H780Z" fill="#D9DFCB"/>
    <path d="M780 506C850 480 920 490 980 506S1090 526 1140 498V640H780Z" fill="#C2CBAF"/>
    <path d="M780 546C870 520 950 540 1020 556S1100 562 1140 546V640H780Z" fill="#A5B18F"/>
    <path d="M780 586C880 568 1000 596 1140 578V640H780Z" fill="#87946F"/>`;

const og = svg(
  "0 0 1200 630",
  `<defs>
    <linearGradient id="og-fundo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F3E7DE"/><stop offset="0.55" stop-color="${CORES.linho}"/><stop offset="1" stop-color="#E9ECDF"/>
    </linearGradient>
    <linearGradient id="og-ceu" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ECD9CF"/><stop offset="0.5" stop-color="#F4E7DC"/><stop offset="1" stop-color="#E3E8D6"/>
    </linearGradient>
    <radialGradient id="og-sol" cx="0.5" cy="0.45" r="0.55">
      <stop offset="0" stop-color="#FBF1E6"/><stop offset="0.6" stop-color="#F2DDCB"/><stop offset="1" stop-color="#E6C7B4"/>
    </radialGradient>
    <clipPath id="og-arco"><path d="M790 630V260A170 170 0 0 1 1130 260V630Z"/></clipPath>
  </defs>
  <rect width="1200" height="630" fill="url(#og-fundo)"/>
  <g clip-path="url(#og-arco)">
    ${dentroDoArco}
  </g>
  <path d="M791 630V260A169 169 0 0 1 1129 260V630" fill="none" stroke="${CORES.bronze}" stroke-opacity="0.6" stroke-width="1.4"/>
  <g transform="translate(86 70) scale(0.42)">${monograma({ ...PALETAS.cor, id: "og", traco: 3.4 })}</g>
  <path transform="translate(226 136) scale(0.62)" d="${nome.d}" fill="${CORES.tinta}"/>
  <path transform="translate(227 166) scale(0.86)" d="${assinatura.d}" fill="${CORES.bronze}"/>
  <path transform="translate(90 340)" d="${t1.d}" fill="${CORES.tinta}"/>
  <path transform="translate(90 420)" d="${t2.d}" fill="${CORES.oliva}"/>
  <path d="M90 536H130" stroke="${CORES.bronze}" stroke-width="1.4"/>
  <path transform="translate(146 542)" d="${rodapeOg.d}" fill="#82633F"/>`,
);
await sharp(Buffer.from(og), { density: 144 }).resize(1200, 630).png().toFile("app/opengraph-image.png");
fs.writeFileSync("app/opengraph-image.alt.txt", "Karina Sposito — Psicanálise clínica online. Um lugar seguro para cuidar do que você sente.");

// Dados para o componente <Logo/> do site.
const ts = `// Arquivo gerado por scripts/gerar-logo.mjs — não editar à mão.
// Para mudar o logo, ajuste o script e rode: npm run logo

export const marca = {
  k: ${JSON.stringify(kD)},
  s: ${JSON.stringify(sD)},
  arco: ${JSON.stringify(arco)},
  arcoFim: ${JSON.stringify(arcoFim)},
  caule: ${JSON.stringify(galho.caule)},
  folhas: ${JSON.stringify(galho.folhas)},
  nome: ${JSON.stringify(nome.d)},
  nomeLargura: ${r(nome.largura)},
  assinatura: ${JSON.stringify(assinatura.d)},
  assinaturaLargura: ${r(assinatura.largura)},
};
`;
fs.writeFileSync("lib/marca.ts", ts);

console.log(`Gerados ${saidas.length * 2 + 4} arquivos de marca.`);
