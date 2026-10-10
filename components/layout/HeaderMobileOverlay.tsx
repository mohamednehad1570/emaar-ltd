'use client';

/**
 * components/layout/HeaderMobileOverlay.tsx
 * Full-screen slide-in nav for <1024px. Enters from the end side (physical right in
 * EN, left in AR). Top: logo + close. Body: MobileDrillNav. Bottom (pinned):
 * EN|ع on mobile (tablet keeps it in the bar), then WhatsApp + Request Quote.
 */

import LocaleLink from '@/components/ui/LocaleLink';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { X, WhatsappLogo } from '@phosphor-icons/react';
import { ArrowForward } from '@/components/ui/DirectionalIcon';
import type { HeaderNavData } from '@/lib/data/nav';
import { useTranslation } from '@/contexts/LanguageContext';
import MobileDrillNav from './MobileDrillNav';
import LangToggle from './LangToggle';
import Button from '@/components/ui/Button';

// Ease curve for the drawer slide — aggressive start, abrupt landing feel
const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];

interface Props {
  id:       string;
  nav:      HeaderNavData;
  waHref:   string;
  onClose:  () => void;
  language: 'en' | 'ar';
  isRTL:    boolean;
  pathname: string;
}

export default function HeaderMobileOverlay({ id, nav, waHref, onClose, language, isRTL, pathname }: Props) {
  const r = useReducedMotion();
  const t = useTranslation();

  return (
    <>
      {/* ── Backdrop ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: r ? 0 : 0.2 }}
        style={{ backgroundColor: 'rgba(26,26,26,0.3)' }}
        className="fixed inset-0 z-[60] lg:hidden"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* ── Slide-in panel ───────────────────────────────────── */}
      <motion.nav
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={t('Site navigation', 'تنقل الموقع')}
        dir={isRTL ? 'rtl' : 'ltr'}
        initial={{ x: isRTL ? '-100%' : '100%' }}
        animate={{ x: 0 }}
        exit={{ x: isRTL ? '-100%' : '100%', transition: { ease: EASE_DRAWER, duration: r ? 0 : 0.28 } }}
        transition={r ? { duration: 0 } : { ease: EASE_DRAWER, duration: 0.35 }}
        className="fixed top-0 h-full w-full bg-off-white z-[70] lg:hidden flex flex-col end-0"
      >
        {/* ── Top bar: logo + close — same 72px as the header bar ── */}
        <div className="flex items-center justify-between px-5 border-b border-border-light shrink-0 h-(--header-h)">
          <LocaleLink href="/" onClick={onClose} aria-label={t('Emaar International — Home', 'إعمار الدولية — الصفحة الرئيسية')}
            className="relative block size-12 rounded-full bg-white border border-border-light">
            <Image src="/emaar-logo.png" alt="" fill sizes="48px" className="object-contain p-1" />
          </LocaleLink>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('Close menu', 'إغلاق القائمة')}
            className="flex items-center justify-center size-11 text-ink-muted hover:bg-surface-cream hover:text-ink-heading"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        {/* ── Nav list ─────────────────────────────────────────── */}
        <MobileDrillNav nav={nav} language={language} isRTL={isRTL} pathname={pathname} onClose={onClose} />

        {/* ── Pinned bottom: language + CTAs ───────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // 0.4s delay — CTAs appear after the drawer has landed
          transition={{ delay: r ? 0 : 0.4, duration: r ? 0 : 0.3 }}
          className="shrink-0 px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] border-t border-border-light bg-off-white"
        >
          {/* Shown at every overlay width (<1024) — tablets get it too, not just phones */}
          <div className="flex justify-center mb-2"><LangToggle /></div>
          <div className="flex gap-3">
            {/* px-4 + nowrap: two equal halves must each hold their label on one line at 360px */}
            <Button variant="outline" size="md" href={waHref} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 whitespace-nowrap">
              <WhatsappLogo size={20} weight="fill" className="text-whatsapp" aria-hidden="true" />
              <span>{t('WhatsApp', 'واتساب')}</span>
            </Button>
            <Button
              variant="primary" size="md" href="/contact" onClick={onClose} className="flex-1 px-4 whitespace-nowrap"
              icon={<ArrowForward size={16} weight="bold" />}
            >
              {t('Request Quote', 'اطلب عرضاً')}
            </Button>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}
