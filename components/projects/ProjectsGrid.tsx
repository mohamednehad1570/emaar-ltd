'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams } from 'next/navigation';
import ProjectCard from './ProjectCard';
import { Funnel as Filter } from '@phosphor-icons/react';

// Mock data - In a real app, this would come from a CMS or API
const projectsData = [
    {
        id: 1,
        title: { en: 'Luxury Villa Complex', ar: 'مجمع فلل فاخر' },
        category: { en: 'Residential', ar: 'سكني' },
        location: { en: 'Palm Jumeirah, Dubai', ar: 'نخلة جميرا، دبي' },
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
        year: '2023',
        type: 'residential',
        material: 'upvc'
    },
    {
        id: 2,
        title: { en: 'Skyline Tower', ar: 'برج الأفق' },
        category: { en: 'Commercial', ar: 'تجاري' },
        location: { en: 'Downtown Dubai', ar: 'وسط مدينة دبي' },
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        year: '2022',
        type: 'commercial',
        material: 'aluminum'
    },
    {
        id: 3,
        title: { en: 'Modern Office Hub', ar: 'مركز مكاتب حديث' },
        category: { en: 'Commercial', ar: 'تجاري' },
        location: { en: 'Business Bay', ar: 'الخليج التجاري' },
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        year: '2023',
        type: 'commercial',
        material: 'aluminum'
    },
    {
        id: 4,
        title: { en: 'Seaside Resort', ar: 'منتجع ساحلي' },
        category: { en: 'Hospitality', ar: 'ضيافة' },
        location: { en: 'Saadiyat Island', ar: 'جزيرة السعديات' },
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        year: '2021',
        type: 'hospitality',
        material: 'upvc'
    },
    {
        id: 5,
        title: { en: 'Private Mansion', ar: 'قصر خاص' },
        category: { en: 'Residential', ar: 'سكني' },
        location: { en: 'Emirates Hills', ar: 'تلال الإمارات' },
        image: 'https://images.unsplash.com/photo-1600596542815-22b5c1275efb?w=800&q=80',
        year: '2022',
        type: 'residential',
        material: 'aluminum'
    },
    {
        id: 6,
        title: { en: 'Shopping Mall Facade', ar: 'واجهة مركز تسوق' },
        category: { en: 'Commercial', ar: 'تجاري' },
        location: { en: 'Yas Island', ar: 'جزيرة ياس' },
        image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3c9e?w=800&q=80',
        year: '2020',
        type: 'commercial',
        material: 'aluminum'
    }
];

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
        <section className="py-20 px-6 bg-gray-50 min-h-screen">
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
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                            {language === 'en'
                                ? 'Discover how we bring architectural visions to life with precision and elegance.'
                                : 'اكتشف كيف نحول الرؤى المعمارية إلى واقع بدقة وأناقة.'}
                        </p>
                    </motion.div>

                    {/* Filters Container */}
                    <div className="space-y-6">
                        {/* Sector Filters */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="w-full text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                {language === 'en' ? 'Filter by Sector' : 'تصفية حسب القطاع'}
                            </span>
                            {sectors.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSectorFilter(cat.id)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${sectorFilter === cat.id
                                        ? 'bg-brand-dark text-white shadow-md'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {cat.label[language]}
                                </button>
                            ))}
                        </div>

                        {/* Material Filters */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="w-full text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                {language === 'en' ? 'Filter by Material' : 'تصفية حسب المادة'}
                            </span>
                            {materials.map((mat) => (
                                <button
                                    key={mat.id}
                                    onClick={() => setMaterialFilter(mat.id)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${materialFilter === mat.id
                                        ? 'bg-brand-red text-white shadow-md'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
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
                    <div className="text-center py-20 text-gray-500">
                        {language === 'en' ? 'No projects found matching these filters.' : 'لا توجد مشاريع تطابق هذه معايير التصفية.'}
                    </div>
                )}

            </div>
        </section>
    );
}
