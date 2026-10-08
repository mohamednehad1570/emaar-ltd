'use client';

/**
 * components/catalog/type/TypeIntro.tsx
 * "How it opens" + "Best for" side by side (stacked <768). Each block renders only
 * when it has data — 'unspecified' mechanisms and empty bestFor lists drop out.
 */

import { Check } from '@phosphor-icons/react';
import { useTranslation } from '@/contexts/LanguageContext';
import { TYPE_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import Container from '@/components/layout/Container';
import type { Localized, MechanismCopy } from '@/lib/data/catalog';
import type { DrawnMechanism } from '../types';
import { getPictogram } from '../pictograms';

interface TypeIntroProps {
  mechanism?: MechanismCopy;
  mechanismId?: DrawnMechanism;
  bestFor: Localized[];
}

const LABEL = 'text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted mb-3';

export default function TypeIntro({ mechanism, mechanismId, bestFor }: TypeIntroProps) {
  const t = useTranslation();
  if (!mechanism && bestFor.length === 0) return null;
  // role=img + label here (unlike the cards): the symbol is content in its own right
  const pictogram = mechanism && getPictogram(mechanismId, {
    size: 56,
    label: t(COPY.openingSymbol.en, COPY.openingSymbol.ar).replace('{name}', t(mechanism.label.en, mechanism.label.ar)),
    className: 'text-ink-muted',
  });

  return (
    <section className="bg-surface-white border-y border-border-light py-12 md:py-16">
      <Container className="grid gap-10 md:grid-cols-2 md:gap-16">
        {/* ── How it opens ──────────────────────────────────── */}
        {mechanism && (
          <div>
            <h2 className={LABEL}>{t(COPY.howItOpens.en, COPY.howItOpens.ar)}</h2>
            <div className="flex items-start gap-4">
              {pictogram}
              <div>
                <p className="text-[clamp(1.125rem,1.5vw,1.375rem)] font-semibold text-ink-heading leading-[1.3]">
                  {t(mechanism.label.en, mechanism.label.ar)}
                </p>
                <p className="mt-2 text-ink-body leading-relaxed">{t(mechanism.how.en, mechanism.how.ar)}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Best for ──────────────────────────────────────── */}
        {bestFor.length > 0 && (
          <div>
            <h2 className={LABEL}>{t(COPY.bestFor.en, COPY.bestFor.ar)}</h2>
            <ul className="space-y-2">
              {bestFor.map((b) => (
                <li key={b.en} className="flex items-center gap-3 text-ink-body">
                  <Check size={16} weight="bold" className="text-ink-muted shrink-0" aria-hidden="true" />
                  {t(b.en, b.ar)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
