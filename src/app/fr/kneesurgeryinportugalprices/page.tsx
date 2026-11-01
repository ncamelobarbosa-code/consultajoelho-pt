import PortedArticle from "@/components/PortedArticle";

const TITLE = "Chirurgie du genou au Portugal – Prix & Devis | Dr. Nuno Camelo Porto";
const DESCRIPTION = "Arthroscopie à partir de 3 000 € et prothèse du genou à partir de 8 000 € à Porto, au Portugal. Chirurgien du genou formé en fellowship. Rendez-vous rapides, équipe anglophone. Demandez un devis.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/fr/kneesurgeryinportugalprices",
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
    <PortedArticle slug="kneesurgeryinportugalprices" lang="fr" title={"Chirurgie du genou au Portugal – Prix & Devis"} description={DESCRIPTION} />
  );
}
