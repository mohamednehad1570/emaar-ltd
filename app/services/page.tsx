'use client';

/**
 * app/services/page.tsx
 *
 * Services page: 8-step process lifecycle, maintenance plans, emergency
 * response, warranty coverage, timeline, and CTAs.
 *
 * Design compliance:
 *   - bg-off-white flat page background
 *   - No gradient text, no gradient section/button backgrounds
 *   - No decorative blur orbs; no glassmorphism
 *   - Icon containers: sharp 0px radius, solid bg-brand-red — no rounded-full
 *   - Accent lines: h-0.5 w-12 hairline (not 6px pill)
 *   - text-text-body throughout prose contexts
 *   - reduced-motion respected on every animation
 */

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Phone, CheckCircle as CheckCircle2, Clock, WarningCircle as AlertCircle, ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { servicesData } from '@/lib/data/services';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

export default function ServicesPage() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();

  const processRef = useRef(null);
  const maintenanceRef = useRef(null);
  const warrantyRef = useRef(null);

  const processInView     = useInView(processRef,     { once: true, amount: 0.2 });
  const maintenanceInView = useInView(maintenanceRef, { once: true, amount: 0.3 });
  const warrantyInView    = useInView(warrantyRef,    { once: true, amount: 0.3 });

  const t = servicesData[language];

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={isRTL ? 'text-right' : 'text-left'}
          >
            {/* h1 — display scale, solid ink, no gradient */}
            <h1
              className="font-extrabold text-brand-dark leading-[0.95] tracking-[-0.02em] mb-5 text-balance"
              style={{ fontSize: 'clamp(2.75rem, 5vw, 5rem)' }}
            >
              {t.hero.title}
            </h1>
            <p className="text-xl font-semibold text-text-body mb-5">{t.hero.subtitle}</p>
            <p className="text-lg text-text-body max-w-2xl">{t.hero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Building Process ─────────────────────────────────────────── */}
      <section ref={processRef} className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            animate={processInView ? 'visible' : 'hidden'}
            className="mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
              {t.process.title}
            </h2>
            {/* Hairline accent — 2px, 48px, sharp */}
            <div className={`h-0.5 w-12 bg-brand-red mb-4 ${isRTL ? 'mr-0' : ''}`} />
            <p className={`text-lg text-text-body mb-3 ${isRTL ? 'text-right' : ''}`}>{t.process.subtitle}</p>
            <p className={`text-text-body max-w-2xl ${isRTL ? 'text-right mr-0 ml-0' : ''}`}>{t.process.intro}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduce ? {} : 'hidden'}
            animate={processInView ? 'visible' : 'hidden'}
            className="space-y-4"
          >
            {t.process.steps.map((step, idx) => {
              const Icon = resolveIcon(step.icon);
              return (
                <motion.div key={idx} variants={fadeUp} className="relative">
                  <div className="bg-off-white border border-border-light hover:border-brand-silver transition-colors duration-200 p-6 md:p-8">
                    <div className={`flex flex-col md:flex-row gap-6 items-start ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                      {/* Compact flat icon box — no gradient, no 80px circle */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-12 h-12 bg-brand-red flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                          </div>
                          {/* Ghost step number — absolute, behind icon */}
                          <div className={`text-4xl font-bold text-brand-silver/25 absolute -top-4 ${isRTL ? '-right-4' : '-left-4'}`}
                            aria-hidden="true"
                          >
                            {step.number}
                          </div>
                        </div>
                      </div>

                      <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                        <h3 className="text-xl font-bold text-brand-dark mb-2">{step.title}</h3>
                        <p className="text-text-body leading-relaxed mb-4">{step.description}</p>
                        <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center gap-2 px-4 py-2 bg-cream ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Clock className="w-4 h-4 text-brand-red shrink-0" aria-hidden="true" />
                            <span className="text-sm font-semibold text-brand-dark">{step.duration}</span>
                          </div>
                          <div className={`flex items-center gap-2 px-4 py-2 bg-cream ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" aria-hidden="true" />
                            <span className="text-sm font-semibold text-brand-dark">{step.deliverable}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step connector — solid hairline, not gradient */}
                  {idx < t.process.steps.length - 1 && (
                    <div
                      className={`absolute ${isRTL ? 'right-[22px]' : 'left-[22px]'} top-full w-px h-4 bg-border-medium`}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Maintenance Services ─────────────────────────────────────── */}
      <section ref={maintenanceRef} className="py-20 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            animate={maintenanceInView ? 'visible' : 'hidden'}
            className="mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
              {t.maintenance.title}
            </h2>
            <div className={`h-0.5 w-12 bg-brand-red mb-4`} />
            <p className={`text-lg text-text-body mb-3 ${isRTL ? 'text-right' : ''}`}>{t.maintenance.subtitle}</p>
            <p className={`text-text-body max-w-2xl ${isRTL ? 'text-right' : ''}`}>{t.maintenance.intro}</p>
          </motion.div>

          {/* Maintenance Plans */}
          <motion.div
            variants={staggerContainer}
            initial={shouldReduce ? {} : 'hidden'}
            animate={maintenanceInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-3 gap-6 mb-14"
          >
            {t.maintenance.plans.map((plan, idx) => {
              const Icon = resolveIcon(plan.icon);
              return (
                <motion.div key={idx} variants={fadeUp} className="relative mt-4">
                  {plan.popular && (
                    /* Solid badge — no gradient */
                    <div className={`absolute -top-4 ${isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} px-5 py-1.5 bg-brand-red text-white font-bold text-xs uppercase tracking-wide z-10`}>
                      {language === 'en' ? 'Most Popular' : 'الأكثر شعبية'}
                    </div>
                  )}
                  {/* border-border-light at rest; red border for popular plan */}
                  <div className={`bg-white p-8 border h-full ${
                    plan.popular ? 'border-2 border-brand-red' : 'border border-border-light'
                  }`}>
                    <Icon className="w-10 h-10 text-brand-red mb-4" aria-hidden="true" />
                    <h3 className={`text-xl font-bold text-brand-dark mb-2 ${isRTL ? 'text-right' : ''}`}>{plan.name}</h3>
                    <div className={`text-2xl font-bold text-brand-red mb-6 ${isRTL ? 'text-right' : ''}`}>{plan.price}</div>
                    <ul className={`space-y-3 mb-8 ${isRTL ? 'text-right' : ''}`}>
                      {plan.features.map((feature, i) => (
                        <li key={i} className={`flex items-start gap-2 text-text-body ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white font-semibold transition-colors"
                      >
                        {language === 'en' ? 'Request a Quote' : 'طلب عرض سعر'}
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Emergency Response — solid brand-red, no gradient */}
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
            className="bg-brand-red p-8 md:p-12 text-white"
          >
            <div className={`text-center mb-8 ${isRTL ? 'rtl' : ''}`}>
              <AlertCircle className="w-14 h-14 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-bold mb-3">{t.maintenance.emergency.title}</h3>
              <p className="text-lg text-white/90">{t.maintenance.emergency.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {t.maintenance.emergency.features.map((feature, idx) => {
                const FIcon = resolveIcon(feature.icon);
                return (
                  <div key={idx} className={`text-center ${isRTL ? 'rtl' : ''}`}>
                    {/* No blur — bg-white/20 flat tint is sufficient */}
                    <div className="w-14 h-14 bg-white/20 flex items-center justify-center mx-auto mb-3">
                      <FIcon className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <h4 className="font-bold mb-1 text-sm">{feature.title}</h4>
                    <p className="text-xs text-white/80">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <p className={`text-lg font-bold mb-4 ${isRTL ? 'rtl' : ''}`}>{t.maintenance.emergency.contact}</p>
              <a href="tel:+971501234567">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-red font-bold text-base ${isRTL ? 'flex-row-reverse' : ''}`}
                  style={{ boxShadow: '0 4px 20px rgba(45,41,38,0.15)' }}
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  {language === 'en' ? 'Call Now' : 'اتصل الآن'}
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Warranty ─────────────────────────────────────────────────── */}
      <section ref={warrantyRef} className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            animate={warrantyInView ? 'visible' : 'hidden'}
            className="mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
              {t.warranty.title}
            </h2>
            <div className="h-0.5 w-12 bg-brand-red mb-4" />
            <p className={`text-lg text-text-body mb-3 ${isRTL ? 'text-right' : ''}`}>{t.warranty.subtitle}</p>
            <p className={`text-text-body max-w-2xl ${isRTL ? 'text-right' : ''}`}>{t.warranty.intro}</p>
          </motion.div>

          {/* Coverage Cards */}
          <motion.div
            variants={staggerContainer}
            initial={shouldReduce ? {} : 'hidden'}
            animate={warrantyInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 gap-6 mb-10"
          >
            {t.warranty.coverage.map((item, idx) => {
              const Icon = resolveIcon(item.icon);
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-off-white border border-border-light hover:border-brand-silver transition-colors p-8"
                >
                  <div className={`flex items-start gap-4 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {/* Sharp flat icon box — no rounded-full, no gradient */}
                    <div className="w-9 h-9 bg-brand-red flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h3 className="text-lg font-bold text-brand-dark mb-1.5">{item.title}</h3>
                      <p className="text-sm text-text-body">{item.description}</p>
                    </div>
                  </div>
                  <ul className={`space-y-2 ${isRTL ? 'text-right' : ''}`}>
                    {item.details.map((detail, i) => (
                      <li key={i} className={`flex items-start gap-2 text-sm text-text-body ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Exclusions & Claims */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              variants={fadeUp}
              initial={shouldReduce ? {} : 'hidden'}
              whileInView={shouldReduce ? undefined : 'visible'}
              viewport={shouldReduce ? undefined : viewportOnce}
              className="bg-off-white border border-border-light p-8"
            >
              <h3 className={`text-xl font-bold text-brand-dark mb-5 ${isRTL ? 'text-right' : ''}`}>
                {t.warranty.exclusions.title}
              </h3>
              <ul className={`space-y-3 ${isRTL ? 'text-right' : ''}`}>
                {t.warranty.exclusions.items.map((item, idx) => (
                  <li key={idx} className={`flex items-start gap-2 text-text-body ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <AlertCircle className="w-4 h-4 text-brand-red shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial={shouldReduce ? {} : 'hidden'}
              whileInView={shouldReduce ? undefined : 'visible'}
              viewport={shouldReduce ? undefined : viewportOnce}
              className="bg-cream border border-border-light p-8"
            >
              <h3 className={`text-xl font-bold text-brand-dark mb-5 ${isRTL ? 'text-right' : ''}`}>
                {t.warranty.claim.title}
              </h3>
              <ol className={`space-y-4 ${isRTL ? 'text-right' : ''}`}>
                {t.warranty.claim.steps.map((step, idx) => (
                  <li key={idx} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {/* Sharp numbered square — no rounded-full, no gradient */}
                    <div className="w-7 h-7 bg-brand-red flex items-center justify-center shrink-0 text-white font-bold text-sm">
                      {idx + 1}
                    </div>
                    <span className="text-text-body pt-0.5 text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Service Timeline ──────────────────────────────────────────── */}
      {/* Solid bg-brand-dark — no gradient */}
      <section className="py-20 px-6 bg-brand-dark text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.timeline.title}</h2>
            <div className="h-0.5 w-12 bg-brand-red mx-auto mb-4" />
            <p className="text-lg text-white/75">{t.timeline.subtitle}</p>
          </motion.div>

          <div className="space-y-3 mb-6">
            {t.timeline.phases.map((phase, idx) => (
              <motion.div
                key={idx}
                /* shouldReduce guard — respects prefers-reduced-motion */
                initial={shouldReduce ? {} : { opacity: 0, x: isRTL ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={shouldReduce ? undefined : viewportOnce}
                transition={{ delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                /* No backdrop-blur — bg-white/10 flat tint */
                className="bg-white/10 border border-white/10 p-5 hover:bg-white/15 transition-colors"
              >
                <div className={`flex flex-col md:flex-row md:items-center justify-between gap-3 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                    <h3 className="text-base font-bold mb-1">{phase.phase}</h3>
                    <p className="text-sm text-white/70">{phase.description}</p>
                  </div>
                  {/* Duration tag — bg-brand-silver, sharp */}
                  <div className="px-5 py-2.5 bg-brand-silver text-brand-dark font-bold text-sm whitespace-nowrap shrink-0">
                    {phase.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline note — no blur */}
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
            className={`bg-white/10 border border-white/10 p-5 ${isRTL ? 'text-right' : ''}`}
          >
            <p className="text-sm text-white/70 italic">{t.timeline.note}</p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {t.cta.map((cta, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial={shouldReduce ? {} : 'hidden'}
              whileInView={shouldReduce ? undefined : 'visible'}
              viewport={shouldReduce ? undefined : viewportOnce}
              transition={{ delay: idx * 0.12 }}
              /* Solid backgrounds — no gradient; primary red, secondary dark */
              className={`relative overflow-hidden p-8 md:p-12 text-center ${
                cta.primary ? 'bg-brand-red text-white' : 'bg-brand-dark text-white'
              }`}
            >
              {/* Subtle dot texture — functional density signal, not gradient */}
              <div
                className="absolute inset-0 opacity-[0.07] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
                aria-hidden="true"
              />
              <div className={`relative ${isRTL ? 'rtl' : ''}`}>
                <h3 className="text-2xl font-bold mb-3">{cta.title}</h3>
                <p className="text-base mb-8 text-white/85">{cta.description}</p>
                <Link href={cta.link}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`inline-flex items-center gap-2 px-8 py-4 font-bold text-base ${
                      cta.primary ? 'bg-white text-brand-red' : 'bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors'
                    }`}
                    style={cta.primary ? { boxShadow: '0 4px 20px rgba(45,41,38,0.15)' } : undefined}
                  >
                    {cta.button}
                    {cta.primary
                      ? <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
                      : <Phone className="w-5 h-5" aria-hidden="true" />
                    }
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
