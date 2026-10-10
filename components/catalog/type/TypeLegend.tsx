'use client';

/**
 * components/catalog/type/TypeLegend.tsx
 * Static "Available in" list at the hero image's bottom inline-end corner (bottom-right in EN,
 * bottom-left in AR). No plate —
 * TypeHero puts a radial off-white scrim behind it. Only the type's materials; not interactive.
 */

import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { CATALOG_PAGE_COPY } from '@/lib/data/uiStrings';
import type { MaterialConfigView } from '../types';
import MaterialSwatch from './MaterialSwatch';

export default function TypeLegend({ materials }: { materials: MaterialConfigView[] }) {
  const { isRTL } = useLanguage();
  const t = useTranslation();

  return (
    // Position is set by the parent (end-0); the list itself reads from inline-start
    <div dir={isRTL ? 'rtl' : 'ltr'} data-testid="type-legend" className="text-start">
      {/* ink-body over the scrim — muted grey would drop below 4.5:1 on a photo */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-body mb-1.5">
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
