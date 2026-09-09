import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

// Slugs antigos (scraped) -> novos (design portado). 301 permanentes para preservar SEO.
const slugRedirects: Record<string, string> = {
  ligamentocruzadoanterior: "lca",
  "ligamentocruzadoanteriorjoelho-drnunocamelo": "lca",
  ligamentocruzadoanteriorjoelho: "lca",
  ligamentocruzadoanteriordrnunocamelo: "lca",
  cartilagemjoelhodrnunocamelo: "cartilagem",
  cartilagemjoelho: "cartilagem",
  meniscosnojoelho: "menisco",
  protesejoelhodesportodrnunocamelo: "protese",
  protesejoelhodesporto: "protese",
  quistobakerjoelhodrnunocamelo: "quisto-baker",
  quistobakerjoelho: "quisto-baker",
  quistosparameniscaisjoelho: "quistos-parameniscais",
  // Gémeos Wix mortos -> páginas vivas (que ficam no slug antigo, mas rankeiam bem)
  liquidojoelho: "liquidojoelho-artrocentese-drnunocamelo",
  "liquidojoelho-artrocentese": "liquidojoelho-artrocentese-drnunocamelo",
  "tendao-rotuliano-tendinite": "tendao-rotuliano-tendinite-drnunocamelo",
  entorsejoelho: "entorsejoelho-drnunocamelo",
  sindromebandailiotibialjoelho: "sindrome-banda-iliotibial",
  luxacaorotulajoelho: "luxacao-rotula",
  quadricepsjoelho: "quadriceps",
  medocirurgiajoelho: "medo-cirurgia",
  recuperarcirurgiajoelho: "recuperar-cirurgia",
  cirurgiadojoelhoeagora: "preparar-cirurgia",
  prepararcirurgiajoelho: "preparar-cirurgia",
  rupturameniscosjoelho: "menisco",
  dornojoelho: "joelhodrnunocamelo",
  avaliarjoelho: "avaliar",
  infiltracaojoelho: "infiltracoes",
  agendamentonunocameloespecialistajoelho: "marcar-consulta",
  // Página única de marcação (booking + contacto/2ª opinião) substitui o /contacto e o /agendar.
  contacto: "marcar-consulta",
  agendar: "marcar-consulta",
  "nuno-camelo-cirurgia-joelho": "nuno-camelo-especialista-cirurgia-joelho",
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/media/**",
      },
    ],
  },
  async redirects() {
    const out: { source: string; destination: string; permanent: boolean }[] = [];
    // Slugs antigos do Wix -> novos, em PT, EN e RU (preserva SEO dos URLs indexados)
    for (const [from, to] of Object.entries(slugRedirects)) {
      out.push({ source: `/${from}`, destination: `/${to}`, permanent: true });
      out.push({ source: `/en/${from}`, destination: `/en/${to}`, permanent: true });
      out.push({ source: `/ru/${from}`, destination: `/ru/${to}`, permanent: true });
    }
    // Páginas de serviço do Wix (marcação) -> página única de marcação (evita cadeia 301->301 via /contacto)
    out.push({ source: "/service-page/:rest*", destination: "/marcar-consulta", permanent: true });
    // Duplicados acidentais do editor Wix ("cópia-...") indexados pelo Google
    out.push({ source: "/cópia-medo-da-cirurgia-do-joelho", destination: "/medo-cirurgia", permanent: true });
    out.push({ source: "/en/cópia-síndrome-da-banda-iliotibial", destination: "/en/sindrome-banda-iliotibial", permanent: true });
    // Resíduo de templates Wix e página de ombro num site de joelho
    out.push({ source: "/services-5", destination: "/", permanent: true });
    out.push({ source: "/rotura-do-labrum-do-ombro", destination: "/", permanent: true });
    return out;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
