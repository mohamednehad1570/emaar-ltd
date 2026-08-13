'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Buildings } from '@phosphor-icons/react';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { staggerContainerSlow, fadeUp, viewportOnce } from '@/lib/motion';
import Container from '@/components/layout/Container';
import type { Testimonial as CmsTestimonial } from '@/lib/sanity/types';

interface Testimonial {
  quote:    { en: string; ar: string };
  director: { en: string; ar: string };
  company:  { en: string; ar: string };
}

// Placeholder cards shown when CMS is empty
const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    quote: {
      en: 'Emaar delivered exceptional quality on our residential project. The uPVC window systems exceeded our specifications and were installed with complete professionalism.',
      ar: 'قدمت إعمار جودة استثنائية في مشروعنا السكني. تجاوزت أنظمة نوافذ uPVC مواصفاتنا وتم تركيبها باحترافية تامة.',
    },
    director: { en: 'Eng. Ahmed Al Rashidi',      ar: 'م. أحمد الراشدي'          },
    company:  { en: 'Al Rashidi Contracting LLC', ar: 'شركة الراشدي للمقاولات'   },
  },
  {
    quote: {
      en: 'Outstanding aluminium facade systems that transformed our commercial development. Precision engineering and on-time delivery made all the difference.',
      ar: 'أنظمة واجهات ألومنيوم رائعة حولت مشروعنا التجاري. الدقة الهندسية والتسليم في الوقت المحدد صنعا الفارق.',
    },
    director: { en: 'Arch. Sara Mahmoud',    ar: 'م. سارة محمود'          },
    company:  { en: 'Mahmoud Design Studio', ar: 'استوديو محمود للتصميم'  },
  },
  {
    quote: {
      en: 'A reliable partner for our real estate portfolio. Consistent quality across multiple projects and a responsive technical support team.',
      ar: 'شريك موثوق لمحفظتنا العقارية. جودة ثابتة عبر مشاريع متعددة وفريق دعم فني متجاوب.',
    },
    director: { en: 'Mr. Khalid Al Mansoori',   ar: 'السيد خالد المنصوري'    },
    company:  { en: 'Al Mansoori Real Estate', ar: 'شركة المنصوري العقارية' },
  },
];

interface ClientTestimonialsSectionProps {
  testimonials: CmsTestimonial[]
}

export default function ClientTestimonialsSection({ testimonials: cmsTestimonials }: ClientTestimonialsSectionProps) {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  const shouldReduce = useReducedMotion();

  // Normalise CMS testimonials into the display shape; fall back to placeholders if empty
  const displayTestimonials: Testimonial[] = cmsTestimonials.length > 0
    ? cmsTestimonials.map((item) => ({
        quote:    { en: item.quote.en,       ar: item.quote.ar       },
        director: { en: item.directorName.en, ar: item.directorName.ar },
        company:  { en: item.companyName.en,  ar: item.companyName.ar  },
      }))
    : PLACEHOLDER_TESTIMONIALS;

  return (
    <section className="py-24 bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        {/* Section header */}
        <div className="mb-14">
          <span className="block text-[11px] tracking-[0.22em] uppercase text-text-muted mb-4">
            {t('CLIENT TESTIMONIALS', 'آراء العملاء')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-cairo text-text-heading mb-4">
            {t('What Our Clients Say', 'ما يقوله عملاؤنا')}
          </h2>
          <p className="text-text-body max-w-2xl">
            {t(
              'Trusted by contractors, architects, and developers across the UAE.',
              'موثوق به من قِبل المقاولين والمعماريين والمطورين في الإمارات.'
            )}
          </p>
        </div>

        {/* Staggered card grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainerSlow}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          {displayTestimonials.map((item, i) => (
            <motion.div
              key={i}
              variants={shouldReduce ? undefined : fadeUp}
              /* 0.4s per card — tighter than default fadeUp 0.5s */
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-sm p-8 transition-shadow duration-300 hover:shadow-warm-md"
              style={{ border: '0.5px solid var(--color-border-light)' }}
            >
              {/* Giant opening quote mark — brand-red editorial signature */}
              <div
                className={`text-brand-red font-cairo font-extrabold leading-none mb-4 ${isRTL ? 'text-right' : ''}`}
                style={{ fontSize: '64px', lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <p className="italic text-text-body text-base leading-relaxed">
                {isRTL ? item.quote.ar : item.quote.en}
              </p>

              {/* Divider */}
              <div className="border-t border-border-light my-6" />

              {/* Author row — Buildings icon on the trailing side */}
              <div className={`flex items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className="font-semibold text-text-heading text-sm">
                    {isRTL ? item.director.ar : item.director.en}
                  </p>
                  <p className="text-text-muted text-xs tracking-[0.08em] uppercase mt-0.5">
                    {isRTL ? item.company.ar : item.company.en}
                  </p>
                </div>
                <Buildings size={20} className="text-text-muted shrink-0" aria-hidden="true" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
