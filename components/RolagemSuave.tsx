"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Rolagem com inércia suave (a mesma sensação do site da Origem Digital).
// Desligada para quem pediu menos movimento no sistema.
export default function RolagemSuave() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -88 },
    });

    let quadro = 0;
    const loop = (tempo: number) => {
      lenis.raf(tempo);
      quadro = requestAnimationFrame(loop);
    };
    quadro = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(quadro);
      lenis.destroy();
    };
  }, []);

  return null;
}
