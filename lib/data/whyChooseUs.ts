/**
 * lib/data/whyChooseUs.ts
 * Bilingual content for the Why Choose Us page.
 */

export const whyChooseUsData = {
  en: {
    hero: {
      title: 'Why Choose EMAAR',
      subtitle: 'The Clear Choice for Excellence',
      description: 'Discover the advantages that make us the preferred partner for architects, contractors, and homeowners across the UAE.',
    },
    valueProps: [
      { icon: 'Award', title: 'Unmatched Quality', description: 'ISO-certified manufacturing with zero-compromise standards', stat: 'A+ Rating' },
      { icon: 'Clock', title: 'On-Time Delivery', description: 'Reliable schedules you can count on', stat: '98% On-Time' },
      { icon: 'Users', title: 'Expert Team', description: '20+ years combined industry experience', stat: '50+ Specialists' },
      { icon: 'ThumbsUp', title: 'Client Satisfaction', description: 'Proven track record of happy customers', stat: '100% Satisfaction' },
    ],
    advantages: {
      title: 'Competitive Advantages',
      subtitle: 'What Sets Us Apart',
      items: [
        { icon: 'Factory', title: 'State-of-the-Art Factory', description: 'Our 15,000 sqm climate-controlled facility uses the latest European machinery and production systems. Every window and door is manufactured to precision in a dust-free environment.', benefits: ['German technology', 'Climate-controlled production', 'Quality at every step'] },
        { icon: 'Sparkles', title: 'Innovation First', description: "Dedicated R&D center constantly developing new solutions. We invest in tomorrow's technology today, ensuring you always get the most advanced products.", benefits: ['Cutting-edge designs', 'Energy-efficient solutions', 'Smart integration ready'] },
        { icon: 'Shield', title: 'Comprehensive Warranty', description: 'Industry-leading 10-year warranty on all products. We stand behind our quality with one of the most comprehensive guarantees in the market.', benefits: ['10-year coverage', '24/7 support', 'Hassle-free claims'] },
        { icon: 'Target', title: 'Custom Solutions', description: 'Every project is unique. Our engineering team works with you to create tailored solutions that perfectly match your architectural vision and functional requirements.', benefits: ['Bespoke designs', 'Technical consultancy', 'Flexible production'] },
        { icon: 'TrendingUp', title: 'Proven Track Record', description: 'Over 500 successful projects across residential, commercial, and hospitality sectors. Our portfolio speaks for itself.', benefits: ['Diverse experience', 'Complex projects', 'Satisfied clients'] },
        { icon: 'Zap', title: 'Fast Turnaround', description: 'Efficient production processes mean shorter lead times without compromising quality. From order to installation, we optimize every step.', benefits: ['Quick quotes', 'Efficient production', 'Professional installation'] },
      ],
    },
    quality: {
      title: 'Our Quality Assurance Process',
      subtitle: 'Eight Steps to Perfection',
      steps: [
        { number: '01', title: 'Material Inspection', description: 'Every raw material batch tested for compliance', icon: 'Package' },
        { number: '02', title: 'Profile Cutting', description: 'Precision cutting with ±0.5mm tolerance', icon: 'Target' },
        { number: '03', title: 'Welding & Assembly', description: 'Seamless corners with German welding technology', icon: 'Wrench' },
        { number: '04', title: 'Glazing', description: 'Professional installation of glass units', icon: 'Sparkles' },
        { number: '05', title: 'Hardware Fitting', description: 'Premium European hardware installation', icon: 'CheckCircle2' },
        { number: '06', title: 'Operation Test', description: 'Every unit tested for smooth operation', icon: 'Zap' },
        { number: '07', title: 'Final Inspection', description: 'Multi-point quality check by specialists', icon: 'Microscope' },
        { number: '08', title: 'Documentation', description: 'Complete quality certificates & warranty', icon: 'FileCheck' },
      ],
    },
    certifications: {
      title: 'Certifications & Standards',
      subtitle: 'Internationally Recognized Quality',
      intro: 'Our commitment to excellence is validated by international certifications and compliance with the highest industry standards.',
      items: [
        { name: 'ISO 9001:2015', description: 'Quality Management System certification ensuring consistent high-quality production and service delivery.', icon: 'Award', year: '2023' },
        { name: 'UAE Quality Mark', description: 'National quality certification recognizing superior standards in manufacturing and customer service.', icon: 'BadgeCheck', year: '2022' },
        { name: 'Green Building Certification', description: 'Environmental compliance certification for sustainable manufacturing practices and eco-friendly products.', icon: 'Trophy', year: '2024' },
        { name: 'CE Marking', description: 'European conformity marking indicating compliance with EU safety, health, and environmental standards.', icon: 'Shield', year: '2023' },
      ],
      standards: {
        title: 'We Exceed Industry Standards',
        items: ['Wind resistance: Up to 2400 Pa', 'Water tightness: Class E1200', 'Air permeability: Class A4', 'Thermal performance: U-value as low as 1.0 W/m²K', 'Sound insulation: Up to 45 dB reduction', 'UV resistance: 99% protection'],
      },
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Real Experiences, Real Results',
      items: [
        { name: 'Ahmed Al-Rashid', role: 'Senior Architect, Dubai Design Studio', text: 'EMAAR has been our go-to partner for premium residential projects. Their attention to detail and commitment to deadlines is unmatched in the industry.', rating: 5, project: 'Palm Residences Tower' },
        { name: 'Sarah Mitchell', role: 'Project Manager, BuildCo Construction', text: 'Working with EMAAR transformed our approach to windows and doors. The quality is exceptional, and their technical support team is always responsive.', rating: 5, project: 'Marina Bay Complex' },
        { name: 'Mohammed Hassan', role: 'Homeowner, Dubai Marina', text: "From consultation to installation, the entire experience was seamless. The uPVC windows have made a noticeable difference in our home's comfort and energy bills.", rating: 5, project: 'Private Villa Renovation' },
        { name: 'Jennifer Wong', role: 'Interior Designer, Luxury Spaces', text: 'The custom solutions EMAAR provides allow us to bring our most ambitious designs to life. Their engineering team truly understands architectural vision.', rating: 5, project: 'Boutique Hotel Project' },
      ],
    },
    comparison: {
      title: 'EMAAR vs Industry Average',
      items: [
        { metric: 'Product Warranty', emaar: '10 Years', industry: '2-5 Years', icon: 'Shield' },
        { metric: 'Lead Time', emaar: '2-3 Weeks', industry: '4-6 Weeks', icon: 'Clock' },
        { metric: 'On-Time Delivery', emaar: '98%', industry: '75%', icon: 'CheckCircle2' },
        { metric: 'Client Satisfaction', emaar: '100%', industry: '85%', icon: 'ThumbsUp' },
        { metric: 'Custom Options', emaar: 'Unlimited', industry: 'Limited', icon: 'Sparkles' },
        { metric: 'Quality Rating', emaar: 'A+', industry: 'B+', icon: 'Award' },
      ],
    },
    cta: {
      title: 'Experience the EMAAR Advantage',
      description: 'Join hundreds of satisfied clients who chose excellence',
      button: 'Request Your Quote',
      secondary: 'Learn About Our Story',
    },
  },

  ar: {
    hero: {
      title: 'لماذا تختار إعمار',
      subtitle: 'الخيار الواضح للتميز',
      description: 'اكتشف المزايا التي تجعلنا الشريك المفضل للمهندسين المعماريين والمقاولين وأصحاب المنازل في جميع أنحاء الإمارات.',
    },
    valueProps: [
      { icon: 'Award', title: 'جودة لا مثيل لها', description: 'تصنيع معتمد ISO بمعايير لا تقبل التنازل', stat: 'تصنيف A+' },
      { icon: 'Clock', title: 'تسليم في الوقت المحدد', description: 'جداول زمنية موثوقة يمكنك الاعتماد عليها', stat: '98% في الموعد' },
      { icon: 'Users', title: 'فريق خبراء', description: 'أكثر من 20 عامًا من الخبرة الصناعية المجمعة', stat: '50+ متخصص' },
      { icon: 'ThumbsUp', title: 'رضا العملاء', description: 'سجل حافل من العملاء السعداء', stat: '100% رضا' },
    ],
    advantages: {
      title: 'المزايا التنافسية',
      subtitle: 'ما يميزنا',
      items: [
        { icon: 'Factory', title: 'مصنع حديث', description: 'منشأتنا البالغة 15,000 متر مربع مكيفة الهواء تستخدم أحدث الآلات وأنظمة الإنتاج الأوروبية. يتم تصنيع كل نافذة وباب بدقة في بيئة خالية من الغبار.', benefits: ['تكنولوجيا ألمانية', 'إنتاج مكيف', 'جودة في كل خطوة'] },
        { icon: 'Sparkles', title: 'الابتكار أولاً', description: 'مركز بحث وتطوير مخصص يطور باستمرار حلولاً جديدة. نستثمر في تكنولوجيا الغد اليوم، مما يضمن حصولك دائمًا على المنتجات الأكثر تقدمًا.', benefits: ['تصاميم متطورة', 'حلول موفرة للطاقة', 'جاهزة للتكامل الذكي'] },
        { icon: 'Shield', title: 'ضمان شامل', description: 'ضمان رائد في الصناعة لمدة 10 سنوات على جميع المنتجات. نحن نقف وراء جودتنا مع واحدة من أشمل الضمانات في السوق.', benefits: ['تغطية 10 سنوات', 'دعم 24/7', 'مطالبات خالية من المتاعب'] },
        { icon: 'Target', title: 'حلول مخصصة', description: 'كل مشروع فريد. يعمل فريق الهندسة لدينا معك لإنشاء حلول مخصصة تتطابق تمامًا مع رؤيتك المعمارية ومتطلباتك الوظيفية.', benefits: ['تصاميم مخصصة', 'استشارات تقنية', 'إنتاج مرن'] },
        { icon: 'TrendingUp', title: 'سجل حافل', description: 'أكثر من 500 مشروع ناجح عبر القطاعات السكنية والتجارية والضيافة. محفظتنا تتحدث عن نفسها.', benefits: ['خبرة متنوعة', 'مشاريع معقدة', 'عملاء راضون'] },
        { icon: 'Zap', title: 'تنفيذ سريع', description: 'عمليات إنتاج فعالة تعني أوقات تسليم أقصر دون المساس بالجودة. من الطلب إلى التركيب، نحن نحسن كل خطوة.', benefits: ['عروض أسعار سريعة', 'إنتاج فعال', 'تركيب احترافي'] },
      ],
    },
    quality: {
      title: 'عملية ضمان الجودة لدينا',
      subtitle: 'ثماني خطوات للكمال',
      steps: [
        { number: '01', title: 'فحص المواد', description: 'اختبار كل دفعة من المواد الخام للامتثال', icon: 'Package' },
        { number: '02', title: 'قص الملف', description: 'قطع دقيق مع تفاوت ±0.5 مم', icon: 'Target' },
        { number: '03', title: 'اللحام والتجميع', description: 'زوايا سلسة مع تكنولوجيا اللحام الألمانية', icon: 'Wrench' },
        { number: '04', title: 'التزجيج', description: 'تركيب احترافي لوحدات الزجاج', icon: 'Sparkles' },
        { number: '05', title: 'تركيب الأجهزة', description: 'تركيب أجهزة أوروبية متميزة', icon: 'CheckCircle2' },
        { number: '06', title: 'اختبار التشغيل', description: 'اختبار كل وحدة للتشغيل السلس', icon: 'Zap' },
        { number: '07', title: 'الفحص النهائي', description: 'فحص جودة متعدد النقاط من قبل المتخصصين', icon: 'Microscope' },
        { number: '08', title: 'التوثيق', description: 'شهادات جودة كاملة وضمان', icon: 'FileCheck' },
      ],
    },
    certifications: {
      title: 'الشهادات والمعايير',
      subtitle: 'جودة معترف بها دوليًا',
      intro: 'التزامنا بالتميز مُصادق عليه من خلال الشهادات الدولية والامتثال لأعلى معايير الصناعة.',
      items: [
        { name: 'ISO 9001:2015', description: 'شهادة نظام إدارة الجودة التي تضمن إنتاجًا عالي الجودة وتقديم خدمات متسق.', icon: 'Award', year: '2023' },
        { name: 'علامة الجودة الإماراتية', description: 'شهادة الجودة الوطنية المعترف بها لمعايير متفوقة في التصنيع وخدمة العملاء.', icon: 'BadgeCheck', year: '2022' },
        { name: 'شهادة البناء الأخضر', description: 'شهادة الامتثال البيئي لممارسات التصنيع المستدامة والمنتجات الصديقة للبيئة.', icon: 'Trophy', year: '2024' },
        { name: 'علامة CE', description: 'علامة المطابقة الأوروبية التي تشير إلى الامتثال لمعايير السلامة والصحة والبيئة في الاتحاد الأوروبي.', icon: 'Shield', year: '2023' },
      ],
      standards: {
        title: 'نتجاوز معايير الصناعة',
        items: ['مقاومة الرياح: حتى 2400 باسكال', 'إحكام الماء: الفئة E1200', 'نفاذية الهواء: الفئة A4', 'الأداء الحراري: قيمة U منخفضة تصل إلى 1.0 W/m²K', 'عزل الصوت: تقليل حتى 45 ديسيبل', 'مقاومة الأشعة فوق البنفسجية: حماية 99%'],
      },
    },
    testimonials: {
      title: 'ماذا يقول عملاؤنا',
      subtitle: 'تجارب حقيقية، نتائج حقيقية',
      items: [
        { name: 'أحمد الراشد', role: 'مهندس معماري أول، استوديو دبي للتصميم', text: 'كانت إعمار شريكنا المفضل للمشاريع السكنية الراقية. اهتمامهم بالتفاصيل والتزامهم بالمواعيد لا مثيل له في الصناعة.', rating: 5, project: 'برج مساكن النخلة' },
        { name: 'سارة ميتشيل', role: 'مدير مشروع، بيلد كو للإنشاءات', text: 'العمل مع إعمار غيّر نهجنا في النوافذ والأبواب. الجودة استثنائية، وفريق الدعم الفني لديهم دائمًا متجاوب.', rating: 5, project: 'مجمع خليج المارينا' },
        { name: 'محمد حسن', role: 'مالك منزل، دبي مارينا', text: 'من الاستشارة إلى التركيب، كانت التجربة بأكملها سلسة. نوافذ uPVC أحدثت فرقًا ملحوظًا في راحة منزلنا وفواتير الطاقة.', rating: 5, project: 'تجديد فيلا خاصة' },
        { name: 'جينيفر وونج', role: 'مصمم داخلي، لاكشري سبيسز', text: 'الحلول المخصصة التي توفرها إعمار تسمح لنا بإحياء تصميماتنا الأكثر طموحًا. فريق الهندسة لديهم يفهم حقًا الرؤية المعمارية.', rating: 5, project: 'مشروع فندق بوتيك' },
      ],
    },
    comparison: {
      title: 'إعمار مقابل متوسط الصناعة',
      items: [
        { metric: 'ضمان المنتج', emaar: '10 سنوات', industry: '2-5 سنوات', icon: 'Shield' },
        { metric: 'وقت التسليم', emaar: '2-3 أسابيع', industry: '4-6 أسابيع', icon: 'Clock' },
        { metric: 'التسليم في الموعد', emaar: '98%', industry: '75%', icon: 'CheckCircle2' },
        { metric: 'رضا العملاء', emaar: '100%', industry: '85%', icon: 'ThumbsUp' },
        { metric: 'خيارات مخصصة', emaar: 'غير محدود', industry: 'محدود', icon: 'Sparkles' },
        { metric: 'تصنيف الجودة', emaar: 'A+', industry: 'B+', icon: 'Award' },
      ],
    },
    cta: {
      title: 'جرب ميزة إعمار',
      description: 'انضم إلى مئات العملاء الراضين الذين اختاروا التميز',
      button: 'اطلب عرض السعر الخاص بك',
      secondary: 'تعرف على قصتنا',
    },
  },
} as const;

export type WhyChooseUsData = typeof whyChooseUsData;
