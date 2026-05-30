'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence , useReducedMotion } from 'framer-motion';
import { CaretDown as ChevronDown, MagnifyingGlass as Search, Question as HelpCircle, ChatCircle as MessageCircle, WhatsappLogo } from '@phosphor-icons/react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { faqData, faqCategoryIcons } from '@/lib/data/faq';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function FAQPage() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const t = faqData[language];

  const getCategoryIcon = (category: string) => {
    const iconName = faqCategoryIcons[category] ?? 'HelpCircle';
    return resolveIcon(iconName);
  };

  const filteredFAQs = useMemo(() => {
    let filtered = [...t.faqs];
    if (activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [activeCategory, searchQuery, t.faqs]);

  const popularFAQs = useMemo(() => t.faqs.filter(faq => faq.popular), [t.faqs]);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-brand-bg via-white to-brand-bg ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-brand-silver/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-brand-red to-brand-silver bg-clip-text text-transparent">
              {t.hero.title}
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">{t.hero.subtitle}</p>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto">{t.hero.description}</p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-brand-silver`} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-none border-2 border-brand-silver/20 focus:border-brand-red focus:outline-none text-brand-dark bg-white text-lg transition-colors`}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Category Filter ───────────────────────────────── */}
      <section className="py-8 px-6 bg-white/70 backdrop-blur-sm sticky top-20 z-40 border-b border-border-light">
        <div className="max-w-6xl mx-auto">
          <div className={`flex flex-wrap justify-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {Object.entries(t.categories).map(([key, label]) => {
              const Icon = key === 'all' ? HelpCircle : getCategoryIcon(key);
              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-none font-medium transition-all ${
                    activeCategory === key
                      ? 'bg-gradient-to-r from-brand-red to-brand-red-dark text-white'
                      : 'bg-white text-brand-gray hover:bg-brand-bg border border-border-light'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Popular Questions ──────────────────────────────── */}
      {activeCategory === 'all' && !searchQuery && (
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              variants={fadeUp}
              initial={shouldReduce ? {} : "hidden"}
              whileInView={shouldReduce ? undefined : "visible"}
              viewport={shouldReduce ? undefined : viewportOnce}
              className="text-3xl font-bold text-brand-dark mb-8 text-center"
            >
              {t.popular.title}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-4">
              {popularFAQs.slice(0, 4).map((faq, idx) => {
                const Icon = getCategoryIcon(faq.category);
                return (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={shouldReduce ? undefined : viewportOnce}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      setActiveCategory(faq.category);
                      setExpandedId(t.faqs.indexOf(faq));
                    }}
                    className={`${isRTL ? 'text-right' : 'text-left'} p-5 rounded-sm bg-white border-2 border-transparent hover:border-brand-silver transition-colors group`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-brand-red" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 rounded-none bg-brand-silver/10 text-brand-red text-xs font-bold">
                            {t.popular.badge}
                          </span>
                        </div>
                        <p className="font-semibold text-brand-gray group-hover:text-brand-red transition-colors">
                          {faq.question}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ Accordion ──────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-brand-silver/30" />
              <p className="text-xl text-brand-gray">{t.search.noResults}</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, idx) => {
                const isExpanded = expandedId === idx;
                const Icon = getCategoryIcon(faq.category);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="bg-white rounded-sm overflow-hidden border border-border-light"
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : idx)}
                      className={`w-full ${isRTL ? 'text-right' : 'text-left'} p-6 flex items-center gap-4 hover:bg-brand-bg transition-colors`}
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-brand-red" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-brand-dark mb-1">{faq.question}</h3>
                        {faq.popular && (
                          <span className="inline-block px-2 py-1 rounded-none bg-brand-silver/10 text-brand-red text-xs font-bold">
                            {t.popular.badge}
                          </span>
                        )}
                      </div>
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-6 h-6 text-brand-red" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6">
                            <div className={`${isRTL ? 'mr-14' : 'ml-14'} pt-2 border-t border-brand-silver/10`}>
                              <p className="text-brand-gray leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-br from-brand-dark to-brand-dark-mid text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : "hidden"}
            whileInView={shouldReduce ? undefined : "visible"}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-brand-silver" />
            <h2 className="text-4xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-xl text-white/70 mb-8">{t.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-none bg-white text-brand-red font-semibold text-lg shadow-warm-xl"
                >
                  {t.cta.button}
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
              </Link>
              <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-none bg-brand-dark text-white font-semibold text-lg hover:bg-brand-dark/90 transition-colors"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  {t.cta.whatsapp}
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
