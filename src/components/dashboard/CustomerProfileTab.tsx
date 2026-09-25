import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Calendar,
  Save,
  Bell,
  Ruler,
  Languages,
} from 'lucide-react';
import { CustomerProfileData, CustomerPreferences } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { useToast } from '../feedback/Toast';
import { Button } from '../ui/Button';

export interface CustomerProfileTabProps {
  profile: CustomerProfileData;
  onUpdateProfile: (updates: Partial<CustomerProfileData>) => void;
  onUpdatePreferences: (prefs: Partial<CustomerPreferences>) => void;
}

export const CustomerProfileTab: React.FC<CustomerProfileTabProps> = ({
  profile,
  onUpdateProfile,
  onUpdatePreferences,
}) => {
  const { isRtl, t, setLanguage } = useLanguage();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    fullNameAr: profile.fullNameAr,
    email: profile.email,
    phone: profile.phone,
    city: profile.city,
    cityAr: profile.cityAr,
  });

  const [prefsData, setPrefsData] = useState<CustomerPreferences>({ ...profile.preferences });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    onUpdatePreferences(prefsData);
    showToast(t.dashboard.preferencesSavedToast, 'success');
  };

  return (
    <div className="space-y-6 text-start max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
          {t.dashboard.profileOverview}
        </h2>
        <p className="text-xs text-[#8E8B85] mt-0.5">
          {isRtl
            ? 'إدارة معلومات الحساب والتفضيلات الحرفية لقص وتفصيل الثياب'
            : 'Manage your client profile, sartorial preferences, and tailoring notifications'}
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-[#E6E2DB] p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-[#F2EFE9]">
            <img
              src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
              alt={profile.fullName}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#E6E2DB]"
            />
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-[#121316]">
                {isRtl ? profile.fullNameAr || profile.fullName : profile.fullName}
              </h3>
              <p className="text-xs text-[#8E8B85]">{profile.email}</p>
              <span className="text-[11px] text-[#916F3E] font-medium block">
                {isRtl ? 'عضو مميز منذ:' : 'Member since:'} {profile.memberSince}
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#121316] mb-1">
                {isRtl ? 'الاسم الكامل (إنجليزي)' : 'Full Name (English)'}
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#121316] mb-1">
                {isRtl ? 'الاسم الكامل (عربي)' : 'Full Name (Arabic)'}
              </label>
              <input
                type="text"
                required
                value={formData.fullNameAr}
                onChange={(e) => setFormData({ ...formData, fullNameAr: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#121316] mb-1">
                {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#121316] mb-1">
                {isRtl ? 'رقم الجوال' : 'Phone Number'}
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs font-mono focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#121316] mb-1">
                {isRtl ? 'المدينة الحالية' : 'City'}
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>
        </div>

        {/* Sartorial Preferences Card */}
        <div className="bg-white rounded-2xl border border-[#E6E2DB] p-5 sm:p-6 shadow-xs space-y-5">
          <h3 className="text-sm font-bold text-[#121316] font-display pb-3 border-b border-[#F2EFE9]">
            {isRtl ? 'التفضيلات الحرفية ونمط القصة' : 'Sartorial Fit & Craft Preferences'}
          </h3>

          <div className="space-y-4 text-xs">
            {/* Preferred Fit */}
            <div>
              <label className="block font-bold text-[#121316] mb-1.5">
                {isRtl ? 'قصة القوام المعتادة (الفِت)' : 'Preferred Garment Fit'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'slim_tailored', en: 'Slim Tailored Cut', ar: 'قصة مخصرة محددة (سليم)' },
                  { id: 'regular_comfort', en: 'Regular Comfort Cut', ar: 'قصة كلاسيكية مريحة' },
                  { id: 'traditional_generous', en: 'Traditional Generous Cut', ar: 'قصة تقليدية فضفاضة واسعة' },
                ].map((fit) => (
                  <button
                    key={fit.id}
                    type="button"
                    onClick={() =>
                      setPrefsData({ ...prefsData, preferredFit: fit.id as any })
                    }
                    className={`p-3 rounded-xl border text-center font-medium transition-colors cursor-pointer ${
                      prefsData.preferredFit === fit.id
                        ? 'border-[#916F3E] bg-[#FAF4EB] text-[#916F3E] font-bold'
                        : 'border-[#E6E2DB] text-[#65625D] hover:bg-[#FAF9F6]'
                    }`}
                  >
                    {isRtl ? fit.ar : fit.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Measurement Unit */}
            <div>
              <label className="block font-bold text-[#121316] mb-1.5">
                {isRtl ? 'وحدة المقاسات المفضلة' : 'Default Measurement Unit'}
              </label>
              <div className="inline-flex items-center gap-2 p-1 bg-[#FAF9F6] border border-[#E6E2DB] rounded-xl">
                {(['cm', 'in'] as const).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => setPrefsData({ ...prefsData, measurementUnit: unit })}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      prefsData.measurementUnit === unit
                        ? 'bg-[#121316] text-[#FAF9F6] shadow-xs'
                        : 'text-[#65625D]'
                    }`}
                  >
                    {unit.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Channels */}
            <div className="pt-3 border-t border-[#F2EFE9] space-y-2">
              <span className="font-bold text-[#121316] block">
                {isRtl ? 'قنوات استلام تنبيهات الثياب:' : 'Alert Notification Channels:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  { key: 'whatsapp', label: isRtl ? 'رسائل واتساب للمواعيد والتجهيز' : 'WhatsApp Instant Alerts' },
                  { key: 'sms', label: isRtl ? 'رسائل نصية قصيرة SMS' : 'SMS Order Notifications' },
                  { key: 'email', label: isRtl ? 'البريد الإلكتروني للوثائق والإيصالات' : 'Email Receipts & Statements' },
                  { key: 'orderUpdates', label: isRtl ? 'تنبيهات مراحل الحياكة والقص' : 'Tailoring Progress Milestones' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(prefsData.notificationPreferences as any)[item.key]}
                      onChange={(e) =>
                        setPrefsData({
                          ...prefsData,
                          notificationPreferences: {
                            ...prefsData.notificationPreferences,
                            [item.key]: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 text-[#916F3E] rounded border-[#E6E2DB]"
                    />
                    <span className="text-[#65625D]">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button variant="primary" size="md" type="submit" className="text-xs font-bold px-6">
            <Save className="w-4 h-4 me-1.5" />
            {t.dashboard.savePreferences}
          </Button>
        </div>
      </form>
    </div>
  );
};
