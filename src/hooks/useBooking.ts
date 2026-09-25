import { useState, useMemo, useCallback } from 'react';
import {
  BookingDraft,
  Booking,
  PriceSummary,
  BookingConfig,
  DesignChoiceOption,
  MeasurementMethodType,
  DeliveryMethodType,
  OrderPreferences,
  DeliveryAddress,
  TimeSlotOption,
} from '../types/booking';
import { mockShops } from '../data/mock/shops';
import { mockTailors } from '../data/mock/tailors';
import { mockServices } from '../data/mock/services';
import { mockFabrics } from '../data/mock/fabrics';
import { mockPortfolio } from '../data/mock/portfolio';
import {
  calculatePriceBreakdown,
  getBookingConfigForService,
  mockSavedMeasurements,
  mockSavedAddresses,
  mockBookingScenarios,
  createBookingFromDraft,
} from '../data/mock/booking';

export interface UseBookingReturn {
  currentStep: number;
  draft: BookingDraft;
  config: BookingConfig;
  priceSummary: PriceSummary;
  selectedShop: typeof mockShops[0] | undefined;
  selectedTailor: typeof mockTailors[0] | undefined;
  selectedService: typeof mockServices[0] | undefined;
  selectedDesign: typeof mockPortfolio[0] | undefined;
  selectedFabric: typeof mockFabrics[0] | undefined;
  validationError: string | null;
  isExitDialogOpen: boolean;
  setIsExitDialogOpen: (open: boolean) => void;
  setStep: (step: number) => void;
  nextStep: () => boolean;
  prevStep: () => void;
  setShop: (shopId: string) => void;
  setTailor: (tailorId?: string) => void;
  setService: (serviceId: string) => void;
  setDesign: (designId?: string, option?: DesignChoiceOption, customNotes?: string, files?: string[]) => void;
  setFabric: (fabricId?: string, color?: string, customerProvided?: boolean, desc?: string) => void;
  setMeasurement: (
    method: MeasurementMethodType,
    profileId?: string,
    values?: Record<string, number>,
    unit?: 'cm' | 'in'
  ) => void;
  setPreferences: (prefs: Partial<OrderPreferences>) => void;
  setDelivery: (
    method: DeliveryMethodType,
    address?: DeliveryAddress,
    date?: string,
    time?: TimeSlotOption,
    notes?: string
  ) => void;
  setAgreedToTerms: (agreed: boolean) => void;
  setConfirmedInformation: (confirmed: boolean) => void;
  loadScenario: (scenarioId: string) => void;
  resetBooking: () => void;
  submitBooking: () => Booking;
}

export function useBooking(initialParams?: {
  shopId?: string;
  tailorId?: string;
  serviceId?: string;
  designId?: string;
}): UseBookingReturn {
  // Determine initial shop
  const initialShopId = useMemo(() => {
    if (initialParams?.shopId) return initialParams.shopId;
    if (initialParams?.tailorId) {
      const t = mockTailors.find((x) => x.id === initialParams.tailorId || x.slug === initialParams.tailorId);
      if (t?.currentShopId) return t.currentShopId;
    }
    if (initialParams?.designId) {
      const d = mockPortfolio.find((x) => x.id === initialParams.designId || x.slug === initialParams.designId);
      if (d?.shopId) return d.shopId;
    }
    return mockShops[0].id;
  }, [initialParams]);

  // Determine initial tailor
  const initialTailorId = useMemo(() => {
    if (initialParams?.tailorId) {
      const t = mockTailors.find((x) => x.id === initialParams.tailorId || x.slug === initialParams.tailorId);
      return t?.id;
    }
    return undefined;
  }, [initialParams]);

  // Determine initial design
  const initialDesignId = useMemo(() => {
    if (initialParams?.designId) {
      const d = mockPortfolio.find((x) => x.id === initialParams.designId || x.slug === initialParams.designId);
      return d?.id;
    }
    return undefined;
  }, [initialParams]);

  // Determine initial service
  const initialServiceId = useMemo(() => {
    if (initialParams?.serviceId) return initialParams.serviceId;
    return mockServices[0].id;
  }, [initialParams]);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState<boolean>(false);

  const [draft, setDraft] = useState<BookingDraft>(() => ({
    shopId: initialShopId,
    tailorId: initialTailorId,
    serviceId: initialServiceId,
    designId: initialDesignId,
    designOption: initialDesignId ? 'inspiration' : 'shop',
    fabricId: mockFabrics[0].id,
    fabricColor: mockFabrics[0].availableColors[0]?.name || 'Pure White',
    customerProvidedFabric: false,
    measurementMethod: 'saved',
    measurementProfileId: mockSavedMeasurements[0].id,
    measurementUnit: 'cm',
    preferences: {
      collarStyle: 'classic',
      collarStiffness: 'very_stiff',
      cuffStyle: 'french_double',
      buttonsStyle: 'hidden_snap',
      embroideryStyle: 'none',
      pocketStyle: 'open_pen_slot',
      fitPreference: 'slim_tailored',
      specialInstructions: '',
    },
    deliveryMethod: 'pickup',
    deliveryAddress: mockSavedAddresses[0],
    preferredDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    preferredTimeSlot: 'afternoon',
    agreedToTerms: false,
    confirmedInformation: false,
  }));

  // Selected Entities
  const selectedShop = useMemo(() => {
    return mockShops.find((s) => s.id === draft.shopId) || mockShops[0];
  }, [draft.shopId]);

  const selectedTailor = useMemo(() => {
    return draft.tailorId ? mockTailors.find((t) => t.id === draft.tailorId) : undefined;
  }, [draft.tailorId]);

  const selectedService = useMemo(() => {
    return mockServices.find((s) => s.id === draft.serviceId) || mockServices[0];
  }, [draft.serviceId]);

  const selectedDesign = useMemo(() => {
    return draft.designId ? mockPortfolio.find((p) => p.id === draft.designId) : undefined;
  }, [draft.designId]);

  const selectedFabric = useMemo(() => {
    return draft.fabricId ? mockFabrics.find((f) => f.id === draft.fabricId) : undefined;
  }, [draft.fabricId]);

  // Booking Config
  const config = useMemo(() => {
    return getBookingConfigForService(draft.serviceId);
  }, [draft.serviceId]);

  // Price Summary
  const priceSummary = useMemo(() => {
    return calculatePriceBreakdown(draft);
  }, [draft]);

  // Step Validation
  const validateCurrentStep = useCallback((): boolean => {
    setValidationError(null);

    // Step 1: Service
    if (currentStep === 1) {
      if (!draft.serviceId) {
        setValidationError('Please select a tailoring service to continue.');
        return false;
      }
    }

    // Step 2: Design
    if (currentStep === 2) {
      if (config.supportsCustomDesign && draft.designOption === 'custom') {
        if (!draft.customDesignNotes || draft.customDesignNotes.trim().length < 5) {
          setValidationError('Please provide a brief description of your custom design.');
          return false;
        }
      }
    }

    // Step 3: Fabric
    if (currentStep === 3) {
      if (config.requiresFabric) {
        if (!draft.customerProvidedFabric && !draft.fabricId) {
          setValidationError('Please select a fabric from the collection or choose to bring your own fabric.');
          return false;
        }
      }
    }

    // Step 4: Measurement
    if (currentStep === 4) {
      if (config.requiresMeasurement) {
        if (!draft.measurementMethod) {
          setValidationError('Please select a measurement method to proceed.');
          return false;
        }
        if (draft.measurementMethod === 'saved' && !draft.measurementProfileId) {
          setValidationError('Please select one of your saved measurement profiles.');
          return false;
        }
        if (draft.measurementMethod === 'manual') {
          if (!draft.measurements?.thobeLength || !draft.measurements?.chest || !draft.measurements?.sleeve) {
            setValidationError('Please enter at least Thobe Length, Chest, and Sleeve measurements.');
            return false;
          }
        }
      }
    }

    // Step 6: Delivery
    if (currentStep === 6) {
      if (!draft.deliveryMethod) {
        setValidationError('Please choose either atelier pickup or home delivery.');
        return false;
      }
      if (draft.deliveryMethod === 'home_delivery' && (!draft.deliveryAddress || !draft.deliveryAddress.addressLine)) {
        setValidationError('Please provide a valid delivery address.');
        return false;
      }
    }

    // Step 7: Review & Consent
    if (currentStep === 7) {
      if (!draft.confirmedInformation) {
        setValidationError('Please confirm that your tailoring specifications are correct.');
        return false;
      }
    }

    return true;
  }, [currentStep, draft, config]);

  const nextStep = useCallback((): boolean => {
    if (!validateCurrentStep()) {
      return false;
    }

    // Check conditional step skipping
    let target = currentStep + 1;
    if (target === 3 && !config.requiresFabric) {
      target = 4; // Skip fabric if service doesn't require fabric
    }
    if (target === 4 && !config.requiresMeasurement) {
      target = 5; // Skip measurement if service doesn't require measurement
    }

    if (target <= 7) {
      setCurrentStep(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    }
    return true;
  }, [currentStep, validateCurrentStep, config]);

  const prevStep = useCallback((): void => {
    setValidationError(null);
    let target = currentStep - 1;
    if (target === 4 && !config.requiresMeasurement) {
      target = 3;
    }
    if (target === 3 && !config.requiresFabric) {
      target = 2;
    }
    if (target >= 1) {
      setCurrentStep(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, config]);

  const setStep = useCallback((step: number): void => {
    setValidationError(null);
    if (step >= 1 && step <= 7) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const setShop = useCallback((shopId: string): void => {
    setDraft((prev) => ({
      ...prev,
      shopId,
      // If shop changes, reset tailor if current tailor doesn't belong to new shop
      tailorId: prev.tailorId
        ? mockTailors.find((t) => t.id === prev.tailorId && t.currentShopId === shopId)?.id
        : undefined,
    }));
  }, []);

  const setTailor = useCallback((tailorId?: string): void => {
    setDraft((prev) => {
      let targetShopId = prev.shopId;
      if (tailorId) {
        const tailor = mockTailors.find((t) => t.id === tailorId);
        if (tailor?.currentShopId) {
          targetShopId = tailor.currentShopId;
        }
      }
      return {
        ...prev,
        tailorId,
        shopId: targetShopId,
      };
    });
  }, []);

  const setService = useCallback((serviceId: string): void => {
    setDraft((prev) => ({
      ...prev,
      serviceId,
    }));
  }, []);

  const setDesign = useCallback(
    (designId?: string, option?: DesignChoiceOption, customNotes?: string, files?: string[]): void => {
      setDraft((prev) => ({
        ...prev,
        designId,
        designOption: option || (designId ? 'inspiration' : 'shop'),
        customDesignNotes: customNotes,
        referenceFileNames: files || prev.referenceFileNames,
      }));
    },
    []
  );

  const setFabric = useCallback(
    (fabricId?: string, color?: string, customerProvided?: boolean, desc?: string): void => {
      setDraft((prev) => ({
        ...prev,
        fabricId,
        fabricColor: color,
        customerProvidedFabric: !!customerProvided,
        customerFabricDescription: desc,
      }));
    },
    []
  );

  const setMeasurement = useCallback(
    (
      method: MeasurementMethodType,
      profileId?: string,
      values?: Record<string, number>,
      unit?: 'cm' | 'in'
    ): void => {
      setDraft((prev) => ({
        ...prev,
        measurementMethod: method,
        measurementProfileId: profileId,
        measurements: values || prev.measurements,
        measurementUnit: unit || prev.measurementUnit || 'cm',
      }));
    },
    []
  );

  const setPreferences = useCallback((prefs: Partial<OrderPreferences>): void => {
    setDraft((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...prefs,
      },
    }));
  }, []);

  const setDelivery = useCallback(
    (
      method: DeliveryMethodType,
      address?: DeliveryAddress,
      date?: string,
      time?: TimeSlotOption,
      notes?: string
    ): void => {
      setDraft((prev) => ({
        ...prev,
        deliveryMethod: method,
        deliveryAddress: address !== undefined ? address : prev.deliveryAddress,
        preferredDate: date || prev.preferredDate,
        preferredTimeSlot: time || prev.preferredTimeSlot,
        appointmentNotes: notes !== undefined ? notes : prev.appointmentNotes,
      }));
    },
    []
  );

  const setAgreedToTerms = useCallback((agreed: boolean): void => {
    setDraft((prev) => ({
      ...prev,
      agreedToTerms: agreed,
    }));
  }, []);

  const setConfirmedInformation = useCallback((confirmed: boolean): void => {
    setDraft((prev) => ({
      ...prev,
      confirmedInformation: confirmed,
    }));
  }, []);

  const loadScenario = useCallback((scenarioId: string): void => {
    const sc = mockBookingScenarios.find((s) => s.id === scenarioId);
    if (sc) {
      setDraft({ ...sc.draft });
      setValidationError(null);
    }
  }, []);

  const resetBooking = useCallback((): void => {
    setCurrentStep(1);
    setValidationError(null);
    setDraft({
      shopId: mockShops[0].id,
      serviceId: mockServices[0].id,
      designOption: 'shop',
      fabricId: mockFabrics[0].id,
      fabricColor: mockFabrics[0].availableColors[0]?.name || 'Pure White',
      customerProvidedFabric: false,
      measurementMethod: 'saved',
      measurementProfileId: mockSavedMeasurements[0].id,
      measurementUnit: 'cm',
      preferences: {
        collarStyle: 'classic',
        collarStiffness: 'very_stiff',
        cuffStyle: 'french_double',
        buttonsStyle: 'hidden_snap',
        embroideryStyle: 'none',
        pocketStyle: 'open_pen_slot',
        fitPreference: 'slim_tailored',
      },
      deliveryMethod: 'pickup',
      deliveryAddress: mockSavedAddresses[0],
      preferredDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      preferredTimeSlot: 'afternoon',
      agreedToTerms: false,
      confirmedInformation: false,
    });
  }, []);

  const submitBooking = useCallback((): Booking => {
    return createBookingFromDraft(draft);
  }, [draft]);

  return {
    currentStep,
    draft,
    config,
    priceSummary,
    selectedShop,
    selectedTailor,
    selectedService,
    selectedDesign,
    selectedFabric,
    validationError,
    isExitDialogOpen,
    setIsExitDialogOpen,
    setStep,
    nextStep,
    prevStep,
    setShop,
    setTailor,
    setService,
    setDesign,
    setFabric,
    setMeasurement,
    setPreferences,
    setDelivery,
    setAgreedToTerms,
    setConfirmedInformation,
    loadScenario,
    resetBooking,
    submitBooking,
  };
}
