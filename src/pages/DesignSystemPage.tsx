import React, { useState } from 'react';
import {
  Palette,
  Type,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  SlidersHorizontal,
  Table as TableIcon,
  Layers,
  LayoutDashboard,
  Sparkles,
  Search,
  MapPin,
  Calendar,
  Clock,
  ThumbsUp,
  Bookmark,
  Share2,
  ShieldCheck,
  Award,
  FileCheck,
  User,
  Store,
  Scissors,
  Eye,
  RotateCcw,
} from 'lucide-react';

import { tokens } from '../styles/tokens';
import { useLanguage } from '../localization/LanguageContext';
import { useRole } from '../components/role/RoleContext';
import { useToast } from '../components/feedback/Toast';
import { mockShops, mockTailors, mockPortfolio, mockServices, mockReviews } from '../data/mock';

// UI Components
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Tabs } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Rating, RatingDistribution } from '../components/ui/Rating';
import { PriceDisplay } from '../components/ui/PriceDisplay';
import { StatusIndicator } from '../components/ui/StatusIndicator';
import { Modal } from '../components/ui/Modal';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import { Drawer } from '../components/ui/Drawer';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Pagination } from '../components/ui/Pagination';
import { DataTable } from '../components/ui/DataTable';

// Forms
import { Textarea } from '../components/forms/Textarea';
import { SearchInput } from '../components/forms/SearchInput';
import { NumberInput } from '../components/forms/NumberInput';
import { PhoneInput } from '../components/forms/PhoneInput';
import { DateInput } from '../components/forms/DateInput';
import { TimeInput } from '../components/forms/TimeInput';
import { Checkbox } from '../components/forms/Checkbox';
import { Radio } from '../components/forms/Radio';
import { Switch } from '../components/forms/Switch';
import { FileUpload } from '../components/forms/FileUpload';

// Trust & Location
import { VerificationBadge } from '../components/trust/VerificationBadge';
import { TrustMetric } from '../components/trust/TrustMetric';
import { LocationBadge } from '../components/location/LocationBadge';
import { MapPlaceholder } from '../components/location/MapPlaceholder';

// Marketplace
import { ShopCard } from '../components/marketplace/ShopCard';
import { TailorCard } from '../components/marketplace/TailorCard';
import { PortfolioCard } from '../components/marketplace/PortfolioCard';
import { ServiceCard } from '../components/marketplace/ServiceCard';
import { ReviewCard } from '../components/marketplace/ReviewCard';
import { MarketplaceSearchFilter } from '../components/marketplace/MarketplaceSearchFilter';

// Navigation & Headers
import { Sidebar } from '../components/navigation/Sidebar';
import { DashboardHeader } from '../components/navigation/DashboardHeader';
import { MarketplaceHeader } from '../components/navigation/MarketplaceHeader';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';

// Feedback
import { Alert } from '../components/feedback/Alert';
import { Banner } from '../components/feedback/Banner';
import { Skeleton, CardSkeleton } from '../components/feedback/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';

export const DesignSystemPage: React.FC = () => {
  const { t, language, isRtl, toggleLanguage } = useLanguage();
  const { activeRole, openRoleModal, setActiveRole } = useRole();
  const { showToast } = useToast();

  // Navigation section anchor
  const [activeSection, setActiveSection] = useState('colors');

  // Interactive UI component test states
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [radioVal, setRadioVal] = useState('opt1');
  const [switchVal, setSwitchVal] = useState(true);
  const [numberVal, setNumberVal] = useState(145);
  const [searchInputVal, setSearchInputVal] = useState('');
  const [paginationPage, setPaginationPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Table sample data
  const tableData = [
    { id: 'ORD-1041', customer: 'Fahad Al-Otaibi', service: 'Royal Saudi Thobe', shop: 'Al-Mamlaka Royal', status: 'In Cutting', price: '380 SAR' },
    { id: 'ORD-1042', customer: 'Saud Al-Qahtani', service: 'Winter Cashmere Dagla', shop: 'Dar Al-Nokhba', status: 'Fitting Ready', price: '850 SAR' },
    { id: 'ORD-1043', customer: 'Abdulaziz Al-Dossary', service: 'Ceremonial Bisht', shop: 'Al-Khobar Heritage', status: 'Delivered', price: '1,600 SAR' },
    { id: 'ORD-1044', customer: 'Mansour Al-Harbi', service: 'Toyobo 5000 Thobe', shop: 'Al-Mamlaka Royal', status: 'Measurements Taken', price: '420 SAR' },
  ];

  const tableColumns = [
    { key: 'id', header: isRtl ? 'رقم الطلب' : 'Order ID', sortable: true },
    { key: 'customer', header: isRtl ? 'العميل' : 'Customer', sortable: true },
    { key: 'service', header: isRtl ? 'الخدمة' : 'Service' },
    { key: 'shop', header: isRtl ? 'المشغل' : 'Atelier' },
    {
      key: 'status',
      header: isRtl ? 'الحالة' : 'Status',
      accessor: (row: any) => (
        <Badge variant={row.status === 'Delivered' ? 'verified' : 'gold'} size="xs">
          {row.status}
        </Badge>
      ),
    },
    { key: 'price', header: isRtl ? 'السعر' : 'Amount', align: 'end' as const },
  ];

  const sectionsList = [
    { id: 'colors', label: '1. Colors' },
    { id: 'typography', label: '2. Typography' },
    { id: 'spacing', label: '3. Spacing & Radius' },
    { id: 'buttons', label: '4. Buttons' },
    { id: 'forms', label: '5. Form Controls' },
    { id: 'ratings', label: '6. Ratings & Distribution' },
    { id: 'prices', label: '7. Price System' },
    { id: 'trust', label: '8. Trust & Badges' },
    { id: 'location', label: '9. Location & Map' },
    { id: 'marketplace-cards', label: '10. Marketplace Cards' },
    { id: 'reviews', label: '11. Review Cards' },
    { id: 'search-filters', label: '12. Search & Filter Bar' },
    { id: 'navigation-headers', label: '13. Navigation & Headers' },
    { id: 'sidebar', label: '14. Dashboard Sidebar' },
    { id: 'tables', label: '15. Data Tables' },
    { id: 'feedback', label: '16. Alerts, Toasts & Banners' },
    { id: 'modals', label: '17. Modals & Drawers' },
    { id: 'arabic-rtl', label: '18. Arabic RTL Verification' },
  ];

  return (
    <div className="w-full bg-[#FAF9F6] text-[#121316] text-start">
      {/* Top System QA Bar */}
      <section className="bg-[#121316] text-[#FAF9F6] border-b border-[#24262E] py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A880] tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 02 — Design System & Application Shell QA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-[#FAF9F6]">
              KHAYYAT Design System Specification
            </h1>
            <p className="text-xs sm:text-sm text-[#8E8B85] mt-1">
              Production design tokens, semantic components, dual rating system, Arabic RTL parity, and application shell variants.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="bg-[#24262E] text-white border-[#3D404D] hover:bg-[#2C2E38]"
            >
              {language === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}
            </Button>

            <Button
              variant="gold"
              size="sm"
              onClick={openRoleModal}
            >
              {t.common.activeRole}: {activeRole}
            </Button>
          </div>
        </div>

        {/* Quick Anchor Jumper */}
        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-[#24262E] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {sectionsList.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={() => setActiveSection(sec.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeSection === sec.id
                  ? 'bg-[#C5A880] text-[#121316] font-bold'
                  : 'text-[#A8A49D] hover:text-white hover:bg-[#24262E]'
              }`}
            >
              {sec.label}
            </a>
          ))}
        </div>
      </section>

      {/* Main Spec Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        {/* 1. COLOR TOKENS */}
        <section id="colors" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">1. Centralized Color Tokens</h2>
            <p className="text-xs text-[#65625D]">
              Deep charcoal dominant, warm ivory secondary, refined champagne gold accent (&lt;10%), and semantic state tokens.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <div className="p-3 bg-[#121316] text-white rounded-xl border border-[#121316]">
              <div className="h-12 w-full rounded-md bg-[#121316] mb-2" />
              <p className="text-xs font-bold">Deep Charcoal</p>
              <p className="text-[10px] font-mono text-[#8E8B85]">#121316</p>
              <span className="text-[10px] text-[#C5A880]">Primary Surface</span>
            </div>

            <div className="p-3 bg-[#FAF9F6] text-[#121316] rounded-xl border border-[#E6E2DB]">
              <div className="h-12 w-full rounded-md bg-[#FAF9F6] border border-[#E6E2DB] mb-2" />
              <p className="text-xs font-bold">Warm Ivory</p>
              <p className="text-[10px] font-mono text-[#8E8B85]">#FAF9F6</p>
              <span className="text-[10px] text-[#65625D]">Canvas BG</span>
            </div>

            <div className="p-3 bg-[#FFFFFF] text-[#121316] rounded-xl border border-[#E6E2DB]">
              <div className="h-12 w-full rounded-md bg-[#C5A880] mb-2" />
              <p className="text-xs font-bold">Champagne Gold</p>
              <p className="text-[10px] font-mono text-[#8E8B85]">#C5A880</p>
              <span className="text-[10px] text-[#916F3E]">Primary Accent</span>
            </div>

            <div className="p-3 bg-[#FFFFFF] text-[#121316] rounded-xl border border-[#E6E2DB]">
              <div className="h-12 w-full rounded-md bg-[#F2F7F4] border border-[#CDE3D5] flex items-center justify-center text-[#1E5638] font-bold text-xs mb-2">
                #1E5638
              </div>
              <p className="text-xs font-bold">Success Green</p>
              <p className="text-[10px] text-[#1E5638]">Verified / Active</p>
            </div>

            <div className="p-3 bg-[#FFFFFF] text-[#121316] rounded-xl border border-[#E6E2DB]">
              <div className="h-12 w-full rounded-md bg-[#FBF6EE] border border-[#ECD8B6] flex items-center justify-center text-[#8A5814] font-bold text-xs mb-2">
                #8A5814
              </div>
              <p className="text-xs font-bold">Warning Amber</p>
              <p className="text-[10px] text-[#8A5814]">Pending Fitting</p>
            </div>

            <div className="p-3 bg-[#FFFFFF] text-[#121316] rounded-xl border border-[#E6E2DB]">
              <div className="h-12 w-full rounded-md bg-[#FEF3F2] border border-[#FECDCA] flex items-center justify-center text-[#B42318] font-bold text-xs mb-2">
                #B42318
              </div>
              <p className="text-xs font-bold">Error Red</p>
              <p className="text-[10px] text-[#B42318]">Action Alert</p>
            </div>
          </div>
        </section>

        {/* 2. TYPOGRAPHY HIERARCHY */}
        <section id="typography" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">2. Typography Hierarchy (Arabic & Latin)</h2>
            <p className="text-xs text-[#65625D]">
              Carefully calibrated type scale balancing English Playfair/Jakarta with Arabic IBM Plex.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] space-y-4">
            <div className="border-b border-[#F2EFE9] pb-3 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-[#8E8B85]">Display (40px)</span>
              <p className="text-3xl sm:text-4xl font-bold font-display text-[#121316]">
                Bespoke Sartorial Mastery · دار الخياطة الراقية
              </p>
            </div>

            <div className="border-b border-[#F2EFE9] pb-3 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-[#8E8B85]">H1 (32px)</span>
              <p className="text-2xl sm:text-3xl font-bold text-[#121316]">
                Kingdom Tailoring Marketplace · منصة التفصيل السعودي
              </p>
            </div>

            <div className="border-b border-[#F2EFE9] pb-3 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-[#8E8B85]">H2 (24px)</span>
              <p className="text-xl sm:text-2xl font-semibold text-[#121316]">
                Certified Master Cutters · معلّمو التفصيل المعتمدون
              </p>
            </div>

            <div className="border-b border-[#F2EFE9] pb-3 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-[#8E8B85]">Body Regular (15px)</span>
              <p className="text-sm sm:text-base text-[#65625D] leading-relaxed max-w-3xl">
                Impeccable drape crafted from Toyobo 5000 and Shikibo Japanese cottons with custom royal collars.
                أثواب سعودية منسوجة بأجود الأقطان اليابانية مع ياقات ملكية متقنة وضمان دقة المقاس من البروفة الأولى.
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-[#8E8B85]">Numbers & Prices</span>
              <p className="text-lg font-bold text-[#121316] tabular-nums">
                380.00 SAR · 24,500 Completed Orders · 4.95 Rating
              </p>
            </div>
          </div>
        </section>

        {/* 3. BUTTON SYSTEM */}
        <section id="buttons" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">3. Comprehensive Button System</h2>
            <p className="text-xs text-[#65625D]">
              All 8 variants with Small, Medium, Large sizes and Default, Hover, Focus, Disabled, and Loading states.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] space-y-6">
            <div>
              <h4 className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider mb-3">Variants</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Charcoal</Button>
                <Button variant="gold">Gold Accent</Button>
                <Button variant="secondary">Secondary Ivory</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger Action</Button>
                <Button variant="success">Success State</Button>
                <Button variant="link">Sartorial Link</Button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F2EFE9]">
              <h4 className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider mb-3">Sizes & States</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" variant="primary">Small (32px)</Button>
                <Button size="md" variant="primary">Medium (40px)</Button>
                <Button size="lg" variant="primary">Large (48px)</Button>
                <Button size="md" variant="primary" isLoading>Loading State</Button>
                <Button size="md" variant="primary" disabled>Disabled State</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FORM CONTROLS SYSTEM */}
        <section id="forms" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">4. Reusable Form Controls</h2>
            <p className="text-xs text-[#65625D]">
              Input, Textarea, SearchInput, Select, NumberInput, PhoneInput (+966), Date/Time, Checkbox, Radio, Switch, and FileUpload.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label={isRtl ? 'اسم العميل الكامل' : 'Client Full Name'}
                placeholder="Fahad Al-Otaibi"
                helperText="Enter name as per national ID"
              />
              <PhoneInput
                label={isRtl ? 'رقم الجوال السعودي' : 'Saudi Mobile Number'}
                helperText="Supported by local SMS verification"
              />
              <Select
                label={isRtl ? 'المدينة' : 'Select City'}
                options={[
                  { value: 'Riyadh', label: 'Riyadh (الرياض)' },
                  { value: 'Jeddah', label: 'Jeddah (جدة)' },
                  { value: 'Khobar', label: 'Al-Khobar (الخبر)' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DateInput label={isRtl ? 'تاريخ موعد القياس' : 'Fitting Appointment Date'} />
              <TimeInput label={isRtl ? 'وقت الزيارة المفضل' : 'Preferred Appointment Time'} />
              <NumberInput
                label={isRtl ? 'طول الثوب (سم)' : 'Thobe Length (cm)'}
                value={numberVal}
                onChange={setNumberVal}
                unit="cm"
                min={100}
                max={180}
              />
            </div>

            <Textarea
              label={isRtl ? 'ملاحظات تفصيل الياقة والأزرار' : 'Bespoke Fitting Specifications'}
              placeholder="e.g., Stiff royal collar 4.5cm, double French cuffs for cufflinks, pen pocket on chest..."
              rows={3}
            />

            {/* Checkbox, Radio, Switch toggles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F2EFE9]">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider block mb-1">Checkboxes</span>
                <Checkbox
                  label={isRtl ? 'خدمة القياس المنزلي VIP' : 'VIP Home Fitting Service'}
                  description={isRtl ? 'حضور الخيّاط لمنزلك' : 'Master cutter visits your residence'}
                  checked={checkboxVal}
                  onChange={(e) => setCheckboxVal(e.target.checked)}
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider block mb-1">Radio Group</span>
                <Radio
                  label="Toyobo Cotton 100%"
                  checked={radioVal === 'opt1'}
                  onChange={() => setRadioVal('opt1')}
                />
                <Radio
                  label="British Wool 400g"
                  checked={radioVal === 'opt2'}
                  onChange={() => setRadioVal('opt2')}
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider block mb-1">Switches</span>
                <Switch
                  label={isRtl ? 'المشغل مفتوح الآن' : 'Atelier Open Now'}
                  checked={switchVal}
                  onChange={setSwitchVal}
                />
              </div>
            </div>

            {/* File Upload mock */}
            <div className="pt-4 border-t border-[#F2EFE9]">
              <FileUpload label={isRtl ? 'رفع جدول القياسات أو تصميم خاص' : 'Upload Measurement Sheet or Custom Reference'} />
            </div>
          </div>
        </section>

        {/* 5. RATING SYSTEM & GOOGLE SEPARATION */}
        <section id="ratings" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">5. Rating System & Source Separation</h2>
            <p className="text-xs text-[#65625D]">
              Strictly separate Platform Rating vs Google Rating, 5-star & half-star rendering, and distribution breakdown.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] space-y-4">
              <h4 className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider">Separate Rating Concepts</h4>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#121316]">Platform Atelier Rating:</span>
                  <Rating score={4.9} reviewCount={312} size="md" entityType="shop" />
                </div>

                <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#121316]">Google Places Rating (Distinguishable):</span>
                  <Rating score={4.8} reviewCount={145} size="md" source="google" />
                </div>

                <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#121316]">Master Tailor Rating:</span>
                  <Rating score={4.95} reviewCount={88} size="md" entityType="tailor" />
                </div>
              </div>
            </div>

            <RatingDistribution
              score={4.92}
              totalReviews={420}
              distribution={{ 5: 88, 4: 9, 3: 2, 2: 1, 1: 0 }}
            />
          </div>
        </section>

        {/* 6. PRICE SYSTEM */}
        <section id="prices" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">6. Saudi Riyal Price System</h2>
            <p className="text-xs text-[#65625D]">
              Fixed price, Starting from, Price range, Custom quote, and Free with tabular numbers.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB]">
              <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider block mb-1">Fixed Price</span>
              <PriceDisplay amount={380} size="lg" />
            </div>

            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB]">
              <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider block mb-1">Starting From</span>
              <PriceDisplay amount={320} mode="starting_from" size="lg" />
            </div>

            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB]">
              <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider block mb-1">Price Range</span>
              <PriceDisplay amount={250} maxAmount={450} mode="range" size="lg" />
            </div>

            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB]">
              <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider block mb-1">Custom Quote</span>
              <PriceDisplay mode="custom_quote" size="lg" />
            </div>

            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E6E2DB]">
              <span className="text-[10px] text-[#8E8B85] uppercase tracking-wider block mb-1">Free Consultation</span>
              <PriceDisplay mode="free" size="lg" />
            </div>
          </div>
        </section>

        {/* 7. TRUST & LOCATION */}
        <section id="trust" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">7. Trust Badges & Location System</h2>
            <p className="text-xs text-[#65625D]">
              Clear visual trust architecture reflecting commercial compliance and physical inspection.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] text-center space-y-1">
              <VerificationBadge type="verified_shop" size="sm" />
              <p className="text-[11px] text-[#8E8B85]">Physical Salon Checked</p>
            </div>

            <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] text-center space-y-1">
              <VerificationBadge type="verified_tailor" size="sm" />
              <p className="text-[11px] text-[#8E8B85]">Artisan Credentials</p>
            </div>

            <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] text-center space-y-1">
              <VerificationBadge type="verified_business" size="sm" />
              <p className="text-[11px] text-[#8E8B85]">CR & VAT Compliant</p>
            </div>

            <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] text-center space-y-1">
              <VerificationBadge type="verified_location" size="sm" />
              <p className="text-[11px] text-[#8E8B85]">Verified GPS Address</p>
            </div>

            <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] text-center space-y-1">
              <VerificationBadge type="verified_order_review" size="sm" />
              <p className="text-[11px] text-[#8E8B85]">Genuine Client Order</p>
            </div>
          </div>
        </section>

        {/* 8. MARKETPLACE SEARCH & FILTER */}
        <section id="search-filters" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">8. Integrated Search & Filter System</h2>
            <p className="text-xs text-[#65625D]">
              Desktop large search bar with embedded city picker + filter drawer trigger and mobile drawer.
            </p>
          </div>

          <MarketplaceSearchFilter
            onSearch={(q, f) => {
              showToast({
                type: 'success',
                title: isRtl ? 'تم تطبيق الفلاتر' : 'Filters Applied',
                description: `Search: "${q || 'All'}" in ${f.city} (Max: ${f.maxPrice} SAR)`,
              });
            }}
          />
        </section>

        {/* 9. MARKETPLACE ENTITY CARDS */}
        <section id="marketplace-cards" className="space-y-6">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">9. Reusable Marketplace Cards</h2>
            <p className="text-xs text-[#65625D]">
              Shop Card, Tailor Card, Portfolio Card, and Service Card with dual action triggers and responsive grid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ShopCard
              shop={mockShops[0]}
              showGoogleRating
              onBookShop={(s) =>
                showToast({
                  type: 'info',
                  title: isRtl ? 'حجز موعد قياس' : 'Book Measurement',
                  description: `Booking appointment at ${s.name}`,
                })
              }
            />

            <TailorCard
              tailor={mockTailors[0]}
              showGoogleRating
              onBookTailor={(t) =>
                showToast({
                  type: 'gold' as any,
                  title: isRtl ? 'طلب جلسة خاصة' : 'VIP Consultation',
                  description: `Booking private session with ${t.name}`,
                })
              }
              onContactTailor={(t) =>
                showToast({
                  type: 'info',
                  title: isRtl ? 'إرسال رسالة' : 'Message Tailor',
                  description: `Connecting with ${t.name}`,
                })
              }
            />

            <PortfolioCard item={mockPortfolio[0]} />
          </div>
        </section>

        {/* 10. REVIEW CARD SYSTEM */}
        <section id="reviews" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">10. Customer Review Card System</h2>
            <p className="text-xs text-[#65625D]">
              Displaying customer avatar, rating, date, verified order badge, review comment, and helpfulness counter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        </section>

        {/* 11. DATA TABLE SYSTEM */}
        <section id="tables" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">11. Reusable Dashboard Data Table</h2>
            <p className="text-xs text-[#65625D]">
              Columns, sorting, search filter, status badges, row actions, and responsive pagination.
            </p>
          </div>

          <DataTable
            data={tableData}
            columns={tableColumns}
            keyExtractor={(row) => row.id}
            searchPlaceholder={isRtl ? 'بحث في سجل الطلبات...' : 'Search orders table...'}
            itemsPerPage={3}
            rowActions={[
              {
                label: isRtl ? 'معاينة' : 'Inspect',
                onClick: (row) =>
                  showToast({
                    type: 'info',
                    title: `Inspecting ${row.id}`,
                    description: `${row.customer} - ${row.service}`,
                  }),
              },
            ]}
          />
        </section>

        {/* 12. SIDEBAR & NAVIGATION SYSTEM */}
        <section id="sidebar" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">12. Dashboard Navigation & Sidebar</h2>
            <p className="text-xs text-[#65625D]">
              Collapsible desktop sidebar, tooltips in collapsed state, role-specific menus (Shop Owner, Tailor, Customer, Admin).
            </p>
          </div>

          <div className="rounded-xl border border-[#E6E2DB] overflow-hidden bg-[#F5F3EF]">
            <DashboardHeader
              title={isRtl ? 'لوحة تحكم الطلبات والتفصيل' : 'Atelier Production Dashboard'}
              unreadNotifications={3}
              unreadMessages={2}
            />

            <div className="flex h-80 bg-[#FAF9F6]">
              <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
              />
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center text-[#8E8B85]">
                <LayoutDashboard className="w-8 h-8 text-[#C5A880] mb-2" />
                <p className="text-xs font-medium text-[#121316]">
                  {isRtl ? 'المحتوى النشط للوحة التحكم' : 'Active Dashboard Viewport'}
                </p>
                <p className="text-[11px] text-[#8E8B85]">
                  Sidebar adapts automatically to the selected user role: <span className="font-bold text-[#121316] uppercase">{activeRole}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 13. FEEDBACK SYSTEM (ALERTS, TOASTS, SKELETONS) */}
        <section id="feedback" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">13. Feedback System (Alerts, Toasts, Skeletons)</h2>
            <p className="text-xs text-[#65625D]">
              Toast triggers, inline alerts, top banners, and loading skeletons.
            </p>
          </div>

          <div className="space-y-4">
            <Banner
              actionLabel={isRtl ? 'حجز بروفة' : 'Book Fitting'}
              onAction={() =>
                showToast({
                  type: 'success',
                  title: isRtl ? 'تم فتح حجز البروفة' : 'Fitting Drawer Opened',
                  description: isRtl
                    ? 'تم توجيه طلبك لخدمة القياس الفوري'
                    : 'Your fitting request has been initialized',
                })
              }
            >
              {isRtl
                ? 'موسم الأعياد: خدمة القياس المنزلي السريع متاحة الآن في الرياض وجدة.'
                : 'Seasonal Rush: Express 48h Home Fitting available in Riyadh & Jeddah ateliers.'}
            </Banner>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  showToast({
                    type: 'success',
                    title: isRtl ? 'تم الحفظ بنجاح' : 'Success',
                    description: isRtl ? 'تم تحديث مقاسات الثوب في ملفك' : 'Measurements saved successfully.',
                  })
                }
              >
                Trigger Success Toast
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  showToast({
                    type: 'error',
                    title: isRtl ? 'تعذر إتمام الطلب' : 'Error Alert',
                    description: isRtl ? 'يرجى التحقق من صحة رقم الجوال' : 'Please check required fields.',
                  })
                }
              >
                Trigger Error Toast
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  showToast({
                    type: 'warning',
                    title: isRtl ? 'تنبيه موعد القياس' : 'Appointment Reminder',
                    description: isRtl ? 'موعد الخيّاط غداً الساعة 4:00 عصراً' : 'Fitting tomorrow at 4:00 PM.',
                  })
                }
              >
                Trigger Warning Toast
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsConfirmOpen(true)}
              >
                Open Confirmation Dialog
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Alert variant="success" title={isRtl ? 'مشغل معتمد من وزارة التجارة' : 'Commercial Registry Verified'}>
                {isRtl
                  ? 'تم التحقق من السجل التجاري والرقم الضريبي لمشغل المملكة الملكي.'
                  : 'Official verification completed via Saudi Ministry of Commerce guidelines.'}
              </Alert>

              <Alert variant="warning" title={isRtl ? 'تنبيه بخصوص موسم الأعراس' : 'High Volume Season'}>
                {isRtl
                  ? 'نظراً للطلب المرتفع، نوصي بحجز مواعيد القياس قبل أسبوع على الأقل.'
                  : 'Due to festive demand, bespoke thobe delivery may require 5 business days.'}
              </Alert>
            </div>

            {/* Skeletons Demo */}
            <div>
              <h4 className="text-xs font-bold text-[#8E8B85] uppercase tracking-wider mb-2">Skeleton Loaders</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CardSkeleton />
                <CardSkeleton className="hidden md:block" />
                <CardSkeleton className="hidden lg:block" />
              </div>
            </div>
          </div>
        </section>

        {/* 14. ARABIC RTL PARITY SPECIMEN */}
        <section id="arabic-rtl" className="space-y-4">
          <div className="border-b border-[#E6E2DB] pb-2">
            <h2 className="text-xl font-bold text-[#121316]">14. Arabic RTL Layout & Typography Parity</h2>
            <p className="text-xs text-[#65625D]">
              Verifying that text alignment, icon placement, directional borders, and numbers conform to Saudi Gulf standards.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB] text-start space-y-4" dir="rtl">
            <div className="flex items-center justify-between pb-3 border-b border-[#F2EFE9]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E5638]" />
                <span className="text-xs font-bold text-[#121316]">معاينة واجهة اللغة العربية (RTL كامل)</span>
              </div>
              <Badge variant="gold">المملكة العربية السعودية</Badge>
            </div>

            <p className="text-sm text-[#343742] leading-relaxed">
              تضمن المنصة أن تجربة المستخدم باللغة العربية مبنية بأصالة وليست مجرد ترجمة حرفية. يتم عكس كافة المحاذاة، الأيقونات، حقول الإدخال، وعناصر التصفية بدقة متناهية مع اعتماد خط IBM Plex Sans Arabic المعتمد في الهويات الرقمية الحكومية والفاخرة بالمملكة.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button variant="primary" size="sm">تأكيد حجز القياس</Button>
              <Button variant="gold" size="sm">استكشاف أقمشة تويوبو</Button>
              <PriceDisplay amount={450} size="md" />
              <StatusIndicator status="open" label="المشغل يستقبل العملاء الآن" />
            </div>
          </div>
        </section>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          showToast({
            type: 'error',
            title: isRtl ? 'تم تأكيد الإلغاء' : 'Confirmed',
            description: isRtl ? 'تم إلغاء الطلب التجريبي بنجاح' : 'Demo order cancelled.',
          });
        }}
        title={isRtl ? 'هل أنت متأكد من إلغاء الموعد؟' : 'Cancel Fitting Appointment?'}
        description={
          isRtl
            ? 'سيتم إشعار المشغل والخيّاط بإلغاء زيارة القياس المنزلي المحددة مسبقاً.'
            : 'The atelier and tailor will be notified immediately of this cancellation.'
        }
        confirmText={isRtl ? 'نعم، قم بالإلغاء' : 'Yes, Cancel Appointment'}
      />
    </div>
  );
};
