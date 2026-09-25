import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';

export const Footer: React.FC = () => {
  const { t, isRtl, language, toggleLanguage } = useLanguage();

  return (
    <footer className="bg-[#121316] text-[#FAF9F6] border-t border-[#24262E] pt-16 pb-24 md:pb-16 text-start select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-5 Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-10 pb-12 border-b border-[#24262E]">
          {/* Column 1: Brand & Identity */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display tracking-tight text-[#FAF9F6]">
                KHAYYAT
              </span>
              <span className="text-lg font-semibold text-[#C5A880] font-arabic">
                خيّاط
              </span>
            </div>
            <p className="text-sm text-[#A8A49D] max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="text-xs text-[#7A766F] max-w-sm leading-relaxed">
              {t.footer.heritage}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#C5A880]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{t.footer.crInfo}</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-[#FAF9F6] bg-[#24262E] hover:bg-[#3D404D] border border-[#3D404D] transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{language === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#FAF9F6] uppercase tracking-wider">
              {isRtl ? 'استكشف' : 'Explore'}
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A49D]">
              <li>
                <a href="#shops" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'مشاغل ودور الخياطة' : 'Tailoring Ateliers'}
                </a>
              </li>
              <li>
                <a href="#tailors" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'معلّمو التفصيل (كاريغار)' : 'Master Tailors'}
                </a>
              </li>
              <li>
                <a href="#designs" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'أعمال وتصاميم مختارة' : 'Portfolio Showcase'}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'خدمات التفصيل والأسعار' : 'Services & Pricing'}
                </a>
              </li>
              <li>
                <a href="#gulf-styles" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'أنماط الثوب الخليجي' : 'Gulf Sartorial Styles'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: For Customers */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#FAF9F6] uppercase tracking-wider">
              {isRtl ? 'للعملاء' : 'For Clients'}
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A49D]">
              <li>
                <a href="#home-measurement" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'حجز القياس المنزلي VIP' : 'Book Home Measurement'}
                </a>
              </li>
              <li>
                <a href="#compare" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'مقارنة المشاغل والأسعار' : 'Compare Salons'}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'كيف تعمل المنصة' : 'How It Works'}
                </a>
              </li>
              <li>
                <a href="#guarantee" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'ضمان دقة المقاس' : 'Fitting Guarantee'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: For Shops & Tailors */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#FAF9F6] uppercase tracking-wider">
              {isRtl ? 'المهنيون والمشاغل' : 'Ateliers & Tailors'}
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A49D]">
              <li>
                <a href="#register-shop" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'تسجيل دار خياطة جديدة' : 'List Your Atelier'}
                </a>
              </li>
              <li>
                <a href="#join-tailor" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'انضم كمعلّم تفصيل مستقل' : 'Join as Master Karigar'}
                </a>
              </li>
              <li>
                <a href="#collaboration" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'عروض التوظيف والتعاون' : 'Recruitment & Offers'}
                </a>
              </li>
              <li>
                <a href="#standards" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'معايير الجودة المعتمدة' : 'Quality Standards'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Support & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#FAF9F6] uppercase tracking-wider">
              {isRtl ? 'الثقة والامتثال' : 'Trust & Legal'}
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A49D]">
              <li>
                <a href="#privacy" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy Policy'}
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#FAF9F6] transition-colors">
                  {isRtl ? 'شروط الخدمة والتعاقد' : 'Terms of Service'}
                </a>
              </li>
              <li>
                <span className="text-[#7A766F] block">
                  {isRtl ? 'الأسعار تشمل 15% ضريبة القيمة المضافة' : 'Prices include 15% Saudi VAT'}
                </span>
              </li>
              <li>
                <span className="text-[#C5A880] block text-[11px]">
                  {isRtl ? 'ممتثل لوزارة التجارة السعودية' : 'Ministry of Commerce Compliant'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Cities and Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A766F]">
          <p>{t.footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[#A8A49D]">
            <span>الرياض (Riyadh)</span>
            <span>·</span>
            <span>جدة (Jeddah)</span>
            <span>·</span>
            <span>الخبر (Khobar)</span>
            <span>·</span>
            <span>الدمام (Dammam)</span>
            <span>·</span>
            <span>مكة المكرمة (Makkah)</span>
            <span>·</span>
            <span>المدينة المنورة (Madinah)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
