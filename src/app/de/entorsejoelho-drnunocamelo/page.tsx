import PortedArticle from "@/components/PortedArticle";

const TITLE = "Knieverstauchung: Was tun | Dr. Nuno Camelo – Porto";
const DESCRIPTION = "Ich habe mir das Knie verdreht und jetzt tut es weh! Wie Sie damit umgehen – lesen Sie unseren Artikel über Knieverstauchungen (Distorsion) und erfahren Sie, welche Schritte Sie nach einer Knieverletzung unternehmen sollten. Wenn Sie weiterhin Fragen oder Beschwerden haben, können Sie jederzeit eine Kniesprechstunde in Porto, Paços de Ferreira oder Vila do Conde vereinbaren.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/de/entorsejoelho-drnunocamelo",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/entorsejoelho-drnunocamelo",
      "en-GB": "https://www.consultajoelho.pt/en/entorsejoelho-drnunocamelo",
      "ru-RU": "https://www.consultajoelho.pt/ru/entorsejoelho-drnunocamelo",
      "de-DE": "https://www.consultajoelho.pt/de/entorsejoelho-drnunocamelo",
      "fr-FR": "https://www.consultajoelho.pt/fr/entorsejoelho-drnunocamelo",
      "x-default": "https://www.consultajoelho.pt/entorsejoelho-drnunocamelo",
    },
  },
};

export default function Page() {
  return (
    <PortedArticle slug="entorsejoelho-drnunocamelo" lang="de" title={"Knieverstauchung: Was tun"} description={DESCRIPTION} />
  );
}
