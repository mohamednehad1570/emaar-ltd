'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

interface SolutionProduct {
  id: string;
  title: string;
  image: string;
  description: string;
}

interface Props {
  products: readonly SolutionProduct[];
  material: 'upvc' | 'aluminum';
  sectionTitle: string;
  viewAllHref: string;
  viewAllLabel: string;
}

export default function SolutionProductsSection({ products, material, sectionTitle, viewAllHref, viewAllLabel }: Props) {
  const { isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-end justify-between mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold text-brand-dark mb-2 ${isRTL ? 'text-right' : ''}`}>
              {sectionTitle}
            </h2>
            <div className="h-0.5 w-10 bg-brand-red" />
          </div>
          <Link
            href={viewAllHref}
            className={`text-sm font-semibold text-brand-red hover:underline inline-flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {viewAllLabel}
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
          </Link>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-3 gap-6"
        >
          {products.slice(0, 3).map((p) => (
            <motion.div key={p.id} variants={fadeUp}>
              <Link href={`/products/${material}/${p.id.toLowerCase()}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-dark mb-4">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className="text-base font-bold text-brand-dark mb-1 group-hover:text-brand-red transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-snug">{p.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
