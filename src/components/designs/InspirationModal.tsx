import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Scissors,
  Store,
  Upload,
  CheckCircle2,
  Shirt,
  ArrowRight,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import { Design } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { useToast } from '../feedback/Toast';
import { Button } from '../ui/Button';

export interface InspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: Design | null;
  onSelectShopDestination?: (shopSlug?: string) => void;
  onSelectTailorDestination?: (tailorSlug?: string) => void;
}

export const InspirationModal: React.FC<InspirationModalProps> = ({
  isOpen,
  onClose,
  design,
  onSelectShopDestination,
  onSelectTailorDestination,
}) => {
  const { isRtl } = useLanguage();
  const { showToast } = useToast();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [collarNote, setCollarNote] = useState('');
  const [cuffNote, setCuffNote] = useState('');
  const [fabricNote, setFabricNote] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [destinationChoice, setDestinationChoice] = useState<'creator' | 'custom_shop' | 'custom_tailor'>('creator');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !design) return null;

  const title = isRtl ? design.titleAr : design.title;
  const creatorName = isRtl ? design.creatorNameAr : design.creatorName;
  const category = isRtl ? design.categoryAr : design.category;

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFiles((prev) => [...prev, file.name]);
      showToast({
        type: 'info',
        title: isRtl ? 'تمت إضافة صورة المرجع' : 'Reference Image Attached',
        description: file.name,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
      showToast({
        type: 'success',
        title: isRtl ? 'تم حفظ طلب الإلهام بنجاح' : 'Inspiration Pack Prepared',
        description: isRtl
          ? `تم إعداد تفضيلات التصميم بناءً على "${title}"`
          : `Custom sartorial notes saved for "${title}"`,
      });
    }, 600);
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#E6E2DB] overflow-hidden text-start animate-in fade-in zoom-in-95 duration-200"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="bg-[#121316] text-[#FAF9F6] px-6 py-4 flex items-center justify-between border-b border-[#24262E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg">
                {isRtl ? 'استخدام هذا التصميم كمرجع لطلبك' : 'Use This Design as Inspiration'}
              </h3>
              <p className="text-xs text-[#A8A49D]">
                {isRtl
                  ? 'جهّز مواصفات ثوبك القادم بناءً على هذا العمل الحرفي'
                  : 'Prepare your custom garment order specs using this design as reference'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-[#8E8B85] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Selected Design Reference Card */}
            <div className="flex items-center gap-3.5 p-3 bg-[#FAF9F6] rounded-xl border border-[#E6E2DB]">
              <img
                src={design.primaryImage}
                alt={title}
                className="w-16 h-16 rounded-lg object-cover border border-[#D4D0C7] shrink-0"
              />

              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-[#916F3E] uppercase tracking-wider block">
                  {category} · {design.style}
                </span>
                <h4 className="text-sm font-bold text-[#121316] truncate">{title}</h4>
                <div className="text-xs text-[#65625D] mt-0.5">
                  <span className="font-semibold text-[#121316]">{creatorName}</span>
                  <span className="mx-1">·</span>
                  <span>{design.city}</span>
                </div>
              </div>

              {design.startingPrice && (
                <div className="text-end shrink-0 ps-2">
                  <span className="text-[10px] text-[#8E8B85] block">{isRtl ? 'يبدأ من' : 'From'}</span>
                  <span className="text-sm font-bold font-display text-[#121316]">
                    {design.startingPrice} {isRtl ? 'ر.س' : 'SAR'}
                  </span>
                </div>
              )}
            </div>

            {/* Custom Notes Section */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold text-[#121316] uppercase tracking-wider border-b border-[#E6E2DB] pb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#916F3E]" />
                <span>{isRtl ? 'ملاحظات وتخصيصات الطلب' : 'Custom Order Notes'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#121316] mb-1">
                    {isRtl ? 'تفضيل الياقة / القلاب:' : 'Collar Preference:'}
                  </label>
                  <input
                    type="text"
                    value={collarNote}
                    onChange={(e) => setCollarNote(e.target.value)}
                    placeholder={isRtl ? 'نفس القلاب المعروض، أو 4.5 سم مقوى...' : 'Same as design, or 4.5cm stiff...'}
                    className="w-full text-xs text-[#121316] border border-[#E6E2DB] rounded-lg p-2.5 focus:border-[#C5A880] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#121316] mb-1">
                    {isRtl ? 'تفضيل الكم / الكبك:' : 'Cuff Preference:'}
                  </label>
                  <input
                    type="text"
                    value={cuffNote}
                    onChange={(e) => setCuffNote(e.target.value)}
                    placeholder={isRtl ? 'كبك فرنسي دائري، أو كم مفتوح سادة...' : 'French double cuff, or casual open...'}
                    className="w-full text-xs text-[#121316] border border-[#E6E2DB] rounded-lg p-2.5 focus:border-[#C5A880] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121316] mb-1">
                  {isRtl ? 'ملاحظات القماش أو التفصيل الإضافية:' : 'Fabric & Detailed Specifications:'}
                </label>
                <textarea
                  rows={2}
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  placeholder={
                    isRtl
                      ? 'وضح تفضيلاتك: نوع القماش، نزلة الكتف، اتساع القصة، أو أي تعديل خاص...'
                      : 'Specify preferences: fabric origin, shoulder slope, fit width, or alterations...'
                  }
                  className="w-full text-xs text-[#121316] border border-[#E6E2DB] rounded-lg p-2.5 focus:border-[#C5A880] focus:outline-hidden resize-none"
                />
              </div>

              {/* Optional Reference Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-[#121316] mb-1">
                  {isRtl ? 'إرفاق صورة مرجعية إضافية (اختياري):' : 'Attach Reference Image (Optional):'}
                </label>
                <label className="flex flex-col items-center justify-center p-3 border border-dashed border-[#D4D0C7] hover:border-[#C5A880] rounded-xl bg-[#FAF9F6] cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-[#8E8B85] mb-1" />
                  <span className="text-xs font-medium text-[#121316]">
                    {isRtl ? 'اضغط لرفع صورة أو نموذج قماش' : 'Click to attach image or fabric swatch'}
                  </span>
                  <span className="text-[10px] text-[#8E8B85]">PNG, JPG up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSimulatedUpload}
                    className="hidden"
                  />
                </label>

                {uploadedFiles.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {uploadedFiles.map((fn, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-[#E6E2DB] text-[11px] text-[#121316]"
                      >
                        <ImageIcon className="w-3 h-3 text-[#C5A880]" />
                        <span className="truncate max-w-[150px]">{fn}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Step: Continue to Choose Shop / Tailor */}
              <div>
                <label className="block text-xs font-semibold text-[#121316] mb-1.5">
                  {isRtl ? 'المسار المطلوب للتفصيل:' : 'Tailoring Execution Path:'}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#E6E2DB] bg-white cursor-pointer hover:border-[#C5A880] transition-colors">
                    <input
                      type="radio"
                      name="destinationChoice"
                      value="creator"
                      checked={destinationChoice === 'creator'}
                      onChange={() => setDestinationChoice('creator')}
                      className="accent-[#916F3E]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#121316]">
                        {isRtl
                          ? `طلب التفصيل مباشرة من صاحب التصميم (${creatorName})`
                          : `Commission directly with Creator (${creatorName})`}
                      </span>
                      <span className="text-[#65625D] block text-[11px]">
                        {isRtl ? 'إرسال المواصفات إلى المشغل/الخياط الأصلي' : 'Send specifications directly to original artisan'}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#E6E2DB] bg-white cursor-pointer hover:border-[#C5A880] transition-colors">
                    <input
                      type="radio"
                      name="destinationChoice"
                      value="custom_shop"
                      checked={destinationChoice === 'custom_shop'}
                      onChange={() => setDestinationChoice('custom_shop')}
                      className="accent-[#916F3E]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#121316]">
                        {isRtl ? 'متابعة لاختيار مشغل آخر قريب مني' : 'Continue to Choose Another Atelier'}
                      </span>
                      <span className="text-[#65625D] block text-[11px]">
                        {isRtl ? 'استعراض المشاغل القريبة لتفصيل نفس الستايل' : 'Find ateliers near you able to execute this style'}
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#E6E2DB] bg-white cursor-pointer hover:border-[#C5A880] transition-colors">
                    <input
                      type="radio"
                      name="destinationChoice"
                      value="custom_tailor"
                      checked={destinationChoice === 'custom_tailor'}
                      onChange={() => setDestinationChoice('custom_tailor')}
                      className="accent-[#916F3E]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#121316]">
                        {isRtl ? 'متابعة لاختيار معلّم خياطة متخصص' : 'Continue to Choose a Master Tailor'}
                      </span>
                      <span className="text-[#65625D] block text-[11px]">
                        {isRtl ? 'البحث عن معلّم قص وتفصيل خبير بهذا النوع' : 'Select a resident karigar specialized in this craft'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-[#E6E2DB] flex items-center justify-end gap-2.5">
              <Button type="button" variant="outline" size="sm" onClick={handleClose}>
                {isRtl ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span>{isRtl ? 'جاري الحفظ...' : 'Preparing...'}</span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'تأكيد وحفظ المرجع' : 'Confirm & Save Reference'}</span>
                  </span>
                )}
              </Button>
            </div>
          </form>
        ) : (
          /* Step: Success */
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#1E5638]/15 text-[#1E5638] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-xl font-display font-bold text-[#121316]">
              {isRtl ? 'تم إعداد مرجع التصميم بنجاح' : 'Inspiration Pack Ready'}
            </h4>

            <p className="text-xs text-[#65625D] max-w-md mx-auto leading-relaxed">
              {isRtl
                ? `تم حفظ "${title}" مع جميع ملاحظات القلاب والكم والمواصفات الخاصة بك. يمكنك الآن متابعة رحلة التفصيل مع المشغل أو الخياط المختار.`
                : `"${title}" has been saved with your personalized specs for your next order.`}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Button variant="outline" size="sm" onClick={handleClose}>
                {isRtl ? 'إغلاق' : 'Close'}
              </Button>

              {destinationChoice === 'custom_shop' && onSelectShopDestination ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleClose();
                    onSelectShopDestination();
                  }}
                >
                  <Store className="w-3.5 h-3.5 me-1.5" />
                  <span>{isRtl ? 'استعراض المشاغل المتاحة' : 'Explore Ateliers'}</span>
                </Button>
              ) : destinationChoice === 'custom_tailor' && onSelectTailorDestination ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleClose();
                    onSelectTailorDestination();
                  }}
                >
                  <Scissors className="w-3.5 h-3.5 me-1.5" />
                  <span>{isRtl ? 'استعراض معلّمي الخياطة' : 'Explore Master Tailors'}</span>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleClose();
                    if (design.creatorType === 'TAILOR') {
                      onSelectTailorDestination?.(design.creatorSlug);
                    } else {
                      onSelectShopDestination?.(design.creatorSlug);
                    }
                  }}
                >
                  <span>{isRtl ? 'متابعة مع صاحب التصميم' : 'Proceed with Creator'}</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
