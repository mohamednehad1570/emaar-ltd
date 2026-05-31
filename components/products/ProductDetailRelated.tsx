'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { upvcData, aluminumData } from '@/lib/data/products';
import { productDetails } from '@/lib/data/productDetails';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

interface Props {
  relatedSlugs: string[];
  language: 'en' | 'ar';
  isRTL: boolean;
}

interface RelatedItem {
  slug: string;
  material: 'upvc' | 'aluminum';
  image: string;
  title: string;
  category: string;
  description: string;
}

export default function ProductDetailRelated({ relatedSlugs, language, isRTL }: Props) {
  const items: RelatedItem[] = relatedSlugs.reduce<RelatedItem[]>((acc, slug) => {
    const detail = productDetails[slug];
    if (!detail) return acc;
    const rawData = detail.material === 'aluminum' ? aluminumData[language] : upvcData[language];
    const product = rawData.products.find(p => p.id === detail.productId);
    if (!product) return acc;
    acc.push({ slug, material: detail.material, image: product.image, title: product.title, category: product.category, description: product.description });
    return acc;
  }, []);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-2xl md:text-3xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
          {language === 'en' ? 'Related Products' : 'منتجات ذات صلة'}
        </h2>
        <div className="h-0.5 w-12 bg-brand-red mb-10" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-3 gap-6"
        >
          {items.map(item => (
            <motion.div
              key={item.slug}
              variants={fadeUp}
              className="group bg-off-white border border-border-light hover:border-brand-silver transition-colors overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`}>
                  <span className="px-2 py-0.5 bg-white/90 text-xs font-bold uppercase tracking-wider text-brand-dark">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className={`p-5 ${isRTL ? 'text-right' : ''}`}>
                <h3 className="font-bold text-brand-dark mb-2 group-hover:text-brand-red transition-colors">{item.title}</h3>
                <p className="text-sm text-text-body line-clamp-2 mb-4">{item.description}</p>
                <Link
                  href={`/products/${item.material}/${item.slug}`}
                  className="text-sm font-bold text-brand-red hover:text-brand-red-dark transition-colors"
                >
                  {language === 'en' ? 'View Details →' : '← عرض التفاصيل'}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
