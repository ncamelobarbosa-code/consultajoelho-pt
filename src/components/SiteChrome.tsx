"use client";

import { usePathname } from "next/navigation";
import { ptHeader, ptFooter } from "./chrome-pt";
import { enHeader, enFooter } from "./chrome-en";
import { ruHeader, ruFooter } from "./chrome-ru";

function localeOf(pathname: string | null): "pt" | "en" | "ru" {
  const p = pathname || "/";
  if (p === "/en" || p.startsWith("/en/")) return "en";
  if (p === "/ru" || p.startsWith("/ru/")) return "ru";
  return "pt";
}

const headers = { pt: ptHeader, en: enHeader, ru: ruHeader };
const footers = { pt: ptFooter, en: enFooter, ru: ruFooter };

export function SiteHeader() {
  const html = headers[localeOf(usePathname())];
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function SiteFooter() {
  const pathname = usePathname();
  // Na homepage o rodapé é substituído pela secção de Contactos (logo + ícones).
  if (pathname === "/" || pathname === "/en" || pathname === "/ru") return null;
  const html = footers[localeOf(pathname)];
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
