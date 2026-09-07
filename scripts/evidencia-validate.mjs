#!/usr/bin/env node
// Valida content/evidencia/*.json antes do commit.
// Corre no CI e localmente:  node scripts/evidencia-validate.mjs
//
// Existe porque o agente mensal escreve estes ficheiros sem supervisão. Um `refs`
// órfão ou um DOI mal formado passa despercebido na revisão do PR mas parte a
// renderização das citações — ou, pior, publica uma referência que não existe.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "content/evidencia";
const TIPOS = new Set([
  "Meta-análise",
  "Revisão sistemática",
  "Ensaio clínico aleatorizado",
  "Norma de orientação clínica",
  "Consenso de peritos",
]);

// Limite prático do rich snippet de FAQ do Google. Acima disto o ganho é nulo e o
// risco de a página ser lida como "FAQ farm" aumenta.
const MAX_FAQ = 10;
// Referências mais antigas do que isto deixam de ser "literatura recente".
const ANO_MIN = new Date().getFullYear() - 6;

const erros = [];
const avisos = [];

const ficheiros = readdirSync(DIR).filter(
  (f) => f.endsWith(".json") && !f.startsWith("_"),
);

if (ficheiros.length === 0) {
  console.log("evidencia: nenhum ficheiro para validar.");
  process.exit(0);
}

for (const f of ficheiros) {
  const caminho = join(DIR, f);
  const e = (m) => erros.push(`${caminho}: ${m}`);
  const a = (m) => avisos.push(`${caminho}: ${m}`);

  let doc;
  try {
    doc = JSON.parse(readFileSync(caminho, "utf8"));
  } catch (err) {
    e(`JSON inválido — ${err.message}`);
    continue;
  }

  const esperado = f.replace(/\.json$/, "");
  if (doc.slug !== esperado) e(`slug "${doc.slug}" não coincide com o ficheiro`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(doc.atualizado ?? ""))
    e(`"atualizado" tem de ser YYYY-MM-DD (está "${doc.atualizado}")`);
  if (!doc.revistoPor) e(`falta "revistoPor" — o schema lastReviewed precisa dele`);

  const refs = Array.isArray(doc.referencias) ? doc.referencias : [];
  const faq = Array.isArray(doc.faq) ? doc.faq : [];

  const ids = new Set();
  for (const r of refs) {
    if (!r.id) { e(`referência sem "id"`); continue; }
    if (ids.has(r.id)) e(`id duplicado "${r.id}"`);
    ids.add(r.id);

    for (const campo of ["autores", "titulo", "revista", "ano", "tipo", "resumoPt"]) {
      if (!r[campo]) e(`referência "${r.id}" sem "${campo}"`);
    }
    if (!TIPOS.has(r.tipo))
      e(`referência "${r.id}": tipo "${r.tipo}" não é um nível de evidência aceite`);
    if (!r.doi && !r.pmid)
      e(`referência "${r.id}" sem DOI e sem PMID — não é verificável`);
    if (r.doi && !/^10\.\d{4,9}\/\S+$/.test(r.doi))
      e(`referência "${r.id}": DOI mal formado "${r.doi}"`);
    if (r.pmid && !/^\d{6,9}$/.test(String(r.pmid)))
      e(`referência "${r.id}": PMID mal formado "${r.pmid}"`);
    if (typeof r.ano === "number" && r.ano < ANO_MIN)
      a(`referência "${r.id}" é de ${r.ano} — já não conta como literatura recente`);
    if (r.resumoPt && r.resumoPt.length > 600)
      a(`referência "${r.id}": resumoPt com ${r.resumoPt.length} caracteres, é demasiado longo`);
  }

  const perguntas = new Set();
  for (const q of faq) {
    if (!q.pergunta || !q.resposta) { e(`FAQ incompleta`); continue; }
    if (perguntas.has(q.pergunta)) e(`pergunta duplicada: "${q.pergunta}"`);
    perguntas.add(q.pergunta);
    if (!Array.isArray(q.refs) || q.refs.length === 0)
      e(`FAQ "${q.pergunta}" não cita nenhuma referência`);
    for (const id of q.refs ?? []) {
      if (!ids.has(id))
        e(`FAQ "${q.pergunta}" cita "${id}", que não existe em referencias`);
    }
    if (q.resposta.length < 120)
      a(`FAQ "${q.pergunta}": resposta curta demais para valer rich snippet`);
  }

  if (faq.length > MAX_FAQ)
    e(`${faq.length} perguntas — o máximo prático é ${MAX_FAQ}`);
}

for (const m of avisos) console.warn(`aviso  ${m}`);
for (const m of erros) console.error(`ERRO   ${m}`);

if (erros.length) {
  console.error(`\nevidencia: ${erros.length} erro(s). Build bloqueado.`);
  process.exit(1);
}
console.log(
  `evidencia: ${ficheiros.length} ficheiro(s) válido(s)${avisos.length ? `, ${avisos.length} aviso(s)` : ""}.`,
);
