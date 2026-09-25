import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  Calendar,
  Send,
  Phone,
  Building2,
  Clock,
  MapPin,
  CheckCircle2,
  Scissors,
} from 'lucide-react';
import { Tailor, TailorServiceItem } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { PriceDisplay } from '../ui/PriceDisplay';
import { useToast } from '../feedback/Toast';

export interface TailorContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  tailor: Tailor | null;
  mode?: 'contact' | 'book';
  selectedService?: TailorServiceItem | null;
}

export const TailorContactModal: React.FC<TailorContactModalProps> = ({
  isOpen,
  onClose,
  tailor,
  mode = 'contact',
  selectedService,
}) => {
  const { t, isRtl } = useLanguage();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'contact' | 'book'>(mode);
  const [message, setMessage] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-10-02');
  const [preferredTime, setPreferredTime] = useState('17:00');
  const [fittingLocation, setFittingLocation] = useState<'atelier' | 'home'>('atelier');
  const [chosenServiceId, setChosenServiceId] = useState<string>(
    selectedService?.id || tailor?.servicesOffered?.[0]?.id || ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync mode when modal opens
  React.useEffect(() => {
    setActiveTab(mode);
    setIsSubmitted(false);
    if (selectedService) {
      setChosenServiceId(selectedService.id);
    }
  }, [mode, selectedService, isOpen]);

  if (!isOpen || !tailor) return null;

  const tailorName = isRtl ? tailor.nameAr : tailor.name;
  const shopName = isRtl ? tailor.currentShopNameAr : tailor.currentShopName;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast({
        title:
          activeTab === 'book'
            ? isRtl
              ? `تم إرسال طلب حجز المقابلة مع المعلم ${tailorName} بنجاح!`
              : `Appointment request sent to ${tailorName} successfully!`
            : isRtl
            ? `تم إرسال استفسارك إلى المعلم ${tailorName}`
            : `Message sent to ${tailorName} successfully`,
        type: 'success',
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl max-w-lg w-full border border-[#E6E2DB] shadow-2xl overflow-hidden relative text-start animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF9F6] border-b border-[#E6E2DB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={tailorName} src={tailor.avatarUrl} size="md" isVerified={tailor.trust.isVerifiedTailor} />
            <div>
              <h3 className="text-base font-bold text-[#121316]">{tailorName}</h3>
              <p className="text-xs text-[#65625D]">
                {shopName ? (
                  <span>{shopName} · {isRtl ? tailor.cityAr : tailor.city}</span>
                ) : (
                  <span>{isRtl ? 'حرفي مستقل' : 'Independent Bespoke Artisan'}</span>
                )}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8E8B85] hover:text-[#121316] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E6E2DB] bg-[#FAF9F6]/50">
          <button
            onClick={() => {
              setActiveTab('contact');
              setIsSubmitted(false);
            }}
            className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'contact'
                ? 'border-[#916F3E] text-[#916F3E] bg-white'
                : 'border-transparent text-[#65625D] hover:text-[#121316]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isRtl ? 'استفسار وتواصل' : 'Inquire / Message'}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('book');
              setIsSubmitted(false);
            }}
            className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'book'
                ? 'border-[#916F3E] text-[#916F3E] bg-white'
                : 'border-transparent text-[#65625D] hover:text-[#121316]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{isRtl ? 'حجز موعد قياس' : 'Book Fitting Session'}</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F2F7F4] border border-[#CDE3D5] text-[#1E5638] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#121316]">
                {activeTab === 'book'
                  ? isRtl ? 'تم استقبال طلب الحجز بنجاح' : 'Fitting Request Received'
                  : isRtl ? 'تم إرسال رسالتك بنجاح' : 'Message Sent Successfully'}
              </h4>
              <p className="text-xs text-[#65625D] max-w-sm mx-auto leading-relaxed">
                {activeTab === 'book'
                  ? isRtl
                    ? `سيقوم المعلم ${tailorName} أو منسق المشغل بالتواصل معك هاتفياً لتأكيد موعد وتفاصيل القياس.`
                    : `${tailorName} or the atelier concierge will contact you by phone shortly to confirm your fitting.`
                  : isRtl
                  ? `شكراً لتواصلك. سيتلقى المعلم رسالتك ويجيبك في أقرب وقت.`
                  : `Thank you. The master tailor will receive your inquiry and respond shortly.`}
              </p>
              <div className="pt-4">
                <Button variant="secondary" size="sm" onClick={onClose}>
                  {isRtl ? 'إغلاق النافذة' : 'Close Window'}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'book' && (
                <>
                  {/* Select Service */}
                  {tailor.servicesOffered && tailor.servicesOffered.length > 0 && (
                    <div>
                      <label className="block text-xs font-bold text-[#121316] mb-1.5 uppercase tracking-wider">
                        {isRtl ? 'اختر الخدمة المطلوبة' : 'Select Service'}
                      </label>
                      <div className="space-y-2">
                        {tailor.servicesOffered.map((srv) => (
                          <label
                            key={srv.id}
                            className={`flex items-start justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                              chosenServiceId === srv.id
                                ? 'bg-[#FAF6F0] border-[#C5A880] shadow-xs'
                                : 'bg-[#FAF9F6] border-[#E6E2DB] hover:border-[#B8B4AC]'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <input
                                type="radio"
                                name="service"
                                checked={chosenServiceId === srv.id}
                                onChange={() => setChosenServiceId(srv.id)}
                                className="accent-[#916F3E] mt-0.5 cursor-pointer"
                              />
                              <div>
                                <span className="font-bold text-[#121316] block">
                                  {isRtl ? srv.titleAr : srv.title}
                                </span>
                                <span className="text-[11px] text-[#65625D] line-clamp-1 mt-0.5">
                                  {isRtl ? srv.descriptionAr : srv.description}
                                </span>
                              </div>
                            </div>
                            <span className="font-bold text-[#916F3E] shrink-0 ms-2">
                              {srv.priceSar} {t.common.sar}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fitting Location */}
                  <div>
                    <label className="block text-xs font-bold text-[#121316] mb-1.5 uppercase tracking-wider">
                      {isRtl ? 'مكان أخذ القياسات' : 'Fitting Location'}
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setFittingLocation('atelier')}
                        className={`p-2.5 rounded-lg border text-start transition-all cursor-pointer ${
                          fittingLocation === 'atelier'
                            ? 'bg-[#FAF6F0] border-[#C5A880] text-[#916F3E] font-semibold'
                            : 'bg-[#FAF9F6] border-[#E6E2DB] text-[#65625D]'
                        }`}
                      >
                        <Building2 className="w-4 h-4 mb-1" />
                        <span>{isRtl ? 'في المشغل / الاستوديو' : 'At Atelier'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFittingLocation('home')}
                        className={`p-2.5 rounded-lg border text-start transition-all cursor-pointer ${
                          fittingLocation === 'home'
                            ? 'bg-[#FAF6F0] border-[#C5A880] text-[#916F3E] font-semibold'
                            : 'bg-[#FAF9F6] border-[#E6E2DB] text-[#65625D]'
                        }`}
                      >
                        <MapPin className="w-4 h-4 mb-1" />
                        <span>{isRtl ? 'خدمة قياس منزلية VIP' : 'VIP Home Visit'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#65625D] mb-1">
                        {isRtl ? 'تاريخ الموعد' : 'Preferred Date'}
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-[#E6E2DB] bg-[#FAF9F6] text-[#121316] focus:outline-none focus:border-[#C5A880]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#65625D] mb-1">
                        {isRtl ? 'الوقت المفضل' : 'Preferred Time'}
                      </label>
                      <input
                        type="time"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-[#E6E2DB] bg-[#FAF9F6] text-[#121316] focus:outline-none focus:border-[#C5A880]"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Client Info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#65625D] mb-1">
                    {isRtl ? 'اسمك الكريم' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={isRtl ? 'محمد العلي' : 'Faisal Al-Saud'}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#E6E2DB] bg-[#FAF9F6] text-[#121316] focus:outline-none focus:border-[#C5A880]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#65625D] mb-1">
                    {isRtl ? 'رقم الجوال السعودي' : 'Mobile Number'}
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full text-xs p-2.5 rounded-lg border border-[#E6E2DB] bg-[#FAF9F6] text-[#121316] focus:outline-none focus:border-[#C5A880]"
                    required
                  />
                </div>
              </div>

              {/* Message / Notes */}
              <div>
                <label className="block text-xs font-medium text-[#65625D] mb-1">
                  {activeTab === 'book'
                    ? isRtl ? 'ملاحظات وتفضيلات خاصة' : 'Custom Preferences / Notes'
                    : isRtl ? 'رسالتك أو استفسارك للمعلم' : 'Your Inquiry / Message'}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    activeTab === 'book'
                      ? isRtl
                        ? 'مثال: أحتاج تفصيل ثوبين بقلاب مقوى 4.5 سم مع إحضار عينات أقمشة تويوبو يابانية...'
                        : 'e.g. Inquiring about stiff royal collar in Toyobo 5000 fabric...'
                      : isRtl
                      ? 'اكتب استفسارك هنا للمعلم مباشرة...'
                      : 'Ask about turnaround time, fabric options, or collar construction...'
                  }
                  className="w-full text-xs p-2.5 rounded-lg border border-[#E6E2DB] bg-[#FAF9F6] text-[#121316] focus:outline-none focus:border-[#C5A880] resize-none"
                  required
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <Button variant="ghost" size="sm" type="button" onClick={onClose}>
                  {t.common.cancel}
                </Button>
                <Button
                  variant="gold"
                  size="sm"
                  type="submit"
                  disabled={isSubmitting}
                  icon={activeTab === 'book' ? <Calendar className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                >
                  {isSubmitting
                    ? isRtl ? 'جاري الإرسال...' : 'Submitting...'
                    : activeTab === 'book'
                    ? isRtl ? 'تأكيد إرسال طلب الحجز' : 'Confirm Fitting Request'
                    : isRtl ? 'إرسال الرسالة' : 'Send Message'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
