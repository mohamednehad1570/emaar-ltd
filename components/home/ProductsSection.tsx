'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import useHorizontalAutoscroll from '@/lib/hooks/useHorizontalAutoscroll';

interface ProductCard {
    id: number;
    title: { en: string; ar: string };
    category: { en: string; ar: string };
    image: string;
}

const products: ProductCard[] = [
    {
        id: 1,
        title: { en: 'uPVC Windows', ar: 'نوافذ يو بي في سي' },
        category: { en: 'Residential & Commercial', ar: 'سكني وتجاري' },
        image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&h=600&fit=crop',
    },
    {
        id: 2,
        title: { en: 'Sliding Systems', ar: 'أنظمة الانزلاق' },
        category: { en: 'Modern Solutions', ar: 'حلول عصرية' },
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
    },
    {
        id: 3,
        title: { en: 'Aluminum Doors', ar: 'أبواب الألومنيوم' },
        category: { en: 'Premium Quality', ar: 'جودة ممتازة' },
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    },
    {
        id: 4,
        title: { en: 'Curtain Walls', ar: 'الجدران الستائرية' },
        category: { en: 'Commercial Projects', ar: 'مشاريع تجارية' },
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    },
    {
        id: 5,
        title: { en: 'French Doors', ar: 'الأبواب الفرنسية' },
        category: { en: 'Elegant Design', ar: 'تصميم أنيق' },
        image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop',
    },
];


export default function ProductsSection() {
    const { language, isRTL } = useLanguage();
    const productsRef = useRef<HTMLDivElement>(null);
    const [productsPaused, setProductsPaused] = useState(false);

    useHorizontalAutoscroll(productsRef, productsPaused, 0.8);

    const content = {
        en: {
            title: 'Our Products',
            subtitle: 'Premium quality for every application',
            viewAll: 'Browse All Products',
        },
        ar: {
            title: 'منتجاتنا',
            subtitle: 'جودة ممتازة لكل تطبيق',
            viewAll: 'تصفح كل المنتجات',
        },
    };

    const t = content[language];

    return (
        <section className="py-20 px-6 bg-white relative" dir={isRTL ? 'rtl' : 'ltr'}>
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
                        <div className="h-1 w-24 bg-brand-red mx-auto mb-6" />
                        <p className="text-xl text-text-body max-w-2xl mx-auto">
                            {t.subtitle}
                        </p>
                    </motion.div>
                </div>

                <div
                    ref={productsRef}
                    onMouseEnter={() => setProductsPaused(true)}
                    onMouseLeave={() => setProductsPaused(false)}
                    onTouchStart={() => setProductsPaused(true)}
                    onTouchEnd={() => setTimeout(() => setProductsPaused(false), 700)}
                    className="mb-12 overflow-x-auto scrollbar-hide py-4"
                >
                    <div className={`flex gap-6 ${isRTL ? 'pl-6' : 'pr-6'}`}>
                        {products.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group min-w-[280px] sm:min-w-[320px] lg:min-w-[360px]"
                            >
                                {/* no shadow; image card → rounded-sm per design token */}
                                <div className="relative h-full bg-white rounded-sm overflow-hidden border border-border-light hover:border-2 hover:border-brand-silver transition-all duration-500">
                                    <div className="relative h-80 overflow-hidden">
                                        <Image
                                            src={product.image}
                                            alt={product.title[language]}
                                            fill
                                            sizes="(min-width: 1280px) 360px, (min-width: 1024px) 320px, 280px"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                                        <p className="text-sm mb-2 text-brand-red font-semibold uppercase tracking-wider">
                                            {product.category[language]}
                                        </p>
                                        <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-red-dark transition-colors">
                                            {product.title[language]}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/products/upvc"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-none bg-brand-dark text-white font-bold hover:bg-brand-red transition-colors"
                    >
                        {t.viewAll}
                        <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
