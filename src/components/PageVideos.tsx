// Secção de vídeo por página (injetada via port). Devolve null se a página não tem vídeos.
import YouTubeEmbed from "./YouTubeEmbed";
import { PAGE_VIDEOS, VIDEOS, SECTION_HEADINGS, type Lang } from "@/lib/videos";

const FONT = "'Space Grotesk', sans-serif";

export default function PageVideos({ slug, lang = "pt" }: { slug: string; lang?: Lang }) {
  const conf = PAGE_VIDEOS[slug];
  if (!conf) return null;
  const vids = conf.videos.map((k) => VIDEOS[k]).filter(Boolean);
  if (!vids.length) return null;
  const heading = SECTION_HEADINGS[conf.heading][lang];

  return (
    <section aria-label={heading} style={{ background: "var(--bg)", padding: "3.5rem 1.5rem", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: FONT, fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, color: "var(--teal)", textAlign: "center", margin: "0 0 2rem" }}>
          {heading}
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center", alignItems: "flex-start" }}>
          {vids.map((v, i) => (
            <figure key={v.id || v.src || i} style={{ margin: 0, width: "100%", maxWidth: v.short ? "360px" : "720px" }}>
              {v.src ? (
                <video
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: "100%", borderRadius: "var(--r)", background: "#000", display: "block" }}
                >
                  <source src={v.src} type="video/mp4" />
                </video>
              ) : (
                <YouTubeEmbed id={v.id!} short={v.short} title={v.title[lang]} />
              )}
              <figcaption style={{ fontFamily: FONT, fontSize: "0.9rem", color: "var(--muted)", textAlign: "center", marginTop: "0.65rem" }}>
                {v.title[lang]}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
