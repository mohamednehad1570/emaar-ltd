'use client';

/**
 * components/Header.tsx
 *
 * Fixed 72px site header. Physical layout is identical in EN and AR:
 *   [LogoPlate] …… HeaderNav (≥1024) …… HeaderRightCluster · burger (<1024)
 * The bar row is dir="ltr"; every text label / panel sets its own dir.
 *
 * Bar states, with hysteresis (scrolled past 48px, back below 16px) so it can't
 * flicker around one threshold:
 *   rest     — solid white, border-light hairline (homepage: transparent over hero)
 *   scrolled — frosted glass + silver border. The logo plate is static in both states.
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useLocalePathname } from '@/lib/i18n/useLocalePathname';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppURL, whatsAppContextFor } from '@/lib/whatsapp';
import { setMobileNavOpen } from '@/lib/hooks/useMobileNavOpen';
import { typeNameForPath, type HeaderNavData } from '@/lib/data/nav';
import Container from '@/components/layout/Container';
import LogoPlate from '@/components/layout/LogoPlate';
import HeaderNav from '@/components/layout/HeaderNav';
import HeaderRightCluster from '@/components/layout/HeaderRightCluster';
import HeaderMobileOverlay from '@/components/layout/HeaderMobileOverlay';
import BurgerButton from '@/components/layout/BurgerButton';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
// The 32px band absorbs trackpad jitter and elastic overscroll
const FROST_AT = 48;
const CLEAR_AT = 16;

interface HeaderProps {
  nav: HeaderNavData;
  whatsappNumber?: string;
}

export default function Header({ nav, whatsappNumber }: HeaderProps) {
  const { language, isRTL } = useLanguage();
  // Locale-neutral ('/upvc' on /upvc and /ar/upvc) — matches the unprefixed nav hrefs
  const pathname = useLocalePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // useScroll emits the initial offset, so a reload mid-page still starts frosted
  useMotionValueEvent(scrollY, 'change', v => {
    setScrolled(prev => (prev ? v > CLEAR_AT : v > FROST_AT));
  });

  // Close the overlay on route change — adjusted during render, no stale-overlay paint
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) { setLastPath(pathname); setOpen(false); }
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    setMobileNavOpen(open);
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Homepage hero runs under the bar: transparent until the first scroll
  const onDark = pathname === '/' && !scrolled && !open;
  const wa = getWhatsAppURL(whatsAppContextFor(pathname, typeNameForPath(nav, pathname)), whatsappNumber);

  return (
    <>
      <motion.header
        dir="ltr"
        initial={false}
        animate={{
          backgroundColor:   onDark ? 'rgba(255,255,255,0)' : scrolled ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,1)',
          backdropFilter:    scrolled ? 'blur(16px)' : 'blur(0px)',
          // silver-material when scrolled, border-light at rest, invisible over the hero
          borderBottomColor: onDark ? 'rgba(228,226,220,0)' : scrolled ? 'rgba(192,198,202,1)' : 'rgba(228,226,220,1)',
        }}
        // Reduced motion: switch instantly (MotionProvider only gates transforms)
        transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
        // 0.5px hairline per spec — renders as a crisp single device pixel on 2× screens
        className="fixed top-0 inset-x-0 z-50 border-b-[0.5px]"
        // Older Safari only honours the prefixed property; FM can't animate it
        style={{ WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none' }}
      >
        <Container>
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 xl:gap-6 h-(--header-h)">
            <LogoPlate language={language} />
            <HeaderNav nav={nav} language={language} onDark={onDark} />
            <div className="flex items-center justify-end gap-2">
              <HeaderRightCluster language={language} waHref={wa} onDark={onDark} />
              <div className="lg:hidden">
                <BurgerButton open={open} controls="mobile-nav" onToggle={() => setOpen(v => !v)} onDark={onDark} />
              </div>
            </div>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open && (
          <HeaderMobileOverlay key="overlay" id="mobile-nav" nav={nav} waHref={wa}
            onClose={() => setOpen(false)} language={language} isRTL={isRTL} pathname={pathname} />
        )}
      </AnimatePresence>
    </>
  );
}
