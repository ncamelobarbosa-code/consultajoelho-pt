// Secção final da homepage: apenas contactos em ícones (com link). Minimalista.
const TEAL = "var(--teal)";

const LINKS = [
  { label: "Telefone", href: "tel:+351926850194", icon: "M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1l-2.22 2.2Z" },
  { label: "Email", href: "mailto:joelho@consultajoelho.pt", icon: "M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm0 3.25V18h16V7.25l-8 5.25-8-5.25ZM4.5 6l7.5 4.9L19.5 6h-15Z" },
  { label: "LinkedIn", href: "https://linkedin.com/in/nuno-camelo-barbosa-07b37277", icon: "M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.95-1.8-2.95s-2.08 1.4-2.08 2.85V21H9V9Z" },
  { label: "Facebook", href: "https://www.facebook.com/npccb", icon: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" },
  { label: "ORCID", href: "https://orcid.org/0000-0002-7443-4085", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM8.06 6.56a.86.86 0 1 1 0 1.72.86.86 0 0 1 0-1.72ZM7.3 9.4h1.5v7.2H7.3V9.4Zm3 0h2.9c2.77 0 3.99 1.98 3.99 3.6 0 1.76-1.38 3.6-3.97 3.6h-2.92V9.4Zm1.5 1.36v4.48h1.31c1.87 0 2.3-1.42 2.3-2.24 0-1.33-.85-2.24-2.34-2.24h-1.27Z" },
];

export default function Contacts() {
  return (
    <section aria-label="Contactos" style={{ background: "#fff", borderTop: "1px solid var(--border)", padding: "3rem 1.5rem" }}>
      <a href="/" aria-label="ConsultaJoelho.pt" style={{ display: "block", textAlign: "center", textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.02em", marginBottom: "1.6rem" }}>
        <span style={{ color: "var(--text)" }}>Consulta</span>
        <span style={{ color: TEAL }}>Joelho</span>
        <span style={{ color: "var(--sage)" }}>.pt</span>
      </a>
      <div style={{ display: "flex", gap: "1.1rem", justifyContent: "center", flexWrap: "wrap" }}>
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            aria-label={l.label}
            title={l.label}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              width: 52, height: 52, borderRadius: "50%",
              border: "1.5px solid var(--border)", color: TEAL,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              transition: "background-color .18s ease, color .18s ease, transform .18s ease",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={l.icon} />
            </svg>
          </a>
        ))}
      </div>
    </section>
  );
}
