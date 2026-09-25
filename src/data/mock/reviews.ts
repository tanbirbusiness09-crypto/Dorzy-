import { CustomerReview } from '../../types';

export const mockReviews: CustomerReview[] = [
  {
    id: 'rev_01',
    customerName: 'Fahad Al-Otaibi',
    rating: 5,
    date: '2 days ago',
    dateAr: 'منذ يومين',
    isVerifiedOrder: true,
    comment:
      'Impeccable craftsmanship on the royal collar and Toyobo Japanese cotton thobe. The fitting was exact from the first measurement, and the home delivery arrived ahead of schedule.',
    commentAr:
      'شغل احترافي جداً في القلاب الملكي وثوب التيوبو الياباني الأصلي. مقاس الصدر والأكتاف بالمللي من أول بروفة، وتوصيل الثوب وصل قبل الموعد المحدد.',
    targetType: 'shop',
    targetId: 'shop_01',
    targetName: 'Al-Mamlaka Royal Atelier',
    targetNameAr: 'مشغل المملكة الملكي للخياطة الراقية',
    serviceOrdered: 'Executive Royal Saudi Thobe',
    serviceOrderedAr: 'الثوب السعودي التنفيذي الملكي',
    helpfulCount: 24,
  },
  {
    id: 'rev_02',
    customerName: 'Nasser Al-Subaie',
    rating: 5,
    date: '1 week ago',
    dateAr: 'منذ أسبوع',
    isVerifiedOrder: true,
    comment:
      'Ustad Tariq is undoubtedly one of the finest cutters in Riyadh. The shoulder drape on my winter cashmere dagla is perfection. Highly recommended for formal wear.',
    commentAr:
      'المعلّم طارق من أمهر معلّمي القص في الرياض بدون مبالغة. نزلة الكتف في الدقلة الكشمير خيالية وبدون أي كسرات. أنصح به جداً للمناسبات الرسمية.',
    targetType: 'tailor',
    targetId: 'tailor_01',
    targetName: 'Master Tariq Al-Husseini',
    targetNameAr: 'المعلّم طارق الحسيني',
    serviceOrdered: 'Bespoke Winter Cashmere Dagla',
    serviceOrderedAr: 'دقلة شتوية من الصوف والكشمير',
    helpfulCount: 38,
  },
  {
    id: 'rev_03',
    customerName: 'Turki Al-Ghamdi',
    rating: 4.5,
    date: '2 weeks ago',
    dateAr: 'منذ أسبوعين',
    isVerifiedOrder: true,
    comment:
      'Great experience with the home measurement booking. The tailor arrived with fabric swatches from Toyobo and Shikibo. Thobe stitching is very clean.',
    commentAr:
      'تجربة ممتازة في خدمة أخذ القياس بالمنزل. الخيّاط حضر ومعه عينات الأقمشة اليابانية الأصلية. خياطة الثوب نظيفة جداً وخالية من أي عيوب.',
    targetType: 'shop',
    targetId: 'shop_02',
    targetName: 'Dar Al-Nokhba Bespoke Tailors',
    targetNameAr: 'دار النخبة للتفصيل الرجالي',
    serviceOrdered: 'Kuwaiti Summer Thobe',
    serviceOrderedAr: 'ثوب كويتي صيفي انسيابي',
    helpfulCount: 17,
  },
];
