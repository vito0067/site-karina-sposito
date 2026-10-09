import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { todosOsTextos } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const textos = todosOsTextos().map((t) => ({
    url: `${site.url}/textos/${t.slug}`,
    lastModified: t.data,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/textos`, changeFrequency: "weekly", priority: 0.8 },
    ...textos,
    { url: `${site.url}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
