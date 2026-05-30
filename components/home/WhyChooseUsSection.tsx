'use client';

/**
 * components/home/WhyChooseUsSection.tsx
 *
 * Three evidence-backed differentiators on a dark field.
 * Each claim is specific and sourced from the production data in
 * lib/data/whyChooseUs.ts — none of the four generic pillars
 * (Quality, Team, Track Record, Innovation) appear here.
 *
 * Layout: 3-column on desktop, stacked with hairline separators on mobile.
 * Vertical dividers: 1px white/10, hidden on mobile.
 * Ghost numbers: white/[0.07] — structural depth marker, not navigational label.
 */

import React from 'react';
import { motion , useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/* ── Types & data ──────────────────────────────────────────────────────── */

interface Differentiator {
  number: string;
  label:  string;
  title:  string;
  body:   string;
}

const content: Record<'en' | 'ar', { heading: string; sub: string; items: Differentiator[] }> = {
  en: {
    heading: 'Why Emaar',
    sub:     'Three facts that matter to your procurement decision.',
    items: [
      {
        number: '01',
        label:  'Precision Manufacturing',
        title:  '±0.5 mm Tolerance',
        /* em dash removed per copy rules; comma used instead */
        body:   'Profile cutting held to ±0.5 mm, welded with German corner-welding technology. Every unit is operation-tested before leaving the floor, not batch-sampled.',
      },
      {
        number: '02',
        label:  'Product Warranty',
        title:  '10-Year Coverage',
        body:   'A 10-year warranty across all product lines. The UAE industry average is 2 to 5 years. We stand behind the difference because our factory controls the full production chain.',
      },
      {
        number: '03',
        label:  'UAE Manufacturing',
        title:  '15,000 m² On-Site',
        body:   'A single 15,000 m² climate-controlled facility in the UAE covers extrusion, cutting, welding, glazing, and final QA. No outsourced assembly, no imported completed units.',
      },
    ],
  },
  ar: {
    heading: 'لماذا إعمار',
    sub:     'ثلاث حقائق تؤثر في قرار المشتريات.',
    items: [
      {
        number: '01',
        label:  'دقة التصنيع',
        title:  'تفاوت ±0.5 ملم',
        /* em dash removed; Arabic comma used instead */
        body:   'قطع الملفات بتفاوت ±0.5 ملم، ولحام بتقنية ألمانية. كل وحدة تخضع لاختبار التشغيل قبل مغادرة خط الإنتاج، لا عينات دفعات فحسب.',
      },
      {
        number: '02',
        label:  'ضمان المنتج',
        title:  'تغطية 10 سنوات',
        body:   'ضمان 10 سنوات على جميع خطوط المنتجات. متوسط الصناعة في الإمارات 2 إلى 5 سنوات. نقف خلف الفرق لأن مصنعنا يتحكم في سلسلة الإنتاج الكاملة.',
      },
      {
        number: '03',
        label:  'تصنيع إماراتي',
        title:  '15,000 م² في موقع واحد',
        body:   'منشأة واحدة مكيفة الهواء بمساحة 15,000 م² في الإمارات تغطي البثق والقطع واللحام والتزجيج وضمان الجودة النهائي. لا تجميع خارجي، لا وحدات مكتملة مستوردة.',
      },
    ],
  },
};

/* ── Component ─────────────────────────────────────────────────────────── */

export default function WhyChooseUsSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = content[language];

  return (
    <section
      className="py-24 bg-brand-dark"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-labelledby="why-heading"
    >
      <div className="container-custom">

        {/* ── Section heading ──────────────────────────────────────────── */}
        <motion.div
          className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}
          variants={fadeUp}
          initial={shouldReduce ? {} : "hidden"}
          whileInView={shouldReduce ? undefined : "visible"}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          <h2
            id="why-heading"
            className="text-4xl md:text-5xl font-bold font-cairo text-white mb-3"
          >
            {t.heading}
          </h2>
          {/* text-white/55 for contrast margin above WCAG AA (50% = exactly 4.5:1, borderline) */}
          <p className="text-base text-white/55 max-w-sm text-pretty">{t.sub}</p>
        </motion.div>

        {/* ── Differentiator columns ──────────────────────────────────── */}
        <motion.div
          className="flex flex-col md:flex-row"
          variants={staggerContainer}
          initial={shouldReduce ? {} : "hidden"}
          whileInView={shouldReduce ? undefined : "visible"}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          {t.items.map((item, idx) => (
            <React.Fragment key={idx}>

              {/* ── Column ─────────────────────────────────────────────── */}
              <motion.div
                variants={fadeUp}
                className={`
                  flex-1 px-8 py-10 md:py-0
                  flex flex-col
                  ${isRTL ? 'items-end text-right' : 'items-start text-left'}
                  ${idx < t.items.length - 1 ? 'border-b border-white/[0.08] pb-10 mb-0 md:border-b-0 md:pb-0' : ''}
                `}
              >
                {/* Ghost number — 7% white; structural depth only, not a navigation label */}
                <span
                  className="text-7xl font-extrabold tabular-nums text-white/[0.07] leading-none mb-6 select-none"
                  aria-hidden="true"
                  dir="ltr"
                >
                  {item.number}
                </span>

                {/* Label — 11px per DESIGN.md label spec (0.6875rem); short uppercase identifier */}
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red mb-3">
                  {item.label}
                </p>

                {/* Title — specific measurable claim; text-balance prevents awkward wrapping */}
                <h3 className="text-xl font-bold text-white mb-4 leading-[1.3] text-balance">
                  {item.title}
                </h3>

                {/* Body — evidence; text-pretty reduces orphaned last words */}
                <p className="text-sm text-white/60 leading-relaxed text-pretty">
                  {item.body}
                </p>
              </motion.div>

              {/* Vertical divider — desktop only; mobile uses border-b above */}
              {idx < t.items.length - 1 && (
                <div
                  className="hidden md:block w-px bg-white/10 self-stretch"
                  aria-hidden="true"
                />
              )}

            </React.Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
