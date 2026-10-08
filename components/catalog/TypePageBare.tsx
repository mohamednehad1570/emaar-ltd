'use client';

/**
 * components/catalog/TypePageBare.tsx
 *
 * Bare product-type page (/products/[slug]) — Batch 2 scaffold with real catalog
 * data and minimal layout. Placeholder types show only their name plus a neutral
 * "coming soon" line so no unverified copy reaches visitors.
 */

import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/layout/Container';
import ProductDetailCTA from '@/components/products/ProductDetailCTA';
import { useTranslation } from '@/contexts/LanguageContext';
import { CATALOG_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import type { ProductType } from '@/lib/data/catalog';
import type { AvailabilityView } from './types';

interface TypePageBareProps {
  type: ProductType;
  availability: AvailabilityView[];
}

export default function TypePageBare({ type, availability }: TypePageBareProps) {
  const t = useTranslation();
  const isPlaceholder = type.placeholder === true;

  return (
    <>
      <PageHeader
        eyebrow={t(COPY.typeEyebrow.en, COPY.typeEyebrow.ar)}
        title={type.name.en}
        titleAr={type.name.ar}
        description={isPlaceholder ? COPY.comingSoon.en : type.description.en}
        descriptionAr={isPlaceholder ? COPY.comingSoon.ar : type.description.ar}
      />

      {!isPlaceholder && (
        <Container className="py-12 space-y-10 text-ink-body">
          {/* ── Best for + materials ──────────────────────────── */}
          {type.bestFor.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-ink-heading mb-2">{t(COPY.bestFor.en, COPY.bestFor.ar)}</h2>
              <ul className="list-disc ps-5 space-y-1">
                {type.bestFor.map((b) => <li key={b.en}>{t(b.en, b.ar)}</li>)}
              </ul>
            </section>
          )}

          <p>
            <span className="font-semibold text-ink-heading">{t(COPY.availableIn.en, COPY.availableIn.ar)}: </span>
            {availability.map((a) => t(a.material.en, a.material.ar)).join(' · ')}
          </p>

          {/* ── Per-material availability ─────────────────────── */}
          <div className="grid gap-8 md:grid-cols-2">
            {availability.map((a) => (
              <section key={a.material.en} className="border border-border-light rounded-[2px] p-6">
                <h2 className="text-xl font-bold text-ink-heading mb-4">{t(a.material.en, a.material.ar)}</h2>
                <dl className="space-y-3">
                  {a.configurations.length > 0 && (
                    <div>
                      <dt className="font-semibold text-ink-heading">{t(COPY.configurations.en, COPY.configurations.ar)}</dt>
                      <dd>{a.configurations.map((c) => t(c.en, c.ar)).join(' · ')}</dd>
                    </div>
                  )}
                  {a.systems.length > 0 && (
                    <div>
                      <dt className="font-semibold text-ink-heading">{t(COPY.profileSystems.en, COPY.profileSystems.ar)}</dt>
                      {/* System names are Latin product codes — dir=ltr keeps their order in RTL */}
                      <dd><span dir="ltr">{a.systems.join(' · ')}</span></dd>
                    </div>
                  )}
                  {a.glassRangeMm && (
                    <div>
                      <dt className="font-semibold text-ink-heading">{t(COPY.glassRange.en, COPY.glassRange.ar)}</dt>
                      <dd>
                        {/* dir=ltr so "4–32" never renders as "32–4" in Arabic */}
                        <span dir="ltr">{a.glassRangeMm[0]}–{a.glassRangeMm[1]}</span> {t(COPY.mm.en, COPY.mm.ar)}
                      </dd>
                    </div>
                  )}
                </dl>
              </section>
            ))}
          </div>
        </Container>
      )}

      <ProductDetailCTA />
    </>
  );
}
