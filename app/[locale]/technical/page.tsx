import TechnicalPageClient from '@/components/technical/TechnicalPageClient';
import PageHeader from '@/components/ui/PageHeader';
import { techData } from '@/lib/data/uiStrings';
import { TECH_DOCUMENTS, TECH_DOCUMENT_CATEGORIES } from '@/lib/data/techDocuments';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo/metadata';
import { routeLocale, type LocaleParams } from '@/lib/i18n/routeLocale';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return pageMetadata('technical', await routeLocale(params), '/technical');
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
