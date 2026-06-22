import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Book an Appointment | Consulta Joelho',
  description: 'Book your knee appointment with Dr. Nuno Camelo Barbosa. Reply usually the same working day.',
  alternates: {
    canonical: 'https://www.consultajoelho.pt/en/contacto',
    languages: {
      'pt-PT': 'https://www.consultajoelho.pt/contacto',
      'en-GB': 'https://www.consultajoelho.pt/en/contacto',
      'ru-RU': 'https://www.consultajoelho.pt/ru/contacto',
      'x-default': 'https://www.consultajoelho.pt/contacto',
    },
  },
};

export default function ContactoEnPage() {
  return <ContactForm lang="en" />;
}
