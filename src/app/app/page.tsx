import type { Metadata, Viewport } from "next";
import AppClient from "./AppClient";
import { AVISO_INTRO, EMAIL, HOSPITAIS, SAIBA_MAIS, WHATSAPP_HREF, WHATSAPP_LABEL } from "./config";
import { IconAlert, IconChat, IconMail, IconPill, IconSnow, IconMuscle } from "./icons";
import SaibaMais from "./SaibaMais";

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
// Animações só com prefers-reduced-motion: no-preference.
const css = `
.cjapp{--teal:#035772;--teal-dark:#022d3d;--teal-soft:#e7f1f3;--sage:#AACBA8;--sage-soft:#edf4ec;--bg:#F6F9F5;
  --text:#091405;--muted:#3d5240;--border:#d6e2d5;--warn-bg:#fff4d6;--warn:#7a4f00;--warn-ink:#3d2800;
  --shadow:0 1px 2px rgba(2,45,61,.06),0 8px 24px rgba(2,45,61,.07);--ease:cubic-bezier(.2,.7,.2,1);
  font-family:'Space Grotesk',-apple-system,system-ui,sans-serif;background:var(--bg);color:var(--text);
  font-size:1.125rem;line-height:1.6;min-height:100vh;padding:0 0 calc(2rem + env(safe-area-inset-bottom));}
.cjapp *{box-sizing:border-box;}
.cjapp-wrap{max-width:560px;margin:0 auto;padding:0 1rem;}

/* Cabeçalho */
.cjapp-top{background:linear-gradient(135deg,var(--teal-dark) 0%,var(--teal) 100%);color:#fff;
  padding:calc(1.1rem + env(safe-area-inset-top)) 0 1.6rem;position:relative;overflow:hidden;}
.cjapp-top::after{content:"";position:absolute;right:-60px;top:-60px;width:200px;height:200px;border-radius:50%;
  border:28px solid rgba(170,203,168,.14);}
.cjapp-top .cjapp-wrap{display:flex;align-items:center;gap:.9rem;position:relative;z-index:1;}
.cjapp-logo{flex:0 0 auto;width:52px;height:52px;border-radius:14px;background:#fff;display:grid;place-items:center;
  box-shadow:0 4px 14px rgba(0,0,0,.18);}
.cjapp-logo img{width:40px;height:40px;display:block;}
.cjapp-brand{font-weight:700;font-size:1.2rem;letter-spacing:-0.01em;line-height:1.2;}
.cjapp-brand span{color:var(--sage);}
.cjapp-sub{font-size:.98rem;opacity:.9;margin:.15rem 0 0;line-height:1.35;}

/* Cartões */
.cjapp-main{padding-top:1.1rem;}
.cjapp-card{background:#fff;border:1px solid var(--border);border-radius:20px;padding:1.25rem;margin:0 0 1rem;box-shadow:var(--shadow);}
.cjapp-head{display:flex;align-items:center;gap:.75rem;margin:0 0 .6rem;}
.cjapp-ico{flex:0 0 auto;width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:var(--teal-soft);color:var(--teal);}
.cjapp-card h2{font-size:1.3rem;line-height:1.25;margin:0;color:var(--text);font-weight:700;letter-spacing:-0.01em;}
.cjapp-card p{margin:0 0 .75rem;}
.cjapp-muted{color:var(--muted);font-size:1rem;}

/* Botões */
.cjapp-btn{display:flex;align-items:center;justify-content:center;gap:.55rem;width:100%;min-height:58px;padding:.8rem 1rem;
  border-radius:14px;font:inherit;font-weight:700;font-size:1.125rem;text-decoration:none;text-align:center;cursor:pointer;
  border:2px solid var(--teal);background:var(--teal);color:#fff;margin:.6rem 0 0;
  transition:background-color .2s var(--ease),border-color .2s var(--ease),color .2s var(--ease),transform .15s var(--ease),box-shadow .2s var(--ease);
  -webkit-tap-highlight-color:transparent;}
.cjapp-btn:hover{background:var(--teal-dark);border-color:var(--teal-dark);box-shadow:0 6px 16px rgba(3,87,114,.22);}
.cjapp-btn:active{transform:scale(.98);}
.cjapp-btn--ghost{background:#fff;color:var(--teal);}
.cjapp-btn--ghost:hover{background:var(--teal-soft);color:var(--teal-dark);box-shadow:none;}
.cjapp-btn:disabled,.cjapp-btn[aria-disabled="true"]{background:#e9ede8;border-color:#d3dad2;color:#4a5449;cursor:not-allowed;box-shadow:none;transform:none;}
.cjapp :focus-visible{outline:3px solid #b07a00;outline-offset:3px;}
.cjapp-row{display:flex;gap:.6rem;}
.cjapp-row > *{flex:1;}

/* Formulários */
.cjapp label{font-weight:600;display:block;margin-bottom:.35rem;}
.cjapp-input{width:100%;min-height:58px;font:inherit;font-size:1.3rem;letter-spacing:.08em;padding:.6rem .9rem;border:2px solid #7d8c7c;
  border-radius:14px;background:#fff;color:var(--text);text-transform:uppercase;transition:border-color .2s var(--ease),box-shadow .2s var(--ease);}
.cjapp-input:focus{outline:none;border-color:var(--teal);box-shadow:0 0 0 4px rgba(3,87,114,.15);}
.cjapp-input[aria-invalid="true"]{border-color:#9b1c1c;}
.cjapp-err{color:#9b1c1c;font-weight:600;margin:.6rem 0 0;}
.cjapp-ok{color:#1d5c2e;font-weight:700;margin:0;font-size:1.15rem;}
.cjapp fieldset{border:0;padding:0;margin:0 0 1.1rem;}
.cjapp legend{font-weight:600;margin-bottom:.5rem;padding:0;}

/* Código guardado */
.cjapp-codebox{display:flex;align-items:center;gap:.75rem;background:var(--sage-soft);border:1.5px solid var(--sage);border-radius:14px;padding:.8rem 1rem;margin:.2rem 0 .4rem;}
.cjapp-codebox .cjapp-tick{width:34px;height:34px;border-radius:50%;background:#1d5c2e;color:#fff;display:grid;place-items:center;flex:0 0 auto;}
.cjapp-code{font-size:1.45rem;font-weight:700;letter-spacing:.08em;color:var(--teal);margin:0;line-height:1.2;}

/* Questionários */
.cjapp-quest{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-top:.4rem;}
.cjapp-tile{display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;gap:.2rem;min-height:96px;
  padding:.85rem .95rem;border-radius:16px;border:2px solid var(--teal);background:#fff;color:var(--teal);text-decoration:none;font:inherit;
  text-align:left;cursor:pointer;position:relative;
  transition:background-color .2s var(--ease),color .2s var(--ease),transform .15s var(--ease),box-shadow .2s var(--ease);}
.cjapp-tile b{font-size:1.6rem;line-height:1;letter-spacing:-0.02em;}
.cjapp-tile small{font-size:.98rem;font-weight:600;color:var(--muted);transition:color .2s var(--ease);}
.cjapp-tile svg{position:absolute;right:.75rem;top:.8rem;}
.cjapp-tile:hover{background:var(--teal);color:#fff;box-shadow:0 8px 20px rgba(3,87,114,.22);}
.cjapp-tile:hover small{color:rgba(255,255,255,.9);}
.cjapp-tile:active{transform:scale(.97);}
.cjapp-tile:disabled{border-color:#d3dad2;background:#f1f4f0;color:#4a5449;cursor:not-allowed;box-shadow:none;}
.cjapp-tile:disabled small{color:#4a5449;}
.cjapp-hint{display:flex;align-items:center;gap:.5rem;margin:.8rem 0 0 !important;color:var(--muted);font-size:1rem;}

/* Escala de dor */
.cjapp-seg{display:grid;grid-template-columns:1fr 1fr;gap:.25rem;background:#eef2ed;border-radius:14px;padding:.3rem;}
.cjapp-seg .cjapp-opt span{border:0;background:transparent;min-height:50px;border-radius:11px;}
.cjapp-seg .cjapp-opt input:checked + span{background:#fff;color:var(--teal);box-shadow:0 2px 8px rgba(2,45,61,.12);}
.cjapp-scale{display:grid;grid-template-columns:repeat(6,1fr);gap:.45rem;}
.cjapp-opt{position:relative;margin:0 !important;}
.cjapp-opt input{position:absolute;opacity:0;width:1px;height:1px;}
.cjapp-opt span{display:flex;align-items:center;justify-content:center;min-height:56px;border:2px solid #c3cec2;border-radius:14px;background:#fff;
  font-weight:700;font-size:1.15rem;cursor:pointer;text-align:center;padding:.3rem;color:var(--text);
  transition:background-color .2s var(--ease),border-color .2s var(--ease),color .2s var(--ease),transform .15s var(--ease),box-shadow .2s var(--ease);}
.cjapp-opt span:hover{border-color:var(--teal);}
.cjapp-opt:active span{transform:scale(.94);}
.cjapp-opt input:focus-visible + span{outline:3px solid #b07a00;outline-offset:3px;}
.cjapp-scale .cjapp-opt input:checked + span{background:var(--c);border-color:var(--c);color:#fff;transform:scale(1.06);box-shadow:0 6px 14px rgba(0,0,0,.16);}
.cjapp-scale .cjapp-opt span{border-bottom:4px solid var(--c);}
.cjapp-ends{display:flex;justify-content:space-between;font-size:.95rem;color:var(--muted);margin-top:.45rem;}
.cjapp-readout{display:flex;align-items:baseline;gap:.5rem;min-height:2.2rem;margin:.6rem 0 0;}
.cjapp-readout b{font-size:1.8rem;line-height:1;color:var(--c,var(--text));transition:color .2s var(--ease);}
.cjapp-readout span{font-weight:600;color:var(--muted);}
.cjapp-spin{width:20px;height:20px;border-radius:50%;border:3px solid rgba(255,255,255,.45);border-top-color:#fff;animation:cjapp-rot .8s linear infinite;}

/* Confirmação */
.cjapp-done{display:flex;align-items:center;gap:.8rem;margin-bottom:.9rem;}
.cjapp-done svg{flex:0 0 auto;}
.cjapp-done circle{fill:#1d5c2e;}
.cjapp-done path{fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:24;stroke-dashoffset:0;}

/* Saiba mais */
.cjapp-mais{display:inline-flex;align-items:center;gap:.35rem;margin-top:.9rem;padding:.45rem .85rem;min-height:44px;border-radius:999px;
  background:var(--teal-soft);color:var(--teal);font-weight:600;font-size:.98rem;text-decoration:none;
  transition:background-color .2s var(--ease),transform .15s var(--ease);}
.cjapp-mais:hover{background:#d6e8ec;}
.cjapp-mais:active{transform:scale(.97);}
.cjapp-mais svg{transition:transform .2s var(--ease);}
.cjapp-mais:hover svg{transform:translate(2px,-2px);}

/* Medicação */
.cjapp-meds{list-style:none;margin:.4rem 0 0;padding:0;display:grid;gap:.55rem;}
.cjapp-meds li{border:1px solid var(--border);border-left:4px solid var(--teal);border-radius:12px;padding:.7rem .9rem;background:#fbfdfb;}
.cjapp-meds li.sos{border-left-color:#a15c00;}
.cjapp-meds b{display:block;font-size:1.1rem;}
.cjapp-meds li > span{display:block;color:var(--muted);font-size:1rem;line-height:1.45;}
.cjapp-tag{display:inline-block;font-size:.8rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border-radius:999px;padding:.1rem .55rem;margin-left:.4rem;vertical-align:middle;background:#fdebd3;color:#7a4f00;}
.cjapp-nota{color:var(--muted);font-size:1rem;margin:.8rem 0 0 !important;}
.cjapp-nota a{color:var(--teal);font-weight:600;}

/* Quadricípite (destaque) */
.cjapp-destaque{background:linear-gradient(160deg,#ffffff 0%,var(--sage-soft) 100%);border:2px solid var(--sage);}
.cjapp-destaque .cjapp-ico{background:var(--teal);color:#fff;}
.cjapp-kicker{display:inline-block;font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#1d5c2e;margin-bottom:.35rem;}

/* Urgência (discreto, no fim) */
.cjapp-urg{scroll-margin-top:16px;border:1px solid var(--border);border-radius:16px;padding:1rem 1.1rem;margin:0 0 1rem;background:transparent;color:var(--muted);font-size:1rem;}
.cjapp-urg h2{display:flex;align-items:center;gap:.45rem;font-size:1.05rem;color:var(--text);margin:0 0 .4rem;font-weight:700;}
.cjapp-urg h2 svg{color:#7a4f00;}
.cjapp-urg p{margin:0 0 .5rem;line-height:1.5;}
.cjapp-urg ol{list-style:decimal;margin:0;padding-left:1.4rem;display:grid;gap:.35rem;line-height:1.5;}
.cjapp-urg a{color:var(--teal);font-weight:600;white-space:nowrap;}
.cjapp-urg ul.cjapp-hosp{list-style:none;padding:0;margin:.3rem 0 0;display:grid;gap:.2rem;}
.cjapp-urg:target{animation:cjapp-pulse 1.2s var(--ease) 1;}

/* Rodapé */
.cjapp-foot{text-align:center;font-size:1rem;color:var(--muted);margin-top:1.75rem;}
.cjapp-foot a{color:var(--teal);font-weight:600;}
.cjapp-foot nav{display:flex;justify-content:center;gap:1.25rem;margin-bottom:.5rem;}

/* Transições */
@keyframes cjapp-rot{to{transform:rotate(360deg);}}
@keyframes cjapp-up{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
@keyframes cjapp-fade{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}
@keyframes cjapp-pop{0%{transform:scale(.6);opacity:0;}70%{transform:scale(1.08);opacity:1;}100%{transform:scale(1);}}
@keyframes cjapp-draw{from{stroke-dashoffset:24;}to{stroke-dashoffset:0;}}
@keyframes cjapp-shake{0%,100%{transform:none;}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}
@keyframes cjapp-pulse{0%{box-shadow:0 0 0 0 rgba(3,87,114,.35);}100%{box-shadow:0 0 0 16px rgba(217,166,58,0);}}
@media (prefers-reduced-motion: no-preference){
  .cjapp-main > *{animation:cjapp-up .5s var(--ease) both;}
  .cjapp-main > *:nth-child(2){animation-delay:.06s;}
  .cjapp-main > *:nth-child(3){animation-delay:.12s;}
  .cjapp-main > *:nth-child(4){animation-delay:.18s;}
  .cjapp-main > *:nth-child(5){animation-delay:.24s;}
  .cjapp-main > *:nth-child(n+6){animation-delay:.3s;}
  .cjapp-swap{animation:cjapp-fade .35s var(--ease) both;}
  .cjapp-codebox .cjapp-tick,.cjapp-done svg{animation:cjapp-pop .45s var(--ease) both;}
  .cjapp-done path{animation:cjapp-draw .4s .2s var(--ease) both;}
  .cjapp-err{animation:cjapp-shake .3s var(--ease) 1;}
  html:has(.cjapp){scroll-behavior:smooth;}
}
@media (prefers-reduced-motion: reduce){
  .cjapp *{transition:none !important;animation:none !important;}
}
@media (max-width:359px){.cjapp-quest{grid-template-columns:1fr;}.cjapp-scale{grid-template-columns:repeat(4,1fr);}}
`;

export default function AppPage() {
  return (
    <main className="cjapp">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <header className="cjapp-top">
        <div className="cjapp-wrap">
          <div className="cjapp-logo">
            {/* eslint-disable-next-line @next/next/no-img-element -- ícone local, em cache para offline */}
            <img src="/app/icon-192.png" alt="" width={40} height={40} />
          </div>
          <div>
            <div className="cjapp-brand">
              ConsultaJoelho<span>.pt</span>
            </div>
            <p className="cjapp-sub">Acompanhamento pós-operatório · Dr. Nuno Camelo Barbosa</p>
          </div>
        </div>
      </header>

      <div className="cjapp-wrap cjapp-main">
        <AppClient info={<InfoCards />} />

        <section className="cjapp-card" aria-labelledby="cjapp-contactos">
          <div className="cjapp-head">
            <span className="cjapp-ico"><IconChat /></span>
            <h2 id="cjapp-contactos">Contactos</h2>
          </div>
          <a className="cjapp-btn" href={WHATSAPP_HREF} rel="noopener noreferrer" target="_blank">
            <IconChat /> WhatsApp {WHATSAPP_LABEL}
          </a>
          <a className="cjapp-btn cjapp-btn--ghost" href={`mailto:${EMAIL}`}>
            <IconMail /> {EMAIL}
          </a>
        </section>

        <section id="cjapp-urgencia" className="cjapp-urg" aria-labelledby="cjapp-urg-t">
          <h2 id="cjapp-urg-t">
            <IconAlert size={18} /> Em caso de urgência
          </h2>
          <p>{AVISO_INTRO}</p>
          <ol>
            <li>
              Contacte o seu médico pelo{" "}
              <a href={WHATSAPP_HREF} rel="noopener noreferrer" target="_blank">WhatsApp {WHATSAPP_LABEL}</a>.
            </li>
            <li>
              Se não conseguir, contacte ou dirija-se à urgência do hospital onde é assistido:
              <ul className="cjapp-hosp">
                {HOSPITAIS.map((h) => (
                  <li key={h.nome}>
                    {h.nome}: <a href={h.href}>{h.tel}</a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              Emergência: <a href="tel:112">112</a> · SNS 24: <a href="tel:+351808242424">808 24 24 24</a>.
            </li>
          </ol>
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

// Cartões informativos (estáticos, legíveis offline). Esquema habitual do Dr. Nuno Camelo Barbosa.
function InfoCards() {
  return (
    <>
      <section className="cjapp-card" aria-labelledby="cjapp-med">
        <div className="cjapp-head">
          <span className="cjapp-ico"><IconPill /></span>
          <h2 id="cjapp-med">Medicação após a cirurgia</h2>
        </div>
        <p className="cjapp-muted">
          Este é o esquema habitual. Siga sempre a receita e as indicações da sua alta: podem ser diferentes em caso de
          alergias, intolerâncias ou outras doenças.
        </p>
        <ul className="cjapp-meds">
          <li>
            <b>Paracetamol 1 g</b>
            <span>1 comprimido de 8 em 8 horas, até acabar a caixa.</span>
          </li>
          <li>
            <b>Etoricoxib</b>
            <span>1 comprimido por dia, até acabar a caixa.</span>
          </li>
          <li>
            <b>Vitamina C 1 g</b>
            <span>1 por dia, até acabar a caixa.</span>
          </li>
          <li className="sos">
            <b>
              Tapentadol 50 mg <span className="cjapp-tag">SOS</span>
            </b>
            <span>Se tiver dor: 1 comprimido depois do jantar ou de 12 em 12 horas.</span>
          </li>
          <li>
            <b>Enoxaparina 40 mg</b>
            <span>1 injeção subcutânea por dia durante 1 mês, para prevenir tromboses. A dose depende do peso: use a que lhe foi receitada.</span>
          </li>
        </ul>
        <SaibaMais href={SAIBA_MAIS.medicacao}>anti-inflamatórios</SaibaMais>
      </section>

      <section className="cjapp-card cjapp-destaque" aria-labelledby="cjapp-quad">
        <div className="cjapp-head">
          <span className="cjapp-ico"><IconMuscle /></span>
          <h2 id="cjapp-quad">Quadricípite: o mais importante</h2>
        </div>
        <span className="cjapp-kicker">Comece desde os primeiros dias</span>
        <p>
          Faça os <strong>exercícios isométricos do quadricípite</strong>: contrair a coxa com a perna esticada, sem
          dobrar o joelho, como lhe foi ensinado.
        </p>
        <p style={{ marginBottom: 0 }}>
          Evitam a <strong>inibição muscular artrogénica (AMI)</strong>, quando o músculo &quot;desliga&quot; depois da
          cirurgia e deixa de responder. Um quadricípite ativo é a base de toda a recuperação.
        </p>
        <SaibaMais href={SAIBA_MAIS.quadricipite}>quadricípite e AMI</SaibaMais>
      </section>

      <section className="cjapp-card" aria-labelledby="cjapp-frio">
        <div className="cjapp-head">
          <span className="cjapp-ico"><IconSnow /></span>
          <h2 id="cjapp-frio">Gelo e compressão</h2>
        </div>
        <p>
          Faça <strong>crioterapia 3 a 4 vezes por dia</strong>.
        </p>
        <p style={{ marginBottom: 0 }}>
          Recomendo o <strong>Game Ready</strong> ou sistemas semelhantes (frio com compressão), porque ajudam a acelerar
          a recuperação.
        </p>
        <SaibaMais href={SAIBA_MAIS.recuperacao}>recuperar da cirurgia</SaibaMais>
      </section>
    </>
  );
}
