"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Ajusta <html lang> consoante o idioma da rota (PT por omissão, EN em /en).
export default function LangSync() {
  const p = usePathname();
  useEffect(() => {
    const path = p || "/";
    const lang =
      path === "/en" || path.startsWith("/en/")
        ? "en"
        : path === "/ru" || path.startsWith("/ru/")
          ? "ru"
          : path === "/de" || path.startsWith("/de/")
            ? "de"
            : path === "/fr" || path.startsWith("/fr/")
              ? "fr"
              : "pt";
    document.documentElement.lang = lang;
  }, [p]);
  return null;
}
