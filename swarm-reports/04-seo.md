# Auditoria SEO — consultajoelho.pt

Agente: **seo-specialist** · Data: 2026-06-25
Projeto: Next.js (`/Users/nunocamelobarbosa/Desktop/consultajoelho1`)
Site de referência: `/Users/nunocamelobarbosa/Desktop/ConsultaJoelho Vercel` (HTML estático PT/EN/RU)
Mercado: Portugal (PT primário) · EN e RU previstos/parciais

> Âmbito: **apenas auditoria** — nenhum código foi alterado.

---

## 0. Estado geral (resumo executivo)

O site Next.js está globalmente bem estruturado: todas as 25 rotas PT (e os clones `/en` e `/ru`) têm `metadata`, a maioria com `title`, `description`, `canonical` e bloco `languages` (hreflang). A migração **melhorou** o SEO internacional face ao site estático (que **não tinha hreflang nenhum**). No entanto, há **bugs de canonical/hreflang que estão ativamente a sabotar a indexação** das versões EN/RU, e a riqueza de dados estruturados (FAQPage, MedicalWebPage) que existia no site estático **perdeu-se em quase todas as páginas**.

Pontos fortes:
- `sitemap.ts` e `robots.ts` corretos e a apontar para `sitemap.xml`.
- `metadataBase` definido no layout (resolve URLs relativos de OG).
- Páginas clínicas portadas (artrose, lca, menisco, etc.) têm 1 único `<h1>`, FAQ visível, tabelas, e títulos/descrições keyword-rich e bem escritos.
- Schema `MedicalBusiness` (homepage) e `Physician` (página do médico) presentes e de boa qualidade, com `sameAs` (ORCID, ResearchGate, LinkedIn).

---

## 1. Tabela de issues técnicos

| # | Issue | Gravidade | Página(s) afetada(s) | Correção |
|---|-------|-----------|----------------------|----------|
| 1 | **Canonical da homepage EN aponta para a homepage PT** (`canonical: https://www.consultajoelho.pt` em vez de `/en`). Sinaliza ao Google que `/en` é duplicado de `/` → a homepage inglesa nunca indexa. | **Crítica** | `src/app/en/page.tsx` | `canonical` deve ser `https://www.consultajoelho.pt/en`. |
| 2 | **Canonicals EN/RU apontam para slugs que não existem como rotas.** Ex.: rota real `/en/cartilagem` mas canonical `=/en/cartilagemjoelhodrnunocamelo`; `/en/menisco` → canonical `/en/rupturameniscosjoelho`; idem `protese`, `quadriceps`, `avaliar`, `preparar-cirurgia`, `recuperar-cirurgia`, `luxacao-rotula`, `quistos-parameniscais`, `sindrome-banda-iliotibial`, `quisto-baker`, `medo-cirurgia` (e equivalentes `/ru`). Google segue o canonical para um URL 404 → páginas não indexam. | **Crítica** | ~12 rotas em `/en/*` e ~12 em `/ru/*` | Cada `canonical` (e o hreflang correspondente) tem de ser **exatamente** o URL da própria rota. Ex.: `/en/cartilagem` → `canonical: .../en/cartilagem`. |
| 3 | **Canonical com locale duplicado:** `ru/avaliar` tem `canonical: https://www.consultajoelho.pt/ru/en/avaliarjoelho` (`/ru/en/...`). URL inexistente. | **Crítica** | `src/app/ru/avaliar/page.tsx` | Corrigir para `https://www.consultajoelho.pt/ru/avaliar`. |
| 4 | **`<html lang>` está fixo em `"pt"` no servidor** (`layout.tsx`); o ajuste para `en`/`ru` é feito só client-side via `LangSync` (JS/useEffect). Crawlers e ferramentas que lêem o HTML inicial vêem sempre `lang="pt"` nas páginas EN/RU. | **Alta** | `src/app/layout.tsx` + todas as rotas `/en`, `/ru` | Idealmente segmentar o app por `[locale]` (layout por locale com `lang` correto no servidor), ou via middleware. No mínimo, garantir `lang` server-side correto para EN/RU. Não há `layout.tsx` em `/en` nem `/ru`. |
| 5 | **Páginas-âncora sem `meta description` e/ou `<title>` fraco.** Em falta: `joelhodrnunocamelo` (o **Algoritmo de Gonalgia** — ferramenta de topo, destacada na homepage), `actividadecientificajoelho`, `entorsejoelho-drnunocamelo`, `liquidojoelho-artrocentese-drnunocamelo`, `tendao-rotuliano-tendinite-drnunocamelo`, `kneesurgeryinportugalprices`, e os EN/RU de `joelhodrnunocamelo`. | **Alta** | 8 rotas (ver §0) | Escrever description única (140–160 car.) e `title` keyword-rich. Estas são "páginas antigas ainda por portar" — priorizar `joelhodrnunocamelo` e `entorse` (alto volume de pesquisa). |
| 6 | **Perda de dados estruturados na migração.** O site estático tinha 3×`FAQPage`, 9×`MedicalWebPage`, 12×`Physician`, 3×`MedicalBusiness`/`Hospital`. No Next.js só **6 páginas PT** têm JSON-LD (homepage, lca, menisco, quadriceps, recuperar-cirurgia, página do médico). Páginas com FAQ visível (artrose, cartilagem, protese, infiltracoes...) **não têm `FAQPage`** → perdem rich results. | **Alta** | ~19 páginas clínicas sem JSON-LD | Adicionar `MedicalWebPage` + `FAQPage` a todas as páginas de patologia (o helper `medicalWebPageSchema` em `seo.ts` já existe mas **não é usado em lado nenhum**). |
| 7 | **`hreflang` aponta para EN/RU que ainda não estão traduzidos** (conteúdo EN/RU clonado em PT ou parcial). Declarar `en-GB`/`ru-RU` para páginas cujo conteúdo é igual ao PT cria "falsos alternates". | **Média** | Bloco `languages` em quase todas as páginas | Só declarar o `hreflang` de um idioma quando a tradução existir e for genuína. Sincronizar com o estado real de tradução (a `sitemap.ts` já distingue listas `enRoutes`/`ruRoutes`). |
| 8 | **`x-default` aponta sempre para a versão PT.** Correto para mercado PT, mas confirmar intenção: para tráfego internacional (knee surgery prices) pode interessar `x-default`→EN. | **Baixa** | Todas as páginas | Decisão de negócio; manter PT é defensável. |
| 9 | **CSS por página injetado inline** (`<style dangerouslySetInnerHTML>`) com ~6 KB repetidos em cada página clínica + duplicado em PT/EN/RU. Aumenta o HTML e penaliza LCP/transferência. | **Média** | Todas as páginas portadas | Extrair o CSS partilhado para folha de estilo única (`article.css`/`polish.css` já existem) e remover o inline. |
| 10 | **Imagens hero servidas de `static.wixstatic.com`** (homepage, página do médico) — terceiro domínio, sem controlo de cache, sem `next/image`. Outras heros usam `/img/hero/*.jpg` locais. | **Média** | Homepage, página do médico, cards de patologia | Migrar imagens para o domínio próprio + `next/image` (AVIF/WebP, `sizes`, lazy). Ganho direto de LCP. |
| 11 | **Logótipos de locais com `alt=""` vazio** (`/img/logos/lusiadas.webp`, `hmvc.webp`). Decorativo é defensável, mas o nome do hospital ao lado já é texto — aceitável; rever se algum logo transporta informação única. | **Baixa** | Homepage (secção Locais) | Confirmar `alt` descritivo onde o logo não tem texto adjacente. |
| 12 | **Inconsistência de domínio/marca no JSON-LD.** Homepage usa `"@type":"MedicalBusiness"`; seria mais forte `MedicalClinic` + `department`/3×`Hospital` (3 unidades). `priceRange:"$$"` é genérico. | **Média** | `src/app/page.tsx` | Ver recomendações §3. |
| 13 | **`og:image` ausente na maioria das páginas internas.** Só homepage e página do médico têm OG image. Partilhas em redes sociais ficam sem cartão visual. | **Baixa** | Páginas clínicas | Adicionar `openGraph.images` (pode ser o hero local de cada página). |
| 14 | **Links internos absolutos com `consultajoelho.pt` (sem `www`).** O algoritmo (`joelhodrnunocamelo`) tem `href="https://consultajoelho.pt"` e CTAs apontam para `agendamentonunocameloespecialistajoelho` (rota que **não existe** no app — só `contacto` existe). | **Alta** | `joelhodrnunocamelo`, várias páginas com `hero-cta`/`btn-primary` | Usar links relativos internos (`/contacto`). **`agendamentonunocameloespecialistajoelho` está em `site.ts` e em vários CTAs mas não existe como rota** → links partidos. |
| 15 | **Title da página de contacto inconsistente** (`"Marcar Consulta | Consulta Joelho"` vs. o template de marca das outras `... | Dr. Nuno Camelo Porto`). | **Baixa** | `contacto` | Uniformizar o sufixo de marca. |

> Nota positiva: o site estático **não tinha hreflang** (confirmado em `artrose_gonartrose.html`) — logo o modelo de hreflang do Next.js, depois de corrigidos os bugs #1–#3, é um avanço real.

---

## 2. Mapa de keywords por página (PT / EN) + lacunas

### Páginas existentes — intenção e keywords-alvo

| Rota | Intenção | Keyword PT primária | Keywords PT secundárias | Keyword EN |
|------|----------|---------------------|--------------------------|------------|
| `/` (home) | Navegacional/marca + local | consulta joelho Porto | cirurgião ortopédico joelho Porto, especialista joelho | knee specialist Porto |
| `/artrose` | Informacional → conversão | artrose do joelho | gonartrose, Kellgren-Lawrence, quando operar artrose | knee osteoarthritis |
| `/menisco` | Informacional → conversão | rotura do menisco | lesão menisco, suturar vs remover menisco | meniscus tear |
| `/lca` | Informacional → conversão | rotura LCA | ligamento cruzado anterior, reconstrução LCA | ACL tear / reconstruction |
| `/protese` | Informacional → conversão | prótese do joelho | artroplastia joelho, prótese e desporto | knee replacement |
| `/cartilagem` | Informacional | lesão cartilagem joelho | microfractura, OATS, condropatia | knee cartilage lesion |
| `/infiltracoes` | Informacional (mito-busting) | infiltração joelho | PRP joelho, ácido hialurónico, infiltração regenerativa | knee injections / PRP |
| `/quisto-baker` | Informacional | quisto de Baker | cisto poplíteo | Baker's cyst |
| `/quistos-parameniscais` | Informacional (long-tail) | quistos parameniscais | quisto menisco | parameniscal cysts |
| `/sindrome-banda-iliotibial` | Informacional (corredores) | síndrome banda iliotibial | dor lateral joelho corredor | iliotibial band syndrome |
| `/luxacao-rotula` | Informacional | luxação da rótula | instabilidade rotuliana, LMPF | patellar dislocation |
| `/quadriceps` | Informacional | quadricípite joelho | AMI, inibição artrogénica | quadriceps / AMI |
| `/joelhodrnunocamelo` | Ferramenta (triagem) | algoritmo gonalgia | dor no joelho diagnóstico, gonalgia | knee pain algorithm |
| `/avaliar` | Ferramenta | score Lysholm | avaliar joelho, Lysholm-Tegner | Lysholm score |
| `/sigic` | Transacional (SNS) | vale SIGIC joelho | cirurgia joelho SNS, lista espera | — |
| `/preparar-cirurgia` `/recuperar-cirurgia` `/medo-cirurgia` | Suporte/conversão | preparar/recuperar cirurgia joelho | reabilitação pós-operatório joelho | — |
| `/nuno-camelo-...` | Marca/E-E-A-T | Dr. Nuno Camelo ortopedista | cirurgião joelho Porto, fellowship Lyon | — |
| `/kneesurgeryinportugalprices` | Transacional EN (turismo médico) | knee surgery Portugal prices | knee surgery cost Portugal | (já EN) |
| `/entorsejoelho-...` | Informacional (alto volume) | entorse do joelho | torção joelho | knee sprain |
| `/tendao-rotuliano-...` | Informacional | tendinite rotuliana | tendinopatia rotuliana, jumper's knee | patellar tendinopathy |
| `/liquidojoelho-artrocentese-...` | Informacional | líquido no joelho | derrame articular, artrocentese | knee effusion |

### Lacunas de conteúdo (páginas a criar)

Alto valor de pesquisa em PT, atualmente sem página dedicada:
1. **Dor anterior do joelho / condromalácia rotuliana** ("dor à frente do joelho", "condromalácia") — volume alto, atualmente diluído.
2. **Artroscopia do joelho** (página pilar do procedimento — "artroscopia joelho", "como é a artroscopia"). Hoje é só palavra dispersa.
3. **Ligamento cruzado posterior (LCP)** e **ligamentos colaterais (LLI/LLE)** — completam o cluster ligamentar.
4. **Tendinopatia do quadricípite / rotura do tendão quadricipital** (distinto do rotuliano).
5. **Osteotomia do joelho** (alternativa à prótese em jovens — referida em `/artrose` mas sem página).
6. **Prótese unicompartimental** (página própria; muito procurada e diferenciadora).
7. **Prevenção de lesões do joelho** (`prevencao-do-joelho` já está registada em `site.ts` mas **não existe a rota**).
8. **Página-pilar "Dor no joelho" (gonalgia)** orientada a SEO — a `joelhodrnunocamelo` é uma ferramenta interativa, não substitui uma página de conteúdo indexável sobre causas de dor no joelho.
9. **Turismo médico EN** — expandir além de `kneesurgeryinportugalprices`: "ACL reconstruction Portugal", "knee replacement abroad cost". Forte para o público EN/RU.

---

## 3. Recomendações de dados estruturados

**A. Homepage — passar de `MedicalBusiness` para `MedicalClinic` com 3 unidades**
```jsonc
{
  "@type": "MedicalClinic",            // mais específico que MedicalBusiness
  "name": "ConsultaJoelho — Dr. Nuno Camelo Barbosa",
  "medicalSpecialty": "Orthopedic",
  "availableService": { "@type":"MedicalProcedure", "name":"Cirurgia do joelho / Artroscopia" },
  "department": [                       // 1 entrada por unidade, com geo + horário
    { "@type":"Hospital", "name":"Hospital Lusíadas Porto",
      "address":{"@type":"PostalAddress","streetAddress":"Av. da Boavista 171","postalCode":"4050-115","addressLocality":"Porto","addressCountry":"PT"} },
    { "@type":"Hospital", "name":"Hospital Misericórdia Vila do Conde",
      "address":{"@type":"PostalAddress","streetAddress":"R. da Misericórdia","postalCode":"4480-756","addressLocality":"Vila do Conde","addressCountry":"PT"} },
    { "@type":"Hospital", "name":"Hospital Lusíadas Paços de Ferreira",
      "address":{"@type":"PostalAddress","addressLocality":"Paços de Ferreira","addressCountry":"PT"} }
  ],
  "telephone":"+351926850194",
  "sameAs":[ "...facebook...", "...linkedin...", "https://orcid.org/0000-0002-7443-4085" ]
}
```
Acrescentar `geo` (lat/long) por unidade quando disponível — essencial para Local Pack.

**B. Páginas de patologia — `MedicalWebPage` + `FAQPage` (atualmente em falta)**
O helper `medicalWebPageSchema()` já existe em `src/lib/seo.ts` mas **não é invocado em nenhuma página**. Usá-lo em todas as páginas clínicas e adicionar `FAQPage` onde já há FAQ visível (artrose, cartilagem, protese, infiltracoes, lca, menisco...). Garantir paridade pergunta↔resposta entre o HTML visível e o JSON-LD (requisito Google).

**C. Página do médico — enriquecer o `Physician`** (já bom). Adicionar:
- `worksFor`/`affiliation` → as 3 unidades.
- `knowsAbout`: ["Reconstrução do LCA","Artroplastia do joelho","Cirurgia meniscal","Instabilidade rotuliana"].
- `award`/`memberOf`: SPAT, SPEJ.

**D. `BreadcrumbList`** em todas as páginas internas (Início › Categoria › Página) — melhora a apresentação na SERP.

**E. Ferramentas** (`/avaliar`, `/joelhodrnunocamelo`) — schema `WebApplication` ou `MedicalRiskCalculator`/`SoftwareApplication` para diferenciação.

---

## 4. Plano hreflang / internacional

**Princípios**
1. **Cada página = um canonical próprio (auto-referencial).** Corrigir bugs #1–#3 antes de tudo o resto — são os de maior impacto.
2. **Cluster hreflang recíproco e completo:** cada URL lista `pt-PT`, `en-GB`, `ru-RU` e `x-default`, todos com URLs que **existem e respondem 200**. Hoje muitos apontam para slugs antigos inexistentes.
3. **Só declarar o hreflang de um idioma quando a tradução for real.** Várias páginas `/en` e `/ru` ainda têm conteúdo PT/parcial — não anunciar `en-GB`/`ru-RU` enquanto assim for (evita penalização por "alternate" enganoso). A `sitemap.ts` já tem listas separadas que devem ser a fonte de verdade.
4. **`<html lang>` correto no servidor por locale** (issue #4): criar `app/en/layout.tsx` e `app/ru/layout.tsx`, ou reestruturar para `app/[locale]/`. O `LangSync` client-side é insuficiente para crawlers.
5. **Consistência de host:** sempre `https://www.consultajoelho.pt` (com `www`). Eliminar links a `https://consultajoelho.pt` (issue #14) e garantir redirect 301 do apex para `www`.
6. **`x-default` → PT** (mercado primário). Reavaliar só se o turismo médico EN ganhar peso.

**Sequência sugerida**
1. Corrigir canonicais EN/RU (auto-referenciais) + homepage EN. *(crítico)*
2. Acertar `<html lang>` server-side por locale.
3. Sincronizar blocos `languages` com o estado real de tradução.
4. Reduzir hreflang aos pares genuinamente traduzidos; expandir à medida que se traduz.

---

## 5. Local SEO (Google Business Profile — 3 unidades)

O Dr. Camelo opera em **3 locais físicos**, mas presta serviço dentro de hospitais de terceiros (Lusíadas, Misericórdia). Estratégia:

1. **GBP por unidade onde for elegível.** O Google permite um perfil de "practitioner" (profissional individual) distinto do perfil do estabelecimento. Criar/reclamar perfil **"Dr. Nuno Camelo Barbosa — Ortopedista (Joelho)"** com categoria primária *Cirurgião ortopédico* e morada de cada unidade onde atende presencialmente. Evitar duplicados de morada com o hospital (regra GBP: profissional individual pode coexistir com o estabelecimento).
2. **NAP consistente** (Nome, Address, Phone) idêntico em GBP, site (`site.ts`/JSON-LD), Lusíadas e diretórios. Atenção: a página de contacto da unidade de Vila do Conde usa `+351252249100`; as outras `+351926850194`. Definir qual é o número GBP principal.
3. **Categorias e serviços** no GBP: Cirurgião ortopédico (primária); secundárias: Médico, Clínica. Listar serviços (artroscopia, reconstrução LCA, prótese do joelho, infiltrações) com descrição.
4. **Reviews:** o componente `GoogleReviews` já existe no site — criar fluxo pós-consulta para angariar avaliações (fator nº1 do Local Pack). Responder a todas.
5. **Citações locais PT:** Lusíadas (perfil já existe — `lusiadas.pt/corpo-clinico/dr-nuno-camelo-barbosa`), Doctoralia, SaudeCuf/diretórios médicos, Ordem dos Médicos. NAP coerente.
6. **Páginas locais no site:** considerar landing pages "Cirurgião de joelho em Vila do Conde" / "...em Paços de Ferreira" para capturar pesquisas geográficas — hoje o conteúdo local concentra-se só no Porto.
7. **Schema `geo` + `openingHours`** por unidade (ver §3A) — reforça a elegibilidade local.

---

## Resumo (3 correções de maior impacto)

1. **Corrigir os canonicais/hreflang das versões EN/RU (issues #1–#3).** A homepage `/en` canonicaliza para a homepage PT, e ~24 páginas `/en` e `/ru` apontam o canonical para slugs antigos que já **não existem (404)**. Isto está a impedir ativamente a indexação de praticamente todo o conteúdo internacional — é o fix de maior retorno e deve ser o primeiro.
2. **Repor os dados estruturados perdidos na migração (issue #6).** O site estático tinha `FAQPage` + `MedicalWebPage` em 9–12 páginas; o Next.js só tem JSON-LD em 6. O helper `medicalWebPageSchema` já existe mas nunca é usado. Adicionar `MedicalWebPage` + `FAQPage` (e `BreadcrumbList`) às páginas de patologia recupera rich results com baixo esforço.
3. **Tratar as páginas-âncora sem `title`/`description` e os links partidos (issues #5 e #14).** O **Algoritmo de Gonalgia** (`joelhodrnunocamelo`) — destacado na homepage — não tem meta description e a rota de CTA `agendamentonunocameloespecialistajoelho` não existe (links partidos em vários CTAs). Escrever metadados e apontar os CTAs para `/contacto`.

Bónus de quick-win: definir `<html lang>` server-side por locale (#4) e migrar imagens hero de `wixstatic.com` para `next/image` local (#10) para ganho direto de LCP.
