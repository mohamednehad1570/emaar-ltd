import FAQPageClient from '@/components/faq/FAQPageClient';
import PageHeader from '@/components/ui/PageHeader';
import { faqData } from '@/lib/data/uiStrings';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { faqPageSchema } from '@/lib/seo/jsonld';
import JsonLd from '@/components/seo/JsonLd';

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'Frequently Asked Questions',
    description: 'Answers to common questions about uPVC vs aluminium windows, installation timelines, maintenance, warranties, and ordering from Emaar International.',
    path:        '/faq',
  });
}

export default function FAQPage() {
  // FAQPage JSON-LD is built from the English static FAQs — Google indexes one language per URL
  const schema = faqPageSchema(
    faqData.en.faqs.map((f) => ({ question: f.question, answer: f.answer })),
  );
  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        eyebrow="Support"
        title="Frequently Asked Questions"
        titleAr="الأسئلة الشائعة"
        description="Everything you need to know about our products, installation, and warranties."
      />
      <FAQPageClient />
    </>
  );
}
