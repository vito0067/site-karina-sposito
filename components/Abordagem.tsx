import Revelar from "./Revelar";

const PUBLICO = [
  {
    titulo: "Adolescentes",
    texto:
      "Um espaço só deles para falar de angústias, relações, escola, identidade e tecnologia — com sigilo e respeito. Os responsáveis participam do combinado inicial.",
  },
  {
    titulo: "Adultos",
    texto:
      "Ansiedade, luto, traumas, relações, escolhas e recomeços. Um lugar para entender o que você sente e o que se repete na sua história.",
  },
  {
    titulo: "Casais",
    texto:
      "Ciúmes, conflitos, separação ou o desejo de se reencontrar. Sessões em que os dois podem falar — e ser escutados de verdade.",
  },
];

export default function Abordagem() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Revelar>
            <p className="sobretitulo">Como eu trabalho</p>
            <h2 className="titulo-secao mt-6">
              Uma escuta que <em>aprofunda</em> e recursos que <em>aliviam.</em>
            </h2>
          </Revelar>

          <div className="grid gap-5 sm:grid-cols-2">
            <Revelar atraso={80}>
              <article className="h-full rounded-[1.75rem] bg-oliva-escuro p-8 text-linho sm:p-9">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-bronze-claro">A base</p>
                <h3 className="mt-4 font-display text-[2.1rem] font-normal leading-none">Psicanálise</h3>
                <p className="mt-5 text-[0.98rem] leading-[1.8] text-linho/80">
                  Você fala livremente e, aos poucos, o que parecia confuso ganha sentido: o que se
                  repete, o que dói, o que ainda não tem nome. Um caminho de autoconhecimento que muda
                  a forma como você se relaciona consigo e com o mundo.
                </p>
              </article>
            </Revelar>
            <Revelar atraso={180}>
              <article className="h-full rounded-[1.75rem] border border-tinta/[0.08] bg-white/55 p-8 sm:p-9">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-bronze-escuro">Quando ajuda</p>
                <h3 className="mt-4 font-display text-[2.1rem] font-normal leading-none text-tinta">TCC</h3>
                <p className="mt-5 text-[0.98rem] leading-[1.8] text-tinta-suave">
                  Quando faz sentido para o seu momento, uso também recursos da Terapia
                  Cognitivo-Comportamental: ferramentas práticas para lidar com pensamentos e
                  comportamentos que trazem sofrimento no dia a dia, como as crises de ansiedade.
                </p>
              </article>
            </Revelar>
          </div>
        </div>

        {/* Para quem */}
        <div className="mt-24">
          <Revelar className="flex items-center gap-6">
            <p className="shrink-0 text-[0.75rem] font-medium uppercase tracking-[0.28em] text-tinta-leve">Para quem é o atendimento</p>
            <span className="h-px flex-1 bg-tinta/10" />
          </Revelar>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {PUBLICO.map((p, i) => (
              <Revelar key={p.titulo} atraso={i * 110} className="group">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[1rem] italic text-bronze">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-[2.4rem] font-normal leading-none text-tinta transition-colors duration-500 group-hover:text-oliva">
                    {p.titulo}
                  </h3>
                </div>
                <p className="mt-5 text-[1rem] leading-[1.8] text-tinta-suave md:pl-9">{p.texto}</p>
              </Revelar>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
