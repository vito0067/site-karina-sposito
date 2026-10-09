import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Os textos do blog ficam em `content/textos/`, um arquivo .md por texto.
// Para publicar um texto novo: copie um arquivo existente, troque o nome
// (vira o endereço da página) e o conteúdo. O site faz o resto.

export type Texto = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  data: string;
  destaque: string;
  leitura: number;
  html: string;
};

const PASTA = path.join(process.cwd(), "content", "textos");

function lerCabecalho(bruto: string) {
  const achado = bruto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!achado) return { dados: {} as Record<string, string>, corpo: bruto };
  const dados: Record<string, string> = {};
  for (const linha of achado[1].split(/\r?\n/)) {
    const i = linha.indexOf(":");
    if (i === -1) continue;
    const chave = linha.slice(0, i).trim();
    let valor = linha.slice(i + 1).trim();
    if (/^".*"$/.test(valor)) valor = valor.slice(1, -1);
    dados[chave] = valor;
  }
  return { dados, corpo: achado[2] };
}

function lerTexto(arquivo: string): Texto {
  const slug = arquivo.replace(/\.md$/, "");
  const { dados, corpo } = lerCabecalho(fs.readFileSync(path.join(PASTA, arquivo), "utf8"));
  const palavras = corpo.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    titulo: dados.titulo ?? slug,
    resumo: dados.resumo ?? "",
    categoria: dados.categoria ?? "Textos",
    data: dados.data ?? "",
    destaque: dados.destaque ?? "",
    leitura: Math.max(1, Math.round(palavras / 200)),
    html: marked.parse(corpo, { async: false }) as string,
  };
}

// Mais recentes primeiro. Os três primeiros textos têm a mesma data, então
// entre eles vale a ordem em que a Karina os pediu no formulário.
const ORDEM = ["relacionamento-narcisista", "ansiedade", "medo-da-separacao"];
const posicao = (slug: string) => (ORDEM.includes(slug) ? ORDEM.indexOf(slug) : -1);

export function todosOsTextos(): Texto[] {
  return fs
    .readdirSync(PASTA)
    .filter((a) => a.endsWith(".md"))
    .map(lerTexto)
    .sort((a, b) => b.data.localeCompare(a.data) || posicao(a.slug) - posicao(b.slug));
}

export function buscarTexto(slug: string): Texto | undefined {
  return todosOsTextos().find((t) => t.slug === slug);
}

export function dataPorExtenso(iso: string) {
  if (!iso) return "";
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, d)).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
