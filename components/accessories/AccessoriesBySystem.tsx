'use client';

import { CircleHalf, Cube } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';

const UPVC_ACCESSORIES = [
  { en: 'Door & Window Handles',           ar: 'مقابض الأبواب والنوافذ',              brand: 'Domus' },
  { en: 'Multi-Point Locking Systems',     ar: 'أنظمة قفل متعددة النقاط',             brand: 'Schüring' },
  { en: 'Window Hardware (Hinges, Stays)', ar: 'تجهيزات النوافذ (مفصلات، دعامات)',    brand: 'GIESSE / Roto' },
  { en: 'Sliding Rollers',                 ar: 'بكرات انزلاق',                         brand: 'TOP Italy' },
  { en: 'Fly Screens (Roll-Up & Pleated)', ar: 'شبك حماية (لفافي ومطوي)',              brand: 'ROLLi Italy' },
  { en: 'Door Closers',                    ar: 'ميكانيزمات إغلاق الأبواب',             brand: 'Dormakaba' },
  { en: 'Hinges',                          ar: 'مفصلات',                               brand: 'VDV' },
] as const;

const ALUMINUM_ACCESSORIES = [
  { en: 'Window & Door Hardware',          ar: 'تجهيزات النوافذ والأبواب',             brand: 'GIESSE / Roto' },
  { en: 'Security Locks & Cylinders',      ar: 'أقفال أمان وأسطوانات',                brand: 'Kale Kilit' },
  { en: 'Door Control Systems',            ar: 'أنظمة التحكم بالأبواب',               brand: 'STAC' },
  { en: 'Multi-Point Locking Systems',     ar: 'أنظمة قفل متعددة النقاط',             brand: 'Schüring' },
] as const;

export default function AccessoriesBySystem() {
  const { language, isRTL } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className="bg-white py-16" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-ink-heading mb-8">
          {isAr ? 'التجهيزات حسب النظام' : 'Accessories by System'}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* uPVC Hardware */}
          <div id="upvc-hardware">
            <div className="flex items-center gap-2 mb-6">
              <CircleHalf size={24} color="#8A9298" />
              <span className="text-lg font-semibold text-ink-heading">
                {isAr ? 'تجهيزات PVC' : 'uPVC Hardware'}
              </span>
            </div>
            <ul>
              {UPVC_ACCESSORIES.map((item) => (
                <li key={item.en} className="flex items-start justify-between py-3 border-b border-border-light last:border-b-0">
                  <span className="text-sm text-ink-body">{isAr ? item.ar : item.en}</span>
                  <span className="text-xs text-ink-muted bg-surface-cream px-2 py-0.5 shrink-0 ms-3">
                    {item.brand}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aluminum Hardware */}
          <div id="aluminum-hardware">
            <div className="flex items-center gap-2 mb-6">
              <Cube size={24} color="#8A9298" />
              <span className="text-lg font-semibold text-ink-heading">
                {isAr ? 'تجهيزات الألمنيوم' : 'Aluminum Hardware'}
              </span>
            </div>
            <ul>
              {ALUMINUM_ACCESSORIES.map((item) => (
                <li key={item.en} className="flex items-start justify-between py-3 border-b border-border-light last:border-b-0">
                  <span className="text-sm text-ink-body">{isAr ? item.ar : item.en}</span>
                  <span className="text-xs text-ink-muted bg-surface-cream px-2 py-0.5 shrink-0 ms-3">
                    {item.brand}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
