import React, { useState } from 'react';
import { Sparkles, ChevronDown, Check, Zap } from 'lucide-react';
import { mockBookingScenarios, MockScenario } from '../../data/mock/booking';
import { useLanguage } from '../../localization/LanguageContext';

export interface ScenarioQuickSwitcherProps {
  onSelectScenario: (scenarioId: string) => void;
}

export const ScenarioQuickSwitcher: React.FC<ScenarioQuickSwitcherProps> = ({
  onSelectScenario,
}) => {
  const { t, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);

  const handleSelect = (scenario: MockScenario) => {
    setActiveScenarioId(scenario.id);
    onSelectScenario(scenario.id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-start select-none">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF4EB] border border-[#E5D2BA] text-[#916F3E] text-xs font-semibold hover:bg-[#F5ECE0] transition-colors cursor-pointer"
      >
        <Zap className="w-3.5 h-3.5 fill-current" />
        <span>{t.booking.scenariosTitle}</span>
        <ChevronDown className="w-3 h-3 ms-0.5" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 end-0 w-72 sm:w-80 bg-white rounded-xl border border-[#E6E2DB] shadow-lg p-2 z-50 animate-in fade-in duration-150">
          <div className="px-2 py-1.5 border-b border-[#F2EFE9] mb-1">
            <span className="text-[11px] font-bold text-[#8E8B85] uppercase tracking-wider">
              {t.booking.scenarioQuickSelect}
            </span>
          </div>

          <div className="space-y-1">
            {mockBookingScenarios.map((sc) => {
              const isSelected = activeScenarioId === sc.id;
              const name = isRtl ? sc.nameAr : sc.name;
              const badge = isRtl ? sc.badgeAr : sc.badge;
              const desc = isRtl ? sc.descriptionAr : sc.description;

              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => handleSelect(sc)}
                  className={`w-full p-2.5 rounded-lg text-start transition-colors cursor-pointer flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-[#FAF4EB] border border-[#C5A880]'
                      : 'hover:bg-[#FAF9F6] border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#121316] line-clamp-1">{name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-[#E6E2DB] text-[#916F3E] font-medium shrink-0">
                      {badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#65625D] line-clamp-2 leading-relaxed">
                    {desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
