"use client";

// Moradas: nomes das cidades em linha (Porto — Vila do Conde — Paços de Ferreira).
// Ao clicar num nome aparece a unidade (logo + hospital) e o mapa.

import { useState } from "react";

type Lang = "pt" | "en" | "ru";

const TEAL = "var(--teal)";
const FONT = "'Space Grotesk', sans-serif";

type Loc = { city: string; hospital: string; logo: string; mapQuery: string; bookHref: Record<Lang, string> };

const LOCAIS: Loc[] = [
  { city: "Porto", hospital: "Hospital Lusíadas Porto", logo: "/img/logos/lusiadas.png", mapQuery: "Hospital Lusíadas Porto", bookHref: { pt: "/contacto", en: "/en/contacto", ru: "/ru/contacto" } },
  { city: "Vila do Conde", hospital: "Hospital Misericórdia de Vila do Conde", logo: "/img/logos/hmvc.webp", mapQuery: "Hospital Misericórdia Vila do Conde", bookHref: { pt: "/contacto", en: "/en/contacto", ru: "/ru/contacto" } },
  { city: "Paços de Ferreira", hospital: "Hospital Lusíadas Paços de Ferreira", logo: "/img/logos/lusiadas.png", mapQuery: "Hospital Lusíadas Paços de Ferreira", bookHref: { pt: "/contacto", en: "/en/contacto", ru: "/ru/contacto" } },
];

const BOOK: Record<Lang, string> = { pt: "Marcar consulta", en: "Book appointment", ru: "Записаться" };

export default function Locais({ lang = "pt" }: { lang?: Lang }) {
  const [active, setActive] = useState(0);
  const l = LOCAIS[active];
  return (
    <section aria-label="Locais" style={{ background: "var(--white, #fff)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "56px 1.5rem" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {/* Nomes em linha, com separadores */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0.4rem 0.9rem", marginBottom: "2rem" }}>
          {LOCAIS.map((loc, i) => (
            <span key={loc.city} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem 0.9rem" }}>
              {i > 0 && <span aria-hidden style={{ color: "var(--border)", fontWeight: 300 }}>—</span>}
              <button
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                style={{
                  background: "none", border: "none", cursor: "pointer", padding: "4px 2px",
                  fontFamily: FONT, fontSize: "clamp(1.05rem, 2.5vw, 1.5rem)", fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: active === i ? TEAL : "var(--muted)",
                  borderBottom: active === i ? `2px solid var(--sage)` : "2px solid transparent",
                  transition: "color .18s ease, border-color .18s ease",
                }}
              >
                {loc.city}
              </button>
            </span>
          ))}
        </div>

        {/* Painel da unidade selecionada */}
        <div style={{ textAlign: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={l.logo} alt={l.hospital} style={{ height: "44px", maxWidth: "170px", objectFit: "contain", margin: "0 auto 0.6rem" }} />
          <p style={{ fontFamily: FONT, fontWeight: 600, color: "var(--text)", margin: "0 0 1rem" }}>{l.hospital}</p>
          <div style={{ borderRadius: "var(--r)", overflow: "hidden", border: "1px solid var(--border)", marginBottom: "1rem" }}>
            <iframe
              key={l.mapQuery}
              src={`https://www.google.com/maps?q=${encodeURIComponent(l.mapQuery)}&output=embed`}
              title={l.hospital}
              loading="lazy"
              width="100%"
              height="300"
              style={{ border: 0, display: "block" }}
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a href={l.bookHref[lang]} style={{ fontFamily: FONT, fontWeight: 600, color: TEAL, textDecoration: "none", borderBottom: "2px solid var(--sage)" }}>
            {BOOK[lang]} →
          </a>
        </div>
      </div>
    </section>
  );
}
