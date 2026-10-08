'use client';

/**
 * components/catalog/type/TypeConfigurations.tsx
 * "Available configurations" — per material: swatch + label, then its configurations as
 * plain chips (or "Custom sizes on request" when the catalog lists none). Technical
 * figures (profile systems, glass, sash limits) live on /technical, reached by the
 * quiet link at the end; the data itself stays in lib/data/catalog.
 */

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { useTranslation } from '@/contexts/LanguageContext';
import { TYPE_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import Container from '@/components/layout/Container';
import type { MaterialConfigView } from '../types';
import MaterialSwatch from './MaterialSwatch';

export default function TypeConfigurations({ materials }: { materials: MaterialConfigView[] }) {
  const t = useTranslation();

  return (
    <section className="bg-off-white border-t border-border-light py-16 md:py-20" data-testid="type-configurations">
      <Container>
        <h2 className="font-bold text-ink-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.01em] mb-8 md:mb-10">
          {t(COPY.configsTitle.en, COPY.configsTitle.ar)}
        </h2>

        <div className="space-y-8">
          {materials.map((m) => (
            <div key={m.id} data-material={m.id}>
              <h3 className="flex items-center gap-3 text-[clamp(1.125rem,1.5vw,1.375rem)] font-semibold text-ink-heading leading-[1.3] mb-3">
                <MaterialSwatch id={m.id} className="size-4" />
                {t(m.name.en, m.name.ar)}
              </h3>
              {m.configurations.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {m.configurations.map((c) => (
                    <li key={c.en} className="px-3 py-1.5 border border-border-light bg-surface-white text-sm font-semibold text-ink-body">
                      {t(c.en, c.ar)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-ink-body">{t(COPY.customSizes.en, COPY.customSizes.ar)}</p>
              )}
            </div>
          ))}
        </div>

        {/* ── Quiet link to the full technical data ─────────── */}
        {/* min-h-11 keeps the 44px touch target without making the link look like a button */}
        <Link
          href="/technical"
          className="mt-10 inline-flex items-center gap-2 min-h-11 text-sm font-semibold text-ink-body underline-offset-4 hover:text-ink-heading hover:underline"
        >
          {t(COPY.techLink.en, COPY.techLink.ar)}
          {/* Arrow flips in RTL so it points along the reading direction (← in Arabic) */}
          <ArrowRight size={16} aria-hidden="true" className="rtl:rotate-180" />
        </Link>
      </Container>
    </section>
  );
}
