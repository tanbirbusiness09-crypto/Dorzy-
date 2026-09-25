import React, { useState } from 'react';
import { useBooking } from '../hooks/useBooking';
import { BookingHeader } from '../components/booking/BookingHeader';
import { BookingProgress } from '../components/booking/BookingProgress';
import { BookingSummary } from '../components/booking/BookingSummary';
import { ServiceStep } from '../components/booking/ServiceStep';
import { DesignStep } from '../components/booking/DesignStep';
import { FabricStep } from '../components/booking/FabricStep';
import { MeasurementStep } from '../components/booking/MeasurementStep';
import { PreferencesStep } from '../components/booking/PreferencesStep';
import { DeliveryStep } from '../components/booking/DeliveryStep';
import { ReviewStep } from '../components/booking/ReviewStep';
import { BookingExitDialog } from '../components/booking/BookingExitDialog';
import { ScenarioQuickSwitcher } from '../components/booking/ScenarioQuickSwitcher';
import { Booking } from '../types/booking';
import { useLanguage } from '../localization/LanguageContext';
import { AlertCircle } from 'lucide-react';

export interface BookingPageProps {
  initialShopId?: string;
  initialTailorId?: string;
  initialServiceId?: string;
  initialDesignId?: string;
  onBookingSuccess: (booking: Booking) => void;
  onExitBooking: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialShopId,
  initialTailorId,
  initialServiceId,
  initialDesignId,
  onBookingSuccess,
  onExitBooking,
}) => {
  const { isRtl } = useLanguage();

  const {
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
    submitBooking,
  } = useBooking({
    shopId: initialShopId,
    tailorId: initialTailorId,
    serviceId: initialServiceId,
    designId: initialDesignId,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const confirmed = submitBooking();
      setIsSubmitting(false);
      onBookingSuccess(confirmed);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col text-[#121316]">
      {/* 1. BOOKING HEADER */}
      <BookingHeader
        currentStep={currentStep}
        totalSteps={7}
        onPrevStep={currentStep > 1 ? prevStep : undefined}
        onRequestExit={() => setIsExitDialogOpen(true)}
      />

      {/* 2. PROGRESS STEP BAR */}
      <BookingProgress
        currentStep={currentStep}
        totalSteps={7}
        onStepClick={setStep}
        requiresFabric={config.requiresFabric}
        requiresMeasurement={config.requiresMeasurement}
      />

      {/* 3. SCENARIO TESTING BAR */}
      <div className="bg-[#FAF9F6] border-b border-[#E6E2DB] px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-[#8E8B85]">
          <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="hidden sm:inline">
            {isRtl ? 'نظام حجز وتفصيل خيّاط — مسار حياكة سعودي أصيل' : 'Khayyat Sartorial Booking Flow — Saudi Bespoke Platform'}
          </span>
        </div>

        <ScenarioQuickSwitcher onSelectScenario={loadScenario} />
      </div>

      {/* 4. MAIN WORKSPACE WITH PERSISTENT SUMMARY */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Validation Error Banner */}
        {validationError && (
          <div className="mb-6 p-3.5 rounded-xl bg-[#FFEBEE] border border-[#FFCDD2] text-[#D32F2F] text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{validationError}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Active Step Content */}
          <div className="flex-1 w-full min-w-0 pb-20 lg:pb-12">
            {currentStep === 1 && selectedShop && (
              <ServiceStep
                selectedServiceId={draft.serviceId}
                selectedShop={selectedShop}
                selectedTailor={selectedTailor}
                onSelectService={setService}
                onSelectShop={setShop}
                onSelectTailor={setTailor}
              />
            )}

            {currentStep === 2 && (
              <DesignStep
                selectedDesignId={draft.designId}
                designOption={draft.designOption}
                customDesignNotes={draft.customDesignNotes}
                referenceFileNames={draft.referenceFileNames}
                shopId={draft.shopId || ''}
                tailorId={draft.tailorId}
                onSelectDesign={setDesign}
              />
            )}

            {currentStep === 3 && (
              <FabricStep
                selectedFabricId={draft.fabricId}
                selectedColor={draft.fabricColor}
                customerProvidedFabric={draft.customerProvidedFabric}
                customerFabricDescription={draft.customerFabricDescription}
                onSelectFabric={setFabric}
              />
            )}

            {currentStep === 4 && (
              <MeasurementStep
                method={draft.measurementMethod}
                selectedProfileId={draft.measurementProfileId}
                measurements={draft.measurements}
                unit={draft.measurementUnit}
                config={config}
                onSelectMethod={setMeasurement}
              />
            )}

            {currentStep === 5 && draft.preferences && (
              <PreferencesStep
                preferences={draft.preferences}
                onUpdatePreferences={setPreferences}
              />
            )}

            {currentStep === 6 && selectedShop && (
              <DeliveryStep
                method={draft.deliveryMethod}
                address={draft.deliveryAddress}
                preferredDate={draft.preferredDate}
                preferredTimeSlot={draft.preferredTimeSlot}
                appointmentNotes={draft.appointmentNotes}
                shop={selectedShop}
                onUpdateDelivery={setDelivery}
              />
            )}

            {currentStep === 7 && selectedShop && selectedService && (
              <ReviewStep
                draft={draft}
                priceSummary={priceSummary}
                config={config}
                shop={selectedShop}
                tailor={selectedTailor}
                service={selectedService}
                fabric={selectedFabric}
                design={selectedDesign}
                onEditSection={setStep}
                onToggleTerms={setAgreedToTerms}
                onToggleConfirmedInfo={setConfirmedInformation}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          {/* Persistent Order Summary */}
          <BookingSummary
            draft={draft}
            priceSummary={priceSummary}
            config={config}
            currentStep={currentStep}
            onNextStep={currentStep === 7 ? handleSubmit : nextStep}
            onEditStep={setStep}
            isSubmitting={isSubmitting}
          />
        </div>
      </main>

      {/* 5. EXIT CONFIRMATION MODAL */}
      <BookingExitDialog
        isOpen={isExitDialogOpen}
        onContinue={() => setIsExitDialogOpen(false)}
        onConfirmExit={() => {
          setIsExitDialogOpen(false);
          onExitBooking();
        }}
      />
    </div>
  );
};
