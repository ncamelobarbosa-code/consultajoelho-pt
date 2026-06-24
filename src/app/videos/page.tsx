import VideosGallery from "@/components/VideosGallery";

export const metadata = {
  title: "Vídeos — Cirurgia e Exame do Joelho | Dr. Nuno Camelo",
  description: "Vídeos de técnicas cirúrgicas, exame clínico e reabilitação do joelho, por Dr. Nuno Camelo Barbosa.",
  alternates: {
    canonical: "https://www.consultajoelho.pt/videos",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/videos",
      "en-GB": "https://www.consultajoelho.pt/en/videos",
      "ru-RU": "https://www.consultajoelho.pt/ru/videos",
      "x-default": "https://www.consultajoelho.pt/videos",
    },  },
};

export default function Page() {
  return <VideosGallery lang="pt" />;
}
