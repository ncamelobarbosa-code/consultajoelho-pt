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

const NOTICE = {
  title: "Important note on treatment",
  body: "For patellar tendinopathy, the first line is progressive loading exercise (eccentric/isometric) under guidance. Intratendinous corticosteroid injection is discouraged — it carries a risk of tendon rupture. Peritendinous corticosteroid, if considered, is an exception weighed case by case.",
};

export default function Page() {
  return (
    <PortedArticle
      slug="tendao-rotuliano-tendinite-drnunocamelo"
      lang="en"
      title={TITLE}
      description={DESCRIPTION}
      notice={NOTICE}
    />
  );
}
