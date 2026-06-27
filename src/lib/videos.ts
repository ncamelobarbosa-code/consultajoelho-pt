// Config central de vídeos (YouTube). Usada por PageVideos (secção por página)
// e VideosGallery (página /videos). Títulos traduzidos PT/EN/RU.

export type Lang = "pt" | "en" | "ru";

export type Video = {
  id?: string; // ID do YouTube (se for vídeo do YouTube)
  src?: string; // URL de vídeo self-hosted (mp4 em /public) — alternativa ao YouTube
  short?: boolean; // Short vertical (9:16) vs vídeo normal (16:9)
  title: Record<Lang, string>;
};

export const VIDEOS: Record<string, Video> = {
  samba: {
    id: "Hy6dHWeQtLE",
    short: true,
    title: { pt: "SAMBBA — Reconstrução do LCA", en: "SAMBBA — ACL reconstruction", ru: "SAMBBA — реконструкция ПКС" },
  },
  rampaRotura: {
    id: "YQUTB6ys0ZI",
    short: true,
    title: { pt: "Rotura em rampa do menisco", en: "Meniscal ramp tear", ru: "Разрыв рампы мениска" },
  },
  rampaSutura: {
    id: "TZMlA4qxrlA",
    short: true,
    title: { pt: "Sutura da rampa meniscal", en: "Meniscal ramp repair", ru: "Шов рампы мениска" },
  },
  mmShort: {
    src: "/video/mm-short.mp4",
    short: true,
    title: { pt: "Menisco medial — artroscopia", en: "Medial meniscus — arthroscopy", ru: "Медиальный мениск — артроскопия" },
  },
  corpoLivre: {
    id: "R15thX-jAys",
    short: false,
    title: { pt: "Remoção de corpo livre", en: "Loose body removal", ru: "Удаление свободного тела" },
  },
  quad: {
    id: "upTOZr_nFjM",
    short: true,
    title: { pt: "Ativação do quadricípite", en: "Quadriceps activation", ru: "Активация квадрицепса" },
  },
  gaveta: {
    id: "OPTgIKDy9yQ",
    short: false,
    title: { pt: "Teste da gaveta posterior", en: "Posterior drawer test", ru: "Тест заднего выдвижного ящика" },
  },
  apresentacao: {
    id: "Vh1wpwR0XTM",
    short: false,
    title: { pt: "Dr. Nuno Camelo Barbosa", en: "Dr. Nuno Camelo Barbosa", ru: "Dr. Nuno Camelo Barbosa" },
  },
};

export const SECTION_HEADINGS = {
  surgical: { pt: "Vídeo Cirúrgico", en: "Surgical Video", ru: "Хирургическое видео" },
  consult: { pt: "Em Consulta", en: "In Consultation", ru: "На приёме" },
  presentation: { pt: "Apresentação", en: "Introduction", ru: "Презентация" },
} as const;

// slug da página ("" = homepage) -> secção de vídeo
export const PAGE_VIDEOS: Record<string, { heading: keyof typeof SECTION_HEADINGS; videos: string[] }> = {
  // homepage ("") sem secção de vídeo: o vídeo de apresentação é agora o fundo do hero.
  lca: { heading: "surgical", videos: ["samba"] },
  menisco: { heading: "surgical", videos: ["rampaRotura", "rampaSutura", "mmShort"] },
  cartilagem: { heading: "surgical", videos: ["corpoLivre"] },
  quadriceps: { heading: "consult", videos: ["quad"] },
};

// Galeria /videos por categoria
export const CATEGORIES: { key: string; label: Record<Lang, string>; videos: string[] }[] = [
  { key: "exam", label: { pt: "Exame Clínico", en: "Clinical Examination", ru: "Клинический осмотр" }, videos: ["gaveta"] },
  { key: "surgical", label: { pt: "Técnica Cirúrgica", en: "Surgical Technique", ru: "Хирургическая техника" }, videos: ["samba", "rampaRotura", "rampaSutura", "corpoLivre"] },
  { key: "rehab", label: { pt: "Reabilitação", en: "Rehabilitation", ru: "Реабилитация" }, videos: ["quad"] },
  { key: "presentation", label: { pt: "Apresentação", en: "Introduction", ru: "Презентация" }, videos: ["apresentacao"] },
];

export const VIDEOS_PAGE = {
  title: { pt: "Vídeos", en: "Videos", ru: "Видео" } as Record<Lang, string>,
  intro: {
    pt: "Técnicas cirúrgicas, exame clínico e reabilitação do joelho.",
    en: "Surgical techniques, clinical examination and knee rehabilitation.",
    ru: "Хирургические техники, клинический осмотр и реабилитация колена.",
  } as Record<Lang, string>,
};
