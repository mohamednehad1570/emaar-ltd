'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence , useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams } from 'next/navigation';
import ProjectCard from './ProjectCard';
import { Funnel as Filter } from '@phosphor-icons/react';
import { projectsData } from '@/lib/data/projects';

export default function ProjectsGrid() {
    const { language, isRTL } = useLanguage();
    const searchParams = useSearchParams();

    const [sectorFilter, setSectorFilter] = useState('all');
    const [materialFilter, setMaterialFilter] = useState('all');

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const materialParam = searchParams.get('material');

        if (categoryParam) setSectorFilter(categoryParam);
        if (materialParam) setMaterialFilter(materialParam);
    }, [searchParams]);

    const sectors = [
        { id: 'all', label: { en: 'All Sectors', ar: 'جميع القطاعات' } },
        { id: 'residential', label: { en: 'Residential', ar: 'سكني' } },
        { id: 'commercial', label: { en: 'Commercial', ar: 'تجاري' } },
        { id: 'hospitality', label: { en: 'Hospitality', ar: 'ضيافة' } }
    ];

    const materials = [
        { id: 'all', label: { en: 'All Materials', ar: 'جميع المواد' } },
        { id: 'upvc', label: { en: 'uPVC', ar: 'uPVC' } },
        { id: 'aluminum', label: { en: 'Aluminum', ar: 'ألومنيوم' } }
    ];

    const filteredProjects = projectsData.filter(p => {
        const sectorMatch = sectorFilter === 'all' || p.type === sectorFilter;
        const materialMatch = materialFilter === 'all' || p.material === materialFilter;
        return sectorMatch && materialMatch;
    });

    return (
        <section className="py-24 px-6 bg-off-white min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-brand-dark">
                            {language === 'en' ? 'Our Portfolio' : 'أعمالنا'}
                        </h1>
                        <p className="text-xl text-text-body max-w-2xl mx-auto mb-10">
                            {language === 'en'
                                ? 'Discover how we bring architectural visions to life with precision and elegance.'
                                : 'اكتشف كيف نحول الرؤى المعمارية إلى واقع بدقة وأناقة.'}
                        </p>
                    </motion.div>

                    {/* Filters Container */}
                    <div className="space-y-6">
                        {/* Sector Filters */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="w-full text-xs font-bold text-text-muted uppercase tracking-widest mb-2">
                                {language === 'en' ? 'Filter by Sector' : 'تصفية حسب القطاع'}
                            </span>
                            {sectors.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSectorFilter(cat.id)}
                                    className={`px-5 py-2 rounded-none text-sm font-medium transition-all duration-300 ${sectorFilter === cat.id
                                        ? 'bg-brand-dark text-white shadow-md'
                                        : 'bg-white text-text-body hover:bg-off-white border border-border-light'
                                        }`}
                                >
                                    {cat.label[language]}
                                </button>
                            ))}
                        </div>

                        {/* Material Filters */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="w-full text-xs font-bold text-text-muted uppercase tracking-widest mb-2">
                                {language === 'en' ? 'Filter by Material' : 'تصفية حسب المادة'}
                            </span>
                            {materials.map((mat) => (
                                <button
                                    key={mat.id}
                                    onClick={() => setMaterialFilter(mat.id)}
                                    className={`px-5 py-2 rounded-none text-sm font-medium transition-all duration-300 ${materialFilter === mat.id
                                        ? 'bg-brand-red text-white shadow-md'
                                        : 'bg-white text-text-body hover:bg-off-white border border-border-light'
                                        }`}
                                >
                                    {mat.label[language]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={{
                                    ...project,
                                    title: project.title[language],
                                    category: project.category[language],
                                    location: project.location[language]
                                }}
                                idx={project.id}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-text-muted">
                        {language === 'en' ? 'No projects found matching these filters.' : 'لا توجد مشاريع تطابق هذه معايير التصفية.'}
                    </div>
                )}

            </div>
        </section>
    );
}
