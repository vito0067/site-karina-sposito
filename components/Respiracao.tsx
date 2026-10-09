"use client";

import { useEffect, useRef, useState } from "react";
import Revelar from "./Revelar";

// Exercício de respiração guiada: inspira 4s, segura 2s, solta 6s.
// A expiração mais longa que a inspiração é o que ajuda o corpo a desacelerar.
const FASES = [
  { nome: "Inspire", detalhe: "pelo nariz, devagar", duracao: 4000, de: 0.56, para: 1 },
  { nome: "Segure", detalhe: "só um instante", duracao: 2000, de: 1, para: 1 },
  { nome: "Solte o ar", detalhe: "pela boca, sem pressa", duracao: 6000, de: 1, para: 0.56 },
] as const;

const CICLO = FASES.reduce((s, f) => s + f.duracao, 0);
const CICLOS_TOTAL = 5; // 5 ciclos de 12s = 1 minuto

const suavizar = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;

export default function Respiracao() {
  const [ativo, setAtivo] = useState(false);
  const [fase, setFase] = useState(0);
  const [ciclo, setCiclo] = useState(0);
  const [terminou, setTerminou] = useState(false);
  const circulo = useRef<HTMLDivElement>(null);
  const anel = useRef<SVGCircleElement>(null);
  const inicio = useRef(0);

  useEffect(() => {
    if (!ativo) return;
    inicio.current = performance.now();
    let quadro = 0;

    const passo = (agora: number) => {
      const decorrido = agora - inicio.current;
      const cicloAtual = Math.floor(decorrido / CICLO);
      if (cicloAtual >= CICLOS_TOTAL) {
        setAtivo(false);
        setTerminou(true);
        if (circulo.current) circulo.current.style.transform = "scale(0.56)";
        return;
      }
      let t = decorrido % CICLO;
      let i = 0;
      while (t > FASES[i].duracao) {
        t -= FASES[i].duracao;
        i++;
      }
      const f = FASES[i];
      const p = Math.min(1, t / f.duracao);
      const escala = f.de + (f.para - f.de) * suavizar(p);
      if (circulo.current) circulo.current.style.transform = `scale(${escala})`;
      if (anel.current) anel.current.style.strokeDashoffset = String(1 - p);
      setFase(i);
      setCiclo(cicloAtual);
      quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [ativo]);

  const alternar = () => {
    setTerminou(false);
    if (ativo) {
      setAtivo(false);
      if (circulo.current) circulo.current.style.transform = "scale(0.56)";
    } else {
      setFase(0);
      setCiclo(0);
      setAtivo(true);
    }
  };

  const f = FASES[fase];

  return (
    <section id="respirar" className="relative overflow-hidden bg-oliva-profundo py-24 text-linho sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full bg-oliva/60 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-bronze/25 blur-[120px]" />
      </div>

      <div className="container-site relative grid items-center gap-16 lg:grid-cols-2">
        <Revelar>
          <p className="sobretitulo text-bronze-claro before:bg-bronze-claro/60">Uma pausa, agora</p>
          <h2 className="mt-6 font-display text-display-lg font-normal text-linho">
            Antes de seguir, <em className="font-light italic text-salvia-200">respire comigo.</em>
          </h2>
          <p className="mt-7 max-w-[30rem] text-[1.06rem] leading-[1.8] text-linho/75">
            Um minuto, cinco respirações. Acompanhe o círculo: ele cresce quando você inspira e
            diminui quando você solta o ar. Soltar o ar mais devagar do que puxa é um jeito simples de
            avisar o corpo de que ele pode desacelerar.
          </p>
          <p className="mt-6 max-w-[30rem] text-[0.9rem] leading-relaxed text-linho/55">
            Um exercício de acolhimento para o momento — não substitui o acompanhamento profissional.
          </p>
        </Revelar>

        <Revelar atraso={150} className="flex flex-col items-center">
          <div className="relative grid h-[19rem] w-[19rem] place-items-center sm:h-[23rem] sm:w-[23rem]">
            {/* Anel que marca o tempo de cada fase */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="50" cy="50" r="48.5" fill="none" stroke="rgba(248,243,236,0.12)" strokeWidth="0.5" />
              <circle
                ref={anel}
                cx="50"
                cy="50"
                r="48.5"
                fill="none"
                stroke="#C9AE8A"
                strokeWidth="0.7"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
                className={ativo ? "opacity-100" : "opacity-0"}
                style={{ transition: "opacity .6s" }}
              />
            </svg>

            <div
              ref={circulo}
              className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_40%_35%,#F3E6DA_0%,#CDD5BE_45%,#97A481_100%)] shadow-[0_0_80px_-10px_rgba(205,213,190,0.55)] will-change-transform"
              style={{ transform: "scale(0.56)" }}
            />
            <div className="absolute inset-[6%] rounded-full border border-linho/10" />

            <div className="relative z-10 text-center text-tinta" aria-live="polite">
              {ativo ? (
                <>
                  <p className="font-display text-[2.3rem] font-normal leading-none">{f.nome}</p>
                  <p className="mt-2 text-[0.9rem] text-tinta-suave">{f.detalhe}</p>
                  <p className="mt-4 text-[0.72rem] uppercase tracking-[0.25em] text-oliva-escuro">
                    {ciclo + 1} de {CICLOS_TOTAL}
                  </p>
                </>
              ) : terminou ? (
                <>
                  <p className="font-display text-[1.9rem] font-normal leading-tight">Muito bem.</p>
                  <p className="mt-2 max-w-[11rem] text-[0.88rem] text-tinta-suave">Repare em como você está agora.</p>
                </>
              ) : (
                <p className="font-display text-[1.6rem] italic leading-tight">
                  Um minuto
                  <br />
                  para você
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={alternar}
            className="botao mt-10 border border-linho/25 bg-linho/10 text-linho backdrop-blur hover:bg-linho hover:text-oliva-profundo"
          >
            {ativo ? "Parar" : terminou ? "Respirar de novo" : "Começar a respirar"}
          </button>
        </Revelar>
      </div>
    </section>
  );
}
