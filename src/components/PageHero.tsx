import Link from "next/link";
import { site } from "@/lib/site";

export type Crumb = { label: string; href: string };

export default function PageHero({
  breadcrumb,
  title,
  lead,
  author = true,
}: {
  breadcrumb?: Crumb[];
  title: string;
  lead: string;
  author?: boolean;
}) {
  return (
    <section className="bg-teal-main text-white">
      <div className="mx-auto max-w-4xl px-5 py-16 md:py-20">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/65">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Início
                </Link>
              </li>
              {breadcrumb.map((c) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-white/40">
                    /
                  </span>
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {title}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
          {lead}
        </p>

        {author && (
          <p className="mt-6 text-sm text-white/70">
            {site.doctor} · {site.role}
          </p>
        )}
      </div>
    </section>
  );
}
