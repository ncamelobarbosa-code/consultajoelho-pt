import PortedArticle from "@/components/PortedArticle";

const TITLE = "Растяжение коленного сустава: что делать | Dr. Nuno Camelo – Porto";
const DESCRIPTION = "Подвернули колено, и теперь оно болит! Как с этим справиться — прочитайте нашу статью о растяжениях коленного сустава и узнайте, какие шаги следует предпринять после травмы колена. Если остаются вопросы или жалобы, Вы всегда можете записаться на приём по коленному суставу в Porto, Paços de Ferreira или Vila do Conde.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/ru/entorsejoelho-drnunocamelo",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/entorsejoelho-drnunocamelo",
      "en-GB": "https://www.consultajoelho.pt/en/entorsejoelho-drnunocamelo",
      "ru-RU": "https://www.consultajoelho.pt/ru/entorsejoelho-drnunocamelo",
      "x-default": "https://www.consultajoelho.pt/entorsejoelho-drnunocamelo",
    },
  },
};

export default function Page() {
  return (
    <PortedArticle slug="entorsejoelho-drnunocamelo" lang="ru" title={"Растяжение коленного сустава: что делать"} description={DESCRIPTION} />
  );
}
