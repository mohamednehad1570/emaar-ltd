'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, CaretDown, ArrowRight } from '@phosphor-icons/react';
import { NAV, isActive } from '@/lib/data/nav';
import { cn } from '@/lib/cn';

interface Props {
  id:       string;
  onClose:  () => void;
  language: 'en' | 'ar';
  isRTL:    boolean;
  pathname: string;
}

const EASE_UI: [number, number, number, number]     = [0.23, 1, 0.32, 1];
const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];
const SPRING = { type: 'spring' as const, stiffness: 300, damping: 25 };

export default function HeaderMobileOverlay({ id, onClose, language, isRTL, pathname }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const r = useReducedMotion();

  useEffect(() => { setExpanded(null); }, [pathname]);

  const itemVariants = (idx: number) => ({
    initial: r ? { opacity: 0 }           : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: r
      ? { duration: 0.2 }
      : { delay: idx * 0.05, duration: 0.3, ease: EASE_UI },
  });

  const subItemVariants = (idx: number) => ({
    initial: r ? { opacity: 0 }           : { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0 },
    transition: r
      ? { duration: 0.15 }
      : { delay: idx * 0.03, duration: 0.2, ease: EASE_UI },
  });

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
        dir={isRTL ? 'rtl' : 'ltr'}
        initial={{ x: isRTL ? '-100%' : '100%' }}
        animate={{ x: 0 }}
        exit={{ x: isRTL ? '-100%' : '100%', transition: { ease: EASE_DRAWER, duration: 0.28 } }}
        transition={r ? { duration: 0 } : { ease: EASE_DRAWER, duration: 0.35 }}
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
          <button onClick={onClose}
            className="flex items-center justify-center w-11 h-11 text-text-muted hover:bg-cream hover:text-text-heading transition-colors duration-200"
            aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        {/* Nav list */}
        <div className="flex-1 overflow-y-auto">
          {NAV.map((item, navIdx) => {
            const active     = isActive(pathname, item.href, item.dropdown);
            const isExpanded = expanded === item.en;
            const v          = itemVariants(navIdx);

            return (
              <motion.div key={item.en} {...v} className="border-b border-border-light">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setExpanded(isExpanded ? null : item.en)}
                      className={cn(
                        'w-full flex items-center justify-between px-5 h-14',
                        'text-lg font-semibold transition-colors duration-150',
                        active ? cn('text-brand-red bg-cream', isRTL ? 'border-r-2 border-brand-red' : 'border-l-2 border-brand-red') : 'text-text-heading',
                      )}
                    >
                      <span>{item[language]}</span>
                      <motion.span
                        animate={r ? undefined : { rotate: isExpanded ? 180 : 0 }}
                        transition={SPRING}
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
                          transition={r ? { duration: 0 } : { duration: 0.25, ease: EASE_UI }}
                          className="overflow-hidden"
                        >
                          {item.dropdown.map((sub, subIdx) => {
                            const subActive = pathname.startsWith(sub.href);
                            const sv = subItemVariants(subIdx);
                            return (
                              <motion.div key={sub.href} {...sv}>
                                <Link
                                  href={sub.href}
                                  onClick={onClose}
                                  className={cn(
                                    'flex items-center h-12',
                                    isRTL ? 'pr-6 pl-5' : 'pl-6 pr-5',
                                    'text-sm transition-colors duration-150',
                                    subActive
                                      ? cn('text-brand-red font-semibold', isRTL ? 'border-r-2 border-brand-red' : 'border-l-2 border-brand-red')
                                      : 'text-text-body hover:bg-cream hover:text-text-heading',
                                  )}
                                >
                                  {sub[language]}
                                </Link>
                              </motion.div>
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
                      active
                        ? cn('text-brand-red bg-cream', isRTL ? 'border-r-2 border-brand-red' : 'border-l-2 border-brand-red')
                        : 'text-text-heading hover:bg-cream',
                    )}
                  >
                    {item[language]}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: r ? 0 : 0.4, duration: 0.3 }}
          className="shrink-0 p-4 border-t border-border-light bg-off-white"
        >
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full h-[52px] bg-brand-red hover:bg-brand-red-dark text-white text-base font-bold transition-colors duration-150"
          >
            {language === 'en' ? 'Request Quote' : 'اطلب عرضاً'}
            <ArrowRight size={18} weight="bold" className={isRTL ? 'rotate-180' : ''} />
          </Link>
        </motion.div>
      </motion.nav>
    </>
  );
}
