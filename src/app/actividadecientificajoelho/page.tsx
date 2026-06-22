import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

const base = scrapedMetadata("actividadecientificajoelho");
export const metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/actividadecientificajoelho",
      "en-GB": "https://www.consultajoelho.pt/en/actividadecientificajoelho",
      "ru-RU": "https://www.consultajoelho.pt/ru/actividadecientificajoelho",
      "x-default": "https://www.consultajoelho.pt/actividadecientificajoelho",
    },
  },
};

export default function Page() {
  return <PortedArticle slug="actividadecientificajoelho" />;
}
