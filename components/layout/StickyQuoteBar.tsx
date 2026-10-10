'use client';

/**
 * components/layout/StickyQuoteBar.tsx
 *
 * <1024px only. Fixed bottom bar with two equal 48px buttons:
 *   [Request a Quote] → /contact   [WhatsApp] → page-aware WhatsApp message
 * Appears once the visitor scrolls past 60% of the first viewport (the hero / page
 * header has done its job by then), slides up 0.3s, and hides while the mobile nav
 * overlay is open. Reduced motion: fades in place, no slide.
 * Height = var(--quote-bar-h) + safe-area inset; the footer reserves the same space.
 */

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useLocalePathname } from '@/lib/i18n/useLocalePathname';
import { WhatsappLogo } from '@phosphor-icons/react';
import { ArrowForward } from '@/components/ui/DirectionalIcon';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { getWhatsAppURL, whatsAppContextFor } from '@/lib/whatsapp';
import { useMobileNavOpen } from '@/lib/hooks/useMobileNavOpen';
import { typeNameForPath, type HeaderNavData } from '@/lib/data/nav';
import Button from '@/components/ui/Button';

const SHOW_AT = 0.6; // fraction of the first viewport

interface Props {
  whatsappNumber?: string;
  /** Catalog-derived nav data — names the product in /products/[slug] messages */
  nav: HeaderNavData;
}

export default function StickyQuoteBar({ whatsappNumber, nav }: Props) {
  const { language, isRTL } = useLanguage();
  const t = useTranslation();
  // Locale-neutral ('/upvc' on /upvc and /ar/upvc) — matches the unprefixed nav hrefs
  const pathname = useLocalePathname();
  const reduce = useReducedMotion();
  const navOpen = useMobileNavOpen();
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);

  useMotionValueEvent(scrollY, 'change', v => setPast(v > window.innerHeight * SHOW_AT));

  const wa = getWhatsAppURL(whatsAppContextFor(pathname, language, typeNameForPath(nav, pathname)), whatsappNumber);

  return (
    <AnimatePresence>
      {past && !navOpen && (
        <motion.div
          key="quote-bar"
          data-quote-bar
          dir={isRTL ? 'rtl' : 'ltr'}
          initial={reduce ? { opacity: 0 } : { y: '100%' }}
          animate={reduce ? { opacity: 1 } : { y: 0 }}
          exit={reduce ? { opacity: 0 } : { y: '100%' }}
          transition={{ duration: reduce ? 0 : 0.3, ease: 'easeOut' }}
          // z-40: under the header (50) and the overlay (60/70)
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/85 backdrop-blur-md border-t border-border-light px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
        >
          <div className="flex gap-3">
            {/* h-12 = 48px buttons; Button's size scale tops out below that on md */}
            <Button
              variant="primary" size="md" href="/contact" className="flex-1 h-12"
              icon={<ArrowForward size={16} weight="bold" />}
            >
              {t('Request a Quote', 'اطلب عرض سعر')}
            </Button>
            <Button variant="outline" size="md" href={wa} target="_blank" rel="noopener noreferrer" className="flex-1 h-12">
              <WhatsappLogo size={20} weight="fill" className="text-whatsapp" aria-hidden="true" />
              <span>{t('WhatsApp', 'واتساب')}</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
