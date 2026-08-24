'use client';

import React from 'react';
import Link from 'next/link';
import { motion , useReducedMotion } from 'framer-motion';
import { MapPin, ArrowsOut as Expand, ArrowRight } from '@phosphor-icons/react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeUp, viewportOnce } from '@/lib/motion';
import type { DisplayProject } from '@/lib/types';

interface ProjectCardProps {
    project: DisplayProject;
    idx: number | string;
}

export default function ProjectCard({ project, idx }: ProjectCardProps) {
    const { isRTL } = useLanguage();
    const shouldReduce = useReducedMotion();

    return (
        <motion.div
            layout
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
            exit={shouldReduce ? {} : { opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
            whileHover={shouldReduce ? undefined : { scale: 1.01, transition: { duration: 0.3 } }}
            className="group relative"
        >
            {/* Link wraps the entire tile — nested <a> inside removed to keep valid HTML */}
            <Link href={`/projects/${project.id}`} className="block">
            {/* image tile: rounded-sm; shadow-lg was cold rgba(0,0,0) — removed; border instead */}
            <div className="relative overflow-hidden rounded-sm aspect-[4/3] cursor-pointer border-2 border-transparent hover:border-brand-silver transition-all">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                {/* Warm overlay — brand-dark instead of cold black */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    {/* Content within the card fades up after card itself — no delay needed since parent cascades */}
                    <motion.div
                        variants={fadeUp}
                    >
                        <div className={`flex items-start justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {/* badge: rounded-none per --radius-button */}
                            <span className="px-3 py-1 bg-brand-red text-xs font-bold uppercase tracking-wider rounded-none">
                                {project.category}
                            </span>
                            {/* hover-reveal expand icon: rounded-none (button rule) */}
                            <div className="bg-white/25 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                <Expand className="w-4 h-4 text-white" />
                            </div>
                        </div>

                        {/* White throughout — brand-red on near-black overlay fails 3:1 contrast */}
                        <h3 className="text-xl md:text-2xl font-bold mb-1 text-white">
                            {project.title}
                        </h3>

                        <div className={`flex items-center gap-2 text-dim text-sm mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MapPin className="w-4 h-4 text-brand-red" />
                            <span>{project.location}</span>
                            {project.year && (
                                <>
                                    <span className="mx-2 text-text-muted">•</span>
                                    <span>{project.year}</span>
                                </>
                            )}
                        </div>

                        {/* opacity+translate reveal — CSS cannot transition height:auto */}
                        <div className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                            <span className={`inline-flex items-center gap-2 text-sm font-semibold text-white ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <span>{isRTL ? 'عرض التفاصيل' : 'View Details'}</span>
                                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
            </Link>
        </motion.div>
    );
}
