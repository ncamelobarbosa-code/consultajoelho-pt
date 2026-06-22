import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

const base = scrapedMetadata("kneesurgeryinportugalprices");
export const metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    languages: {
      "en-GB": "https://www.consultajoelho.pt/kneesurgeryinportugalprices",
      "ru-RU": "https://www.consultajoelho.pt/ru/kneesurgeryinportugalprices",
      "x-default": "https://www.consultajoelho.pt/kneesurgeryinportugalprices",
    },
  },
};

export default function Page() {
  return <PortedArticle slug="kneesurgeryinportugalprices" />;
}
