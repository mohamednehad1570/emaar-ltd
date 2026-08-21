'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { getWhatsAppURL } from '@/lib/whatsapp';
import type { SanityProductFull } from '@/lib/sanity/types';
import ProductDetailHero from './ProductDetailHero';
import ProductDetailSpecs from './ProductDetailSpecs';
import ProductDetailRelated from './ProductDetailRelated';

// ── Types ─────────────────────────────────────────────────────────────────────

// icon and description are absent from the Sanity feature schema — both optional
interface FeatureItem { icon?: string; title: string; description?: string }

interface Props { product: SanityProductFull }

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductDetailPage({ product }: Props) {
  const { language, isRTL } = useLanguage();

  const heroImage    = product.mainImage ?? product.gallery?.[0] ?? '';
  const heroTitle    = product.title[language] ?? product.title.en;
  const heroDesc     = product.description?.[language] ?? product.description?.en ?? '';
  const gallery      = product.gallery ?? [];
  const relatedProds = product.relatedProducts ?? [];

  // Type predicate narrows value to string — ProductDetailSpecs requires non-optional value
  const specEntries = [
    { label: language === 'en' ? 'Dimensions'      : 'الأبعاد',          value: product.specs?.dimensions    },
    { label: language === 'en' ? 'Thermal Value'   : 'القيمة الحرارية',  value: product.specs?.thermalValue  },
    { label: language === 'en' ? 'Acoustic Rating' : 'التقييم الصوتي',  value: product.specs?.acousticRating },
    { label: language === 'en' ? 'Glass Thickness' : 'سماكة الزجاج',    value: product.specs?.glassThickness },
    // colorOptions is string[] in Sanity — join so it renders as a single spec row
    { label: language === 'en' ? 'Colour Options'  : 'خيارات الألوان',   value: Array.isArray(product.specs?.colorOptions) ? (product.specs!.colorOptions as string[]).join(', ') : product.specs?.colorOptions },
  ].filter((e): e is { label: string; value: string } => typeof e.value === 'string' && e.value.length > 0);

  // Sanity features shape: { en: string, ar: string } — no label/value wrapper
  const features: FeatureItem[] = (product.features ?? []).map((f: any) => ({
    icon:        f.icon,
    title:       f[language] ?? f.en,
    description: f.description?.[language] ?? f.description?.en ?? '',
  }));

  const materialLabel = product.material === 'upvc'
    ? (language === 'en' ? 'uPVC System' : 'نظام UPVC')
    : (language === 'en' ? 'Aluminum System' : 'نظام الألومنيوم');

  // Back link goes to the material landing — user can navigate from there to the category
  const backHref  = `/products/${product.material}`;
  const backLabel = language === 'en'
    ? `All ${product.material === 'upvc' ? 'uPVC' : 'Aluminum'} Products`
    : product.material === 'upvc' ? 'جميع منتجات UPVC' : 'جميع منتجات الألومنيوم';

  return (
    <div className="min-h-screen bg-off-white pt-[52px]" dir={isRTL ? 'rtl' : 'ltr'}>

      <ProductDetailHero
        heroImage={heroImage} title={heroTitle} description={heroDesc}
        materialLabel={materialLabel} category={product.category}
        backHref={backHref} backLabel={backLabel} isRTL={isRTL}
      />

      <ProductDetailSpecs specs={specEntries} isRTL={isRTL} language={language} />

      {/* ── Features ─────────────────────────────────────────────── */}
      {features.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-2xl md:text-3xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
              {language === 'en' ? 'Key Features' : 'المميزات الرئيسية'}
            </h2>
            <div className="h-0.5 w-12 bg-brand-red mb-10" />
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="grid md:grid-cols-3 gap-6">
              {features.map((feature, idx) => {
                const Icon = resolveIcon(feature.icon ?? '');
                return (
                  <motion.div key={idx} variants={fadeUp} className="bg-white border border-border-light hover:border-silver-material transition-colors p-6">
                    <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="font-bold text-brand-dark">{feature.title}</h3>
                    </div>
                    <p className={`text-sm text-ink-body leading-relaxed ${isRTL ? 'text-right' : ''}`}>{feature.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Gallery ──────────────────────────────────────────────── */}
      {gallery.length > 0 && (
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
      )}

      <ProductDetailRelated relatedProducts={relatedProds} language={language} isRTL={isRTL} />

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-brand-red text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{language === 'en' ? 'Ready to Get Started?' : 'مستعد للبدء؟'}</h2>
          <p className="text-white/85 mb-8">{language === 'en' ? 'Contact our team for a custom quote tailored to your project requirements.' : 'تواصل مع فريقنا للحصول على عرض سعر مخصص لمتطلبات مشروعك.'}</p>
          <motion.a
            href={getWhatsAppURL({ page: 'product-detail', productName: product.title.en })}
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
