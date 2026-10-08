'use client';

/**
 * components/catalog/type/SystemCard.tsx
 * Compact profile-system card — shows only the figures the catalog prints for that system.
 */

import { useTranslation } from '@/contexts/LanguageContext';
import { CATALOG_PAGE_COPY, TYPE_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import type { SystemCardView } from '../types';

export default function SystemCard({ system }: { system: SystemCardView }) {
  const t = useTranslation();
  const mm = t(CATALOG_PAGE_COPY.mm.en, CATALOG_PAGE_COPY.mm.ar);

  // [label, value] pairs; undefined figures are filtered out so no row reads "—"
  const facts: [string, string][] = [
    system.frameMm !== undefined ? [t(COPY.frame.en, COPY.frame.ar), `${system.frameMm} ${mm}`] : null,
    system.chambers !== undefined ? [t(COPY.chambers.en, COPY.chambers.ar), String(system.chambers)] : null,
    // Uf = frame thermal transmittance; unit stays Latin in both languages (standard notation)
    system.ufWm2K !== undefined ? ['Uf', `${system.ufWm2K} W/m²K`] : null,
    system.glassMm ? [t(COPY.glass.en, COPY.glass.ar), `${system.glassMm[0]}–${system.glassMm[1]} ${mm}`] : null,
  ].filter((f): f is [string, string] => f !== null);

  return (
    <article className="border border-border-light rounded-card p-4 bg-off-white">
      {/* System names are Latin product codes — dir=ltr keeps "W 880 Hebeschiebe" in order */}
      <h4 dir="ltr" className="font-bold text-ink-heading text-start rtl:text-end">{system.name}</h4>
      {facts.length > 0 && (
        <dl className="mt-2 space-y-1 text-sm">
          {facts.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3">
              <dt className="text-ink-muted">{label}</dt>
              {/* dir=ltr so "4–32 mm" never reorders to "32–4" in Arabic */}
              <dd dir="ltr" className="font-semibold text-ink-body tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
