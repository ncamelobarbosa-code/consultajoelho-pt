import PortedArticle from "@/components/PortedArticle";

const TITLE = "Publications scientifiques | Dr Nuno Camelo Porto";
const DESCRIPTION = "Articles publiés et activité de relecteur scientifique du Dr Nuno Camelo, chirurgien orthopédiste du genou à Porto. Publications dans des revues internationales indexées.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/fr/actividadecientificajoelho",
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
    <PortedArticle slug="actividadecientificajoelho" lang="fr" title={"Publications scientifiques"} description={DESCRIPTION} />
  );
}
