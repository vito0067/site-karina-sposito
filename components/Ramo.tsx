import Revelar from "./Revelar";

// Ramo de oliveira em traço fino, que se desenha quando aparece na tela.
// Mesmo desenho do ramo do logo, em versão "ilustração de linha".

type Ponto = [number, number];

function bezier(p0: Ponto, p1: Ponto, p2: Ponto, p3: Ponto, t: number) {
  const u = 1 - t;
  const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0];
  const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1];
  const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  return { x, y, ang: Math.atan2(dy, dx) };
}

const n = (v: number) => Math.round(v * 10) / 10;

function folha(x: number, y: number, ang: number, comp: number, larg: number) {
  const tx = x + Math.cos(ang) * comp;
  const ty = y + Math.sin(ang) * comp;
  const mx = x + Math.cos(ang) * comp * 0.48;
  const my = y + Math.sin(ang) * comp * 0.48;
  const nx = -Math.sin(ang) * larg;
  const ny = Math.cos(ang) * larg;
  return `M${n(x)} ${n(y)}Q${n(mx + nx)} ${n(my + ny)} ${n(tx)} ${n(ty)}Q${n(mx - nx)} ${n(my - ny)} ${n(x)} ${n(y)}`;
}

const P0: Ponto = [20, 380];
const P1: Ponto = [70, 300];
const P2: Ponto = [110, 170];
const P3: Ponto = [200, 30];
const FOLHAS = 11;

const caule = `M${P0.join(" ")}C${P1.join(" ")} ${P2.join(" ")} ${P3.join(" ")}`;
const folhas: string[] = [];
for (let i = 0; i < FOLHAS; i++) {
  const t = 0.1 + (i / FOLHAS) * 0.86;
  const { x, y, ang } = bezier(P0, P1, P2, P3, t);
  const lado = i % 2 === 0 ? -1 : 1;
  const escala = 1 - t * 0.45;
  folhas.push(folha(x, y, ang + lado * 0.72, 58 * escala, 14 * escala));
}
const ponta = bezier(P0, P1, P2, P3, 1);
folhas.push(folha(ponta.x, ponta.y, ponta.ang, 34, 8.5));

// Pequenas azeitonas, um detalhe que só quem olha de perto vê.
const azeitonas: Ponto[] = [];
[0.34, 0.62].forEach((t, i) => {
  const { x, y, ang } = bezier(P0, P1, P2, P3, t);
  const lado = i % 2 === 0 ? 1 : -1;
  azeitonas.push([x + Math.cos(ang + lado * 1.4) * 16, y + Math.sin(ang + lado * 1.4) * 16]);
});

export default function Ramo({
  className = "",
  cor = "#66704F",
  espessura = 1.1,
  atraso = 0,
  corFolha,
}: {
  className?: string;
  cor?: string;
  espessura?: number;
  atraso?: number;
  // Com cor de folha, as folhas ganham preenchimento depois que o traço
  // termina de desenhar — o ramo fica bem mais visível sobre fundos claros.
  corFolha?: string;
}) {
  return (
    <Revelar desenhar atraso={atraso} className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 240 400" className="h-full w-full overflow-visible" aria-hidden="true">
        <g fill="none" stroke={cor} strokeWidth={espessura} strokeLinecap="round" strokeLinejoin="round">
          <path d={caule} style={{ ["--comprimento" as string]: 520 }} />
          {folhas.map((d, i) => (
            <path
              key={i}
              d={d}
              fill={corFolha}
              className={corFolha ? "folha-cheia" : undefined}
              style={{ ["--comprimento" as string]: 160, animationDelay: `${atraso + 500 + i * 110}ms` }}
            />
          ))}
          {azeitonas.map(([x, y], i) => (
            <circle key={i} cx={n(x)} cy={n(y)} r="5.5" style={{ ["--comprimento" as string]: 40, animationDelay: `${atraso + 1500 + i * 200}ms` }} />
          ))}
        </g>
      </svg>
    </Revelar>
  );
}
