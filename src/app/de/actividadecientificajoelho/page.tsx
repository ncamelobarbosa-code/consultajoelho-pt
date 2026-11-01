import PortedArticle from "@/components/PortedArticle";

const TITLE = "Wissenschaftliche Publikationen | Dr. Nuno Camelo Porto";
const DESCRIPTION = "Veröffentlichte Artikel und Tätigkeit als wissenschaftlicher Gutachter von Dr. Nuno Camelo, orthopädischer Kniechirurg in Porto. Publikationen in indexierten internationalen Fachzeitschriften.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/de/actividadecientificajoelho",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/actividadecientificajoelho",
      "en-GB": "https://www.consultajoelho.pt/en/actividadecientificajoelho",
      "ru-RU": "https://www.consultajoelho.pt/ru/actividadecientificajoelho",
      "de-DE": "https://www.consultajoelho.pt/de/actividadecientificajoelho",
      "fr-FR": "https://www.consultajoelho.pt/fr/actividadecientificajoelho",
      "x-default": "https://www.consultajoelho.pt/actividadecientificajoelho",
    },
  },
};

export default function Page() {
  return (
    <PortedArticle slug="actividadecientificajoelho" lang="de" title={"Wissenschaftliche Publikationen"} description={DESCRIPTION} />
  );
}
