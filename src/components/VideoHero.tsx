// Hero com vídeo de fundo (vídeo de apresentação no YouTube, muted/loop/coberto).
// Estilo "London Cartilage": vídeo + gradiente escuro + título sans bold + 2 CTAs.

const VIDEO_ID = "Vh1wpwR0XTM";

type Lang = "pt" | "en" | "ru";

const COPY: Record<Lang, {
  eyebrow: string; titleA: string; titleB: string; tagline: string; sub: string;
  cta1: string; cta1href: string; cta2: string; cta2href: string;
}> = {
  pt: {
    eyebrow: "Subespecialista Exclusivo de Joelho · Porto",
    titleA: "Bem-vindo à", titleB: "Consulta de Joelho",
    tagline: "Experiência · Ciência · Excelência",
    sub: "Diagnóstico preciso. Tratamento personalizado. Do conservador à cirurgia minimamente invasiva. Porto, Paços de Ferreira e Vila do Conde.",
    cta1: "Agendar Consulta", cta1href: "/contacto",
    cta2: "Avaliar o Meu Joelho", cta2href: "/avaliar",
  },
  en: {
    eyebrow: "Exclusive Knee Subspecialist · Porto",
    titleA: "Welcome to", titleB: "the Knee Clinic",
    tagline: "Experience · Science · Excellence",
    sub: "Accurate diagnosis. Personalised treatment. From conservative care to minimally invasive surgery. Porto, Paços de Ferreira and Vila do Conde.",
    cta1: "Book Appointment", cta1href: "/en/contacto",
    cta2: "Assess My Knee", cta2href: "/en/avaliar",
  },
  ru: {
    eyebrow: "Узкая специализация только по колену · Порту",
    titleA: "Добро пожаловать в", titleB: "Клинику коленного сустава",
    tagline: "Опыт · Наука · Совершенство",
    sub: "Точная диагностика. Индивидуальное лечение. От консервативной помощи до малоинвазивной хирургии. Порту, Paços de Ferreira и Vila do Conde.",
    cta1: "Записаться на приём", cta1href: "/ru/contacto",
    cta2: "Оценить моё колено", cta2href: "/ru/avaliar",
  },
};

export default function VideoHero({ lang = "pt" }: { lang?: Lang }) {
  const t = COPY[lang];
  const src =
    `https://www.youtube-nocookie.com/embed/${VIDEO_ID}` +
    `?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&modestbranding=1` +
    `&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`;

  return (
    <section className="vhero" aria-label={`${t.titleA} ${t.titleB}`}>
      <div className="vhero-bg" aria-hidden="true">
        <iframe
          src={src}
          title=""
          tabIndex={-1}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="vhero-scrim" aria-hidden="true" />
      <div className="vhero-content">
        <span className="vhero-eyebrow">{t.eyebrow}</span>
        <h1 className="vhero-title">
          {t.titleA} <span>{t.titleB}</span>
        </h1>
        <p className="vhero-tag">{t.tagline}</p>
        <p className="vhero-sub">{t.sub}</p>
        <div className="vhero-ctas">
          <a className="vhero-cta vhero-cta--primary" href={t.cta1href}>{t.cta1}</a>
          <a className="vhero-cta vhero-cta--ghost" href={t.cta2href}>{t.cta2} →</a>
        </div>
      </div>
    </section>
  );
}
