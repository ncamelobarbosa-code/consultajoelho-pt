import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import PageHero from "./PageHero";
import CTAStrip from "./CTAStrip";
import RelatedPages from "./RelatedPages";
import { JsonLd, FAQ, Callout } from "./article";
import { getScraped, cleanTitle, relatedFor, type Block } from "@/lib/content";
import { medicalWebPageSchema } from "@/lib/seo";
import { pages, href, type PageSlug } from "@/lib/site";

// ── Mapeia um título de card para a página correspondente ──
const aliases: [RegExp, PageSlug][] = [
  [/parameniscais/i, "quistosparameniscaisjoelho"],
  [/quisto de baker/i, "quistobakerjoelhodrnunocamelo"],
  [/cartilagem/i, "cartilagemjoelhodrnunocamelo"],
  [/artroplastia|pr[oó]tese/i, "protesejoelhodesportodrnunocamelo"],
  [/artrocentese|l[ií]quido/i, "liquidojoelho-artrocentese-drnunocamelo"],
  [/infiltra/i, "infiltracaojoelho"],
  [/banda iliotibial/i, "sindromebandailiotibialjoelho"],
  [/tendin|rotuli/i, "tendao-rotuliano-tendinite-drnunocamelo"],
  [/ligamento cruzado|lca/i, "ligamentocruzadoanterior"],
  [/menisco/i, "meniscosnojoelho"],
  [/luxa|r[oó]tula/i, "luxacaorotulajoelho"],
  [/entorse/i, "entorsejoelho-drnunocamelo"],
  [/quadr[ií]ceps/i, "quadricepsjoelho"],
  [/gonalgia|dor no joelho/i, "joelhodrnunocamelo"],
];
function matchSlug(text: string, current: string): PageSlug | null {
  for (const [re, slug] of aliases) {
    if (re.test(text) && slug !== current) return slug;
  }
  return null;
}

function WixImage({
  src,
  alt,
  priority = false,
  aspect = "aspect-[16/9]",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  aspect?: string;
}) {
  return (
    <figure
      className={`relative w-full overflow-hidden rounded-lg bg-grey-pale ${aspect}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover"
      />
    </figure>
  );
}

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}

export default function ScrapedPageView({ slug }: { slug: string }) {
  const data = getScraped(slug);
  if (!data) return null;

  const meta = pages[slug as PageSlug];
  const title = cleanTitle(data.title);
  const inline = data.images
    .map((i) => i.url)
    .filter((u) => u && u !== data.ogImage);

  // remove blocos-título iniciais que duplicam o H1
  const titleN = norm(title);
  let start = 0;
  while (
    start < data.blocks.length &&
    data.blocks[start].type === "heading" &&
    (titleN.includes(norm(data.blocks[start].text)) ||
      norm(data.blocks[start].text).includes(titleN))
  ) {
    start++;
  }
  const blocks = data.blocks.slice(start);

  const out: ReactNode[] = [];
  let key = 0;
  let imgIdx = 0;
  let leadUsed = false;
  let sectionCount = 0;
  let i = 0;

  const pushImage = () => {
    if (imgIdx < inline.length) {
      out.push(
        <WixImage
          key={`i${key++}`}
          src={inline[imgIdx]}
          alt={`${title} — imagem ${imgIdx + 1}`}
          aspect="aspect-[16/10]"
        />
      );
      imgIdx++;
    }
  };

  while (i < blocks.length) {
    const b = blocks[i];

    // 1. Grelha de cards de subpatologias (pares h6 + texto)
    if (b.type === "heading" && (b.level ?? 0) >= 5) {
      const cards: { title: string; desc: string }[] = [];
      let j = i;
      while (
        j + 1 < blocks.length &&
        blocks[j].type === "heading" &&
        (blocks[j].level ?? 0) >= 5 &&
        blocks[j + 1].type === "text"
      ) {
        cards.push({ title: blocks[j].text, desc: blocks[j + 1].text });
        j += 2;
      }
      if (cards.length >= 2) {
        out.push(
          <div key={`cg${key++}`} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, n) => {
              const to = matchSlug(c.title, slug);
              const inner = (
                <>
                  <h3 className="font-semibold text-teal-main">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-grey-mid">
                    {c.desc}
                  </p>
                  {to && (
                    <span className="mt-3 inline-block text-sm font-medium text-teal-main">
                      Saber mais →
                    </span>
                  )}
                </>
              );
              return to ? (
                <Link
                  key={n}
                  href={href(to)}
                  className="block rounded-lg border border-grey-pale bg-white p-5 transition-colors hover:border-teal-light"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={n}
                  className="rounded-lg border border-grey-pale bg-white p-5"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        );
        i = j;
        continue;
      }
    }

    // 2. FAQ (após heading "Perguntas Frequentes")
    if (b.type === "heading" && /perguntas frequentes|faq|d[uú]vidas/i.test(b.text)) {
      sectionCount++;
      out.push(
        <h2
          key={`h${key++}`}
          className="mt-12 text-2xl font-semibold tracking-tight md:text-3xl"
        >
          {b.text}
        </h2>
      );
      i++;
      const qa: { q: string; a: ReactNode }[] = [];
      while (i < blocks.length && blocks[i].type !== "heading") {
        const cur = blocks[i];
        const next = blocks[i + 1];
        if (cur.type === "text" && /\?\s*$/.test(cur.text) && next && next.type === "text") {
          qa.push({ q: cur.text, a: next.text });
          i += 2;
        } else if (cur.type === "text") {
          out.push(
            <p key={`p${key++}`} className="leading-relaxed text-text-main/90">
              {cur.text}
            </p>
          );
          i++;
        } else {
          break;
        }
      }
      if (qa.length) out.push(<FAQ key={`faq${key++}`} items={qa} />);
      continue;
    }

    // 3. Card "Medo / Realidade"
    if (b.type === "text" && /^medo:/i.test(b.text)) {
      const split = b.text.split(/realidade:/i);
      const medo = split[0].replace(/^medo:/i, "").trim();
      const realidade = (split[1] || "").trim();
      i++;
      const body: string[] = [];
      while (i < blocks.length && blocks[i].type === "text" && !/^medo:/i.test(blocks[i].text)) {
        body.push(blocks[i].text);
        i++;
      }
      out.push(
        <div
          key={`mr${key++}`}
          className="overflow-hidden rounded-lg border border-grey-pale"
        >
          <div className="grid sm:grid-cols-2">
            <div className="bg-grey-pale p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-grey-mid">
                Medo
              </span>
              <p className="mt-1 font-medium">{medo}</p>
            </div>
            <div className="bg-sage/20 p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-teal-main">
                Realidade
              </span>
              <p className="mt-1 font-medium">{realidade}</p>
            </div>
          </div>
          {body.length > 0 && (
            <div className="space-y-3 p-5 leading-relaxed text-text-main/90">
              {body.map((t, n) => (
                <p key={n}>{t}</p>
              ))}
            </div>
          )}
        </div>
      );
      continue;
    }

    // 4. Lista (agrupa consecutivas)
    if (b.type === "list") {
      const items: string[] = [];
      while (i < blocks.length && blocks[i].type === "list") {
        items.push(blocks[i].text);
        i++;
      }
      out.push(
        <ul key={`l${key++}`} className="space-y-2.5">
          {items.map((t, n) => (
            <li key={n} className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-main"
                aria-hidden="true"
              />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 5. Título de secção
    if (b.type === "heading") {
      if (sectionCount > 0) pushImage();
      sectionCount++;
      const Tag = ((b.level ?? 3) <= 2 ? "h2" : "h3") as "h2" | "h3";
      out.push(
        <Tag
          key={`h${key++}`}
          className={
            Tag === "h2"
              ? "mt-12 border-l-2 border-sage pl-4 text-2xl font-semibold tracking-tight first:mt-0 md:text-3xl"
              : "mt-8 text-xl font-semibold tracking-tight"
          }
        >
          {b.text}
        </Tag>
      );
      i++;
      continue;
    }

    // 6. Callout (notas/avisos)
    if (b.type === "text" && /^(ponto importante|nota cl[ií]nica|nota:|importante|aten[cç][aã]o|aviso)/i.test(b.text)) {
      out.push(
        <Callout key={`c${key++}`} tone="note">
          {b.text}
        </Callout>
      );
      i++;
      continue;
    }

    // 7. Lead (primeiro parágrafo destacado)
    if (b.type === "text" && !leadUsed) {
      leadUsed = true;
      out.push(
        <p key={`lead${key++}`} className="text-lg leading-relaxed text-grey-mid">
          {b.text}
        </p>
      );
      i++;
      continue;
    }

    // 8. Parágrafo normal
    out.push(
      <p key={`p${key++}`} className="leading-relaxed text-text-main/90">
        {b.text}
      </p>
    );
    i++;
  }

  while (imgIdx < inline.length) pushImage();

  return (
    <>
      <JsonLd
        data={medicalWebPageSchema({
          title,
          description: data.description,
          slug,
          condition: meta?.label,
        })}
      />

      <PageHero
        breadcrumb={[{ label: meta?.label ?? title, href: href(slug as PageSlug) }]}
        title={title}
        lead={data.description}
      />

      {data.ogImage && (
        <div className="mx-auto max-w-5xl px-5 pt-10">
          <WixImage src={data.ogImage} alt={title} priority aspect="aspect-[21/9]" />
        </div>
      )}

      <div className="clinic-copy mx-auto max-w-3xl space-y-5 px-5 py-14 md:py-16">
        {out}
      </div>

      <CTAStrip />
      <RelatedPages slugs={relatedFor(slug)} />
    </>
  );
}
