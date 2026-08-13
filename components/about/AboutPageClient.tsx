'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Medal as Award } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { aboutData } from '@/lib/data/about';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import Container from '@/components/layout/Container';
import type { TeamMember, LocalizedText } from '@/lib/sanity/types';

interface AboutPageClientProps {
  companyBio?: LocalizedText
  foundedYear?: number
  teamMembers: TeamMember[]
}

export default function AboutPageClient({
  companyBio,
  foundedYear: _foundedYear,
  teamMembers,
}: AboutPageClientProps) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();

  const statsRef    = useRef(null);
  const timelineRef = useRef(null);
  const teamRef     = useRef(null);
  const valuesRef   = useRef(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const statsInView    = useInView(statsRef,    { once: true, amount: 0.3 });
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.2 });
  const teamInView     = useInView(teamRef,     { once: true, amount: 0.2 });
  const valuesInView   = useInView(valuesRef,   { once: true, amount: 0.2 });

  const t = aboutData[language];

  // Scroll the timeline to the end in RTL so the most-recent event is first
  useEffect(() => {
    if (isRTL && scrollTrackRef.current) {
      scrollTrackRef.current.scrollLeft = scrollTrackRef.current.scrollWidth;
    }
  }, [isRTL]);

  // Use CMS story intro if provided; otherwise fall back to static data
  const storyIntro = companyBio
    ? (isRTL ? companyBio.ar : companyBio.en)
    : t.story.intro;

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h1
              className="font-extrabold text-brand-dark leading-[0.95] tracking-[-0.02em] mb-5 text-balance mx-auto"
              style={{ fontSize: 'clamp(2.75rem, 5vw, 5rem)' }}
            >
              {t.hero.title}
            </h1>
            <p className="text-xl font-semibold text-text-body mb-4">{t.hero.subtitle}</p>
            <p className="text-lg text-text-body max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
          </motion.div>

          <motion.div
            ref={statsRef}
            variants={staggerContainer}
            initial={shouldReduce ? {} : 'hidden'}
            animate={statsInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {t.stats.map((stat, idx) => {
              const Icon = resolveIcon(stat.icon);
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-white border border-border-light p-6 text-center"
                >
                  <Icon className="w-8 h-8 mx-auto mb-3 text-brand-silver" aria-hidden="true" />
                  <div className="text-4xl md:text-5xl font-bold text-brand-dark tabular-nums mb-1" dir="ltr">
                    {stat.number}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Our Story ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
            <h2 className={`text-3xl md:text-4xl font-bold text-brand-dark mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t.story.title}
            </h2>
            <div className={`h-0.5 w-12 bg-brand-red mb-8 ${isRTL ? 'mr-0' : ''}`} />

            <div className="space-y-5 text-text-body leading-relaxed" style={{ textAlign: isRTL ? 'right' : 'left' }}>
              {/* CMS companyBio replaces the intro paragraph when provided */}
              <p className="text-lg">{storyIntro}</p>
              <p>{t.story.body1}</p>
              <p>{t.story.body2}</p>
            </div>

            <div className={`mt-10 ${isRTL ? 'text-right' : 'text-left'}`}>
              <Link href="/why-choose-us">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-dark text-white font-bold transition-colors cursor-pointer"
                >
                  {t.story.cta}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────────── */}
      <section ref={timelineRef} className="py-24 bg-off-white overflow-hidden">
        <Container>
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            animate={timelineInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">{t.timeline.title}</h2>
            <div className="h-0.5 w-12 bg-brand-red mx-auto mb-4" />
            <p className="text-lg text-text-body max-w-xl mx-auto">{t.timeline.subtitle}</p>
          </motion.div>
        </Container>

        {/* DESKTOP: horizontal scroll track */}
        <div className="hidden md:block relative">
          <div className="absolute top-12 left-0 right-0 h-px bg-brand-silver/30 z-0" aria-hidden="true" />
          <motion.div
            ref={scrollTrackRef}
            style={{ scrollSnapType: 'x mandatory' }}
            className={`flex overflow-x-auto scrollbar-hide px-24 ${isRTL ? 'flex-row-reverse' : ''}`}
            variants={staggerContainer}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
            {t.timeline.events.map((event) => (
              <motion.div
                key={event.year}
                variants={fadeUp}
                style={{ scrollSnapAlign: 'start' }}
                className="w-64 flex-shrink-0 relative z-10 pt-12 pb-10 flex flex-col items-center"
              >
                <div className="w-3 h-3 rotate-45 bg-brand-red shrink-0" aria-hidden="true" />
                <span className="text-4xl font-bold tabular-nums text-gold mt-4" dir="ltr">{event.year}</span>
                <h3 className="text-base font-bold text-brand-dark mt-2 text-center px-4 leading-snug">{event.title}</h3>
                <p className="text-sm text-text-muted mt-1 text-center px-6 line-clamp-2 leading-relaxed">{event.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* MOBILE: vertical list */}
        <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="flex flex-col gap-8"
            variants={staggerContainer}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
            {t.timeline.events.map((event) => (
              <motion.div
                key={event.year}
                variants={fadeUp}
                className={isRTL ? 'border-r border-brand-red/30 pr-5 text-right' : 'border-l border-brand-red/30 pl-5'}
              >
                <span className="text-2xl font-bold tabular-nums text-gold" dir="ltr">{event.year}</span>
                <h3 className="text-base font-bold text-brand-dark mt-1">{event.title}</h3>
                <p className="text-sm text-text-muted mt-1 leading-relaxed">{event.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">{t.mission.title}</h2>
            <div className="h-0.5 w-12 bg-brand-red mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[t.mission.mission, t.mission.vision].map((item, idx) => {
              const Icon = resolveIcon(item.icon);
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial={shouldReduce ? {} : 'hidden'}
                  whileInView={shouldReduce ? undefined : 'visible'}
                  viewport={shouldReduce ? undefined : viewportOnce}
                  transition={{ delay: idx * 0.12 }}
                  className="bg-white p-8 border border-border-light hover:border-brand-silver transition-colors duration-200"
                >
                  <div className={`flex items-center gap-3 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 bg-brand-red flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-dark">{item.title}</h3>
                  </div>
                  <p className={`text-text-body leading-relaxed ${isRTL ? 'text-right' : ''}`}>{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Leadership Team ─────────────────────────────────────────── */}
      <section ref={teamRef} className="py-20 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            animate={teamInView ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">{t.team.title}</h2>
            <div className="h-0.5 w-12 bg-brand-red mx-auto mb-4" />
            <p className="text-lg text-text-body">{t.team.subtitle}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduce ? {} : 'hidden'}
            animate={teamInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* CMS team members take priority when non-empty; else render static placeholders */}
            {teamMembers.length > 0
              ? teamMembers.map((member) => (
                  <motion.div key={member._id} variants={fadeUp} className="group">
                    <div className="bg-white border border-border-light hover:border-brand-silver transition-colors duration-300 overflow-hidden">
                      <div className="relative h-60 overflow-hidden">
                        {member.photo ? (
                          <Image
                            src={member.photo}
                            alt={isRTL ? member.name.ar : member.name.en}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          /* Placeholder when no photo uploaded yet */
                          <div className="w-full h-full bg-surface-cream flex items-center justify-center">
                            <span className="text-4xl text-text-muted font-bold">
                              {(isRTL ? member.name.ar : member.name.en).charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className={`p-5 ${isRTL ? 'text-right' : ''}`}>
                        <h3 className="text-base font-bold text-brand-dark mb-0.5">
                          {isRTL ? member.name.ar : member.name.en}
                        </h3>
                        <p className="text-sm text-brand-red font-semibold mb-3">
                          {isRTL ? member.role.ar : member.role.en}
                        </p>
                        {member.bio && (
                          <p className="text-sm text-text-body leading-relaxed">
                            {isRTL ? member.bio.ar : member.bio.en}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              : t.team.members.map((member, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="group">
                    <div className="bg-white border border-border-light hover:border-brand-silver transition-colors duration-300 overflow-hidden">
                      <div className="relative h-60 overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className={`p-5 ${isRTL ? 'text-right' : ''}`}>
                        <h3 className="text-base font-bold text-brand-dark mb-0.5">{member.name}</h3>
                        <p className="text-sm text-brand-red font-semibold mb-3">{member.title}</p>
                        <p className="text-sm text-text-body leading-relaxed">{member.bio}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>

      {/* ── Factory Excellence ──────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">{t.factory.title}</h2>
            <div className="h-0.5 w-12 bg-brand-red mx-auto mb-4" />
            <p className="text-lg text-text-body">{t.factory.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {t.factory.features.map((feature, idx) => {
              const Icon = resolveIcon(feature.icon);
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial={shouldReduce ? {} : 'hidden'}
                  whileInView={shouldReduce ? undefined : 'visible'}
                  viewport={shouldReduce ? undefined : viewportOnce}
                  transition={{ delay: idx * 0.08 }}
                  className={`bg-white border border-border-light hover:border-brand-silver transition-colors duration-200 p-6 ${isRTL ? 'text-right' : ''}`}
                >
                  <Icon className="w-8 h-8 mb-4 text-brand-silver" aria-hidden="true" />
                  <h3 className="font-bold text-brand-dark mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-text-body leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
            className="relative h-80 overflow-hidden border border-border-light"
          >
            <img
              src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1600&h=600&fit=crop"
              alt="EMAAR manufacturing facility"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent flex items-end p-6">
              <p className={`text-white text-base font-semibold ${isRTL ? 'text-right w-full' : ''}`}>
                {language === 'en'
                  ? 'EMAAR Manufacturing Facility — 15,000 sqm, Sharjah'
                  : 'منشأة إعمار للتصنيع — 15,000 متر مربع، الشارقة'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Core Values ─────────────────────────────────────────────── */}
      <section ref={valuesRef} className="py-20 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            animate={valuesInView ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">{t.values.title}</h2>
            <div className="h-0.5 w-12 bg-brand-red mx-auto mb-4" />
            <p className="text-lg text-text-body">{t.values.subtitle}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial={shouldReduce ? {} : 'hidden'}
            animate={valuesInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto"
          >
            {t.values.items.map((value, idx) => {
              const Icon = resolveIcon(value.icon);
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className={`flex gap-4 items-start ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                >
                  <Icon className="w-5 h-5 text-brand-red shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="text-base font-bold text-brand-dark mb-1">{value.title}</h3>
                    <p className="text-sm text-text-body leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Awards & Certifications ─────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">{t.awards.title}</h2>
            <div className="h-0.5 w-12 bg-brand-red mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {t.awards.items.map((awardItem, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={shouldReduce ? undefined : viewportOnce}
                transition={{ delay: idx * 0.05 }}
                className={`bg-white border border-border-light hover:border-brand-silver transition-colors p-6 text-center ${isRTL ? 'rtl' : ''}`}
              >
                <Award className="w-10 h-10 mx-auto mb-3 text-gold" aria-hidden="true" />
                <h3 className="font-bold text-brand-dark text-sm mb-1">{awardItem.name}</h3>
                <p className="text-xs text-text-muted" dir="ltr">{awardItem.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-brand-red text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
            <h2
              className="font-bold mb-5 text-balance"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', lineHeight: 1.1 }}
            >
              {t.cta.title}
            </h2>
            <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">{t.cta.description}</p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Link href="/why-choose-us">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-cream text-brand-red font-bold text-lg cursor-pointer transition-colors"
                  style={{ boxShadow: '0 4px 20px rgba(45,41,38,0.15)' }}
                >
                  {t.cta.button}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
                </motion.span>
              </Link>
              <Link href="/projects">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/12 border border-white/30 text-white font-bold text-lg hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {t.cta.secondary}
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
