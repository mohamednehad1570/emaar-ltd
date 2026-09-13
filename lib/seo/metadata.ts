import type { Metadata } from "next";

const SITE_URL = "https://emaarupvc.ae";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;
const BRAND = "Emaar International";

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = `${SITE_URL}${path}`;
  const resolvedOgImage = ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title: `${title} — ${BRAND}`,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}${path}`,
        ar: `${SITE_URL}${path}`,
        "x-default": `${SITE_URL}${path}`,
      },
    },
    openGraph: {
      title: `${title} — ${BRAND}`,
      description,
      url: canonical,
      siteName: BRAND,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${BRAND}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${BRAND}`,
      description,
      images: [resolvedOgImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
