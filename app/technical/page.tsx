import { getTechDocuments } from '@/lib/sanity/fetch';
import TechnicalPageClient from '@/components/technical/TechnicalPageClient';
import { techData } from '@/lib/data/uiStrings';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'Technical Specifications & CAD Downloads',
    description: 'Download technical data sheets, CAD files, certificates, and installation guides for Emaar International\'s uPVC and aluminium window and door systems.',
    path:        '/technical',
  });
}

export default async function TechnicalPage() {
  // Fetch CMS documents — falls back to [] when Sanity is empty
  const cmsDocs = await getTechDocuments();

  return (
    <TechnicalPageClient
      cmsDocs={cmsDocs}
      staticData={techData}
    />
  );
}
