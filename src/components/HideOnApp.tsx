"use client";

// A PWA /app é um ecrã único para doentes: sem cabeçalho/rodapé do site,
// sem banner de cookies, sem GA/Ads, sem tracking de leads e sem Vercel Analytics.
import { usePathname } from "next/navigation";

export function isAppRoute(p: string | null): boolean {
  return p === "/app" || (p ?? "").startsWith("/app/");
}

export default function HideOnApp({ children }: { children: React.ReactNode }) {
  if (isAppRoute(usePathname())) return null;
  return <>{children}</>;
}
