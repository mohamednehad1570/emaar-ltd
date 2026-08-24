'use client';

/**
 * components/home/CTASection.tsx
 *
 * Full-bleed dark conversion section.
 * Void background + subtle dot pattern — the button earns its place
 * through isolation, not decoration.
 *
 * Design rules (CLAUDE.md / DESIGN.md):
 *   - No em dashes in copy (banned)
 *   - leading-[0.90] on display headings per DESIGN.md spec
 *   - text-balance on h2 for even line wrapping
 *   - Warm shadow only: rgba(231,76,60,x) for the CTA glow
 *   - transition-[background-color,box-shadow] so the glow deepens smoothly
 */

import React from 'react';
import { motion , useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppURL, WhatsAppContext } from '@/lib/whatsapp';
import Button from '@/components/ui/Button';

interface CTASectionProps {
  whatsappContext?: WhatsAppContext;
}

export default function CTASection({ whatsappContext }: CTASectionProps) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const whatsappHref = getWhatsAppURL(whatsappContext ?? { page: 'home' });

  const content = {
    en: {
      title:    'Ready to start your project?',
      subtitle: 'Get a quote within 24 hours, no commitment required.',
      button:   'Contact Us Now',
    },
    ar: {
      title:    'هل أنت مستعد لبدء مشروعك؟',
      subtitle: 'احصل على عرض سعر خلال 24 ساعة، دون أي التزام.',
      button:   'اتصل بنا الآن',
    },
  };

  const t = content[language];

  return (
    <section
      className="py-32 px-6 bg-brand-void relative overflow-hidden text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-labelledby="cta-heading"
    >
      {/* Dot pattern — inherits white from parent text-white; opacity-5 stays in token scale */}
      <div className="absolute inset-0 dot-pattern opacity-5" aria-hidden="true" />
      {/* Pulsing red glow — per DESIGN.md CTA Section spec: "one pulsing red glow at opacity 0.10" */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 70%, rgba(231,76,60,0.10) 0%, transparent 70%)',
          animation: 'ctaGlow 4s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={shouldReduce ? undefined : { once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Display heading — leading-[0.90] per DESIGN.md; text-balance prevents orphans */}
          <h2
            id="cta-heading"
            className="
              text-4xl md:text-5xl lg:text-6xl
              font-extrabold leading-[0.90] tracking-tight
              text-white text-balance
              mb-6
            "
          >
            {t.title}
          </h2>

          {/* Subtitle — font-light creates weight contrast with the extrabold heading */}
          <p className="text-lg text-white/55 font-light mb-10 max-w-md mx-auto">
            {t.subtitle}
          </p>

          {/* Primary CTA */}
          <Button
            variant="primary" size="lg"
            href={whatsappHref}
            target="_blank" rel="noopener noreferrer"
            icon={<ArrowRight size={20} weight="bold" className={isRTL ? 'rotate-180' : ''} />}
          >
            {t.button}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
