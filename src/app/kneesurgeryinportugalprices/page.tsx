import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("kneesurgeryinportugalprices");

export default function Page() {
  return <PortedArticle slug="kneesurgeryinportugalprices" />;
}
