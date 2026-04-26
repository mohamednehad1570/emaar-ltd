/**
 * lib/data/faq.ts
 * Bilingual content for the FAQ page.
 */

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  popular: boolean;
}

export const faqData = {
  en: {
    hero: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find Answers to Common Questions',
      description: 'Everything you need to know about our products, services, and processes.',
    },
    search: {
      placeholder: 'Search for answers...',
      noResults: 'No results found. Try different keywords or contact us directly.',
    },
    categories: {
      all: 'All Questions',
      products: 'Products',
      services: 'Services',
      technical: 'Technical',
      ordering: 'Ordering',
      installation: 'Installation',
      maintenance: 'Maintenance',
    },
    popular: { title: 'Popular Questions', badge: 'Popular' },
    faqs: [
      { question: 'What is the difference between uPVC and aluminum windows?', answer: 'uPVC windows offer superior thermal insulation and are maintenance-free with excellent energy efficiency. They are ideal for residential applications. Aluminum windows provide slimmer profiles, larger glass areas, and higher structural strength, making them perfect for commercial buildings and modern architectural designs. Both materials are durable and weather-resistant, but your choice depends on your specific needs, budget, and aesthetic preferences.', category: 'products', popular: true },
      { question: 'Do you offer custom sizes and designs?', answer: 'Yes! We specialize in custom solutions. Our engineering team can manufacture windows and doors to your exact specifications, including non-standard sizes, shapes, colors, and configurations. We work closely with architects and designers to bring unique visions to life.', category: 'products', popular: true },
      { question: 'What colors are available for uPVC windows?', answer: 'We offer a wide range of colors including white, cream, woodgrain finishes (oak, walnut, mahogany), and contemporary colors (gray, anthracite, black). We also provide dual-color options where exterior and interior can be different colors to match your design scheme.', category: 'products', popular: false },
      { question: 'Are your products energy efficient?', answer: 'Absolutely! All our uPVC windows achieve A+ energy ratings with U-values as low as 1.0 W/m²K. Our aluminum windows feature thermal breaks and can be fitted with high-performance glazing (Low-E, argon-filled) to maximize energy efficiency and reduce cooling costs.', category: 'products', popular: true },
      { question: 'What glass options do you offer?', answer: 'We offer single, double, and triple glazing options. Glass types include: clear, tinted, reflective, Low-E (low emissivity), laminated for safety, acoustic for sound insulation, and frosted for privacy. We can also provide specialized glass for specific requirements.', category: 'products', popular: false },
      { question: 'Do you provide installation services?', answer: 'Yes, professional installation is included with all our projects. Our certified technicians ensure proper fitting, sealing, and finishing. Installation is performed according to manufacturer specifications and includes a 2-year installation warranty covering any workmanship issues.', category: 'services', popular: true },
      { question: 'How long does the entire process take from order to installation?', answer: 'Typically 3-5 weeks for standard projects: 5-7 days for consultation and quotation, 2-3 weeks for manufacturing, and 1-5 days for installation depending on project size. Custom or large commercial projects may require additional time. We provide detailed timelines after site survey.', category: 'services', popular: true },
      { question: 'Do you offer maintenance services?', answer: 'Yes, we offer three maintenance plans: Basic Care (AED 299/year), Premium Care (AED 599/year), and Commercial Packages (custom pricing). Services include inspections, hardware adjustments, seal checks, cleaning, and priority repair discounts. We also provide 24/7 emergency repair services.', category: 'services', popular: false },
      { question: 'What areas do you serve in the UAE?', answer: 'We serve all emirates across the UAE including Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. We have completed projects throughout the region and can handle installations anywhere in the UAE.', category: 'services', popular: false },
      { question: 'What is the U-value and why does it matter?', answer: "U-value measures thermal transmittance - how much heat passes through a window. Lower U-values mean better insulation. Our uPVC windows achieve U-values as low as 1.0 W/m²K, significantly reducing heat transfer and lowering cooling costs in UAE's hot climate.", category: 'technical', popular: false },
      { question: "How do your products perform in UAE's climate?", answer: 'Our products are specifically engineered for UAE conditions: UV-resistant materials prevent fading and degradation, thermal breaks reduce heat transfer, multi-point locking systems maintain performance in high temperatures, and weather seals prevent dust and sand infiltration. All products are tested for wind loads up to 2400 Pa.', category: 'technical', popular: true },
      { question: 'Are your windows soundproof?', answer: 'While no window is completely soundproof, our windows provide excellent acoustic insulation. Standard double glazing offers 30-35 dB reduction. For enhanced sound insulation, we offer acoustic laminated glass achieving up to 45 dB reduction, ideal for properties near highways or airports.', category: 'technical', popular: false },
      { question: 'What certifications do your products have?', answer: 'Our products hold multiple certifications: ISO 9001:2015 for quality management, UAE Quality Mark, CE marking for European standards compliance, and Green Building certification. All materials comply with international standards for safety, performance, and environmental sustainability.', category: 'technical', popular: false },
      { question: 'How do I get a quote?', answer: 'Simply contact us via phone (+971 50 123 4567), WhatsApp, email, or fill out our online quote request form. We offer free consultations where we discuss your requirements, conduct a site survey if needed, and provide a detailed written quotation within 5-7 days.', category: 'ordering', popular: true },
      { question: 'What information do you need for a quote?', answer: 'We need: approximate window/door dimensions or number of openings, property type (residential/commercial), preferred material (uPVC/aluminum), any special requirements (color, glass type, security features), project location, and approximate timeline. Site visits provide the most accurate quotes.', category: 'ordering', popular: false },
      { question: 'What payment terms do you offer?', answer: 'Standard terms: 30% deposit upon order confirmation, 40% before delivery, 30% upon installation completion. For large commercial projects, we can arrange customized payment schedules. We accept bank transfers, cheques, and credit cards.', category: 'ordering', popular: false },
      { question: 'Can I see samples before ordering?', answer: 'Absolutely! Visit our showroom to see full-size displays of windows, doors, and various finishes. We can also bring samples to your site during consultation. Seeing and touching the products helps you make confident decisions.', category: 'ordering', popular: false },
      { question: 'How is installation carried out?', answer: 'Our certified technicians follow strict protocols: site preparation and protection, removal of old frames (if replacement), precise measurement verification, frame installation with proper anchoring, glazing and sealing, hardware installation and adjustment, final testing of operation, cleanup and debris removal, and comprehensive walkthrough with you.', category: 'installation', popular: false },
      { question: 'Do I need to be present during installation?', answer: 'We recommend being present for the initial setup and final inspection, but continuous presence is not required. Our team is professional and trustworthy. We ensure site security and keep you updated throughout the process.', category: 'installation', popular: false },
      { question: 'What preparation is needed before installation?', answer: 'Clear the area around windows/doors, remove curtains and blinds, protect furniture near work areas, ensure clear access for workers and materials, provide power supply access if needed, and arrange parking for installation vehicles. We provide a detailed preparation checklist upon scheduling.', category: 'installation', popular: false },
      { question: 'How do I maintain my windows and doors?', answer: 'Regular maintenance is simple: clean frames and glass with mild detergent and soft cloth (avoid abrasive cleaners), lubricate hinges and locks every 6 months with light machine oil, check and clean drainage holes in frames, inspect weather seals annually, and adjust hardware if needed. Detailed maintenance guides are provided with every installation.', category: 'maintenance', popular: true },
      { question: 'What is covered under warranty?', answer: 'We offer comprehensive coverage: 10-year product warranty (profiles, welding, structural integrity), 5-year hardware warranty (locks, hinges, handles), 2-year installation warranty (leaks, sealing, fitting), and 1-year glass warranty (seal failure, condensation). Warranty excludes accidental damage, misuse, and normal wear.', category: 'maintenance', popular: true },
      { question: 'What if I have a problem after installation?', answer: 'Contact our service center immediately. Most issues are covered under warranty and resolved quickly. For emergencies (water leaks, security issues), we offer 24/7 response with on-site service within 4 hours. Our goal is complete customer satisfaction.', category: 'maintenance', popular: false },
      { question: 'Can windows be repaired or do they need replacement?', answer: 'Most issues are repairable: hardware replacement, seal renewal, glass unit replacement, and frame adjustments. Complete replacement is rarely necessary unless there is severe structural damage. Our technicians assess and recommend the most cost-effective solution.', category: 'maintenance', popular: false },
    ] as FAQItem[],
    cta: {
      title: 'Still Have Questions?',
      description: 'Our team is here to help you with any questions',
      button: 'Contact Us',
      whatsapp: 'Chat on WhatsApp',
    },
  },

  ar: {
    hero: {
      title: 'الأسئلة الشائعة',
      subtitle: 'ابحث عن إجابات للأسئلة الشائعة',
      description: 'كل ما تحتاج معرفته عن منتجاتنا وخدماتنا وعملياتنا.',
    },
    search: {
      placeholder: 'ابحث عن إجابات...',
      noResults: 'لم يتم العثور على نتائج. جرب كلمات مفتاحية مختلفة أو اتصل بنا مباشرة.',
    },
    categories: {
      all: 'جميع الأسئلة',
      products: 'المنتجات',
      services: 'الخدمات',
      technical: 'تقني',
      ordering: 'الطلب',
      installation: 'التركيب',
      maintenance: 'الصيانة',
    },
    popular: { title: 'الأسئلة الشائعة', badge: 'شائع' },
    faqs: [
      { question: 'ما الفرق بين نوافذ uPVC والألومنيوم؟', answer: 'توفر نوافذ uPVC عزلًا حراريًا متفوقًا وخالية من الصيانة مع كفاءة ممتازة في استخدام الطاقة. إنها مثالية للتطبيقات السكنية. توفر نوافذ الألومنيوم ملامح أنحف ومساحات زجاجية أكبر وقوة هيكلية أعلى، مما يجعلها مثالية للمباني التجارية والتصاميم المعمارية الحديثة.', category: 'products', popular: true },
      { question: 'هل تقدمون أحجام وتصاميم مخصصة؟', answer: 'نعم! نحن متخصصون في الحلول المخصصة. يمكن لفريق الهندسة لدينا تصنيع النوافذ والأبواب وفقًا لمواصفاتك الدقيقة.', category: 'products', popular: true },
      { question: 'ما الألوان المتاحة لنوافذ uPVC؟', answer: 'نقدم مجموعة واسعة من الألوان بما في ذلك الأبيض والكريمي وتشطيبات الخشب والألوان العصرية. نوفر أيضًا خيارات ألوان مزدوجة.', category: 'products', popular: false },
      { question: 'هل منتجاتكم موفرة للطاقة؟', answer: 'بالتأكيد! تحقق جميع نوافذ uPVC لدينا تصنيفات طاقة A+ مع قيم U منخفضة تصل إلى 1.0 واط/م²ك.', category: 'products', popular: true },
      { question: 'ما خيارات الزجاج التي تقدمونها؟', answer: 'نقدم خيارات الزجاج الأحادي والمزدوج والثلاثي. تشمل أنواع الزجاج: الشفاف، الملون، العاكس، Low-E، الطبقات للسلامة، والمصنفر للخصوصية.', category: 'products', popular: false },
      { question: 'هل تقدمون خدمات التركيب؟', answer: 'نعم، التركيب الاحترافي مشمول مع جميع مشاريعنا. يضمن الفنيون المعتمدون لدينا التركيب الصحيح والإغلاق والتشطيب.', category: 'services', popular: true },
      { question: 'كم من الوقت تستغرق العملية بأكملها من الطلب إلى التركيب؟', answer: 'عادةً 3-5 أسابيع للمشاريع القياسية: 5-7 أيام للاستشارة والعرض، 2-3 أسابيع للتصنيع، و1-5 أيام للتركيب.', category: 'services', popular: true },
      { question: 'هل تقدمون خدمات الصيانة؟', answer: 'نعم، نقدم ثلاث خطط صيانة: العناية الأساسية (299 درهم/سنة)، العناية المميزة (599 درهم/سنة)، والحزم التجارية.', category: 'services', popular: false },
      { question: 'ما المناطق التي تخدمونها في الإمارات؟', answer: 'نخدم جميع الإمارات بما في ذلك دبي وأبو ظبي والشارقة وعجمان ورأس الخيمة والفجيرة وأم القيوين.', category: 'services', popular: false },
      { question: 'ما هي قيمة U ولماذا مهمة؟', answer: 'تقيس قيمة U انتقال الحرارة - مقدار الحرارة التي تمر عبر النافذة. قيم U الأقل تعني عزلًا أفضل.', category: 'technical', popular: false },
      { question: 'كيف تؤدي منتجاتكم في مناخ الإمارات؟', answer: 'منتجاتنا مصممة خصيصًا لظروف الإمارات: مواد مقاومة للأشعة فوق البنفسجية، فواصل حرارية، أنظمة قفل متعددة النقاط.', category: 'technical', popular: true },
      { question: 'هل نوافذكم عازلة للصوت؟', answer: 'توفر نوافذنا عزلًا صوتيًا ممتازًا. يوفر الزجاج المزدوج القياسي تقليلًا 30-35 ديسيبل.', category: 'technical', popular: false },
      { question: 'ما الشهادات التي تحملها منتجاتكم؟', answer: 'تحمل منتجاتنا عدة شهادات: ISO 9001:2015، علامة الجودة الإماراتية، علامة CE، وشهادة البناء الأخضر.', category: 'technical', popular: false },
      { question: 'كيف أحصل على عرض سعر؟', answer: 'ببساطة اتصل بنا عبر الهاتف أو واتساب أو البريد الإلكتروني أو نموذج الطلب عبر الإنترنت. نقدم استشارات مجانية.', category: 'ordering', popular: true },
      { question: 'ما المعلومات التي تحتاجونها للحصول على عرض سعر؟', answer: 'نحتاج: أبعاد تقريبية، نوع العقار، المادة المفضلة، متطلبات خاصة، موقع المشروع، والجدول الزمني التقريبي.', category: 'ordering', popular: false },
      { question: 'ما شروط الدفع التي تقدمونها؟', answer: 'الشروط القياسية: 30٪ وديعة عند تأكيد الطلب، 40٪ قبل التسليم، 30٪ عند اكتمال التركيب.', category: 'ordering', popular: false },
      { question: 'هل يمكنني رؤية عينات قبل الطلب؟', answer: 'بالتأكيد! قم بزيارة صالة العرض لدينا لرؤية عروض بالحجم الكامل.', category: 'ordering', popular: false },
      { question: 'كيف يتم تنفيذ التركيب؟', answer: 'يتبع الفنيون المعتمدون لدينا بروتوكولات صارمة من الإعداد إلى التسليم.', category: 'installation', popular: false },
      { question: 'هل أحتاج إلى التواجد أثناء التركيب؟', answer: 'نوصي بالتواجد للإعداد الأولي والفحص النهائي، لكن الوجود المستمر غير مطلوب.', category: 'installation', popular: false },
      { question: 'ما الإعداد المطلوب قبل التركيب؟', answer: 'مسح المنطقة حول النوافذ/الأبواب، إزالة الستائر، حماية الأثاث، ضمان وصول واضح.', category: 'installation', popular: false },
      { question: 'كيف أحافظ على نوافذي وأبوابي؟', answer: 'الصيانة المنتظمة بسيطة: نظف الإطارات والزجاج بمنظف خفيف، قم بتشحيم المفصلات والأقفال كل 6 أشهر.', category: 'maintenance', popular: true },
      { question: 'ما الذي يغطيه الضمان؟', answer: 'نقدم تغطية شاملة: ضمان المنتج 10 سنوات، ضمان الأجهزة 5 سنوات، ضمان التركيب سنتين، ضمان الزجاج سنة.', category: 'maintenance', popular: true },
      { question: 'ماذا لو كانت لدي مشكلة بعد التركيب؟', answer: 'اتصل بمركز الخدمة لدينا على الفور. معظم المشاكل مغطاة بالضمان ويتم حلها بسرعة.', category: 'maintenance', popular: false },
      { question: 'هل يمكن إصلاح النوافذ أم تحتاج إلى استبدال؟', answer: 'معظم المشاكل قابلة للإصلاح. نادرًا ما يكون الاستبدال الكامل ضروريًا.', category: 'maintenance', popular: false },
    ] as FAQItem[],
    cta: {
      title: 'ما زلت لديك أسئلة؟',
      description: 'فريقنا هنا لمساعدتك في أي أسئلة',
      button: 'اتصل بنا',
      whatsapp: 'دردش على الواتساب',
    },
  },
} as const;

/** Category icon name mappings */
export const faqCategoryIcons: Record<string, string> = {
  products: 'Package',
  services: 'Shield',
  technical: 'Settings',
  ordering: 'FileText',
  installation: 'Wrench',
  maintenance: 'Wrench',
};
