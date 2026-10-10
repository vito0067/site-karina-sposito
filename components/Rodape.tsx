import Link from "next/link";
import { Logo } from "./LogoHorizontal";
import { IconeWhatsapp, IconeInstagram, IconeEmail } from "./Icones";
import { linkWhatsapp, linkInstagram, linkEmail, site } from "@/lib/site";

export default function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-oliva-profundo text-linho">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-oliva/50 blur-[120px]" />

      <div className="container-site relative pb-10 pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo variante="claro" className="h-16 w-auto" />
            <p className="mt-7 max-w-[22rem] text-[0.98rem] leading-[1.8] text-linho/70">
              Psicanálise clínica online para adolescentes, adultos e casais. Um espaço de escuta, ética e
              cuidado — de onde você estiver.
            </p>
          </div>

          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-bronze-claro">Navegue</p>
            <ul className="mt-6 space-y-3 text-[0.98rem] text-linho/75">
              <li><a href="/#sobre" className="transition-colors hover:text-linho">Sobre mim</a></li>
              <li><a href="/#temas" className="transition-colors hover:text-linho">Como posso ajudar</a></li>
              <li><a href="/#atendimento" className="transition-colors hover:text-linho">Atendimento</a></li>
              <li><Link href="/textos" className="transition-colors hover:text-linho">Textos</Link></li>
              <li><a href="/#duvidas" className="transition-colors hover:text-linho">Dúvidas</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-bronze-claro">Contato</p>
            <ul className="mt-6 space-y-4 text-[0.98rem] text-linho/75">
              <li>
                <a href={linkWhatsapp()} target="_blank" rel="noopener" className="inline-flex items-center gap-3 transition-colors hover:text-linho">
                  <IconeWhatsapp className="h-[1.1rem] w-[1.1rem] text-salvia-200" />
                  {site.whatsappExibicao}
                </a>
              </li>
              <li>
                <a href={linkInstagram} target="_blank" rel="noopener" className="inline-flex items-center gap-3 transition-colors hover:text-linho">
                  <IconeInstagram className="h-[1.1rem] w-[1.1rem] text-salvia-200" />@{site.instagram}
                </a>
              </li>
              <li>
                <a href={linkEmail} className="inline-flex items-center gap-3 break-all transition-colors hover:text-linho">
                  <IconeEmail className="h-[1.1rem] w-[1.1rem] shrink-0 text-salvia-200" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Aviso de crise: obrigatório em site de saúde mental, por responsabilidade. */}
        <div className="mt-16 rounded-2xl border border-linho/10 bg-linho/[0.04] px-6 py-5 text-[0.9rem] leading-relaxed text-linho/70">
          <strong className="font-medium text-linho">Em uma situação de crise ou emergência,</strong> não espere: ligue{" "}
          <a href="tel:188" className="font-medium text-salvia-200 underline-offset-4 hover:underline">188</a> (CVV — gratuito, 24 horas),{" "}
          <a href="tel:192" className="font-medium text-salvia-200 underline-offset-4 hover:underline">192</a> (SAMU) ou procure o pronto-socorro
          mais próximo.
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-linho/10 pt-8 text-[0.82rem] text-linho/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {ano} {site.nome} · {site.formacaoCurta} · {site.registro}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacidade" className="transition-colors hover:text-linho">Privacidade</Link>
            <a href="https://origemdigitalsite.com.br" target="_blank" rel="noopener" className="transition-colors hover:text-linho">
              Site feito por Origem Digital
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
