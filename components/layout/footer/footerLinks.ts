/**
 * components/layout/footer/footerLinks.ts
 * Static footer data. Links are typed as NavLink so the footer and header can
 * never drift — PRODUCT_LINKS is the single source for the Products column in both.
 */

import { FacebookLogo, InstagramLogo, LinkedinLogo, TwitterLogo } from '@phosphor-icons/react';
import { PRODUCT_LINKS } from '@/lib/data/nav';
import type { NavLink } from '@/lib/data/nav';

export interface Column {
  id:    string;
  en:    string;
  ar:    string;
  links: NavLink[];
}

export const COLUMNS: Column[] = [
  {
    id: 'products',
    en: 'Products',
    ar: 'المنتجات',
    // Shared with nav.ts so footer and header targets can never drift
    links: PRODUCT_LINKS,
  },
  {
    id: 'company',
    en: 'Company',
    ar: 'الشركة',
    links: [
      { en: 'About Us',  ar: 'من نحن',          href: '/about'         },
      { en: 'Why Emaar', ar: 'لماذا إمار',       href: '/why-choose-us' },
      { en: 'Projects',  ar: 'المشاريع',         href: '/projects'      },
      { en: 'Careers',   ar: 'الوظائف',          href: '/careers'       },
      { en: 'FAQ',       ar: 'الأسئلة الشائعة',  href: '/faq'           },
    ],
  },
];

export const SOCIAL = [
  { Icon: FacebookLogo,  label: 'Facebook',    href: '#' },
  { Icon: InstagramLogo, label: 'Instagram',   href: '#' },
  { Icon: LinkedinLogo,  label: 'LinkedIn',    href: '#' },
  { Icon: TwitterLogo,   label: 'X (Twitter)', href: '#' },
] as const;
