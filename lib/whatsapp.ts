/**
 * lib/whatsapp.ts
 * Prefilled wa.me links, one message per page context and per language: /ar pages open
 * WhatsApp with an Arabic message, English pages with the English one (unchanged).
 * AR messages are machine-translated — needs native review.
 */

import type { Locale } from '@/lib/i18n/locales';

export const WHATSAPP_NUMBER = '971500000000'; // client will replace

export type WhatsAppContext = {
  page:
    | 'home'
    | 'products'
    | 'product-detail'
    | 'projects'
    | 'project-detail'
    | 'technical'
    | 'contact'
    | 'why-choose-us';
  /** Language of the page the link sits on; omitted = English */
  locale?: Locale;
  /** Both names travel together so each language's message names the product in that language */
  productName?: { en: string; ar: string };
  projectName?: string;
};

type MessageFactory = string | ((ctx: WhatsAppContext) => string);

const MESSAGES: Record<WhatsAppContext['page'], Record<Locale, MessageFactory>> = {
  'home': {
    en: "Hi, I'd like to learn more about your windows and doors. Can you help?",
    ar: 'مرحباً، أودّ معرفة المزيد عن نوافذكم وأبوابكم. هل يمكنكم مساعدتي؟',
  },
  'products': {
    en: "Hi, I'm browsing your product range and would like a quote.",
    ar: 'مرحباً، أتصفّح مجموعة منتجاتكم وأودّ الحصول على عرض سعر.',
  },
  'product-detail': {
    // Without a name the fallback must not follow "the" ("the your product")
    en: (ctx) => `Hi, I'm interested in ${ctx.productName ? `the ${ctx.productName.en}` : 'your products'}. Can I get more details and a quote?`,
    // «» quotes the product name the way Arabic copy quotes a title
    ar: (ctx) => `مرحباً، أنا مهتم ${ctx.productName ? `بـ«${ctx.productName.ar}»` : 'بمنتجاتكم'}. هل يمكنني الحصول على مزيد من التفاصيل وعرض سعر؟`,
  },
  'projects': {
    en: "Hi, I saw your project portfolio and I'm interested in a similar installation.",
    ar: 'مرحباً، اطّلعت على معرض مشاريعكم وأنا مهتم بتركيب مماثل.',
  },
  'project-detail': {
    en: (ctx) => `Hi, I saw the ${ctx.projectName ?? 'your project'} on your website. I'm interested in something similar.`,
    ar: (ctx) => `مرحباً، رأيت ${ctx.projectName ? `مشروع «${ctx.projectName}»` : 'أحد مشاريعكم'} على موقعكم وأنا مهتم بشيء مماثل.`,
  },
  'technical': {
    en: "Hi, I'm reviewing your technical specifications. I'd like to discuss a project.",
    ar: 'مرحباً، أراجع مواصفاتكم الفنية وأودّ مناقشة مشروع.',
  },
  'contact': {
    en: "Hi, I'd like to get in touch with Emaar International.",
    ar: 'مرحباً، أودّ التواصل مع إعمار الدولية.',
  },
  'why-choose-us': {
    en: "Hi, I've been reading about Emaar International and I'd like to get a quote.",
    ar: 'مرحباً، قرأت عن إعمار الدولية وأودّ الحصول على عرض سعر.',
  },
};

// Optional override lets server-fetched CMS number replace the constant
export function getWhatsAppURL(context: WhatsAppContext, whatsappNumber?: string): string {
  const number = whatsappNumber ?? WHATSAPP_NUMBER;
  const factory = MESSAGES[context.page][context.locale ?? 'en'];
  const message = typeof factory === 'function' ? factory(context) : factory;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Maps the current route to its WhatsApp message context, for chrome that lives on
 * every page (header, sticky quote bar). Unknown routes fall back to the generic
 * 'home' message rather than a page-specific one that might not fit.
 */
export function whatsAppContextFor(
  pathname: string,
  locale: Locale,
  productName?: WhatsAppContext['productName'],
): WhatsAppContext {
  if (pathname.startsWith('/products/')) return { page: 'product-detail', locale, productName };
  if (pathname === '/upvc' || pathname === '/aluminum') return { page: 'products', locale };
  const direct: Record<string, WhatsAppContext['page']> = {
    '/projects': 'projects',
    '/technical': 'technical',
    '/contact': 'contact',
    '/why-choose-us': 'why-choose-us',
  };
  return { page: direct[pathname] ?? 'home', locale };
}
