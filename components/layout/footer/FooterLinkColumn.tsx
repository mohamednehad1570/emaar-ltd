/**
 * components/layout/footer/FooterLinkColumn.tsx
 * Desktop column header + link list. Server component — no hooks, pure rendering.
 * Receives language + isRTL as plain props from the client Footer compositor.
 */

import LocaleLink from '@/components/ui/LocaleLink';
import { cn } from '@/lib/cn';
import type { NavLink } from '@/lib/data/nav';

interface FooterLinkColumnProps {
  header:   string;
  links:    NavLink[];
  language: 'en' | 'ar';
  isRTL:    boolean;
}

function ColHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-silver-dark mb-5 select-none">
      {children}
    </h3>
  );
}

export default function FooterLinkColumn({ header, links, language, isRTL }: FooterLinkColumnProps) {
  return (
    <div>
      {header && <ColHeader>{header}</ColHeader>}
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href + link.en}>
            <LocaleLink
              href={link.href}
              className={cn(
                // text-muted ensures no active-state leakage — footer links are never red
                'text-sm text-text-muted hover:text-brand-dark transition-all duration-150',
                isRTL ? 'hover:-translate-x-0.5' : 'hover:translate-x-0.5',
              )}
            >
              {link[language]}
            </LocaleLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
