import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Marcar Consulta | Consulta Joelho',
  description: 'Marque a sua consulta de joelho com o Dr. Nuno Camelo Barbosa. Resposta no próprio dia útil.',
  alternates: {
    canonical: 'https://www.consultajoelho.pt/contacto',
    languages: {
      'pt-PT': 'https://www.consultajoelho.pt/contacto',
      'en-GB': 'https://www.consultajoelho.pt/en/contacto',
      'ru-RU': 'https://www.consultajoelho.pt/ru/contacto',
      'x-default': 'https://www.consultajoelho.pt/contacto',
    },
  },
};

export default function ContactoPage() {
  return <ContactForm />;
}
