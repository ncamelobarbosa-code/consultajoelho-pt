import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Записаться на приём | Consulta Joelho',
  description: 'Запишитесь на приём к врачу-ортопеду, специалисту по коленному суставу, д-ру Nuno Camelo Barbosa. Ответ обычно в тот же рабочий день.',
  alternates: {
    canonical: 'https://www.consultajoelho.pt/ru/contacto',
    languages: {
      'pt-PT': 'https://www.consultajoelho.pt/contacto',
      'en-GB': 'https://www.consultajoelho.pt/en/contacto',
      'ru-RU': 'https://www.consultajoelho.pt/ru/contacto',
      'x-default': 'https://www.consultajoelho.pt/contacto',
    },
  },
};

export default function ContactoRuPage() {
  return <ContactForm lang="ru" />;
}
