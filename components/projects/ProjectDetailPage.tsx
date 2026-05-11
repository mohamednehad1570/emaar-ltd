'use client';

/**
 * components/projects/ProjectDetailPage.tsx
 *
 * Full project detail view — receives numeric id from the server page.
 * Sections: hero (full-bleed image + title overlay), 4-col stat row,
 * description block, 3-col gallery, and a dark CTA strip.
 *
 * Design rules:
 *   • Hero overlay: gradient-to-t from-brand-dark/90 — keeps contrast ≥ 4.5:1
 *   • Stat row: 1px border-border-light dividers, icon + label + value stacked
 *   • Gallery: 3-col grid, 0px radius, border-border-light — matches ProjectCard pattern
 *   • RTL: back-arrow swaps, text alignment flips, flex-row-reverse on inline groups
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, CalendarBlank, Cube, Briefcase, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { projectsData } from '@/lib/data/projects';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

interface Props { id: number; }

export default function ProjectDetailPage({ id }: Props) {
  const { language, isRTL } = useLanguage();
  const project = projectsData.find(p => p.id === id);

  /* ── Not found fallback ──────────────────────────────────────────────── */
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white">
        <div className="text-center px-6">
          <p className="text-text-muted text-lg mb-4">
            {language === 'en' ? 'Project not found.' : 'لم يُعثر على المشروع.'}
          </p>
          <Link href="/projects" className="text-brand-red font-semibold hover:underline">
            {language === 'en' ? '← Back to Projects' : 'العودة إلى المشاريع ←'}
          </Link>
        </div>
      </div>
    );
  }

  const ui = language === 'en'
    ? { back: 'All Projects', location: 'Location', year: 'Year', material: 'Material', client: 'Client', scope: 'Scope', gallery: 'Project Gallery', startLabel: 'Start Your Project', startHeading: 'Ready to build something exceptional?', cta: 'Request a Quote' }
    : { back: 'جميع المشاريع', location: 'الموقع', year: 'السنة', material: 'المادة', client: 'العميل', scope: 'النطاق', gallery: 'معرض المشروع', startLabel: 'ابدأ مشروعك', startHeading: 'هل أنت مستعد لبناء شيء استثنائي؟', cta: 'طلب عرض سعر' };

  /* Material label is always English brand name except in Arabic for aluminium */
  const materialLabel = project.material === 'upvc' ? 'uPVC' : (language === 'en' ? 'Aluminium' : 'ألومنيوم');

  const stats = [
    { label: ui.location, value: project.location[language], Icon: MapPin },
    /* dir=ltr on year preserves Western digit order in RTL contexts */
    { label: ui.year, value: project.year, Icon: CalendarBlank },
    { label: ui.material, value: materialLabel, Icon: Cube },
    { label: ui.client, value: project.client[language], Icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative h-[70vh] md:h-screen overflow-hidden">
        <Image
          src={project.image}
          alt={project.title[language]}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        {/* Gradient starts at 90% opacity at bottom — hero text always legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent" />

        {/* ── Back link ────────────────────────────────────────────────────  */}
        <div className={`absolute top-8 ${isRTL ? 'right-8' : 'left-8'} z-10`}>
          <Link
            href="/projects"
            className={`inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {/* Arrow points toward reading-start edge */}
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{ui.back}</span>
          </Link>
        </div>

        {/* ── Title block ──────────────────────────────────────────────────  */}
        <motion.div
          className={`absolute bottom-12 px-8 md:px-24 ${isRTL ? 'text-right right-0' : 'text-left left-0'}`}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <span className="px-3 py-1 bg-brand-red text-white text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            {project.category[language]}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-cairo text-white leading-tight max-w-2xl">
            {project.title[language]}
          </h1>
        </motion.div>
      </div>

      {/* ── 4-col stat row ───────────────────────────────────────────────── */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 border-b border-border-light bg-white"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {stats.map(({ label, value, Icon }, idx) => (
          <motion.div
            key={label}
            variants={fadeUp}
            transition={{ delay: idx * 0.07 }}
            className={`py-8 px-8 border-r border-border-light last:border-r-0 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <Icon className="w-5 h-5 text-brand-red mb-3" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted mb-1">{label}</p>
            <p className="text-base font-bold text-brand-dark">{value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Description ──────────────────────────────────────────────────── */}
      <motion.div
        className="max-w-4xl mx-auto px-8 md:px-24 py-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div className={`h-0.5 w-12 bg-brand-red mb-8 ${isRTL ? 'mr-0 ml-auto' : ''}`} />
        <p className={`text-lg text-text-body leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
          {project.description[language]}
        </p>
        <p className={`mt-6 text-sm font-semibold text-brand-red ${isRTL ? 'text-right' : 'text-left'}`}>
          {ui.scope}: {project.scope[language]}
        </p>
      </motion.div>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      <motion.div
        className="px-8 md:px-24 pb-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className={`text-xs font-semibold uppercase tracking-[0.25em] text-text-muted mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          {ui.gallery}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.gallery.map((src, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              transition={{ delay: idx * 0.08 }}
              /* 0px radius per --radius-image token; border-border-light = subtle frame */
              className="relative aspect-[4/3] overflow-hidden border border-border-light"
            >
              <Image
                src={src}
                alt={`${project.title[language]} — ${idx + 1}`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── CTA strip ────────────────────────────────────────────────────── */}
      <div className="bg-brand-dark py-20 px-8 text-center">
        <p className="text-white/70 text-xs font-semibold uppercase tracking-[0.25em] mb-4">{ui.startLabel}</p>
        <h2 className="text-3xl md:text-4xl font-bold font-cairo text-white mb-8">{ui.startHeading}</h2>
        <Link
          href="/contact"
          className={`inline-flex items-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-dark text-white font-bold transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <span>{ui.cta}</span>
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
      </div>

    </div>
  );
}
