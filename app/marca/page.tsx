import type { Metadata } from "next";
import Image from "next/image";
import { Monograma, Logo } from "@/components/Logo";

// Guia de marca: página para apresentar o logo à Karina e para baixar os
// arquivos. Não aparece no Google (noindex) nem no menu do site.
export const metadata: Metadata = {
  title: "Identidade visual",
  robots: { index: false, follow: false },
};

const CORES = [
  { nome: "Linho", hex: "#F8F3EC", uso: "Fundo principal", escuro: false },
  { nome: "Areia", hex: "#F1E8DD", uso: "Fundo de seções", escuro: false },
  { nome: "Nude", hex: "#EAD8CD", uso: "Detalhes, degradês", escuro: false },
  { nome: "Sálvia", hex: "#A7B096", uso: "Folhas, ilustrações", escuro: false },
  { nome: "Oliva", hex: "#66704F", uso: "Botões, destaques", escuro: true },
  { nome: "Oliva profundo", hex: "#3E4531", uso: "Rodapé, fundos escuros", escuro: true },
  { nome: "Bronze", hex: "#A88660", uso: "Letra K, linhas finas", escuro: true },
  { nome: "Tinta", hex: "#3A3A2C", uso: "Textos (no lugar do preto)", escuro: true },
];

const ARQUIVOS = [
  { nome: "Logo vertical", base: "logo-vertical" },
  { nome: "Logo horizontal", base: "logo-horizontal" },
  { nome: "Monograma", base: "monograma" },
];

function Download({ href, rotulo }: { href: string; rotulo: string }) {
  return (
    <a href={href} download className="rounded-full border border-tinta/15 px-3 py-1 text-[0.78rem] text-tinta-suave transition-colors hover:border-oliva/40 hover:text-oliva">
      {rotulo}
    </a>
  );
}

export default function Marca() {
  return (
    <main className="relative pb-24 pt-36 sm:pt-44">
      <div className="container-site">
        <p className="sobretitulo">Identidade visual</p>
        <h1 className="mt-6 max-w-[52rem] font-display text-display-xl font-normal text-tinta">
          Uma marca que <em className="font-light italic text-oliva">acolhe</em> antes da primeira palavra.
        </h1>

        {/* Conceito */}
        <section className="mt-20 grid items-center gap-12 rounded-[2.5rem] bg-areia p-8 sm:p-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="mx-auto w-full max-w-[22rem]">
            <Monograma className="w-full" titulo="Monograma Karina Sposito" />
          </div>
          <div className="space-y-8">
            {[
              ["O arco", "Uma porta, um abrigo: o lugar seguro onde a pessoa pode entrar e ser escutada."],
              ["O K e o S entrelaçados", "A relação terapêutica: duas presenças que se encontram, cada uma no seu lugar. O S passa por cima do K deixando um respiro — ninguém some dentro do outro."],
              ["O ramo de oliveira", "Nasce do S e atravessa o arco: crescimento, paz e recomeço. A elaboração que leva a pessoa além do ponto onde chegou."],
              ["As cores", "As mesmas do Instagram da Karina — creme, nude, sálvia, oliva e dourado envelhecido —, agora organizadas como sistema. Sem preto, vermelho, laranja ou amarelo, como ela pediu."],
            ].map(([t, d]) => (
              <div key={t}>
                <p className="font-display text-[1.6rem] text-tinta">{t}</p>
                <p className="mt-2 max-w-[34rem] text-[1rem] leading-[1.8] text-tinta-suave">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Versões */}
        <section className="mt-24">
          <h2 className="titulo-secao">Versões do logo</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {ARQUIVOS.map((a) => (
              <div key={a.base} className="overflow-hidden rounded-[2rem] border border-tinta/[0.07]">
                <div className="h-72 bg-linho p-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/marca/${a.base}-cor.svg`} alt={a.nome} className="h-full w-full object-contain" />
                </div>
                <div className="h-40 bg-oliva-profundo p-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/marca/${a.base}-claro.svg`} alt={`${a.nome} em fundo escuro`} className="h-full w-full object-contain" />
                </div>
                <div className="space-y-3 bg-white/50 p-6">
                  <p className="font-display text-[1.35rem] text-tinta">{a.nome}</p>
                  {(["cor", "escuro", "claro"] as const).map((v) => (
                    <div key={v} className="flex flex-wrap items-center gap-2">
                      <span className="w-24 text-[0.82rem] text-tinta-leve">{v === "cor" ? "Colorido" : v === "escuro" ? "Uma cor" : "Fundo escuro"}</span>
                      <Download href={`/marca/${a.base}-${v}.svg`} rotulo="SVG" />
                      <Download href={`/marca/${a.base}-${v}.png`} rotulo="PNG" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-6 rounded-[2rem] border border-tinta/[0.07] bg-white/50 p-6">
            <Image src="/marca/foto-perfil-redes.png" alt="Foto de perfil para redes sociais" width={96} height={96} className="rounded-full" />
            <div className="flex-1">
              <p className="font-display text-[1.35rem] text-tinta">Foto de perfil para redes sociais</p>
              <p className="text-[0.95rem] text-tinta-suave">1080 × 1080, pronta para Instagram e WhatsApp Business.</p>
            </div>
            <Download href="/marca/foto-perfil-redes.png" rotulo="Baixar PNG" />
          </div>
        </section>

        {/* Cores */}
        <section className="mt-24">
          <h2 className="titulo-secao">Paleta</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CORES.map((c) => (
              <div key={c.hex} className="overflow-hidden rounded-[1.5rem] border border-tinta/[0.07]">
                <div className="flex h-36 items-end p-4" style={{ background: c.hex }}>
                  <span className={`font-mono text-[0.85rem] ${c.escuro ? "text-linho" : "text-tinta"}`}>{c.hex}</span>
                </div>
                <div className="bg-white/50 p-4">
                  <p className="font-medium text-tinta">{c.nome}</p>
                  <p className="text-[0.85rem] text-tinta-suave">{c.uso}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tipografia */}
        <section className="mt-24">
          <h2 className="titulo-secao">Tipografia</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-tinta/[0.07] bg-white/50 p-8">
              <p className="text-[0.75rem] uppercase tracking-[0.25em] text-bronze-escuro">Títulos</p>
              <p className="mt-4 font-display text-[3.4rem] leading-none text-tinta">
                Newsreader <em className="font-light italic text-oliva">itálico</em>
              </p>
              <p className="mt-4 text-[0.95rem] text-tinta-suave">Clássica, calorosa e com acentos perfeitos em português.</p>
            </div>
            <div className="rounded-[2rem] border border-tinta/[0.07] bg-white/50 p-8">
              <p className="text-[0.75rem] uppercase tracking-[0.25em] text-bronze-escuro">Textos</p>
              <p className="mt-4 font-body text-[2.6rem] font-light leading-none text-tinta">Jost</p>
              <p className="mt-4 text-[0.95rem] text-tinta-suave">Leve e limpa, para leitura confortável no celular.</p>
            </div>
            <div className="rounded-[2rem] border border-tinta/[0.07] bg-white/50 p-8">
              <p className="text-[0.75rem] uppercase tracking-[0.25em] text-bronze-escuro">Logo</p>
              <Logo className="mt-5 h-16 w-auto" />
              <p className="mt-4 text-[0.95rem] text-tinta-suave">Cormorant Garamond, desenhada em vetor.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
