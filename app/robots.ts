import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// A página /marca não é bloqueada aqui de propósito: ela já pede "noindex"
// para o Google, e ele só consegue ler esse pedido se puder abrir a página.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
