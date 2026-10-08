'use client';

/**
 * components/catalog/type/TypeGallery.tsx
 * "Examples of {type}" — 3–6 photos in the row patterns from galleryLayout (≥768),
 * a single 4:3 column below that. Rows fade + rise 16px, staggered 60ms (lib/motion);
 * MotionConfig strips the rise under reduced motion. Only real photos reach the
 * Lightbox, so prev/next never lands on a blank placeholder.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import { TYPE_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import Container from '@/components/layout/Container';
import Lightbox, { type LightboxItem } from '@/components/ui/Lightbox';
import type { Localized, TypeGroup } from '@/lib/data/catalog';
import { TYPE_GALLERY_TAGS } from '@/lib/data/placeholderPhotos';
import { galleryRows } from './galleryLayout';
import GalleryTile from './GalleryTile';

// Literal grid classes per shape — 16px gaps from md up, 12px stacked on phones
const ROW_COLS = { portrait: 'md:grid-cols-3', wide: 'md:grid-cols-1', landscape: 'md:grid-cols-2' } as const;

interface TypeGalleryProps {
  gallery: (string | null)[];
  name: Localized;
  // slug + group only feed the TEMPORARY placeholder photos (key + tag per tile)
  slug: string;
  group: TypeGroup;
}

export default function TypeGallery({ gallery, name, slug, group }: TypeGalleryProps) {
  const t = useTranslation();
  const [open, setOpen] = useState<number | null>(null);
  if (gallery.length === 0) return null;

  const altFor = (i: number): Localized => ({
    en: `${name.en} — ${COPY.example.en} ${i + 1}`,
    ar: `${name.ar} — ${COPY.example.ar} ${i + 1}`,
  });
  // Gallery index → lightbox index (placeholders are skipped)
  const real = gallery.flatMap((src, i) => (src ? [i] : []));
  const items: LightboxItem[] = real.map((i) => ({ src: gallery[i], alt: altFor(i) }));
  const title = t(COPY.galleryTitle.en, COPY.galleryTitle.ar).replace('{name}', t(name.en, name.ar));

  return (
    <section className="bg-surface-white border-t border-border-light py-16 md:py-20" data-testid="type-gallery">
      <Container>
        <h2 className="font-bold text-ink-heading text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.01em] mb-8 md:mb-12">
          {title}
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="space-y-3 md:space-y-4"
        >
          {galleryRows(gallery.length).map((row) => (
            <motion.div
              key={row.indices[0]}
              variants={fadeUp}
              data-row={row.shape}
              className={`grid grid-cols-1 gap-3 md:gap-4 ${ROW_COLS[row.shape]}`}
            >
              {row.indices.map((i) => {
                const alt = altFor(i);
                return (
                  <GalleryTile
                    key={i}
                    src={gallery[i]}
                    alt={t(alt.en, alt.ar)}
                    shape={row.shape}
                    openLabel={t(COPY.openImage.en, COPY.openImage.ar)}
                    onOpen={() => setOpen(real.indexOf(i))}
                    placeholderKey={`${slug}-g${i + 1}`}
                    placeholderTag={TYPE_GALLERY_TAGS[group][i % 6]}
                  />
                );
              })}
            </motion.div>
          ))}
        </motion.div>
      </Container>

      <Lightbox items={items} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />
    </section>
  );
}
