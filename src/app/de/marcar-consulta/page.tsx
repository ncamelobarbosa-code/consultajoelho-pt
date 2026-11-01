import type { Metadata } from 'next';
import MarcarConsultaClient from '../../marcar-consulta/MarcarConsultaClient';

export const metadata: Metadata = {
  title: 'Termin vereinbaren | Consulta Joelho',
  description:
    'Vereinbaren Sie Ihren Knie-Termin (Präsenz oder Video) mit Dr. Nuno Camelo oder fordern Sie eine Zweitmeinung an. Antwort meist noch am selben Werktag.',
  alternates: {
    canonical: 'https://www.consultajoelho.pt/de/marcar-consulta',
    languages: {
      'pt-PT': 'https://www.consultajoelho.pt/marcar-consulta',
      'en-GB': 'https://www.consultajoelho.pt/en/marcar-consulta',
      'ru-RU': 'https://www.consultajoelho.pt/ru/marcar-consulta',
      'de-DE': 'https://www.consultajoelho.pt/de/marcar-consulta',
      'fr-FR': 'https://www.consultajoelho.pt/fr/marcar-consulta',
      'x-default': 'https://www.consultajoelho.pt/marcar-consulta',
    },
  },
};

export default function MarcarConsultaDePage() {
  return <MarcarConsultaClient lang="de" />;
}
