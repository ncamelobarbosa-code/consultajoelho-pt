// Embed YouTube responsivo (16:9 normal / 9:16 Short), privacy-friendly (nocookie), lazy.

export default function YouTubeEmbed({
  id,
  short = false,
  title,
}: {
  id: string;
  short?: boolean;
  title: string;
}) {
  return (
    <div style={{ width: "100%", maxWidth: short ? "360px" : "100%", margin: "0 auto" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: short ? "9 / 16" : "16 / 9",
          borderRadius: "var(--r)",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerated-sensors; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>
    </div>
  );
}
