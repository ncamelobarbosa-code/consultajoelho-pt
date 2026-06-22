"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Ajusta <html lang> consoante o idioma da rota (PT por omissão, EN em /en).
export default function LangSync() {
  const p = usePathname();
  useEffect(() => {
    const en = p === "/en" || (p?.startsWith("/en/") ?? false);
    document.documentElement.lang = en ? "en" : "pt";
  }, [p]);
  return null;
}
