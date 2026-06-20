import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("entorsejoelho-drnunocamelo");

export default function Page() {
  return <PortedArticle slug="entorsejoelho-drnunocamelo" />;
}
