import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site, locations } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dr. Nuno Camelo — Cirurgião de Joelho | Porto",
    template: "%s | Dr. Nuno Camelo Porto",
  },
  description:
    "Especialista exclusivo em cirurgia e patologia do joelho no Porto. Diagnóstico rigoroso, tratamento baseado em evidência, cirurgia só quando necessária.",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: site.url,
    siteName: site.name,
    title: "Dr. Nuno Camelo — Cirurgião de Joelho | Porto",
    description:
      "Especialista exclusivo em cirurgia e patologia do joelho no Porto.",
  },
  alternates: { canonical: "/" },
};

// Schema MedicalBusiness — identidade da clínica para motores de busca
const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: site.name,
  url: site.url,
  telephone: `+351${site.phone.replace(/\s/g, "")}`,
  email: site.email,
  medicalSpecialty: "Orthopedic",
  founder: { "@type": "Physician", name: site.doctor },
  areaServed: site.region,
  location: locations.map((l) => ({
    "@type": "Place",
    name: l.name,
    address: l.address,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(medicalBusinessSchema),
          }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
