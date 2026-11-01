import PortedArticle from "@/components/PortedArticle";

const TITLE = "Arthrozentese des Knies: Entfernung von Flüssigkeit aus dem Knie | Dr. Nuno Camelo";
const DESCRIPTION = "Die Arthrozentese des Knies ist eine Technik zur Entfernung von Gelenkflüssigkeit. Erfahren Sie, wann sie angezeigt ist und wie der Eingriff bei Dr. Nuno Camelo in Porto durchgeführt wird.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/de/liquidojoelho-artrocentese-drnunocamelo",
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
    <PortedArticle slug="liquidojoelho-artrocentese-drnunocamelo" lang="de" title={"Arthrozentese des Knies: Entfernung von Flüssigkeit aus dem Knie"} description={DESCRIPTION} />
  );
}
