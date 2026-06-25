import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

const base = scrapedMetadata("tendao-rotuliano-tendinite-drnunocamelo");
export const metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/tendao-rotuliano-tendinite-drnunocamelo",
      "en-GB": "https://www.consultajoelho.pt/en/tendao-rotuliano-tendinite-drnunocamelo",
      "ru-RU": "https://www.consultajoelho.pt/ru/tendao-rotuliano-tendinite-drnunocamelo",
      "x-default": "https://www.consultajoelho.pt/tendao-rotuliano-tendinite-drnunocamelo",
    },
  },
};

const NOTICE = {
  title: "Nota importante sobre o tratamento",
  body: "Na tendinopatia rotuliana, a 1.ª linha é o exercício de carga progressiva (excêntrico/isométrico) sob orientação. A infiltração de corticoide intratendinosa é desaconselhada — está associada a risco de rotura do tendão. O corticoide peritendinoso, se considerado, é exceção e ponderado caso a caso.",
};

export default function Page() {
  return <PortedArticle slug="tendao-rotuliano-tendinite-drnunocamelo" notice={NOTICE} />;
}
