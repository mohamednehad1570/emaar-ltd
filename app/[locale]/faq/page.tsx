import FAQPageClient from '@/components/faq/FAQPageClient';
import PageHeader from '@/components/ui/PageHeader';
import { faqData, PAGE_HEADERS } from '@/lib/data/uiStrings';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo/metadata';
import { routeLocale, type LocaleParams } from '@/lib/i18n/routeLocale';
import { faqPageSchema } from '@/lib/seo/jsonld';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return pageMetadata('faq', await routeLocale(params), '/faq');
}

export default async function FAQPage({ params }: { params: LocaleParams }) {
  const locale = await routeLocale(params);
  // FAQPage JSON-LD in this URL's language — each locale is its own indexed URL
  const schema = faqPageSchema(
    faqData[locale].faqs.map((f) => ({ question: f.question, answer: f.answer })),
    locale,
  );
  return (
    <>
      <JsonLd data={schema} />
      <PageHeader copy={PAGE_HEADERS.faq} />
      <FAQPageClient />
    </>
  );
}
