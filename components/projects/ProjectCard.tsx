'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin } from '@phosphor-icons/react';
import ImageSlot from '@/components/ui/ImageSlot';
import { fadeUp, viewportOnce } from '@/lib/motion';
import type { DisplayProject } from '@/lib/types';

interface ProjectCardProps {
    project: DisplayProject;
}

// Non-navigating tile — per-project detail pages don't exist yet, so there is
// no link wrapper, no cursor-pointer and no lift; only the image breathes on hover.
export default function ProjectCard({ project }: ProjectCardProps) {
    const shouldReduce = useReducedMotion();

    return (
        <motion.article
            layout
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
            exit={shouldReduce ? {} : { opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
            className="group relative"
        >
            {/* ── Image tile ──────────────────────────────────────── */}
            <div className="relative overflow-hidden rounded-sm aspect-video">
                {/* 16:9 per project image spec; scale(1.02) is the only hover response */}
                <ImageSlot
                    src={project.image}
                    alt={project.title}
                    ratio="16/9"
                    className="absolute inset-0 rounded-none transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Warm overlay — brand-dark instead of cold black */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent opacity-80" />

                {/* ── Caption ─────────────────────────────────────── */}
                {/* No flex-row-reverse: the grid's dir attribute already mirrors flex rows in RTL */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <motion.div variants={fadeUp}>
                        <span className="inline-block mb-2 px-3 py-1 bg-brand-red text-xs font-bold uppercase tracking-wider rounded-none">
                            {project.category}
                        </span>

                        {/* White throughout — brand-red on near-black overlay fails 3:1 contrast */}
                        <h3 className="text-xl md:text-2xl font-bold mb-1 text-white">
                            {project.title}
                        </h3>

                        <div className="flex items-center gap-2 text-dim text-sm">
                            <MapPin className="w-4 h-4 text-brand-red" />
                            <span>{project.location}</span>
                            {project.year && (
                                <>
                                    <span className="mx-2 text-text-muted">•</span>
                                    {/* dir=ltr keeps the year's digit order inside RTL text */}
                                    <span dir="ltr">{project.year}</span>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.article>
    );
}
