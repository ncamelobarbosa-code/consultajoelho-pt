import type { ReactNode } from "react";
import SectionHeader from "./SectionHeader";

// Injeta JSON-LD em qualquer página.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Container de leitura para o corpo das páginas clínicas.
export function Article({ children }: { children: ReactNode }) {
  return (
    <div className="clinic-copy mx-auto max-w-3xl px-5 py-14 md:py-16">
      {children}
    </div>
  );
}

// Secção com cabeçalho (eyebrow + H2 + lead) e corpo.
export function Block({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="mt-12 first:mt-0">
      <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
      {children && (
        <div className="mt-5 space-y-4 leading-relaxed text-text-main/90">
          {children}
        </div>
      )}
    </section>
  );
}

// Lista com marcadores teal.
export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-main"
            aria-hidden="true"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

// FAQ / lista de perguntas (accordion nativo, sem JS).
export function FAQ({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="divide-y divide-grey-pale overflow-hidden rounded-md border border-grey-pale bg-white">
      {items.map((it, i) => (
        <details key={i} className="group px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium">
            {it.q}
            <span
              className="shrink-0 text-xl leading-none text-teal-main transition-transform group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <div className="pb-5 leading-relaxed text-text-main/75">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

// Secção expandível (para PRP, AH, corticosteroides, etc.).
export function Expandable({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-md border border-grey-pale bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold">
        {title}
        <span
          className="shrink-0 text-xl leading-none text-teal-main transition-transform group-open:rotate-45"
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <div className="space-y-3 px-5 pb-5 leading-relaxed text-text-main/75">
        {children}
      </div>
    </details>
  );
}

// Tabela responsiva.
export function Table({
  head,
  rows,
}: {
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-grey-pale">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-grey-pale text-left">
            {head.map((h, i) => (
              <th key={i} className="px-4 py-3 font-semibold text-teal-main">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-grey-pale align-top">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Caixa de destaque. tone: "note" (sage) | "info" (cinza) | "dark" (teal escuro).
export function Callout({
  title,
  children,
  tone = "note",
}: {
  title?: string;
  children: ReactNode;
  tone?: "note" | "info" | "dark";
}) {
  const styles: Record<string, string> = {
    note: "border border-sage/50 bg-sage/15 text-text-main",
    info: "border border-teal-light bg-grey-pale text-text-main",
    dark: "border-t-4 border-sage bg-[#022d3d] text-white",
  };
  return (
    <div className={`rounded-md p-6 leading-relaxed ${styles[tone]}`}>
      {title && <p className="mb-2 font-semibold">{title}</p>}
      {children}
    </div>
  );
}
