export interface SolutionBenefit { icon: string; title: string; description: string; }
export interface SolutionData {
  hero: { title: string; subtitle: string; description: string; cta: string };
  benefits: SolutionBenefit[];
  products: { title: string; upvc: { title: string; description: string; linkText: string }; aluminum: { title: string; description: string; linkText: string } };
  cta: { title: string; button: string };
}
export interface CommercialData {
  hero: { title: string; subtitle: string; description: string; cta: string };
  capabilities: SolutionBenefit[];
  techHub: { title: string; description: string; button: string; pdfLabel: string; cadLabel: string };
  cta: { title: string; button: string };
}

export const residentialData: Record<'en'|'ar', SolutionData> = {
  en: {
    hero: { title: 'Transform Your Home Living', subtitle: 'Premium Residential Solutions', description: 'Experience the perfect blend of aesthetics, comfort, and energy efficiency with our world-class windows and doors.', cta: 'Get a Free Home Consultation' },
    benefits: [
      { icon: 'Shield', title: 'Superior Security', description: 'Advanced locking systems and reinforced profiles to keep your family safe.' },
      { icon: 'Wind', title: 'Noise Reduction', description: 'Enjoy peace and quiet with up to 40dB sound insulation.' },
      { icon: 'Sun', title: 'Thermal Comfort', description: 'Keep your home cool in summer and warm in winter while saving energy.' },
    ],
    products: { title: 'Explore Our Home Solutions', upvc: { title: 'Modern uPVC', description: 'Best for insulation and low maintenance.', linkText: 'View uPVC Products' }, aluminum: { title: 'Sleek Aluminum', description: 'Slim profiles for maximum natural light.', linkText: 'View Aluminum Systems' } },
    cta: { title: 'Ready to Upgrade Your Home?', button: 'Request Quote' },
  },
  ar: {
    hero: { title: 'حول منزلك إلى واحة من الراحة', subtitle: 'حلول سكنية متميزة', description: 'استمتع بالمزيج المثالي من الجمال والراحة وكفاءة الطاقة مع النوافذ والأبواب ذات المستوى العالمي.', cta: 'اطلب استشارة منزلية مجانية' },
    benefits: [
      { icon: 'Shield', title: 'أمان فائق', description: 'نظم قفل متطورة وملفات تعريف معززة للحفاظ على سلامة عائلتك.' },
      { icon: 'Wind', title: 'عزل الضوضاء', description: 'استمتع بالهدوء مع عزل صوتي يصل إلى 40 ديسيبل.' },
      { icon: 'Sun', title: 'الراحة الحرارية', description: 'حافظ على برودة منزلك في الصيف ودفئه في الشتاء مع توفير الطاقة.' },
    ],
    products: { title: 'استكشف حلولنا المنزلية', upvc: { title: 'uPVC الحديث', description: 'الأفضل للعزل وقلة الصيانة.', linkText: 'عرض منتجات uPVC' }, aluminum: { title: 'الألومنيوم الأنيق', description: 'إطارات نحيفة لأقصى قدر من الإضاءة الطبيعية.', linkText: 'عرض أنظمة الألومنيوم' } },
    cta: { title: 'جاهز لتحديث منزلك؟', button: 'اطلب عرض سعر' },
  },
};

export const commercialData: Record<'en'|'ar', CommercialData> = {
  en: {
    hero: { title: 'Engineering Excellence for Commercial Projects', subtitle: 'Contractor & Developer Solutions', description: 'High-performance facade systems, durability, and technical compliance for heavy-duty applications.', cta: 'Partner With Us' },
    capabilities: [
      { icon: 'Building2', title: 'High-Rise Facades', description: 'Engineered curtain walls and glazing systems for towers.' },
      { icon: 'Briefcase', title: 'Retail & Office', description: 'Durable shop fronts and flexible office partitioning.' },
      { icon: 'Award', title: 'Certified Quality', description: 'ISO certified processes meeting rigorous civil defense standards.' },
    ],
    techHub: { title: 'Technical Resources for Professionals', description: 'Access our comprehensive database of CAD files, specifications, and certifications.', button: 'Visit Technical Hub', pdfLabel: 'PDF Specifications', cadLabel: 'CAD Drawings' },
    cta: { title: 'Submit a Tender or Request Info', button: 'Contact Commercial Team' },
  },
  ar: {
    hero: { title: 'التميز الهندسي للمشاريع التجارية', subtitle: 'حلول المقاولين والمطورين', description: 'أنظمة واجهات عالية الأداء، ومتانة، وامتثال تقني للتطبيقات الشاقة.', cta: 'شارك معنا' },
    capabilities: [
      { icon: 'Building2', title: 'واجهات الأبراج', description: 'جدران ستائرية وأنظمة تزيج هندسية للأبراج.' },
      { icon: 'Briefcase', title: 'التجزئة والمكاتب', description: 'واجهات محال متينة وتقسيمات مرنة للمكاتب.' },
      { icon: 'Award', title: 'جودة معتمدة', description: 'عمليات معتمدة من ISO تلبي معايير الدفاع المدني الصارمة.' },
    ],
    techHub: { title: 'الموارد التقنية للمحترفين', description: 'الوصول إلى قاعدة بياناتنا الشاملة لملفات CAD والمواصفات والشهادات.', button: 'زيارة المركز التقني', pdfLabel: 'مواصفات PDF', cadLabel: 'رسومات CAD' },
    cta: { title: 'تقديم مناقصة أو طلب معلومات', button: 'اتصل بالفريق التجاري' },
  },
};
