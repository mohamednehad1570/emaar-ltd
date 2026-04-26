'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Building2, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function WhyChooseUsSection() {
    const { language } = useLanguage();

    const content = {
        en: {
            title: 'Why Choose EMAAR',
            subtitle: 'Excellence in every detail',
            features: [
                {
                    icon: Award,
                    title: 'Premium Quality',
                    description: 'ISO certified manufacturing with German technology',
                },
                {
                    icon: Users,
                    title: 'Expert Team',
                    description: '20+ years of combined industry experience',
                },
                {
                    icon: Building2,
                    title: 'Proven Track Record',
                    description: '500+ successful projects across the UAE',
                },
                {
                    icon: TrendingUp,
                    title: 'Innovation',
                    description: 'Latest technology and design solutions',
                },
            ],
        },
        ar: {
            title: 'لماذا تختار إعمار',
            subtitle: 'التميز في كل التفاصيل',
            features: [
                {
                    icon: Award,
                    title: 'جودة ممتازة',
                    description: 'تصنيع معتمد ISO بتقنية ألمانية',
                },
                {
                    icon: Users,
                    title: 'فريق خبراء',
                    description: 'أكثر من 20 عاماً من الخبرة الصناعية',
                },
                {
                    icon: Building2,
                    title: 'سجل حافل',
                    description: 'أكثر من 500 مشروع ناجح في الإمارات',
                },
                {
                    icon: TrendingUp,
                    title: 'الابتكار',
                    description: 'أحدث التقنيات وحلول التصميم',
                },
            ],
        },
    };

    const t = content[language];

    return (
        <section className="py-20 px-6 bg-white relative overflow-hidden">
            {/* Background Decorative */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-50 rounded-full blur-3xl opacity-30" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark font-mono tracking-tight">
                            {t.title}
                        </h2>
                        <div className="h-1 w-24 bg-red-600 mx-auto mb-6" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {t.subtitle}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-2xl bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-red-600 group-hover:to-red-700 transition-colors duration-300">
                                <feature.icon size={32} className="text-gray-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-brand-dark group-hover:text-red-700 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
