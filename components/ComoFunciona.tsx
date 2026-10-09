import Revelar from "./Revelar";
import { IconeTela, IconeRelogio, IconeFolha, IconeWhatsapp } from "./Icones";
import { linkWhatsapp, site } from "@/lib/site";

const PASSOS = [
  {
    titulo: "Você me chama no WhatsApp",
    texto: "Conte um pouco do que está vivendo, no seu tempo. Não precisa ter as palavras certas.",
  },
  {
    titulo: "Combinamos o melhor horário",
    texto: "Os horários são flexíveis e definidos de acordo com a sua rotina.",
  },
  {
    titulo: "Sessão por videochamada",
    texto: "De onde você se sentir à vontade. Basta internet e um lugar reservado.",
  },
  {
    titulo: "Seguimos no seu ritmo",
    texto: "O processo é construído com você, respeitando o seu tempo e as suas necessidades.",
  },
];

const INFOS = [
  { Icone: IconeTela, titulo: "100% online", texto: "Sessões por videochamada, de onde você estiver, com a mesma escuta e o mesmo cuidado." },
  { Icone: IconeRelogio, titulo: "Horários flexíveis", texto: site.horarios + "." },
  { Icone: IconeFolha, titulo: "Atendimento particular", texto: "Não atendo por convênio. Valores informados pelo WhatsApp." },
];

export default function ComoFunciona() {
  return (
    <section id="atendimento" className="relative overflow-hidden bg-areia/70 py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <Revelar>
            <p className="sobretitulo">Atendimento</p>
            <h2 className="titulo-secao mt-6">
              Começar é mais simples <em>do que parece.</em>
            </h2>
          </Revelar>
          <Revelar atraso={120} className="lg:justify-self-end">
            <a href={linkWhatsapp()} target="_blank" rel="noopener" className="botao-principal">
              <IconeWhatsapp className="h-5 w-5" />
              Dar o primeiro passo
            </a>
          </Revelar>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[1.6rem] hidden h-px bg-gradient-to-r from-bronze/0 via-bronze/40 to-bronze/0 lg:block" />
          {PASSOS.map((p, i) => (
            <Revelar as="li" key={p.titulo} atraso={i * 120} className="relative">
              <span className="relative z-10 grid h-[3.2rem] w-[3.2rem] place-items-center rounded-full border border-bronze/40 bg-linho font-display text-[1.35rem] italic text-bronze-escuro">
                {i + 1}
              </span>
              <h3 className="mt-6 font-display text-[1.7rem] font-normal leading-tight text-tinta">{p.titulo}</h3>
              <p className="mt-3 max-w-[17rem] text-[0.98rem] leading-[1.75] text-tinta-suave">{p.texto}</p>
            </Revelar>
          ))}
        </ol>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {INFOS.map(({ Icone, titulo, texto }, i) => (
            <Revelar key={titulo} atraso={i * 100}>
              <div className="flex h-full items-start gap-5 rounded-[1.5rem] border border-white/80 bg-linho/80 p-7 shadow-suave">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-salvia-100 text-oliva">
                  <Icone className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-display text-[1.45rem] font-normal leading-tight text-tinta">{titulo}</span>
                  <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-tinta-suave">{texto}</span>
                </span>
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
