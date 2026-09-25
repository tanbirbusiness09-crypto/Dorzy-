import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  CheckCircle2,
  Check,
  Package,
  Info,
  ShieldCheck,
  Sun,
  CloudSnow,
  Calendar,
} from 'lucide-react';
import { DetailedFabric } from '../../types';
import { mockFabrics } from '../../data/mock/fabrics';
import { useLanguage } from '../../localization/LanguageContext';

export interface FabricStepProps {
  selectedFabricId?: string;
  selectedColor?: string;
  customerProvidedFabric?: boolean;
  customerFabricDescription?: string;
  onSelectFabric: (fabricId?: string, color?: string, customerProvided?: boolean, desc?: string) => void;
}

export const FabricStep: React.FC<FabricStepProps> = ({
  selectedFabricId,
  selectedColor,
  customerProvidedFabric = false,
  customerFabricDescription = '',
  onSelectFabric,
}) => {
  const { t, isRtl } = useLanguage();
  const [byoDesc, setByoDesc] = useState(customerFabricDescription);

  const handleSelectFabricCard = (fabric: DetailedFabric) => {
    const defaultColor = fabric.availableColors[0]?.name || 'Pure White';
    onSelectFabric(fabric.id, defaultColor, false, byoDesc);
  };

  const handleSelectColorSwatch = (fabric: DetailedFabric, colorName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectFabric(fabric.id, colorName, false, byoDesc);
  };

  const handleSelectByo = () => {
    onSelectFabric(undefined, undefined, true, byoDesc);
  };

  const handleByoDescChange = (val: string) => {
    setByoDesc(val);
    onSelectFabric(undefined, undefined, true, val);
  };

  return (
    <div className="space-y-6 text-start">
      {/* 1. HEADER */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
          {t.booking.chooseFabric}
        </h1>
        <p className="text-xs text-[#65625D] mt-0.5">
          {isRtl
            ? 'اختر من باقة الأقمشة اليابانية والإقليمية الفاخرة المعتمدة لدى المشغل، أو أحضر قماشك الخاص.'
            : 'Select from certified Japanese, British, and Italian mills stocked by the atelier, or supply your own fabric.'}
        </p>
      </div>

      {/* 2. BRING YOUR OWN FABRIC OPTION (Prompt Section 13) */}
      <div
        onClick={handleSelectByo}
        className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
          customerProvidedFabric
            ? 'border-[#C5A880] bg-[#FFFDF9] ring-2 ring-[#C5A880]/30 shadow-xs'
            : 'border-[#E6E2DB] bg-white hover:border-[#D4D0C7] hover:bg-[#FAF9F6]'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF4EB] border border-[#E5D2BA] flex items-center justify-center text-[#916F3E] shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#121316]">
                  {t.booking.byoFabric}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] font-bold">
                  {isRtl ? 'بدون رسوم إضافية' : 'No Surcharge'}
                </span>
              </div>
              <p className="text-xs text-[#65625D] mt-0.5">
                {t.booking.byoFabricDesc}
              </p>
            </div>
          </div>

          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
              customerProvidedFabric
                ? 'border-[#C5A880] bg-[#C5A880] text-white'
                : 'border-[#D4D0C7] bg-white'
            }`}
          >
            {customerProvidedFabric && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </div>

        {customerProvidedFabric && (
          <div className="mt-4 pt-3 border-t border-[#F2EFE9] space-y-2">
            <label className="block text-[11px] font-semibold text-[#121316]">
              {isRtl ? 'وصف قماشك الخاص (نوعه، طاقته، لونه):' : 'Describe your fabric (type, length, color):'}
            </label>
            <input
              type="text"
              value={byoDesc}
              onChange={(e) => handleByoDescChange(e.target.value)}
              placeholder={
                isRtl
                  ? 'مثال: طاقة قطن سويسري أبيض مشتراة من الجديعي 3.5 متر...'
                  : 'e.g., White Swiss cotton roll, 3.5 meters length...'
              }
              className="w-full text-xs p-2.5 rounded-lg border border-[#E6E2DB] bg-white focus:outline-hidden focus:border-[#C5A880]"
            />
          </div>
        )}
      </div>

      {/* 3. ATELIER FABRIC COLLECTION */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider">
          {isRtl ? 'أقمشة المشغل المتاحة للتفصيل:' : 'Atelier Fabric Selections:'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {mockFabrics.map((fabric) => {
            const isSelected = !customerProvidedFabric && fabric.id === selectedFabricId;
            const name = isRtl ? fabric.nameAr : fabric.name;
            const origin = isRtl ? fabric.originAr : fabric.origin;
            const composition = isRtl ? fabric.compositionAr : fabric.composition;
            const season = isRtl ? fabric.seasonAr : fabric.season;
            const surcharge = fabric.standingSurchargeSar || 0;

            return (
              <div
                key={fabric.id}
                onClick={() => handleSelectFabricCard(fabric)}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#C5A880] bg-[#FFFDF9] ring-2 ring-[#C5A880]/30 shadow-xs'
                    : 'border-[#E6E2DB] bg-white hover:border-[#D4D0C7] hover:bg-[#FAF9F6]'
                }`}
              >
                <div>
                  {/* Top line with Origin & Selection indicator */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E6E2DB] text-[#8E8B85] uppercase font-semibold">
                        {origin}
                      </span>
                      {fabric.isPremium && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF4EB] text-[#916F3E] border border-[#E5D2BA] font-semibold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          {isRtl ? 'فاخر' : 'Premium'}
                        </span>
                      )}
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-[#C5A880] bg-[#C5A880] text-white'
                          : 'border-[#D4D0C7] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#121316] font-display">
                    {name}
                  </h3>
                  <p className="text-xs text-[#65625D] mt-0.5 line-clamp-1">{composition}</p>
                  <p className="text-[11px] text-[#8E8B85] mt-1 flex items-center gap-2">
                    <span>{fabric.weightGsm} gsm</span>
                    <span>·</span>
                    <span>{season}</span>
                  </p>
                </div>

                {/* Color swatches */}
                <div className="mt-4 pt-3 border-t border-[#F2EFE9] space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#8E8B85]">{t.booking.colorSwatch}:</span>
                    <span className="font-semibold text-[#121316]">
                      {isSelected ? selectedColor : fabric.availableColors[0]?.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {fabric.availableColors.map((color) => {
                      const isColorActive = isSelected && selectedColor === color.name;
                      return (
                        <button
                          key={color.name}
                          type="button"
                          onClick={(e) => handleSelectColorSwatch(fabric, color.name, e)}
                          title={color.name}
                          className={`w-6 h-6 rounded-full border transition-all cursor-pointer relative ${
                            isColorActive
                              ? 'ring-2 ring-[#C5A880] ring-offset-1 scale-110 shadow-xs'
                              : 'hover:scale-105'
                          }`}
                          style={{
                            backgroundColor: color.hex,
                            borderColor: color.hex.toLowerCase() === '#ffffff' ? '#D4D0C7' : color.hex,
                          }}
                        >
                          {isColorActive && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <Check
                                className={`w-3 h-3 ${
                                  color.hex.toLowerCase() === '#ffffff' || color.hex.toLowerCase().includes('f')
                                    ? 'text-[#121316]'
                                    : 'text-white'
                                }`}
                              />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Price Impact Indicator (Prompt Section 13) */}
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-[#8E8B85]">{isRtl ? 'أثر سعر القماش:' : 'Fabric cost:'}</span>
                    <span className="font-mono font-bold text-[#121316]">
                      {surcharge === 0 ? (
                        <span className="text-[#388E3C]">{t.booking.includedInBase}</span>
                      ) : (
                        `+ ${surcharge} ${t.common.sar}`
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
