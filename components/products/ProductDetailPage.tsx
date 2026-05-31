'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Ruler, Thermometer, SpeakerHigh, ShieldCheck } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { upvcData, aluminumData } from '@/lib/data/products';
import { productDetails } from '@/lib/data/productDetails';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import ProductDetailRelated from './ProductDetailRelated';

interface Props { slug: string; }

const SPEC_ICONS = [Ruler, Thermometer, SpeakerHigh, ShieldCheck] as const;

export default function ProductDetailPage({ slug }: Props) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const detail = productDetails[slug];
  const rawData = detail.material === 'aluminum' ? aluminumData[language] : upvcData[language];
  const product = rawData.products.find(p => p.id === detail.productId);
  if (!product) return null;

  const specEntries = [
    { label: language === 'en' ? 'Dimensions'      : 'الأبعاد',           value: detail.specs.dimensions     },
    { label: language === 'en' ? 'Thermal Value'   : 'القيمة الحرارية',   value: detail.specs.thermalValue   },
    { label: language === 'en' ? 'Acoustic Rating' : 'التقييم الصوتي',   value: detail.specs.acousticRating },
    { label: language === 'en' ? 'Warranty'        : 'الضمان',            value: detail.specs.warranty       },
  ];

  const materialLabel = detail.material === 'upvc'
    ? (language === 'en' ? 'uPVC System'      : 'نظام UPVC')
    : (language === 'en' ? 'Aluminum System'  : 'نظام الألومنيوم');

  const backHref  = `/products/${detail.material}`;
  const backLabel = language === 'en'
    ? `All ${detail.material === 'upvc' ? 'uPVC' : 'Aluminum'} Products`
    : detail.material === 'upvc' ? 'جميع منتجات UPVC' : 'جميع منتجات الألومنيوم';

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={product.image} alt={product.title} fill className="object-cover" priority sizes="100vw" />
          <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-brand-dark/90 via-brand-dark/60 to-transparent`} />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12">
          <Link href={backHref} className={`inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
            <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
            {backLabel}
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 bg-brand-red text-white text-xs font-bold uppercase tracking-wider">{materialLabel}</span>
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold">{product.category}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{product.title}</h1>
          <p className="text-lg text-white/80 max-w-2xl">{product.description}</p>
        </div>
      </section>

      {/* ── Specifications ───────────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
            {language === 'en' ? 'Specifications' : 'المواصفات'}
          </h2>
          <div className="h-0.5 w-12 bg-brand-red mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {specEntries.map((spec, idx) => {
              const Icon = SPEC_ICONS[idx];
              return (
                <motion.div key={idx} variants={fadeUp} initial={shouldReduce ? {} : 'hidden'} whileInView="visible" viewport={viewportOnce} transition={{ delay: idx * 0.08 }} className={`bg-off-white border border-border-light p-6 ${isRTL ? 'text-right' : ''}`}>
                  <Icon className="w-6 h-6 text-brand-red mb-3" aria-hidden="true" />
                  <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">{spec.label}</div>
                  <div className="text-base font-bold text-brand-dark">{spec.value}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
            {language === 'en' ? 'Key Features' : 'المميزات الرئيسية'}
          </h2>
          <div className="h-0.5 w-12 bg-brand-red mb-10" />
          <motion.div variants={staggerContainer} initial={shouldReduce ? {} : 'hidden'} whileInView="visible" viewport={viewportOnce} className="grid md:grid-cols-3 gap-6">
            {rawData.features.map((feature, idx) => {
              const Icon = resolveIcon(feature.icon);
              return (
                <motion.div key={idx} variants={fadeUp} className="bg-white border border-border-light hover:border-brand-silver transition-colors p-6">
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
            {detail.gallery.map((src, idx) => (
              <div key={idx} className="aspect-[4/3] relative overflow-hidden">
                <Image src={src} alt={`${product.title} ${idx + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Products ─────────────────────────────────────── */}
      <ProductDetailRelated relatedSlugs={detail.relatedSlugs} language={language} isRTL={isRTL} />

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-brand-red text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{language === 'en' ? 'Ready to Get Started?' : 'مستعد للبدء؟'}</h2>
          <p className="text-white/85 mb-8">{language === 'en' ? 'Contact our team for a custom quote tailored to your project requirements.' : 'تواصل مع فريقنا للحصول على عرض سعر مخصص لمتطلبات مشروعك.'}</p>
          <Link href="/contact">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className={`inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-cream text-brand-red font-bold text-lg transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
              {language === 'en' ? 'Request Quote' : 'طلب عرض سعر'}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </motion.button>
          </Link>
        </div>
      </section>

    </div>
  );
}
