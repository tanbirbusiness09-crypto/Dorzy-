import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  MapPin,
  UserCheck,
  CheckCircle,
  Eye,
  Search,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';
import { useLanguage } from '../localization/LanguageContext';
import { useRole } from '../components/role/RoleContext';
import { mockShops, mockTailors, mockPortfolio, mockServices } from '../data/mock';

// UI Components
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Tabs } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Rating } from '../components/ui/Rating';
import { PriceDisplay } from '../components/ui/PriceDisplay';
import { StatusIndicator } from '../components/ui/StatusIndicator';
import { Modal } from '../components/ui/Modal';
import { Drawer } from '../components/ui/Drawer';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Pagination } from '../components/ui/Pagination';

// Trust & Location
import { VerificationBadge, VerificationType } from '../components/trust/VerificationBadge';
import { TrustMetric } from '../components/trust/TrustMetric';
import { LocationBadge } from '../components/location/LocationBadge';
import { MapPlaceholder } from '../components/location/MapPlaceholder';

// Marketplace Cards
import { ShopCard } from '../components/marketplace/ShopCard';
import { TailorCard } from '../components/marketplace/TailorCard';
import { PortfolioCard } from '../components/marketplace/PortfolioCard';
import { ServiceCard } from '../components/marketplace/ServiceCard';

// Role Components
import { RoleSelectorModal } from '../components/role/RoleSelectorModal';

export const FoundationPreview: React.FC = () => {
  const { t, language, isRtl, toggleLanguage } = useLanguage();
  const { activeRole, openRoleModal, isRoleModalOpen, closeRoleModal } = useRole();

  // Interactive component states for testing
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [sampleInputVal, setSampleInputVal] = useState('Prince Sultan St, Al-Olaya');
  const [sampleCity, setSampleCity] = useState('Riyadh');
  const [paginationPage, setPaginationPage] = useState(1);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isDemoDrawerOpen, setIsDemoDrawerOpen] = useState(false);
  const [selectedEntityDetails, setSelectedEntityDetails] = useState<string | null>(null);

  const cityOptions = [
    { value: 'all', label: isRtl ? 'كافة مدن المملكة' : 'All Saudi Cities' },
    { value: 'Riyadh', label: isRtl ? 'الرياض (العاصمة)' : 'Riyadh (Capital)' },
    { value: 'Jeddah', label: isRtl ? 'جدة (عروس البحر الأحمر)' : 'Jeddah' },
    { value: 'Khobar', label: isRtl ? 'الخبر (المنطقة الشرقية)' : 'Al-Khobar' },
    { value: 'Dammam', label: isRtl ? 'الدمام' : 'Dammam' },
    { value: 'Makkah', label: isRtl ? 'مكة المكرمة' : 'Makkah' },
    { value: 'Madinah', label: isRtl ? 'المدينة المنورة' : 'Madinah' },
  ];

  const categoryTabs = [
    { id: 'all', label: isRtl ? 'كافة الخدمات' : 'All Services', count: 4 },
    { id: 'thobe', label: isRtl ? 'ثياب سعودية' : 'Saudi Thobes', count: 2 },
    { id: 'winter', label: isRtl ? 'دقلات وشتاء' : 'Winter & Dagla', count: 1 },
    { id: 'ceremonial', label: isRtl ? 'بشوت ومناسبات' : 'Ceremonial Bisht', count: 1 },
  ];

  return (
    <div className="w-full">
      {/* Platform Step 01 Banner (Clean, editorial, no tech-slop) */}
      <section className="bg-[#121316] text-[#FAF9F6] border-b border-[#24262E] py-12 sm:py-16 text-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C5A880] tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.common.demoNotice}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-[#FAF9F6]">
                {t.preview.title}
              </h1>
              <p className="text-sm sm:text-base text-[#A8A49D] leading-relaxed">
                {t.preview.subtitle}
              </p>
            </div>

            {/* Global quick actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="gold"
                size="md"
                onClick={openRoleModal}
                icon={<UserCheck className="w-4 h-4" />}
              >
                {t.common.switchRole}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={toggleLanguage}
                className="bg-[#24262E] text-white border-[#3D404D] hover:bg-[#2C2E38]"
              >
                {language === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}
              </Button>
            </div>
          </div>

          {/* Breadcrumb specimen */}
          <div className="mt-8 pt-6 border-t border-[#24262E]">
            <Breadcrumb
              items={[
                { label: t.navigation.home },
                { label: 'Foundation & Design System' },
                { label: `Step 01 (${language.toUpperCase()})` },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* 1. Core UI Tokens Specimen */}
        <section className="space-y-6 text-start">
          <div className="border-b border-[#E6E2DB] pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#121316] tracking-tight">
              {t.preview.sectionUi}
            </h2>
            <p className="text-xs sm:text-sm text-[#65625D] mt-1">
              Reusable atomic controls engineered for touch targets 40px or greater, visible focus states, and zero-pill discipline.
            </p>
          </div>

          {/* Buttons & Affordances */}
          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] space-y-4">
            <h3 className="text-xs font-semibold text-[#8E8B85] uppercase tracking-wider">
              {t.preview.buttonGroup}
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="md">
                Primary Charcoal
              </Button>
              <Button variant="gold" size="md">
                Champagne Gold Accent
              </Button>
              <Button variant="secondary" size="md">
                Secondary Warm Gray
              </Button>
              <Button variant="outline" size="md">
                Outline Sartorial
              </Button>
              <Button variant="ghost" size="md">
                Ghost Action
              </Button>
              <Button variant="primary" size="md" isLoading>
                Loading State
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDemoModalOpen(true)}
              >
                Open Demo Modal
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsDemoDrawerOpen(true)}
              >
                Open Slide Drawer
              </Button>
            </div>
          </div>

          {/* Form Controls, Inputs & Selects */}
          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] space-y-4">
            <h3 className="text-xs font-semibold text-[#8E8B85] uppercase tracking-wider">
              {t.preview.inputsGroup}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label={isRtl ? 'عنوان القياس المنزلي' : 'Home Measurement Location'}
                value={sampleInputVal}
                onChange={(e) => setSampleInputVal(e.target.value)}
                leftIcon={<MapPin className="w-4 h-4" />}
                helperText={isRtl ? 'حدد شارعك وحيك في الرياض' : 'Specify district and street name'}
              />
              <Select
                label={isRtl ? 'مدينة المشغل / الحرفي' : 'Select Saudi City'}
                value={sampleCity}
                onChange={(e) => setSampleCity(e.target.value)}
                options={cityOptions}
                helperText={isRtl ? 'نظام جغرافي موزع لكافة مناطق المملكة' : 'Geographic routing'}
              />
              <Input
                label={isRtl ? 'البحث السريع عن خيّاط' : 'Quick Search Tailor'}
                placeholder={t.navigation.searchPlaceholder}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
          </div>

          {/* Segmented Filter Control & Badges */}
          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xs font-semibold text-[#8E8B85] uppercase tracking-wider mb-2">
                  {t.preview.tabsGroup}
                </h3>
                <Tabs
                  tabs={categoryTabs}
                  activeTab={activeCategoryTab}
                  onChange={setActiveCategoryTab}
                />
              </div>

              {/* Pagination Demo */}
              <div>
                <h3 className="text-xs font-semibold text-[#8E8B85] uppercase tracking-wider mb-2">
                  Pagination Control
                </h3>
                <Pagination
                  currentPage={paginationPage}
                  totalPages={4}
                  onPageChange={setPaginationPage}
                />
              </div>
            </div>

            {/* Zero-Pill Metadata & Badges Demonstration */}
            <div className="pt-4 border-t border-[#F2EFE9] space-y-3">
              <h3 className="text-xs font-semibold text-[#8E8B85] uppercase tracking-wider">
                {t.preview.badgeGroup}
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <StatusIndicator status="open" label={t.common.openNow} />
                <StatusIndicator status="closed" label={t.common.closed} />
                <StatusIndicator status="warning" label="In Fitting البروفة الأولى" />
                <Badge variant="neutral">Classic Thobe</Badge>
                <Badge variant="gold">Imperial Class A</Badge>
                <Badge variant="verified">Commercial Registry Verified</Badge>

                {/* Clean unboxed inline metadata */}
                <div className="flex items-center gap-2 text-xs text-[#65625D] bg-[#F5F3EF] px-3 py-1.5 rounded-lg border border-[#E6E2DB]">
                  <span className="font-semibold text-[#121316]">Toyobo 5000</span>
                  <span aria-hidden="true" className="text-[#C5A880]">·</span>
                  <span>Pure Cotton 100%</span>
                  <span aria-hidden="true" className="text-[#C5A880]">·</span>
                  <span className="tabular-nums">140g/m²</span>
                  <span aria-hidden="true" className="text-[#C5A880]">·</span>
                  <span className="text-[#1E5638] font-medium">Summer Weight</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Trust, Verification & Location System */}
        <section className="space-y-6 text-start">
          <div className="border-b border-[#E6E2DB] pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#121316] tracking-tight">
              {t.preview.sectionTrust}
            </h2>
            <p className="text-xs sm:text-sm text-[#65625D] mt-1">
              Visual trust hierarchy reflecting Saudi Ministry of Commerce registration, physical shop inspection, and verified orders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] space-y-2">
              <VerificationBadge type="verified_shop" size="md" />
              <p className="text-xs text-[#65625D] mt-1">
                Verified physical atelier inspection & commercial registration.
              </p>
            </div>

            <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] space-y-2">
              <VerificationBadge type="verified_tailor" size="md" />
              <p className="text-xs text-[#65625D] mt-1">
                Verified master tailor artisan credentials & portfolio review.
              </p>
            </div>

            <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] space-y-2">
              <VerificationBadge type="verified_business" size="md" />
              <p className="text-xs text-[#65625D] mt-1">
                Saudi Ministry of Commerce CR & ZATCA 15% VAT certified.
              </p>
            </div>

            <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] space-y-2">
              <VerificationBadge type="verified_order_review" size="md" />
              <p className="text-xs text-[#65625D] mt-1">
                Reviews authentic to confirmed platform tailoring orders.
              </p>
            </div>
          </div>

          {/* Interactive Map Component Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MapPlaceholder
                title={isRtl ? 'مشغل المملكة الملكي' : 'Al-Mamlaka Royal Atelier'}
                city={isRtl ? 'الرياض' : 'Riyadh'}
                district={isRtl ? 'العليا' : 'Al-Olaya'}
                address={
                  isRtl
                    ? 'طريق الأمير سلطان بن عبدالعزيز، حي العليا، الرياض 12221'
                    : 'Prince Sultan Bin Abdulaziz Rd, Al-Olaya, Riyadh 12221'
                }
                lat={24.7012}
                lng={46.6854}
                distanceKm={2.4}
                className="h-[320px]"
              />
            </div>

            {/* Trust Metrics Column */}
            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E6E2DB] flex flex-col justify-around gap-4">
              <h3 className="text-sm font-bold text-[#121316]">
                {isRtl ? 'مؤشرات الموثوقية' : 'Platform Trust Metrics'}
              </h3>
              <TrustMetric
                label={isRtl ? 'متوسط تقييم المشاغل المعتمدة' : 'Verified Ateliers Rating'}
                value={4.94}
                suffix="/ 5.0"
              />
              <TrustMetric
                label={isRtl ? 'أثواب سعودية منجزة للتجربة' : 'Bespoke Thobes Completed'}
                value={12780}
              />
              <TrustMetric
                label={isRtl ? 'نسبة الالتزام بموعد التسليم' : 'On-Time Fitting Delivery'}
                value={98.8}
                suffix="%"
              />
            </div>
          </div>
        </section>

        {/* 3. Reusable Marketplace Components: Shop Cards */}
        <section className="space-y-6 text-start">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DB] pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#121316] tracking-tight">
                {t.marketplace.featuredShops}
              </h2>
              <p className="text-xs sm:text-sm text-[#65625D] mt-1">
                Responsive 3-column shop atelier cards displaying verified badge, distance, starting price, and capabilities.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="gold">
                {mockShops.length} {isRtl ? 'مشاغل معتمدة' : 'Ateliers'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                onViewShop={(s) =>
                  setSelectedEntityDetails(
                    isRtl
                      ? `تم اختيار المشغل: ${s.nameAr} (${s.location.cityAr})`
                      : `Selected Atelier: ${s.name} (${s.location.city})`
                  )
                }
              />
            ))}
          </div>
        </section>

        {/* 4. Reusable Marketplace Components: Tailor / Karigar Cards */}
        <section className="space-y-6 text-start">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DB] pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#121316] tracking-tight">
                {t.marketplace.featuredTailors}
              </h2>
              <p className="text-xs sm:text-sm text-[#65625D] mt-1">
                Individual master tailors (Karigars) showing experience years, specialties, rating, and current atelier.
              </p>
            </div>
            <Badge variant="gold">
              {mockTailors.length} {isRtl ? 'معلّمي خياطة' : 'Master Tailors'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTailors.map((tailor) => (
              <TailorCard
                key={tailor.id}
                tailor={tailor}
                onViewProfile={(tObj) =>
                  setSelectedEntityDetails(
                    isRtl
                      ? `الملف المهني للمعلّم: ${tObj.nameAr} (${tObj.titleAr})`
                      : `Tailor Profile: ${tObj.name} (${tObj.title})`
                  )
                }
              />
            ))}
          </div>
        </section>

        {/* 5. Reusable Marketplace Components: Portfolio Cards */}
        <section className="space-y-6 text-start">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DB] pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#121316] tracking-tight">
                {t.marketplace.curatedPortfolios}
              </h2>
              <p className="text-xs sm:text-sm text-[#65625D] mt-1">
                Bespoke garment portfolio pieces detailing collar stiffness, cuff cut, fabric origin, and save affordance.
              </p>
            </div>
            <Badge variant="gold">
              {mockPortfolio.length} {isRtl ? 'تصاميم مختارة' : 'Showcases'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockPortfolio.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* 6. Reusable Marketplace Components: Tailoring Services */}
        <section className="space-y-6 text-start">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6E2DB] pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#121316] tracking-tight">
                {t.marketplace.bespokeServices}
              </h2>
              <p className="text-xs sm:text-sm text-[#65625D] mt-1">
                Service cards with starting price, estimated days, fabric options, and home fitting indicators.
              </p>
            </div>
            <Badge variant="neutral">
              {mockServices.length} {isRtl ? 'خدمات تفصيل' : 'Tailoring Services'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectService={(serv) =>
                  setSelectedEntityDetails(
                    isRtl
                      ? `تم اختيار الخدمة: ${serv.titleAr} - ${serv.startingPriceSar} ر.س`
                      : `Selected Service: ${serv.title} - ${serv.startingPriceSar} SAR`
                  )
                }
              />
            ))}
          </div>
        </section>

        {/* Interactive feedback notice when user tests cards */}
        {selectedEntityDetails && (
          <div className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E2D5C3] text-start flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-[#916F3E] font-medium">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>{selectedEntityDetails}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedEntityDetails(null)}
            >
              {t.common.close}
            </Button>
          </div>
        )}
      </div>

      {/* Role Selection Modal */}
      <RoleSelectorModal isOpen={isRoleModalOpen} onClose={closeRoleModal} />

      {/* Test Modal */}
      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title={isRtl ? 'نافذة حوارية تفاعلية' : 'Accessible Interactive Modal'}
        description={
          isRtl
            ? 'مكون حواري ممتثل لمعايير الوصول (Escape key, ARIA dialog, Backdrop trap).'
            : 'Dialog component compliant with WCAG accessibility standards.'
        }
      >
        <div className="space-y-4 text-start">
          <p className="text-xs sm:text-sm text-[#65625D] leading-relaxed">
            {isRtl
              ? 'تم تصميم هذه النافذة لاستخدامها في تأكيد حجوزات القياس المنزلي، إرسال مقترحات التعاون بين المشاغل والخيّاطين، وعرض تفاصيل الأقمشة.'
              : 'Designed for booking confirmations, collaboration proposals between ateliers and tailors, and fabric specifications.'}
          </p>
          <div className="flex justify-end gap-2 pt-4 border-t border-[#E6E2DB]">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsDemoModalOpen(false)}
            >
              {t.common.close}
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsDemoModalOpen(false)}
            >
              {t.common.submit}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Test Slide-over Drawer */}
      <Drawer
        isOpen={isDemoDrawerOpen}
        onClose={() => setIsDemoDrawerOpen(false)}
        title={isRtl ? 'لوحة التصفية الجانبية' : 'Slide-over Filter Drawer'}
      >
        <div className="space-y-6 text-start">
          <p className="text-xs text-[#65625D]">
            {isRtl
              ? 'تستخدم هذه اللوحة في تصفية المشاغل على الأجهزة المحمولة وحفظ القياسات.'
              : 'Used for mobile filters, measurement profiles, and appointment drawers.'}
          </p>

          <Input
            label={isRtl ? 'المدينة' : 'City'}
            value={sampleCity}
            onChange={(e) => setSampleCity(e.target.value)}
          />

          <Select
            label={isRtl ? 'نوع القماش المفضل' : 'Preferred Fabric'}
            options={[
              { value: 'toyobo', label: 'Toyobo Japanese Cotton (تيوبو ياباني)' },
              { value: 'shikibo', label: 'Shikibo Ultra-Soft (شكيبو ياباني)' },
              { value: 'english_wool', label: 'English Wool 400g (صوف إنجليزي)' },
            ]}
          />

          <div className="pt-4 border-t border-[#E6E2DB]">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => setIsDemoDrawerOpen(false)}
            >
              {isRtl ? 'تطبيق التصفية' : 'Apply Filters'}
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
