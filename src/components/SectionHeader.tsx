export default function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-mid">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-main md:text-3xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-3 text-base leading-relaxed text-grey-mid">{lead}</p>
      )}
    </div>
  );
}
