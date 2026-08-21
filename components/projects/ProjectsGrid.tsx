'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams } from 'next/navigation';
import ProjectCard from './ProjectCard';
import type { SanityProject } from '@/lib/sanity/types';
import type { DisplayProject } from '@/lib/types';

const typeLabels: Record<string, { en: string; ar: string }> = {
  residential: { en: 'Residential', ar: 'سكني' },
  commercial: { en: 'Commercial', ar: 'تجاري' },
  hospitality: { en: 'Hospitality', ar: 'ضيافة' },
};

interface Props {
  projects?: SanityProject[];
}

export default function ProjectsGrid({ projects = [] }: Props) {
  const { language, isRTL } = useLanguage();
  const searchParams = useSearchParams();
  const shouldReduce = useReducedMotion();

  const [sectorFilter, setSectorFilter] = useState('all');
  const [materialFilter, setMaterialFilter] = useState('all');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const materialParam = searchParams.get('material');
    if (categoryParam) setSectorFilter(categoryParam);
    if (materialParam) setMaterialFilter(materialParam);
  }, [searchParams]);

  // Normalise Sanity projects into the flat DisplayProject shape
  const displayProjects: DisplayProject[] = projects.map((p) => ({
    id:       p.slug,
    title:    p.title[language] ?? p.title.en,
    category: typeLabels[p.type]?.[language] ?? p.type,
    location: p.location?.[language] ?? p.location?.en ?? '',
    // coverImage is images[0].asset->url pre-resolved by the GROQ query
    image:    p.coverImage ?? p.images[0] ?? '',
    year:     String(p.year),
    type:     p.type,
    material: p.materialsUsed[0] ?? '',
  }));

  const sectors = [
    { id: 'all', label: { en: 'All Sectors', ar: 'جميع القطاعات' } },
    { id: 'residential', label: { en: 'Residential', ar: 'سكني' } },
    { id: 'commercial', label: { en: 'Commercial', ar: 'تجاري' } },
    { id: 'hospitality', label: { en: 'Hospitality', ar: 'ضيافة' } },
  ];

  const materials = [
    { id: 'all', label: { en: 'All Materials', ar: 'جميع المواد' } },
    { id: 'upvc', label: { en: 'uPVC', ar: 'uPVC' } },
    { id: 'aluminum', label: { en: 'Aluminum', ar: 'ألومنيوم' } },
  ];

  const filteredProjects = displayProjects.filter(p => {
    const sectorMatch = sectorFilter === 'all' || p.type === sectorFilter;
    const materialMatch = materialFilter === 'all' || p.material === materialFilter;
    return sectorMatch && materialMatch;
  });

  return (
    <section className="pt-32 pb-16 px-6 bg-off-white min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="font-extrabold text-ink-heading mb-6 tracking-[-0.02em] leading-[0.95] text-balance"
              style={{ fontSize: 'clamp(2.75rem, 5vw, 5rem)' }}
            >
              {language === 'en' ? 'Our Portfolio' : 'أعمالنا'}
            </h1>
            <p className="text-xl text-ink-body max-w-2xl mx-auto mb-10">
              {language === 'en'
                ? 'Projects across the UAE — from beachfront resorts to commercial towers, each delivered to specification.'
                : 'مشاريع في جميع أنحاء الإمارات — من المنتجعات الساحلية إلى الأبراج التجارية، كل منها وفق المواصفات.'}
            </p>
          </motion.div>

          <div className="space-y-6">
            <div className="flex flex-wrap justify-center gap-3">
              <span className="w-full text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">
                {language === 'en' ? 'Filter by Sector' : 'تصفية حسب القطاع'}
              </span>
              {sectors.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSectorFilter(cat.id)}
                  className={`px-5 py-2 min-h-[44px] rounded-none text-sm font-medium transition-colors duration-150 ${sectorFilter === cat.id
                    ? 'bg-ink-heading text-white'
                    : 'bg-surface-white text-ink-body hover:bg-surface-cream border border-border-light'
                  }`}
                >
                  {cat.label[language]}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="w-full text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">
                {language === 'en' ? 'Filter by Material' : 'تصفية حسب المادة'}
              </span>
              {materials.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => setMaterialFilter(mat.id)}
                  className={`px-5 py-2 min-h-[44px] rounded-none text-sm font-medium transition-colors duration-150 ${materialFilter === mat.id
                    ? 'bg-brand-red text-white'
                    : 'bg-surface-white text-ink-body hover:bg-surface-cream border border-border-light'
                  }`}
                >
                  {mat.label[language]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={String(project.id)} project={project} idx={project.id} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-ink-muted">
            {language === 'en' ? 'No projects found matching these filters.' : 'لا توجد مشاريع تطابق هذه معايير التصفية.'}
          </div>
        )}

      </div>
    </section>
  );
}
