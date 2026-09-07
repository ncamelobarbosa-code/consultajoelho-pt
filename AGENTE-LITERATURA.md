# Agente de literatura — runbook mensal

Uma vez por mês este agente procura literatura nova sobre patologia do joelho,
propõe referências e FAQ para três páginas, e abre um PR. **Nada é publicado sem
o Dr. Nuno aprovar o merge.**

Quem executa isto é uma sessão nova, sem memória das anteriores. Este ficheiro é a
única fonte de verdade. Segue-o por ordem.

---

## 0. Regra que não se quebra

**Nunca editar `src/app/**/page.tsx` para acrescentar conteúdo.**

Essas páginas guardam o conteúdo dentro de strings JS escapadas
(`const html = "\n<section..."`, `const jsonLd = "{...}"`). Um escape mal fechado
parte o build de todo o site e o Vercel publica a última versão boa — ou nada.

Todo o conteúdo novo entra por `content/evidencia/<slug>.json`. É JSON puro,
o diff do PR fica legível, e `scripts/evidencia-validate.mjs` apanha erros antes
do build. A única alteração alguma vez feita a uma `page.tsx` é a ligação inicial
do componente, e essa é feita uma vez por página (ver secção 6).

---

## 1. Que páginas revejo este mês

```bash
node scripts/lit-rotacao.mjs
```

Devolve três páginas, com o tema e a query PubMed de partida. A rotação é
derivada da data — não há ficheiro de estado, e correr duas vezes no mesmo mês dá
o mesmo resultado. Ciclo completo das 12 páginas a cada 4 meses.

---

## 2. Procurar

Ferramenta: **PubMed MCP** (`search_articles` → `get_article_metadata`).

Para cada página, correr a query da rotação com estes limites:

- `date_from` = primeiro dia de **há 14 meses**; `date_to` = hoje.
  (14 e não 12: a indexação do PubMed atrasa, e assim nada cai no intervalo entre
  execuções.)
- Filtro de tipo, colado à query:
  `AND (meta-analysis[Publication Type] OR systematic review[Publication Type] OR randomized controlled trial[Publication Type] OR practice guideline[Publication Type])`
- `sort: pub_date`, `max_results: 25`.

Depois puxar metadados dos ~8 candidatos mais promissores por página. Não puxar
os 25 — o custo é alto e a maioria é descartada na secção seguinte.

### Filtro de qualidade (o que Nuno escolheu)

Aceitar **só** alto nível: meta-análises, revisões sistemáticas, ensaios
aleatorizados e normas de sociedades (ESSKA, AAOS, ISAKOS, NICE, EULAR).
Coortes, séries de casos e estudos observacionais **não entram**.

### Rejeitar sempre, sem excepção

O filtro de tipo de publicação do PubMed deixa passar muito lixo. Verificar os
metadados de cada candidato e descartar se:

- **`mesh_terms` contém `Animals`, `Dogs`, `Rats`, `Rabbits`, `Cadaver`.**
  A query "cruciate ligament" apanha medicina veterinária todos os meses.
- **É anatomia, morfometria, biomecânica de bancada ou modelação.** Não muda nada
  para o doente que lê a página.
- **É sobre a anca, ombro, tornozelo ou coluna**, com o joelho como comparador.
- **O desfecho não interessa a um doente**: custo-efectividade para o pagador,
  técnica de imagem, validação de escalas, bibliometria.
- **Revista predatória ou sem indexação credível.** Na dúvida, fora.
- **Já está em `content/evidencia/<slug>.json`.** Verificar o `pmid` antes de
  propor — repetir uma referência é o erro mais provável deste agente.

### Preferir

Journals de referência da especialidade: *AJSM*, *KSSTA*, *JBJS*, *Arthroscopy*,
*BJSM*, *J ISAKOS*, *The Knee*, *Osteoarthritis and Cartilage*, *Br J Sports Med*.
Um estudo mediano numa destas vale mais do que um estudo brilhante numa revista
que ninguém conhece — porque a página é lida por doentes e por colegas.

**Alvo: 3 a 5 referências novas por página.** Se depois do filtro só sobrarem
duas boas, propor duas. Um mês magro é um resultado legítimo; encher com estudos
fracos é que não.

---

## 3. Escrever

Para cada página, atualizar `content/evidencia/<slug>.json`. Formato completo em
`content/evidencia/_README.md`.

### `resumoPt` de cada referência

1 a 2 frases, **português de Portugal**, escritas para o doente e não para o
colega. Incluir o número que interessa (quantos doentes, que diferença) e a
limitação, se a houver. Comparar com os exemplos já em `lca.json` antes de
escrever os primeiros.

### As perguntas da FAQ

Uma por referência, no máximo. Boas perguntas para esta secção:

- São a pergunta que o doente faz em consulta, com as palavras dele
  («vou ficar com a perna dormente?»), não o título do estudo traduzido.
- Respondem em 3 a 6 frases. Menos do que isso não vale nada; mais e ninguém lê.
- Dizem o que a evidência mostra **e** o que ela não mostra. «Os autores avisam
  que os estudos são heterogéneos» é exactamente o registo certo.

### Registo clínico — o que nunca fazer

- **Nunca prometer resultados.** «associa-se a menos re-roturas» sim;
  «reduz as re-roturas» não.
- **Nunca transformar um estudo em indicação cirúrgica.** Toda a resposta que
  toque em decisão terapêutica fecha a remeter para a avaliação individual.
- **Nunca inventar um número** que não esteja no abstract. Se não está lá, a frase
  fica sem número.
- **Nunca citar um estudo cujo abstract não foi lido.** O título engana.
- Não usar «comprovado», «garantido», «a melhor técnica», «revolucionário».

### Confirmar antes de gravar

`doi` e `pmid` copiados **dos metadados do PubMed**, nunca de memória. Um DOI
inventado passa a validação de formato e só é apanhado quando alguém clica.

---

## 4. Artigo mensal de novidades

Além das três páginas, escrever um artigo curto (600–900 palavras) em
`content/novidades/AAAA-MM.md`, com o que de mais relevante saiu no mês. Serve de
conteúdo fresco recorrente e reaproveita a pesquisa já feita.

Frontmatter obrigatório: `titulo`, `data`, `resumo`, `slugsRelacionados`.
Ligar cada afirmação às referências já postas nos JSON — o artigo não introduz
referências que não estejam numa página.

> A rota `/novidades` ainda não existe. Enquanto não existir, o ficheiro fica
> escrito em `content/novidades/` e o PR menciona-o; não bloquear o resto por isto.

---

## 5. Validar — obrigatório antes do PR

```bash
node scripts/evidencia-validate.mjs   # refs órfãos, DOI mal formado, ids duplicados
npm run build                          # tem de passar; é o que o Vercel vai correr
```

Se o build falhar, **corrigir antes de abrir o PR**. Um PR que não compila faz
o Dr. Nuno perder a revisão toda.

---

## 6. Ligar uma página nova (só na primeira vez)

Se `<slug>` ainda não tem o componente ligado, são três alterações mínimas em
`src/app/<slug>/page.tsx` — e mais nenhuma:

```diff
+import Evidencia from "@/components/Evidencia";
...
-      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
       <div dangerouslySetInnerHTML={{ __html: html }} />
+      <Evidencia slug="<slug>" pageUrl="https://www.consultajoelho.pt/<slug>" baseJsonLd={jsonLd} />
```

E registar o import do JSON em `src/lib/evidencia.ts`.

Porquê remover a linha do `<script>`: o componente **funde-se** no JSON-LD
existente e emite um bloco único. Se a linha ficar, a página passa a ter dois nós
`MedicalWebPage` e dois `FAQPage` — ambíguo para o Google. Confirmar depois do
build que `.next/server/app/<slug>.html` só tem **um** `application/ld+json`.

---

## 7. Abrir o PR

Branch: `literatura/AAAA-MM`. Commits separados por página, para a revisão poder
ser parcial.

O corpo do PR é o que o Dr. Nuno vai ler no telemóvel. Estrutura:

```markdown
## Literatura de <mês> — <slug1>, <slug2>, <slug3>

### /<slug> — N referências novas
| Estudo | Tipo | n | O que muda na página |
|---|---|---|---|
| Autor et al., Revista 2026 [DOI](https://doi.org/...) | Meta-análise | 407 | Nova FAQ sobre enxerto de peroneal |

**Precisa da tua validação clínica:** <a afirmação concreta que o agente não se
sente à vontade para publicar sozinho, ou "nada">

### Rejeitados que talvez queiras ver
<1–3 estudos descartados que um cirurgião podia querer ler, com o motivo>

---
Build: ✅  ·  Validação: ✅  ·  Um bloco JSON-LD por página: ✅
```

A secção **"Precisa da tua validação clínica"** não é decorativa. Sempre que uma
afirmação toque em indicação cirúrgica, num número que contrarie o texto já
publicado, ou numa técnica que o Dr. Nuno usa, vai para ali — mesmo que a
referência seja sólida.

Depois de abrir: enviar email ao Dr. Nuno com título, link do PR e as três
páginas tocadas. Nada mais — o detalhe está no PR.

---

## 8. Se não houver acesso de escrita ao GitHub

Acontece quando a sessão não tem o repo autorizado. Não desistir da execução:

1. Guardar a proposta como doc do projeto Claude «Consultajoelho.pt», em
   `claude/literatura-AAAA-MM.md`, com o conteúdo integral dos JSON.
2. Enviar email ao Dr. Nuno a dizer que o PR não pôde ser aberto e porquê.
3. Não tentar mais do que duas vezes.

---

## Páginas que já têm referências feitas à mão

Antes desta camada existir, algumas páginas receberam secções de "Referências" e
"O que diz a evidência" escritas **dentro** das strings `html` e `jsonLd` da
própria `page.tsx`:

- `/infiltracoes` — McAlindon JAMA 2017, Bensa AJSM 2025, Belk AJSM 2020
- `/artroscopia` — Moseley NEJM 2002, Siemieniuk BMJ 2017, ESSKA menisco

**Não as apagues nem as migres** — funcionam, e mexer nessas strings é
exactamente o risco que esta camada existe para evitar. Mas antes de propor
referências para estas duas páginas (o `/infiltracoes` entra no grupo B), lê o
que já lá está e não repitas o mesmo estudo. O bloco novo aparece por baixo do
antigo; se o conteúdo ficar redundante, diz isso no PR e deixa o Dr. Nuno decidir
se quer consolidar.

## Notas de contexto que poupam tempo à próxima sessão

- **O rich snippet de FAQ do Google já quase não aparece.** Desde 2023 está
  reservado a sites governamentais e de saúde reconhecidos. Estas FAQ valem pelo
  conteúdo na página, pelas citações em respostas de IA e pela profundidade
  temática — não por um snippet. Não prometer snippets ao Dr. Nuno.
- O que provavelmente vale mais aqui é o `MedicalWebPage` com `lastReviewed` e
  `reviewedBy`: é sinal E-E-A-T em conteúdo YMYL, e nenhum dos concorrentes
  locais o tem.
- O site tem PT, EN e RU. **Este agente só trata do PT.** Traduzir sem revisão
  clínica é risco a mais.
- A página `/actividadecientificajoelho` já lista a produção científica do próprio
  Dr. Nuno. Não misturar: aqui é literatura externa.
- Se um estudo novo **contradiz** o que a página já afirma, não corrigir o texto
  em silêncio. Sinalizar no PR, em "Precisa da tua validação clínica", e deixar a
  decisão ao Dr. Nuno.
