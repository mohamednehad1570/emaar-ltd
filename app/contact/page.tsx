import { getSiteSettings } from '@/lib/sanity/fetch';
import { contactData } from '@/lib/data/uiStrings';
import ContactPageClient from '@/components/contact/ContactPageClient';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { localBusinessSchema } from '@/lib/seo/jsonld';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'Contact Us — Get a Quote',
    description: 'Contact Emaar International for custom quotes on uPVC windows, aluminium doors, glass systems, and facades. Reach us by phone, WhatsApp, or our online form.',
    path:        '/contact',
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <ContactPageClient settings={settings} staticData={contactData} />
    </>
  );
}
