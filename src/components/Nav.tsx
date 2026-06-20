"use client";

import Link from "next/link";
import { useState } from "react";
import {
  navGroups,
  primaryNav,
  pages,
  href,
  site,
  type NavGroup,
} from "@/lib/site";

const bookingHref = href(primaryNav.bookingSlug);
const doctorHref = href(primaryNav.doctorSlug);

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.5 4.5L6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DesktopDropdown({ group }: { group: NavGroup }) {
  return (
    <div className="group relative">
      <button
        className="flex items-center gap-1 py-2 text-sm font-medium text-text-main transition-colors hover:text-teal-main"
        aria-haspopup="true"
      >
        {group.label}
        <Chevron className="mt-0.5 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-64 translate-y-1 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <ul className="mt-2 overflow-hidden rounded-md border border-teal-main/12 bg-white py-2 shadow-lg shadow-teal-main/10">
          {group.items.map((it) => (
            <li key={it.slug}>
              <Link
                href={href(it.slug)}
                className="block px-4 py-2 text-sm text-text-main transition-colors hover:bg-grey-pale hover:text-teal-main"
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-teal-main/12 bg-bg/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-teal-main"
          onClick={() => setOpen(false)}
        >
          ConsultaJoelho<span className="text-teal-mid">.pt</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          <Link
            href="/"
            className="py-2 text-sm font-medium text-text-main transition-colors hover:text-teal-main"
          >
            Joelho
          </Link>
          {navGroups.map((g) => (
            <DesktopDropdown key={g.label} group={g} />
          ))}
          <Link
            href={doctorHref}
            className="py-2 text-sm font-medium text-text-main transition-colors hover:text-teal-main"
          >
            Dr. Nuno Camelo
          </Link>
          <Link
            href={bookingHref}
            className="rounded-[3px] bg-teal-main px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-dark"
          >
            Agendar
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] text-teal-main lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 top-16 z-40 bg-teal-deeper/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-80 max-w-[85vw] overflow-y-auto border-l border-teal-main/12 bg-bg px-5 py-6">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block border-b border-grey-pale py-3 text-sm font-medium"
            >
              Joelho
            </Link>

            {navGroups.map((g) => {
              const isOpen = openGroup === g.label;
              return (
                <div key={g.label} className="border-b border-grey-pale">
                  <button
                    className="flex w-full items-center justify-between py-3 text-sm font-medium"
                    onClick={() => setOpenGroup(isOpen ? null : g.label)}
                    aria-expanded={isOpen}
                  >
                    {g.label}
                    <Chevron
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <ul className="pb-2">
                      {g.items.map((it) => (
                        <li key={it.slug}>
                          <Link
                            href={href(it.slug)}
                            onClick={() => setOpen(false)}
                            className="block py-2 pl-3 text-sm text-text-main/75 transition-colors hover:text-teal-main"
                          >
                            {it.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}

            <Link
              href={doctorHref}
              onClick={() => setOpen(false)}
              className="block border-b border-grey-pale py-3 text-sm font-medium"
            >
              {pages[primaryNav.doctorSlug].label}
            </Link>

            <Link
              href={bookingHref}
              onClick={() => setOpen(false)}
              className="mt-5 block rounded-[3px] bg-teal-main px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Agendar Consulta
            </Link>

            <a
              href={site.phoneHref}
              className="mt-3 block text-center text-sm text-teal-main"
            >
              {site.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
