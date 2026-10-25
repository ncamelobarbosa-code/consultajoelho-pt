// Configuração da PWA /app (acompanhamento pós-operatório).
// Fonte: "app-textos-e-especificacao.md" e "followup-v2-make.md" (projeto Consultajoelho.pt).

// Texto obrigatório — não alterar sem validação do Dr. Nuno Camelo Barbosa.
export const AVISO_SEGURANCA =
  "Esta app não é monitorizada em tempo real. Se tiver febre, dor intensa que não cede à medicação, ferida a abrir ou com pus, ou dor/inchaço na barriga da perna, contacte WhatsApp +351 912 188 800. Se não conseguir contactar o seu médico assistente, dirija-se ao serviço de urgência do hospital da sua área de residência (SNS 24: 808 24 24 24; emergência: 112).";

export const WHATSAPP_HREF = "https://wa.me/351912188800";
export const WHATSAPP_LABEL = "+351 912 188 800";
export const EMAIL = "joelho@consultajoelho.pt";

export const CODIGO_RE = /^NC-[0-9A-F]{6}$/;
export const CODIGO_STORAGE_KEY = "cj-app-codigo";

// Google Forms — só o campo Código é pré-preenchido.
export const QUESTIONARIOS = [
  { id: "T0", label: "T0 — antes da cirurgia", pub: "1FAIpQLScCLoQsWCKGTlJwv-MFf9yc1BvSeCHvZ24wMtmR2JSHY3tfeQ", entry: "1453390334" },
  { id: "M6", label: "M6 — 6 meses", pub: "1FAIpQLSc46T_roaSfxyL9WIdzDo49hEKWWbN6AVX0-TYSHQu12OePYw", entry: "1466336669" },
  { id: "M12", label: "M12 — 12 meses", pub: "1FAIpQLSe7rtFg9HhXQHwq7ckNWqebhxV4uKgJqOfKCR6FLpkWvjM-uQ", entry: "483170902" },
  { id: "M24", label: "M24 — 24 meses", pub: "1FAIpQLSesgVaFLyD51tErgQcsMB_AKqzCn7ZePA_5TQpifj6iwaJU4g", entry: "1897997052" },
] as const;

export function formUrl(pub: string, entry: string, codigo: string): string {
  return `https://docs.google.com/forms/d/e/${pub}/viewform?usp=pp_url&entry.${entry}=${encodeURIComponent(codigo)}`;
}

// Webhook Make (cenário 8164467 "Receber VAS"): grava codigo, momento e score.
export const VAS_WEBHOOK = "https://hook.eu1.make.com/taefgvviwv0b8icvmued7plncq8r0yn8";

export const GOOGLE_REVIEW_HREF = "https://share.google/6QUpHEnfGKhNEjRc7";
