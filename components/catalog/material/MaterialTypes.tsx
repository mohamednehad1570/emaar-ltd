'use client';

/**
 * components/catalog/material/MaterialTypes.tsx
 * "{Material} products" — type cards grouped Windows · Doors · Facades · Specialty
 * (empty groups are dropped server-side). Grid 2 / 3 / 4 columns at <768 / ≥768 / ≥1280.
 * Groups fade + rise 16px on entry (lib/motion); MotionConfig strips the rise under
 * reduced motion. useReducedMotion() is needed for the cards' Tailwind hover movement,
 * which MotionConfig can't reach (same exception as the homepage featured grids).
 */

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import { MATERIAL_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import { fadeUp, viewportOnce } from '@/lib/motion';
import Container from '@/components/layout/Container';
import type { Localized } from '@/lib/data/catalog';
import type { TypeGroupView } from '../types';
import TypeCard from './TypeCard';

export default function MaterialTypes({ material, groups }: { material: Localized; groups: TypeGroupView[] }) {
  const t = useTranslation();
  const reduceMotion = useReducedMotion() ?? false;
  const title = t(COPY.typesTitle.en, COPY.typesTitle.ar).replace('{material}', t(material.en, material.ar));

  return (
    <section className="bg-surface-white border-t border-border-light py-16 md:py-20" aria-labelledby="types-title">
      <Container>
        <h2 id="types-title" className="font-bold text-ink-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.01em] mb-10 md:mb-12">
          {title}
        </h2>

        <div className="space-y-12 md:space-y-16">
          {groups.map((g) => (
            <motion.section
              key={g.id}
              aria-labelledby={`group-${g.id}`}
              data-group={g.id}
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={viewportOnce}
            >
              {/* Label-scale group heading: small, uppercase, quiet — the cards carry the weight */}
              <h3 id={`group-${g.id}`} className="mb-4 md:mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-body">
                {t(g.label.en, g.label.ar)}
              </h3>
              {/* 12px gaps on phones, 24px from md */}
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
                {g.types.map((ty) => (
                  <li key={ty.slug}>
                    <TypeCard type={ty} reduceMotion={reduceMotion} />
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>
      </Container>
    </section>
  );
}
