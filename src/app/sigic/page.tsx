import ScrapedPageView from "@/components/ScrapedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("sigic");

export default function Page() {
  return <ScrapedPageView slug="sigic" />;
}
