# Auditoria de Design/UI — consultajoelho.pt

**Agente:** web-designer (swarm)
**Data:** 2026-06-25
**Âmbito:** Auditoria visual e proposta de uplift para nível "luxo médico" (referência: London Cartilage / estilo Chahla), **mantendo cores e conteúdo**. Não foi alterado código — só auditoria.

---

## 1. Como o design está montado hoje (arquitetura visual)

O projeto Next.js (16.x, Tailwind v4, App Router) tem o design espalhado por **quatro vocabulários paralelos que não falam entre si**, mais uma camada de override:

1. **`src/app/globals.css`** — define o design system "oficial" em `@theme` do Tailwind v4 (paleta teal/sage correta) e a fonte `--font-sans: var(--font-space-grotesk)…`.
2. **`src/app/site.css`** — CSS da homepage (nav, hero, cards de patologia, footer). Tem o **seu próprio `:root`** com tokens **diferentes** (`--border:#dde8dd`, `--r:12px`, `--muted:#4a5e4a`) e importa as fontes por `@import url(google fonts)`.
3. **`src/app/article.css`** — layout `.pa-` para artigos.
4. **CSS inline por página clínica** — **30 páginas** (`cartilagem`, `lca`, `menisco`…) embutem um bloco `<style>` completo via `dangerouslySetInnerHTML`, **cada uma com o seu próprio `:root{--teal…}`**, os seus border-radius e as suas cores de texto hardcoded.
5. **`src/app/polish.css`** — camada "premium", importada por último, que reescreve com `!important` a fonte do corpo, sombras dos cards e o hero de vídeo.

**Consequência:** mudar um token (ex.: o cinza de texto, o raio dos cards) exige editar dezenas de ficheiros. É a maior dívida de design do projeto e o que bloqueia o uplift consistente.

### Bugs/inconsistências concretas detetadas

- **Fonte do design system está partida.** `globals.css` aponta `--font-sans: var(--font-space-grotesk)…`, mas **`layout.tsx` nunca importa `next/font`** nem define `--font-space-grotesk`. Logo esse token resolve para o fallback (`ui-sans-serif`). A fonte só "funciona" porque `site.css` e o CSS inline a carregam à parte — duas fontes da verdade.
- **DESIGN.md contradiz-se a si próprio.** O corpo do documento diz "**A Regra da Família Única** — uma só família (Space Grotesk), nunca emparelhar segunda sans", mas o *frontmatter* já lista `body: Source Sans 3`, e o `polish.css` impõe `Source Sans 3 !important` no corpo. Há uma decisão por tomar (ver §3.1).
- **A "Regra do Plano-por-Omissão" foi quebrada.** DESIGN.md proíbe sombras em repouso; `polish.css` aplica `box-shadow: 0 4px 18px…` permanente a `.pato-card` e `.local-card`. Não é necessariamente mau (até ajuda o "luxo"), mas o sistema documentado e o implementado divergiram — é preciso reconciliar.
- **Carregamento de fontes render-blocking.** `@import url('https://fonts.googleapis.com/...')` no topo de `site.css` bloqueia o render e custa LCP. Deve passar para `next/font` (self-host, `display: swap`, preload).
- **Risco de contraste.** Texto auxiliar hardcoded a `#4a5e4a`/`#5a6e5a`/`#3d5240` sobre fundos claros e tingidos espalhado pelas páginas — precisa de verificação 4,5:1 (o próprio PRODUCT.md alerta para público mais velho). O `--muted:#4a5e4a` passa, mas variantes mais claras como `#5a6e5a` sobre branco estão no limite.
- **Inconsistência de raios.** Nas páginas inline coexistem `8px`, `10px`, `12px`, `14px`, `16px`, `20px`, `2px` — sem escala. DESIGN.md pede `sm 3px / md 6px / lg 8px`. Nada bate certo.
- **`.hero` legado vs `.vhero`.** A homepage usa o `VideoHero` (`.vhero`), mas `site.css` ainda carrega ~200 linhas do hero antigo `.hero` (gradiente + imagem lateral) que já não é usado na home. Código morto que confunde manutenção.
- **Ícones vazios.** Vários `<span class="...icon">` ficaram sem emoji (removidos) e há a regra `[class*="icon"]:empty{display:none}`. Restam `<div class="icon"></div>` nos treat-cards que ocupam altura/margem sem conteúdo.

---

## 2. Avaliação do estado atual

| Eixo | Estado | Notas |
|---|---|---|
| **Paleta** | Forte | Teal+sage bem escolhidos, com intenção clara. É o ponto mais sólido. Manter. |
| **Tipografia** | Médio | Boa família (Space Grotesk), mas hierarquia inconsistente entre páginas, carregamento subótimo, escala não tokenizada. Falta refinamento "editorial" (kicker, leading, medida). |
| **Escala de espaçamento** | Fraco | Sem escala partilhada. `polish.css` força `padding: 60px !important` em todas as secções, achatando o ritmo. Secções clínicas usam 56px/44px/28px ad-hoc. |
| **Grelha / largura** | Médio | Container 1100–1180px varia entre ficheiros; corpo a 68ch (bom) mas nem todas as páginas o respeitam. |
| **Componentes** | Fraco–médio | Cards, badges, botões, FAQ e tabelas reimplementados por página com pequenas variações. Sem biblioteca React partilhada. |
| **Profundidade/acabamento** | Médio | Hero de vídeo é forte (bom para "luxo"). Resto é plano com sombras inconsistentes. Falta o polimento de detalhe (borders 1px subtis, hovers calmos, ritmo). |
| **Consistência global** | Fraco | Quatro sistemas paralelos. É o que separa o site do look "premium coerente" da London Cartilage. |

**Resumo:** o site tem bons "ossos" (paleta, hero de vídeo, conteúdo clínico rico e honesto) mas falta-lhe **um sistema único e coerente** e o **polimento tipográfico/espacial** que define o luxo médico. O luxo não vem de adicionar enfeites — vem de **remover inconsistência** e apertar ritmo, escala e detalhe.

---

## 3. Melhorias priorizadas (impacto × esforço)

Legenda: **Impacto** A(lto)/M(édio)/B(aixo) · **Esforço** em dias.

### QUICK-WINS (≤1 dia cada, alto retorno)

**QW1 — Migrar fontes para `next/font` (Impacto A · ~0,5d).**
Carregar Space Grotesk (e Source Sans 3, se for mantida) via `next/font/google` no `layout.tsx`, expor `--font-space-grotesk`/`--font-body` no `<body>`, e **remover o `@import url()` do `site.css`**. Liga o token partido do `globals.css`, remove render-blocking, melhora LCP/CLS. Ganho de performance *e* consistência num só passo.

**QW2 — Apertar a escala tipográfica e o leading do corpo (Impacto A · ~0,5d).**
Para sensação editorial/premium:
- Corpo: `line-height: 1.7` está bom; garantir `font-size: 1.0625rem` (17px) nas páginas clínicas longas e medida `66–72ch` em todas (hoje varia).
- H1 hero (`.vhero-title`): manter `clamp(2.6rem,6.5vw,5rem)` mas subir `letter-spacing` para `-0.035em` e `line-height: 1.0` — títulos grandes pedem tracking mais apertado.
- H2 de secção: uniformizar para `clamp(1.6rem, 3vw, 2.2rem)`, `letter-spacing:-0.02em`, e dar-lhes **mais ar por cima** (`margin-top` generoso) — o luxo respira.
- Subir o peso de contraste: leads/subtítulos a `font-weight:400` mas cor `text-main @ 78%`, nunca cinza claro.

**QW3 — Tokenizar a escala de espaçamento e remover o `padding:60px !important` (Impacto A · ~0,5d).**
Substituir o achatamento global por uma **escala de secção** (`--section-y: clamp(72px, 9vw, 120px)`). Secções de "luxo" respiram mais (96–120px desktop), não menos. Hoje o `polish.css` força tudo a 60px, o que é o oposto do efeito pretendido.

**QW4 — Unificar raios e bordas (Impacto M · ~0,5d).**
Escolher **uma** escala (sugestão alinhada com o hero de vídeo: cards `12px`, botões `8px`, badges/pills `full`, campos `8px`) e aplicar via variável. Eliminar os `2px`/`14px`/`16px` órfãos. Bordas sempre `1px` da mesma cor (`--border`), nunca `border-left` grosso (DESIGN.md já proíbe).

**QW5 — Reconciliar sombras (Impacto M · ~0,25d).**
Decisão de marca: o "luxo médico" tolera **uma sombra muito subtil e difusa** em repouso (`0 1px 2px rgba(3,87,114,.04), 0 8px 24px rgba(3,87,114,.05)`) + uma elevação calma no hover (`translateY(-2px)`, sombra ~14% — já existe). Padronizar essa **única** receita e atualizar a §4 do DESIGN.md em conformidade (ou reverter para flat-total — mas escolher *um* caminho).

**QW6 — Limpar ícones vazios e código morto (Impacto B · ~0,25d).**
Remover `<div class="icon"></div>` / `<span class="...icon">` vazios e o CSS do hero legado `.hero` em `site.css` (não usado na home). Reduz ruído e peso.

### MÉDIO (1–2 dias)

**M1 — Refinar a Trust Strip e os "stats" (Impacto A · ~1d).**
A faixa de confiança (Subespecialista / Coordenador / Peer Reviewer / Lusíadas) é o ativo de credibilidade mais forte — hoje está em texto pequeno com divisórias verticais. Elevá-la: mais respiro vertical, número/label com hierarquia clara (label em `0.7rem` tracking `0.14em` teal-mid + valor em peso 600), e trocar as divisórias `border-right` por espaço (whitespace > linhas para o look premium). Mesmo princípio nos `.dstat`/`.fact-item`.

**M2 — Sistema de "kicker/eyebrow" disciplinado (Impacto M · ~1d).**
DESIGN.md já avisa contra "eyebrow acima de *cada* secção" (gramática de AI). Hoje quase todas as secções têm `.eyebrow`/`.section-label`. Variar a cadência: manter o kicker só nas secções-âncora (≈40% delas), refinar o estilo (teal-mid `#4d8495`, `0.72rem`, tracking `0.14em`, com um traço curto `—` antes em vez de bloco maiúsculo pesado).

**M3 — Componentizar os blocos clínicos repetidos (Impacto A · ~2d, mas habilita tudo).**
Extrair para componentes React partilhados: `<FaqAccordion>`, `<TreatmentCard>`, `<StatStrip>`, `<CtaSection>`, `<PhysicianStrip>`, `<HeroClinical>`. Cada página clínica passa a **dados**, não HTML+CSS embutido. É o passo que torna o uplift sustentável e mata os 30 `:root` duplicados.

### ESTRUTURAL (3+ dias, maior impacto de coerência)

**E1 — Token único partilhado em `@theme` (Impacto A · ~2–3d).**
Consolidar toda a cor/raio/espaçamento/tipografia num único `@theme` no `globals.css` (Tailwind v4) e fazer `site.css`, `article.css` e as páginas **consumirem** essas variáveis em vez de redefinirem. Eliminar os `:root` locais. É a fundação de tudo o resto.

**E2 — Migrar as 30 páginas clínicas do `<style>` inline para os componentes de M3 (Impacto A · ~3–4d).**
Faseável (uma patologia de cada vez). Resultado: design 100% consistente, contraste garantido por tokens, e manutenção trivial. Aproveitar para corrigir contrastes hardcoded (`#5a6e5a` etc.) de uma vez.

**E3 — Detalhe de acabamento "editorial" (Impacto M · ~2d).**
Depois da base unificada: refinar micro-detalhes que assinam o luxo — `letter-spacing` por tamanho, optical alignment dos números nas tabelas (`font-variant-numeric: tabular-nums`), regras `:first-letter`/lead destacado nos artigos, transições calmas e coerentes (180–220ms, mesma curva), focus-visible elegante (já existe), e imagens com `aspect-ratio` consistente + leve `object-position` consciente.

---

## 4. Recomendação sobre a fonte (decisão pendente)

Há uma tensão real a resolver antes do uplift:
- **Opção A — Família única Space Grotesk** (como o *corpo* do DESIGN.md e a referência estática mandam). Mais coeso, mais "design-led", alinhado com a London Cartilage. Space Grotesk em corpo longo é aceitável mas ligeiramente menos confortável para público mais velho.
- **Opção B — Par Space Grotesk (display/UI) + Source Sans 3 (corpo)** (como `polish.css` já faz). Melhor conforto de leitura para o público (PRODUCT.md valoriza-o), à custa de coerência.

**Recomendo a Opção B, mas tornando-a oficial e limpa:** é a melhor para um público clínico mais velho e ansioso (o JTBD do site), desde que (1) se atualize o DESIGN.md para refletir o par, (2) se carregue por `next/font`, e (3) Source Sans 3 fique **exclusivamente** no corpo de texto, com Space Grotesk em todos os títulos/UI/labels. Source Sans 3 é uma sans humanista neutra e legível — não é a serif editorial do "luxo clássico", mas combina com a direção sóbria-clínica do projeto e evita o risco de uma serif parecer institucional/fria.

---

## 5. Sequência sugerida

1. **Semana 1 (quick-wins):** QW1→QW6. Liga as fontes, aperta tipografia/espaço, padroniza raios/sombras, limpa lixo. Visível e barato.
2. **Semana 2:** E1 (token único) + M1/M2 (trust strip, kicker). A base coerente aparece.
3. **Semanas 3–4:** M3 + E2 (componentizar e migrar páginas clínicas, faseado) + E3 (acabamento editorial).

O luxo deste projeto não está em adicionar — está em **unificar e respirar**. A paleta e o hero de vídeo já lá estão; falta o sistema único, o ritmo de espaçamento e o polimento tipográfico.
