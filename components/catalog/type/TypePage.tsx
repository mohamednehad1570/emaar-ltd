'use client';

/**
 * components/catalog/type/TypePage.tsx
 * Product-type page shell: Hero → Intro → Hotspots → Gallery → Configurations → CTA band.
 * Placeholder types render Hero, a "coming soon" line and the CTA only (no gallery),
 * so no unverified catalog copy reaches visitors.
 */

import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { CATALOG_PAGE_COPY, TYPE_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import Container from '@/components/layout/Container';
import ProductDetailCTA from '@/components/products/ProductDetailCTA';
import type { TypePageView } from '../types';
import TypeHero from './TypeHero';
import TypeIntro from './TypeIntro';
import TypeHotspots from './TypeHotspots';
import TypeGallery from './TypeGallery';
import TypeConfigurations from './TypeConfigurations';

export default function TypePage({ view }: { view: TypePageView }) {
  const { language } = useLanguage();
  const t = useTranslation();
  const name = t(view.name.en, view.name.ar);

  return (
    <>
      <TypeHero view={view} />

      {view.placeholder ? (
        <Container className="pb-16">
          <p className="text-ink-muted">{t(CATALOG_PAGE_COPY.comingSoon.en, CATALOG_PAGE_COPY.comingSoon.ar)}</p>
        </Container>
      ) : (
        <>
          <TypeIntro mechanism={view.mechanism} pictogram={view.pictogram} bestFor={view.bestFor} />
          <TypeHotspots
            hotspots={view.hotspots}
            diagramImage={view.diagramImage}
            diagramMechanism={view.diagramMechanism}
            typeName={name}
          />
          <TypeGallery gallery={view.gallery} name={view.name} slug={view.slug} group={view.group} />
          <TypeConfigurations materials={view.materials} />
        </>
      )}

      {/* WhatsApp message stays English (business inbox language); headline follows the UI */}
      <ProductDetailCTA
        headline={COPY.ctaHeadline[language].replace('{name}', name)}
        productName={view.name.en}
        quoteHref={`/contact?product=${view.slug}`}
      />
    </>
  );
}
