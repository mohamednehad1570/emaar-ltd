'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { upvcData, aluminumData } from '@/lib/data/products';
import { productDetails } from '@/lib/data/productDetails';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { getWhatsAppURL } from '@/lib/whatsapp';
import type { SanityProductDetail } from '@/lib/sanity/types';
import ProductDetailHero from './ProductDetailHero';
import ProductDetailSpecs from './ProductDetailSpecs';
import ProductDetailRelated from './ProductDetailRelated';

// Unified shape shared between CMS features and static features
interface FeatureItem { icon: string; title: string; description: string }
interface Props { slug: string; sanityProduct?: SanityProductDetail | null }

export default function ProductDetailPage({ slug, sanityProduct }: Props) {
  const { language, isRTL } = useLanguage();
  const detail      = productDetails[slug];
  const rawData     = detail.material === 'aluminum' ? aluminumData[language] : upvcData[language];
  const staticProduct = rawData.products.find(p => p.id === detail.productId);
  if (!staticProduct) return null;

  // CMS overrides static when present — static is always the fallback
  const heroImage    = sanityProduct?.images?.[0] ?? staticProduct.image;
  const heroTitle    = sanityProduct?.title?.[language] ?? staticProduct.title;
  const heroDesc     = sanityProduct?.description?.[language] ?? staticProduct.description;
  const gallery      = sanityProduct?.gallery?.length ? sanityProduct.gallery : detail.gallery;
  const relatedSlugs = sanityProduct?.relatedProducts?.map(p => p.slug) ?? detail.relatedSlugs;

  const specEntries = [
    { label: language === 'en' ? 'Dimensions'      : 'الأبعاد',         value: sanityProduct?.dimensions    ?? detail.specs.dimensions    },
    { label: language === 'en' ? 'Thermal Value'   : 'القيمة الحرارية', value: sanityProduct?.thermalValue  ?? detail.specs.thermalValue  },
    { label: language === 'en' ? 'Acoustic Rating' : 'التقييم الصوتي', value: sanityProduct?.acousticRating ?? detail.specs.acousticRating },
    { label: language === 'en' ? 'Warranty'        : 'الضمان',          value: sanityProduct?.warranty      ?? detail.specs.warranty      },
  ];

  // Spread static features to mutable array — rawData is const-asserted readonly
  const features: FeatureItem[] = sanityProduct?.features?.length
    ? sanityProduct.features.map(f => ({ icon: f.icon, title: f.label[language], description: f.value[language] }))
    : [...rawData.features];

  const materialLabel = detail.material === 'upvc'
    ? (language === 'en' ? 'uPVC System' : 'نظام UPVC')
    : (language === 'en' ? 'Aluminum System' : 'نظام الألومنيوم');

  const allData   = detail.material === 'aluminum' ? aluminumData : upvcData;
  const productEn = allData['en'].products.find(p => p.id === detail.productId);

  const backHref  = `/products/${detail.material}`;
  const backLabel = language === 'en'
    ? `All ${detail.material === 'upvc' ? 'uPVC' : 'Aluminum'} Products`
    : detail.material === 'upvc' ? 'جميع منتجات UPVC' : 'جميع منتجات الألومنيوم';

  return (
    <div className="min-h-screen bg-off-white pt-[52px]" dir={isRTL ? 'rtl' : 'ltr'}>

      <ProductDetailHero
        heroImage={heroImage} title={heroTitle} description={heroDesc}
        materialLabel={materialLabel} category={staticProduct.category}
        backHref={backHref} backLabel={backLabel} isRTL={isRTL}
      />

      <ProductDetailSpecs specs={specEntries} isRTL={isRTL} language={language} />

      {/* ── Features ─────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
            {language === 'en' ? 'Key Features' : 'المميزات الرئيسية'}
          </h2>
          <div className="h-0.5 w-12 bg-brand-red mb-10" />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = resolveIcon(feature.icon);
              return (
                <motion.div key={idx} variants={fadeUp} className="bg-white border border-border-light hover:border-silver-material transition-colors p-6">
                  <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-brand-dark">{feature.title}</h3>
                  </div>
                  <p className={`text-sm text-text-body leading-relaxed ${isRTL ? 'text-right' : ''}`}>{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
            {language === 'en' ? 'Gallery' : 'المعرض'}
          </h2>
          <div className="h-0.5 w-12 bg-brand-red mb-10" />
          <div className="grid grid-cols-3 gap-4">
            {gallery.map((src, idx) => (
              <div key={idx} className="aspect-[4/3] relative overflow-hidden">
                <Image src={src} alt={`${heroTitle} ${idx + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductDetailRelated relatedSlugs={relatedSlugs} language={language} isRTL={isRTL} />

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-brand-red text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{language === 'en' ? 'Ready to Get Started?' : 'مستعد للبدء؟'}</h2>
          <p className="text-white/85 mb-8">{language === 'en' ? 'Contact our team for a custom quote tailored to your project requirements.' : 'تواصل مع فريقنا للحصول على عرض سعر مخصص لمتطلبات مشروعك.'}</p>
          <motion.a
            href={getWhatsAppURL({ page: 'product-detail', productName: productEn?.title ?? staticProduct.title })}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className={`inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-cream text-brand-red font-bold text-lg transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ color: 'var(--color-brand-red)' }}
          >
            {language === 'en' ? 'Request Quote' : 'طلب عرض سعر'}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </motion.a>
        </div>
      </section>

    </div>
  );
}
