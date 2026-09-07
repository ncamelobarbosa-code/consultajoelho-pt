#!/usr/bin/env node
// Diz ao agente mensal que páginas revê este mês.
//
// A rotação é derivada da data, não guardada em ficheiro. Não há estado para
// dessincronizar quando um PR fica por aprovar, e duas execuções no mesmo mês dão
// sempre o mesmo resultado.
//
//   node scripts/lit-rotacao.mjs            # mês corrente
//   node scripts/lit-rotacao.mjs 2026-11    # mês específico
//   node scripts/lit-rotacao.mjs --json

// 12 páginas em 4 grupos de 3 → ciclo completo a cada 4 meses.
// Cada grupo mistura uma página de tráfego alto com duas de cauda longa, para que
// nenhum mês seja só trabalho de baixo retorno.
const GRUPOS = [
  {
    nome: "A — ligamento, menisco, artrose",
    paginas: [
      { slug: "lca", tema: "rotura do ligamento cruzado anterior", query: "anterior cruciate ligament AND (reconstruction OR rehabilitation OR return to sport OR lateral extra-articular OR graft)" },
      { slug: "menisco", tema: "lesões meniscais", query: "(meniscus OR meniscal) AND (tear OR repair OR meniscectomy OR root tear OR ramp lesion)" },
      { slug: "artrose", tema: "gonartrose", query: "knee osteoarthritis AND (exercise OR injection OR management OR weight loss OR osteotomy)" },
    ],
  },
  {
    nome: "B — cartilagem, prótese, infiltrações",
    paginas: [
      { slug: "cartilagem", tema: "lesões da cartilagem", query: "knee cartilage AND (chondral defect OR autologous chondrocyte OR microfracture OR osteochondral)" },
      { slug: "protese", tema: "artroplastia do joelho", query: "knee arthroplasty AND (outcome OR robotic OR unicompartmental OR alignment OR recovery)" },
      { slug: "infiltracoes", tema: "infiltrações do joelho", query: "knee AND (intra-articular injection OR corticosteroid OR hyaluronic acid OR platelet-rich plasma)" },
    ],
  },
  {
    nome: "C — tendinopatia, rótula, quadricípite",
    paginas: [
      { slug: "tendao-rotuliano-tendinite-drnunocamelo", tema: "tendinopatia rotuliana", query: "patellar tendinopathy AND (loading OR eccentric OR rehabilitation OR injection)" },
      { slug: "luxacao-rotula", tema: "instabilidade da rótula", query: "patellar (dislocation OR instability) AND (MPFL OR trochleoplasty OR tibial tubercle OR conservative)" },
      { slug: "quadriceps", tema: "inibição muscular artrogénica e quadricípite", query: "(arthrogenic muscle inhibition OR quadriceps weakness) AND knee AND (rehabilitation OR strength OR blood flow restriction)" },
    ],
  },
  {
    nome: "D — quistos e banda iliotibial",
    paginas: [
      { slug: "quisto-baker", tema: "quisto de Baker", query: "Baker cyst OR popliteal cyst AND knee" },
      { slug: "sindrome-banda-iliotibial", tema: "síndrome da banda iliotibial", query: "iliotibial band syndrome AND (running OR treatment OR rehabilitation)" },
      { slug: "quistos-parameniscais", tema: "quistos parameniscais", query: "parameniscal cyst OR meniscal cyst AND knee" },
    ],
  },
];

function grupoDe(ano, mes) {
  return GRUPOS[(ano * 12 + mes) % GRUPOS.length];
}

const arg = process.argv.slice(2).find((a) => /^\d{4}-\d{2}$/.test(a));
const json = process.argv.includes("--json");
const agora = new Date();
const [ano, mes] = arg
  ? arg.split("-").map(Number)
  : [agora.getUTCFullYear(), agora.getUTCMonth() + 1];

const g = grupoDe(ano, mes);

if (json) {
  console.log(JSON.stringify({ ano, mes, grupo: g.nome, paginas: g.paginas }, null, 2));
} else {
  console.log(`Rotação ${ano}-${String(mes).padStart(2, "0")} — Grupo ${g.nome}\n`);
  for (const p of g.paginas) {
    console.log(`  /${p.slug}`);
    console.log(`    tema:  ${p.tema}`);
    console.log(`    query: ${p.query}\n`);
  }
  const prox = grupoDe(ano, mes + 1);
  console.log(`Próximo mês: Grupo ${prox.nome}`);
}
