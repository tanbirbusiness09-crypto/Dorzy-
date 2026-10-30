export function bookingMessage(booking, language = 'en') {
  const ar = language === 'ar';
  const pending = ar ? 'يُؤكد لاحقاً' : 'To be confirmed';
  const amount = value => value == null ? pending : `SAR ${Number(value).toFixed(2)}`;
  const fields = [
    [ar ? 'المرجع' : 'Reference', booking.ref],
    [ar ? 'الاسم' : 'Name', booking.name],
    [ar ? 'رقم التواصل' : 'Contact number', booking.phone],
    [ar ? 'الخدمة' : 'Service', booking.service],
    [ar ? 'القماش' : 'Fabric', booking.clothName],
    [ar ? 'الكمية' : 'Quantity', booking.qty],
    [ar ? 'الموعد' : 'Visit', `${booking.date} | ${booking.slot}`],
    [ar ? 'المدينة / الحي' : 'City / district', [booking.cityLabel || booking.city, booking.district].filter(Boolean).join(' / ')],
    [ar ? 'العنوان' : 'Address', booking.address],
    [ar ? 'مسافة الطريق' : 'Road distance', booking.distanceKm == null ? pending : `${booking.distanceKm.toFixed(2)} km`],
    [ar ? 'الخياطة / القماش' : 'Tailoring / fabric', amount(booking.baseAmount)],
    [ar ? 'الزيارة / التوصيل' : 'Visit / delivery', amount(booking.distanceFee)],
    [ar ? 'المبلغ' : 'Amount', booking.priceSummary],
  ];
  if (booking.locationLink) fields.push([ar ? 'رابط الموقع' : 'Location pin', booking.locationLink]);
  if (booking.request) fields.push([ar ? 'تفاصيل الطلب' : 'Request details', booking.request]);
  if (booking.customerNote) fields.push([ar ? 'ملاحظات' : 'Notes', booking.customerNote]);
  return (ar ? 'السلام عليكم، طلب موعد من أتيليه نماء القمة.' : 'As-salamu alaykum, Namaa Al Qimmah appointment request.') + '\n' +
    fields.map(([label, value]) => `${label}: ${value ?? '-'}`).join('\n') + '\n' +
    (ar ? 'سأرفق ملف الحجز PDF الذي تم تنزيله. يرجى تأكيد الموعد وأي رسوم متبقية.' : 'I will attach the downloaded booking PDF. Please confirm the visit and any pending charges.');
}

export function bookingWhatsAppUrl(booking, number, language) {
  const digits = String(number || '').replace(/[^0-9]/g, '');
  if (!/^\d{8,15}$/.test(digits) || digits === '966500000000') return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(bookingMessage(booking, language))}`;
}
