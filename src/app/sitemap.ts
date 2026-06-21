import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Rotas canónicas atuais (design portado + páginas antigas ainda sem equivalente).
const routes = [
  "", // homepage
  // páginas novas (design portado)
  "infiltracoes",
  "cartilagem",
  "lca",
  "menisco",
  "protese",
  "artrose",
  "quisto-baker",
  "quistos-parameniscais",
  "sindrome-banda-iliotibial",
  "luxacao-rotula",
  "quadriceps",
  "medo-cirurgia",
  "preparar-cirurgia",
  "recuperar-cirurgia",
  "sigic",
  "avaliar",
  // páginas antigas mantidas (ainda por portar)
  "joelhodrnunocamelo",
  "liquidojoelho-artrocentese-drnunocamelo",
  "tendao-rotuliano-tendinite-drnunocamelo",
  "entorsejoelho-drnunocamelo",
  "kneesurgeryinportugalprices",
  "nuno-camelo-especialista-cirurgia-joelho",
  "actividadecientificajoelho",
  "contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: r ? `${site.url}/${r}` : site.url,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
