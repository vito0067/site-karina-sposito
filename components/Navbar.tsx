"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { IconeWhatsapp } from "./Icones";
import { linkWhatsapp } from "@/lib/site";

const LINKS = [
  { href: "/#sobre", rotulo: "Sobre mim" },
  { href: "/#temas", rotulo: "Como posso ajudar" },
  { href: "/#atendimento", rotulo: "Atendimento" },
  { href: "/#textos", rotulo: "Textos" },
  { href: "/#duvidas", rotulo: "Dúvidas" },
];

export default function Navbar() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  // Na página inicial o link vira "#sobre" (rolagem suave até a seção);
  // nas outras páginas continua "/#sobre" (volta para o início).
  const naInicio = usePathname() === "/";
  const destino = (href: string) => (naInicio ? href.slice(1) : href);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = aberto ? "hidden" : "";
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-700 [transition-timing-function:var(--suave)] ${
          rolou && !aberto ? "border-b border-tinta/[0.06] bg-linho/80 shadow-[0_10px_40px_-24px_rgba(62,69,49,0.35)] backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className={`container-site flex items-center justify-between transition-all duration-700 ${rolou ? "h-[4.5rem]" : "h-[5.5rem]"}`} aria-label="Principal">
          <Link href="/" className="relative z-10 -ml-1 shrink-0" aria-label="Início" onClick={() => setAberto(false)}>
            <Logo className={`w-auto transition-all duration-700 ${rolou ? "h-11" : "h-12 sm:h-[3.4rem]"}`} />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={destino(l.href)} className="group relative py-2 text-[0.92rem] text-tinta-suave transition-colors hover:text-tinta">
                  {l.rotulo}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-bronze transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href={linkWhatsapp()} target="_blank" rel="noopener" className="botao-principal hidden !px-5 !py-3 text-[0.88rem] sm:inline-flex">
              <IconeWhatsapp className="h-4 w-4" />
              Agendar conversa
            </a>
            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-tinta/10 bg-linho/70 backdrop-blur lg:hidden"
              aria-expanded={aberto}
              aria-controls="menu-celular"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-px w-5 bg-tinta transition-all duration-500 ${aberto ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-px w-5 bg-tinta transition-all duration-300 ${aberto ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 h-px w-5 bg-tinta transition-all duration-500 ${aberto ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Menu do celular: tela cheia, com os links grandes em serifa. */}
      <div
        id="menu-celular"
        className={`fixed inset-0 -z-10 bg-linho transition-all duration-700 [transition-timing-function:var(--suave)] lg:hidden ${
          aberto ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-salvia-200/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-nude/80 blur-3xl" />
        <div className="container-site relative flex h-full flex-col justify-between pb-10 pt-32">
          <ul className="space-y-2">
            {LINKS.map((l, i) => (
              <li
                key={l.href}
                className={`transition-all duration-700 [transition-timing-function:var(--suave)] ${aberto ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: aberto ? `${120 + i * 70}ms` : "0ms" }}
              >
                <a href={destino(l.href)} onClick={() => setAberto(false)} className="block py-2 font-display text-[2.4rem] leading-tight text-tinta">
                  {l.rotulo}
                </a>
              </li>
            ))}
          </ul>
          <a href={linkWhatsapp()} target="_blank" rel="noopener" className="botao-principal w-full" onClick={() => setAberto(false)}>
            <IconeWhatsapp className="h-5 w-5" />
            Agendar pelo WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
