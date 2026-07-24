'use client';

import { useState, useMemo, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { event } from '@/lib/gtag';

type Lang = 'pt' | 'en' | 'ru';
type Periodo = 'manha' | 'tarde';
type Tipo = 'Presencial' | 'Vídeo';
type Mode = 'marcar' | 'contacto';

// --- Regra de negócio (espelho EXATO da API, só para preview no cliente) ---
const HORARIO: Record<number, { manha?: string; tarde?: string }> = {
  1: { manha: 'Lusíadas Porto', tarde: 'Lusíadas Porto' },            // Segunda
  2: { manha: 'Lusíadas Paços de Ferreira' },                          // Terça
  3: { manha: 'Lusíadas Porto' },                                      // Quarta
  4: { manha: 'Lusíadas Paços de Ferreira', tarde: 'Lusíadas Porto' }, // Quinta
  5: { manha: 'Lusíadas Paços de Ferreira', tarde: 'Misericórdia de Vila do Conde' }, // Sexta
};

function weekdayOf(dataISO: string): number {
  return new Date(dataISO + 'T12:00:00Z').getUTCDay();
}

const DIAS: Record<Lang, string[]> = {
  pt: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
};

const T = {
  pt: {
    tabBook: 'Marcar consulta', tabContact: 'Contacto / 2ª opinião',
    // booking
    bHeading: 'Marcar Consulta', bSub: 'Escolha o tipo e a data. O local é atribuído automaticamente conforme a agenda do Dr. Nuno Camelo.',
    typeLabel: 'Tipo de consulta', presencial: '🏥 Presencial', video: '💻 Vídeo',
    nameLabel: 'Nome completo', namePh: 'O seu nome',
    snsLabel: 'Número de utente (SNS)', optional: '(opcional)', snsPh: '9 dígitos', snsErr: 'Se preencher, deve ter 9 dígitos.',
    phoneLabel: 'Telemóvel', phonePh: '+351 9XX XXX XXX',
    emailLabel: 'Email', emailPh: 'email@exemplo.pt',
    dateLabel: 'Data pretendida', weekendErr: 'Não há consultas ao fim de semana. Escolha um dia útil.', noSlotErr: 'Sem consulta disponível neste dia. Escolha outra data.',
    periodPrefix: 'Período —', manha: 'Manhã', tarde: 'Tarde',
    reasonLabel: 'Motivo', reasonPh: 'Descreva brevemente o motivo da consulta.',
    submit: 'Confirmar marcação', submitting: 'A registar…',
    okTitle: 'Marcação registada', okBody: 'Recebemos o seu pedido de consulta. A secretaria irá confirmar os detalhes.',
    sType: 'Tipo', sDate: 'Data', sPeriod: 'Período', sLocal: 'Local',
    full: 'Este período já está esgotado. Por favor escolha outra data.', err: 'Ocorreu um erro. Tente novamente.',
    // contact
    cHeading: 'Pedido de Contacto ou 2ª Opinião', cSub: 'Preencha o formulário e entraremos em contacto, habitualmente no próprio dia útil. Em alternativa, ligue para',
    cReasonLabel: 'Motivo do contacto', cReasonPh: 'Seleccione o motivo',
    cReasons: ['Segunda opinião', 'Pedir orçamento', 'Dor no joelho', 'Lesão ligamentar (LCA / LCP)', 'Lesão de menisco', 'Lesão de cartilagem', 'Artrose / Gonartrose', 'Turismo médico', 'Outro'],
    cMessageLabel: 'Mensagem', cMessagePh: 'Descreva brevemente a sua situação, exames já realizados, ou qualquer informação relevante.',
    gdprBefore: 'Concordo com o tratamento dos meus dados pessoais para efeitos de contacto, conforme a', gdprLink: 'política de privacidade', privacyHref: '/privacidade',
    cSubmit: 'Enviar pedido', cSubmitting: 'A enviar…',
    cOkTitle: 'Mensagem recebida', cOkBody: 'Entraremos em contacto em breve, habitualmente no próprio dia ou no dia útil seguinte.',
    cErr: 'Ocorreu um erro. Verifique os campos e tente novamente.',
  },
  en: {
    tabBook: 'Book appointment', tabContact: 'Contact / 2nd opinion',
    bHeading: 'Book an Appointment', bSub: 'Choose the type and date. The location is assigned automatically according to Dr. Nuno Camelo’s schedule.',
    typeLabel: 'Appointment type', presencial: '🏥 In person', video: '💻 Video',
    nameLabel: 'Full name', namePh: 'Your name',
    snsLabel: 'Health number (SNS)', optional: '(optional)', snsPh: '9 digits', snsErr: 'If provided, must be 9 digits.',
    phoneLabel: 'Phone', phonePh: '+351 9XX XXX XXX',
    emailLabel: 'Email', emailPh: 'email@example.com',
    dateLabel: 'Preferred date', weekendErr: 'No appointments on weekends. Please choose a weekday.', noSlotErr: 'No appointment available on this day. Please choose another date.',
    periodPrefix: 'Period —', manha: 'Morning', tarde: 'Afternoon',
    reasonLabel: 'Reason', reasonPh: 'Briefly describe the reason for the appointment.',
    submit: 'Confirm booking', submitting: 'Saving…',
    okTitle: 'Appointment registered', okBody: 'We have received your request. Our secretariat will confirm the details.',
    sType: 'Type', sDate: 'Date', sPeriod: 'Period', sLocal: 'Location',
    full: 'This slot is already taken. Please choose another date.', err: 'An error occurred. Please try again.',
    cHeading: 'Contact or Second Opinion', cSub: 'Fill in the form and we will contact you, usually the same working day. Alternatively, call',
    cReasonLabel: 'Reason for contact', cReasonPh: 'Select a reason',
    cReasons: ['Second opinion', 'Request a quote', 'Knee pain', 'Ligament injury (ACL / PCL)', 'Meniscal injury', 'Cartilage injury', 'Knee osteoarthritis', 'Medical tourism', 'Other'],
    cMessageLabel: 'Message', cMessagePh: 'Briefly describe your situation, any scans already done, or any relevant information.',
    gdprBefore: 'I consent to the processing of my personal data for contact purposes, in accordance with the', gdprLink: 'privacy policy', privacyHref: '/privacidade',
    cSubmit: 'Send request', cSubmitting: 'Sending…',
    cOkTitle: 'Message received', cOkBody: 'We will be in touch shortly, usually the same day or the next working day.',
    cErr: 'An error occurred. Please check the fields and try again.',
  },
  ru: {
    tabBook: 'Записаться', tabContact: 'Контакт / 2-е мнение',
    bHeading: 'Записаться на приём', bSub: 'Выберите тип и дату. Место назначается автоматически согласно графику д-ра Нуну Камелу.',
    typeLabel: 'Тип приёма', presencial: '🏥 Очно', video: '💻 Видео',
    nameLabel: 'Полное имя', namePh: 'Ваше имя',
    snsLabel: 'Номер SNS', optional: '(необязательно)', snsPh: '9 цифр', snsErr: 'Если указываете, должно быть 9 цифр.',
    phoneLabel: 'Телефон', phonePh: '+351 9XX XXX XXX',
    emailLabel: 'Электронная почта', emailPh: 'email@example.com',
    dateLabel: 'Желаемая дата', weekendErr: 'В выходные приёма нет. Выберите будний день.', noSlotErr: 'В этот день приём недоступен. Выберите другую дату.',
    periodPrefix: 'Период —', manha: 'Утро', tarde: 'День',
    reasonLabel: 'Причина', reasonPh: 'Кратко опишите причину приёма.',
    submit: 'Подтвердить запись', submitting: 'Сохранение…',
    okTitle: 'Запись зарегистрирована', okBody: 'Мы получили ваш запрос. Секретариат подтвердит детали.',
    sType: 'Тип', sDate: 'Дата', sPeriod: 'Период', sLocal: 'Место',
    full: 'Это время уже занято. Пожалуйста, выберите другую дату.', err: 'Произошла ошибка. Попробуйте снова.',
    cHeading: 'Связаться или второе мнение', cSub: 'Заполните форму, и мы свяжемся с Вами, обычно в тот же рабочий день. Также Вы можете позвонить по номеру',
    cReasonLabel: 'Причина обращения', cReasonPh: 'Выберите причину',
    cReasons: ['Второе мнение', 'Запросить смету', 'Боль в колене', 'Повреждение связки (ПКС / ЗКС)', 'Повреждение мениска', 'Повреждение хряща', 'Остеоартроз коленного сустава', 'Медицинский туризм', 'Другое'],
    cMessageLabel: 'Сообщение', cMessagePh: 'Кратко опишите Вашу ситуацию, уже проведённые обследования или другую важную информацию.',
    gdprBefore: 'Я согласен(на) на обработку моих персональных данных для целей связи в соответствии с', gdprLink: 'политикой конфиденциальности', privacyHref: '/privacidade',
    cSubmit: 'Отправить запрос', cSubmitting: 'Отправка…',
    cOkTitle: 'Сообщение получено', cOkBody: 'Мы свяжемся с Вами в ближайшее время, обычно в тот же или на следующий рабочий день.',
    cErr: 'Произошла ошибка. Проверьте поля и попробуйте снова.',
  },
};

export default function MarcarConsultaClient({ lang = 'pt' }: { lang?: Lang }) {
  const t = T[lang];
  const dias = DIAS[lang];
  const [mode, setMode] = useState<Mode>('marcar');

  return (
    <main className="mc-wrap">
      <div className="mc-card">
        {/* Alternador de modo */}
        <div className="mc-modes" role="tablist">
          <button type="button" role="tab" aria-selected={mode === 'marcar'}
            className={`mc-mode-btn ${mode === 'marcar' ? 'is-active' : ''}`} onClick={() => setMode('marcar')}>
            {t.tabBook}
          </button>
          <button type="button" role="tab" aria-selected={mode === 'contacto'}
            className={`mc-mode-btn ${mode === 'contacto' ? 'is-active' : ''}`} onClick={() => setMode('contacto')}>
            {t.tabContact}
          </button>
        </div>

        {mode === 'marcar'
          ? <BookingForm t={t} dias={dias} />
          : <ContactMode t={t} lang={lang} />}
      </div>
      <style>{CSS}</style>
    </main>
  );
}

// ---------------- MODO: Marcar consulta ----------------
function BookingForm({ t, dias }: { t: typeof T['pt']; dias: string[] }) {
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
  const [resultado, setResultado] = useState<{ local: string; data: string; periodo: string; diaNome: string } | null>(null);

  const hojeISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const info = useMemo(() => {
    if (!dataConsulta) return null;
    const wd = weekdayOf(dataConsulta);
    const disp = HORARIO[wd];
    const fimDeSemana = wd === 0 || wd === 6;
    const periodos: Periodo[] = disp ? (['manha', 'tarde'] as Periodo[]).filter((p) => disp[p]) : [];
    return { wd, diaNome: dias[wd], fimDeSemana, periodos, disp };
  }, [dataConsulta, dias]);

  const localPreview = useMemo(() => {
    if (!dataConsulta || !periodo || !info?.disp) return null;
    return info.disp[periodo] ?? null;
  }, [dataConsulta, periodo, info]);

  const onDataChange = (v: string) => { setDataConsulta(v); setPeriodo(''); };
  const snsPreenchidoInvalido = numeroSNS.length > 0 && !/^\d{9}$/.test(numeroSNS);
  const podeSubmeter = nome.trim() && !snsPreenchidoInvalido && telefone.trim() && email.trim() && dataConsulta && periodo && !!localPreview;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!podeSubmeter) return;
    setStatus('sending'); setErrorMsg('');
    try {
      const res = await fetch('/api/marcar-consulta', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, numeroSNS, telefone, email, tipo, dataConsulta, periodo, motivo }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResultado({ local: data.local, data: data.data, periodo, diaNome: info!.diaNome });
        setStatus('success');
      } else if (res.status === 409) { setStatus('full'); setErrorMsg(data.error || t.full); }
      else { setStatus('error'); setErrorMsg(data.error || t.err); }
    } catch { setStatus('error'); setErrorMsg(t.err); }
  }

  if (status === 'success' && resultado) {
    return (
      <div className="mc-success">
        <div className="mc-check">✓</div>
        <h1>{t.okTitle}</h1>
        <p className="mc-sub">{t.okBody}</p>
        <div className="mc-summary">
          <div><span>{t.sType}</span><strong>{tipo}</strong></div>
          <div><span>{t.sDate}</span><strong>{resultado.diaNome}, {resultado.data}</strong></div>
          <div><span>{t.sPeriod}</span><strong>{resultado.periodo === 'manha' ? t.manha : t.tarde}</strong></div>
          <div><span>{t.sLocal}</span><strong>{resultado.local}</strong></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="mc-header"><h1>{t.bHeading}</h1><p className="mc-sub">{t.bSub}</p></header>
      <form onSubmit={onSubmit} className="mc-form" noValidate>
        <div className="mc-group">
          <label className="mc-label">{t.typeLabel}</label>
          <div className="mc-toggle">
            {(['Presencial', 'Vídeo'] as Tipo[]).map((tp) => (
              <button type="button" key={tp} className={`mc-toggle-btn ${tipo === tp ? 'is-active' : ''}`}
                onClick={() => setTipo(tp)} aria-pressed={tipo === tp}>
                {tp === 'Presencial' ? t.presencial : t.video}
              </button>
            ))}
          </div>
        </div>

        <div className="mc-group">
          <label className="mc-label" htmlFor="nome">{t.nameLabel}</label>
          <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder={t.namePh} autoComplete="name" required />
        </div>

        <div className="mc-row">
          <div className="mc-group">
            <label className="mc-label" htmlFor="sns">{t.snsLabel} <span className="mc-opt">{t.optional}</span></label>
            <input id="sns" type="text" inputMode="numeric" value={numeroSNS}
              onChange={(e) => setNumeroSNS(e.target.value.replace(/\D/g, '').slice(0, 9))} placeholder={t.snsPh} aria-invalid={snsPreenchidoInvalido} />
            {snsPreenchidoInvalido && <span className="mc-err">{t.snsErr}</span>}
          </div>
          <div className="mc-group">
            <label className="mc-label" htmlFor="tel">{t.phoneLabel}</label>
            <input id="tel" type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder={t.phonePh} autoComplete="tel" required />
          </div>
        </div>

        <div className="mc-group">
          <label className="mc-label" htmlFor="email">{t.emailLabel}</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPh} autoComplete="email" required />
        </div>

        <div className="mc-group">
          <label className="mc-label" htmlFor="data">{t.dateLabel}</label>
          <input id="data" type="date" value={dataConsulta} min={hojeISO} onChange={(e) => onDataChange(e.target.value)} required />
          {info?.fimDeSemana && <span className="mc-err">{t.weekendErr}</span>}
          {info && !info.fimDeSemana && info.periodos.length === 0 && <span className="mc-err">{t.noSlotErr}</span>}
        </div>

        {info && info.periodos.length > 0 && (
          <div className="mc-group">
            <label className="mc-label">{t.periodPrefix} {info.diaNome}</label>
            <div className="mc-periods">
              {info.periodos.map((p) => (
                <button type="button" key={p} className={`mc-period-btn ${periodo === p ? 'is-active' : ''}`} onClick={() => setPeriodo(p)} aria-pressed={periodo === p}>
                  <span className="mc-period-name">{p === 'manha' ? t.manha : t.tarde}</span>
                  <span className="mc-period-local">{info.disp![p]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {localPreview && (
          <div className="mc-preview">
            <span className="mc-preview-dot" aria-hidden="true">📍</span>
            <div>
              <strong>{localPreview}</strong>
              <span>{info?.diaNome}, {dataConsulta.split('-').reverse().join('/')} · {periodo === 'manha' ? t.manha : t.tarde} · {tipo}</span>
            </div>
          </div>
        )}

        <div className="mc-group">
          <label className="mc-label" htmlFor="motivo">{t.reasonLabel} <span className="mc-opt">{t.optional}</span></label>
          <textarea id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} rows={3} placeholder={t.reasonPh} />
        </div>

        {(status === 'error' || status === 'full') && (
          <p className={`mc-alert ${status === 'full' ? 'mc-alert--warn' : ''}`}>{errorMsg}</p>
        )}

        <button type="submit" className="mc-submit" disabled={!podeSubmeter || status === 'sending'}>
          {status === 'sending' ? t.submitting : t.submit}
        </button>
      </form>
    </>
  );
}

// ---------------- MODO: Contacto / 2ª opinião ----------------
function ContactMode({ t, lang }: { t: typeof T['pt']; lang: Lang }) {
  const [state, handleSubmit] = useForm('mpqganlp');
  const [motivo, setMotivo] = useState('');

  useEffect(() => {
    if (state.succeeded) {
      event('generate_lead', { method: 'form' });
      event('conversion', { send_to: 'AW-859136288/jNYHCPHO28ccEKDC1ZkD' });
    }
  }, [state.succeeded]);

  if (state.succeeded) {
    return (
      <div className="mc-success">
        <div className="mc-check">✓</div>
        <h1>{t.cOkTitle}</h1>
        <p className="mc-sub">{t.cOkBody}</p>
      </div>
    );
  }

  return (
    <>
      <header className="mc-header">
        <h1>{t.cHeading}</h1>
        <p className="mc-sub">{t.cSub} <a href="tel:+351926850194" className="mc-inline-link">926 850 194</a>.</p>
      </header>
      <form onSubmit={handleSubmit} className="mc-form" noValidate>
        <input type="hidden" name="_lang" value={lang} />
        <input type="hidden" name="origem" value="marcar-consulta / contacto-2a-opiniao" />
        <div className="mc-group">
          <label className="mc-label" htmlFor="c-nome">{t.nameLabel}</label>
          <input id="c-nome" type="text" name="nome" placeholder={t.namePh} required autoComplete="name" />
          <ValidationError prefix="Nome" field="nome" errors={state.errors} className="mc-err" />
        </div>
        <div className="mc-row">
          <div className="mc-group">
            <label className="mc-label" htmlFor="c-email">{t.emailLabel}</label>
            <input id="c-email" type="email" name="email" placeholder={t.emailPh} required autoComplete="email" />
            <ValidationError prefix="Email" field="email" errors={state.errors} className="mc-err" />
          </div>
          <div className="mc-group">
            <label className="mc-label" htmlFor="c-tel">{t.phoneLabel} <span className="mc-opt">{t.optional}</span></label>
            <input id="c-tel" type="tel" name="telefone" placeholder={t.phonePh} autoComplete="tel" />
          </div>
        </div>
        <div className="mc-group">
          <label className="mc-label" htmlFor="c-motivo">{t.cReasonLabel}</label>
          <select id="c-motivo" name="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} required>
            <option value="" disabled>{t.cReasonPh}</option>
            {t.cReasons.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="mc-group">
          <label className="mc-label" htmlFor="c-msg">{t.cMessageLabel} <span className="mc-opt">{t.optional}</span></label>
          <textarea id="c-msg" name="mensagem" rows={4} placeholder={t.cMessagePh} />
        </div>
        <div className="mc-group mc-checkbox">
          <label className="mc-check-label">
            <input type="checkbox" name="gdpr" required />
            <span>{t.gdprBefore} <a href={t.privacyHref} target="_blank" rel="noopener noreferrer">{t.gdprLink}</a>.</span>
          </label>
        </div>
        <button type="submit" className="mc-submit" disabled={state.submitting}>
          {state.submitting ? t.cSubmitting : t.cSubmit}
        </button>
        {state.errors && <p className="mc-alert">{t.cErr}</p>}
      </form>
    </>
  );
}

const CSS = `
.mc-wrap { min-height: 72vh; background: #F6F9F5; display: flex; align-items: flex-start; justify-content: center; padding: 3rem 1.5rem; }
.mc-card { max-width: 640px; width: 100%; background: #fff; border: 1px solid #dde8dd; border-radius: 16px; padding: 2.25rem 2rem; box-shadow: 0 10px 44px rgba(3,87,114,0.08); }
.mc-modes { display: flex; gap: .5rem; background: #eef3ee; padding: .35rem; border-radius: 10px; margin-bottom: 1.75rem; }
.mc-mode-btn { flex: 1; font-family: 'Space Grotesk', sans-serif; font-size: .92rem; font-weight: 600; padding: .65rem .8rem; border-radius: 8px; border: none; background: transparent; color: #4a5568; cursor: pointer; transition: all .15s; }
.mc-mode-btn.is-active { background: #fff; color: #035772; box-shadow: 0 2px 8px rgba(3,87,114,.12); }
.mc-header { margin-bottom: 1.75rem; }
.mc-header h1, .mc-success h1 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: clamp(1.5rem, 4vw, 2rem); color: #035772; margin: 0 0 .6rem; letter-spacing: -0.01em; }
.mc-sub { font-family: 'Space Grotesk', sans-serif; color: #4a5568; font-size: 1rem; line-height: 1.6; margin: 0; }
.mc-inline-link { color: #035772; font-weight: 600; text-decoration: none; }
.mc-inline-link:hover { text-decoration: underline; }
.mc-form { display: flex; flex-direction: column; gap: 1.2rem; }
.mc-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.mc-group { display: flex; flex-direction: column; gap: .4rem; }
.mc-label { font-family: 'Space Grotesk', sans-serif; font-size: .875rem; font-weight: 600; color: #091405; }
.mc-opt { font-weight: 400; color: #718096; }
.mc-group input, .mc-group select, .mc-group textarea { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; color: #091405; background: #fff; border: 1.5px solid #cbd5e0; border-radius: 8px; padding: .75rem 1rem; outline: none; width: 100%; box-sizing: border-box; transition: border-color .2s, box-shadow .2s; appearance: none; -webkit-appearance: none; }
.mc-group select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23035772' d='M1 1l5 5 5-5'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem; }
.mc-group input:focus, .mc-group select:focus, .mc-group textarea:focus { border-color: #035772; box-shadow: 0 0 0 3px rgba(3,87,114,.12); }
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
.mc-checkbox .mc-check-label { display: flex; align-items: flex-start; gap: .7rem; font-family: 'Space Grotesk', sans-serif; font-size: .85rem; color: #4a5568; line-height: 1.5; cursor: pointer; }
.mc-check-label input[type=checkbox] { width: 18px; height: 18px; min-width: 18px; margin-top: 2px; accent-color: #035772; cursor: pointer; }
.mc-check-label a { color: #035772; text-decoration: underline; }
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
@media (max-width: 480px) { .mc-card { padding: 1.75rem 1.15rem; } .mc-row { grid-template-columns: 1fr; } }
`;
