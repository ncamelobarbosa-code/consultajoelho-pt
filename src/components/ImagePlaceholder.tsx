// Placeholder reutilizável para locais onde haverá foto real.
// Fundo #035772 (teal-main) conforme especificação. Substituir por
// next/image quando as fotografias estiverem disponíveis.

export default function ImagePlaceholder({
  label = "Fotografia",
  className = "",
  aspect = "aspect-[4/3]",
}: {
  label?: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-card bg-brand shadow-card ${aspect} ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-deeper" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="relative h-10 w-10 text-white/30"
        aria-hidden="true"
      >
        <path
          d="M3 16l5-5 4 4 3-3 6 6M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
