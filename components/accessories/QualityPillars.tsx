'use client';

import { Medal, Timer, ShieldCheck, Globe } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';

const PILLARS = [
  { Icon: Medal,       en: 'Premium Quality',  ar: 'جودة عالية' },
  { Icon: Timer,       en: 'Long Lasting',      ar: 'متانة طويلة الأمد' },
  { Icon: ShieldCheck, en: 'Secure Solutions',  ar: 'حلول آمنة' },
  { Icon: Globe,       en: 'Global Brands',     ar: 'علامات عالمية' },
] as const;

export default function QualityPillars() {
  const { language } = useLanguage();

  return (
    <div className="bg-white border-b border-border-light py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PILLARS.map(({ Icon, en, ar }) => (
            <div key={en} className="flex flex-col items-center gap-2">
              <Icon size={32} weight="duotone" color="#C0C6CA" />
              <span className="text-sm font-semibold text-ink-heading text-center">
                {language === 'ar' ? ar : en}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
