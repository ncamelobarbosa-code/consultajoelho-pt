import type { Metadata } from "next";
import { site } from "./site";

// Gera metadata consistente por página.
// O título recebe automaticamente o sufixo "| Dr. Nuno Camelo Porto"
// via o template definido em layout.tsx, por isso aqui passa-se só a keyword.
export function seo({
  title,
  description,
  slug,
  locale = "pt_PT",
}: {
  title: string;
  description: string;
  slug: string;
  locale?: "pt_PT" | "en_GB";
}): Metadata {
  const url = `${site.url}/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      type: "article",
      locale,
      url,
      siteName: site.name,
      title: `${title} | Dr. Nuno Camelo Porto`,
      description,
    },
  };
}

// Schema MedicalWebPage para páginas clínicas.
export function medicalWebPageSchema({
  title,
  description,
  slug,
  condition,
}: {
  title: string;
  description: string;
  slug: string;
  condition?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description,
    url: `${site.url}/${slug}`,
    inLanguage: "pt-PT",
    author: { "@type": "Physician", name: site.doctor },
    ...(condition && {
      about: { "@type": "MedicalCondition", name: condition },
    }),
  };
}
