import Link from "next/link";
import Revelar from "./Revelar";
import CapaTexto from "./CapaTexto";
import { IconeSeta } from "./Icones";
import { todosOsTextos } from "@/lib/posts";

export default function Textos() {
  const textos = todosOsTextos().slice(0, 3);

  return (
    <section id="textos" className="relative py-24 sm:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Revelar>
            <p className="sobretitulo">Textos</p>
            <h2 className="titulo-secao mt-6">
              Para ler com <em>calma.</em>
            </h2>
          </Revelar>
          <Revelar atraso={100}>
            <Link href="/textos" className="group inline-flex items-center gap-3 text-[0.95rem] font-medium text-oliva">
              Ver todos os textos
              <span className="grid h-10 w-10 place-items-center rounded-full border border-oliva/30 transition-all duration-500 group-hover:bg-oliva group-hover:text-linho">
                <IconeSeta className="h-4 w-4" />
              </span>
            </Link>
          </Revelar>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {textos.map((t, i) => (
            <Revelar key={t.slug} atraso={i * 120}>
              <Link href={`/textos/${t.slug}`} className="group flex h-full flex-col">
                <div className="overflow-hidden rounded-[1.75rem]">
                  <CapaTexto indice={i} categoria={t.categoria} className="aspect-[4/3] transition-transform duration-[1.2s] [transition-timing-function:var(--suave)] group-hover:scale-[1.04]" />
                </div>
                <div className="flex flex-1 flex-col px-1 pt-6">
                  <p className="text-[0.8rem] text-tinta-leve">{t.leitura} min de leitura</p>
                  <h3 className="mt-2 font-display text-[1.75rem] font-normal leading-[1.15] text-tinta transition-colors duration-500 group-hover:text-oliva">
                    {t.titulo}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[0.97rem] leading-[1.75] text-tinta-suave">{t.resumo}</p>
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
    </section>
  );
}
