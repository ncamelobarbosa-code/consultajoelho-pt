"use client";

import { usePathname } from "next/navigation";
import { ptHeader, ptFooter } from "./chrome-pt";
import { enHeader, enFooter } from "./chrome-en";
import { ruHeader, ruFooter } from "./chrome-ru";
import { deHeader, deFooter } from "./chrome-de";
import { frHeader, frFooter } from "./chrome-fr";

function localeOf(pathname: string | null): "pt" | "en" | "ru" | "de" | "fr" {
  const p = pathname || "/";
  if (p === "/en" || p.startsWith("/en/")) return "en";
  if (p === "/ru" || p.startsWith("/ru/")) return "ru";
  if (p === "/de" || p.startsWith("/de/")) return "de";
  if (p === "/fr" || p.startsWith("/fr/")) return "fr";
  return "pt";
}

const headers = { pt: ptHeader, en: enHeader, ru: ruHeader, de: deHeader, fr: frHeader };
const footers = { pt: ptFooter, en: enFooter, ru: ruFooter, de: deFooter, fr: frFooter };

export function SiteHeader() {
  const html = headers[localeOf(usePathname())];
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function SiteFooter() {
  const pathname = usePathname();
  // Na homepage o rodapé é substituído pela secção de Contactos (logo + ícones).
  if (pathname === "/" || pathname === "/en" || pathname === "/ru" || pathname === "/de" || pathname === "/fr") return null;
  const html = footers[localeOf(pathname)];
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
