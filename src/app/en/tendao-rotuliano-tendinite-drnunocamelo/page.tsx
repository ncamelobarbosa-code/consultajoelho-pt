import PortedArticle from "@/components/PortedArticle";

const TITLE = "Patellar Tendinopathy — Jumper's Knee";
const DESCRIPTION =
  "Patellar tendinopathy (jumper's knee): causes, diagnosis and treatment of patellar tendon pain, by Dr. Nuno Camelo Barbosa.";

export const metadata = {
  title: `${TITLE} | Dr. Nuno Camelo`,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/en/tendao-rotuliano-tendinite-drnunocamelo",
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
    <PortedArticle
      slug="tendao-rotuliano-tendinite-drnunocamelo"
      lang="en"
      title={TITLE}
      description={DESCRIPTION}
    />
  );
}
