import ScrapedPageView from "@/components/ScrapedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("actividadecientificajoelho");

export default function Page() {
  return <ScrapedPageView slug="actividadecientificajoelho" />;
}
