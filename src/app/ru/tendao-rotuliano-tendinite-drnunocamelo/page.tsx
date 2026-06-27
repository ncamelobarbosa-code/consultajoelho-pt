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

const NOTICE = {
  title: "Важное замечание о лечении",
  body: "При тендинопатии надколенника первая линия — прогрессивные нагрузочные упражнения (эксцентрические/изометрические) под контролем специалиста. Внутрисухожильная инъекция кортикостероида не рекомендуется — она связана с риском разрыва сухожилия.",
};

const PRP = (
  <>
    <h2>А что насчёт PRP (обогащённой тромбоцитами плазмы)?</h2>
    <p>
      PRP — обогащённая тромбоцитами плазма, полученная из собственной крови пациента — играет всё более
      значимую роль при тендинопатии надколенника, не отвечающей на консервативное лечение. Концентрируя факторы
      роста, она создаёт более благоприятную биологическую среду для восстановления сухожилия.
    </p>
    <p>
      Современные данные определяют её как метод второй линии: когда прогрессивные нагрузочные упражнения,
      правильно выполняемые в течение нескольких месяцев, не устранили симптомы, — и никогда как замену
      реабилитации. Лучшие результаты даёт PRP под ультразвуковым контролем при продолжении программы упражнений.
    </p>
    <div className="pa-keybox">
      <strong>Чем отличается от кортикостероида</strong>
      В отличие от инъекции кортикостероида, PRP не ослабляет сухожилие: это регенеративный подход (стимулирует
      восстановление), а не просто противовоспалительный.
    </div>
  </>
);

export default function Page() {
  return (
    <PortedArticle
      slug="tendao-rotuliano-tendinite-drnunocamelo"
      lang="ru"
      title={"Тендинопатия надколенника: тендинит коленного сустава"}
      description={DESCRIPTION}
      notice={NOTICE}
      heroImage="/img/hero/tendao-atleta.jpg"
      eyebrow="Тендинопатия · Колено прыгуна"
      extra={PRP}
    />
  );
}
