# Relatório do Claude — estado e plano (para discutir, 2026-06-25)

> Avaliação do agente que **construiu** o site, a reconciliar a auditoria do swarm com o trabalho já feito. **Nenhum código alterado neste relatório** — é para decidirmos juntos antes de executar.

---

## 1. Onde estamos (resumo honesto)

**Funciona e está live** (consultajoelho-pt.vercel.app), trilingue PT/EN/RU:
- Site trilingue completo (~23 páginas × 3 línguas), sitemap, hreflang.
- Hero com **vídeo de fundo** (self-hosted, abrandado), tipografia sans confiante.
- **Fotos profissionais** nos heros de 16 páginas (otimizadas) + remoção de ilustrações amadoras (menisco vascularizado).
- Reviews Google (estáticas), galeria de **vídeos**, formulário de contacto trilingue.
- **Logos dos hospitais** na secção de locais; homepage compactada; **mobile** com legibilidade corrigida (impeccable).
- Fonte: **Space Grotesk (títulos) + Source Sans 3 (corpo)**.

**A dívida (o que o swarm acertou em cheio):** o design vive em **4 sistemas paralelos** (globals.css / site.css / article.css / `<style>` inline ×30 páginas) + a camada `polish.css` com `!important`. Mudar 1 token = editar dezenas de ficheiros. É isto que separa o site do "premium coerente".

---

## 2. A auditoria do swarm — a minha avaliação

### P0 (críticos)
| Item | Avaliação minha |
|---|---|
| **P0-1 Canonicals/hreflang EN/RU** | ✅ **Bug real e grave** — confirmo. Canonicals EN/RU apontam para slugs Wix 404. Crítico para SEO. **Fazer.** |
| **P0-2 Links/CTAs partidos** | Parcialmente feito (redirect `agendamento→/contacto` já existe); falta o link sem-www no algoritmo. **Verificar e fechar.** |
| **P0-3 Ressalva clínica (tendinopatia)** | ⚠️ **Precisa de ti** (risco clínico). Não toco sem validação tua. |
| **P0-4 Fonte via next/font** | ✅ Concordo — o `@import` bloqueia render. É também o QW1 do design. |
| **P0-5 Meta descriptions em falta** | ✅ Real e fácil. **Fazer.** |
| **P0-6 Dados estruturados não usados** | ✅ Helper existe e nunca é chamado. Bom retorno SEO. **Fazer.** |
| **P0-7 Credenciais FIFA/Sonnery-Cottet** | Parcial — **já removi FIFA/Santy dos cartões de bio**. Falta o **CV** (`nuno-camelo-...`). ⚠️ Confirmar contigo o que fica no CV. |

### Design — concordo com o diagnóstico
- ✅ Fonte **Opção B** (par) — é o que implementei; o swarm valida-a. Falta **oficializar** (DESIGN.md + next/font).
- ⚠️ **A minha compactação (`padding:60px !important`) está errada para "luxo".** O swarm tem razão: secções premium **respiram mais**, não menos. A homepage parecia "comprida" por **demasiadas secções/repetição**, não por espaço a mais.
- A solução certa: **token único de espaçamento** + **menos secções/mais limpas**, não achatar tudo.

---

## 3. Tensões a decidir (decisões tuas)

1. **"Compacto" vs "respirar".** Disseste que estava comprida → eu compactei. O design-audit diz que luxo = respirar. **A reconciliação:** manter respiração generosa, mas **cortar/fundir secções** (ex.: stats do Dr.? algoritmo + outra?). → Preciso de saber **que secções podemos cortar**.
2. **Fonte:** confirmar Opção B oficial (par Space Grotesk + Source Sans 3)? (recomendo sim)
3. **Dívida estrutural (4 sistemas):** investimos agora no **token único + componentes** (3–4 dias, mas destrava tudo) ou só quick-wins primeiro? (recomendo quick-wins já, refactor faseado depois)
4. **Itens clínicos/credenciais (P0-3, P0-7):** o que validas para eu poder mexer.

---

## 4. O que eu recomendo (sequência)

**Fase 1 — P0 de SEO (seguro, alto retorno, sem validação tua):** P0-1, P0-2, P0-5, P0-6.
**Fase 2 — Design quick-wins:** QW1 (next/font) → QW3 (escala de espaçamento, **reverter o `60px !important`**) → QW2 (tipografia) → QW4/5/6 (raios, sombras, limpar código morto).
**Fase 3 — Estrutural (faseado):** token único `@theme` + componentizar blocos clínicos + migrar as 30 páginas inline.
**Em paralelo, contigo:** P0-3 e P0-7 (clínico/credenciais).

---

## 5. O que preciso de ti antes de avançar
1. **Que secções da homepage** podemos cortar/fundir (para resolver "demasiadas coisas" sem achatar).
2. **Confirmas a fonte Opção B** oficial?
3. **P0-3 (ressalva tendinopatia)** e **P0-7 (CV: FIFA/Santy/Sonnery-Cottet)** — o que aprovas.
4. Começamos pela **Fase 1 (SEO)** ou preferes a **Fase 2 (design)** primeiro?

> Fico à espera da tua leitura para falarmos. Não avanço sem o teu OK.
