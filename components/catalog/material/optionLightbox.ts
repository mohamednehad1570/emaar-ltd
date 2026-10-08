/** Maps Options cards to shared Lightbox items — only cards with something to enlarge open it. */

import { hasPlaceholderPhoto } from '@/lib/data/placeholderPhotos';
import type { LightboxItem } from '@/components/ui/Lightbox';
import type { OptionCardView } from '../types';

/** Swatches always open; images only when a real photo or a TEMPORARY review photo shows. */
export function isOpenable(card: OptionCardView): boolean {
  const m = card.media;
  return m.kind === 'swatch' || m.src !== null || hasPlaceholderPhoto(m.placeholderKey);
}

export function toLightboxItem(card: OptionCardView): LightboxItem {
  const m = card.media;
  return {
    src: m.kind === 'image' ? m.src : null,
    alt: card.name,
    caption: card.name,
    details: card.details,
    ...(m.kind === 'swatch'
      ? { swatchHex: m.hex }
      : { placeholderKey: m.placeholderKey, placeholderTag: m.placeholderTag }),
  };
}
