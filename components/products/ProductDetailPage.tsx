'use client';
// Orchestrator — assembles the 5 product detail sections in sequence

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { SanityProductFull } from '@/lib/sanity/types';
import ProductDetailHero from './ProductDetailHero';
import ProductCharacteristics from './ProductCharacteristics';
import ProductDiscoverSection from './ProductDiscoverSection';
import ProductDetailCTA from './ProductDetailCTA';
import ProductDetailFAQ from './ProductDetailFAQ';

// ── Bilingual label maps — computed here so hero receives clean strings ────────

const MATERIAL_LABELS: Record<string, { en: string; ar: string }> = {
  upvc:     { en: 'uPVC Systems',      ar: 'أنظمة uPVC'       },
  aluminum: { en: 'Aluminium Systems', ar: 'أنظمة الألومنيوم' },
  glass:    { en: 'Glass Systems',     ar: 'أنظمة الزجاج'     },
};

const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  windows:             { en: 'Windows',                       ar: 'نوافذ'               },
  doors:               { en: 'Doors',                         ar: 'أبواب'               },
  'doors-and-windows': { en: 'Doors & Windows',               ar: 'أبواب ونوافذ'        },
  staircases:          { en: 'Staircases',                    ar: 'سلالم'               },
  hebeschibe:          { en: 'Hebeschibe',                    ar: 'هيبيشيبه'            },
  skylights:           { en: 'Skylights',                     ar: 'مناور'               },
  pergola:             { en: 'Pergola',                       ar: 'برجولا'              },
  'frameless-doors':   { en: 'Frameless Doors',               ar: 'أبواب بدون إطار'     },
  'security-system':   { en: 'Security System',               ar: 'نظام أمني'           },
  handrails:           { en: 'Handrails',                     ar: 'درابزين'             },
  'acp-panels':        { en: 'ACP Panels',                    ar: 'ألواح ACP'           },
  'double-glazing':    { en: 'Double Glazing',                ar: 'زجاج مزدوج'          },
  'stained-glass':     { en: 'Stained Glass',                 ar: 'زجاج ملون'           },
  sandblast:           { en: 'Sandblast',                     ar: 'سندبلاست'            },
  'georgian-bar':      { en: 'Georgian Bar & Islamic Design', ar: 'تصميم جورجي وإسلامي' },
};

interface Props { product: SanityProductFull }

export default function ProductDetailPage({ product }: Props) {
  const { language, isRTL } = useLanguage();

  // Ordered image array: mainImage first (for the hero), gallery images after
  const images = [
    ...(product.mainImage ? [product.mainImage] : []),
    ...(product.gallery ?? []),
  ];
  // selectedImage state lives here — both Hero and ProductImagePanel share it
  const [selectedImage, setSelectedImage] = useState(images[0] ?? '');

  // Resolve bilingual breadcrumb labels — passed down to hero as computed strings
  const materialLabel = MATERIAL_LABELS[product.material]?.[language] ?? product.material;
  const categoryLabel = CATEGORY_LABELS[product.category]?.[language] ?? product.category;

  // material is 'upvc' | 'aluminum' | 'glass' per SanityProductFull type
  const material = product.material;

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* 1. Hero — breadcrumb, large H1, subtitle, 55/45 image/info columns */}
      <ProductDetailHero
        product={product}
        images={images}
        selectedImage={selectedImage}
        onSelect={setSelectedImage}
        materialLabel={materialLabel}
        categoryLabel={categoryLabel}
      />

      {/* 2. Characteristics — specTags + spec fields as sharp-cornered chips */}
      <ProductCharacteristics product={product} />

      {/* 3. Discover — dark tile grid of other categories for this material */}
      <ProductDiscoverSection material={material} currentCategory={product.category} />

      {/* 4. CTA — centered "Have a project in mind?" with quote + WhatsApp buttons */}
      <ProductDetailCTA />

      {/* 5. FAQ — accordion with 5 product/technical questions from faq.ts */}
      <ProductDetailFAQ />

    </div>
  );
}
