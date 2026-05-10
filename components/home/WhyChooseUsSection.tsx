'use client';

/**
 * components/home/WhyChooseUsSection.tsx
 *
 * Four brand pillars on a full bg-brand-dark section.
 * No cards, no borders, no shadows — pillars float directly on the dark field.
 * 1px white/10 vertical dividers separate the pillars without boxing them.
 *
 * Design rules:
 *   • bg-brand-dark section uses text-white / text-white/70 (never text-brand-dark)
 *   • Icon rests at text-brand-silver; hover shifts it to text-brand-red
 *   • Heading stays white on hover — only the icon changes to signal interactivity
 *   • Dividers are hidden on mobile (stacked layout), shown md+ (row layout)
 *   • Pillar hover keeps heading white, per spec — body text brightens slightly
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Medal as Award, Users, Buildings as Building2, TrendUp as TrendingUp } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';

/* ── Types & data ──────────────────────────────────────────────────────── */

interface Pillar {
  Icon:        React.ComponentType<{ size?: number; className?: string }>;
  title:       string;
  description: string;
}

const content: Record<'en' | 'ar', { title: string; subtitle: string; pillars: Pillar[] }> = {
  en: {
    title:    'Why Choose EMAAR',
    subtitle: 'Excellence in every detail',
    pillars: [
      { Icon: Award,      title: 'Premium Quality',     description: 'ISO certified manufacturing with German technology and zero-compromise standards.' },
      { Icon: Users,      title: 'Expert Team',         description: '20+ years of combined industry experience across residential and commercial sectors.' },
      { Icon: Building2,  title: 'Proven Track Record', description: '500+ successful projects delivered across the UAE — on time, every time.'         },
      { Icon: TrendingUp, title: 'Innovation',          description: 'Continuously investing in the latest technology to keep your project ahead of the curve.' },
    ],
  },
  ar: {
    title:    'لماذا تختار إعمار',
    subtitle: 'التميز في كل التفاصيل',
    pillars: [
      { Icon: Award,      title: 'جودة ممتازة',   description: 'تصنيع معتمد ISO بتقنية ألمانية ومعايير لا تقبل التنازل.'              },
      { Icon: Users,      title: 'فريق خبراء',    description: 'أكثر من 20 عامًا من الخبرة الصناعية في القطاعين السكني والتجاري.'     },
      { Icon: Building2,  title: 'سجل حافل',      description: 'أكثر من 500 مشروع ناجح تم تسليمه في الإمارات — في الوقت المحدد دائمًا.' },
      { Icon: TrendingUp, title: 'الابتكار',       description: 'نستثمر باستمرار في أحدث التقنيات لإبقاء مشروعك في المقدمة.'           },
    ],
  },
};

/* ── Component ─────────────────────────────────────────────────────────── */

export default function WhyChooseUsSection() {
  const { language, isRTL } = useLanguage();
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
          className="mb-16 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2
            id="why-heading"
            className="text-4xl md:text-5xl font-bold font-cairo text-white mb-4"
          >
            {t.title}
          </h2>
          <div className="h-0.5 w-12 bg-brand-red mx-auto mb-5" />
          <p className="text-lg text-white/70 max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* ── Pillar row ───────────────────────────────────────────────── */}
        <motion.div
          /* On dark bg, border-white/10 dividers separate columns. The flex
             layout uses relative-positioned children for the dividers.        */
          className="flex flex-col md:flex-row"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {t.pillars.map((pillar, idx) => (
            <React.Fragment key={idx}>

              {/* ── Pillar ─────────────────────────────────────────────── */}
              <motion.div
                variants={fadeUp}
                transition={{ delay: idx * 0.1 }}
                className={`
                  flex-1 group
                  px-8 py-10 md:py-0
                  flex flex-col gap-4
                  ${isRTL ? 'items-end text-right' : 'items-start text-left'}
                `}
              >
                {/* Icon — text-brand-silver at rest, text-brand-red on hover */}
                <pillar.Icon
                  size={32}
                  className="text-brand-silver group-hover:text-brand-red transition-colors duration-300"
                  aria-hidden="true"
                />

                {/* Heading stays white — only the icon signals the hover */}
                <h3 className="text-lg font-bold text-white">
                  {pillar.title}
                </h3>

                {/* Body at white/70 at rest; white/90 on hover for subtle brightness */}
                <p className="text-sm text-white/70 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                  {pillar.description}
                </p>
              </motion.div>

              {/* ── Vertical divider between pillars (hidden on mobile) ── */}
              {idx < t.pillars.length - 1 && (
                <div
                  className="hidden md:block w-px bg-white/10 self-stretch mx-0"
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
