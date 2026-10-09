import type { Config } from "tailwindcss";

// Paleta tirada do Instagram da Karina (@karina.psicanalise): creme, nude,
// verde-sálvia, oliva e dourado envelhecido. Ela pediu tons pastéis e vetou
// preto, vermelho, laranja e amarelo — por isso o "texto escuro" do site é um
// oliva bem fechado (tinta), nunca preto.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        linho: "#F8F3EC",
        areia: "#F1E8DD",
        nude: "#EAD8CD",
        rosa: "#E3C9BE",
        salvia: {
          50: "#F0F2EA",
          100: "#E2E7D8",
          200: "#CDD5BE",
          300: "#B3BEA0",
          400: "#97A481",
          DEFAULT: "#A7B096",
        },
        oliva: {
          DEFAULT: "#66704F",
          escuro: "#4E573C",
          profundo: "#3E4531",
        },
        bronze: {
          claro: "#C9AE8A",
          DEFAULT: "#A88660",
          escuro: "#82633F",
        },
        tinta: {
          DEFAULT: "#3A3A2C",
          suave: "#625C4D",
          leve: "#8A8373",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6.3vw, 5.6rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.3rem, 4.4vw, 3.9rem)", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.8rem, 3vw, 2.7rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        site: "78rem",
      },
      boxShadow: {
        suave: "0 1px 0 rgba(255,255,255,0.7) inset, 0 18px 50px -22px rgba(62,69,49,0.28)",
        flutuante: "0 30px 80px -30px rgba(62,69,49,0.35)",
      },
      keyframes: {
        respirarBlob: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(4%, -3%, 0) scale(1.06)" },
          "66%": { transform: "translate3d(-3%, 4%, 0) scale(0.96)" },
        },
        faixa: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        flutuar: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "blob-lento": "respirarBlob 22s ease-in-out infinite",
        "blob-medio": "respirarBlob 17s ease-in-out infinite reverse",
        faixa: "faixa 48s linear infinite",
        flutuar: "flutuar 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
