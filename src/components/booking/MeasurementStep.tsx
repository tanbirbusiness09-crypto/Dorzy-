import React, { useState } from 'react';
import {
  Ruler,
  Store,
  Home,
  Bookmark,
  Edit3,
  Clock,
  Check,
  ShieldCheck,
  Info,
  Calendar,
  Phone,
  MapPin,
  Building,
} from 'lucide-react';
import {
  MeasurementMethodType,
  SavedMeasurementProfile,
  BookingConfig,
} from '../../types/booking';
import { mockSavedMeasurements, mockSavedAddresses } from '../../data/mock/booking';
import { useLanguage } from '../../localization/LanguageContext';

export interface MeasurementStepProps {
  method?: MeasurementMethodType;
  selectedProfileId?: string;
  measurements?: Record<string, number>;
  unit?: 'cm' | 'in';
  config: BookingConfig;
  onSelectMethod: (
    method: MeasurementMethodType,
    profileId?: string,
    values?: Record<string, number>,
    unit?: 'cm' | 'in'
  ) => void;
}

export const MeasurementStep: React.FC<MeasurementStepProps> = ({
  method = 'saved',
  selectedProfileId = mockSavedMeasurements[0]?.id,
  measurements = {},
  unit = 'cm',
  config,
  onSelectMethod,
}) => {
  const { t, isRtl } = useLanguage();
  const [activeUnit, setActiveUnit] = useState<'cm' | 'in'>(unit);
  const [manualValues, setManualValues] = useState<Record<string, number>>({
    thobeLength: measurements.thobeLength || 148,
    shoulder: measurements.shoulder || 46,
    chest: measurements.chest || 108,
    waist: measurements.waist || 102,
    hip: measurements.hip || 114,
    sleeve: measurements.sleeve || 63,
    cuff: measurements.cuff || 26,
    neck: measurements.neck || 41,
    armhole: measurements.armhole || 48,
    trouserLength: measurements.trouserLength || 102,
    ...measurements,
  });

  const [homeLocation, setHomeLocation] = useState({
    city: 'Riyadh',
    area: 'Al-Malqa',
    addressLine: 'Prince Turki Ibn Abdulaziz Al Awwal Rd',
    building: 'Villa 42',
    phone: '+966 50 123 4567',
    date: '2026-10-04',
    timeSlot: 'afternoon',
  });

  const handleMethodChange = (newMethod: MeasurementMethodType) => {
    onSelectMethod(newMethod, selectedProfileId, manualValues, activeUnit);
  };

  const handleProfileSelect = (profileId: string) => {
    const profile = mockSavedMeasurements.find((p) => p.id === profileId);
    if (profile) {
      onSelectMethod('saved', profileId, {
        thobeLength: profile.thobeLength,
        shoulder: profile.shoulder,
        chest: profile.chest,
        waist: profile.waist,
        hip: profile.hip,
        sleeve: profile.sleeve,
        cuff: profile.cuff,
        neck: profile.neck,
      }, profile.unit);
    }
  };

  const handleUnitToggle = (newUnit: 'cm' | 'in') => {
    setActiveUnit(newUnit);
    onSelectMethod(method, selectedProfileId, manualValues, newUnit);
  };

  const handleManualValueChange = (field: string, val: string) => {
    const num = parseFloat(val) || 0;
    const next = { ...manualValues, [field]: num };
    setManualValues(next);
    onSelectMethod('manual', selectedProfileId, next, activeUnit);
  };

  const measurementFields = [
    { key: 'thobeLength', label: t.booking.thobeLength, placeholder: activeUnit === 'cm' ? '148' : '58' },
    { key: 'shoulder', label: t.booking.shoulder, placeholder: activeUnit === 'cm' ? '46' : '18' },
    { key: 'chest', label: t.booking.chest, placeholder: activeUnit === 'cm' ? '108' : '42.5' },
    { key: 'waist', label: t.booking.waist, placeholder: activeUnit === 'cm' ? '102' : '40' },
    { key: 'hip', label: t.booking.hip, placeholder: activeUnit === 'cm' ? '114' : '45' },
    { key: 'sleeve', label: t.booking.sleeve, placeholder: activeUnit === 'cm' ? '63' : '24.8' },
    { key: 'cuff', label: t.booking.cuff, placeholder: activeUnit === 'cm' ? '26' : '10.2' },
    { key: 'neck', label: t.booking.neck, placeholder: activeUnit === 'cm' ? '41' : '16' },
    { key: 'armhole', label: t.booking.armhole, placeholder: activeUnit === 'cm' ? '48' : '19' },
    { key: 'trouserLength', label: t.booking.trouserLength, placeholder: activeUnit === 'cm' ? '102' : '40' },
  ];

  return (
    <div className="space-y-6 text-start">
      {/* 1. HEADER */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
          {t.booking.chooseMeasurement}
        </h1>
        <p className="text-xs text-[#65625D] mt-0.5">
          {isRtl
            ? 'دقة القياس هي جوهر الأناقة والوقفة المتقنة. اختر الطريقة الأنسب لك.'
            : 'Sartorial precision is the bedrock of a flawless drape. Select your measurement preference.'}
        </p>
      </div>

      {/* 2. FIVE MEASUREMENT OPTIONS */}
      <div className="grid grid-cols-1 gap-3">
        {/* Option 1: Saved Profile */}
        <div
          onClick={() => handleMethodChange('saved')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            method === 'saved'
              ? 'border-[#C5A880] bg-[#FFFDF9] ring-2 ring-[#C5A880]/30 shadow-xs'
              : 'border-[#E6E2DB] bg-white hover:border-[#D4D0C7] hover:bg-[#FAF9F6]'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF4EB] border border-[#E5D2BA] flex items-center justify-center text-[#916F3E] shrink-0">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#121316]">
                  {t.booking.savedMeasurements}
                </h3>
                <p className="text-xs text-[#65625D] mt-0.5">
                  {t.booking.savedMeasurementsDesc}
                </p>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                method === 'saved'
                  ? 'border-[#C5A880] bg-[#C5A880] text-white'
                  : 'border-[#D4D0C7] bg-white'
              }`}
            >
              {method === 'saved' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          {/* Saved Profiles Sub-Selector */}
          {method === 'saved' && (
            <div className="mt-4 pt-3 border-t border-[#F2EFE9] space-y-2.5">
              <label className="block text-[11px] font-bold text-[#8E8B85] uppercase tracking-wider">
                {isRtl ? 'اختر ملف المقاسات المحفوظ:' : 'Select Saved Profile:'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {mockSavedMeasurements.map((profile) => {
                  const isProfileActive = selectedProfileId === profile.id;
                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProfileSelect(profile.id);
                      }}
                      className={`p-3 rounded-lg border text-start transition-all cursor-pointer ${
                        isProfileActive
                          ? 'border-[#C5A880] bg-[#FAF4EB] ring-1 ring-[#C5A880]'
                          : 'border-[#E6E2DB] bg-white hover:bg-[#FAF9F6]'
                      }`}
                    >
                      <span className="block text-xs font-bold text-[#121316]">
                        {isRtl ? profile.nameAr : profile.name}
                      </span>
                      <span className="block text-[10px] text-[#916F3E] font-medium mt-0.5">
                        {isRtl ? profile.tagAr : profile.tag}
                      </span>
                      <span className="block text-[10px] text-[#8E8B85] mt-1 font-mono">
                        {isRtl ? 'طول' : 'Length'}: {profile.thobeLength} {profile.unit} · {isRtl ? 'صدر' : 'Chest'}: {profile.chest} {profile.unit}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Option 2: Home Measurement Specialist (If supported) */}
        {config.supportsHomeMeasurement && (
          <div
            onClick={() => handleMethodChange('home')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              method === 'home'
                ? 'border-[#C5A880] bg-[#FFFDF9] ring-2 ring-[#C5A880]/30 shadow-xs'
                : 'border-[#E6E2DB] bg-white hover:border-[#D4D0C7] hover:bg-[#FAF9F6]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF4EB] border border-[#E5D2BA] flex items-center justify-center text-[#916F3E] shrink-0">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#121316]">
                      {t.booking.homeMeasurement}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF4EB] text-[#916F3E] border border-[#E5D2BA] font-semibold">
                      {isRtl ? 'خدمة VIP خاصة' : 'VIP Service'}
                    </span>
                  </div>
                  <p className="text-xs text-[#65625D] mt-0.5">
                    {t.booking.homeMeasurementDesc}
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  method === 'home'
                    ? 'border-[#C5A880] bg-[#C5A880] text-white'
                    : 'border-[#D4D0C7] bg-white'
                }`}
              >
                {method === 'home' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            {/* Home measurement details */}
            {method === 'home' && (
              <div className="mt-4 pt-3 border-t border-[#F2EFE9] space-y-3">
                <p className="text-xs text-[#121316] font-semibold">
                  {isRtl ? 'تفاصيل موعد زيارة أخصائي القياس:' : 'Measurement Visit Details:'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#65625D] mb-1">{isRtl ? 'المدينة والحي:' : 'City & District:'}</label>
                    <input
                      type="text"
                      value={`${homeLocation.city} - ${homeLocation.area}`}
                      onChange={(e) => setHomeLocation({ ...homeLocation, area: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E6E2DB] bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[#65625D] mb-1">{isRtl ? 'الشارع ورقم الفيلا / العمارة:' : 'Street & Villa / Building:'}</label>
                    <input
                      type="text"
                      value={homeLocation.addressLine}
                      onChange={(e) => setHomeLocation({ ...homeLocation, addressLine: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E6E2DB] bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[#65625D] mb-1">{isRtl ? 'رقم جوال التواصل للتنسيق:' : 'Contact Phone for Scheduling:'}</label>
                    <input
                      type="text"
                      value={homeLocation.phone}
                      onChange={(e) => setHomeLocation({ ...homeLocation, phone: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E6E2DB] bg-white focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[#65625D] mb-1">{isRtl ? 'تاريخ الزيارة المفضل:' : 'Preferred Visit Date:'}</label>
                    <input
                      type="date"
                      value={homeLocation.date}
                      onChange={(e) => setHomeLocation({ ...homeLocation, date: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#E6E2DB] bg-white focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Option 3: Measure at Atelier / Shop Appointment */}
        <div
          onClick={() => handleMethodChange('shop')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            method === 'shop'
              ? 'border-[#C5A880] bg-[#FFFDF9] ring-2 ring-[#C5A880]/30 shadow-xs'
              : 'border-[#E6E2DB] bg-white hover:border-[#D4D0C7] hover:bg-[#FAF9F6]'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF4EB] border border-[#E5D2BA] flex items-center justify-center text-[#916F3E] shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#121316]">
                  {t.booking.measureAtShop}
                </h3>
                <p className="text-xs text-[#65625D] mt-0.5">
                  {t.booking.measureAtShopDesc}
                </p>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                method === 'shop'
                  ? 'border-[#C5A880] bg-[#C5A880] text-white'
                  : 'border-[#D4D0C7] bg-white'
              }`}
            >
              {method === 'shop' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>
        </div>

        {/* Option 4: Manual Measurement Entry */}
        <div
          onClick={() => handleMethodChange('manual')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            method === 'manual'
              ? 'border-[#C5A880] bg-[#FFFDF9] ring-2 ring-[#C5A880]/30 shadow-xs'
              : 'border-[#E6E2DB] bg-white hover:border-[#D4D0C7] hover:bg-[#FAF9F6]'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF4EB] border border-[#E5D2BA] flex items-center justify-center text-[#916F3E] shrink-0">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#121316]">
                  {t.booking.manualMeasurements}
                </h3>
                <p className="text-xs text-[#65625D] mt-0.5">
                  {t.booking.manualMeasurementsDesc}
                </p>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                method === 'manual'
                  ? 'border-[#C5A880] bg-[#C5A880] text-white'
                  : 'border-[#D4D0C7] bg-white'
              }`}
            >
              {method === 'manual' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          {/* Manual Input Form */}
          {method === 'manual' && (
            <div className="mt-4 pt-3 border-t border-[#F2EFE9] space-y-3">
              {/* Unit Switcher (Prompt Section 18: Centimeters / Inches, clearly displayed) */}
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-[#121316]">
                  {isRtl ? 'وحدة القياس المعتمدة:' : 'Measurement Unit:'}
                </span>

                <div className="flex items-center p-0.5 rounded-lg bg-[#F5F3EF] border border-[#E6E2DB]">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnitToggle('cm');
                    }}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      activeUnit === 'cm'
                        ? 'bg-white text-[#121316] shadow-xs'
                        : 'text-[#65625D] hover:text-[#121316]'
                    }`}
                  >
                    {t.booking.cm}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnitToggle('in');
                    }}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      activeUnit === 'in'
                        ? 'bg-white text-[#121316] shadow-xs'
                        : 'text-[#65625D] hover:text-[#121316]'
                    }`}
                  >
                    {t.booking.inches}
                  </button>
                </div>
              </div>

              {/* Grid of measurement inputs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {measurementFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-[#65625D] mb-1 font-medium truncate">
                      {field.label} ({activeUnit})
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={manualValues[field.key] || ''}
                      onChange={(e) => handleManualValueChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full p-2.5 rounded-lg border border-[#E6E2DB] bg-white font-mono text-[#121316] focus:outline-hidden focus:border-[#C5A880]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Option 5: Provide Later */}
        <div
          onClick={() => handleMethodChange('later')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            method === 'later'
              ? 'border-[#C5A880] bg-[#FFFDF9] ring-2 ring-[#C5A880]/30 shadow-xs'
              : 'border-[#E6E2DB] bg-white hover:border-[#D4D0C7] hover:bg-[#FAF9F6]'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF4EB] border border-[#E5D2BA] flex items-center justify-center text-[#916F3E] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#121316]">
                  {t.booking.provideLater}
                </h3>
                <p className="text-xs text-[#65625D] mt-0.5">
                  {t.booking.provideLaterDesc}
                </p>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                method === 'later'
                  ? 'border-[#C5A880] bg-[#C5A880] text-white'
                  : 'border-[#D4D0C7] bg-white'
              }`}
            >
              {method === 'later' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>
        </div>
      </div>

      {/* 3. MEASUREMENT PRIVACY NOTICE (Prompt Section 21) */}
      <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] flex items-center gap-2.5 text-xs text-[#65625D]">
        <ShieldCheck className="w-4 h-4 text-[#916F3E] shrink-0" />
        <span>{t.booking.measurementPrivacyNotice}</span>
      </div>
    </div>
  );
};
