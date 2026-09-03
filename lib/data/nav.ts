export interface DropdownItem {
  en:             string;
  ar:             string;
  href:           string;
  dividerBefore?: boolean;
}

export interface NavItem {
  en:        string;
  ar:        string;
  href:      string;
  dropdown?: DropdownItem[];
}

export const NAV: NavItem[] = [
  { en: 'Home', ar: 'الرئيسية', href: '/' },
  {
    en: 'Our Solutions', ar: 'حلولنا', href: '',
    dropdown: [
      { en: 'uPVC Systems',      ar: 'أنظمة uPVC',       href: '/products/upvc'                         },
      { en: 'Aluminium Systems', ar: 'أنظمة الألومنيوم', href: '/products/aluminum'                     },
      { en: 'Glass Systems',     ar: 'أنظمة الزجاج',     href: '/products/glass'                        },
      { en: 'All Products',      ar: 'جميع المنتجات',    href: '/products',         dividerBefore: true  },
      { en: 'Villa Projects',    ar: 'مشاريع الفلل',     href: '/projects/villas',  dividerBefore: true  },
      { en: 'Building Projects', ar: 'مشاريع المباني',   href: '/projects/buildings'                    },
    ],
  },
  { en: 'Technical', ar: 'المواصفات', href: '/technical' },
  {
    en: 'About', ar: 'من نحن', href: '',
    dropdown: [
      { en: 'About Us',       ar: 'من نحن',       href: '/about'          },
      { en: 'Why Choose Us',  ar: 'لماذا نحن',    href: '/why-choose-us'  },
      { en: 'Careers',        ar: 'الوظائف',       href: '/careers', dividerBefore: true },
      { en: 'FAQ',            ar: 'الأسئلة الشائعة', href: '/faq'          },
    ],
  },
  { en: 'Contact',   ar: 'اتصل بنا', href: '/contact'   },
];

export function isActive(
  pathname: string,
  href: string,
  dropdown?: DropdownItem[],
): boolean {
  if (href === '/') return pathname === '/';
  const hrefPath = href.split('?')[0];
  if (hrefPath && pathname.startsWith(hrefPath)) return true;
  return dropdown?.some(d => pathname.startsWith(d.href.split('?')[0])) ?? false;
}
