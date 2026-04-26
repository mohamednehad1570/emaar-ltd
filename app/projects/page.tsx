'use client';

import React, { Suspense } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import CTASection from '@/components/home/CTASection';

export default function ProjectsPage() {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <ProjectsGrid />
      </Suspense>
      <CTASection />

      {/* Global utility for hiding scrollbars if needed by sub-components */}
      <style jsx global>{`
        .container-custom {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1.5rem;
        }
      `}</style>
    </div>
  );
}
