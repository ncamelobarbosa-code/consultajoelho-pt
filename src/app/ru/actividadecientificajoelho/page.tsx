import PortedArticle from "@/components/PortedArticle";

const TITLE = "Научные публикации | Dr. Nuno Camelo, Порту";
const DESCRIPTION = "Опубликованные статьи и деятельность в качестве научного рецензента Dr. Nuno Camelo, ортопедического хирурга коленного сустава в Порту. Публикации в международных индексируемых журналах.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/ru/actividadecientificajoelho",
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
    <PortedArticle slug="actividadecientificajoelho" lang="ru" title={"Научные публикации"} description={DESCRIPTION} />
  );
}
