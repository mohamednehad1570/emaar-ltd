'use client';

/**
 * components/Header.tsx
 *
 * Fixed site header. Two states driven by scroll, with hysteresis so it can't
 * flicker around a single threshold:
 *   rest    — taller bar, full-size logo, solid white
 *   compact — after 48px of scroll (back to rest below 16px): shorter bar, logo
 *             scaled down, frosted glass + silver border + warm shadow
 *
 * Height is never animated here: the bar reads var(--header-h), which globals.css
 * interpolates via @property when html[data-header] flips. Every other offset
 * (mega-menu, sticky sub-navs, scroll-padding) reads the same variable, so they
 * all move on one curve. The glass/border/shadow fade uses the same 0.3s ease.
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { WhatsappLogo, ArrowRight } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppURL } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';
import Container from '@/components/layout/Container';
import HeaderDesktopNav from '@/components/layout/HeaderDesktopNav';
import HeaderMobileOverlay from '@/components/layout/HeaderMobileOverlay';
import LangToggle from '@/components/layout/LangToggle';
import BurgerButton from '@/components/layout/BurgerButton';
import Button from '@/components/ui/Button';
import EmaarLogo from '@/components/ui/EmaarLogo';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
// Shrink past 48px, expand only once back under 16px — the 32px band absorbs
// trackpad jitter and elastic overscroll
const SHRINK_AT = 48;
const EXPAND_AT = 16;

interface HeaderProps {
  whatsappNumber?: string;
  // Accepted for forward-compatibility with CMS-driven branding; not consumed yet
  companyNameEn?: string;
  companyNameAr?: string;
  logoUrl?: string;
}

export default function Header({ whatsappNumber }: HeaderProps) {
  const { language, isRTL } = useLanguage();
  const pathname = usePathname();
  const reduce   = useReducedMotion();
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    setCompact(prev => (prev ? v > EXPAND_AT : v > SHRINK_AT));
  });

  // No mount check needed: useScroll measures the initial offset and emits a
  // change, so a reload that lands mid-page still starts compact.

  // Publish the state to CSS — drives --header-h for every consumer
  useEffect(() => {
    document.documentElement.dataset.header = compact ? 'compact' : 'rest';
  }, [compact]);

  // Close the overlay on route change — adjusted during render, not in an effect,
  // so there's no extra paint with the stale overlay still open
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) { setLastPath(pathname); setOpen(false); }
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const wa = getWhatsAppURL({ page: 'home' }, whatsappNumber);

  return (
    <>
      <motion.header
        // Logo stays on the left in both languages; the nav inside mirrors its own order
        dir="ltr"
        initial={false}
        animate={{
          backgroundColor:   compact ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,1)',
          backdropFilter:    compact ? 'blur(16px)' : 'blur(0px)',
          boxShadow:         compact ? '0 4px 20px rgba(45,41,38,0.10)' : '0 0 0 rgba(45,41,38,0)',
          // silver-material when compact, border-light at rest
          borderBottomColor: compact ? 'rgba(192,198,202,1)' : 'rgba(228,226,220,1)',
        }}
        // Reduced motion: switch instantly (MotionProvider only gates transforms)
        transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
        className="fixed top-0 inset-x-0 z-50 border-b"
        // Older Safari only honours the prefixed property; FM can't animate it, so it switches
        style={{ WebkitBackdropFilter: compact ? 'blur(16px)' : 'none' }}
      >
        <Container>
          <div className="grid grid-cols-[auto_1fr_auto] items-center" style={{ height: 'var(--header-h)' }}>

            {/* ── Logo — always the left edge ─────────────────────── */}
            <Link href="/" aria-label="Emaar International Industry — home" className="inline-flex items-center shrink-0 min-h-[44px]">
              <EmaarLogo size="header" compact={compact} textSize="md" />
            </Link>

            {/* ── Nav (≥1280px) ──────────────────────────────────── */}
            <HeaderDesktopNav />

            {/* ── Controls ──────────────────────────────────────── */}
            <div className="flex items-center gap-3">
              <div className="hidden xl:flex items-center gap-3">
                <LangToggle />
                <motion.a
                  href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="flex items-center justify-center w-11 h-11"
                >
                  <WhatsappLogo size={22} weight="fill" className="text-whatsapp" />
                </motion.a>
                <Button variant="primary" size="sm" href="/contact" icon={<ArrowRight size={13} weight="bold" />}>
                  {/* Both strings share one grid cell so the button width is stable on EN↔AR */}
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
              <div className="flex xl:hidden items-center ms-auto">
                <BurgerButton open={open} controls="mobile-nav" onToggle={() => setOpen(v => !v)} />
              </div>
            </div>

          </div>
        </Container>
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
