import PortedArticle from "@/components/PortedArticle";

const TITLE = "Arthrocentèse du genou : évacuation du liquide du genou | Dr. Nuno Camelo";
const DESCRIPTION = "L'arthrocentèse du genou est une technique d'évacuation du liquide articulaire. Découvrez quand elle est indiquée et comment l'intervention est réalisée avec le Dr. Nuno Camelo, à Porto.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/fr/liquidojoelho-artrocentese-drnunocamelo",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/liquidojoelho-artrocentese-drnunocamelo",
      "en-GB": "https://www.consultajoelho.pt/en/liquidojoelho-artrocentese-drnunocamelo",
      "ru-RU": "https://www.consultajoelho.pt/ru/liquidojoelho-artrocentese-drnunocamelo",
      "de-DE": "https://www.consultajoelho.pt/de/liquidojoelho-artrocentese-drnunocamelo",
      "fr-FR": "https://www.consultajoelho.pt/fr/liquidojoelho-artrocentese-drnunocamelo",
      "x-default": "https://www.consultajoelho.pt/liquidojoelho-artrocentese-drnunocamelo",
    },
  },
};

export default function Page() {
  return (
    <PortedArticle slug="liquidojoelho-artrocentese-drnunocamelo" lang="fr" title={"Arthrocentèse du genou : évacuation du liquide du genou"} description={DESCRIPTION} />
  );
}
