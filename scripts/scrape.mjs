import * as cheerio from "cheerio";
import { writeFile } from "node:fs/promises";

const URLS = [
  "joelhodrnunocamelo",
  "cartilagemjoelhodrnunocamelo",
  "protesejoelhodesportodrnunocamelo",
  "quistobakerjoelhodrnunocamelo",
  "liquidojoelho-artrocentese-drnunocamelo",
  "infiltracaojoelho",
  "quistosparameniscaisjoelho",
  "sindromebandailiotibialjoelho",
  "tendao-rotuliano-tendinite-drnunocamelo",
  "entorsejoelho-drnunocamelo",
  "meniscosnojoelho",
  "ligamentocruzadoanterior",
  "luxacaorotulajoelho",
  "quadricepsjoelho",
  "cirurgiadojoelhoeagora",
  "medocirurgiajoelho",
  "recuperarcirurgiajoelho",
  "sigic",
  "kneesurgeryinportugalprices",
  "avaliarjoelho",
  "nuno-camelo-especialista-cirurgia-joelho",
  "actividadecientificajoelho",
];

const BASE = "https://www.consultajoelho.pt";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

const clean = (s) => (s || "").replace(/\s+/g, " ").trim();

// Normaliza um URL wixstatic para o original (remove a transformação /v1/...).
function normalizeWix(u) {
  const m = u.match(/^(https:\/\/static\.wixstatic\.com\/media\/[^/]+)/);
  return m ? m[1] : u;
}

// Extrai dimensões da transformação (w_, h_) se existirem.
function dims(u) {
  const w = u.match(/[/_]w_(\d+)/);
  const h = u.match(/[/_]h_(\d+)/);
  return { w: w ? +w[1] : null, h: h ? +h[1] : null };
}

function scrapeOne(slug, html) {
  const $ = cheerio.load(html);

  const title = clean($("title").first().text());
  const ogTitle = clean($('meta[property="og:title"]').attr("content"));
  const description = clean($('meta[name="description"]').attr("content"));
  const ogImageRaw = $('meta[property="og:image"]').attr("content") || "";

  const main = $("main").length ? $("main") : $("#PAGES_CONTAINER");

  // ── Blocos de texto em ordem (parágrafo/título/lista a parágrafo) ──
  const blocks = [];
  const seen = new Set();
  const push = (tag, raw) => {
    const text = clean(raw).replace(/​/g, "").trim();
    if (!text || text.length < 2) return;
    if (/^CONSULTA\s*JOELHO/i.test(text)) return; // logo
    if (seen.has(text)) return;
    seen.add(text);
    const isH = /^h[1-6]$/.test(tag);
    blocks.push({
      type: isH ? "heading" : tag === "li" ? "list" : "text",
      level: isH ? +tag[1] : null,
      text,
    });
  };
  main.find('[data-testid="richTextElement"]').each((_, el) => {
    const $el = $(el);
    const parts = $el.find("h1,h2,h3,h4,h5,h6,p,li");
    if (parts.length === 0) {
      push("p", $el.text());
      return;
    }
    parts.each((__, node) => push(node.tagName.toLowerCase(), $(node).text()));
  });

  // ── Imagens (wixstatic) dentro do main ──
  const imgMap = new Map(); // base -> {url, w, h}
  const collect = (raw) => {
    if (!raw || !raw.includes("static.wixstatic.com/media/")) return;
    const matches = raw.match(/https:\/\/static\.wixstatic\.com\/media\/[^\s"')]+/g) || [];
    for (const u of matches) {
      if (/logo|favicon|blank|avatar/i.test(u)) continue;
      const base = normalizeWix(u);
      const d = dims(u);
      const prev = imgMap.get(base);
      // guarda a maior largura observada (melhor candidato a conteúdo)
      if (!prev || (d.w || 0) > (prev.w || 0)) {
        imgMap.set(base, { url: base, w: d.w, h: d.h });
      }
    }
  };
  main.find("img,wow-image,source").each((_, el) => {
    collect($(el).attr("src"));
    collect($(el).attr("srcset"));
  });
  // fallback: varrer todo o html do main por backgrounds
  collect(main.html() || "");

  const images = [...imgMap.values()];

  return {
    slug,
    url: `${BASE}/${slug}`,
    title,
    ogTitle,
    description,
    ogImage: ogImageRaw ? normalizeWix(ogImageRaw) : null,
    blocks,
    images,
    textLength: blocks.reduce((n, b) => n + b.text.length, 0),
  };
}

const out = [];
for (const slug of URLS) {
  try {
    const res = await fetch(`${BASE}/${slug}`, { headers: { "User-Agent": UA } });
    const html = await res.text();
    const data = scrapeOne(slug, html);
    out.push(data);
    console.log(
      `✓ ${slug.padEnd(42)} blocos=${String(data.blocks.length).padStart(2)} imgs=${String(data.images.length).padStart(2)} chars=${data.textLength}`
    );
  } catch (e) {
    console.log(`✗ ${slug} — ${e.message}`);
    out.push({ slug, url: `${BASE}/${slug}`, error: String(e) });
  }
  await new Promise((r) => setTimeout(r, 400));
}

await writeFile("content/scraped-pages.json", JSON.stringify(out, null, 2), "utf8");
console.log(`\nGuardado content/scraped-pages.json (${out.length} páginas)`);
