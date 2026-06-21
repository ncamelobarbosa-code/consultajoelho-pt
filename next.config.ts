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
    return Object.entries(slugRedirects).map(([from, to]) => ({
      source: `/${from}`,
      destination: `/${to}`,
      permanent: true,
    }));
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
