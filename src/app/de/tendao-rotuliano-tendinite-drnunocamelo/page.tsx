import PortedArticle from "@/components/PortedArticle";

const TITLE = "Patellaspitzensyndrom — Springerknie";
const DESCRIPTION =
  "Patellaspitzensyndrom (Springerknie): Ursachen, Diagnose und Behandlung von Schmerzen der Patellasehne, von Dr. Nuno Camelo Barbosa.";

export const metadata = {
  title: `${TITLE} | Dr. Nuno Camelo`,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/de/tendao-rotuliano-tendinite-drnunocamelo",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/tendao-rotuliano-tendinite-drnunocamelo",
      "en-GB": "https://www.consultajoelho.pt/en/tendao-rotuliano-tendinite-drnunocamelo",
      "ru-RU": "https://www.consultajoelho.pt/ru/tendao-rotuliano-tendinite-drnunocamelo",
      "de-DE": "https://www.consultajoelho.pt/de/tendao-rotuliano-tendinite-drnunocamelo",
      "fr-FR": "https://www.consultajoelho.pt/fr/tendao-rotuliano-tendinite-drnunocamelo",
      "x-default": "https://www.consultajoelho.pt/tendao-rotuliano-tendinite-drnunocamelo",
    },
  },
};

const NOTICE = {
  title: "Wichtiger Hinweis zur Behandlung",
  body: "Beim Patellaspitzensyndrom ist die erste Wahl ein angeleitetes progressives Belastungstraining (exzentrisch/isometrisch). Von einer intratendinösen Kortikosteroid-Injektion wird abgeraten — sie birgt das Risiko einer Sehnenruptur.",
};

const PRP = (
  <>
    <h2>Was ist mit PRP (plättchenreiches Plasma)?</h2>
    <p>
      PRP — plättchenreiches Plasma, das aus dem eigenen Blut des Patienten gewonnen wird — hat beim
      Patellaspitzensyndrom, das auf konservative Maßnahmen nicht anspricht, eine bedeutende Rolle erlangt. Durch
      die Konzentration von Wachstumsfaktoren soll ein biologisches Umfeld geschaffen werden, das die Heilung der
      Sehne begünstigt.
    </p>
    <p>
      Die aktuelle Evidenz sieht es als Option der zweiten Wahl: wenn ein über mehrere Monate korrekt durchgeführtes
      progressives Belastungstraining die Beschwerden nicht gelöst hat — und niemals als Ersatz für die
      Rehabilitation. Die besten Ergebnisse erzielt ultraschallgesteuertes PRP bei gleichzeitiger Fortführung des
      Übungsprogramms.
    </p>
    <div className="pa-keybox">
      <strong>Warum es sich von einem Kortikosteroid unterscheidet</strong>
      Anders als eine Kortikosteroid-Injektion schwächt PRP die Sehne nicht: Es ist ein regenerativer Ansatz (er
      regt die Heilung an) und nicht bloß entzündungshemmend.
    </div>
  </>
);

export default function Page() {
  return (
    <PortedArticle
      slug="tendao-rotuliano-tendinite-drnunocamelo"
      lang="de"
      title={TITLE}
      description={DESCRIPTION}
      notice={NOTICE}
      heroImage="/img/hero/tendao-atleta.jpg"
      eyebrow="Tendinopathie · Springerknie"
      extra={PRP}
    />
  );
}
