"use client";

// Hero com vídeo de fundo (vídeo de apresentação self-hosted, muted/loop/coberto, abrandado).
// Estilo "London Cartilage": vídeo + gradiente escuro + título sans bold + 2 CTAs.

import { useEffect, useRef } from "react";

const PLAYBACK_RATE = 0.5; // abranda o vídeo para um fundo mais calmo/ambiente

type Lang = "pt" | "en" | "ru";

const COPY: Record<Lang, {
  eyebrow: string; titleA: string; titleB: string; tagline: string; sub: string;
  cta1: string; cta1href: string; cta2: string; cta2href: string;
}> = {
  pt: {
    eyebrow: "", titleA: "Consulta de", titleB: "Joelho",
    tagline: "", sub: "",
    cta1: "Agendar Consulta", cta1href: "/contacto",
    cta2: "Avaliar o Meu Joelho", cta2href: "/avaliar",
  },
  en: {
    eyebrow: "", titleA: "Knee", titleB: "Clinic",
    tagline: "", sub: "",
    cta1: "Book Appointment", cta1href: "/en/contacto",
    cta2: "Assess My Knee", cta2href: "/en/avaliar",
  },
  ru: {
    eyebrow: "", titleA: "Клиника", titleB: "колена",
    tagline: "", sub: "",
    cta1: "Записаться на приём", cta1href: "/ru/contacto",
    cta2: "Оценить моё колено", cta2href: "/ru/avaliar",
  },
};

// Vídeo de apresentação self-hosted (muted/loop) com a foto do Dr. como poster/fallback.
const HERO_POSTER =
  "https://static.wixstatic.com/media/5a9db7_ed36d169621d439994f603e7c6be49c1~mv2.jpg/v1/crop/x_244,y_0,w_3702,h_4480/fill/w_1200,h_1400,al_c,q_85,enc_avif,quality_auto/2Z2A9956.jpg";

export default function VideoHero({ lang = "pt" }: { lang?: Lang }) {
  const t = COPY[lang];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // iOS/Android: o autoplay só é permitido com muted real no DOM (o atributo do React
    // nem sempre é refletido) + playsInline. Forçamos e pedimos play() explicitamente.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    const setRate = () => { try { v.playbackRate = PLAYBACK_RATE; } catch {} };
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    setRate();
    tryPlay();
    const onReady = () => { setRate(); tryPlay(); };
    v.addEventListener("loadeddata", onReady);
    v.addEventListener("canplay", tryPlay);
    // Alguns browsers móveis pausam ao voltar à tab/scroll — retomar quando visível.
    const onVisible = () => { if (document.visibilityState === "visible") tryPlay(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      v.removeEventListener("loadeddata", onReady);
      v.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="vhero" aria-label={`${t.titleA} ${t.titleB}`}>
      <div className="vhero-bg" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER}
        >
          <source src="/video/presentation.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="vhero-scrim" aria-hidden="true" />
      <div className="vhero-content">
        {t.eyebrow && <span className="vhero-eyebrow">{t.eyebrow}</span>}
        <h1 className="vhero-title">
          {t.titleA} <span>{t.titleB}</span>
        </h1>
        {t.tagline && <p className="vhero-tag">{t.tagline}</p>}
        {t.sub && <p className="vhero-sub">{t.sub}</p>}
        <div className="vhero-ctas">
          <a className="vhero-cta vhero-cta--primary" href={t.cta2href}>{t.cta2} →</a>
        </div>
      </div>
    </section>
  );
}
