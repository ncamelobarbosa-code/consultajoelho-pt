import Link from "next/link";
import { site, locations, href, type PageSlug } from "@/lib/site";

const patologias: PageSlug[] = [
  "ligamentocruzadoanterior",
  "meniscosnojoelho",
  "cartilagemjoelhodrnunocamelo",
  "protesejoelhodesportodrnunocamelo",
  "joelhodrnunocamelo",
  "infiltracaojoelho",
];

const patologiasLabels: Record<string, string> = {
  ligamentocruzadoanterior: "LCA",
  meniscosnojoelho: "Meniscos",
  cartilagemjoelhodrnunocamelo: "Cartilagem",
  protesejoelhodesportodrnunocamelo: "Prótese",
  joelhodrnunocamelo: "Gonalgia",
  infiltracaojoelho: "Infiltrações",
};

const cirurgia: { slug: PageSlug; label: string }[] = [
  { slug: "sigic", label: "SIGIC" },
  { slug: "cirurgiadojoelhoeagora", label: "Preparar a Cirurgia" },
  { slug: "recuperarcirurgiajoelho", label: "Recuperação" },
  { slug: "kneesurgeryinportugalprices", label: "Pacientes Internacionais" },
];

export default function Footer() {
  return (
    <footer className="bg-teal-main text-white">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* 1. Marca */}
          <div>
            <div className="text-lg font-bold tracking-tight">
              ConsultaJoelho<span className="text-sage">.pt</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/75">
              Especialidade exclusiva em cirurgia e patologia do joelho. Porto,
              Norte de Portugal.
            </p>
          </div>

          {/* 2. Patologias */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-sage">
              Patologias
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {patologias.map((slug) => (
                <li key={slug}>
                  <Link
                    href={href(slug)}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    {patologiasLabels[slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Cirurgia */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-sage">
              Cirurgia
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {cirurgia.map((it) => (
                <li key={it.slug}>
                  <Link
                    href={href(it.slug)}
                    className="text-white/80 transition-colors hover:text-white"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-sage">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <Link
                  href={href("agendamentonunocameloespecialistajoelho")}
                  className="font-medium text-white transition-colors hover:text-sage"
                >
                  Agendar Online
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Locais */}
        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-sm text-white/70">
          {locations.map((l) => (
            <span key={l.name}>{l.name}</span>
          ))}
        </div>

        <p className="mt-6 text-xs text-white/55">
          © 2025 {site.doctor} · Cirurgia do Joelho · Porto
        </p>
      </div>
    </footer>
  );
}
