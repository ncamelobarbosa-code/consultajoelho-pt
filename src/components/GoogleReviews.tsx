import { getGoogleReviews } from "@/lib/reviews";

type Lang = "pt" | "en" | "ru";

const STRINGS = {
  pt: { heading: "O que dizem os doentes", ratingLabel: (r: string, n: number) => `${r} em 5 · ${n} avaliações no Google`, see: "Ver no Google" },
  en: { heading: "What patients say", ratingLabel: (r: string, n: number) => `${r} out of 5 · ${n} Google reviews`, see: "See on Google" },
  ru: { heading: "Что говорят пациенты", ratingLabel: (r: string, n: number) => `${r} из 5 · ${n} отзывов в Google`, see: "Смотреть в Google" },
} as const;

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span aria-hidden style={{ color: "#f5a623", letterSpacing: "1px" }}>
      {"★".repeat(full)}
      <span style={{ color: "#d9d9d9" }}>{"★".repeat(Math.max(0, 5 - full))}</span>
    </span>
  );
}

export default async function GoogleReviews({ lang = "pt" }: { lang?: Lang }) {
  const data = await getGoogleReviews(lang);
  if (!data || data.reviews.length === 0) return null;
  const t = STRINGS[lang];
  const ratingStr = data.rating.toFixed(1);

  return (
    <section
      aria-label={t.heading}
      style={{ background: "#fff", padding: "4rem 1.5rem", borderTop: "1px solid #dde8dd" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.25rem)", fontWeight: 700, color: "#035772", margin: "0 0 0.75rem" }}>
            {t.heading}
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", color: "#4a5e4a", margin: 0 }}>
            <Stars rating={data.rating} />{" "}
            <strong style={{ color: "#091405" }}>{ratingStr}</strong> {t.ratingLabel("", data.total).replace(" · ", " · ")}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {data.reviews.map((r, i) => (
            <article
              key={i}
              style={{ background: "#F6F9F5", border: "1px solid #dde8dd", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {r.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.photo} alt={r.author} width={40} height={40} style={{ borderRadius: "50%", objectFit: "cover" }} referrerPolicy="no-referrer" />
                ) : (
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#AACBA8", display: "flex", alignItems: "center", justifyContent: "center", color: "#022d3d", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {r.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#091405", fontSize: "0.95rem" }}>{r.author}</div>
                  <div style={{ fontSize: "0.8rem", color: "#7a8a7a" }}>{r.time}</div>
                </div>
              </div>
              <div style={{ fontSize: "0.95rem" }}><Stars rating={r.rating} /></div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem", color: "#091405", lineHeight: 1.6, margin: 0 }}>{r.text}</p>
            </article>
          ))}
        </div>

        {data.mapsUri && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <a
              href={data.mapsUri}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#035772", textDecoration: "none", borderBottom: "2px solid #AACBA8", paddingBottom: "2px" }}
            >
              {t.see} ↗
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
