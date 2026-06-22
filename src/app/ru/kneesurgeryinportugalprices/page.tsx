import PortedArticle from "@/components/PortedArticle";

const TITLE = "Операция на колене в Португалии – цены и расчёт стоимости | Dr. Nuno Camelo Porto";
const DESCRIPTION = "Артроскопия от 3 000 € и эндопротезирование коленного сустава от 8 000 € в Порту, Португалия. Хирург коленного сустава с фелловшип-подготовкой. Быстрая запись на приём, англоговорящая команда. Запросите расчёт стоимости.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/ru/kneesurgeryinportugalprices",
    languages: {
      "en-GB": "https://www.consultajoelho.pt/kneesurgeryinportugalprices",
      "ru-RU": "https://www.consultajoelho.pt/ru/kneesurgeryinportugalprices",
      "x-default": "https://www.consultajoelho.pt/kneesurgeryinportugalprices",
    },
  },
};

export default function Page() {
  return (
    <PortedArticle slug="kneesurgeryinportugalprices" lang="ru" title={"Операция на колене в Португалии – цены и расчёт стоимости"} description={DESCRIPTION} />
  );
}
