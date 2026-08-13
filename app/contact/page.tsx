import { getSiteSettings } from '@/lib/sanity/fetch';
import { contactData } from '@/lib/data/contact';
import ContactPageClient from '@/components/contact/ContactPageClient';

export const revalidate = 3600;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <ContactPageClient
      settings={settings}
      staticData={contactData}
    />
  );
}
