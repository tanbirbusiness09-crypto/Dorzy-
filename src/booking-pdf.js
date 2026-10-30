import { jsPDF } from 'jspdf';

let fontPromise;
export function loadBookingFont() {
  if (!fontPromise) fontPromise = fetch('/fonts/Amiri-Regular.ttf').then(response => {
    if (!response.ok) throw new Error('PDF font unavailable');
    return response.arrayBuffer();
  }).then(buffer => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
    return btoa(binary);
  }).catch(error => { fontPromise = null; throw error; });
  return fontPromise;
}

export function createBookingPdf(booking, fontBase64) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  doc.addFileToVFS('Amiri-Regular.ttf', fontBase64);
  doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
  const gold = [172, 129, 42], ink = [28, 47, 37];
  let y = 50;
  const text = value => String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '');
  const space = height => {
    if (y + height > 276) { doc.addPage(); y = 22; }
  };
  const section = (title, reserve = 22) => {
    space(reserve); y += 2;
    doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor(...gold);
    doc.text(title.toUpperCase(), 18, y);
    doc.setDrawColor(229, 221, 202).line(18, y + 3, 192, y + 3);
    y += 9;
  };
  const row = (label, value) => {
    const content = text(value || '-');
    doc.setFont('Amiri', 'normal').setFontSize(12);
    const lines = doc.splitTextToSize(content, 121);
    space(Math.max(8, lines.length * 5.7 + 2));
    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(100, 108, 100);
    doc.text(label, 18, y);
    doc.setFont('Amiri', 'normal').setFontSize(12).setTextColor(...ink);
    const rtl = /[\u0600-\u06ff]/.test(content);
    doc.text(lines, rtl ? 191 : 70, y, { align: rtl ? 'right' : 'left', lineHeightFactor: 1.35 });
    y += Math.max(8, lines.length * 5.7 + 2);
  };
  const amount = value => value == null ? 'To be confirmed' : `SAR ${Number(value).toFixed(2)}`;

  doc.setFillColor(...ink).rect(0, 0, 210, 43, 'F');
  doc.setFont('helvetica', 'bold').setFontSize(20).setTextColor(229, 199, 130).text('NAMAA AL QIMMAH', 18, 18);
  doc.setFontSize(8).setCharSpace(1.5).text('ROYAL ATELIER', 18, 25).setCharSpace(0);
  doc.setFont('helvetica', 'normal').setFontSize(11).setTextColor(255, 253, 246).text('Tailoring appointment request', 18, 35);
  doc.setFontSize(9).text(text(booking.ref), 192, 18, { align: 'right' });
  doc.setProperties({ title: `Namaa Al Qimmah ${booking.ref}`, subject: 'Customer appointment request', author: 'Namaa Al Qimmah Royal Atelier' });

  section('Customer');
  row('Full name', booking.name); row('Contact number', booking.phone);
  section('Tailoring selection');
  row('Service', booking.service);
  row('Fabric ownership', booking.fabricOwnership === 'own' ? 'Customer-owned fabric' : 'Atelier fabric');
  row('Selected fabric', booking.clothName);
  row('Quantity', booking.qty);
  section('Visit details');
  row('Visit date / time', `${booking.date} | ${booking.slot}`);
  row('City / district', [booking.cityLabel || booking.city, booking.district].filter(Boolean).join(' / '));
  row('Address', booking.address);
  row('Driving distance', booking.distanceKm == null ? 'Not calculated - travel charge pending' : `${booking.distanceKm.toFixed(2)} km from the shop`);
  if (booking.locationLink) {
    space(9);
    doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(...gold);
    doc.textWithLink('Open customer location in Google Maps', 70, y, { url: booking.locationLink }); y += 9;
  }
  section('Price breakdown');
  row('Tailoring / fabric', amount(booking.baseAmount));
  row('Visit / delivery', amount(booking.distanceFee));
  row(booking.total == null ? 'Known subtotal' : 'Total', amount(booking.total ?? booking.baseAmount));
  row('Price status', booking.priceSummary);
  if (booking.customerNote || booking.request) {
    const notes=[booking.request,booking.customerNote].filter(Boolean).join('\n');
    doc.setFont('Amiri','normal').setFontSize(12);
    section('Customer notes', 14 + doc.splitTextToSize(text(notes),121).length * 5.7);
    row('Notes',notes);
  }

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i).setFont('helvetica', 'normal').setFontSize(8).setTextColor(108, 113, 105);
    doc.setDrawColor(229, 221, 202).line(18, 283, 192, 283);
    doc.text('Request only. Visit and any pending charges require shop confirmation.', 18, 289);
    doc.text(`${i} / ${pages}`, 192, 289, { align: 'right' });
  }
  return doc;
}

export async function bookingPdfFile(booking) {
  const doc = createBookingPdf(booking, await loadBookingFont());
  return new File([doc.output('arraybuffer')], `${booking.ref}.pdf`, { type: 'application/pdf' });
}

export function downloadBookingPdf(file) {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a'); a.href = url; a.download = file.name;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
