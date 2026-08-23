'use client';

/**
 * components/layout/HeaderMobileOverlay.tsx
 * Full-screen slide-in nav drawer for mobile (< lg breakpoint).
 * Top bar: logo + language toggle + close.
 * Bottom bar: WhatsApp + Request Quote side-by-side.
 * Nav list extracted to MobileNavList to stay under the 150-line limit.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { X, ArrowRight, WhatsappLogo } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppURL } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';
import MobileNavList from './MobileNavList';

// Ease curve for the drawer slide — aggressive start, abrupt landing feel
const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];
const LANGS = [
  { lang: 'en' as const, label: 'EN', aria: 'Switch to English' },
  { lang: 'ar' as const, label: 'ع',  aria: 'Switch to Arabic'  },
];

interface Props {
  id:       string;
  onClose:  () => void;
  language: 'en' | 'ar';
  isRTL:    boolean;
  pathname: string;
}

export default function HeaderMobileOverlay({ id, onClose, language, isRTL, pathname }: Props) {
  const { toggleLanguage, pendingLanguage } = useLanguage();
  const r = useReducedMotion();
  // pendingLanguage shows incoming lang during the 150ms crossfade before context commits
  const displayLang = pendingLanguage ?? language;
  const wa = getWhatsAppURL({ page: 'home' });

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ backgroundColor: 'rgba(26,26,26,0.3)' }}
        className="fixed inset-0 z-[60] lg:hidden"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <motion.nav
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        dir="ltr"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%', transition: { ease: EASE_DRAWER, duration: 0.28 } }}
        transition={r ? { duration: 0 } : { ease: EASE_DRAWER, duration: 0.35 }}
        className="fixed top-0 h-full w-full bg-off-white z-[70] lg:hidden flex flex-col right-0"
      >

        {/* ── Top bar: logo + lang toggle + close ─────────────────── */}
        <div className="flex items-center justify-between px-5 h-[52px] border-b border-border-light shrink-0">
          <Link href="/" onClick={onClose} className="inline-flex items-center gap-2" aria-label="EMAAR International — home">
            <div className="w-7 h-7 bg-brand-dark flex items-center justify-center">
              <Image src="/logo.svg" alt="" aria-hidden="true" width={28} height={28} className="w-4 h-4 object-contain brightness-0 invert" />
            </div>
            {/* inline-grid keeps layout stable when EN↔AR text widths differ */}
            <span className="font-bold text-sm text-brand-dark inline-grid justify-items-start">
              <span className={cn('col-start-1 row-start-1', language !== 'en' && 'invisible')} aria-hidden={language !== 'en'}>EMAAR</span>
              <span className={cn('col-start-1 row-start-1', language !== 'ar' && 'invisible')} aria-hidden={language !== 'ar'}>إعمار</span>
            </span>
          </Link>
          <div className="flex items-center gap-1">
            {/* Lang toggle mirrors header bar — active = bold heading, inactive = muted */}
            <div className="flex items-center">
              {LANGS.map(({ lang, label, aria }, i) => (
                <React.Fragment key={lang}>
                  {i > 0 && <span className="text-dim text-xs select-none px-0.5" aria-hidden="true">|</span>}
                  <button
                    onClick={displayLang !== lang ? toggleLanguage : undefined}
                    aria-label={aria}
                    aria-pressed={displayLang === lang}
                    // min-w/h-[44px] meets WCAG 2.5.5 AA touch-target minimum
                    className={cn(
                      'px-1.5 text-xs min-w-[44px] min-h-[44px] flex items-center justify-center',
                      displayLang === lang
                        ? 'font-bold text-brand-dark'
                        : 'font-normal text-text-muted hover:text-text-body',
                    )}
                  >{label}</button>
                </React.Fragment>
              ))}
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-11 h-11 text-text-muted hover:bg-cream hover:text-text-heading transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* ── Nav list ────────────────────────────────────────────── */}
        <MobileNavList language={language} pathname={pathname} onClose={onClose} />

        {/* ── Bottom CTAs: WhatsApp + Request Quote ───────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // 0.4s delay — CTAs appear after nav items have staggered in
          transition={{ delay: r ? 0 : 0.4, duration: 0.3 }}
          className="shrink-0 px-5 pb-6 pt-4 border-t border-border-light bg-off-white flex gap-3"
        >
          {/* WhatsApp — bg-whatsapp token only, never a raw hex */}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 flex-1 py-3.5 font-bold text-white bg-whatsapp hover:bg-whatsapp-dark transition-colors duration-200 min-h-[52px]"
          >
            <WhatsappLogo size={20} weight="fill" />
            <span>{language === 'en' ? 'WhatsApp' : 'واتساب'}</span>
          </a>
          {/* Request Quote — brand-red CTA */}
          <Link
            href="/contact"
            onClick={onClose}
            className={cn(
              'flex items-center justify-center gap-2 flex-1 py-3.5 font-bold text-white',
              'bg-brand-red hover:bg-brand-red-dark transition-colors duration-200 min-h-[52px]',
              // flex-row-reverse keeps arrow on reading-end side in RTL
              isRTL && 'flex-row-reverse',
            )}
          >
            <span>{language === 'en' ? 'Request Quote' : 'اطلب عرضاً'}</span>
            {/* Arrow rotates 180° in RTL — points toward reading-end edge */}
            <ArrowRight size={16} weight="bold" className={isRTL ? 'rotate-180' : ''} />
          </Link>
        </motion.div>

      </motion.nav>
    </>
  );
}
