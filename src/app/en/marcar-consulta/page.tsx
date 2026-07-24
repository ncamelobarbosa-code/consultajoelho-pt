import type { Metadata } from 'next';
import MarcarConsultaClient from '../../marcar-consulta/MarcarConsultaClient';

export const metadata: Metadata = {
  title: 'Book an Appointment | Consulta Joelho',
  description:
    'Book your knee appointment (in person or by video) with Dr. Nuno Camelo, or request a second opinion. Reply usually the same working day.',
  alternates: {
    canonical: 'https://www.consultajoelho.pt/en/marcar-consulta',
    languages: {
      'pt-PT': 'https://www.consultajoelho.pt/marcar-consulta',
      'en-GB': 'https://www.consultajoelho.pt/en/marcar-consulta',
      'ru-RU': 'https://www.consultajoelho.pt/ru/marcar-consulta',
      'x-default': 'https://www.consultajoelho.pt/marcar-consulta',
    },
  },
};

export default function MarcarConsultaEnPage() {
  return <MarcarConsultaClient lang="en" />;
}
