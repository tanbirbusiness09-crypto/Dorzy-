import React from 'react';
import { OrderStatus } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';

export interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  size = 'md',
  showPulse = true,
}) => {
  const { isRtl } = useLanguage();

  const config: Record<
    OrderStatus,
    {
      labelEn: string;
      labelAr: string;
      bg: string;
      text: string;
      border: string;
      dot: string;
      pulse?: boolean;
    }
  > = {
    REQUESTED: {
      labelEn: 'Request Submitted',
      labelAr: 'تم تقديم الطلب',
      bg: 'bg-[#FAF4EB]',
      text: 'text-[#916F3E]',
      border: 'border-[#E5D2BA]',
      dot: 'bg-[#916F3E]',
    },
    UNDER_REVIEW: {
      labelEn: 'Under Atelier Review',
      labelAr: 'قيد مراجعة المشغل',
      bg: 'bg-[#FAF4EB]',
      text: 'text-[#916F3E]',
      border: 'border-[#E5D2BA]',
      dot: 'bg-[#916F3E]',
      pulse: true,
    },
    CONFIRMED: {
      labelEn: 'Confirmed by Atelier',
      labelAr: 'تم اعتماد الطلب',
      bg: 'bg-[#EBF5ED]',
      text: 'text-[#2D6A4F]',
      border: 'border-[#B7E4C7]',
      dot: 'bg-[#2D6A4F]',
    },
    MEASUREMENT_PENDING: {
      labelEn: 'Measurement Pending',
      labelAr: 'بانتظار أخذ القياس',
      bg: 'bg-[#FFF8E7]',
      text: 'text-[#B45309]',
      border: 'border-[#FDE68A]',
      dot: 'bg-[#B45309]',
      pulse: true,
    },
    MEASURED: {
      labelEn: 'Measurements Confirmed',
      labelAr: 'تم اعتماد القياسات',
      bg: 'bg-[#EBF5ED]',
      text: 'text-[#2D6A4F]',
      border: 'border-[#B7E4C7]',
      dot: 'bg-[#2D6A4F]',
    },
    FABRIC_SELECTED: {
      labelEn: 'Fabric Inspected & Allocated',
      labelAr: 'تم فحص وتخصيص القماش',
      bg: 'bg-[#F0F4F8]',
      text: 'text-[#1D4ED8]',
      border: 'border-[#BFDBFE]',
      dot: 'bg-[#1D4ED8]',
    },
    IN_PRODUCTION: {
      labelEn: 'In Cutting & Tailoring',
      labelAr: 'قيد القص والحياكة',
      bg: 'bg-[#FAF0E6]',
      text: 'text-[#916F3E]',
      border: 'border-[#E5D2BA]',
      dot: 'bg-[#916F3E]',
      pulse: true,
    },
    QUALITY_CHECK: {
      labelEn: 'Master Quality Audit',
      labelAr: 'فحص الجودة والمطابقة',
      bg: 'bg-[#FDF4FF]',
      text: 'text-[#7E22CE]',
      border: 'border-[#E9D5FF]',
      dot: 'bg-[#7E22CE]',
      pulse: true,
    },
    READY: {
      labelEn: 'Garment Ready',
      labelAr: 'الثوب جاهز',
      bg: 'bg-[#EBF5ED]',
      text: 'text-[#2D6A4F]',
      border: 'border-[#B7E4C7]',
      dot: 'bg-[#2D6A4F]',
    },
    READY_FOR_PICKUP: {
      labelEn: 'Ready for Atelier Pickup',
      labelAr: 'جاهز للاستلام من المشغل',
      bg: 'bg-[#EBF5ED]',
      text: 'text-[#2D6A4F]',
      border: 'border-[#B7E4C7]',
      dot: 'bg-[#2D6A4F]',
    },
    OUT_FOR_DELIVERY: {
      labelEn: 'Out for Courier Delivery',
      labelAr: 'خرج للتوصيل للمنزل',
      bg: 'bg-[#EFF6FF]',
      text: 'text-[#1E40AF]',
      border: 'border-[#BFDBFE]',
      dot: 'bg-[#1E40AF]',
      pulse: true,
    },
    COMPLETED: {
      labelEn: 'Delivered & Completed',
      labelAr: 'مستلم ومكتمل',
      bg: 'bg-[#F4F4F6]',
      text: 'text-[#3D404D]',
      border: 'border-[#D1D5DB]',
      dot: 'bg-[#4B5563]',
    },
    CANCELLED: {
      labelEn: 'Cancelled',
      labelAr: 'ملغي',
      bg: 'bg-[#FEF2F2]',
      text: 'text-[#B91C1C]',
      border: 'border-[#FECACA]',
      dot: 'bg-[#DC2626]',
    },
  };

  const item = config[status] || config.REQUESTED;
  const label = isRtl ? item.labelAr : item.labelEn;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg border font-semibold tracking-tight transition-colors ${
        sizeClasses[size]
      } ${item.bg} ${item.text} ${item.border}`}
    >
      <span className="relative flex items-center justify-center shrink-0">
        {showPulse && item.pulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${item.dot}`}
          />
        )}
        <span className={`relative inline-flex rounded-full ${dotSizes[size]} ${item.dot}`} />
      </span>
      <span>{label}</span>
    </span>
  );
};
