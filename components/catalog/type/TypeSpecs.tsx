'use client';

/**
 * components/catalog/type/TypeSpecs.tsx
 * Specifications — one column per available material (side by side ≥768, a single
 * centred column when only one). Values come from the catalog only; the section is
 * dropped when no material has a single spec row (e.g. aluminum-only specialty types).
 */

import { useTranslation } from '@/contexts/LanguageContext';
import { TYPE_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import Container from '@/components/layout/Container';
import { cn } from '@/lib/cn';
import type { MaterialSpecView } from '../types';
import SpecColumn from './SpecColumn';

const hasRows = (m: MaterialSpecView) =>
  m.configurations.length > 0 || m.systems.length > 0 || Boolean(m.glassRangeMm) || Boolean(m.sashLimits);

export default function TypeSpecs({ materials }: { materials: MaterialSpecView[] }) {
  const t = useTranslation();
  if (!materials.some(hasRows)) return null;
  const single = materials.length === 1;

  return (
    <section className="bg-surface-white border-t border-border-light py-16 md:py-20">
      <Container>
        <h2 className="font-bold text-ink-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.01em] mb-8 md:mb-12">
          {t(COPY.specs.en, COPY.specs.ar)}
        </h2>

        {/* max-w-2xl keeps a lone column readable instead of stretching to 1280px */}
        <div className={cn('grid gap-6', single ? 'max-w-2xl mx-auto' : 'md:grid-cols-2')}>
          {materials.map((m) => <SpecColumn key={m.id} spec={m} />)}
        </div>

        <p className={cn('mt-6 text-sm text-ink-muted', single && 'max-w-2xl mx-auto')}>
          {t(COPY.footnote.en, COPY.footnote.ar)}
        </p>
      </Container>
    </section>
  );
}
