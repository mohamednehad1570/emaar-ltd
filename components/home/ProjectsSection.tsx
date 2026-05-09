'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import useHorizontalAutoscroll from '@/lib/hooks/useHorizontalAutoscroll';

interface ProjectCard {
    id: number;
    title: { en: string; ar: string };
    location: { en: string; ar: string };
    image: string;
}

const projects: ProjectCard[] = [
    {
        id: 1,
        title: { en: 'Downtown Residences', ar: 'مساكن وسط المدينة' },
        location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=1000&fit=crop',
    },
    {
        id: 2,
        title: { en: 'Marina Tower', ar: 'برج المارينا' },
        location: { en: 'Abu Dhabi, UAE', ar: 'أبو ظبي، الإمارات' },
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    },
    {
        id: 3,
        title: { en: 'Palm Villas', ar: 'فلل النخلة' },
        location: { en: 'Sharjah, UAE', ar: 'الشارقة، الإمارات' },
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=1200&fit=crop',
    },
    {
        id: 4,
        title: { en: 'Business Bay Complex', ar: 'مجمع الخليج التجاري' },
        location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    },
    {
        id: 5,
        title: { en: 'Waterfront Estate', ar: 'عقار الواجهة البحرية' },
        location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&h=600&fit=crop',
    },
];


export default function ProjectsSection() {
    const { language, isRTL } = useLanguage();
    const projectsRef = useRef<HTMLDivElement>(null);
    const [projectsPaused, setProjectsPaused] = useState(false);

    useHorizontalAutoscroll(projectsRef, projectsPaused, 0.8);

    const content = {
        en: {
            title: 'Featured Projects',
            subtitle: 'Discover our portfolio of excellence',
            viewAll: 'View All Projects',
        },
        ar: {
            title: 'المشاريع المميزة',
            subtitle: 'اكتشف محفظتنا من التميز',
            viewAll: 'عرض كل المشاريع',
        },
    };

    const t = content[language];

    return (
        <section className="py-20 px-6 bg-off-white relative" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="container-custom">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark font-cairo tracking-tight">
                            {t.title}
                        </h2>
                        <div className="h-1 w-24 bg-red-600 mx-auto mb-6" />
                        <p className="text-xl text-text-body max-w-2xl mx-auto">
                            {t.subtitle}
                        </p>
                    </motion.div>
                </div>

                <div
                    ref={projectsRef}
                    onMouseEnter={() => setProjectsPaused(true)}
                    onMouseLeave={() => setProjectsPaused(false)}
                    onTouchStart={() => setProjectsPaused(true)}
                    onTouchEnd={() => setTimeout(() => setProjectsPaused(false), 700)}
                    className="mb-12 overflow-x-auto scrollbar-hide py-4"
                >
                    <div className={`flex gap-6 ${isRTL ? 'pl-6' : 'pr-6'}`}>
                        {projects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group min-w-[300px] sm:min-w-[350px] lg:min-w-[400px]"
                            >
                                <div className="relative h-[400px] bg-white rounded-xl overflow-hidden shadow-warm-lg border border-border-light transition-all duration-500 hover:shadow-warm-lg hover:border-red-100">
                                    <Image
                                        src={project.image}
                                        alt={project.title[language]}
                                        fill
                                        sizes="(min-width: 1280px) 400px, (min-width: 1024px) 350px, 300px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                    <div className={`absolute bottom-0 w-full p-6 text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                                            {project.title[language]}
                                        </h3>
                                        <div className={`flex items-center gap-2 text-dim ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            <span className="text-sm font-medium tracking-wide">
                                                {project.location[language]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all font-semibold shadow-warm-lg hover:shadow-xl"
                    >
                        {t.viewAll}
                        <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
