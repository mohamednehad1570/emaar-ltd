'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/cn';
import { staggerContainer, fadeIn, slideInLeft, slideInRight, viewportOnce } from '@/lib/motion';
import type { SanityProject } from '@/lib/sanity/types';
import ProjectImagePanel from './ProjectImagePanel';
import ProjectInfoPanel from './ProjectInfoPanel';

interface Props { project: SanityProject }

const typeLabels: Record<string, { en: string; ar: string }> = {
  villas:    { en: 'Villas',             ar: 'فلل'   },
  buildings: { en: 'Buildings',          ar: 'مباني' },
  towers:    { en: 'High-Rise / Towers', ar: 'أبراج' },
};

export default function ProjectDetailPage({ project }: Props) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion() ?? false;

  const [selectedImage, setSelectedImage] = useState(project.images[0] ?? '');

  const primaryMaterial = project.materialsUsed[0] ?? '';
  const materialLabel   = primaryMaterial === 'upvc' ? 'uPVC' : (language === 'en' ? 'Aluminium' : 'ألومنيوم');
  const categoryLabel   = typeLabels[project.type]?.[language] ?? project.type;
  const altBase         = project.title[language] ?? project.title.en;

  const ui = language === 'en'
    ? { back: 'All Projects', gallery: 'Project Gallery' }
    : { back: 'جميع المشاريع', gallery: 'معرض المشروع' };

  return (
    <div className="bg-off-white min-h-screen pt-24 pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-brand-dark transition-colors duration-200 mb-8"
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{ui.back}</span>
        </Link>

        {/* Two-column grid */}
        <div className="md:grid md:grid-cols-[55%_1fr] md:gap-12 items-start">
          <motion.div
            variants={shouldReduce ? {} : slideInLeft}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
            <ProjectImagePanel
              images={project.images}
              selectedImage={selectedImage}
              onSelect={setSelectedImage}
              alt={altBase}
            />
          </motion.div>
          <motion.div
            variants={shouldReduce ? {} : slideInRight}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
            <ProjectInfoPanel
              project={project}
              language={language}
              isRTL={isRTL}
              materialLabel={materialLabel}
              categoryLabel={categoryLabel}
            />
          </motion.div>
        </div>

        {/* Gallery section */}
        {project.images.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border-light">
            <p className="text-xs uppercase tracking-[0.25em] text-text-muted mb-6">
              {ui.gallery}
            </p>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              variants={shouldReduce ? {} : staggerContainer}
              initial={shouldReduce ? {} : 'hidden'}
              whileInView={shouldReduce ? undefined : 'visible'}
              viewport={shouldReduce ? undefined : viewportOnce}
            >
              {project.images.map((src, idx) => (
                <motion.div
                  key={idx}
                  variants={shouldReduce ? {} : fadeIn}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border-light group"
                >
                  <Image
                    src={src}
                    alt={`${altBase} — ${idx + 1}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={cn(
                      'object-cover',
                      !shouldReduce && 'group-hover:scale-105 transition-transform duration-500'
                    )}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
}
