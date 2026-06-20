import PortedArticle from "@/components/PortedArticle";
import { scrapedMetadata } from "@/lib/content";

export const metadata = scrapedMetadata("actividadecientificajoelho");

export default function Page() {
  return <PortedArticle slug="actividadecientificajoelho" />;
}
