import ScrapedPageView from "@/components/ScrapedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("luxacaorotulajoelho");

export default function Page() {
  return <ScrapedPageView slug="luxacaorotulajoelho" />;
}
