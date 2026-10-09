"use client";

import { useState } from "react";
import Revelar from "./Revelar";
import { IconeMais, IconeWhatsapp } from "./Icones";
import { duvidas } from "@/lib/duvidas";
import { linkWhatsapp } from "@/lib/site";

export default function Duvidas() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section id="duvidas" className="relative bg-areia/70 py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Revelar className="lg:sticky lg:top-32 lg:self-start">
          <p className="sobretitulo">Dúvidas</p>
          <h2 className="titulo-secao mt-6">
            Perguntas que <em>chegam até mim.</em>
          </h2>
          <p className="mt-7 max-w-[24rem] text-[1.04rem] leading-[1.8] text-tinta-suave">
            Ficou com alguma outra dúvida? Pode perguntar sem compromisso.
          </p>
          <a href={linkWhatsapp("Olá, Karina! Vim pelo seu site e tenho uma dúvida sobre o atendimento.")} target="_blank" rel="noopener" className="botao-secundario mt-8">
            <IconeWhatsapp className="h-4 w-4 text-oliva" />
            Perguntar pelo WhatsApp
          </a>
        </Revelar>

        <Revelar atraso={100}>
          <ul className="border-t border-tinta/10">
            {duvidas.map((d, i) => {
              const aberto = aberta === i;
              return (
                <li key={d.p} className="border-b border-tinta/10">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setAberta(aberto ? null : i)}
                      aria-expanded={aberto}
                      aria-controls={`resposta-${i}`}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className={`font-display text-[1.45rem] leading-snug transition-colors duration-500 sm:text-[1.6rem] ${aberto ? "text-oliva" : "text-tinta group-hover:text-oliva"}`}>
                        {d.p}
                      </span>
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                          aberto ? "rotate-45 border-oliva bg-oliva text-linho" : "border-tinta/15 text-tinta-suave group-hover:border-oliva/50"
                        }`}
                      >
                        <IconeMais className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`resposta-${i}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-700 [transition-timing-function:var(--suave)] ${aberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[40rem] pb-7 pr-14 text-[1.02rem] leading-[1.8] text-tinta-suave">{d.r}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Revelar>
      </div>
    </section>
  );
}
