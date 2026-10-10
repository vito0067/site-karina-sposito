// ─────────────────────────────────────────────────────────────────────────
// TODOS os dados de contato e identificação da Karina moram aqui.
// O site inteiro lê deste arquivo: mudou aqui, muda em todo lugar
// (botões de WhatsApp, rodapé, Google, imagem de compartilhamento).
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  // No formulário ela pediu "Dra. Karina Sposito". Ficou sem o "Dra." porque
  // o Instagram dela não usa e, sem doutorado, o título pode ser lido como
  // enganoso. Se ela confirmar que quer (ou que tem doutorado), é só trocar.
  nome: "Karina Sposito",

  // Confirmado em 10/10/2026: ela é psicanalista, sem CRP. Por isso o site
  // nunca usa a palavra "psicóloga" — sem CRP, isso seria exercício ilegal
  // da profissão.
  profissao: "Psicanalista Clínica",
  formacaoCurta: "Bacharel em Psicologia · Pós-graduação em Psicanálise Clínica",
  registro: "CBO 2515-50",

  // Confirmado pela Karina em 10/10/2026: 11 96364-0004.
  whatsapp: "5511963640004",
  whatsappExibicao: "(11) 96364-0004",
  mensagemWhatsapp:
    "Olá, Karina! Vim pelo seu site e gostaria de saber mais sobre o atendimento.",

  email: "kasitto@hotmail.com",
  instagram: "karina.psicanalise",

  // Endereço do site, usado pelo Google e pela imagem de compartilhamento.
  // Não precisa mexer: na Vercel ele vira sozinho o domínio do projeto
  // (o .vercel.app agora, o karinasposito.com.br quando for conectado).
  url: enderecoDoSite(),

  // Código de verificação do Google Search Console (passo a passo no README).
  // Cole só o código, entre as aspas. Ex.: "AbC123xYz..."
  googleVerificacao: "",

  atendimento: "Online",
  horarios: "A combinar, conforme a sua rotina",
  convenios: "Atendimento particular (não atendo por convênio)",
  publico: ["Adolescentes", "Adultos", "Casais"],
};

function enderecoDoSite() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Variável que a própria Vercel preenche com o domínio principal do projeto.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3100";
}

export function linkWhatsapp(mensagem: string = site.mensagemWhatsapp) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const linkInstagram = `https://instagram.com/${site.instagram}`;
export const linkEmail = `mailto:${site.email}`;
