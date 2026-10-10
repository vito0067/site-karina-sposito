import type { Metadata } from "next";
import { site, linkEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Como este site trata as suas informações.",
  alternates: { canonical: "/privacidade" },
};

export default function Privacidade() {
  return (
    <main className="relative pb-24 pt-36 sm:pt-44">
      <div className="container-site">
        <div className="mx-auto max-w-[42rem]">
          <p className="sobretitulo">Privacidade</p>
          <h1 className="mt-6 font-display text-display-lg font-normal text-tinta">
            Cuidado também <em className="font-light italic text-oliva">com os seus dados.</em>
          </h1>

          <div className="artigo mt-12">
            <p>
              Sigilo é a base do meu trabalho, e isso vale também para este site. Aqui está, de forma
              simples, como as suas informações são tratadas, de acordo com a Lei Geral de Proteção de
              Dados (LGPD — Lei nº 13.709/2018).
            </p>

            <h2>O que este site coleta</h2>
            <p>
              <strong>Nenhum formulário, nenhum cadastro.</strong> Este site não pede o seu nome, telefone
              ou qualquer dado pessoal. Também não usa cookies de publicidade nem ferramentas que
              acompanham você por outros sites.
            </p>
            <p>
              Como qualquer site na internet, o serviço de hospedagem pode registrar informações técnicas
              das visitas (como o endereço de IP e o tipo de navegador), usadas apenas para manter o site
              funcionando com segurança.
            </p>
            <p>
              O site também conta quantas visitas recebe e quais páginas são mais lidas, de forma
              anônima e sem cookies: não é possível saber quem visitou, apenas os números gerais.
            </p>

            <h2>Quando você me chama no WhatsApp</h2>
            <p>
              Ao clicar em um botão de WhatsApp, você é levado ao aplicativo, que pertence a outra empresa
              e tem a sua própria política de privacidade. A conversa acontece diretamente entre nós, e
              as informações que você compartilhar são usadas somente para combinar e realizar o seu
              atendimento, sempre sob sigilo.
            </p>

            <h2>Seus direitos</h2>
            <p>
              Você pode, a qualquer momento, pedir para saber quais dados seus eu tenho, corrigi-los ou
              solicitar que sejam apagados, salvo quando a guarda for exigida por lei ou pelas normas
              éticas da profissão.
            </p>

            <h2>Contato</h2>
            <p>
              Para qualquer dúvida sobre privacidade, escreva para{" "}
              <a href={linkEmail}>{site.email}</a>.
            </p>

            <p className="text-[0.9rem] text-tinta-leve">Última atualização: outubro de 2026.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
