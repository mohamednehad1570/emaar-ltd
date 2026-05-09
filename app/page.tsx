'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroSection           from '@/components/home/HeroSection';
import StatsSection          from '@/components/home/StatsSection';
import CertificationsSection from '@/components/home/CertificationsSection';
import ProductsSection       from '@/components/home/ProductsSection';
import SolutionsSection      from '@/components/home/SolutionsSection';
import ProjectsSection       from '@/components/home/ProjectsSection';
import WhyChooseUsSection    from '@/components/home/WhyChooseUsSection';
import TestimonialsSection   from '@/components/home/TestimonialsSection';
import CTASection            from '@/components/home/CTASection';

export default function HomePage() {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Trust credentials immediately after the hero numbers */}
      <HeroSection />
      <StatsSection />
      <CertificationsSection />

      {/* Products → segment by use-case → show portfolio */}
      <ProductsSection />
      <SolutionsSection />
      <ProjectsSection />

      {/* Argument → evidence → convert */}
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
