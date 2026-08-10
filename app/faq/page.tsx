import FAQPageClient from '@/components/faq/FAQPageClient';
import { sanityFetch } from '@/lib/sanity/client';
import { faqsQuery } from '@/lib/sanity/queries';
import type { SanityFaq } from '@/lib/sanity/types';

export const revalidate = 3600;

export default async function FAQPage() {
  const sanityFaqs = await sanityFetch<SanityFaq[]>(faqsQuery);
  return <FAQPageClient sanityFaqs={sanityFaqs} />;
}
