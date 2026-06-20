import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("liquidojoelho-artrocentese-drnunocamelo");

export default function Page() {
  return <PortedArticle slug="liquidojoelho-artrocentese-drnunocamelo" />;
}
