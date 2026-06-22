import PortedArticle from "@/components/PortedArticle";

const TITLE = "Scientific Publications | Dr Nuno Camelo Porto";
const DESCRIPTION = "Published articles and scientific reviewer activity of Dr Nuno Camelo, orthopaedic knee surgeon in Porto. Publications in indexed international journals.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/en/actividadecientificajoelho",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/actividadecientificajoelho",
      "en-GB": "https://www.consultajoelho.pt/en/actividadecientificajoelho",
      "ru-RU": "https://www.consultajoelho.pt/ru/actividadecientificajoelho",
      "x-default": "https://www.consultajoelho.pt/actividadecientificajoelho",
    },
  },
};

export default function Page() {
  return (
    <PortedArticle slug="actividadecientificajoelho" lang="en" title={"Scientific Publications"} description={DESCRIPTION} />
  );
}
