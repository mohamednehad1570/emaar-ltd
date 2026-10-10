'use client';
// Centered quote CTA section — off-white bg, primary "Request a Quote" + ghost WhatsApp

import React from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { ArrowForward } from '@/components/ui/DirectionalIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppURL } from '@/lib/whatsapp';
import Button from '@/components/ui/Button';
import Container from '@/components/layout/Container';

interface ProductDetailCTAProps {
  // Overrides the generic headline (type pages: "Planning a {type} project?")
  headline?: string;
  // Named product → WhatsApp message mentions it; omitted = generic product message
  productName?: { en: string; ar: string };
  quoteHref?: string;
}

export default function ProductDetailCTA({ headline, productName, quoteHref = '/contact' }: ProductDetailCTAProps = {}) {
  const { language, isRTL } = useLanguage();
  const wa = getWhatsAppURL({ page: 'product-detail', locale: language, productName });

  return (
    <section
      className="bg-off-white py-20 border-t border-border-light"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Container>
        {/* max-w-xl centres the content without it stretching on wide viewports */}
        <div className="max-w-xl mx-auto text-center">

          {/* Eyebrow — standard label scale */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-red mb-4">
            {language === 'en' ? 'Get Started' : 'ابدأ الآن'}
          </p>

          {/* H2 headline — 36px desktop / clamps on mobile */}
          <h2 className="font-cairo font-bold text-ink-heading text-3xl md:text-4xl mb-3">
            {headline ?? (language === 'en' ? 'Have a project in mind?' : 'هل لديك مشروع في الاعتبار؟')}
          </h2>

          {/* Subtitle — no commitment copy reduces friction */}
          <p className="text-ink-body text-base mb-10 leading-relaxed">
            {language === 'en'
              ? 'Get a quote within 24 hours, no commitment required.'
              : 'احصل على عرض خلال 24 ساعة، دون أي التزام.'}
          </p>

          {/* Button row — stacks vertically on mobile, horizontal on sm+ */}
          {/* dir=rtl from <html> mirrors the row on its own — no flex-row-reverse (that would undo it) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA — quote form on /contact (type pages append ?product=slug) */}
            <Button
              variant="primary"
              size="md"
              href={quoteHref}
              icon={<ArrowForward className="w-4 h-4" />}
            >
              {language === 'en' ? 'Request a Quote' : 'اطلب عرض سعر'}
            </Button>
            {/* Ghost CTA — opens WhatsApp in new tab */}
            <Button
              variant="outline"
              size="md"
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              icon={<WhatsappLogo className="w-4 h-4 text-whatsapp" weight="fill" />}
            >
              {language === 'en' ? 'WhatsApp Us' : 'تواصل عبر واتساب'}
            </Button>
          </div>

        </div>
      </Container>
    </section>
  );
}
