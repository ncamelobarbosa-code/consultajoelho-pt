import ScrapedPageView from "@/components/ScrapedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("quadricepsjoelho");

export default function Page() {
  return <ScrapedPageView slug="quadricepsjoelho" />;
}
