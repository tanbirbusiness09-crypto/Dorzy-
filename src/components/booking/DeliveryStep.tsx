import React, { useState } from 'react';
import {
  Store,
  Truck,
  MapPin,
  Clock,
  Calendar,
  Check,
  Building,
  Phone,
  User,
  Info,
} from 'lucide-react';
import { DeliveryMethodType, DeliveryAddress, TimeSlotOption } from '../../types/booking';
import { Shop } from '../../types';
import { mockSavedAddresses } from '../../data/mock/booking';
import { useLanguage } from '../../localization/LanguageContext';

export interface DeliveryStepProps {
  method?: DeliveryMethodType;
  address?: DeliveryAddress;
  preferredDate?: string;
  preferredTimeSlot?: TimeSlotOption;
  appointmentNotes?: string;
  shop: Shop;
  onUpdateDelivery: (
    method: DeliveryMethodType,
    address?: DeliveryAddress,
    date?: string,
    time?: TimeSlotOption,
    notes?: string
  ) => void;
}

export const DeliveryStep: React.FC<DeliveryStepProps> = ({
  method = 'pickup',
  address = mockSavedAddresses[0],
  preferredDate = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
  preferredTimeSlot = 'afternoon',
  appointmentNotes = '',
  shop,
  onUpdateDelivery,
}) => {
  const { t, isRtl } = useLanguage();
  const [currentAddress, setCurrentAddress] = useState<DeliveryAddress>(address);
  const [date, setDate] = useState(preferredDate);
  const [time, setTime] = useState<TimeSlotOption>(preferredTimeSlot);
  const [notes, setNotes] = useState(appointmentNotes);

  const shopName = isRtl ? shop.nameAr : shop.name;
  const city = isRtl ? shop.location.cityAr : shop.location.city;
  const district = isRtl ? shop.location.districtAr : shop.location.district;
  const street = isRtl ? shop.location.streetNameAr : shop.location.streetName;

  const handleMethodChange = (m: DeliveryMethodType) => {
    onUpdateDelivery(m, currentAddress, date, time, notes);
  };

  const handleAddressSelect = (saved: DeliveryAddress) => {
    setCurrentAddress(saved);
    onUpdateDelivery(method, saved, date, time, notes);
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    onUpdateDelivery(method, currentAddress, newDate, time, notes);
  };

  const handleTimeChange = (newTime: TimeSlotOption) => {
    setTime(newTime);
    onUpdateDelivery(method, currentAddress, date, newTime, notes);
  };

  const handleAddressField = (field: keyof DeliveryAddress, val: string) => {
    const updated = { ...currentAddress, [field]: val };
    setCurrentAddress(updated);
    onUpdateDelivery(method, updated, date, time, notes);
  };

  return (
    <div className="space-y-6 text-start">
      {/* 1. HEADER */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
          {t.booking.deliveryTitle}
        </h1>
        <p className="text-xs text-[#65625D] mt-0.5">
          {isRtl
            ? 'حدد ما إذا كنت تفضل استلام الثوب بنفسك من مقر المشغل، أو توصيله مباشرة إلى باب منزلك.'
            : 'Choose whether to collect your completed garment in person or request private courier delivery.'}
        </p>
      </div>

      {/* 2. PICKUP VS HOME DELIVERY TABS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Atelier Pickup */}
        <div
          onClick={() => handleMethodChange('pickup')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            method === 'pickup'
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
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#121316]">
                    {t.booking.shopPickup}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] font-bold">
                    {isRtl ? 'مجاناً' : 'Free'}
                  </span>
                </div>
                <p className="text-xs text-[#65625D] mt-0.5">
                  {isRtl ? 'استلام الثوب وتجربته فوراً داخل صالون البروفة' : 'Try on the thobe in the salon fitting room upon pickup'}
                </p>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                method === 'pickup'
                  ? 'border-[#C5A880] bg-[#C5A880] text-white'
                : 'border-[#D4D0C7] bg-white'
              }`}
            >
              {method === 'pickup' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>

          {/* Shop address detail */}
          {method === 'pickup' && (
            <div className="mt-3 pt-3 border-t border-[#F2EFE9] space-y-1.5 text-xs text-[#65625D]">
              <p className="font-semibold text-[#121316]">{shopName}</p>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{street}, {district}, {city}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{shop.operatingHours.openTime} – {shop.operatingHours.closeTime}</span>
              </p>
            </div>
          )}
        </div>

        {/* Home Delivery */}
        <div
          onClick={() => handleMethodChange('home_delivery')}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            method === 'home_delivery'
              ? 'border-[#C5A880] bg-[#FFFDF9] ring-2 ring-[#C5A880]/30 shadow-xs'
              : 'border-[#E6E2DB] bg-white hover:border-[#D4D0C7] hover:bg-[#FAF9F6]'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF4EB] border border-[#E5D2BA] flex items-center justify-center text-[#916F3E] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#121316]">
                    {t.booking.homeDelivery}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF4EB] text-[#916F3E] border border-[#E5D2BA] font-bold">
                    + 25 {t.common.sar}
                  </span>
                </div>
                <p className="text-xs text-[#65625D] mt-0.5">
                  {isRtl ? 'توصيل مغلّف بعناية إلى عنوانك في علبة خيّاط الفاخرة' : 'Carefully packaged and delivered to your doorstep'}
                </p>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                method === 'home_delivery'
                  ? 'border-[#C5A880] bg-[#C5A880] text-white'
                  : 'border-[#D4D0C7] bg-white'
              }`}
            >
              {method === 'home_delivery' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>
        </div>
      </div>

      {/* 3. HOME DELIVERY ADDRESS FORM */}
      {method === 'home_delivery' && (
        <div className="bg-white rounded-xl border border-[#E6E2DB] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#121316] uppercase tracking-wider">
              {t.booking.deliveryAddress}
            </h2>

            {/* Quick saved addresses */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#8E8B85] hidden sm:inline">{isRtl ? 'عناوين محفوظة:' : 'Saved:'}</span>
              {mockSavedAddresses.map((addr) => (
                <button
                  key={addr.id}
                  type="button"
                  onClick={() => handleAddressSelect(addr)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium border cursor-pointer ${
                    currentAddress.id === addr.id
                      ? 'bg-[#FAF4EB] border-[#C5A880] text-[#916F3E] font-bold'
                      : 'border-[#E6E2DB] hover:bg-[#FAF9F6] text-[#65625D]'
                  }`}
                >
                  {addr.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[#65625D] mb-1">{isRtl ? 'اسم المستلم:' : 'Recipient Name:'}</label>
              <input
                type="text"
                value={currentAddress.recipientName}
                onChange={(e) => handleAddressField('recipientName', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#E6E2DB] bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[#65625D] mb-1">{isRtl ? 'رقم الجوال للتوصيل:' : 'Phone Number:'}</label>
              <input
                type="text"
                value={currentAddress.phone}
                onChange={(e) => handleAddressField('phone', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#E6E2DB] bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[#65625D] mb-1">{isRtl ? 'المدينة والحي:' : 'City & District:'}</label>
              <input
                type="text"
                value={`${currentAddress.city} - ${currentAddress.area}`}
                onChange={(e) => handleAddressField('area', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#E6E2DB] bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[#65625D] mb-1">{isRtl ? 'الشارع والفيلا / الشقة:' : 'Street & Villa / Unit:'}</label>
              <input
                type="text"
                value={currentAddress.addressLine}
                onChange={(e) => handleAddressField('addressLine', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#E6E2DB] bg-white focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. PREFERRED DATE & TIME SLOT */}
      <div className="bg-white rounded-xl border border-[#E6E2DB] p-5 space-y-4">
        <div>
          <h2 className="text-xs font-bold text-[#121316] uppercase tracking-wider">
            {t.booking.preferredDate}
          </h2>
          <p className="text-[11px] text-[#8E8B85] mt-0.5">
            {isRtl
              ? 'حدد موعدك المفضل، وسيتم اعتماده نهائياً بالتنسيق مع المشغل.'
              : 'Specify your preferred fitting or pickup slot, subject to atelier confirmation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[#65625D] mb-1 font-medium">{t.booking.preferredDate}</label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#E6E2DB] bg-white focus:outline-hidden focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="block text-[#65625D] mb-1 font-medium">{t.booking.preferredTime}</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'morning', label: isRtl ? 'صباحاً' : 'Morning' },
                { id: 'afternoon', label: isRtl ? 'ظهراً' : 'Afternoon' },
                { id: 'evening', label: isRtl ? 'مساءً' : 'Evening' },
              ].map((slot) => {
                const isActive = time === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => handleTimeChange(slot.id as TimeSlotOption)}
                    className={`p-2 rounded-lg border text-center text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#C5A880] bg-[#FAF4EB] text-[#121316]'
                        : 'border-[#E6E2DB] hover:bg-[#FAF9F6] text-[#65625D]'
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
