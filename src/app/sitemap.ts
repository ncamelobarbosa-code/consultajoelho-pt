import type { MetadataRoute } from "next";
import { site, allSlugs, href } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: site.url,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };

  const internal: MetadataRoute.Sitemap = allSlugs.map((slug) => ({
    url: `${site.url}${href(slug)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [home, ...internal];
}
