import type { Metadata } from "next";
import "./globals.css";
import "./site.css";
import "./article.css";
import "./polish.css";
import { SiteHeader } from "@/components/SiteChrome";
import LangSync from "@/components/LangSync";
import ScrollReveal from "@/components/ScrollReveal";
import ConsentGate from "@/components/ConsentGate";
import Contacts from "@/components/Contacts";
import { Analytics } from "@vercel/analytics/next";
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
        <ConsentGate gaId={process.env.NEXT_PUBLIC_GA_ID ?? "G-RZ37G397BW"} />
        <LangSync />
        <ScrollReveal />
        <SiteHeader />
        {children}
        <Contacts />
        <Analytics />
      </body>
    </html>
  );
}
