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
  body: "For patellar tendinopathy, the first line is progressive loading exercise (eccentric/isometric) under guidance. Intratendinous corticosteroid injection is discouraged — it carries a risk of tendon rupture.",
};

const PRP = (
  <>
    <h2>What about PRP (platelet-rich plasma)?</h2>
    <p>
      PRP — platelet-rich plasma obtained from the patient&rsquo;s own blood — has gained a meaningful role in
      patellar tendinopathy that does not respond to conservative care. By concentrating growth factors, it aims
      to create a biological environment more favourable to tendon repair.
    </p>
    <p>
      Current evidence positions it as a second-line option: when progressive loading exercise, properly carried
      out over several months, has not resolved symptoms — and never as a replacement for rehabilitation. The best
      results come from ultrasound-guided PRP while keeping the exercise programme going.
    </p>
    <div className="pa-keybox">
      <strong>Why it differs from a corticosteroid</strong>
      Unlike a corticosteroid injection, PRP does not weaken the tendon: it is a regenerative approach (it
      stimulates repair) rather than merely anti-inflammatory.
    </div>
  </>
);

export default function Page() {
  return (
    <PortedArticle
      slug="tendao-rotuliano-tendinite-drnunocamelo"
      lang="en"
      title={TITLE}
      description={DESCRIPTION}
      notice={NOTICE}
      heroImage="/img/hero/tendao-atleta.jpg"
      eyebrow="Tendinopathy · Jumper's knee"
      extra={PRP}
    />
  );
}
