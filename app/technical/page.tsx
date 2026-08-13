import { getTechDocuments } from '@/lib/sanity/fetch';
import TechnicalPageClient from '@/components/technical/TechnicalPageClient';
import { techData } from '@/lib/data/tech';

export const revalidate = 3600;

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
