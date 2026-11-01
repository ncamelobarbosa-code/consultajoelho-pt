import PortedArticle from "@/components/PortedArticle";

const TITLE = "Kniechirurgie in Portugal – Preise & Kostenvoranschlag | Dr. Nuno Camelo Porto";
const DESCRIPTION = "Arthroskopie ab 3.000 € und Knieprothese ab 8.000 € in Porto, Portugal. Fellowship-ausgebildeter Kniechirurg. Schnelle Termine, englischsprachiges Team. Fordern Sie einen Kostenvoranschlag an.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/de/kneesurgeryinportugalprices",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/kneesurgeryinportugalprices",
      "en-GB": "https://www.consultajoelho.pt/en/kneesurgeryinportugalprices",
      "ru-RU": "https://www.consultajoelho.pt/ru/kneesurgeryinportugalprices",
      "de-DE": "https://www.consultajoelho.pt/de/kneesurgeryinportugalprices",
      "fr-FR": "https://www.consultajoelho.pt/fr/kneesurgeryinportugalprices",
      "x-default": "https://www.consultajoelho.pt/kneesurgeryinportugalprices",
    },
  },
};

export default function Page() {
  return (
    <PortedArticle slug="kneesurgeryinportugalprices" lang="de" title={"Kniechirurgie in Portugal – Preise & Kostenvoranschlag"} description={DESCRIPTION} />
  );
}
