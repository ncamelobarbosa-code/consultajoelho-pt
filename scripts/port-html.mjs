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
  // P0-2: qualquer link (relativo ou absoluto) para a rota inexistente "agendamento..." -> /contacto
  out = out.replace(/href="[^"]*agendamentonunocameloespecialistajoelho[^"]*"/g, 'href="/contacto"');
  // P0-2: links à raiz por URL absoluto (com/sem www) -> relativo "/"
  out = out.replace(/href="https:\/\/(?:www\.)?consultajoelho\.pt\/?"/g, 'href="/"');
  return out;
}

// P0-2: normaliza URLs sem-www -> www (sobretudo dentro de <script> interativos)
const fixWww = (s) => (s || "").replace(/https:\/\/consultajoelho\.pt(["'\/ ])/g, "https://www.consultajoelho.pt$1");

// Rodapé mais curto: remove links secundários (mantém os principais).
const FOOTER_DROP = ["artrose", "sindrome-banda-iliotibial", "luxacao-rotula", "quadriceps", "medo-cirurgia"];
function trimFooter(html) {
  let out = html;
  for (const s of FOOTER_DROP) {
    out = out.replace(new RegExp(`\\s*<a [^>]*href="(?:/en|/ru)?/${s}"[^>]*>[^<]*</a>`, "g"), "");
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

// slugs (página PT) que têm secção de vídeo (ver src/lib/videos.ts PAGE_VIDEOS)
const VIDEO_PAGE_SLUGS = new Set(["lca", "menisco", "cartilagem", "quadriceps"]);

const pageTemplate = (meta, css, jsonld, body, script, id, slug = "", locale = "pt") => {
  const hasVideos = VIDEO_PAGE_SLUGS.has(slug);
  return `import type { Metadata } from "next";${script ? `\nimport Script from "next/script";` : ""}${hasVideos ? `\nimport PageVideos from "@/components/PageVideos";` : ""}

export const metadata: Metadata = ${JSON.stringify(meta, null, 2)};

const css = ${JSON.stringify(css)};
const html = ${JSON.stringify(body)};${jsonld ? `\nconst jsonLd = ${JSON.stringify(jsonld)};` : ""}${script ? `\nconst pageScript = ${JSON.stringify(script)};` : ""}

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />${jsonld ? `\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />` : ""}
      <div dangerouslySetInnerHTML={{ __html: html }} />${hasVideos ? `\n      <PageVideos slug="${slug}" lang="${locale}" />` : ""}${script ? `\n      <Script id="${id}-js" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: pageScript }} />` : ""}
    </>
  );
}
`;
};

const homepageTemplate = (meta, jsonld, body, script, id, locale = "pt") => `import type { Metadata } from "next";${script ? `\nimport Script from "next/script";` : ""}
import VideoHero from "@/components/VideoHero";
import HomeIntro from "@/components/HomeIntro";
import Locais from "@/components/Locais";
import PageVideos from "@/components/PageVideos";
import GoogleReviews from "@/components/GoogleReviews";

export const metadata: Metadata = ${JSON.stringify(meta, null, 2)};

const html = ${JSON.stringify(body)};${jsonld ? `\nconst jsonLd = ${JSON.stringify(jsonld)};` : ""}${script ? `\nconst pageScript = ${JSON.stringify(script)};` : ""}

export default function Page() {
  return (
    <>${jsonld ? `\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />` : ""}
      <VideoHero lang="${locale}" />
      <HomeIntro lang="${locale}" />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <PageVideos slug="" lang="${locale}" />
      <GoogleReviews lang="${locale}" />
      <Locais lang="${locale}" />${script ? `\n      <Script id="${id}-js" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: pageScript }} />` : ""}
    </>
  );
}
`;

let homepageCss = "";
let headerHtml = "";
let footerHtml = "";
const report = [];
let scriptPages = [];

// ── i18n: descobrir que segs têm versão EN (necessário p/ hreflang no loop PT) ──
const enRaw = {};
for (const [file, seg] of Object.entries(ROUTES)) {
  try {
    enRaw[seg] = await readFile(`${SRC}/${file.replace(/\.html$/, "_en.html")}`, "utf8");
  } catch {}
}
const enSlugs = new Set(Object.keys(enRaw)); // segs com versão EN ("" = homepage)
enSlugs.add("contacto"); // /en/contacto existe (página React, fora do pipeline HTML)
// /en via PortedArticle (conteúdo EN scraped/traduzido)
for (const s of ["tendao-rotuliano-tendinite-drnunocamelo", "liquidojoelho-artrocentese-drnunocamelo", "entorsejoelho-drnunocamelo", "actividadecientificajoelho"]) enSlugs.add(s);

// ── i18n RU: descobrir que segs têm versão RU (traduzida do EN) ──
const ruRaw = {};
for (const [file, seg] of Object.entries(ROUTES)) {
  try {
    ruRaw[seg] = await readFile(`${SRC}/${file.replace(/\.html$/, "_ru.html")}`, "utf8");
  } catch {}
}
const ruSlugs = new Set(Object.keys(ruRaw)); // segs com versão RU ("" = homepage)
ruSlugs.add("contacto"); // /ru/contacto existe (página React, fora do pipeline HTML)
// /ru via PortedArticle (conteúdo RU traduzido)
for (const s of ["tendao-rotuliano-tendinite-drnunocamelo", "kneesurgeryinportugalprices", "liquidojoelho-artrocentese-drnunocamelo", "entorsejoelho-drnunocamelo", "actividadecientificajoelho"]) ruSlugs.add(s);

// hreflang: URLs alternativos por seg ("" = homepage). Só lista locales que existem.
const BASE = "https://www.consultajoelho.pt";
function langAlternates(seg) {
  const path = seg ? `/${seg}` : "";
  const langs = { "pt-PT": `${BASE}${path}`, "x-default": `${BASE}${path}` };
  if (enSlugs.has(seg)) langs["en-GB"] = `${BASE}/en${path}`;
  if (ruSlugs.has(seg)) langs["ru-RU"] = `${BASE}/ru${path}`;
  return langs;
}
const hasTranslation = (seg) => enSlugs.has(seg) || ruSlugs.has(seg);

// Seletor de idioma de 3 línguas: cada locale mostra as outras duas (apontam para a home do locale).
const SWITCHER = {
  pt: '<a href="/en" class="nav-lang" hreflang="en" title="English">EN</a><a href="/ru" class="nav-lang" hreflang="ru" title="Русский">RU</a>',
  en: '<a href="/" class="nav-lang" hreflang="pt" title="Português">PT</a><a href="/ru" class="nav-lang" hreflang="ru" title="Русский">RU</a>',
  ru: '<a href="/" class="nav-lang" hreflang="pt" title="Português">PT</a><a href="/en" class="nav-lang" hreflang="en" title="English">EN</a>',
};
function injectSwitcher(html, locale) {
  // substitui o(s) link(s) nav-lang existente(s) pelo conjunto correto do locale
  return html.replace(/<a\b[^>]*class="nav-lang"[^>]*>[\s\S]*?<\/a>/, SWITCHER[locale]);
}

// Link "Vídeos" no menu (último nav-item), por locale.
const VIDEOS_LINK = {
  pt: { href: "/videos", label: "Vídeos" },
  en: { href: "/en/videos", label: "Videos" },
  ru: { href: "/ru/videos", label: "Видео" },
};
function injectVideosLink(html, locale) {
  const { href, label } = VIDEOS_LINK[locale];
  if (html.includes(`href="${href}"`)) return html; // já existe
  return html.replace("</nav>", `<div class="nav-item"><a href="${href}">${label}</a></div></nav>`);
}

// Foto profissional no hero de páginas de patologia (slug -> imagem em /public).
// Sobrepõe um gradiente escuro para o texto branco ler bem.
// P0-5: descrições específicas por slug (quando o HTML não traz meta description).
const META_DESC = {
  joelhodrnunocamelo: {
    pt: "Algoritmo interativo de orientação da dor no joelho (gonalgia): responda a perguntas simples e perceba a provável causa e quando procurar o especialista. Dr. Nuno Camelo.",
    en: "Interactive knee pain (gonalgia) triage algorithm: answer a few simple questions to understand the likely cause and when to see a knee specialist. Dr. Nuno Camelo.",
    ru: "Интерактивный алгоритм оценки боли в колене: ответьте на простые вопросы, чтобы понять вероятную причину и когда обратиться к специалисту. Dr. Nuno Camelo.",
  },
};
function applyMetaDesc(meta, seg, locale) {
  const d = META_DESC[seg] && META_DESC[seg][locale];
  if (!d) return;
  if (!meta.description) meta.description = d;
  meta.openGraph = { ...(meta.openGraph || {}), description: (meta.openGraph && meta.openGraph.description) || d };
}

const HERO_IMAGES = {
  lca: "/img/hero/lca.jpg",
  protese: "/img/hero/protese.jpg",
  "recuperar-cirurgia": "/img/hero/recuperar.jpg",
  cartilagem: "/img/hero/cartilagem.jpg",
  avaliar: "/img/hero/avaliar.jpg",
  infiltracoes: "/img/hero/infiltracoes.jpg",
  menisco: "/img/hero/menisco.jpg",
  artrose: "/img/hero/artrose.jpg",
  "luxacao-rotula": "/img/hero/luxacao-rotula.jpg",
  "sindrome-banda-iliotibial": "/img/hero/sindrome-banda-iliotibial.jpg",
  "quisto-baker": "/img/hero/quisto-baker.jpg",
  "quistos-parameniscais": "/img/hero/quistos-parameniscais.jpg",
  quadriceps: "/img/hero/quadriceps.jpg",
  "medo-cirurgia": "/img/hero/medo-cirurgia.jpg",
  "preparar-cirurgia": "/img/hero/preparar-cirurgia.jpg",
  sigic: "/img/hero/sigic.jpg",
};
function injectHeroImage($x, seg) {
  const img = HERO_IMAGES[seg];
  if (!img) return;
  const hero = $x("section.hero, .page-hero").first();
  if (!hero.length) return;
  const prev = (hero.attr("style") || "").replace(/;?\s*$/, "");
  hero.attr(
    "style",
    `${prev ? prev + ";" : ""}background:linear-gradient(118deg, rgba(2,29,40,.9) 0%, rgba(2,45,61,.62) 58%, rgba(2,45,61,.42) 100%), url('${img}') center/cover;`
  );
}

// Homepage: substitui a foto das "Ferramentas Clínicas" por um grafismo de IA
// (árvore de decisão / algoritmo), aludindo a "descobre o teu problema pelo algoritmo".
const AI_SVG = `<svg viewBox="0 0 320 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Algoritmo de orientação">
  <g stroke="rgba(170,203,168,.55)" stroke-width="2.5" fill="none">
    <path d="M160 42 L88 108"/><path d="M160 42 L232 108"/>
    <path d="M88 108 L50 180"/><path d="M88 108 L126 180"/>
    <path d="M232 108 L194 180"/><path d="M232 108 L270 180"/>
  </g>
  <circle cx="50" cy="180" r="9" fill="rgba(255,255,255,.65)"/>
  <circle cx="126" cy="180" r="9" fill="rgba(255,255,255,.65)"/>
  <circle cx="194" cy="180" r="9" fill="rgba(255,255,255,.65)"/>
  <circle cx="270" cy="180" r="9" fill="rgba(255,255,255,.65)"/>
  <circle cx="88" cy="108" r="13" fill="#ffffff"/>
  <circle cx="232" cy="108" r="13" fill="#ffffff"/>
  <circle cx="160" cy="42" r="20" fill="#AACBA8"/>
  <text x="160" y="49" text-anchor="middle" fill="#022d3d" font-family="'Space Grotesk',sans-serif" font-size="20" font-weight="700">?</text>
</svg>`;
function injectToolsGraphic($x) {
  const photo = $x(".tools-photo").first();
  if (!photo.length) return;
  photo.find("img").remove();
  photo.prepend(`<div class="tools-ai">${AI_SVG}</div>`);
}

// Homepage: simplificar a secção de ferramentas — só o grafismo (com link p/ o algoritmo)
// + os 2 botões (Algoritmo de Gonalgia / Score de Lysholm). Remove todo o texto/cartões.
function simplifyTools($x) {
  const sec = $x("section.tools");
  if (!sec.length) return;
  sec.find(".tools-photo-badge").remove();
  // título (curiosidade) e texto do botão — localizados, a partir do conteúdo da secção
  const title = (sec.find(".tools-text .h2").text() || "O que fazer se o joelho dói?").trim();
  const algoLabel = (sec.find(".tools-actions a").first().text() || "Algoritmo de Gonalgia").trim();
  // remover TODO o texto da secção (eyebrow, título, descrição, cartões e os 2 botões)
  sec.find(".tools-text").remove();
  // grafismo a ocupar a largura toda + título + botão sobrepostos dentro da imagem
  sec.find(".tools-inner").css({ "grid-template-columns": "1fr", "max-width": "680px" });
  const photo = sec.find(".tools-photo").first();
  if (photo.length) {
    photo.prepend(`<div class="tools-ai-title">${title}</div>`);
    photo.append(`<a href="/joelhodrnunocamelo" class="tools-ai-btn">${algoLabel}</a>`);
  }
}

// Tabela SANTI (quadricípite): adiciona data-label a cada td (rótulo da coluna)
// para o layout em cartões no mobile. Funciona nos 3 idiomas (lê os <th> da própria página).
// Torna QUALQUER tabela com cabeçalho responsiva no mobile: marca a tabela com
// data-resp e cada célula com data-label (= título da coluna). O CSS global em
// polish.css (selector [data-resp]) transforma-a em cartões empilhados, tema-agnóstico.
function makeTablesResponsive($x) {
  $x("table").each((ti, tbl) => {
    const table = $x(tbl);
    const labels = table.find("thead th").map((i, th) => $x(th).text().trim()).get();
    if (!labels.length) return;
    table.attr("data-resp", "");
    table.find("tbody tr").each((ri, tr) => {
      $x(tr).find("td").each((ci, td) => {
        if (labels[ci]) $x(td).attr("data-label", labels[ci]);
      });
    });
  });
}

// Artrose: parágrafo "é possível fazer desporto com prótese" no fim da escada terapêutica.
const PROSE_SPORT = {
  pt: {
    t: "Desporto depois da prótese? Sim.",
    p: "Uma prótese do joelho não é o fim da vida activa — pelo contrário, o objectivo da cirurgia é devolver mobilidade sem dor. A maioria dos doentes regressa a actividades de baixo e médio impacto: caminhada, natação, hidroginástica, bicicleta, golfe, hiking, ténis de pares e esqui recreativo. Aconselha-se apenas evitar o impacto repetitivo de alta intensidade (corrida de longa distância, saltos e desportos de contacto), que acelera o desgaste do implante.",
  },
  en: {
    t: "Sport after a knee replacement? Yes.",
    p: "A knee replacement is not the end of an active life — on the contrary, the goal of surgery is to restore pain-free mobility. Most patients return to low- and medium-impact activities: walking, swimming, water aerobics, cycling, golf, hiking, doubles tennis and recreational skiing. It is only advisable to avoid high-intensity repetitive impact (long-distance running, jumping and contact sports), which accelerates implant wear.",
  },
  ru: {
    t: "Спорт после эндопротезирования? Да.",
    p: "Эндопротез коленного сустава — не конец активной жизни; напротив, цель операции — вернуть безболезненную подвижность. Большинство пациентов возвращаются к нагрузкам низкой и средней интенсивности: ходьба, плавание, аквааэробика, велосипед, гольф, пешие походы, парный теннис и любительские лыжи. Рекомендуется избегать лишь высокоинтенсивных ударных нагрузок (бег на длинные дистанции, прыжки и контактные виды спорта), которые ускоряют износ имплантата.",
  },
};
// Cartão de anatomia (.anatomy-card): por slug, substitui o desenho por imagem real
// (artrose→RX, quisto-baker→RMN) ou remove-o (quistos-parameniscais, banda iliotibial).
const ANATOMY_IMG = {
  artrose: {
    img: "/img/rx-artrose-bilateral.png",
    h: { pt: "Artrose Bilateral — Predomínio Interno", en: "Bilateral Osteoarthritis — Medial Predominance", ru: "Двусторонний остеоартроз — медиальное преобладание" },
    cap: { pt: "Radiografia em carga: pinçamento do compartimento interno em ambos os joelhos.", en: "Weight-bearing X-ray: medial compartment narrowing in both knees.", ru: "Рентген с нагрузкой: сужение медиального отдела в обоих коленях." },
  },
  "quisto-baker": {
    img: "/img/rmn-baker.jpg",
    h: { pt: "Quisto de Baker — RMN", en: "Baker's Cyst — MRI", ru: "Киста Бейкера — МРТ" },
    cap: { pt: "RMN axial do joelho: quisto de Baker (estrutura de sinal líquido na região poplítea).", en: "Axial knee MRI: Baker's cyst (fluid-signal structure in the popliteal region).", ru: "Аксиальная МРТ колена: киста Бейкера (структура с жидкостным сигналом в подколенной области)." },
  },
};
const ANATOMY_REMOVE = new Set(["quistos-parameniscais", "sindrome-banda-iliotibial"]);
function handleAnatomyCard($x, seg, locale) {
  const card = $x(".anatomy-card");
  if (!card.length) return;
  if (ANATOMY_REMOVE.has(seg)) {
    const grid = card.parent();
    card.remove();
    grid.css({ "grid-template-columns": "1fr", "max-width": "760px" });
    return;
  }
  const cfg = ANATOMY_IMG[seg];
  if (!cfg) return; // outras páginas com .anatomy-card ficam inalteradas
  card.html(
    `<h3>${cfg.h[locale]}</h3><img src="${cfg.img}" alt="${cfg.h[locale]}" loading="lazy" style="width:100%;border-radius:10px;display:block;" /><p style="font-size:.78rem;color:#5a6a7a;margin-top:10px;line-height:1.45;text-align:left;">${cfg.cap[locale]}</p>`
  );
}

// Chips de credenciais por página: palavras-chave do tema (em vez de nomes/protocolos
// repetidos). Substitui todo o conteúdo de .credentials. Traduzido PT/EN/RU.
const CRED_CHIPS = {
  lca: { pt: ["LCA", "Extra-articular", "Estabilidade ligamentar"], en: ["ACL", "Extra-articular", "Ligament stability"], ru: ["ПКС", "Внесуставная", "Стабильность связок"] },
  menisco: { pt: ["Menisco", "Sutura meniscal", "Artroscopia"], en: ["Meniscus", "Meniscal repair", "Arthroscopy"], ru: ["Мениск", "Шов мениска", "Артроскопия"] },
  cartilagem: { pt: ["Cartilagem", "Restauração cartilaginosa", "Artroscopia"], en: ["Cartilage", "Cartilage restoration", "Arthroscopy"], ru: ["Хрящ", "Восстановление хряща", "Артроскопия"] },
  artrose: { pt: ["Artrose", "Prótese do joelho", "Preservação articular"], en: ["Osteoarthritis", "Knee replacement", "Joint preservation"], ru: ["Остеоартроз", "Эндопротез", "Сохранение сустава"] },
  protese: { pt: ["Prótese do joelho", "Artroplastia", "Desporto pós-prótese"], en: ["Knee replacement", "Arthroplasty", "Sport after surgery"], ru: ["Эндопротез", "Артропластика", "Спорт после операции"] },
  quadriceps: { pt: ["Quadricípite", "AMI", "Reabilitação neuromotora"], en: ["Quadriceps", "AMI", "Neuromuscular rehab"], ru: ["Квадрицепс", "AMI", "Нейромышечная реабилитация"] },
  "quisto-baker": { pt: ["Quisto de Baker", "Quisto poplíteo", "Artroscopia"], en: ["Baker's cyst", "Popliteal cyst", "Arthroscopy"], ru: ["Киста Бейкера", "Подколенная киста", "Артроскопия"] },
  "quistos-parameniscais": { pt: ["Quistos parameniscais", "Menisco", "Artroscopia"], en: ["Parameniscal cysts", "Meniscus", "Arthroscopy"], ru: ["Параменисковые кисты", "Мениск", "Артроскопия"] },
  "sindrome-banda-iliotibial": { pt: ["Banda iliotibial", "Dor lateral do joelho", "Corredores"], en: ["Iliotibial band", "Lateral knee pain", "Runners"], ru: ["Илиотибиальный тракт", "Боль снаружи колена", "Бегуны"] },
  "luxacao-rotula": { pt: ["Luxação da rótula", "Instabilidade rotuliana", "LMPF"], en: ["Patellar dislocation", "Patellar instability", "MPFL"], ru: ["Вывих надколенника", "Нестабильность надколенника", "MPFL"] },
  "medo-cirurgia": { pt: ["Cirurgia do joelho", "Protocolo ERAS", "Recuperação"], en: ["Knee surgery", "ERAS protocol", "Recovery"], ru: ["Хирургия колена", "Протокол ERAS", "Восстановление"] },
  "preparar-cirurgia": { pt: ["Preparação cirúrgica", "Protocolo ERAS", "Pré-operatório"], en: ["Surgery preparation", "ERAS protocol", "Pre-op"], ru: ["Подготовка к операции", "Протокол ERAS", "Предоперационный"] },
  "recuperar-cirurgia": { pt: ["Recuperação", "Reabilitação", "Pós-operatório"], en: ["Recovery", "Rehabilitation", "Post-op"], ru: ["Восстановление", "Реабилитация", "Послеоперационный"] },
  avaliar: { pt: ["Avaliar o joelho", "Diagnóstico", "Algoritmo de gonalgia"], en: ["Knee assessment", "Diagnosis", "Knee pain algorithm"], ru: ["Оценка колена", "Диагностика", "Алгоритм боли"] },
};
function setCredChips($x, seg, locale) {
  const set = CRED_CHIPS[seg];
  const box = $x(".credentials");
  if (!set || !box.length) return;
  const chips = (set[locale] || set.pt).map((c) => `<span class="cred-tag">${c}</span>`).join("");
  box.html(chips);
}

// LCA: remover o desenho de anatomia (.anatomy-svg) e colapsar o grid para 1 coluna.
function removeAnatomySvg($x) {
  const svg = $x(".anatomy-svg");
  if (!svg.length) return;
  const grid = svg.parent();
  svg.remove();
  grid.css({ "grid-template-columns": "1fr", "max-width": "760px" });
}

// LCA: link "saber mais sobre a AMI" na caixa do protocolo SANTI -> página do quadricípite.
const AMI_LINK = {
  pt: "Saber mais sobre a AMI (inibição do quadricípite)",
  en: "Learn more about AMI (quadriceps inhibition)",
  ru: "Подробнее об AMI (торможение квадрицепса)",
};
function injectAmiLink($x, locale) {
  const box = $x(".santi-box");
  const t = AMI_LINK[locale];
  if (!box.length || !t) return;
  box.append(
    `<a href="/quadriceps" style="display:inline-block;margin-top:20px;color:var(--sage);font-weight:700;text-decoration:none;border-bottom:2px solid var(--sage);padding-bottom:2px;">${t} →</a>`
  );
}

// FAQs: não nomear o médico — substituir "Dr. Nuno Camelo" por termo impessoal.
function depersonalizeFaqs($x, locale) {
  const lc = locale === "en" ? "the specialist" : locale === "ru" ? "специалист" : "o especialista";
  const cap = locale === "en" ? "The specialist" : locale === "ru" ? "Специалист" : "O especialista";
  $x(".faq-a").each((i, el) => {
    const node = $x(el);
    let h = node.html();
    if (!h || !/Nuno Camelo/.test(h)) return;
    h = h.replace(/\bO Dr\. Nuno Camelo(?: Barbosa)?/g, cap);
    h = h.replace(/\bo Dr\. Nuno Camelo(?: Barbosa)?/g, lc);
    h = h.replace(/(^|[>.]\s+)Dr\. Nuno Camelo(?: Barbosa)?/g, (m, p1) => p1 + cap);
    h = h.replace(/\bдр\.\s*Nuno Camelo(?: Barbosa)?/g, lc);
    h = h.replace(/\bDr\. Nuno Camelo(?: Barbosa)?/g, lc);
    node.html(h);
  });
}

function injectProseSport($x, locale) {
  const c = PROSE_SPORT[locale];
  const inner = $x(".ladder-inner");
  if (!c || !inner.length) return;
  inner.append(
    `<div style="margin-top:28px;background:rgba(255,255,255,0.1);border-left:4px solid var(--sage);border-radius:0 8px 8px 0;padding:18px 22px;"><p style="margin:0;color:#fff;font-weight:500;font-size:.95rem;line-height:1.65;"><strong style="color:var(--sage);font-weight:700;">${c.t}</strong> ${c.p}</p></div>`
  );
}

// Especialidades: cada cartão passa a <details> — colapsado mostra só foto+título,
// o corpo (lista de links) abre ao carregar. Native details/summary, sem JS.
function makePatologiasCollapsible($x) {
  $x(".pato-card").each((i, el) => {
    const card = $x(el);
    el.tagName = "details";
    el.name = "details";
    card.attr("open", ""); // abertos por omissão (mostram logo o conteúdo)
    card.addClass("pato-acc");
    const photo = card.children(".pato-photo").first();
    if (!photo.length) return;
    photo.wrap('<summary class="pato-summary"></summary>');
    photo.after('<span class="pato-chev" aria-hidden="true">▾</span>');
  });
}

// Homepage: logos dos hospitais nos cartões de locais (substitui os mapas -> mais compacto).
function injectHospitalLogos($x) {
  $x(".local-card").each((i, el) => {
    const card = $x(el);
    const name = card.find(".local-name").text();
    let logo = null;
    if (/Lus[ií]adas/i.test(name)) logo = "/img/logos/lusiadas.png";
    else if (/Miseric[oó]rdia/i.test(name)) logo = "/img/logos/hmvc.webp";
    if (!logo) return;
    card.find(".local-map").remove();
    card.prepend(`<div class="local-logo"><img src="${logo}" alt="" loading="lazy" /></div>`);
  });
}

for (const [file, seg] of Object.entries(ROUTES)) {
  const raw = await readFile(`${SRC}/${file}`, "utf8");
  const $ = cheerio.load(raw, { decodeEntities: false });

  const meta = buildMetadata($);
  applyMetaDesc(meta, seg, "pt");
  // Canonical auto-referente ao slug NOVO (os HTML traziam slugs Wix 404).
  meta.alternates = {
    ...(meta.alternates || {}),
    canonical: seg ? `${BASE}/${seg}` : BASE,
    ...(hasTranslation(seg) ? { languages: langAlternates(seg) } : {}),
  };
  const css = $("style").toArray().map((el) => $(el).html()).join("\n\n");
  const jsonld = $('script[type="application/ld+json"]').first().html() || "";

  // chrome da homepage -> layout partilhado
  if (seg === "") {
    homepageCss = css;
    const h = $("body > header").first();
    const f = $("body > footer").first();
    headerHtml = h.length ? injectVideosLink(injectSwitcher(rewriteLinks($.html(h)), "pt"), "pt") : "";
    footerHtml = f.length ? trimFooter(rewriteLinks($.html(f))) : "";
    $("section.hero").first().remove(); // hero antigo -> substituído por <VideoHero/>
    $("section.locais").remove();
    injectToolsGraphic($);
    simplifyTools($);
    makePatologiasCollapsible($);
    $("section.doctor, .trust, section.cta-final, section.patologias .section-header").remove();
  }

  // remover chrome e scripts do corpo
  $("body > header, body > footer, body > nav").remove();
  // capturar scripts inline do corpo (para reinjetar via next/script)
  const inlineScript = fixWww($("body script")
    .not('[type="application/ld+json"]')
    .not("[src]")
    .toArray()
    .map((el) => $(el).html())
    .filter(Boolean)
    .join("\n"));
  if (inlineScript) scriptPages.push(seg || "homepage");
  $("body script, body style").remove();

  injectHeroImage($, seg);
  makeTablesResponsive($);
  injectProseSport($, "pt");
  handleAnatomyCard($, seg, "pt");
  depersonalizeFaqs($, "pt");
  removeAnatomySvg($);
  injectAmiLink($, "pt");
  setCredChips($, seg, "pt");
  let body = rewriteLinks($("body").html() || "");

  const dir = seg ? `${APP}/${seg}` : APP;
  await mkdir(dir, { recursive: true });
  const id = (seg || "home").replace(/[^a-z0-9]/g, "-");
  const content =
    seg === ""
      ? homepageTemplate(meta, jsonld, body, inlineScript, id, "pt")
      : pageTemplate(meta, css, jsonld, body, inlineScript, id, seg, "pt");
  await writeFile(`${dir}/page.tsx`, content, "utf8");
  report.push(`  ✓ ${(seg || "(homepage)").padEnd(26)} ${body.length} chars  css=${css.length}  ld=${jsonld ? "sim" : "não"}`);
}

// site.css global (CSS da homepage = tokens + base + chrome + secções home)
const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap');\n\n`;
await writeFile(`${APP}/site.css`, fontImport + homepageCss, "utf8");

// Chrome PT (dados; SiteChrome.tsx é escrito à mão e importa daqui)
await writeFile(
  `${COMP}/chrome-pt.ts`,
  `export const ptHeader = ${JSON.stringify(headerHtml)};\nexport const ptFooter = ${JSON.stringify(footerHtml)};\n`,
  "utf8"
);

// ── EN (i18n): gera /en/<slug> a partir de <ptfile>_en.html (enRaw/enSlugs já acima) ──
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
  applyMetaDesc(enMeta, seg, "en");
  enMeta.alternates = { ...(enMeta.alternates || {}), canonical: seg ? `${BASE}/en/${seg}` : `${BASE}/en`, languages: langAlternates(seg) };
  const enJsonld = $e('script[type="application/ld+json"]').first().html() || "";
  if (seg === "") {
    const eh = $e("body > header").first();
    const ef = $e("body > footer").first();
    enHeaderHtml = eh.length ? injectVideosLink(injectSwitcher(rewriteLinksEn($e.html(eh)), "en"), "en") : "";
    enFooterHtml = ef.length ? trimFooter(rewriteLinksEn($e.html(ef))) : "";
    $e("section.hero").first().remove(); // hero antigo -> <VideoHero/>
    $e("section.locais").remove();
    injectToolsGraphic($e);
    simplifyTools($e);
    makePatologiasCollapsible($e);
    $e("section.doctor, .trust, section.cta-final, section.patologias .section-header").remove();
  }
  const css = $e("style").toArray().map((el) => $e(el).html()).join("\n\n");
  $e("body > header, body > footer, body > nav").remove();
  const enScript = fixWww($e("body script").not('[type="application/ld+json"]').not("[src]").toArray().map((el) => $e(el).html()).filter(Boolean).join("\n"));
  $e("body script, body style").remove();
  injectHeroImage($e, seg);
  makeTablesResponsive($e);
  injectProseSport($e, "en");
  handleAnatomyCard($e, seg, "en");
  depersonalizeFaqs($e, "en");
  removeAnatomySvg($e);
  injectAmiLink($e, "en");
  setCredChips($e, seg, "en");
  const body = rewriteLinksEn($e("body").html() || "");
  const dir = seg ? `${APP}/en/${seg}` : `${APP}/en`;
  await mkdir(dir, { recursive: true });
  const id = "en-" + (seg || "home").replace(/[^a-z0-9]/g, "-");
  const content = seg === ""
    ? homepageTemplate(enMeta, enJsonld, body, enScript, id, "en")
    : pageTemplate(enMeta, css, enJsonld, body, enScript, id, seg, "en");
  await writeFile(`${dir}/page.tsx`, content, "utf8");
  enCount++;
}
if (enHeaderHtml) {
  await writeFile(`${COMP}/chrome-en.ts`, `export const enHeader = ${JSON.stringify(enHeaderHtml)};\nexport const enFooter = ${JSON.stringify(enFooterHtml)};\n`, "utf8");
}
console.log(`EN: ${enCount} páginas geradas (${[...enSlugs].map((s)=>s||"home").join(", ")})`);

// ── RU (i18n): gera /ru/<slug> a partir de <ptfile>_ru.html (traduzido do EN) ──
function rewriteLinksRu(html) {
  let out = rewriteLinks(html);
  out = out.replace(/href="\/([a-zA-Z0-9-]+)"/g, (m, slug) =>
    ruSlugs.has(slug) ? `href="/ru/${slug}"` : m
  );
  if (ruSlugs.has("")) out = out.replace(/href="\/"/g, 'href="/ru"');
  return out;
}
let ruHeaderHtml = "", ruFooterHtml = "", ruCount = 0;
for (const [file, seg] of Object.entries(ROUTES)) {
  const raw = ruRaw[seg];
  if (!raw) continue;
  const $r = cheerio.load(raw, { decodeEntities: false });
  const ruMeta = buildMetadata($r);
  applyMetaDesc(ruMeta, seg, "ru");
  ruMeta.alternates = { ...(ruMeta.alternates || {}), canonical: seg ? `${BASE}/ru/${seg}` : `${BASE}/ru`, languages: langAlternates(seg) };
  const ruJsonld = $r('script[type="application/ld+json"]').first().html() || "";
  if (seg === "") {
    const rh = $r("body > header").first();
    const rf = $r("body > footer").first();
    ruHeaderHtml = rh.length ? injectVideosLink(injectSwitcher(rewriteLinksRu($r.html(rh)), "ru"), "ru") : "";
    ruFooterHtml = rf.length ? trimFooter(rewriteLinksRu($r.html(rf))) : "";
    $r("section.hero").first().remove(); // hero antigo -> <VideoHero/>
    $r("section.locais").remove();
    injectToolsGraphic($r);
    simplifyTools($r);
    makePatologiasCollapsible($r);
    $r("section.doctor, .trust, section.cta-final, section.patologias .section-header").remove();
  }
  const css = $r("style").toArray().map((el) => $r(el).html()).join("\n\n");
  $r("body > header, body > footer, body > nav").remove();
  const ruScript = fixWww($r("body script").not('[type="application/ld+json"]').not("[src]").toArray().map((el) => $r(el).html()).filter(Boolean).join("\n"));
  $r("body script, body style").remove();
  injectHeroImage($r, seg);
  makeTablesResponsive($r);
  injectProseSport($r, "ru");
  handleAnatomyCard($r, seg, "ru");
  depersonalizeFaqs($r, "ru");
  removeAnatomySvg($r);
  injectAmiLink($r, "ru");
  setCredChips($r, seg, "ru");
  const body = rewriteLinksRu($r("body").html() || "");
  const dir = seg ? `${APP}/ru/${seg}` : `${APP}/ru`;
  await mkdir(dir, { recursive: true });
  const id = "ru-" + (seg || "home").replace(/[^a-z0-9]/g, "-");
  const content = seg === ""
    ? homepageTemplate(ruMeta, ruJsonld, body, ruScript, id, "ru")
    : pageTemplate(ruMeta, css, ruJsonld, body, ruScript, id, seg, "ru");
  await writeFile(`${dir}/page.tsx`, content, "utf8");
  ruCount++;
}
if (ruHeaderHtml) {
  await writeFile(`${COMP}/chrome-ru.ts`, `export const ruHeader = ${JSON.stringify(ruHeaderHtml)};\nexport const ruFooter = ${JSON.stringify(ruFooterHtml)};\n`, "utf8");
}
console.log(`RU: ${ruCount} páginas geradas (${[...ruSlugs].map((s)=>s||"home").join(", ")})`);

console.log("=== Páginas geradas ===");
console.log(report.join("\n"));
console.log(`\nsite.css: ${homepageCss.length} chars`);
console.log(`chrome: header=${headerHtml.length} footer=${footerHtml.length}`);
console.log(`páginas com <script> (interatividade a recuperar depois): ${scriptPages.join(", ") || "nenhuma"}`);
console.log(`\nTotal: ${Object.keys(ROUTES).length} páginas`);
