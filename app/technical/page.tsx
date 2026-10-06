import TechnicalPageClient from '@/components/technical/TechnicalPageClient';
import PageHeader from '@/components/ui/PageHeader';
import { techData } from '@/lib/data/uiStrings';
import { TECH_DOCUMENTS, TECH_DOCUMENT_CATEGORIES } from '@/lib/data/techDocuments';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'Technical Specifications & CAD Downloads',
    description: 'Download technical data sheets, CAD files, certificates, and installation guides for Emaar International\'s uPVC and aluminium window and door systems.',
    path:        '/technical',
  });
}

export default function TechnicalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Technical Documentation"
        titleAr="الوثائق التقنية"
        description="Specifications, CAD files, brochures, and certificates for all product systems."
        chips={['Specs PDFs', 'CAD files', 'Certificates']}
      />
      <TechnicalPageClient
        documents={TECH_DOCUMENTS}
        categories={TECH_DOCUMENT_CATEGORIES}
        staticData={techData}
      />
    </>
  );
}
