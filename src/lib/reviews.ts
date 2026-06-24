// Google Reviews via Places API (New). A chave fica no servidor (env), nunca no cliente.
// Configurar em Vercel: GOOGLE_PLACES_API_KEY e GOOGLE_PLACE_ID.

export type GoogleReview = {
  author: string;
  photo?: string;
  rating: number;
  text: string;
  time: string;
  uri?: string;
};

export type GoogleReviewsData = {
  rating: number;
  total: number;
  mapsUri?: string;
  reviews: GoogleReview[];
};

type Lang = "pt" | "en" | "ru";

// Sem credenciais → devolve null (a secção simplesmente não aparece; o build não quebra).
export async function getGoogleReviews(lang: Lang = "pt"): Promise<GoogleReviewsData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${lang}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
        },
        // ISR: revalida diariamente (mantém fresco e respeita os limites da API).
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return null;
    const d = await res.json();

    type RawReview = {
      rating?: number;
      text?: { text?: string };
      originalText?: { text?: string };
      relativePublishTimeDescription?: string;
      authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
    };

    const reviews: GoogleReview[] = (d.reviews || [])
      .map((r: RawReview) => ({
        author: r.authorAttribution?.displayName || "",
        photo: r.authorAttribution?.photoUri,
        rating: r.rating ?? 5,
        text: r.text?.text || r.originalText?.text || "",
        time: r.relativePublishTimeDescription || "",
        uri: r.authorAttribution?.uri,
      }))
      .filter((r: GoogleReview) => r.text.trim().length > 0);

    return {
      rating: d.rating ?? 0,
      total: d.userRatingCount ?? 0,
      mapsUri: d.googleMapsUri,
      reviews,
    };
  } catch {
    return null;
  }
}
