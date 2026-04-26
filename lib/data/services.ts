/**
 * lib/data/services.ts
 * Bilingual content for the Services page.
 */

export const servicesData = {
  en: {
    hero: {
      title: 'Our Services',
      subtitle: 'End-to-End Excellence',
      description: 'From initial consultation to long-term maintenance, we provide comprehensive services that ensure your complete satisfaction at every stage.',
    },
    process: {
      title: 'Building Process Lifecycle',
      subtitle: 'Your Journey with EMAAR',
      intro: "We've refined our process over 20 years to deliver exceptional results, every time. Here's what you can expect when you partner with us.",
      steps: [
        { number: '01', title: 'Initial Consultation', description: 'Free expert consultation to understand your needs, preferences, and project requirements. We discuss options, provide recommendations, and answer all your questions.', icon: 'Phone', duration: '30-60 min', deliverable: 'Project Assessment' },
        { number: '02', title: 'Site Survey & Measurements', description: 'Our technical team visits your site for precise measurements and assessment. We evaluate structural conditions, sun exposure, and installation requirements.', icon: 'Ruler', duration: '1-2 hours', deliverable: 'Technical Report' },
        { number: '03', title: 'Design & Planning', description: 'Custom design development based on your specifications. CAD drawings, material selection, and detailed quotation with transparent pricing.', icon: 'PenTool', duration: '3-5 days', deliverable: 'Design Package & Quote' },
        { number: '04', title: 'Manufacturing', description: 'Production begins in our state-of-the-art facility using German technology. Each product undergoes multi-stage quality control during manufacturing.', icon: 'Factory', duration: '2-3 weeks', deliverable: 'Quality-Certified Products' },
        { number: '05', title: 'Quality Control', description: 'Rigorous 8-point inspection process ensures every product meets our A+ standards. Testing for operation, sealing, and finish quality.', icon: 'ClipboardCheck', duration: '2-3 days', deliverable: 'QC Certificates' },
        { number: '06', title: 'Installation', description: 'Professional installation by certified technicians. Careful handling, precise fitting, and thorough sealing for optimal performance.', icon: 'Settings', duration: '1-5 days', deliverable: 'Completed Installation' },
        { number: '07', title: 'Final Inspection', description: 'Comprehensive walkthrough with you to ensure everything meets expectations. Demonstration of features and operation instructions.', icon: 'CheckCircle2', duration: '30-60 min', deliverable: 'Inspection Report' },
        { number: '08', title: 'Handover & Documentation', description: 'Complete documentation package including warranty certificates, maintenance guide, and emergency contacts. Full project closure.', icon: 'FileText', duration: '15-30 min', deliverable: 'Complete Documentation' },
      ],
    },
    maintenance: {
      title: 'Maintenance Services',
      subtitle: 'Keeping Your Investment in Perfect Condition',
      intro: 'Regular maintenance extends product life and ensures optimal performance. We offer comprehensive maintenance solutions tailored to your needs.',
      plans: [
        { name: 'Basic Care', price: 'AED 299/year', icon: 'Shield', features: ['Annual inspection', 'Hardware adjustment', 'Weather seal check', 'Cleaning & lubrication', '10% discount on repairs', 'Priority booking'], popular: false },
        { name: 'Premium Care', price: 'AED 599/year', icon: 'Award', features: ['Bi-annual inspection', 'Complete hardware service', 'Seal replacement if needed', 'Deep cleaning & treatment', '20% discount on repairs', 'Emergency call-out included', '24/7 priority support', 'Extended warranty'], popular: true },
        { name: 'Commercial Package', price: 'Custom Pricing', icon: 'Sparkles', features: ['Quarterly inspections', 'Preventive maintenance', 'Complete hardware overhaul', 'On-site spare parts', '30% discount on repairs', 'Dedicated account manager', 'Annual performance report', 'Custom SLA available'], popular: false },
      ],
      emergency: {
        title: 'Emergency Repairs',
        description: "Urgent issues? We're here to help 24/7",
        features: [
          { title: '24/7 Availability', description: 'Round-the-clock emergency response', icon: 'Clock' },
          { title: 'Rapid Response', description: 'On-site within 4 hours for emergencies', icon: 'Zap' },
          { title: 'Genuine Parts', description: 'Original manufacturer parts guarantee', icon: 'Package' },
          { title: 'Skilled Technicians', description: 'Factory-trained repair specialists', icon: 'Users' },
        ],
        contact: 'Emergency Hotline: +971 50 123 4567',
      },
    },
    warranty: {
      title: 'Warranty Information',
      subtitle: 'Industry-Leading Protection',
      intro: 'We stand behind our products with one of the most comprehensive warranties in the UAE.',
      coverage: [
        { title: '10-Year Product Warranty', description: 'Comprehensive coverage on all uPVC and aluminum profiles, including frame integrity, welding, and structural performance.', icon: 'Shield', details: ['Profile warping or distortion', 'Welding joint failure', 'Color fading (excludes natural wear)', 'Structural defects', 'Material degradation'] },
        { title: '5-Year Hardware Warranty', description: 'Full coverage on all locks, hinges, handles, and mechanical components from leading European manufacturers.', icon: 'Settings', details: ['Lock mechanism failure', 'Hinge operation issues', 'Handle breakage', 'Roller/slider malfunction', 'Weather seal deterioration'] },
        { title: '2-Year Installation Warranty', description: 'Complete protection against installation-related issues, including sealing, fixing, and water leakage problems.', icon: 'CheckCircle2', details: ['Water leakage', 'Air infiltration', 'Improper fitting', 'Seal failure', 'Installation defects'] },
        { title: '1-Year Glass Warranty', description: 'Coverage for glass units including seal failure and condensation issues (excludes accidental breakage).', icon: 'Sparkles', details: ['Internal condensation', 'Seal failure', 'Manufacturing defects', 'Coating issues', 'Double glazing failure'] },
      ],
      exclusions: {
        title: 'Warranty Exclusions',
        items: ['Damage from misuse or abuse', 'Improper maintenance or cleaning', 'Unauthorized modifications', 'Natural disasters or extreme weather', 'Normal wear and tear', 'Accidental damage or breakage'],
      },
      claim: {
        title: 'How to Make a Claim',
        steps: ['Contact our service center', 'Provide warranty certificate', 'Schedule inspection visit', 'Receive resolution within 5 business days'],
      },
    },
    timeline: {
      title: 'Service Timeline Expectations',
      subtitle: 'What to Expect and When',
      phases: [
        { phase: 'Consultation to Quote', duration: '5-7 days', description: 'From initial contact to receiving detailed quotation' },
        { phase: 'Order to Production Start', duration: '2-3 days', description: 'Order processing and material procurement' },
        { phase: 'Manufacturing', duration: '2-3 weeks', description: 'Production time for standard orders' },
        { phase: 'Delivery & Installation', duration: '1-5 days', description: 'Depending on project size and complexity' },
        { phase: 'Total Project Duration', duration: '3-5 weeks', description: 'Average end-to-end timeline for typical projects' },
      ],
      note: 'Custom designs or large commercial projects may require additional time. Rush orders available with express service fees.',
    },
    cta: [
      { title: 'Ready to Get Started?', description: 'Schedule your free consultation today', button: 'Book Consultation', link: '/contact', primary: true },
      { title: 'Need Emergency Service?', description: "We're available 24/7 for urgent repairs", button: 'Call Emergency Line', link: 'tel:+971501234567', primary: false },
    ],
  },

  ar: {
    hero: {
      title: 'خدماتنا',
      subtitle: 'التميز الشامل',
      description: 'من الاستشارة الأولية إلى الصيانة طويلة الأجل، نقدم خدمات شاملة تضمن رضاك الكامل في كل مرحلة.',
    },
    process: {
      title: 'دورة عملية البناء',
      subtitle: 'رحلتك مع إعمار',
      intro: 'لقد قمنا بتحسين عمليتنا على مدار 20 عامًا لتقديم نتائج استثنائية في كل مرة. إليك ما يمكنك توقعه عندما تصبح شريكًا معنا.',
      steps: [
        { number: '01', title: 'الاستشارة الأولية', description: 'استشارة مجانية من الخبراء لفهم احتياجاتك وتفضيلاتك ومتطلبات مشروعك. نناقش الخيارات ونقدم التوصيات ونجيب على جميع أسئلتك.', icon: 'Phone', duration: '30-60 دقيقة', deliverable: 'تقييم المشروع' },
        { number: '02', title: 'المسح الموقعي والقياسات', description: 'يزور فريقنا التقني موقعك للقياسات الدقيقة والتقييم. نقوم بتقييم الظروف الهيكلية والتعرض للشمس ومتطلبات التركيب.', icon: 'Ruler', duration: '1-2 ساعة', deliverable: 'تقرير تقني' },
        { number: '03', title: 'التصميم والتخطيط', description: 'تطوير تصميم مخصص بناءً على مواصفاتك. رسومات CAD، اختيار المواد، وعرض أسعار مفصل بأسعار شفافة.', icon: 'PenTool', duration: '3-5 أيام', deliverable: 'حزمة التصميم والعرض' },
        { number: '04', title: 'التصنيع', description: 'يبدأ الإنتاج في منشأتنا الحديثة باستخدام التكنولوجيا الألمانية. يخضع كل منتج لمراقبة جودة متعددة المراحل أثناء التصنيع.', icon: 'Factory', duration: '2-3 أسابيع', deliverable: 'منتجات معتمدة الجودة' },
        { number: '05', title: 'مراقبة الجودة', description: 'عملية فحص صارمة من 8 نقاط تضمن أن كل منتج يلبي معاييرنا A+. اختبار للتشغيل والإغلاق وجودة التشطيب.', icon: 'ClipboardCheck', duration: '2-3 أيام', deliverable: 'شهادات مراقبة الجودة' },
        { number: '06', title: 'التركيب', description: 'تركيب احترافي بواسطة فنيين معتمدين. معالجة دقيقة، تركيب دقيق، وإغلاق شامل للأداء الأمثل.', icon: 'Settings', duration: '1-5 أيام', deliverable: 'التركيب المكتمل' },
        { number: '07', title: 'الفحص النهائي', description: 'جولة شاملة معك للتأكد من أن كل شيء يلبي التوقعات. عرض توضيحي للميزات وتعليمات التشغيل.', icon: 'CheckCircle2', duration: '30-60 دقيقة', deliverable: 'تقرير الفحص' },
        { number: '08', title: 'التسليم والتوثيق', description: 'حزمة توثيق كاملة بما في ذلك شهادات الضمان ودليل الصيانة وجهات الاتصال في حالات الطوارئ. إغلاق المشروع بالكامل.', icon: 'FileText', duration: '15-30 دقيقة', deliverable: 'التوثيق الكامل' },
      ],
    },
    maintenance: {
      title: 'خدمات الصيانة',
      subtitle: 'الحفاظ على استثمارك في حالة مثالية',
      intro: 'الصيانة الدورية تطيل عمر المنتج وتضمن الأداء الأمثل. نقدم حلول صيانة شاملة مصممة خصيصًا لاحتياجاتك.',
      plans: [
        { name: 'العناية الأساسية', price: '299 درهم/سنة', icon: 'Shield', features: ['فحص سنوي', 'ضبط الأجهزة', 'فحص ختم الطقس', 'التنظيف والتشحيم', 'خصم 10% على الإصلاحات', 'الحجز ذو الأولوية'], popular: false },
        { name: 'العناية المميزة', price: '599 درهم/سنة', icon: 'Award', features: ['فحص نصف سنوي', 'خدمة الأجهزة الكاملة', 'استبدال الختم إذا لزم الأمر', 'تنظيف عميق ومعالجة', 'خصم 20% على الإصلاحات', 'الاستجابة الطارئة مشمولة', 'دعم على مدار الساعة طوال أيام الأسبوع', 'ضمان ممتد'], popular: true },
        { name: 'الحزمة التجارية', price: 'أسعار مخصصة', icon: 'Sparkles', features: ['فحوصات ربع سنوية', 'الصيانة الوقائية', 'إصلاح شامل للأجهزة', 'قطع غيار في الموقع', 'خصم 30% على الإصلاحات', 'مدير حساب مخصص', 'تقرير الأداء السنوي', 'SLA مخصص متاح'], popular: false },
      ],
      emergency: {
        title: 'الإصلاحات الطارئة',
        description: 'مشاكل عاجلة؟ نحن هنا للمساعدة على مدار الساعة طوال أيام الأسبوع',
        features: [
          { title: 'متاح 24/7', description: 'استجابة طوارئ على مدار الساعة', icon: 'Clock' },
          { title: 'استجابة سريعة', description: 'في الموقع في غضون 4 ساعات في حالات الطوارئ', icon: 'Zap' },
          { title: 'قطع أصلية', description: 'ضمان قطع الشركة المصنعة الأصلية', icon: 'Package' },
          { title: 'فنيون ماهرون', description: 'متخصصون في الإصلاح مدربون في المصنع', icon: 'Users' },
        ],
        contact: 'الخط الساخن للطوارئ: +971 50 123 4567',
      },
    },
    warranty: {
      title: 'معلومات الضمان',
      subtitle: 'حماية رائدة في الصناعة',
      intro: 'نقف وراء منتجاتنا بواحد من أشمل الضمانات في الإمارات.',
      coverage: [
        { title: 'ضمان المنتج لمدة 10 سنوات', description: 'تغطية شاملة على جميع ملفات uPVC والألومنيوم، بما في ذلك سلامة الإطار واللحام والأداء الهيكلي.', icon: 'Shield', details: ['التواء أو تشوه الملف', 'فشل وصلة اللحام', 'بهتان اللون (يستثني التآكل الطبيعي)', 'العيوب الهيكلية', 'تدهور المواد'] },
        { title: 'ضمان الأجهزة لمدة 5 سنوات', description: 'تغطية كاملة على جميع الأقفال والمفصلات والمقابض والمكونات الميكانيكية من الشركات المصنعة الأوروبية الرائدة.', icon: 'Settings', details: ['فشل آلية القفل', 'مشاكل تشغيل المفصلة', 'كسر المقبض', 'خلل البكرة/المنزلق', 'تدهور ختم الطقس'] },
        { title: 'ضمان التركيب لمدة سنتين', description: 'حماية كاملة ضد المشاكل المتعلقة بالتركيب، بما في ذلك الإغلاق والتثبيت ومشاكل تسرب المياه.', icon: 'CheckCircle2', details: ['تسرب المياه', 'تسرب الهواء', 'التركيب غير الصحيح', 'فشل الختم', 'عيوب التركيب'] },
        { title: 'ضمان الزجاج لمدة سنة واحدة', description: 'تغطية لوحدات الزجاج بما في ذلك فشل الختم ومشاكل التكثيف (يستثني الكسر العرضي).', icon: 'Sparkles', details: ['التكثيف الداخلي', 'فشل الختم', 'عيوب التصنيع', 'مشاكل الطلاء', 'فشل الزجاج المزدوج'] },
      ],
      exclusions: {
        title: 'استثناءات الضمان',
        items: ['الضرر الناتج عن سوء الاستخدام أو الإساءة', 'الصيانة أو التنظيف غير الصحيح', 'التعديلات غير المصرح بها', 'الكوارث الطبيعية أو الطقس القاسي', 'التآكل الطبيعي', 'الضرر أو الكسر العرضي'],
      },
      claim: {
        title: 'كيفية تقديم مطالبة',
        steps: ['اتصل بمركز الخدمة لدينا', 'قدم شهادة الضمان', 'جدولة زيارة التفتيش', 'احصل على الحل في غضون 5 أيام عمل'],
      },
    },
    timeline: {
      title: 'توقعات الجدول الزمني للخدمة',
      subtitle: 'ما يمكن توقعه ومتى',
      phases: [
        { phase: 'الاستشارة إلى العرض', duration: '5-7 أيام', description: 'من الاتصال الأولي إلى تلقي عرض أسعار مفصل' },
        { phase: 'الطلب إلى بداية الإنتاج', duration: '2-3 أيام', description: 'معالجة الطلب وشراء المواد' },
        { phase: 'التصنيع', duration: '2-3 أسابيع', description: 'وقت الإنتاج للطلبات القياسية' },
        { phase: 'التسليم والتركيب', duration: '1-5 أيام', description: 'حسب حجم المشروع وتعقيده' },
        { phase: 'إجمالي مدة المشروع', duration: '3-5 أسابيع', description: 'متوسط الجدول الزمني الشامل للمشاريع النموذجية' },
      ],
      note: 'قد تتطلب التصاميم المخصصة أو المشاريع التجارية الكبيرة وقتًا إضافيًا. الطلبات السريعة متاحة مع رسوم خدمة سريعة.',
    },
    cta: [
      { title: 'هل أنت مستعد للبدء؟', description: 'جدول استشارتك المجانية اليوم', button: 'احجز استشارة', link: '/contact', primary: true },
      { title: 'هل تحتاج إلى خدمة طوارئ؟', description: 'نحن متاحون على مدار الساعة طوال أيام الأسبوع للإصلاحات العاجلة', button: 'اتصل بخط الطوارئ', link: 'tel:+971501234567', primary: false },
    ],
  },
} as const;

export type ServicesData = typeof servicesData;
