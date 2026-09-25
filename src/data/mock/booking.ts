import {
  SavedMeasurementProfile,
  DeliveryAddress,
  BookingConfig,
  BookingDraft,
  Booking,
  PriceSummary,
} from '../../types/booking';
import { mockShops } from './shops';
import { mockTailors } from './tailors';
import { mockServices } from './services';
import { mockFabrics } from './fabrics';
import { mockPortfolio } from './portfolio';

// Mock Saved Measurement Profiles
export const mockSavedMeasurements: SavedMeasurementProfile[] = [
  {
    id: 'meas_profile_01',
    name: 'Executive Thobe Profile',
    nameAr: 'مقاس الثوب التنفيذي الرسمي',
    tag: 'Primary / Work',
    tagAr: 'الأساسي / العمل',
    thobeLength: 148,
    shoulder: 46,
    chest: 108,
    waist: 102,
    hip: 114,
    sleeve: 63,
    cuff: 26,
    neck: 41,
    armhole: 48,
    trouserLength: 102,
    unit: 'cm',
    createdDate: '2025-11-14',
    lastUpdated: '2026-02-10',
  },
  {
    id: 'meas_profile_02',
    name: 'Winter Warm Thobe',
    nameAr: 'مقاس الثوب الشتوي الفضفاض',
    tag: 'Winter Over-Layers',
    tagAr: 'شتوي / مع ملابس داخلية دافئة',
    thobeLength: 149,
    shoulder: 47.5,
    chest: 112,
    waist: 106,
    hip: 118,
    sleeve: 63.5,
    cuff: 27,
    neck: 42,
    armhole: 50,
    trouserLength: 102,
    unit: 'cm',
    createdDate: '2025-12-01',
    lastUpdated: '2026-01-15',
  },
  {
    id: 'meas_profile_03',
    name: 'Kuwaiti Summer Cut',
    nameAr: 'تفصيل كويتي صيفي مريح',
    tag: 'Casual / Summer',
    tagAr: 'يومي / صيفي انسيابي',
    thobeLength: 147,
    shoulder: 45.5,
    chest: 106,
    waist: 98,
    hip: 110,
    sleeve: 62.5,
    cuff: 25.5,
    neck: 40.5,
    armhole: 47,
    trouserLength: 100,
    unit: 'cm',
    createdDate: '2025-08-20',
    lastUpdated: '2025-09-02',
  },
];

// Mock Saved Delivery Addresses
export const mockSavedAddresses: DeliveryAddress[] = [
  {
    id: 'addr_01',
    label: 'Home (Villa)',
    recipientName: 'Abdulrahman Al-Saud',
    phone: '+966 50 123 4567',
    city: 'Riyadh',
    area: 'Al-Malqa District',
    addressLine: 'Prince Turki Ibn Abdulaziz Al Awwal Rd, Villa 42',
    building: 'Villa 42',
    unit: 'Private Residence',
    notes: 'Ring side bell near the main courtyard gate.',
  },
  {
    id: 'addr_02',
    label: 'KAFD Corporate Office',
    recipientName: 'Abdulrahman Al-Saud',
    phone: '+966 50 123 4567',
    city: 'Riyadh',
    area: 'King Abdullah Financial District',
    addressLine: 'Tower 4.08, 14th Floor, Executive Wing',
    building: 'Tower 4.08',
    unit: 'Floor 14 - Suite 1402',
    notes: 'Deliver to executive reception during working hours (9 AM - 5 PM).',
  },
  {
    id: 'addr_03',
    label: 'Jeddah Coastal Villa',
    recipientName: 'Abdulrahman Al-Saud',
    phone: '+966 50 987 6543',
    city: 'Jeddah',
    area: 'Al-Shati District',
    addressLine: 'Corniche Way, Street 18',
    building: 'Residence 9B',
    unit: 'Ground Floor',
    notes: 'Guard available 24/7.',
  },
];

// Service Booking Configurations (determines conditional steps)
export const getBookingConfigForService = (serviceId?: string): BookingConfig => {
  // If service is alteration or monogram embroidery
  if (serviceId === 'serv_08') {
    // Alteration
    return {
      serviceId,
      requiresFabric: false,
      requiresMeasurement: true,
      supportsHomeMeasurement: false,
      supportsDelivery: true,
      supportsTailorSelection: true,
      supportsCustomDesign: false,
      supportsAppointment: true,
    };
  }

  if (serviceId === 'serv_09') {
    // Custom Monogram / Embroidery
    return {
      serviceId,
      requiresFabric: false,
      requiresMeasurement: false,
      supportsHomeMeasurement: false,
      supportsDelivery: true,
      supportsTailorSelection: true,
      supportsCustomDesign: true,
      supportsAppointment: true,
    };
  }

  if (serviceId === 'serv_07') {
    // Ceremonial Bisht
    return {
      serviceId,
      requiresFabric: true,
      requiresMeasurement: true,
      supportsHomeMeasurement: true,
      supportsDelivery: true,
      supportsTailorSelection: true,
      supportsCustomDesign: true,
      supportsAppointment: true,
    };
  }

  // Standard Thobe / Default
  return {
    serviceId: serviceId || 'serv_01',
    requiresFabric: true,
    requiresMeasurement: true,
    supportsHomeMeasurement: true,
    supportsDelivery: true,
    supportsTailorSelection: true,
    supportsCustomDesign: true,
    supportsAppointment: true,
  };
};

// Calculate pricing breakdown based on draft
export const calculatePriceBreakdown = (draft: BookingDraft): PriceSummary => {
  const selectedService = mockServices.find((s) => s.id === draft.serviceId) || mockServices[0];
  const selectedFabric = draft.fabricId ? mockFabrics.find((f) => f.id === draft.fabricId) : undefined;

  let serviceAmount = selectedService?.startingPriceSar || 350;
  let fabricAmount = 0;
  let customizationAmount = 0;
  let measurementFee = 0;
  let deliveryFee = 0;
  let isCustomQuote = false;

  // Custom Quote triggers
  if (draft.designOption === 'custom' || draft.serviceId === 'serv_07' || draft.serviceId === 'serv_09') {
    isCustomQuote = true;
  }

  // Fabric calculation
  if (draft.customerProvidedFabric) {
    fabricAmount = 0;
  } else if (selectedFabric) {
    fabricAmount = selectedFabric.standingSurchargeSar || 80;
  }

  // Customization preferences fee
  if (draft.preferences) {
    if (draft.preferences.cuffStyle === 'french_double') {
      customizationAmount += 30;
    }
    if (draft.preferences.embroideryStyle === 'royal_zari') {
      customizationAmount += 120;
    } else if (draft.preferences.embroideryStyle === 'subtle_monogram') {
      customizationAmount += 45;
    }
    if (draft.preferences.buttonsStyle === 'traditional_shell') {
      customizationAmount += 25;
    }
  }

  // Measurement Fee
  if (draft.measurementMethod === 'home') {
    // Some VIP services include it free, otherwise SAR 60
    measurementFee = selectedService.includesHomeMeasurement ? 0 : 60;
  }

  // Delivery Fee
  if (draft.deliveryMethod === 'home_delivery') {
    deliveryFee = 25;
  }

  const estimatedTotal = serviceAmount + fabricAmount + customizationAmount + measurementFee + deliveryFee;

  let priceStatus: PriceSummary['priceStatus'] = 'ESTIMATED';
  if (isCustomQuote) {
    priceStatus = 'QUOTE_REQUIRED';
  } else if (draft.measurementMethod === 'saved' && draft.deliveryMethod === 'pickup') {
    priceStatus = 'FIXED';
  }

  return {
    serviceAmount,
    fabricAmount,
    customizationAmount,
    measurementFee,
    deliveryFee,
    discount: 0,
    estimatedTotal,
    currency: 'SAR',
    priceStatus,
    isCustomQuote,
  };
};

// 4 Mock Scenarios as specified in Prompt section 53
export interface MockScenario {
  id: string;
  name: string;
  nameAr: string;
  badge: string;
  badgeAr: string;
  description: string;
  descriptionAr: string;
  draft: BookingDraft;
}

export const mockBookingScenarios: MockScenario[] = [
  {
    id: 'scenario_1_standard',
    name: 'Scenario 1: Standard Executive Thobe',
    nameAr: 'السيناريو 1: ثوب سعودي رسمي بمقاس محفوظ',
    badge: 'Fixed / Saved Profile',
    badgeAr: 'سعر محدد / مقاس محفوظ',
    description: 'Classic Royal Saudi Thobe, Al Mamlaka Royal Atelier, Japanese Toyobo fabric, saved measurements, and shop pickup.',
    descriptionAr: 'ثوب تنفيذي ملكي من دار المملكة، قماش تيوبو الياباني، اعتماد الملف المحفوظ واستلام من المشغل.',
    draft: {
      shopId: 'shop_01',
      serviceId: 'serv_01',
      designId: 'item_01',
      designOption: 'inspiration',
      fabricId: 'fab_01',
      fabricColor: 'Pure White (أبيض ناصع)',
      customerProvidedFabric: false,
      measurementMethod: 'saved',
      measurementProfileId: 'meas_profile_01',
      measurementUnit: 'cm',
      preferences: {
        collarStyle: 'classic',
        collarStiffness: 'very_stiff',
        cuffStyle: 'french_double',
        buttonsStyle: 'hidden_snap',
        embroideryStyle: 'none',
        pocketStyle: 'open_pen_slot',
        fitPreference: 'slim_tailored',
        specialInstructions: 'Please ensure crisp collar points for cufflink wear.',
      },
      deliveryMethod: 'pickup',
      preferredDate: '2026-10-02',
      preferredTimeSlot: 'afternoon',
      agreedToTerms: true,
      confirmedInformation: true,
    },
  },
  {
    id: 'scenario_2_home',
    name: 'Scenario 2: VIP Home Measurement & Delivery',
    nameAr: 'السيناريو 2: قياس منزلي خاص وتوصيل للعنوان',
    badge: 'Home Visit / Delivery',
    badgeAr: 'زيارة منزلية / توصيل',
    description: 'Premium winter wool thobe, home measurement specialist visit in Riyadh Al-Malqa, and home doorstep delivery.',
    descriptionAr: 'ثوب شتوي بصوف هادرسفيلد، زيارة أخصائي قياس لمنزل العميل بالملقا، وتوصيل الطلب بعد الانتهاء.',
    draft: {
      shopId: 'shop_02',
      serviceId: 'serv_05',
      designId: 'item_04',
      designOption: 'shop',
      fabricId: 'fab_03',
      fabricColor: 'Charcoal Grey',
      customerProvidedFabric: false,
      measurementMethod: 'home',
      measurementUnit: 'cm',
      preferences: {
        collarStyle: 'classic',
        collarStiffness: 'medium',
        cuffStyle: 'single_button',
        buttonsStyle: 'traditional_shell',
        embroideryStyle: 'none',
        pocketStyle: 'dual_inner',
        fitPreference: 'regular_comfort',
        specialInstructions: 'Require warm lining and reinforced pockets for winter use.',
      },
      deliveryMethod: 'home_delivery',
      deliveryAddress: mockSavedAddresses[0],
      preferredDate: '2026-10-05',
      preferredTimeSlot: 'evening',
      agreedToTerms: true,
      confirmedInformation: true,
    },
  },
  {
    id: 'scenario_3_quote',
    name: 'Scenario 3: Ceremonial Bespoke (Quote Required)',
    nameAr: 'السيناريو 3: حياكة خاصة تتطلب تسعيرة دقيقة',
    badge: 'Custom Quote Required',
    badgeAr: 'بانتظار تأكيد التسعيرة',
    description: 'Custom ceremonial royal bisht with German Zari gold plaiting, reference sketches, requiring atelier inspection and quote.',
    descriptionAr: 'بشت زفاف ملكي مذهب بدربوية قصب ألماني مع تطريز خاص يتطلب مراجعة معلّم الصنعة لتحديد التسعيرة النهائية.',
    draft: {
      shopId: 'shop_03',
      serviceId: 'serv_07',
      designId: 'item_07',
      designOption: 'custom',
      customDesignNotes: 'Looking to replicate an heirloom Najdi royal bisht with extra wide German gold Zari hem and bespoke initials embroidered inside.',
      referenceFileNames: ['royal_heirloom_pattern.jpg', 'zari_collar_detail.png'],
      fabricId: 'fab_05',
      fabricColor: 'Royal Navy',
      customerProvidedFabric: false,
      measurementMethod: 'shop',
      measurementUnit: 'cm',
      preferences: {
        collarStyle: 'custom',
        collarStiffness: 'soft',
        cuffStyle: 'custom',
        buttonsStyle: 'metal_antique',
        embroideryStyle: 'royal_zari',
        pocketStyle: 'traditional_side',
        fitPreference: 'traditional_generous',
        specialInstructions: 'Will attend the shop with personal family advisor for silk lining approval.',
      },
      deliveryMethod: 'pickup',
      preferredDate: '2026-10-10',
      preferredTimeSlot: 'morning',
      agreedToTerms: true,
      confirmedInformation: true,
    },
  },
  {
    id: 'scenario_4_tailor',
    name: 'Scenario 4: Specific Master Tailor Request',
    nameAr: 'السيناريو 4: طلب مخصص لمعلّم خياطة بعينه',
    badge: 'Master Artisan Request',
    badgeAr: 'طلب معلّم معتمد',
    description: 'Requested Master Tailor Tariq Al-Husseini at Al Mamlaka Royal with manual measurement adjustments and Kuwaiti soft finish.',
    descriptionAr: 'طلب حياكة مخصصة بيد المعلم طارق الحسيني بمشغل المملكة مع قياسات يدوية وقصة كويتية انسيابية.',
    draft: {
      shopId: 'shop_01',
      tailorId: 'tailor_01',
      serviceId: 'serv_02',
      designId: 'item_02',
      designOption: 'tailor',
      fabricId: 'fab_02',
      fabricColor: 'Crisp White',
      customerProvidedFabric: false,
      measurementMethod: 'manual',
      measurements: {
        thobeLength: 147.5,
        shoulder: 46,
        chest: 107,
        waist: 100,
        hip: 112,
        sleeve: 63,
        cuff: 26,
        neck: 41,
        armhole: 48,
        trouserLength: 101,
      },
      measurementUnit: 'cm',
      preferences: {
        collarStyle: 'kuwaiti_soft',
        collarStiffness: 'soft',
        cuffStyle: 'standard_open',
        buttonsStyle: 'hidden_snap',
        embroideryStyle: 'none',
        pocketStyle: 'hidden_zipper',
        fitPreference: 'regular_comfort',
        specialInstructions: 'Hand-basted fitting requested with Master Tariq before final seam stitching.',
      },
      deliveryMethod: 'pickup',
      preferredDate: '2026-10-04',
      preferredTimeSlot: 'afternoon',
      agreedToTerms: true,
      confirmedInformation: true,
    },
  },
];

// Helper to create a confirmed Booking object from draft
export const createBookingFromDraft = (draft: BookingDraft): Booking => {
  const shop = mockShops.find((s) => s.id === draft.shopId) || mockShops[0];
  const tailor = draft.tailorId ? mockTailors.find((t) => t.id === draft.tailorId) : undefined;
  const service = mockServices.find((s) => s.id === draft.serviceId) || mockServices[0];
  const design = draft.designId ? mockPortfolio.find((p) => p.id === draft.designId) : undefined;
  const fabric = draft.fabricId ? mockFabrics.find((f) => f.id === draft.fabricId) : undefined;
  const priceSummary = calculatePriceBreakdown(draft);

  const randomRefDigits = Math.floor(1000 + Math.random() * 9000);
  const cityCode = shop.location.city.slice(0, 3).toUpperCase();
  const referenceNumber = `KHY-${randomRefDigits}-${cityCode}`;
  const bookingId = `book_${Date.now()}`;

  return {
    id: bookingId,
    referenceNumber,
    customerId: 'cust_saudi_09',
    shopId: shop.id,
    shopName: shop.name,
    shopNameAr: shop.nameAr,
    tailorId: tailor?.id,
    tailorName: tailor?.name,
    tailorNameAr: tailor?.nameAr,
    serviceId: service.id,
    serviceName: service.title,
    serviceNameAr: service.titleAr,
    designId: design?.id,
    designTitle: design?.title,
    designTitleAr: design?.titleAr,
    fabricId: fabric?.id,
    fabricName: fabric?.name,
    fabricNameAr: fabric?.nameAr,
    fabricColor: draft.fabricColor,
    customerProvidedFabric: draft.customerProvidedFabric,
    measurementMethod: draft.measurementMethod || 'shop',
    measurementProfileId: draft.measurementProfileId,
    measurements: draft.measurements,
    measurementUnit: draft.measurementUnit || 'cm',
    preferences: draft.preferences,
    deliveryMethod: draft.deliveryMethod || 'pickup',
    deliveryAddress: draft.deliveryAddress,
    preferredDate: draft.preferredDate || new Date().toISOString().split('T')[0],
    preferredTimeSlot: draft.preferredTimeSlot || 'afternoon',
    notes: draft.notes,
    priceSummary,
    status: priceSummary.isCustomQuote ? 'REQUESTED' : 'PENDING_CONFIRMATION',
    createdAt: new Date().toISOString(),
  };
};
