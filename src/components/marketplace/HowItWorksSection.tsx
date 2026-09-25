import React from 'react';
import { Search, SlidersHorizontal, UserCheck, Ruler, Scissors, PackageCheck } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export const HowItWorksSection: React.FC = () => {
  const { isRtl } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: Search,
      title: isRtl ? 'ابحث واستكشف' : 'Discover',
      desc: isRtl
        ? 'ابحث عن المشاغل ومعلّمي التفصيل الأقرب لمدينتك وحيك.'
        : 'Find top-rated tailoring salons and master tailors near you.',
    },
    {
      num: '02',
      icon: SlidersHorizontal,
      title: isRtl ? 'قارن بشفافية' : 'Compare',
      desc: isRtl
        ? 'راجع الأسعار، وعينات الأقمشة، وسنوات الخبرة والتقييمات المعتمدة.'
        : 'Review services, prices, fabric varieties, and verified ratings.',
    },
    {
      num: '03',
      icon: UserCheck,
      title: isRtl ? 'اختر المشغل' : 'Choose',
      desc: isRtl
        ? 'حدد المشغل أو الخيّاط المتخصص في النمط الذي تفضله.'
        : 'Select the bespoke artisan best matching your preferred style.',
    },
    {
      num: '04',
      icon: Ruler,
      title: isRtl ? 'أخذ القياس الدقيق' : 'Measure',
      desc: isRtl
        ? 'احجز موعد أخذ القياس بالمنزل VIP أو قم بزيارة المشغل.'
        : 'Book a convenient home fitting appointment or in-shop consultation.',
    },
    {
      num: '05',
      icon: Scissors,
      title: isRtl ? 'حياكة مخصصة' : 'Craft & Order',
      desc: isRtl
        ? 'حدد مواصفات القلاب، الكبك، ونوع القماش الياباني أو الإنجليزي.'
        : 'Customize collar stiffness, cuffs, and premium fabrics.',
    },
    {
      num: '06',
      icon: PackageCheck,
      title: isRtl ? 'متابعة واستلام' : 'Track & Receive',
      desc: isRtl
        ? 'تابع مراحل البروفة الأولى والتشطيب النهائي حتى استلام ثوبك جاهزاً.'
        : 'Follow production from cutting to first fitting and final delivery.',
    },
  ];

  return (
    <section id="how-it-works" className="space-y-6 text-start">
      <div className="border-b border-[#E6E2DB] pb-4">
        <div className="text-xs font-semibold text-[#916F3E] uppercase tracking-wider mb-1">
          {isRtl ? 'خطوات بسيطة وشفافة' : 'Simple Seamless Journey'}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] tracking-tight">
          {isRtl ? 'كيف تعمل منصة خيّاط؟' : 'How the Platform Works'}
        </h2>
        <p className="text-xs sm:text-sm text-[#65625D] mt-1">
          {isRtl
            ? 'رحلة تفصيل مصممة لتضمن لك أعلى درجات الراحة والجودة من الاستكشاف وحتى ارتداء ثوبك الجديد.'
            : 'A refined digital journey designed to guarantee precision fit, transparency, and supreme sartorial satisfaction.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-5 relative flex flex-col justify-between hover:border-[#C5A880]/60 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F3EF] border border-[#E6E2DB] flex items-center justify-center text-[#916F3E]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold font-mono tabular-nums text-[#8E8B85]">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#121316] mb-1.5">{step.title}</h3>
                <p className="text-xs text-[#65625D] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
