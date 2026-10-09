import type { Metadata, Viewport } from "next";
import { Newsreader, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import Rodape from "@/components/Rodape";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import RolagemSuave from "@/components/RolagemSuave";
import { site, linkInstagram } from "@/lib/site";
import "./globals.css";

// Títulos em Newsreader. A Cormorant (fonte do logo) foi testada, mas o
// circunflexo dela é alto e fino e fica "flutuando" em "você" — em um site
// em português, isso aparece em toda frase. A Newsreader tem o mesmo ar
// clássico e acentos corretos.
const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-display",
});

const body = Jost({
  subsets: ["latin"],
  variable: "--font-body",
});

const titulo = `${site.nome} — Psicanálise Clínica Online`;
const descricao =
  "Psicanálise clínica online para adolescentes, adultos e casais. Escuta sensível e acolhedora para ansiedade, luto, traumas, relacionamentos e medo da separação. Agende pelo WhatsApp.";

export const metadata: Metadata = {
  // Sem o endereço de base, WhatsApp e Instagram não encontram a imagem de
  // compartilhamento e o link aparece sem figura.
  metadataBase: new URL(site.url),
  title: { default: titulo, template: `%s · ${site.nome}` },
  description: descricao,
  keywords: [
    "psicanalista online",
    "psicanálise online",
    "terapia online",
    "ansiedade",
    "luto",
    "relacionamento narcisista",
    "ansiedade de separação",
    "terapia de casal online",
    "Karina Sposito",
  ],
  authors: [{ name: site.nome }],
  openGraph: {
    title: titulo,
    description: descricao,
    locale: "pt_BR",
    type: "website",
    siteName: site.nome,
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#F8F3EC",
};

const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${site.nome} — Psicanálise Clínica`,
  description: descricao,
  url: site.url,
  email: site.email,
  telephone: `+${site.whatsapp}`,
  areaServed: "BR",
  availableLanguage: "pt-BR",
  sameAs: [linkInstagram],
  founder: {
    "@type": "Person",
    name: site.nome,
    jobTitle: site.profissao,
    alumniOf: "Universidade Paulista (UNIP)",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Sem JavaScript, nada fica escondido esperando a animação. */}
        <noscript>
          <style>{`.revelar,.surgir{opacity:1!important;transform:none!important;filter:none!important}.palavra>span{transform:none!important}.desenhar path,.desenhar circle{stroke-dashoffset:0!important}`}</style>
        </noscript>
      </head>
      <body className="grao">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }} />
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-oliva focus:px-5 focus:py-3 focus:text-linho">
          Pular para o conteúdo
        </a>
        <RolagemSuave />
        <Navbar />
        <div id="conteudo">{children}</div>
        <Rodape />
        <BotaoWhatsApp />
      </body>
    </html>
  );
}
