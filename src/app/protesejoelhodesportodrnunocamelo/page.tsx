import ScrapedPageView from "@/components/ScrapedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("protesejoelhodesportodrnunocamelo");

export default function Page() {
  return <ScrapedPageView slug="protesejoelhodesportodrnunocamelo" />;
}
