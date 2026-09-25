import React, { useState, useMemo } from 'react';
import {
  Scissors,
  Search,
  Filter,
  Store,
  Clock,
  ChevronRight,
  ChevronLeft,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { CustomerOrder, OrderStatus } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { OrderStatusBadge } from './OrderStatusBadge';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Button } from '../ui/Button';

export interface CustomerOrdersTabProps {
  orders: CustomerOrder[];
  onTrackOrder: (orderId: string) => void;
  onStartBooking: () => void;
  onNavigateShop?: (shopId: string) => void;
}

type FilterCategory = 'all' | 'in_production' | 'ready' | 'completed' | 'requests';

export const CustomerOrdersTab: React.FC<CustomerOrdersTabProps> = ({
  orders,
  onTrackOrder,
  onStartBooking,
  onNavigateShop,
}) => {
  const { isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterChips: Array<{ id: FilterCategory; labelEn: string; labelAr: string }> = [
    { id: 'all', labelEn: 'All Orders', labelAr: 'كافة الطلبات' },
    { id: 'in_production', labelEn: 'In Production', labelAr: 'قيد الحياكة والقص' },
    { id: 'ready', labelEn: 'Ready for Pickup / Delivery', labelAr: 'جاهز للاستلام والتوصيل' },
    { id: 'requests', labelEn: 'Requests & Review', labelAr: 'طلبات قيد المراجعة' },
    { id: 'completed', labelEn: 'Completed', labelAr: 'مكتمل ومستلم' },
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Category match
      if (activeFilter === 'in_production') {
        if (!['IN_PRODUCTION', 'QUALITY_CHECK', 'FABRIC_SELECTED', 'MEASURED'].includes(order.status)) {
          return false;
        }
      } else if (activeFilter === 'ready') {
        if (!['READY', 'READY_FOR_PICKUP', 'OUT_FOR_DELIVERY'].includes(order.status)) {
          return false;
        }
      } else if (activeFilter === 'requests') {
        if (!['REQUESTED', 'UNDER_REVIEW', 'CONFIRMED', 'MEASUREMENT_PENDING'].includes(order.status)) {
          return false;
        }
      } else if (activeFilter === 'completed') {
        if (order.status !== 'COMPLETED') {
          return false;
        }
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const refMatch = order.reference.toLowerCase().includes(q);
        const shopMatch =
          order.shopName.toLowerCase().includes(q) || order.shopNameAr.includes(q);
        const serviceMatch =
          order.serviceName.toLowerCase().includes(q) || order.serviceNameAr.includes(q);
        return refMatch || shopMatch || serviceMatch;
      }

      return true;
    });
  }, [orders, activeFilter, searchQuery]);

  return (
    <div className="space-y-6 text-start">
      {/* Top Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
            {isRtl ? 'طلبات الثياب والتفصيل' : 'Your Tailored Thobes & Orders'}
          </h2>
          <p className="text-xs text-[#8E8B85] mt-0.5">
            {isRtl
              ? 'متابعة كافة طلبات التفصيل النشطة والسابقة ومراجعة تفاصيل الحِرفة'
              : 'Track active garments, review past commissions, and inspect bespoke specifications'}
          </p>
        </div>

        <Button variant="gold" size="sm" onClick={onStartBooking} className="text-xs shrink-0 font-bold">
          <Scissors className="w-3.5 h-3.5 me-1.5" />
          {isRtl ? 'طلب تفصيل جديد' : 'New Bespoke Request'}
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#E6E2DB]">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-[#8E8B85]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isRtl ? 'ابحث برقم الطلب، اسم المشغل، أو الموديل...' : 'Search by order #THB, atelier, or style...'
            }
            className="w-full bg-[#FAF9F6] text-xs py-2 ps-9 pe-3 rounded-xl border border-[#E6E2DB] focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {filterChips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                activeFilter === chip.id
                  ? 'bg-[#121316] text-[#FAF9F6] shadow-xs'
                  : 'bg-[#FAF9F6] text-[#65625D] hover:bg-[#F2EFE9] border border-[#E6E2DB]'
              }`}
            >
              {isRtl ? chip.labelAr : chip.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#D1D5DB] p-10 text-center space-y-3">
          <Scissors className="w-8 h-8 text-[#A8A49D] mx-auto" />
          <h4 className="text-sm font-bold text-[#121316]">
            {isRtl ? 'لا توجد طلبات تطابق هذا البحث' : 'No orders found matching your filter'}
          </h4>
          <p className="text-xs text-[#8E8B85] max-w-sm mx-auto">
            {isRtl
              ? 'يمكنك تجربة تغيير شروط التصفية أو البحث برقم مرجع آخر.'
              : 'Try clearing your search query or selecting a different status filter.'}
          </p>
          <Button variant="outline" size="sm" onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}>
            {isRtl ? 'عرض كافة الطلبات' : 'Clear Filters'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const shopName = isRtl ? order.shopNameAr : order.shopName;
            const serviceName = isRtl ? order.serviceNameAr : order.serviceName;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#E6E2DB] p-5 sm:p-6 shadow-xs hover:border-[#C5A880] transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                {/* Left: Thumbnail & Essential details */}
                <div className="flex items-start gap-4 flex-1">
                  {order.designImageUrl ? (
                    <img
                      src={order.designImageUrl}
                      alt={serviceName}
                      className="w-16 h-20 rounded-xl object-cover border border-[#E6E2DB] shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-20 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] flex items-center justify-center text-[#916F3E] shrink-0">
                      <Scissors className="w-6 h-6" />
                    </div>
                  )}

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-xs text-[#916F3E]">
                        {order.reference}
                      </span>
                      <OrderStatusBadge status={order.status} size="sm" />
                      <span className="text-[10px] text-[#8E8B85]">
                        {isRtl ? 'تاريخ الطلب:' : 'Placed:'}{' '}
                        {new Date(order.createdAt).toLocaleDateString(isRtl ? 'ar-SA' : 'en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#121316] truncate">
                      {serviceName}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-[#65625D] flex-wrap">
                      <div className="flex items-center gap-1 font-semibold text-[#121316]">
                        <Store className="w-3.5 h-3.5 text-[#8E8B85]" />
                        <span>{shopName}</span>
                      </div>
                      {order.tailorName && (
                        <span>· {isRtl ? order.tailorNameAr || order.tailorName : order.tailorName}</span>
                      )}
                      {order.fabricName && (
                        <span>· {isRtl ? order.fabricNameAr || order.fabricName : order.fabricName}</span>
                      )}
                    </div>

                    {order.estimatedCompletionDate && !['COMPLETED', 'CANCELLED'].includes(order.status) && (
                      <div className="flex items-center gap-1.5 text-xs text-[#916F3E] font-medium pt-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {isRtl ? 'الموعد المتوقع للتجهيز:' : 'Est. Completion:'}{' '}
                          {new Date(order.estimatedCompletionDate).toLocaleDateString(
                            isRtl ? 'ar-SA' : 'en-US',
                            { month: 'short', day: 'numeric', weekday: 'short' }
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Price & CTA Actions */}
                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#F2EFE9] shrink-0">
                  <div className="text-start md:text-end">
                    <span className="text-[10px] text-[#8E8B85] block">
                      {order.priceSummary.status === 'ESTIMATED'
                        ? isRtl ? 'إجمالي تقديري' : 'Estimated Total'
                        : isRtl ? 'الإجمالي المعتمد' : 'Confirmed Total'}
                    </span>
                    <PriceDisplay
                      amount={order.priceSummary.estimatedTotal || order.priceSummary.confirmedTotal || 0}
                      size="md"
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onTrackOrder(order.id)}
                    className="text-xs font-semibold"
                  >
                    <span>{isRtl ? 'تتبع الطلب بالتفصيل' : 'Track Order'}</span>
                    <ArrowIcon className="w-3.5 h-3.5 ms-1" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
