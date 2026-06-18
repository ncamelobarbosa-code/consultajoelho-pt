import ScrapedPageView from "@/components/ScrapedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("medocirurgiajoelho");

export default function Page() {
  return <ScrapedPageView slug="medocirurgiajoelho" />;
}
