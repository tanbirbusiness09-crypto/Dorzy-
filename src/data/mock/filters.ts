export interface FilterOption {
  value: string;
  label: string;
  labelAr: string;
  count?: number;
}

export const filterServicesList: FilterOption[] = [
  { value: 'Saudi Thobe', label: 'Saudi Thobe', labelAr: 'ثوب سعودي' },
  { value: 'Kuwaiti Thobe', label: 'Kuwaiti Thobe', labelAr: 'ثوب كويتي' },
  { value: 'Emirati Thobe', label: 'Emirati Thobe', labelAr: 'ثوب إماراتي' },
  { value: 'Qatari Style', label: 'Qatari Style', labelAr: 'نمط قطري' },
  { value: 'Jubba', label: 'Jubba', labelAr: 'جبة' },
  { value: 'Dagla', label: 'Dagla', labelAr: 'دقلة' },
  { value: 'Balto', label: 'Balto', labelAr: 'بالطو' },
  { value: 'Formal Wear', label: 'Formal Wear', labelAr: 'ملبوسات رسمية' },
  { value: 'Alterations', label: 'Alterations', labelAr: 'تعديلات وصيانة' },
  { value: 'Embroidery', label: 'Embroidery & Monogram', labelAr: 'تطريز ومونوغرام' },
  { value: 'Custom Tailoring', label: 'Custom Tailoring (Bespoke)', labelAr: 'تفصيل خاص كامل' },
];

export const filterFabricsList: FilterOption[] = [
  { value: 'Japanese Fabric', label: 'Japanese Fabric (Toyobo/Shikibo)', labelAr: 'أقمشة يابانية (تيوبو/شكيبو)' },
  { value: 'Premium Cotton', label: 'Premium Cotton 100%', labelAr: 'قطن طبيعي فاخر 100%' },
  { value: 'Italian Fabric', label: 'Italian Fabric & Silk', labelAr: 'أقمشة وحرير إيطالي' },
  { value: 'Winter Fabric', label: 'Winter Wool & Cashmere', labelAr: 'صوف وكشمير شتوي' },
  { value: 'Korean Fabric', label: 'Korean Easy-Care Blend', labelAr: 'أقمشة كورية عملية' },
  { value: 'Lightweight Fabric', label: 'Ultra-Lightweight Summer Weave', labelAr: 'أنسجة صيفية مسامية خفيفة' },
  { value: 'Custom Fabric', label: 'Client Provided Fabric', labelAr: 'قماش مقدّم من العميل' },
];

export const filterDistancesList = [
  { value: 2, label: 'Within 2 km', labelAr: 'خلال 2 كم' },
  { value: 5, label: 'Within 5 km', labelAr: 'خلال 5 كم' },
  { value: 10, label: 'Within 10 km', labelAr: 'خلال 10 كم' },
  { value: 25, label: 'Within 25 km', labelAr: 'خلال 25 كم' },
  { value: 50, label: 'Within 50 km', labelAr: 'خلال 50 كم' },
  { value: 999, label: 'Any Distance', labelAr: 'كافة المسافات' },
];

export const filterRatingsList = [
  { value: 4.5, label: '4.5 & above', labelAr: '4.5 نجوم فما فوق' },
  { value: 4.0, label: '4.0 & above', labelAr: '4.0 نجوم فما فوق' },
  { value: 3.5, label: '3.5 & above', labelAr: '3.5 نجوم فما فوق' },
  { value: 3.0, label: '3.0 & above', labelAr: '3.0 نجوم فما فوق' },
];

export const filterPriceBrackets = [
  { min: 0, max: 100, label: 'Under SAR 100', labelAr: 'أقل من 100 ر.س' },
  { min: 100, max: 200, label: 'SAR 100–200', labelAr: '100 – 200 ر.س' },
  { min: 200, max: 300, label: 'SAR 200–300', labelAr: '200 – 300 ر.س' },
  { min: 300, max: 500, label: 'SAR 300–500', labelAr: '300 – 500 ر.س' },
  { min: 500, max: 2000, label: 'SAR 500+', labelAr: '500 ر.س فأكثر' },
];

export const filterExperienceList = [
  { value: 1, label: '1+ years in craft', labelAr: 'أكثر من سنة خبرة' },
  { value: 5, label: '5+ years in craft', labelAr: 'أكثر من 5 سنوات خبرة' },
  { value: 10, label: '10+ years in craft', labelAr: 'أكثر من 10 سنوات خبرة' },
  { value: 20, label: '20+ years master artisan', labelAr: 'أكثر من 20 سنة خبرة عريقة' },
];

export const sortOptionsList = [
  { value: 'recommended', label: 'Recommended', labelAr: 'الموصى به' },
  { value: 'nearest', label: 'Nearest Distance', labelAr: 'الأقرب مسافة' },
  { value: 'highest_rated', label: 'Highest Rated', labelAr: 'الأعلى تقييماً' },
  { value: 'lowest_price', label: 'Lowest Price', labelAr: 'الأقل سعراً' },
  { value: 'highest_price', label: 'Highest Price', labelAr: 'الأعلى سعراً' },
  { value: 'most_reviewed', label: 'Most Reviewed', labelAr: 'الأكثر تقييماً' },
  { value: 'most_experienced', label: 'Most Experienced', labelAr: 'الأكثر خبرة' },
];
