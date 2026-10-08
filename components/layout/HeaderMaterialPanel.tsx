'use client';

/**
 * components/layout/HeaderMaterialPanel.tsx
 *
 * Desktop (≥1024) dropdown for a material: one column per type group that has
 * items (Windows · Doors · Facades · Specialty), each type → /products/[slug],
 * plus a footer row (all products · glass · accessories). Text only for now —
 * pictograms arrive in a later batch.
 *
 * Positioned at the trigger's physical left (the header row is dir="ltr") and
 * nudged back inside the viewport by usePanelClamp; the panel's own dir follows
 * the language so Arabic columns read right-to-left.
 */

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { followSamePageHash } from '@/lib/navigateHash';
import { materialOptionLinks, type NavMaterial } from '@/lib/data/nav';
import { usePanelClamp } from './usePanelClamp';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const LINK = 'flex items-center min-h-11 text-sm text-ink-body hover:text-ink-heading focus-visible:outline-2 focus-visible:outline-silver-material';

interface Props {
  id: string;
  material: NavMaterial;
  language: 'en' | 'ar';
  onEnter: () => void;
  onLeave: () => void;
  onNavigate: () => void;
}

export default function HeaderMaterialPanel({ id, material, language, onEnter, onLeave, onNavigate }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  usePanelClamp(ref);

  // Same-page hash links (e.g. #glass while on /upvc) need a manual scroll
  const follow = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (followSamePageHash(href)) e.preventDefault();
    onNavigate();
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      data-nav-panel
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      // 0.2s fade + 4px drop per spec
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4, transition: { duration: 0.12 } }}
      transition={{ duration: 0.2, ease: EASE }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="absolute top-full z-50 w-max max-w-[calc(100vw-32px)] bg-white border border-border-light rounded-[2px] shadow-warm-md px-7 pt-6 pb-4"
    >
      {/* ── Type columns ────────────────────────────────────── */}
      <div className="flex gap-10">
        {material.groups.map(g => (
          <div key={g.id} className="min-w-[150px]">
            <p className="mb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-ink-muted">
              {g.label[language]}
            </p>
            <ul>
              {g.types.map(t => (
                <li key={t.slug}>
                  <Link href={`/products/${t.slug}`} onClick={onNavigate} className={LINK}>
                    {t.name[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Footer row: landing page + option sections ─────── */}
      <ul className="mt-4 pt-2 border-t border-border-light flex flex-wrap gap-x-8">
        {materialOptionLinks(material).map(l => (
          <li key={l.href}>
            <Link href={l.href} onClick={e => follow(e, l.href)} className={`${LINK} font-semibold text-ink-heading`}>
              {l[language]}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
