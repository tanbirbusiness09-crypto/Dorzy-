import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Scissors,
  Bookmark,
  CheckCircle2,
  Calendar,
  Layers,
  Shirt,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';
import { PortfolioItem } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { useToast } from '../feedback/Toast';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export interface InspirationOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: PortfolioItem | null;
  onNavigateCreator?: (creatorType: 'tailor' | 'shop', slug: string) => void;
}

export const InspirationOrderModal: React.FC<InspirationOrderModalProps> = ({
  isOpen,
  onClose,
  design,
  onNavigateCreator,
}) => {
  const { isRtl } = useLanguage();
  const { showToast } = useToast();

  const [step, setStep] = useState<'customize' | 'success'>('customize');
  const [collarChoice, setCollarChoice] = useState('match');
  const [cuffChoice, setCuffChoice] = useState('match');
  const [fabricChoice, setFabricChoice] = useState('match');
  const [customNotes, setCustomNotes] = useState('');
  const [orderMethod, setOrderMethod] = useState<'inquiry' | 'home_fitting' | 'save_board'>('inquiry');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !design) return null;

  const title = isRtl ? design.titleAr : design.title;
  const creatorName = isRtl ? design.creatorNameAr : design.creatorName;
  const fabricDetails = isRtl ? design.fabricDetailsAr : design.fabricDetails;
  const collarStyle = isRtl ? design.collarStyleAr : design.collarStyle;
  const cuffStyle = isRtl ? design.cuffStyleAr : design.cuffStyle;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');

      if (orderMethod === 'save_board') {
        showToast({
          type: 'success',
          title: isRtl ? 'تم الحفظ في لوحة الإلهام' : 'Saved to Inspiration Board',
          description: isRtl
            ? 'تم حفظ التصميم وتفضيلاتك في حسابك'
            : 'Design saved with your customized preferences',
        });
      } else {
        showToast({
          type: 'success',
          title: isRtl ? 'تم إرسال الطلب بنجاح' : 'Inspiration Inquiry Sent',
          description: isRtl
            ? `تم إرسال مواصفات التصميم إلى ${creatorName}`
            : `Design reference sent to ${creatorName}`,
        });
      }
    }, 600);
  };

  const handleResetAndClose = () => {
    setStep('customize');
    setCustomNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#E6E2DB] overflow-hidden text-start animate-in fade-in zoom-in-95 duration-200"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header Bar */}
        <div className="bg-[#121316] text-[#FAF9F6] px-6 py-4 flex items-center justify-between border-b border-[#24262E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg">
                {isRtl ? 'استخدام التصميم كمرجع للطلب' : 'Use as Order Inspiration'}
              </h3>
              <p className="text-xs text-[#A8A49D]">
                {isRtl
                  ? 'خصّص تفاصيل ثوبك بناءً على هذه الحرفية'
                  : 'Customize garment specifications based on this reference'}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-[#8E8B85] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'customize' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Reference Design Summary Card */}
            <div className="flex items-center gap-3.5 p-3 bg-[#FAF9F6] rounded-xl border border-[#E6E2DB]">
              {design.imageUrl ? (
                <img
                  src={design.imageUrl}
                  alt={title}
                  className="w-16 h-16 rounded-lg object-cover border border-[#D4D0C7] shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-[#121316] text-[#C5A880] flex items-center justify-center shrink-0">
                  <Shirt className="w-7 h-7" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-[#916F3E] uppercase tracking-wider">
                  {design.category}
                </div>
                <h4 className="text-sm font-bold text-[#121316] truncate">{title}</h4>
                <div className="flex items-center gap-2 text-xs text-[#65625D] mt-0.5">
                  <span className="font-medium text-[#121316]">{creatorName}</span>
                  <span>·</span>
                  <span>{design.city}</span>
                </div>
              </div>

              <div className="text-end shrink-0 ps-2">
                <div className="text-[11px] text-[#8E8B85]">{isRtl ? 'يبدأ من' : 'From'}</div>
                <div className="text-sm font-bold text-[#121316] font-display">
                  {design.priceSar} {isRtl ? 'ر.س' : 'SAR'}
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#121316] uppercase tracking-wider border-b border-[#E6E2DB] pb-2 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-[#916F3E]" />
                <span>{isRtl ? 'خيارات التخصيص والمواصفات' : 'Custom Sartorial Preferences'}</span>
              </h4>

              {/* 1. Collar Preference */}
              <div>
                <label className="block text-xs font-semibold text-[#121316] mb-1.5">
                  {isRtl ? 'تفضيل الياقة والقلاب:' : 'Collar Preference:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCollarChoice('match')}
                    className={`p-2.5 rounded-lg border text-start text-xs transition-colors cursor-pointer ${
                      collarChoice === 'match'
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#121316] font-semibold'
                        : 'border-[#E6E2DB] bg-white text-[#65625D] hover:border-[#C5A880]'
                    }`}
                  >
                    <div className="font-semibold text-[#121316]">
                      {isRtl ? 'مطابق للتصميم الأصلي' : 'Same as Design'}
                    </div>
                    <div className="text-[11px] text-[#8E8B85] truncate mt-0.5">{collarStyle}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCollarChoice('custom')}
                    className={`p-2.5 rounded-lg border text-start text-xs transition-colors cursor-pointer ${
                      collarChoice === 'custom'
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#121316] font-semibold'
                        : 'border-[#E6E2DB] bg-white text-[#65625D] hover:border-[#C5A880]'
                    }`}
                  >
                    <div className="font-semibold text-[#121316]">
                      {isRtl ? 'تعديل ارتفاع/صلابة القلاب' : 'Custom Height / Softness'}
                    </div>
                    <div className="text-[11px] text-[#8E8B85] mt-0.5">
                      {isRtl ? 'سأوضح التفاصيل في الملاحظات' : 'Specified in notes below'}
                    </div>
                  </button>
                </div>
              </div>

              {/* 2. Cuff Preference */}
              <div>
                <label className="block text-xs font-semibold text-[#121316] mb-1.5">
                  {isRtl ? 'تفضيل الكم والكبك:' : 'Cuff Preference:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCuffChoice('match')}
                    className={`p-2.5 rounded-lg border text-start text-xs transition-colors cursor-pointer ${
                      cuffChoice === 'match'
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#121316] font-semibold'
                        : 'border-[#E6E2DB] bg-white text-[#65625D] hover:border-[#C5A880]'
                    }`}
                  >
                    <div className="font-semibold text-[#121316]">
                      {isRtl ? 'مطابق للتصميم الأصلي' : 'Same as Design'}
                    </div>
                    <div className="text-[11px] text-[#8E8B85] truncate mt-0.5">{cuffStyle}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCuffChoice('open')}
                    className={`p-2.5 rounded-lg border text-start text-xs transition-colors cursor-pointer ${
                      cuffChoice === 'open'
                        ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#121316] font-semibold'
                        : 'border-[#E6E2DB] bg-white text-[#65625D] hover:border-[#C5A880]'
                    }`}
                  >
                    <div className="font-semibold text-[#121316]">
                      {isRtl ? 'كم سادة مفتوح (بدون كبك)' : 'Open / Casual Sleeve'}
                    </div>
                    <div className="text-[11px] text-[#8E8B85] mt-0.5">
                      {isRtl ? 'خياطة مزدوجة ناعمة' : 'Double stitch relaxed cuff'}
                    </div>
                  </button>
                </div>
              </div>

              {/* 3. Fabric Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#121316] mb-1.5">
                  {isRtl ? 'خيار القماش المفضل:' : 'Fabric Choice:'}
                </label>
                <select
                  value={fabricChoice}
                  onChange={(e) => setFabricChoice(e.target.value)}
                  className="w-full bg-white text-xs font-medium text-[#121316] border border-[#E6E2DB] rounded-lg px-3 py-2.5 focus:outline-hidden focus:border-[#C5A880]"
                >
                  <option value="match">
                    {isRtl ? `نفس القماش الموصى به (${fabricDetails})` : `Recommended Fabric (${fabricDetails})`}
                  </option>
                  <option value="client_fabric">
                    {isRtl ? 'سأقوم بإحضار القماش بنفسي للمشغل' : 'I will provide my own fabric'}
                  </option>
                  <option value="consultation">
                    {isRtl ? 'طلب عينات واستشارة الخياط في المشغل' : 'Consult with tailor on swatches'}
                  </option>
                </select>
              </div>

              {/* 4. Custom Notes Textarea */}
              <div>
                <label className="block text-xs font-semibold text-[#121316] mb-1.5">
                  {isRtl ? 'ملاحظات إضافية وتفاصيل القياس:' : 'Custom Notes & Fitting Requests:'}
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder={
                    isRtl
                      ? 'مثال: أفضّل نزلة كتف رياضية، جيب قلم إضافي، ومقاس فضفاض للثوب...'
                      : 'e.g. Athletic shoulder slope, deeper pen pocket, or relaxed fit...'
                  }
                  className="w-full text-xs text-[#121316] border border-[#E6E2DB] rounded-lg p-2.5 focus:outline-hidden focus:border-[#C5A880] resize-none"
                />
              </div>

              {/* 5. Destination Action */}
              <div>
                <label className="block text-xs font-semibold text-[#121316] mb-1.5">
                  {isRtl ? 'كيف ترغب في المتابعة؟' : 'Next Step:'}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E6E2DB] bg-white cursor-pointer hover:border-[#C5A880] transition-colors">
                    <input
                      type="radio"
                      name="orderMethod"
                      value="inquiry"
                      checked={orderMethod === 'inquiry'}
                      onChange={() => setOrderMethod('inquiry')}
                      className="accent-[#916F3E]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#121316]">
                        {isRtl ? 'إرسال استفسار مباشر للمُنفّذ' : 'Send Direct Inquiry to Creator'}
                      </span>
                      <span className="text-[#65625D] block text-[11px]">
                        {isRtl
                          ? `طلب تسعيرة وتأكيد توفر الموعد مع ${creatorName}`
                          : `Request quote and confirm timing with ${creatorName}`}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E6E2DB] bg-white cursor-pointer hover:border-[#C5A880] transition-colors">
                    <input
                      type="radio"
                      name="orderMethod"
                      value="home_fitting"
                      checked={orderMethod === 'home_fitting'}
                      onChange={() => setOrderMethod('home_fitting')}
                      className="accent-[#916F3E]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#121316]">
                        {isRtl ? 'حجز موعد قياس منزلي خاص' : 'Book Home Measurement Fitting'}
                      </span>
                      <span className="text-[#65625D] block text-[11px]">
                        {isRtl
                          ? 'زيارة خياط محترف لمنزلك مع عينات الأقمشة'
                          : 'Professional master tailor visits your location with fabric swatches'}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E6E2DB] bg-white cursor-pointer hover:border-[#C5A880] transition-colors">
                    <input
                      type="radio"
                      name="orderMethod"
                      value="save_board"
                      checked={orderMethod === 'save_board'}
                      onChange={() => setOrderMethod('save_board')}
                      className="accent-[#916F3E]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#121316]">
                        {isRtl ? 'حفظ في لوحة تصاميمي المفضلة' : 'Save to My Inspiration Board'}
                      </span>
                      <span className="text-[#65625D] block text-[11px]">
                        {isRtl
                          ? 'الاحتفاظ بالتصميم والملاحظات لطلبها في وقت لاحق'
                          : 'Save design and customized notes for later orders'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-[#E6E2DB] flex items-center justify-end gap-2.5">
              <Button type="button" variant="outline" size="sm" onClick={handleResetAndClose}>
                {isRtl ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span>{isRtl ? 'جاري الإرسال...' : 'Submitting...'}</span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {orderMethod === 'save_board'
                        ? isRtl
                          ? 'حفظ في اللوحة'
                          : 'Save to Board'
                        : isRtl
                        ? 'متابعة الطلب'
                        : 'Proceed with Request'}
                    </span>
                  </span>
                )}
              </Button>
            </div>
          </form>
        ) : (
          /* Step Success */
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#1E5638]/15 text-[#1E5638] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-display font-bold text-[#121316]">
              {orderMethod === 'save_board'
                ? isRtl
                  ? 'تم حفظ التصميم بنجاح'
                  : 'Design Saved to Board'
                : isRtl
                ? 'تم استلام طلب الإلهام بنجاح'
                : 'Inspiration Request Received'}
            </h4>

            <p className="text-xs text-[#65625D] max-w-md mx-auto leading-relaxed">
              {orderMethod === 'save_board'
                ? isRtl
                  ? `تم حفظ "${title}" مع جميع تفضيلاتك في لوحة الإلهام الخاصة بك للرجوع إليها عند التفصيل.`
                  : `"${title}" has been saved with your personalized specs for your next tailoring order.`
                : isRtl
                ? `تم إرسال مواصفات تفصيل "${title}" إلى ${creatorName}. سيتواصل معك فريق المشغل لتأكيد موعد القياس وتفاصيل القماش.`
                : `Your tailoring request for "${title}" has been received by ${creatorName}. You will be contacted shortly to confirm measurements and fittings.`}
            </p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <Button variant="primary" size="sm" onClick={handleResetAndClose}>
                {isRtl ? 'العودة للتصاميم' : 'Back to Designs'}
              </Button>
              {onNavigateCreator && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleResetAndClose();
                    onNavigateCreator(design.creatorType, design.creatorSlug);
                  }}
                >
                  {isRtl ? 'عرض ملف المنفذ' : 'View Creator Profile'}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
