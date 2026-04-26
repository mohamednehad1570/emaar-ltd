'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductShowcase from '@/components/products/ProductShowcase';
import { upvcData } from '@/lib/data/products';

export default function UPVCPage() {
  const { language } = useLanguage();
  const t = upvcData[language];

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
