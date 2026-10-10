'use client';

/**
 * components/ui/LightboxBody.tsx
 *
 * The Lightbox's content column: media (image, placeholder photo or flat swatch) + caption,
 * and — when the item carries `details` — a label/value panel beside it (below it <768).
 * Presentational only; Lightbox owns keys, swipe, focus and the portal.
 */

import { motion, type PanInfo } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import ImageSlot from './ImageSlot';
import type { LightboxItem } from './lightboxTypes';
import LtrText from '@/components/ui/LtrText';

interface LightboxBodyProps {
  item: LightboxItem;
  index: number;
  count: number;
  onDragEnd: (e: unknown, info: PanInfo) => void;
}

export default function LightboxBody({ item, index, count, onDragEnd }: LightboxBodyProps) {
  const t = useTranslation();
  const alt = t(item.alt.en, item.alt.ar);
  const caption = item.caption ? t(item.caption.en, item.caption.ar) : '';
  const details = item.details ?? [];
  const hasDetails = details.length > 0;

  return (
    <div className="flex flex-col items-center gap-5 md:flex-row md:items-center md:gap-10">
      {/* ── Media + caption ─────────────────────────────── */}
      {/* Width capped by both axes. With details: 64vh on phones leaves room for the panel below;
          ≥768 the panel takes ~300px, so the media drops to 60vw. Without: 92vw / 96vh (= 72vh tall) */}
      <figure className={hasDetails ? 'w-[min(92vw,64vh)] md:w-[min(60vw,96vh,840px)]' : 'w-[min(92vw,96vh,1200px)]'}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          drag={count > 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={onDragEnd}
          // img ignores pointers: otherwise native image-drag swallows the swipe gesture
          className="touch-pan-y select-none [&_img]:pointer-events-none"
        >
          {item.swatchHex ? (
            // Hex is catalog data (a product swatch), so it can't be a Tailwind token
            <div role="img" aria-label={alt} className="aspect-4/3 w-full" style={{ backgroundColor: item.swatchHex }} />
          ) : (
            <ImageSlot src={item.src} alt={alt} ratio="4/3" fit="contain" className="rounded-none" sizes="92vw"
              placeholderKey={item.placeholderKey} placeholderTag={item.placeholderTag} />
          )}
        </motion.div>
        <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm text-white/85">
          {/* With a details panel the caption becomes the panel title instead */}
          <span>{hasDetails ? '' : caption}</span>
          {/* LtrText keeps "2 / 6" in order in Arabic */}
          {count > 1 && <span data-lightbox-counter className="shrink-0"><LtrText className="tabular-nums">{index + 1} / {count}</LtrText></span>}
        </figcaption>
      </figure>

      {/* ── Details panel ───────────────────────────────── */}
      {hasDetails && (
        <div data-lightbox-details className="w-[min(92vw,64vh)] md:w-72 shrink-0 text-start text-white">
          {caption && <h2 className="text-xl font-bold leading-snug mb-4">{caption}</h2>}
          <dl className="space-y-3 border-t border-white/20 pt-4">
            {details.map((d) => (
              <div key={d.label.en}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">{t(d.label.en, d.label.ar)}</dt>
                {/* Plain strings are printed data (codes, RAL, brand) — LtrText keeps their order in Arabic */}
                <dd className="mt-0.5 text-sm leading-relaxed text-white/90">
                  {typeof d.value === 'string' ? <LtrText>{d.value}</LtrText> : t(d.value.en, d.value.ar)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
