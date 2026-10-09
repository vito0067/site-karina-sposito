import Revelar from "./Revelar";

const FRASES = [
  { n: "Ansiedade", t: "A ansiedade não te deixa descansar, nem quando tudo parece estar bem." },
  { n: "Relações", t: "Você saiu — ou quer sair — de uma relação que te diminuía." },
  { n: "Luto", t: "Uma perda mudou tudo, e você ainda não sabe como seguir." },
  { n: "Repetição", t: "Você repete histórias que não escolheu e quer entender por quê." },
  { n: "Separação", t: "O medo de ser deixado pesa em tudo o que você vive a dois." },
];

export default function Identificacao() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Revelar className="lg:sticky lg:top-32 lg:self-start">
          <p className="sobretitulo">Talvez você esteja aqui porque…</p>
          <h2 className="titulo-secao mt-6">
            Às vezes, a gente só precisa de <em>um lugar para começar.</em>
          </h2>
          <p className="mt-7 max-w-[26rem] text-[1.06rem] leading-[1.8] text-tinta-suave">
            Não é preciso estar em crise para buscar ajuda, nem saber exatamente o que dizer. Basta
            sentir que algo pesa mais do que deveria.
          </p>
        </Revelar>

        <div>
          <ul className="divide-y divide-tinta/[0.08] border-y border-tinta/[0.08]">
            {FRASES.map((f, i) => (
              <Revelar as="li" key={f.n} atraso={i * 70}>
                <div className="group grid grid-cols-[3.2rem_1fr] items-baseline gap-4 py-7 transition-colors duration-500 sm:grid-cols-[4.5rem_1fr] sm:py-9">
                  <span className="font-display text-[1.05rem] italic text-bronze">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-display text-[1.65rem] leading-[1.25] text-tinta transition-transform duration-700 [transition-timing-function:var(--suave)] group-hover:translate-x-2 sm:text-[2.05rem]">
                      {f.t}
                    </p>
                  </div>
                </div>
              </Revelar>
            ))}
          </ul>
          <Revelar atraso={200} className="mt-10 flex items-center gap-5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-bronze/50" />
            <p className="font-display text-[1.6rem] italic text-oliva sm:text-[1.9rem]">Você não precisa atravessar isso sem apoio.</p>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
