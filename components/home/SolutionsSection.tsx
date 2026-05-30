'use client';

/**
 * components/home/SolutionsSection.tsx
 *
 * Two full-bleed image cards that segment the visitor by project type.
 * Residential badge: brand-red tint — warm, home-centric.
 * Commercial badge:  brand-silver tint — industrial, professional.
 * The bg-gradient-to-t overlay keeps text legible on any image.
 * RTL: dir on section, badge/content align to reading-start edge,
 *      ArrowRight rotates 180° so it points in the correct direction.
 */

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { residentialData, commercialData } from '@/lib/data/solutions';
import { fadeUp, viewportOnce } from '@/lib/motion';

/* Reuse images already loaded elsewhere in the site (cache-friendly) */
const RESIDENTIAL_IMG =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&q=80';
const COMMERCIAL_IMG =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80';

export default function SolutionsSection() {
  const { language, isRTL } = useLanguage();
  const residential = residentialData[language];
  const commercial  = commercialData[language];

  return (
    <section
      className="py-20 px-6 bg-off-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container-custom">

        {/* ── Two-card grid — section introduces itself through the images ── */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Residential card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="group relative overflow-hidden rounded-sm h-[420px]"
          >
            <Image
              src={RESIDENTIAL_IMG}
              alt="Residential windows and doors — Palm Villas project"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay keeps text legible on any image */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/30 to-transparent" />

            <div className={`absolute inset-0 p-8 flex flex-col justify-between ${isRTL ? 'items-end' : 'items-start'}`}>
              {/* Residential badge — brand-red tint; rounded-none per --radius-button badge rule */}
              <span className="px-3 py-1.5 rounded-none text-xs font-bold uppercase tracking-[0.14em] bg-brand-red/20 border border-brand-red/50 text-brand-red">
                {residential.hero.subtitle}
              </span>

              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h3 className="text-2xl md:text-3xl font-bold font-cairo text-white mb-2">
                  {residential.hero.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
                  {residential.hero.description}
                </p>
                <Link
                  href="/solutions/residential"
                  className="inline-flex items-center gap-2 text-white font-semibold hover:text-brand-red transition-colors duration-200"
                >
                  {residential.cta.button}
                  {/* Arrow rotates 180° in RTL — points left instead of right */}
                  <ArrowRight size={18} weight="bold" className={isRTL ? 'rotate-180' : ''} />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Commercial card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            /* Slight delay so cards enter in sequence, not simultaneously */
            transition={{ delay: 0.1 }}
            className="group relative overflow-hidden rounded-sm h-[420px]"
          >
            <Image
              src={COMMERCIAL_IMG}
              alt="Commercial facade systems — Skyline Tower project"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/30 to-transparent" />

            <div className={`absolute inset-0 p-8 flex flex-col justify-between ${isRTL ? 'items-end' : 'items-start'}`}>
              {/* Commercial badge — brand-silver tint; rounded-none per badge rule */}
              <span className="px-3 py-1.5 rounded-none text-xs font-bold uppercase tracking-[0.14em] bg-brand-silver/20 border border-brand-silver/50 text-brand-silver">
                {commercial.hero.subtitle}
              </span>

              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h3 className="text-2xl md:text-3xl font-bold font-cairo text-white mb-2">
                  {commercial.hero.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
                  {commercial.hero.description}
                </p>
                <Link
                  href="/solutions/commercial"
                  className="inline-flex items-center gap-2 text-white font-semibold hover:text-brand-silver transition-colors duration-200"
                >
                  {commercial.cta.button}
                  <ArrowRight size={18} weight="bold" className={isRTL ? 'rotate-180' : ''} />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
