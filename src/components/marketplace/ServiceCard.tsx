import React from 'react';
import { Clock, Layers, Home, CheckCircle2 } from 'lucide-react';
import { TailoringService } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { PriceDisplay } from '../ui/PriceDisplay';
import { Button } from '../ui/Button';

export interface ServiceCardProps {
  service: TailoringService;
  onSelectService?: (service: TailoringService) => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelectService,
  className = '',
}) => {
  const { t, isRtl } = useLanguage();

  const title = isRtl ? service.titleAr : service.title;
  const description = isRtl ? service.descriptionAr : service.description;

  return (
    <div
      className={`group bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#C5A880]/60 hover:shadow-md text-start ${className}`}
    >
      <div>
        {/* Title and Top Pill-free Badges */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-bold text-[#121316] tracking-tight group-hover:text-[#916F3E] transition-colors">
            {title}
          </h3>
          <PriceDisplay amount={service.startingPriceSar} prefix={t.common.startingFrom} size="md" />
        </div>

        {/* Description */}
        <p className="text-xs text-[#65625D] leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-[#F2EFE9] mb-4">
          <div className="flex items-center gap-1.5 text-[#24262E]">
            <Clock className="w-3.5 h-3.5 text-[#916F3E] shrink-0" />
            <span className="tabular-nums font-medium">{service.estimatedDays}</span>
            <span className="text-[#8E8B85]">{t.service.days}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#24262E]">
            <Layers className="w-3.5 h-3.5 text-[#916F3E] shrink-0" />
            <span className="tabular-nums font-medium">{service.availableFabricsCount}</span>
            <span className="text-[#8E8B85]">{t.service.fabricOptions}</span>
          </div>
        </div>

        {/* Features list */}
        <div className="space-y-1.5 text-xs text-[#65625D] mb-4">
          {service.includesHomeMeasurement && (
            <div className="flex items-center gap-1.5 text-[#1E5638] font-medium">
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span>{t.common.homeService}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#916F3E] shrink-0" />
            <span>{t.service.includesFitting}</span>
          </div>
        </div>
      </div>

      {/* Action button */}
      <div>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={() => onSelectService && onSelectService(service)}
        >
          {t.common.bookMeasurement}
        </Button>
      </div>
    </div>
  );
};
