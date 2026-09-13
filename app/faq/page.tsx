import FAQPageClient from '@/components/faq/FAQPageClient';
import { sanityFetch } from '@/lib/sanity/client';
import { faqsQuery } from '@/lib/sanity/queries';
import type { SanityFaq } from '@/lib/sanity/types';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { faqPageSchema } from '@/lib/seo/jsonld';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'Frequently Asked Questions',
    description: 'Answers to common questions about uPVC vs aluminium windows, installation timelines, maintenance, warranties, and ordering from Emaar International.',
    path:        '/faq',
  });
}

export default async function FAQPage() {
  const sanityFaqs = await sanityFetch<SanityFaq[]>(faqsQuery);
  const schema = faqPageSchema(
    sanityFaqs.map((f) => ({ question: f.question.en, answer: f.answer.en })),
  );
  return (
    <>
      <JsonLd data={schema} />
      <FAQPageClient sanityFaqs={sanityFaqs} />
    </>
  );
}
