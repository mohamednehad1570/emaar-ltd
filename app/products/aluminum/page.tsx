'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductShowcase from '@/components/products/ProductShowcase';
import { aluminumData } from '@/lib/data/products';

export default function AluminumPage() {
  const { language } = useLanguage();
  const t = aluminumData[language];

  return (
    <ProductShowcase
      title={t.title}
      subtitle={t.subtitle}
      description={t.description}
      heroImage={t.heroImage}
      features={t.features.map(f => ({ ...f }))}
      products={t.products.map(p => ({ ...p, features: [...p.features] }))}
      crossLink={{ ...t.crossLink }}
    />
  );
}
