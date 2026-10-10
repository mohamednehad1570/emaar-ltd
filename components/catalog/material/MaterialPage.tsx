'use client';

/**
 * components/catalog/material/MaterialPage.tsx
 * Material landing (/upvc, /aluminum): Hero → Types grid → Options & finishes → CTA band.
 * Client-only because the site language lives in LanguageContext, not in the URL;
 * all data arrives pre-built from lib/catalogPageData (no catalog import here).
 */

import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { MATERIAL_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import ProductDetailCTA from '@/components/products/ProductDetailCTA';
import type { MaterialPageView } from '../types';
import MaterialHero from './MaterialHero';
import MaterialTypes from './MaterialTypes';
import MaterialOptions from './MaterialOptions';

export default function MaterialPage({ view }: { view: MaterialPageView }) {
  const { language } = useLanguage();
  const t = useTranslation();

  return (
    <>
      <MaterialHero view={view} />
      <MaterialTypes material={view.name} groups={view.groups} />
      <MaterialOptions tabs={view.tabs} />

      {/* WhatsApp message stays English (business inbox language); headline follows the UI */}
      <ProductDetailCTA
        headline={COPY.ctaHeadline[language].replace('{material}', t(view.name.en, view.name.ar))}
        productName={{ en: `${view.name.en} range`, ar: `مجموعة ${view.name.ar}` }}
      />
    </>
  );
}
