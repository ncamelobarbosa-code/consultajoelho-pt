import ScrapedPageView from "@/components/ScrapedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("quistosparameniscaisjoelho");

export default function Page() {
  return <ScrapedPageView slug="quistosparameniscaisjoelho" />;
}
