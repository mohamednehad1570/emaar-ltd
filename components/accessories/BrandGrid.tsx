'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const BRANDS = [
  { name: 'Domus',    country: 'Greece',  countryAr: 'اليونان',  category: 'Door Handles',               categoryAr: 'مقابض الأبواب',                 flag: '🇬🇷' },
  { name: 'GIESSE',   country: 'Italy',   countryAr: 'إيطاليا',  category: 'Window & Door Hardware',      categoryAr: 'تجهيزات النوافذ والأبواب',       flag: '🇮🇹' },
  { name: 'Kale Kilit', country: 'Turkey', countryAr: 'تركيا',   category: 'Security Locks & Cylinders',  categoryAr: 'أقفال أمان وأسطوانات',           flag: '🇹🇷' },
  { name: 'Roto',     country: 'Germany', countryAr: 'ألمانيا',  category: 'Window & Door Technology',    categoryAr: 'تقنيات النوافذ والأبواب',        flag: '🇩🇪' },
  { name: 'Schüring', country: 'Germany', countryAr: 'ألمانيا',  category: 'Multi-Point Locking Systems', categoryAr: 'أنظمة قفل متعددة النقاط',        flag: '🇩🇪' },
  { name: 'STAC',     country: 'Spain',   countryAr: 'إسبانيا',  category: 'Door Control Solutions',      categoryAr: 'حلول التحكم بالأبواب',           flag: '🇪🇸' },
] as const;

export default function BrandGrid() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className="py-16 bg-off-white" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-2">
            {isAr ? 'شركاء العلامات التجارية' : 'Brand Partners'}
          </p>
          <h2 className="text-3xl font-bold text-ink-heading">
            {isAr ? 'تجهيزات أوروبية. مصنوعة للاستمرار.' : 'European Hardware. Built to Last.'}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {BRANDS.map(({ name, country, countryAr, category, categoryAr, flag }) => (
            <div
              key={name}
              className="bg-white border border-border-light shadow-warm-sm p-6 flex flex-col items-center text-center
                         hover:border-silver-flat hover:shadow-warm-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="text-3xl mb-3">{flag}</span>
              <p className="text-lg font-bold text-ink-heading">{name}</p>
              <span className="text-xs text-ink-muted mt-1 border border-border-light px-2 py-0.5">
                {isAr ? countryAr : country}
              </span>
              <p className="text-sm text-ink-body mt-3">{isAr ? categoryAr : category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
