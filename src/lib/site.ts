// Fonte única de verdade do site consultajoelho.pt.
// Usado por Nav, Footer, RelatedPages, sitemap e schema markup.

export const site = {
  name: "ConsultaJoelho.pt",
  domain: "consultajoelho.pt",
  url: "https://www.consultajoelho.pt",
  doctor: "Dr. Nuno Camelo",
  role: "Cirurgião de Joelho",
  phone: "926 850 194",
  phoneHref: "tel:+351926850194",
  email: "joelho@consultajoelho.pt",
  emailHref: "mailto:joelho@consultajoelho.pt",
  region: "Porto, Norte de Portugal",
} as const;

export type Location = {
  name: string;
  address: string;
  contact?: string;
};

export const locations: Location[] = [
  {
    name: "Hospital Lusíadas Porto",
    address: "Av. da Boavista 171, 4050-115 Porto",
    contact: site.phone,
  },
  {
    name: "Hospital Misericórdia Vila do Conde",
    address: "R. da Misericórdia, 4480-756 Vila do Conde",
    contact: site.phone,
  },
  {
    name: "Hospital Lusíadas Paços de Ferreira",
    address: "Paços de Ferreira, Porto",
    contact: site.phone,
  },
];

// ── Registo de páginas ─────────────────────────────────────────
// slug = caminho da rota (sem barra). label = texto curto para nav/links.
// blurb = uma frase para RelatedPages / cards.
export type PageMeta = {
  slug: string;
  label: string;
  blurb: string;
  lang?: "pt" | "en";
};

export const pages = {
  joelhodrnunocamelo: {
    slug: "joelhodrnunocamelo",
    label: "Dor no Joelho",
    blurb: "As causas mais frequentes de gonalgia e como se chega ao diagnóstico certo.",
  },
  cartilagemjoelhodrnunocamelo: {
    slug: "cartilagemjoelhodrnunocamelo",
    label: "Cartilagem",
    blurb: "Lesões da cartilagem articular: classificação e opções de tratamento.",
  },
  protesejoelhodesportodrnunocamelo: {
    slug: "protesejoelhodesportodrnunocamelo",
    label: "Prótese do Joelho",
    blurb: "Quando a artroplastia é a decisão certa e o que esperar da recuperação.",
  },
  quistobakerjoelhodrnunocamelo: {
    slug: "quistobakerjoelhodrnunocamelo",
    label: "Quisto de Baker",
    blurb: "Quase sempre o sintoma de outro problema no joelho.",
  },
  "liquidojoelho-artrocentese-drnunocamelo": {
    slug: "liquidojoelho-artrocentese-drnunocamelo",
    label: "Artrocentese",
    blurb: "Drenagem de líquido sinovial: diagnóstica e terapêutica.",
  },
  infiltracaojoelho: {
    slug: "infiltracaojoelho",
    label: "Infiltrações",
    blurb: "«Regenerativas» vs. não-regenerativas: o que a evidência mostra.",
  },
  quistosparameniscaisjoelho: {
    slug: "quistosparameniscaisjoelho",
    label: "Quistos Parameniscais",
    blurb: "Associados quase sempre a rotura do menisco subjacente.",
  },
  sindromebandailiotibialjoelho: {
    slug: "sindromebandailiotibialjoelho",
    label: "Síndrome Banda Iliotibial",
    blurb: "A causa mais frequente de dor lateral no joelho em corredores.",
  },
  "tendao-rotuliano-tendinite-drnunocamelo": {
    slug: "tendao-rotuliano-tendinite-drnunocamelo",
    label: "Tendinopatia Rotuliana",
    blurb: "Dor no tendão rotuliano: do tratamento conservador à cirurgia.",
  },
  "entorsejoelho-drnunocamelo": {
    slug: "entorsejoelho-drnunocamelo",
    label: "Entorse do Joelho",
    blurb: "Nem toda a entorse é grave — mas algumas escondem lesões.",
  },
  meniscosnojoelho: {
    slug: "meniscosnojoelho",
    label: "Meniscos",
    blurb: "Suturar ou remover? O menisco tem função e deve preservar-se.",
  },
  ligamentocruzadoanterior: {
    slug: "ligamentocruzadoanterior",
    label: "LCA — Ligamento Cruzado Anterior",
    blurb: "Rotura do ligamento cruzado anterior: o que acontece a seguir.",
  },
  luxacaorotulajoelho: {
    slug: "luxacaorotulajoelho",
    label: "Luxação da Rótula",
    blurb: "A primeira luxação pode tratar-se sem cirurgia; a recorrência não.",
  },
  quadricepsjoelho: {
    slug: "quadricepsjoelho",
    label: "Quadricípite e Cirurgia",
    blurb: "O músculo mais importante para a função do joelho.",
  },
  cirurgiadojoelhoeagora: {
    slug: "cirurgiadojoelhoeagora",
    label: "Preparar a Cirurgia",
    blurb: "Uma cirurgia bem preparada é metade da recuperação.",
  },
  medocirurgiajoelho: {
    slug: "medocirurgiajoelho",
    label: "Medo da Cirurgia",
    blurb: "É normal ter receio. As perguntas certas ajudam a decidir.",
  },
  recuperarcirurgiajoelho: {
    slug: "recuperarcirurgiajoelho",
    label: "Recuperar da Cirurgia",
    blurb: "A reabilitação começa antes de sair da sala de operações.",
  },
  sigic: {
    slug: "sigic",
    label: "SIGIC",
    blurb: "Cirurgia ao joelho pelo SNS, no hospital que escolher.",
  },
  kneesurgeryinportugalprices: {
    slug: "kneesurgeryinportugalprices",
    label: "Knee Surgery Prices",
    blurb: "Specialist knee care in Porto at a fraction of UK or Irish prices.",
    lang: "en",
  },
  avaliarjoelho: {
    slug: "avaliarjoelho",
    label: "Avaliar o seu Joelho",
    blurb: "Uma ferramenta de orientação de sintomas — não substitui a consulta.",
  },
  "nuno-camelo-especialista-cirurgia-joelho": {
    slug: "nuno-camelo-especialista-cirurgia-joelho",
    label: "Dr. Nuno Camelo",
    blurb: "Prática exclusivamente dedicada ao joelho. Sem dispersão.",
  },
  actividadecientificajoelho: {
    slug: "actividadecientificajoelho",
    label: "Actividade Científica",
    blurb: "A prática clínica informada pela investigação.",
  },
  agendamentonunocameloespecialistajoelho: {
    slug: "agendamentonunocameloespecialistajoelho",
    label: "Agendar",
    blurb: "Marcar consulta. Resposta em menos de 24 horas.",
  },
  "prevencao-do-joelho": {
    slug: "prevencao-do-joelho",
    label: "Prevenção",
    blurb: "A maioria das lesões do joelho é prevenível.",
  },
} satisfies Record<string, PageMeta>;

export type PageSlug = keyof typeof pages;

export const allSlugs = Object.keys(pages) as PageSlug[];

export function href(slug: PageSlug): string {
  return `/${slug}`;
}

export function page(slug: PageSlug): PageMeta {
  return pages[slug];
}

// ── Estrutura da navegação ─────────────────────────────────────
export type NavItem = { label: string; slug: PageSlug };
export type NavGroup = { label: string; items: NavItem[] };

const item = (slug: PageSlug, label?: string): NavItem => ({
  slug,
  label: label ?? pages[slug].label,
});

export const navGroups: NavGroup[] = [
  {
    label: "Gonalgia",
    items: [
      item("joelhodrnunocamelo"),
      item("cartilagemjoelhodrnunocamelo"),
      item("protesejoelhodesportodrnunocamelo"),
      item("quistobakerjoelhodrnunocamelo"),
      item("liquidojoelho-artrocentese-drnunocamelo"),
      item("infiltracaojoelho"),
      item("quistosparameniscaisjoelho"),
      item("sindromebandailiotibialjoelho"),
      item("tendao-rotuliano-tendinite-drnunocamelo"),
    ],
  },
  {
    label: "Meniscos e Ligamentos",
    items: [
      item("entorsejoelho-drnunocamelo"),
      item("meniscosnojoelho"),
      item("ligamentocruzadoanterior"),
      item("luxacaorotulajoelho"),
    ],
  },
  {
    label: "Cirurgia",
    items: [
      item("quadricepsjoelho"),
      item("cirurgiadojoelhoeagora"),
      item("medocirurgiajoelho"),
      item("recuperarcirurgiajoelho"),
      item("sigic"),
      item("avaliarjoelho"),
    ],
  },
];

export const primaryNav = {
  doctorSlug: "nuno-camelo-especialista-cirurgia-joelho" as PageSlug,
  bookingSlug: "contacto" as PageSlug,
};
