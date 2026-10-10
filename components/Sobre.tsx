import Image from "next/image";
import Revelar from "./Revelar";
import Ramo from "./Ramo";
import { Monograma } from "./Logo";
import { foto } from "@/lib/fotos";
import { site } from "@/lib/site";

const FORMACAO = [
  { ano: "2003", titulo: "Bacharelado em Psicologia", local: "Universidade Paulista — UNIP" },
  { ano: "2026", titulo: "Pós-graduação em Psicanálise Clínica", local: "Especialização" },
  { ano: "Hoje", titulo: "Atendimento clínico online", local: "Adolescentes, adultos e casais" },
];

// Enquanto a foto não chega: um "retrato" com o monograma, no mesmo arco.
function RetratoProvisorio() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-gradient-to-b from-nude via-areia to-salvia-100 shadow-flutuante">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,250,244,0.95),transparent_58%)]" />
      <div className="absolute inset-x-0 top-[22%] flex flex-col items-center">
        <Monograma className="h-44 w-auto sm:h-52" titulo="Monograma Karina Sposito" />
        <p className="mt-6 font-display text-[1.05rem] uppercase tracking-[0.38em] text-tinta-suave">{site.nome}</p>
        <span className="mt-3 h-px w-14 bg-bronze/60" />
        <p className="mt-3 text-[0.72rem] uppercase tracking-[0.3em] text-bronze-escuro">Psicanálise clínica</p>
      </div>
      <svg viewBox="0 0 400 120" className="absolute inset-x-0 bottom-0 w-full" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 70C90 40 190 52 260 70S360 92 400 66V120H0Z" fill="#CDD5BE" />
        <path d="M0 96C120 74 260 108 400 88V120H0Z" fill="#B3BEA0" />
      </svg>
    </div>
  );
}

export default function Sobre() {
  const fotoSobre = foto("karina-sobre");

  return (
    <section id="sobre" className="relative overflow-hidden bg-areia/70 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-linho blur-[100px]" />

      <div className="container-site relative grid items-start gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Revelar className="relative mx-auto w-full max-w-[26rem] lg:sticky lg:top-28">
          {fotoSobre ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] shadow-flutuante">
              <Image src={fotoSobre} alt="Karina Sposito" fill sizes="(min-width: 1024px) 26rem, 90vw" className="object-cover object-[50%_28%]" />
            </div>
          ) : (
            <RetratoProvisorio />
          )}
          <Ramo className="absolute -right-10 -top-6 h-56 w-36 rotate-[24deg] sm:-right-14" cor="#82633F" atraso={300} />

          <div className="absolute -bottom-8 -left-2 rounded-2xl border border-white/70 bg-linho/95 px-6 py-5 shadow-suave sm:-left-8">
            <p className="font-display text-[2.6rem] leading-none text-oliva">20+</p>
            <p className="mt-1 text-[0.82rem] leading-snug text-tinta-suave">
              anos desde a formação
              <br />
              em Psicologia
            </p>
          </div>
        </Revelar>

        <div className="pt-6 lg:pt-10">
          <Revelar>
            <p className="sobretitulo">Sobre mim</p>
            <h2 className="titulo-secao mt-6">
              Prazer, eu sou a <em>Karina.</em>
            </h2>
          </Revelar>

          <Revelar atraso={120} className="texto-corrido mt-9 max-w-[38rem] text-[1.08rem] leading-[1.85] text-tinta-suave">
            <p>
              Sou bacharel em Psicologia pela UNIP desde 2003 e especialista em Psicanálise Clínica.
              Atuo exclusivamente com atendimento online, oferecendo um espaço acolhedor para quem
              enfrenta o <strong className="font-medium text-tinta">luto</strong>, a{" "}
              <strong className="font-medium text-tinta">ansiedade</strong> e{" "}
              <strong className="font-medium text-tinta">traumas físicos, psíquicos ou emocionais</strong>.
            </p>
            <p>
              Minha prática se baseia nas principais abordagens psicanalíticas, com foco na escuta
              sensível, na elaboração das dores emocionais e no fortalecimento da autonomia de cada
              paciente.
            </p>
            <p>
              Acredito que nenhuma história é igual a outra. Por isso, conduzo cada processo
              respeitando a singularidade de quem chega — com ética, profundidade e cuidado.
            </p>
          </Revelar>

          <Revelar atraso={160}>
            <p className="mt-10 font-display text-[1.75rem] italic leading-snug text-oliva-escuro">
              Atenção, acolhimento e competência: é assim que eu cuido de cada pessoa que confia a mim a
              sua história.
            </p>
          </Revelar>

          <Revelar atraso={200} className="mt-14">
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.28em] text-tinta-leve">Formação</p>
            <ol className="mt-6 space-y-0">
              {FORMACAO.map((f, i) => (
                <li key={f.ano} className="relative grid grid-cols-[4.5rem_1fr] gap-5 pb-8 last:pb-0">
                  {i < FORMACAO.length - 1 && <span className="absolute left-[0.4rem] top-3 h-full w-px bg-gradient-to-b from-bronze/50 to-bronze/10" />}
                  <span className="relative flex items-start gap-3">
                    <span className="mt-[0.45rem] h-[0.85rem] w-[0.85rem] shrink-0 rounded-full border border-bronze bg-linho" />
                    <span className="font-display text-[1.2rem] italic text-bronze-escuro">{f.ano}</span>
                  </span>
                  <span>
                    <span className="block text-[1.05rem] font-medium text-tinta">{f.titulo}</span>
                    <span className="text-[0.95rem] text-tinta-suave">{f.local}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-9 inline-flex items-center gap-3 rounded-full border border-tinta/10 bg-linho/70 px-5 py-2.5 text-[0.84rem] text-tinta-suave">
              <span className="h-1.5 w-1.5 rounded-full bg-oliva" />
              {site.profissao} · {site.registro}
            </p>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
