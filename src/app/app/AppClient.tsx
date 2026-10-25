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

type Momento = "D1" | "D7";
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
        <h2 id="cjapp-codigo">O seu código</h2>
        {temCodigo ? (
          <>
            <p className="cjapp-code" aria-live="polite">{codigo}</p>
            <p className="cjapp-muted">Guardado apenas neste dispositivo.</p>
            <div className="cjapp-row">
              <button type="button" className="cjapp-btn cjapp-btn--ghost" onClick={() => { setDraft(codigo ?? ""); setEditing(true); }}>
                Alterar
              </button>
              <button type="button" className="cjapp-btn cjapp-btn--ghost" onClick={apagar}>
                Apagar
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={guardar} noValidate>
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
        <h2 id="cjapp-quest">Questionários</h2>
        <p className="cjapp-muted">
          Responda quando receber o email correspondente. O código é preenchido automaticamente.
        </p>
        {QUESTIONARIOS.map((q) =>
          temCodigo ? (
            <a
              key={q.id}
              className="cjapp-btn"
              href={formUrl(q.pub, q.entry, codigo!)}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
            >
              {q.label}
            </a>
          ) : (
            <button key={q.id} type="button" className="cjapp-btn" disabled>
              {q.label}
            </button>
          ),
        )}
        {!temCodigo && <p className="cjapp-muted" style={{ marginTop: ".75rem" }}>Guarde primeiro o seu código.</p>}
      </section>

      <section className="cjapp-card" aria-labelledby="cjapp-dor">
        <h2 id="cjapp-dor">Escala de dor</h2>
        {envio === "ok" ? (
          <div role="status">
            <p className="cjapp-ok">Obrigado. O seu registo de dor ({momento}: {score}/10) foi enviado.</p>
            <div className="cjapp-aviso" style={{ margin: ".75rem 0" }}>
              <strong>Aviso de segurança</strong>
              <p>{AVISO_SEGURANCA}</p>
            </div>
            <button type="button" className="cjapp-btn cjapp-btn--ghost" onClick={novoRegisto}>
              Novo registo
            </button>
          </div>
        ) : (
          <form onSubmit={enviarVAS}>
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
                  <label key={n} className="cjapp-opt">
                    <input type="radio" name="score" value={n} checked={score === n} onChange={() => setScore(n)} />
                    <span>{n}</span>
                  </label>
                ))}
              </div>
              <div className="cjapp-ends" aria-hidden="true">
                <span>0 sem dor</span>
                <span>10 pior dor</span>
              </div>
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
            >
              {envio === "sending" ? "A enviar…" : "Enviar"}
            </button>
            {!temCodigo && <p className="cjapp-muted" style={{ marginTop: ".75rem" }}>Guarde primeiro o seu código.</p>}
          </form>
        )}
      </section>

      <section className="cjapp-card" aria-labelledby="cjapp-review">
        <h2 id="cjapp-review">Avaliação no Google</h2>
        <p>
          Se quiser, pode deixar uma avaliação pública no Google. É voluntária e não influencia os cuidados prestados.
        </p>
        <p>
          <strong>Por favor, não inclua informação clínica.</strong>
        </p>
        <a className="cjapp-btn cjapp-btn--ghost" href={GOOGLE_REVIEW_HREF} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">
          Deixar avaliação no Google
        </a>
      </section>
    </>
  );
}
