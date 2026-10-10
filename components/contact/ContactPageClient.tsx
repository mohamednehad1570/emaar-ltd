'use client';

/**
 * components/contact/ContactPageClient.tsx
 *
 * Orchestrates the contact page sections. Company contact details come from
 * lib/data/siteSettings.ts; section copy and office cards from contactData.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppURL } from '@/lib/whatsapp';
import { fadeUp, viewportOnce } from '@/lib/motion';
import Container from '@/components/layout/Container';
import type { SiteSettings } from '@/lib/types';
import { contactData } from '@/lib/data/uiStrings';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ContactOffices from './ContactOffices';
import ContactMap from './ContactMap';

interface Props {
  settings: SiteSettings;
  staticData: typeof contactData;
}

export default function ContactPageClient({ settings, staticData }: Props) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = staticData[language];

  const whatsappHref = getWhatsAppURL({ page: 'contact', locale: language }, settings.whatsappNumber);
  // SiteSettings has no hours field — the static contact copy owns them
  const workingHours = t.contact.phone.hours;

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Form + contact info strip ─────────────────────────── */}
      <section className="pb-20">
        <Container className="max-w-xl">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
          <ContactForm whatsappHref={whatsappHref} phone={settings.phone} />
          <ContactInfo
            phone={settings.phone}
            email={settings.emails.info}
            address={settings.address[language]}
            workingHours={workingHours}
          />
          </motion.div>
        </Container>
      </section>

      {/* ── Office locations ──────────────────────────────────── */}
      <ContactOffices staticData={staticData} />

      {/* ── Map placeholder — no embed URL until the client supplies one ── */}
      <ContactMap />

    </div>
  );
}
