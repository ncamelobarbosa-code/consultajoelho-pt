'use client';

import { useState, useMemo } from 'react';

// --- Regra de negócio (espelho EXATO da API, só para preview no cliente) ---
const HORARIO: Record<number, { manha?: string; tarde?: string }> = {
  1: { manha: 'Lusíadas Porto', tarde: 'Lusíadas Porto' },            // Segunda
  2: { manha: 'Lusíadas Paços de Ferreira' },                          // Terça
  3: { manha: 'Lusíadas Porto' },                                      // Quarta
  4: { manha: 'Lusíadas Paços de Ferreira', tarde: 'Lusíadas Porto' }, // Quinta
  5: { manha: 'Lusíadas Paços de Ferreira', tarde: 'Misericórdia de Vila do Conde' }, // Sexta
};
const DIAS_NOME = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const PERIODO_LABEL: Record<string, string> = { manha: 'Manhã', tarde: 'Tarde' };

function weekdayOf(dataISO: string): number {
  return new Date(dataISO + 'T12:00:00Z').getUTCDay();
}

type Periodo = 'manha' | 'tarde';
type Tipo = 'Presencial' | 'Vídeo';

export default function MarcarConsultaClient() {
  const [nome, setNome] = useState('');
  const [numeroSNS, setNumeroSNS] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [motivo, setMotivo] = useState('');
  const [tipo, setTipo] = useState<Tipo>('Presencial');
  const [dataConsulta, setDataConsulta] = useState('');
  const [periodo, setPeriodo] = useState<Periodo | ''>('');

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'full'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [resultado, setResultado] = useState<{ local: string; diaSemana: string; data: string; periodo: string } | null>(null);

  const hojeISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // Períodos válidos para a data escolhida
  const info = useMemo(() => {
    if (!dataConsulta) return null;
    const wd = weekdayOf(dataConsulta);
    const disp = HORARIO[wd];
    const fimDeSemana = wd === 0 || wd === 6;
    const periodos: Periodo[] = disp ? (['manha', 'tarde'] as Periodo[]).filter((p) => disp[p]) : [];
    return { wd, diaNome: DIAS_NOME[wd], fimDeSemana, periodos, disp };
  }, [dataConsulta]);

  // Local em preview (assim que data + período escolhidos)
  const localPreview = useMemo(() => {
    if (!dataConsulta || !periodo || !info?.disp) return null;
    return info.disp[periodo] ?? null;
  }, [dataConsulta, periodo, info]);

  const onDataChange = (v: string) => {
    setDataConsulta(v);
    setPeriodo(''); // reset — os períodos válidos mudam com a data
  };

  const snsValido = /^\d{9}$/.test(numeroSNS);
  const podeSubmeter =
    nome.trim() && snsValido && telefone.trim() && email.trim() && dataConsulta && periodo && !!localPreview;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!podeSubmeter) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/marcar-consulta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, numeroSNS, telefone, email, tipo, dataConsulta, periodo, motivo }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResultado({ local: data.local, diaSemana: data.diaSemana, data: data.data, periodo: data.periodo });
        setStatus('success');
      } else if (res.status === 409) {
        setStatus('full');
        setErrorMsg(data.error || 'Este período já está esgotado.');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Ocorreu um erro. Tente novamente.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Ocorreu um erro de ligação. Tente novamente.');
    }
  }

  // --- Ecrã de sucesso ---
  if (status === 'success' && resultado) {
    return (
      <main className="mc-wrap">
        <div className="mc-card mc-success">
          <div className="mc-check">✓</div>
          <h1>Marcação registada</h1>
          <p className="mc-sub">Recebemos o seu pedido de consulta extra. A secretaria irá confirmar os detalhes.</p>
          <div className="mc-summary">
            <div><span>Tipo</span><strong>{tipo}</strong></div>
            <div><span>Data</span><strong>{resultado.diaSemana}, {resultado.data}</strong></div>
            <div><span>Período</span><strong>{PERIODO_LABEL[resultado.periodo] || resultado.periodo}</strong></div>
            <div><span>Local</span><strong>{resultado.local}</strong></div>
          </div>
        </div>
        <style>{CSS}</style>
      </main>
    );
  }

  return (
    <main className="mc-wrap">
      <div className="mc-card">
        <header className="mc-header">
          <h1>Marcar Consulta Extra</h1>
          <p className="mc-sub">
            Escolha o tipo e a data. O local é atribuído automaticamente conforme a agenda do Dr. Nuno Camelo.
          </p>
        </header>

        <form onSubmit={onSubmit} className="mc-form" noValidate>
          {/* Tipo */}
          <div className="mc-group">
            <label className="mc-label">Tipo de consulta</label>
            <div className="mc-toggle">
              {(['Presencial', 'Vídeo'] as Tipo[]).map((tp) => (
                <button
                  type="button"
                  key={tp}
                  className={`mc-toggle-btn ${tipo === tp ? 'is-active' : ''}`}
                  onClick={() => setTipo(tp)}
                  aria-pressed={tipo === tp}
                >
                  {tp === 'Presencial' ? '🏥 Presencial' : '💻 Vídeo'}
                </button>
              ))}
            </div>
          </div>

          {/* Nome */}
          <div className="mc-group">
            <label className="mc-label" htmlFor="nome">Nome completo</label>
            <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)}
              placeholder="O seu nome" autoComplete="name" required />
          </div>

          {/* SNS + Telefone */}
          <div className="mc-row">
            <div className="mc-group">
              <label className="mc-label" htmlFor="sns">Número de utente (SNS)</label>
              <input id="sns" type="text" inputMode="numeric" value={numeroSNS}
                onChange={(e) => setNumeroSNS(e.target.value.replace(/\D/g, '').slice(0, 9))}
                placeholder="9 dígitos" required aria-invalid={numeroSNS.length > 0 && !snsValido} />
              {numeroSNS.length > 0 && !snsValido && <span className="mc-err">Deve ter 9 dígitos.</span>}
            </div>
            <div className="mc-group">
              <label className="mc-label" htmlFor="tel">Telemóvel</label>
              <input id="tel" type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)}
                placeholder="+351 9XX XXX XXX" autoComplete="tel" required />
            </div>
          </div>

          {/* Email */}
          <div className="mc-group">
            <label className="mc-label" htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.pt" autoComplete="email" required />
          </div>

          {/* Data */}
          <div className="mc-group">
            <label className="mc-label" htmlFor="data">Data pretendida</label>
            <input id="data" type="date" value={dataConsulta} min={hojeISO}
              onChange={(e) => onDataChange(e.target.value)} required />
            {info?.fimDeSemana && (
              <span className="mc-err">Não há consultas ao fim de semana. Escolha um dia útil.</span>
            )}
            {info && !info.fimDeSemana && info.periodos.length === 0 && (
              <span className="mc-err">Sem consulta disponível neste dia. Escolha outra data.</span>
            )}
          </div>

          {/* Período (só aparece quando a data tem períodos válidos) */}
          {info && info.periodos.length > 0 && (
            <div className="mc-group">
              <label className="mc-label">Período — {info.diaNome}</label>
              <div className="mc-periods">
                {info.periodos.map((p) => (
                  <button type="button" key={p}
                    className={`mc-period-btn ${periodo === p ? 'is-active' : ''}`}
                    onClick={() => setPeriodo(p)} aria-pressed={periodo === p}>
                    <span className="mc-period-name">{PERIODO_LABEL[p]}</span>
                    <span className="mc-period-local">{info.disp![p]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Preview do local */}
          {localPreview && (
            <div className="mc-preview">
              <span className="mc-preview-dot" aria-hidden="true">📍</span>
              <div>
                <strong>{localPreview}</strong>
                <span>{info?.diaNome}, {dataConsulta.split('-').reverse().join('/')} · {PERIODO_LABEL[periodo as string]} · {tipo}</span>
              </div>
            </div>
          )}

          {/* Motivo */}
          <div className="mc-group">
            <label className="mc-label" htmlFor="motivo">Motivo <span className="mc-opt">(opcional)</span></label>
            <textarea id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} rows={3}
              placeholder="Descreva brevemente o motivo da consulta." />
          </div>

          {(status === 'error' || status === 'full') && (
            <p className={`mc-alert ${status === 'full' ? 'mc-alert--warn' : ''}`}>{errorMsg}</p>
          )}

          <button type="submit" className="mc-submit" disabled={!podeSubmeter || status === 'sending'}>
            {status === 'sending' ? 'A registar…' : 'Confirmar marcação'}
          </button>
        </form>
      </div>
      <style>{CSS}</style>
    </main>
  );
}

const CSS = `
.mc-wrap { min-height: 72vh; background: #F6F9F5; display: flex; align-items: flex-start; justify-content: center; padding: 3rem 1.5rem; }
.mc-card { max-width: 620px; width: 100%; background: #fff; border: 1px solid #dde8dd; border-radius: 16px; padding: 2.5rem 2rem; box-shadow: 0 10px 44px rgba(3,87,114,0.08); }
.mc-header { margin-bottom: 2rem; }
.mc-header h1, .mc-success h1 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: clamp(1.5rem, 4vw, 2rem); color: #035772; margin: 0 0 .6rem; letter-spacing: -0.01em; }
.mc-sub { font-family: 'Space Grotesk', sans-serif; color: #4a5568; font-size: 1rem; line-height: 1.6; margin: 0; }
.mc-form { display: flex; flex-direction: column; gap: 1.25rem; }
.mc-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.mc-group { display: flex; flex-direction: column; gap: .4rem; }
.mc-label { font-family: 'Space Grotesk', sans-serif; font-size: .875rem; font-weight: 600; color: #091405; }
.mc-opt { font-weight: 400; color: #718096; }
.mc-group input, .mc-group textarea { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; color: #091405; background: #fff; border: 1.5px solid #cbd5e0; border-radius: 8px; padding: .75rem 1rem; outline: none; width: 100%; box-sizing: border-box; transition: border-color .2s, box-shadow .2s; }
.mc-group input:focus, .mc-group textarea:focus { border-color: #035772; box-shadow: 0 0 0 3px rgba(3,87,114,.12); }
.mc-group textarea { resize: vertical; min-height: 84px; }
.mc-err { font-size: .8rem; color: #c53030; }
.mc-toggle, .mc-periods { display: flex; gap: .6rem; }
.mc-toggle-btn { flex: 1; font-family: 'Space Grotesk', sans-serif; font-size: .95rem; font-weight: 600; padding: .8rem 1rem; border-radius: 8px; border: 1.5px solid #cbd5e0; background: #fff; color: #4a5568; cursor: pointer; transition: all .15s; }
.mc-toggle-btn.is-active { border-color: #035772; background: #035772; color: #fff; }
.mc-period-btn { flex: 1; display: flex; flex-direction: column; gap: .2rem; text-align: left; font-family: 'Space Grotesk', sans-serif; padding: .8rem 1rem; border-radius: 8px; border: 1.5px solid #cbd5e0; background: #fff; cursor: pointer; transition: all .15s; }
.mc-period-btn.is-active { border-color: #035772; background: #eef6f4; box-shadow: 0 0 0 3px rgba(3,87,114,.1); }
.mc-period-name { font-weight: 700; color: #035772; font-size: .95rem; }
.mc-period-local { font-size: .8rem; color: #4a5568; }
.mc-preview { display: flex; align-items: center; gap: .8rem; background: #eef6f4; border: 1px solid #AACBA8; border-radius: 10px; padding: .9rem 1.1rem; }
.mc-preview-dot { font-size: 1.3rem; }
.mc-preview strong { display: block; font-family: 'Space Grotesk', sans-serif; color: #035772; font-size: 1.05rem; font-weight: 700; }
.mc-preview span { font-family: 'Space Grotesk', sans-serif; color: #4a5568; font-size: .85rem; }
.mc-alert { font-family: 'Space Grotesk', sans-serif; font-size: .9rem; color: #c53030; background: #fbeaea; border-radius: 8px; padding: .8rem 1rem; margin: 0; text-align: center; }
.mc-alert--warn { color: #9a6b00; background: #fdf3d8; }
.mc-submit { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; background: #035772; border: none; border-radius: 8px; padding: .95rem 2rem; cursor: pointer; transition: background .2s, transform .1s; margin-top: .25rem; }
.mc-submit:hover:not(:disabled) { background: #024d66; transform: translateY(-1px); }
.mc-submit:disabled { opacity: .5; cursor: not-allowed; }
.mc-success { text-align: center; }
.mc-check { width: 64px; height: 64px; border-radius: 50%; background: #035772; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem; }
.mc-summary { display: grid; gap: .1rem; margin-top: 1.75rem; text-align: left; border: 1px solid #dde8dd; border-radius: 10px; overflow: hidden; }
.mc-summary > div { display: flex; justify-content: space-between; gap: 1rem; padding: .8rem 1.1rem; font-family: 'Space Grotesk', sans-serif; }
.mc-summary > div:nth-child(odd) { background: #f6f9f5; }
.mc-summary span { color: #718096; font-size: .85rem; text-transform: uppercase; letter-spacing: .04em; }
.mc-summary strong { color: #091405; font-size: .95rem; text-align: right; }
@media (max-width: 480px) { .mc-card { padding: 2rem 1.25rem; } .mc-row { grid-template-columns: 1fr; } }
`;
