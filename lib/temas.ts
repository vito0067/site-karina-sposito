// Temas que a Karina atende, organizados a partir da lista que ela mandou
// no formulário (eram mais de 60 itens, com repetições — ex.: "Transtorno do
// pânico", "Transtorno de pânico" e "Síndrome do pânico" viraram um só).
// Nada foi tirado: todos os temas dela estão em algum grupo abaixo.

export type GrupoTemas = {
  id: string;
  titulo: string;
  frase: string;
  temas: string[];
};

export const grupos: GrupoTemas[] = [
  {
    id: "ansiedade",
    titulo: "Ansiedade e pânico",
    frase: "Quando a mente não desliga e o corpo vive em alerta.",
    temas: [
      "Ansiedade",
      "Transtornos de ansiedade",
      "Síndrome do pânico",
      "Ataques de pânico",
      "Fobia social",
      "Medo excessivo",
      "Estresse",
      "TOC (transtorno obsessivo-compulsivo)",
    ],
  },
  {
    id: "humor",
    titulo: "Tristeza, humor e depressão",
    frase: "Quando a vida perde a cor e a energia vai embora.",
    temas: [
      "Depressão",
      "Transtorno depressivo",
      "Tristeza profunda e prolongada",
      "Angústia",
      "Alterações de humor",
      "Transtornos do humor",
      "Transtorno bipolar",
      "Depressão pós-parto",
    ],
  },
  {
    id: "relacionamentos",
    titulo: "Relacionamentos e vínculos",
    frase: "Quando amar dói — ou quando se relacionar parece difícil demais.",
    temas: [
      "Relações com pessoas narcisistas",
      "Relacionamento abusivo",
      "Relacionamento tóxico",
      "Ciúmes",
      "Dependência emocional",
      "Dependência afetiva",
      "Dificuldades no relacionamento",
      "Conflitos de casal",
      "Dificuldade nas relações interpessoais",
    ],
  },
  {
    id: "perdas",
    titulo: "Separações, perdas e luto",
    frase: "Quando algo termina e é preciso reaprender a seguir.",
    temas: [
      "Luto",
      "Divórcio",
      "Separação conjugal",
      "Ansiedade de separação",
      "Medo do abandono",
      "Abandono afetivo",
      "Dificuldade em lidar com perdas",
      "Dificuldade em lidar com o envelhecimento",
    ],
  },
  {
    id: "traumas",
    titulo: "Traumas",
    frase: "Quando o que aconteceu continua acontecendo por dentro.",
    temas: [
      "Trauma psicológico",
      "Transtornos de estresse traumático",
      "Traumas físicos e emocionais",
      "Síndrome pós-covid",
      "Dor crônica (aspectos emocionais)",
      "Sofrimento causado por preconceito",
    ],
  },
  {
    id: "compulsoes",
    titulo: "Compulsões e impulsos",
    frase: "Quando algo parece mais forte que a sua vontade.",
    temas: [
      "Compulsão alimentar",
      "Transtornos alimentares",
      "Compulsão por compras",
      "Compulsão sexual",
      "Dependência tecnológica",
      "Impulsividade e reatividade",
      "Agressividade",
      "Raiva",
    ],
  },
  {
    id: "atencao",
    titulo: "Atenção, foco e pensamento",
    frase: "Quando a cabeça não acompanha o que você precisa fazer.",
    temas: [
      "TDAH",
      "Déficit de atenção e comportamento disruptivo",
      "Dificuldade de concentração e foco",
      "Dificuldade de organizar o pensamento",
      "Transtorno cognitivo leve (TCL)",
      "Baixa tolerância à frustração",
    ],
  },
  {
    id: "personalidade",
    titulo: "Personalidade e autoestima",
    frase: "Para entender quem você é e como se relaciona com o mundo.",
    temas: [
      "Baixa autoconfiança",
      "Transtornos da personalidade",
      "Personalidade borderline",
      "Personalidade narcisista",
      "Personalidade obsessivo-compulsiva",
      "Personalidade antissocial",
      "Personalidade paranoide",
      "Deficiência psicossocial",
      "Desenvolvimento humano",
    ],
  },
];

// Remove acentos e caixa para a busca achar "panico" em "Pânico".
export function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}
