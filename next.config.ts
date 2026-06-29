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
  cartilagemjoelhodrnunocamelo: "cartilagem",
  meniscosnojoelho: "menisco",
  protesejoelhodesportodrnunocamelo: "protese",
  quistobakerjoelhodrnunocamelo: "quisto-baker",
  quistosparameniscaisjoelho: "quistos-parameniscais",
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
  agendamentonunocameloespecialistajoelho: "contacto",
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
    // Páginas de serviço do Wix (marcação) -> contacto
    out.push({ source: "/service-page/:rest*", destination: "/contacto", permanent: true });
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
