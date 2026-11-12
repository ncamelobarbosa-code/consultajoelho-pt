// Ícones SVG inline da PWA /app (sem pedidos externos; funcionam offline).
type P = { size?: number };

function Svg({ size = 22, children }: P & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export const IconKey = (p: P) => (
  <Svg {...p}><circle cx="7.5" cy="15.5" r="4.5" /><path d="m10.7 12.3 9.3-9.3M17 6l3 3M14.5 8.5l2 2" /></Svg>
);
export const IconClipboard = (p: P) => (
  <Svg {...p}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M9 11h6M9 15h4" /></Svg>
);
export const IconGauge = (p: P) => (
  <Svg {...p}><path d="M4 18a8 8 0 1 1 16 0" /><path d="m12 18 4-6" /></Svg>
);
export const IconStar = (p: P) => (
  <Svg {...p}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" /></Svg>
);
export const IconChat = (p: P) => (
  <Svg {...p}><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z" /></Svg>
);
export const IconMail = (p: P) => (
  <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Svg>
);
export const IconAlert = (p: P) => (
  <Svg {...p}><path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v4M12 17h.01" /></Svg>
);
export const IconArrow = (p: P) => (
  <Svg {...p}><path d="M7 17 17 7M9 7h8v8" /></Svg>
);
export const IconCheck = (p: P) => (
  <Svg {...p}><path d="m5 12 5 5 9-10" /></Svg>
);
export const IconPill = (p: P) => (
  <Svg {...p}><rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)" /><path d="m9.5 9.5 5 5" /></Svg>
);
export const IconSnow = (p: P) => (
  <Svg {...p}><path d="M12 2v20M4.9 6l14.2 12M19.1 6 4.9 18M9 3.5 12 6l3-2.5M9 20.5l3-2.5 3 2.5" /></Svg>
);
export const IconMuscle = (p: P) => (
  <Svg {...p}><path d="M3 12h4l3-8 4 16 3-8h4" /></Svg>
);
