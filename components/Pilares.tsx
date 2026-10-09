import Revelar from "./Revelar";
import { IconeCoracao, IconeEscudo, IconeDigital } from "./Icones";

// No formulário, a Karina disse que quer que a pessoa se sinta
// "acolhida, segura e única" ao entrar no site. Esses são os três pilares.
const PILARES = [
  {
    Icone: IconeCoracao,
    titulo: "Acolhimento",
    texto: "Um espaço sem pressa e sem julgamentos, onde tudo o que você sente pode ser dito — inclusive o que ainda não tem nome.",
  },
  {
    Icone: IconeEscudo,
    titulo: "Segurança",
    texto: "Sigilo, ética e um processo conduzido com responsabilidade, do primeiro contato até cada nova sessão.",
  },
  {
    Icone: IconeDigital,
    titulo: "Singularidade",
    texto: "Nenhuma história é igual. O seu processo respeita o seu tempo, a sua linguagem e o seu jeito de ser.",
  },
];

export default function Pilares() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-site">
        <Revelar className="mx-auto max-w-[44rem] text-center">
          <p className="sobretitulo justify-center">O que você encontra aqui</p>
          <h2 className="titulo-secao mt-6">
            Um espaço para você se sentir <em>em casa consigo.</em>
          </h2>
        </Revelar>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {PILARES.map(({ Icone, titulo, texto }, i) => (
            <Revelar key={titulo} atraso={i * 120}>
              <article className="group relative h-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-tinta/[0.07] bg-white/50 px-8 pb-10 pt-20 text-center transition-all duration-700 [transition-timing-function:var(--suave)] hover:-translate-y-1.5 hover:bg-white/80 hover:shadow-flutuante">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-salvia-100/70 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full border border-bronze/30 bg-linho text-oliva transition-transform duration-700 group-hover:scale-110">
                  <Icone className="h-7 w-7" />
                </span>
                <h3 className="relative mt-7 font-display text-[2rem] font-normal text-tinta">{titulo}</h3>
                <p className="relative mx-auto mt-4 max-w-[19rem] text-[1rem] leading-[1.75] text-tinta-suave">{texto}</p>
              </article>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
