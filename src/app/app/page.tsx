import type { Metadata, Viewport } from "next";
import AppClient from "./AppClient";
import { AVISO_SEGURANCA, EMAIL, WHATSAPP_HREF, WHATSAPP_LABEL } from "./config";

// PWA de acompanhamento pós-operatório. Não indexada, fora do sitemap,
// sem analytics nem cookies (o layout esconde o chrome do site nesta rota).
export const metadata: Metadata = {
  title: "Acompanhamento pós-operatório | ConsultaJoelho.pt",
  description: "Contactos, questionários e escala de dor para doentes do Dr. Nuno Camelo Barbosa.",
  manifest: "/app/manifest.webmanifest",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  appleWebApp: { capable: true, title: "Joelho", statusBarStyle: "default" },
  icons: { apple: "/app/apple-touch-icon.png" },
  referrer: "no-referrer",
};

export const viewport: Viewport = {
  themeColor: "#035772",
  width: "device-width",
  initialScale: 1,
};

// Estilos locais: o aviso e os contactos ficam legíveis mesmo offline, sem JS.
const css = `
.cjapp{--teal:#035772;--teal-dark:#022d3d;--sage:#AACBA8;--bg:#F6F9F5;--text:#091405;--muted:#3d5240;--border:#c9d8c8;
  font-family:'Space Grotesk',-apple-system,system-ui,sans-serif;background:var(--bg);color:var(--text);
  font-size:1.125rem;line-height:1.6;min-height:100vh;padding:0 0 2rem;}
.cjapp *{box-sizing:border-box;}
.cjapp-wrap{max-width:560px;margin:0 auto;padding:0 1rem;}
.cjapp-top{background:var(--teal);color:#fff;padding:1rem 0;}
.cjapp-brand{font-weight:700;font-size:1.25rem;letter-spacing:-0.01em;}
.cjapp-brand span{color:var(--sage);}
.cjapp-sub{font-size:1rem;opacity:.92;margin:.15rem 0 0;}
.cjapp-urgente{position:sticky;top:0;z-index:10;background:#fff4d6;border-bottom:2px solid #b07a00;color:#3d2800;font-size:1rem;}
.cjapp-urgente .cjapp-wrap{display:flex;align-items:center;gap:1rem;min-height:48px;flex-wrap:wrap;}
.cjapp-urgente span{font-weight:700;}
.cjapp-urgente a{color:#3d2800;font-weight:700;text-decoration:underline;text-underline-offset:3px;padding:.5rem 0;}
.cjapp-urgente a:last-child{margin-left:auto;}
.cjapp-aviso{scroll-margin-top:64px;background:#fff4d6;border:2px solid #b07a00;border-radius:12px;padding:1rem 1.1rem;margin:1rem 0;color:#3d2800;}
.cjapp-aviso strong{display:block;font-size:1.05rem;margin-bottom:.35rem;color:#3d2800;}
.cjapp-aviso p{margin:0;font-size:1.05rem;line-height:1.55;}
.cjapp-aviso a{color:#3d2800;font-weight:700;}
.cjapp-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:1.15rem;margin:1rem 0;}
.cjapp-card h2{font-size:1.3rem;line-height:1.3;margin:0 0 .5rem;color:var(--text);font-weight:700;}
.cjapp-card p{margin:0 0 .75rem;}
.cjapp-muted{color:var(--muted);font-size:1rem;}
.cjapp-btn{display:flex;align-items:center;justify-content:center;gap:.5rem;width:100%;min-height:56px;padding:.8rem 1rem;
  border-radius:12px;font:inherit;font-weight:700;font-size:1.125rem;text-decoration:none;text-align:center;cursor:pointer;
  border:2px solid var(--teal);background:var(--teal);color:#fff;margin:.5rem 0 0;}
.cjapp-btn:hover{background:var(--teal-dark);border-color:var(--teal-dark);}
.cjapp-btn--ghost{background:#fff;color:var(--teal);}
.cjapp-btn--ghost:hover{background:#eef5f1;color:var(--teal-dark);}
.cjapp-btn[aria-disabled="true"],.cjapp-btn:disabled{background:#e4e9e3;border-color:#c9d1c8;color:#4a5449;cursor:not-allowed;}
.cjapp :focus-visible{outline:3px solid #b07a00;outline-offset:3px;}
.cjapp label{font-weight:600;display:block;margin-bottom:.35rem;}
.cjapp-input{width:100%;min-height:56px;font:inherit;font-size:1.25rem;letter-spacing:.06em;padding:.6rem .8rem;border:2px solid #6b7c6a;border-radius:12px;background:#fff;color:var(--text);text-transform:uppercase;}
.cjapp-err{color:#9b1c1c;font-weight:600;margin:.5rem 0 0;}
.cjapp-ok{color:#1d5c2e;font-weight:600;margin:.5rem 0 0;}
.cjapp-code{font-size:1.4rem;font-weight:700;letter-spacing:.08em;color:var(--teal);}
.cjapp-row{display:flex;gap:.6rem;}
.cjapp-row > *{flex:1;}
.cjapp fieldset{border:0;padding:0;margin:0 0 1rem;}
.cjapp legend{font-weight:600;margin-bottom:.4rem;padding:0;}
.cjapp-seg{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;}
.cjapp-scale{display:grid;grid-template-columns:repeat(6,1fr);gap:.45rem;}
.cjapp-opt{position:relative;}
.cjapp-opt input{position:absolute;opacity:0;width:1px;height:1px;}
.cjapp-opt span{display:flex;align-items:center;justify-content:center;min-height:56px;border:2px solid #6b7c6a;border-radius:12px;background:#fff;font-weight:700;font-size:1.15rem;cursor:pointer;text-align:center;padding:.3rem;color:var(--text);}
.cjapp-opt input:checked + span{background:var(--teal);border-color:var(--teal);color:#fff;}
.cjapp-opt input:focus-visible + span{outline:3px solid #b07a00;outline-offset:3px;}
.cjapp-ends{display:flex;justify-content:space-between;font-size:.95rem;color:var(--muted);margin-top:.35rem;}
.cjapp-foot{text-align:center;font-size:1rem;color:var(--muted);margin-top:1.5rem;}
.cjapp-foot a{color:var(--teal);font-weight:600;}
.cjapp-foot nav{display:flex;justify-content:center;gap:1.25rem;margin-bottom:.5rem;}
`;

export default function AppPage() {
  return (
    <main className="cjapp">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <header className="cjapp-top">
        <div className="cjapp-wrap">
          <div className="cjapp-brand">
            ConsultaJoelho<span>.pt</span>
          </div>
          <p className="cjapp-sub">Acompanhamento pós-operatório · Dr. Nuno Camelo Barbosa</p>
        </div>
      </header>

      <div className="cjapp-urgente" role="note" aria-label="Contacto urgente">
        <div className="cjapp-wrap">
          <span>Urgente?</span>
          <a href={WHATSAPP_HREF} rel="noopener noreferrer" target="_blank">WhatsApp</a>
          <a href="tel:112">112</a>
          <a href="#cjapp-aviso">Ler aviso</a>
        </div>
      </div>

      <div className="cjapp-wrap">
        <AppClient />

        <section className="cjapp-card" aria-labelledby="cjapp-contactos">
          <h2 id="cjapp-contactos">Contactos</h2>
          <a className="cjapp-btn" href={WHATSAPP_HREF} rel="noopener noreferrer" target="_blank">
            WhatsApp {WHATSAPP_LABEL}
          </a>
          <a className="cjapp-btn cjapp-btn--ghost" href={`mailto:${EMAIL}`}>
            Email {EMAIL}
          </a>
        </section>

        <section id="cjapp-aviso" className="cjapp-aviso" role="note" aria-label="Aviso de segurança">
          <strong>Aviso de segurança</strong>
          <p>{AVISO_SEGURANCA}</p>
        </section>

        <footer className="cjapp-foot">
          <nav aria-label="Informação legal">
            <a href="/privacidade">Privacidade</a>
            <a href="/termos">Termos de utilização</a>
          </nav>
          <p>consultajoelho.pt by Napiszodis</p>
        </footer>
      </div>
    </main>
  );
}
