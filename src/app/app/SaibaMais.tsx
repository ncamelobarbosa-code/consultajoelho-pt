import { IconArrow } from "./icons";

// Botão discreto "Saiba mais" para a página correspondente do site (abre fora da app).
export default function SaibaMais({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="cjapp-mais" href={href} target="_blank" rel="noopener">
      <span>Saiba mais: {children}</span>
      <IconArrow size={16} />
    </a>
  );
}
