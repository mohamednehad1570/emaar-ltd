'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CaretDown } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { NAV, isActive } from '@/lib/data/nav';
import { cn } from '@/lib/cn';
import HeaderDropdown from './HeaderDropdown';

const underlineVariants = {
  rest:    { scaleX: 0 },
  hovered: {
    scaleX: 1,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function HeaderDesktopNav() {
  const { language, isRTL }         = useLanguage();
  const pathname                    = usePathname();
  const [openDrop, setOpenDrop]     = useState<string | null>(null);
  const closeTimeout                = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion          = useReducedMotion();

  const openPanel = useCallback((key: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDrop(key);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimeout.current = setTimeout(() => setOpenDrop(null), 100);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  }, []);

  useEffect(() => { setOpenDrop(null); }, [pathname]);

  return (
    <nav
      className="hidden lg:flex items-center justify-center h-full"
      aria-label="Primary navigation"
    >
      <div className="flex items-center gap-8 h-full">
        {NAV.map((item) => {
          const active  = isActive(pathname, item.href, item.dropdown);
          const isOpen  = openDrop === item.en;
          const variant = active || isOpen ? 'hovered' : 'rest';

          return (
            <motion.div
              key={item.en}
              className="relative h-full flex items-center"
              initial="rest"
              whileHover={shouldReduceMotion ? undefined : 'hovered'}
              animate={shouldReduceMotion ? undefined : variant}
              onMouseEnter={() =>
                item.dropdown
                  ? openPanel(item.en)
                  : (cancelClose(), setOpenDrop(null))
              }
              onMouseLeave={scheduleClose}
            >
              {item.dropdown ? (
                <button
                  type="button"
                  className={cn(
                    'flex items-center gap-1 text-sm font-semibold transition-colors duration-150',
                    active || isOpen
                      ? 'text-text-heading'
                      : 'text-text-body hover:text-text-heading',
                  )}
                >
                  <span className="inline-grid justify-items-center">
                    <span className={cn('col-start-1 row-start-1', language !== 'en' && 'invisible')} aria-hidden={language !== 'en'}>
                      {item.en}
                    </span>
                    <span className={cn('col-start-1 row-start-1', language !== 'ar' && 'invisible')} aria-hidden={language !== 'ar'}>
                      {item.ar}
                    </span>
                  </span>
                  <motion.span
                    animate={shouldReduceMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CaretDown size={12} weight="bold" className="shrink-0" />
                  </motion.span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'text-sm font-semibold transition-colors duration-150',
                    active
                      ? 'text-text-heading'
                      : 'text-text-body hover:text-text-heading',
                  )}
                >
                  <span className="inline-grid justify-items-center">
                    <span className={cn('col-start-1 row-start-1', language !== 'en' && 'invisible')} aria-hidden={language !== 'en'}>
                      {item.en}
                    </span>
                    <span className={cn('col-start-1 row-start-1', language !== 'ar' && 'invisible')} aria-hidden={language !== 'ar'}>
                      {item.ar}
                    </span>
                  </span>
                </Link>
              )}

              {/* Animated underline */}
              {shouldReduceMotion ? (
                (active || isOpen) && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red"
                    aria-hidden="true"
                  />
                )
              ) : (
                <motion.span
                  variants={underlineVariants}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red"
                  style={{ transformOrigin: isRTL ? 'right' : 'left' }}
                  aria-hidden="true"
                />
              )}

              {/* Compact dropdown */}
              <AnimatePresence>
                {isOpen && item.dropdown && (
                  <HeaderDropdown
                    key={item.en + '-drop'}
                    items={item.dropdown}
                    language={language}
                    isRTL={isRTL}
                    onEnter={cancelClose}
                    onLeave={scheduleClose}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
}
