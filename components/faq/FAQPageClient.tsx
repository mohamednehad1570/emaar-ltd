'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown as ChevronDown, MagnifyingGlass as Search, Question as HelpCircle, ChatCircle as MessageCircle, WhatsappLogo } from '@phosphor-icons/react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { faqData, faqCategoryIcons } from '@/lib/data/faq';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';
import type { SanityFaq } from '@/lib/sanity/types';
import type { FAQItem } from '@/lib/data/faq';

interface Props {
  sanityFaqs?: SanityFaq[];
}

// MotionProvider in app/layout.tsx handles prefers-reduced-motion globally
export default function FAQPageClient({ sanityFaqs = [] }: Props) {
  const { language, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const t = faqData[language];

  // Use Sanity FAQs when available; fall back to static data
  const activeFaqs: FAQItem[] = sanityFaqs.length > 0
    ? sanityFaqs.map(f => ({
        question: f.question[language] ?? f.question.en,
        answer: f.answer[language] ?? f.answer.en,
        category: f.category,
        popular: f.popular,
      }))
    : t.faqs;

  const getCategoryIcon = (category: string) => {
    const iconName = faqCategoryIcons[category] ?? 'HelpCircle';
    return resolveIcon(iconName);
  };

  const filteredFAQs = useMemo(() => {
    let filtered = [...activeFaqs];
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
  }, [activeCategory, searchQuery, activeFaqs]);

  const popularFAQs = useMemo(() => activeFaqs.filter(faq => faq.popular), [activeFaqs]);

  return (
    <div className={`min-h-screen bg-off-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-surface-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-extrabold text-ink-heading mb-4 tracking-[-0.02em] leading-[0.95]"
              style={{ fontSize: 'clamp(2.75rem, 5vw, 5rem)' }}>
              {t.hero.title}
            </h1>
            <p className="text-xl font-semibold text-ink-body mb-4">{t.hero.subtitle}</p>
            <p className="text-base text-ink-muted max-w-2xl mx-auto">{t.hero.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted`} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className={`w-full h-12 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} border border-border-light focus:border-brand-red focus:outline-none text-ink-body bg-white text-base transition-colors`}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Category Filter ───────────────────────────────── */}
      <section className="py-6 px-6 bg-surface-white sticky top-[52px] z-40 border-b border-border-light">
        <div className="max-w-6xl mx-auto">
          <div className={`flex flex-wrap justify-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {Object.entries(t.categories).map(([key, label]) => {
              const Icon = key === 'all' ? HelpCircle : getCategoryIcon(key);
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 font-medium transition-all ${
                    activeCategory === key
                      ? 'bg-brand-red text-white'
                      : 'bg-white text-ink-muted hover:bg-surface-cream border border-border-light'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Popular Questions ──────────────────────────────── */}
      {activeCategory === 'all' && !searchQuery && popularFAQs.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-2xl font-bold text-ink-heading mb-8 text-center"
            >
              {t.popular.title}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-4">
              {popularFAQs.slice(0, 4).map((faq, idx) => {
                const Icon = getCategoryIcon(faq.category);
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveCategory(faq.category);
                      setExpandedId(activeFaqs.indexOf(faq));
                    }}
                    className={`${isRTL ? 'text-right' : 'text-left'} p-5 bg-surface-white border border-border-light hover:border-silver-material transition-colors group`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-brand-red" />
                      </div>
                      <div className="flex-1">
                        <span className="px-2 py-1 bg-brand-red/10 text-brand-red text-xs font-bold mb-2 inline-block">
                          {t.popular.badge}
                        </span>
                        <p className="font-semibold text-ink-body group-hover:text-brand-red transition-colors">
                          {faq.question}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ Accordion ──────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-ink-muted/30" />
              <p className="text-lg text-ink-muted">{t.search.noResults}</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, idx) => {
                const isExpanded = expandedId === idx;
                const Icon = getCategoryIcon(faq.category);
                return (
                  <div
                    key={idx}
                    className="bg-surface-white overflow-hidden border border-border-light"
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : idx)}
                      className={`w-full ${isRTL ? 'text-right' : 'text-left'} p-6 flex items-center gap-4 hover:bg-surface-cream transition-colors`}
                    >
                      <div className="w-10 h-10 bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-brand-red" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-ink-heading mb-1">{faq.question}</h3>
                        {faq.popular && (
                          <span className="inline-block px-2 py-1 bg-brand-red/10 text-brand-red text-xs font-bold">
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
                            <div className={`${isRTL ? 'mr-14' : 'ml-14'} pt-2 border-t border-border-light`}>
                              <p className="text-ink-body leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-ink-heading text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-ink-muted" />
            <h2 className="text-3xl font-bold mb-4">{t.cta.title}</h2>
            <p className="text-lg text-white/70 mb-8">{t.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-surface-cream text-brand-red font-semibold text-base transition-colors">
                  {t.cta.button}
                  <MessageCircle className="w-5 h-5" />
                </button>
              </Link>
              <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold text-base hover:opacity-90 transition-opacity">
                  <WhatsappLogo size={20} weight="fill" />
                  {t.cta.whatsapp}
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
