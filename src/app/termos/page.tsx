import type { Metadata } from "next";
import { legalCss } from "../privacidade/legal-css";

export const metadata: Metadata = {
  title: "Termos de Utilização — Acompanhamento Pós-operatório | ConsultaJoelho.pt",
  description:
    "Termos de utilização da app e dos emails de acompanhamento pós-operatório do Dr. Nuno Camelo Barbosa.",
  alternates: { canonical: "https://www.consultajoelho.pt/termos" },
};

export default function TermosPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: legalCss }} />
      <section className="legal-hero hero">
        <h1>Termos de utilização</h1>
        <p>App e emails de acompanhamento pós-operatório.</p>
      </section>

      <article className="legal">
        <ol>
          <li>
            A app e os emails de acompanhamento são um apoio à sua recuperação. Não são um serviço de urgência nem
            substituem contacto médico.
          </li>
          <li>
            As mensagens não são lidas em tempo real. Para situações urgentes contacte o WhatsApp{" "}
            <a href="https://wa.me/351912188800" rel="noopener noreferrer" target="_blank">
              +351 912 188 800
            </a>{" "}
            ou, se não conseguir, o serviço de urgência do hospital da sua área de residência (SNS 24:{" "}
            <a href="tel:+351808242424">808 24 24 24</a>; emergência: <a href="tel:112">112</a>).
          </li>
          <li>
            As sugestões de medicação e instruções são gerais e seguem o plano que lhe foi indicado na consulta; em caso
            de dúvida ou alteração, siga a indicação do seu médico.
          </li>
          <li>As clínicas indicadas são sugestões de proximidade, sem vínculo comercial garantido.</li>
          <li>
            A avaliação no Google é voluntária e não influencia os cuidados prestados. Não inclua informação clínica na
            avaliação.
          </li>
          <li>
            Pode deixar de receber os emails em qualquer momento, escrevendo para{" "}
            <a href="mailto:joelho@consultajoelho.pt">joelho@consultajoelho.pt</a>.
          </li>
        </ol>

        <p className="legal-meta">
          Ver também a <a href="/privacidade">política de privacidade</a>.
        </p>
      </article>
    </>
  );
}
