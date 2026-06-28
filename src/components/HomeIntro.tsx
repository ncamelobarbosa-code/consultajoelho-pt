// Bloco entre o vídeo e os capítulos: três palavras (Experiência — Ciência — Excelência)
// no mesmo formato dos nomes das cidades. Centrado a meio caminho (padding igual em cima/baixo,
// definido em polish.css .home-intro).

type Lang = "pt" | "en" | "ru";

const FONT = "'Space Grotesk', sans-serif";

const COPY: Record<Lang, string[]> = {
  pt: ["Experiência", "Ciência", "Excelência"],
  en: ["Experience", "Science", "Excellence"],
  ru: ["Опыт", "Наука", "Совершенство"],
};

export default function HomeIntro({ lang = "pt" }: { lang?: Lang }) {
  const words = COPY[lang];
  return (
    <section className="home-intro">
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0.3rem 0.6rem" }}>
        {words.map((w, i) => (
          <span key={w} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem 0.6rem" }}>
            {i > 0 && <span aria-hidden style={{ color: "var(--border)", fontWeight: 300 }}>—</span>}
            <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(1rem, 3vw, 1.6rem)", letterSpacing: "-0.01em", color: "var(--teal)" }}>{w}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
