import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

const base = scrapedMetadata("entorsejoelho-drnunocamelo");
export const metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/entorsejoelho-drnunocamelo",
      "en-GB": "https://www.consultajoelho.pt/en/entorsejoelho-drnunocamelo",
      "ru-RU": "https://www.consultajoelho.pt/ru/entorsejoelho-drnunocamelo",
      "x-default": "https://www.consultajoelho.pt/entorsejoelho-drnunocamelo",
    },
  },
  title: "Entorse do Joelho: Sintomas e Tratamento | Dr. Nuno Camelo",
  description:
    "Entorse do joelho: graus de gravidade, sinais de alarme, quando fazer ressonância e tratamento. Dr. Nuno Camelo, cirurgião de joelho no Porto.",
};

export default function Page() {
  return <PortedArticle slug="entorsejoelho-drnunocamelo" />;
}
