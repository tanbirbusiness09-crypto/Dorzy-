import React from 'react';
import { User, Store, Scissors, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { useRole } from '../role/RoleContext';
import { Button } from '../ui/Button';

export const ThreeSidedEcosystem: React.FC = () => {
  const { isRtl } = useLanguage();
  const { openRoleModal, setActiveRole } = useRole();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleRoleExplore = (role: 'customer' | 'shop_owner' | 'tailor') => {
    setActiveRole(role);
    openRoleModal();
  };

  return (
    <section className="space-y-6 text-start">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DB] pb-4">
        <div>
          <div className="text-xs font-semibold text-[#916F3E] uppercase tracking-wider mb-1">
            {isRtl ? 'منظومة متكاملة لقطاع الخياطة' : 'Three-Sided Ecosystem'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] tracking-tight">
            {isRtl ? 'منصة تربط أطراف صناعة التفصيل' : 'Built for the Entire Tailoring Ecosystem'}
          </h2>
          <p className="text-xs sm:text-sm text-[#65625D] mt-1">
            {isRtl
              ? 'نظام رقمي يجمع العملاء الباحثين عن التميز، وأصحاب المشاغل الطامحين للنمو، وأمهر معلّمي الخياطة في منصة موحدة.'
              : 'Connecting discerning clients, ambitious atelier owners, and master tailors within a single trusted marketplace.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. For Customers */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6E2DB] p-6 flex flex-col justify-between hover:border-[#C5A880]/60 hover:shadow-md transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#F5F3EF] border border-[#E6E2DB] flex items-center justify-center text-[#916F3E] mb-4">
              <User className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-bold text-[#916F3E] uppercase tracking-wider block mb-1">
              {isRtl ? 'تجربة العميل' : 'For Customers'}
            </span>

            <h3 className="text-lg font-bold text-[#121316] tracking-tight mb-3">
              {isRtl ? 'ثوبك المفضل، بأسهل طريقة' : 'Discover, Compare & Book'}
            </h3>

            <ul className="space-y-2.5 text-xs text-[#65625D] mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />
                <span>{isRtl ? 'استكشف المشاغل الأقرب إليك وقارن الأسعار' : 'Find top-rated ateliers near you and compare prices'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />
                <span>{isRtl ? 'تصفح معرض أعمال وتصاميم معلّمي التفصيل' : 'Explore signature portfolios and collar styles'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />
                <span>{isRtl ? 'احجز خدمة أخذ القياس بالمنزل VIP' : 'Book convenient VIP home measurement appointments'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />
                <span>{isRtl ? 'تابع مراحل القص والخياطة حتى التوصيل' : 'Track production from cutting to final delivery'}</span>
              </li>
            </ul>
          </div>

          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => handleRoleExplore('customer')}
            icon={<ArrowIcon className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            {isRtl ? 'ابدأ كعميل' : 'Explore as Customer'}
          </Button>
        </div>

        {/* 2. For Shop Owners */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#C5A880]/40 p-6 flex flex-col justify-between hover:border-[#C5A880] hover:shadow-md transition-all relative">
          <div className="absolute top-4 end-4">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F9F6F0] text-[#916F3E] border border-[#E2D5C3]">
              {isRtl ? 'لأصحاب الأعمال' : 'Business'}
            </span>
          </div>

          <div>
            <div className="w-12 h-12 rounded-xl bg-[#FBF8F3] border border-[#E2D5C3] flex items-center justify-center text-[#916F3E] mb-4">
              <Store className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-bold text-[#916F3E] uppercase tracking-wider block mb-1">
              {isRtl ? 'لأصحاب المشاغل والدور' : 'For Atelier Owners'}
            </span>

            <h3 className="text-lg font-bold text-[#121316] tracking-tight mb-3">
              {isRtl ? 'طوّر مشغلك ونمّ مبيعاتك' : 'Grow Your Atelier & Team'}
            </h3>

            <ul className="space-y-2.5 text-xs text-[#65625D] mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />
                <span>{isRtl ? 'أنشئ ملفاً رقمياً موثقاً لدارك وخدماتك' : 'Create a verified digital salon profile & service menu'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />
                <span>{isRtl ? 'استقبل طلبات التفصيل وحجوزات المواعيد' : 'Receive direct bespoke orders and fitting bookings'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />
                <span>{isRtl ? 'استقطب أمهر معلّمي الخياطة وأرسل عروض عمل' : 'Discover skilled karigars and send collaboration offers'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />
                <span>{isRtl ? 'نظّم مراحل الإنتاج وفريق العمل بكفاءة' : 'Streamline workshop workflow and team management'}</span>
              </li>
            </ul>
          </div>

          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={() => handleRoleExplore('shop_owner')}
            icon={<ArrowIcon className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            {isRtl ? 'تسجيل مشغل خياطة' : 'List Your Atelier'}
          </Button>
        </div>

        {/* 3. For Tailors / Karigars */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6E2DB] p-6 flex flex-col justify-between hover:border-[#C5A880]/60 hover:shadow-md transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#F5F3EF] border border-[#E6E2DB] flex items-center justify-center text-[#916F3E] mb-4">
              <Scissors className="w-6 h-6" />
            </div>

            <span className="text-[11px] font-bold text-[#916F3E] uppercase tracking-wider block mb-1">
              {isRtl ? 'للحرفيين ومعلّمي التفصيل' : 'For Tailors / Karigars'}
            </span>

            <h3 className="text-lg font-bold text-[#121316] tracking-tight mb-3">
              {isRtl ? 'ابنِ سمعتك واعرض مهاراتك' : 'Showcase Craft & Opportunities'}
            </h3>

            <ul className="space-y-2.5 text-xs text-[#65625D] mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />
                <span>{isRtl ? 'ابنِ ملفاً مهنياً يبرز خبراتك وقصاتك' : 'Build a professional profile highlighting your cutting craft'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />
                <span>{isRtl ? 'اعرض صور تصاميمك وثيابك المنفذة' : 'Showcase your finest bespoke creations in the gallery'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />
                <span>{isRtl ? 'تلقَّ عروض توظيف وتعاون من كبرى الدور' : 'Receive collaboration and employment proposals from shops'}</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1E5638] shrink-0 mt-0.5" />
                <span>{isRtl ? 'ابنِ سمعة مهنية بفضل تقييمات العملاء' : 'Build a verified reputation through authentic client ratings'}</span>
              </li>
            </ul>
          </div>

          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => handleRoleExplore('tailor')}
            icon={<ArrowIcon className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            {isRtl ? 'انضم كمعلّم تفصيل' : 'Join as Master Tailor'}
          </Button>
        </div>
      </div>
    </section>
  );
};
