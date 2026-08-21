import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url';
import { publicClient } from './client';

const builder = imageUrlBuilder(publicClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
