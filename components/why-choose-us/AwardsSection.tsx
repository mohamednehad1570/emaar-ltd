'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Medal } from '@phosphor-icons/react';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { staggerContainerSlow, fadeUp, viewportOnce } from '@/lib/motion';
import Container from '@/components/layout/Container';

interface Award {
  year:   string;
  name:   { en: string; ar: string };
  issuer: { en: string; ar: string };
}

/* Gold (#C9A84C) is the project's ONLY awards/certifications colour — never used elsewhere */
const GOLD = '#C9A84C';

const awards: Award[] = [
  {
    year:   '2023',
    name:   { en: 'Excellence in uPVC Manufacturing',   ar: 'التميز في تصنيع uPVC'             },
    issuer: { en: 'UAE Construction Industry Council',  ar: 'مجلس صناعة البناء الإماراتي'      },
  },
  {
    year:   '2022',
    name:   { en: 'Best Facade Systems Supplier',       ar: 'أفضل مورد لأنظمة الواجهات'         },
    issuer: { en: 'Sharjah Chamber of Commerce',        ar: 'غرفة تجارة الشارقة'                },
  },
  {
    year:   '2021',
    name:   { en: 'ISO 9001:2015 Certification',        ar: 'شهادة ISO 9001:2015'               },
    issuer: { en: 'Bureau Veritas',                     ar: 'بيورو فيريتاس'                      },
  },
  {
    year:   '2020',
    name:   { en: 'Outstanding Project Delivery Award', ar: 'جائزة تميز تسليم المشاريع'         },
    issuer: { en: 'SAIF Zone Authority',                ar: 'هيئة منطقة سيف الحرة'              },
  },
];

export default function AwardsSection() {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-24 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        {/* Section header — centred for the single-column awards layout */}
        <div className="mb-14 text-center">
          <span className="block text-[11px] tracking-[0.22em] uppercase text-text-muted mb-4">
            {t('AWARDS & RECOGNITION', 'الجوائز والتكريم')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-cairo text-text-heading mb-4">
            {t('Recognized for Excellence', 'معترف بنا في التميز')}
          </h2>
          <p className="text-text-body max-w-2xl mx-auto">
            {t(
              'Industry recognition for quality, reliability, and innovation.',
              'تكريم صناعي للجودة والموثوقية والابتكار.'
            )}
          </p>
        </div>

        {/* Award rows — single centred column */}
        <motion.div
          className="max-w-2xl mx-auto"
          variants={staggerContainerSlow}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          {awards.map((award, i) => (
            <motion.div
              key={i}
              variants={shouldReduce ? undefined : fadeUp}
              /* 0.3s per row — snappier than default for list items */
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`flex items-center gap-6 py-6 ${
                i < awards.length - 1 ? 'border-b border-border-light' : ''
              } ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {/* Year — gold text, awards only */}
              <span
                className="font-bold font-cairo text-sm min-w-[48px] shrink-0"
                style={{ color: GOLD }}
                /* dir=ltr keeps the four-digit year LTR inside an RTL row */
                dir="ltr"
              >
                {award.year}
              </span>

              {/* Award name + issuer */}
              <div className="flex-1">
                <p className="font-semibold text-text-heading text-base">
                  {isRTL ? award.name.ar : award.name.en}
                </p>
                <p className="text-text-muted text-sm mt-0.5">
                  {isRTL ? award.issuer.ar : award.issuer.en}
                </p>
              </div>

              {/* Medal icon — gold, awards only */}
              <Medal size={24} weight="duotone" style={{ color: GOLD }} className="shrink-0" aria-hidden="true" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
