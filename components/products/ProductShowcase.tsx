'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence , useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, CheckCircle as CheckCircle2, CaretRight as ChevronRight, DownloadSimple as Download } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { resolveIcon } from '@/lib/iconMap';

interface ProductFeature {
  title: string;
  description: string;
  icon: string; // icon name string — resolved via resolveIcon
}

interface ProductItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
}

interface ProductShowcaseProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  features: ProductFeature[];
  products: ProductItem[];
  crossLink: {
    title: string;
    description: string;
    button: string;
    link: string;
  };
}

export default function ProductShowcase({
  title,
  subtitle,
  description,
  heroImage,
  features,
  products,
  crossLink,
}: ProductShowcaseProps) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className={`min-h-screen bg-brand-bg ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={heroImage} alt={title} fill className="object-cover" priority />
          {/* Gradient direction flips in RTL so the dark side stays behind the text */}
          <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-brand-dark/90 via-brand-dark/60 to-transparent`} />
        </div>

        <div className="container-custom relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <div className="h-0.5 w-12 mb-8 bg-brand-red" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{title}</h1>
            <p className="text-2xl md:text-3xl font-light text-white/80 mb-8">{subtitle}</p>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10">{description}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-none font-bold text-white bg-brand-red hover:bg-brand-red-dark transition-all flex items-center gap-2"
              >
                {language === 'en' ? 'Request Quote' : 'طلب عرض سعر'}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
              <button className="px-8 py-4 rounded-none font-bold text-white border-2 border-white/30 hover:bg-white/10 transition-all flex items-center gap-2">
                {language === 'en' ? 'Download Catalog' : 'تحميل الكتالوج'}
                <Download className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Grid ────────────────────────────────── */}
      <section className="py-24 px-6 -mt-20 relative z-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = resolveIcon(feature.icon);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={shouldReduce ? undefined : { once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 border border-border-light hover:border-brand-silver transition-colors duration-200"
                >
                  {/* Sharp flat icon box + inline title — no rounded-full container */}
                  <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-dark">{feature.title}</h3>
                  </div>
                  <p className="text-text-body leading-relaxed text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Products Display ─────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-brand-dark mb-4">
                {language === 'en' ? 'Our Products' : 'منتجاتنا'}
              </h2>
              <div className="h-0.5 w-12 bg-brand-red" />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 min-h-[44px] rounded-none text-sm font-semibold transition-colors duration-150 capitalize ${
                    activeCategory === cat
                      ? 'bg-brand-red text-white'
                      : 'bg-white text-text-muted border border-border-light hover:border-brand-silver hover:text-text-body'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProducts.map(product => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id}
                  className="group bg-white rounded-sm overflow-hidden border-2 border-transparent hover:border-brand-silver transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Badge position flips in RTL to the reading-start corner */}
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                      <span className="px-3 py-1 bg-white/90 rounded-none text-xs font-bold uppercase tracking-wider text-brand-dark">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-brand-dark mb-3 group-hover:text-brand-red transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-text-body mb-6 line-clamp-2">{product.description}</p>

                    <ul className="space-y-2 mb-8">
                      {product.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className={`flex items-center gap-2 text-sm text-text-body ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" aria-hidden="true" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/products/${product.id.startsWith('UPVC') ? 'upvc' : 'aluminum'}/${product.id.toLowerCase()}`}
                      className="w-full py-4 rounded-none border-2 border-brand-red text-brand-red font-bold transition-all hover:bg-brand-red hover:text-white flex items-center justify-center gap-2"
                    >
                      {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                      <ChevronRight className={`w-5 h-5 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Materials Info ───────────────────────────────── */}
      <section className="py-24 bg-brand-dark text-white">
        <div className="container-custom px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                {language === 'en' ? 'Why Choose Our Material?' : 'لماذا تختار موادنا؟'}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {language === 'en'
                  ? 'We source only the finest raw materials from certified European suppliers, ensuring longevity, performance, and sustainability for every project.'
                  : 'نحن نستورد فقط أجود المواد الخام من موردين أوروبيين معتمدين، مما يضمن طول العمر والأداء والاستدامة لكل مشروع.'}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 p-6 rounded-sm border border-white/10">
                  <h3 className="font-bold text-brand-silver mb-2 text-xl">100%</h3>
                  <p className="text-sm text-white/60">{language === 'en' ? 'Recyclable Materials' : 'مواد قابلة لإعادة التدوير'}</p>
                </div>
                <div className="bg-white/10 p-6 rounded-sm border border-white/10">
                  <h3 className="font-bold text-brand-silver mb-2 text-xl">25+</h3>
                  <p className="text-sm text-white/60">{language === 'en' ? 'Years Lifespan' : 'سنوات العمر الافتراضي'}</p>
                </div>
              </div>
            </div>
            {/* material image: rounded-sm (image tile); no shadow */}
            <div className="relative h-96 rounded-sm overflow-hidden border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
                alt="Material Quality"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Cross-Link CTA ───────────────────────────────── */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          {/* cross-link CTA block: rounded-sm (card rule) */}
          <div className="bg-brand-dark p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">{crossLink.title}</h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">{crossLink.description}</p>
              <Link
                href={crossLink.link}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white rounded-none font-bold text-lg hover:bg-brand-red-dark transition-all"
              >
                {crossLink.button}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
