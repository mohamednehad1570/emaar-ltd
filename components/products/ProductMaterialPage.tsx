'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { upvcData, aluminumData } from '@/lib/data/products';
import ProductShowcase from '@/components/products/ProductShowcase';
interface Props { material: string; }

export default function ProductMaterialPage({ material }: Props) {
  const { language } = useLanguage();
  const rawData = material === 'aluminum' ? aluminumData[language] : upvcData[language];

  return (
    <div className="pt-[52px]">
      <ProductShowcase
        title={rawData.title}
        subtitle={rawData.subtitle}
        description={rawData.description}
        heroImage={rawData.heroImage}
        features={rawData.features.map(f => ({ ...f }))}
        products={rawData.products.map(p => ({ ...p, features: [...p.features] }))}
        crossLink={{ ...rawData.crossLink }}
      />
    </div>
  );
}
