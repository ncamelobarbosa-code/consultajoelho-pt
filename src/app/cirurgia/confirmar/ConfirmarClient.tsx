"use client";

import { useEffect, useState } from "react";

// Design tokens (conforme especificação)
const TEAL = "#035772";
const SAGE = "#AACBA8";
const BG = "#F6F9F5";
const TEXT = "#091405";
const FONT = "'Space Grotesk', sans-serif";

type State = "loading" | "success" | "error";

export default function ConfirmarClient() {
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    const processo = new URLSearchParams(window.location.search).get("processo");
    if (!processo) {
      setState("error");
      return;
    }
    let cancelled = false;
    fetch(`/api/confirmar?processo=${encodeURIComponent(processo)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setState(d && d.success ? "success" : "error");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "72vh",
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          background: "#fff",
          border: "1px solid #dde8dd",
          borderRadius: 16,
          padding: "3rem 2rem",
          textAlign: "center",
          boxShadow: "0 10px 44px rgba(3,87,114,0.10)",
        }}
      >
        {state === "loading" && (
          <>
            <div
              aria-hidden="true"
              style={{
                width: 46,
                height: 46,
                border: `4px solid ${SAGE}`,
                borderTopColor: TEAL,
                borderRadius: "50%",
                margin: "0 auto 1.4rem",
                animation: "cjspin 0.8s linear infinite",
              }}
            />
            <p style={{ fontFamily: FONT, color: TEXT, fontSize: "1rem", margin: 0 }}>
              A registar a sua confirmação…
            </p>
          </>
        )}

        {state === "success" && (
          <>
            <div
              aria-hidden="true"
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: TEAL,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                lineHeight: 1,
                margin: "0 auto 1.5rem",
              }}
            >
              ✓
            </div>
            <h1
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: "1.5rem",
                color: TEAL,
                margin: "0 0 0.7rem",
                letterSpacing: "-0.01em",
              }}
            >
              Confirmação registada
            </h1>
            <p style={{ fontFamily: FONT, color: TEXT, fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
              Obrigado, até breve na consulta.
            </p>
          </>
        )}

        {state === "error" && (
          <>
            <div
              aria-hidden="true"
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#fbeaea",
                color: "#c0392b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                lineHeight: 1,
                margin: "0 auto 1.5rem",
              }}
            >
              !
            </div>
            <h1
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: "1.3rem",
                color: TEXT,
                margin: "0 0 0.7rem",
                letterSpacing: "-0.01em",
              }}
            >
              Não foi possível registar a confirmação
            </h1>
            <p style={{ fontFamily: FONT, color: TEXT, fontSize: "1rem", lineHeight: 1.6, margin: 0 }}>
              Por favor contacte{" "}
              <a href="mailto:joelho@consultajoelho.pt" style={{ color: TEAL, fontWeight: 600 }}>
                joelho@consultajoelho.pt
              </a>
            </p>
          </>
        )}
      </div>

      <style>{`@keyframes cjspin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
