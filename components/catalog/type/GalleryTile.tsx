'use client';

/**
 * components/catalog/type/GalleryTile.tsx
 * One gallery image. Real photos are buttons that open the Lightbox and zoom 1.03 on
 * hover; cream placeholders are inert (nothing to enlarge). <768 every tile is 4:3.
 */

import { motion } from 'framer-motion';
import ImageSlot from '@/components/ui/ImageSlot';
import type { GalleryShape } from './galleryLayout';
import type { PlaceholderTag } from '@/lib/data/placeholderPhotos';

// Mobile is always 4:3; the shape's ratio applies from md up. Literal strings for Tailwind.
const SHAPE: Record<GalleryShape, { ratio: '4/5' | '21/9' | '4/3'; cls: string; sizes: string }> = {
  portrait:  { ratio: '4/5',  cls: 'aspect-4/3 md:aspect-4/5',  sizes: '(min-width:768px) 33vw, 100vw' },
  wide:      { ratio: '21/9', cls: 'aspect-4/3 md:aspect-21/9', sizes: '100vw' },
  landscape: { ratio: '4/3',  cls: 'aspect-4/3',               sizes: '(min-width:768px) 50vw, 100vw' },
};

// 0.4s ease-out — slow enough to feel like a camera push, not a jump
const ZOOM = { rest: { scale: 1 }, hover: { scale: 1.03, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } } };

interface GalleryTileProps {
  src: string | null;
  alt: string;
  shape: GalleryShape;
  openLabel: string;
  onOpen: () => void;
  // TEMPORARY review photo for a null src — the tile still counts as a placeholder (not clickable)
  placeholderKey?: string;
  placeholderTag?: PlaceholderTag;
}

export default function GalleryTile({ src, alt, shape, openLabel, onOpen, placeholderKey, placeholderTag }: GalleryTileProps) {
  const s = SHAPE[shape];
  const slot = (
    <ImageSlot src={src} alt={alt} ratio={s.ratio} className={`${s.cls} rounded-none`} sizes={s.sizes}
      placeholderKey={placeholderKey} placeholderTag={placeholderTag} />
  );

  // ── Placeholder — not clickable ─────────────────────────
  if (src === null) {
    return <div data-shape={shape} className="overflow-hidden rounded-card">{slot}</div>;
  }

  // ── Real photo — opens the lightbox ─────────────────────
  return (
    <motion.button
      type="button"
      data-shape={shape}
      onClick={onOpen}
      aria-label={`${openLabel}: ${alt}`}
      initial="rest" whileHover="hover" whileFocus="hover" animate="rest"
      className="block w-full overflow-hidden rounded-card cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
    >
      <motion.div variants={ZOOM}>{slot}</motion.div>
    </motion.button>
  );
}
