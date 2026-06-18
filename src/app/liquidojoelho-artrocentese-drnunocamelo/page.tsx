import ScrapedPageView from "@/components/ScrapedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("liquidojoelho-artrocentese-drnunocamelo");

export default function Page() {
  return <ScrapedPageView slug="liquidojoelho-artrocentese-drnunocamelo" />;
}
