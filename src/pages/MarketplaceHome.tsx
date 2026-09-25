import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Home,
  Scissors,
  ChevronRight,
  ChevronLeft,
  MapPin,
  SlidersHorizontal,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  Layers,
  Star,
  UserCheck,
  Store,
  Phone,
  Ruler,
  PackageCheck,
  ArrowRight,
  ArrowLeft,
  Bookmark,
} from 'lucide-react';

import { useLanguage } from '../localization/LanguageContext';
import { useRole } from '../components/role/RoleContext';
import { useToast } from '../components/feedback/Toast';
import { mockShops, mockTailors, mockPortfolio, mockServices, mockReviews } from '../data/mock';
import { Shop, Tailor } from '../types';

// Components
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PriceDisplay } from '../components/ui/PriceDisplay';
import { Rating } from '../components/ui/Rating';
import { VerificationBadge } from '../components/trust/VerificationBadge';
import { ShopCard } from '../components/marketplace/ShopCard';
import { TailorCard } from '../components/marketplace/TailorCard';
import { PortfolioCard } from '../components/marketplace/PortfolioCard';
import { DesignCard } from '../components/marketplace/DesignCard';
import { ServiceCard } from '../components/marketplace/ServiceCard';
import { ReviewCard } from '../components/marketplace/ReviewCard';
import { NearbyShopsMapList } from '../components/marketplace/NearbyShopsMapList';
import { ShopComparisonSection } from '../components/marketplace/ShopComparisonSection';
import { GulfStylesExplorer } from '../components/marketplace/GulfStylesExplorer';
import { ThreeSidedEcosystem } from '../components/marketplace/ThreeSidedEcosystem';
import { HowItWorksSection } from '../components/marketplace/HowItWorksSection';
import { HomeMeasurementDrawer } from '../components/marketplace/HomeMeasurementDrawer';
import { RoleSelectorModal } from '../components/role/RoleSelectorModal';
import { TailoringArt } from '../components/marketplace/TailoringArtPlaceholder';

export interface MarketplaceHomeProps {
  onNavigate?: (route: string) => void;
  onSelectShop?: (shop: Shop) => void;
  onSelectTailor?: (tailor: Tailor) => void;
  onSelectDesign?: (design: any) => void;
  onStartBooking?: (params: { shopId?: string; tailorId?: string; serviceId?: string; designId?: string }) => void;
}

export const MarketplaceHome: React.FC<MarketplaceHomeProps> = ({
  onNavigate,
  onSelectShop,
  onSelectTailor,
  onSelectDesign,
  onStartBooking,
}) => {
  const { t, isRtl } = useLanguage();
  const { openRoleModal, isRoleModalOpen, closeRoleModal } = useRole();
  const { showToast } = useToast();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  // Search & Filter State
  const [heroSearchQuery, setHeroSearchQuery] = useState('Saudi Thobe');
  const [heroLocation, setHeroLocation] = useState('Riyadh');
  const [heroDistance, setHeroDistance] = useState('10');

  // Interactive Drawers
  const [isHomeMeasurementOpen, setIsHomeMeasurementOpen] = useState(false);
  const [selectedShopForBooking, setSelectedShopForBooking] = useState<Shop | null>(null);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'info',
      title: isRtl ? 'جاري البحث في المشاغل' : 'Searching Ateliers',
      description: `${heroSearchQuery} in ${heroLocation} (Within ${heroDistance} km)`,
    });
    if (onNavigate) {
      onNavigate('shops');
    } else {
      const el = document.getElementById('nearby-shops');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookFromShop = (shop: Shop) => {
    if (onStartBooking) {
      onStartBooking({ shopId: shop.id });
    } else {
      setSelectedShopForBooking(shop);
      setIsHomeMeasurementOpen(true);
    }
  };

  return (
    <div className="w-full text-start bg-[#FAF9F6] text-[#121316]">
      {/* =========================================================================
          1. HERO SECTION & SMART SEARCH
         ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#121316] via-[#17181F] to-[#121316] text-[#FAF9F6] pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle sartorial matrix background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FAF9F6" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto space-y-8">
          {/* Capability Kicker */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F6]/10 border border-[#FAF9F6]/15 backdrop-blur-xs text-xs font-semibold text-[#C5A880]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isRtl
                  ? 'المنظومة الرقمية المعتمدة للخياطة الرجالية الراقية بالمملكة'
                  : "The Kingdom's Bespoke Men's Tailoring Ecosystem"}
              </span>
            </div>
          </div>

          {/* Main Headline & Supporting Subtitle */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-[#FAF9F6] text-balance">
              {isRtl ? 'اعثر على الخيّاط المناسب بالقرب منك' : 'Find the Right Tailor Near You'}
            </h1>
            <p className="text-sm sm:text-lg text-[#A8A49D] max-w-2xl mx-auto leading-relaxed text-balance">
              {isRtl
                ? 'اكتشف محلات الخياطة والخياطين المحترفين والخدمات والأسعار والتقييمات في مكان واحد.'
                : 'Discover trusted tailoring shops, skilled karigars, real portfolios, services, prices and reviews — all in one place.'}
            </p>
          </div>

          {/* Large Intelligent Marketplace Search Interface */}
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleHeroSearch}
              className="bg-[#FFFFFF] p-3 sm:p-4 rounded-2xl border border-[#E6E2DB] shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2.5 text-[#121316]"
            >
              {/* Field 1: Service / What do you need? */}
              <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#F5F3EF] border border-[#E6E2DB]">
                <Scissors className="w-4 h-4 text-[#916F3E] shrink-0" />
                <div className="w-full">
                  <label className="block text-[10px] uppercase font-bold text-[#8E8B85] leading-none mb-0.5">
                    {isRtl ? 'ما الذي تبحث عنه؟' : 'What do you need?'}
                  </label>
                  <input
                    type="text"
                    value={heroSearchQuery}
                    onChange={(e) => setHeroSearchQuery(e.target.value)}
                    placeholder={isRtl ? 'مثال: ثوب سعودي، دقلة، بشت...' : 'e.g., Saudi Thobe, Dagla, Bisht...'}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#121316] focus:outline-none placeholder-[#8E8B85]"
                  />
                </div>
              </div>

              {/* Field 2: Location */}
              <div className="w-full md:w-52 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#F5F3EF] border border-[#E6E2DB] shrink-0">
                <MapPin className="w-4 h-4 text-[#916F3E] shrink-0" />
                <div className="w-full">
                  <label className="block text-[10px] uppercase font-bold text-[#8E8B85] leading-none mb-0.5">
                    {isRtl ? 'المدينة' : 'Location'}
                  </label>
                  <select
                    value={heroLocation}
                    onChange={(e) => setHeroLocation(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#121316] focus:outline-none cursor-pointer"
                  >
                    <option value="Riyadh">الرياض (Riyadh)</option>
                    <option value="Jeddah">جدة (Jeddah)</option>
                    <option value="Khobar">الخبر (Khobar)</option>
                    <option value="Dammam">الدمام (Dammam)</option>
                    <option value="Makkah">مكة المكرمة (Makkah)</option>
                    <option value="Madinah">المدينة المنورة (Madinah)</option>
                  </select>
                </div>
              </div>

              {/* Field 3: Distance */}
              <div className="w-full md:w-44 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#F5F3EF] border border-[#E6E2DB] shrink-0">
                <div className="w-full">
                  <label className="block text-[10px] uppercase font-bold text-[#8E8B85] leading-none mb-0.5">
                    {isRtl ? 'المسافة' : 'Distance'}
                  </label>
                  <select
                    value={heroDistance}
                    onChange={(e) => setHeroDistance(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#121316] focus:outline-none cursor-pointer"
                  >
                    <option value="5">{isRtl ? 'خلال 5 كم' : 'Within 5 km'}</option>
                    <option value="10">{isRtl ? 'خلال 10 كم' : 'Within 10 km'}</option>
                    <option value="25">{isRtl ? 'خلال 25 كم' : 'Within 25 km'}</option>
                    <option value="all">{isRtl ? 'كافة أنحاء المدينة' : 'Entire City'}</option>
                  </select>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-2 shrink-0">
                <Button type="submit" variant="gold" size="lg" className="w-full md:w-auto px-6">
                  {isRtl ? 'ابحث عن المشاغل' : 'Find Shops'}
                </Button>
              </div>
            </form>

            {/* Secondary Link under Search */}
            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-[#A8A49D]">
              <span>{isRtl ? 'تبحث عن خيّاط مستقل؟' : 'Looking for a master karigar?'}</span>
              <a
                href="#tailors"
                className="text-[#C5A880] hover:text-[#B8935A] underline font-semibold transition-colors"
              >
                {isRtl ? 'استكشف معلّمي التفصيل ←' : 'Explore Master Tailors →'}
              </a>
            </div>
          </div>

          {/* Floating Discovery Visual Badges */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="p-3.5 rounded-xl bg-[#FAF9F6]/10 border border-[#FAF9F6]/15 backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center font-bold shrink-0">
                <Store className="w-5 h-5" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">مشغل المملكة الملكي</p>
                <p className="text-[11px] text-[#C5A880]">2.4 كم · حي العليا، الرياض</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF9F6]/10 border border-[#FAF9F6]/15 backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center font-bold shrink-0">
                <Scissors className="w-5 h-5" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">المعلّم طارق الحسيني</p>
                <p className="text-[11px] text-[#C5A880]">24 عاماً خبرة · قلاب ملكي</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF9F6]/10 border border-[#FAF9F6]/15 backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center font-bold shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">خدمة القياس المنزلي VIP</p>
                <p className="text-[11px] text-[#C5A880]">حضور الخيّاط لمنزلك بأدواته</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CAPABILITY-BASED TRUST STRIP
         ========================================================================= */}
      <section className="bg-[#FFFFFF] border-b border-[#E6E2DB] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FAF9F6]">
            <ShieldCheck className="w-4 h-4 text-[#1E5638] shrink-0" />
            <span className="font-semibold text-[#121316]">
              {isRtl ? 'مشاغل بسجل تجاري' : 'Verified Shops'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FAF9F6]">
            <Award className="w-4 h-4 text-[#916F3E] shrink-0" />
            <span className="font-semibold text-[#121316]">
              {isRtl ? 'معلّمو تفصيل معتمدون' : 'Certified Tailors'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FAF9F6]">
            <Layers className="w-4 h-4 text-[#916F3E] shrink-0" />
            <span className="font-semibold text-[#121316]">
              {isRtl ? 'معرض أعمال وتصاميم' : 'Real Portfolios'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FAF9F6]">
            <CheckCircle2 className="w-4 h-4 text-[#1E5638] shrink-0" />
            <span className="font-semibold text-[#121316]">
              {isRtl ? 'تقييمات طلبات حقيقية' : 'Verified Reviews'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FAF9F6]">
            <Home className="w-4 h-4 text-[#916F3E] shrink-0" />
            <span className="font-semibold text-[#121316]">
              {isRtl ? 'خدمة القياس بالمنزل' : 'Home Measurement'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FAF9F6]">
            <PackageCheck className="w-4 h-4 text-[#1E5638] shrink-0" />
            <span className="font-semibold text-[#121316]">
              {isRtl ? 'متابعة تفصيل الثوب' : 'Order Tracking'}
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. MAIN CONTENT CONTAINER
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* =========================================================================
            SECTION A: NEARBY SHOPS + MAP DISCOVERY
           ========================================================================= */}
        <NearbyShopsMapList
          onBookShop={handleBookFromShop}
          onViewAllShops={() => onNavigate && onNavigate('shops')}
          onViewShop={onSelectShop}
        />

        {/* =========================================================================
            SECTION B: FEATURED MASTER TAILORS (KARIGARS)
           ========================================================================= */}
        <section id="tailors" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DB] pb-4">
            <div>
              <div className="text-xs font-semibold text-[#916F3E] uppercase tracking-wider mb-1">
                {isRtl ? 'كبار معلّمي القص والتفصيل' : 'Master Artisans'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] tracking-tight">
                {isRtl ? 'نُخبة معلّمي التفصيل (كاريغار)' : 'Meet Skilled Tailors'}
              </h2>
              <p className="text-xs sm:text-sm text-[#65625D] mt-1">
                {isRtl
                  ? 'استكشف الحرفيين ومعلّمي القص حسب سنوات الخبرة، التخصص، المشغل الحالي، والتقييمات الموثقة.'
                  : 'Explore professional karigars by experience, specialty, current atelier, and customer satisfaction.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="gold">
                {mockTailors.length} {isRtl ? 'معلّمي تفصيل معتمدين' : 'Master Tailors'}
              </Badge>
              {onNavigate && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('tailors')}
                  icon={isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  {isRtl ? 'استكشاف جميع الخيّاطين' : 'Explore All Tailors'}
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTailors.map((tailor) => (
              <TailorCard
                key={tailor.id}
                tailor={tailor}
                showGoogleRating
                onViewProfile={(tObj) => onSelectTailor && onSelectTailor(tObj)}
                onBookTailor={() => {
                  setSelectedShopForBooking(null);
                  setIsHomeMeasurementOpen(true);
                }}
                onContactTailor={(tObj) =>
                  showToast({
                    type: 'info',
                    title: isRtl ? 'مراسلة الخيّاط' : 'Message Sent',
                    description: `Starting direct inquiry with ${tObj.name}`,
                  })
                }
              />
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION C: SERVICE EXPLORER (10 CATEGORIES WITH SAR PRICING)
           ========================================================================= */}
        <section id="services" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DB] pb-4">
            <div>
              <div className="text-xs font-semibold text-[#916F3E] uppercase tracking-wider mb-1">
                {isRtl ? 'خيارات التفصيل المتنوعة' : 'Tailoring Menu'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] tracking-tight">
                {isRtl ? 'خدمات وتفصيل الملبوسات' : 'Find the Service You Need'}
              </h2>
              <p className="text-xs sm:text-sm text-[#65625D] mt-1">
                {isRtl
                  ? 'اختر الخدمة المطلوبة واطلع على السعر المبدئي بالريال السعودي ومدة التفصيل المعتادة.'
                  : 'Select your tailoring service and review starting prices in Saudi Riyals and turnaround times.'}
              </p>
            </div>

            <span className="text-xs text-[#8E8B85]">
              {isRtl ? 'الأسعار تشمل 15% ضريبة القيمة المضافة' : 'Prices include 15% Saudi VAT'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectService={(serv) => {
                  setIsHomeMeasurementOpen(true);
                  showToast({
                    type: 'success',
                    title: isRtl ? 'تم اختيار الخدمة' : 'Service Selected',
                    description: `${serv.title} - ${serv.startingPriceSar} SAR`,
                  });
                }}
              />
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION D: SARTORIAL PORTFOLIO / DESIGN DISCOVERY
           ========================================================================= */}
        <section id="designs" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DB] pb-4">
            <div>
              <div className="text-xs font-semibold text-[#916F3E] uppercase tracking-wider mb-1">
                {isRtl ? 'معرض الحرفية والتصاميم' : 'Sartorial Gallery'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] tracking-tight">
                {isRtl ? 'أعمال وتصاميم مختارة' : 'Discover Tailoring Work'}
              </h2>
              <p className="text-xs sm:text-sm text-[#65625D] mt-1">
                {isRtl
                  ? 'تصفح صور وتفاصيل الثياب المنفذة: درجات صلابة القلاب، تشطيب الأكمام، وأقمشة التيوبو والشكيبو الأصلية.'
                  : 'Inspect collar stiffness, cuff plackets, embroidery motifs, and authentic Japanese cotton textures.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="gold">
                {mockPortfolio.length} {isRtl ? 'أعمال مسجلة' : 'Bespoke Works'}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate?.('designs')}
                className="hidden sm:inline-flex"
              >
                <span>{isRtl ? 'عرض كل التصاميم' : 'Explore All Designs'}</span>
                <ArrowRight className="w-3.5 h-3.5 ms-1 rtl:rotate-180" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPortfolio.slice(0, 6).map((item) => (
              <DesignCard
                key={item.id}
                design={item}
                onSelectDesign={(d) => {
                  if (onSelectDesign) {
                    onSelectDesign(d);
                  } else {
                    onNavigate?.('designs');
                  }
                }}
                onSelectCreator={(type, slug) => {
                  if (type === 'tailor') {
                    const matched = mockTailors.find((t) => t.slug === slug || t.id === slug);
                    if (matched) onSelectTailor?.(matched);
                  } else {
                    const matched = mockShops.find((s) => s.slug === slug || s.id === slug);
                    if (matched) onSelectShop?.(matched);
                  }
                }}
              />
            ))}
          </div>

          <div className="text-center pt-2 sm:hidden">
            <Button
              variant="outline"
              size="md"
              onClick={() => onNavigate?.('designs')}
              className="w-full justify-center"
            >
              <span>{isRtl ? 'استكشاف جميع التصاميم' : 'Explore All Designs'}</span>
              <ArrowRight className="w-4 h-4 ms-1.5 rtl:rotate-180" />
            </Button>
          </div>
        </section>

        {/* =========================================================================
            SECTION E: OBJECTIVE SHOP COMPARISON MATRIX
           ========================================================================= */}
        <ShopComparisonSection
          onSelectShop={(shopId) => {
            const shop = mockShops.find((s) => s.id === shopId) || mockShops[0];
            handleBookFromShop(shop);
          }}
        />

        {/* =========================================================================
            SECTION F: HOME MEASUREMENT VIP PROMO
           ========================================================================= */}
        <section id="home-measurement" className="bg-[#FFFFFF] rounded-2xl border border-[#E6E2DB] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9F6F0] border border-[#E2D5C3] text-xs font-bold text-[#916F3E]">
                <Home className="w-3.5 h-3.5" />
                <span>{isRtl ? 'خدمة القياس المنزلي المعتمدة' : 'VIP Home Measurement Experience'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold font-display text-[#121316] tracking-tight">
                {isRtl ? 'احجز قياسك في منزلك دون عناء' : 'Get Measured at Home'}
              </h2>

              <p className="text-sm text-[#65625D] leading-relaxed max-w-xl">
                {isRtl
                  ? 'يتوجه إليك معلّم تفصيل خبير من المشغل ومعه حقيبة عينات الأقمشة اليابانية والإنجليزية الفاخرة لأخذ مقاساتك بدقة متناهية وتسجيلها في ملفك الرقمي.'
                  : 'A master tailor visits your residence equipped with genuine Japanese and British fabric swatches, capturing your personalized measurement profile.'}
              </p>

              {/* 4 Steps Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-[#24262E]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5638] shrink-0" />
                  <span>{isRtl ? 'تحديد الموعد والفترة المناسبة' : 'Choose date and preferred time slot'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#24262E]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5638] shrink-0" />
                  <span>{isRtl ? 'إحضار عينات أقمشة تيوبو وشكيبو' : 'Bring authentic Toyobo/Shikibo swatches'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#24262E]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5638] shrink-0" />
                  <span>{isRtl ? 'أخذ مقاسات الياقة والأكمام بالمللي' : 'Exact millimeter neck & cuff tailoring'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#24262E]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E5638] shrink-0" />
                  <span>{isRtl ? 'حفظ القياس الدائم لطلباتك القادمة' : 'Saved permanent profile for repeat orders'}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => setIsHomeMeasurementOpen(true)}
                  icon={<Calendar className="w-4 h-4" />}
                >
                  {isRtl ? 'احجز موعد قياس منزلي' : 'Book Home Measurement'}
                </Button>

                <span className="text-xs text-[#8E8B85]">
                  {isRtl ? 'الخدمة متوفرة في الرياض وجدة والخبر' : 'Available across Riyadh, Jeddah & Khobar'}
                </span>
              </div>
            </div>

            {/* Visual Tailoring Bag / Fitting Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-[#E6E2DB] shadow-md bg-[#121316] p-6 text-[#FAF9F6] text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880]">
                  <Ruler className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {isRtl ? 'حقيبة خيّاط المعتمدة' : 'Official Artisan Fitting Kit'}
                  </h4>
                  <p className="text-xs text-[#A8A49D] mt-1">
                    {isRtl
                      ? 'أشرطة قياس ليزرية، نماذج للياقات الملكية، وعينات الأقمشة الأصلية.'
                      : 'Laser measuring tools, collar templates, and genuine mill swatches.'}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF9F6]/10 text-[11px] text-[#C5A880] font-medium border border-[#FAF9F6]/10">
                  {isRtl ? 'خدمة مجانية عند اعتماد تفصيل ثوبين فأكثر' : 'Complimentary on orders of 2+ thobes'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION G: GULF STYLES EXPLORER
           ========================================================================= */}
        <GulfStylesExplorer
          onSelectStyle={(styleId) => {
            showToast({
              type: 'info',
              title: isRtl ? 'استكشاف النمط' : 'Regional Style',
              description: `Filtering ateliers specializing in ${styleId} thobes.`,
            });
            const el = document.getElementById('nearby-shops');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* =========================================================================
            SECTION H: HOW IT WORKS (6-STEP CLEAR PROCESS)
           ========================================================================= */}
        <HowItWorksSection />

        {/* =========================================================================
            SECTION I: THREE-SIDED MARKETPLACE ECOSYSTEM
           ========================================================================= */}
        <ThreeSidedEcosystem />

        {/* =========================================================================
            SECTION J: CLIENT & TAILOR REVIEWS (COMMUNITY TRUST)
           ========================================================================= */}
        <section id="reviews" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DB] pb-4">
            <div>
              <div className="text-xs font-semibold text-[#916F3E] uppercase tracking-wider mb-1">
                {isRtl ? 'ثقة وتجارب العملاء' : 'Community Reviews'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#121316] tracking-tight">
                {isRtl ? 'تقييمات موثقة لطلبات حقيقية' : 'Verified Client & Tailor Reviews'}
              </h2>
              <p className="text-xs sm:text-sm text-[#65625D] mt-1">
                {isRtl
                  ? 'آراء العملاء الحقيقية المرتبطة بطلبات منفذة ومسلمة بالفعل عبر المنصة.'
                  : 'Authentic reviews tied directly to completed bespoke orders across our partner salons.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="verified">
                100% {isRtl ? 'تقييمات طلبات مؤكدة' : 'Confirmed Orders'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION K: FINAL THREE-SIDED MARKETPLACE CTA
           ========================================================================= */}
        <section className="bg-gradient-to-br from-[#121316] via-[#1B1C22] to-[#121316] text-[#FAF9F6] rounded-3xl p-8 sm:p-14 text-center space-y-6 border border-[#24262E] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#C5A880] tracking-wider uppercase">
              {isRtl ? 'ابدأ تجربة التفصيل الفاخرة' : 'Bespoke Craftsmanship Awaits'}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-[#FAF9F6] text-balance">
              {isRtl ? 'ثوبك القادم يبدأ باختيار الخيّاط المناسب' : 'Your Next Thobe Starts With the Right Tailor.'}
            </h2>

            <p className="text-xs sm:text-base text-[#A8A49D] max-w-xl mx-auto leading-relaxed text-balance">
              {isRtl
                ? 'اكتشف المشاغل الموثقة، وأمهر الحرفيين، وخدمات أخذ القياس المنزلي في الرياض وجدة والخبر.'
                : 'Discover trusted salons, skilled karigars, and bespoke home fitting services in your city.'}
            </p>

            {/* Three Options reinforcing the 3-sided marketplace */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="gold"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('nearby-shops');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {isRtl ? 'ابحث عن خيّاط' : 'Find a Tailor'}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={openRoleModal}
                className="bg-[#24262E] text-white border-[#3D404D] hover:bg-[#2C2E38]"
              >
                {isRtl ? 'سجّل دار الخياطة' : 'List Your Shop'}
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={openRoleModal}
                className="text-[#C5A880] hover:text-white"
              >
                {isRtl ? 'انضم كمعلّم تفصيل' : 'Join as a Tailor'}
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          INTERACTIVE DRAWERS & MODALS
         ========================================================================= */}
      <HomeMeasurementDrawer
        isOpen={isHomeMeasurementOpen}
        onClose={() => setIsHomeMeasurementOpen(false)}
        shopName={selectedShopForBooking ? (isRtl ? selectedShopForBooking.nameAr : selectedShopForBooking.name) : undefined}
      />

      <RoleSelectorModal isOpen={isRoleModalOpen} onClose={closeRoleModal} />
    </div>
  );
};
