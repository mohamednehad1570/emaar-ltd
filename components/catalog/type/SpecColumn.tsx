'use client';

/**
 * components/catalog/type/SpecColumn.tsx
 * One material's specs: configurations · profile systems · glass range · sash limits.
 * Every row renders only when it has data — no empty labels ever reach the page.
 * Numbers sit in dir=ltr spans so ranges like "4–32" never flip in Arabic.
 */

import type { ReactNode } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { CATALOG_PAGE_COPY, TYPE_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import type { MaterialSpecView } from '../types';
import MaterialSwatch from './MaterialSwatch';
import SystemCard from './SystemCard';

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="py-5 border-t border-border-light first:border-t-0 first:pt-0">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted mb-3">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

const Num = ({ children }: { children: ReactNode }) => <span dir="ltr" className="tabular-nums">{children}</span>;

export default function SpecColumn({ spec }: { spec: MaterialSpecView }) {
  const t = useTranslation();
  const mm = t(CATALOG_PAGE_COPY.mm.en, CATALOG_PAGE_COPY.mm.ar);
  const limits = spec.sashLimits;
  const empty = spec.configurations.length === 0 && spec.systems.length === 0 && !spec.glassRangeMm && !limits;

  return (
    <section data-material={spec.id} className="bg-surface-white border border-border-light rounded-card p-6 md:p-8">
      {/* ── Column header ─────────────────────────────────── */}
      <h3 className="flex items-center gap-3 text-[clamp(1.125rem,1.5vw,1.375rem)] font-semibold text-ink-heading mb-6">
        <MaterialSwatch id={spec.id} className="size-4" />
        {t(spec.name.en, spec.name.ar)}
      </h3>

      {empty ? (
        <p className="text-ink-muted">{t(COPY.onRequest.en, COPY.onRequest.ar)}</p>
      ) : (
        <dl>
          {spec.configurations.length > 0 && (
            <Row label={t(CATALOG_PAGE_COPY.configurations.en, CATALOG_PAGE_COPY.configurations.ar)}>
              <ul className="flex flex-wrap gap-2">
                {spec.configurations.map((c) => (
                  <li key={c.en} className="px-3 py-1.5 border border-border-light bg-off-white text-sm font-semibold text-ink-body">
                    {t(c.en, c.ar)}
                  </li>
                ))}
              </ul>
            </Row>
          )}

          {spec.systems.length > 0 && (
            <Row label={t(CATALOG_PAGE_COPY.profileSystems.en, CATALOG_PAGE_COPY.profileSystems.ar)}>
              <div className="grid gap-3 sm:grid-cols-2">
                {spec.systems.map((s) => <SystemCard key={s.name} system={s} />)}
              </div>
            </Row>
          )}

          {spec.glassRangeMm && (
            <Row label={t(COPY.glassRange.en, COPY.glassRange.ar)}>
              <p className="text-ink-heading font-semibold">
                <Num>{spec.glassRangeMm[0]}–{spec.glassRangeMm[1]}</Num> {mm}
              </p>
            </Row>
          )}

          {limits && (
            <Row label={t(COPY.sashLimits.en, COPY.sashLimits.ar)}>
              <p className="text-ink-heading font-semibold">
                {t(COPY.width.en, COPY.width.ar)} <Num>{limits.widthMm[0].toLocaleString('en')}–{limits.widthMm[1].toLocaleString('en')}</Num> {mm}
                {' · '}
                {t(COPY.height.en, COPY.height.ar)} <Num>{limits.heightMm[0].toLocaleString('en')}–{limits.heightMm[1].toLocaleString('en')}</Num> {mm}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{t(limits.note.en, limits.note.ar)}</p>
            </Row>
          )}
        </dl>
      )}
    </section>
  );
}
