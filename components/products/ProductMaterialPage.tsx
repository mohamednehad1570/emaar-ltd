'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { upvcData, aluminumData } from '@/lib/data/products';
import ProductShowcase from '@/components/products/ProductShowcase';
import type { SanityProduct } from '@/lib/sanity/types';

interface Props {
  material: 'upvc' | 'aluminum';
  sanityProducts?: SanityProduct[];
}

export default function ProductMaterialPage({ material, sanityProducts }: Props) {
  const { language } = useLanguage();
  const rawData = material === 'aluminum' ? aluminumData[language] : upvcData[language];

  // Use Sanity products when available; fall back to static data
  const products = sanityProducts && sanityProducts.length > 0
    ? sanityProducts.map(p => ({
        id: p.slug,
        title: p.title[language] ?? p.title.en,
        category: p.specs?.[0]?.label[language] ?? p.specs?.[0]?.label.en ?? '',
        description: p.description?.[language] ?? p.description?.en ?? '',
        image: p.images[0] ?? '',
        features: p.specs?.map(s => `${s.label[language] ?? s.label.en}: ${s.value[language] ?? s.value.en}`) ?? [],
      }))
    : rawData.products.map(p => ({ ...p, features: [...p.features] }));

  return (
    <div className="pt-[52px]">
      <ProductShowcase
        title={rawData.title}
        subtitle={rawData.subtitle}
        description={rawData.description}
        heroImage={rawData.heroImage}
        features={rawData.features.map(f => ({ ...f }))}
        products={products}
        crossLink={{ ...rawData.crossLink }}
      />
    </div>
  );
}
