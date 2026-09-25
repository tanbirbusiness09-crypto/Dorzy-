import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Home, CheckCircle2, Scissors } from 'lucide-react';
import { useLanguage } from '../../localization/LanguageContext';
import { useToast } from '../feedback/Toast';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

import { Shop } from '../../types';

export interface HomeMeasurementDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  shopName?: string;
  tailorName?: string;
  shop?: Shop | null;
  preselectedService?: string;
}

export const HomeMeasurementDrawer: React.FC<HomeMeasurementDrawerProps> = ({
  isOpen,
  onClose,
  shopName: propShopName,
  tailorName,
  shop,
  preselectedService,
}) => {
  const { isRtl } = useLanguage();
  const { showToast } = useToast();

  const shopName = shop ? (isRtl ? shop.nameAr : shop.name) : (propShopName || 'Al-Mamlaka Royal Atelier');

  const [step, setStep] = useState<'details' | 'confirmed'>('details');
  const [date, setDate] = useState('2026-09-28');
  const [timeSlot, setTimeSlot] = useState('04:30 PM');
  const [district, setDistrict] = useState('Al-Olaya');
  const [garmentType, setGarmentType] = useState('saudi_thobe');
  const [fabricPreference, setFabricPreference] = useState('toyobo');
  const [clientName, setClientName] = useState('Fahad Al-Otaibi');
  const [clientPhone, setClientPhone] = useState('050 123 4567');

  const timeSlots = [
    '10:00 AM - 12:00 PM',
    '02:00 PM - 04:00 PM',
    '04:30 PM - 06:30 PM',
    '07:30 PM - 09:30 PM',
  ];

  const handleConfirm = () => {
    setStep('confirmed');
    showToast({
      type: 'success',
      title: isRtl ? 'تم تأكيد موعد القياس المنزلي' : 'Appointment Confirmed',
      description: isRtl
        ? `سيصل الخيّاط لمنزلك في حي ${district} بتاريخ ${date}`
        : `Master cutter scheduled for ${district} on ${date}`,
    });
  };

  const handleReset = () => {
    setStep('details');
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleReset}
      title={isRtl ? 'حجز خدمة القياس المنزلي VIP' : 'Book VIP Home Measurement'}
    >
      {step === 'details' ? (
        <div className="space-y-5 text-start">
          {/* Shop / Tailor Attribution Banner */}
          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E6E2DB] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F5F3EF] border border-[#E6E2DB] flex items-center justify-center text-[#916F3E] shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-[#8E8B85]">
                {isRtl ? 'المشغل المعتمد المختار' : 'Selected Tailoring Salon'}
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#121316] truncate">{shopName}</p>
              {tailorName && (
                <p className="text-[11px] text-[#916F3E] truncate">
                  {isRtl ? `الخيّاط المقترح: ${tailorName}` : `Tailor: ${tailorName}`}
                </p>
              )}
            </div>
          </div>

          {/* Garment Choice */}
          <Select
            label={isRtl ? 'نوع الملبوسات المطلوبة' : 'Garment Style'}
            value={garmentType}
            onChange={(e) => setGarmentType(e.target.value)}
            options={[
              { value: 'saudi_thobe', label: isRtl ? 'ثوب سعودي ملكي' : 'Royal Saudi Thobe' },
              { value: 'kuwaiti', label: isRtl ? 'ثوب كويتي صيفي' : 'Kuwaiti Summer Thobe' },
              { value: 'dagla', label: isRtl ? 'دقلة شتوية من الصوف' : 'Winter Cashmere Dagla' },
              { value: 'bisht', label: isRtl ? 'بشت مناسبات ملكي' : 'Ceremonial Royal Bisht' },
            ]}
          />

          {/* Preferred Fabric Samples to bring */}
          <Select
            label={isRtl ? 'أقمشة ترغب بإحضار عينات منها' : 'Fabric Swatches to Bring'}
            value={fabricPreference}
            onChange={(e) => setFabricPreference(e.target.value)}
            options={[
              { value: 'toyobo', label: isRtl ? 'أقمشة تويوبو اليابانية (Toyobo Class A)' : 'Japanese Toyobo Cotton' },
              { value: 'shikibo', label: isRtl ? 'أقمشة شكيبو اليابانية الباردة (Shikibo)' : 'Japanese Shikibo Fine' },
              { value: 'wool', label: isRtl ? 'صوف وكشمير إنجليزي (Huddersfield 400g)' : 'British Wool & Cashmere' },
            ]}
          />

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-bold text-[#121316] mb-1.5">
              {isRtl ? 'تاريخ الزيارة' : 'Visit Date'}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#E6E2DB] rounded-lg py-2.5 px-3 text-xs text-[#121316] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          {/* Time Slot Selector */}
          <div>
            <label className="block text-xs font-bold text-[#121316] mb-2">
              {isRtl ? 'الفترة الزمنية المناسبة' : 'Preferred Time Slot'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  className={`p-2.5 rounded-lg border text-center text-xs transition-colors cursor-pointer ${
                    timeSlot === slot
                      ? 'bg-[#121316] text-[#FAF9F6] border-[#121316] font-semibold'
                      : 'bg-[#FFFFFF] text-[#65625D] border-[#E6E2DB] hover:bg-[#F5F3EF]'
                  }`}
                >
                  <span className="tabular-nums block">{slot}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-3 pt-3 border-t border-[#F2EFE9]">
            <Input
              label={isRtl ? 'اسم صاحب الطلب' : 'Your Full Name'}
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <Input
              label={isRtl ? 'رقم الجوال لتأكيد الموعد' : 'Mobile Number'}
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
            />
            <Input
              label={isRtl ? 'الحي والشارع في الرياض' : 'District & Street in Riyadh'}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#E6E2DB] flex gap-3">
            <Button variant="outline" size="md" fullWidth onClick={onClose}>
              {isRtl ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button variant="gold" size="md" fullWidth onClick={handleConfirm}>
              {isRtl ? 'تأكيد حجز الموعد' : 'Confirm Appointment'}
            </Button>
          </div>
        </div>
      ) : (
        /* Confirmed State */
        <div className="space-y-6 text-center py-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#F2F7F4] border border-[#CDE3D5] flex items-center justify-center text-[#1E5638]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#121316]">
              {isRtl ? 'تم تأكيد موعد القياس المنزلي بنجاح' : 'Home Measurement Confirmed!'}
            </h3>
            <p className="text-xs text-[#65625D] leading-relaxed max-w-sm mx-auto">
              {isRtl
                ? `سيقوم معلّم التفصيل من مشغل ${shopName} بزيارتك يوم ${date} في الفترة (${timeSlot}) ومعه حقيبة عينات الأقمشة وأدوات القياس الدقيقة.`
                : `A master tailor from ${shopName} will arrive on ${date} during (${timeSlot}) with fabric swatches and measurement tools.`}
            </p>
          </div>

          <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E6E2DB] text-xs text-start space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#8E8B85]">{isRtl ? 'الخدمة:' : 'Service:'}</span>
              <span className="font-semibold text-[#121316]">VIP Home Measurement</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8E8B85]">{isRtl ? 'الحي:' : 'District:'}</span>
              <span className="font-semibold text-[#121316]">{district}, Riyadh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8E8B85]">{isRtl ? 'رسوم الزيارة:' : 'Home Visit Fee:'}</span>
              <span className="font-semibold text-[#1E5638]">
                {isRtl ? 'مجاني عند اعتماد التفصيل' : 'Free with tailoring order'}
              </span>
            </div>
          </div>

          <Button variant="primary" size="md" fullWidth onClick={handleReset}>
            {isRtl ? 'إغلاق والعودة للسوق' : 'Done & Return to Marketplace'}
          </Button>
        </div>
      )}
    </Drawer>
  );
};
