'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle as CheckCircle2, ArrowRight, Quotes as Quote, Star } from '@phosphor-icons/react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { whyChooseUsData } from '@/lib/data/whyChooseUs';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

export default function WhyChooseUsPage() {
  const { language, isRTL } = useLanguage();

  const advantagesRef = useRef(null);
  const qualityRef = useRef(null);
  const certificationsRef = useRef(null);
  const testimonialsRef = useRef(null);

  const advantagesInView = useInView(advantagesRef, { once: true, amount: 0.2 });
  const qualityInView = useInView(qualityRef, { once: true, amount: 0.2 });
  const certificationsInView = useInView(certificationsRef, { once: true, amount: 0.2 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 });

  const t = whyChooseUsData[language];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-brand-bg via-white to-brand-bg ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-brand-red/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-brand-silver/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-brand-red to-brand-silver bg-clip-text text-transparent">
              {t.hero.title}
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-brand-dark mb-6">{t.hero.subtitle}</p>
            <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">{t.hero.description}</p>
          </motion.div>

          {/* Value Props */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.valueProps.map((prop, idx) => {
              const Icon = resolveIcon(prop.icon);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow" />
                  <div className="relative p-6 text-center">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-brand-red" />
                    <h3 className="font-bold text-lg text-brand-dark mb-2">{prop.title}</h3>
                    <p className="text-sm text-brand-gray mb-3">{prop.description}</p>
                    <div className="text-2xl font-bold text-brand-silver">{prop.stat}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Competitive Advantages ────────────────────────── */}
      <section ref={advantagesRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={advantagesInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.advantages.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
            <p className="text-xl text-brand-gray">{t.advantages.subtitle}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={advantagesInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 gap-8"
          >
            {t.advantages.items.map((item, idx) => {
              const Icon = resolveIcon(item.icon);
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-brand-silver/10"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-red to-brand-red-dark flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-brand-dark mb-3">{item.title}</h3>
                      <p className="text-brand-gray mb-4 leading-relaxed">{item.description}</p>
                      <ul className="space-y-2">
                        {item.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-brand-gray">
                            <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Quality Process ───────────────────────────────── */}
      <section ref={qualityRef} className="py-20 px-6 bg-gradient-to-br from-brand-dark to-[#333333] text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={qualityInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.quality.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
            <p className="text-xl text-white/70">{t.quality.subtitle}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={qualityInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {t.quality.steps.map((step, idx) => {
              const Icon = resolveIcon(step.icon);
              return (
                <motion.div key={idx} variants={fadeUp} className="relative group">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-colors h-full">
                    <div className="text-5xl font-bold text-brand-silver/30 mb-4">{step.number}</div>
                    <Icon className="w-10 h-10 text-brand-silver mb-4" />
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-white/70 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Certifications ────────────────────────────────── */}
      <section ref={certificationsRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={certificationsInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.certifications.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
            <p className="text-xl text-brand-gray mb-6">{t.certifications.subtitle}</p>
            <p className="text-brand-gray max-w-3xl mx-auto">{t.certifications.intro}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={certificationsInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {t.certifications.items.map((cert, idx) => {
              const Icon = resolveIcon(cert.icon);
              return (
                <motion.div key={idx} variants={fadeUp} className="bg-white rounded-3xl p-8 shadow-xl border border-brand-silver/10">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-silver to-brand-red flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-brand-dark">{cert.name}</h3>
                        <span className="px-3 py-1 rounded-full bg-brand-silver/10 text-brand-dark text-sm font-semibold">{cert.year}</span>
                      </div>
                      <p className="text-brand-gray leading-relaxed">{cert.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Standards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bg-gradient-to-br from-brand-bg to-white rounded-3xl p-8 md:p-12 border border-brand-silver/10"
          >
            <h3 className="text-3xl font-bold text-brand-dark mb-8 text-center">{t.certifications.standards.title}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.certifications.standards.items.map((standard, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-brand-silver/10">
                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                  <span className="text-brand-gray">{standard}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Comparison Table ───────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-b from-brand-bg to-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-4"
          >
            {t.comparison.title}
          </motion.h2>
          <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-16" />

          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-silver/10">
            <div className={`grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
              <div>{language === 'en' ? 'Metric' : 'المقياس'}</div>
              <div className="text-center">EMAAR</div>
              <div className="text-center">{language === 'en' ? 'Industry Avg' : 'متوسط الصناعة'}</div>
            </div>

            {t.comparison.items.map((item, idx) => {
              const Icon = resolveIcon(item.icon);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: idx * 0.05 }}
                  className={`grid grid-cols-3 gap-4 p-6 border-b border-brand-silver/10 last:border-0 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-brand-silver" />
                    <span className="font-medium text-brand-gray">{item.metric}</span>
                  </div>
                  <div className="text-center font-bold text-brand-red">{item.emaar}</div>
                  <div className="text-center text-brand-gray">{item.industry}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section ref={testimonialsRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.testimonials.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
            <p className="text-xl text-brand-gray">{t.testimonials.subtitle}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 gap-8"
          >
            {t.testimonials.items.map((testimonial, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-white rounded-3xl p-8 shadow-xl relative border border-brand-silver/10">
                <Quote className="w-12 h-12 text-brand-silver/20 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-brand-silver fill-current" />
                  ))}
                </div>
                <p className="text-brand-gray leading-relaxed mb-6 italic">&quot;{testimonial.text}&quot;</p>
                <div>
                  <div className="font-bold text-brand-dark mb-1">{testimonial.name}</div>
                  <div className="text-sm text-brand-gray mb-1">{testimonial.role}</div>
                  <div className="text-sm text-brand-red font-semibold">{testimonial.project}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-br from-brand-red via-brand-red-dark to-brand-red text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.cta.title}</h2>
            <p className="text-xl text-white/90 mb-8">{t.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-brand-red font-semibold text-lg shadow-xl"
                >
                  {t.cta.button}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-colors"
                >
                  {t.cta.secondary}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
