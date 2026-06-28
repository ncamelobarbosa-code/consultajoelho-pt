"use client";

// Tracking de conversões: apanha cliques em links de telefone/email em todo o site
// (inclui o HTML das páginas portadas, que não aceitam onClick React) via delegação.
import { useEffect } from "react";
import { event } from "@/lib/gtag";

export default function LeadTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("a[href^='tel:'], a[href^='mailto:']");
      if (!el) return;
      const href = el.getAttribute("href") || "";
      if (href.startsWith("tel:")) event("generate_lead", { method: "phone" });
      else if (href.startsWith("mailto:")) event("generate_lead", { method: "email" });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
