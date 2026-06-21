import type { Metadata } from "next";
import { site, locations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agendar Consulta | Dr. Nuno Camelo",
  description:
    "Marque a sua consulta de joelho com o Dr. Nuno Camelo. Resposta em menos de 24 horas. SIGIC, subsistemas de saúde e particular em todas as unidades.",
  alternates: { canonical: "/agendamentonunocameloespecialistajoelho" },
};

const mapsSrc = (q: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

const contactCard: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  padding: "24px",
  border: "1px solid var(--border)",
  borderRadius: "var(--r)",
  background: "var(--white)",
  textDecoration: "none",
};

export default function Page() {
  return (
    <article>
      <header className="pa-hero">
        <div className="pa-hero-inner">
          <nav className="pa-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Início</a> / Agendar Consulta
          </nav>
          <h1>Agendar Consulta</h1>
          <p className="pa-lead">
            Resposta em menos de 24 horas. SIGIC, subsistemas de saúde e
            particular em todas as unidades.
          </p>
          <p className="pa-author">
            {site.doctor} · {site.role}
          </p>
        </div>
      </header>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "48px 24px" }}>
        {/* Contactos diretos */}
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          <a href={site.phoneHref} style={contactCard}>
            <span style={{ fontSize: "1.6rem" }}>📞</span>
            <strong style={{ color: "var(--text)" }}>Telefone / WhatsApp</strong>
            <span style={{ color: "var(--teal)", fontWeight: 700, fontSize: "1.15rem" }}>
              {site.phone}
            </span>
          </a>
          <a href={site.emailHref} style={contactCard}>
            <span style={{ fontSize: "1.6rem" }}>✉️</span>
            <strong style={{ color: "var(--text)" }}>Email</strong>
            <span style={{ color: "var(--teal)", fontWeight: 700 }}>{site.email}</span>
          </a>
        </div>

        {/* Como agendar */}
        <h2
          style={{
            marginTop: 44,
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--teal)",
          }}
        >
          Como agendar
        </h2>
        <p style={{ marginTop: 12, color: "var(--text)", lineHeight: 1.8 }}>
          Ligue ou envie email indicando a unidade onde prefere ser atendido e
          uma breve descrição do motivo da consulta. Confirmamos consigo o dia e
          a hora. Se tem um vale SIGIC, indique-o no contacto.
        </p>

        {/* Locais */}
        <h2
          style={{
            marginTop: 44,
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--teal)",
          }}
        >
          Onde
        </h2>
        <div
          style={{
            marginTop: 16,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {locations.map((l) => (
            <div
              key={l.name}
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--r)",
                overflow: "hidden",
                background: "var(--white)",
              }}
            >
              <iframe
                src={mapsSrc(l.name)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa — ${l.name}`}
                style={{ width: "100%", height: 150, border: 0, display: "block" }}
              />
              <div style={{ padding: "16px 18px" }}>
                <strong style={{ color: "var(--teal)", fontSize: ".98rem" }}>
                  {l.name}
                </strong>
                <p style={{ color: "var(--muted)", fontSize: ".85rem", marginTop: 4 }}>
                  {l.address}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 18, color: "var(--muted)", fontSize: ".9rem" }}>
          SIGIC · subsistemas de saúde · particular — em todas as unidades.
        </p>
      </div>
    </article>
  );
}
