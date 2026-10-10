import type { Metadata } from "next";
import Link from "next/link";
import Revelar from "@/components/Revelar";
import CapaTexto from "@/components/CapaTexto";
import { IconeSeta } from "@/components/Icones";
import { todosOsTextos, dataPorExtenso } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Textos",
  description: "Textos sobre ansiedade, relacionamentos, luto, medo da separação e saúde emocional, escritos com cuidado pela psicanalista Karina Sposito.",
  alternates: { canonical: "/textos" },
};

export default function PaginaTextos() {
  const textos = todosOsTextos();

  return (
    <main className="relative overflow-hidden pb-24 pt-36 sm:pb-32 sm:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-20 h-[34rem] w-[34rem] rounded-full bg-salvia-200/50 blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-40 h-[30rem] w-[30rem] rounded-full bg-nude/70 blur-[110px]" />

      <div className="container-site relative">
        <div className="surgir max-w-[46rem]">
          <p className="sobretitulo">Textos</p>
          <h1 className="mt-6 font-display text-display-xl font-normal text-tinta">
            Palavras para <em className="font-light italic text-oliva">acompanhar você.</em>
          </h1>
          <p className="mt-7 max-w-[34rem] text-[1.1rem] leading-[1.8] text-tinta-suave">
            Reflexões sobre as dores e as descobertas que chegam ao consultório. Para ler com calma, no seu
            tempo — e, quem sabe, reconhecer um pouco da sua história.
          </p>
        </div>

        <div className="mt-20 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {textos.map((t, i) => (
            <Revelar key={t.slug} atraso={(i % 3) * 110}>
              <Link href={`/textos/${t.slug}`} className="group flex h-full flex-col">
                <div className="overflow-hidden rounded-[1.75rem]">
                  <CapaTexto indice={i} categoria={t.categoria} className="aspect-[4/3] transition-transform duration-[1.2s] [transition-timing-function:var(--suave)] group-hover:scale-[1.04]" />
                </div>
                <div className="flex flex-1 flex-col px-1 pt-6">
                  <p className="text-[0.8rem] text-tinta-leve">
                    {dataPorExtenso(t.data)} · {t.leitura} min de leitura
                  </p>
                  <h2 className="mt-2 font-display text-[1.75rem] font-normal leading-[1.15] text-tinta transition-colors duration-500 group-hover:text-oliva">
                    {t.titulo}
                  </h2>
                  <p className="mt-3 text-[0.97rem] leading-[1.75] text-tinta-suave">{t.resumo}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.88rem] font-medium text-oliva">
                    Ler o texto
                    <IconeSeta className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Revelar>
          ))}
        </div>
      </div>
    </main>
  );
}
