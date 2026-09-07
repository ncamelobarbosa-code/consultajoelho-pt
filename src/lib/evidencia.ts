// Camada de evidência científica — atualizada mensalmente pelo agente de literatura.
//
// PORQUÊ ESTE FICHEIRO EXISTE
// O conteúdo das páginas de patologia vive dentro de strings JS escapadas
// (`const html = "..."`, `const jsonLd = "..."`). Editar essas strings à mão — ou por
// agente — é frágil: um escape mal fechado parte o build inteiro.
// Esta camada isola as referências e as FAQ novas em JSON puro. O agente mensal só
// escreve JSON; nunca toca nas strings. O diff do PR fica legível e o build é seguro.
//
// Ver AGENTE-LITERATURA.md para o runbook completo.

import lca from "../../content/evidencia/lca.json";
import menisco from "../../content/evidencia/menisco.json";
import artrose from "../../content/evidencia/artrose.json";
import cartilagem from "../../content/evidencia/cartilagem.json";
import protese from "../../content/evidencia/protese.json";
import infiltracoes from "../../content/evidencia/infiltracoes.json";

export type NivelEvidencia =
  | "Meta-análise"
  | "Revisão sistemática"
  | "Ensaio clínico aleatorizado"
  | "Norma de orientação clínica"
  | "Consenso de peritos";

export type Referencia = {
  /** Chave estável usada pelas FAQ para citar esta referência. Nunca reutilizar. */
  id: string;
  autores: string;
  titulo: string;
  revista: string;
  ano: number;
  tipo: NivelEvidencia;
  pmid?: string;
  doi?: string;
  /** 1–2 frases em português, para o doente. Não é o abstract traduzido. */
  resumoPt: string;
};

export type FaqEvidencia = {
  pergunta: string;
  resposta: string;
  /** ids de `referencias` que sustentam a resposta. */
  refs: string[];
};

export type Evidencia = {
  slug: string;
  /** ISO date da última revisão clínica humana. Alimenta `lastReviewed` do schema. */
  atualizado: string;
  revistoPor: string;
  referencias: Referencia[];
  faq: FaqEvidencia[];
};

const registo: Record<string, Evidencia> = {
  lca: lca as Evidencia,
  menisco: menisco as Evidencia,
  artrose: artrose as Evidencia,
  cartilagem: cartilagem as Evidencia,
  protese: protese as Evidencia,
  infiltracoes: infiltracoes as Evidencia,
};

export function getEvidencia(slug: string): Evidencia | null {
  return registo[slug] ?? null;
}

export function slugsComEvidencia(): string[] {
  return Object.keys(registo);
}

export function pubmedUrl(ref: Referencia): string | null {
  if (ref.doi) return `https://doi.org/${ref.doi}`;
  if (ref.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`;
  return null;
}
