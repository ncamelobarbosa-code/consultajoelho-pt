---
name: ConsultaJoelho.pt
description: Site de marca do Dr. Nuno Camelo — cirurgião exclusivo de joelho, Porto. Educar antes de vender.
colors:
  teal-main: "#035772"
  teal-dark: "#034459"
  teal-deeper: "#011014"
  teal-mid: "#4d8495"
  teal-light: "#7daab9"
  sage: "#aacba8"
  bg: "#f6f9f5"
  text-main: "#091405"
  grey-mid: "#949593"
  grey-pale: "#eaede9"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Source Sans 3, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.14em"
rounded:
  sm: "3px"
  md: "6px"
  lg: "8px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.teal-main}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.teal-dark}"
    textColor: "{colors.white}"
  button-on-teal:
    backgroundColor: "{colors.white}"
    textColor: "{colors.teal-main}"
    rounded: "{rounded.sm}"
    padding: "12px 28px"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.lg}"
    padding: "20px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
---

# Design System: ConsultaJoelho.pt

## 1. Overview

**Creative North Star: "O Mapa Claro do Joelho"**

Quem chega ao consultajoelho.pt chega quase sempre preocupado — com dor, ou depois de um diagnóstico que não percebeu. O sistema visual existe para ser o **mapa claro** que orienta essa pessoa pela sua condição: primeiro explica, depois propõe agir. A clareza é a forma de cuidar. O teal profundo carrega o conhecimento e a autoridade serena; o verde sage humaniza e tranquiliza; o fundo claro respira. Nada grita.

O tom é **próximo e acolhedor**, assente em rigor e honestidade clínica. Mostra-se o percurso e a evidência — não se proclamam adjetivos. Quando há incerteza, assume-se (as infiltrações "regenerativas" levam aspas de propósito).

Este sistema **rejeita** explicitamente: a clínica genérica de fotos de stock e copy vazia ("o melhor", "vanguarda"); o marketing agressivo e o over-claiming clínico; o look "AI/SaaS" de 2026 (fundo creme, eyebrow em maiúsculas acima de cada secção, grelhas de cards idênticas, hero de número gigante); e o hospital frio e burocrático.

**Key Characteristics:**
- Clareza orientadora antes de persuasão.
- Calor humano sobre uma base de rigor.
- Superfícies planas, profundidade por cor e bordas — não por sombras.
- Leitura confortável: corpo limitado a ~68ch.
- Honestidade clínica como traço de marca.

## 2. Colors

Uma paleta teal-and-sage de inspiração clínica e natural: o azul-petróleo da confiança, o verde sálvia do cuidado, sobre um fundo quase-branco esverdeado que respira.

### Primary
- **Teal Profundo** (#035772): a cor da marca. Hero, nav, botões primários, títulos de ação, links. Carrega autoridade e confiança.
- **Teal Escuro** (#034459): estados hover dos botões primários e fundos secundários escuros (secção de pacientes internacionais).
- **Teal Abissal** (#011014): fundos muito escuros pontuais; o tom mais profundo da rampa.

### Secondary
- **Verde Sálvia** (#aacba8): o acento humano. Banner SIGIC, detalhes de acento, marcador "Realidade", sublinhados de confiança. É o calor da paleta.

### Tertiary
- **Teal Médio** (#4d8495): acentos secundários, "kicker"/label discreto, `.pt` do logótipo.
- **Teal Claro** (#7daab9): bordas e detalhes, hover de cartões.

### Neutral
- **Tinta** (#091405): texto de corpo. Quase-preto esverdeado — leitura firme sobre o fundo claro.
- **Fundo** (#f6f9f5): fundo geral da página. Off-white com leve tinta esverdeada (do hue da marca, não "creme").
- **Cinza Pálido** (#eaede9): fundos de cards neutros, divisórias, bordas suaves.
- **Cinza Médio** (#949593): texto auxiliar e legendas. **Uso restrito** — ver regra abaixo.
- **Branco** (#ffffff): superfícies de cartão, texto sobre fundos teal.

### Named Rules
**A Regra do Contraste Honesto.** O cinza médio (#949593) sobre o fundo (#f6f9f5) **não atinge 4,5:1** e é proibido para texto de corpo ou texto longo. Reserva-se a metadados muito curtos (uma palavra, uma data). Texto auxiliar legível usa a tinta a 90% (#091405 / opacidade), nunca o cinza claro "por elegância".

**A Regra da Cor Comprometida.** O teal é a voz primária e pode cobrir 30–60% de uma superfície (hero, footer, CTA). O sage é raro e pontual — o seu valor está na escassez.

## 3. Typography

**Display / Body / Label Font:** Space Grotesk (fallback: ui-sans-serif, system-ui, sans-serif)

**Character:** uma única família geométrica, moderna mas sóbria — clínica sem ser fria. A hierarquia faz-se pelo peso e tamanho, nunca por uma segunda fonte. Sem serifas, sem pares de fontes.

### Hierarchy
- **Display** (600, clamp(2.25rem, 5vw, 3rem), 1.1, tracking -0.02em): H1 de página e hero. Teto ≤ 3rem; nunca grita.
- **Headline** (600, clamp(1.5rem, 3vw, 1.875rem), 1.2): títulos de secção (H2).
- **Title** (600, 1.25rem, 1.3): subtítulos (H3), nomes de cards.
- **Body** (400, 1rem, 1.7): corpo clínico. Comprimento de linha limitado a **~68ch**.
- **Label** (600, 0.75rem, tracking 0.14em): kicker/eyebrow discreto. **Uso disciplinado** — ver regra.

### Named Rules
**A Regra da Família Única.** Uma só família (Space Grotesk) em múltiplos pesos (300–700). Nunca emparelhar com uma segunda sans geométrica.

**A Regra do Kicker Contido.** O label em maiúsculas com tracking é voz quando é raro e nomeado. Um eyebrow acima de *cada* secção é gramática de AI — proibido. Variar a cadência: nem toda a secção precisa de kicker.

## 4. Elevation

Sistema **plano por omissão**. A profundidade vem de blocos de cor (faixas teal/sage de largura total), bordas de 1px e contraste de fundo (branco sobre #f6f9f5) — não de sombras. As superfícies estão planas em repouso; o movimento de profundidade é a exceção, não a regra.

### Shadow Vocabulary
- **Dropdown flutuante** (`box-shadow: 0 10px 15px -3px rgba(3,87,114,0.10)`): única sombra real do sistema, no menu dropdown da navegação, para o separar do conteúdo por baixo.

### Named Rules
**A Regra do Plano-por-Omissão.** Cartões e secções são planos. A separação faz-se por borda (#eaede9) e por fundo, não por sombra. Sombra só quando algo flutua mesmo sobre outra coisa (dropdown, modal).

## 5. Components

### Buttons
- **Shape:** cantos quase retos (3px) — sóbrios, clínicos.
- **Primary:** fundo Teal Profundo (#035772), texto branco, padding 8–12px / 16–28px. Hover → Teal Escuro (#034459).
- **On-teal (inverso):** sobre fundos teal, botão branco com texto teal; hover → cinza pálido.
- **Outline:** borda branca translúcida sobre o hero teal; hover preenche a 10%.

### Cards / Containers
- **Corner Style:** 8px (rounded-lg) para cartões de conteúdo e imagens; 6px (rounded-md) para campos.
- **Background:** branco sobre o fundo #f6f9f5; cards neutros podem usar cinza pálido.
- **Shadow Strategy:** nenhuma em repouso (ver Elevation).
- **Border:** 1px #eaede9; no hover passa a Teal Claro (#7daab9).
- **Internal Padding:** 20px (md).

### Inputs / Fields
- **Style:** fundo branco, borda 1px #eaede9, 6px de raio.
- **Focus:** borda passa a teal-main; outline visível teal a 2px (focus-visible global).

### Navigation
- **Style:** barra sticky, fundo #f6f9f5 a 95% com leve blur, borda inferior teal a 12%.
- **Links:** texto tinta, hover teal-main. Dropdowns por grupo (Gonalgia / Meniscos / Cirurgia).
- **Mobile:** hambúrguer com drawer lateral e acordeões por grupo.

### Cartões de Subpatologia (signature)
Grelha de cartões que ligam uma patologia à sua página (ex.: na Gonalgia → Cartilagem, Prótese, Artrocentese). Título teal, descrição curta, "Saber mais →". É o "mapa" do North Star em forma de componente.

### FAQ Acordeão (signature)
Perguntas frequentes como `<details>` nativos — sem JS, acessíveis. Pergunta em peso médio, "+" teal que roda ao abrir.

## 6. Do's and Don'ts

### Do:
- **Do** educar primeiro: a página responde à pergunta do doente antes de qualquer CTA.
- **Do** manter superfícies planas com bordas de 1px (#eaede9) e blocos de cor para profundidade.
- **Do** limitar o corpo a ~68ch e usar a tinta (#091405) para texto legível.
- **Do** usar o teal (#035772) como voz comprometida e o sage (#aacba8) como acento raro e humano.
- **Do** assumir a incerteza clínica com honestidade (ex.: aspas em «regenerativa»).

### Don't:
- **Don't** usar o cinza médio (#949593) para texto de corpo sobre o fundo (#f6f9f5) — falha o contraste 4,5:1.
- **Don't** usar barras laterais de cor (`border-left` > 1px) em títulos, cards ou callouts — reescrever com borda completa, fundo tingido ou número/ícone à frente.
- **Don't** colocar um eyebrow em maiúsculas com tracking acima de *cada* secção — é a gramática de AI; variar a cadência.
- **Don't** cair na clínica genérica de stock ("o melhor", "vanguarda", fotos de banco) nem no marketing agressivo / over-claiming.
- **Don't** adotar o look AI/SaaS (fundo creme, grelhas de cards idênticas, hero de número gigante) nem o hospital frio e burocrático.
- **Don't** usar gradient text, glassmorphism decorativo ou sombras pesadas para fingir profundidade.
