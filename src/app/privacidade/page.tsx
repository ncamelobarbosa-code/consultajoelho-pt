import type { Metadata } from "next";
import { legalCss } from "./legal-css";

export const metadata: Metadata = {
  title: "Política de Privacidade — Acompanhamento Pós-operatório | ConsultaJoelho.pt",
  description:
    "Como tratamos os seus dados no acompanhamento pós-operatório do Dr. Nuno Camelo Barbosa: responsável, finalidades, base legal, conservação e direitos.",
  alternates: { canonical: "https://www.consultajoelho.pt/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: legalCss }} />
      <section className="legal-hero hero">
        <h1>Política de privacidade — acompanhamento pós-operatório</h1>
        <p>Como tratamos os seus dados nos emails de acompanhamento e na app.</p>
      </section>

      <article className="legal">
        <h2>Quem é o responsável</h2>
        <p>
          consultajoelho.pt by Napiszodis (Napiszodis, Lda.), Dr. Nuno Camelo Barbosa. Contacto:{" "}
          <a href="mailto:joelho@consultajoelho.pt">joelho@consultajoelho.pt</a>.
        </p>

        <h2>Que dados tratamos</h2>
        <ol>
          <li>
            Comunicações de seguimento (se autorizar): nome, email, nº de processo, data e tipo de cirurgia, para lhe
            enviarmos os emails de acompanhamento. Estes dados ficam numa folha de acesso restrito, apenas ao Dr. Nuno
            Camelo Barbosa e ao secretariado.
          </li>
          <li>
            Investigação (se autorizar, em separado): um código de acompanhamento (sem o seu nome), o ano de nascimento,
            o mês e ano da cirurgia, o tipo de cirurgia e as respostas aos questionários (IKDC, Tegner, dor 0–10). Estes
            dados são pseudonimizados: não contêm o seu nome, email nem nº de processo. A ligação entre o código e a sua
            identidade existe apenas na folha de acesso restrito referida acima.
          </li>
          <li>
            A app guarda o seu código apenas no seu dispositivo. Não recolhemos fotografias, localização nem outros
            dados.
          </li>
        </ol>

        <h2>Para quê</h2>
        <p>
          Para o acompanhar após a cirurgia e, se autorizar, para avaliar resultados clínicos de forma agregada (estudos
          e publicações científicas, sem possibilidade de o identificar).
        </p>

        <h2>Base legal</h2>
        <p>
          O seu consentimento (RGPD, art.º 6.º, n.º 1, al. a) e art.º 9.º, n.º 2, al. a)). Pode ser retirado a qualquer
          momento, sem consequências para os seus cuidados.
        </p>

        <h2>Quem recebe os dados</h2>
        <p>
          Prestadores técnicos que armazenam e enviam as comunicações (Google, Make). Não vendemos nem cedemos dados a
          terceiros para marketing.
        </p>

        <h2>Conservação</h2>
        {/* Prazo proposto, ainda por confirmar pelo Dr. Nuno Camelo Barbosa (ver PR feat/app-doentes). */}
        <p>
          Dados de contacto: até 3 meses após o último questionário (24 meses). Dados pseudonimizados de investigação:
          até ao fim do estudo e publicação.
        </p>

        <h2>Os seus direitos</h2>
        <p>
          Acesso, retificação, apagamento, limitação, oposição e portabilidade. Para exercer qualquer um, escreva para{" "}
          <a href="mailto:joelho@consultajoelho.pt">joelho@consultajoelho.pt</a>, indicando o seu código. Pode também
          apresentar reclamação à CNPD (
          <a href="https://www.cnpd.pt" rel="noopener noreferrer" target="_blank">
            www.cnpd.pt
          </a>
          ).
        </p>

        <div className="legal-note">
          <p style={{ margin: 0 }}>
            <strong>Importante.</strong> Esta app e os emails automáticos não substituem uma consulta. Em caso de
            urgência, ligue 112.
          </p>
        </div>

        <p className="legal-meta">
          Ver também os <a href="/termos">termos de utilização</a>.
        </p>
      </article>
    </>
  );
}
