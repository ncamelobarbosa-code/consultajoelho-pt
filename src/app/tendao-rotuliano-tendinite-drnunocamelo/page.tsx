import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

const base = scrapedMetadata("tendao-rotuliano-tendinite-drnunocamelo");
export const metadata = {
  ...base,
  alternates: {
    ...base.alternates,
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/tendao-rotuliano-tendinite-drnunocamelo",
      "en-GB": "https://www.consultajoelho.pt/en/tendao-rotuliano-tendinite-drnunocamelo",
      "ru-RU": "https://www.consultajoelho.pt/ru/tendao-rotuliano-tendinite-drnunocamelo",
      "x-default": "https://www.consultajoelho.pt/tendao-rotuliano-tendinite-drnunocamelo",
    },
  },
};

const NOTICE = {
  title: "Nota importante sobre o tratamento",
  body: "Na tendinopatia rotuliana, a 1.ª linha é o exercício de carga progressiva (excêntrico/isométrico) sob orientação. A infiltração de corticoide intratendinosa é desaconselhada — está associada a risco de rotura do tendão.",
};

const PRP = (
  <>
    <h2>E o PRP (plasma rico em plaquetas)?</h2>
    <p>
      O PRP — plasma rico em plaquetas, obtido a partir do sangue do próprio doente — tem ganho um papel
      relevante na tendinopatia rotuliana que não responde ao tratamento conservador. Ao concentrar
      fatores de crescimento, procura criar um ambiente biológico mais favorável à reparação do tendão.
    </p>
    <p>
      A evidência atual posiciona-o como opção de 2.ª linha: quando o exercício de carga progressiva, bem
      conduzido durante vários meses, não resolveu os sintomas — e nunca como substituto da reabilitação.
      Os melhores resultados surgem com PRP guiado por ecografia, mantendo sempre o programa de exercício.
    </p>
    <div className="pa-keybox">
      <strong>Porque é diferente do corticoide</strong>
      Ao contrário da infiltração de corticoide, o PRP não enfraquece o tendão: é uma abordagem regenerativa
      (estimula a reparação), e não meramente anti-inflamatória.
    </div>
  </>
);

export default function Page() {
  return (
    <PortedArticle
      slug="tendao-rotuliano-tendinite-drnunocamelo"
      notice={NOTICE}
      heroImage="/img/hero/tendao-atleta.jpg"
      eyebrow="Tendinopatia · Joelho do saltador"
      extra={PRP}
    />
  );
}
