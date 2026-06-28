// Bloco de introdução entre o vídeo do hero e os capítulos (secções).
// O espaçamento de 5cm (acima) está em polish.css (.home-intro), com redução no mobile.

type Lang = "pt" | "en" | "ru";

const FONT = "'Space Grotesk', sans-serif";

const COPY: Record<Lang, { title: string; tagline: string }> = {
  pt: { title: "Consulta de Joelho", tagline: "Experiência · Ciência · Excelência" },
  en: { title: "Knee Clinic", tagline: "Experience · Science · Excellence" },
  ru: { title: "Клиника колена", tagline: "Опыт · Наука · Совершенство" },
};

export default function HomeIntro({ lang = "pt" }: { lang?: Lang }) {
  const c = COPY[lang];
  return (
    <section className="home-intro">
      <h2 style={{ fontFamily: FONT, fontWeight: 700, fontSize: "clamp(1.7rem, 4vw, 2.6rem)", color: "var(--teal)", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.1 }}>
        {c.title}
      </h2>
      <p style={{ fontFamily: FONT, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--muted)", marginTop: "0.7rem", fontSize: "0.85rem", fontWeight: 600 }}>
        {c.tagline}
      </p>
    </section>
  );
}
