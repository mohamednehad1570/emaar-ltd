'use client';

/**
 * components/catalog/material/OptionCard.tsx
 *
 * One Options tile — no box: media on top, text 8px below. Media is a flat hex swatch
 * (colours, performance glass) or an ImageSlot (designs, decorative glass, accessories 1:1).
 * Openable cards are buttons (Lightbox); the rest are inert. Hover zoom 1.03 / 0.4s is a
 * Tailwind group-hover utility; `reduceMotion` (from MaterialOptions) drops it.
 */

import { useTranslation } from '@/contexts/LanguageContext';
import ImageSlot from '@/components/ui/ImageSlot';
import { cn } from '@/lib/cn';
import type { OptionCardView } from '../types';

interface OptionCardProps {
  card: OptionCardView;
  reduceMotion: boolean;
  // undefined = nothing to enlarge → rendered as a plain div
  onOpen?: () => void;
}

export default function OptionCard({ card, reduceMotion, onOpen }: OptionCardProps) {
  const t = useTranslation();
  const name = t(card.name.en, card.name.ar);
  const m = card.media;

  const body = (
    <>
      {/* ── Media ───────────────────────────────────────────── */}
      {/* Border on the non-scaling frame so near-white swatches still read on off-white */}
      <div className="overflow-hidden rounded-card border border-border-light">
        <div className={cn('transition-[scale] duration-400 ease-out', !reduceMotion && 'group-hover:scale-103')}>
          {m.kind === 'swatch' ? (
            // Hex is catalog data (a product swatch — the one place blue may appear)
            <div aria-hidden="true" className="aspect-4/3 w-full" style={{ backgroundColor: m.hex }} />
          ) : (
            <ImageSlot src={m.src} alt={name} ratio={m.ratio} className="rounded-none"
              sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
              placeholderKey={m.placeholderKey} placeholderTag={m.placeholderTag} />
          )}
        </div>
      </div>

      {/* ── Text ────────────────────────────────────────────── */}
      <span className="mt-2 block text-sm font-semibold leading-snug text-ink-heading">{name}</span>
      {card.meta && <span className="block text-xs text-ink-body">{t(card.meta.en, card.meta.ar)}</span>}
      {/* Inner dir=ltr keeps printed codes (K7610L · 7640M) in catalog order inside Arabic,
          while the outer block still aligns to the reading-start edge */}
      {card.code && <span className="block text-xs text-ink-muted tabular-nums"><span dir="ltr">{card.code}</span></span>}

      {card.dots && (
        <span className="mt-1.5 flex flex-wrap gap-1.5">
          {card.dots.map((d) => {
            const label = `${t(d.name.en, d.name.ar)}${d.ral ? ` · RAL ${d.ral}` : ''}`;
            return (
              // 12px dot; title = hover tooltip, role=img + aria-label = screen-reader name
              <span key={label} role="img" aria-label={label} title={label}
                className="size-3 rounded-full border border-border-medium" style={{ backgroundColor: d.hex }} />
            );
          })}
        </span>
      )}

      {card.note && <span className="mt-1 block text-xs leading-relaxed text-ink-muted">{t(card.note.en, card.note.ar)}</span>}
    </>
  );

  if (!onOpen) return <div data-option={card.id} className="text-start">{body}</div>;

  return (
    <button
      type="button"
      data-option={card.id}
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group block w-full text-start cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red"
    >
      {body}
    </button>
  );
}
