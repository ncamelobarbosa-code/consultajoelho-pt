import * as cheerio from "cheerio";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const SRC = "/Users/nunocamelobarbosa/Desktop/ConsultaJoelho Vercel";
const APP = "src/app";
const COMP = "src/components";

// filename -> route segment ("" = homepage)
const ROUTES = {
  "homepage_consultajoelho.html": "",
  "infiltracoes-joelho-v3.html": "infiltracoes",
  "cartilagem_joelho.html": "cartilagem",
  "lca_ligamento_cruzado_anterior.html": "lca",
  "menisco_rotura.html": "menisco",
  "protese_joelho_desporto.html": "protese",
  "artrose_gonartrose.html": "artrose",
  "quisto_baker.html": "quisto-baker",
  "quistos_parameniscais.html": "quistos-parameniscais",
  "sindrome_banda_iliotibial.html": "sindrome-banda-iliotibial",
  "luxacao_rotula.html": "luxacao-rotula",
  "quadriceps_cirurgia_joelho.html": "quadriceps",
  "medo_cirurgia_joelho.html": "medo-cirurgia",
  "preparar_cirurgia_joelho.html": "preparar-cirurgia",
  "recuperar_cirurgia_joelho.html": "recuperar-cirurgia",
  "sigic_vale_cirurgia.html": "sigic",
  "avaliar_joelho.html": "avaliar",
  "nuno_camelo_cv_curriculo.html": "nuno-camelo-especialista-cirurgia-joelho",
  "algoritmo_gonalgia_nuno_camelo.html": "joelhodrnunocamelo",
};

// Reescrita de links: slug antigo -> slug novo (onde há página nova)
const LINK_MAP = {
  "/cartilagemjoelhodrnunocamelo": "/cartilagem",
  "/rupturameniscosjoelho": "/menisco",
  "/meniscosnojoelho": "/menisco",
  "/ligamentocruzadoanterior": "/lca",
  "/protesejoelhodesportodrnunocamelo": "/protese",
  "/sindromebandailiotibialjoelho": "/sindrome-banda-iliotibial",
  "/luxacaorotulajoelho": "/luxacao-rotula",
  "/quistobakerjoelhodrnunocamelo": "/quisto-baker",
  "/quistosparameniscaisjoelho": "/quistos-parameniscais",
  "/prepararcirurgiajoelho": "/preparar-cirurgia",
  "/cirurgiadojoelhoeagora": "/preparar-cirurgia",
  "/recuperarcirurgiajoelho": "/recuperar-cirurgia",
  "/quadricepsjoelho": "/quadriceps",
  "/medocirurgiajoelho": "/medo-cirurgia",
  "/avaliarjoelho": "/avaliar",
  "/infiltracaojoelho": "/infiltracoes",
  "/agendamentonunocameloespecialistajoelho": "/contacto",
};
// Também converter links .html (caso existam)
for (const [file, seg] of Object.entries(ROUTES)) {
  LINK_MAP[file] = "/" + seg;
}

function rewriteLinks(html) {
  let out = html;
  for (const [from, to] of Object.entries(LINK_MAP)) {
    out = out.split(`href="${from}"`).join(`href="${to}"`);
  }
  return out;
}

function buildMetadata($) {
  const get = (sel, attr = "content") => $(sel).attr(attr) || undefined;
  const title = $("title").first().text().trim() || undefined;
  const description = get('meta[name="description"]');
  const canonical = get('link[rel="canonical"]', "href");
  const ogImage = get('meta[property="og:image"]');
  const meta = { title, description };
  if (canonical) meta.alternates = { canonical };
  const og = {
    title: get('meta[property="og:title"]') || title,
    description: get('meta[property="og:description"]') || description,
    url: get('meta[property="og:url"]'),
    type: get('meta[property="og:type"]') || "article",
  };
  if (ogImage) og.images = [ogImage];
  Object.keys(og).forEach((k) => og[k] === undefined && delete og[k]);
  meta.openGraph = og;
  return meta;
}

const pageTemplate = (meta, css, jsonld, body, script, id) => `import type { Metadata } from "next";${script ? `\nimport Script from "next/script";` : ""}

export const metadata: Metadata = ${JSON.stringify(meta, null, 2)};

const css = ${JSON.stringify(css)};
const html = ${JSON.stringify(body)};${jsonld ? `\nconst jsonLd = ${JSON.stringify(jsonld)};` : ""}${script ? `\nconst pageScript = ${JSON.stringify(script)};` : ""}

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />${jsonld ? `\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />` : ""}
      <div dangerouslySetInnerHTML={{ __html: html }} />${script ? `\n      <Script id="${id}-js" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: pageScript }} />` : ""}
    </>
  );
}
`;

const homepageTemplate = (meta, jsonld, body, script, id) => `import type { Metadata } from "next";${script ? `\nimport Script from "next/script";` : ""}

export const metadata: Metadata = ${JSON.stringify(meta, null, 2)};

const html = ${JSON.stringify(body)};${jsonld ? `\nconst jsonLd = ${JSON.stringify(jsonld)};` : ""}${script ? `\nconst pageScript = ${JSON.stringify(script)};` : ""}

export default function Page() {
  return (
    <>${jsonld ? `\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />` : ""}
      <div dangerouslySetInnerHTML={{ __html: html }} />${script ? `\n      <Script id="${id}-js" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: pageScript }} />` : ""}
    </>
  );
}
`;

let homepageCss = "";
let headerHtml = "";
let footerHtml = "";
const report = [];
let scriptPages = [];

for (const [file, seg] of Object.entries(ROUTES)) {
  const raw = await readFile(`${SRC}/${file}`, "utf8");
  const $ = cheerio.load(raw, { decodeEntities: false });

  const meta = buildMetadata($);
  const css = $("style").toArray().map((el) => $(el).html()).join("\n\n");
  const jsonld = $('script[type="application/ld+json"]').first().html() || "";

  // chrome da homepage -> layout partilhado
  if (seg === "") {
    homepageCss = css;
    const h = $("body > header").first();
    const f = $("body > footer").first();
    headerHtml = h.length ? rewriteLinks($.html(h)) : "";
    footerHtml = f.length ? rewriteLinks($.html(f)) : "";
  }

  // remover chrome e scripts do corpo
  $("body > header, body > footer, body > nav").remove();
  // capturar scripts inline do corpo (para reinjetar via next/script)
  const inlineScript = $("body script")
    .not('[type="application/ld+json"]')
    .not("[src]")
    .toArray()
    .map((el) => $(el).html())
    .filter(Boolean)
    .join("\n");
  if (inlineScript) scriptPages.push(seg || "homepage");
  $("body script, body style").remove();

  let body = rewriteLinks($("body").html() || "");

  const dir = seg ? `${APP}/${seg}` : APP;
  await mkdir(dir, { recursive: true });
  const id = (seg || "home").replace(/[^a-z0-9]/g, "-");
  const content =
    seg === ""
      ? homepageTemplate(meta, jsonld, body, inlineScript, id)
      : pageTemplate(meta, css, jsonld, body, inlineScript, id);
  await writeFile(`${dir}/page.tsx`, content, "utf8");
  report.push(`  ✓ ${(seg || "(homepage)").padEnd(26)} ${body.length} chars  css=${css.length}  ld=${jsonld ? "sim" : "não"}`);
}

// site.css global (CSS da homepage = tokens + base + chrome + secções home)
const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');\n\n`;
await writeFile(`${APP}/site.css`, fontImport + homepageCss, "utf8");

// Chrome PT (dados; SiteChrome.tsx é escrito à mão e importa daqui)
await writeFile(
  `${COMP}/chrome-pt.ts`,
  `export const ptHeader = ${JSON.stringify(headerHtml)};\nexport const ptFooter = ${JSON.stringify(footerHtml)};\n`,
  "utf8"
);

// ── EN (i18n): gera /en/<slug> a partir de <ptfile>_en.html ──
const enRaw = {};
for (const [file, seg] of Object.entries(ROUTES)) {
  try {
    enRaw[seg] = await readFile(`${SRC}/${file.replace(/\.html$/, "_en.html")}`, "utf8");
  } catch {}
}
const enSlugs = new Set(Object.keys(enRaw)); // segs com versão EN ("" = homepage)
enSlugs.add("contacto"); // /en/contacto existe (página React, fora do pipeline HTML)
// reescreve links: PT->novos slugs, depois prefixa /en onde a tradução existe
function rewriteLinksEn(html) {
  let out = rewriteLinks(html);
  out = out.replace(/href="\/([a-zA-Z0-9-]+)"/g, (m, slug) =>
    enSlugs.has(slug) ? `href="/en/${slug}"` : m
  );
  if (enSlugs.has("")) out = out.replace(/href="\/"/g, 'href="/en"');
  return out;
}
let enHeaderHtml = "", enFooterHtml = "", enCount = 0;
for (const [file, seg] of Object.entries(ROUTES)) {
  const raw = enRaw[seg];
  if (!raw) continue;
  const $e = cheerio.load(raw, { decodeEntities: false });
  const enMeta = buildMetadata($e);
  const enJsonld = $e('script[type="application/ld+json"]').first().html() || "";
  if (seg === "") {
    const eh = $e("body > header").first();
    const ef = $e("body > footer").first();
    enHeaderHtml = eh.length ? rewriteLinksEn($e.html(eh)) : "";
    enFooterHtml = ef.length ? rewriteLinksEn($e.html(ef)) : "";
  }
  const css = $e("style").toArray().map((el) => $e(el).html()).join("\n\n");
  $e("body > header, body > footer, body > nav").remove();
  const enScript = $e("body script").not('[type="application/ld+json"]').not("[src]").toArray().map((el) => $e(el).html()).filter(Boolean).join("\n");
  $e("body script, body style").remove();
  const body = rewriteLinksEn($e("body").html() || "");
  const dir = seg ? `${APP}/en/${seg}` : `${APP}/en`;
  await mkdir(dir, { recursive: true });
  const id = "en-" + (seg || "home").replace(/[^a-z0-9]/g, "-");
  const content = seg === ""
    ? homepageTemplate(enMeta, enJsonld, body, enScript, id)
    : pageTemplate(enMeta, css, enJsonld, body, enScript, id);
  await writeFile(`${dir}/page.tsx`, content, "utf8");
  enCount++;
}
if (enHeaderHtml) {
  await writeFile(`${COMP}/chrome-en.ts`, `export const enHeader = ${JSON.stringify(enHeaderHtml)};\nexport const enFooter = ${JSON.stringify(enFooterHtml)};\n`, "utf8");
}
console.log(`EN: ${enCount} páginas geradas (${[...enSlugs].map((s)=>s||"home").join(", ")})`);

console.log("=== Páginas geradas ===");
console.log(report.join("\n"));
console.log(`\nsite.css: ${homepageCss.length} chars`);
console.log(`chrome: header=${headerHtml.length} footer=${footerHtml.length}`);
console.log(`páginas com <script> (interatividade a recuperar depois): ${scriptPages.join(", ") || "nenhuma"}`);
console.log(`\nTotal: ${Object.keys(ROUTES).length} páginas`);
