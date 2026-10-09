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

  // Ela preencheu o campo de CRP com "CBO 2515-50", que é o código de
  // ocupação de psicanalista, e o Instagram dela diz "Bacharel em Psicologia,
  // Pós-graduação em Psicanálise Clínica". Por isso o site a apresenta como
  // psicanalista. Se ela tiver CRP ativo, troque aqui e preencha `crp`.
  profissao: "Psicanalista Clínica",
  formacaoCurta: "Bacharel em Psicologia · Pós-graduação em Psicanálise Clínica",
  registro: "CBO 2515-50",
  crp: "",

  // ATENÇÃO: o formulário tinha máscara de telefone americana (10 dígitos)
  // e o número chegou como "(196) 364-0004". O mais provável é
  // (19) 96364-0004 — CONFIRMAR COM A KARINA ANTES DE PUBLICAR.
  whatsapp: "5519963640004",
  whatsappExibicao: "(19) 96364-0004",
  mensagemWhatsapp:
    "Olá, Karina! Vim pelo seu site e gostaria de saber mais sobre o atendimento.",

  email: "kasitto@hotmail.com",
  instagram: "karina.psicanalise",

  // Domínio ainda não definido — trocar quando for registrado.
  url: "https://karinasposito.com.br",

  atendimento: "Online",
  horarios: "A combinar, conforme a sua rotina",
  convenios: "Atendimento particular (não atendo por convênio)",
  publico: ["Adolescentes", "Adultos", "Casais"],
};

export function linkWhatsapp(mensagem: string = site.mensagemWhatsapp) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const linkInstagram = `https://instagram.com/${site.instagram}`;
export const linkEmail = `mailto:${site.email}`;
