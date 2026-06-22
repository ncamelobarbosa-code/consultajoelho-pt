import PortedArticle from "@/components/PortedArticle";

const TITLE = "Артроцентез коленного сустава: удаление жидкости из колена | Dr. Nuno Camelo";
const DESCRIPTION = "Артроцентез коленного сустава — это методика удаления суставной жидкости. Узнайте, когда он показан и как проходит процедура, с Dr. Nuno Camelo в городе Porto.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/ru/liquidojoelho-artrocentese-drnunocamelo",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/liquidojoelho-artrocentese-drnunocamelo",
      "en-GB": "https://www.consultajoelho.pt/en/liquidojoelho-artrocentese-drnunocamelo",
      "ru-RU": "https://www.consultajoelho.pt/ru/liquidojoelho-artrocentese-drnunocamelo",
      "x-default": "https://www.consultajoelho.pt/liquidojoelho-artrocentese-drnunocamelo",
    },
  },
};

export default function Page() {
  return (
    <PortedArticle slug="liquidojoelho-artrocentese-drnunocamelo" lang="ru" title={"Артроцентез коленного сустава: удаление жидкости из колена"} description={DESCRIPTION} />
  );
}
