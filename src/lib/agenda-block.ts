// Períodos em que a agenda está FECHADA (férias/ausências).
// Editar aqui para ligar/desligar bloqueios. Datas ISO (YYYY-MM-DD), inclusivas.
export type BlockTipo = 'Presencial' | 'Vídeo' | 'all';

export const AGENDA_BLOCKS: { from: string; to: string; tipo: BlockTipo; motivo: string }[] = [
  // Férias de agosto — sem consultas presenciais (vídeo mantém-se)
  { from: '2026-08-15', to: '2026-08-29', tipo: 'Presencial', motivo: 'ferias' },
];

// Devolve o bloqueio aplicável a (data, tipo), ou null se disponível.
export function agendaBlock(dateISO: string, tipo: 'Presencial' | 'Vídeo') {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) return null;
  for (const b of AGENDA_BLOCKS) {
    if (dateISO >= b.from && dateISO <= b.to && (b.tipo === 'all' || b.tipo === tipo)) return b;
  }
  return null;
}
