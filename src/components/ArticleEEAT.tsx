// Rodapé E-E-A-T para as páginas "scraped" (PortedArticle): Referências + caixa de autor + JSON-LD.
// Alinha estas páginas com as do pipeline (author box / dateModified / reviewedBy / citation).
import { site } from "@/lib/site";

type Locale = "pt" | "en" | "ru";

const DOCTOR = "Dr. Nuno Camelo Barbosa";
const DOCTOR_URL = "https://www.consultajoelho.pt/nuno-camelo-especialista-cirurgia-joelho";
const REVIEW_ISO = "2026-07-24";
const REVIEW_HUMAN: Record<Locale, string> = { pt: "24 de julho de 2026", en: "24 July 2026", ru: "24 июля 2026 г." };
const REVIEW_LABEL: Record<Locale, string> = { pt: "Última revisão médica", en: "Last medically reviewed", ru: "Последняя медицинская проверка" };
const SAMEAS = [
  "https://orcid.org/0000-0002-7443-4085",
  "https://www.researchgate.net/profile/Nuno-Camelo-Barbosa",
  "https://scholar.google.com/citations?user=iTCpAfYAAAAJ",
  "https://linkedin.com/in/nuno-camelo-barbosa-07b37277",
];

const AUTHOR: Record<Locale, { role: string; cred: string; profile: string; book: string }> = {
  pt: { role: "Cirurgião ortopédico · Subespecialista em cirurgia do joelho", cred: "Revisor científico (AJSM · KSSTA · OJSM · JEO)", profile: "Ver perfil completo", book: "Marcar consulta" },
  en: { role: "Orthopaedic surgeon · Knee surgery subspecialty", cred: "Peer reviewer (AJSM · KSSTA · OJSM · JEO)", profile: "Full profile", book: "Book appointment" },
  ru: { role: "Хирург-ортопед · Специализация на хирургии колена", cred: "Научный рецензент (AJSM · KSSTA · OJSM · JEO)", profile: "Полный профиль", book: "Записаться" },
};

const REFS_HEADING: Record<Locale, string> = { pt: "Referências", en: "References", ru: "Литература" };
const REFS_NOTE: Record<Locale, string> = {
  pt: "Guidelines de sociedades científicas e revisões que sustentam esta informação.",
  en: "Clinical guidelines and scientific reviews supporting this information.",
  ru: "Клинические рекомендации и научные обзоры, подтверждающие эту информацию.",
};

const REFERENCES: Record<string, { t: string; u: string }[]> = {
  "tendao-rotuliano-tendinite-drnunocamelo": [
    { t: "Management of patellar tendinopathy: systematic review and network meta-analysis of randomised studies, 2021.", u: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8634001/" },
    { t: "Patellar Tendinopathy: Clinical Diagnosis, Load Management and Advice. J Orthop Sports Phys Ther, 2015.", u: "https://www.jospt.org/doi/pdf/10.2519/jospt.2015.5987" },
  ],
  "liquidojoelho-artrocentese-drnunocamelo": [
    { t: "Knee Arthrocentesis. StatPearls (NCBI Bookshelf).", u: "https://www.ncbi.nlm.nih.gov/books/NBK470229/" },
    { t: "Knee Joint Aspiration and Injection. American Family Physician, 2002.", u: "https://www.aafp.org/pubs/afp/issues/2002/1015/p1497.html" },
  ],
  "entorsejoelho-drnunocamelo": [
    { t: "Validation of the Ottawa Knee Rule in adults (imagiologia na entorse aguda do joelho).", u: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7476189/" },
    { t: "AAOS Clinical Practice Guideline — Management of Anterior Cruciate Ligament Injuries, 2022.", u: "https://www.aaos.org/aaos-home/newsroom/press-releases/aaos-updates-guideline-for-management-of-acl-injuries/" },
  ],
};

const box: React.CSSProperties = {
  maxWidth: 900,
  margin: "2.5rem auto 0",
  padding: "1.3rem 1.5rem",
  border: "1px solid var(--border, #e2ece1)",
  borderRadius: 14,
  fontFamily: "'Space Grotesk', sans-serif",
};

export default function ArticleEEAT({ slug, locale, title }: { slug: string; locale: Locale; title: string }) {
  const url = locale === "pt" ? `${site.url}/${slug}` : `${site.url}/${locale}/${slug}`;
  const pfx = locale === "pt" ? "" : `/${locale}`;
  const refs = REFERENCES[slug] || [];
  const a = AUTHOR[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    url,
    dateModified: REVIEW_ISO,
    lastReviewed: REVIEW_ISO,
    reviewedBy: { "@type": "Physician", name: DOCTOR, url: DOCTOR_URL, medicalSpecialty: "Orthopedic", sameAs: SAMEAS },
    ...(refs.length ? { citation: refs.map((r) => r.u) } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {refs.length > 0 && (
        <section className="references" style={box}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--teal, #035772)", margin: "0 0 .3rem" }}>{REFS_HEADING[locale]}</h2>
          <p style={{ fontSize: ".8rem", color: "var(--muted, #6b7280)", margin: "0 0 .8rem" }}>{REFS_NOTE[locale]}</p>
          <ol style={{ margin: 0, paddingLeft: "1.2rem", fontSize: ".85rem", color: "var(--text, #091405)", lineHeight: 1.5 }}>
            {refs.map((r) => (
              <li key={r.u} style={{ marginBottom: ".5rem" }}>
                <a href={r.u} target="_blank" rel="noopener" style={{ color: "var(--teal, #035772)", textDecoration: "none" }}>{r.t}</a>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="author-box" style={{ ...box, marginTop: "2.75rem", padding: "1.4rem 1.5rem", background: "var(--bg, #f6f9f5)", display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
        <img src="/img/dr-nuno-camelo.jpg" alt={DOCTOR} width={86} height={86} loading="lazy" style={{ width: 86, height: 86, borderRadius: "50%", objectFit: "cover", objectPosition: "center 30%", flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 230 }}>
          <div style={{ fontWeight: 700, color: "var(--teal, #035772)", fontSize: "1.05rem" }}>{DOCTOR}</div>
          <div style={{ color: "var(--text, #091405)", fontSize: ".9rem", marginTop: ".15rem" }}>{a.role}</div>
          <div style={{ color: "var(--muted, #6b7280)", fontSize: ".82rem", marginTop: ".3rem" }}>{a.cred}</div>
          <div style={{ color: "var(--muted, #6b7280)", fontSize: ".8rem", marginTop: ".5rem" }}>
            {REVIEW_LABEL[locale]}: <strong style={{ color: "var(--teal, #035772)", fontWeight: 600 }}>{REVIEW_HUMAN[locale]}</strong>
          </div>
          <div style={{ marginTop: ".7rem", fontSize: ".85rem" }}>
            <a href={`${pfx}/nuno-camelo-especialista-cirurgia-joelho`} style={{ color: "var(--teal, #035772)", fontWeight: 600, textDecoration: "none" }}>{a.profile}</a>
            {"  ·  "}
            <a href={`${pfx}/marcar-consulta`} style={{ color: "var(--teal, #035772)", fontWeight: 600, textDecoration: "none" }}>{a.book} →</a>
          </div>
        </div>
      </div>
    </>
  );
}
