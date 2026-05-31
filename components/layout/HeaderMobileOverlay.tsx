'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, CaretDown, ArrowRight } from '@phosphor-icons/react';
import { NAV, isActive } from '@/lib/data/nav';
import { cn } from '@/lib/cn';

interface Props {
  onClose:  () => void;
  language: 'en' | 'ar';
  isRTL:    boolean;
  pathname: string;
}

export default function HeaderMobileOverlay({ onClose, language, isRTL, pathname }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const shouldReduceMotion      = useReducedMotion();

  useEffect(() => { setExpanded(null); }, [pathname]);

  const spring = shouldReduceMotion
    ? { type: 'tween' as const, duration: 0 }
    : { type: 'spring' as const, stiffness: 300, damping: 30 };

  return (
    <>
      {/* Backdrop scrim — tap closes overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm z-[60] lg:hidden"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <motion.nav
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        dir={isRTL ? 'rtl' : 'ltr'}
        initial={{ x: isRTL ? '-100%' : '100%' }}
        animate={{ x: 0 }}
        exit={{ x: isRTL ? '-100%' : '100%', transition: { type: 'tween', duration: 0.22 } }}
        transition={spring}
        className={cn(
          'fixed top-0 h-full w-full bg-off-white z-[70] lg:hidden flex flex-col',
          isRTL ? 'left-0' : 'right-0',
        )}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 h-[52px] border-b border-border-light shrink-0">
          <Link href="/" onClick={onClose} className="inline-flex items-center gap-2" aria-label="EMAAR International — home">
            <div className="w-7 h-7 bg-brand-dark flex items-center justify-center">
              <Image src="/logo.svg" alt="" aria-hidden="true" width={28} height={28} className="w-4 h-4 object-contain brightness-0 invert" />
            </div>
            <span className="font-bold text-sm text-brand-dark">{language === 'en' ? 'EMAAR' : 'إعمار'}</span>
          </Link>
          <button onClick={onClose} className="flex items-center justify-center w-11 h-11 text-text-muted hover:bg-cream hover:text-text-heading transition-colors duration-200" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        {/* Nav list */}
        <div className="flex-1 overflow-y-auto">
          {NAV.map((item) => {
            const active     = isActive(pathname, item.href, item.dropdown);
            const isExpanded = expanded === item.en;

            return (
              <div key={item.en} className="border-b border-border-light">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setExpanded(isExpanded ? null : item.en)}
                      className={cn(
                        'w-full flex items-center justify-between px-5 h-14',
                        'text-lg font-semibold transition-colors duration-150',
                        active ? 'text-brand-red' : 'text-text-heading',
                      )}
                    >
                      <span>{item[language]}</span>
                      <motion.span
                        animate={shouldReduceMotion ? undefined : { rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CaretDown size={16} weight="bold" />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          {item.dropdown.map((sub) => {
                            const subActive = pathname.startsWith(sub.href);
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={onClose}
                                className={cn(
                                  'flex items-center h-12',
                                  isRTL ? 'pr-6 pl-5' : 'pl-6 pr-5',
                                  'text-sm text-text-body transition-colors duration-150',
                                  subActive
                                    ? cn('text-brand-red font-semibold', isRTL ? 'border-r-2 border-brand-red' : 'border-l-2 border-brand-red')
                                    : 'hover:bg-cream hover:text-text-heading',
                                )}
                              >
                                {sub[language]}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center h-14 px-5',
                      'text-lg font-semibold transition-colors duration-150',
                      active ? 'text-brand-red' : 'text-text-heading hover:bg-cream',
                    )}
                  >
                    {item[language]}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="shrink-0 p-4 border-t border-border-light bg-off-white">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full h-[52px] bg-brand-red hover:bg-brand-red-dark text-white text-base font-bold transition-colors duration-150"
          >
            {language === 'en' ? 'Request Quote' : 'اطلب عرضاً'}
            <ArrowRight size={18} weight="bold" className={isRTL ? 'rotate-180' : ''} />
          </Link>
        </div>
      </motion.nav>
    </>
  );
}
