# 00 — Plano Consolidado e Priorizado · consultajoelho.pt

**Síntese dos 6 relatórios do swarm** (design · conteúdo médico · marketing · SEO · equipa · negócio)
**Data:** 2026-06-25 · **Critério de prioridade:** Impacto × (1/Esforço), com risco clínico/legal a saltar à frente.

---

## 3 verdades transversais (onde vários agentes convergiram)

1. **Há bugs técnicos no site a destruir valor AGORA — e têm fix barato.** Design e SEO, de forma independente, encontraram os mesmos problemas: token de fonte partido, canonicais EN/RU a apontar para URLs 404, rota de CTA (`agendamentonunocameloespecialistajoelho`) que **não existe**, e dados estruturados (FAQ/MedicalWebPage) perdidos na migração. Não é "melhorar" — é **consertar o que está partido**.

2. **A estratégia (marketing + equipa + negócio) aponta toda para o mesmo eixo: proteger o tempo do médico e medir.** O recurso escasso é uma só agenda de cirurgião. Marketing, operações e negócio concordam: (a) **medir primeiro** (GA4/Search Console/GBP — sem baseline não se otimiza), (b) **SEO local das 3 unidades** é o maior ganho de menor risco, (c) **Algoritmo de Gonalgia** como âncora de conversão, (d) **canal internacional EN** como upside de margem máxima.

3. **Disciplina de credenciais + deontologia atravessa tudo.** Conteúdo médico, marketing e negócio sinalizaram, em convergência com a memória do projeto: remover FIFA / Lyon / Sonnery-Cottet das páginas públicas (manter só em citações de publicações), credenciais sóbrias, e zero promessas/testemunhos sensacionalistas (Ordem dos Médicos / ERS).

---

## Matriz mestra de prioridades

Legenda — **Impacto:** 🔴 crítico · 🟠 alto · 🟡 médio. **Esforço:** ⚡ horas · 🔹 1–2 dias · 🔸 semana+. **Fonte:** report de origem.

### 🚨 P0 — Fazer JÁ (alto impacto, baixo esforço, ou risco clínico/legal)

| # | Ação | Impacto | Esforço | Fonte |
|---|------|:---:|:---:|---|
| P0-1 | **Corrigir canonicais/hreflang EN/RU** — homepage `/en` canoniza para PT; ~24 páginas `/en` e `/ru` apontam para slugs 404. Cada página deve auto-referenciar o seu próprio URL. *Bloqueia indexação de quase todo o conteúdo internacional.* | 🔴 | 🔹 | SEO #1–3 |
| P0-2 | **Corrigir links/CTAs partidos** — rota `agendamentonunocameloespecialistajoelho` não existe (está em `site.ts` e em vários CTAs) → apontar para `/contacto`. Links absolutos `consultajoelho.pt` sem `www`. | 🟠 | ⚡ | SEO #14 |
| P0-3 | **Tendinopatia rotuliana — ressalva clínica.** Página lista corticoide sem aviso; o corticoide **intratendinoso é desaconselhado (risco de rotura)**. Acrescentar ressalva + destacar exercício excêntrico como 1ª linha. Rever "transferência de tendão". *Único achado clínico de gravidade ALTA.* | 🔴 | ⚡ | Médico p.8 |
| P0-4 | **Ligar a fonte (next/font)** — `--font-space-grotesk` está referenciado mas `layout.tsx` nunca importa `next/font` → token partido + `@import` render-blocking. Migrar para `next/font`. Conserta consistência **e** LCP num passo. | 🟠 | 🔹 | Design QW1 |
| P0-5 | **Meta description nas páginas-âncora** — falta no **Algoritmo de Gonalgia** (`joelhodrnunocamelo`, destacado na homepage) e em ~7 páginas antigas. Escrever `title`/`description` keyword-rich. | 🟠 | 🔹 | SEO #5 |
| P0-6 | **Repor dados estruturados** — helper `medicalWebPageSchema()` existe em `seo.ts` mas **nunca é usado**. Adicionar `MedicalWebPage`+`FAQPage`+`BreadcrumbList` às páginas clínicas. Recupera rich results. | 🟠 | 🔹 | SEO #6 |
| P0-7 | **Credenciais sóbrias** — remover "FIFA Medical Center of Excellence" (2× na CV) e legendas Sonnery-Cottet/SANTI das páginas clínicas públicas (LCA, quadricípite). Manter só em citações de publicações. | 🟠 | ⚡ | Médico p.20/11/13 · MK |

### ⚙️ P1 — Fundações 30 dias (medir + base)

| # | Ação | Impacto | Esforço | Fonte |
|---|------|:---:|:---:|---|
| P1-1 | **Instrumentar medição:** GA4 + Search Console + eventos de conversão (telefone, WhatsApp, form, Algoritmo). *Sem baseline não se otimiza nada.* | 🔴 | 🔹 | MK · Negócio |
| P1-2 | **Google Business Profile das 3 unidades** (Porto, Vila do Conde, Paços de Ferreira): categoria "Cirurgião ortopédico", fotos, NAP consistente, gestão de avaliações sóbria. Maior ganho local, menor risco. | 🟠 | 🔸 | MK · SEO §5 |
| P1-3 | **`<html lang>` server-side por locale** — hoje fixo em `pt`, só corrigido por JS client-side (mau para crawlers). Criar `app/en/layout.tsx` e `app/ru/layout.tsx`. | 🟠 | 🔹 | SEO #4 |
| P1-4 | **Design quick-wins:** apertar escala tipográfica/leading, tokenizar espaçamento (remover `padding:60px !important`), unificar raios/sombras, limpar código morto. | 🟠 | 🔸 | Design QW2–6 |
| P1-5 | **Correções clínicas 🟠** (lote): banda iliotibial (modelo de fricção→compressão; reforço abdutores não quadricípite), infiltrações (moderar ácido hialurónico + cautela corticoide repetido), menisco (nuance degenerativo/artrose), artrocentese (contraindicação infeção), "3-5 dias internamento" (não se aplica a artroscopia). + disclaimer médico transversal. | 🟠 | 🔸 | Médico |
| P1-6 | **SLA de resposta a leads + protocolo de triagem escrito** (1 pág.) — auto-resposta imediata + contacto humano <Xh (PT)/<24h (intl). Trava a maior hemorragia: o lead que esfria. | 🟠 | 🔹 | Equipa |
| P1-7 | **Imagens hero `wixstatic.com` → `next/image` local** (AVIF/WebP) — ganho direto de LCP. | 🟡 | 🔹 | SEO #10 |

### 🏗️ P2 — Estrutural 60–90 dias (sustentável + conteúdo)

| # | Ação | Impacto | Esforço | Fonte |
|---|------|:---:|:---:|---|
| P2-1 | **Token único `@theme` + componentizar páginas clínicas** — consolidar os 4 vocabulários CSS paralelos e os 30 `:root` duplicados em componentes React (`<FaqAccordion>`, `<TreatmentCard>`, etc.). Fundação que torna todo o uplift sustentável. | 🟠 | 🔸 | Design E1/M3/E2 |
| P2-2 | **Calendário editorial 2 peças/mês** — 12 temas já mapeados por persona/funil; reaproveitar cada artigo em 3–4 posts + 1 vídeo. | 🟠 | 🔸 | MK §4 |
| P2-3 | **Páginas de conteúdo em falta (SEO):** artroscopia (pilar), condromalácia/dor anterior, osteotomia, prótese unicompartimental, LCP/colaterais, pilar "dor no joelho". A rota `prevencao-do-joelho` está em `site.ts` mas não existe. | 🟠 | 🔸 | SEO §2 |
| P2-4 | **PMS/CRM clínico RGPD-UE como fonte única de verdade** — agenda multi-unidade + agendamento online + lembretes automáticos (T-48h/T-24h) + WhatsApp Business (separar do nº pessoal) + upload seguro de exames. Acaba com Excel/WhatsApp pessoal (risco RGPD). | 🟠 | 🔸 | Equipa |
| P2-5 | **Lançar "Segunda opinião sobre o seu joelho"** — serviço definido (página+fluxo+honorário). Alto valor, quase não consome bloco, alinhado com "educar antes de operar". | 🟠 | 🔹 | Negócio P1 |
| P2-6 | **Schema rico:** homepage `MedicalBusiness`→`MedicalClinic` com 3 unidades + `geo`; enriquecer `Physician` (worksFor, knowsAbout). | 🟡 | 🔹 | SEO §3 |

### 🚀 P3 — Estratégico Q2–Q4 (escalar o alto valor)

| # | Ação | Impacto | Esforço | Fonte |
|---|------|:---:|:---:|---|
| P3-1 | **Pré-consulta / triagem remota** (formulário + Algoritmo de Gonalgia + teleconsulta curta) — multiplicador de produtividade: qualifica antes de ocupar slot presencial. | 🟠 | 🔸 | Negócio P2 · Equipa |
| P3-2 | **Motor operacional internacional** (EN→RU): orçamento transparente, avaliação remota por RM, coordenador de logística, follow-up à distância. Maior margem por caso. | 🟠 | 🔸 | Negócio P3 · Equipa · MK |
| P3-3 | **Referenciação B2B** (MGF, fisiatria, fisioterapia, medicina desportiva do Norte): material "para colegas", canal direto, reciprocidade. Doentes pré-qualificados de maior valor. | 🟡 | 🔸 | Negócio P4 · MK |
| P3-4 | **Gestão do mix + agenda:** "receita por hora" como KPI mestre; agrupar atos por unidade/dia; reduzir SIGIC em proporção (não em volume) à medida que privado/intl crescem. | 🟠 | 🔸 | Negócio §2 |
| P3-5 | **Decisão de capacidade:** avaliar 2.º cirurgião/fellow se a procura de alto valor exceder a oferta; preparar versão RU se EN converter. | 🟡 | 🔸 | Negócio T4 |

---

## Roadmap unificado (funde os 3 roadmaps dos relatórios)

| Período | Foco | Itens |
|---|---|---|
| **Esta semana** | Consertar o que está partido | P0-1 a P0-7 |
| **Mês 1** | Medir + local + base | P1-1 a P1-7 |
| **Mês 2–3** | Sustentável + conteúdo + operação | P2-1 a P2-6 |
| **Q2–Q4** | Escalar alto valor | P3-1 a P3-5 |

---

## "Faz isto primeiro" (shortlist de 1 semana, máximo retorno)

1. **P0-1** canonicais EN/RU (desbloqueia indexação internacional) — *o fix nº1 de SEO.*
2. **P0-3** ressalva da tendinopatia rotuliana — *o único risco clínico ALTO.*
3. **P0-2 + P0-5** CTAs partidos + meta do Algoritmo de Gonalgia — *barato, liga tráfego a contacto.*
4. **P0-4** next/font — *conserta design + performance de uma vez.*
5. **P1-1** GA4/Search Console — *sem isto, nada do resto se consegue medir.*

> Nota de execução: o `AGENTS.md` avisa que esta versão do Next.js tem breaking changes — ler `node_modules/next/dist/docs/` antes de tocar em código de rotas/layout (afeta P0-1, P0-4, P1-3).

---

## KPI mestre (alinhado entre marketing, equipa e negócio)

Não é "número de doentes". É **receita por hora de médico** + **mix de receita** (privado+internacional a subir, SIGIC a descer em proporção). KPI de conversão operacional: **contactos/mês (form+tel+WhatsApp)** e **% de leads respondidos dentro do SLA**.
