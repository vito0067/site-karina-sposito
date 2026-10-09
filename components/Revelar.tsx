"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

// Faz o conteúdo surgir suavemente quando entra na tela.
// `atraso` em milissegundos permite escalonar itens de uma lista.
export default function Revelar({
  children,
  as: Tag = "div",
  atraso = 0,
  className = "",
  desenhar = false,
}: {
  children: ReactNode;
  as?: ElementType;
  atraso?: number;
  className?: string;
  desenhar?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          el.classList.add("visivel");
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${desenhar ? "desenhar" : "revelar"} ${className}`}
      style={{ "--atraso": `${atraso}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
