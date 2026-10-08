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

  // Brand suffix lives only in app/layout.tsx's title.template — adding it here too
  // produced "X — Emaar International — Emaar International". OG/Twitter titles
  // don't pass through the template, so they keep the suffix explicitly.
  const brandedTitle = `${title} — ${BRAND}`;

  return {
    title,
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
      title: brandedTitle,
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
          alt: brandedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [resolvedOgImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
