'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import type { SanityProductFull } from '@/lib/sanity/types';

// Related product shape — subset of SanityProductFull.relatedProducts array items
type RelatedProduct = NonNullable<SanityProductFull['relatedProducts']>[number];

interface Props {
  relatedProducts: RelatedProduct[];
  language: 'en' | 'ar';
  isRTL: boolean;
}

export default function ProductDetailRelated({ relatedProducts, language, isRTL }: Props) {
  if (!relatedProducts.length) return null;

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-2xl md:text-3xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
          {language === 'en' ? 'Related Products' : 'منتجات ذات صلة'}
        </h2>
        <div className="h-0.5 w-12 bg-brand-red mb-10" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-3 gap-6"
        >
          {relatedProducts.map((item) => (
            <motion.div
              key={item.slug}
              variants={fadeUp}
              className="group bg-off-white border border-border-light hover:border-brand-silver transition-colors overflow-hidden"
            >
              {/* ── Thumbnail ─────────────────────────────────────────────── */}
              <div className="relative h-48 overflow-hidden">
                {item.mainImage ? (
                  <Image
                    src={item.mainImage}
                    alt={item.title[language] ?? item.title.en}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface-cream" />
                )}
                <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`}>
                  <span className="px-2 py-0.5 bg-white/90 text-xs font-bold uppercase tracking-wider text-brand-dark">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* ── Info ──────────────────────────────────────────────────── */}
              <div className={`p-5 ${isRTL ? 'text-right' : ''}`}>
                <h3 className="font-bold text-brand-dark mb-4 group-hover:text-brand-red transition-colors">
                  {item.title[language] ?? item.title.en}
                </h3>
                <Link
                  href={`/products/${item.material}/${item.category}/${item.slug}`}
                  className="text-sm font-bold text-brand-red hover:text-brand-red-dark transition-colors"
                >
                  {language === 'en' ? 'View Details →' : '← عرض التفاصيل'}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
