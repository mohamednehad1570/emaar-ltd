'use client';

/**
 * components/contact/ContactPageClient.tsx
 *
 * Orchestrates the contact page sections. Merges CMS settings with static
 * fallback data so every field is always populated — the form always renders
 * regardless of CMS state.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppURL } from '@/lib/whatsapp';
import { fadeUp, viewportOnce } from '@/lib/motion';
import Container from '@/components/layout/Container';
import type { SiteSettings } from '@/lib/sanity/types';
import { contactData } from '@/lib/data/uiStrings';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ContactOffices from './ContactOffices';
import ContactMap from './ContactMap';

interface Props {
  settings: SiteSettings | null;
  staticData: typeof contactData;
}

export default function ContactPageClient({ settings, staticData }: Props) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = staticData[language];

  // ── CMS → static fallback merging ─────────────────────────────────────────
  const phone         = settings?.phone          ?? t.contact.phone.number;
  const email         = settings?.email          ?? t.contact.email.address;
  const whatsappNum   = settings?.whatsappNumber ?? '971500000000';
  const whatsappHref  = getWhatsAppURL({ page: 'contact' }, whatsappNum);
  // Address and hours are language-dependent — fall back to first static office
  const address       = settings?.address?.[language]      ?? t.offices.list[0].address;
  const workingHours  = settings?.workingHours?.[language] ?? t.contact.phone.hours;

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <ContactHero />

      {/* ── Form + contact info strip ─────────────────────────── */}
      <section className="pb-20">
        <Container className="max-w-xl">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
          <ContactForm whatsappHref={whatsappHref} phone={phone} />
          <ContactInfo
            phone={phone}
            email={email}
            address={address}
            workingHours={workingHours}
          />
          </motion.div>
        </Container>
      </section>

      {/* ── Office locations ──────────────────────────────────── */}
      <ContactOffices
        cmsOffices={settings?.officeLocations}
        staticData={staticData}
      />

      {/* ── Map embed (or placeholder) ────────────────────────── */}
      <ContactMap mapEmbedUrl={settings?.mapEmbedUrl} />

    </div>
  );
}
