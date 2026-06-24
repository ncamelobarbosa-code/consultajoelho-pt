import type { Metadata } from "next";
import "./globals.css";
import "./site.css";
import "./article.css";
import "./polish.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import LangSync from "@/components/LangSync";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Consulta de Joelho Porto | Dr. Nuno Camelo",
  description:
    "Consulta especializada em patologia do joelho com o Dr. Nuno Camelo, cirurgião ortopédico no Porto, Paços de Ferreira e Vila do Conde.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body>
        <LangSync />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
