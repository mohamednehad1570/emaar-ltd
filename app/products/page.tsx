'use client';

/**
 * app/products/page.tsx
 *
 * Products index — two full-height editorial image cards side by side.
 * Each card is a dark-overlay tile linking to a material subcategory.
 *
 * Design rules:
 *   • bg-brand-dark/75 overlay — WCAG AA contrast for white text
 *   • Ghost button (border-white) fills white on hover — standard dark-bg CTA
 *   • 0px radius on images per --radius-image token
 *   • h-[60vh] on mobile cards, md:min-h-[80vh] on grid for desktop drama
 *   • RTL: arrow rotates 180°, flex-row-reverse on inline groups
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

/* ── Bilingual content ──────────────────────────────────────────────────── */

const content = {
  en: {
    eyebrow: 'Our Systems',
    title: 'Choose Your Material',
    subtitle: "World-class window and door systems engineered for the Gulf's climate and architectural standards.",
    cards: [
      {
        title: 'uPVC Systems',
        desc: 'Energy-efficient thermal profiles. German-engineered. Zero maintenance.',
        cta: 'Explore uPVC',
        href: '/products/upvc',
        image: 'https://images.unsplash.com/photo-1542385412-42e58a804825?w=1200&q=80',
        alt: 'uPVC window system',
      },
      {
        title: 'Aluminium Systems',
        desc: 'Structural-grade facades and curtain walls. Built for high-rise and commercial scale.',
        cta: 'Explore Aluminium',
        href: '/products/aluminum',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
        alt: 'Aluminium commercial facade',
      },
    ],
  },
  ar: {
    eyebrow: 'أنظمتنا',
    title: 'اختر المادة',
    subtitle: 'أنظمة نوافذ وأبواب عالمية المستوى مصممة لمناخ الخليج ومعايير العمارة فيه.',
    cards: [
      {
        title: 'أنظمة uPVC',
        desc: 'قطاعات حرارية موفرة للطاقة. هندسة ألمانية. صيانة صفرية.',
        cta: 'استكشف uPVC',
        href: '/products/upvc',
        image: 'https://images.unsplash.com/photo-1542385412-42e58a804825?w=1200&q=80',
        alt: 'نظام نوافذ uPVC',
      },
      {
        title: 'أنظمة الألومنيوم',
        desc: 'واجهات هيكلية وستائرية. مصممة للأبراج والمشاريع التجارية.',
        cta: 'استكشف الألومنيوم',
        href: '/products/aluminum',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
        alt: 'واجهة ألومنيوم تجارية',
      },
    ],
  },
} as const;

/* ── MaterialCard ───────────────────────────────────────────────────────── */

interface CardData {
  title: string;
  desc: string;
  cta: string;
  href: string;
  image: string;
  alt: string;
}

function MaterialCard({ title, desc, cta, href, image, alt, isRTL }: CardData & { isRTL: boolean }) {
  return (
    <motion.div variants={fadeUp} className="group relative h-[60vh] md:h-auto overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* bg-brand-dark/75 — ensures ≥ 4.5:1 contrast ratio for white text */}
      <div className="absolute inset-0 bg-brand-dark/75 group-hover:bg-brand-dark/65 transition-colors duration-500" />

      <div className={`absolute inset-0 flex flex-col justify-end p-10 md:p-14 ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
        {/* 2px red accent line — editorial brand signature */}
        <div className="h-0.5 w-12 bg-brand-red mb-6" />
        <h2 className="text-4xl md:text-5xl font-bold font-cairo text-white mb-4">{title}</h2>
        <p className="text-white/70 text-base mb-8 max-w-xs">{desc}</p>
        <Link
          href={href}
          className={`inline-flex items-center gap-2 px-6 py-3 border border-white text-white text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-brand-dark transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <span>{cta}</span>
          {/* Arrow rotates 180° in RTL — pointing toward reading-end edge */}
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function ProductsPage() {
  const { language, isRTL } = useLanguage();
  const t = content[language];

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Page heading ──────────────────────────────────────────────────── */}
      <motion.div
        className="py-20 text-center px-6"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red mb-4 block">
          {t.eyebrow}
        </span>
        <h1 className="text-5xl md:text-6xl font-bold font-cairo text-brand-dark mb-5">{t.title}</h1>
        <p className="text-lg text-text-body max-w-xl mx-auto">{t.subtitle}</p>
      </motion.div>

      {/* ── Two-column editorial split ─────────────────────────────────────── */}
      <motion.div
        className="grid md:grid-cols-2 md:min-h-[80vh]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {t.cards.map(card => (
          <MaterialCard key={card.href} {...card} isRTL={isRTL} />
        ))}
      </motion.div>

    </div>
  );
}
