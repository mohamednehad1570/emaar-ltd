'use client';

/**
 * components/products/ProductMaterialPage.tsx
 *
 * Client wrapper that selects the correct bilingual dataset based on
 * the `material` route param resolved by the server page component.
 * Keeps ProductShowcase free of routing logic.
 */

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { upvcData, aluminumData } from '@/lib/data/products';
import ProductShowcase from '@/components/products/ProductShowcase';

interface Props { material: string; }

export default function ProductMaterialPage({ material }: Props) {
  const { language } = useLanguage();
  /* material === 'aluminum' is the only alternative; default to upvc for unknown values */
  const rawData = material === 'aluminum' ? aluminumData[language] : upvcData[language];

  return (
    <ProductShowcase
      title={rawData.title}
      subtitle={rawData.subtitle}
      description={rawData.description}
      heroImage={rawData.heroImage}
      features={rawData.features.map(f => ({ ...f }))}
      products={rawData.products.map(p => ({ ...p, features: [...p.features] }))}
      crossLink={{ ...rawData.crossLink }}
    />
  );
}
