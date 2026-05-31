'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { upvcData, aluminumData } from '@/lib/data/products';
import ProductShowcase from '@/components/products/ProductShowcase';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface Props { material: string; }

const MATERIAL_CRUMBS = {
  upvc: { label: 'uPVC', labelAr: 'يو بي في سي' },
  aluminum: { label: 'Aluminum', labelAr: 'ألومنيوم' },
} as const;

export default function ProductMaterialPage({ material }: Props) {
  const { language } = useLanguage();
  const rawData = material === 'aluminum' ? aluminumData[language] : upvcData[language];
  const crumb = material === 'aluminum' ? MATERIAL_CRUMBS.aluminum : MATERIAL_CRUMBS.upvc;

  const breadcrumbItems = [
    { label: 'Products', labelAr: 'المنتجات', href: '/products' },
    { label: crumb.label, labelAr: crumb.labelAr },
  ];

  return (
    <div className="pt-[52px]">
      <Breadcrumbs items={breadcrumbItems} />
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
