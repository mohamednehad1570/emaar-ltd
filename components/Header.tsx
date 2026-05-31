'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { List as MenuIcon, WhatsappLogo, ArrowRight } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppURL } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';
import HeaderDesktopNav from '@/components/layout/HeaderDesktopNav';
import HeaderMobileOverlay from '@/components/layout/HeaderMobileOverlay';

const LANG_BUTTONS = [
  { lang: 'en' as const, label: 'EN', ariaLabel: 'Switch to English' },
  { lang: 'ar' as const, label: 'ع',  ariaLabel: 'Switch to Arabic'  },
];

export default function Header() {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const pathname                            = usePathname();
  const shouldReduceMotion                  = useReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);

  const waHref = getWhatsAppURL({ page: 'home' });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const langButtons = isRTL ? [...LANG_BUTTONS].reverse() : LANG_BUTTONS;

  const LangToggle = ({ size }: { size: 'sm' | 'xs' }) => (
    <div className="flex items-center gap-0.5">
      {langButtons.map(({ lang, label, ariaLabel }) => (
        <button
          key={lang}
          onClick={language !== lang ? toggleLanguage : undefined}
          aria-label={ariaLabel}
          aria-pressed={language === lang}
          className={cn(
            'transition-colors duration-150',
            size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-2 py-1 text-xs',
            language === lang
              ? 'bg-cream font-bold text-text-heading'
              : 'font-normal text-text-muted hover:text-text-body',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <motion.header
        animate={shouldReduceMotion ? undefined : {
          backgroundColor:   isScrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,1)',
          boxShadow:         isScrolled ? '0 4px 20px rgba(45,41,38,0.10)' : '0 0 0 rgba(45,41,38,0)',
          backdropFilter:    isScrolled ? 'blur(12px)' : 'blur(0px)',
          borderBottomColor: isScrolled ? '#C0C6CA' : '#E4E2DC',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border-light"
        style={shouldReduceMotion ? { backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : '#fff' } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-[52px] lg:h-[56px]">

            {/* Logo — always left, never flips */}
            <Link href="/" className="inline-flex items-center gap-2 shrink-0 group" aria-label="EMAAR International — home">
              <div className="w-8 h-8 bg-brand-dark flex items-center justify-center group-hover:opacity-90 transition-opacity duration-200">
                <Image src="/logo.svg" alt="" aria-hidden="true" width={32} height={32} className="w-5 h-5 object-contain brightness-0 invert" priority />
              </div>
              <span className="font-bold text-base tracking-tight text-brand-dark">
                {language === 'en' ? 'EMAAR' : 'إعمار'}
              </span>
            </Link>

            {/* Desktop centered nav */}
            <HeaderDesktopNav />

            {/* Desktop right actions — reversed in RTL */}
            <div className={cn('ml-auto hidden lg:flex items-center gap-3 shrink-0', isRTL && 'flex-row-reverse')}>
              <LangToggle size="sm" />
              <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="flex items-center justify-center w-8 h-8 hover:bg-cream transition-colors duration-200">
                <WhatsappLogo size={20} weight="fill" className="text-whatsapp" />
              </a>
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion  ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link href="/contact" className="inline-flex items-center gap-1.5 px-4 h-9 bg-brand-red hover:bg-brand-red-dark text-white text-[13px] font-bold transition-colors duration-150">
                  {language === 'en' ? 'Request Quote' : 'اطلب عرضاً'}
                  <ArrowRight size={13} weight="bold" className={isRTL ? 'rotate-180' : ''} />
                </Link>
              </motion.div>
            </div>

            {/* Mobile right: lang toggle + WhatsApp + burger — reversed in RTL */}
            <div className={cn('ml-auto flex lg:hidden items-center gap-2 shrink-0', isRTL && 'flex-row-reverse')}>
              <LangToggle size="xs" />
              <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="flex items-center justify-center w-8 h-8 hover:bg-cream transition-colors duration-200">
                <WhatsappLogo size={20} weight="fill" className="text-whatsapp" />
              </a>
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="flex items-center justify-center w-10 h-10 text-text-heading hover:bg-cream transition-colors duration-200"
              >
                <MenuIcon size={22} />
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <HeaderMobileOverlay
            key="mobile-overlay"
            onClose={() => setMenuOpen(false)}
            language={language}
            isRTL={isRTL}
            pathname={pathname}
          />
        )}
      </AnimatePresence>
    </>
  );
}
