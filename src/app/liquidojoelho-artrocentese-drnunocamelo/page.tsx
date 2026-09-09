import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

const base = scrapedMetadata("liquidojoelho-artrocentese-drnunocamelo");
export const metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/liquidojoelho-artrocentese-drnunocamelo",
      "en-GB": "https://www.consultajoelho.pt/en/liquidojoelho-artrocentese-drnunocamelo",
      "ru-RU": "https://www.consultajoelho.pt/ru/liquidojoelho-artrocentese-drnunocamelo",
      "x-default": "https://www.consultajoelho.pt/liquidojoelho-artrocentese-drnunocamelo",
    },
  },
  title: "Líquido no Joelho e Artrocentese | Dr. Nuno Camelo Porto",
  description:
    "Líquido no joelho (derrame articular): porque acontece, quando é preciso drenar e como se faz a artrocentese. Dr. Nuno Camelo, joelho no Porto.",
};

export default function Page() {
  return <PortedArticle slug="liquidojoelho-artrocentese-drnunocamelo" />;
}
