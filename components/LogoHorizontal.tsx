import { LOGO_SITE } from "@/lib/logo-site";

// Logo horizontal (monograma + nome) como arquivo de imagem em public/marca.
// Fica fora do código da página: o navegador baixa uma vez e guarda em cache.
export function Logo({ variante = "cor", className }: { variante?: "cor" | "claro"; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/marca/logo-site-${variante}.svg`}
      alt="Karina Sposito — Psicanálise Clínica"
      width={LOGO_SITE.largura}
      height={LOGO_SITE.altura}
      className={className}
    />
  );
}
