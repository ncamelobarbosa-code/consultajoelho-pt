import type { Metadata } from "next";

// Página transacional (aberta a partir do email) — fora do índice do Google.
export const metadata: Metadata = {
  title: "Obrigado | Consulta Joelho",
  robots: { index: false, follow: false },
};

// Design tokens
const TEAL = "#035772";
const BG = "#F6F9F5";
const TEXT = "#091405";
const FONT = "'Space Grotesk', sans-serif";

export default function ConfirmarPage() {
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
          Obrigado pela sua confirmação
        </h1>
        <p style={{ fontFamily: FONT, color: TEXT, fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
          Recebemos a sua resposta. A nossa equipa está a acompanhar o seu processo — até breve na
          consulta.
        </p>
      </div>
    </main>
  );
}
