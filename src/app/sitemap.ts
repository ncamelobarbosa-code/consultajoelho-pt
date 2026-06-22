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

// Rotas EN traduzidas (acrescentar à medida que se traduzem).
const enRoutes = [
  "en",
  "en/infiltracoes",
  "en/cartilagem",
  "en/lca",
  "en/menisco",
  "en/protese",
  "en/artrose",
  "en/quisto-baker",
  "en/quistos-parameniscais",
  "en/sindrome-banda-iliotibial",
  "en/luxacao-rotula",
  "en/quadriceps",
  "en/medo-cirurgia",
  "en/preparar-cirurgia",
  "en/recuperar-cirurgia",
  "en/sigic",
  "en/avaliar",
  "en/nuno-camelo-especialista-cirurgia-joelho",
  "en/joelhodrnunocamelo",
  "en/contacto",
  "en/tendao-rotuliano-tendinite-drnunocamelo",
];

// Rotas RU traduzidas (acrescentar à medida que se traduzem).
const ruRoutes = [
  "ru",
  "ru/contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [...routes, ...enRoutes, ...ruRoutes].map((r) => ({
    url: r ? `${site.url}/${r}` : site.url,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
