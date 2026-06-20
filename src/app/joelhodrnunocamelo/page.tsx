import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("joelhodrnunocamelo");

export default function Page() {
  return <PortedArticle slug="joelhodrnunocamelo" />;
}
