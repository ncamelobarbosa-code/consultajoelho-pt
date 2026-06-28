import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { site, locations, href, primaryNav, type PageSlug } from "@/lib/site";

const bookingHref = href(primaryNav.bookingSlug);
const doctorHref = href(primaryNav.doctorSlug);

// ── Framework clínica (estilo London Cartilage) ──
const framework = [
  {
    n: "1",
    t: "Avaliar",
    d: "Diagnóstico clínico e imagiológico rigoroso antes de qualquer decisão.",
  },
  {
    n: "2",
    t: "Conservar",
    d: "Tratamento não-cirúrgico sempre que a evidência o suporta.",
  },
  {
    n: "3",
    t: "Tratar",
    d: "Cirurgia minimamente invasiva quando indicada.",
  },
  {
    n: "4",
    t: "Recuperar",
    d: "Protocolo de reabilitação personalizado até ao retorno à actividade.",
  },
];

const credenciais = [
  "Fellowship em cirurgia do joelho — Centre Orthopédique Santy, Lyon, com Dr. Sonnery-Cottet (2015–2016)",
  "Revisor científico — AJSM, JEO e OJSM",
  "Hospital Lusíadas Porto | Hospital Misericórdia Vila do Conde | Hospital Lusíadas Paços de Ferreira",
  "Convencionado SIGIC",
];

// ── Patologias (grid 3x2) ──
const patologias: { slug: PageSlug; title: string; line: string }[] = [
  {
    slug: "ligamentocruzadoanterior",
    title: "LCA",
    line: "Rotura do ligamento cruzado anterior e retorno ao desporto.",
  },
  {
    slug: "meniscosnojoelho",
    title: "Meniscos",
    line: "Suturar ou remover — uma decisão que preserva função.",
  },
  {
    slug: "cartilagemjoelhodrnunocamelo",
    title: "Cartilagem",
    line: "Proteger o que resta, tratar o que foi perdido.",
  },
  {
    slug: "protesejoelhodesportodrnunocamelo",
    title: "Prótese",
    line: "Artroplastia do joelho quando a indicação é correcta.",
  },
  {
    slug: "joelhodrnunocamelo",
    title: "Gonalgia",
    line: "Dor no joelho: encontrar a causa antes do tratamento.",
  },
  {
    slug: "luxacaorotulajoelho",
    title: "Rótula",
    line: "Luxação e instabilidade da rótula.",
  },
];

function PathologyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-7 w-7 text-accent"
      aria-hidden="true"
    >
      <path
        d="M7 3c0 3 2 4 2 6s-2 3-2 6 2 3 2 6M17 3c0 3-2 4-2 6s2 3 2 6-2 3-2 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 9h6M9 15h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* 1. HERO */}
      <section className="hero-bg relative isolate flex min-h-[88vh] items-center bg-brand-deeper text-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-8 md:py-32">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Especialista Exclusivo em Joelho · Porto
            </span>
            <h1 className="mt-5 font-serif text-5xl font-normal leading-[1.04] tracking-tight md:text-7xl">
              O seu joelho merece uma opinião especializada.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              Diagnóstico rigoroso. Tratamento baseado em evidência. Cirurgia só
              quando necessária.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={bookingHref}
                className="rounded-btn bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-grey-pale hover:shadow-md"
              >
                Agendar Consulta
              </Link>
              <Link
                href={doctorHref}
                className="rounded-btn border border-white/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10"
              >
                Conhecer o Dr. Camelo
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/15 pt-7 text-sm text-white/75">
              <span>
                <strong className="font-semibold text-white">+15</strong> Anos
              </span>
              <span>Fellowship em Lyon</span>
              <span>
                <strong className="font-semibold text-white">3</strong> Locais
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FRAMEWORK CLÍNICA */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:px-8 md:py-36 [&_h2]:font-serif [&_h2]:text-[2rem] [&_h2]:font-normal [&_h2]:leading-[1.1] [&_h2]:tracking-tight [&_h2]:md:text-[2.75rem]">
        <SectionHeader
          eyebrow="Método"
          title="Como avaliamos e tratamos o seu joelho"
          lead="Uma sequência clara, sem atalhos. Cada passo informa o seguinte."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:gap-8">
          {framework.map((f) => (
            <div
              key={f.n}
              className="rounded-card border border-line bg-surface p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover md:p-10"
            >
              <div className="font-serif text-5xl font-normal text-brand">
                {f.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{f.t}</h3>
              <p className="mt-2 leading-relaxed text-muted">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SOBRE O DR. NUNO CAMELO */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 md:px-8 md:py-36 lg:grid-cols-2 lg:items-center lg:gap-16">
          <ImagePlaceholder
            label="Dr. Nuno Camelo"
            aspect="aspect-[4/5]"
            className="max-w-md"
          />
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-mid">
              Quem o trata
            </span>
            <h2 className="mt-3 font-serif text-[2rem] font-normal leading-[1.1] tracking-tight md:text-[2.75rem]">
              {site.doctor}
            </h2>
            <p className="mt-2 text-brand">Cirurgião de Joelho</p>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Prática exclusivamente dedicada ao joelho. Fellowship no Centre
              Orthopédique Santy, em Lyon, com Dr. Sonnery-Cottet — referência
              mundial em cirurgia do ligamento cruzado. Revisor científico em
              AJSM, JEO e OJSM.
            </p>
            <ul className="mt-7 space-y-3.5">
              {credenciais.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 text-sm leading-relaxed text-ink"
                >
                  <span className="mt-1 text-accent-deep" aria-hidden="true">
                    —
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <Link
              href={doctorHref}
              className="mt-8 inline-block text-sm font-semibold text-brand transition-colors hover:text-brand-deep"
            >
              Ver curriculum completo →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PATOLOGIAS */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:px-8 md:py-36 [&_h2]:font-serif [&_h2]:text-[2rem] [&_h2]:font-normal [&_h2]:leading-[1.1] [&_h2]:tracking-tight [&_h2]:md:text-[2.75rem]">
        <SectionHeader
          eyebrow="O que tratamos"
          title="Patologias do joelho"
          lead="Cada problema tem um caminho de diagnóstico e tratamento próprio."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {patologias.map((p) => (
            <Link
              key={p.slug}
              href={href(p.slug)}
              className="group block rounded-card bg-brand p-8 text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:bg-brand-deep hover:shadow-card-hover md:p-9"
            >
              <PathologyIcon />
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {p.line}
              </p>
              <span className="mt-5 inline-flex items-center text-sm font-medium text-accent transition-transform duration-200 group-hover:translate-x-1">
                Saber mais →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. SIGIC BANNER */}
      <section className="bg-accent">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="max-w-2xl text-lg font-medium text-brand-deeper md:text-xl">
            Convencionado com o SIGIC — cirurgia ao joelho pelo SNS sem esperar.
          </p>
          <Link
            href={href("sigic")}
            className="shrink-0 rounded-btn bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            Como funciona →
          </Link>
        </div>
      </section>

      {/* 6. LOCAIS */}
      <section className="mx-auto max-w-7xl px-6 py-28 md:px-8 md:py-36 [&_h2]:font-serif [&_h2]:text-[2rem] [&_h2]:font-normal [&_h2]:leading-[1.1] [&_h2]:tracking-tight [&_h2]:md:text-[2.75rem]">
        <SectionHeader
          eyebrow="Onde consulta"
          title="Três locais no Norte de Portugal"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {locations.map((l) => (
            <div
              key={l.name}
              className="rounded-card border border-line bg-surface p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card-hover"
            >
              <h3 className="font-semibold text-ink">{l.name}</h3>
              <p className="mt-2 text-sm text-muted">{l.address}</p>
              {l.contact && (
                <a
                  href={site.phoneHref}
                  className="mt-3 inline-block text-sm text-brand transition-colors hover:text-brand-deep"
                >
                  {l.contact}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. PACIENTES INTERNACIONAIS */}
      <section className="bg-brand-deep text-white">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center md:px-8 md:py-36">
          <h2 className="font-serif text-[2rem] font-normal leading-[1.1] tracking-tight md:text-[2.75rem]">
            Cirurgia ao joelho no Porto
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
            Cuidados de referência a uma fracção do custo do Reino Unido ou
            Irlanda.
          </p>
          <div className="mt-7 text-3xl" aria-hidden="true">
            🇬🇧 🇮🇪 🇸🇪
          </div>
          <Link
            href={href("kneesurgeryinportugalprices")}
            className="mt-9 inline-block rounded-btn bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-grey-pale hover:shadow-md"
          >
            Preços e informação →
          </Link>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="bg-brand text-white">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center md:px-8 md:py-36">
          <h2 className="font-serif text-4xl font-normal leading-[1.05] tracking-tight md:text-6xl">
            Comece hoje.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
            Consulta especializada em joelho no Porto. Resposta em menos de 24
            horas.
          </p>
          <Link
            href={bookingHref}
            className="mt-9 inline-block rounded-btn bg-white px-8 py-3.5 text-sm font-semibold text-brand shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-grey-pale hover:shadow-md"
          >
            Agendar Consulta
          </Link>
          <p className="mt-7 text-sm text-white/75">
            <a
              href={site.phoneHref}
              className="transition-colors hover:text-white"
            >
              {site.phone}
            </a>{" "}
            ·{" "}
            <a
              href={site.emailHref}
              className="transition-colors hover:text-white"
            >
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
