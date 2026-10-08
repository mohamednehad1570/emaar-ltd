/** Item shapes for components/ui/Lightbox — split out so server-side view builders can import them. */

import type { Localized } from '@/lib/data/catalog';
import type { PlaceholderTag } from '@/lib/data/placeholderPhotos';

/** One row of the details panel. A plain string is printed data (codes, RAL, brand) shown dir=ltr. */
export interface LightboxDetail {
  label: Localized;
  value: string | Localized;
}

export interface LightboxItem {
  src: string | null;
  alt: Localized;
  caption?: Localized;
  // Renders a large flat colour block instead of an image (colour / performance-glass swatches)
  swatchHex?: string;
  // Optional panel beside the media (below it <768)
  details?: LightboxDetail[];
  // TEMPORARY: same review photo as the card that opened it while src is null
  placeholderKey?: string;
  placeholderTag?: PlaceholderTag;
}
