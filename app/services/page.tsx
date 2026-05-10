'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, CheckCircle as CheckCircle2, Clock, WarningCircle as AlertCircle, ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { servicesData } from '@/lib/data/services';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

export default function ServicesPage() {
  const { language, isRTL } = useLanguage();

  const processRef = useRef(null);
  const maintenanceRef = useRef(null);
  const warrantyRef = useRef(null);

  const processInView = useInView(processRef, { once: true, amount: 0.2 });
  const maintenanceInView = useInView(maintenanceRef, { once: true, amount: 0.3 });
  const warrantyInView = useInView(warrantyRef, { once: true, amount: 0.3 });

  const t = servicesData[language];

  return (
    <div className={`min-h-screen bg-gradient-to-b from-brand-bg via-white to-brand-bg ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/3 w-[600px] h-[600px] bg-brand-silver/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-brand-red to-brand-silver bg-clip-text text-transparent">
              {t.hero.title}
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-brand-dark mb-6">{t.hero.subtitle}</p>
            <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">{t.hero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Building Process ──────────────────────────────── */}
      <section ref={processRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={processInView ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.process.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
            <p className="text-xl text-brand-gray mb-6">{t.process.subtitle}</p>
            <p className="text-brand-gray max-w-3xl mx-auto">{t.process.intro}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={processInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {t.process.steps.map((step, idx) => {
              const Icon = resolveIcon(step.icon);
              return (
                <motion.div key={idx} variants={fadeUp} className="relative">
                  <div className="bg-white rounded-sm p-6 md:p-8 border border-border-light hover:border-2 hover:border-brand-silver transition-all">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-sm bg-gradient-to-br from-brand-red to-brand-red-dark flex items-center justify-center mb-3">
                            <Icon className="w-10 h-10 text-white" />
                          </div>
                          <div className="text-4xl font-bold text-brand-silver/30 absolute -top-4 -left-4">{step.number}</div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-brand-dark mb-3">{step.title}</h3>
                        <p className="text-brand-gray leading-relaxed mb-4">{step.description}</p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 px-4 py-2 rounded-none bg-brand-bg">
                            <Clock className="w-4 h-4 text-brand-red" />
                            <span className="text-sm font-semibold text-brand-dark">{step.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 rounded-none bg-brand-red/5">
                            <CheckCircle2 className="w-4 h-4 text-brand-red" />
                            <span className="text-sm font-semibold text-brand-dark">{step.deliverable}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {idx < t.process.steps.length - 1 && (
                    <div className={`absolute ${isRTL ? 'right-10' : 'left-10'} top-full w-0.5 h-6 bg-gradient-to-b from-brand-red to-brand-silver`} />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Maintenance Services ──────────────────────────── */}
      <section ref={maintenanceRef} className="py-20 px-6 bg-gradient-to-b from-brand-bg to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={maintenanceInView ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.maintenance.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
            <p className="text-xl text-brand-gray mb-6">{t.maintenance.subtitle}</p>
            <p className="text-brand-gray max-w-3xl mx-auto">{t.maintenance.intro}</p>
          </motion.div>

          {/* Plans */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={maintenanceInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {t.maintenance.plans.map((plan, idx) => {
              const Icon = resolveIcon(plan.icon);
              return (
                <motion.div key={idx} variants={fadeUp} className="relative">
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-none bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-bold text-sm z-10">
                      {language === 'en' ? 'Most Popular' : 'الأكثر شعبية'}
                    </div>
                  )}
                  <div className={`bg-white rounded-sm p-8 transition-all h-full border `}>
                    <Icon className="w-12 h-12 text-brand-red mb-4" />
                    <h3 className="text-2xl font-bold text-brand-dark mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-brand-red mb-6">{plan.price}</div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-brand-gray">
                          <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-6 py-3 rounded-none bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-semibold transition-all"
                      >
                        {language === 'en' ? 'Choose Plan' : 'اختر الخطة'}
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Emergency */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bg-gradient-to-br from-brand-red to-brand-red-dark rounded-sm p-8 md:p-12 text-white"
          >
            <div className="text-center mb-8">
              <AlertCircle className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-3">{t.maintenance.emergency.title}</h3>
              <p className="text-xl text-white/90">{t.maintenance.emergency.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {t.maintenance.emergency.features.map((feature, idx) => {
                const FIcon = resolveIcon(feature.icon);
                return (
                  <div key={idx} className="text-center">
                    <div className="w-16 h-16 rounded-sm bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                      <FIcon className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold mb-2">{feature.title}</h4>
                    <p className="text-sm text-white/80">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <p className="text-xl font-bold mb-4">{t.maintenance.emergency.contact}</p>
              <a href="tel:+971501234567">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-none bg-white text-brand-red font-semibold text-lg shadow-warm-xl"
                >
                  <Phone className="w-5 h-5" />
                  {language === 'en' ? 'Call Now' : 'اتصل الآن'}
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Warranty ──────────────────────────────────────── */}
      <section ref={warrantyRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={warrantyInView ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.warranty.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
            <p className="text-xl text-brand-gray mb-6">{t.warranty.subtitle}</p>
            <p className="text-brand-gray max-w-3xl mx-auto">{t.warranty.intro}</p>
          </motion.div>

          {/* Coverage Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={warrantyInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {t.warranty.coverage.map((item, idx) => {
              const Icon = resolveIcon(item.icon);
              return (
                <motion.div key={idx} variants={fadeUp} className="bg-white rounded-sm p-8 border border-border-light hover:border-2 hover:border-brand-silver transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-silver to-brand-red flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-dark mb-2">{item.title}</h3>
                      <p className="text-brand-gray">{item.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {item.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-brand-gray">
                        <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Exclusions & Claims */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="bg-brand-bg rounded-sm p-8"
            >
              <h3 className="text-2xl font-bold text-brand-dark mb-6">{t.warranty.exclusions.title}</h3>
              <ul className="space-y-3">
                {t.warranty.exclusions.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-brand-gray">
                    <AlertCircle className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="bg-brand-red/5 rounded-sm p-8"
            >
              <h3 className="text-2xl font-bold text-brand-dark mb-6">{t.warranty.claim.title}</h3>
              <ol className="space-y-4">
                {t.warranty.claim.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-red to-brand-red-dark flex items-center justify-center flex-shrink-0 text-white font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-brand-gray pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-br from-brand-dark to-brand-dark-mid text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.timeline.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
            <p className="text-xl text-white/70">{t.timeline.subtitle}</p>
          </motion.div>

          <div className="space-y-6 mb-8">
            {t.timeline.phases.map((phase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-sm p-6 hover:bg-white/20 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{phase.phase}</h3>
                    <p className="text-white/70">{phase.description}</p>
                  </div>
                  <div className="px-6 py-3 rounded-none bg-brand-silver text-brand-dark font-bold text-lg whitespace-nowrap">
                    {phase.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-sm p-6 text-center"
          >
            <p className="text-white/70 italic">{t.timeline.note}</p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {t.cta.map((cta, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: idx * 0.15 }}
              className={`relative overflow-hidden rounded-sm p-8 md:p-12 text-center ${cta.primary
                ? 'bg-gradient-to-br from-brand-red to-brand-red-dark text-white'
                : 'bg-gradient-to-br from-brand-silver to-brand-dark text-white'
              }`}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative">
                <h3 className="text-3xl font-bold mb-4">{cta.title}</h3>
                <p className="text-lg mb-8 opacity-90">{cta.description}</p>
                <Link href={cta.link}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-none font-semibold text-lg shadow-warm-xl ${cta.primary ? 'bg-white text-brand-red' : 'bg-white text-brand-dark'}`}
                  >
                    {cta.button}
                    {cta.primary ? (
                      <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    ) : (
                      <Phone className="w-5 h-5" />
                    )}
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
