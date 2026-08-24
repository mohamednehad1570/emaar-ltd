'use client';

import { ArrowRight, DownloadSimple } from '@phosphor-icons/react';
import Button from '@/components/ui/Button';
import { getWhatsAppURL } from '@/lib/whatsapp';
import type { SanityProductFull } from '@/lib/sanity/types';

type Language = 'en' | 'ar';

interface Props {
  product: SanityProductFull;
  language: Language;
  isRTL: boolean;
}

export default function ProductInfoPanel({ product, language, isRTL }: Props) {
  const ui = language === 'en'
    ? { specs: 'Specifications', techSheet: 'Technical Sheet', requestQuote: 'Request Quote', contactUs: 'Contact Us' }
    : { specs: 'المواصفات', techSheet: 'الكتالوج التقني', requestQuote: 'طلب عرض سعر', contactUs: 'تواصل معنا' };

  // Build spec rows, filtering out any field the client hasn't populated yet
  const specRows = [
    { label: language === 'en' ? 'Dimensions'      : 'الأبعاد',          value: product.specs?.dimensions    },
    { label: language === 'en' ? 'Thermal Value'   : 'القيمة الحرارية',  value: product.specs?.thermalValue  },
    { label: language === 'en' ? 'Acoustic Rating' : 'التقييم الصوتي',   value: product.specs?.acousticRating },
    { label: language === 'en' ? 'Glass Thickness' : 'سماكة الزجاج',     value: product.specs?.glassThickness },
    { label: language === 'en' ? 'Colour Options'  : 'خيارات الألوان',   value: product.specs?.colorOptions?.join(', ') },
  ].filter((row): row is { label: string; value: string } =>
    typeof row.value === 'string' && row.value.length > 0
  );

  // Material label — primary classification badge
  const materialBadge = product.material === 'upvc'
    ? (language === 'en' ? 'uPVC' : 'UPVC')
    : (language === 'en' ? 'Aluminum' : 'ألومنيوم');

  // Category badge — slug formatted as title case
  const categoryBadge = product.category
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const title       = product.title[language] ?? product.title.en;
  const description = product.description?.[language] ?? product.description?.en ?? '';

  return (
    <div>
      {/* Badge row: material (dark) + category (cream) */}
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-brand-dark text-white text-xs px-3 py-1 rounded-sm uppercase tracking-[0.15em]">
          {materialBadge}
        </span>
        <span className="bg-cream text-text-muted text-xs px-3 py-1 rounded-sm uppercase tracking-[0.15em]">
          {categoryBadge}
        </span>
      </div>

      {/* Product title */}
      <h1 className="text-3xl md:text-4xl font-bold text-brand-dark font-cairo leading-snug mb-6">
        {title}
      </h1>

      <div className="h-px bg-border-light w-full mb-6" />

      {/* Specification rows — skipped entirely when Sanity product has no spec data */}
      {specRows.length > 0 && (
        <>
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted mb-3">{ui.specs}</p>
          {specRows.map(({ label, value }) => (
            <div key={label} className="grid grid-cols-2 py-3 border-b border-border-light">
              <span className="text-sm text-text-muted">{label}</span>
              {/* text-end aligns right in LTR and left in RTL automatically */}
              <span className="text-sm font-semibold text-brand-dark text-end">{value}</span>
            </div>
          ))}
        </>
      )}

      {/* Divider + description */}
      <div className="h-px bg-border-light w-full my-6" />
      {description && (
        <p className="text-sm leading-[1.75] text-text-body mb-6">{description}</p>
      )}

      {/* Technical sheet download link */}
      {product.technicalSheet && (
        <div className="flex flex-wrap gap-3 mb-6">
          <a
            href={product.technicalSheet}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border-medium hover:border-brand-dark text-sm text-brand-dark transition-colors duration-200 rounded-sm"
          >
            <DownloadSimple className="w-4 h-4 text-text-muted" />
            {ui.techSheet}
          </a>
        </div>
      )}

      <div className="h-px bg-border-light w-full mb-6" />

      {/* CTA block — primary WhatsApp + secondary contact */}
      <div className="flex flex-col gap-3">
        <Button
          variant="primary"
          size="md"
          href={getWhatsAppURL({ page: 'product-detail', productName: product.title.en })}
          target="_blank"
          rel="noopener noreferrer"
          icon={<ArrowRight className={`w-4 h-4${isRTL ? ' rotate-180' : ''}`} />}
          className="w-full"
        >
          {ui.requestQuote}
        </Button>
        <Button
          variant="outline"
          size="md"
          href="/contact"
          className="w-full"
        >
          {ui.contactUs}
        </Button>
      </div>
    </div>
  );
}
