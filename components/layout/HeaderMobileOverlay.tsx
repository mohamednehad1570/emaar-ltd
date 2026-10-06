'use client';

/**
 * components/layout/HeaderMobileOverlay.tsx
 * Full-screen slide-in nav drawer for mobile (< lg breakpoint).
 * Top bar: logo + language toggle + close.
 * Bottom bar: WhatsApp + Request Quote side-by-side.
 * Nav body is MobileDrillNav (drill-down panels); the drawer enters from the end side.
 */

import React from 'react';
import Link from 'next/link';
// Image import removed — EmaarLogo owns the logo <Image> internally.
import { motion, useReducedMotion } from 'framer-motion';
import { X, ArrowRight, WhatsappLogo } from '@phosphor-icons/react';
import { getWhatsAppURL } from '@/lib/whatsapp';
import MobileDrillNav from './MobileDrillNav';
import LangToggle from './LangToggle';
import Button from '@/components/ui/Button';
import EmaarLogo from '@/components/ui/EmaarLogo'; // shared logo atom — keeps overlay in sync with Header/Footer

// Ease curve for the drawer slide — aggressive start, abrupt landing feel
const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];

interface Props {
  id:       string;
  onClose:  () => void;
  language: 'en' | 'ar';
  isRTL:    boolean;
  pathname: string;
}

export default function HeaderMobileOverlay({ id, onClose, language, isRTL, pathname }: Props) {
  const r = useReducedMotion();
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
        className="fixed inset-0 z-[60] xl:hidden"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <motion.nav
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        dir={isRTL ? 'rtl' : 'ltr'}
        // Enters from the end side — physical right in LTR, left in RTL
        initial={{ x: isRTL ? '-100%' : '100%' }}
        animate={{ x: 0 }}
        exit={{ x: isRTL ? '-100%' : '100%', transition: { ease: EASE_DRAWER, duration: 0.28 } }}
        transition={r ? { duration: 0 } : { ease: EASE_DRAWER, duration: 0.35 }}
        className="fixed top-0 h-full w-full bg-off-white z-[70] xl:hidden flex flex-col end-0"
      >

        {/* ── Top bar: logo + lang toggle + close — same height as the header bar ── */}
        <div className="flex items-center justify-between px-5 border-b border-border-light shrink-0" style={{ height: 'var(--header-h)' }}>
          {/* onClick={onClose} dismisses the overlay when the user taps the logo link */}
          {/* Resting header preset — the overlay opens over the page, never compact */}
          <Link href="/" onClick={onClose} className="inline-flex items-center min-h-[44px]" aria-label="Emaar International Industry — home">
            <EmaarLogo size="header" textSize="md" />
          </Link>
          <div className="flex items-center gap-1">
            <LangToggle />
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
        <MobileDrillNav language={language} isRTL={isRTL} pathname={pathname} onClose={onClose} />

        {/* ── Bottom CTAs: WhatsApp + Request Quote ───────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // 0.4s delay — CTAs appear after nav items have staggered in
          transition={{ delay: r ? 0 : 0.4, duration: 0.3 }}
          className="shrink-0 px-5 pb-6 pt-4 border-t border-border-light bg-off-white flex gap-3"
        >
          <Button
            variant="primary" size="md"
            href={wa}
            target="_blank" rel="noopener noreferrer"
            className="flex-1"
          >
            <WhatsappLogo size={20} weight="fill" />
            <span>{language === 'en' ? 'WhatsApp' : 'واتساب'}</span>
          </Button>
          <Button
            variant="outline" size="md"
            href="/contact"
            onClick={onClose}
            icon={<ArrowRight size={16} weight="bold" className={isRTL ? 'rotate-180' : ''} />}
            className="flex-1"
          >
            {language === 'en' ? 'Request Quote' : 'اطلب عرضاً'}
          </Button>
        </motion.div>

      </motion.nav>
    </>
  );
}
