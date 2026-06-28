// Secção de avaliações Google — dados estáticos (a ficha é "área de serviço" e
// não é exposta pela Places API). Fácil de expandir: acrescentar a REVIEWS.
// As reviews ficam no original (PT); só o texto da interface é traduzido por `lang`.
// Cores/raio via tokens do design system (var(--teal), var(--r)…) definidos em site.css.

const MAPS_URL = "https://maps.app.goo.gl/ZF5XwJS5Y9avryMu7";

export type Review = {
  author: string;
  rating: number;
  text: string;
  weeksAgo: number;
};

const REVIEWS: Review[] = [
  {
    author: "Maria Pedro",
    rating: 5,
    text: "Recibí una excelente atención del doctor Nuno Camelo. Muy buen diagnóstico y trato amable. O meu marido ficou muito satisfeito com a atenção e o diagnóstico do doutor.",
    weeksAgo: 0,
  },
  {
    author: "Marlene Teixeira",
    rating: 5,
    text: "A minha mãe fez prótese do joelho com o Dr. Nuno Camelo. Excelente profissional.",
    weeksAgo: 7,
  },
  {
    author: "Joana Marques",
    rating: 5,
    text: "Recomendo vivamente!",
    weeksAgo: 25,
  },
];

type Lang = "pt" | "en" | "ru";

const STRINGS = {
  pt: {
    heading: "O que dizem os pacientes",
    count: (n: number) => `${n} avaliações no Google`,
    see: "Ver avaliações no Google",
    leave: "Deixar avaliação",
    ago: (w: number) => (w <= 0 ? "Esta semana" : `Há ${w} semanas`),
  },
  en: {
    heading: "What patients say",
    count: (n: number) => `${n} Google reviews`,
    see: "See reviews on Google",
    leave: "Leave a review",
    ago: (w: number) => (w <= 0 ? "This week" : `${w} weeks ago`),
  },
  ru: {
    heading: "Что говорят пациенты",
    count: (n: number) => `${n} отзыва в Google`,
    see: "Смотреть отзывы в Google",
    leave: "Оставить отзыв",
    ago: (w: number) => (w <= 0 ? "На этой неделе" : `${w} недель назад`),
  },
} as const;

// Tokens do design system (site.css :root)
const TEAL = "var(--teal)";
const SAGE = "var(--sage)";
const BG = "var(--bg)";
const TEXT = "var(--text)";
const MUTED = "var(--muted)";
const BORDER = "var(--border)";
const R = "var(--r)";
const GOLD = "#f5a623"; // convenção das estrelas Google (não é token do sistema)
const FONT = "'Space Grotesk', sans-serif";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span aria-hidden style={{ letterSpacing: "1px", fontSize: "1rem" }}>
      <span style={{ color: GOLD }}>{"★".repeat(full)}</span>
      <span style={{ color: BORDER }}>{"★".repeat(Math.max(0, 5 - full))}</span>
    </span>
  );
}

export default function GoogleReviews({
  lang = "pt",
  reviews = REVIEWS,
  rating = 5.0,
  total = 14,
}: {
  lang?: Lang;
  reviews?: Review[];
  rating?: number;
  total?: number; // total real de avaliações no Google (mostramos só as 3 mais recentes)
}) {
  if (!reviews.length) return null;
  const t = STRINGS[lang];
  const shown = reviews.slice(0, 3);

  return (
    <section aria-label={t.heading} className="home-band" style={{ background: "#fff", padding: "3cm 1.5rem", borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Cabeçalho + resumo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.6rem, 4vw, 2.25rem)", fontWeight: 700, color: TEAL, margin: "0 0 0.75rem" }}>
            {t.heading}
          </h2>
          <p style={{ fontFamily: FONT, fontSize: "1.05rem", color: TEXT, margin: 0, display: "inline-flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center" }}>
            <strong style={{ fontSize: "1.25rem" }}>{rating.toFixed(1)}</strong>
            <Stars rating={rating} />
            <span style={{ color: MUTED }}>· {t.count(total)}</span>
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {shown.map((r, i) => (
            <article key={i} style={{ background: BG, border: `1px solid ${BORDER}`, borderRadius: R, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div aria-hidden style={{ width: 42, height: 42, borderRadius: "50%", background: SAGE, color: TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontWeight: 700, fontSize: "1.1rem", flexShrink: 0 }}>
                  {r.author.charAt(0).toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: FONT, fontWeight: 600, color: TEXT, fontSize: "0.95rem" }}>{r.author}</div>
                  <div style={{ fontSize: "0.8rem", color: MUTED }}>{t.ago(r.weeksAgo)}</div>
                </div>
              </div>
              <Stars rating={r.rating} />
              <p style={{ fontFamily: FONT, fontSize: "0.95rem", color: TEXT, lineHeight: 1.6, margin: 0 }}>
                &ldquo;{r.text}&rdquo;
              </p>
            </article>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", marginTop: "2.25rem", flexWrap: "wrap" }}>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: FONT, fontWeight: 600, fontSize: "0.95rem", color: "#fff", background: TEAL, padding: "0.7rem 1.4rem", borderRadius: R, textDecoration: "none" }}>
            {t.see}
          </a>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: FONT, fontWeight: 600, fontSize: "0.95rem", color: TEAL, background: "transparent", padding: "0.7rem 1.4rem", borderRadius: R, textDecoration: "none", border: `1.5px solid ${SAGE}` }}>
            {t.leave}
          </a>
        </div>
      </div>
    </section>
  );
}
