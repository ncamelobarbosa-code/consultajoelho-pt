import VideosGallery from "@/components/VideosGallery";

export const metadata = {
  title: "Videos — Knee Surgery and Examination | Dr. Nuno Camelo",
  description: "Videos of surgical techniques, clinical examination and knee rehabilitation, by Dr. Nuno Camelo Barbosa.",
  alternates: {
    canonical: "https://www.consultajoelho.pt/en/videos",
    languages: {
      "pt-PT": "https://www.consultajoelho.pt/videos",
      "en-GB": "https://www.consultajoelho.pt/en/videos",
      "ru-RU": "https://www.consultajoelho.pt/ru/videos",
      "x-default": "https://www.consultajoelho.pt/videos",
    },  },
};

export default function Page() {
  return <VideosGallery lang="en" />;
}
