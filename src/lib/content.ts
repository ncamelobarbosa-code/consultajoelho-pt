import type { Metadata } from "next";
import scraped from "../../content/scraped-pages.json";
import { seo } from "./seo";
import { navGroups, pages, type PageSlug, type PageMeta } from "./site";

export type Block = {
  type: "heading" | "text" | "list";
  level: number | null;
  text: string;
};
export type ScrapedImage = { url: string; w: number | null; h: number | null };
export type ScrapedPage = {
  slug: string;
  url: string;
  title: string;
  ogTitle?: string;
  description: string;
  ogImage: string | null;
  blocks: Block[];
  images: ScrapedImage[];
};

const list = scraped as unknown as ScrapedPage[];
const bySlug = new Map(list.map((p) => [p.slug, p]));

export function getScraped(slug: string): ScrapedPage | undefined {
  return bySlug.get(slug);
}

// Remove o sufixo "| Dr. Nuno Camelo" do <title> para usar como H1.
export function cleanTitle(t: string): string {
  const i = t.indexOf("|");
  return (i >= 0 ? t.slice(0, i) : t).trim();
}

// Metadata por página, a partir do conteúdo real scraped.
export function scrapedMetadata(slug: string): Metadata {
  const p = getScraped(slug);
  const meta = pages[slug as PageSlug] as PageMeta | undefined;
  const locale = meta?.lang === "en" ? "en_GB" : "pt_PT";
  return seo({
    title: cleanTitle(p?.title || meta?.label || slug),
    description: p?.description || meta?.blurb || "",
    slug,
    locale,
  });
}

// 3 páginas relacionadas: irmãs do mesmo grupo de navegação, com fallback.
const fallback: PageSlug[] = [
  "joelhodrnunocamelo",
  "ligamentocruzadoanterior",
  "agendamentonunocameloespecialistajoelho",
];

export function relatedFor(slug: string): PageSlug[] {
  const group = navGroups.find((g) => g.items.some((i) => i.slug === slug));
  let rel: PageSlug[] = group
    ? group.items.filter((i) => i.slug !== slug).map((i) => i.slug)
    : [];
  if (rel.length < 3) {
    for (const s of fallback) {
      if (s !== slug && !rel.includes(s)) rel.push(s);
    }
  }
  return rel.slice(0, 3);
}
