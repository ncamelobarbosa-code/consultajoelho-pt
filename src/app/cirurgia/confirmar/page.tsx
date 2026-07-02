import type { Metadata } from "next";
import ConfirmarClient from "./ConfirmarClient";

// Página transacional — fora do índice do Google e da sitemap.
export const metadata: Metadata = {
  title: "Confirmação de Cirurgia | Consulta Joelho",
  robots: { index: false, follow: false },
};

export default function ConfirmarPage() {
  return <ConfirmarClient />;
}
