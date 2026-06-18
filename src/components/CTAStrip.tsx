import Link from "next/link";
import { site, href, primaryNav } from "@/lib/site";

export default function CTAStrip({
  title = "Comece hoje.",
  text = "Consulta especializada em joelho no Porto. Resposta em menos de 24 horas.",
  buttonLabel = "Agendar Consulta",
  buttonHref = href(primaryNav.bookingSlug),
  showContacts = true,
}: {
  title?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
  showContacts?: boolean;
}) {
  return (
    <section className="bg-teal-main text-white">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">{text}</p>
        <div className="mt-8">
          <Link
            href={buttonHref}
            className="inline-block rounded-[3px] bg-white px-7 py-3 text-sm font-semibold text-teal-main transition-colors hover:bg-grey-pale"
          >
            {buttonLabel}
          </Link>
        </div>
        {showContacts && (
          <p className="mt-6 text-sm text-white/75">
            <a href={site.phoneHref} className="hover:text-white">
              {site.phone}
            </a>{" "}
            ·{" "}
            <a href={site.emailHref} className="hover:text-white">
              {site.email}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
