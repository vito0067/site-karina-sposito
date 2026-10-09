import Revelar from "./Revelar";
import Ramo from "./Ramo";
import { IconeWhatsapp, IconeInstagram } from "./Icones";
import { linkWhatsapp, linkInstagram, site } from "@/lib/site";

export default function ChamadaFinal() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-nude via-areia to-salvia-100 px-6 py-20 text-center sm:px-12 sm:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[-30%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-linho/80 blur-[90px]" />
            <svg viewBox="0 0 800 400" className="absolute inset-x-0 bottom-0 w-full opacity-70" preserveAspectRatio="none">
              <path d="M0 300C160 250 320 270 460 300S690 330 800 290V400H0Z" fill="#CDD5BE" />
              <path d="M0 350C200 320 480 370 800 340V400H0Z" fill="#B3BEA0" />
            </svg>
          </div>
          <Ramo className="absolute -left-6 bottom-0 hidden h-72 w-44 sm:block" atraso={200} />
          <Ramo className="absolute -right-6 top-0 hidden h-72 w-44 rotate-180 sm:block" cor="#82633F" atraso={500} />

          <Revelar className="relative mx-auto max-w-[44rem]">
            <p className="sobretitulo justify-center">O primeiro passo</p>
            <h2 className="mt-6 font-display text-display-lg font-normal text-tinta">
              Cuidar de si pode começar com <em className="font-light italic text-oliva">uma mensagem.</em>
            </h2>
            <p className="mx-auto mt-7 max-w-[32rem] text-[1.08rem] leading-[1.8] text-tinta-suave">
              Me conte um pouco do que você está vivendo. Respondo para combinarmos, com calma, o melhor
              horário para a nossa primeira conversa.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={linkWhatsapp()} target="_blank" rel="noopener" className="botao-principal">
                <IconeWhatsapp className="h-5 w-5" />
                Conversar pelo WhatsApp
              </a>
              <a href={linkInstagram} target="_blank" rel="noopener" className="botao-secundario">
                <IconeInstagram className="h-4 w-4 text-oliva" />@{site.instagram}
              </a>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
