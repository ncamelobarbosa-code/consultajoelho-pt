"use client";

// Parte interativa da PWA /app: código do doente (só localStorage), questionários,
// escala de dor (VAS) e pedido de avaliação no Google. Sem cookies nem analytics.
import { useEffect, useState } from "react";
import {
  AVISO_SEGURANCA,
  CODIGO_RE,
  CODIGO_STORAGE_KEY,
  GOOGLE_REVIEW_HREF,
  QUESTIONARIOS,
  VAS_WEBHOOK,
  formUrl,
} from "./config";
import { IconArrow, IconCheck, IconClipboard, IconGauge, IconKey, IconStar } from "./icons";

type Momento = "D1" | "D7";

// Cores da escala 0–10 (verde → vermelho), todas com contraste AA com texto branco.
const COR_DOR = ["#2f6f3e", "#3b7a3a", "#4a7d2a", "#5e7a1a", "#7a6f00", "#8f6100", "#a15c00", "#b24c00", "#b93a0f", "#b42318", "#9b1c1c"];

function descreverDor(n: number): string {
  if (n === 0) return "Sem dor";
  if (n <= 3) return "Dor ligeira";
  if (n <= 6) return "Dor moderada";
  if (n <= 9) return "Dor intensa";
  return "Pior dor imaginável";
}
type Envio = "idle" | "sending" | "ok" | "error" | "offline";

function normalizar(v: string): string {
  const s = v.trim().toUpperCase().replace(/\s+/g, "");
  // Aceita "AB12CD" sem prefixo e completa para "NC-AB12CD".
  return /^[0-9A-F]{6}$/.test(s) ? `NC-${s}` : s;
}

function registarSW() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker
    .register("/app-sw.js", { scope: "/app" })
    .then(async (reg) => {
      await navigator.serviceWorker.ready;
      // Guarda também os recursos desta primeira visita (carregados antes do SW).
      const urls = performance
        .getEntriesByType("resource")
        .map((e) => e.name)
        .filter((u) => u.startsWith(location.origin));
      (reg.active ?? navigator.serviceWorker.controller)?.postMessage({ type: "cache-urls", urls });
    })
    .catch(() => {});
}

export default function AppClient() {
  const [codigo, setCodigo] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState(false);
  const [erroCodigo, setErroCodigo] = useState("");
  const [momento, setMomento] = useState<Momento | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [envio, setEnvio] = useState<Envio>("idle");

  useEffect(() => {
    let guardado: string | null = null;
    try {
      const v = localStorage.getItem(CODIGO_STORAGE_KEY);
      if (v && CODIGO_RE.test(v)) guardado = v;
    } catch {}
    // Leitura única do localStorage após hidratação (evita mismatch SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCodigo(guardado);
    setEditing(!guardado);
    registarSW();
  }, []);

  const guardar = (e: React.FormEvent) => {
    e.preventDefault();
    const v = normalizar(draft);
    if (!CODIGO_RE.test(v)) {
      setErroCodigo("Código inválido. O formato é NC- seguido de 6 caracteres (0–9 e A–F), por exemplo NC-3F9A0B.");
      return;
    }
    try {
      localStorage.setItem(CODIGO_STORAGE_KEY, v);
    } catch {}
    setCodigo(v);
    setDraft("");
    setErroCodigo("");
    setEditing(false);
  };

  const apagar = () => {
    try {
      localStorage.removeItem(CODIGO_STORAGE_KEY);
    } catch {}
    setCodigo(null);
    setEditing(true);
    setEnvio("idle");
  };

  const enviarVAS = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo || !momento || score === null || envio === "sending") return;
    if (!navigator.onLine) {
      setEnvio("offline");
      return;
    }
    setEnvio("sending");
    const qs = new URLSearchParams({ codigo, momento, score: String(score) });
    try {
      // "no-cors": o webhook só precisa de receber o pedido; a resposta não é lida.
      await fetch(`${VAS_WEBHOOK}?${qs.toString()}`, {
        method: "GET",
        mode: "no-cors",
        cache: "no-store",
        credentials: "omit",
        referrerPolicy: "no-referrer",
      });
      setEnvio("ok");
    } catch {
      setEnvio("error");
    }
  };

  const novoRegisto = () => {
    setEnvio("idle");
    setScore(null);
    setMomento(null);
  };

  const temCodigo = codigo !== null && !editing;

  return (
    <>
      <section className="cjapp-card" aria-labelledby="cjapp-codigo">
        <div className="cjapp-head">
          <span className="cjapp-ico"><IconKey /></span>
          <h2 id="cjapp-codigo">O seu código</h2>
        </div>
        {temCodigo ? (
          <div key="guardado" className="cjapp-swap">
            <div className="cjapp-codebox">
              <span className="cjapp-tick"><IconCheck size={20} /></span>
              <div>
                <p className="cjapp-code" aria-live="polite">{codigo}</p>
                <span className="cjapp-muted">Guardado apenas neste dispositivo</span>
              </div>
            </div>
            <div className="cjapp-row">
              <button type="button" className="cjapp-btn cjapp-btn--ghost" onClick={() => { setDraft(codigo ?? ""); setEditing(true); }}>
                Alterar
              </button>
              <button type="button" className="cjapp-btn cjapp-btn--ghost" onClick={apagar}>
                Apagar
              </button>
            </div>
          </div>
        ) : (
          <form key="form" className="cjapp-swap" onSubmit={guardar} noValidate>
            <p className="cjapp-muted">Está nos emails de acompanhamento (formato NC-XXXXXX). Fica guardado só neste dispositivo.</p>
            <label htmlFor="cjapp-codigo-input">Código</label>
            <input
              id="cjapp-codigo-input"
              className="cjapp-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="NC-XXXXXX"
              autoComplete="off"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              maxLength={12}
              aria-invalid={erroCodigo ? true : undefined}
              aria-describedby={erroCodigo ? "cjapp-codigo-err" : undefined}
            />
            {erroCodigo && (
              <p id="cjapp-codigo-err" className="cjapp-err" role="alert">
                {erroCodigo}
              </p>
            )}
            <button type="submit" className="cjapp-btn">Guardar código</button>
          </form>
        )}
      </section>

      <section className="cjapp-card" aria-labelledby="cjapp-quest">
        <div className="cjapp-head">
          <span className="cjapp-ico"><IconClipboard /></span>
          <h2 id="cjapp-quest">Questionários</h2>
        </div>
        <p className="cjapp-muted">
          Responda quando receber o email correspondente. O código é preenchido automaticamente.
        </p>
        <div className="cjapp-quest">
          {QUESTIONARIOS.map((q) => {
            const [sigla, ...resto] = q.label.split(" — ");
            const conteudo = (
              <>
                <b>{sigla}</b>
                <small>{resto.join(" — ")}</small>
                <IconArrow size={18} />
              </>
            );
            return temCodigo ? (
              <a
                key={q.id}
                className="cjapp-tile"
                href={formUrl(q.pub, q.entry, codigo!)}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                aria-label={`Questionário ${q.label} (abre o Google Forms)`}
              >
                {conteudo}
              </a>
            ) : (
              <button key={q.id} type="button" className="cjapp-tile" disabled aria-label={`Questionário ${q.label}`}>
                {conteudo}
              </button>
            );
          })}
        </div>
        {!temCodigo && <p className="cjapp-hint"><IconKey size={18} /> Guarde primeiro o seu código.</p>}
      </section>

      <section className="cjapp-card" aria-labelledby="cjapp-dor">
        <div className="cjapp-head">
          <span className="cjapp-ico"><IconGauge /></span>
          <h2 id="cjapp-dor">Escala de dor</h2>
        </div>
        {envio === "ok" ? (
          <div key="ok" className="cjapp-swap" role="status">
            <div className="cjapp-done">
              <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
                <circle cx="22" cy="22" r="22" />
                <path d="m13 22.5 6 6 12-13" />
              </svg>
              <p className="cjapp-ok">Obrigado. Registo enviado ({momento}: {score}/10).</p>
            </div>
            <div className="cjapp-aviso" style={{ margin: "0 0 .25rem" }}>
              <p><strong>Aviso de segurança.</strong> {AVISO_SEGURANCA}</p>
            </div>
            <button type="button" className="cjapp-btn cjapp-btn--ghost" onClick={novoRegisto}>
              Novo registo
            </button>
          </div>
        ) : (
          <form key="form" className="cjapp-swap" onSubmit={enviarVAS}>
            <fieldset>
              <legend>Quando?</legend>
              <div className="cjapp-seg">
                {(["D1", "D7"] as const).map((m) => (
                  <label key={m} className="cjapp-opt">
                    <input type="radio" name="momento" value={m} checked={momento === m} onChange={() => setMomento(m)} />
                    <span>{m === "D1" ? "Dia 1 (D1)" : "Dia 7 (D7)"}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Quanta dor tem agora? (0 = sem dor, 10 = pior dor imaginável)</legend>
              <div className="cjapp-scale">
                {Array.from({ length: 11 }, (_, n) => (
                  <label key={n} className="cjapp-opt" style={{ "--c": COR_DOR[n] } as React.CSSProperties}>
                    <input type="radio" name="score" value={n} checked={score === n} onChange={() => setScore(n)} />
                    <span>{n}</span>
                  </label>
                ))}
              </div>
              <div className="cjapp-ends" aria-hidden="true">
                <span>0 sem dor</span>
                <span>10 pior dor</span>
              </div>
              <p
                className="cjapp-readout"
                aria-live="polite"
                style={score !== null ? ({ "--c": COR_DOR[score] } as React.CSSProperties) : undefined}
              >
                {score !== null ? (
                  <>
                    <b>{score}/10</b>
                    <span>{descreverDor(score)}</span>
                  </>
                ) : (
                  <span>Escolha um número.</span>
                )}
              </p>
            </fieldset>
            {envio === "error" && (
              <p className="cjapp-err" role="alert">Não foi possível enviar. Tente de novo dentro de momentos.</p>
            )}
            {envio === "offline" && (
              <p className="cjapp-err" role="alert">Sem ligação à internet. Tente de novo quando tiver rede.</p>
            )}
            <button
              type="submit"
              className="cjapp-btn"
              disabled={!temCodigo || !momento || score === null || envio === "sending"}
              aria-busy={envio === "sending" || undefined}
            >
              {envio === "sending" ? (
                <>
                  <span className="cjapp-spin" aria-hidden="true" /> A enviar…
                </>
              ) : (
                "Enviar"
              )}
            </button>
            {!temCodigo && <p className="cjapp-hint"><IconKey size={18} /> Guarde primeiro o seu código.</p>}
          </form>
        )}
      </section>

      <section className="cjapp-card" aria-labelledby="cjapp-review">
        <div className="cjapp-head">
          <span className="cjapp-ico"><IconStar /></span>
          <h2 id="cjapp-review">Avaliação no Google</h2>
        </div>
        <p>
          Se quiser, pode deixar uma avaliação pública no Google. É voluntária e não influencia os cuidados prestados.
        </p>
        <p>
          <strong>Por favor, não inclua informação clínica.</strong>
        </p>
        <a className="cjapp-btn cjapp-btn--ghost" href={GOOGLE_REVIEW_HREF} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">
          <IconStar /> Deixar avaliação no Google
        </a>
      </section>
    </>
  );
}
