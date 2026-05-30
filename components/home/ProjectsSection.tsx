'use client';

/**
 * components/home/ProjectsSection.tsx
 *
 * 3-column project grid on bg-white.
 * Each card is image-led: 16/9 image above, title + meta below.
 * No overlay gradient — the photograph speaks on its own.
 *
 * Design rules:
 *   • 2px solid border at rest → brand-silver on hover (no shadow)
 *   • aspect-[16/9] on images: standard editorial ratio for architecture
 *   • Location and year are meta, rendered muted — they support the title
 *   • stagger 0.1s — 3 items, so total cascade is 0.2s max
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion , useReducedMotion } from 'framer-motion';
import { MapPin, ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/* ── Types & data ──────────────────────────────────────────────────────── */

interface ProjectCard {
  id:       number;
  title:    { en: string; ar: string };
  location: { en: string; ar: string };
  year:     string;
  image:    string;
}

const PROJECTS: ProjectCard[] = [
  {
    id:       1,
    title:    { en: 'Downtown Residences',   ar: 'مساكن وسط المدينة'      },
    location: { en: 'Dubai, UAE',            ar: 'دبي، الإمارات'           },
    year:     '2023',
    image:    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&h=506&fit=crop',
  },
  {
    id:       2,
    title:    { en: 'Marina Tower',          ar: 'برج المارينا'             },
    location: { en: 'Abu Dhabi, UAE',        ar: 'أبو ظبي، الإمارات'       },
    year:     '2023',
    image:    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&h=506&fit=crop',
  },
  {
    id:       3,
    title:    { en: 'Business Bay Complex',  ar: 'مجمع الخليج التجاري'     },
    location: { en: 'Dubai, UAE',            ar: 'دبي، الإمارات'           },
    year:     '2022',
    image:    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&h=506&fit=crop',
  },
];

const copy = {
  en: { title: 'Featured Projects', subtitle: 'Portfolio of precision', cta: 'View All Projects' },
  ar: { title: 'المشاريع المميزة',   subtitle: 'محفظة الدقة',           cta: 'عرض كل المشاريع'  },
} as const;

/* ── Component ─────────────────────────────────────────────────────────── */

export default function ProjectsSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = copy[language];

  return (
    <section
      className="py-24 bg-white"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-labelledby="projects-heading"
    >
      <div className="container-custom">

        {/* ── Section heading — left h2, CTA on the right ─────────────── */}
        <motion.div
          className={`mb-14 flex items-end justify-between gap-6 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}
          variants={fadeUp}
          initial={shouldReduce ? {} : "hidden"}
          whileInView={shouldReduce ? undefined : "visible"}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h2
              id="projects-heading"
              className="text-4xl md:text-5xl font-bold font-cairo text-brand-dark mb-2"
            >
              {t.title}
            </h2>
            <p className="text-lg text-text-muted">{t.subtitle}</p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark border-b-2 border-brand-red pb-0.5 hover:text-brand-red transition-colors duration-200 shrink-0"
          >
            {t.cta}
            <ArrowRight size={16} weight="bold" className={isRTL ? 'rotate-180' : ''} />
          </Link>
        </motion.div>

        {/* ── 3-column project grid ────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial={shouldReduce ? {} : "hidden"}
          whileInView={shouldReduce ? undefined : "visible"}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          {PROJECTS.map((project, idx) => (
            <motion.article
              key={project.id}
              variants={fadeUp}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group block border-2 border-border-light hover:border-brand-silver transition-colors duration-300"
                aria-label={project.title[language]}
              >
                {/* Image — aspect-[16/9], no overlay, rounded-none */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title[language]}
                    fill
                    /* 33vw at md+; full-width on mobile */
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                {/* Text block below image */}
                <div className="pt-4 pb-5 px-1">
                  <h3 className="text-base font-bold font-cairo text-brand-dark mb-1.5 leading-snug">
                    {project.title[language]}
                  </h3>

                  {/* Meta row — icon + location + year */}
                  <div
                    className={`flex items-center gap-1.5 text-sm text-text-muted ${
                      isRTL ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <MapPin size={13} className="text-brand-red shrink-0" aria-hidden="true" />
                    <span>{project.location[language]}</span>
                    <span aria-hidden="true">·</span>
                    {/* dir=ltr keeps the year digit order correct in RTL mode */}
                    <span dir="ltr">{project.year}</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
