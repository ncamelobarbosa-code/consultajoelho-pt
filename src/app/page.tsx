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
      className="h-7 w-7 text-sage"
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
      <section className="bg-teal-main text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
              Especialista Exclusivo em Joelho · Porto
            </span>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              O seu joelho merece uma opinião especializada.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
              Diagnóstico rigoroso. Tratamento baseado em evidência. Cirurgia só
              quando necessária.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={bookingHref}
                className="rounded-[3px] bg-white px-6 py-3 text-sm font-semibold text-teal-main transition-colors hover:bg-grey-pale"
              >
                Agendar Consulta
              </Link>
              <Link
                href={doctorHref}
                className="rounded-[3px] border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Conhecer o Dr. Camelo
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/75">
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
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeader
          eyebrow="Método"
          title="Como avaliamos e tratamos o seu joelho"
          lead="Uma sequência clara, sem atalhos. Cada passo informa o seguinte."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {framework.map((f) => (
            <div key={f.n} className="rounded-md bg-grey-pale p-7">
              <div className="text-4xl font-bold text-teal-main">{f.n}</div>
              <h3 className="mt-3 text-lg font-semibold">{f.t}</h3>
              <p className="mt-2 text-grey-mid">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SOBRE O DR. NUNO CAMELO */}
      <section className="border-y border-grey-pale bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center">
          <ImagePlaceholder
            label="Dr. Nuno Camelo"
            aspect="aspect-[4/5]"
            className="max-w-md"
          />
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-mid">
              Quem o trata
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              {site.doctor}
            </h2>
            <p className="mt-1 text-teal-main">Cirurgião de Joelho</p>
            <p className="mt-5 leading-relaxed text-grey-mid">
              Prática exclusivamente dedicada ao joelho. Fellowship no Centre
              Orthopédique Santy, em Lyon, com Dr. Sonnery-Cottet — referência
              mundial em cirurgia do ligamento cruzado. Revisor científico em
              AJSM, JEO e OJSM.
            </p>
            <ul className="mt-6 space-y-3">
              {credenciais.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-1 text-teal-main" aria-hidden="true">
                    —
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <Link
              href={doctorHref}
              className="mt-7 inline-block text-sm font-semibold text-teal-main hover:text-teal-dark"
            >
              Ver curriculum completo →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PATOLOGIAS */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeader
          eyebrow="O que tratamos"
          title="Patologias do joelho"
          lead="Cada problema tem um caminho de diagnóstico e tratamento próprio."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {patologias.map((p) => (
            <Link
              key={p.slug}
              href={href(p.slug)}
              className="group block rounded-md bg-teal-main p-7 text-white transition-colors hover:bg-teal-dark"
            >
              <PathologyIcon />
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {p.line}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-sage">
                Saber mais →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. SIGIC BANNER */}
      <section className="bg-sage">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-lg font-medium text-teal-deeper">
            Convencionado com o SIGIC — cirurgia ao joelho pelo SNS sem esperar.
          </p>
          <Link
            href={href("sigic")}
            className="shrink-0 rounded-[3px] bg-white px-6 py-3 text-sm font-semibold text-teal-main transition-colors hover:bg-bg"
          >
            Como funciona →
          </Link>
        </div>
      </section>

      {/* 6. LOCAIS */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeader
          eyebrow="Onde consulta"
          title="Três locais no Norte de Portugal"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {locations.map((l) => (
            <div
              key={l.name}
              className="border-b-2 border-grey-pale bg-white p-7 transition-colors hover:border-teal-main"
            >
              <h3 className="font-semibold">{l.name}</h3>
              <p className="mt-2 text-sm text-grey-mid">{l.address}</p>
              {l.contact && (
                <a
                  href={site.phoneHref}
                  className="mt-3 inline-block text-sm text-teal-main hover:text-teal-dark"
                >
                  {l.contact}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. PACIENTES INTERNACIONAIS */}
      <section className="bg-teal-dark text-white">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Cirurgia ao joelho no Porto
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
            Cuidados de referência a uma fracção do custo do Reino Unido ou
            Irlanda.
          </p>
          <div className="mt-6 text-3xl" aria-hidden="true">
            🇬🇧 🇮🇪 🇸🇪
          </div>
          <Link
            href={href("kneesurgeryinportugalprices")}
            className="mt-8 inline-block rounded-[3px] bg-white px-7 py-3 text-sm font-semibold text-teal-main transition-colors hover:bg-grey-pale"
          >
            Preços e informação →
          </Link>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="bg-teal-main text-white">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Comece hoje.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Consulta especializada em joelho no Porto. Resposta em menos de 24
            horas.
          </p>
          <Link
            href={bookingHref}
            className="mt-8 inline-block rounded-[3px] bg-white px-7 py-3 text-sm font-semibold text-teal-main transition-colors hover:bg-grey-pale"
          >
            Agendar Consulta
          </Link>
          <p className="mt-6 text-sm text-white/75">
            <a href={site.phoneHref} className="hover:text-white">
              {site.phone}
            </a>{" "}
            ·{" "}
            <a href={site.emailHref} className="hover:text-white">
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
