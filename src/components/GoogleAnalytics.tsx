import Script from "next/script";

// Google Analytics 4. O ID vem da variável de ambiente NEXT_PUBLIC_GA_ID
// (definida na Vercel: Settings → Environment Variables → "G-XXXXXXXXXX").
// Sem a variável definida, não renderiza nada (seguro em dev/preview).
export default function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
