export interface Neighborhood {
  id: string;
  name: string;
  nameAr: string;
  city: string;
}

export interface CityLocation {
  id: string;
  name: string;
  nameAr: string;
  lat: number;
  lng: number;
  neighborhoods: Neighborhood[];
}

export const saudiCitiesData: CityLocation[] = [
  {
    id: 'Riyadh',
    name: 'Riyadh',
    nameAr: 'الرياض',
    lat: 24.7136,
    lng: 46.6753,
    neighborhoods: [
      { id: 'al_olaya', name: 'Al Olaya', nameAr: 'العليا', city: 'Riyadh' },
      { id: 'al_malaz', name: 'Al Malaz', nameAr: 'الملز', city: 'Riyadh' },
      { id: 'al_nakheel', name: 'Al Nakheel', nameAr: 'النخيل', city: 'Riyadh' },
      { id: 'al_yasmin', name: 'Al Yasmin', nameAr: 'الياسمين', city: 'Riyadh' },
      { id: 'al_sulaimaniyah', name: 'Al Sulaimaniyah', nameAr: 'السليمانية', city: 'Riyadh' },
      { id: 'al_muhammadiyah', name: 'Al Muhammadiyah', nameAr: 'المحمدية', city: 'Riyadh' },
    ],
  },
  {
    id: 'Jeddah',
    name: 'Jeddah',
    nameAr: 'جدة',
    lat: 21.5433,
    lng: 39.1728,
    neighborhoods: [
      { id: 'al_rawdah', name: 'Al Rawdah', nameAr: 'الروضة', city: 'Jeddah' },
      { id: 'al_andalus', name: 'Al Andalus', nameAr: 'الأندلس', city: 'Jeddah' },
      { id: 'al_shatee', name: 'Al Shatee', nameAr: 'الشاطئ', city: 'Jeddah' },
      { id: 'al_zahra', name: 'Al Zahra', nameAr: 'الزهراء', city: 'Jeddah' },
    ],
  },
  {
    id: 'Khobar',
    name: 'Al-Khobar',
    nameAr: 'الخبر',
    lat: 26.2172,
    lng: 50.1971,
    neighborhoods: [
      { id: 'al_hizam_thahabi', name: 'Al Hizam Al Thahabi', nameAr: 'الحزام الذهبي', city: 'Khobar' },
      { id: 'al_ulaya_khobar', name: 'Al Ulaya', nameAr: 'العليا', city: 'Khobar' },
      { id: 'al_corniche', name: 'Corniche', nameAr: 'الكورنيش', city: 'Khobar' },
    ],
  },
  {
    id: 'Dammam',
    name: 'Dammam',
    nameAr: 'الدمام',
    lat: 26.4207,
    lng: 50.0888,
    neighborhoods: [
      { id: 'al_faisaliyah', name: 'Al Faisaliyah', nameAr: 'الفيصلية', city: 'Dammam' },
      { id: 'al_shatie_dammam', name: 'Al Shatie', nameAr: 'الشاطئ', city: 'Dammam' },
    ],
  },
  {
    id: 'Makkah',
    name: 'Makkah',
    nameAr: 'مكة المكرمة',
    lat: 21.3891,
    lng: 39.8579,
    neighborhoods: [
      { id: 'al_awali', name: 'Al Awali', nameAr: 'العوالي', city: 'Makkah' },
      { id: 'al_shawqiyyah', name: 'Al Shawqiyyah', nameAr: 'الشوقية', city: 'Makkah' },
    ],
  },
  {
    id: 'Madinah',
    name: 'Madinah',
    nameAr: 'المدينة المنورة',
    lat: 24.5247,
    lng: 39.5692,
    neighborhoods: [
      { id: 'quba', name: 'Quba', nameAr: 'قباء', city: 'Madinah' },
      { id: 'al_iskan', name: 'Al Iskan', nameAr: 'الإسكان', city: 'Madinah' },
    ],
  },
];
