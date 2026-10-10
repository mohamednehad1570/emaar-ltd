import { SITE_SETTINGS } from '@/lib/data/siteSettings';
import { contactData } from '@/lib/data/uiStrings';
import ContactPageClient from '@/components/contact/ContactPageClient';
import PageHeader from '@/components/ui/PageHeader';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo/metadata';
import { routeLocale, type LocaleParams } from '@/lib/i18n/routeLocale';
import { localBusinessSchema } from '@/lib/seo/jsonld';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return pageMetadata('contact', await routeLocale(params), '/contact');
}

export default async function ContactPage({ params }: { params: LocaleParams }) {
  const locale = await routeLocale(params);
  return (
    <>
      <JsonLd data={localBusinessSchema(locale)} />
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact Us"
        titleAr="تواصل معنا"
        description="We Care. We Listen. We Deliver."
        chips={['800 2226', 'Sun–Thu 8am–6pm']}
      />
      <ContactPageClient settings={SITE_SETTINGS} staticData={contactData} />
    </>
  );
}
