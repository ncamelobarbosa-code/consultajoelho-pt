import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Book an Appointment | Consulta Joelho',
  description: 'Book your knee appointment with Dr. Nuno Camelo Barbosa. Reply usually the same working day.',
  alternates: { canonical: 'https://www.consultajoelho.pt/en/contacto' },
};

export default function ContactoEnPage() {
  return <ContactForm lang="en" />;
}
