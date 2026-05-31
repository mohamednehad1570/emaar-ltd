'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface BreadcrumbItem {
  label: string;
  labelAr: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
  const { language, isRTL } = useLanguage();

  return (
    <nav
      aria-label="Breadcrumb"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="h-12 bg-white border-b border-border-light flex items-center px-6"
    >
      <ol className="flex items-center text-sm">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const label = language === 'ar' ? item.labelAr : item.label;

          return (
            <li key={idx} className="flex items-center">
              {idx > 0 && (
                <span className="text-dim mx-2" aria-hidden="true">/</span>
              )}
              {isLast || !item.href ? (
                <span className="text-text-heading font-semibold">{label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-text-muted hover:text-text-heading transition-colors duration-150"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
