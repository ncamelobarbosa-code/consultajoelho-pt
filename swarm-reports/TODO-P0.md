# TODO P0 — Fazer primeiro (1 semana, máximo retorno)

> Gerado pelo swarm de auditoria (2026-06-25). Detalhe completo: `swarm-reports/00-plano-consolidado.md` e relatórios 01–06.
> ⚠️ Esta versão do Next.js tem breaking changes — ver `node_modules/next/dist/docs/` antes de mexer em rotas/layout (afeta P0-1, P0-4).

## Checklist

- [x] **P0-1 · Canonicais/hreflang EN/RU** *(🔴 crítico — desbloqueia indexação internacional)* ✅ FEITO 2026-06-25 (canonicals auto-referentes para todas as páginas portadas PT/EN/RU; verificado em produção)
  - Homepage EN (`src/app/en/page.tsx`): `canonical` está `https://www.consultajoelho.pt` → deve ser `.../en`.
  - ~12 rotas `/en/*` e ~12 `/ru/*` têm `canonical` para slugs antigos 404 (ex.: `/en/cartilagem` → canonical `/en/cartilagemjoelhodrnunocamelo`; `/en/menisco` → `/en/rupturameniscosjoelho`; idem `protese`, `quadriceps`, `avaliar`, `preparar-cirurgia`, `recuperar-cirurgia`, `luxacao-rotula`, `quistos-parameniscais`, `sindrome-banda-iliotibial`, `quisto-baker`, `medo-cirurgia`).
  - `src/app/ru/avaliar/page.tsx`: canonical tem locale duplicado `/ru/en/avaliarjoelho` → `/ru/avaliar`.
  - **Regra:** cada página auto-referencia o seu próprio URL (canonical + hreflang).

- [x] **P0-2 · Links/CTAs partidos** *(🟠 alto)* ✅ FEITO 2026-06-25 (agendamento→/contacto em todos os locales via rewriteLinks; bookingSlug→contacto; sans-www→www)
  - Rota `agendamentonunocameloespecialistajoelho` **não existe** mas está em `site.ts` e em vários CTAs → apontar para `/contacto`.
  - `joelhodrnunocamelo` tem `href="https://consultajoelho.pt"` (sem `www`) → link relativo `/`.

- [x] **P0-3 · Tendinopatia rotuliana — ressalva clínica** *(🔴 risco clínico ALTO — validar com o Dr.)*
  - Página `tendao-rotuliano-...`: corticoide listado sem aviso. Acrescentar que o corticoide **intratendinoso é desaconselhado (risco de rotura)** e destacar **exercício excêntrico/de carga** como 1ª linha. Rever/remover "transferência de tendão" como opção cirúrgica.

- [ ] **P0-4 · Ligar a fonte (next/font)** *(🟠 alto — conserta design + LCP)*
  - `globals.css` referencia `--font-space-grotesk` mas `layout.tsx` nunca importa `next/font`. Carregar Space Grotesk (e Source Sans 3, se mantida) via `next/font/google`, expor a var no `<body>`, e **remover `@import url(google fonts)` do `site.css`**.

- [x] **P0-5 · Meta description nas páginas-âncora** *(🟠 alto)*
  - Em falta no Algoritmo de Gonalgia (`joelhodrnunocamelo`) e em: `actividadecientificajoelho`, `entorsejoelho-...`, `liquidojoelho-artrocentese-...`, `tendao-rotuliano-...`, `kneesurgeryinportugalprices`, e equivalentes EN/RU de `joelhodrnunocamelo`. Escrever `title`/`description` (140–160 car.).

- [ ] **P0-6 · Repor dados estruturados** *(🟠 alto)*
  - O helper `medicalWebPageSchema()` em `src/lib/seo.ts` existe mas **nunca é invocado**. Adicionar `MedicalWebPage` + `FAQPage` + `BreadcrumbList` às páginas clínicas (paridade pergunta↔resposta entre HTML e JSON-LD).

- [ ] **P0-7 · Credenciais sóbrias** *(🟠 alto — validar com o Dr.)*
  - CV (`nuno-camelo-...`): remover "FIFA Medical Center of Excellence" (aparece 2×) → menção sóbria a Centre Orthopédique Santy, Lyon.
  - Legendas Sonnery-Cottet/SANTI em páginas clínicas públicas (LCA, quadricípite) → manter só em citações de publicações no CV.

## Depois dos P0
Mês 1 (P1): GA4+Search Console, Google Business das 3 unidades, `<html lang>` server-side, design quick-wins, lote de correções clínicas 🟠, SLA de leads. Ver `00-plano-consolidado.md`.
