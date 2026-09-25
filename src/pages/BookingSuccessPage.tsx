import React from 'react';
import { Booking } from '../types/booking';
import { BookingConfirmation } from '../components/booking/BookingConfirmation';
import { useLanguage } from '../localization/LanguageContext';

export interface BookingSuccessPageProps {
  booking: Booking;
  onViewOrder: (orderId: string) => void;
  onBackToShop: (shopId: string) => void;
  onBackToMarketplace: () => void;
}

export const BookingSuccessPage: React.FC<BookingSuccessPageProps> = ({
  booking,
  onViewOrder,
  onBackToShop,
  onBackToMarketplace,
}) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8">
      <BookingConfirmation
        booking={booking}
        onViewOrder={onViewOrder}
        onBackToShop={onBackToShop}
        onBackToMarketplace={onBackToMarketplace}
      />
    </div>
  );
};
