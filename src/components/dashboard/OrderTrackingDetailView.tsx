import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Phone,
  HelpCircle,
  MessageSquare,
  Sparkles,
  Store,
  Calendar,
  X,
  Star,
} from 'lucide-react';
import { CustomerOrder, OrderStatus } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { useToast } from '../feedback/Toast';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderTimeline } from './OrderTimeline';
import { OrderSummaryCard } from './OrderSummaryCard';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Button } from '../ui/Button';

export interface OrderTrackingDetailViewProps {
  order: CustomerOrder;
  onNavigateHome: () => void;
  onNavigateDashboard: () => void;
  onNavigateOrders: () => void;
  onNavigateShop?: (shopId: string) => void;
  onNavigateTailor?: (tailorId: string) => void;
  onCancelOrder?: (orderId: string, reason?: string) => void;
  onReschedule?: (orderId: string, newDate: string, newSlot: 'morning' | 'afternoon' | 'evening') => void;
  onReorder?: (order: CustomerOrder) => void;
  onSubmitReview?: (orderId: string, review: { shopRating?: number; shopReview?: string; tailorRating?: number; tailorReview?: string }) => void;
}

export const OrderTrackingDetailView: React.FC<OrderTrackingDetailViewProps> = ({
  order,
  onNavigateHome,
  onNavigateDashboard,
  onNavigateOrders,
  onNavigateShop,
  onNavigateTailor,
  onCancelOrder,
  onReschedule,
  onReorder,
  onSubmitReview,
}) => {
  const { isRtl, t } = useLanguage();
  const { showToast } = useToast();
  const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  const [copiedRef, setCopiedRef] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const shopName = isRtl ? order.shopNameAr : order.shopName;
  const serviceName = isRtl ? order.serviceNameAr : order.serviceName;

  const handleCopyReference = () => {
    try {
      navigator.clipboard.writeText(order.reference);
      setCopiedRef(true);
      showToast(isRtl ? 'تم نسخ رقم الطلب' : 'Order reference copied to clipboard', 'info');
      setTimeout(() => setCopiedRef(false), 2000);
    } catch {}
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Order ${order.reference} - KHAYYAT`,
        text: `Tracking tailored thobe at ${shopName}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyReference();
    }
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitReview) {
      onSubmitReview(order.id, {
        shopRating: reviewStars,
        shopReview: reviewComment,
        tailorRating: reviewStars,
        tailorReview: reviewComment,
      });
      showToast(t.dashboard.reviewSubmitted, 'success');
    }
    setShowReviewModal(false);
  };

  return (
    <div className="space-y-6 text-start max-w-5xl mx-auto py-2">
      {/* 1. Breadcrumbs Bar */}
      <div className="flex items-center justify-between text-xs text-[#8E8B85]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNavigateDashboard}
            className="hover:text-[#121316] font-medium cursor-pointer"
          >
            {isRtl ? 'لوحة العميل' : 'Dashboard'}
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={onNavigateOrders}
            className="hover:text-[#121316] font-medium cursor-pointer"
          >
            {isRtl ? 'الطلبات' : 'Orders'}
          </button>
          <span>/</span>
          <span className="font-mono font-bold text-[#121316]">{order.reference}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="p-1.5 rounded-lg border border-[#E6E2DB] bg-white hover:bg-[#FAF9F6] text-[#65625D] hover:text-[#121316] transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.common.share}</span>
          </button>
        </div>
      </div>

      {/* 2. Order Header Card */}
      <div className="bg-white rounded-2xl border border-[#E6E2DB] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold font-mono text-[#916F3E]">
              {order.reference}
            </h1>
            <button
              onClick={handleCopyReference}
              title="Copy reference"
              className="p-1 text-[#8E8B85] hover:text-[#121316] transition-colors cursor-pointer"
            >
              {copiedRef ? <Check className="w-4 h-4 text-[#2D6A4F]" /> : <Copy className="w-4 h-4" />}
            </button>
            <OrderStatusBadge status={order.status} size="md" />
          </div>

          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-[#121316]">{serviceName}</h2>
            <div className="flex items-center gap-3 text-xs text-[#65625D] flex-wrap">
              <div className="flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-[#8E8B85]" />
                <span className="font-semibold text-[#121316]">{shopName}</span>
              </div>
              <span>·</span>
              <span>
                {t.dashboard.placedOn}{' '}
                {new Date(order.createdAt).toLocaleDateString(isRtl ? 'ar-SA' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Card Right */}
        <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] text-start md:text-end shrink-0 space-y-1">
          <span className="text-[11px] text-[#8E8B85] block">
            {order.priceSummary.status === 'ESTIMATED'
              ? isRtl ? 'إجمالي تقديري' : 'Estimated Total'
              : isRtl ? 'الإجمالي المعتمد' : 'Confirmed Total'}
          </span>
          <PriceDisplay
            amount={order.priceSummary.estimatedTotal || order.priceSummary.confirmedTotal || 0}
            size="lg"
          />
          <span className="text-[10px] text-[#8E8B85] block">
            {isRtl ? 'شامل ضريبة القيمة المضافة 15%' : 'Includes 15% VAT'}
          </span>
        </div>
      </div>

      {/* 3. Progress Timeline Pipeline */}
      <OrderTimeline
        currentStatus={order.status}
        statusHistory={order.statusHistory}
        estimatedCompletionDate={order.estimatedCompletionDate}
      />

      {/* 4. Complete Order Summary & Sartorial Anatomy */}
      <OrderSummaryCard
        order={order}
        onNavigateShop={onNavigateShop}
        onNavigateTailor={onNavigateTailor}
        onCancelOrder={(id) => onCancelOrder && onCancelOrder(id)}
        onReschedule={() => {
          showToast(isRtl ? 'طلب إعادة جدولة الموعد قيد المراجعة' : 'Reschedule request submitted', 'info');
        }}
        onReorder={onReorder}
        onLeaveReview={() => setShowReviewModal(true)}
        onContactShop={() => setShowContactModal(true)}
      />

      {/* 5. Concierge & Support Card */}
      <div className="p-5 rounded-2xl bg-[#121316] text-[#FAF9F6] border border-[#2E313D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-[#FAF9F6]">
              {isRtl ? 'خدمة كونسيرج خيّاط الخاصة' : 'KHAYYAT Dedicated Sartorial Concierge'}
            </h4>
            <p className="text-xs text-[#A8A49D]">
              {isRtl
                ? 'هل تحتاج استشارة حرفية خاصة حول قصة الثوب أو نوع القماش؟ فريقنا بخدمتك.'
                : 'Need dedicated assistance or bespoke advice regarding your thobe fit? Our team is available.'}
            </p>
          </div>
        </div>

        <Button
          variant="gold"
          size="sm"
          onClick={() => setShowContactModal(true)}
          className="text-xs shrink-0 font-bold"
        >
          <Phone className="w-3.5 h-3.5 me-1.5" />
          {isRtl ? 'محادثة المساعد الحرفي' : 'Connect with Concierge'}
        </Button>
      </div>

      {/* Contact Atelier Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-start">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE9]">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-[#916F3E]" />
                <h3 className="text-sm font-bold text-[#121316]">{shopName}</h3>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-[#8E8B85] hover:text-[#121316]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#65625D]">
              {isRtl
                ? 'يمكنك التواصل المباشر مع مدير إنتاج المشغل بشأن طلبك رقم '
                : 'Direct line to the atelier production manager for Order '}
              <strong className="font-mono text-[#916F3E]">{order.reference}</strong>:
            </p>

            <div className="space-y-2 text-xs">
              <a
                href="tel:+966114457890"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] hover:border-[#916F3E] transition-colors"
              >
                <span className="font-semibold text-[#121316]">
                  {isRtl ? 'الاتصال الهاتفي المباشر' : 'Phone Call'}
                </span>
                <span className="font-mono text-[#916F3E] font-bold">+966 11 445 7890</span>
              </a>

              <a
                href="https://wa.me/966501234567"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] hover:border-[#916F3E] transition-colors"
              >
                <span className="font-semibold text-[#121316]">
                  {isRtl ? 'محادثة واتساب الرسمية' : 'WhatsApp Official Channel'}
                </span>
                <span className="text-[#2D6A4F] font-bold">{isRtl ? 'بدء المحادثة' : 'Chat Now'}</span>
              </a>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowContactModal(false)}>
                {t.common.close}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-start">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE9]">
              <h3 className="text-base font-bold text-[#121316]">
                {t.dashboard.leaveReview}
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-[#8E8B85] hover:text-[#121316]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4 text-xs">
              <div className="space-y-1 text-center">
                <span className="text-xs text-[#8E8B85] block">
                  {isRtl ? 'تقييم جودة التفصيل ووقفة القماش' : 'Rate craftsmanship and thobe fit'}
                </span>
                <div className="flex items-center justify-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setReviewStars(s)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          s <= reviewStars
                            ? 'text-[#C5A880] fill-current'
                            : 'text-[#D1D5DB]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#121316] mb-1">
                  {isRtl ? 'ملاحظاتك وانطباعك عن الثوب' : 'Your review & fit comments'}
                </label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder={
                    isRtl
                      ? 'شاركنا رأيك في دقة المقاسات، جودة الحياكة، ووقفة الياقة...'
                      : 'Tell us about the precision of cut, collar stiffness, and overall finish...'
                  }
                  className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#F2EFE9]">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowReviewModal(false)}>
                  {t.common.cancel}
                </Button>
                <Button variant="gold" size="sm" type="submit" className="font-bold">
                  {isRtl ? 'إرسال التقييم' : 'Submit Review'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
