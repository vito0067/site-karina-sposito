import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CapaTexto from "@/components/CapaTexto";
import ProgressoLeitura from "@/components/ProgressoLeitura";
import { Monograma } from "@/components/Logo";
import { IconeSeta, IconeWhatsapp } from "@/components/Icones";
import { todosOsTextos, buscarTexto, dataPorExtenso } from "@/lib/posts";
import { linkWhatsapp, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return todosOsTextos().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const texto = buscarTexto(slug);
  if (!texto) return {};
  return {
    title: texto.titulo,
    description: texto.resumo,
    alternates: { canonical: `/textos/${texto.slug}` },
    // Definir openGraph aqui substitui o do layout inteiro, inclusive a
    // imagem — por isso ela é repetida, senão o link do texto sai sem figura.
    openGraph: {
      title: texto.titulo,
      description: texto.resumo,
      type: "article",
      locale: "pt_BR",
      siteName: site.nome,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: texto.titulo, description: texto.resumo, images: ["/opengraph-image.png"] },
  };
}

export default async function PaginaTexto({ params }: Props) {
  const { slug } = await params;
  const texto = buscarTexto(slug);
  if (!texto) notFound();

  const todos = todosOsTextos();
  const indice = todos.findIndex((t) => t.slug === texto.slug);
  const outros = todos.filter((t) => t.slug !== texto.slug).slice(0, 2);

  const dadosArtigo = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: texto.titulo,
    description: texto.resumo,
    datePublished: texto.data,
    inLanguage: "pt-BR",
    image: `${site.url}/opengraph-image.png`,
    mainEntityOfPage: `${site.url}/textos/${texto.slug}`,
    author: { "@type": "Person", name: site.nome, jobTitle: site.profissao, url: site.url },
    publisher: { "@type": "Organization", name: site.nome, logo: { "@type": "ImageObject", url: `${site.url}/marca/monograma-cor.png` } },
  };

  return (
    <main className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <ProgressoLeitura />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosArtigo) }} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-salvia-200/45 blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-48 h-[28rem] w-[28rem] rounded-full bg-nude/70 blur-[110px]" />

      <article id="artigo" className="relative">
        <header className="container-site">
          <div className="mx-auto max-w-[50rem] text-center">
            <div className="surgir">
              <nav aria-label="Você está em" className="flex items-center justify-center gap-2 text-[0.82rem] text-tinta-leve">
                <Link href="/textos" className="transition-colors hover:text-oliva">
                  Textos
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-bronze-escuro">{texto.categoria}</span>
              </nav>
              <h1 className="mt-7 font-display text-display-lg font-normal text-tinta">{texto.titulo}</h1>
              <p className="mx-auto mt-6 max-w-[38rem] text-[1.12rem] leading-[1.75] text-tinta-suave">{texto.resumo}</p>
              <div className="mt-8 flex items-center justify-center gap-3 text-[0.86rem] text-tinta-suave">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-bronze/25 bg-linho">
                  <Monograma className="h-7 w-auto" semRamo />
                </span>
                <span className="text-left leading-tight">
                  <span className="block font-medium text-tinta">{site.nome}</span>
                  {dataPorExtenso(texto.data)} · {texto.leitura} min de leitura
                </span>
              </div>
            </div>
          </div>

          <div className="surgir mx-auto mt-14 max-w-[64rem]" style={{ "--atraso": "150ms" } as CSSProperties}>
            <div className="overflow-hidden rounded-[2rem]">
              <CapaTexto indice={indice} categoria={texto.categoria} className="aspect-[16/7]" />
            </div>
          </div>
        </header>

        <div className="container-site">
          <div className="artigo mx-auto mt-16 max-w-[42rem]" dangerouslySetInnerHTML={{ __html: texto.html }} />

          {/* Fecho: quem escreveu + convite para conversar */}
          <div className="mx-auto mt-16 max-w-[42rem]">
            <div className="rounded-[2rem] border border-tinta/[0.07] bg-gradient-to-br from-areia to-salvia-50 p-8 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-bronze/25 bg-linho">
                  <Monograma className="h-14 w-auto" />
                </span>
                <div>
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-bronze-escuro">Escrito por</p>
                  <p className="mt-1 font-display text-[1.7rem] text-tinta">{site.nome}</p>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-tinta-suave">
                    Psicanalista clínica, bacharel em Psicologia. Atendimento online para adolescentes, adultos e casais.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 border-t border-tinta/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-display text-[1.3rem] italic leading-snug text-oliva-escuro">Esse texto tocou em algo?</p>
                <a
                  href={linkWhatsapp(`Olá, Karina! Li o seu texto "${texto.titulo}" e gostaria de conversar.`)}
                  target="_blank"
                  rel="noopener"
                  className="botao-principal"
                >
                  <IconeWhatsapp className="h-5 w-5" />
                  Vamos conversar
                </a>
              </div>
            </div>
            <p className="mt-6 text-center text-[0.82rem] leading-relaxed text-tinta-leve">
              Este texto tem caráter informativo e não substitui o acompanhamento de um profissional. Em situação de crise, ligue 188 (CVV).
            </p>
          </div>
        </div>
      </article>

      {outros.length > 0 && (
        <section className="container-site relative mt-28">
          <div className="flex items-center gap-6">
            <p className="shrink-0 font-display text-[2rem] text-tinta">Continue lendo</p>
            <span className="h-px flex-1 bg-tinta/10" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {outros.map((t) => (
              <Link key={t.slug} href={`/textos/${t.slug}`} className="group flex items-center gap-6 rounded-[1.75rem] border border-tinta/[0.07] bg-white/50 p-4 pr-6 transition-all duration-500 hover:bg-white/80 hover:shadow-suave">
                <div className="w-32 shrink-0 overflow-hidden rounded-2xl sm:w-40">
                  <CapaTexto indice={todos.findIndex((x) => x.slug === t.slug)} categoria="" className="aspect-square [&>span]:hidden" />
                </div>
                <div>
                  <p className="text-[0.75rem] uppercase tracking-[0.2em] text-bronze-escuro">{t.categoria}</p>
                  <p className="mt-2 font-display text-[1.3rem] leading-snug text-tinta transition-colors group-hover:text-oliva sm:text-[1.45rem]">{t.titulo}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[0.85rem] font-medium text-oliva">
                    Ler
                    <IconeSeta className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
