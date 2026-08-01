// Fonte única de verdade das regras de marcação: capacidade por período,
// férias (blackouts) e horário (dia da semana -> local por período).
//
// Importado nos DOIS lados:
//  - no cliente (MarcarConsultaClient) apenas para PREVIEW (mostrar local/vagas,
//    desativar datas de férias);
//  - na API (route.ts) para a VALIDAÇÃO REAL, que acontece sempre no servidor.
//
// Ficheiro puro (sem dependências de servidor) para poder ser importado por
// um componente 'use client' sem arrastar googleapis para o bundle.

export type Periodo = 'manha' | 'tarde';
export type Tipo = 'Presencial' | 'Vídeo';

// Capacidade por período (dia + período), contada de forma INDEPENDENTE por tipo:
// Presencial e Vídeo não competem entre si.
// Nota: a chave usa 'Video' (ASCII); no fio e na folha o tipo é 'Vídeo' (acentuado)
// — usar sempre capacidadeDe() para resolver a capacidade a partir do tipo real.
export const CAPACIDADE = { Presencial: 2, Video: 1 } as const;

// Períodos de indisponibilidade (férias, etc.). Datas ISO (YYYY-MM-DD),
// inclusivas nas DUAS pontas.
export const BLACKOUTS: { inicio: string; fim: string; motivo: string }[] = [
  { inicio: '2026-08-15', fim: '2026-08-28', motivo: 'Férias' },
];

// Dia da semana (1=Segunda … 5=Sexta) -> local por período.
export const HORARIO: Record<number, { manha?: string; tarde?: string }> = {
  1: { manha: 'Lusíadas Porto', tarde: 'Lusíadas Porto' },            // Segunda
  2: { manha: 'Lusíadas Paços de Ferreira' },                          // Terça
  3: { manha: 'Lusíadas Porto' },                                      // Quarta
  4: { manha: 'Lusíadas Paços de Ferreira', tarde: 'Lusíadas Porto' }, // Quinta
  5: { manha: 'Lusíadas Paços de Ferreira', tarde: 'Misericórdia de Vila do Conde' }, // Sexta
};

// Nomes dos dias da semana em PT (indexados 0=Dom … 6=Sáb) — gravados na
// coluna H da folha Marcacoes_Extra.
export const DIAS_NOME_PT = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

// Dia da semana determinístico. UTC ao meio-dia evita deslizes de fuso
// (no Vercel o servidor corre em UTC). 0=Dom … 6=Sáb.
export function weekdayOf(dataISO: string): number {
  return new Date(dataISO + 'T12:00:00Z').getUTCDay();
}

// Local atribuído a (data, período), ou null se não há consulta nesse dia/período.
export function getLocal(dataISO: string, periodo: Periodo): string | null {
  const disp = HORARIO[weekdayOf(dataISO)];
  if (!disp || !disp[periodo]) return null;
  return disp[periodo]!;
}

// Capacidade para um tipo, aceitando a forma acentuada ('Vídeo') usada no fio/folha.
export function capacidadeDe(tipo: string): number {
  const key: keyof typeof CAPACIDADE = tipo === 'Presencial' ? 'Presencial' : 'Video';
  return CAPACIDADE[key];
}

// Se a data cair dentro de um blackout (inclusive), devolve-o; senão null.
// Comparação lexicográfica de ISO YYYY-MM-DD == comparação cronológica.
export function blackoutDe(
  dataISO: string,
): { inicio: string; fim: string; motivo: string } | null {
  return BLACKOUTS.find((b) => dataISO >= b.inicio && dataISO <= b.fim) ?? null;
}

// Próxima data ÚTIL (Seg–Sex, com horário e fora de qualquer blackout)
// estritamente APÓS a data indicada. Usado para sugerir "a partir de …".
export function proximaDataUtil(aposISO: string): string {
  const d = new Date(aposISO + 'T12:00:00Z');
  for (let i = 0; i < 400; i++) {
    d.setUTCDate(d.getUTCDate() + 1);
    const iso = d.toISOString().slice(0, 10);
    const wd = d.getUTCDay();
    if (wd >= 1 && wd <= 5 && HORARIO[wd] && !blackoutDe(iso)) return iso;
  }
  return aposISO;
}
