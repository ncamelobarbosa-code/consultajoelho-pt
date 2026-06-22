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

const STRINGS = {
  pt: { home: "Início", author: "", cta: "Marque a sua consulta", sub: "Resposta em menos de 24 horas.", btn: "Avaliar o meu joelho", contact: "/avaliar", root: "/" },
  en: { home: "Home", author: "Knee Surgeon", cta: "Book your consultation", sub: "Reply within 24 hours.", btn: "Contact us", contact: "/en/contacto", root: "/en" },
  ru: { home: "Главная", author: "Хирург коленного сустава", cta: "Запишитесь на приём", sub: "Ответ в течение 24 часов.", btn: "Связаться с нами", contact: "/ru/contacto", root: "/ru" },
} as const;

export default function PortedArticle({
  slug,
  lang,
  title: titleOverride,
  description: descOverride,
}: {
  slug: string;
  lang?: "pt" | "en" | "ru";
  title?: string;
  description?: string;
}) {
  const meta = pages[slug as PageSlug] as PageMeta | undefined;
  const locale: "pt" | "en" | "ru" = lang || (meta?.lang === "en" ? "en" : "pt");
  const data = getScraped(slug, locale);
  if (!data) return null;

  const title = titleOverride || cleanTitle(data.title);
  const description = descOverride ?? data.description;
  const t = STRINGS[locale];
  const author = locale === "pt" ? site.role : t.author;

  return (
    <article>
      <header className="pa-hero">
        <div className="pa-hero-inner">
          <nav className="pa-breadcrumb" aria-label="Breadcrumb">
            <a href={t.root}>{t.home}</a> / {title}
          </nav>
          <h1>{title}</h1>
          {description && <p className="pa-lead">{description}</p>}
          <p className="pa-author">
            {site.doctor} · {author}
          </p>
        </div>
      </header>

      <div className="pa-body">{renderBlocks(data.blocks)}</div>

      <section className="pa-cta">
        <h2>{t.cta}</h2>
        <p>{t.sub}</p>
        <a href={t.contact}>{t.btn}</a>
      </section>
    </article>
  );
}
