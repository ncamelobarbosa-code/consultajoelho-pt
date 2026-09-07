import { getEvidencia, pubmedUrl, type Referencia } from "@/lib/evidencia";
import { site } from "@/lib/site";

// Bloco "Evidência científica" + FAQ acrescentada pelo agente mensal de literatura.
//
// Desenho deliberado:
// - Usa <details>/<summary> em vez de JS. Não colide com o toggleFaq() das páginas,
//   funciona sem hidratação e o texto fica sempre no HTML para o Googlebot.
// - Estilos com prefixo .ev- para não herdar nem contaminar o CSS da página.
// - Emite MedicalWebPage com lastReviewed/reviewedBy — sinal E-E-A-T que as
//   diretrizes YMYL do Google valorizam e que a concorrência local não tem.

const css = `
.ev-wrap { max-width: 900px; margin: 56px auto; padding: 0 24px; }
.ev-label { font-size: .75rem; text-transform: uppercase; letter-spacing: .12em; color: #035772; font-weight: 600; margin-bottom: 8px; }
.ev-title { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 700; margin-bottom: 10px; color: #091405; }
.ev-lead { font-size: .95rem; color: #3d5240; max-width: 680px; margin-bottom: 28px; }
.ev-faq { margin-bottom: 40px; }
.ev-item { border-bottom: 1px solid #dde8dd; }
.ev-item > summary { list-style: none; cursor: pointer; padding: 18px 4px; font-size: .95rem; font-weight: 600; color: #091405; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.ev-item > summary::-webkit-details-marker { display: none; }
.ev-item > summary::after { content: '\\25BC'; color: #035772; font-size: .8rem; transition: transform .2s; flex-shrink: 0; }
.ev-item[open] > summary::after { transform: rotate(180deg); }
.ev-item .ev-a { padding: 0 4px 18px; font-size: .9rem; color: #3d5240; line-height: 1.7; }
.ev-cite { display: inline-block; margin-left: 4px; font-size: .78rem; color: #035772; text-decoration: none; font-weight: 600; vertical-align: super; }
.ev-cite:hover { text-decoration: underline; }
.ev-refs { background: #fff; border: 1px solid #dde8dd; border-radius: 16px; padding: 28px 32px; }
.ev-refs h3 { font-size: 1rem; font-weight: 700; color: #035772; margin-bottom: 6px; }
.ev-meta { font-size: .78rem; color: #5a6e5a; margin-bottom: 20px; }
.ev-list { list-style: none; padding: 0; margin: 0; counter-reset: ev; }
.ev-ref { counter-increment: ev; position: relative; padding: 14px 0 14px 34px; border-top: 1px solid #eef4ee; }
.ev-ref:first-child { border-top: none; }
.ev-ref::before { content: counter(ev); position: absolute; left: 0; top: 15px; width: 22px; height: 22px; border-radius: 50%; background: #e8f4f8; color: #035772; font-size: .72rem; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.ev-ref .ev-t { font-size: .88rem; font-weight: 600; color: #091405; line-height: 1.45; }
.ev-ref .ev-src { font-size: .8rem; color: #4a5e4a; margin-top: 4px; }
.ev-ref .ev-sum { font-size: .84rem; color: #3d5240; margin-top: 8px; line-height: 1.6; }
.ev-tag { display: inline-block; background: #e8f4f8; color: #035772; border-radius: 20px; padding: 2px 10px; font-size: .68rem; font-weight: 700; margin-left: 8px; text-transform: uppercase; letter-spacing: .04em; }
.ev-link { color: #035772; font-weight: 600; text-decoration: none; font-size: .8rem; }
.ev-link:hover { text-decoration: underline; }
.ev-disc { margin-top: 22px; padding-top: 16px; border-top: 1px solid #eef4ee; font-size: .76rem; color: #5a6e5a; line-height: 1.6; }
@media (max-width: 640px) { .ev-refs { padding: 22px 18px; } }
`;

function fonte(r: Referencia): string {
  return `${r.autores} ${r.revista}. ${r.ano}.`;
}

type No = Record<string, unknown>;

export default function Evidencia({
  slug,
  pageUrl,
  baseJsonLd,
}: {
  slug: string;
  /** URL canónico da página. */
  pageUrl: string;
  /**
   * A string `jsonLd` da própria página. Quando é passada, este componente
   * FUNDE-SE nela e emite um único bloco — a página deixa de emitir o seu.
   *
   * Sem isto ficavam dois nós MedicalWebPage e dois FAQPage na mesma página, o que
   * é ambíguo para o Google. Se a string não fizer parse, emitimos um bloco
   * separado em vez de partir a página.
   */
  baseJsonLd?: string;
}) {
  const ev = getEvidencia(slug);
  if (!ev || (ev.referencias.length === 0 && ev.faq.length === 0)) return null;

  const indice = new Map(ev.referencias.map((r, i) => [r.id, i + 1]));

  const citacoes = ev.referencias.map((r) => ({
    "@type": "ScholarlyArticle",
    name: r.titulo,
    datePublished: String(r.ano),
    isPartOf: { "@type": "Periodical", name: r.revista },
    ...(r.doi ? { sameAs: `https://doi.org/${r.doi}` } : {}),
    ...(r.pmid ? { identifier: `PMID:${r.pmid}` } : {}),
  }));

  const perguntas = ev.faq.map((f) => ({
    "@type": "Question",
    name: f.pergunta,
    acceptedAnswer: { "@type": "Answer", text: f.resposta },
  }));

  let base: { "@context"?: string; "@graph"?: No[] } | null = null;
  if (baseJsonLd) {
    try {
      const p = JSON.parse(baseJsonLd);
      if (Array.isArray(p?.["@graph"])) base = p;
    } catch {
      base = null;
    }
  }

  let jsonLd: unknown;

  if (base) {
    const grafo = base["@graph"] as No[];
    const pagina = grafo.find((n) => n["@type"] === "MedicalWebPage");
    const faqPage = grafo.find((n) => n["@type"] === "FAQPage");

    if (pagina) {
      const antigas = Array.isArray(pagina.citation) ? pagina.citation : [];
      pagina.citation = [...antigas, ...citacoes];
      pagina.lastReviewed = ev.atualizado;
      pagina.dateModified = ev.atualizado;
      // O `url` herdado apontava para o slug antigo (fonte de um 301). O canónico
      // é o que o Google deve ver.
      pagina.url = pageUrl;
      // `mainEntity` no MedicalWebPage duplicava o FAQPage. As perguntas vivem no
      // FAQPage; aqui só atrapalhavam.
      delete pagina.mainEntity;
    }

    if (faqPage && perguntas.length) {
      const antigas = Array.isArray(faqPage.mainEntity) ? faqPage.mainEntity : [];
      faqPage.mainEntity = [...antigas, ...perguntas];
    } else if (perguntas.length) {
      grafo.push({ "@type": "FAQPage", mainEntity: perguntas });
    }

    jsonLd = base;
  } else {
    jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "MedicalWebPage",
          "@id": `${pageUrl}#evidencia`,
          url: pageUrl,
          lastReviewed: ev.atualizado,
          dateModified: ev.atualizado,
          reviewedBy: {
            "@type": "Physician",
            name: ev.revistoPor,
            medicalSpecialty: "Orthopedic",
            url: `${site.url}/nuno-camelo-especialista-cirurgia-joelho`,
          },
          citation: citacoes,
        },
        ...(perguntas.length
          ? [{ "@type": "FAQPage", "@id": `${pageUrl}#faq`, mainEntity: perguntas }]
          : []),
      ],
    };
  }

  const dataPt = new Date(ev.atualizado).toLocaleDateString("pt-PT", {
    year: "numeric",
    month: "long",
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="ev-wrap" aria-labelledby="ev-h">
        <div className="ev-label">Evidência científica</div>
        <h2 className="ev-title" id="ev-h">
          O Que Diz a Literatura Mais Recente
        </h2>
        <p className="ev-lead">
          Esta secção é revista periodicamente à luz dos estudos de maior nível de
          evidência — meta-análises, revisões sistemáticas, ensaios aleatorizados e
          normas de sociedades científicas.
        </p>

        {ev.faq.length > 0 && (
          <div className="ev-faq">
            {ev.faq.map((f) => (
              <details className="ev-item" key={f.pergunta}>
                <summary>{f.pergunta}</summary>
                <div className="ev-a">
                  {f.resposta}
                  {f.refs.map((id) =>
                    indice.has(id) ? (
                      <a className="ev-cite" href="#ev-refs" key={id}>
                        [{indice.get(id)}]
                      </a>
                    ) : null,
                  )}
                </div>
              </details>
            ))}
          </div>
        )}

        <div className="ev-refs" id="ev-refs">
          <h3>Referências</h3>
          <p className="ev-meta">
            Última revisão clínica: {dataPt} · {ev.revistoPor}
          </p>
          <ol className="ev-list">
            {ev.referencias.map((r) => {
              const url = pubmedUrl(r);
              return (
                <li className="ev-ref" key={r.id}>
                  <div className="ev-t">
                    {r.titulo}
                    <span className="ev-tag">{r.tipo}</span>
                  </div>
                  <div className="ev-src">{fonte(r)}</div>
                  <div className="ev-sum">{r.resumoPt}</div>
                  {url && (
                    <a
                      className="ev-link"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      Ver estudo ↗
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="ev-disc">
            Estas referências são material de apoio e não substituem uma avaliação
            clínica. A aplicação de qualquer destes resultados ao seu caso depende do
            exame do seu joelho.
          </p>
        </div>
      </section>
    </>
  );
}
