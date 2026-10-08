/**
 * components/ui/ImageSlot.tsx
 *
 * Fixed-ratio image frame. Renders a blank cream placeholder while IMAGES
 * values are null, and swaps to next/image automatically once a real
 * /images/<path>.webp is filled in — call sites never change.
 */

import Image from 'next/image';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/cn';
// TEMPORARY review photos — remove with lib/data/placeholderPhotos.ts before launch
import { USE_PLACEHOLDER_PHOTOS, placeholderFor, type PlaceholderTag } from '@/lib/data/placeholderPhotos';

type SlotRatio = '4/3' | '16/9' | '1/1' | '4/5' | '21/9';

interface ImageSlotProps {
  src: string | null;
  alt: string;
  ratio: SlotRatio;
  className?: string;
  priority?: boolean;
  sizes?: string;
  // 'contain' letterboxes the whole photo (lightbox); 'cover' crops to fill (everything else)
  fit?: 'cover' | 'contain';
  // TEMPORARY: stable key (+ optional pool tag) for a review photo while src is null
  placeholderKey?: string;
  placeholderTag?: PlaceholderTag;
}

// Static class map — Tailwind can't detect `aspect-[${ratio}]` built at runtime
const RATIO_CLASS: Record<SlotRatio, string> = {
  '4/3': 'aspect-4/3',
  '16/9': 'aspect-video',
  '1/1': 'aspect-square',
  '4/5': 'aspect-4/5',   // gallery portraits
  '21/9': 'aspect-21/9', // gallery wide row
};

export default function ImageSlot({
  src: srcProp,
  alt,
  ratio,
  className,
  priority = false,
  // Default fits a 4-col desktop / 2-col mobile grid — the most common card layout
  sizes = '(min-width:1024px) 25vw, 50vw',
  fit = 'cover',
  placeholderKey,
  placeholderTag,
}: ImageSlotProps) {
  // ── TEMPORARY placeholder photo (remove before launch) ──
  // A real src always wins; without a key the slot stays the blank cream frame
  const src = srcProp ?? (USE_PLACEHOLDER_PHOTOS && placeholderKey ? placeholderFor(placeholderKey, placeholderTag) : null);

  // Avatars opt into a circle via className; every other slot keeps the 8px card radius
  const isCircle = ratio === '1/1' && (className ?? '').includes('rounded-full');

  const frame = cn(
    'relative overflow-hidden',
    RATIO_CLASS[ratio],
    isCircle ? 'rounded-full' : 'rounded-sm', // rounded-sm = 8px in globals.css
    className,
  );

  // ── Blank placeholder (no photo inserted yet) ───────────
  if (src === null) {
    return (
      <div role="img" aria-label={alt} className={cn(frame, 'flex items-center justify-center bg-cream')}>
        {/* text-dim (#A8A49E) is the warm token nearest #AAADAE — keeps the palette blue-free */}
        <ImageIcon size={32} weight="thin" className="text-dim" aria-hidden="true" />
      </div>
    );
  }

  // ── Real photo ──────────────────────────────────────────
  return (
    <div className={frame}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={fit === 'contain' ? 'object-contain' : 'object-cover'} />
    </div>
  );
}
