"use client";

import { useEffect, useState } from "react";
import { IconeWhatsapp } from "./Icones";
import { linkWhatsapp } from "@/lib/site";

// Botão flutuante: só aparece depois que a pessoa passa do topo da página,
// para não competir com os botões principais.
export default function BotaoWhatsApp() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.7);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <a
      href={linkWhatsapp()}
      target="_blank"
      rel="noopener"
      aria-label="Conversar com a Karina pelo WhatsApp"
      className={`group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-oliva py-3.5 pl-3.5 pr-3.5 text-linho shadow-[0_18px_40px_-12px_rgba(62,69,49,0.6)] transition-all duration-700 [transition-timing-function:var(--suave)] hover:bg-oliva-escuro sm:bottom-7 sm:right-7 sm:pr-5 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-linho/15">
        <span className="absolute inset-0 animate-ping rounded-full bg-linho/20 [animation-duration:2.8s]" />
        <IconeWhatsapp className="relative h-5 w-5" />
      </span>
      <span className="hidden text-[0.9rem] font-medium sm:inline">Agendar conversa</span>
    </a>
  );
}
