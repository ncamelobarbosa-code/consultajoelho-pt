"use client";

// Barra fixa no fundo (só mobile): Ligar + Marcar consulta. Conversão.
// O clique em tel: já é registado globalmente pelo LeadTracking.
import { usePathname } from "next/navigation";

type Lang = "pt" | "en" | "ru";

const STR: Record<Lang, { call: string; book: string }> = {
  pt: { call: "Ligar", book: "Marcar consulta" },
  en: { call: "Call", book: "Book" },
  ru: { call: "Позвонить", book: "Записаться" },
};

function localeOf(p: string): Lang {
  if (p === "/en" || p.startsWith("/en/")) return "en";
  if (p === "/ru" || p.startsWith("/ru/")) return "ru";
  return "pt";
}

export default function StickyCall() {
  const pathname = usePathname() || "/";
  const lang = localeOf(pathname);
  const t = STR[lang];
  // Não mostrar na própria página de marcação (já lá está o formulário)
  if (pathname.includes("/marcar-consulta")) return null;
  const bookHref = lang === "en" ? "/en/marcar-consulta" : lang === "ru" ? "/ru/marcar-consulta" : "/marcar-consulta";

  return (
    <div className="sticky-call" role="navigation" aria-label={t.book}>
      <a href="tel:+351926850194" className="sc-btn sc-btn--call">
        <span aria-hidden="true">📞</span> {t.call}
      </a>
      <a href={bookHref} className="sc-btn sc-btn--book">
        {t.book} →
      </a>

      <style>{`
        .sticky-call {
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 1400;
          display: none; gap: .6rem; padding: .6rem .8rem calc(.6rem + env(safe-area-inset-bottom));
          background: rgba(255,255,255,0.96); backdrop-filter: blur(8px);
          border-top: 1px solid #e2ece1; box-shadow: 0 -6px 24px rgba(3,87,114,0.1);
        }
        .sc-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: .4rem;
          font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: .95rem;
          padding: .8rem 1rem; border-radius: 10px; text-decoration: none; letter-spacing: .01em;
        }
        .sc-btn--call { color: #035772; background: #eef6f4; border: 1.5px solid #AACBA8; }
        .sc-btn--book { color: #fff; background: #035772; border: 1.5px solid #035772; }
        @media (max-width: 767px) { .sticky-call { display: flex; } }
      `}</style>
    </div>
  );
}
