"use client";

// Animação subtil de entrada (fade-up) das secções ao entrar no viewport.
// Seguro: o estado "escondido" só se aplica quando o JS adiciona `reveal-on`
// (sem JS, nada fica escondido). Respeita prefers-reduced-motion. Fallback por timeout.

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("section:not(.vhero):not(.hero)")
    );
    if (!els.length) return;

    els.forEach((el) => el.classList.add("reveal-item"));
    document.documentElement.classList.add("reveal-on");

    const reveal = (el: Element) => el.classList.add("revealed");

    if (!("IntersectionObserver" in window)) {
      els.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Salvaguarda: revela tudo o que faltar após 4s (nunca deixar conteúdo escondido)
    const t = window.setTimeout(() => els.forEach(reveal), 4000);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
