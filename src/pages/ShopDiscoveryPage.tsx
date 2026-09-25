import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  List,
  Map as MapIcon,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  Calendar,
  AlertCircle,
  Scissors,
  CheckCircle2,
} from 'lucide-react';

import { useLanguage } from '../localization/LanguageContext';
import { useToast } from '../components/feedback/Toast';
import { mockShops } from '../data/mock/shops';
import { Shop } from '../types';
import { DiscoveryFilterState, initialDiscoveryFilterState, SortOption } from '../types/discovery';
import { sortOptionsList } from '../data/mock/filters';
import { saudiCitiesData } from '../data/mock/locations';

// Components
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { ShopCard } from '../components/marketplace/ShopCard';
import { ShopDiscoveryFilters } from '../components/marketplace/ShopDiscoveryFilters';
import { ShopDiscoveryMap } from '../components/marketplace/ShopDiscoveryMap';
import { ComparisonBar } from '../components/marketplace/ComparisonBar';
import { Drawer } from '../components/ui/Drawer';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { CardSkeleton } from '../components/feedback/Skeleton';
import { Pagination } from '../components/ui/Pagination';
import { HomeMeasurementDrawer } from '../components/marketplace/HomeMeasurementDrawer';
import { ShopComparisonSection } from '../components/marketplace/ShopComparisonSection';
import { ShopQuickViewDrawer } from '../components/marketplace/ShopQuickViewDrawer';

export interface ShopDiscoveryPageProps {
  onNavigateToShopProfile?: (shop: Shop) => void;
}

export const ShopDiscoveryPage: React.FC<ShopDiscoveryPageProps> = ({
  onNavigateToShopProfile,
}) => {
  const { t, isRtl } = useLanguage();
  const { showToast } = useToast();

  // Centralized Discovery Filter State with URL Query Architecture
  const [filters, setFilters] = useState<DiscoveryFilterState>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const initial = { ...initialDiscoveryFilterState };

      const service = params.get('service');
      if (service) initial.services = [service];

      const location = params.get('location') || params.get('city');
      if (location) initial.city = location;

      const sort = params.get('sort');
      if (sort) initial.sort = sort as SortOption;

      const rating = params.get('rating');
      if (rating) initial.ratingMin = parseFloat(rating) || 0;

      const homeMeasurement = params.get('homeMeasurement');
      if (homeMeasurement === 'true' || homeMeasurement === 'available') {
        initial.homeMeasurement = 'available';
      }

      const q = params.get('q') || params.get('search');
      if (q) initial.searchQuery = q;

      const distance = params.get('distance');
      if (distance) initial.distanceKm = parseInt(distance, 10) || 50;

      return initial;
    } catch {
      return initialDiscoveryFilterState;
    }
  });

  const [keywordInput, setKeywordInput] = useState(filters.searchQuery || '');
  
  // UI Interaction States
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewShop, setQuickViewShop] = useState<Shop | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [savedShopIds, setSavedShopIds] = useState<string[]>([]);
  const [compareShopIds, setCompareShopIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Loading & Error simulator states
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Booking Drawer State
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false);
  const [bookingShop, setBookingShop] = useState<Shop | null>(null);

  // Sync state to URL Query Parameters for Architecture readiness
  useEffect(() => {
    try {
      const params = new URLSearchParams();
      if (filters.searchQuery) params.set('search', filters.searchQuery);
      if (filters.city !== 'all') params.set('location', filters.city);
      if (filters.services.length > 0) params.set('service', filters.services.join(','));
      if (filters.sort !== 'recommended') params.set('sort', filters.sort);
      if (filters.ratingMin > 0) params.set('rating', filters.ratingMin.toString());
      if (filters.homeMeasurement === 'available') params.set('homeMeasurement', 'true');
      if (filters.distanceKm < 50) params.set('distance', filters.distanceKm.toString());

      const newRelativePathQuery = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
      window.history.replaceState(null, '', newRelativePathQuery);
    } catch {
      // safe fallback in restricted test environments
    }
  }, [filters]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Compute Active Filters Count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.city !== 'all') count++;
    if (filters.neighborhood !== 'all') count++;
    if (filters.distanceKm < 50) count++;
    if (filters.services.length > 0) count += filters.services.length;
    if (filters.fabrics.length > 0) count += filters.fabrics.length;
    if (filters.ratingMin > 0) count++;
    if (filters.priceMax < 1500) count++;
    if (filters.homeMeasurement === 'available') count++;
    if (filters.openNow) count++;
    if (filters.searchQuery.trim()) count++;
    return count;
  }, [filters]);

  // Filter & Sort Logic
  const filteredShops = useMemo(() => {
    return mockShops.filter((shop) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchName = shop.name.toLowerCase().includes(q) || shop.nameAr.includes(q);
        const matchService = shop.featuredServices.some((s) => s.toLowerCase().includes(q)) ||
                             shop.featuredServicesAr.some((s) => s.includes(q));
        const matchDistrict = shop.location.district.toLowerCase().includes(q) || shop.location.districtAr.includes(q);
        if (!matchName && !matchService && !matchDistrict) return false;
      }

      // 2. City
      if (filters.city !== 'all' && shop.location.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // 3. Neighborhood
      if (filters.neighborhood !== 'all' && shop.location.district.toLowerCase() !== filters.neighborhood.toLowerCase()) {
        return false;
      }

      // 4. Distance
      if (shop.location.distanceKm && shop.location.distanceKm > filters.distanceKm) {
        return false;
      }

      // 5. Rating
      if (filters.ratingMin > 0 && shop.metrics.rating < filters.ratingMin) {
        return false;
      }

      // 6. Price
      if (shop.startingPriceSar > filters.priceMax) {
        return false;
      }

      // 7. Services (multi-select)
      if (filters.services.length > 0) {
        const hasAnyService = filters.services.some((serv) =>
          shop.featuredServices.some((s) => s.toLowerCase().includes(serv.toLowerCase()))
        );
        if (!hasAnyService) return false;
      }

      // 8. Fabrics (multi-select)
      if (filters.fabrics.length > 0) {
        const hasAnyFabric = filters.fabrics.some((fab) =>
          shop.fabrics?.some((f) => f.toLowerCase().includes(fab.toLowerCase()))
        );
        if (!hasAnyFabric) return false;
      }

      // 9. Home Measurement
      if (filters.homeMeasurement === 'available' && !shop.hasHomeMeasurement) {
        return false;
      }

      // 10. Open Now
      if (filters.openNow && !shop.operatingHours.isOpenNow) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sort) {
        case 'nearest':
          return (a.location.distanceKm || 0) - (b.location.distanceKm || 0);
        case 'highest_rated':
          return b.metrics.rating - a.metrics.rating;
        case 'lowest_price':
          return a.startingPriceSar - b.startingPriceSar;
        case 'highest_price':
          return b.startingPriceSar - a.startingPriceSar;
        case 'most_reviewed':
          return b.metrics.reviewCount - a.metrics.reviewCount;
        case 'most_experienced':
          return b.metrics.yearsOfExperience - a.metrics.yearsOfExperience;
        case 'recommended':
        default:
          return b.metrics.rating * b.metrics.reviewCount - a.metrics.rating * a.metrics.reviewCount;
      }
    });
  }, [filters]);

  // Paginated records
  const totalPages = Math.max(1, Math.ceil(filteredShops.length / itemsPerPage));
  const paginatedShops = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredShops.slice(start, start + itemsPerPage);
  }, [filteredShops, currentPage, itemsPerPage]);

  // Save / Bookmark Toggle
  const handleToggleSave = (shop: Shop) => {
    const isSaved = savedShopIds.includes(shop.id);
    if (isSaved) {
      setSavedShopIds((prev) => prev.filter((id) => id !== shop.id));
      showToast({
        type: 'info',
        title: isRtl ? 'تمت الإزالة من المفضلة' : 'Removed from Saved',
        description: isRtl ? `تمت إزالة ${shop.nameAr} من قائمتك` : `Removed ${shop.name}`,
      });
    } else {
      setSavedShopIds((prev) => [...prev, shop.id]);
      showToast({
        type: 'success',
        title: isRtl ? 'تم الحفظ في المفضلة' : 'Saved to Favorites',
        description: isRtl ? `تمت إضافة ${shop.nameAr} لقائمتك` : `Added ${shop.name}`,
      });
    }
  };

  // Compare Toggle (Max 3)
  const handleToggleCompare = (shop: Shop) => {
    const isSelected = compareShopIds.includes(shop.id);
    if (isSelected) {
      setCompareShopIds((prev) => prev.filter((id) => id !== shop.id));
    } else {
      if (compareShopIds.length >= 3) {
        showToast({
          type: 'warning',
          title: isRtl ? 'الحد الأقصى للمقارنة' : 'Comparison Limit Reached',
          description: isRtl
            ? 'يمكنك مقارنة 3 مشاغل كحد أقصى في وقت واحد.'
            : 'You can compare up to 3 ateliers at once.',
        });
        return;
      }
      setCompareShopIds((prev) => [...prev, shop.id]);
      showToast({
        type: 'info',
        title: isRtl ? 'تمت الإضافة للمقارنة' : 'Added to Compare',
        description: isRtl ? `${shop.nameAr} (${compareShopIds.length + 1}/3)` : `${shop.name} (${compareShopIds.length + 1}/3)`,
      });
    }
  };

  const handleClearAllFilters = () => {
    setFilters(initialDiscoveryFilterState);
    setKeywordInput('');
    showToast({
      type: 'info',
      title: isRtl ? 'تمت إعادة ضبط الفلاتر' : 'Filters Cleared',
      description: isRtl ? 'عرض كافة المشاغل المسجلة بالمملكة' : 'Showing all ateliers',
    });
  };

  const handleOpenBooking = (shop: Shop) => {
    setBookingShop(shop);
    setIsBookingDrawerOpen(true);
  };

  const handleOpenQuickView = (shop: Shop) => {
    setQuickViewShop(shop);
    setSelectedShop(shop);
    setIsQuickViewOpen(true);
  };

  // Compare shops list objects
  const selectedCompareShops = useMemo(() => {
    return mockShops.filter((s) => compareShopIds.includes(s.id));
  }, [compareShopIds]);

  return (
    <div className="w-full bg-[#FAF9F6] text-[#121316] text-start min-h-screen">
      {/* 1. Top Breadcrumb & Page Header */}
      <section className="bg-[#FFFFFF] border-b border-[#E6E2DB] pt-6 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Breadcrumb
            items={[
              { label: isRtl ? 'الرئيسية' : 'Home', href: '/' },
              { label: isRtl ? 'استكشاف المشاغل' : 'Discover Ateliers' },
              { label: filters.city !== 'all' ? filters.city : isRtl ? 'كافة المدن' : 'All Cities' },
            ]}
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-[#121316]">
                {isRtl ? 'ابحث عن محلات الخياطة القريبة منك' : 'Find Tailoring Shops Near You'}
              </h1>
              <p className="text-xs sm:text-sm text-[#65625D] mt-1.5 max-w-2xl leading-relaxed">
                {isRtl
                  ? 'قارن بين المشاغل حسب الموقع، الخدمات، الأسعار، التقييمات وخيارات التفصيل.'
                  : 'Compare shops by location, services, prices, ratings, and bespoke tailoring options.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-[#8E8B85] bg-[#F5F3EF] px-3 py-1.5 rounded-lg border border-[#E6E2DB] tabular-nums">
                {filteredShops.length} {isRtl ? 'مشاغل مطابقة' : 'ateliers available'}
              </span>
            </div>
          </div>

          {/* 2. Compact Discovery Search Bar Module */}
          <div className="pt-2">
            <div className="bg-[#FAF9F6] p-2 sm:p-2.5 rounded-xl border border-[#E6E2DB] flex flex-col md:flex-row items-stretch md:items-center gap-2">
              {/* Keyword / Service Search */}
              <div className="relative flex-1 flex items-center">
                <Search className="w-4 h-4 absolute start-3 text-[#8E8B85]" />
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setFilters((prev) => ({ ...prev, searchQuery: keywordInput }));
                    }
                  }}
                  placeholder={isRtl ? 'ما الذي تبحث عنه؟ (ثوب سعودي، كويتي، دقلة...)' : 'What do you need? (Saudi Thobe, Dagla...)'}
                  className="w-full bg-white text-xs sm:text-sm py-2.5 ps-9 pe-3 rounded-lg border border-[#E6E2DB] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {/* City Selection Dropdown */}
              <div className="w-full md:w-48 flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#E6E2DB] shrink-0">
                <MapPin className="w-3.5 h-3.5 text-[#916F3E] shrink-0" />
                <select
                  value={filters.city}
                  onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value, neighborhood: 'all' }))}
                  className="w-full bg-transparent text-xs font-semibold text-[#121316] focus:outline-none cursor-pointer"
                >
                  <option value="all">{isRtl ? 'كافة المدن' : 'All Cities'}</option>
                  {saudiCitiesData.map((c) => (
                    <option key={c.id} value={c.id}>
                      {isRtl ? c.nameAr : c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Trigger Button */}
              <Button
                variant="gold"
                size="md"
                onClick={() => setFilters((prev) => ({ ...prev, searchQuery: keywordInput }))}
                className="shrink-0"
              >
                {isRtl ? 'بحث' : 'Search'}
              </Button>
            </div>
          </div>

          {/* 3. Active Search Summary Chips */}
          {activeFiltersCount > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#8E8B85] text-[11px] font-medium">
                {isRtl ? 'الفلاتر النشطة:' : 'Active Filters:'}
              </span>

              {filters.searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F3EF] border border-[#E6E2DB] text-[#121316]">
                  <span>&ldquo;{filters.searchQuery}&rdquo;</span>
                  <button onClick={() => { setFilters((p) => ({ ...p, searchQuery: '' })); setKeywordInput(''); }}>
                    <X className="w-3 h-3 text-[#8E8B85] hover:text-[#121316]" />
                  </button>
                </span>
              )}

              {filters.city !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F3EF] border border-[#E6E2DB] text-[#121316]">
                  <span>{filters.city}</span>
                  <button onClick={() => setFilters((p) => ({ ...p, city: 'all' }))}>
                    <X className="w-3 h-3 text-[#8E8B85] hover:text-[#121316]" />
                  </button>
                </span>
              )}

              {filters.distanceKm < 50 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F3EF] border border-[#E6E2DB] text-[#121316]">
                  <span>{isRtl ? `خلال ${filters.distanceKm} كم` : `Within ${filters.distanceKm} km`}</span>
                  <button onClick={() => setFilters((p) => ({ ...p, distanceKm: 50 }))}>
                    <X className="w-3 h-3 text-[#8E8B85] hover:text-[#121316]" />
                  </button>
                </span>
              )}

              {filters.services.map((serv) => (
                <span key={serv} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F5F3EF] border border-[#E6E2DB] text-[#121316]">
                  <span>{serv}</span>
                  <button onClick={() => setFilters((p) => ({ ...p, services: p.services.filter((s) => s !== serv) }))}>
                    <X className="w-3 h-3 text-[#8E8B85] hover:text-[#121316]" />
                  </button>
                </span>
              ))}

              {filters.homeMeasurement === 'available' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F2F7F4] border border-[#CDE3D5] text-[#1E5638] font-medium">
                  <span>{isRtl ? 'قياس منزلي' : 'Home Measurement'}</span>
                  <button onClick={() => setFilters((p) => ({ ...p, homeMeasurement: 'all' }))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.ratingMin > 0 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F9F6F0] border border-[#E2D5C3] text-[#916F3E] font-medium">
                  <span>★ {filters.ratingMin}+</span>
                  <button onClick={() => setFilters((p) => ({ ...p, ratingMin: 0 }))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleClearAllFilters}
                className="text-[11px] text-[#B42318] hover:underline font-semibold ms-1 cursor-pointer"
              >
                {isRtl ? 'مسح الكل' : 'Clear All'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. Filter Toolbar & Results Sorting Bar */}
      <section className="bg-[#FFFFFF] border-b border-[#E6E2DB] px-4 sm:px-6 lg:px-8 py-3 sticky top-16 sm:top-20 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Mobile Filter Button Trigger */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E6E2DB] bg-[#FAF9F6] text-xs font-semibold text-[#121316] cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#916F3E]" />
              <span>{isRtl ? 'تصفية' : 'Filters'}</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#121316] text-white text-[10px] flex items-center justify-center tabular-nums">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Mobile View Toggle (List vs Map) */}
            <div className="flex lg:hidden items-center p-0.5 rounded-lg bg-[#F5F3EF] border border-[#E6E2DB]">
              <button
                type="button"
                onClick={() => setMobileView('list')}
                className={`p-1.5 rounded-md text-xs font-semibold cursor-pointer ${
                  mobileView === 'list' ? 'bg-[#121316] text-white' : 'text-[#65625D]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileView('map')}
                className={`p-1.5 rounded-md text-xs font-semibold cursor-pointer ${
                  mobileView === 'map' ? 'bg-[#121316] text-white' : 'text-[#65625D]'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs text-[#65625D]">
              <span className="font-bold text-[#121316] tabular-nums">{filteredShops.length}</span>
              <span>{isRtl ? 'مشاغل معتمدة مطابقة' : 'verified ateliers found'}</span>
            </div>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8E8B85] hidden sm:inline">{isRtl ? 'ترتيب النتائج:' : 'Sort by:'}</span>
            <div className="relative">
              <select
                value={filters.sort}
                onChange={(e) => setFilters((p) => ({ ...p, sort: e.target.value as SortOption }))}
                className="bg-[#F5F3EF] border border-[#E6E2DB] rounded-lg py-1.5 ps-3 pe-8 text-xs font-semibold text-[#121316] focus:outline-none cursor-pointer"
              >
                {sortOptionsList.map((s) => (
                  <option key={s.value} value={s.value}>
                    {isRtl ? s.labelAr : s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Main Discovery Layout (Sidebar + Results + Map) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Filter Sidebar (3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 bg-[#FFFFFF] p-5 rounded-2xl border border-[#E6E2DB] shadow-xs sticky top-36">
            <ShopDiscoveryFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleClearAllFilters}
            />
          </aside>

          {/* Main Results + Map Area (9 cols) */}
          <section className="lg:col-span-9 space-y-6">
            {/* Desktop Split View: Shop List (~45%) + Map (~55%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Shop Result Cards */}
              <div
                className={`lg:col-span-5 space-y-4 ${
                  mobileView === 'map' ? 'hidden lg:block' : 'block'
                }`}
              >
                {isLoading ? (
                  <div className="space-y-4">
                    <CardSkeleton />
                    <CardSkeleton />
                  </div>
                ) : hasError ? (
                  <div className="p-8 text-center bg-white rounded-xl border border-red-200 space-y-3">
                    <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
                    <h3 className="text-sm font-bold text-[#121316]">
                      {isRtl ? 'تعذر تحميل المشاغل' : 'Unable to load ateliers'}
                    </h3>
                    <p className="text-xs text-[#65625D]">
                      {isRtl ? 'حدث خطأ مؤقت أثناء الاتصال' : 'A temporary error occurred.'}
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setHasError(false)}>
                      {isRtl ? 'إعادة المحاولة' : 'Retry'}
                    </Button>
                  </div>
                ) : paginatedShops.length === 0 ? (
                  <EmptyState
                    icon={<Scissors className="w-6 h-6" />}
                    title={isRtl ? 'لا توجد مشاغل مطابقة لمعاييرك' : 'No ateliers match your filters'}
                    description={
                      isRtl
                        ? 'حاول توسيع نطاق المسافة الجغرافية أو إزالة بعض الفلاتر لعرض مزيد من الخيارات.'
                        : 'Try increasing your distance limit or clearing some filters to explore more options.'
                    }
                    actionLabel={isRtl ? 'إعادة ضبط كافة الفلاتر' : 'Reset All Filters'}
                    onAction={handleClearAllFilters}
                  />
                ) : (
                  paginatedShops.map((shop) => (
                    <div
                      key={shop.id}
                      onMouseEnter={() => setSelectedShop(shop)}
                      onClick={() => setSelectedShop(shop)}
                    >
                      <ShopCard
                        shop={shop}
                        showGoogleRating
                        showPortfolioPreview
                        isSaved={savedShopIds.includes(shop.id)}
                        onToggleSave={handleToggleSave}
                        isCompareSelected={compareShopIds.includes(shop.id)}
                        onToggleCompare={handleToggleCompare}
                        onBookShop={handleOpenBooking}
                        onViewShop={() => handleOpenQuickView(shop)}
                      />
                    </div>
                  ))
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && !isLoading && (
                  <div className="pt-4 border-t border-[#E6E2DB] flex items-center justify-between gap-3">
                    <span className="text-xs text-[#8E8B85]">
                      {isRtl ? `صفحة ${currentPage} من ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
                    </span>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </div>

              {/* Right Column: Interactive Map Preview */}
              <div
                className={`lg:col-span-7 lg:sticky lg:top-36 ${
                  mobileView === 'list' ? 'hidden lg:block' : 'block'
                }`}
              >
                <ShopDiscoveryMap
                  shops={filteredShops}
                  selectedShop={selectedShop}
                  onSelectShop={(s) => setSelectedShop(s)}
                  onBookShop={handleOpenBooking}
                  onViewShopDetails={(s) => handleOpenQuickView(s)}
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* 6. Sticky Bottom Comparison Bar */}
      <ComparisonBar
        selectedShops={selectedCompareShops}
        onRemoveShop={(id) => setCompareShopIds((prev) => prev.filter((sId) => sId !== id))}
        onClearAll={() => setCompareShopIds([])}
        onCompareNow={() => setIsCompareModalOpen(true)}
      />

      {/* 7. Mobile Filter Drawer */}
      <Drawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title={isRtl ? 'تصفية خيارات المشاغل' : 'Filter Tailoring Salons'}
      >
        <ShopDiscoveryFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleClearAllFilters}
          onCloseMobileDrawer={() => setIsMobileFilterOpen(false)}
        />
      </Drawer>

      {/* 8. Comparison Preview Modal */}
      <Modal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        maxWidth="2xl"
        title={isRtl ? 'مقارنة المشاغل المختارة' : 'Side-by-Side Atelier Comparison'}
      >
        <div className="space-y-4">
          <ShopComparisonSection
            onSelectShop={(id) => {
              setIsCompareModalOpen(false);
              const shop = mockShops.find((s) => s.id === id);
              if (shop) handleOpenBooking(shop);
            }}
          />
        </div>
      </Modal>

      {/* 9. VIP Home Measurement Booking Drawer */}
      <HomeMeasurementDrawer
        isOpen={isBookingDrawerOpen}
        onClose={() => setIsBookingDrawerOpen(false)}
        shopName={bookingShop ? (isRtl ? bookingShop.nameAr : bookingShop.name) : undefined}
      />

      {/* 10. Shop Quick View Profile Drawer */}
      <ShopQuickViewDrawer
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        shop={quickViewShop}
        onBookMeasurement={(shop) => {
          setIsQuickViewOpen(false);
          handleOpenBooking(shop);
        }}
        onToggleSave={handleToggleSave}
        isSaved={quickViewShop ? savedShopIds.includes(quickViewShop.id) : false}
        onToggleCompare={handleToggleCompare}
        isCompareSelected={quickViewShop ? compareShopIds.includes(quickViewShop.id) : false}
        onViewFullProfile={(shop) => {
          setIsQuickViewOpen(false);
          if (onNavigateToShopProfile) {
            onNavigateToShopProfile(shop);
          }
        }}
      />
    </div>
  );
};
