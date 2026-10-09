// Capa ilustrada dos textos do blog (enquanto não houver fotos próprias).
// Cada texto ganha uma combinação de cores e formas da paleta da marca.

const CAPAS = [
  { fundo: "from-nude via-areia to-salvia-100", forma: "#B3BEA0", sol: "#F3E2D2", linha: "#A88660" },
  { fundo: "from-salvia-100 via-salvia-50 to-areia", forma: "#97A481", sol: "#F7EDE2", linha: "#66704F" },
  { fundo: "from-areia via-nude to-rosa", forma: "#C9AE8A", sol: "#FBF3EA", linha: "#82633F" },
];

export default function CapaTexto({ indice, categoria, className = "" }: { indice: number; categoria: string; className?: string }) {
  const c = CAPAS[indice % CAPAS.length];
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${c.fundo} ${className}`}>
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {indice % 3 === 0 && (
          <>
            <circle cx="290" cy="130" r="74" fill={c.sol} />
            <path d="M120 300V170a80 80 0 0 1 160 0v130" fill="none" stroke={c.linha} strokeOpacity="0.5" />
            <path d="M0 250c80-30 160-20 230 0s130 20 170-5v55H0Z" fill={c.forma} fillOpacity="0.75" />
          </>
        )}
        {indice % 3 === 1 && (
          <>
            <circle cx="200" cy="150" r="96" fill={c.sol} />
            <circle cx="200" cy="150" r="124" fill="none" stroke={c.linha} strokeOpacity="0.35" />
            <circle cx="200" cy="150" r="152" fill="none" stroke={c.linha} strokeOpacity="0.2" />
            <path d="M0 270c100-24 200-10 400-30v60H0Z" fill={c.forma} fillOpacity="0.7" />
          </>
        )}
        {indice % 3 === 2 && (
          <>
            <path d="M70 300V150a70 70 0 0 1 140 0v150" fill={c.sol} />
            <path d="M190 300V170a70 70 0 0 1 140 0v130" fill="none" stroke={c.linha} strokeOpacity="0.55" />
            <circle cx="300" cy="90" r="22" fill={c.forma} fillOpacity="0.6" />
          </>
        )}
      </svg>
      <span className="absolute left-5 top-5 rounded-full bg-linho/85 px-3.5 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-oliva-escuro backdrop-blur">
        {categoria}
      </span>
    </div>
  );
}
