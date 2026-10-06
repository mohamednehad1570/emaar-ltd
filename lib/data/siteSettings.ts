/**
 * lib/data/siteSettings.ts
 * Company contact details — replaces the old CMS `siteSettings` singleton.
 * The WhatsApp number is re-exported from lib/whatsapp.ts so there is one source of truth.
 */

import type { SiteSettings } from '@/lib/types';
import { WHATSAPP_NUMBER } from '@/lib/whatsapp';

export const SITE_SETTINGS: SiteSettings = {
  // Display strings — render inside dir="ltr" so digit groups don't reverse in Arabic
  phone: '+971 6 557 82 22',
  freeLine: '800 2226',
  customerService: '056 666 8273',
  emails: {
    info: 'info@emaarupvc.ae',
    general: 'emaar@emaarupvc.ae',
  },
  whatsappNumber: WHATSAPP_NUMBER,
  poBox: { en: 'P.O. Box 120777', ar: 'ص.ب 120777' },
  address: {
    en: 'SAIF Zone, Sharjah, UAE',
    ar: 'المنطقة الحرة لمطار الشارقة، الشارقة، الإمارات العربية المتحدة',
  },
};
