import type { Metadata } from 'next';
import MarcarConsultaClient from './MarcarConsultaClient';

export const metadata: Metadata = {
  title: 'Marcar Consulta Extra | Consulta Joelho',
  description:
    'Marque uma consulta extra (presencial ou por vídeo) com o Dr. Nuno Camelo. Escolha a data e o local é atribuído automaticamente.',
  robots: { index: false, follow: false },
};

export default function MarcarConsultaPage() {
  return <MarcarConsultaClient />;
}
