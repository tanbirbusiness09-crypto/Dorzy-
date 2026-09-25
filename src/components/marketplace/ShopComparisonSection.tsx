import React from 'react';
import { Check, X, ShieldCheck, Home, Truck, Users, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { mockShops } from '../../data/mock/shops';
import { Rating } from '../ui/Rating';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Button } from '../ui/Button';

export interface ShopComparisonSectionProps {
  onSelectShop?: (shopId: string) => void;
  className?: string;
}

export const ShopComparisonSection: React.FC<ShopComparisonSectionProps> = ({
  onSelectShop,
  className = '',
}) => {
  const { t, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Use 3 diverse shops for the comparison
  const comparisonShops = [mockShops[0], mockShops[1], mockShops[2]];

  const rows = [
    {
      label: isRtl ? 'التقييم المعتمد' : 'Verified Rating',
      render: (s: typeof mockShops[0]) => (
        <div className="space-y-1">
          <Rating score={s.metrics.rating} reviewCount={s.metrics.reviewCount} size="sm" entityType="shop" />
          <div className="text-[10px] text-[#4285F4] font-medium">Google: 4.8★ (85+)</div>
        </div>
      ),
    },
    {
      label: isRtl ? 'المسافة والموقع' : 'Location & Distance',
      render: (s: typeof mockShops[0]) => (
        <span className="text-xs font-semibold text-[#121316]">
          {isRtl ? s.location.cityAr : s.location.city} ({s.location.distanceKm} {t.common.kmAway})
        </span>
      ),
    },
    {
      label: isRtl ? 'يبدأ السعر من' : 'Starting Price',
      render: (s: typeof mockShops[0]) => (
        <PriceDisplay amount={s.startingPriceSar} suffix={t.common.perThobe} size="sm" />
      ),
    },
    {
      label: isRtl ? 'خدمة القياس المنزلي VIP' : 'Home Measurement',
      render: (s: typeof mockShops[0]) =>
        s.hasHomeMeasurement ? (
          <span className="inline-flex items-center gap-1 text-[#1E5638] text-xs font-medium">
            <Check className="w-4 h-4" />
            <span>{isRtl ? 'متوفر' : 'Available'}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[#8E8B85] text-xs">
            <X className="w-4 h-4" />
            <span>{isRtl ? 'بالمشغل فقط' : 'In-Shop Only'}</span>
          </span>
        ),
    },
    {
      label: isRtl ? 'تفصيل سريع 48 ساعة' : 'Express Delivery (48h)',
      render: (s: typeof mockShops[0]) =>
        s.hasExpressDelivery ? (
          <span className="inline-flex items-center gap-1 text-[#916F3E] text-xs font-medium">
            <Check className="w-4 h-4" />
            <span>{isRtl ? 'متوفر' : 'Supported'}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[#8E8B85] text-xs">
            <X className="w-4 h-4" />
            <span>{isRtl ? 'غير متوفر' : 'Standard 4-7d'}</span>
          </span>
        ),
    },
    {
      label: isRtl ? 'معلّمو الخياطة المقيمون' : 'Resident Master Cutters',
      render: (s: typeof mockShops[0]) => (
        <span className="text-xs text-[#24262E] font-medium tabular-nums">
          {s.tailorStaffCount} {isRtl ? 'معلّمين' : 'artisans'}
        </span>
      ),
    },
    {
      label: isRtl ? 'سنة التأسيس والخبرة' : 'Established Year',
      render: (s: typeof mockShops[0]) => (
        <span className="text-xs text-[#65625D] tabular-nums">
          {s.establishedYear} ({s.metrics.yearsOfExperience} {t.common.years})
        </span>
      ),
    },
  ];

  return (
    <section className={`space-y-6 text-start ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DB] pb-4">
        <div>
          <div className="text-xs font-semibold text-[#916F3E] uppercase tracking-wider mb-1">
            {isRtl ? 'شفافية ومقارنة دقيقة' : 'Objective Discovery'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] tracking-tight">
            {isRtl ? 'قارن المشاغل قبل الحجز' : 'Compare Before You Book'}
          </h2>
          <p className="text-xs sm:text-sm text-[#65625D] mt-1">
            {isRtl
              ? 'قارن بين دور الخياطة بناءً على التقييمات، والأسعار، وسرعة التسليم، وتوفر القياس المنزلي دون تفضيل مسبق.'
              : 'Evaluate salons objectively side-by-side based on location, ratings, turnaround times, and home fittings.'}
          </p>
        </div>

        <div className="text-xs text-[#8E8B85] bg-[#F5F3EF] px-3 py-1.5 rounded-lg border border-[#E6E2DB]">
          {isRtl ? 'مقارنة حيادية مبنية على خياراتك' : 'User-Controlled Comparison'}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-xl border border-[#E6E2DB] bg-[#FFFFFF] shadow-xs">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-[#FAF9F6] border-b border-[#E6E2DB]">
              <th className="p-4 text-start font-bold text-[#65625D] w-1/4">
                {isRtl ? 'المعايير والمواصفات' : 'Criteria'}
              </th>
              {comparisonShops.map((shop) => (
                <th key={shop.id} className="p-4 text-start w-1/4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#121316] block line-clamp-1">
                      {isRtl ? shop.nameAr : shop.name}
                    </span>
                    <span className="text-[11px] text-[#8E8B85] block">
                      {isRtl ? shop.location.districtAr : shop.location.district}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#F2EFE9]">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#FAF9F6]/60 transition-colors">
                <td className="p-4 font-semibold text-[#121316] bg-[#FAF9F6]/40">
                  {row.label}
                </td>
                {comparisonShops.map((shop) => (
                  <td key={shop.id} className="p-4">
                    {row.render(shop)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-[#FAF9F6] border-t border-[#E6E2DB]">
              <td className="p-4 font-semibold text-[#8E8B85]">
                {isRtl ? 'اختيار المشغل' : 'Action'}
              </td>
              {comparisonShops.map((shop) => (
                <td key={shop.id} className="p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => onSelectShop && onSelectShop(shop.id)}
                    icon={<ArrowIcon className="w-3.5 h-3.5" />}
                    iconPosition="right"
                  >
                    {isRtl ? 'اختيار المشغل' : 'Select Atelier'}
                  </Button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};
