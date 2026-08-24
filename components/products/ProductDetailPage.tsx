'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import type { SanityProductFull } from '@/lib/sanity/types';
import ProductImagePanel from './ProductImagePanel';
import ProductInfoPanel from './ProductInfoPanel';
import ProductDetailRelated from './ProductDetailRelated';

interface Props { product: SanityProductFull }

// Category slug → bilingual display label for the back-link
const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  'windows':           { en: 'Windows',         ar: 'نوافذ'         },
  'doors':             { en: 'Doors',            ar: 'أبواب'         },
  'doors-and-windows': { en: 'Doors & Windows', ar: 'أبواب ونوافذ'  },
  'staircases':        { en: 'Staircases',       ar: 'درج'           },
  'stained-glass':     { en: 'Stained Glass',    ar: 'زجاج ملون'    },
  'sandblast':         { en: 'Sandblast',        ar: 'رمل مصفوف'    },
  'hebeschibe':        { en: 'Hebeschibe',        ar: 'هيبيشيبة'     },
  'skylights':         { en: 'Skylights',         ar: 'نافذة علوية'  },
};

export default function ProductDetailPage({ product }: Props) {
  const { language, isRTL } = useLanguage();

  // Main image first, gallery after — selectedImage drives the left panel
  const images = [
    ...(product.mainImage ? [product.mainImage] : []),
    ...(product.gallery ?? []),
  ];
  const [selectedImage, setSelectedImage] = useState(images[0] ?? '');

  const catLabels    = CATEGORY_LABELS[product.category] ?? { en: product.category, ar: product.category };
  const categoryName = catLabels[language];
  const backHref     = `/products/${product.material}/${product.category}`;
  const backLabel    = language === 'en' ? `${categoryName} Products` : `منتجات ${categoryName}`;

  // features are flat {en, ar} bilingual strings in Sanity — no icon/description field
  const features     = (product.features ?? []).map(f => f[language] ?? f.en);
  const relatedProds = product.relatedProducts ?? [];

  return (
    <div className="min-h-screen bg-off-white pt-24 pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Back nav — inline link, not a CTA button */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-brand-dark transition-colors duration-200 mb-8"
        >
          {/* Icon direction flips with dir="rtl" flex ordering */}
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          {backLabel}
        </Link>

        {/* Two-column grid: image 55% | info flex */}
        <div className="md:grid md:grid-cols-[55%_1fr] md:gap-12 items-start">
          <ProductImagePanel
            images={images}
            selectedImage={selectedImage}
            onSelect={setSelectedImage}
            alt={product.title[language] ?? product.title.en}
          />
          <ProductInfoPanel
            product={product}
            language={language}
            isRTL={isRTL}
          />
        </div>

        {/* Features — below the two-column grid, separated by a full-width rule */}
        {features.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border-light">
            <p className="text-xs uppercase tracking-[0.25em] text-text-muted mb-8">
              {language === 'en' ? 'Key Features' : 'المميزات الرئيسية'}
            </p>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {features.map((text, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-white p-6 rounded-sm border border-border-light"
                  style={{ boxShadow: '0 1px 3px rgba(45,41,38,0.06)' }}
                >
                  {/* Default icon — Sanity features carry no icon field */}
                  <CheckCircle className="w-6 h-6 text-text-muted mb-3" weight="light" />
                  <p className="text-sm font-bold text-brand-dark">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

      </div>

      {/* Related products — outside the constrained container so bg-white extends full-width */}
      {relatedProds.length > 0 && (
        <div className="mt-20 pt-12 border-t border-border-light">
          <ProductDetailRelated
            relatedProducts={relatedProds}
            language={language}
            isRTL={isRTL}
          />
        </div>
      )}
    </div>
  );
}
