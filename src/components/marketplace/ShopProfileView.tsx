import React, { useState } from 'react';
import {
  Store,
  MapPin,
  Clock,
  Home,
  Truck,
  Phone,
  MessageCircle,
  Navigation,
  Bookmark,
  Share2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Award,
  Layers,
  Scissors,
  Sparkles,
  Info,
  ChevronRight,
  ChevronLeft,
  X,
  Star,
  Check,
  ArrowRight,
  ArrowLeft,
  Search,
  Filter,
} from 'lucide-react';
import { Shop, Tailor, TailoringService, DetailedFabric, PortfolioItem, CustomerReview } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { useToast } from '../feedback/Toast';
import { Rating } from '../ui/Rating';
import { PriceDisplay } from '../ui/PriceDisplay';
import { VerificationBadge } from '../trust/VerificationBadge';
import { Button } from '../ui/Button';
import { Breadcrumb } from '../ui/Breadcrumb';
import { TailoringArt } from './TailoringArtPlaceholder';
import { ServiceCard } from './ServiceCard';
import { TailorCard } from './TailorCard';
import { PortfolioCard } from './PortfolioCard';
import { ReviewCard } from './ReviewCard';
import { ShopCard } from './ShopCard';
import { HomeMeasurementDrawer } from './HomeMeasurementDrawer';
import { Modal } from '../ui/Modal';
import { saudiCitiesData } from '../../data/mock/locations';

export interface ShopProfileViewProps {
  shop: Shop;
  services: TailoringService[];
  fabrics: DetailedFabric[];
  tailors: Tailor[];
  portfolioItems: PortfolioItem[];
  reviews: CustomerReview[];
  similarShops: Shop[];
  onNavigateHome?: () => void;
  onNavigateShops?: () => void;
  onSelectShop?: (shop: Shop) => void;
  onStartBooking?: (params: { shopId?: string; serviceId?: string; tailorId?: string }) => void;
}

export const ShopProfileView: React.FC<ShopProfileViewProps> = ({
  shop,
  services,
  fabrics,
  tailors,
  portfolioItems,
  reviews,
  similarShops,
  onNavigateHome,
  onNavigateShops,
  onSelectShop,
  onStartBooking,
}) => {
  const { t, isRtl } = useLanguage();
  const { showToast } = useToast();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // State
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'fabrics' | 'tailors' | 'portfolio' | 'reviews' | 'location'>('overview');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('Saudi Thobe');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const [activeReviewFilter, setActiveReviewFilter] = useState<'all' | 'verified' | '5star' | 'withPhotos'>('all');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'thobe' | 'winter_wear' | 'ceremonial' | 'alteration'>('all');
  const [fabricSeasonFilter, setFabricSeasonFilter] = useState<'all' | 'all_year' | 'summer' | 'winter'>('all');

  // Contact Modal state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Localization strings
  const shopName = isRtl ? shop.nameAr : shop.name;
  const tagline = isRtl ? shop.taglineAr : shop.tagline;
  const description = isRtl ? shop.descriptionAr : shop.description;
  const city = isRtl ? shop.location.cityAr : shop.location.city;
  const district = isRtl ? shop.location.districtAr : shop.location.district;
  const street = isRtl ? shop.location.streetNameAr : shop.location.streetName;
  const statusNote = isRtl
    ? (shop.operatingHours.statusNoteAr || (shop.operatingHours.isOpenNow ? 'مفتوح الآن' : 'مغلق'))
    : (shop.operatingHours.statusNote || (shop.operatingHours.isOpenNow ? 'Open Now' : 'Closed'));
  const specialties = isRtl ? (shop.specialtiesAr || shop.featuredServicesAr) : (shop.specialties || shop.featuredServices);
  const languages = isRtl ? (shop.languagesAr || ['العربية', 'الإنجليزية']) : (shop.languages || ['Arabic', 'English']);
  const paymentMethods = isRtl
    ? (shop.paymentMethodsAr || ['مدى', 'Apple Pay', 'فيزا / ماستركارد', 'الدفع نقداً'])
    : (shop.paymentMethods || ['Mada', 'Apple Pay', 'Visa/Mastercard', 'Cash']);

  // Handle Save
  const handleToggleSave = () => {
    setIsSaved((prev) => {
      const next = !prev;
      showToast({
        title: next ? (isRtl ? 'تم الحفظ في المفضلة' : 'Saved to favorites') : (isRtl ? 'تمت الإزالة من المفضلة' : 'Removed from favorites'),
        description: `${shopName}`,
        type: next ? 'success' : 'info',
      });
      return next;
    });
  };

  // Handle Share
  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        title: isRtl ? 'تم نسخ رابط المشغل' : 'Atelier link copied to clipboard',
        description: isRtl ? 'يمكنك الآن مشاركة الرابط مع الآخرين' : 'Ready to share with friends or colleagues.',
        type: 'success',
      });
    }
  };

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (activeReviewFilter === 'verified') return r.isVerifiedOrder;
    if (activeReviewFilter === '5star') return r.rating >= 4.9;
    return true;
  });

  // Filter services
  const filteredServices = services.filter((s) => {
    if (activeCategoryFilter === 'all') return true;
    return s.category === activeCategoryFilter;
  });

  // Filter fabrics
  const filteredFabrics = fabrics.filter((f) => {
    if (fabricSeasonFilter === 'all') return true;
    return f.season === fabricSeasonFilter;
  });

  const breadcrumbItems = [
    { label: isRtl ? 'الرئيسية' : 'Home', href: '/', onClick: onNavigateHome },
    { label: isRtl ? 'المشاغل والدور' : 'Ateliers & Shops', href: '/shops', onClick: onNavigateShops },
    { label: city, href: `/shops?location=${shop.location.city.toLowerCase()}`, onClick: onNavigateShops },
    { label: shopName, current: true },
  ];

  return (
    <div className="space-y-8 pb-16 text-start">
      {/* 1. Global Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* 2. Shop Hero / Cover Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#121316] rounded-2xl overflow-hidden border border-[#24262E] shadow-lg">
          {/* Subtle Decorative Background Artwork */}
          <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
            <TailoringArt
              theme={shop.featuredServices.includes('Dagla') ? 'dagla' : 'thobe'}
              title={shopName}
              aspectRatio="16:9"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/75 to-transparent" />

          {/* Hero Content */}
          <div className="relative p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Logo / Monogram Frame */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#24262E] border-2 border-[#C5A880]/50 p-2 shadow-md flex flex-col items-center justify-center shrink-0 text-center">
                <Store className="w-8 h-8 text-[#C5A880] mb-1" />
                <span className="text-[10px] font-mono tracking-widest text-[#FAF9F6] font-bold uppercase truncate max-w-[70px]">
                  {shop.establishedYear}
                </span>
              </div>

              {/* Title & Meta Details */}
              <div className="space-y-2 text-[#FAF9F6]">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-[#FAF9F6]">
                    {shopName}
                  </h1>
                  {shop.trust.isVerifiedShop && (
                    <VerificationBadge type="verified_shop" size="sm" />
                  )}
                  {shop.trust.isCommercialRegistered && (
                    <VerificationBadge type="verified_business" size="sm" />
                  )}
                </div>

                <p className="text-sm sm:text-base text-[#D4D0C7] max-w-2xl font-light">
                  {tagline}
                </p>

                {/* Location, Distance, and Operating Status Row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#A8A49D] pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#C5A880]" />
                    <span>{street}, {district}, {city}</span>
                    {shop.location.distanceKm && (
                      <span className="text-[#8E8B85]">
                        ({shop.location.distanceKm} {isRtl ? 'كم منك' : 'km away'})
                      </span>
                    )}
                  </div>

                  <span className="text-[#3D404D]">·</span>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#C5A880]" />
                    <span className={shop.operatingHours.isOpenNow ? 'text-[#388E3C] font-semibold' : 'text-[#D32F2F]'}>
                      {statusNote}
                    </span>
                    <span className="text-[#8E8B85]">
                      ({shop.operatingHours.openTime} – {shop.operatingHours.closeTime})
                    </span>
                  </div>

                  {shop.establishedYear && (
                    <>
                      <span className="text-[#3D404D]">·</span>
                      <div className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{isRtl ? `تأسس عام ${shop.establishedYear}م` : `Est. ${shop.establishedYear}`}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Hero Actions (Save & Share) */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleToggleSave}
                aria-label="Save to favorites"
                className={`p-2.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-2 text-xs font-medium ${
                  isSaved
                    ? 'bg-[#C5A880] text-[#121316] border-[#C5A880]'
                    : 'bg-[#24262E]/80 text-[#FAF9F6] border-[#3D404D] hover:bg-[#24262E]'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? (isRtl ? 'محفوظ' : 'Saved') : (isRtl ? 'حفظ' : 'Save')}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                aria-label="Share atelier link"
                className="p-2.5 rounded-lg bg-[#24262E]/80 text-[#FAF9F6] border border-[#3D404D] hover:bg-[#24262E] transition-colors cursor-pointer flex items-center gap-2 text-xs font-medium"
              >
                <Share2 className="w-4 h-4" />
                <span>{isRtl ? 'مشاركة' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Rating & Trust Metrics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-4 shadow-xs">
          {/* Platform Rating */}
          <div className="flex items-center gap-3 p-2 border-e border-[#F2EFE9] last:border-e-0">
            <div className="w-10 h-10 rounded-lg bg-[#F9F6F0] border border-[#E2D5C3] flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-[#C5A880] fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-[#121316] font-mono leading-none">
                  {shop.metrics.rating.toFixed(2)}
                </span>
                <span className="text-xs text-[#8E8B85]">/ 5</span>
              </div>
              <p className="text-[11px] text-[#65625D] mt-0.5">
                {shop.metrics.reviewCount} {isRtl ? 'تقييم معتمد بالمنصة' : 'Verified reviews'}
              </p>
            </div>
          </div>

          {/* Distinguished Google Rating (Clearly Demo / Unmerged) */}
          <div className="flex items-center gap-3 p-2 border-e border-[#F2EFE9] last:border-e-0">
            <div className="w-10 h-10 rounded-lg bg-[#F5F3EF] border border-[#E6E2DB] flex items-center justify-center shrink-0">
              <span className="font-bold text-xs text-[#24262E]">G</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-[#121316] font-mono leading-none">
                  {shop.metrics.googleRating?.score || 4.7}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF9F6] border border-[#E6E2DB] text-[#8E8B85] uppercase tracking-wider font-semibold">
                  Demo
                </span>
              </div>
              <p className="text-[11px] text-[#65625D] mt-0.5">
                {shop.metrics.googleRating?.reviewCount || 340} {isRtl ? 'تقييم Google (تجريبي)' : 'Google Maps (Demo)'}
              </p>
            </div>
          </div>

          {/* Completed Orders */}
          <div className="flex items-center gap-3 p-2 border-e border-[#F2EFE9] last:border-e-0">
            <div className="w-10 h-10 rounded-lg bg-[#F2F7F4] border border-[#CDE3D5] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-[#1E5638]" />
            </div>
            <div>
              <span className="text-lg font-bold text-[#121316] font-mono leading-none">
                +{shop.metrics.completedOrdersCount}
              </span>
              <p className="text-[11px] text-[#65625D] mt-0.5">
                {isRtl ? 'ثوب منجز بدقة' : 'Garments tailored'}
              </p>
            </div>
          </div>

          {/* Experience / On-Time */}
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-lg bg-[#F9F6F0] border border-[#E2D5C3] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#916F3E]" />
            </div>
            <div>
              <span className="text-lg font-bold text-[#121316] font-mono leading-none">
                {shop.metrics.onTimeDeliveryRate || 99}%
              </span>
              <p className="text-[11px] text-[#65625D] mt-0.5">
                {isRtl ? 'التزام بالمواعيد' : 'On-time delivery'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Actions Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-4 flex flex-wrap items-center justify-between gap-4">
          {/* Primary & Secondary Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                if (onStartBooking) {
                  onStartBooking({ shopId: shop.id });
                } else {
                  setIsBookingOpen(true);
                }
              }}
              icon={<Calendar className="w-4 h-4" />}
            >
              {isRtl ? 'حجز موعد قياس أو تفصيل' : 'Book Tailoring / Fitting'}
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={() => setIsContactModalOpen(true)}
              icon={<Phone className="w-4 h-4" />}
            >
              {isRtl ? 'الاتصال بالمشغل' : 'Call Atelier'}
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={() => setIsContactModalOpen(true)}
              icon={<MessageCircle className="w-4 h-4 text-[#1E5638]" />}
            >
              {isRtl ? 'محادثة واتساب' : 'WhatsApp'}
            </Button>

            <a
              href={`https://maps.google.com/?q=${shop.location.coordinates?.lat || 24.7},${shop.location.coordinates?.lng || 46.6}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#E6E2DB] bg-[#FAF9F6] text-[#121316] hover:bg-[#F5F3EF] transition-colors"
            >
              <Navigation className="w-4 h-4 text-[#916F3E]" />
              <span>{isRtl ? 'الاتجاهات بالخريطة' : 'Directions'}</span>
            </a>
          </div>

          {/* Pricing starting anchor */}
          <div className="text-end">
            <span className="block text-[11px] text-[#8E8B85]">
              {isRtl ? 'يبدأ سعر التفصيل من' : 'Tailoring starting from'}
            </span>
            <PriceDisplay amount={shop.startingPriceSar} suffix={t.common.perThobe} size="lg" />
          </div>
        </div>
      </section>

      {/* 5. Navigation Tab Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 border-b border-[#E6E2DB] overflow-x-auto scrollbar-none pb-2">
          {[
            { id: 'overview', label: isRtl ? 'نظرة عامة والخدمات' : 'Overview & Services' },
            { id: 'services', label: isRtl ? `قائمة الأسعار (${services.length})` : `Pricing & Services (${services.length})` },
            { id: 'fabrics', label: isRtl ? `الأقمشة المتاحة (${fabrics.length})` : `Fabrics (${fabrics.length})` },
            { id: 'tailors', label: isRtl ? `معلّمو الخياطة (${tailors.length})` : `Master Tailors (${tailors.length})` },
            { id: 'portfolio', label: isRtl ? `معرض الأعمال (${portfolioItems.length})` : `Portfolio (${portfolioItems.length})` },
            { id: 'reviews', label: isRtl ? `آراء العملاء (${reviews.length})` : `Client Reviews (${reviews.length})` },
            { id: 'location', label: isRtl ? 'الموقع وساعات العمل' : 'Location & Hours' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#121316] text-[#FAF9F6] shadow-xs'
                  : 'bg-[#FFFFFF] text-[#65625D] hover:text-[#121316] border border-[#E6E2DB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT AREA ACCORDING TO TABS */}

      {/* OVERVIEW SECTION */}
      {activeTab === 'overview' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Description, Specialties, Features */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Atelier */}
              <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-6 space-y-4">
                <h2 className="text-lg font-bold text-[#121316] tracking-tight">
                  {isRtl ? 'عن المشغل والتاريخ الحرفي' : 'About the Atelier'}
                </h2>
                <p className="text-sm text-[#3D404D] leading-relaxed">
                  {description}
                </p>

                {/* Specialties Tags */}
                <div className="pt-2">
                  <h3 className="text-xs font-bold text-[#121316] uppercase tracking-wider mb-2">
                    {isRtl ? 'التخصصات البارزة' : 'Signature Specialties'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {specialties?.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-md text-xs font-medium bg-[#F9F6F0] text-[#916F3E] border border-[#E2D5C3]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service Capabilities & Availability */}
              <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-6 space-y-4">
                <h2 className="text-lg font-bold text-[#121316] tracking-tight">
                  {isRtl ? 'إمكانيات الخدمة والتوصيل' : 'Service Capabilities'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                    shop.hasHomeMeasurement ? 'bg-[#F2F7F4] border-[#CDE3D5]' : 'bg-[#FAF9F6] border-[#E6E2DB]'
                  }`}>
                    <Home className={`w-5 h-5 shrink-0 ${shop.hasHomeMeasurement ? 'text-[#1E5638]' : 'text-[#8E8B85]'}`} />
                    <div>
                      <h4 className="text-xs font-bold text-[#121316]">
                        {isRtl ? 'أخذ القياس المنزلي' : 'Home Measurement'}
                      </h4>
                      <p className="text-[11px] text-[#65625D] mt-1">
                        {shop.hasHomeMeasurement
                          ? (isRtl ? 'متاح بالرياض والمناطق المجاورة مع حقيبة عينات الأقمشة الأصلية.' : 'Tailor travels to your residence with full swatch books.')
                          : (isRtl ? 'أخذ القياس يتطلب الحضور لمقر المشغل فقط.' : 'In-atelier fitting visits only.')}
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                    shop.hasExpressDelivery ? 'bg-[#F9F6F0] border-[#E2D5C3]' : 'bg-[#FAF9F6] border-[#E6E2DB]'
                  }`}>
                    <Truck className={`w-5 h-5 shrink-0 ${shop.hasExpressDelivery ? 'text-[#916F3E]' : 'text-[#8E8B85]'}`} />
                    <div>
                      <h4 className="text-xs font-bold text-[#121316]">
                        {isRtl ? 'التفصيل والتوصيل السريع' : 'Express Delivery & Pickup'}
                      </h4>
                      <p className="text-[11px] text-[#65625D] mt-1">
                        {shop.hasExpressDelivery
                          ? (isRtl ? 'إمكانية إنجاز الثياب المستعجلة خلال 48 إلى 72 ساعة حسب الطلب.' : '48h to 72h priority express slots available upon request.')
                          : (isRtl ? 'المدة القياسية للتفصيل من 5 إلى 7 أيام عمل.' : 'Standard turnaround applies.')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Services Preview Grid */}
              <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-[#121316] tracking-tight">
                    {isRtl ? 'أبرز خدمات التفصيل والأسعار' : 'Featured Services'}
                  </h2>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="text-xs font-semibold text-[#916F3E] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isRtl ? 'عرض كافة الخدمات' : 'View all services'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.slice(0, 4).map((serv) => (
                    <ServiceCard
                      key={serv.id}
                      service={serv}
                      onSelectService={(s) => {
                        setSelectedServiceForBooking(isRtl ? s.titleAr : s.title);
                        setIsBookingOpen(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Trust Badges, Languages, Payment, Working Hours Card */}
            <div className="space-y-6">
              {/* Trust Verification Card */}
              <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#1E5638]" />
                  <h3 className="text-sm font-bold text-[#121316]">
                    {isRtl ? 'معايير التوثيق والاعتماد' : 'Verification Credentials'}
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-[#F2EFE9]">
                    <span className="text-[#65625D]">{isRtl ? 'السجل التجاري (CR)' : 'Commercial Registry'}</span>
                    <div className="flex items-center gap-1.5 font-mono font-semibold text-[#121316]">
                      <span>{shop.trust.crNumber || '1010482910'}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5638]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-[#F2EFE9]">
                    <span className="text-[#65625D]">{isRtl ? 'الرقم الضريبي (VAT)' : 'VAT ID'}</span>
                    <div className="flex items-center gap-1.5 font-mono font-semibold text-[#121316]">
                      <span>{shop.trust.vatNumber || '310294857200003'}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E5638]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-[#F2EFE9]">
                    <span className="text-[#65625D]">{isRtl ? 'الموقع الفعلي' : 'Physical Location'}</span>
                    <span className="font-semibold text-[#1E5638]">
                      {isRtl ? 'مُعاين وموثق ميدانياً' : 'Audited & Verified'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="text-[#65625D]">{isRtl ? 'طاقم معلّمي الخياطة' : 'Master Karigars'}</span>
                    <span className="font-bold text-[#121316]">
                      {shop.tailorStaffCount} {isRtl ? 'خيّاطين مقيمين' : 'resident tailors'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Working Hours & Languages Card */}
              <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-6 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold text-[#121316]">
                  {isRtl ? 'مواعيد العمل واللغات' : 'Operating Hours & Info'}
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#65625D]">{isRtl ? 'السبت – الخميس' : 'Saturday – Thursday'}</span>
                    <span className="font-semibold text-[#121316]">
                      {shop.operatingHours.openTime} – {shop.operatingHours.closeTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#65625D]">{isRtl ? 'الجمعة' : 'Friday'}</span>
                    <span className="font-semibold text-[#121316]">
                      {shop.operatingHours.isFridayOpen
                        ? (shop.operatingHours.fridayOpenTime || '04:00 PM – 11:00 PM')
                        : (isRtl ? 'مغلق للصلاة والراحة' : 'Closed')}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#F2EFE9]">
                    <span className="block text-[#8E8B85] mb-1.5">{isRtl ? 'اللغات المتاحة للتواصل' : 'Spoken Languages'}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {languages.map((lang, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E6E2DB] text-[11px] font-medium text-[#24262E]">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F2EFE9]">
                    <span className="block text-[#8E8B85] mb-1.5">{isRtl ? 'وسائل الدفع المدعومة' : 'Accepted Payments'}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {paymentMethods.map((m, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E6E2DB] text-[11px] font-medium text-[#24262E]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES & PRICING TAB */}
      {activeTab === 'services' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E2DB] pb-4">
            <div>
              <h2 className="text-xl font-bold text-[#121316]">
                {isRtl ? 'قائمة خدمات وتفصيل المشغل' : 'Tailoring Services & Pricing'}
              </h2>
              <p className="text-xs text-[#65625D] mt-1">
                {isRtl
                  ? 'كافة الأسعار شاملة ضريبة القيمة المضافة 15% وجلسات البروفة والتعديلات الأولية.'
                  : 'All demo pricing includes first fitting adjustments and 15% VAT.'}
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: isRtl ? 'كافة الخدمات' : 'All Services' },
                { id: 'thobe', label: isRtl ? 'الثياب' : 'Thobes' },
                { id: 'winter_wear', label: isRtl ? 'الملبوسات الشتوية' : 'Winter Wear' },
                { id: 'ceremonial', label: isRtl ? 'المناسبات والجبة' : 'Ceremonial' },
                { id: 'alteration', label: isRtl ? 'التعديلات' : 'Alterations' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategoryFilter(c.id as typeof activeCategoryFilter)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer whitespace-nowrap ${
                    activeCategoryFilter === c.id
                      ? 'bg-[#121316] text-[#FAF9F6]'
                      : 'bg-[#FAF9F6] text-[#65625D] hover:bg-[#F2EFE9]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectService={(s) => {
                  setSelectedServiceForBooking(isRtl ? s.titleAr : s.title);
                  setIsBookingOpen(true);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* FABRICS TAB */}
      {activeTab === 'fabrics' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E2DB] pb-4">
            <div>
              <h2 className="text-xl font-bold text-[#121316]">
                {isRtl ? 'كتالوج الأقمشة المعتمدة بالمشغل' : 'Curated Atelier Fabrics'}
              </h2>
              <p className="text-xs text-[#65625D] mt-1">
                {isRtl
                  ? 'أقمشة مستوردة من كبرى المصانع اليابانية والإنجليزية مع إمكانية إحضار قماشك الخاص.'
                  : 'Authentic imported weaves with optional client-provided fabric cutting.'}
              </p>
            </div>

            {/* Season Filter */}
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: isRtl ? 'الكل' : 'All' },
                { id: 'all_year', label: isRtl ? 'طوال العام' : 'All-Year' },
                { id: 'summer', label: isRtl ? 'صيفي' : 'Summer' },
                { id: 'winter', label: isRtl ? 'شتوي' : 'Winter' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setFabricSeasonFilter(s.id as typeof fabricSeasonFilter)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                    fabricSeasonFilter === s.id
                      ? 'bg-[#121316] text-[#FAF9F6]'
                      : 'bg-[#FAF9F6] text-[#65625D] hover:bg-[#F2EFE9]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFabrics.map((fabric) => (
              <div
                key={fabric.id}
                className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-5 flex flex-col justify-between hover:border-[#C5A880] transition-colors shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-[#121316]">
                        {isRtl ? fabric.nameAr : fabric.name}
                      </h3>
                      <p className="text-xs text-[#916F3E] font-medium mt-0.5">
                        {fabric.millBrand} · {isRtl ? fabric.originAr : fabric.origin}
                      </p>
                    </div>
                    {fabric.isPremium && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#F9F6F0] text-[#916F3E] border border-[#E2D5C3]">
                        {isRtl ? 'فاخر' : 'Premium'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#65625D] leading-relaxed">
                    {isRtl ? fabric.textureDescriptionAr : fabric.textureDescription}
                  </p>

                  {/* Composition and Weave */}
                  <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#F2EFE9] space-y-1.5 text-xs text-[#24262E]">
                    <div className="flex justify-between">
                      <span className="text-[#8E8B85]">{isRtl ? 'التركيب:' : 'Composition:'}</span>
                      <span className="font-semibold">{isRtl ? fabric.compositionAr : fabric.composition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8E8B85]">{isRtl ? 'طريقة النسج:' : 'Weave:'}</span>
                      <span>{isRtl ? fabric.weaveTypeAr : fabric.weaveType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8E8B85]">{isRtl ? 'مقاومة التجعد:' : 'Crease Resistance:'}</span>
                      <span className="font-medium text-[#1E5638]">{fabric.wrinkleResistance}</span>
                    </div>
                  </div>

                  {/* Color Swatches */}
                  <div>
                    <span className="block text-[11px] text-[#8E8B85] mb-1.5">
                      {isRtl ? 'الدرجات والألوان المتوفرة:' : 'Available Color Shades:'}
                    </span>
                    <div className="flex items-center gap-2">
                      {fabric.availableColors.map((col, idx) => (
                        <div
                          key={idx}
                          title={isRtl ? col.nameAr : col.name}
                          className="w-6 h-6 rounded-full border border-[#D4D0C7] shadow-2xs"
                          style={{ backgroundColor: col.hex }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#F2EFE9] flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-[#8E8B85] block text-[10px]">{isRtl ? 'سعر المتر التقريبي' : 'Approx. per meter'}</span>
                    <span className="font-bold text-[#121316] font-mono">
                      {fabric.pricePerMeterSar} {t.common.sar}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedServiceForBooking(`Fabric: ${isRtl ? fabric.nameAr : fabric.name}`);
                      setIsBookingOpen(true);
                    }}
                  >
                    {isRtl ? 'طلب عينة أو تفصيل' : 'Select Fabric'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAILORS / KARIGARS TAB */}
      {activeTab === 'tailors' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-[#E6E2DB] pb-4">
            <h2 className="text-xl font-bold text-[#121316]">
              {isRtl ? 'طاقم معلّمي القص والخياطة' : 'Resident Master Tailors & Cutters'}
            </h2>
            <p className="text-xs text-[#65625D] mt-1">
              {isRtl
                ? 'حرفيون أصحاب خبرة عريقة في هندسة القلاب والكتف والانسيابية الخليجية الأصيلة.'
                : 'Master artisans with decades of precision tailoring across Gulf dignitaries.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tailors.map((tailor) => (
              <TailorCard
                key={tailor.id}
                tailor={tailor}
                onBookTailor={() => {
                  setSelectedServiceForBooking(`Master Tailor: ${isRtl ? tailor.nameAr : tailor.name}`);
                  setIsBookingOpen(true);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* PORTFOLIO TAB */}
      {activeTab === 'portfolio' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-[#E6E2DB] pb-4">
            <h2 className="text-xl font-bold text-[#121316]">
              {isRtl ? 'معرض الأعمال السابقة ونماذج التفصيل' : 'Atelier Portfolio & Past Works'}
            </h2>
            <p className="text-xs text-[#65625D] mt-1">
              {isRtl
                ? 'استعرض تفاصيل القلابات، تطريز الكبك، وجودة الحياكة اليدوية.'
                : 'Click any work piece to inspect collar structure, cuff details, and fabric specs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="cursor-pointer transition-transform hover:-translate-y-1"
              >
                <PortfolioCard item={item} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* REVIEWS TAB */}
      {activeTab === 'reviews' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E2DB] pb-4">
            <div>
              <h2 className="text-xl font-bold text-[#121316]">
                {isRtl ? 'تقييمات وتجارب العملاء' : 'Client Reviews & Fittings'}
              </h2>
              <p className="text-xs text-[#65625D] mt-1">
                {isRtl
                  ? 'تقييمات مرتبطة بطلبات حقيقية موثقة عبر المنصة.'
                  : 'Real verified reviews submitted by Khayyat platform clients.'}
              </p>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: isRtl ? 'كافة التقييمات' : 'All Reviews' },
                { id: 'verified', label: isRtl ? 'طلبات مؤكدة فقط' : 'Verified Orders Only' },
                { id: '5star', label: isRtl ? '5 نجوم' : '5-Star' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveReviewFilter(f.id as typeof activeReviewFilter)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                    activeReviewFilter === f.id
                      ? 'bg-[#121316] text-[#FAF9F6]'
                      : 'bg-[#FAF9F6] text-[#65625D] hover:bg-[#F2EFE9]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-e border-[#F2EFE9]">
              <span className="text-4xl font-display font-bold text-[#121316]">
                {shop.metrics.rating.toFixed(2)}
              </span>
              <Rating score={shop.metrics.rating} size="lg" className="my-2" />
              <p className="text-xs text-[#8E8B85]">
                {isRtl ? `بناءً على ${shop.metrics.reviewCount} تقييم حقيقي` : `Based on ${shop.metrics.reviewCount} customer reviews`}
              </p>
            </div>

            <div className="md:col-span-2 space-y-2 flex flex-col justify-center">
              {[
                { stars: 5, pct: 92, count: 288 },
                { stars: 4, pct: 6, count: 19 },
                { stars: 3, pct: 2, count: 5 },
                { stars: 2, pct: 0, count: 0 },
                { stars: 1, pct: 0, count: 0 },
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-medium text-[#24262E]">{row.stars} ★</span>
                  <div className="flex-1 h-2 rounded-full bg-[#FAF9F6] overflow-hidden border border-[#E6E2DB]">
                    <div
                      className="h-full bg-[#C5A880] rounded-full"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-end text-[#8E8B85] font-mono">{row.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        </section>
      )}

      {/* LOCATION & HOURS TAB */}
      {activeTab === 'location' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Preview Placeholder with Directions */}
            <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] overflow-hidden shadow-xs">
              <div className="relative h-72 sm:h-96 bg-[#FAF9F6] flex flex-col items-center justify-center p-6 text-center border-b border-[#E6E2DB]">
                <div className="w-16 h-16 rounded-full bg-[#916F3E]/10 border-2 border-[#916F3E] flex items-center justify-center mb-3 animate-pulse">
                  <MapPin className="w-8 h-8 text-[#916F3E]" />
                </div>
                <h4 className="text-base font-bold text-[#121316]">
                  {shopName}
                </h4>
                <p className="text-xs text-[#65625D] mt-1 max-w-sm">
                  {street}, {district}, {city}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={`https://maps.google.com/?q=${shop.location.coordinates?.lat || 24.7},${shop.location.coordinates?.lng || 46.6}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#121316] text-[#FAF9F6] hover:bg-[#24262E] transition-colors"
                  >
                    <Navigation className="w-4 h-4 text-[#C5A880]" />
                    <span>{isRtl ? 'فتح في خرائط Google' : 'Open in Google Maps'}</span>
                  </a>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h4 className="text-xs font-bold text-[#121316] uppercase tracking-wider">
                  {isRtl ? 'إرشادات الوصول ومواقف السيارات' : 'Access & Parking Guidance'}
                </h4>
                <p className="text-xs text-[#65625D] leading-relaxed">
                  {isRtl
                    ? (shop.addressDirectionsAr || 'يتوفر موقف مخصص لعملاء المشغل وخدمة صف السيارات أمام المدخل التجاري مباشرة.')
                    : (shop.addressDirections || 'Valet parking and dedicated guest slots available at main gate entrance.')}
                </p>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] p-6 space-y-6 shadow-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#916F3E]" />
                <h3 className="text-base font-bold text-[#121316]">
                  {isRtl ? 'جدول ساعات العمل الأسبوعية' : 'Weekly Schedule'}
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { day: isRtl ? 'السبت' : 'Saturday', hours: `${shop.operatingHours.openTime} – ${shop.operatingHours.closeTime}` },
                  { day: isRtl ? 'الأحد' : 'Sunday', hours: `${shop.operatingHours.openTime} – ${shop.operatingHours.closeTime}` },
                  { day: isRtl ? 'الإثنين' : 'Monday', hours: `${shop.operatingHours.openTime} – ${shop.operatingHours.closeTime}` },
                  { day: isRtl ? 'الثلاثاء' : 'Tuesday', hours: `${shop.operatingHours.openTime} – ${shop.operatingHours.closeTime}` },
                  { day: isRtl ? 'الأربعاء' : 'Wednesday', hours: `${shop.operatingHours.openTime} – ${shop.operatingHours.closeTime}` },
                  { day: isRtl ? 'الخميس' : 'Thursday', hours: `${shop.operatingHours.openTime} – ${shop.operatingHours.closeTime}` },
                  {
                    day: isRtl ? 'الجمعة' : 'Friday',
                    hours: shop.operatingHours.isFridayOpen
                      ? (shop.operatingHours.fridayOpenTime || '04:00 PM – 11:00 PM')
                      : (isRtl ? 'مغلق' : 'Closed'),
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-[#F2EFE9] last:border-0">
                    <span className="font-semibold text-[#121316]">{item.day}</span>
                    <span className="font-mono text-[#65625D]">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SIMILAR SHOPS RECOMMENDATION SECTION */}
      {similarShops && similarShops.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#E6E2DB] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#121316]">
                {isRtl ? `مشاغل خياطة مشابهة في ${city}` : `Similar Ateliers in ${city}`}
              </h2>
              <p className="text-xs text-[#65625D] mt-1">
                {isRtl ? 'قارن بين المشاغل من حيث التقييم والأسعار والخدمات' : 'Compare alternative tailoring options.'}
              </p>
            </div>

            <button
              onClick={onNavigateShops}
              className="text-xs font-semibold text-[#916F3E] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{isRtl ? 'استكشاف كافة المشاغل' : 'Browse All Ateliers'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarShops.map((simShop) => (
              <ShopCard
                key={simShop.id}
                shop={simShop}
                onViewShop={() => onSelectShop && onSelectShop(simShop)}
                onBookShop={() => {
                  setSelectedServiceForBooking(isRtl ? simShop.nameAr : simShop.name);
                  setIsBookingOpen(true);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* PORTFOLIO LIGHTBOX MODAL */}
      {lightboxItem && (
        <Modal
          isOpen={!!lightboxItem}
          onClose={() => setLightboxItem(null)}
          title={isRtl ? lightboxItem.titleAr : lightboxItem.title}
          maxWidth="lg"
        >
          <div className="space-y-6 text-start">
            <TailoringArt
              theme={lightboxItem.specialty === 'Ceremonial Bisht' ? 'bisht' : lightboxItem.specialty === 'Dagla' ? 'dagla' : 'thobe'}
              title={isRtl ? lightboxItem.titleAr : lightboxItem.title}
              subtitle={lightboxItem.specialty}
              aspectRatio="16:9"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FAF9F6] rounded-lg border border-[#E6E2DB]">
                <span className="block text-[#8E8B85] mb-1">{isRtl ? 'تفاصيل القماش:' : 'Fabric Details:'}</span>
                <span className="font-semibold text-[#121316]">
                  {isRtl ? lightboxItem.fabricDetailsAr : lightboxItem.fabricDetails}
                </span>
              </div>

              <div className="p-3 bg-[#FAF9F6] rounded-lg border border-[#E6E2DB]">
                <span className="block text-[#8E8B85] mb-1">{isRtl ? 'نوع القلاب:' : 'Collar Cut:'}</span>
                <span className="font-semibold text-[#121316]">
                  {isRtl ? lightboxItem.collarStyleAr : lightboxItem.collarStyle}
                </span>
              </div>

              <div className="p-3 bg-[#FAF9F6] rounded-lg border border-[#E6E2DB]">
                <span className="block text-[#8E8B85] mb-1">{isRtl ? 'تشطيب الأكمام والكبك:' : 'Cuff Finish:'}</span>
                <span className="font-semibold text-[#121316]">
                  {isRtl ? lightboxItem.cuffStyleAr : lightboxItem.cuffStyle}
                </span>
              </div>

              <div className="p-3 bg-[#FAF9F6] rounded-lg border border-[#E6E2DB]">
                <span className="block text-[#8E8B85] mb-1">{isRtl ? 'معلّم القص:' : 'Master Tailor:'}</span>
                <span className="font-semibold text-[#916F3E]">
                  {isRtl ? lightboxItem.tailorNameAr : lightboxItem.tailorName}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#F2EFE9]">
              <Button variant="outline" size="sm" onClick={() => setLightboxItem(null)}>
                {isRtl ? 'إغلاق' : 'Close'}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedServiceForBooking(isRtl ? lightboxItem.titleAr : lightboxItem.title);
                  setLightboxItem(null);
                  setIsBookingOpen(true);
                }}
              >
                {isRtl ? 'طلب تفصيل مماثل لهذا النموذج' : 'Order Similar Piece'}
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* CONTACT / WHATSAPP / CALL MODAL */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title={isRtl ? `التواصل المباشر مع ${shopName}` : `Contact ${shopName}`}
        maxWidth="md"
      >
        <div className="space-y-4 text-start text-xs">
          <p className="text-[#65625D]">
            {isRtl
              ? 'تواصل مباشرة مع المشرف أو خيّاط الاستقبال للاستفسارات عن التوافر وجداول أخذ القياس.'
              : 'Direct communication with atelier reception and fitting managers.'}
          </p>

          <div className="space-y-3">
            {/* Phone option */}
            <div className="p-4 rounded-xl border border-[#E6E2DB] bg-[#FFFFFF] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#121316]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#121316]">{isRtl ? 'الهاتف المباشر' : 'Direct Phone'}</h4>
                  <p className="text-[#8E8B85] font-mono mt-0.5">{shop.phone}</p>
                </div>
              </div>
              <a
                href={`tel:${shop.phone}`}
                className="px-3.5 py-1.5 rounded-lg bg-[#121316] text-[#FAF9F6] font-semibold hover:bg-[#24262E] transition-colors"
              >
                {isRtl ? 'اتصال الآن' : 'Call'}
              </a>
            </div>

            {/* WhatsApp option */}
            <div className="p-4 rounded-xl border border-[#CDE3D5] bg-[#F2F7F4] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#CDE3D5] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#1E5638]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#121316]">{isRtl ? 'محادثة واتساب الرسمية' : 'Official WhatsApp'}</h4>
                  <p className="text-[#1E5638] font-mono mt-0.5">{shop.whatsapp || '+966 50 462 8900'}</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${(shop.whatsapp || '966504628900').replace(/[^0-9]/g, '')}?text=مرحباً،%20أود%20الاستفسار%20عن%20تفصيل%20ثوب%20في%20${encodeURIComponent(shopName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-[#1E5638] text-[#FAF9F6] font-semibold hover:bg-[#153e28] transition-colors"
              >
                {isRtl ? 'فتح واتساب' : 'Chat'}
              </a>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-[#8E8B85]">
            {isRtl ? 'أوقات الرد: من 9:30 صباحاً حتى 11:00 مساءً طوال أيام الأسبوع.' : 'Response hours: 9:30 AM – 11:00 PM daily.'}
          </div>
        </div>
      </Modal>

      {/* HOME MEASUREMENT & FITTING BOOKING DRAWER */}
      <HomeMeasurementDrawer
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        shop={shop}
        preselectedService={selectedServiceForBooking}
      />
    </div>
  );
};
