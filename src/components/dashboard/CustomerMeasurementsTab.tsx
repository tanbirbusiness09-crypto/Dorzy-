import React, { useState } from 'react';
import {
  Ruler,
  Plus,
  Lock,
  Edit2,
  Trash2,
  QrCode,
  Check,
  Printer,
  X,
} from 'lucide-react';
import { SavedMeasurementProfile } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { Button } from '../ui/Button';

export interface CustomerMeasurementsTabProps {
  profiles: SavedMeasurementProfile[];
  onSaveProfile: (profile: SavedMeasurementProfile) => void;
  onDeleteProfile: (profileId: string) => void;
}

export const CustomerMeasurementsTab: React.FC<CustomerMeasurementsTabProps> = ({
  profiles,
  onSaveProfile,
  onDeleteProfile,
}) => {
  const { isRtl, t } = useLanguage();

  const [editingProfile, setEditingProfile] = useState<SavedMeasurementProfile | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [passportProfile, setPassportProfile] = useState<SavedMeasurementProfile | null>(null);

  const getMeasurementItems = (profile: SavedMeasurementProfile) => {
    return [
      { key: 'thobeLength', labelEn: 'Thobe Length', labelAr: 'طول الثوب', val: profile.thobeLength || 148 },
      { key: 'shoulder', labelEn: 'Shoulder', labelAr: 'الكتف', val: profile.shoulder || 46 },
      { key: 'chest', labelEn: 'Chest', labelAr: 'محيط الصدر', val: profile.chest || 108 },
      { key: 'waist', labelEn: 'Waist', labelAr: 'الخصر', val: profile.waist || 102 },
      { key: 'hip', labelEn: 'Hip', labelAr: 'الورك', val: profile.hip || 114 },
      { key: 'sleeve', labelEn: 'Sleeve', labelAr: 'طول الكم', val: profile.sleeve || 63 },
      { key: 'cuff', labelEn: 'Cuff', labelAr: 'الكبك', val: profile.cuff || 26 },
      { key: 'neck', labelEn: 'Neck', labelAr: 'محيط الرقبة', val: profile.neck || 41 },
    ];
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingProfile({
      id: `meas_profile_${Date.now()}`,
      name: isRtl ? 'ملف قياس جديد' : 'New Bespoke Profile',
      nameAr: 'ملف قياس جديد',
      tag: 'Bespoke',
      tagAr: 'تفصيل خاص',
      thobeLength: 148,
      shoulder: 46,
      chest: 108,
      waist: 102,
      hip: 114,
      sleeve: 63,
      cuff: 26,
      neck: 41,
      unit: 'cm',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      isDefault: false,
    });
  };

  const handleOpenEdit = (profile: SavedMeasurementProfile) => {
    setIsNew(false);
    setEditingProfile({ ...profile });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile) return;
    onSaveProfile({
      ...editingProfile,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
    setEditingProfile(null);
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
            {t.dashboard.savedProfilesTitle}
          </h2>
          <p className="text-xs text-[#8E8B85] mt-0.5">
            {isRtl
              ? 'مقاساتك الحرفية المعتمدة لقص وحياكة الثياب دون الحاجة لإعادة القياس'
              : 'Precision anatomy measurements calibrated for master cutters across partner ateliers'}
          </p>
        </div>

        <Button variant="gold" size="sm" onClick={handleOpenAdd} className="text-xs shrink-0 font-bold">
          <Plus className="w-3.5 h-3.5 me-1.5" />
          {t.dashboard.addMeasurementProfile}
        </Button>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((profile) => {
          const profileName = isRtl ? profile.nameAr || profile.name : profile.name;
          const isLocked = profile.isLockedForProduction;
          const items = getMeasurementItems(profile);

          return (
            <div
              key={profile.id}
              className="bg-white rounded-2xl border border-[#E6E2DB] p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-5 relative"
            >
              <div className="space-y-4">
                {/* Profile Top Bar */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-[#121316]">
                        {profileName}
                      </h3>
                      {profile.isDefault && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF4EB] text-[#916F3E] border border-[#E5D2BA] font-semibold">
                          {isRtl ? 'الافتراضي' : 'Default'}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#8E8B85]">
                      {isRtl ? 'آخر تحديث:' : 'Updated:'}{' '}
                      {new Date(profile.lastUpdated).toLocaleDateString(isRtl ? 'ar-SA' : 'en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {isLocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#916F3E] bg-[#FAF4EB] border border-[#E5D2BA] px-2.5 py-1 rounded-lg">
                      <Lock className="w-3 h-3" />
                      <span>{t.dashboard.profileLockedBadge}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2D6A4F] bg-[#EBF5ED] border border-[#B7E4C7] px-2 py-0.5 rounded-lg">
                      <Check className="w-3 h-3" />
                      <span>{t.dashboard.profileUnlockedBadge}</span>
                    </span>
                  )}
                </div>

                {isLocked && (
                  <p className="text-[11px] text-[#916F3E] bg-[#FAF4EB] p-2.5 rounded-xl border border-[#E5D2BA] leading-relaxed">
                    {t.dashboard.profileLockedNotice}
                  </p>
                )}

                {/* Measurements Grid */}
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {items.map((item) => (
                    <div
                      key={item.key}
                      className="p-2 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] text-center"
                    >
                      <span className="text-[10px] text-[#8E8B85] block truncate">
                        {isRtl ? item.labelAr : item.labelEn}
                      </span>
                      <span className="text-sm font-mono font-bold text-[#121316]">
                        {item.val} <span className="text-[10px] font-normal text-[#8E8B85]">{profile.unit}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#F2EFE9] gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPassportProfile(profile)}
                  className="text-xs"
                >
                  <QrCode className="w-3.5 h-3.5 me-1 text-[#916F3E]" />
                  {t.dashboard.viewPassport}
                </Button>

                <div className="flex items-center gap-1">
                  {!isLocked && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenEdit(profile)}
                        className="text-xs text-[#65625D]"
                      >
                        <Edit2 className="w-3.5 h-3.5 me-1" />
                        {isRtl ? 'تعديل' : 'Edit'}
                      </Button>
                      {profiles.length > 1 && (
                        <button
                          type="button"
                          onClick={() => onDeleteProfile(profile.id)}
                          className="p-1.5 text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit / Add Profile Modal */}
      {editingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 text-start my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE9]">
              <h3 className="text-base font-bold text-[#121316]">
                {isNew ? t.dashboard.addMeasurementProfile : t.dashboard.editMeasurementProfile}
              </h3>
              <button
                onClick={() => setEditingProfile(null)}
                className="text-[#8E8B85] hover:text-[#121316]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#121316] mb-1">
                    {isRtl ? 'اسم الملف (إنجليزي)' : 'Profile Name (EN)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProfile.name}
                    onChange={(e) =>
                      setEditingProfile({ ...editingProfile, name: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#121316] mb-1">
                    {isRtl ? 'اسم الملف (عربي)' : 'Profile Name (AR)'}
                  </label>
                  <input
                    type="text"
                    value={editingProfile.nameAr || ''}
                    onChange={(e) =>
                      setEditingProfile({ ...editingProfile, nameAr: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              {/* Unit Switcher */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB]">
                <span className="font-semibold text-[#121316]">
                  {isRtl ? 'وحدة القياس المعتمدة:' : 'Measurement Unit:'}
                </span>
                <div className="flex items-center gap-1">
                  {(['cm', 'in'] as const).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setEditingProfile({ ...editingProfile, unit })}
                      className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer ${
                        editingProfile.unit === unit
                          ? 'bg-[#121316] text-[#FAF9F6]'
                          : 'bg-white text-[#65625D] border border-[#E6E2DB]'
                      }`}
                    >
                      {unit.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Anatomy Inputs Grid */}
              <div className="space-y-2">
                <span className="font-bold text-[#121316] block">
                  {isRtl ? 'القياسات التشريحية للثوب:' : 'Sartorial Metrics:'}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div>
                    <label className="block text-[10px] text-[#8E8B85] uppercase mb-0.5 truncate">
                      {isRtl ? 'الطول' : 'Length'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={editingProfile.thobeLength || 148}
                      onChange={(e) =>
                        setEditingProfile({
                          ...editingProfile,
                          thobeLength: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 rounded-lg border border-[#E6E2DB] text-xs font-mono font-bold focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#8E8B85] uppercase mb-0.5 truncate">
                      {isRtl ? 'الكتف' : 'Shoulder'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={editingProfile.shoulder || 46}
                      onChange={(e) =>
                        setEditingProfile({
                          ...editingProfile,
                          shoulder: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 rounded-lg border border-[#E6E2DB] text-xs font-mono font-bold focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#8E8B85] uppercase mb-0.5 truncate">
                      {isRtl ? 'الصدر' : 'Chest'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={editingProfile.chest || 108}
                      onChange={(e) =>
                        setEditingProfile({
                          ...editingProfile,
                          chest: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 rounded-lg border border-[#E6E2DB] text-xs font-mono font-bold focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#8E8B85] uppercase mb-0.5 truncate">
                      {isRtl ? 'الخصر' : 'Waist'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={editingProfile.waist || 102}
                      onChange={(e) =>
                        setEditingProfile({
                          ...editingProfile,
                          waist: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 rounded-lg border border-[#E6E2DB] text-xs font-mono font-bold focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#8E8B85] uppercase mb-0.5 truncate">
                      {isRtl ? 'الورك' : 'Hip'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={editingProfile.hip || 114}
                      onChange={(e) =>
                        setEditingProfile({
                          ...editingProfile,
                          hip: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 rounded-lg border border-[#E6E2DB] text-xs font-mono font-bold focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#8E8B85] uppercase mb-0.5 truncate">
                      {isRtl ? 'الكم' : 'Sleeve'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={editingProfile.sleeve || 63}
                      onChange={(e) =>
                        setEditingProfile({
                          ...editingProfile,
                          sleeve: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 rounded-lg border border-[#E6E2DB] text-xs font-mono font-bold focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#8E8B85] uppercase mb-0.5 truncate">
                      {isRtl ? 'الكبك' : 'Cuff'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={editingProfile.cuff || 26}
                      onChange={(e) =>
                        setEditingProfile({
                          ...editingProfile,
                          cuff: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 rounded-lg border border-[#E6E2DB] text-xs font-mono font-bold focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#8E8B85] uppercase mb-0.5 truncate">
                      {isRtl ? 'الرقبة' : 'Neck'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={editingProfile.neck || 41}
                      onChange={(e) =>
                        setEditingProfile({
                          ...editingProfile,
                          neck: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 rounded-lg border border-[#E6E2DB] text-xs font-mono font-bold focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#F2EFE9]">
                <Button variant="outline" size="sm" type="button" onClick={() => setEditingProfile(null)}>
                  {t.common.cancel}
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  {isRtl ? 'حفظ المقاسات' : 'Save Profile'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sartorial Passport & QR Modal */}
      {passportProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 text-start relative overflow-hidden">
            {/* Top Pattern */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#C5A880] via-[#916F3E] to-[#C5A880]" />

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] font-bold text-[#916F3E] uppercase tracking-wider block">
                  KINGDOM OF SAUDI ARABIA · KHAYYAT
                </span>
                <h3 className="text-lg font-bold text-[#121316] font-display">
                  {isRtl ? 'وثيقة القياس الحرفية الرقمية' : 'Digital Sartorial Passport'}
                </h3>
              </div>
              <button
                onClick={() => setPassportProfile(null)}
                className="text-[#8E8B85] hover:text-[#121316]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E6E2DB] space-y-4 text-center">
              {/* QR Code graphic */}
              <div className="w-36 h-36 mx-auto bg-white p-3 rounded-2xl border border-[#E6E2DB] shadow-xs flex items-center justify-center">
                <QrCode className="w-28 h-28 text-[#121316]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-[#121316]">
                  {isRtl ? passportProfile.nameAr || passportProfile.name : passportProfile.name}
                </h4>
                <p className="text-[11px] text-[#8E8B85]">
                  {isRtl ? 'امسح الرمز ضوئياً في صالون الخياطة لمشاركة المقاسات المعتمدة' : 'Scan at any atelier salon counter to import certified measures'}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-xs text-start pt-2 border-t border-[#E6E2DB]">
                {getMeasurementItems(passportProfile).map((item) => (
                  <div key={item.key} className="p-1 text-center">
                    <span className="text-[9px] text-[#8E8B85] block truncate">
                      {isRtl ? item.labelAr : item.labelEn}
                    </span>
                    <span className="font-mono font-bold text-xs">{item.val} {passportProfile.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setPassportProfile(null)}>
                {t.common.close}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  window.print();
                }}
              >
                <Printer className="w-3.5 h-3.5 me-1.5" />
                {isRtl ? 'طباعة الوثيقة' : 'Print Passport'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
