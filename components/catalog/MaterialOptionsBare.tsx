'use client';

/**
 * components/catalog/MaterialOptionsBare.tsx
 * Plain #glass and #accessories sections — nav, footer and the old /products/glass and
 * /accessories redirects all land on these ids until the Options tabs ship.
 */

import Container from '@/components/layout/Container';
import { useTranslation } from '@/contexts/LanguageContext';
import { CATALOG_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import type { GlassOption } from '@/lib/data/catalog';
import type { AccessoryRow } from './types';

interface MaterialOptionsBareProps {
  glass: GlassOption[];
  accessories: AccessoryRow[];
}

export default function MaterialOptionsBare({ glass, accessories }: MaterialOptionsBareProps) {
  const t = useTranslation();
  const glassGroups = [
    { id: 'performance', label: COPY.glassPerformance },
    { id: 'decorative', label: COPY.glassDecorative },
  ] as const;

  return (
    <>
      {/* ── Glass ───────────────────────────────────────────── */}
      <section id="glass" className="bg-surface-white border-t border-border-light">
        <Container className="py-12">
          <h2 className="text-2xl font-bold text-ink-heading mb-6">{t(COPY.glass.en, COPY.glass.ar)}</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {glassGroups.map((g) => (
              <div key={g.id}>
                <h3 className="text-lg font-semibold text-ink-heading mb-2">{t(g.label.en, g.label.ar)}</h3>
                <ul className="space-y-1 text-ink-body">
                  {glass.filter((o) => o.group === g.id).map((o) => (
                    <li key={o.id}>
                      {t(o.name.en, o.name.ar)}
                      {o.supplier && <span className="text-ink-muted"> — {o.supplier}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Accessories ─────────────────────────────────────── */}
      <section id="accessories" className="border-t border-border-light">
        <Container className="py-12">
          <h2 className="text-2xl font-bold text-ink-heading mb-6">
            {t(COPY.accessories.en, COPY.accessories.ar)}
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-ink-body">
            {accessories.map((a) => (
              <li key={a.id}>
                {t(a.name.en, a.name.ar)}
                {a.brand && <span className="text-ink-muted"> — {a.brand}</span>}
                {/* dir=ltr keeps product codes in their printed order inside RTL text */}
                {a.codes.length > 0 && (
                  <span dir="ltr" className="ms-2 text-sm text-ink-muted">{a.codes.join(' · ')}</span>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
