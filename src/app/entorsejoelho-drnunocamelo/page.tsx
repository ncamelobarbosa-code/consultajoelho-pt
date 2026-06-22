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
};

export default function Page() {
  return <PortedArticle slug="entorsejoelho-drnunocamelo" />;
}
