'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Image import removed — EmaarLogo now owns the logo <Image> internally.
import {
  motion, AnimatePresence,
  useScroll, useMotionValueEvent, useReducedMotion,
} from 'framer-motion';
import { WhatsappLogo, ArrowRight } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppURL } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';
import HeaderDesktopNav from '@/components/layout/HeaderDesktopNav';
import HeaderMobileOverlay from '@/components/layout/HeaderMobileOverlay';
import Button from '@/components/ui/Button';
import EmaarLogo from '@/components/ui/EmaarLogo'; // shared logo + wordmark atom

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
const SPRING = { type: 'spring' as const, stiffness: 300, damping: 25 };
const LANGS = [
  { lang: 'en' as const, label: 'EN', aria: 'Switch to English' },
  { lang: 'ar' as const, label: 'ع',  aria: 'Switch to Arabic'  },
];

interface HeaderProps {
  whatsappNumber?: string;
  // companyNameEn / companyNameAr / logoUrl kept in interface so the parent (layout.tsx)
  // can still pass CMS values without TypeScript errors; the logo block now delegates
  // image + text to EmaarLogo which reads /emaar-logo.png directly.
  companyNameEn?: string;
  companyNameAr?: string;
  logoUrl?: string;
}

// Only whatsappNumber is destructured — the other CMS props are accepted but not yet consumed
// (they remain in the interface for forward-compatibility with CMS-driven overrides).
export default function Header({ whatsappNumber }: HeaderProps) {
  const { language, toggleLanguage, isRTL, pendingLanguage } = useLanguage();
  const pathname = usePathname();
  const r = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 20));
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // CMS number overrides the hardcoded constant when configured
  const wa = getWhatsAppURL({ page: 'home' }, whatsappNumber);

  const LangToggle = () => {
    // Use pendingLanguage during the 150 ms crossfade so the toggle
    // shows the incoming language as active before the content settles.
    const displayLang = pendingLanguage ?? language;
    return (
      <div className="flex items-center">
        {LANGS.map(({ lang, label, aria }, i) => (
          <React.Fragment key={lang}>
            {i > 0 && <span className="text-dim text-xs select-none px-0.5" aria-hidden="true">|</span>}
            <motion.button
              onClick={displayLang !== lang ? toggleLanguage : undefined}
              aria-label={aria} aria-pressed={displayLang === lang}
              whileHover={r ? undefined : { scale: 1.05 }}
              transition={{ duration: 0.15, ease: EASE }}
              className={cn('px-1.5 text-xs',
                displayLang === lang
                  ? 'font-bold text-brand-dark'
                  : 'font-normal text-text-muted hover:text-text-body')}
            >{label}</motion.button>
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <>
      <motion.header
        dir="ltr"
        animate={r ? undefined : {
          backgroundColor:   scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,1)',
          backdropFilter:    scrolled ? 'blur(16px)' : 'blur(0px)',
          boxShadow:         scrolled ? 'var(--shadow-warm-md)' : '0 0 0 rgba(45,41,38,0)',
          borderBottomColor: scrolled ? 'rgba(192,198,202,1)' : 'rgba(228,226,220,0.8)',
        }}
        transition={{ duration: 0.4, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
          ...(r ? {
            backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : '#fff',
            backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
          } : {}),
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="h-[48px] lg:h-14"
            style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center' }}
          >

            {/* LEFT — logo always anchored left, never moves */}
            {/* min-h-[44px] satisfies WCAG 2.5.5 minimum touch-target height on mobile. */}
            {/* flex-shrink-0 prevents the logo from being compressed by the nav or right controls. */}
            <Link
              href="/"
              aria-label="Emaar International Industry LLC — home"
              className="inline-flex items-center flex-shrink-0 min-h-[44px]"
            >
              {/* EmaarLogo renders /emaar-logo.png + the company name in one shared atom.
                  size=52 gives a clear brand presence in the 48 px / 56 px header bar.
                  textSize="md" uses the #1A1A1A heading colour for maximum legibility. */}
              <EmaarLogo size={52} showText={true} textSize="md" />
            </Link>

            {/* CENTER — nav */}
            <HeaderDesktopNav />

            {/* RIGHT — fixed: lang toggle · whatsapp · CTA, never moves */}
            <div className="flex items-center gap-3">
              {/* Desktop only */}
              <div className="hidden lg:flex items-center gap-3">
                <LangToggle />
                <motion.a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
                  whileHover={r ? undefined : { scale: 1.1 }}
                  whileTap={r ? undefined : { scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="flex items-center justify-center">
                  <WhatsappLogo size={20} weight="fill" className="text-whatsapp" />
                </motion.a>
                <Button
                  variant="primary" size="sm"
                  href="/contact"
                  icon={<ArrowRight size={13} weight="bold" />}
                >
                  {/* inline-grid stacks both lang strings at the same size so
                      the header width stays stable on EN↔AR toggle */}
                  <span className="inline-grid justify-items-center">
                    <span className={cn('col-start-1 row-start-1', language !== 'en' && 'invisible')} aria-hidden={language !== 'en'}>
                      Request Quote
                    </span>
                    <span className={cn('col-start-1 row-start-1', language !== 'ar' && 'invisible')} aria-hidden={language !== 'ar'}>
                      اطلب عرضاً
                    </span>
                  </span>
                </Button>
              </div>
              {/* Mobile only */}
              <div className="flex lg:hidden items-center ms-auto">
                {/* -mr-2 pulls the touch target to the edge so the icon aligns with the container */}
                <button onClick={() => setOpen(v => !v)} aria-label={open ? 'Close menu' : 'Open menu'}
                  aria-expanded={open} aria-controls="mobile-nav"
                  className="flex flex-col items-center justify-center gap-[5px] w-10 h-10 -mr-2">
                  <motion.span animate={r ? undefined : { rotate: open ? 45 : 0, y: open ? 6 : 0 }}
                    transition={SPRING} style={{ height: '1.5px' }}
                    className="block w-6 bg-brand-dark origin-center" />
                  <motion.span animate={r ? undefined : { rotate: open ? -45 : 0, y: open ? -6 : 0 }}
                    transition={SPRING} style={{ height: '1.5px' }}
                    className="block w-6 bg-brand-dark origin-center" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <HeaderMobileOverlay key="overlay" id="mobile-nav"
            onClose={() => setOpen(false)} language={language} isRTL={isRTL} pathname={pathname} />
        )}
      </AnimatePresence>
    </>
  );
}
