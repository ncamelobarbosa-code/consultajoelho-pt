import VideosGallery from "@/components/VideosGallery";

export const metadata = {
  title: "Видео — хирургия и осмотр коленного сустава | Dr. Nuno Camelo",
  description: "Видео хирургических техник, клинического осмотра и реабилитации коленного сустава, д-р Nuno Camelo Barbosa.",
  alternates: {
    canonical: "https://www.consultajoelho.pt/ru/videos",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/videos",
      "en-GB": "https://www.consultajoelho.pt/en/videos",
      "ru-RU": "https://www.consultajoelho.pt/ru/videos",
      "x-default": "https://www.consultajoelho.pt/videos",
    },  },
};

export default function Page() {
  return <VideosGallery lang="ru" />;
}
