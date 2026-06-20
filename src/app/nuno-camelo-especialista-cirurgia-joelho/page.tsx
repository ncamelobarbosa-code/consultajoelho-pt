import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("nuno-camelo-especialista-cirurgia-joelho");

export default function Page() {
  return <PortedArticle slug="nuno-camelo-especialista-cirurgia-joelho" />;
}
