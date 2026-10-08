'use client';

/**
 * components/catalog/type/TypeHotspots.tsx
 *
 * Interactive feature diagram: numbered pins over a 4:3 ImageSlot + a numbered list.
 * Hover/focus on either side highlights the matching item on the other (shared `active`).
 * Highlight persists after the pointer leaves so the last-read feature stays marked.
 * <768 the list sits below the diagram, so tapping a pin scrolls its list item into view.
 * Hidden entirely when the mechanism has no hotspot set ('unspecified').
 */

import { useId, useRef, useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { TYPE_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import Container from '@/components/layout/Container';
import ImageSlot from '@/components/ui/ImageSlot';
import { cn } from '@/lib/cn';
import type { Hotspot } from '@/lib/data/catalog';
import HotspotPin from './HotspotPin';

interface TypeHotspotsProps {
  hotspots: Hotspot[];
  diagramImage: string | null;
  typeName: string;
}

export default function TypeHotspots({ hotspots, diagramImage, typeName }: TypeHotspotsProps) {
  const t = useTranslation();
  const [active, setActive] = useState<number | null>(null);
  const items = useRef<Map<number, HTMLLIElement>>(new Map());
  const base = useId();
  if (hotspots.length === 0) return null;

  const detailId = (n: number) => `${base}-detail-${n}`;

  const activate = (n: number, fromTap: boolean) => {
    setActive(n);
    // Only a pin tap on the stacked (<768) layout needs to bring the list item on screen
    if (fromTap && window.matchMedia('(max-width: 767px)').matches) {
      items.current.get(n)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section className="bg-off-white py-16 md:py-20" aria-labelledby={`${base}-title`}>
      <Container>
        <h2 id={`${base}-title`} className="font-bold text-ink-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.01em] mb-8 md:mb-12">
          {t(COPY.features.en, COPY.features.ar)}
        </h2>

        <div className="grid gap-8 md:grid-cols-[3fr_2fr] md:gap-12 md:items-center">
          {/* ── Diagram ─────────────────────────────────────── */}
          {/* dir=ltr: pin x/y are physical and must not mirror in Arabic */}
          <div dir="ltr" className="relative">
            <ImageSlot
              src={diagramImage}
              alt={`${typeName} — ${t(COPY.diagramAlt.en, COPY.diagramAlt.ar)}`}
              ratio="4/3"
              className="rounded-card"
              sizes="(min-width:768px) 60vw, 100vw"
            />
            {hotspots.map((p) => (
              <HotspotPin
                key={p.n}
                point={p}
                label={t(p.label.en, p.label.ar)}
                active={active === p.n}
                detailId={detailId(p.n)}
                onActivate={activate}
              />
            ))}
          </div>

          {/* ── Numbered list ───────────────────────────────── */}
          <ol className="space-y-2">
            {hotspots.map((p) => {
              const on = active === p.n;
              return (
                <li key={p.n} ref={(el) => { if (el) items.current.set(p.n, el); else items.current.delete(p.n); }}>
                  <button
                    type="button"
                    aria-describedby={detailId(p.n)}
                    aria-pressed={on}
                    onMouseEnter={() => setActive(p.n)}
                    onFocus={() => setActive(p.n)}
                    onClick={() => setActive(p.n)}
                    className={cn(
                      'w-full min-h-11 flex items-start gap-4 p-4 text-start border rounded-card',
                      'focus-visible:outline-2 focus-visible:outline-brand-red',
                      on ? 'bg-surface-white border-silver-material' : 'border-transparent',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'size-6 shrink-0 rounded-full border flex items-center justify-center text-xs font-bold',
                        on ? 'bg-brand-red border-brand-red text-white' : 'bg-white border-border-medium text-ink-heading',
                      )}
                    >
                      {p.n}
                    </span>
                    <span>
                      <span className="block font-bold text-ink-heading">{t(p.label.en, p.label.ar)}</span>
                      <span id={detailId(p.n)} className="block mt-1 text-sm text-ink-body leading-relaxed">
                        {t(p.detail.en, p.detail.ar)}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
