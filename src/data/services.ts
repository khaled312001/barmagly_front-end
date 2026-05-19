// Static services catalogue. Powers the /services pages so they always render
// rich, indexable content even when the API backend is offline. Every entry is
// optimised for search — broad keyword coverage in both Arabic and English.

export interface StaticService {
    slug: string;
    title: string;
    titleEn: string;
    summary: string;
    summaryEn: string;
    description: string;
    descriptionEn: string;
    features: string[];
    featuresEn: string[];
    keywords: string[];
    keywordsEn: string[];
    icon: string;
    image: string;
    faqs: Array<{ q: string; a: string; qEn: string; aEn: string }>;
    order: number;
}

const SHOT = (path: string) =>
    `https://www.barmagly.tech/og-image.png`;

export const servicesData: StaticService[] = [
    {
        slug: 'web-development',
        title: 'تصميم وتطوير المواقع الإلكترونية',
        titleEn: 'Web Development & Design',
        summary:
            'مواقع ويب احترافية بسرعة عالية، تصميم متجاوب على كل الأجهزة، وSEO مدمج لتظهر في الصفحة الأولى من Google.',
        summaryEn:
            'High-performance, mobile-first websites with built-in SEO so you land on page one of Google.',
        description:
            'نصمم ونطور مواقع إلكترونية احترافية تجمع بين الجمال البصري والأداء التقني الفائق. كل موقع نبنيه يحقق نتائج فحص PageSpeed أعلى من 90، يستجيب لكل أحجام الشاشات (موبايل، تابلت، ديسكتوب)، ويأتي مع تحسين كامل لمحركات البحث (SEO) منذ اليوم الأول. سواء كنت تحتاج موقع تعريفي للشركة، landing page تسويقية، أو موقع متكامل بنظام إدارة محتوى، فريقنا يستخدم أحدث التقنيات (Next.js, React, Tailwind) لتسليم نتيجة تليق بهويتك.',
        descriptionEn:
            'We design and build websites that combine beautiful design with elite engineering. Every site we ship scores 90+ on PageSpeed, adapts to every screen size, and ships with SEO baked in from day one. Whether you need a corporate site, a marketing landing page, or a full CMS-driven platform, we use the latest stack (Next.js, React, Tailwind) to deliver a result worthy of your brand.',
        features: [
            'تصميم متجاوب (Responsive Design) على كل الأجهزة',
            'سرعة تحميل فائقة (Core Web Vitals)',
            'نظام إدارة محتوى (CMS) سهل الاستخدام',
            'تحسين SEO تقني وداخلي شامل',
            'دعم متعدد اللغات (عربي، إنجليزي، روسي)',
            'تكامل مع Google Analytics و Search Console',
            'حماية وأمان (SSL, OWASP Top 10)',
            'استضافة وصيانة دورية',
        ],
        featuresEn: [
            'Fully responsive design — phone, tablet, desktop',
            'Elite-tier load speed (passing Core Web Vitals)',
            'Friendly headless CMS for editors',
            'Comprehensive technical + on-page SEO',
            'Multi-language: Arabic, English, Russian',
            'Google Analytics + Search Console hookup',
            'Hardened security (SSL, OWASP Top 10)',
            'Managed hosting and ongoing maintenance',
        ],
        keywords: [
            'تصميم مواقع', 'تطوير مواقع', 'تصميم موقع شركة', 'تصميم موقع الكتروني',
            'برمجة مواقع', 'تصميم مواقع سويسرا', 'تصميم مواقع مصر', 'تصميم مواقع السعودية',
            'تصميم مواقع الامارات', 'تصميم موقع احترافي', 'تصميم موقع متجاوب',
            'افضل شركة تصميم مواقع', 'شركة تصميم مواقع', 'برمجة موقع', 'انشاء موقع',
            'تصميم مواقع responsive', 'سيو مواقع', 'تحسين محركات البحث',
            'next.js development', 'react development', 'web design agency',
        ],
        keywordsEn: [
            'web development', 'website design', 'next.js development', 'react development',
            'website agency', 'corporate website', 'landing page design', 'cms development',
            'responsive web design', 'web design switzerland', 'web design middle east',
            'enterprise web development', 'progressive web app', 'pwa development',
            'website redesign', 'web development company', 'frontend development',
            'fullstack development', 'jamstack', 'headless cms',
        ],
        icon: 'Code2',
        image: SHOT('/web-dev'),
        faqs: [
            {
                q: 'كم يستغرق بناء موقع إلكتروني؟',
                a: 'يعتمد على حجم المشروع: موقع تعريفي بسيط من 2-4 أسابيع، منصة متكاملة من 6-12 أسبوع. نعطي خطة زمنية واضحة قبل البدء.',
                qEn: 'How long does it take to build a website?',
                aEn: 'Depends on scope: a simple corporate site is 2-4 weeks, a full platform is 6-12 weeks. You get a fixed timeline before we start.',
            },
            {
                q: 'هل التصميم يدعم اللغة العربية بشكل صحيح (RTL)؟',
                a: 'نعم بالتأكيد. كل مواقعنا تدعم RTL بشكل أصلي مع اختبار شامل لجميع المكونات والنماذج.',
                qEn: 'Does the design support Arabic (RTL) properly?',
                aEn: 'Absolutely. Every site we build supports RTL natively with full QA on components and forms.',
            },
            {
                q: 'هل يشمل العقد تحسين SEO؟',
                a: 'نعم، SEO تقني (سرعة، canonical، sitemap، schema، hreflang) مدمج في كل مشروع. الـ SEO المحتوى يمكن إضافته كخدمة مستقلة.',
                qEn: 'Is SEO included in the contract?',
                aEn: 'Yes — technical SEO (speed, canonical, sitemap, schema, hreflang) is built into every project. Content SEO is available as a separate engagement.',
            },
        ],
        order: 1,
    },
    {
        slug: 'mobile-app-development',
        title: 'تطوير تطبيقات الموبايل',
        titleEn: 'Mobile App Development',
        summary:
            'تطبيقات iOS و Android بأداء أصلي، تجربة استخدام احترافية، وتكامل كامل مع خدمات الواجهة الخلفية.',
        summaryEn:
            'iOS and Android apps with native performance, polished UX, and a fully-integrated backend.',
        description:
            'نطور تطبيقات موبايل احترافية على نظامي iOS و Android باستخدام Flutter و React Native لأقصى كفاءة في التكلفة والوقت، أو Swift/Kotlin أصلي عندما يتطلب الأمر أداءً قصوى. كل تطبيق يأتي مع تصميم UX/UI مخصص، تكامل API احترافي، نظام إشعارات، تحليلات، ودعم نشر على App Store و Google Play. نحن نتعامل مع كل التفاصيل التقنية من التصميم حتى النشر والصيانة.',
        descriptionEn:
            'We build production-grade mobile apps on iOS and Android using Flutter and React Native for the best speed-to-market — or native Swift/Kotlin when performance demands it. Every app ships with custom UX/UI, robust API integration, push notifications, analytics, and full App Store + Google Play release support. We handle every detail from design through launch and maintenance.',
        features: [
            'تطبيقات أصلية iOS و Android',
            'تطبيقات هجينة (Flutter, React Native)',
            'تصميم تجربة استخدام (UX/UI) مخصص',
            'نظام إشعارات push notifications',
            'تكامل API و backend',
            'دعم الدفع داخل التطبيق',
            'نشر على App Store و Google Play',
            'صيانة ودعم ما بعد النشر',
        ],
        featuresEn: [
            'Native iOS & Android apps',
            'Cross-platform (Flutter, React Native)',
            'Custom UX/UI design',
            'Push notification infrastructure',
            'Backend API integration',
            'In-app payment support',
            'App Store + Google Play submission',
            'Post-launch maintenance & support',
        ],
        keywords: [
            'تطوير تطبيقات', 'برمجة تطبيقات الموبايل', 'تطبيقات اندرويد', 'تطبيقات ايفون',
            'تصميم تطبيقات', 'شركة برمجة تطبيقات', 'تطبيقات flutter', 'تطبيقات react native',
            'تطوير تطبيقات سويسرا', 'تطوير تطبيقات مصر', 'تطوير تطبيقات السعودية',
            'برمجة تطبيق توصيل', 'برمجة تطبيق طلبات', 'برمجة تطبيق متجر', 'برمجة تطبيق حجوزات',
            'تطبيق موبايل احترافي', 'افضل شركة تطبيقات', 'mobile app development',
        ],
        keywordsEn: [
            'mobile app development', 'ios app development', 'android app development',
            'flutter development', 'react native development', 'cross platform mobile',
            'native app development', 'app design', 'mobile ux', 'app development company',
            'startup mvp mobile', 'enterprise mobile apps', 'app store submission',
            'google play submission', 'mobile backend', 'push notifications',
        ],
        icon: 'Smartphone',
        image: SHOT('/mobile-app'),
        faqs: [
            {
                q: 'هل تطورون تطبيقات أصلية أم هجينة؟',
                a: 'كلاهما. نوصي بـ Flutter للسرعة وانخفاض التكلفة، و Swift/Kotlin الأصلي للتطبيقات الحساسة للأداء (ألعاب، AR، تطبيقات بنكية).',
                qEn: 'Native or cross-platform?',
                aEn: 'Both. We recommend Flutter for speed and cost, and native Swift/Kotlin for performance-critical apps (games, AR, banking).',
            },
            {
                q: 'كم تكلفة تطبيق موبايل؟',
                a: 'يبدأ MVP بسيط من $5,000 وحتى تطبيقات SaaS متقدمة بأكثر من $80,000. نقدم تقدير مجاني بعد جلسة استكشاف 30 دقيقة.',
                qEn: 'How much does a mobile app cost?',
                aEn: 'A simple MVP starts around $5,000; complex SaaS apps run $80,000+. You get a free estimate after a 30-minute discovery call.',
            },
        ],
        order: 2,
    },
    {
        slug: 'e-commerce-development',
        title: 'تطوير المتاجر الإلكترونية',
        titleEn: 'E-Commerce Development',
        summary:
            'متاجر إلكترونية كاملة الأداء على Shopify, WooCommerce, Magento، أو حلول مخصصة Next.js مع تكامل كامل للدفع والشحن.',
        summaryEn:
            'High-performance stores on Shopify, WooCommerce, Magento, or a bespoke Next.js stack with full payments + shipping integration.',
        description:
            'نبني متاجر إلكترونية تحول الزوار إلى عملاء. سواء كنت تبدأ من الصفر أو تنقل متجرك من منصة قديمة، نقدم حلول مخصصة بأعلى معدلات تحويل في السوق. نتعامل مع كل التفاصيل: تصميم تجربة الشراء، تكامل بوابات الدفع (Visa, Mastercard, Mada, Stripe, PayPal)، إدارة المخزون، تكامل مع شركات الشحن، نظام كوبونات وعروض، وتحليلات تفصيلية لكل خطوة في رحلة العميل.',
        descriptionEn:
            'We build stores that turn visitors into buyers. Whether you are starting from scratch or migrating from a legacy platform, we ship custom solutions with category-leading conversion rates. We handle every detail: checkout UX, payment integration (Visa, Mastercard, Mada, Stripe, PayPal), inventory, shipping integrations, coupons and promotions, and granular analytics across the customer journey.',
        features: [
            'متاجر Shopify, WooCommerce, Magento',
            'حلول مخصصة على Next.js + Stripe',
            'تكامل مع جميع بوابات الدفع المحلية والدولية',
            'إدارة المخزون والطلبات',
            'تكامل مع شركات الشحن (Aramex, DHL, FedEx, J&T)',
            'نظام كوبونات وعروض ترويجية',
            'دفع متعدد العملات',
            'تحليلات Google Analytics و Meta Pixel',
        ],
        featuresEn: [
            'Shopify, WooCommerce, Magento builds',
            'Bespoke Next.js + Stripe storefronts',
            'Local + international payment gateways',
            'Inventory and order management',
            'Shipping integrations (Aramex, DHL, FedEx, J&T)',
            'Coupons and promotional tooling',
            'Multi-currency checkout',
            'GA4 + Meta Pixel analytics',
        ],
        keywords: [
            'تصميم متجر الكتروني', 'انشاء متجر الكتروني', 'تطوير متجر', 'تجارة الكترونية',
            'شوبيفاي', 'shopify', 'ووكومرس', 'woocommerce', 'ماجنتو', 'magento',
            'تصميم متجر سعودية', 'تصميم متجر امارات', 'تصميم متجر مصر',
            'افضل شركة تجارة الكترونية', 'بوابات دفع', 'تكامل دفع', 'مدى', 'visa',
            'تصميم متجر احترافي', 'انشاء متجر اون لاين', 'متجر متعدد التجار',
            'marketplace development', 'e-commerce agency',
        ],
        keywordsEn: [
            'e-commerce development', 'shopify development', 'woocommerce development',
            'magento development', 'custom e-commerce', 'next.js commerce', 'stripe integration',
            'marketplace development', 'multi-vendor platform', 'b2b ecommerce',
            'd2c ecommerce', 'subscription commerce', 'headless commerce',
            'ecommerce agency', 'ecommerce migration', 'ecommerce seo',
        ],
        icon: 'ShoppingCart',
        image: SHOT('/ecommerce'),
        faqs: [
            {
                q: 'أيهما أفضل: Shopify أم متجر مخصص؟',
                a: 'Shopify ممتاز للبدء السريع (تحت 3 أشهر). متجر مخصص (Next.js) أفضل عندما تحتاج تجربة فريدة أو تكامل معقد مع أنظمتك الداخلية.',
                qEn: 'Shopify or custom store?',
                aEn: 'Shopify is great for fast launch (under 3 months). A custom store (Next.js) is better when you need a unique experience or deep integration with internal systems.',
            },
            {
                q: 'هل تتكاملون مع بوابات الدفع المحلية مثل مدى؟',
                a: 'نعم. نتكامل مع مدى، Tap، PayTabs، HyperPay، PayMob في الشرق الأوسط، وStripe، PayPal، Adyen دولياً.',
                qEn: 'Do you integrate local payment gateways like Mada?',
                aEn: 'Yes — Mada, Tap, PayTabs, HyperPay, PayMob in the Middle East, plus Stripe, PayPal, Adyen internationally.',
            },
        ],
        order: 3,
    },
    {
        slug: 'ui-ux-design',
        title: 'تصميم تجربة وواجهة المستخدم UI/UX',
        titleEn: 'UI/UX Design',
        summary:
            'تصميم تجربة مستخدم مدروس وواجهات بصرية تحقق التحويل، من الأبحاث حتى النموذج التفاعلي.',
        summaryEn:
            'Research-driven UX and conversion-focused UI, from discovery through interactive prototype.',
        description:
            'نصمم تجارب رقمية مدروسة تبدأ بفهم عميق للمستخدم وتنتهي بمنتج جميل وفعال. عملية التصميم تشمل: بحث المستخدم وتحليل المنافسين، خرائط رحلة المستخدم (User Journey Maps)، Wireframes تفاعلية على Figma، تصميم نهائي (Hi-Fi UI)، نموذج تفاعلي قابل للاختبار، ودليل تصميم (Design System) متكامل. نتيجة كل تصميم: تجربة مستخدم تزيد التحويلات وتقلل معدل الارتداد.',
        descriptionEn:
            'We design digital experiences that start with deep user understanding and end with a beautiful, effective product. Our process: user research and competitor analysis, journey maps, interactive Figma wireframes, hi-fi UI, a testable prototype, and a full design system. The result: experiences that lift conversion and reduce bounce.',
        features: [
            'بحث المستخدم وتحليل المنافسين',
            'خرائط رحلة المستخدم (User Journey)',
            'Wireframes تفاعلية',
            'تصميم Hi-Fi UI',
            'نموذج تفاعلي على Figma',
            'دليل تصميم (Design System)',
            'اختبار قابلية الاستخدام (Usability Testing)',
            'تحسين معدل التحويل (CRO)',
        ],
        featuresEn: [
            'User research and competitor audit',
            'User journey maps',
            'Interactive wireframes',
            'Hi-fi UI design',
            'Clickable Figma prototype',
            'Design system documentation',
            'Usability testing',
            'Conversion rate optimisation (CRO)',
        ],
        keywords: [
            'تصميم تجربة مستخدم', 'ux تصميم', 'ui تصميم', 'تصميم واجهات',
            'تصميم تطبيقات', 'تصميم مواقع', 'فيجما', 'figma', 'design system',
            'تصميم منتج رقمي', 'تصميم اب', 'تصميم تطبيق موبايل',
            'افضل مصمم ux', 'افضل مصمم ui', 'تصميم تفاعلي', 'wireframes',
            'product design', 'mobile app design', 'web app design',
        ],
        keywordsEn: [
            'ui ux design', 'product design', 'figma design', 'user experience design',
            'user interface design', 'design system', 'wireframing', 'prototyping',
            'mobile app design', 'web app design', 'design audit', 'cro design',
            'usability testing', 'ux research', 'design agency',
        ],
        icon: 'Palette',
        image: SHOT('/uiux'),
        faqs: [
            {
                q: 'هل أحتاج إلى تصميم UX قبل البرمجة؟',
                a: 'دائماً. التصميم الجيد قبل البرمجة يقلل تكلفة التطوير 30-40% ويرفع معدل التحويل بشكل ملحوظ.',
                qEn: 'Do I need UX before development?',
                aEn: 'Always. Good design upfront cuts dev cost by 30-40% and lifts conversion materially.',
            },
        ],
        order: 4,
    },
    {
        slug: 'digital-marketing',
        title: 'التسويق الرقمي و SEO',
        titleEn: 'Digital Marketing & SEO',
        summary:
            'حملات Google Ads, Meta Ads, TikTok Ads بميزانية محسّنة، وSEO يضعك في الصفحة الأولى من Google.',
        summaryEn:
            'Optimised Google, Meta, and TikTok ad campaigns plus SEO that puts you on page one of Google.',
        description:
            'نبني استراتيجيات تسويق رقمي قائمة على البيانات تحقق ROI واضح ومقيس. خدماتنا تشمل: تحسين محركات البحث (SEO تقني، محتوى، روابط خلفية)، حملات Google Ads (Search, Display, Shopping, YouTube)، إعلانات السوشيال (Meta, TikTok, LinkedIn)، إدارة المحتوى، وتسويق المؤثرين. كل حملة نطلقها تأتي مع تقارير شهرية تفصيلية وتحسين مستمر.',
        descriptionEn:
            'Data-driven digital marketing strategies that produce measurable ROI. We deliver: SEO (technical, content, backlinks), Google Ads (Search, Display, Shopping, YouTube), social ads (Meta, TikTok, LinkedIn), content management, and influencer marketing. Every campaign comes with detailed monthly reporting and continuous optimisation.',
        features: [
            'SEO تقني وكلمات مفتاحية',
            'حملات Google Ads (Search, Display, Shopping)',
            'إعلانات Meta (Facebook, Instagram)',
            'إعلانات TikTok و LinkedIn',
            'كتابة محتوى متخصص',
            'إدارة السوشيال ميديا',
            'تسويق المؤثرين',
            'تقارير شهرية تفصيلية',
        ],
        featuresEn: [
            'Technical and keyword SEO',
            'Google Ads (Search, Display, Shopping)',
            'Meta ads (Facebook, Instagram)',
            'TikTok and LinkedIn ads',
            'Specialised content writing',
            'Social media management',
            'Influencer marketing',
            'Detailed monthly reporting',
        ],
        keywords: [
            'تسويق رقمي', 'سيو', 'seo', 'تحسين محركات البحث', 'اعلانات جوجل', 'google ads',
            'اعلانات فيسبوك', 'meta ads', 'تيك توك ادز', 'tiktok ads', 'لينكدان ادز',
            'افضل شركة تسويق', 'شركة تسويق رقمي', 'تسويق سوشيال ميديا', 'social media marketing',
            'تسويق المحتوى', 'content marketing', 'كتابة محتوى', 'تسويق المؤثرين',
            'influencer marketing', 'حملات تسويقية', 'تسويق الكتروني',
        ],
        keywordsEn: [
            'digital marketing', 'seo agency', 'google ads management', 'meta ads',
            'social media marketing', 'content marketing', 'influencer marketing',
            'tiktok ads', 'linkedin ads', 'b2b marketing', 'performance marketing',
            'conversion rate optimisation', 'keyword research', 'link building',
            'technical seo', 'local seo', 'international seo',
        ],
        icon: 'TrendingUp',
        image: SHOT('/marketing'),
        faqs: [
            {
                q: 'كم تستغرق نتائج SEO؟',
                a: 'تظهر نتائج SEO التقني خلال 2-4 أسابيع. نتائج المحتوى والكلمات المفتاحية تأخذ 3-6 أشهر للوصول للصفحة الأولى.',
                qEn: 'How long does SEO take?',
                aEn: 'Technical SEO shows results in 2-4 weeks. Content + keyword wins take 3-6 months to land page one.',
            },
        ],
        order: 5,
    },
    {
        slug: 'erp-business-systems',
        title: 'أنظمة ERP وإدارة الأعمال',
        titleEn: 'ERP & Business Systems',
        summary:
            'أنظمة ERP مخصصة، CRM، POS، وحلول إدارة الموارد البشرية تربط كل أقسام شركتك في منصة واحدة.',
        summaryEn:
            'Custom ERP, CRM, POS, and HR systems that unify every department in a single platform.',
        description:
            'نطور أنظمة إدارة أعمال متكاملة تنقل شركتك من العمل بجداول Excel إلى منصة احترافية موحدة. أنظمتنا تشمل: ERP (المالية، المخزون، المشتريات، الإنتاج)، CRM (إدارة العملاء والمبيعات)، POS (نقاط البيع للمطاعم والمتاجر)، HR (إدارة الموظفين والرواتب)، وأنظمة التقارير التحليلية. كل نظام مصمم خصيصاً لاحتياجاتك وقابل للتوسع مع نمو شركتك.',
        descriptionEn:
            'Integrated business systems that take your company from spreadsheets to a unified, enterprise-grade platform. Our systems cover: ERP (finance, inventory, procurement, production), CRM (customer + sales), POS (restaurant + retail), HR (employees + payroll), and analytics dashboards. Each system is purpose-built and scales with your company.',
        features: [
            'ERP متكامل (مالية، مخزون، مشتريات)',
            'CRM (إدارة العملاء والمبيعات)',
            'POS للمطاعم والمتاجر',
            'إدارة الموارد البشرية وكشوف المرتبات',
            'تقارير تحليلية ولوحات تحكم',
            'تكامل مع البنوك والضرائب',
            'دعم متعدد الفروع والعملات',
            'تطبيقات موبايل للمدراء',
        ],
        featuresEn: [
            'Full ERP (finance, inventory, procurement)',
            'CRM (customer + sales pipeline)',
            'POS for restaurants + retail',
            'HR with payroll',
            'Analytics dashboards',
            'Bank + tax integration',
            'Multi-branch, multi-currency',
            'Manager mobile apps',
        ],
        keywords: [
            'نظام erp', 'نظام ادارة', 'نظام محاسبة', 'نظام مبيعات', 'crm',
            'نظام crm', 'نقاط بيع', 'pos', 'نظام مطعم', 'نظام متجر', 'نظام مخازن',
            'نظام موارد بشرية', 'نظام رواتب', 'برامج محاسبة', 'برنامج محاسبي',
            'افضل نظام erp', 'erp system', 'business management system',
            'حسابات الشركات', 'نظام فاتورة', 'الفاتورة الالكترونية',
        ],
        keywordsEn: [
            'erp system', 'erp development', 'crm system', 'pos system',
            'restaurant pos', 'retail pos', 'hr software', 'payroll software',
            'inventory management', 'warehouse management', 'business intelligence',
            'custom erp', 'enterprise software', 'business automation',
            'workflow automation', 'b2b software', 'saas erp',
        ],
        icon: 'Layers',
        image: SHOT('/erp'),
        faqs: [
            {
                q: 'هل تطورون نظام مخصص أم تستخدمون أنظمة جاهزة؟',
                a: 'الاثنين. للشركات التي تحتاج عمليات قياسية نستخدم Odoo أو Zoho. للعمليات المعقدة نطور نظام مخصص بـ Next.js + Node.js.',
                qEn: 'Custom or off-the-shelf?',
                aEn: 'Both. For standard ops we deploy Odoo or Zoho. For complex flows we build a custom Next.js + Node.js system.',
            },
        ],
        order: 6,
    },
];

export function getAllServices(): StaticService[] {
    return [...servicesData].sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): StaticService | null {
    return servicesData.find((s) => s.slug === slug) || null;
}
