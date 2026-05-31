'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MapPin } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Project } from '@/lib/data/projects';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

interface Props {
  projects: Project[];
  sectionTitle: string;
}

export default function SolutionProjectsSection({ projects, sectionTitle }: Props) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();

  if (!projects.length) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-10 ${isRTL ? 'text-right' : ''}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">{sectionTitle}</h2>
          <div className="h-0.5 w-10 bg-brand-red" />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-2 gap-6"
        >
          {projects.slice(0, 4).map((proj) => (
            <motion.div key={proj.id} variants={fadeUp}>
              <Link href={`/projects/${proj.id}`} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden bg-brand-dark">
                  <Image
                    src={proj.image}
                    alt={proj.title[language]}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className={`text-white font-bold text-lg mb-1 ${isRTL ? 'text-right' : ''}`}>
                      {proj.title[language]}
                    </p>
                    <span className={`inline-flex items-center gap-1.5 text-white/70 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-brand-red" aria-hidden="true" />
                      {proj.location[language]}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
