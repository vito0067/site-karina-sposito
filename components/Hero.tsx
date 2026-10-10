import Image from "next/image";
import type { CSSProperties } from "react";
import ArteAmanhecer from "./ArteAmanhecer";
import Ramo from "./Ramo";
import { Monograma } from "./Logo";
import { IconeWhatsapp, IconeSeta } from "./Icones";
import { linkWhatsapp, site } from "@/lib/site";
import { foto } from "@/lib/fotos";

// Título que entra palavra por palavra. Os trechos com `em` ficam em itálico verde.
const TITULO: { t: string; em?: boolean }[] = [
  { t: "Um lugar seguro para" },
  { t: "cuidar do que você sente.", em: true },
];

function TituloAnimado() {
  let i = 0;
  return (
    <h1 className="font-display text-display-xl font-normal text-tinta">
      {TITULO.map((trecho, l) => (
        <span key={l} className={trecho.em ? "font-light italic text-oliva" : undefined}>
          {trecho.t.split(" ").map((palavra, p) => {
            const atraso = 120 + i++ * 60;
            return (
              <span key={p} className="palavra">
                <span style={{ "--atraso": `${atraso}ms` } as CSSProperties}>{palavra}</span>
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const fotoPrincipal = foto("karina-principal");

  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
      {/* Manchas de cor que "respiram" bem devagar ao fundo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-32 h-[38rem] w-[38rem] animate-blob-lento rounded-full bg-nude/70 blur-[110px]" />
        <div className="absolute -right-32 top-24 h-[34rem] w-[34rem] animate-blob-medio rounded-full bg-salvia-200/60 blur-[110px]" />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] animate-blob-lento rounded-full bg-areia blur-[90px]" />
      </div>

      <div className="container-site relative grid items-center gap-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
        <div className="relative z-10 max-w-[40rem]">
          <p className="sobretitulo surgir" style={{ "--atraso": "60ms" } as CSSProperties}>
            Psicanálise clínica · Atendimento online
          </p>

          <div className="mt-7">
            <TituloAnimado />
          </div>

          <p
            className="surgir mt-8 max-w-[34rem] text-[1.12rem] leading-[1.75] text-tinta-suave"
            style={{ "--atraso": "300ms" } as CSSProperties}
          >
            Sou {site.nome}, psicanalista. Ofereço uma escuta sensível e sem julgamentos para
            adolescentes, adultos e casais que atravessam a ansiedade, o luto, os traumas e as dores
            dos relacionamentos.
          </p>

          <div className="surgir mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ "--atraso": "450ms" } as CSSProperties}>
            <a href={linkWhatsapp()} target="_blank" rel="noopener" className="botao-principal">
              <IconeWhatsapp className="h-5 w-5" />
              Agendar uma conversa
            </a>
            <a href="#sobre" className="botao-secundario group">
              Conhecer meu trabalho
              <IconeSeta className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </div>

          <ul
            className="surgir mt-12 flex flex-wrap gap-x-7 gap-y-3 text-[0.86rem] text-tinta-suave"
            style={{ "--atraso": "600ms" } as CSSProperties}
          >
            {["100% online", "Horários flexíveis", "Sigilo e ética"].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-salvia-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Lado direito: arco com o amanhecer (ou a foto, quando chegar) */}
        <div className="surgir relative mx-auto w-full max-w-[25rem] lg:mr-0 lg:max-w-[28rem]" style={{ "--atraso": "200ms" } as CSSProperties}>
          <div className="relative">
            {fotoPrincipal ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] shadow-flutuante">
                <Image src={fotoPrincipal} alt="Karina Sposito, psicanalista" fill priority sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" />
              </div>
            ) : (
              <ArteAmanhecer className="w-full drop-shadow-[0_40px_60px_rgba(62,69,49,0.18)]" />
            )}

            <Ramo className="absolute -left-14 bottom-6 h-64 w-40 sm:-left-20 sm:h-80 sm:w-48" atraso={900} />

            {/* Cartão: frase do Instagram dela */}
            <div className="absolute -right-3 top-[18%] max-w-[13.5rem] animate-flutuar rounded-2xl border border-white/70 bg-linho/85 p-5 shadow-suave backdrop-blur-md sm:-right-10">
              <p className="font-display text-[1.18rem] italic leading-snug text-oliva-escuro">
                “A força de um novo amanhecer está dentro de você.”
              </p>
            </div>

            {/* Cartão: atendimento online */}
            <div
              className="absolute -bottom-7 left-4 flex animate-flutuar items-center gap-3.5 rounded-2xl border border-white/70 bg-linho/90 py-3.5 pl-3.5 pr-5 shadow-suave backdrop-blur-md sm:left-10"
              style={{ animationDelay: "-3.5s" }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-areia">
                <Monograma className="h-9 w-auto" semRamo />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.95rem] font-medium text-tinta">Atendimento online</span>
                <span className="text-[0.82rem] text-tinta-suave">de onde você estiver</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
