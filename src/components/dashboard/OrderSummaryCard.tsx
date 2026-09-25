import React, { useState } from 'react';
import {
  Store,
  Scissors,
  Layers,
  Ruler,
  Truck,
  MapPin,
  Calendar,
  Lock,
  Phone,
  MessageSquare,
  FileDown,
  RotateCcw,
  Star,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { CustomerOrder } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Button } from '../ui/Button';

export interface OrderSummaryCardProps {
  order: CustomerOrder;
  onNavigateShop?: (shopId: string) => void;
  onNavigateTailor?: (tailorId: string) => void;
  onCancelOrder?: (orderId: string) => void;
  onReschedule?: (orderId: string) => void;
  onReorder?: (order: CustomerOrder) => void;
  onLeaveReview?: (orderId: string) => void;
  onContactShop?: (order: CustomerOrder) => void;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  order,
  onNavigateShop,
  onNavigateTailor,
  onCancelOrder,
  onReschedule,
  onReorder,
  onLeaveReview,
  onContactShop,
}) => {
  const { isRtl, t } = useLanguage();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSummaryDownloadModal, setShowSummaryDownloadModal] = useState(false);

  const shopName = isRtl ? order.shopNameAr : order.shopName;
  const tailorName = order.tailorName
    ? isRtl
      ? order.tailorNameAr || order.tailorName
      : order.tailorName
    : null;
  const serviceName = isRtl ? order.serviceNameAr : order.serviceName;
  const designTitle = order.designTitle
    ? isRtl
      ? order.designTitleAr || order.designTitle
      : order.designTitle
    : null;
  const fabricName = order.fabricName
    ? isRtl
      ? order.fabricNameAr || order.fabricName
      : order.fabricName
    : null;

  const isEligibleForCancel = order.status === 'REQUESTED' || order.status === 'UNDER_REVIEW';
  const isCompleted = order.status === 'COMPLETED';

  // Format price status message
  const getPriceStatusNotice = () => {
    switch (order.priceSummary.status) {
      case 'ESTIMATED':
        return {
          badge: isRtl ? 'إجمالي تقديري' : 'Estimated Total',
          color: 'bg-[#FAF4EB] text-[#916F3E] border-[#E5D2BA]',
          note: isRtl
            ? 'سعر تقديري مبني على الخيارات الحالية، وسيعتمده المشغل.'
            : 'Estimated total based on current options. Final price confirmed by atelier.',
        };
      case 'FIXED':
        return {
          badge: isRtl ? 'سعر نهائي معتمد' : 'Confirmed Total',
          color: 'bg-[#EBF5ED] text-[#2D6A4F] border-[#B7E4C7]',
          note: isRtl
            ? 'تم اعتماد السعر النهائي من إدارة المشغل.'
            : 'Final fixed price approved by atelier management.',
        };
      case 'QUOTE_REQUIRED':
        return {
          badge: isRtl ? 'يتطلب تسعيرة خاصة' : 'Custom Quote Required',
          color: 'bg-[#F0F4F8] text-[#1D4ED8] border-[#BFDBFE]',
          note: isRtl
            ? 'يتطلب العمل الحرفي مراجعة وتحديد تكلفة دقيقة من معلّم القص.'
            : 'Bespoke custom work requires final quote evaluation by master cutter.',
        };
      default:
        return {
          badge: isRtl ? 'تسعيرة معتمدة' : 'Price Verified',
          color: 'bg-[#F4F4F6] text-[#3D404D] border-[#D1D5DB]',
          note: '',
        };
    }
  };

  const priceStatus = getPriceStatusNotice();

  return (
    <div className="space-y-6 text-start">
      {/* 1. Atelier & Master Tailor Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shop Card */}
        <div className="bg-white rounded-2xl border border-[#E6E2DB] p-5 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#121316] text-[#C5A880] flex items-center justify-center shrink-0">
              <Store className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-[#8E8B85] uppercase tracking-wider">
                  {isRtl ? 'المشغل المعتمد' : 'Commissioned Atelier'}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#2D6A4F] bg-[#EBF5ED] px-1.5 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3" />
                  {isRtl ? 'موثّق' : 'Verified'}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#121316] font-display">{shopName}</h3>
              <div className="flex items-center gap-1.5 text-xs text-[#65625D]">
                <MapPin className="w-3.5 h-3.5 text-[#8E8B85]" />
                <span>
                  {isRtl ? order.shopDistrictAr : order.shopDistrict},{' '}
                  {isRtl ? order.shopCityAr : order.shopCity}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-[#F2EFE9]">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onContactShop && onContactShop(order)}
              className="flex-1 text-xs"
            >
              <Phone className="w-3.5 h-3.5 me-1 text-[#916F3E]" />
              {isRtl ? 'تواصل مع المشغل' : 'Contact Atelier'}
            </Button>
            {onNavigateShop && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigateShop(order.shopId)}
                className="text-xs text-[#8E8B85] hover:text-[#121316]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>

        {/* Tailor Card (if assigned) */}
        {order.tailorName ? (
          <div className="bg-white rounded-2xl border border-[#E6E2DB] p-5 shadow-xs flex flex-col justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="relative">
                <img
                  src={
                    order.tailorAvatarUrl ||
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
                  }
                  alt={tailorName || 'Tailor'}
                  className="w-12 h-12 rounded-xl object-cover border border-[#E6E2DB]"
                />
                <span className="absolute -bottom-1 -end-1 w-4 h-4 bg-[#916F3E] rounded-full flex items-center justify-center text-white text-[9px]">
                  <Scissors className="w-2.5 h-2.5" />
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#8E8B85] uppercase tracking-wider block">
                  {isRtl ? 'كبير الخياطين المسند له الثوب' : 'Assigned Master Tailor'}
                </span>
                <h3 className="text-sm font-bold text-[#121316]">{tailorName}</h3>
                <p className="text-xs text-[#65625D]">
                  {isRtl ? order.tailorSpecialtyAr : order.tailorSpecialty} ·{' '}
                  {order.tailorExperienceYears || 20} {isRtl ? 'سنة خبرة' : 'years experience'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F2EFE9] flex items-center justify-between text-xs text-[#8E8B85]">
              <span>{isRtl ? 'معتمد رسمياً لدى دار التفصيل' : 'Atelier Resident Master Cutter'}</span>
              {order.tailorId && onNavigateTailor && (
                <button
                  type="button"
                  onClick={() => onNavigateTailor(order.tailorId!)}
                  className="font-semibold text-[#916F3E] hover:underline cursor-pointer flex items-center gap-1"
                >
                  {isRtl ? 'الملف المهني' : 'Artisan Profile'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-[#FAF9F6] rounded-2xl border border-dashed border-[#D1D5DB] p-5 flex flex-col justify-center items-center text-center space-y-1.5">
            <Scissors className="w-6 h-6 text-[#A8A49D]" />
            <h4 className="text-xs font-bold text-[#121316]">
              {isRtl ? 'إسناد كبير الخياطين' : 'Artisan Assignment'}
            </h4>
            <p className="text-[11px] text-[#8E8B85] max-w-xs">
              {isRtl
                ? 'يقوم المشغل بإسناد الثوب لأمهر معلّم قص وتطريز وفق جدول الإنتاج.'
                : 'The atelier cutter is assigned based on garment complexity and atelier capacity.'}
            </p>
          </div>
        )}
      </div>

      {/* 2. Garment Sartorial Anatomy & Specifications */}
      <div className="bg-white rounded-2xl border border-[#E6E2DB] p-5 sm:p-7 shadow-xs space-y-6">
        <h3 className="text-sm font-bold text-[#121316] font-display pb-3 border-b border-[#F2EFE9] flex items-center justify-between">
          <span>{isRtl ? 'المواصفات الحرفية للثوب' : 'Bespoke Garment Specifications'}</span>
          <span className="text-xs font-normal text-[#8E8B85]">
            {isRtl ? order.serviceCategory : order.serviceCategory}
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Design & Style Card */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-[#8E8B85] uppercase tracking-wider block">
              {isRtl ? 'الخدمة والموديل' : 'Service & Style'}
            </span>
            <div className="flex items-start gap-3">
              {order.designImageUrl && (
                <img
                  src={order.designImageUrl}
                  alt={designTitle || 'Thobe'}
                  className="w-16 h-20 rounded-lg object-cover border border-[#E6E2DB] shrink-0"
                />
              )}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-[#121316] leading-tight">{serviceName}</h4>
                {designTitle && (
                  <p className="text-[11px] text-[#916F3E] font-semibold">{designTitle}</p>
                )}
                {order.designStyle && (
                  <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-[#F5F3EF] text-[#65625D]">
                    {isRtl ? order.designStyleAr || order.designStyle : order.designStyle}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Fabric Bolt Details */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-[#8E8B85] uppercase tracking-wider block">
              {isRtl ? 'القماش المخصص' : 'Fabric Allocation'}
            </span>
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold text-[#121316]">
                {fabricName || (isRtl ? 'قماش مقدم من العميل' : 'Customer Provided Fabric')}
              </h4>
              {order.fabricMaterial && (
                <p className="text-[11px] text-[#65625D]">
                  {isRtl ? order.fabricMaterialAr || order.fabricMaterial : order.fabricMaterial}
                </p>
              )}
              {order.fabricColor && (
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="w-3 h-3 rounded-full border border-[#D1D5DB] bg-white shadow-2xs" />
                  <span className="text-[11px] text-[#65625D]">{order.fabricColor}</span>
                </div>
              )}
            </div>
          </div>

          {/* Measurement Profile */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#8E8B85] uppercase tracking-wider block">
                {isRtl ? 'ملف المقاسات' : 'Measurement Profile'}
              </span>
              {order.isMeasurementLocked && (
                <span className="inline-flex items-center gap-1 text-[10px] text-[#916F3E] font-medium bg-[#FAF4EB] px-1.5 py-0.5 rounded">
                  <Lock className="w-2.5 h-2.5" />
                  {isRtl ? 'مقفل للإنتاج' : 'Locked'}
                </span>
              )}
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-[#121316]">
                {order.measurementProfileName
                  ? isRtl
                    ? order.measurementProfileNameAr || order.measurementProfileName
                    : order.measurementProfileName
                  : isRtl
                  ? 'أخذ المقاس في المشغل'
                  : 'In-Salon Measurement'}
              </h4>
              <p className="text-[11px] text-[#8E8B85]">
                {isRtl ? 'طريقة القياس:' : 'Method:'}{' '}
                {order.measurementMethod === 'home'
                  ? isRtl ? 'زيارة أخصائي للمنزل' : 'Home Specialist Visit'
                  : order.measurementMethod === 'saved'
                  ? isRtl ? 'ملف مقاسات محفوظ' : 'Saved Sartorial Profile'
                  : isRtl ? 'زيارة المشغل' : 'Salon Fitting'}
              </p>

              {/* Anatomy grid preview */}
              {order.measurements && Object.keys(order.measurements).length > 0 && (
                <div className="grid grid-cols-3 gap-1.5 pt-2">
                  {Object.entries(order.measurements).slice(0, 6).map(([key, val]) => (
                    <div key={key} className="p-1.5 rounded bg-[#FAF9F6] border border-[#F2EFE9] text-center">
                      <span className="text-[9px] text-[#8E8B85] uppercase block truncate">{key}</span>
                      <span className="text-xs font-mono font-bold text-[#121316]">
                        {val} {order.measurementUnit || 'cm'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bespoke Collar, Cuffs, and Preferences Details */}
        {order.preferences && (
          <div className="pt-4 border-t border-[#F2EFE9] space-y-3">
            <span className="text-[11px] font-bold text-[#8E8B85] uppercase tracking-wider block">
              {isRtl ? 'خيارات الياقة والأكمام والتفاصيل الحرفية' : 'Bespoke Collar, Cuffs & Detailing'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#F2EFE9]">
                <span className="text-[10px] text-[#8E8B85] block">{isRtl ? 'موديل الياقة' : 'Collar Style'}</span>
                <span className="font-bold text-[#121316] capitalize">
                  {order.preferences.collarStyle?.replace('_', ' ') || 'Classic Najdi'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#F2EFE9]">
                <span className="text-[10px] text-[#8E8B85] block">{isRtl ? 'حشوة الياقة' : 'Collar Stiffness'}</span>
                <span className="font-bold text-[#121316] capitalize">
                  {order.preferences.collarStiffness?.replace('_', ' ') || 'Medium Stiff'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#F2EFE9]">
                <span className="text-[10px] text-[#8E8B85] block">{isRtl ? 'موديل الكبك / الكم' : 'Cuff Finish'}</span>
                <span className="font-bold text-[#121316] capitalize">
                  {order.preferences.cuffStyle?.replace('_', ' ') || 'Traditional Open'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#F2EFE9]">
                <span className="text-[10px] text-[#8E8B85] block">{isRtl ? 'قصة القوام (الفِت)' : 'Garment Fit'}</span>
                <span className="font-bold text-[#121316] capitalize">
                  {order.preferences.fitPreference?.replace('_', ' ') || 'Slim Tailored'}
                </span>
              </div>
            </div>

            {order.preferences.specialInstructions && (
              <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#E5D2BA] text-xs">
                <span className="text-[10px] font-bold text-[#916F3E] uppercase block mb-1">
                  {isRtl ? 'توجيهات وملاحظات العميل الخاصة' : 'Customer Sartorial Notes'}
                </span>
                <p className="text-[#65625D] italic">{order.preferences.specialInstructions}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Delivery / Pickup & Appointment Details */}
      <div className="bg-white rounded-2xl border border-[#E6E2DB] p-5 sm:p-7 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#121316] font-display pb-3 border-b border-[#F2EFE9]">
          {isRtl ? 'الاستلام والمواعيد' : 'Fulfillment & Fitting Appointment'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB]">
            <Truck className="w-5 h-5 text-[#916F3E] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-[#121316] block">
                {order.deliveryMethod === 'home_delivery'
                  ? isRtl ? 'توصيل مباشر للمنزل أو المكتب' : 'Direct Courier Delivery'
                  : isRtl ? 'استلام من مقر المشغل والبروفة' : 'In-Atelier Fitting & Pickup'}
              </span>
              {order.deliveryAddress ? (
                <p className="text-[#65625D]">
                  {order.deliveryAddress.district}, {order.deliveryAddress.city} · {order.deliveryAddress.street}
                </p>
              ) : (
                <p className="text-[#8E8B85]">
                  {isRtl ? order.shopDistrictAr : order.shopDistrict}, {isRtl ? order.shopCityAr : order.shopCity}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB]">
            <Calendar className="w-5 h-5 text-[#916F3E] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-[#121316] block">
                {isRtl ? 'الجدول الزمني المعتمد' : 'Target Schedule'}
              </span>
              <p className="text-[#65625D]">
                {order.estimatedCompletionDate
                  ? new Date(order.estimatedCompletionDate).toLocaleDateString(isRtl ? 'ar-SA' : 'en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : isRtl ? 'قيد التنسيق مع فريق الإنتاج' : 'Coordination with atelier production team'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Price Transparency & Breakdown */}
      <div className="bg-white rounded-2xl border border-[#E6E2DB] p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F2EFE9]">
          <div>
            <h3 className="text-sm font-bold text-[#121316] font-display">
              {isRtl ? 'شفافية التسعيرة المعتمدة' : 'Transparent Price Breakdown'}
            </h3>
            <p className="text-xs text-[#8E8B85] mt-0.5">{priceStatus.note}</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${priceStatus.color}`}>
            {priceStatus.badge}
          </span>
        </div>

        <div className="space-y-2 text-xs divide-y divide-[#F2EFE9]">
          <div className="flex justify-between py-1.5 text-[#65625D]">
            <span>{isRtl ? 'أجرة التفصيل الأساسية' : 'Base Tailoring Service'}</span>
            <PriceDisplay amount={order.priceSummary.baseServicePrice || 0} size="sm" />
          </div>

          {order.priceSummary.fabricPrice ? (
            <div className="flex justify-between py-1.5 text-[#65625D]">
              <span>{isRtl ? 'طاقة القماش المعتمدة' : 'Selected Fabric Bolt'}</span>
              <PriceDisplay amount={order.priceSummary.fabricPrice} size="sm" />
            </div>
          ) : null}

          {order.priceSummary.customizationPrice ? (
            <div className="flex justify-between py-1.5 text-[#65625D]">
              <span>{isRtl ? 'تخصيصات حرفية (ياقة، كبك، تطريز)' : 'Bespoke Customization'}</span>
              <PriceDisplay amount={order.priceSummary.customizationPrice} size="sm" />
            </div>
          ) : null}

          {order.priceSummary.measurementPrice ? (
            <div className="flex justify-between py-1.5 text-[#65625D]">
              <span>{isRtl ? 'خدمة أخذ القياس المنزلي' : 'Home Specialist Visit'}</span>
              <PriceDisplay amount={order.priceSummary.measurementPrice} size="sm" />
            </div>
          ) : null}

          {order.priceSummary.deliveryPrice ? (
            <div className="flex justify-between py-1.5 text-[#65625D]">
              <span>{isRtl ? 'رسوم التوصيل' : 'Delivery Service'}</span>
              <PriceDisplay amount={order.priceSummary.deliveryPrice} size="sm" />
            </div>
          ) : null}

          <div className="flex justify-between pt-3 text-sm font-bold text-[#121316]">
            <div>
              <span>{isRtl ? 'الإجمالي النهائي' : 'Total Amount'}</span>
              <span className="block text-[11px] font-normal text-[#8E8B85]">
                {isRtl ? 'شامل ضريبة القيمة المضافة 15%' : 'Includes 15% Saudi VAT'}
              </span>
            </div>
            <PriceDisplay
              amount={order.priceSummary.estimatedTotal || order.priceSummary.confirmedTotal || 0}
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* 5. Customer Actions Bar */}
      <div className="bg-[#FAF9F6] rounded-2xl border border-[#E6E2DB] p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSummaryDownloadModal(true)}
            className="text-xs"
          >
            <FileDown className="w-3.5 h-3.5 me-1 text-[#916F3E]" />
            {isRtl ? 'تحميل وثيقة الطلب' : 'Download Summary'}
          </Button>

          {onReschedule && !['COMPLETED', 'CANCELLED'].includes(order.status) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReschedule(order.id)}
              className="text-xs"
            >
              <Calendar className="w-3.5 h-3.5 me-1 text-[#8E8B85]" />
              {isRtl ? 'طلب تعديل الموعد' : 'Reschedule'}
            </Button>
          )}

          {isEligibleForCancel && onCancelOrder && (
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="text-xs font-semibold text-[#DC2626] hover:text-[#B91C1C] hover:underline px-3 py-1.5 cursor-pointer"
            >
              {isRtl ? 'إلغاء الطلب' : 'Cancel Request'}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isCompleted && onLeaveReview && !order.review && (
            <Button
              variant="gold"
              size="sm"
              onClick={() => onLeaveReview(order.id)}
              className="text-xs font-bold"
            >
              <Star className="w-3.5 h-3.5 me-1 fill-current" />
              {isRtl ? 'تقييم تجربة التفصيل' : 'Leave Review'}
            </Button>
          )}

          {onReorder && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onReorder(order)}
              className="text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 me-1" />
              {isRtl ? 'إعادة طلب هذا الثوب' : 'Re-order Thobe'}
            </Button>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-start">
            <div className="w-10 h-10 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#121316]">
                {isRtl ? 'تأكيد إلغاء طلب التفصيل' : 'Confirm Order Cancellation'}
              </h3>
              <p className="text-xs text-[#65625D] mt-1 leading-relaxed">
                {isRtl
                  ? 'هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟ سيتم إشعار المشغل بإيقاف التجهيز.'
                  : 'Are you sure you want to cancel this order request? The atelier will be notified immediately.'}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCancelModal(false)}
              >
                {t.common.back}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setShowCancelModal(false);
                  onCancelOrder && onCancelOrder(order.id);
                }}
              >
                {isRtl ? 'نعم، قم بالإلغاء' : 'Yes, Cancel Order'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Download Modal / Printable simulation */}
      {showSummaryDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 text-start">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE9]">
              <div>
                <span className="text-[10px] font-bold text-[#8E8B85] uppercase tracking-wider block">
                  KHAYYAT PLATFORM · وثيقة تفصيل معتمدة
                </span>
                <h3 className="text-base font-bold text-[#121316] font-mono">
                  {order.reference}
                </h3>
              </div>
              <span className="text-xs text-[#8E8B85]">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8E8B85]">{isRtl ? 'المشغل:' : 'Atelier:'}</span>
                <span className="font-bold text-[#121316]">{shopName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8B85]">{isRtl ? 'الموديل:' : 'Garment:'}</span>
                <span className="font-semibold text-[#121316]">{serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8B85]">{isRtl ? 'القماش:' : 'Fabric:'}</span>
                <span className="text-[#121316]">{fabricName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8B85]">{isRtl ? 'الحالة الحالية:' : 'Status:'}</span>
                <span className="font-bold text-[#916F3E]">{order.status}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E6E2DB] font-bold">
                <span>{isRtl ? 'الإجمالي:' : 'Total:'}</span>
                <PriceDisplay amount={order.priceSummary.estimatedTotal || 0} size="sm" />
              </div>
            </div>

            <p className="text-[11px] text-[#8E8B85] text-center">
              {isRtl
                ? 'تم إنشاء هذه الوثيقة الرقمية وفق المعايير المعتمدة لمنصة خيّاط في المملكة العربية السعودية.'
                : 'Digital sartorial document generated under KHAYYAT Saudi tailoring marketplace compliance.'}
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSummaryDownloadModal(false)}
              >
                {t.common.close}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  window.print();
                  setShowSummaryDownloadModal(false);
                }}
              >
                {isRtl ? 'طباعة / حفظ كـ PDF' : 'Print / Save PDF'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
