'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Medal as Award } from '@phosphor-icons/react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { aboutData } from '@/lib/data/about';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

export default function AboutPage() {
  const { language, isRTL } = useLanguage();
  const [activeYear, setActiveYear] = useState(2004);

  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);

  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.2 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });

  const t = aboutData[language];

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-brand-bg via-white to-brand-bg ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-silver/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
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
            <p className="text-3xl md:text-4xl font-semibold text-brand-dark mb-6">
              {t.hero.subtitle}
            </p>
            <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">
              {t.hero.description}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={statsInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {t.stats.map((stat, idx) => {
              const Icon = resolveIcon(stat.icon);
              return (
                <motion.div key={idx} variants={fadeUp} className="relative group">
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-warm-lg group-hover:shadow-warm-lg transition-shadow" />
                  <div className="relative p-6 text-center">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-brand-silver" />
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-red to-brand-silver bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-brand-gray font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 text-center">
              {t.story.title}
            </h2>
            <div
              className="prose prose-lg max-w-none text-brand-gray space-y-6"
              style={{ textAlign: isRTL ? 'right' : 'left' }}
            >
              <p className="text-xl leading-relaxed">{t.story.intro}</p>
              <p className="leading-relaxed">{t.story.body1}</p>
              <p className="leading-relaxed">{t.story.body2}</p>
            </div>
            <div className="mt-8 text-center">
              <Link href="/why-choose-us">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  {t.story.cta}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────── */}
      <section ref={timelineRef} className="py-20 px-6 bg-gradient-to-br from-brand-dark to-brand-dark-mid text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={timelineInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.timeline.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
            <p className="text-xl text-white/70">{t.timeline.subtitle}</p>
          </motion.div>

          <div className="relative">
            {/* Centre line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-brand-silver via-brand-red to-brand-silver transform -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {t.timeline.events.map((event, idx) => {
                const Icon = resolveIcon(event.icon);
                return (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} ${isRTL ? 'text-right' : 'text-left'}`}>
                      <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-colors">
                        <div className="text-3xl font-bold text-brand-silver mb-2">{event.year}</div>
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <p className="text-white/70">{event.description}</p>
                      </div>
                    </div>

                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-silver to-brand-red flex items-center justify-center flex-shrink-0 shadow-lg relative z-10">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-4"
          >
            {t.mission.title}
          </motion.h2>
          <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-16" />

          <div className="grid md:grid-cols-2 gap-8">
            {[t.mission.mission, t.mission.vision].map((item, idx) => {
              const Icon = resolveIcon(item.icon);
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  transition={{ delay: idx * 0.15 }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-warm-lg transition-shadow border border-brand-silver/20"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-red to-brand-red-dark flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-4">{item.title}</h3>
                  <p className="text-brand-gray leading-relaxed">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Leadership Team ──────────────────────────────── */}
      <section ref={teamRef} className="py-20 px-6 bg-gradient-to-b from-brand-bg to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.team.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
            <p className="text-xl text-brand-gray">{t.team.subtitle}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={teamInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {t.team.members.map((member, idx) => (
              <motion.div key={idx} variants={fadeUp} className="group">
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-warm-lg transition-all duration-300 border border-brand-silver/10">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-dark mb-1">{member.name}</h3>
                    <p className="text-brand-red font-semibold mb-3">{member.title}</p>
                    <p className="text-brand-gray text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Factory Excellence ───────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.factory.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
            <p className="text-xl text-brand-gray">{t.factory.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {t.factory.features.map((feature, idx) => {
              const Icon = resolveIcon(feature.icon);
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-warm-lg hover:shadow-xl transition-shadow text-center border border-brand-silver/10"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-brand-silver" />
                  <h3 className="font-bold text-lg text-brand-dark mb-2">{feature.title}</h3>
                  <p className="text-brand-gray text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative h-96 rounded-3xl overflow-hidden shadow-warm-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1600&h=600&fit=crop"
              alt="EMAAR Manufacturing Facility"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-8">
              <p className="text-white text-xl font-semibold">
                {language === 'en' ? 'State-of-the-Art Manufacturing Facility' : 'منشأة تصنيع حديثة'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────── */}
      <section ref={valuesRef} className="py-20 px-6 bg-gradient-to-b from-brand-bg to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.values.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
            <p className="text-xl text-brand-gray">{t.values.subtitle}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {t.values.items.map((value, idx) => {
              const Icon = resolveIcon(value.icon);
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 shadow-warm-lg hover:shadow-xl transition-all duration-300 group border border-brand-silver/10"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-red to-brand-red-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">{value.title}</h3>
                  <p className="text-brand-gray leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Awards & Certifications ───────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-4"
          >
            {t.awards.title}
          </motion.h2>
          <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-16" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {t.awards.items.map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-warm-lg text-center border border-brand-silver/10"
              >
                <Award className="w-12 h-12 mx-auto mb-4 text-brand-silver" />
                <h3 className="font-bold text-brand-dark mb-1">{award.name}</h3>
                <p className="text-brand-gray text-sm">{award.year}</p>
              </motion.div>
            ))}
          </div>
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
              <Link href="/why-choose-us">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-brand-red font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow"
                >
                  {t.cta.button}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </motion.button>
              </Link>
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-colors"
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
