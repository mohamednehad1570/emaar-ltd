/**
 * lib/data/about.ts
 * Bilingual content for the About page.
 * Icons are stored as string keys — use resolveIcon() from lib/iconMap.ts.
 */

export const aboutData = {
  en: {
    hero: {
      title: 'About EMAAR',
      subtitle: 'Building Excellence Since 2004',
      description:
        'Two decades of innovation, craftsmanship, and unwavering commitment to quality in the UAE construction industry.',
    },
    stats: [
      { number: '20+', label: 'Years Experience', icon: 'Calendar' },
      { number: '500+', label: 'Projects Completed', icon: 'CheckCircle2' },
      { number: '50K+', label: 'SQM Installed', icon: 'Factory' },
      { number: '100%', label: 'Client Satisfaction', icon: 'Award' },
    ],
    story: {
      title: 'Our Story',
      intro:
        'Founded in 2004, EMAAR International Industry LLC emerged with a clear vision: to revolutionize the windows and doors industry in the United Arab Emirates.',
      body1:
        'What began as a modest operation has grown into one of the most trusted names in premium uPVC and aluminum solutions. Our journey has been marked by continuous innovation, unwavering quality standards, and an uncompromising commitment to customer satisfaction.',
      body2:
        "Today, we stand proud as industry leaders, combining German engineering precision with deep understanding of the UAE climate and architectural requirements. Our state-of-the-art manufacturing facility employs the latest technology to deliver products that exceed international standards.",
      cta: "Discover Why We're Different",
    },
    timeline: {
      title: 'Our Journey',
      subtitle: 'Milestones That Define Us',
      events: [
        {
          year: 2004,
          title: 'Foundation',
          description: 'EMAAR International established with a vision to transform the industry',
          icon: 'Sparkles',
        },
        {
          year: 2008,
          title: 'Factory Expansion',
          description: 'Opened our state-of-the-art 15,000 sqm manufacturing facility',
          icon: 'Factory',
        },
        {
          year: 2012,
          title: 'ISO Certification',
          description: 'Achieved ISO 9001:2015 quality management certification',
          icon: 'Award',
        },
        {
          year: 2016,
          title: '10th Anniversary',
          description: 'Celebrated 10 years of excellence with 250+ completed projects',
          icon: 'TrendingUp',
        },
        {
          year: 2020,
          title: 'Innovation Hub',
          description: 'Launched R&D center for cutting-edge product development',
          icon: 'Target',
        },
        {
          year: 2024,
          title: 'Regional Leader',
          description: "Recognized as UAE's premier uPVC & aluminum solutions provider",
          icon: 'Trophy',
        },
      ],
    },
    mission: {
      title: 'Mission & Vision',
      mission: {
        title: 'Our Mission',
        text: 'To deliver world-class uPVC and aluminum solutions that enhance living and working spaces while setting new benchmarks for quality, innovation, and customer service in the UAE.',
        icon: 'Target',
      },
      vision: {
        title: 'Our Vision',
        text: 'To be the most trusted and innovative provider of architectural solutions in the region, recognized for excellence, sustainability, and transforming the built environment.',
        icon: 'Eye',
      },
    },
    team: {
      title: 'Game Changers',
      subtitle: 'Meet the Leaders Behind Our Success',
      members: [
        {
          name: 'Ahmed Al Mansoori',
          title: 'Chief Executive Officer',
          bio: "20+ years experience in construction industry. Visionary leader driving EMAAR's strategic growth.",
          image:
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
        },
        {
          name: 'Sarah Williams',
          title: 'Chief Operations Officer',
          bio: 'Expert in manufacturing excellence. Ensures every product meets our rigorous quality standards.',
          image:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
        },
        {
          name: 'Mohammed Hassan',
          title: 'Technical Director',
          bio: 'Engineering specialist with German manufacturing expertise. Pioneer of our innovation initiatives.',
          image:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        },
        {
          name: 'Lisa Chen',
          title: 'Design Director',
          bio: 'Award-winning architect bringing cutting-edge design thinking to every project.',
          image:
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
        },
      ],
    },
    factory: {
      title: 'Our Manufacturing Excellence',
      subtitle: 'Where Precision Meets Innovation',
      features: [
        { title: 'State-of-the-Art Facility', description: '15,000 sqm climate-controlled manufacturing space', icon: 'Factory' },
        { title: 'German Technology', description: 'Latest European machinery and production systems', icon: 'Globe' },
        { title: 'Quality Control', description: 'Multi-stage inspection ensuring zero defects', icon: 'Shield' },
        { title: 'Production Capacity', description: '10,000+ windows & doors monthly output', icon: 'TrendingUp' },
      ],
    },
    values: {
      title: 'Our Core Values',
      subtitle: 'The Principles That Guide Us',
      items: [
        { title: 'Excellence', description: 'We never compromise on quality. Every product reflects our commitment to perfection.', icon: 'Award' },
        { title: 'Innovation', description: 'Continuously evolving with technology to deliver cutting-edge solutions.', icon: 'Sparkles' },
        { title: 'Integrity', description: 'Transparent, honest, and ethical in all our business relationships.', icon: 'Shield' },
        { title: 'Customer Focus', description: 'Your satisfaction drives everything we do. Your success is our success.', icon: 'Heart' },
        { title: 'Teamwork', description: 'Collaboration and respect fuel our collective achievements.', icon: 'Users' },
        { title: 'Sustainability', description: 'Responsible manufacturing with minimal environmental impact.', icon: 'Globe' },
      ],
    },
    awards: {
      title: 'Awards & Recognition',
      items: [
        { name: 'ISO 9001:2015', year: '2023', icon: 'Award' },
        { name: 'UAE Quality Mark', year: '2022', icon: 'Award' },
        { name: 'Best Manufacturer Award', year: '2023', icon: 'Award' },
        { name: 'Green Building Certified', year: '2024', icon: 'Award' },
        { name: 'Excellence in Innovation', year: '2024', icon: 'Award' },
        { name: 'Customer Service Award', year: '2023', icon: 'Award' },
      ],
    },
    cta: {
      title: 'Ready to Experience the EMAAR Difference?',
      description: 'Discover why leading architects, contractors, and homeowners choose us',
      button: 'Explore Why Choose Us',
      secondary: 'View Our Projects',
    },
  },

  ar: {
    hero: {
      title: 'عن إعمار',
      subtitle: 'نبني التميز منذ 2004',
      description:
        'عقدان من الابتكار والحرفية والالتزام الثابت بالجودة في صناعة البناء في الإمارات.',
    },
    stats: [
      { number: '20+', label: 'سنة خبرة', icon: 'Calendar' },
      { number: '500+', label: 'مشروع مكتمل', icon: 'CheckCircle2' },
      { number: '50K+', label: 'متر مربع تم تركيبه', icon: 'Factory' },
      { number: '100%', label: 'رضا العملاء', icon: 'Award' },
    ],
    story: {
      title: 'قصتنا',
      intro:
        'تأسست شركة إعمار الدولية للصناعة ذ.م.م في عام 2004 برؤية واضحة: إحداث ثورة في صناعة النوافذ والأبواب في دولة الإمارات العربية المتحدة.',
      body1:
        'ما بدأ كعملية متواضعة نما ليصبح واحدًا من أكثر الأسماء الموثوقة في حلول uPVC والألومنيوم المتميزة. تميزت رحلتنا بالابتكار المستمر ومعايير الجودة الثابتة والالتزام الذي لا يتزعزع برضا العملاء.',
      body2:
        'اليوم، نقف فخورين كقادة الصناعة، حيث نجمع بين دقة الهندسة الألمانية والفهم العميق لمناخ الإمارات والمتطلبات المعمارية. تستخدم منشأتنا التصنيعية الحديثة أحدث التقنيات لتقديم منتجات تتجاوز المعايير الدولية.',
      cta: 'اكتشف لماذا نحن مختلفون',
    },
    timeline: {
      title: 'رحلتنا',
      subtitle: 'المعالم التي تحددنا',
      events: [
        { year: 2004, title: 'التأسيس', description: 'تأسست إعمار الدولية برؤية لتحويل الصناعة', icon: 'Sparkles' },
        { year: 2008, title: 'توسع المصنع', description: 'افتتاح منشأة التصنيع الحديثة بمساحة 15,000 متر مربع', icon: 'Factory' },
        { year: 2012, title: 'شهادة ISO', description: 'حصلنا على شهادة إدارة الجودة ISO 9001:2015', icon: 'Award' },
        { year: 2016, title: 'الذكرى العاشرة', description: 'احتفلنا بـ 10 سنوات من التميز مع أكثر من 250 مشروعًا مكتملًا', icon: 'TrendingUp' },
        { year: 2020, title: 'مركز الابتكار', description: 'إطلاق مركز البحث والتطوير لتطوير المنتجات المتطورة', icon: 'Target' },
        { year: 2024, title: 'رائد إقليمي', description: 'معترف به كمزود رئيسي لحلول uPVC والألومنيوم في الإمارات', icon: 'Trophy' },
      ],
    },
    mission: {
      title: 'المهمة والرؤية',
      mission: { title: 'مهمتنا', text: 'تقديم حلول uPVC والألومنيوم عالمية المستوى التي تعزز مساحات المعيشة والعمل مع وضع معايير جديدة للجودة والابتكار وخدمة العملاء في الإمارات.', icon: 'Target' },
      vision: { title: 'رؤيتنا', text: 'أن نكون المزود الأكثر ثقة وابتكارًا للحلول المعمارية في المنطقة، معترف بها للتميز والاستدامة وتحويل البيئة المبنية.', icon: 'Eye' },
    },
    team: {
      title: 'صناع التغيير',
      subtitle: 'تعرف على القادة وراء نجاحنا',
      members: [
        { name: 'أحمد المنصوري', title: 'الرئيس التنفيذي', bio: 'أكثر من 20 عامًا من الخبرة في صناعة البناء. قائد صاحب رؤية يقود النمو الاستراتيجي لإعمار.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
        { name: 'سارة ويليامز', title: 'مدير العمليات التنفيذي', bio: 'خبيرة في التميز التصنيعي. تضمن أن كل منتج يلبي معايير الجودة الصارمة لدينا.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' },
        { name: 'محمد حسن', title: 'المدير التقني', bio: 'متخصص هندسي بخبرة التصنيع الألمانية. رائد مبادرات الابتكار لدينا.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
        { name: 'ليزا تشين', title: 'مدير التصميم', bio: 'مهندسة معمارية حائزة على جوائز تجلب تفكير التصميم المتطور لكل مشروع.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' },
      ],
    },
    factory: {
      title: 'تميزنا التصنيعي',
      subtitle: 'حيث تلتقي الدقة بالابتكار',
      features: [
        { title: 'منشأة حديثة', description: 'مساحة تصنيع 15,000 متر مربع مكيفة', icon: 'Factory' },
        { title: 'تكنولوجيا ألمانية', description: 'أحدث الآلات وأنظمة الإنتاج الأوروبية', icon: 'Globe' },
        { title: 'مراقبة الجودة', description: 'فحص متعدد المراحل يضمن عدم وجود عيوب', icon: 'Shield' },
        { title: 'القدرة الإنتاجية', description: 'إنتاج شهري يزيد عن 10,000 نافذة وباب', icon: 'TrendingUp' },
      ],
    },
    values: {
      title: 'قيمنا الأساسية',
      subtitle: 'المبادئ التي توجهنا',
      items: [
        { title: 'التميز', description: 'لا نتنازل أبدًا عن الجودة. كل منتج يعكس التزامنا بالكمال.', icon: 'Award' },
        { title: 'الابتكار', description: 'التطور المستمر مع التكنولوجيا لتقديم حلول متطورة.', icon: 'Sparkles' },
        { title: 'النزاهة', description: 'شفافون وصادقون وأخلاقيون في جميع علاقاتنا التجارية.', icon: 'Shield' },
        { title: 'التركيز على العملاء', description: 'رضاك يدفع كل ما نفعله. نجاحك هو نجاحنا.', icon: 'Heart' },
        { title: 'العمل الجماعي', description: 'التعاون والاحترام يغذيان إنجازاتنا الجماعية.', icon: 'Users' },
        { title: 'الاستدامة', description: 'تصنيع مسؤول بأقل تأثير بيئي.', icon: 'Globe' },
      ],
    },
    awards: {
      title: 'الجوائز والتقدير',
      items: [
        { name: 'ISO 9001:2015', year: '2023', icon: 'Award' },
        { name: 'علامة الجودة الإماراتية', year: '2022', icon: 'Award' },
        { name: 'جائزة أفضل مصنّع', year: '2023', icon: 'Award' },
        { name: 'شهادة البناء الأخضر', year: '2024', icon: 'Award' },
        { name: 'التميز في الابتكار', year: '2024', icon: 'Award' },
        { name: 'جائزة خدمة العملاء', year: '2023', icon: 'Award' },
      ],
    },
    cta: {
      title: 'هل أنت مستعد لتجربة فرق إعمار؟',
      description: 'اكتشف لماذا يختارنا كبار المهندسين المعماريين والمقاولين وأصحاب المنازل',
      button: 'اكتشف لماذا نحن',
      secondary: 'شاهد مشاريعنا',
    },
  },
} as const;

export type AboutData = typeof aboutData;
export type AboutLang = typeof aboutData.en;
