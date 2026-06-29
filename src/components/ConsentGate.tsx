"use client";

// Consentimento de cookies (RGPD): GA4 + Google Ads só carregam APÓS "Aceitar".
// Uma única tag gtag.js configura ambos os ids (G-... e AW-...).
// O Vercel Analytics (sem cookies) fica sempre ativo no layout, fora deste gate.
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const ADS_ID = "AW-859136288"; // Google Ads

type Lang = "pt" | "en" | "ru";

const STR: Record<Lang, { text: string; accept: string; decline: string; privacy?: string }> = {
  pt: {
    text: "Usamos cookies para análise de tráfego (Google Analytics) e melhorar o site. Pode aceitar ou recusar.",
    accept: "Aceitar",
    decline: "Recusar",
  },
  en: {
    text: "We use cookies for traffic analytics (Google Analytics) to improve the site. You can accept or decline.",
    accept: "Accept",
    decline: "Decline",
  },
  ru: {
    text: "Мы используем файлы cookie для аналитики (Google Analytics), чтобы улучшать сайт. Вы можете принять или отклонить.",
    accept: "Принять",
    decline: "Отклонить",
  },
};

function localeOf(p: string): Lang {
  if (p === "/en" || p.startsWith("/en/")) return "en";
  if (p === "/ru" || p.startsWith("/ru/")) return "ru";
  return "pt";
}

const KEY = "cj-consent";
const FONT = "'Space Grotesk', sans-serif";

export default function ConsentGate({ gaId }: { gaId: string }) {
  // "loading" enquanto não lemos o localStorage (evita mismatch de hidratação)
  const [consent, setConsent] = useState<"granted" | "denied" | "ask" | "loading">("loading");

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      setConsent(v === "granted" ? "granted" : v === "denied" ? "denied" : "ask");
    } catch {
      setConsent("ask");
    }
  }, []);

  const choose = (v: "granted" | "denied") => {
    try { localStorage.setItem(KEY, v); } catch {}
    setConsent(v);
  };

  const pathname = usePathname() || "/";
  const t = STR[localeOf(pathname)];

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
gtag('config', '${ADS_ID}');`}
          </Script>
        </>
      )}

      {consent === "ask" && (
        <div
          role="dialog"
          aria-label="Cookies"
          style={{
            position: "fixed", left: "1rem", right: "1rem", bottom: "1rem", zIndex: 2000,
            maxWidth: "720px", margin: "0 auto",
            background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--r)",
            boxShadow: "0 12px 40px rgba(2,45,61,0.18)",
            padding: "1rem 1.2rem",
            display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.9rem", justifyContent: "space-between",
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: "0.86rem", color: "var(--text)", margin: 0, flex: "1 1 280px", lineHeight: 1.5 }}>
            {t.text}
          </p>
          <div style={{ display: "flex", gap: "0.6rem", flexShrink: 0 }}>
            <button
              onClick={() => choose("denied")}
              style={{ fontFamily: FONT, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", color: "var(--teal)", background: "transparent", border: "1.5px solid var(--border)", borderRadius: "8px", padding: "0.55rem 1.1rem" }}
            >
              {t.decline}
            </button>
            <button
              onClick={() => choose("granted")}
              style={{ fontFamily: FONT, fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", color: "#fff", background: "var(--teal)", border: "1.5px solid var(--teal)", borderRadius: "8px", padding: "0.55rem 1.2rem" }}
            >
              {t.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
