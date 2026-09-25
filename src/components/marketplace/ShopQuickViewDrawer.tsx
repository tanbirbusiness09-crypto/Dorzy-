import React from 'react';
import {
  Store,
  MapPin,
  Clock,
  Home,
  Truck,
  Phone,
  Calendar,
  Layers,
  Award,
  CheckCircle2,
  Bookmark,
  Scale,
  ExternalLink,
  ShieldCheck,
  Scissors,
} from 'lucide-react';
import { Shop } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Rating } from '../ui/Rating';
import { PriceDisplay } from '../ui/PriceDisplay';
import { VerificationBadge } from '../trust/VerificationBadge';
import { TailoringArt } from './TailoringArtPlaceholder';

export interface ShopQuickViewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  shop: Shop | null;
  onBookMeasurement?: (shop: Shop) => void;
  onToggleSave?: (shop: Shop) => void;
  isSaved?: boolean;
  onToggleCompare?: (shop: Shop) => void;
  isCompareSelected?: boolean;
  onViewFullProfile?: (shop: Shop) => void;
}

export const ShopQuickViewDrawer: React.FC<ShopQuickViewDrawerProps> = ({
  isOpen,
  onClose,
  shop,
  onBookMeasurement,
  onToggleSave,
  isSaved = false,
  onToggleCompare,
  isCompareSelected = false,
  onViewFullProfile,
}) => {
  const { t, isRtl } = useLanguage();

  if (!shop) return null;

  const shopName = isRtl ? shop.nameAr : shop.name;
  const city = isRtl ? shop.location.cityAr : shop.location.city;
  const district = isRtl ? shop.location.districtAr : shop.location.district;
  const street = isRtl ? shop.location.streetNameAr : shop.location.streetName;
  const description = isRtl ? shop.descriptionAr : shop.description;
  const services = isRtl ? shop.featuredServicesAr : shop.featuredServices;
  const fabrics = isRtl ? (shop.fabricsAr || shop.fabrics) : shop.fabrics;
  const statusNote = isRtl
    ? (shop.operatingHours.statusNoteAr || (shop.operatingHours.isOpenNow ? 'مفتوح الآن' : 'مغلق'))
    : (shop.operatingHours.statusNote || (shop.operatingHours.isOpenNow ? 'Open Now' : 'Closed'));

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={shopName}
    >
      <div className="space-y-6 text-start text-xs text-[#121316]">
        {/* Cover Art Banner */}
        <div className="relative rounded-xl overflow-hidden border border-[#E6E2DB]">
          <TailoringArt
            theme="atelier"
            title={shopName}
            subtitle={`${city} · ${district}`}
            aspectRatio="16:9"
          />
          <div className="absolute top-3 start-3 z-10 flex flex-wrap gap-1.5">
            {shop.trust.isVerifiedShop && <VerificationBadge type="verified_shop" size="xs" />}
            {shop.trust.isCommercialRegistered && <VerificationBadge type="verified_business" size="xs" />}
          </div>
          <div className="absolute bottom-3 end-3 z-10">
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-md flex items-center gap-1 text-white ${
                shop.operatingHours.isOpenNow ? 'bg-[#1E5638]/90' : 'bg-[#24262E]/90'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>{statusNote}</span>
            </span>
          </div>
        </div>

        {/* Header summary & Ratings */}
        <div className="space-y-2 pb-4 border-b border-[#E6E2DB]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold font-display text-[#121316]">{shopName}</h3>
              <p className="text-[#65625D] text-xs mt-0.5">{isRtl ? shop.taglineAr : shop.tagline}</p>
            </div>
            <div className="text-end shrink-0">
              <span className="block text-[10px] text-[#8E8B85] uppercase">{t.common.startingFrom}</span>
              <PriceDisplay amount={shop.startingPriceSar} suffix={t.common.perThobe} size="md" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Rating score={shop.metrics.rating} reviewCount={shop.metrics.reviewCount} size="md" entityType="shop" />
            <span className="text-[#8E8B85]">·</span>
            <Rating score={4.8} reviewCount={85} size="md" source="google" />
            <span className="text-[#8E8B85]">·</span>
            <span className="text-[#65625D] tabular-nums font-medium">
              {shop.metrics.yearsOfExperience} {isRtl ? 'عاماً خبرة' : 'years experience'}
            </span>
          </div>
        </div>

        {/* Quick Action Bar (Book, Save, Compare, View Full Profile) */}
        <div className="grid grid-cols-3 gap-2">
          {onBookMeasurement && (
            <Button
              variant="gold"
              size="sm"
              onClick={() => onBookMeasurement(shop)}
              icon={<Calendar className="w-3.5 h-3.5" />}
              className="col-span-1"
            >
              {isRtl ? 'حجز موعد' : 'Book'}
            </Button>
          )}

          {onToggleSave && (
            <Button
              variant={isSaved ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onToggleSave(shop)}
              icon={<Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />}
            >
              {isSaved ? (isRtl ? 'محفوظ' : 'Saved') : (isRtl ? 'حفظ' : 'Save')}
            </Button>
          )}

          {onToggleCompare && (
            <Button
              variant={isCompareSelected ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onToggleCompare(shop)}
              icon={<Scale className="w-3.5 h-3.5" />}
            >
              {isCompareSelected ? (isRtl ? 'بالمقارنة' : 'Compared') : (isRtl ? 'مقارنة' : 'Compare')}
            </Button>
          )}
        </div>

        {onViewFullProfile && (
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onClose();
              onViewFullProfile(shop);
            }}
            icon={<ExternalLink className="w-4 h-4" />}
            className="w-full justify-center"
          >
            {isRtl ? 'فتح الصفحة الرسمية للمشغل (/shops/:slug)' : 'Open Full Shop Profile (/shops/:slug)'}
          </Button>
        )}

        {/* Location & Address */}
        <div className="p-3.5 rounded-xl bg-[#F5F3EF] border border-[#E6E2DB] space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#121316]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#916F3E]" />
              <span>{isRtl ? 'الموقع الجغرافي' : 'Location Details'}</span>
            </div>
            {shop.location.distanceKm && (
              <span className="text-[#916F3E] tabular-nums font-bold">
                {shop.location.distanceKm} {isRtl ? 'كم من موقعك' : 'km away'}
              </span>
            )}
          </div>
          <p className="text-xs text-[#24262E] font-medium">
            {street ? `${street}, ` : ''}{district}, {city}
          </p>
          <div className="text-[11px] text-[#8E8B85] flex items-center gap-2">
            <span>{isRtl ? 'ساعات العمل:' : 'Hours:'} {shop.operatingHours.openTime} - {shop.operatingHours.closeTime}</span>
            {shop.operatingHours.isFridayOpen && (
              <span>· {isRtl ? 'الجمعة متاح' : 'Friday Open'}</span>
            )}
          </div>
        </div>

        {/* Overview Description */}
        <div className="space-y-1.5">
          <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider">
            {isRtl ? 'نبذة عن المشغل' : 'About Atelier'}
          </h4>
          <p className="text-xs text-[#65625D] leading-relaxed">{description}</p>
        </div>

        {/* Capabilities Badges */}
        <div className="space-y-2">
          <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider">
            {isRtl ? 'المميزات والخدمات الخاصة' : 'Capabilities & Guarantees'}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-white border border-[#E6E2DB] flex items-center gap-2">
              <Home className={`w-4 h-4 ${shop.hasHomeMeasurement ? 'text-[#1E5638]' : 'text-[#8E8B85]'}`} />
              <div>
                <p className="text-[11px] font-bold text-[#121316]">
                  {isRtl ? 'قياس منزلي VIP' : 'Home Measurement'}
                </p>
                <p className="text-[10px] text-[#8E8B85]">
                  {shop.hasHomeMeasurement ? (isRtl ? 'متاح بالطلب' : 'Available') : (isRtl ? 'غير متاح' : 'In-store only')}
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-[#E6E2DB] flex items-center gap-2">
              <Truck className={`w-4 h-4 ${shop.hasExpressDelivery ? 'text-[#916F3E]' : 'text-[#8E8B85]'}`} />
              <div>
                <p className="text-[11px] font-bold text-[#121316]">
                  {isRtl ? 'توصيل سريع' : 'Express Delivery'}
                </p>
                <p className="text-[10px] text-[#8E8B85]">
                  {shop.hasExpressDelivery ? (isRtl ? 'متاح 48 ساعة' : '48h available') : (isRtl ? 'استلام عادي' : 'Standard')}
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-[#E6E2DB] flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#916F3E]" />
              <div>
                <p className="text-[11px] font-bold text-[#121316]">
                  {isRtl ? 'طاقم معلّمي القص' : 'Tailoring Staff'}
                </p>
                <p className="text-[10px] text-[#8E8B85]">
                  {shop.tailorStaffCount} {isRtl ? 'خيّاطين وحرفيين' : 'skilled tailors'}
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-[#E6E2DB] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1E5638]" />
              <div>
                <p className="text-[11px] font-bold text-[#121316]">
                  {isRtl ? 'الالتزام بالمواعيد' : 'On-Time Delivery'}
                </p>
                <p className="text-[10px] text-[#8E8B85]">
                  {shop.metrics.onTimeDeliveryRate}% {isRtl ? 'نسبة الالتزام' : 'punctuality'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Services */}
        <div className="space-y-2">
          <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider">
            {isRtl ? 'الخدمات المتوفرة' : 'Tailoring Services'}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {services.map((srv, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E6E2DB] text-[#121316] font-medium text-xs"
              >
                {srv}
              </span>
            ))}
          </div>
        </div>

        {/* Available Fabrics */}
        {fabrics && fabrics.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-bold text-[#121316] text-xs uppercase tracking-wider">
              {isRtl ? 'أصناف الأقمشة المعتمدة' : 'Available Fabric Weaves'}
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-[#65625D]">
              <Layers className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>{fabrics.join(' · ')}</span>
            </div>
          </div>
        )}

        {/* Commercial Registration Trust Details */}
        <div className="p-3 rounded-lg border border-[#E6E2DB] bg-[#FAF9F6] text-[11px] text-[#8E8B85] space-y-1">
          <div className="flex items-center gap-1.5 text-[#121316] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E5638]" />
            <span>{isRtl ? 'بيانات التوثيق النظامي بالمملكة' : 'Saudi Regulatory Verification'}</span>
          </div>
          {shop.trust.crNumber && (
            <p>{isRtl ? 'رقم السجل التجاري:' : 'Commercial Registry (CR):'} {shop.trust.crNumber}</p>
          )}
          {shop.trust.vatNumber && (
            <p>{isRtl ? 'الرقم الضريبي:' : 'VAT Number:'} {shop.trust.vatNumber}</p>
          )}
        </div>
      </div>
    </Drawer>
  );
};
