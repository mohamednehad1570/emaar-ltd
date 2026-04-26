'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SlideData {
    id: number;
    image: string;
    alt: string;
}

const heroSlides: SlideData[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&h=900&fit=crop',
        alt: 'Modern luxury home with uPVC windows',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop',
        alt: 'Contemporary building facade',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&h=900&fit=crop',
        alt: 'Elegant architectural design',
    },
];

export default function HeroSection() {
    const { language, isRTL } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    const content = {
        en: {
            title: 'Premium uPVC & Aluminum Solutions',
            subtitle: 'Crafting Excellence in Windows, Doors & Facades',
            cta: 'Request Quote',
            explore: 'Explore Products',
        },
        ar: {
            title: 'حلول يو بي في سي والألومنيوم المتميزة',
            subtitle: 'نصنع التميز في النوافذ والأبواب والواجهات',
            cta: 'اطلب عرض سعر',
            explore: 'استكشف المنتجات',
        },
    };

    const t = content[language];

    return (
        <section className="relative h-screen overflow-hidden bg-white">
            {/* Background Slider */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
                    />
                    {/* Industrial Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center px-4 md:px-12 container-custom">
                <div className={`max-w-4xl ${isRTL ? 'mr-0' : 'ml-0'}`}>
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                            {t.title}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-2xl border-l-4 border-red-600 pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-6">
                            {t.subtitle}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="/contact"
                            className="btn-primary flex items-center justify-center gap-2 group"
                        >
                            {t.cta}
                            <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                        </Link>
                        <Link
                            href="/products/upvc"
                            className="px-8 py-3 rounded-full font-semibold text-lg bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 transition-all hover:scale-105"
                        >
                            {t.explore}
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 right-10 z-20 flex gap-4">
                <button
                    onClick={prevSlide}
                    className="p-4 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/20 hover:bg-red-600 hover:border-red-600 transition-all group"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-4 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/20 hover:bg-red-600 hover:border-red-600 transition-all group"
                    aria-label="Next slide"
                >
                    <ChevronRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-10 left-10 z-20 flex gap-3">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-12 bg-red-600' : 'w-6 bg-white/50 hover:bg-white'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
