'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowsOut as Expand, ArrowRight } from '@phosphor-icons/react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface Project {
    id: number;
    title: string;
    category: string;
    location: string;
    image: string;
    year: string;
}

interface ProjectCardProps {
    project: Project;
    idx: number;
}

export default function ProjectCard({ project, idx }: ProjectCardProps) {
    const { isRTL } = useLanguage();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="group relative"
        >
            {/* image tile: rounded-sm; shadow-lg was cold rgba(0,0,0) — removed; border instead */}
            <div className="relative overflow-hidden rounded-sm aspect-[4/3] cursor-pointer border border-border-light hover:border-2 hover:border-brand-silver transition-all">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className={`flex items-start justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {/* badge: rounded-none per --radius-button */}
                            <span className="px-3 py-1 bg-brand-red text-xs font-bold uppercase tracking-wider rounded-none">
                                {project.category}
                            </span>
                            {/* hover-reveal expand icon: rounded-none (button rule) */}
                            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                <Expand className="w-4 h-4 text-white" />
                            </div>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-brand-red transition-colors duration-300">
                            {project.title}
                        </h3>

                        <div className={`flex items-center gap-2 text-gray-300 text-sm mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MapPin className="w-4 h-4 text-brand-red" />
                            <span>{project.location}</span>
                            <span className="mx-2 text-gray-500">•</span>
                            <span>{project.year}</span>
                        </div>

                        <div className={`h-0 overflow-hidden group-hover:h-auto transition-all duration-300 ease-in-out`}>
                            <a href="#" className={`inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-red transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <span>View Details</span>
                                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
