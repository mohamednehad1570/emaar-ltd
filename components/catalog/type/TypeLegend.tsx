'use client';

/**
 * components/catalog/type/TypeLegend.tsx
 * Static "Available in" plate pinned to the hero image's physical bottom-right corner.
 * Lists only the materials in the type's availability — not interactive.
 */

import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { CATALOG_PAGE_COPY } from '@/lib/data/uiStrings';
import type { MaterialSpecView } from '../types';
import MaterialSwatch from './MaterialSwatch';

export default function TypeLegend({ materials }: { materials: MaterialSpecView[] }) {
  const { isRTL } = useLanguage();
  const t = useTranslation();

  return (
    // Plate position is physical (set by the parent); only its text follows the language
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      data-testid="type-legend"
      className="bg-white rounded-card shadow-warm-sm px-3 py-2.5 text-start"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted mb-1.5">
        {t(CATALOG_PAGE_COPY.availableIn.en, CATALOG_PAGE_COPY.availableIn.ar)}
      </p>
      <ul className="space-y-1">
        {materials.map((m) => (
          <li key={m.id} data-material={m.id} className="flex items-center gap-2 text-sm font-semibold text-ink-heading">
            <MaterialSwatch id={m.id} />
            {t(m.name.en, m.name.ar)}
          </li>
        ))}
      </ul>
    </div>
  );
}
