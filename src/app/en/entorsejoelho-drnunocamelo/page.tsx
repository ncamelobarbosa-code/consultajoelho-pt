import PortedArticle from "@/components/PortedArticle";

const TITLE = "Knee Sprain: What to Do | Dr. Nuno Camelo – Porto";
const DESCRIPTION = "I twisted my knee and now it hurts! How to manage it – read our article on knee sprains and find out what steps you should take after a knee injury. If you still have questions or symptoms, you can always book a knee appointment in Porto, Paços de Ferreira or Vila do Conde.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/en/entorsejoelho-drnunocamelo",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/entorsejoelho-drnunocamelo",
      "en-GB": "https://www.consultajoelho.pt/en/entorsejoelho-drnunocamelo",
      "ru-RU": "https://www.consultajoelho.pt/ru/entorsejoelho-drnunocamelo",
      "x-default": "https://www.consultajoelho.pt/entorsejoelho-drnunocamelo",
    },
  },
};

export default function Page() {
  return (
    <PortedArticle slug="entorsejoelho-drnunocamelo" lang="en" title={"Knee Sprain: What to Do"} description={DESCRIPTION} />
  );
}
