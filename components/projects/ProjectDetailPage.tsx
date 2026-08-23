'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, CalendarBlank, Cube, Briefcase, ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { getWhatsAppURL } from '@/lib/whatsapp';
import type { SanityProject } from '@/lib/sanity/types';

interface Props { project: SanityProject }

const typeLabels: Record<string, { en: string; ar: string }> = {
  villas:    { en: 'Villas',             ar: 'فلل'   },
  buildings: { en: 'Buildings',          ar: 'مباني' },
  towers:    { en: 'High-Rise / Towers', ar: 'أبراج' },
};

export default function ProjectDetailPage({ project }: Props) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();

  const ui = language === 'en'
    ? { back: 'All Projects', location: 'Location', year: 'Year', material: 'Material', client: 'Client', scope: 'Scope', gallery: 'Project Gallery', startLabel: 'Start Your Project', startHeading: 'Ready to build something exceptional?', cta: 'Request a Quote' }
    : { back: 'جميع المشاريع', location: 'الموقع', year: 'السنة', material: 'المادة', client: 'العميل', scope: 'النطاق', gallery: 'معرض المشروع', startLabel: 'ابدأ مشروعك', startHeading: 'هل أنت مستعد لبناء شيء استثنائي؟', cta: 'طلب عرض سعر' };

  const primaryMaterial = project.materialsUsed[0] ?? ''
  const materialLabel = primaryMaterial === 'upvc' ? 'uPVC' : (language === 'en' ? 'Aluminium' : 'ألومنيوم')
  const categoryLabel = typeLabels[project.type]?.[language] ?? project.type
  const heroImage = project.images[0] ?? ''
  const gallery = project.images.slice(1)

  const stats = [
    { label: ui.location, value: project.location?.[language] ?? project.location?.en ?? '', Icon: MapPin },
    { label: ui.year, value: project.year != null ? String(project.year) : '', Icon: CalendarBlank },
    { label: ui.material, value: materialLabel, Icon: Cube },
    { label: ui.client, value: project.client?.[language] ?? '', Icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-off-white pt-[52px]" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative h-[70vh] md:h-screen overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage}
            alt={project.title[language] ?? project.title.en}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-heading/90 via-ink-heading/40 to-transparent" />

        <div className={`absolute top-8 ${isRTL ? 'right-8' : 'left-8'} z-10`}>
          <Link
            href="/projects"
            className={`inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{ui.back}</span>
          </Link>
        </div>

        <motion.div
          className={`absolute bottom-12 px-8 md:px-24 ${isRTL ? 'text-right right-0' : 'text-left left-0'}`}
          variants={fadeUp}
          initial={shouldReduce ? {} : 'hidden'}
          animate="visible"
        >
          <span className="px-3 py-1 bg-brand-red text-white text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            {categoryLabel}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-cairo text-white leading-tight max-w-2xl">
            {project.title[language] ?? project.title.en}
          </h1>
        </motion.div>
      </div>

      {/* ── 4-col stat row ───────────────────────────────────────────────── */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 border-b border-border-light bg-surface-white"
        variants={staggerContainer}
        initial={shouldReduce ? {} : 'hidden'}
        whileInView={shouldReduce ? undefined : 'visible'}
        viewport={shouldReduce ? undefined : viewportOnce}
      >
        {stats.map(({ label, value, Icon }, idx) => (
          <motion.div
            key={label}
            variants={fadeUp}
            transition={{ delay: idx * 0.07 }}
            className={`py-8 px-8 border-r border-border-light last:border-r-0 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <Icon className="w-5 h-5 text-brand-red mb-3" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted mb-1">{label}</p>
            <p className="text-base font-bold text-ink-heading">{value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Description ──────────────────────────────────────────────────── */}
      <motion.div
        className="max-w-4xl mx-auto px-8 md:px-24 py-16"
        variants={fadeUp}
        initial={shouldReduce ? {} : 'hidden'}
        whileInView={shouldReduce ? undefined : 'visible'}
        viewport={shouldReduce ? undefined : viewportOnce}
      >
        <div className={`h-0.5 w-12 bg-brand-red mb-8 ${isRTL ? 'mr-0 ml-auto' : ''}`} />
        {project.description && (
          <p className={`text-lg text-ink-body leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
            {project.description[language] ?? project.description.en}
          </p>
        )}
        {project.scope && (
          <p className={`mt-6 text-sm font-semibold text-brand-red ${isRTL ? 'text-right' : 'text-left'}`}>
            {ui.scope}: {project.scope[language] ?? project.scope.en}
          </p>
        )}
      </motion.div>

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      {gallery.length > 0 && (
        <motion.div
          className="px-8 md:px-24 pb-20"
          variants={staggerContainer}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            {ui.gallery}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gallery.map((src, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                transition={{ delay: idx * 0.08 }}
                className="relative aspect-[4/3] overflow-hidden border border-border-light"
              >
                <Image
                  src={src}
                  alt={`${project.title[language] ?? project.title.en} — ${idx + 1}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── CTA strip ────────────────────────────────────────────────────── */}
      <div className="bg-ink-heading py-20 px-8 text-center">
        <p className="text-white/70 text-[11px] font-semibold uppercase tracking-[0.22em] mb-4">{ui.startLabel}</p>
        <h2 className="text-3xl md:text-4xl font-bold font-cairo text-white mb-8">{ui.startHeading}</h2>
        <a
          href={getWhatsAppURL({ page: 'project-detail', projectName: project.title.en })}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-deep text-white font-bold transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <span>{ui.cta}</span>
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </a>
      </div>

    </div>
  );
}
