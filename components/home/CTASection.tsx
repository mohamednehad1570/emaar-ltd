'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Medal as Award, ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CTASection() {
    const { language, isRTL } = useLanguage();

    const content = {
        en: {
            title: 'Ready to Transform Your Space?',
            subtitle: 'Get expert consultation and a custom quote for your project',
            button: 'Contact Us Now',
        },
        ar: {
            title: 'هل أنت مستعد لتحويل مساحتك؟',
            subtitle: 'احصل على استشارة متخصصة وعرض سعر مخصص لمشروعك',
            button: 'اتصل بنا الآن',
        },
    };

    const t = content[language];

    return (
        <section className="py-24 px-6 bg-[#111111] relative overflow-hidden text-white">
            {/* Background patterns */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-transparent to-red-600 opacity-50" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600 rounded-full blur-[120px] opacity-10 animate-pulse" />

            <div className="relative max-w-4xl mx-auto text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-6 inline-block p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <Award className="w-12 h-12 text-brand-silver" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                        {t.title}
                    </h2>

                    <p className="text-xl md:text-2xl text-text-muted mb-10 max-w-2xl mx-auto font-light">
                        {t.subtitle}
                    </p>

                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg overflow-hidden shadow-lg shadow-red-900/30 hover:shadow-red-600/50 transition-all duration-300 hover:scale-105"
                    >
                        <span className="relative z-10">{t.button}</span>
                        <ArrowRight className={`relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
