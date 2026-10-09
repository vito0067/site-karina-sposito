"use client";

import { useEffect, useRef } from "react";

// Linha fina no topo que mostra quanto do texto já foi lido.
export default function ProgressoLeitura() {
  const barra = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const atualizar = () => {
      const alvo = document.getElementById("artigo");
      if (!alvo || !barra.current) return;
      const r = alvo.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const lido = Math.min(1, Math.max(0, -r.top / Math.max(total, 1)));
      barra.current.style.transform = `scaleX(${lido})`;
    };
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[55] h-[3px]" aria-hidden="true">
      <div ref={barra} className="h-full origin-left bg-gradient-to-r from-salvia-400 via-oliva to-bronze" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
