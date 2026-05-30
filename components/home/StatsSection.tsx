'use client';

/**
 * components/home/StatsSection.tsx
 *
 * Four-column stat display on a clean white field.
 * No cards, borders, or shadows — raw numerals carry the authority.
 * A 2px brand-red top stroke above each stat grounds it to the grid.
 *
 * Interaction:
 *   Numbers count up from 0 to target on first viewport entry.
 *   Easing: cubic ease-out (fast start, decelerates to the final value).
 *   Reduced-motion: numbers jump immediately to their targets.
 *
 * Design rules:
 *   • tabular-nums keeps digit columns aligned as numbers animate in
 *   • uppercase + tracking-wide on labels: editorial, not technical
 *   • dir="ltr" on numerals preserves digit order in Arabic mode
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/* ── Data ──────────────────────────────────────────────────────────────── */

const content = {
  en: [
    { number: '20+',  label: 'Years Experience'    },
    { number: '500+', label: 'Projects Completed'  },
    { number: '50+',  label: 'Expert Team'         },
    { number: '100%', label: 'Client Satisfaction' },
  ],
  ar: [
    { number: '20+',  label: 'سنة خبرة'     },
    { number: '500+', label: 'مشروع مكتمل'   },
    { number: '50+',  label: 'فريق خبراء'    },
    { number: '100%', label: 'رضا العملاء'   },
  ],
} as const;

/* ── Count-up helpers ──────────────────────────────────────────────────── */

function parseStatNumber(str: string): { value: number; suffix: string } {
  const match = str.match(/^(\d+)([+%]?)$/);
  if (!match) return { value: 0, suffix: '' };
  return { value: parseInt(match[1]), suffix: match[2] };
}

interface StatCounterProps {
  raw:         string;
  inView:      boolean;
  shouldReduce: boolean | null;
}

function StatCounter({ raw, inView, shouldReduce }: StatCounterProps) {
  const { value, suffix } = parseStatNumber(raw);
  const [count, setCount] = useState(0);

  useEffect(() => {
    /* Reduced-motion: jump to final value immediately */
    if (shouldReduce === true) { setCount(value); return; }
    if (!inView) return;

    let animId: number;
    let startTime: number | null = null;
    const duration = 1600; /* ms — long enough to feel satisfying */

    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const t = Math.min((ts - startTime) / duration, 1);
      /* Cubic ease-out: decelerates into the final value */
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * value));
      if (t < 1) animId = requestAnimationFrame(step);
      else setCount(value);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [inView, shouldReduce, value]);

  /* dir=ltr keeps digit order correct when rendered inside an RTL container */
  return <span dir="ltr">{count}{suffix}</span>;
}

/* ── Component ─────────────────────────────────────────────────────────── */

export default function StatsSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const stats = content[language];
  const sectionRef = useRef<HTMLElement>(null);
  /* Fires once when 50% of the section is in view — triggers count-up */
  const inView = useInView(sectionRef, { once: true, amount: 0.5 });

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-label={language === 'en' ? 'Key statistics' : 'الإحصاءات الرئيسية'}
    >
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12"
          variants={staggerContainer}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="flex flex-col"
            >
              {/* 2px red stroke — grounds the stat, links back to brand accent */}
              <div className="w-8 h-0.5 bg-brand-red mb-5" aria-hidden="true" />

              {/* Numeral — count-up animates from 0; tabular-nums keeps '100%' same width as '500+' */}
              <span className="text-5xl font-extrabold font-cairo tabular-nums text-brand-dark leading-none mb-3">
                <StatCounter raw={stat.number} inView={inView} shouldReduce={shouldReduce} />
              </span>

              <span className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
