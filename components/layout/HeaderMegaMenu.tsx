'use client';

/**
 * components/layout/HeaderMegaMenu.tsx
 * Fixed full-width mega menu for the Products nav item.
 * RTL: dir="rtl" on wrapper reverses grid column visual order automatically.
 * Shadow: rgba(45,41,38,0.12) — warm brand system, never cold rgba(0,0,0).
 */

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/cn';

const UPVC_LINKS = [
  { label: 'Windows',         href: '/products/upvc/windows'           },
  { label: 'Doors',           href: '/products/upvc/doors'             },
  { label: 'Doors & Windows', href: '/products/upvc/doors-and-windows' },
  { label: 'Staircases',      href: '/products/upvc/staircases'        },
  { label: 'Stained Glass',   href: '/products/upvc/stained-glass'     },
  { label: 'Sandblast',       href: '/products/upvc/sandblast'         },
  { label: 'Hebeschibe',      href: '/products/upvc/hebeschibe'        },
];
const ALUMINUM_LINKS = [
  { label: 'Windows',         href: '/products/aluminum/windows'           },
  { label: 'Doors',           href: '/products/aluminum/doors'             },
  { label: 'Doors & Windows', href: '/products/aluminum/doors-and-windows' },
  { label: 'Staircases',      href: '/products/aluminum/staircases'        },
  { label: 'Skylights',       href: '/products/aluminum/skylights'         },
  { label: 'Stained Glass',   href: '/products/aluminum/stained-glass'     },
  { label: 'Sandblast',       href: '/products/aluminum/sandblast'         },
];

interface ColumnProps {
  material: string;
  title:    string;
  links:    { label: string; href: string }[];
  viewAll:  { label: string; href: string };
  pathname: string;
  isRTL:    boolean;
}

function MegaMenuColumn({ material, title, links, viewAll, pathname, isRTL }: ColumnProps) {
  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      {/* ── Column header ─────────────────────────────────────── */}
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-text-muted mb-1">{material}</p>
      <h3 className="text-lg font-bold text-brand-dark mb-2">{title}</h3>
      {/* h-0.5 per CLAUDE.md accent line rule — not h-1 (that's for section headings) */}
      <div className="h-0.5 w-8 bg-brand-red mb-5" />

      {/* ── Category links ──────────────────────────────────────── */}
      <ul className="space-y-0.5">
        {links.map(({ label, href }) => {
          const active = pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'block py-2 text-sm transition-all duration-150',
                  // translate flips so hover nudges toward reading-end in both directions
                  isRTL ? 'hover:-translate-x-1' : 'hover:translate-x-1',
                  active
                    ? 'text-brand-red font-semibold'
                    : 'text-text-body hover:text-brand-red',
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ── View-all footer ─────────────────────────────────────── */}
      <Link
        href={viewAll.href}
        className={cn(
          'inline-flex items-center gap-1 mt-4 pt-4 w-full border-t border-border-light',
          'text-xs font-semibold text-brand-red hover:text-brand-red-dark transition-colors duration-150',
          // flex-row-reverse keeps icon on reading-end side in RTL
          isRTL && 'flex-row-reverse',
        )}
      >
        <span>{viewAll.label}</span>
        {/* Arrow rotates 180° in RTL — points toward reading-start edge */}
        <ArrowRight className={cn('w-3 h-3 shrink-0', isRTL && 'rotate-180')} weight="bold" />
      </Link>
    </div>
  );
}

interface Props { onEnter: () => void; onLeave: () => void }

export default function HeaderMegaMenu({ onEnter, onLeave }: Props) {
  const { language, isRTL } = useLanguage();
  const pathname            = usePathname();
  const shouldReduce        = useReducedMotion();

  return (
    <motion.div
      // initial=false skips the slide-in entirely for reduced-motion users
      initial={shouldReduce ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
      // 0.18s with [0.23,1,0.32,1] — snappy entry; ease gives premium deceleration tail
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: 'fixed', top: 56, left: 0, right: 0, zIndex: 40,
        // warm shadow per brand system — rgba(45,41,38) never rgba(0,0,0)
        boxShadow: '0 10px 40px rgba(45,41,38,0.12)',
      }}
      className="bg-white border-b border-border-light"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      // dir on wrapper makes grid flow RTL — columns visually reverse without DOM reorder
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* ── Two-column grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-12">
          <MegaMenuColumn
            material={language === 'en' ? 'Material' : 'المادة'}
            title={language === 'en' ? 'uPVC Systems' : 'أنظمة uPVC'}
            links={UPVC_LINKS}
            viewAll={{ label: language === 'en' ? 'View all uPVC' : 'عرض كل uPVC', href: '/products/upvc' }}
            pathname={pathname}
            isRTL={isRTL}
          />
          <MegaMenuColumn
            material={language === 'en' ? 'Material' : 'المادة'}
            title={language === 'en' ? 'Aluminium Systems' : 'أنظمة الألومنيوم'}
            links={ALUMINUM_LINKS}
            viewAll={{ label: language === 'en' ? 'View all Aluminium' : 'عرض كل الألومنيوم', href: '/products/aluminum' }}
            pathname={pathname}
            isRTL={isRTL}
          />
        </div>
      </div>
    </motion.div>
  );
}
