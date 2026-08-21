/**
 * lib/data/uiStrings.ts
 *
 * Consolidation barrel for all static UI copy.
 * Components import from here so the individual data files can be
 * deleted in Batch 5 without touching every component import path.
 */

export { whyChooseUsData } from './whyChooseUs';
export type { WhyChooseUsData } from './whyChooseUs';

export { servicesData } from './services';

export { careersData } from './careers';
export type { CareersJob, CareersContent } from './careers';

export { techData } from './tech';
export type { TechContent, DownloadFile } from './tech';

export { contactData } from './contact';

export { aboutData } from './about';

export { faqData, faqCategoryIcons } from './faq';
export type { FAQItem } from './faq';
