import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Plus,
  AlertCircle,
  CheckCircle2,
  CalendarDays,
  Scissors,
} from 'lucide-react';
import { CustomerAppointment } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { Button } from '../ui/Button';

export interface CustomerBookingsTabProps {
  appointments: CustomerAppointment[];
  onReschedule: (appointmentId: string, newDate: string, newSlot: 'morning' | 'afternoon' | 'evening') => void;
  onCancel: (appointmentId: string) => void;
  onBookNew: () => void;
}

export const CustomerBookingsTab: React.FC<CustomerBookingsTabProps> = ({
  appointments,
  onReschedule,
  onCancel,
  onBookNew,
}) => {
  const { isRtl, t } = useLanguage();

  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('2026-10-05');
  const [newSlot, setNewSlot] = useState<'morning' | 'afternoon' | 'evening'>('evening');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const upcoming = appointments.filter((a) => a.status !== 'COMPLETED' && a.status !== 'CANCELLED');
  const past = appointments.filter((a) => a.status === 'COMPLETED' || a.status === 'CANCELLED');

  const handleConfirmReschedule = () => {
    if (!reschedulingId) return;
    onReschedule(reschedulingId, newDate, newSlot);
    setReschedulingId(null);
  };

  const handleConfirmCancel = () => {
    if (!cancellingId) return;
    onCancel(cancellingId);
    setCancellingId(null);
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#121316] font-display">
            {t.dashboard.upcomingVisitsTitle}
          </h2>
          <p className="text-xs text-[#8E8B85] mt-0.5">
            {isRtl
              ? 'مواعيد أخصائي القياس المنزلي وجلسات البروفة داخل صالونات المشاغل'
              : 'Home measurement specialist visits and in-salon fitting consultations'}
          </p>
        </div>

        <Button variant="gold" size="sm" onClick={onBookNew} className="text-xs shrink-0 font-bold">
          <Plus className="w-3.5 h-3.5 me-1.5" />
          {t.dashboard.bookVisitCTA}
        </Button>
      </div>

      {/* Upcoming Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8B85]">
          {isRtl ? 'المواعيد النشطة والمجدولة' : 'Scheduled Appointments'} ({upcoming.length})
        </h3>

        {upcoming.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-[#D1D5DB] p-8 text-center space-y-3">
            <Calendar className="w-8 h-8 text-[#A8A49D] mx-auto" />
            <h4 className="text-sm font-bold text-[#121316]">{t.dashboard.noUpcomingVisits}</h4>
            <Button variant="primary" size="sm" onClick={onBookNew}>
              {t.dashboard.bookVisitCTA}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map((apt) => {
              const shopName = isRtl ? apt.shopNameAr : apt.shopName;
              const serviceName = isRtl ? apt.serviceNameAr : apt.serviceName;

              return (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl border border-[#E6E2DB] p-5 shadow-xs flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#916F3E] block">
                          {apt.bookingReference}
                        </span>
                        <h4 className="text-sm font-bold text-[#121316] mt-0.5">{serviceName}</h4>
                      </div>

                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-lg border font-semibold ${
                          apt.status === 'CONFIRMED'
                            ? 'bg-[#EBF5ED] text-[#2D6A4F] border-[#B7E4C7]'
                            : apt.status === 'RESCHEDULE_REQUESTED'
                            ? 'bg-[#F0F4F8] text-[#1D4ED8] border-[#BFDBFE]'
                            : 'bg-[#FAF4EB] text-[#916F3E] border-[#E5D2BA]'
                        }`}
                      >
                        {apt.status === 'CONFIRMED'
                          ? isRtl ? 'موعد معتمد' : 'Confirmed'
                          : apt.status === 'RESCHEDULE_REQUESTED'
                          ? isRtl ? 'طلب تعديل قيد المراجعة' : 'Reschedule Pending'
                          : isRtl ? 'بانتظار الاعتماد' : 'Requested'}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-[#65625D]">
                      <div className="flex items-center gap-2 text-[#121316] font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[#916F3E]" />
                        <span>
                          {new Date(apt.appointmentDate).toLocaleDateString(isRtl ? 'ar-SA' : 'en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#8E8B85]" />
                        <span>{apt.timeRangeDisplay}</span>
                      </div>

                      {apt.specialistName && (
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#8E8B85]" />
                          <span>
                            {t.dashboard.specialistAssigned}:{' '}
                            <strong>{isRtl ? apt.specialistNameAr || apt.specialistName : apt.specialistName}</strong>
                          </span>
                        </div>
                      )}

                      {apt.addressSummary && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#8E8B85]" />
                          <span>{apt.addressSummary}</span>
                        </div>
                      )}

                      {apt.notes && (
                        <p className="text-[11px] text-[#8E8B85] bg-[#FAF9F6] p-2.5 rounded-lg border border-[#F2EFE9] italic">
                          {apt.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#F2EFE9] gap-2">
                    <button
                      type="button"
                      onClick={() => setCancellingId(apt.id)}
                      className="text-xs text-[#DC2626] hover:underline cursor-pointer"
                    >
                      {isRtl ? 'إلغاء الموعد' : 'Cancel'}
                    </button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReschedulingId(apt.id)}
                      className="text-xs"
                    >
                      <CalendarDays className="w-3.5 h-3.5 me-1 text-[#916F3E]" />
                      {t.dashboard.requestUpdate}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Past Appointments Section */}
      {past.length > 0 && (
        <div className="space-y-3 pt-6 border-t border-[#E6E2DB]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8E8B85]">
            {isRtl ? 'المواعيد السابقة' : 'Past Appointments'}
          </h3>
          <div className="space-y-2 text-xs">
            {past.map((apt) => (
              <div
                key={apt.id}
                className="p-3.5 rounded-xl bg-white border border-[#E6E2DB] flex items-center justify-between gap-3 text-start"
              >
                <div>
                  <span className="font-bold text-[#121316] block">
                    {isRtl ? apt.serviceNameAr : apt.serviceName}
                  </span>
                  <span className="text-[11px] text-[#8E8B85]">
                    {apt.appointmentDate} · {apt.bookingReference}
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#F4F4F6] text-[#65625D]">
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {reschedulingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 text-start">
            <h3 className="text-base font-bold text-[#121316]">
              {t.dashboard.rescheduleTitle}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#121316] mb-1">
                  {t.dashboard.newDate}
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E6E2DB] text-xs focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#121316] mb-1">
                  {t.dashboard.newSlot}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['morning', 'afternoon', 'evening'] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setNewSlot(slot)}
                      className={`p-2 rounded-lg border text-center font-medium capitalize cursor-pointer ${
                        newSlot === slot
                          ? 'border-[#916F3E] bg-[#FAF4EB] text-[#916F3E]'
                          : 'border-[#E6E2DB] text-[#65625D]'
                      }`}
                    >
                      {slot === 'morning'
                        ? isRtl ? 'صباحاً' : 'Morning'
                        : slot === 'afternoon'
                        ? isRtl ? 'ظهراً' : 'Afternoon'
                        : isRtl ? 'مساءً' : 'Evening'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setReschedulingId(null)}>
                {t.common.cancel}
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmReschedule}>
                {isRtl ? 'تأكيد طلب التعديل' : 'Submit Reschedule'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancellingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl space-y-3 text-start">
            <h3 className="text-sm font-bold text-[#121316]">
              {isRtl ? 'إلغاء الموعد' : 'Cancel Appointment'}
            </h3>
            <p className="text-xs text-[#65625D]">
              {isRtl
                ? 'هل تريد بالتأكيد إلغاء هذا الموعد؟ يمكنك إعادة حجز موعد جديد في أي وقت.'
                : 'Are you sure you want to cancel this appointment? You can book a new visit anytime.'}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setCancellingId(null)}>
                {t.common.back}
              </Button>
              <Button variant="danger" size="sm" onClick={handleConfirmCancel}>
                {isRtl ? 'نعم، إلغاء الموعد' : 'Cancel Visit'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
