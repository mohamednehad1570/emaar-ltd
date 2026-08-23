'use client';

/**
 * components/layout/MobileNavList.tsx
 * Scrollable nav accordion for the mobile overlay.
 * Extracted from HeaderMobileOverlay to keep that file under 150 lines.
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CaretDown } from '@phosphor-icons/react';
import { NAV, isActive } from '@/lib/data/nav';
import { cn } from '@/lib/cn';

interface Props {
  language: 'en' | 'ar';
  pathname: string;
  onClose:  () => void;
}

// 0.23,1,0.32,1 — snappy deceleration matching the drawer easing family
const EASE_UI: [number, number, number, number] = [0.23, 1, 0.32, 1];
const SPRING = { type: 'spring' as const, stiffness: 300, damping: 25 };

export default function MobileNavList({ language, pathname, onClose }: Props) {
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
                    'w-full flex items-center justify-between px-5 min-h-[52px]',
                    'text-lg font-semibold transition-colors duration-150',
                    active ? 'text-brand-red bg-cream border-l-2 border-brand-red' : 'text-text-heading',
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
                                'flex items-center min-h-[52px] pl-6 pr-5 text-sm transition-colors duration-150',
                                subActive
                                  ? 'text-brand-red font-semibold border-l-2 border-brand-red'
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
                  'flex items-center min-h-[52px] px-5 text-lg font-semibold transition-colors duration-150',
                  active
                    ? 'text-brand-red bg-cream border-l-2 border-brand-red'
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
  );
}
