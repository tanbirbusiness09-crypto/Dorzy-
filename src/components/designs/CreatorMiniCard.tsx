import React from 'react';
import { ShieldCheck, Star, MapPin, Store, Scissors, ArrowUpRight, Building2, Briefcase } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { Design } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';

export interface CreatorMiniCardProps {
  design: Design;
  onNavigateCreator?: (creatorType: 'tailor' | 'shop', slug: string) => void;
  className?: string;
}

export const CreatorMiniCard: React.FC<CreatorMiniCardProps> = ({
  design,
  onNavigateCreator,
  className = '',
}) => {
  const { isRtl } = useLanguage();
  const isTailor = design.creatorType === 'TAILOR';

  const creatorName = isRtl ? design.creatorNameAr : design.creatorName;
  const shopName = isRtl ? design.shopNameAr : design.shopName;
  const specialty = isRtl
    ? design.tailorSpecialtyAr || design.categoryAr
    : design.tailorSpecialty || design.category;

  const handleNavigate = () => {
    if (onNavigateCreator) {
      onNavigateCreator(isTailor ? 'tailor' : 'shop', design.creatorSlug);
    }
  };

  return (
    <div
      className={`bg-[#FAF9F6] rounded-xl border border-[#C5A880]/40 p-4 sm:p-5 shadow-xs text-start ${className}`}
    >
      <div className="text-[11px] font-bold uppercase tracking-wider text-[#916F3E] mb-3 flex items-center justify-between">
        <span>
          {isTailor
            ? isRtl
              ? 'صاحب العمل والمعلّم المنفّذ'
              : 'Crafted By Master Tailor'
            : isRtl
            ? 'المشغل والدار المنفّذة'
            : 'Crafted By Atelier'}
        </span>
        <span className="text-[10px] text-[#8E8B85]">
          {isTailor ? (isRtl ? 'حرفي مستقل' : 'Artisan Portfolio') : isRtl ? 'معرض المشغل' : 'Salon Portfolio'}
        </span>
      </div>

      <div className="flex items-start gap-3.5">
        <Avatar
          src={design.creatorAvatar}
          name={creatorName}
          size="lg"
          isVerified={design.isVerifiedCreator}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="text-sm sm:text-base font-bold text-[#121316] truncate">
              {creatorName}
            </h4>
            {design.isVerifiedCreator && (
              <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
            )}
          </div>

          <p className="text-xs text-[#916F3E] font-medium mt-0.5">
            {isTailor
              ? `${specialty} · ${design.tailorExperienceYears || 15} ${isRtl ? 'سنة خبرة' : 'years exp.'}`
              : isRtl
              ? 'مشغل خياطة رجالية فاخرة'
              : 'Premier Bespoke Atelier'}
          </p>

          <div className="flex items-center gap-2 text-xs text-[#65625D] mt-1.5">
            <Rating score={design.creatorRating} size="sm" />
            <span className="text-[#8E8B85]">
              ({design.creatorReviewCount} {isRtl ? 'تقييم' : 'reviews'})
            </span>
          </div>

          {/* Distinguish Creator from Current Atelier if tailor is based at a shop */}
          {isTailor && shopName && (
            <div className="mt-2.5 p-2 rounded-lg bg-white/70 border border-[#E6E2DB] text-[11px] text-[#65625D] flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-[#8E8B85] shrink-0" />
              <span>
                <strong className="text-[#121316] font-semibold">
                  {isRtl ? 'المقر / المشغل الحالي:' : 'Current Atelier:'}{' '}
                </strong>
                {shopName}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={handleNavigate}>
              <span>
                {isTailor
                  ? isRtl
                    ? 'عرض ملف الخيّاط'
                    : 'View Tailor Profile'
                  : isRtl
                  ? 'عرض ملف المشغل'
                  : 'View Atelier Profile'}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 ms-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
