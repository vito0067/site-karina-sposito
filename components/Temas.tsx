"use client";

import { useMemo, useState } from "react";
import Revelar from "./Revelar";
import { IconeBusca, IconeMais, IconeWhatsapp } from "./Icones";
import { grupos, normalizar } from "@/lib/temas";
import { linkWhatsapp } from "@/lib/site";

const SUGESTOES = ["ansiedade", "luto", "narcisista", "pânico", "ciúmes", "separação"];

export default function Temas() {
  const [busca, setBusca] = useState("");
  const [abertos, setAbertos] = useState<string[]>([]);

  const resultados = useMemo(() => {
    const termo = normalizar(busca);
    if (termo.length < 2) return null;
    return grupos
      .map((g) => {
        const achados = g.temas.filter((t) => normalizar(t).includes(termo));
        // Se só o nome do grupo bate (ex.: "humor"), mostra o grupo inteiro.
        return { ...g, achados: achados.length === 0 && normalizar(g.titulo).includes(termo) ? g.temas : achados };
      })
      .filter((g) => g.achados.length > 0);
  }, [busca]);

  const todosAchados = resultados?.flatMap((g) => g.achados) ?? [];
  const assunto = todosAchados.length === 1 ? todosAchados[0].toLowerCase() : busca.trim();

  const alternar = (id: string) =>
    setAbertos((atual) => (atual.includes(id) ? atual.filter((a) => a !== id) : [...atual, id]));

  // Arredonda para baixo (62 → "mais de 60"), para a frase continuar certa
  // quando a lista mudar.
  const totalTemas = Math.floor(grupos.reduce((soma, g) => soma + g.temas.length, 0) / 10) * 10;

  return (
    <section id="temas" className="relative overflow-hidden bg-salvia-50/80 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-linho/90 blur-[110px]" />
      <div className="container-site relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Revelar>
            <p className="sobretitulo">Como posso ajudar</p>
            <h2 className="titulo-secao mt-6">
              Sobre o que você <em>quer conversar?</em>
            </h2>
          </Revelar>
          <Revelar atraso={120}>
            <p className="max-w-[32rem] text-[1.06rem] leading-[1.8] text-tinta-suave lg:ml-auto">
              Acolho mais de {totalTemas} temas, organizados abaixo. Se o que você sente não tem nome
              ainda, tudo bem: muitas vezes é justamente isso que a gente descobre juntos.
            </p>
          </Revelar>
        </div>

        {/* Busca */}
        <Revelar atraso={150} className="mt-12">
          <label htmlFor="busca-temas" className="sr-only">
            Buscar um tema
          </label>
          <div className="group relative">
            <IconeBusca className="pointer-events-none absolute left-6 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-tinta-leve transition-colors group-focus-within:text-oliva" />
            <input
              id="busca-temas"
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Ex.: ansiedade, luto, ciúmes…"
              className="w-full rounded-full border border-tinta/10 bg-white/60 py-5 pl-[3.6rem] pr-6 text-[1.02rem] text-tinta shadow-suave outline-none backdrop-blur transition-all duration-500 placeholder:text-tinta-leve focus:border-oliva/40 focus:bg-white/85"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 pl-2 text-[0.82rem] text-tinta-leve">
            <span>Mais buscados:</span>
            {SUGESTOES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setBusca(s)}
                className="rounded-full border border-tinta/10 px-3 py-1 text-tinta-suave transition-colors hover:border-oliva/40 hover:bg-salvia-50 hover:text-oliva-escuro"
              >
                {s}
              </button>
            ))}
          </div>
        </Revelar>

        {/* Resultado da busca */}
        {resultados && (
          <div className="mt-10 rounded-[2rem] border border-tinta/[0.07] bg-white/55 p-6 shadow-suave backdrop-blur sm:p-10" aria-live="polite">
            {resultados.length > 0 ? (
              <div className="space-y-7">
                {resultados.map((g) => (
                  <div key={g.id}>
                    <p className="font-display text-[1.35rem] text-tinta">{g.titulo}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {g.achados.map((t) => (
                        <li key={t} className="rounded-full bg-salvia-100 px-4 py-2 text-[0.9rem] text-oliva-escuro">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="border-t border-tinta/10 pt-6 text-[0.98rem] text-tinta-suave">
                  Esse é um dos temas que eu acolho.{" "}
                  <a href={linkWhatsapp(`Olá, Karina! Vim pelo seu site. Gostaria de conversar sobre ${assunto}.`)} target="_blank" rel="noopener" className="font-medium text-oliva underline decoration-salvia-300 underline-offset-4 hover:decoration-oliva">
                    Vamos conversar sobre isso?
                  </a>
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[34rem] text-[1.02rem] leading-relaxed text-tinta-suave">
                  Não encontrei “{busca}” na lista — mas isso não quer dizer que eu não possa ajudar. Me conte um pouco do que
                  você está vivendo.
                </p>
                <a href={linkWhatsapp()} target="_blank" rel="noopener" className="botao-principal shrink-0">
                  <IconeWhatsapp className="h-5 w-5" />
                  Conversar pelo WhatsApp
                </a>
              </div>
            )}
          </div>
        )}

        {/* Grupos */}
        <ul className="mt-14 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {grupos.map((g, i) => {
            const aberto = abertos.includes(g.id);
            return (
              <Revelar as="li" key={g.id} atraso={(i % 4) * 90}>
                <div
                  className={`group flex h-full flex-col rounded-[1.75rem] border p-7 sm:min-h-[18.5rem] transition-all duration-700 [transition-timing-function:var(--suave)] ${
                    aberto ? "border-oliva/25 bg-white/80 shadow-flutuante" : "border-tinta/[0.07] bg-white/45 hover:-translate-y-1 hover:bg-white/75 hover:shadow-suave"
                  }`}
                >
                  <span className="font-display text-[1.1rem] italic text-bronze">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-display text-[1.6rem] font-normal leading-[1.12] text-tinta">{g.titulo}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-tinta-suave">{g.frase}</p>

                  <div className={`grid transition-[grid-template-rows] duration-700 [transition-timing-function:var(--suave)] ${aberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <ul className="flex flex-wrap gap-1.5 pt-5">
                        {g.temas.map((t) => (
                          <li key={t} className="rounded-full bg-salvia-100/80 px-3 py-1.5 text-[0.8rem] text-oliva-escuro">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alternar(g.id)}
                    aria-expanded={aberto}
                    className="mt-auto flex items-center gap-2 pt-6 text-[0.86rem] font-medium text-oliva transition-colors hover:text-oliva-escuro"
                  >
                    <span className={`grid h-7 w-7 place-items-center rounded-full border border-oliva/25 transition-transform duration-500 ${aberto ? "rotate-45" : ""}`}>
                      <IconeMais className="h-3.5 w-3.5" />
                    </span>
                    {aberto ? "Fechar" : `Ver os ${g.temas.length} temas`}
                  </button>
                </div>
              </Revelar>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
