import PortedArticle from "@/components/PortedArticle";

const TITLE = "Knee Arthrocentesis: Removing Fluid from the Knee | Dr. Nuno Camelo";
const DESCRIPTION = "Knee arthrocentesis is a technique for removing joint fluid. Learn when it is indicated and how the procedure is carried out with Dr. Nuno Camelo, in Porto.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/en/liquidojoelho-artrocentese-drnunocamelo",
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
    <PortedArticle slug="liquidojoelho-artrocentese-drnunocamelo" lang="en" title={"Knee Arthrocentesis: Removing Fluid from the Knee"} description={DESCRIPTION} />
  );
}
