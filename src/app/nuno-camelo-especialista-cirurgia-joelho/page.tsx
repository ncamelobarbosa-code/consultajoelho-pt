import ScrapedPageView from "@/components/ScrapedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("nuno-camelo-especialista-cirurgia-joelho");

export default function Page() {
  return <ScrapedPageView slug="nuno-camelo-especialista-cirurgia-joelho" />;
}
