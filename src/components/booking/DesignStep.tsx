import React, { useState } from 'react';
import {
  Sparkles,
  Scissors,
  Store,
  Upload,
  CheckCircle2,
  X,
  FileText,
  Image as ImageIcon,
  Sliders,
  Check,
  Info,
} from 'lucide-react';
import { PortfolioItem } from '../../types';
import { DesignChoiceOption } from '../../types/booking';
import { mockPortfolio } from '../../data/mock/portfolio';
import { useLanguage } from '../../localization/LanguageContext';
import { Button } from '../ui/Button';

export interface DesignStepProps {
  selectedDesignId?: string;
  designOption?: DesignChoiceOption;
  customDesignNotes?: string;
  referenceFileNames?: string[];
  shopId: string;
  tailorId?: string;
  onSelectDesign: (designId?: string, option?: DesignChoiceOption, customNotes?: string, files?: string[]) => void;
}

export const DesignStep: React.FC<DesignStepProps> = ({
  selectedDesignId,
  designOption = 'shop',
  customDesignNotes = '',
  referenceFileNames = [],
  shopId,
  tailorId,
  onSelectDesign,
}) => {
  const { t, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState<DesignChoiceOption>(designOption);
  const [notes, setNotes] = useState(customDesignNotes);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(referenceFileNames);

  // Find currently selected design
  const selectedDesign = mockPortfolio.find((p) => p.id === selectedDesignId);

  // Designs tailored for this shop or tailor
  const relevantDesigns = mockPortfolio.filter((d) => {
    if (activeTab === 'tailor' && tailorId) {
      return d.tailorId === tailorId;
    }
    if (activeTab === 'shop') {
      return d.shopId === shopId;
    }
    return true;
  });

  const handleSelectPortfolioItem = (item: PortfolioItem) => {
    onSelectDesign(item.id, activeTab === 'inspiration' ? 'inspiration' : activeTab, notes, uploadedFiles);
  };

  const handleClearInspiration = () => {
    onSelectDesign(undefined, 'shop', notes, uploadedFiles);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      const updated = [...uploadedFiles, fileName];
      setUploadedFiles(updated);
      onSelectDesign(selectedDesignId, 'upload', notes, updated);
    }
  };

  const handleNotesChange = (val: string) => {
    setNotes(val);
    onSelectDesign(selectedDesignId, activeTab, val, uploadedFiles);
  };

  return (
    <div className="space-y-6 text-start">
      {/* 1. HEADER */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
          {t.booking.chooseDesign}
        </h1>
        <p className="text-xs text-[#65625D] mt-0.5">
          {isRtl
            ? 'حدد طراز وقصّة الثوب، أو اختر من تصاميم المشغل، أو اعتمد تصميماً مخصصاً حسب رغبتك.'
            : 'Select the garment silhouette, choose from the atelier catalog, or commission a custom bespoke cut.'}
        </p>
      </div>

      {/* 2. INSPIRATION BANNER (If originated from or has selected design) */}
      {selectedDesign && (
        <div className="bg-[#FAF4EB] border border-[#E5D2BA] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-lg bg-white border border-[#E6E2DB] overflow-hidden shrink-0">
              <img
                src={selectedDesign.imageUrl}
                alt={selectedDesign.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#916F3E] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.booking.inspiredByBadge}</span>
              </div>
              <h2 className="text-sm font-bold text-[#121316]">
                {isRtl ? selectedDesign.titleAr : selectedDesign.title}
              </h2>
              <p className="text-[11px] text-[#65625D]">
                {isRtl ? selectedDesign.creatorNameAr : selectedDesign.creatorName} · {isRtl ? selectedDesign.categoryAr : selectedDesign.category}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearInspiration}
            className="text-xs text-[#D32F2F] hover:underline flex items-center gap-1 self-start sm:self-center cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>{t.booking.removeInspiration}</span>
          </button>
        </div>
      )}

      {/* 3. DESIGN SOURCE TABS */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F5F3EF] rounded-xl border border-[#E6E2DB] overflow-x-auto scrollbar-none">
        {[
          { id: 'shop', label: t.booking.designOptionShop, icon: Store },
          { id: 'tailor', label: t.booking.designOptionTailor, icon: Scissors },
          { id: 'inspiration', label: t.booking.designOptionInspiration, icon: Sparkles },
          { id: 'upload', label: t.booking.designOptionUpload, icon: Upload },
          { id: 'custom', label: t.booking.designOptionCustom, icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id as DesignChoiceOption);
                onSelectDesign(selectedDesignId, tab.id as DesignChoiceOption, notes, uploadedFiles);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-white text-[#121316] shadow-xs border border-[#E6E2DB]'
                  : 'text-[#65625D] hover:text-[#121316]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A880]' : 'text-[#8E8B85]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. TAB CONTENTS */}
      {/* Option A & B & C: Portfolio / Design Grid */}
      {(activeTab === 'shop' || activeTab === 'tailor' || activeTab === 'inspiration') && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {relevantDesigns.slice(0, 6).map((design) => {
              const isSelected = design.id === selectedDesignId;
              const title = isRtl ? design.titleAr : design.title;
              const style = isRtl ? design.styleAr : design.style;

              return (
                <div
                  key={design.id}
                  onClick={() => handleSelectPortfolioItem(design)}
                  className={`rounded-xl border overflow-hidden transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#C5A880] ring-2 ring-[#C5A880]/30 shadow-xs'
                      : 'border-[#E6E2DB] bg-white hover:border-[#D4D0C7]'
                  }`}
                >
                  <div className="aspect-[4/3] bg-[#FAF9F6] relative overflow-hidden">
                    <img
                      src={design.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {isSelected && (
                      <div className="absolute top-2.5 end-2.5 w-6 h-6 rounded-full bg-[#C5A880] text-white flex items-center justify-center shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                    <div className="absolute bottom-2 start-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#121316]/80 text-[#FAF9F6] backdrop-blur-xs">
                        {style}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white">
                    <h3 className="text-xs font-bold text-[#121316] line-clamp-1">{title}</h3>
                    <p className="text-[11px] text-[#8E8B85] mt-0.5 truncate">
                      {isRtl ? design.creatorNameAr : design.creatorName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Option D: Upload / Reference */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-xl border border-[#E6E2DB] p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF4EB] border border-[#E5D2BA] text-[#916F3E] flex items-center justify-center mx-auto">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#121316]">
              {isRtl ? 'إرفاق صورة أو رسم لثوب ترغب بمحاكاته' : 'Upload Reference Photo or Sketch'}
            </h2>
            <p className="text-xs text-[#65625D] max-w-md mx-auto mt-1">
              {isRtl
                ? 'يمكنك رفع صورة لقلاب، كبك، أو ثوب قديم ترغب بأن يقوم الخياط بمطابقة تفاصيله بالكامل.'
                : 'Upload reference images of a collar cut, cuff style, or garment you want the tailor to replicate.'}
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#121316] hover:bg-[#24262E] text-white text-xs font-semibold cursor-pointer transition-colors">
            <Upload className="w-4 h-4 text-[#C5A880]" />
            <span>{isRtl ? 'اختيار ملف من جهازك' : 'Choose File'}</span>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleSimulateUpload}
              className="hidden"
            />
          </label>

          {uploadedFiles.length > 0 && (
            <div className="pt-4 border-t border-[#F2EFE9] space-y-2 text-start">
              <span className="text-xs font-semibold text-[#121316] block">
                {isRtl ? 'الملفات المرفقة كمرجع:' : 'Attached Reference Files:'}
              </span>
              <div className="space-y-1.5">
                {uploadedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB] text-xs text-[#121316]"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <ImageIcon className="w-4 h-4 text-[#C5A880] shrink-0" />
                      <span className="truncate">{file}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const next = uploadedFiles.filter((_, i) => i !== idx);
                        setUploadedFiles(next);
                        onSelectDesign(selectedDesignId, 'upload', notes, next);
                      }}
                      className="text-[#D32F2F] hover:underline text-[11px] cursor-pointer"
                    >
                      {isRtl ? 'حذف' : 'Remove'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Option E: Bespoke Custom Design */}
      {activeTab === 'custom' && (
        <div className="bg-white rounded-xl border border-[#E6E2DB] p-5 space-y-4">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF4EB] border border-[#E5D2BA] text-xs text-[#916F3E]">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">
                {isRtl ? 'طلب تفصيل حر مخصص (يتطلب تسعيرة المشغل)' : 'Bespoke Custom Cut (Atelier Quote)'}
              </span>
              <span className="text-[11px] text-[#65625D]">
                {isRtl
                  ? 'اكتب مواصفاتك الحرة هنا، وسيقوم كبير الخياطين بمراجعتها والتأكد من توافق القماش مع قصة الثوب المطلوبة.'
                  : 'Describe your custom cut and finishing below. The master cutter will review and confirm feasibility and final pricing.'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#121316] mb-1.5">
              {isRtl ? 'وصف التصميم والتفاصيل الحرة:' : 'Custom Design Specifications:'}
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder={
                isRtl
                  ? 'مثال: ياقة قلاب ملكي بارتفاع 3.5 سم، كبك دائري مقوى بحشوة فرنسية، سحاب مخفي مع أزرار خارجية تجميلية...'
                  : 'e.g., Royal 3.5cm stiff collar, double round French cuff, concealed zipper with outer decorative buttons...'
              }
              className="w-full text-xs p-3 rounded-lg border border-[#E6E2DB] focus:outline-hidden focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] bg-[#FAF9F6]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
