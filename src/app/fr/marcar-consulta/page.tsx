import type { Metadata } from 'next';
import MarcarConsultaClient from '../../marcar-consulta/MarcarConsultaClient';

export const metadata: Metadata = {
  title: 'Prendre rendez-vous | Consulta Joelho',
  description:
    'Prenez votre rendez-vous pour le genou (en présentiel ou en vidéo) avec le Dr. Nuno Camelo, ou demandez un deuxième avis. Réponse généralement le jour ouvré même.',
  alternates: {
    canonical: 'https://www.consultajoelho.pt/fr/marcar-consulta',
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

export default function MarcarConsultaFrPage() {
  return <MarcarConsultaClient lang="fr" />;
}
