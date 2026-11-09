import type { NextConfig } from "next";
import { slugRedirects } from "./src/lib/slug-redirects";

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
