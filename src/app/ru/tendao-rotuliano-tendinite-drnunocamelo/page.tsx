import PortedArticle from "@/components/PortedArticle";

const TITLE = "Тендинопатия надколенника: тендинит коленного сустава | Dr. Nuno Camelo";
const DESCRIPTION = "Тендиниты коленного сустава! Иногда они трудно поддаются лечению и могут даже привести к завершению спортивной карьеры. Боль обычно усиливается с ростом физической нагрузки, а в более тяжёлых случаях может беспокоить и в покое (вплоть до боли ночью во время сна). Запишитесь на консультацию по заболеваниям коленного сустава в Порту, Paços de Ferreira или Vila do Conde.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/ru/tendao-rotuliano-tendinite-drnunocamelo",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/tendao-rotuliano-tendinite-drnunocamelo",
      "en-GB": "https://www.consultajoelho.pt/en/tendao-rotuliano-tendinite-drnunocamelo",
      "ru-RU": "https://www.consultajoelho.pt/ru/tendao-rotuliano-tendinite-drnunocamelo",
      "x-default": "https://www.consultajoelho.pt/tendao-rotuliano-tendinite-drnunocamelo",
    },
  },
};

export default function Page() {
  return (
    <PortedArticle slug="tendao-rotuliano-tendinite-drnunocamelo" lang="ru" title={"Тендинопатия надколенника: тендинит коленного сустава"} description={DESCRIPTION} />
  );
}
