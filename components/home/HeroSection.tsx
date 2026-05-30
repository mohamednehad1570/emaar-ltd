'use client';

/**
 * components/home/HeroSection.tsx
 *
 * Full-viewport homepage hero.
 *
 * Animation system — two independent layers:
 *
 *  1. Entry stagger (whileInView)
 *     Each text element fades up in sequence when it enters the viewport.
 *     Because the hero is always visible on page load, this triggers
 *     immediately and works as the classic "page-load reveal."
 *
 *  2. Scroll-driven exit (useScroll + useTransform)
 *     useScroll tracks how far the hero has scrolled off screen.
 *     Content opacity falls to 0 and floats 32 px upward over the
 *     first 55 % of the hero's scroll distance.
 *     The background image simultaneously zooms (Ken Burns extended).
 *
 *  3. Background slider
 *     Three architectural images crossfade via AnimatePresence.
 *     Each new slide starts slightly zoomed-in and eases to 1× (Ken Burns).
 *     Clicking a dot resets the 6-second auto-advance timer.
 *
 * Design rules (CLAUDE.md):
 *   • No blue — overlays use brand-dark tokens, never rgba(0,0,0,x)
 *   • Warm shadows: rgba(45,41,38,x)
 *   • Cairo font inherited from body (weight 800 loaded in layout)
 *   • RTL: overlay gradient, line origin, and arrow rotation all flip
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight, ArrowDown } from '@phosphor-icons/react';
import Image from 'next/image';
import Link  from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80',
    alt: 'Modern luxury residence with floor-to-ceiling uPVC windows',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80',
    alt: 'Contemporary aluminium-glazed commercial façade',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=1080&fit=crop&q=80',
    alt: 'Elegant residential architecture with clean sightlines',
  },
] as const;

/** Milliseconds per slide. */
const SLIDE_MS = 6_000;

// ─────────────────────────────────────────────────────────────────────────────
// Framer Motion variants
// ─────────────────────────────────────────────────────────────────────────────

/** Stagger container — cascades "show" to every child variant. */
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      /* delayChildren removed — dead time before first element moves felt like hesitation */
    },
  },
};

/** Standard content element — fades up. */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.70, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** Red accent line — scales in from the reading-start edge. */
const scaleLine = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  /**
   * Auto-advance timer.
   * The effect depends on activeSlide so that clicking a dot restarts
   * the interval, giving a full SLIDE_MS before the next auto-advance.
   */
  useEffect(() => {
    const id = setInterval(
      () => setActiveSlide(prev => (prev + 1) % SLIDES.length),
      SLIDE_MS,
    );
    return () => clearInterval(id);
  }, [activeSlide]);

  // ── Scroll-driven transforms ──────────────────────────────────────────────
  // scrollYProgress: 0 = hero top aligned with viewport, 1 = hero fully gone.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.55], [0, -32]);
  // Background zooms slowly as user scrolls — extends the per-slide Ken Burns.
  const bgScale        = useTransform(scrollYProgress, [0, 1],    [1, 1.08]);

  /** Bilingual string helper. */
  const l = (en: string, ar: string) => (language === 'en' ? en : ar);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-brand-dark"
      aria-label={l(
        'Hero — Emaar International Industry',
        'البانر الرئيسي — إعمار الدولية للصناعة',
      )}
    >

      {/* ══════════════════════════════════════════════════════════════════════
          BACKGROUND SLIDES
          Outer wrapper is 10 % larger than the section on all sides so the
          bgScale transform (up to 1.08×) never exposes a hard edge.
          overflow-hidden on <section> clips it cleanly.
      ══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute -inset-[5%]"
        style={{ scale: bgScale }}
        aria-hidden="true"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSlide}
            className="absolute inset-0"
            initial={shouldReduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          >
            <Image
              fill
              src={SLIDES[activeSlide].src}
              alt={SLIDES[activeSlide].alt}
              className="object-cover object-center"
              priority={activeSlide === 0}
              sizes="100vw"
              quality={85}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════════
          OVERLAY LAYERS
          Two independent gradients for independent axis control.
          Horizontal shoulder: keeps the text-side dark regardless of image.
          Vertical vignette:   lifts bottom-third contrast for indicators.
          All darks use brand-dark tokens — no pure black.
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Horizontal shoulder — direction flips for RTL */}
        <div
          className={`absolute inset-0 ${
            isRTL
              ? 'bg-gradient-to-l from-brand-dark/75 via-brand-dark/45 to-brand-dark/10'
              : 'bg-gradient-to-r from-brand-dark/75 via-brand-dark/45 to-brand-dark/10'
          }`}
        />
        {/* Vertical vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-brand-dark/20" />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          CONTENT — scroll-driven wrapper
          This motion.div carries the useTransform values (opacity / y).
          The inner stagger div handles the entry animation independently.
      ══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
            pt-20 — offsets the fixed 80 px header so the stacked content
            sits in the visual centre of the remaining viewport, not the
            geometric centre of the full h-screen section.
          */}
          <div className="pt-20">
            <motion.div
              className={`max-w-xl sm:max-w-2xl lg:max-w-3xl ${isRTL ? 'mr-0 ml-auto lg:ml-0' : ''}`}
              variants={staggerContainer}
              initial={shouldReduce ? {} : "hidden"}
              whileInView={shouldReduce ? undefined : "show"}
              viewport={{ once: true, amount: 0.2 }}
            >

              {/* ── Overline pill ───────────────────────────────────────
                   Glass morphism: white/10 bg + backdrop-blur + white/20
                   border. Red dot signals brand presence.               */}
              <motion.div variants={fadeUp} className="mb-5 lg:mb-7">
                <span className="
                  inline-flex items-center gap-2
                    px-4 py-1.5 rounded-none
                  border border-white/20
                  text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em]
                  text-white/70
                ">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0"
                    aria-hidden="true"
                  />
                  {l(
                    'Premium uPVC & Aluminium · UAE',
                    'حلول uPVC والألومنيوم المتميزة · الإمارات',
                  )}
                </span>
              </motion.div>

              {/* ── Headline ────────────────────────────────────────────
                   Cairo 800 (extrabold) — loaded in layout.tsx.
                   Two visual lines; period coloured brand-red for the
                   editorial / luxury typographic trick.
                   leading-[0.90] tightens the large display size.      */}
              <motion.h1
                variants={fadeUp}
                className="
                  text-[2.75rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]
                  font-extrabold leading-[0.90] tracking-tight text-white text-balance
                  mb-5 lg:mb-6
                "
              >
                {language === 'en' ? (
                  <>
                    Windows, Doors
                    <br />
                    <span className="text-white/85">&amp;&nbsp;Facades</span>
                    <span className="text-brand-red" aria-hidden="true">.</span>
                  </>
                ) : (
                  <>
                    نوافذ وأبواب
                    <br />
                    <span className="text-white/85">وواجهات</span>
                    <span className="text-brand-red" aria-hidden="true">.</span>
                  </>
                )}
              </motion.h1>

              {/* ── Red accent line ──────────────────────────────────────
                   Scales in from the reading-start edge via scaleLine
                   variant. origin-left in LTR, origin-right in RTL.    */}
              <motion.div
                variants={scaleLine}
                className={`w-14 h-0.5 bg-brand-red mb-5 lg:mb-6 ${
                  isRTL ? 'origin-right' : 'origin-left'
                }`}
              />

              {/* ── Subtitle ────────────────────────────────────────────
                   font-light creates optical contrast with the extrabold
                   headline — luxury rhythm through weight disparity.    */}
              <motion.p
                variants={fadeUp}
                className="
                  text-base sm:text-lg text-white/58 font-light leading-relaxed
                  max-w-lg mb-8 lg:mb-10
                "
              >
                {l(
                  'Engineering-grade fenestration systems trusted by leading developers and contractors across the Emirates.',
                  'أنظمة هندسية موثوق بها من كبار المطورين والمقاولين في الإمارات العربية المتحدة.',
                )}
              </motion.p>

              {/* ── CTAs ────────────────────────────────────────────────
                   Primary: red solid pill — warm shadow, scales on hover.
                   Secondary: ghost pill — glass bg, subtle border.      */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row items-start gap-3 mb-10 lg:mb-12"
              >
                {/* Primary — solid red */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/contact"
                    className="
                      inline-flex items-center gap-2
                      px-7 py-3.5 rounded-none
                      text-sm font-bold text-white
                      bg-brand-red hover:bg-brand-red-dark
                      shadow-[0_4px_15px_rgba(231,76,60,0.20)]
                      hover:shadow-[0_8px_32px_rgba(231,76,60,0.40)]
                      transition-all duration-200
                    "
                  >
                    {l('Request a Quote', 'اطلب عرض سعر')}
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className={isRTL ? 'rotate-180' : ''}
                    />
                  </Link>
                </motion.div>

                {/* Secondary — ghost */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/products/upvc"
                    className="
                      inline-flex items-center gap-2
                      px-7 py-3.5 rounded-none
                      text-sm font-semibold text-white
                      bg-white/10 hover:bg-white/[0.17]
                      border border-white/25 hover:border-white/45
                      backdrop-blur-sm
                      transition-all duration-200
                    "
                  >
                    {l('Explore Products', 'استكشف المنتجات')}
                  </Link>
                </motion.div>
              </motion.div>

              {/* ── Trust stats strip ───────────────────────────────────
                   Four micro-metrics separated by hairline dividers.
                   white/42 keeps them legible but firmly subordinate.  */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-x-4 gap-y-2"
                aria-label={l('Trust indicators', 'مؤشرات الثقة')}
              >
                {[
                  l('500+ Projects',  '500+ مشروع'),
                  l('15+ Years',      '+15 عامًا'),
                  l('ISO Certified',  'معتمد ISO'),
                  l('Made in UAE',    'صُنع في الإمارات'),
                ].map((stat, i, arr) => (
                  <React.Fragment key={stat}>
                    <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-white/42">
                      {stat}
                    </span>
                    {i < arr.length - 1 && (
                      <span className="w-px h-3 bg-white/20 shrink-0" aria-hidden="true" />
                    )}
                  </React.Fragment>
                ))}
              </motion.div>

            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════════════
          SLIDE PROGRESS INDICATORS
          Each indicator is a thin pill. The active pill widens to 32 px and
          shows a brand-red fill that animates linearly over SLIDE_MS then
          resets when the key changes (new slide → new AnimatePresence cycle).
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label={l('Slide navigation', 'التنقل بين الشرائح')}
      >
        {SLIDES.map((slide, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeSlide}
            aria-label={l(`Slide ${i + 1}`, `الشريحة ${i + 1}`)}
            onClick={() => setActiveSlide(i)}
            /* Width transitions smoothly between 8 px (inactive) and 32 px (active) */
            className="relative h-[3px] rounded-full overflow-hidden transition-[width] duration-300"
            style={{ width: i === activeSlide ? '2rem' : '0.5rem' }}
          >
            {/* Track — always present */}
            <span className="absolute inset-0 rounded-full bg-white/25" />
            {/* Fill — mounted only on the active slide */}
            {i === activeSlide && (
              <motion.span
                key={`fill-${activeSlide}`} /* key change restarts the animation */
                className="absolute inset-0 rounded-full bg-brand-red origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SCROLL-DOWN ARROW
          Bounces gently on a 2.4 s loop. White/30 keeps it subtle so it
          never competes with the CTAs but is discoverable on first view.
      ══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-7 right-6 sm:bottom-8 sm:right-8 z-20 flex flex-col items-center gap-1.5"
        aria-hidden="true"
        animate={shouldReduce ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      >
        <span className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-white/28 font-semibold select-none">
          {l('Scroll', 'اسحب')}
        </span>
        <ArrowDown size={14} className="text-white/28" />
      </motion.div>

    </section>
  );
}
