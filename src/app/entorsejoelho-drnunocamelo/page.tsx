import ScrapedPageView from "@/components/ScrapedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("entorsejoelho-drnunocamelo");

export default function Page() {
  return <ScrapedPageView slug="entorsejoelho-drnunocamelo" />;
}
