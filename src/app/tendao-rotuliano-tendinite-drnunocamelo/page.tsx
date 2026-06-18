import ScrapedPageView from "@/components/ScrapedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("tendao-rotuliano-tendinite-drnunocamelo");

export default function Page() {
  return <ScrapedPageView slug="tendao-rotuliano-tendinite-drnunocamelo" />;
}
