// lib/data/careers.ts – Bilingual content for the Careers page.
// Icons are referenced by string name, resolved via resolveIcon.

export interface CareersJob {
  id: number; title: string; department: string; location: string;
  type: string; experience: string; salary: string; description: string;
  responsibilities: string[]; requirements: string[]; benefits: string[];
}

export interface CareersContent {
  hero: { title: string; subtitle: string; description: string };
  culture: {
    title: string; subtitle: string;
    values: { icon: string; title: string; description: string }[];
    stats: { number: string; label: string }[];
  };
  filters: Record<string, string>;
  jobs: CareersJob[];
  application: {
    title: string; subtitle: string; email: string;
    fields: Record<string, string>;
    button: string; sending: string; success: string;
  };
  cta: { title: string; description: string; button: string };
}

export const careersData: Record<'en' | 'ar', CareersContent> = {
  en: {
    hero: { title: 'Join Our Team', subtitle: 'Build Your Career with EMAAR', description: 'Be part of a dynamic team shaping the future of windows and doors manufacturing in the UAE' },
    culture: {
      title: 'Why Work with Us', subtitle: 'Experience a workplace that values excellence, innovation, and growth',
      values: [
        { icon: 'Heart', title: 'People First', description: "We invest in our employees' growth and wellbeing" },
        { icon: 'TrendingUp', title: 'Career Growth', description: 'Clear paths for advancement and skill development' },
        { icon: 'Award', title: 'Recognition', description: 'Performance-based rewards and acknowledgment' },
        { icon: 'Clock', title: 'Work-Life Balance', description: 'Flexible schedules and supportive environment' },
        { icon: 'Users', title: 'Collaborative', description: 'Teamwork and open communication culture' },
        { icon: 'Zap', title: 'Innovation', description: 'Encouraged to bring new ideas and solutions' },
      ],
      stats: [
        { number: '50+', label: 'Team Members' }, { number: '20+', label: 'Years Experience' },
        { number: '95%', label: 'Employee Satisfaction' }, { number: '15+', label: 'Nationalities' },
      ],
    },
    filters: { all: 'All Positions', engineering: 'Engineering', production: 'Production', sales: 'Sales & Marketing', admin: 'Administration' },
    jobs: [
      { id: 1, title: 'Senior Production Manager', department: 'Production', location: 'Dubai', type: 'Full-time', experience: '7+ years', salary: 'AED 15,000 - 20,000', description: 'Lead our manufacturing operations, ensuring quality, efficiency, and on-time delivery of all products.', responsibilities: ['Oversee daily production operations and workflow','Manage production team of 30+ employees','Implement quality control procedures','Optimize manufacturing processes for efficiency','Coordinate with engineering and sales departments','Ensure compliance with safety regulations'], requirements: ["Bachelor's degree in Engineering or related field",'7+ years in production management','Experience with uPVC/aluminum manufacturing','Strong leadership and communication skills','Knowledge of quality management systems','Fluent in English; Arabic is a plus'], benefits: ['Competitive salary package','Health insurance for family','Annual performance bonus','30 days annual leave','Professional development opportunities','Company vehicle'] },
      { id: 2, title: 'Sales Engineer', department: 'Sales', location: 'Dubai / Abu Dhabi', type: 'Full-time', experience: '3-5 years', salary: 'AED 8,000 - 12,000 + Commission', description: 'Drive sales growth by providing technical solutions to clients and building lasting relationships.', responsibilities: ['Generate new business opportunities','Provide technical consultations to clients','Prepare quotes and proposals','Conduct site surveys and measurements','Manage client relationships','Achieve monthly and quarterly sales targets'], requirements: ['Engineering degree (Civil, Mechanical preferred)','3-5 years in technical sales','Knowledge of windows/doors industry','Excellent presentation skills','Valid UAE driving license','Bilingual (English & Arabic)'], benefits: ['Base salary + attractive commission','Health insurance','Company car and mobile','Performance bonuses','Travel allowances','Career progression opportunities'] },
      { id: 3, title: 'Quality Control Inspector', department: 'Production', location: 'Dubai', type: 'Full-time', experience: '2-4 years', salary: 'AED 5,000 - 7,000', description: 'Ensure all products meet our high-quality standards through rigorous inspection and testing.', responsibilities: ['Inspect raw materials and finished products','Conduct dimensional and functional tests','Document quality issues and non-conformances','Maintain quality records and reports','Coordinate with production team on quality matters','Implement quality improvement initiatives'], requirements: ['Technical diploma or degree','2-4 years in quality control','Knowledge of measurement tools','Attention to detail','Basic computer skills','English language proficiency'], benefits: ['Competitive salary','Health insurance','Annual bonus','Training programs','22 days annual leave','End of service benefits'] },
      { id: 4, title: 'Design Engineer', department: 'Engineering', location: 'Dubai', type: 'Full-time', experience: '3-5 years', salary: 'AED 9,000 - 13,000', description: 'Create innovative designs for windows, doors, and facade systems using CAD software.', responsibilities: ['Design custom window and door systems','Prepare technical drawings and specifications','Collaborate with sales on client requirements','Calculate structural loads and material requirements','Review shop drawings for accuracy','Support production with technical guidance'], requirements: ['Degree in Mechanical/Civil Engineering','3-5 years design experience','Proficient in AutoCAD and 3D modeling','Knowledge of building codes and standards','Strong problem-solving skills','English fluency required'], benefits: ['Attractive salary package','Medical insurance','Annual performance review','Latest design software','Professional development','Collaborative work environment'] },
      { id: 5, title: 'Marketing Specialist', department: 'Sales', location: 'Dubai', type: 'Full-time', experience: '2-4 years', salary: 'AED 7,000 - 10,000', description: 'Develop and execute marketing strategies to increase brand awareness and generate leads.', responsibilities: ['Plan and implement marketing campaigns','Manage social media channels','Create content for digital platforms','Organize events and exhibitions','Track and analyze campaign performance','Coordinate with design team on materials'], requirements: ["Bachelor's in Marketing or related field",'2-4 years marketing experience','Digital marketing expertise','Strong written and verbal communication','Creative thinking','Bilingual (English & Arabic preferred)'], benefits: ['Competitive compensation','Health insurance','Creative work environment','Performance incentives','Professional training','Work-life balance'] },
      { id: 6, title: 'Installation Supervisor', department: 'Production', location: 'Dubai / Sharjah', type: 'Full-time', experience: '5+ years', salary: 'AED 6,000 - 9,000', description: 'Supervise installation teams to ensure quality workmanship and customer satisfaction.', responsibilities: ['Lead installation teams on-site','Ensure quality installation standards','Coordinate with project managers','Train and mentor installation technicians','Conduct site safety inspections','Handle customer queries on-site'], requirements: ['Technical certification or equivalent','5+ years installation experience','Expertise in window/door installation','Strong leadership skills','Valid UAE driving license','Good communication in English & Arabic'], benefits: ['Competitive salary','Transportation provided','Medical insurance','Overtime compensation','Annual leave','Stable employment'] },
    ],
    application: { title: 'Apply for this Position', subtitle: 'Fill out the form below or send your CV to', email: 'careers@emaar-international.ae', fields: { name: 'Full Name', email: 'Email Address', phone: 'Phone Number', position: 'Position Applied For', experience: 'Years of Experience', cv: 'Upload CV/Resume', coverLetter: 'Cover Letter', coverLetterPlaceholder: "Tell us why you're the perfect fit for this role..." }, button: 'Submit Application', sending: 'Sending...', success: "Application submitted successfully! We'll review your profile and contact you soon." },
    cta: { title: "Don't See Your Role?", description: "Send us your CV and we'll keep you in mind for future openings", button: 'Send General Application' },
  },
  ar: {
    hero: { title: 'انضم إلى فريقنا', subtitle: 'ابنِ مستقبلك المهني مع إعمار', description: 'كن جزءًا من فريق ديناميكي يشكل مستقبل تصنيع النوافذ والأبواب في الإمارات' },
    culture: {
      title: 'لماذا تعمل معنا', subtitle: 'اختبر بيئة عمل تقدر التميز والابتكار والنمو',
      values: [
        { icon: 'Heart', title: 'الأفراد أولاً', description: 'نستثمر في نمو ورفاهية موظفينا' },
        { icon: 'TrendingUp', title: 'النمو الوظيفي', description: 'مسارات واضحة للتقدم وتطوير المهارات' },
        { icon: 'Award', title: 'التقدير', description: 'مكافآت واعتراف بناءً على الأداء' },
        { icon: 'Clock', title: 'توازن العمل والحياة', description: 'جداول مرنة وبيئة داعمة' },
        { icon: 'Users', title: 'تعاوني', description: 'ثقافة العمل الجماعي والتواصل المفتوح' },
        { icon: 'Zap', title: 'الابتكار', description: 'تشجيع طرح أفكار وحلول جديدة' },
      ],
      stats: [
        { number: '50+', label: 'عضو في الفريق' }, { number: '20+', label: 'سنة خبرة' },
        { number: '95%', label: 'رضا الموظفين' }, { number: '15+', label: 'جنسية' },
      ],
    },
    filters: { all: 'جميع الوظائف', engineering: 'الهندسة', production: 'الإنتاج', sales: 'المبيعات والتسويق', admin: 'الإدارة' },
    jobs: [
      { id: 1, title: 'مدير إنتاج أول', department: 'الإنتاج', location: 'دبي', type: 'دوام كامل', experience: '7+ سنوات', salary: '15,000 - 20,000 درهم', description: 'قيادة عمليات التصنيع لدينا، وضمان الجودة والكفاءة والتسليم في الوقت المحدد لجميع المنتجات.', responsibilities: ['الإشراف على عمليات الإنتاج اليومية وسير العمل','إدارة فريق إنتاج من 30+ موظف','تنفيذ إجراءات مراقبة الجودة','تحسين عمليات التصنيع للكفاءة','التنسيق مع أقسام الهندسة والمبيعات','ضمان الامتثال للوائح السلامة'], requirements: ['درجة البكالوريوس في الهندسة أو مجال ذي صلة','7+ سنوات في إدارة الإنتاج','خبرة في تصنيع uPVC/الألومنيوم','مهارات قيادية وتواصل قوية','معرفة بأنظمة إدارة الجودة','إجادة الإنجليزية؛ العربية ميزة إضافية'], benefits: ['حزمة راتب تنافسية','تأمين صحي للعائلة','مكافأة أداء سنوية','30 يوم إجازة سنوية','فرص تطوير مهني','سيارة الشركة'] },
      { id: 2, title: 'مهندس مبيعات', department: 'المبيعات', location: 'دبي / أبوظبي', type: 'دوام كامل', experience: '3-5 سنوات', salary: '8,000 - 12,000 درهم + عمولة', description: 'دفع نمو المبيعات من خلال توفير حلول تقنية للعملاء وبناء علاقات دائمة.', responsibilities: ['توليد فرص عمل جديدة','تقديم استشارات تقنية للعملاء','إعداد عروض الأسعار والمقترحات','إجراء مسوحات وقياسات الموقع','إدارة علاقات العملاء','تحقيق أهداف المبيعات الشهرية والربع سنوية'], requirements: ['شهادة هندسة (مدني، ميكانيكي مفضل)','3-5 سنوات في المبيعات التقنية','معرفة بصناعة النوافذ/الأبواب','مهارات عرض ممتازة','رخصة قيادة إماراتية سارية','ثنائي اللغة (الإنجليزية والعربية)'], benefits: ['راتب أساسي + عمولة جذابة','تأمين صحي','سيارة وهاتف الشركة','مكافآت الأداء','بدلات السفر','فرص التقدم الوظيفي'] },
      { id: 3, title: 'مفتش مراقبة الجودة', department: 'الإنتاج', location: 'دبي', type: 'دوام كامل', experience: '2-4 سنوات', salary: '5,000 - 7,000 درهم', description: 'التأكد من أن جميع المنتجات تلبي معايير الجودة العالية لدينا من خلال الفحص والاختبار الصارم.', responsibilities: ['فحص المواد الخام والمنتجات النهائية','إجراء الاختبارات البعدية والوظيفية','توثيق مشاكل الجودة وعدم المطابقة','الاحتفاظ بسجلات وتقارير الجودة','التنسيق مع فريق الإنتاج بشأن مسائل الجودة','تنفيذ مبادرات تحسين الجودة'], requirements: ['دبلوم تقني أو درجة','2-4 سنوات في مراقبة الجودة','معرفة بأدوات القياس','الاهتمام بالتفاصيل','مهارات كمبيوتر أساسية','إجادة اللغة الإنجليزية'], benefits: ['راتب تنافسي','تأمين صحي','مكافأة سنوية','برامج التدريب','22 يوم إجازة سنوية','مزايا نهاية الخدمة'] },
      { id: 4, title: 'مهندس تصميم', department: 'الهندسة', location: 'دبي', type: 'دوام كامل', experience: '3-5 سنوات', salary: '9,000 - 13,000 درهم', description: 'إنشاء تصاميم مبتكرة للنوافذ والأبواب وأنظمة الواجهات باستخدام برامج CAD.', responsibilities: ['تصميم أنظمة نوافذ وأبواب مخصصة','إعداد الرسومات التقنية والمواصفات','التعاون مع المبيعات على متطلبات العملاء','حساب الأحمال الهيكلية ومتطلبات المواد','مراجعة رسومات الورشة للدقة','دعم الإنتاج بالتوجيه التقني'], requirements: ['درجة في الهندسة الميكانيكية/المدنية','3-5 سنوات خبرة في التصميم','إتقان AutoCAD والنمذجة ثلاثية الأبعاد','معرفة رموز ومعايير البناء','مهارات حل المشكلات القوية','إجادة اللغة الإنجليزية مطلوب'], benefits: ['حزمة راتب جذابة','تأمين طبي','مراجعة أداء سنوية','أحدث برامج التصميم','التطوير المهني','بيئة عمل تعاونية'] },
      { id: 5, title: 'أخصائي تسويق', department: 'المبيعات', location: 'دبي', type: 'دوام كامل', experience: '2-4 سنوات', salary: '7,000 - 10,000 درهم', description: 'تطوير وتنفيذ استراتيجيات التسويق لزيادة الوعي بالعلامة التجارية وتوليد العملاء المحتملين.', responsibilities: ['التخطيط وتنفيذ حملات التسويق','إدارة قنوات التواصل الاجتماعي','إنشاء محتوى للمنصات الرقمية','تنظيم الفعاليات والمعارض','تتبع وتحليل أداء الحملة','التنسيق مع فريق التصميم على المواد'], requirements: ['بكالوريوس في التسويق أو مجال ذي صلة','2-4 سنوات خبرة في التسويق','خبرة في التسويق الرقمي','تواصل كتابي وشفهي قوي','التفكير الإبداعي','ثنائي اللغة (الإنجليزية والعربية مفضل)'], benefits: ['تعويض تنافسي','تأمين صحي','بيئة عمل إبداعية','حوافز الأداء','التدريب المهني','توازن العمل والحياة'] },
      { id: 6, title: 'مشرف تركيب', department: 'الإنتاج', location: 'دبي / الشارقة', type: 'دوام كامل', experience: '5+ سنوات', salary: '6,000 - 9,000 درهم', description: 'الإشراف على فرق التركيب لضمان جودة الصنعة ورضا العملاء.', responsibilities: ['قيادة فرق التركيب في الموقع','ضمان معايير التركيب عالية الجودة','التنسيق مع مديري المشاريع','تدريب وتوجيه فنيي التركيب','إجراء فحوصات السلامة في الموقع','التعامل مع استفسارات العملاء في الموقع'], requirements: ['شهادة تقنية أو ما يعادلها','5+ سنوات خبرة في التركيب','خبرة في تركيب النوافذ/الأبواب','مهارات قيادية قوية','رخصة قيادة إماراتية سارية','تواصل جيد باللغتين الإنجليزية والعربية'], benefits: ['راتب تنافسي','توفير النقل','تأمين طبي','تعويض العمل الإضافي','إجازة سنوية','توظيف مستقر'] },
    ],
    application: { title: 'تقدم لهذه الوظيفة', subtitle: 'املأ النموذج أدناه أو أرسل سيرتك الذاتية إلى', email: 'careers@emaar-international.ae', fields: { name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', position: 'الوظيفة المتقدم لها', experience: 'سنوات الخبرة', cv: 'تحميل السيرة الذاتية', coverLetter: 'خطاب التغطية', coverLetterPlaceholder: 'أخبرنا لماذا أنت المناسب تمامًا لهذا الدور...' }, button: 'إرسال الطلب', sending: 'جاري الإرسال...', success: 'تم إرسال الطلب بنجاح! سنراجع ملفك الشخصي ونتصل بك قريبًا.' },
    cta: { title: 'لا ترى وظيفتك؟', description: 'أرسل لنا سيرتك الذاتية وسنضعك في الاعتبار للوظائف المستقبلية', button: 'إرسال طلب عام' },
  },
};
