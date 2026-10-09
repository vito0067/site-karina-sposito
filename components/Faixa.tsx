const PALAVRAS = ["Escuta", "Acolhimento", "Ética", "Profundidade", "Cuidado", "Autonomia", "Singularidade", "Sigilo"];

// Faixa de palavras que corre devagar entre as seções.
export default function Faixa() {
  const lista = [...PALAVRAS, ...PALAVRAS];
  return (
    <div className="relative overflow-hidden border-y border-tinta/[0.07] bg-areia/60 py-6" aria-hidden="true">
      <div className="flex w-max animate-faixa">
        {lista.map((p, i) => (
          <span key={i} className="flex items-center font-display text-[1.7rem] italic text-tinta-suave sm:text-[2.1rem]">
            <span className="px-8 sm:px-10">{p}</span>
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-bronze-claro">
              <path d="M10 0C10.6 6 14 9.4 20 10 14 10.6 10.6 14 10 20 9.4 14 6 10.6 0 10 6 9.4 9.4 6 10 0Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
