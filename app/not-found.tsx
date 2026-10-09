import Link from "next/link";
import { Monograma } from "@/components/Logo";
import { IconeSeta } from "@/components/Icones";

export default function NaoEncontrada() {
  return (
    <main className="relative grid min-h-[80vh] place-items-center overflow-hidden px-5 pb-20 pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-nude/70 blur-[110px]" />
      <div className="relative text-center">
        <Monograma className="mx-auto h-28 w-auto" />
        <h1 className="mt-10 font-display text-display-md font-normal text-tinta">
          Esta página <em className="font-light italic text-oliva">não existe</em> — mas você chegou até aqui.
        </h1>
        <p className="mx-auto mt-5 max-w-[28rem] text-[1.05rem] leading-relaxed text-tinta-suave">
          Às vezes o caminho muda no meio. Vamos voltar ao começo?
        </p>
        <Link href="/" className="botao-principal mt-9">
          Voltar ao início
          <IconeSeta className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
