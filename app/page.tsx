import Hero from "@/components/Hero";
import Faixa from "@/components/Faixa";
import Identificacao from "@/components/Identificacao";
import Sobre from "@/components/Sobre";
import Pilares from "@/components/Pilares";
import Temas from "@/components/Temas";
import Abordagem from "@/components/Abordagem";
import ComoFunciona from "@/components/ComoFunciona";
import Respiracao from "@/components/Respiracao";
import Textos from "@/components/Textos";
import Duvidas from "@/components/Duvidas";
import ChamadaFinal from "@/components/ChamadaFinal";
import { duvidas } from "@/lib/duvidas";

// Perguntas frequentes no formato que o Google entende.
const dadosDuvidas = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: duvidas.map((d) => ({
    "@type": "Question",
    name: d.p,
    acceptedAnswer: { "@type": "Answer", text: d.r },
  })),
};

export default function Inicio() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosDuvidas) }} />
      <Hero />
      <Faixa />
      <Identificacao />
      <Sobre />
      <Pilares />
      <Temas />
      <Abordagem />
      <ComoFunciona />
      <Respiracao />
      <Textos />
      <Duvidas />
      <ChamadaFinal />
    </main>
  );
}
