'use client';

import { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { event } from '@/lib/gtag';

const STRINGS = {
  pt: {
    successTitle: 'Mensagem recebida',
    successBody: 'Entraremos em contacto em breve, habitualmente no próprio dia ou no dia útil seguinte.',
    heading: 'Marcar Consulta ou Pedir Orçamento',
    introBefore: 'Preencha o formulário e entraremos em contacto para confirmar data e hora. Em alternativa, pode ligar para',
    nameLabel: 'Nome completo',
    namePlaceholder: 'O seu nome',
    emailLabel: 'Email',
    emailPlaceholder: 'email@exemplo.pt',
    phoneLabel: 'Telefone',
    optional: '(opcional)',
    reasonLabel: 'Motivo do contacto',
    reasonPlaceholder: 'Seleccione o motivo',
    reasons: ['Dor no joelho', 'Lesão ligamentar (LCA / LCP)', 'Lesão de menisco', 'Lesão de cartilagem', 'Instabilidade da rótula', 'Artrose / Gonartrose', 'Segunda opinião', 'Pedir orçamento', 'Outro'],
    messageLabel: 'Mensagem',
    messagePlaceholder: 'Descreva brevemente a sua situação, exames já realizados, ou qualquer informação relevante.',
    gdprBefore: 'Concordo com o tratamento dos meus dados pessoais para efeitos de marcação de consulta, conforme a',
    gdprLink: 'política de privacidade',
    submit: 'Enviar pedido de consulta',
    submitting: 'A enviar…',
    errorGlobal: 'Ocorreu um erro. Verifique os campos e tente novamente.',
    infoEmail: 'Email directo',
    infoPhone: 'Telefone',
    infoReplyLabel: 'Resposta habitual',
    infoReplyValue: 'No próprio dia útil',
    privacyHref: '/privacidade',
  },
  en: {
    successTitle: 'Message received',
    successBody: 'We will be in touch shortly, usually the same day or the next working day.',
    heading: 'Book an Appointment or Request a Quote',
    introBefore: 'Fill in the form and we will contact you to confirm a date and time. Alternatively, you can call',
    nameLabel: 'Full name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'email@example.com',
    phoneLabel: 'Phone',
    optional: '(optional)',
    reasonLabel: 'Reason for contact',
    reasonPlaceholder: 'Select a reason',
    reasons: ['Knee pain', 'Ligament injury (ACL / PCL)', 'Meniscal injury', 'Cartilage injury', 'Patellar instability', 'Knee osteoarthritis', 'Second opinion', 'Request a quote', 'Other'],
    messageLabel: 'Message',
    messagePlaceholder: 'Briefly describe your situation, any scans already done, or any relevant information.',
    gdprBefore: 'I consent to the processing of my personal data for the purpose of booking an appointment, in accordance with the',
    gdprLink: 'privacy policy',
    submit: 'Send appointment request',
    submitting: 'Sending…',
    errorGlobal: 'An error occurred. Please check the fields and try again.',
    infoEmail: 'Direct email',
    infoPhone: 'Phone',
    infoReplyLabel: 'Typical response',
    infoReplyValue: 'Same working day',
    privacyHref: '/privacidade',
  },
  ru: {
    successTitle: 'Сообщение получено',
    successBody: 'Мы свяжемся с Вами в ближайшее время, обычно в тот же или на следующий рабочий день.',
    heading: 'Записаться на приём или запросить смету',
    introBefore: 'Заполните форму, и мы свяжемся с Вами, чтобы подтвердить дату и время. Также Вы можете позвонить по номеру',
    nameLabel: 'Полное имя',
    namePlaceholder: 'Ваше имя',
    emailLabel: 'Электронная почта',
    emailPlaceholder: 'email@example.com',
    phoneLabel: 'Телефон',
    optional: '(необязательно)',
    reasonLabel: 'Причина обращения',
    reasonPlaceholder: 'Выберите причину',
    reasons: ['Боль в колене', 'Повреждение связки (ПКС / ЗКС)', 'Повреждение мениска', 'Повреждение хряща', 'Нестабильность надколенника', 'Остеоартроз коленного сустава', 'Второе мнение', 'Запросить смету', 'Другое'],
    messageLabel: 'Сообщение',
    messagePlaceholder: 'Кратко опишите Вашу ситуацию, уже проведённые обследования или любую другую важную информацию.',
    gdprBefore: 'Я согласен(на) на обработку моих персональных данных для целей записи на приём в соответствии с',
    gdprLink: 'политикой конфиденциальности',
    submit: 'Отправить запрос на приём',
    submitting: 'Отправка…',
    errorGlobal: 'Произошла ошибка. Проверьте поля и попробуйте снова.',
    infoEmail: 'Прямая электронная почта',
    infoPhone: 'Телефон',
    infoReplyLabel: 'Обычный срок ответа',
    infoReplyValue: 'В тот же рабочий день',
    privacyHref: '/privacidade',
  },
} as const;

export default function ContactForm({ lang = 'pt' }: { lang?: 'pt' | 'en' | 'ru' }) {
  const [state, handleSubmit] = useForm('mpqganlp');
  const [motivo, setMotivo] = useState('');
  const t = STRINGS[lang];

  // Conversão: submissão de formulário bem-sucedida (GA4 + Google Ads)
  useEffect(() => {
    if (state.succeeded) {
      event('generate_lead', { method: 'form' });
      event('conversion', { send_to: 'AW-859136288/jNYHCPHO28ccEKDC1ZkD' });
    }
  }, [state.succeeded]);

  if (state.succeeded) {
    return (
      <div className="contact-success">
        <div className="success-icon">✓</div>
        <h3>{t.successTitle}</h3>
        <p>{t.successBody}</p>
      </div>
    );
  }

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-container">
        <div className="contact-header">
          <h2>{t.heading}</h2>
          <p>
            {t.introBefore}{' '}
            <a href="tel:+351926850194" className="contact-phone">
              926 850 194
            </a>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          {/* Nome */}
          <div className="form-group">
            <label htmlFor="nome">{t.nameLabel}</label>
            <input
              id="nome"
              type="text"
              name="nome"
              placeholder={t.namePlaceholder}
              required
              autoComplete="name"
            />
            <ValidationError prefix="Nome" field="nome" errors={state.errors} className="field-error" />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">{t.emailLabel}</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder={t.emailPlaceholder}
              required
              autoComplete="email"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} className="field-error" />
          </div>

          {/* Telefone */}
          <div className="form-group">
            <label htmlFor="telefone">
              {t.phoneLabel} <span className="optional">{t.optional}</span>
            </label>
            <input
              id="telefone"
              type="tel"
              name="telefone"
              placeholder="+351 9XX XXX XXX"
              autoComplete="tel"
            />
          </div>

          {/* Motivo */}
          <div className="form-group">
            <label htmlFor="motivo">{t.reasonLabel}</label>
            <select
              id="motivo"
              name="motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            >
              <option value="" disabled>
                {t.reasonPlaceholder}
              </option>
              {t.reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ValidationError prefix="Motivo" field="motivo" errors={state.errors} className="field-error" />
          </div>

          {/* Mensagem */}
          <div className="form-group">
            <label htmlFor="mensagem">
              {t.messageLabel} <span className="optional">{t.optional}</span>
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={4}
              placeholder={t.messagePlaceholder}
            />
            <ValidationError prefix="Mensagem" field="mensagem" errors={state.errors} className="field-error" />
          </div>

          {/* GDPR */}
          <div className="form-group form-group--checkbox">
            <label className="checkbox-label">
              <input type="checkbox" name="gdpr" required />
              <span>
                {t.gdprBefore}{' '}
                <a href={t.privacyHref} target="_blank" rel="noopener noreferrer">
                  {t.gdprLink}
                </a>
                .
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={state.submitting}
            className="submit-btn"
          >
            {state.submitting ? t.submitting : t.submit}
          </button>

          {/* Generic error */}
          {state.errors && (
            <p className="form-error-global">
              {t.errorGlobal}
            </p>
          )}
        </form>

        {/* Contact info strip */}
        <div className="contact-info-strip">
          <div className="contact-info-item">
            <span className="info-label">{t.infoEmail}</span>
            <a href="mailto:joelho@consultajoelho.pt">joelho@consultajoelho.pt</a>
          </div>
          <div className="contact-info-item">
            <span className="info-label">{t.infoPhone}</span>
            <a href="tel:+351926850194">926 850 194</a>
          </div>
          <div className="contact-info-item">
            <span className="info-label">{t.infoReplyLabel}</span>
            <span>{t.infoReplyValue}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          background: #f6f9f5;
          padding: 4rem 1.5rem;
        }

        .contact-container {
          max-width: 680px;
          margin: 0 auto;
        }

        .contact-header {
          margin-bottom: 2.5rem;
        }

        .contact-header h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.75rem, 4vw, 2.25rem);
          font-weight: 700;
          color: #035772;
          margin: 0 0 0.75rem;
        }

        .contact-header p {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          color: #4a5568;
          line-height: 1.6;
          margin: 0;
        }

        .contact-phone {
          color: #035772;
          font-weight: 600;
          text-decoration: none;
        }

        .contact-phone:hover {
          text-decoration: underline;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #091405;
          letter-spacing: 0.01em;
        }

        .optional {
          font-weight: 400;
          color: #718096;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          color: #091405;
          background: #fff;
          border: 1.5px solid #cbd5e0;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          width: 100%;
          box-sizing: border-box;
          appearance: none;
          -webkit-appearance: none;
        }

        .form-group select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23035772' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #035772;
          box-shadow: 0 0 0 3px rgba(3, 87, 114, 0.12);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 110px;
        }

        .form-group--checkbox {
          margin-top: 0.25rem;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.875rem;
          color: #4a5568;
          line-height: 1.5;
          cursor: pointer;
          font-weight: 400 !important;
        }

        .checkbox-label input[type='checkbox'] {
          width: 18px;
          height: 18px;
          min-width: 18px;
          margin-top: 2px;
          accent-color: #035772;
          cursor: pointer;
          border: none;
          padding: 0;
          box-shadow: none;
        }

        .checkbox-label a {
          color: #035772;
          text-decoration: underline;
        }

        .field-error {
          font-size: 0.8rem;
          color: #c53030;
          margin-top: 0.2rem;
        }

        .form-error-global {
          font-size: 0.875rem;
          color: #c53030;
          text-align: center;
          margin: 0;
        }

        .submit-btn {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          background: #035772;
          border: none;
          border-radius: 8px;
          padding: 0.9rem 2rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          letter-spacing: 0.01em;
          margin-top: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
          background: #024d66;
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Success state */
        .contact-success {
          max-width: 680px;
          margin: 4rem auto;
          text-align: center;
          padding: 3rem 2rem;
          background: #fff;
          border-radius: 12px;
          border: 1.5px solid #AACBA8;
        }

        .success-icon {
          width: 56px;
          height: 56px;
          background: #035772;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 1.25rem;
        }

        .contact-success h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #035772;
          margin: 0 0 0.75rem;
        }

        .contact-success p {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          color: #4a5568;
          line-height: 1.6;
          margin: 0;
        }

        /* Info strip */
        .contact-info-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
        }

        .contact-info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
          min-width: 160px;
        }

        .info-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .contact-info-item a,
        .contact-info-item span:not(.info-label) {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.95rem;
          color: #035772;
          font-weight: 600;
          text-decoration: none;
        }

        .contact-info-item a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .contact-section {
            padding: 3rem 1rem;
          }

          .contact-info-strip {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
