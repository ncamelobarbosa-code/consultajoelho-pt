import type { Metadata } from 'next';
import MarcarConsultaClient from '../../marcar-consulta/MarcarConsultaClient';

export const metadata: Metadata = {
  title: 'Записаться на приём | Consulta Joelho',
  description:
    'Запишитесь на приём к д-ру Нуну Камелу (очно или по видео) или запросите второе мнение. Ответ обычно в тот же рабочий день.',
  alternates: {
    canonical: 'https://www.consultajoelho.pt/ru/marcar-consulta',
    languages: {
      'pt-PT': 'https://www.consultajoelho.pt/marcar-consulta',
      'en-GB': 'https://www.consultajoelho.pt/en/marcar-consulta',
      'ru-RU': 'https://www.consultajoelho.pt/ru/marcar-consulta',
      'x-default': 'https://www.consultajoelho.pt/marcar-consulta',
    },
  },
};

export default function MarcarConsultaRuPage() {
  return <MarcarConsultaClient lang="ru" />;
}
