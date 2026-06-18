import { readFile, writeFile, mkdir } from "node:fs/promises";

const data = JSON.parse(await readFile("content/scraped-pages.json", "utf8"));

const tmpl = (slug) => `import ScrapedPageView from "@/components/ScrapedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("${slug}");

export default function Page() {
  return <ScrapedPageView slug="${slug}" />;
}
`;

let n = 0;
for (const p of data) {
  if (!p.slug || p.error) continue;
  const dir = `src/app/${p.slug}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/page.tsx`, tmpl(p.slug), "utf8");
  n++;
}
console.log(`Geradas ${n} páginas a partir de content/scraped-pages.json`);
