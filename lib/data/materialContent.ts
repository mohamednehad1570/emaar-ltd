/**
 * lib/data/materialContent.ts
 *
 * Static bilingual content for material landing pages.
 * Covers all three material systems: uPVC, Aluminium, Glass.
 *
 * Structure per material:
 *   hero        — cinematic hero copy
 *   story       — 2-3 alternating stat+text panels (MaterialStory section)
 *   categories  — accordion panels: one per category with full EN/AR copy
 *   whyEmaar    — 3 icon advantages specific to this material
 *   cta         — request quote section copy
 */

import type { Icon } from '@phosphor-icons/react'
import {
  Shield, Thermometer, SpeakerSlash, Sun, Wind,
  Leaf, Drop, Lightning, Wrench, Star,
  Buildings, HardHat, Sparkle, CheckCircle,
  Globe, Factory, Target,
} from '@phosphor-icons/react'

// ─── Shared types ──────────────────────────────────────────────────────────────

export interface LocalizedString {
  en: string
  ar: string
}

export interface StoryPanel {
  stat:    LocalizedString   // Large typographic number or short phrase
  label:   LocalizedString   // One-line context for the stat
  body:    LocalizedString   // 2-3 sentence supporting paragraph
}

export interface CategoryContent {
  slug:            string
  label:           LocalizedString
  tagline:         LocalizedString   // One punchy line shown in collapsed state
  description:     LocalizedString   // 2-sentence editorial description
  characteristics: LocalizedString[] // 4 bullet advantages shown in expanded state
  image:           string            // Placeholder — replaced pre-launch
}

export interface WhyEmaarItem {
  icon:        Icon
  title:       LocalizedString
  description: LocalizedString
}

export interface CTAContent {
  title:    LocalizedString
  subtitle: LocalizedString
  button:   LocalizedString
  image:    string
}

export interface MaterialContent {
  hero: {
    eyebrow:  LocalizedString
    title:    LocalizedString
    subtitle: LocalizedString
    image:    string
  }
  story:      StoryPanel[]
  categories: CategoryContent[]
  whyEmaar:   WhyEmaarItem[]
  cta:        CTAContent
}

// ─── uPVC ─────────────────────────────────────────────────────────────────────

const upvc: MaterialContent = {
  hero: {
    eyebrow:  { en: 'Material System',  ar: 'نظام المواد'      },
    title:    { en: 'uPVC Systems',     ar: 'أنظمة uPVC'       },
    subtitle: {
      en: 'German-engineered profiles delivering thermal comfort, acoustic silence, and lasting beauty for UAE residences.',
      ar: 'قطاعات ذات هندسة ألمانية توفر الراحة الحرارية والصمت الصوتي والجمال الدائم للمساكن الإماراتية.',
    },
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=1920&h=1080&fit=crop',
  },

  story: [
    {
      stat:  { en: '25 Years',     ar: '25 عاماً'          },
      label: { en: 'Colour warranty on every uPVC profile we manufacture', ar: 'ضمان اللون على كل قطاع uPVC نصنعه' },
      body:  {
        en: 'uPVC — unplasticised polyvinyl chloride — is the gold standard for residential fenestration across Europe and the Gulf. Unlike aluminium, it never conducts heat, never corrodes, and requires zero maintenance beyond an occasional wipe-down. Emaar sources profiles exclusively from ISO-certified European extruders, ensuring dimensional stability even in UAE summer temperatures exceeding 50°C.',
        ar: 'يُعدّ الـ uPVC — البولي كلوريد الفينيل غير المُلدَّن — المعيار الذهبي للنوافذ والأبواب السكنية في أوروبا والخليج. على عكس الألومنيوم، لا يوصّل الحرارة إطلاقاً، ولا يصدأ، ولا يحتاج إلى أي صيانة سوى مسحة عرضية. تستورد إعمار القطاعات حصراً من مُصنِّعي بثق أوروبيين معتمدين بشهادة ISO، مما يضمن ثبات الأبعاد حتى في درجات حرارة الصيف الإماراتي التي تتجاوز 50°C.',
      },
    },
    {
      stat:  { en: 'U-value 1.0',  ar: 'قيمة U تصل إلى 1.0' },
      label: { en: 'W/m²K — among the lowest thermal transmittance in the region', ar: 'واط/م²ك — من أدنى معدلات انتقال الحرارة في المنطقة' },
      body:  {
        en: 'Every uPVC system we manufacture is tested to the EN 14351-1 European standard, covering wind resistance up to 2400 Pa, water tightness Class E1200, and air permeability Class A4. These numbers translate directly to lower utility bills, quieter interiors, and a home that stays comfortable year-round without over-stressing the air conditioning.',
        ar: 'كل نظام uPVC نصنعه يُختبر وفق المعيار الأوروبي EN 14351-1، الذي يشمل مقاومة الرياح حتى 2400 باسكال، ومقاومة المياه من الفئة E1200، ونفاذية الهواء من الفئة A4. تترجم هذه الأرقام مباشرةً إلى فواتير مرافق أقل، وداخلية أكثر هدوءاً، ومنزل يحافظ على راحته طوال العام دون الإفراط في استخدام التكييف.',
      },
    },
    {
      stat:  { en: '500+',         ar: '+500'               },
      label: { en: 'Completed uPVC installations across the Emirates', ar: 'منشأة uPVC مكتملة في أرجاء الإمارات' },
      body:  {
        en: 'From compact apartments in Sharjah to sprawling villas on Palm Jumeirah, our uPVC portfolio spans every residential typology the UAE offers. Each project is measured, fabricated, and installed by Emaar-certified teams — not subcontracted — so every unit that leaves our SAIF Zone factory carries our full 25-year colour and structural warranty.',
        ar: 'من الشقق الصغيرة في الشارقة إلى الفلل الفارهة في نخلة جميرا، تمتد محفظة uPVC لدينا لتشمل كل النماذج السكنية التي تقدمها الإمارات. يتم قياس وتصنيع وتركيب كل مشروع بواسطة فرق معتمدة من إعمار — لا بالتعاقد من الباطن — لذا فإن كل وحدة تغادر مصنعنا في المنطقة الحرة تحمل ضماننا الكامل لمدة 25 عاماً على اللون والهيكل.',
      },
    },
  ],

  categories: [
    {
      slug:    'doors-and-windows',
      label:   { en: 'Doors & Windows',  ar: 'أبواب ونوافذ'    },
      tagline: { en: 'Precision-engineered openings for every façade', ar: 'فتحات مهندسة بدقة لكل واجهة' },
      description: {
        en: 'Our uPVC doors and windows combine multi-chamber profiles with high-performance glazing to deliver exceptional thermal and acoustic performance. Available in casement, tilt-and-turn, sliding, and fixed configurations to suit any architectural brief.',
        ar: 'تجمع أبوابنا ونوافذنا من الـ uPVC بين قطاعات متعددة الغرف وزجاج عالي الأداء لتوفير أداء حراري وصوتي استثنائي. متوفرة بأشكال مفتوحة للخارج، ومائلة وقابلة للدوران، وانزلاقية، وثابتة لتناسب أي تصميم معماري.',
      },
      characteristics: [
        { en: 'Multi-point locking on all operable units',      ar: 'قفل متعدد النقاط على جميع الوحدات القابلة للفتح'   },
        { en: 'U-value from 1.0 W/m²K with double glazing',    ar: 'قيمة U من 1.0 واط/م²ك مع الزجاج المزدوج'           },
        { en: 'Sound reduction up to 45 dB with acoustic glass', ar: 'خفض الضوضاء حتى 45 ديسيبل مع الزجاج الصوتي'       },
        { en: 'Custom RAL colours — interior and exterior independent', ar: 'ألوان RAL مخصصة — الداخل والخارج مستقلان' },
      ],
      image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=900&h=700&fit=crop',
    },
    {
      slug:    'staircases',
      label:   { en: 'Staircases',       ar: 'درابزين'          },
      tagline: { en: 'Structural elegance from ground to sky',   ar: 'أناقة هيكلية من الأرض إلى السماء' },
      description: {
        en: 'uPVC staircase systems deliver the clean lines of modern design with the low-maintenance advantage only polymer profiles can offer. Our systems are engineered for load-bearing compliance with UAE building codes and finished to bespoke colour specifications.',
        ar: 'توفر أنظمة درابزين الـ uPVC الخطوط النظيفة للتصميم الحديث مع ميزة الصيانة المنخفضة التي توفرها فقط قطاعات البوليمر. أنظمتنا مهندسة للامتثال لمتطلبات تحمّل الحمولة وفق قوانين البناء الإماراتية ومُشطَّبة وفق مواصفات لون مخصصة.',
      },
      characteristics: [
        { en: 'Compliant with UAE building code load requirements', ar: 'متوافقة مع متطلبات الحمولة في قانون البناء الإماراتي' },
        { en: 'Zero corrosion — no painting or re-coating needed', ar: 'صفر تآكل — لا حاجة للطلاء أو إعادة التغليف'         },
        { en: 'Modular system — adapts to straight and curved runs', ar: 'نظام معياري — يتكيف مع المسارات المستقيمة والمنحنية' },
        { en: 'Available in wood-grain and solid colour finishes',   ar: 'متوفر بتشطيبات حبوب الخشب والألوان الصلبة'          },
      ],
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&h=700&fit=crop',
    },
    {
      slug:    'hebeschibe',
      label:   { en: 'Hebeschibe',       ar: 'نظام رفع وإزاحة' },
      tagline: { en: 'Lift-and-slide precision for panoramic openings', ar: 'دقة الرفع والإزاحة للفتحات البانورامية' },
      description: {
        en: 'The Hebeschibe lift-and-slide system allows floor-to-ceiling glass panels weighing up to 400 kg to glide effortlessly with a single handle turn. It is the preferred choice for luxury living rooms and terraces where the boundary between inside and outside must disappear entirely.',
        ar: 'يتيح نظام الرفع والإزاحة Hebeschibe لألواح الزجاج الممتدة من الأرض إلى السقف بوزن يصل إلى 400 كجم أن تنزلق بسهولة تامة بدوران مقبض واحد. إنه الخيار المفضل لغرف المعيشة والتراسات الفاخرة حيث يجب أن تختفي الحدود بين الداخل والخارج كلياً.',
      },
      characteristics: [
        { en: 'Panels up to 400 kg glide on precision steel rollers', ar: 'ألواح تصل إلى 400 كجم تنزلق على بكرات فولاذية دقيقة' },
        { en: 'Single-handle operation — accessible for all users',    ar: 'تشغيل بمقبض واحد — في متناول جميع المستخدمين'        },
        { en: 'Floor-to-ceiling glass with minimal frame sightlines',  ar: 'زجاج من الأرض إلى السقف بخطوط إطار في الحد الأدنى'   },
        { en: 'Multi-point perimeter seal — Class E1200 water-tight',  ar: 'حشية محيطية متعددة النقاط — ضد الماء من الفئة E1200'  },
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=700&fit=crop',
    },
  ],

  whyEmaar: [
    {
      icon:        Thermometer,
      title:       { en: 'UAE-Tuned Thermal Performance', ar: 'أداء حراري مضبوط للإمارات' },
      description: {
        en: 'Every profile we specify is validated for UAE summer conditions — colour stability above 70°C surface temperature, no warping, no off-gassing.',
        ar: 'كل قطاع نحدده مُعتمَد لظروف صيف الإمارات — ثبات اللون فوق 70°C لدرجة حرارة السطح، لا تشوّه، لا انبعاث غازات.',
      },
    },
    {
      icon:        Shield,
      title:       { en: '25-Year Colour Warranty',      ar: 'ضمان اللون لمدة 25 عاماً'  },
      description: {
        en: 'The longest colour warranty in the UAE market, backed by our ISO 9001-certified factory and documented in every project contract.',
        ar: 'أطول ضمان للون في السوق الإماراتي، مدعوم بمصنعنا المعتمد بشهادة ISO 9001 وموثق في كل عقد مشروع.',
      },
    },
    {
      icon:        Wrench,
      title:       { en: 'In-House Fabrication Only',    ar: 'تصنيع داخلي حصراً'         },
      description: {
        en: 'No subcontracting. Every uPVC frame is cut, welded, glazed, and quality-checked at our SAIF Zone facility by our own certified technicians.',
        ar: 'لا تعاقد من الباطن. كل إطار uPVC يُقطع ويُلحم ويُزجَّج ويُفحص جودته في منشأتنا بالمنطقة الحرة بواسطة فنيينا المعتمدين.',
      },
    },
  ],

  cta: {
    title:    { en: 'Ready to Specify uPVC for Your Project?', ar: 'مستعد لتحديد uPVC لمشروعك؟'          },
    subtitle: { en: 'Our technical team will review your drawings and recommend the right system within 48 hours.', ar: 'سيراجع فريقنا الفني رسوماتك ويوصي بالنظام المناسب خلال 48 ساعة.' },
    button:   { en: 'Request a Quote',                         ar: 'اطلب عرض سعر'                          },
    image:    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&h=700&fit=crop',
  },
}

// ─── Aluminium ────────────────────────────────────────────────────────────────

const aluminum: MaterialContent = {
  hero: {
    eyebrow:  { en: 'Material System',     ar: 'نظام المواد'         },
    title:    { en: 'Aluminium Systems',   ar: 'أنظمة الألومنيوم'    },
    subtitle: {
      en: 'Structural-grade aluminium systems engineered for commercial scale, architectural ambition, and UAE climate resilience.',
      ar: 'أنظمة ألومنيوم بدرجة هيكلية مهندسة للحجم التجاري والطموح المعماري والصمود أمام مناخ الإمارات.',
    },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop',
  },

  story: [
    {
      stat:  { en: '15+ Years',    ar: '+15 عاماً'           },
      label: { en: 'Manufacturing aluminium fenestration systems in the UAE', ar: 'تصنيع أنظمة الألومنيوم للنوافذ والأبواب في الإمارات' },
      body:  {
        en: 'Aluminium is the architect\'s material — infinitely formable, structurally dependable, and capable of spanning openings that uPVC cannot. Our aluminium systems use extruded 6063-T5 alloy profiles with factory-applied powder coating in any RAL or Pantone reference. The result is a building envelope system that performs across the full range of UAE project types — from intimate retail fit-outs to high-rise curtain walls.',
        ar: 'الألومنيوم هو مادة المهندس المعماري — قابلة للتشكيل بلا حدود، وموثوقة هيكلياً، وقادرة على تجسير فتحات لا يستطيع uPVC تجسيرها. تستخدم أنظمة الألومنيوم لدينا قطاعات سبيكة 6063-T5 المبثوقة مع طلاء بودرة مطبق في المصنع بأي مرجع RAL أو Pantone. والنتيجة نظام غلاف مبنى يؤدي عمله عبر كامل مجموعة أنواع المشاريع الإماراتية.',
      },
    },
    {
      stat:  { en: '2400 Pa',      ar: '2400 باسكال'         },
      label: { en: 'Wind-load rating — designed for UAE coastal and high-rise conditions', ar: 'تصنيف حمولة الرياح — مصمم لظروف الإمارات الساحلية وناطحات السحاب' },
      body:  {
        en: 'Every aluminium system we produce is engineered to EN 14351-1 and tested to local Dubai Municipality and Abu Dhabi UPC requirements. Thermal break technology — a polyamide strip separating the inner and outer aluminium shells — reduces the U-value to as low as 1.4 W/m²K, making modern aluminium facades surprisingly energy-efficient despite the material\'s natural conductivity.',
        ar: 'كل نظام ألومنيوم ننتجه مهندس وفق EN 14351-1 ومختبر وفق متطلبات بلدية دبي ومركز أبوظبي للتخطيط العمراني. تقنية الكسر الحراري — شريط من البولياميد يفصل القشرتين الألومنيومية الداخلية والخارجية — تخفض قيمة U إلى 1.4 واط/م²ك، مما يجعل الواجهات الألومنيوم الحديثة موفرة للطاقة بشكل مدهش.',
      },
    },
    {
      stat:  { en: '10 Systems',   ar: '10 أنظمة'            },
      label: { en: 'Covering every aluminium product category from doors to ACP cladding', ar: 'تغطي كل فئة منتجات ألومنيوم من الأبواب إلى كسوة ACP' },
      body:  {
        en: 'No other fenestration company in the UAE offers the breadth of aluminium product categories that Emaar does. From standard swing doors to motorised skylight systems, frameless glass walls, aluminium pergolas, and architectural ACP panel facades — our engineering team can handle the full building envelope in a single contract, simplifying coordination for developers and main contractors.',
        ar: 'لا توجد شركة نوافذ وأبواب أخرى في الإمارات تقدم اتساع فئات منتجات الألومنيوم التي تقدمها إعمار. من الأبواب الدوارة القياسية إلى أنظمة النور الزجاجي المؤتمت، والجدران الزجاجية بلا إطار، وبرجولات الألومنيوم، وواجهات ألواح ACP المعمارية — يمكن لفريق الهندسة لدينا التعامل مع غلاف المبنى الكامل في عقد واحد.',
      },
    },
  ],

  categories: [
    {
      slug:    'doors-and-windows',
      label:   { en: 'Doors & Windows',  ar: 'أبواب ونوافذ'      },
      tagline: { en: 'Slim profiles, maximum light, zero compromise', ar: 'قطاعات نحيلة، ضوء أقصى، لا تنازل' },
      description: {
        en: 'Aluminium doors and windows deliver sight lines up to 40% slimmer than uPVC equivalents, maximising glazed area and natural light. Our thermally-broken systems meet both UAE energy code requirements and the performance expectations of international architects.',
        ar: 'توفر أبواب ونوافذ الألومنيوم خطوط رؤية أنحف بنسبة تصل إلى 40% مقارنة بمكافلاتها من uPVC، مما يزيد من مساحة الزجاج والضوء الطبيعي.',
      },
      characteristics: [
        { en: 'Thermal break polyamide — U-value from 1.4 W/m²K', ar: 'كسر حراري بولياميد — قيمة U من 1.4 واط/م²ك'       },
        { en: 'Profiles as slim as 35mm visible face width',       ar: 'قطاعات بعرض وجه مرئي يصل إلى 35 مم'               },
        { en: 'PVDF powder coating — 40-year colour warranty',     ar: 'طلاء بودرة PVDF — ضمان لون لمدة 40 عاماً'           },
        { en: 'Compliant with Dubai Green Building Regulations',   ar: 'متوافق مع لوائح المباني الخضراء في دبي'              },
      ],
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&h=700&fit=crop',
    },
    {
      slug:    'staircases',
      label:   { en: 'Staircases',       ar: 'درابزين'            },
      tagline: { en: 'Architectural steel and glass railings that define a space', ar: 'درابزين معماري من الفولاذ والزجاج يُعرِّف المكان' },
      description: {
        en: 'Aluminium staircase systems combine the structural rigidity of extruded aluminium with the transparency of tempered glass infill panels. Whether a straight hotel corridor or a helical feature staircase in a luxury villa, our systems are engineered to UAE load standards and finished to exact project specifications.',
        ar: 'تجمع أنظمة درابزين الألومنيوم بين الصلابة الهيكلية للألومنيوم المبثوق وشفافية لوحات الحشوة من الزجاج المقسّى.',
      },
      characteristics: [
        { en: 'Load-tested to UAE building code BS 6180 equivalent', ar: 'مختبر تحت الحمولة وفق مكافئ قانون البناء الإماراتي BS 6180' },
        { en: 'Tempered or laminated glass infill panels',           ar: 'لوحات حشوة من الزجاج المقسّى أو الطبقي'                    },
        { en: 'Powder-coated in any RAL — site-colour-matched',      ar: 'مطلي بودرة بأي لون RAL — مطابق للون الموقع'                  },
        { en: 'Modular — adapts to straight, L, U, and spiral runs', ar: 'معياري — يتكيف مع المسارات المستقيمة وL وU والحلزونية'       },
      ],
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&h=700&fit=crop',
    },
    {
      slug:    'skylights',
      label:   { en: 'Skylights',        ar: 'فتحات سقفية'       },
      tagline: { en: 'Bring the UAE sky indoors — thermally and acoustically controlled', ar: 'أدخل سماء الإمارات إلى الداخل — بتحكم حراري وصوتي' },
      description: {
        en: 'Our skylight systems are engineered for the UAE\'s intense solar load, incorporating solar-control Low-E glazing that transmits daylight while blocking up to 70% of solar heat gain. Available in fixed, manually venting, and motorised configurations with rain and wind sensors.',
        ar: 'أنظمة النور الزجاجي لدينا مهندسة لاستيعاب الحمولة الشمسية الشديدة في الإمارات، وتتضمن زجاجاً Low-E للتحكم الشمسي يسمح بمرور ضوء النهار مع حجب ما يصل إلى 70% من اكتساب الحرارة الشمسية.',
      },
      characteristics: [
        { en: 'Solar-control Low-E glazing — blocks 70% solar heat', ar: 'زجاج Low-E للتحكم الشمسي — يحجب 70% من الحرارة الشمسية' },
        { en: 'Motorised venting with rain and wind auto-close',      ar: 'تهوية مؤتمتة مع إغلاق تلقائي عند المطر والرياح'          },
        { en: 'Thermally broken frame — no condensation risk',        ar: 'إطار بكسر حراري — لا خطر تكثف'                           },
        { en: 'Structural silicone or mechanical fixing options',     ar: 'خيارات تثبيت بالسيليكون الإنشائي أو الميكانيكي'          },
      ],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=700&fit=crop',
    },
    {
      slug:    'pergola',
      label:   { en: 'Pergola',          ar: 'برجولة'             },
      tagline: { en: 'Outdoor living reimagined for the Gulf climate', ar: 'حياة خارجية مُعاد تصورها لمناخ الخليج' },
      description: {
        en: 'Emaar aluminium pergola systems transform outdoor terraces into usable year-round spaces. Louvred aluminium roof blades rotate up to 145°, allowing full sun control and natural ventilation. Integrated LED lighting and optional side screens complete a fully enclosed outdoor room.',
        ar: 'تحوّل أنظمة البرجولة الألومنيوم من إعمار التراسات الخارجية إلى مساحات صالحة للاستخدام على مدار العام. تدور شفرات السقف الألومنيوم حتى 145°، مما يتيح التحكم الكامل في أشعة الشمس والتهوية الطبيعية.',
      },
      characteristics: [
        { en: 'Motorised louvres — 0° to 145° rotation',       ar: 'مصاريع مؤتمتة — دوران من 0° إلى 145°'        },
        { en: 'Integrated drainage channels — zero water pooling', ar: 'قنوات تصريف متكاملة — لا تجمع مياه'         },
        { en: 'Built-in LED linear lighting strips',            ar: 'شرائط LED خطية مدمجة'                         },
        { en: 'Wind-rated to 120 km/h with side screens fitted', ar: 'مقاومة للرياح حتى 120 كم/ساعة مع الشاشات الجانبية' },
      ],
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&h=700&fit=crop',
    },
    {
      slug:    'frameless-doors',
      label:   { en: 'Frameless Doors',  ar: 'أبواب بلا إطار'    },
      tagline: { en: 'Glass that moves — invisible hardware, maximum drama', ar: 'زجاج يتحرك — أجهزة غير مرئية، أثر أقصى' },
      description: {
        en: 'Frameless glass door systems create the illusion of a glass wall that opens. Suspended on concealed stainless-steel tracks with floor-spring pivots, panels of up to 12mm toughened glass can swing, slide, or fold across openings up to 6 metres wide — with no visible frame to interrupt the view.',
        ar: 'تخلق أنظمة الأبواب الزجاجية بلا إطار وهم جدار زجاجي يفتح. معلقة على مسارات فولاذية مخفية مع محاور نابض أرضية، يمكن لألواح الزجاج المقسّى بسماكة تصل إلى 12 مم أن تتأرجح أو تنزلق أو تطوى عبر فتحات عرضها يصل إلى 6 أمتار.',
      },
      characteristics: [
        { en: 'Up to 12mm fully toughened monolithic glass',    ar: 'حتى 12 مم من الزجاج المقسّى بالكامل أحادي الطبقة' },
        { en: 'Floor spring and overhead closer — no frame',    ar: 'نابض أرضي وأغلق علوي — بلا إطار'                  },
        { en: 'Openings up to 6m wide with zero central post',  ar: 'فتحات بعرض يصل إلى 6 م بدون عمود مركزي'           },
        { en: 'Anti-burst laminated glass option for security', ar: 'خيار زجاج طبقي مقاوم للانفجار للأمان'              },
      ],
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&h=700&fit=crop',
    },
    {
      slug:    'security-system',
      label:   { en: 'Security Systems', ar: 'أنظمة الأمان'       },
      tagline: { en: 'Certified resistance — from RC2 to RC4 burglar rating', ar: 'مقاومة معتمدة — من RC2 إلى RC4 لتصنيف مقاومة الاقتحام' },
      description: {
        en: 'Emaar security-rated aluminium systems integrate reinforced profiles, multi-point locking, and laminated glass to achieve EN 1627 resistance class ratings. Specified by UAE developers for ground-floor retail, hotel entrances, and high-value residential applications where aesthetics must never be sacrificed for protection.',
        ar: 'تدمج أنظمة الألومنيوم المُصنَّفة أمنياً من إعمار قطاعات معززة وأقفال متعددة النقاط وزجاجاً طبقياً لتحقيق تصنيفات فئة المقاومة وفق EN 1627.',
      },
      characteristics: [
        { en: 'EN 1627 RC2–RC4 burglar resistance certification',  ar: 'شهادة مقاومة الاقتحام RC2–RC4 وفق EN 1627'         },
        { en: 'Multi-point locking — minimum 5 engagement points', ar: 'قفل متعدد النقاط — 5 نقاط تعشيق كحد أدنى'          },
        { en: 'P6B laminated glass — resists sustained attack',    ar: 'زجاج طبقي P6B — يقاوم الهجوم المتواصل'             },
        { en: 'Concealed hinges — no external attack surface',     ar: 'مفصلات مخفية — لا سطح هجوم خارجي'                  },
      ],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=700&fit=crop',
    },
    {
      slug:    'handrails',
      label:   { en: 'Handrails',        ar: 'درابزين يدوي'       },
      tagline: { en: 'Precision-profiled handrails for every grip requirement', ar: 'درابزين مصنّف بدقة لكل متطلبات القبضة' },
      description: {
        en: 'Emaar aluminium handrail systems serve both functional and architectural roles — from simple continuous handrails on internal corridors to feature balustrade systems on resort pools and hotel lobbies. All profiles are powder-coated and tested to relevant BS and UAE grip-force standards.',
        ar: 'تؤدي أنظمة الدرابزين الألومنيوم من إعمار دورين وظيفياً ومعمارياً — من الدرابزين المتواصل البسيط في الممرات الداخلية إلى أنظمة الحاجز المعمارية على حمامات سباحة المنتجعات وبهوات الفنادق.',
      },
      characteristics: [
        { en: 'BS 8300 and UAE accessibility code compliant',    ar: 'متوافق مع BS 8300 وقانون إمكانية الوصول الإماراتي' },
        { en: 'Continuous top rail — no post interruption',      ar: 'ريل علوي متواصل — لا انقطاع في الأعمدة'            },
        { en: 'Glass, aluminium, or stainless infill options',   ar: 'خيارات حشوة من الزجاج أو الألومنيوم أو الفولاذ'     },
        { en: '200+ RAL powder-coat colours in-house',           ar: 'أكثر من 200 لون طلاء بودرة RAL داخلياً'             },
      ],
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=900&h=700&fit=crop',
    },
    {
      slug:    'acp-panels',
      label:   { en: 'ACP Panels',       ar: 'ألواح ACP'          },
      tagline: { en: 'Façade cladding that defines the building\'s identity', ar: 'كسوة واجهة تُعرِّف هوية المبنى' },
      description: {
        en: 'Aluminium composite panels (ACP) are the dominant façade cladding material across UAE commercial and residential towers. Emaar supplies and installs FR-grade (fire-retardant) ACP systems in full compliance with Dubai Civil Defence circular 5 of 2016 — the regulation governing fire safety of high-rise facades.',
        ar: 'تُعدّ ألواح الألومنيوم المركبة (ACP) مادة الكسوة السائدة على واجهات الأبراج التجارية والسكنية في الإمارات. توفر إعمار وتركّب أنظمة ACP من درجة FR (مقاومة الحريق) بما يتوافق تماماً مع التعميم 5 لعام 2016 من الدفاع المدني في دبي.',
      },
      characteristics: [
        { en: 'FR-grade core — compliant with Dubai Civil Defence circ. 5/2016', ar: 'قلب من درجة FR — متوافق مع تعميم الدفاع المدني بدبي 5/2016' },
        { en: 'PVDF colour coat — 30-year fade warranty',                        ar: 'طلاء ملوّن PVDF — ضمان بهتان لمدة 30 عاماً'                    },
        { en: 'Panel sizes up to 1500 × 6000 mm',                               ar: 'أحجام لوحات تصل إلى 1500 × 6000 مم'                            },
        { en: 'Full design service — shop drawings and engineering sign-off',    ar: 'خدمة تصميم كاملة — رسومات ورشة وموافقة هندسية'                  },
      ],
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=700&fit=crop',
    },
  ],

  whyEmaar: [
    {
      icon:        Factory,
      title:       { en: 'Single-Source Contractor',  ar: 'مقاول مصدر واحد'      },
      description: {
        en: 'Doors, windows, skylights, pergolas, ACP — one Emaar contract covers the entire aluminium building envelope, eliminating inter-trade coordination risk.',
        ar: 'الأبواب والنوافذ والنور الزجاجي والبرجولات وACP — عقد إعمار واحد يغطي غلاف المبنى الألومنيوم بالكامل.',
      },
    },
    {
      icon:        Globe,
      title:       { en: 'FR-Grade ACP Compliance',   ar: 'امتثال ACP من درجة FR' },
      description: {
        en: 'Every ACP system we supply meets Dubai Civil Defence and Abu Dhabi UPC fire-safety requirements — fully documented for authority submission.',
        ar: 'كل نظام ACP نوفره يستوفي متطلبات السلامة من الحرائق للدفاع المدني في دبي ومركز أبوظبي للتخطيط العمراني.',
      },
    },
    {
      icon:        Target,
      title:       { en: '10-Day Quotation Guarantee', ar: 'ضمان عرض السعر خلال 10 أيام' },
      description: {
        en: 'Submit drawings today. Our estimating team will return a full bill of quantities, material spec, and project price within 10 working days — guaranteed.',
        ar: 'أرسل الرسومات اليوم. سيعيد فريق التقدير لدينا قائمة كميات كاملة ومواصفات مواد وسعر مشروع خلال 10 أيام عمل — مضمون.',
      },
    },
  ],

  cta: {
    title:    { en: 'Specify Aluminium for Your Next Project',    ar: 'حدّد الألومنيوم لمشروعك القادم'      },
    subtitle: { en: 'Send us your drawings. We\'ll return a full BOQ and system specification within 10 working days.', ar: 'أرسل لنا رسوماتك. سنعيد قائمة كميات كاملة ومواصفة نظام خلال 10 أيام عمل.' },
    button:   { en: 'Request a Quote',                            ar: 'اطلب عرض سعر'                         },
    image:    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=700&fit=crop',
  },
}

// ─── Glass ────────────────────────────────────────────────────────────────────

const glass: MaterialContent = {
  hero: {
    eyebrow:  { en: 'Material System',  ar: 'نظام المواد'       },
    title:    { en: 'Glass Systems',    ar: 'أنظمة الزجاج'      },
    subtitle: {
      en: 'Architectural glass solutions that transform light into living art — crafted for privacy, identity, and enduring beauty.',
      ar: 'حلول زجاج معمارية تحوّل الضوء إلى فن حي — مصنوعة للخصوصية والهوية والجمال الدائم.',
    },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
  },

  story: [
    {
      stat:  { en: '99%',           ar: '99٪'                  },
      label: { en: 'UV radiation blocked by our solar-control glass coatings', ar: 'أشعة فوق بنفسجية محجوبة بطلاءات الزجاج للتحكم الشمسي لدينا' },
      body:  {
        en: 'Glass is no longer just a transparent infill material — it is the architectural element that defines how a space feels. Stained glass brings colour narrative and cultural identity to mosques, palaces, and hospitality venues. Sandblast glass delivers calibrated privacy without sacrificing light. Together they represent Emaar\'s commitment to glass as a craft, not just a commodity.',
        ar: 'الزجاج لم يعد مجرد مادة حشو شفافة — إنه العنصر المعماري الذي يحدد شعور المكان. يجلب الزجاج الملون السرد اللوني والهوية الثقافية للمساجد والقصور ومنشآت الضيافة. يوفر الزجاج المسند خصوصية مُعايَرة دون التضحية بالضوء.',
      },
    },
    {
      stat:  { en: '30+ Years',     ar: '+30 عاماً'             },
      label: { en: 'Combined experience in architectural glass across the Gulf', ar: 'خبرة مجمّعة في الزجاج المعماري عبر الخليج' },
      body:  {
        en: 'Our glass studio in SAIF Zone handles every stage of decorative glass production in-house — design, cutting, painting, firing, and installation. Working from client-supplied artwork or original designs developed by our team, we can reproduce traditional Islamic geometric patterns with sub-millimetre accuracy alongside contemporary abstract compositions.',
        ar: 'يتولى استوديو الزجاج لدينا في المنطقة الحرة كل مرحلة من مراحل إنتاج الزجاج الزخرفي داخلياً — التصميم والقطع والطلاء والحرق والتركيب.',
      },
    },
    {
      stat:  { en: 'Bespoke',       ar: 'مخصص'                 },
      label: { en: 'Every decorative glass panel is unique — made to your exact design', ar: 'كل لوحة زجاج زخرفية فريدة — مصنوعة وفق تصميمك الدقيق' },
      body:  {
        en: 'No two stained glass commissions leave our factory the same. Whether you are specifying a 2-metre privacy screen for a private bathroom or a 12-metre feature wall for a hotel lobby, our team works from architectural drawings, develops full-scale cartoons, and presents physical colour samples for approval before a single panel goes into production.',
        ar: 'لا تغادر مصنعنا طلبَيْن متطابقان من الزجاج الملون. سواء كنت تحدد شاشة خصوصية بارتفاع 2 متر لحمام خاص أو جداراً مميزاً بارتفاع 12 متر لبهو فندقي، يعمل فريقنا من الرسومات المعمارية.',
      },
    },
  ],

  categories: [
    {
      slug:    'stained-glass',
      label:   { en: 'Stained Glass',   ar: 'زجاج ملون'          },
      tagline: { en: 'Hand-crafted colour narratives for remarkable spaces', ar: 'سرديات لونية مصنوعة يدوياً لمساحات استثنائية' },
      description: {
        en: 'Emaar\'s stained glass studio produces both traditional lead-came panels and modern direct-paint fired glass. Our artisans are trained in classical European and traditional Islamic geometric traditions, enabling us to produce work that satisfies the most demanding mosque, palace, and hospitality briefs in the region.',
        ar: 'ينتج استوديو الزجاج الملون من إعمار لوحات الرصاص التقليدية وزجاج الطلاء المباشر المحروق الحديث. حرفيونا مدرَّبون في التقاليد الكلاسيكية الأوروبية والهندسية الإسلامية التقليدية.',
      },
      characteristics: [
        { en: 'Traditional lead-came and modern fired-paint techniques', ar: 'تقنيات الرصاص التقليدية والطلاء المحروق الحديث'      },
        { en: 'Islamic geometric and arabesque design capability',        ar: 'قدرة على تصميم هندسي إسلامي وأرابيسك'               },
        { en: 'UV-stable pigments — 50-year colour retention',           ar: 'صبغات مستقرة للأشعة فوق البنفسجية — احتفاظ بالون لمدة 50 عاماً' },
        { en: 'Full-scale physical colour samples before production',    ar: 'عينات لونية مادية بالحجم الكامل قبل الإنتاج'         },
      ],
      image: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=900&h=700&fit=crop',
    },
    {
      slug:    'sandblast',
      label:   { en: 'Sandblast',       ar: 'زجاج مسند'          },
      tagline: { en: 'Calibrated privacy — light without sight lines', ar: 'خصوصية مُعايَرة — ضوء بلا خطوط رؤية' },
      description: {
        en: 'Sandblasted glass achieves translucency gradients impossible with frosted film or acid etching. Our CNC-controlled sandblast process can reproduce precise patterns, logos, gradients, and textures on any glass thickness from 6mm to 19mm — creating privacy screens, partition walls, and door panels that are both functional and architectural.',
        ar: 'يحقق الزجاج المسند تدرجات شفافية مستحيلة مع الفيلم المصنفر أو الحفر الحمضي. يمكن لعملية السند المتحكم بها CNC لدينا إعادة إنتاج أنماط دقيقة وشعارات وتدرجات وملمس على أي سماكة زجاج.',
      },
      characteristics: [
        { en: 'CNC-precise pattern reproduction on glass',           ar: 'إعادة إنتاج نمط دقيق CNC على الزجاج'               },
        { en: 'Gradient transparency — variable across a single panel', ar: 'شفافية متدرجة — متغيرة عبر لوحة واحدة'           },
        { en: 'Available on 6mm to 19mm glass thickness',            ar: 'متوفر بسماكة زجاج من 6 مم إلى 19 مم'               },
        { en: 'Combine with colour lacquer for tinted translucency', ar: 'يمكن دمجه مع لاك ملون للشفافية الملونة'             },
      ],
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&h=700&fit=crop',
    },
  ],

  whyEmaar: [
    {
      icon:        Sparkle,
      title:       { en: 'In-House Glass Studio',     ar: 'استوديو زجاج داخلي'    },
      description: {
        en: 'Design, cutting, painting, firing, and installation — all under one roof. No outsourcing, no quality handoff risk, no delays between production stages.',
        ar: 'التصميم والقطع والطلاء والحرق والتركيب — كل ذلك تحت سقف واحد. لا استعانة بمصادر خارجية، لا مخاطر تسليم الجودة، لا تأخيرات بين مراحل الإنتاج.',
      },
    },
    {
      icon:        Star,
      title:       { en: 'Bespoke Design Service',    ar: 'خدمة تصميم مخصصة'      },
      description: {
        en: 'Our studio team works directly with your architect or interior designer. We develop original artwork, present full-scale colour samples, and iterate until the design is exactly right before any glass is cut.',
        ar: 'يعمل فريق الاستوديو لدينا مباشرة مع مهندسك المعماري أو مصمم الديكور. نطور أعمالاً فنية أصلية ونقدم عينات لونية بالحجم الكامل.',
      },
    },
    {
      icon:        CheckCircle,
      title:       { en: '50-Year Pigment Warranty',  ar: 'ضمان صبغة لمدة 50 عاماً' },
      description: {
        en: 'Our fired-glass pigments are UV-stable and kiln-fused into the glass surface — not applied as a film or coating. The colour cannot peel, fade, or delaminate regardless of UAE solar exposure.',
        ar: 'صبغات الزجاج المحروق لدينا مستقرة للأشعة فوق البنفسجية ومنصهرة في الفرن على سطح الزجاج — لا تُطبَّق كفيلم أو طلاء. اللون لا يمكن أن يتقشر أو يبهت.',
      },
    },
  ],

  cta: {
    title:    { en: 'Commission a Bespoke Glass Installation',   ar: 'اطلب تركيب زجاج مخصص'             },
    subtitle: { en: 'Send us your space dimensions and design inspiration. We\'ll develop a concept and physical samples at no obligation.', ar: 'أرسل لنا أبعاد المكان وإلهام التصميم. سنطور مفهوماً وعينات مادية بدون التزام.' },
    button:   { en: 'Request a Quote',                           ar: 'اطلب عرض سعر'                      },
    image:    'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=900&h=700&fit=crop',
  },
}

// ─── Export map ───────────────────────────────────────────────────────────────

export const MATERIAL_CONTENT: Record<'upvc' | 'aluminum' | 'glass', MaterialContent> = {
  upvc,
  aluminum,
  glass,
}
