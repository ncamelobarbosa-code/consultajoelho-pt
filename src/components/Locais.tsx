// Locais de atendimento em acordeão: cada cidade colapsa para o nome+logo;
// ao tocar abre hospital, telefone e mapa (mapa só carrega quando aberto — lazy).

type Lang = "pt" | "en" | "ru";

const TEAL = "var(--teal)";
const FONT = "'Space Grotesk', sans-serif";

const STRINGS = {
  pt: { eyebrow: "Onde Consultar", heading: "Locais de Atendimento", sub: "Em todas as unidades: SIGIC, subsistemas de saúde e particular.", book: "Marcar consulta", hint: "Toque para morada e mapa" },
  en: { eyebrow: "Where to Consult", heading: "Locations", sub: "All units: SIGIC, health insurance and private.", book: "Book appointment", hint: "Tap for address and map" },
  ru: { eyebrow: "Где принимаю", heading: "Места приёма", sub: "Во всех отделениях: SIGIC, страхование и платно.", book: "Записаться", hint: "Нажмите для адреса и карты" },
} as const;

type Loc = { city: string; hospital: string; logo: string; tel: string; mapQuery: string; badge: Record<Lang, string>; bookHref: Record<Lang, string> };

const LOCAIS: Loc[] = [
  {
    city: "Porto", hospital: "Hospital Lusíadas Porto", logo: "/img/logos/lusiadas.png",
    tel: "926 850 194", mapQuery: "Hospital Lusíadas Porto",
    badge: { pt: "SIGIC · Cirurgia", en: "SIGIC · Surgery", ru: "SIGIC · Хирургия" },
    bookHref: { pt: "/contacto", en: "/en/contacto", ru: "/ru/contacto" },
  },
  {
    city: "Vila do Conde", hospital: "Hospital Misericórdia de Vila do Conde", logo: "/img/logos/hmvc.webp",
    tel: "252 249 100", mapQuery: "Hospital Misericórdia Vila do Conde",
    badge: { pt: "Consultas", en: "Consultations", ru: "Консультации" },
    bookHref: { pt: "/contacto", en: "/en/contacto", ru: "/ru/contacto" },
  },
  {
    city: "Paços de Ferreira", hospital: "Hospital Lusíadas Paços de Ferreira", logo: "/img/logos/lusiadas.png",
    tel: "926 850 194", mapQuery: "Hospital Lusíadas Paços de Ferreira",
    badge: { pt: "Consultas · Coordenação de Ortopedia", en: "Consultations · Head of Orthopaedics", ru: "Консультации · заведующий ортопедией" },
    bookHref: { pt: "/contacto", en: "/en/contacto", ru: "/ru/contacto" },
  },
];

export default function Locais({ lang = "pt" }: { lang?: Lang }) {
  const t = STRINGS[lang];
  return (
    <section className="locais-acc" aria-label={t.heading} style={{ background: "var(--white, #fff)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "60px 1.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {LOCAIS.map((l) => (
            <details key={l.city} style={{ border: "1px solid var(--border)", borderRadius: "var(--r)", background: "var(--bg)", overflow: "hidden" }}>
              <summary style={{ listStyle: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.85rem", padding: "1rem 1.1rem" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.logo} alt="" style={{ height: "34px", maxWidth: "120px", objectFit: "contain" }} />
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontFamily: FONT, fontWeight: 700, color: "var(--text)" }}>{l.city}</span>
                  <span style={{ display: "block", fontFamily: FONT, fontSize: "0.78rem", color: "var(--muted)" }}>{t.hint}</span>
                </span>
                <span aria-hidden style={{ color: TEAL, fontSize: "1.1rem", transition: "transform .2s" }} className="locais-chev">▾</span>
              </summary>

              <div style={{ padding: "0 1.1rem 1.1rem" }}>
                <span style={{ display: "inline-block", background: TEAL, color: "#fff", fontFamily: FONT, fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", marginBottom: "0.6rem" }}>{l.badge[lang]}</span>
                <p style={{ fontFamily: FONT, fontWeight: 600, color: "var(--text)", margin: "0 0 0.3rem" }}>{l.hospital}</p>
                <a href={`tel:+351${l.tel.replace(/\s/g, "")}`} style={{ fontFamily: FONT, fontWeight: 600, color: TEAL, textDecoration: "none" }}>{l.tel}</a>
                <div style={{ margin: "0.85rem 0", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)" }}>
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(l.mapQuery)}&output=embed`}
                    title={l.hospital}
                    loading="lazy"
                    width="100%"
                    height="180"
                    style={{ border: 0, display: "block" }}
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a href={l.bookHref[lang]} style={{ fontFamily: FONT, fontWeight: 600, color: TEAL, textDecoration: "none", borderBottom: "2px solid var(--sage)" }}>{t.book} →</a>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
