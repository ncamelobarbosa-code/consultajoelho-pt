"use client";

import { usePathname } from "next/navigation";
import { ptHeader, ptFooter } from "./chrome-pt";
import { enHeader, enFooter } from "./chrome-en";

function isEnglish(pathname: string | null): boolean {
  const p = pathname || "/";
  return p === "/en" || p.startsWith("/en/");
}

export function SiteHeader() {
  const html = isEnglish(usePathname()) ? enHeader : ptHeader;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function SiteFooter() {
  const html = isEnglish(usePathname()) ? enFooter : ptFooter;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
