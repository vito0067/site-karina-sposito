// Ilustração do topo: um amanhecer dentro de um arco.
// O arco é o mesmo do logo (a porta, o lugar seguro) e o amanhecer vem de
// uma frase que a Karina usa no Instagram: "A força de um novo amanhecer
// está dentro de você." Fica no lugar da foto até as fotos chegarem.
export default function ArteAmanhecer({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 600" className={className} aria-hidden="true">
      <defs>
        <clipPath id="arco-amanhecer">
          <path d="M0 600V240A240 240 0 0 1 480 240V600Z" />
        </clipPath>
        <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ECD9CF" />
          <stop offset="0.42" stopColor="#F4E7DC" />
          <stop offset="0.75" stopColor="#EEEBDD" />
          <stop offset="1" stopColor="#E3E8D6" />
        </linearGradient>
        <radialGradient id="sol" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor="#FBF1E6" />
          <stop offset="0.55" stopColor="#F2DDCB" />
          <stop offset="1" stopColor="#E6C7B4" />
        </radialGradient>
        <radialGradient id="brilho" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF6EC" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFF6EC" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g clipPath="url(#arco-amanhecer)">
        <rect width="480" height="600" fill="url(#ceu)" />

        <g className="sol-nascendo">
          <circle cx="240" cy="372" r="190" fill="url(#brilho)" />
          <circle cx="240" cy="372" r="150" fill="none" stroke="#C9AE8A" strokeOpacity="0.28" strokeWidth="1" />
          <circle cx="240" cy="372" r="118" fill="none" stroke="#C9AE8A" strokeOpacity="0.38" strokeWidth="1" />
          <circle cx="240" cy="372" r="86" fill="url(#sol)" />
        </g>

        {/* Pássaros ao longe */}
        <g fill="none" stroke="#82633F" strokeOpacity="0.45" strokeWidth="1.3" strokeLinecap="round" className="passaros">
          <path d="M318 196q6-6 12 0q6-6 12 0" />
          <path d="M350 172q4-4 8 0q4-4 8 0" />
        </g>

        <path className="colina-1" d="M-10 432C80 384 160 392 248 414S404 444 490 396V610H-10Z" fill="#D9DFCB" />
        <path className="colina-2" d="M-10 474C96 436 190 452 274 474S412 500 490 458V610H-10Z" fill="#C2CBAF" />
        <path className="colina-3" d="M-10 524C120 488 232 516 322 536S434 546 490 518V610H-10Z" fill="#A5B18F" />
        <path className="colina-4" d="M-10 572C140 546 300 584 490 556V610H-10Z" fill="#87946F" />

        {/* Reflexo de luz sobre as colinas */}
        <path d="M120 470c40-8 84-6 120 2" stroke="#F8F3EC" strokeOpacity="0.5" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>

      {/* Contorno fino do arco, como no logo */}
      <path d="M1 600V240A239 239 0 0 1 479 240V600" fill="none" stroke="#A88660" strokeOpacity="0.55" strokeWidth="1" />
    </svg>
  );
}
