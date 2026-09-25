import React, { useState } from 'react';
import {
  MapPin,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Home,
  Briefcase,
  X,
} from 'lucide-react';
import { DeliveryAddress } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { Button } from '../ui/Button';

export interface CustomerAddressesTabProps {
  addresses: DeliveryAddress[];
  onSaveAddress: (address: DeliveryAddress) => void;
  onDeleteAddress: (addressId: string) => void;
  onSetDefault: (addressId: string) => void;
}

export const CustomerAddressesTab: React.FC<CustomerAddressesTabProps> = ({
  addresses,
  onSaveAddress,
  onDeleteAddress,
  onSetDefault,
}) => {
  const { isRtl, t } = useLanguage();

  const [editingAddress, setEditingAddress] = useState<DeliveryAddress | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleOpenAdd = () => {
    setIsNew(true);
    setEditingAddress({
      id: `addr_${Date.now()}`,
      label: isRtl ? 'المنزل' : 'Home Villa',
      recipientName: 'Abdulrahman Al-Saud',
      phone: '+966 50 123 4567',
      city: 'Riyadh',
      area: 'Al-Malqa',
      district: 'Al-Malqa',
      addressLine: 'Prince Turki Ibn Abdulaziz Al Awwal Rd, Villa 42',
      street: 'Prince Turki Ibn Abdulaziz Al Awwal Rd',
      buildingNumber: '42',
      isDefault: false,
    });
  };

  const handleOpenEdit = (addr: DeliveryAddress) => {
    setIsNew(false);
    setEditingAddress({ ...addr });
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAddress) return;
    onSaveAddress(editingAddress);
    setEditingAddress(null);
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
            {t.dashboard.savedAddressesTitle}
          </h2>
          <p className="text-xs text-[#8E8B85] mt-0.5">
            {isRtl
              ? 'عناوين التوصيل السريع وزيارات أخصائي القياس المنزلي في المملكة'
              : 'Addresses for courier deliveries and private home measurement appointments'}
          </p>
        </div>

        <Button variant="gold" size="sm" onClick={handleOpenAdd} className="text-xs shrink-0 font-bold">
          <Plus className="w-3.5 h-3.5 me-1.5" />
          {t.dashboard.addAddress}
        </Button>
      </div>

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4 transition-all ${
              addr.isDefault ? 'border-[#C5A880] ring-1 ring-[#C5A880]/30' : 'border-[#E6E2DB]'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] flex items-center justify-center text-[#916F3E]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#121316]">{addr.label}</h3>
                    <span className="text-[11px] text-[#8E8B85]">{addr.recipientName}</span>
                  </div>
                </div>

                {addr.isDefault && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2D6A4F] bg-[#EBF5ED] px-2 py-0.5 rounded-full border border-[#B7E4C7]">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{t.dashboard.defaultAddress}</span>
                  </span>
                )}
              </div>

              <div className="space-y-1 text-xs text-[#65625D]">
                <p className="font-medium text-[#121316]">
                  {addr.district}, {addr.city}
                </p>
                <p className="text-[11px] text-[#8E8B85]">
                  {addr.street} {addr.buildingNumber ? `· Bldg ${addr.buildingNumber}` : ''}
                </p>
                <p className="text-[11px] font-mono text-[#8E8B85] pt-0.5">{addr.phone}</p>
                {addr.additionalDetails && (
                  <p className="text-[11px] text-[#8E8B85] italic pt-1">
                    {addr.additionalDetails}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#F2EFE9] gap-2">
              <div>
                {!addr.isDefault && addr.id && (
                  <button
                    type="button"
                    onClick={() => onSetDefault(addr.id!)}
                    className="text-xs font-semibold text-[#916F3E] hover:underline cursor-pointer"
                  >
                    {isRtl ? 'تعيين كافتراضي' : 'Set as Default'}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenEdit(addr)}
                  className="text-xs text-[#65625D]"
                >
                  <Edit2 className="w-3.5 h-3.5 me-1" />
                  {isRtl ? 'تعديل' : 'Edit'}
                </Button>

                {addresses.length > 1 && addr.id && (
                  <button
                    type="button"
                    onClick={() => onDeleteAddress(addr.id!)}
                    className="p-1.5 text-[#DC2626] hover:bg-[#FEE2E2] rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-start">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE9]">
              <h3 className="text-base font-bold text-[#121316]">
                {isNew ? t.dashboard.addAddress : isRtl ? 'تعديل العنوان' : 'Edit Address'}
              </h3>
              <button
                onClick={() => setEditingAddress(null)}
                className="text-[#8E8B85] hover:text-[#121316]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#121316] mb-1">
                  {isRtl ? 'تسمية العنوان (مثال: فيلا المنزل)' : 'Address Label'}
                </label>
                <input
                  type="text"
                  required
                  value={editingAddress.label}
                  onChange={(e) =>
                    setEditingAddress({ ...editingAddress, label: e.target.value })
                  }
                  className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#121316] mb-1">
                    {isRtl ? 'المدينة' : 'City'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAddress.city}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, city: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#121316] mb-1">
                    {isRtl ? 'الحي' : 'District'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingAddress.district}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, district: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#121316] mb-1">
                  {isRtl ? 'الشارع' : 'Street'}
                </label>
                <input
                  type="text"
                  required
                  value={editingAddress.street}
                  onChange={(e) =>
                    setEditingAddress({ ...editingAddress, street: e.target.value })
                  }
                  className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#121316] mb-1">
                    {isRtl ? 'رقم المبنى / الفيلا' : 'Building / Villa'}
                  </label>
                  <input
                    type="text"
                    value={editingAddress.buildingNumber || ''}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, buildingNumber: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#121316] mb-1">
                    {isRtl ? 'رقم الجوال' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={editingAddress.phone}
                    onChange={(e) =>
                      setEditingAddress({ ...editingAddress, phone: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingAddress.isDefault}
                  onChange={(e) =>
                    setEditingAddress({ ...editingAddress, isDefault: e.target.checked })
                  }
                  className="w-4 h-4 text-[#916F3E] rounded border-[#E6E2DB]"
                />
                <span className="font-medium text-[#121316]">
                  {isRtl ? 'تعيين كعنوان رئيسي مفضل' : 'Set as default address'}
                </span>
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#F2EFE9]">
                <Button variant="outline" size="sm" type="button" onClick={() => setEditingAddress(null)}>
                  {t.common.cancel}
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  {isRtl ? 'حفظ العنوان' : 'Save Address'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
