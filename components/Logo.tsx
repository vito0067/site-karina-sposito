import { useId } from "react";
import { marca } from "@/lib/marca";

type Variante = "cor" | "claro";

const CORES: Record<Variante, { k: string; s: string; linha: string; folha: string; caule: string; nome: string; assin: string }> = {
  cor: { k: "#A88660", s: "#66704F", linha: "#A88660", folha: "#97A481", caule: "#66704F", nome: "#3A3A2C", assin: "#82633F" },
  claro: { k: "#F8F3EC", s: "#DCE1D0", linha: "#C9AE8A", folha: "#CDD5BE", caule: "#DCE1D0", nome: "#F8F3EC", assin: "#C9AE8A" },
};

// Só o monograma (arco + KS + ramo). O traço do arco usa
// vector-effect para continuar visível mesmo quando o logo fica pequeno.
export function Monograma({
  variante = "cor",
  className,
  semRamo = false,
  titulo,
  width,
  height,
}: {
  variante?: Variante;
  className?: string;
  semRamo?: boolean;
  titulo?: string;
  width?: number;
  height?: number;
}) {
  const c = CORES[variante];
  // Id único por instância: o mesmo logo aparece no topo, no menu e no
  // rodapé, e máscaras com id repetido somem quando a primeira está oculta.
  const id = `recorte${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      viewBox="0 0 300 360"
      width={width}
      height={height}
      className={className}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
    >
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="360">
          <rect width="300" height="360" fill="#fff" />
          <path d={marca.s} fill="#000" stroke="#000" strokeWidth="7" strokeLinejoin="round" />
        </mask>
      </defs>
      <path d={marca.arco} fill="none" stroke={c.linha} strokeWidth="1.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d={marca.arcoFim} fill="none" stroke={c.linha} strokeWidth="1.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d={marca.k} fill={c.k} mask={`url(#${id})`} />
      <path d={marca.s} fill={c.s} />
      {!semRamo && (
        <>
          <path d={marca.caule} fill="none" stroke={c.caule} strokeWidth="1.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d={marca.folhas} fill={c.folha} />
        </>
      )}
    </svg>
  );
}

// O logo horizontal mora em LogoHorizontal.tsx (arquivo de imagem, mais leve).
export { Logo } from "./LogoHorizontal";
