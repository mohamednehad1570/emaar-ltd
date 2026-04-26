/**
 * lib/data/contact.ts
 * Bilingual content for the Contact page.
 */

export const contactData = {
  en: {
    hero: {
      title: "Let's Build Your Vision Together",
      subtitle: 'Get in touch with our expert team',
      trust: [
        { icon: 'Building2', text: '500+ Projects' },
        { icon: 'Users', text: '20+ Years' },
        { icon: 'Award', text: 'ISO Certified' },
      ],
    },
    form: {
      title: 'Request a Quote',
      subtitle: 'Fill out the form and our team will get back to you within 24 hours',
      fields: {
        name: { label: 'Full Name', placeholder: 'John Smith', required: true },
        email: { label: 'Email Address', placeholder: 'john@example.com', required: true },
        phone: { label: 'Phone Number', placeholder: '+971 50 123 4567', required: true },
        projectType: {
          label: 'Project Type',
          required: true,
          options: ['Select project type', 'Residential - New Build', 'Residential - Renovation', 'Commercial Building', 'Industrial Facility', 'Hospitality Project', 'Other'],
        },
        message: { label: 'Project Details', placeholder: 'Tell us about your project requirements...', required: true },
        file: { label: 'Attach Files', hint: 'Plans, sketches, or reference images (PDF, JPG, PNG, DWG)' },
      },
      submit: 'Send Request',
      sending: 'Sending...',
    },
    contact: {
      title: 'Contact Methods',
      phone: { title: 'Call Us', number: '+971 50 123 4567', hours: 'Sat-Thu: 8AM - 6PM' },
      whatsapp: { title: 'WhatsApp', text: 'Quick response via WhatsApp', cta: 'Start Chat' },
      email: { title: 'Email Us', address: 'info@emaar-international.ae', response: '24-hour response time' },
    },
    offices: {
      title: 'Our Locations',
      list: [
        { name: 'Dubai - Main Office', address: 'Business Bay, Dubai, UAE', phone: '+971 4 123 4567', hours: 'Sat-Thu: 8:00 AM - 6:00 PM' },
        { name: 'Abu Dhabi Branch', address: 'Mussafah, Abu Dhabi, UAE', phone: '+971 2 123 4567', hours: 'Sat-Thu: 8:00 AM - 6:00 PM' },
        { name: 'Sharjah Branch', address: 'Industrial Area, Sharjah, UAE', phone: '+971 6 123 4567', hours: 'Sat-Thu: 8:00 AM - 6:00 PM' },
      ],
    },
    map: { title: 'Visit Our Showroom', viewMap: 'View on Google Maps' },
    cta: { title: 'Prefer to chat?', subtitle: 'Get instant answers on WhatsApp', button: 'Chat on WhatsApp' },
  },

  ar: {
    hero: {
      title: 'لنبني رؤيتك معًا',
      subtitle: 'تواصل مع فريق الخبراء لدينا',
      trust: [
        { icon: 'Building2', text: '500+ مشروع' },
        { icon: 'Users', text: '20+ سنة' },
        { icon: 'Award', text: 'معتمد ISO' },
      ],
    },
    form: {
      title: 'طلب عرض سعر',
      subtitle: 'املأ النموذج وسيتواصل معك فريقنا خلال 24 ساعة',
      fields: {
        name: { label: 'الاسم الكامل', placeholder: 'أحمد محمد', required: true },
        email: { label: 'البريد الإلكتروني', placeholder: 'ahmed@example.com', required: true },
        phone: { label: 'رقم الهاتف', placeholder: '+971 50 123 4567', required: true },
        projectType: {
          label: 'نوع المشروع',
          required: true,
          options: ['اختر نوع المشروع', 'سكني - بناء جديد', 'سكني - تجديد', 'مبنى تجاري', 'منشأة صناعية', 'مشروع ضيافة', 'أخرى'],
        },
        message: { label: 'تفاصيل المشروع', placeholder: 'أخبرنا عن متطلبات مشروعك...', required: true },
        file: { label: 'إرفاق ملفات', hint: 'المخططات أو الرسومات أو الصور المرجعية (PDF, JPG, PNG, DWG)' },
      },
      submit: 'إرسال الطلب',
      sending: 'جارٍ الإرسال...',
    },
    contact: {
      title: 'طرق التواصل',
      phone: { title: 'اتصل بنا', number: '+971 50 123 4567', hours: 'السبت-الخميس: 8 صباحًا - 6 مساءً' },
      whatsapp: { title: 'واتساب', text: 'استجابة سريعة عبر واتساب', cta: 'ابدأ المحادثة' },
      email: { title: 'راسلنا', address: 'info@emaar-international.ae', response: 'وقت الاستجابة 24 ساعة' },
    },
    offices: {
      title: 'مواقعنا',
      list: [
        { name: 'دبي - المكتب الرئيسي', address: 'الخليج التجاري، دبي، الإمارات', phone: '+971 4 123 4567', hours: 'السبت-الخميس: 8:00 صباحًا - 6:00 مساءً' },
        { name: 'فرع أبوظبي', address: 'مصفح، أبوظبي، الإمارات', phone: '+971 2 123 4567', hours: 'السبت-الخميس: 8:00 صباحًا - 6:00 مساءً' },
        { name: 'فرع الشارقة', address: 'المنطقة الصناعية، الشارقة، الإمارات', phone: '+971 6 123 4567', hours: 'السبت-الخميس: 8:00 صباحًا - 6:00 مساءً' },
      ],
    },
    map: { title: 'قم بزيارة صالة العرض لدينا', viewMap: 'عرض على خرائط جوجل' },
    cta: { title: 'تفضل المحادثة؟', subtitle: 'احصل على إجابات فورية على واتساب', button: 'تحدث على واتساب' },
  },
} as const;
