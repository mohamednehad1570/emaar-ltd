// lib/data/careers.ts – Bilingual content for the Careers page.
// Icons are referenced by string name, resolved via resolveIcon.

export interface CareersContent {
  hero: { title: string; subtitle: string; description: string };
  culture: {
    title: string; subtitle: string;
    values: { icon: string; title: string; description: string }[];
    stats: { number: string; label: string }[];
  };
  filters: Record<string, string>;
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
        { number: '50+', label: 'Team Members' }, { number: '26+', label: 'Years Experience' },
        { number: '95%', label: 'Employee Satisfaction' }, { number: '15+', label: 'Nationalities' },
      ],
    },
    filters: { all: 'All Positions', engineering: 'Engineering', production: 'Production', sales: 'Sales & Marketing', admin: 'Administration' },
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
        { number: '50+', label: 'عضو في الفريق' }, { number: '26+', label: 'سنة خبرة' },
        { number: '95%', label: 'رضا الموظفين' }, { number: '15+', label: 'جنسية' },
      ],
    },
    filters: { all: 'جميع الوظائف', engineering: 'الهندسة', production: 'الإنتاج', sales: 'المبيعات والتسويق', admin: 'الإدارة' },
    application: { title: 'تقدم لهذه الوظيفة', subtitle: 'املأ النموذج أدناه أو أرسل سيرتك الذاتية إلى', email: 'careers@emaar-international.ae', fields: { name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', position: 'الوظيفة المتقدم لها', experience: 'سنوات الخبرة', cv: 'تحميل السيرة الذاتية', coverLetter: 'خطاب التغطية', coverLetterPlaceholder: 'أخبرنا لماذا أنت المناسب تمامًا لهذا الدور...' }, button: 'إرسال الطلب', sending: 'جاري الإرسال...', success: 'تم إرسال الطلب بنجاح! سنراجع ملفك الشخصي ونتصل بك قريبًا.' },
    cta: { title: 'لا ترى وظيفتك؟', description: 'أرسل لنا سيرتك الذاتية وسنضعك في الاعتبار للوظائف المستقبلية', button: 'إرسال طلب عام' },
  },
};
