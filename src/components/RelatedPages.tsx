import Link from "next/link";
import { pages, href, type PageSlug } from "@/lib/site";

export default function RelatedPages({
  slugs,
  title = "Páginas relacionadas",
}: {
  slugs: PageSlug[];
  title?: string;
}) {
  return (
    <section className="border-t border-grey-pale bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-mid">
          {title}
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {slugs.map((slug) => {
            const p = pages[slug];
            return (
              <Link
                key={slug}
                href={href(slug)}
                className="group block rounded-md border border-grey-pale bg-white p-6 transition-colors hover:border-teal-light"
              >
                <h3 className="font-semibold text-text-main group-hover:text-teal-main">
                  {p.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-main/75">
                  {p.blurb}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-teal-main">
                  Saber mais →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
