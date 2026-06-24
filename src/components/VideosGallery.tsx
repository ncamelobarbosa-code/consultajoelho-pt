// Galeria /videos — todos os vídeos por categoria. Trilingue via `lang`.
import YouTubeEmbed from "./YouTubeEmbed";
import { CATEGORIES, VIDEOS, VIDEOS_PAGE, type Lang } from "@/lib/videos";

const FONT = "'Space Grotesk', sans-serif";

export default function VideosGallery({ lang = "pt" }: { lang?: Lang }) {
  return (
    <main style={{ background: "var(--bg)", minHeight: "60vh", padding: "3.5rem 1.5rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h1 style={{ fontFamily: FONT, fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 700, color: "var(--teal)", margin: "0 0 0.5rem" }}>
            {VIDEOS_PAGE.title[lang]}
          </h1>
          <p style={{ fontFamily: FONT, fontSize: "1.05rem", color: "var(--muted)", margin: 0 }}>
            {VIDEOS_PAGE.intro[lang]}
          </p>
        </header>

        {CATEGORIES.map((cat) => {
          const vids = cat.videos.map((k) => VIDEOS[k]).filter(Boolean);
          if (!vids.length) return null;
          return (
            <section key={cat.key} style={{ marginTop: "3rem" }}>
              <h2 style={{ fontFamily: FONT, fontSize: "1.4rem", fontWeight: 700, color: "var(--teal)", borderBottom: "1px solid var(--border)", paddingBottom: "0.6rem", margin: "0 0 1.5rem" }}>
                {cat.label[lang]}
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", alignItems: "start", justifyItems: "center" }}>
                {vids.map((v) => (
                  <figure key={v.id} style={{ margin: 0, width: "100%", maxWidth: v.short ? "300px" : "100%" }}>
                    <YouTubeEmbed id={v.id} short={v.short} title={v.title[lang]} />
                    <figcaption style={{ fontFamily: FONT, fontSize: "0.9rem", color: "var(--muted)", textAlign: "center", marginTop: "0.65rem" }}>
                      {v.title[lang]}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
