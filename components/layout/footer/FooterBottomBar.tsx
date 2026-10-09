/**
 * components/layout/footer/FooterBottomBar.tsx
 * Copyright line + decorative badge strip (UAE · Est. · ISO Certified).
 * Server component — receives plain strings, no hooks.
 * "L.L.C." / "ذ.م.م" appear ONLY here, never in the brand name elsewhere on the site.
 */

interface FooterBottomBarProps {
  language: 'en' | 'ar';
}

export default function FooterBottomBar({ language }: FooterBottomBarProps) {
  const year = new Date().getFullYear();

  const copyright = language === 'ar'
    ? `© ${year} إعمار الدولية للصناعة ذ.م.م. جميع الحقوق محفوظة.`
    : `© ${year} Emaar International Industry L.L.C. All rights reserved.`;

  const isoLabel = language === 'ar' ? 'معتمد ISO' : 'ISO Certified';

  return (
    <div className="pt-6 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs text-text-muted text-center sm:text-start">{copyright}</p>

      {/* Badge strip — purely decorative, no links */}
      <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-silver-dark select-none">
        <span>UAE</span>
        <span className="w-px h-3 bg-border-medium" aria-hidden="true" />
        <span>Est. {year}</span>
        <span className="w-px h-3 bg-border-medium" aria-hidden="true" />
        <span>{isoLabel}</span>
      </div>
    </div>
  );
}
