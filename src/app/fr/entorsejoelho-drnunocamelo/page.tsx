import PortedArticle from "@/components/PortedArticle";

const TITLE = "Entorse du genou : que faire | Dr. Nuno Camelo – Porto";
const DESCRIPTION = "Je me suis tordu le genou et maintenant il me fait mal ! Comment gérer la situation – lisez notre article sur l'entorse du genou et découvrez les démarches à suivre après une blessure au genou. Si vous avez encore des questions ou des symptômes, vous pouvez toujours prendre un rendez-vous pour le genou à Porto, Paços de Ferreira ou Vila do Conde.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/fr/entorsejoelho-drnunocamelo",
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
    <PortedArticle slug="entorsejoelho-drnunocamelo" lang="fr" title={"Entorse du genou : que faire"} description={DESCRIPTION} />
  );
}
