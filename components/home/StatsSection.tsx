'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function StatsSection() {
    const { language, isRTL } = useLanguage();

    const content = {
        en: [
            { number: '20+', label: 'Years Experience' },
            { number: '500+', label: 'Projects Completed' },
            { number: '50+', label: 'Expert Team' },
            { number: '100%', label: 'Client Satisfaction' },
        ],
        ar: [
            { number: '20+', label: 'سنة خبرة' },
            { number: '500+', label: 'مشروع مكتمل' },
            { number: '50+', label: 'فريق خبراء' },
            { number: '100%', label: 'رضا العملاء' },
        ],
    };

    const stats = content[language];

    return (
        <section className="py-20 bg-gradient-to-b from-off-white to-white relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Decorative Industrial Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50" />
            <div className="absolute -left-20 top-20 w-64 h-64 bg-cream rounded-full blur-3xl opacity-30" />
            <div className="absolute -right-20 bottom-20 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl opacity-30" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: idx * 0.1, duration: 0.6, type: 'spring' }}
                            className="group relative"
                        >
                            {/* no shadow at rest or hover; border-brand-silver at 2px on hover */}
                            <div className="absolute inset-0 bg-white rounded-sm transform transition-transform group-hover:-translate-y-2 duration-300" />
                            <div className="relative p-8 text-center border border-border-light rounded-sm group-hover:border-2 group-hover:border-brand-silver transition-all">
                                <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-brand-red to-brand-red-dark mb-2 font-cairo tabular-nums tracking-tighter">
                                    {stat.number}
                                </h3>
                                <p className="text-text-body font-medium text-lg uppercase tracking-wide">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
