import type { Metadata } from 'next';
import MarcarConsultaClient from './MarcarConsultaClient';

export const metadata: Metadata = {
  title: 'Marcar Consulta | Consulta Joelho',
  description:
    'Marque a sua consulta de joelho (presencial ou por vídeo) com o Dr. Nuno Camelo, ou peça uma segunda opinião. Resposta no próprio dia útil.',
  alternates: {
    canonical: 'https://www.consultajoelho.pt/marcar-consulta',
    languages: {
      'pt-PT': 'https://www.consultajoelho.pt/marcar-consulta',
      'en-GB': 'https://www.consultajoelho.pt/en/marcar-consulta',
      'ru-RU': 'https://www.consultajoelho.pt/ru/marcar-consulta',
      'x-default': 'https://www.consultajoelho.pt/marcar-consulta',
    },
  },
};

export default function MarcarConsultaPage() {
  return <MarcarConsultaClient lang="pt" />;
}
