/**
 * lib/data/products.ts
 * Bilingual content for uPVC and Aluminum product pages.
 */

export const upvcData = {
  en: {
    title: 'uPVC Window & Door Systems',
    subtitle: 'Energy Efficiency Meets Durability',
    description: 'Our German-engineered uPVC systems provide superior thermal insulation, soundproofing, and are virtually maintenance-free. Ideal for sustainable modern living.',
    heroImage: 'https://images.unsplash.com/photo-1542385412-42e58a804825?auto=format&fit=crop&q=80',
    features: [
      { title: 'Superior Insulation', description: 'Multi-chambered profiles significantly reduce heat transfer and energy bills.', icon: 'Thermometer' },
      { title: 'Noise Reduction', description: 'Excellent acoustic properties keep outdoor noise where it belongs—outside.', icon: 'VolumeX' },
      { title: 'UV Resistant', description: 'Specially formulated compound to resist yellowing and cracking in intense sun.', icon: 'Sun' },
    ],
    products: [
      { id: 'UPVC-01', title: 'Tilt & Turn Windows', category: 'Windows', description: 'Versatile windows that can tilt for ventilation or turn inwards for easy cleaning.', image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800&q=80', features: ['Dual opening action', 'Secure locking', 'Excellent sealing'] },
      { id: 'UPVC-02', title: 'Sliding Patio Doors', category: 'Doors', description: 'Large glass areas with smooth operation, perfect for balconies and terraces.', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', features: ['Steel reinforced', 'Double glazed', 'Anti-lift mechanism'] },
      { id: 'UPVC-03', title: 'Front Doors', category: 'Doors', description: 'Secure and stylish entrance doors available in various designs and finishes.', image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=800&q=80', features: ['Multi-point locks', 'Decorative panels', 'Low threshold option'] },
      { id: 'UPVC-04', title: 'Fixed Windows', category: 'Windows', description: 'Non-opening picture windows to maximize natural light and views.', image: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=800&q=80', features: ['Slim sightlines', 'Maximum durability', 'Custom shapes'] },
      { id: 'UPVC-05', title: 'French Doors', category: 'Doors', description: 'Classic double doors that add elegance and charm to any property.', image: 'https://images.unsplash.com/photo-1534448554229-37f077ee8f8d?w=800&q=80', features: ['Wide opening', 'Traditional look', 'High security'] },
    ],
    crossLink: {
      title: 'Perfect for Residential Homes',
      description: 'Discover how our uPVC solutions transform living spaces with superior comfort and style.',
      button: 'View Residential Solutions',
      link: '/solutions?type=residential',
    },
  },
  ar: {
    title: 'أنظمة نوافذ وأبواب uPVC',
    subtitle: 'كفاءة الطاقة تلتقي بالمتانة',
    description: 'توفر أنظمة uPVC ذات الهندسة الألمانية عزلًا حراريًا فائقًا وعزلًا للصوت، وهي تكاد تكون خالية من الصيانة. مثالية للحياة العصرية المستدامة.',
    heroImage: 'https://images.unsplash.com/photo-1542385412-42e58a804825?auto=format&fit=crop&q=80',
    features: [
      { title: 'عزل فائق', description: 'قطاعات متعددة الغرف تقلل بشكل كبير من انتقال الحرارة وفواتير الطاقة.', icon: 'Thermometer' },
      { title: 'تقليل الضوضاء', description: 'خصائص صوتية ممتازة تبقي الضوضاء الخارجية حيث يجب أن تكون - في الخارج.', icon: 'VolumeX' },
      { title: 'مقاوم للأشعة فوق البنفسجية', description: 'مركب مركب خصيصًا لمقاومة الاصفرار والتشقق في الشمس القوية.', icon: 'Sun' },
    ],
    products: [
      { id: 'UPVC-01', title: 'نوافذ قلاب ودوران', category: 'نوافذ', description: 'نوافذ متعددة الاستخدامات يمكن إمالتها للتهوية أو تدويرها للداخل لسهولة التنظيف.', image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800&q=80', features: ['حركة فتح مزدوجة', 'قفل آمن', 'إغلاق ممتاز'] },
      { id: 'UPVC-02', title: 'أبواب فناء منزلقة', category: 'أبواب', description: 'مساحات زجاجية كبيرة مع تشغيل سلس، مثالية للشرفات والتراسات.', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', features: ['مدعمة بالفولاذ', 'زجاج مزدوج', 'آلية مضادة للرفع'] },
      { id: 'UPVC-03', title: 'أبواب أمامية', category: 'أبواب', description: 'أبواب مدخل آمنة وأنيقة متوفرة بتصاميم وتشطيبات متنوعة.', image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=800&q=80', features: ['أقفال متعددة النقاط', 'لوحات زخرفية', 'خيار عتبة منخفضة'] },
      { id: 'UPVC-04', title: 'نوافذ ثابتة', category: 'نوافذ', description: 'نوافذ صور غير قابلة للفتح لتعظيم الضوء الطبيعي والمناظر.', image: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=800&q=80', features: ['خطوط رؤية نحيفة', 'متانة قصوى', 'أشكال مخصصة'] },
      { id: 'UPVC-05', title: 'أبواب فرنسية', category: 'أبواب', description: 'أبواب مزدوجة كلاسيكية تضفي الأناقة والسحر على أي عقار.', image: 'https://images.unsplash.com/photo-1534448554229-37f077ee8f8d?w=800&q=80', features: ['فتحة واسعة', 'مظهر تقليدي', 'أمان عالي'] },
    ],
    crossLink: {
      title: 'مثالية للمنازل السكنية',
      description: 'اكتشف كيف تحول حلول uPVC مساحات المعيشة براحة وأناقة فائقة.',
      button: 'عرض الحلول السكنية',
      link: '/solutions?type=residential',
    },
  },
} as const;

export const aluminumData = {
  en: {
    title: 'Aluminum Window & Door Systems',
    subtitle: 'Strength Meets Modern Design',
    description: 'Our premium aluminum systems offer slim profiles, maximum glass areas, and exceptional structural strength. Perfect for contemporary architecture and large openings.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    features: [
      { title: 'Structural Strength', description: 'Superior load-bearing capacity for large-scale glazing and curtain wall systems.', icon: 'Shield' },
      { title: 'Slim Profiles', description: 'Minimalist sightlines maximize your view and natural light penetration.', icon: 'Eye' },
      { title: 'Weather Resistant', description: 'Powder-coated finish withstands harsh UAE climate for decades.', icon: 'Sun' },
    ],
    products: [
      { id: 'AL-01', title: 'Curtain Wall Systems', category: 'Facade', description: 'High-performance curtain wall solutions for commercial buildings and towers.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', features: ['Structural glazing', 'Thermal break', 'Custom designs'] },
      { id: 'AL-02', title: 'Sliding Doors', category: 'Doors', description: 'Premium lift-and-slide doors for seamless indoor-outdoor transitions.', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', features: ['Effortless operation', 'Floor-to-ceiling', 'Multi-track options'] },
      { id: 'AL-03', title: 'Folding Doors', category: 'Doors', description: 'Bi-fold door systems that completely open up living spaces.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', features: ['Full opening', 'Flush threshold', 'Weather sealed'] },
      { id: 'AL-04', title: 'Casement Windows', category: 'Windows', description: 'Modern casement windows with thermal break technology.', image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800&q=80', features: ['Thermal break', 'Multi-lock', 'Slim profile'] },
      { id: 'AL-05', title: 'Shopfront Systems', category: 'Commercial', description: 'Commercial-grade shopfront and entrance systems.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', features: ['Heavy duty', 'ADA compliant', 'Custom finishes'] },
    ],
    crossLink: {
      title: 'Ideal for Commercial Projects',
      description: 'Explore how our aluminum systems deliver performance and aesthetics for commercial spaces.',
      button: 'View Commercial Solutions',
      link: '/solutions?type=commercial',
    },
  },
  ar: {
    title: 'أنظمة نوافذ وأبواب الألومنيوم',
    subtitle: 'القوة تلتقي بالتصميم الحديث',
    description: 'توفر أنظمة الألومنيوم المتميزة لدينا ملفات نحيلة ومساحات زجاجية قصوى وقوة هيكلية استثنائية. مثالية للعمارة المعاصرة والفتحات الكبيرة.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    features: [
      { title: 'قوة هيكلية', description: 'قدرة تحمل فائقة لأنظمة التزجيج والجدران الستائرية واسعة النطاق.', icon: 'Shield' },
      { title: 'ملفات نحيلة', description: 'خطوط رؤية بسيطة تزيد من المنظر واختراق الضوء الطبيعي.', icon: 'Eye' },
      { title: 'مقاوم للطقس', description: 'تشطيب مطلي بالمسحوق يتحمل مناخ الإمارات القاسي لعقود.', icon: 'Sun' },
    ],
    products: [
      { id: 'AL-01', title: 'أنظمة الجدران الستائرية', category: 'واجهات', description: 'حلول جدران ستائرية عالية الأداء للمباني التجارية والأبراج.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', features: ['تزجيج هيكلي', 'فاصل حراري', 'تصاميم مخصصة'] },
      { id: 'AL-02', title: 'أبواب منزلقة', category: 'أبواب', description: 'أبواب رفع وانزلاق متميزة لانتقالات سلسة بين الداخل والخارج.', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80', features: ['تشغيل سهل', 'من الأرض إلى السقف', 'خيارات متعددة المسارات'] },
      { id: 'AL-03', title: 'أبواب قابلة للطي', category: 'أبواب', description: 'أنظمة أبواب ثنائية الطي تفتح مساحات المعيشة بالكامل.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', features: ['فتح كامل', 'عتبة مستوية', 'مانعة للطقس'] },
      { id: 'AL-04', title: 'نوافذ كاسمنت', category: 'نوافذ', description: 'نوافذ كاسمنت حديثة مع تقنية الفاصل الحراري.', image: 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800&q=80', features: ['فاصل حراري', 'قفل متعدد', 'ملف نحيل'] },
      { id: 'AL-05', title: 'أنظمة واجهات المحلات', category: 'تجاري', description: 'أنظمة واجهات ومداخل محلات بدرجة تجارية.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', features: ['شديدة التحمل', 'متوافقة مع معايير الوصول', 'تشطيبات مخصصة'] },
    ],
    crossLink: {
      title: 'مثالية للمشاريع التجارية',
      description: 'اكتشف كيف توفر أنظمة الألومنيوم لدينا الأداء والجماليات للمساحات التجارية.',
      button: 'عرض الحلول التجارية',
      link: '/solutions?type=commercial',
    },
  },
} as const;
