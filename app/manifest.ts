import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Nome, cores e ícone quando alguém salva o site na tela inicial do celular.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.nome} — Psicanálise Clínica`,
    short_name: site.nome,
    description: "Psicanálise clínica online para adolescentes, adultos e casais.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F3EC",
    theme_color: "#F8F3EC",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
