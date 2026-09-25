import React from 'react';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { Button } from '../ui/Button';

export interface GulfStyleItem {
  id: string;
  name: string;
  nameAr: string;
  origin: string;
  originAr: string;
  description: string;
  descriptionAr: string;
  collarDetail: string;
  collarDetailAr: string;
  cuffDetail: string;
  cuffDetailAr: string;
}

export const gulfStylesData: GulfStyleItem[] = [
  {
    id: 'saudi',
    name: 'Saudi Royal Cut',
    nameAr: 'الثوب السعودي الملكي الأصيل',
    origin: 'Kingdom of Saudi Arabia',
    originAr: 'المملكة العربية السعودية',
    description: 'Crisp standing royal collar, clean structured chest placket, and French double cuffs for gold or silver cufflinks.',
    descriptionAr: 'قلاب ملكي مقوّى مشدود، كبك فرنسي مزدوج لأزرار الصدف أو الفضة، ونزلة كتف انسيابية تمنح هيبة ووقاراً سعودياً أصيلاً.',
    collarDetail: 'Stiff Standing 4.5cm Collar',
    collarDetailAr: 'قلاب ملكي مشدود 4.5 سم',
    cuffDetail: 'Double French Cuff for Cufflinks',
    cuffDetailAr: 'كبك فرنسي مزدوج للأزرار',
  },
  {
    id: 'kuwaiti',
    name: 'Kuwaiti Breeze Style',
    nameAr: 'الثوب الكويتي الانسيابي',
    origin: 'Kuwait & Northern Gulf',
    originAr: 'الكويت وشمال الخليج',
    description: 'Relaxed soft-roll collar with minimal stiffening, open straight sleeves, and lightweight Toyobo weave for maximum summer comfort.',
    descriptionAr: 'قلاب ناعم مريح بدون بطانة زائدة، وأكمام سادة مفتوحة بدون كبك، وأقمشة قطنية صيفية فائقة الخفة والانسيابية.',
    collarDetail: 'Soft-Roll 3.8cm Flexible Collar',
    collarDetailAr: 'قلاب ناعم مرن 3.8 سم',
    cuffDetail: 'Open Straight Sleeve (Sada)',
    cuffDetailAr: 'كم مفتوح سادة بخياطة مزدوجة',
  },
  {
    id: 'emirati',
    name: 'Emirati Collarless Cut',
    nameAr: 'الثوب الإماراتي الأصيل بالطربوش',
    origin: 'United Arab Emirates',
    originAr: 'دولة الإمارات العربية المتحدة',
    description: 'Distinguished by a round collarless neckline and a hand-plaited detachable silk tassel (Tarboosha) with matching chest topstitch.',
    descriptionAr: 'رقبة دائرية مريحة خالية من القلاب، يتوسطها طربوش حريري منسوج يدوياً يمكن فكه أو تبديله، مع خياطة ناعمة على أطراف الصدر.',
    collarDetail: 'Round Collarless with Tarboosha',
    collarDetailAr: 'رقبة دائرية بدون قلاب مع طربوش',
    cuffDetail: 'Soft Single Button Placket',
    cuffDetailAr: 'أساور خفيفة بزر صدفي ناعم',
  },
  {
    id: 'qatari',
    name: 'Qatari Formal High Standing',
    nameAr: 'الثوب القطري بقلاب مرتفع مشدود',
    origin: 'State of Qatar',
    originAr: 'دولة قطر',
    description: 'High-standing double collar fastened with concealed snap buttons and structured vertical darting for a sharp executive profile.',
    descriptionAr: 'قلاب مرتفع مشدود حتى 5.0 سم بأزرار طقطق مخفية وقصة صدر مستقيمة تمنح الثوب استقامة بارزة للأفراح والمناسبات.',
    collarDetail: 'High Standing 5.0cm Double Snap',
    collarDetailAr: 'قلاب عالي 5.0 سم بطقطق مخفي',
    cuffDetail: 'Wide Straight Stiff Cuff',
    cuffDetailAr: 'كبك مستقيم عريض مقوّى',
  },
  {
    id: 'bahraini',
    name: 'Bahraini Classic Pocket',
    nameAr: 'الثوب البحريني الكلاسيكي',
    origin: 'Kingdom of Bahrain',
    originAr: 'مملكة البحرين',
    description: 'Classic shirt-style collar with button-down points, open sleeve finish, and prominent single chest pocket tailored for business.',
    descriptionAr: 'ياقة قميصية كلاسيكية شبيهة بالقميص الإفرنجي، مع جيب صدر بارز وأكمام مريحة مناسبة لبيئات العمل والحياة اليومية.',
    collarDetail: 'Classic Shirt-Point Collar',
    collarDetailAr: 'ياقة قميصية بأطراف ناعمة',
    cuffDetail: 'Convertible Button / Cufflink',
    cuffDetailAr: 'كم مزدوج الاستخدام بزر أو كبك',
  },
  {
    id: 'omani',
    name: 'Omani Traditional Tassel',
    nameAr: 'الثوب العماني المطرز (الدشداشة)',
    origin: 'Sultanate of Oman',
    originAr: 'سلطنة عمان',
    description: 'Subtle round collarless neckline with a short decorative chest tassel (Farakha) and intricate hand embroidery along the collarline.',
    descriptionAr: 'دشداشة عمانية تقليدية بياقة دائرية منخفضة مطرزة يدوياً بخيوط ملونة مع طربوش قصير (فراخة) يُعطّر باللبان والعود.',
    collarDetail: 'Low Round with Delicate Embroidery',
    collarDetailAr: 'رقبة دائرية مطرزة بالحرير',
    cuffDetail: 'Embroidered Border Cuffs',
    cuffDetailAr: 'حواشي كم مطرزة بنقش يدوي',
  },
];

export const GulfStylesExplorer: React.FC<{ onSelectStyle?: (id: string) => void }> = ({
  onSelectStyle,
}) => {
  const { isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section id="gulf-styles" className="space-y-6 text-start">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DB] pb-4">
        <div>
          <div className="text-xs font-semibold text-[#916F3E] uppercase tracking-wider mb-1">
            {isRtl ? 'ثراء وتنوع الأزياء الخليجية' : 'Heritage & Diversity'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] tracking-tight">
            {isRtl ? 'استكشف أنماط الثوب الخليجي' : 'Explore Gulf Tailoring Styles'}
          </h2>
          <p className="text-xs sm:text-sm text-[#65625D] mt-1">
            {isRtl
              ? 'تتيح لك المنصة تفصيل مختلف الأنماط والياقات الخليجية بأيدي أمهر معلّمي الخياطة المتخصصين.'
              : 'Commission authentic regional cuts, specialized collar stiffness, and custom sleeve details across the GCC.'}
          </p>
        </div>

        <div className="text-xs text-[#916F3E] font-medium bg-[#F9F6F0] px-3 py-1.5 rounded-lg border border-[#E2D5C3]">
          6 {isRtl ? 'أنماط خليجية متوفرة' : 'Regional Styles Available'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gulfStylesData.map((style) => (
          <div
            key={style.id}
            className="group bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#C5A880]/60 hover:shadow-md text-start"
          >
            <div>
              {/* Top Tag & Title */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] text-[#916F3E] font-medium">
                  {isRtl ? style.originAr : style.origin}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              </div>

              <h3 className="text-base font-bold text-[#121316] tracking-tight group-hover:text-[#916F3E] transition-colors">
                {isRtl ? style.nameAr : style.name}
              </h3>

              <p className="text-xs text-[#65625D] mt-2 leading-relaxed line-clamp-3">
                {isRtl ? style.descriptionAr : style.description}
              </p>

              {/* Anatomy Specs */}
              <div className="mt-4 p-3 bg-[#FAF9F6] rounded-lg border border-[#E6E2DB] text-[11px] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#8E8B85]">{isRtl ? 'الياقة:' : 'Collar:'}</span>
                  <span className="font-semibold text-[#121316]">
                    {isRtl ? style.collarDetailAr : style.collarDetail}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8B85]">{isRtl ? 'الكم:' : 'Cuff:'}</span>
                  <span className="font-semibold text-[#121316]">
                    {isRtl ? style.cuffDetailAr : style.cuffDetail}
                  </span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="mt-5 pt-3 border-t border-[#F2EFE9]">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => onSelectStyle && onSelectStyle(style.id)}
                icon={<ArrowIcon className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                {isRtl ? 'استكشف المشاغل المتقنة لهذا النمط' : 'Explore Salons for this Style'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
