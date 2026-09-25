import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  Compass,
  RotateCcw,
  Sparkles,
  MapPin,
  X,
  Filter,
  ArrowUpDown,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { mockPortfolio } from '../data/mock/portfolio';
import { PortfolioItem } from '../types';
import { useLanguage } from '../localization/LanguageContext';
import { useToast } from '../components/feedback/Toast';

// UI & Marketplace Components
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Drawer } from '../components/ui/Drawer';
import { EmptyState } from '../components/ui/EmptyState';
import { DesignCard } from '../components/marketplace/DesignCard';
import {
  DesignDiscoveryFilters,
  DesignFilterState,
  initialDesignFilters,
} from '../components/marketplace/DesignDiscoveryFilters';
import { InspirationOrderModal } from '../components/marketplace/InspirationOrderModal';

export interface DesignDiscoveryPageProps {
  onNavigateToDesignDetail?: (design: PortfolioItem) => void;
  onNavigateToCreator?: (creatorType: 'tailor' | 'shop', slug: string) => void;
  onNavigateHome?: () => void;
}

export const DesignDiscoveryPage: React.FC<DesignDiscoveryPageProps> = ({
  onNavigateToDesignDetail,
  onNavigateToCreator,
  onNavigateHome,
}) => {
  const { isRtl } = useLanguage();
  const { showToast } = useToast();

  const [filters, setFilters] = useState<DesignFilterState>(initialDesignFilters);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedInspirationDesign, setSelectedInspirationDesign] = useState<PortfolioItem | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Sync with URL query parameters on initial render
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      const styleParam = params.get('style');
      const creatorParam = params.get('creator');
      const cityParam = params.get('city');

      if (catParam || styleParam || creatorParam || cityParam) {
        setFilters((prev) => ({
          ...prev,
          category: catParam || prev.category,
          style: styleParam || prev.style,
          creatorType:
            creatorParam === 'shop' || creatorParam === 'tailor' ? creatorParam : prev.creatorType,
          city: cityParam || prev.city,
        }));
      }
    } catch {}
  }, []);

  const categories = [
    { id: 'All', label: 'All Designs', labelAr: 'جميع التصاميم' },
    { id: 'Saudi Thobe', label: 'Saudi Thobe', labelAr: 'ثوب سعودي' },
    { id: 'Kuwaiti Thobe', label: 'Kuwaiti Thobe', labelAr: 'ثوب كويتي' },
    { id: 'Emirati Thobe', label: 'Emirati Thobe', labelAr: 'ثوب إماراتي' },
    { id: 'Qatari Thobe', label: 'Qatari Thobe', labelAr: 'ثوب قطري' },
    { id: 'Bahraini Thobe', label: 'Bahraini Thobe', labelAr: 'ثوب بحريني' },
    { id: 'Omani Style', label: 'Omani Style', labelAr: 'موديل عماني' },
    { id: 'Jubba', label: 'Jubba', labelAr: 'جبّة' },
    { id: 'Dagla', label: 'Dagla', labelAr: 'دقلة' },
    { id: 'Balto', label: 'Balto (Overcoat)', labelAr: 'بالطو' },
    { id: 'Formal Wear', label: 'Formal Wear', labelAr: 'ملبوسات رسمية' },
    { id: 'Ceremonial Bisht', label: 'Ceremonial Bisht', labelAr: 'بشت ملكي' },
    { id: 'Embroidery', label: 'Embroidery', labelAr: 'تطريز' },
    { id: 'Collar Designs', label: 'Collar Designs', labelAr: 'تصاميم القلاب' },
    { id: 'Cuff Designs', label: 'Cuff Designs', labelAr: 'تصاميم الكبك' },
    { id: 'Fabric', label: 'Fabric', labelAr: 'أقمشة فاخرة' },
    { id: 'Alterations', label: 'Alterations', labelAr: 'تعديلات' },
    { id: 'Custom Designs', label: 'Custom Designs', labelAr: 'تفصيل خاص' },
  ];

  const popularSearches = [
    { query: 'Saudi Thobe', label: isRtl ? 'ثوب سعودي' : 'Saudi Thobe' },
    { query: 'Royal Collar', label: isRtl ? 'قلاب ملكي' : 'Royal Collar' },
    { query: 'Dagla', label: isRtl ? 'دقلة شتوية' : 'Winter Dagla' },
    { query: 'Embroidery', label: isRtl ? 'تطريز ذهبي' : 'Gold Embroidery' },
    { query: 'Toyobo', label: isRtl ? 'تويوبو ياباني' : 'Toyobo Cotton' },
    { query: 'Bisht', label: isRtl ? 'بشت ملكي' : 'Ceremonial Bisht' },
  ];

  // Active filter count calculation
  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery.trim()) count++;
    if (filters.category !== 'All') count++;
    if (filters.creatorType !== 'all') count++;
    if (filters.city !== 'all') count++;
    if (filters.distanceKm > 0) count++;
    if (filters.style !== 'all') count++;
    if (filters.designType !== 'all') count++;
    if (filters.mediaType !== 'all') count++;
    if (filters.verifiedOnly) count++;
    if (filters.availability !== 'all') count++;
    return count;
  }, [filters]);

  const handleResetFilters = () => {
    setFilters(initialDesignFilters);
    showToast({
      type: 'info',
      title: isRtl ? 'تمت إعادة ضبط التصفية' : 'Filters Reset',
      description: isRtl ? 'تم عرض جميع التصاميم المتوفرة' : 'Showing all available designs',
    });
  };

  // Filter and sort items
  const filteredDesigns = useMemo(() => {
    return mockPortfolio.filter((item) => {
      // 1. Text Search
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(query) || item.titleAr.includes(query);
        const matchCreator =
          item.creatorName.toLowerCase().includes(query) ||
          item.creatorNameAr.includes(query) ||
          (item.shopName && item.shopName.toLowerCase().includes(query));
        const matchFabric =
          item.fabricDetails.toLowerCase().includes(query) ||
          item.fabricDetailsAr.includes(query);
        const matchCollar =
          item.collarStyle.toLowerCase().includes(query) ||
          item.collarStyleAr.includes(query);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(query));

        if (!matchTitle && !matchCreator && !matchFabric && !matchCollar && !matchTags) {
          return false;
        }
      }

      // 2. Category
      if (filters.category !== 'All') {
        const matchCat =
          item.category.toLowerCase() === filters.category.toLowerCase() ||
          item.specialty.toLowerCase() === filters.category.toLowerCase();
        if (!matchCat) return false;
      }

      // 3. Creator Type
      if (filters.creatorType !== 'all') {
        if (item.creatorType !== filters.creatorType) return false;
      }

      // 4. City
      if (filters.city !== 'all') {
        if (item.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      }

      // 5. Distance
      if (filters.distanceKm > 0) {
        if (item.distanceKm > filters.distanceKm) return false;
      }

      // 6. Style
      if (filters.style !== 'all') {
        if (item.style.toLowerCase() !== filters.style.toLowerCase()) return false;
      }

      // 7. Design Type
      if (filters.designType !== 'all') {
        if (item.designType.toLowerCase() !== filters.designType.toLowerCase()) return false;
      }

      // 8. Media Type
      if (filters.mediaType !== 'all') {
        if (item.mediaType !== filters.mediaType) return false;
      }

      // 9. Verified Only
      if (filters.verifiedOnly) {
        if (!item.isVerified) return false;
      }

      // 10. Availability
      if (filters.availability === 'orderable') {
        if (!item.isAvailableForOrder) return false;
      } else if (filters.availability === 'inspiration') {
        if (item.isAvailableForOrder) return false;
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      switch (filters.sortBy) {
        case 'recent':
          return (b.createdAt || '').localeCompare(a.createdAt || '');
        case 'saved':
          return (b.savesCount || b.likesCount || 0) - (a.savesCount || a.likesCount || 0);
        case 'viewed':
          return (b.viewsCount || 0) - (a.viewsCount || 0);
        case 'reviewed':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case 'nearby':
          return a.distanceKm - b.distanceKm;
        case 'recommended':
        default:
          return b.rating - a.rating;
      }
    });
  }, [filters]);

  const displayedDesigns = filteredDesigns.slice(0, itemsPerPage);
  const hasMore = itemsPerPage < filteredDesigns.length;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#121316]">
      {/* 1. TOP BREADCRUMB & HEADER */}
      <div className="bg-[#FAF9F6] border-b border-[#E6E2DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Breadcrumb
            items={[
              { label: isRtl ? 'الرئيسية' : 'Home', onClick: onNavigateHome },
              { label: isRtl ? 'اكتشف تصاميم الخياطة' : 'Discover Designs' },
            ]}
          />

          {/* Compact Visual Hero Intro */}
          <div className="mt-4 sm:mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#C5A880]/15 text-[#916F3E] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'معرض الحرفية والتصاميم' : 'Sartorial Gallery & Community'}</span>
                </span>
                <span className="text-xs text-[#8E8B85]">
                  {mockPortfolio.length} {isRtl ? 'تصميم موثق' : 'Curated Works'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#121316] tracking-tight">
                {isRtl ? 'اكتشف تصاميم الخياطة' : 'Discover Tailoring Designs'}
              </h1>

              <p className="text-xs sm:text-sm text-[#65625D] mt-2 leading-relaxed">
                {isRtl
                  ? 'استكشف أحدث قصات الثياب السعودية والخليجية، تفاصيل القلابات والأكمام، الأقمشة اليابانية الفاخرة، وأعمال الحرفيين والمشاغل المعتمدة.'
                  : 'Explore thobe styles, craftsmanship, fabrics, details, and finished work from shops and tailors across Saudi Arabia.'}
              </p>
            </div>

            {/* Quick stats or CTA */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E6E2DB] text-xs font-semibold text-[#121316] shadow-xs hover:border-[#C5A880] cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#916F3E]" />
                <span>{isRtl ? 'تصفية النتائج' : 'Filter Designs'}</span>
                {activeCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#916F3E] text-white text-[10px] flex items-center justify-center font-bold">
                    {activeCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Prominent Search Bar */}
          <div className="mt-5 max-w-3xl">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#8E8B85] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder={
                  isRtl
                    ? 'ابحث باسم التصميم، القماش (تويوبو، شكيبو)، ستايل القلاب، أو اسم الخياط...'
                    : 'Search by style (Saudi, Kuwaiti), fabric (Toyobo, Shikibo), collar, or tailor...'
                }
                className="w-full bg-white text-xs sm:text-sm text-[#121316] rounded-xl border border-[#D4D0C7] ps-10 pe-10 py-3 shadow-xs focus:outline-hidden focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
              />
              {filters.searchQuery && (
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, searchQuery: '' })}
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 text-[#8E8B85] hover:text-[#121316] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Popular Search Suggestions */}
            <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto text-[11px] text-[#65625D] no-scrollbar">
              <span className="font-semibold shrink-0 text-[#8E8B85]">
                {isRtl ? 'عمليات بحث شائعة:' : 'Popular:'}
              </span>
              {popularSearches.map((item) => (
                <button
                  key={item.query}
                  type="button"
                  onClick={() => setFilters({ ...filters, searchQuery: item.query })}
                  className="px-2.5 py-1 rounded-md bg-white border border-[#E6E2DB] hover:border-[#C5A880] hover:text-[#121316] transition-colors cursor-pointer shrink-0"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Navigation Ribbon (Horizontally Scrollable Tabs) */}
        <div className="border-t border-[#E6E2DB] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar">
              {categories.map((cat) => {
                const isActive = filters.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFilters({ ...filters, category: cat.id })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#121316] text-[#FAF9F6] shadow-xs'
                        : 'text-[#65625D] hover:text-[#121316] hover:bg-[#FAF9F6]'
                    }`}
                  >
                    {isRtl ? cat.labelAr : cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Desktop Filter Bar */}
        <div className="hidden lg:block">
          <DesignDiscoveryFilters
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            activeCount={activeCount}
          />
        </div>

        {/* Toolbar: Results Count, Active Tags & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-[#E6E2DB] shadow-xs">
          {/* Left: Results Count & Active Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#121316]">
              {filteredDesigns.length} {isRtl ? 'تصميم معروض' : 'Designs found'}
            </span>

            {/* Active category pill */}
            {filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#C5A880] text-[11px] font-medium text-[#916F3E]">
                <span>{filters.category}</span>
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, category: 'All' })}
                  className="hover:text-[#121316] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active city pill */}
            {filters.city !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#C5A880] text-[11px] font-medium text-[#916F3E]">
                <span>{filters.city}</span>
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, city: 'all' })}
                  className="hover:text-[#121316] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active style pill */}
            {filters.style !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#C5A880] text-[11px] font-medium text-[#916F3E]">
                <span>{filters.style}</span>
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, style: 'all' })}
                  className="hover:text-[#121316] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active creator type pill */}
            {filters.creatorType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#C5A880] text-[11px] font-medium text-[#916F3E]">
                <span>
                  {filters.creatorType === 'shop'
                    ? isRtl
                      ? 'مشاغل'
                      : 'Shops'
                    : isRtl
                    ? 'خياطون'
                    : 'Tailors'}
                </span>
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, creatorType: 'all' })}
                  className="hover:text-[#121316] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[11px] text-[#8E8B85] hover:text-[#121316] underline ms-1 cursor-pointer"
              >
                {isRtl ? 'مسح الكل' : 'Clear all'}
              </button>
            )}
          </div>

          {/* Right: Sort Control */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#8E8B85] flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{isRtl ? 'ترتيب حسب:' : 'Sort by:'}</span>
            </span>

            <div className="relative">
              <select
                aria-label={isRtl ? 'الترتيب' : 'Sort order'}
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as DesignFilterState['sortBy'] })
                }
                className="appearance-none bg-[#FAF9F6] text-xs font-semibold text-[#121316] border border-[#E6E2DB] rounded-lg px-3 py-1.5 pe-7 focus:outline-hidden focus:border-[#C5A880] cursor-pointer"
              >
                <option value="recommended">{isRtl ? 'الموصى به' : 'Recommended'}</option>
                <option value="recent">{isRtl ? 'الأحدث' : 'Most Recent'}</option>
                <option value="saved">{isRtl ? 'الأكثر حفظاً' : 'Most Saved'}</option>
                <option value="viewed">{isRtl ? 'الأكثر مشاهدة' : 'Most Viewed'}</option>
                <option value="reviewed">{isRtl ? 'الأعلى تقييماً' : 'Most Reviewed'}</option>
                <option value="nearby">{isRtl ? 'الأقرب إليك' : 'Nearby'}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8E8B85] absolute end-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3. DESIGN GRID / FEED */}
        {filteredDesigns.length > 0 ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedDesigns.map((design) => (
                <DesignCard
                  key={design.id}
                  design={design}
                  onSelectDesign={onNavigateToDesignDetail}
                  onSelectCreator={onNavigateToCreator}
                  onUseAsInspiration={(des) => setSelectedInspirationDesign(des)}
                />
              ))}
            </div>

            {/* Load More Area / Pagination */}
            {hasMore ? (
              <div className="text-center pt-4 pb-8">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setItemsPerPage((prev) => prev + 6)}
                  className="min-w-[180px]"
                >
                  <span>{isRtl ? 'عرض المزيد من التصاميم' : 'Load More Designs'}</span>
                </Button>
                <div className="text-xs text-[#8E8B85] mt-2">
                  {isRtl
                    ? `عرض ${displayedDesigns.length} من أصل ${filteredDesigns.length} تصميم`
                    : `Showing ${displayedDesigns.length} of ${filteredDesigns.length} designs`}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-[#8E8B85] border-t border-[#E6E2DB]">
                {isRtl ? 'تم عرض جميع التصاميم المتوافقة' : 'You have viewed all matching designs'}
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl border border-[#E6E2DB] p-12 text-center my-6">
            <EmptyState
              icon={<Compass className="w-6 h-6 text-[#C5A880]" />}
              title={isRtl ? 'لم يتم العثور على تصاميم متطابقة' : 'No Designs Found'}
              description={
                isRtl
                  ? 'جرّب تعديل خيارات التصفية أو مسح البحث لاستكشاف تصاميم وحرفية أخرى.'
                  : 'Try modifying your search or resetting filters to discover more bespoke works.'
              }
              actionLabel={isRtl ? 'إعادة ضبط التصفية' : 'Reset All Filters'}
              onAction={handleResetFilters}
            />
          </div>
        )}
      </main>

      {/* 4. MOBILE FILTER DRAWER */}
      <Drawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title={isRtl ? 'تصفية تصاميم الخياطة' : 'Filter Designs'}
      >
        <div className="p-4 space-y-4">
          <DesignDiscoveryFilters
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            activeCount={activeCount}
          />
          <div className="pt-4 border-t border-[#E6E2DB]">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setMobileFilterOpen(false)}
            >
              {isRtl ? `عرض ${filteredDesigns.length} تصميم` : `Show ${filteredDesigns.length} Designs`}
            </Button>
          </div>
        </div>
      </Drawer>

      {/* 5. INSPIRATION MODAL */}
      <InspirationOrderModal
        isOpen={!!selectedInspirationDesign}
        onClose={() => setSelectedInspirationDesign(null)}
        design={selectedInspirationDesign}
        onNavigateCreator={onNavigateToCreator}
      />
    </div>
  );
};
