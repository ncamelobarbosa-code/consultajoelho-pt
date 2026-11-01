import PortedArticle from "@/components/PortedArticle";

const TITLE = "Tendinopathie rotulienne — Genou du sauteur";
const DESCRIPTION =
  "Tendinopathie rotulienne (genou du sauteur) : causes, diagnostic et traitement de la douleur du tendon rotulien, par le Dr. Nuno Camelo Barbosa.";

export const metadata = {
  title: `${TITLE} | Dr. Nuno Camelo`,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.consultajoelho.pt/fr/tendao-rotuliano-tendinite-drnunocamelo",
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
  title: "Note importante sur le traitement",
  body: "Pour la tendinopathie rotulienne, le traitement de première intention est un programme d'exercices en charge progressive (excentrique/isométrique) encadré. L'injection intratendineuse de corticoïde est déconseillée — elle comporte un risque de rupture du tendon.",
};

const PRP = (
  <>
    <h2>Qu'en est-il du PRP (plasma riche en plaquettes) ?</h2>
    <p>
      Le PRP — plasma riche en plaquettes obtenu à partir du propre sang du patient — a pris une place importante
      dans la tendinopathie rotulienne qui ne répond pas au traitement conservateur. En concentrant les facteurs de
      croissance, il vise à créer un environnement biologique plus favorable à la réparation du tendon.
    </p>
    <p>
      Les données actuelles le positionnent comme une option de seconde intention : lorsque les exercices en charge
      progressive, correctement menés pendant plusieurs mois, n'ont pas résolu les symptômes — et jamais en
      remplacement de la rééducation. Les meilleurs résultats sont obtenus avec un PRP guidé par échographie tout en
      poursuivant le programme d'exercices.
    </p>
    <div className="pa-keybox">
      <strong>Pourquoi cela diffère d'un corticoïde</strong>
      Contrairement à une injection de corticoïde, le PRP n'affaiblit pas le tendon : il s'agit d'une approche
      régénérative (elle stimule la réparation) plutôt que simplement anti-inflammatoire.
    </div>
  </>
);

export default function Page() {
  return (
    <PortedArticle
      slug="tendao-rotuliano-tendinite-drnunocamelo"
      lang="fr"
      title={TITLE}
      description={DESCRIPTION}
      notice={NOTICE}
      heroImage="/img/hero/tendao-atleta.jpg"
      eyebrow="Tendinopathie · Genou du sauteur"
      extra={PRP}
    />
  );
}
