import type { ReactNode } from "react";
import { getScraped, cleanTitle, type Block } from "@/lib/content";
import { site, pages, type PageSlug, type PageMeta } from "@/lib/site";

function renderBlocks(blocks: Block[]): ReactNode[] {
  const out: ReactNode[] = [];
  let list: string[] = [];
  let key = 0;
  const flush = () => {
    if (!list.length) return;
    const items = list;
    list = [];
    out.push(
      <ul key={`l${key++}`}>
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    );
  };
  for (const b of blocks) {
    if (b.type === "list") {
      list.push(b.text);
      continue;
    }
    flush();
    if (b.type === "heading") {
      const Tag = ((b.level ?? 3) <= 2 ? "h2" : "h3") as "h2" | "h3";
      out.push(<Tag key={`h${key++}`}>{b.text}</Tag>);
    } else {
      out.push(<p key={`p${key++}`}>{b.text}</p>);
    }
  }
  flush();
  return out;
}

export default function PortedArticle({ slug }: { slug: string }) {
  const data = getScraped(slug);
  if (!data) return null;

  const meta = pages[slug as PageSlug] as PageMeta | undefined;
  const isEn = meta?.lang === "en";
  const title = cleanTitle(data.title);

  const t = isEn
    ? { home: "Home", author: "Knee Surgeon", cta: "Book your consultation", sub: "Reply within 24 hours.", btn: "Contact us" }
    : { home: "Início", author: site.role, cta: "Marque a sua consulta", sub: "Resposta em menos de 24 horas.", btn: "Avaliar o meu joelho" };

  return (
    <article>
      <header className="pa-hero">
        <div className="pa-hero-inner">
          <nav className="pa-breadcrumb" aria-label="Breadcrumb">
            <a href="/">{t.home}</a> / {title}
          </nav>
          <h1>{title}</h1>
          {data.description && <p className="pa-lead">{data.description}</p>}
          <p className="pa-author">
            {site.doctor} · {t.author}
          </p>
        </div>
      </header>

      <div className="pa-body">{renderBlocks(data.blocks)}</div>

      <section className="pa-cta">
        <h2>{t.cta}</h2>
        <p>{t.sub}</p>
        <a href={isEn ? site.phoneHref : "/avaliar"}>{t.btn}</a>
      </section>
    </article>
  );
}
