import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("tendao-rotuliano-tendinite-drnunocamelo");

export default function Page() {
  return <PortedArticle slug="tendao-rotuliano-tendinite-drnunocamelo" />;
}
