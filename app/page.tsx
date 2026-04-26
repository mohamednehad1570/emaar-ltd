'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ProductsSection from '@/components/home/ProductsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <HeroSection />
      <StatsSection />
      <ProductsSection />
      <ProjectsSection />
      <WhyChooseUsSection />
      <CTASection />

      {/* Global utility for hiding scrollbars if needed by sub-components */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}
