import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  Map as MapIcon,
  RotateCcw,
  Sparkles,
  Award,
  ChevronDown,
  ArrowUpDown,
  Scissors,
} from 'lucide-react';
import { useLanguage } from '../localization/LanguageContext';
import { useToast } from '../components/feedback/Toast';
import { mockTailors } from '../data/mock/tailors';
import { saudiCitiesData } from '../data/mock/locations';
import {
  Tailor,
  TailorFilterState,
  initialTailorFilterState,
  TailorSortOption,
  TailorPortfolioThumbnail,
} from '../types';

// UI & Marketplace Components
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { TailorCard } from '../components/marketplace/TailorCard';
import { TailorDiscoveryFilters } from '../components/marketplace/TailorDiscoveryFilters';
import { Drawer } from '../components/ui/Drawer';
import { EmptyState } from '../components/ui/EmptyState';
import { CardSkeleton } from '../components/feedback/Skeleton';
import { Pagination } from '../components/ui/Pagination';
import { TailorContactModal } from '../components/marketplace/TailorContactModal';
import { MapPlaceholder } from '../components/location/MapPlaceholder';

export interface TailorDiscoveryPageProps {
  onNavigateToTailorProfile?: (tailor: Tailor) => void;
  onNavigateToShopProfile?: (shopSlug: string) => void;
  onNavigateHome?: () => void;
}

export const TailorDiscoveryPage: React.FC<TailorDiscoveryPageProps> = ({
  onNavigateToTailorProfile,
  onNavigateToShopProfile,
  onNavigateHome,
}) => {
  const { t, isRtl } = useLanguage();
  const { showToast } = useToast();

  // Centralized Tailor Filter State initialized from URL query if present
  const [filters, setFilters] = useState<TailorFilterState>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const initial = { ...initialTailorFilterState };

      const q = params.get('q') || params.get('search');
      if (q) initial.searchQuery = q;

      const city = params.get('city') || params.get('location');
      if (city) initial.city = city;

      const spec = params.get('specialty');
      if (spec) initial.specialties = [spec];

      const sort = params.get('sort');
      if (sort) initial.sort = sort as TailorSortOption;

      const rating = params.get('rating');
      if (rating) initial.ratingMin = parseFloat(rating) || 0;

      const exp = params.get('experience');
      if (exp) initial.minExperienceYears = parseInt(exp, 10) || 0;

      const verified = params.get('verified');
      if (verified === 'true') initial.verifiedOnly = true;

      return initial;
    } catch {
      return initialTailorFilterState;
    }
  });

  // Local Search Input (debounced / synced)
  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  const [selectedCityInput, setSelectedCityInput] = useState(filters.city);

  // View Mode: grid, list, map
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Saved Tailors (stored in localStorage)
  const [savedTailorIds, setSavedTailorIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('khayyat_saved_tailors');
      return saved ? JSON.parse(saved) : ['tailor_01'];
    } catch {
      return ['tailor_01'];
    }
  });

  // Contact / Book Modal State
  const [activeModalTailor, setActiveModalTailor] = useState<Tailor | null>(null);
  const [modalMode, setModalMode] = useState<'contact' | 'book'>('contact');

  // Sync to URL Query String
  useEffect(() => {
    try {
      const params = new URLSearchParams();
      if (filters.searchQuery) params.set('q', filters.searchQuery);
      if (filters.city !== 'all') params.set('city', filters.city);
      if (filters.specialties.length > 0) params.set('specialty', filters.specialties.join(','));
      if (filters.sort !== 'recommended') params.set('sort', filters.sort);
      if (filters.ratingMin > 0) params.set('rating', filters.ratingMin.toString());
      if (filters.minExperienceYears > 0) params.set('experience', filters.minExperienceYears.toString());
      if (filters.verifiedOnly) params.set('verified', 'true');

      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
      window.history.replaceState({}, '', newUrl);
    } catch {
      // Safe fallback
    }
  }, [filters]);

  // Quick Specialty Search Shortcuts
  const quickSearchShortcuts = [
    { label: 'Saudi Thobe', labelAr: 'ثوب سعودي' },
    { label: 'Kuwaiti Thobe', labelAr: 'ثوب كويتي' },
    { label: 'Emirati Thobe', labelAr: 'ثوب إماراتي' },
    { label: 'Jubba', labelAr: 'جبة' },
    { label: 'Dagla', labelAr: 'دقلة' },
    { label: 'Embroidery', labelAr: 'تطريز وزري' },
    { label: 'Formal Wear', labelAr: 'ملبوسات رسمية' },
    { label: 'Alterations', labelAr: 'تعديل قياسات' },
  ];

  // Filtering & Sorting Engine
  const filteredTailors = useMemo(() => {
    return mockTailors.filter((tailor) => {
      // 1. Search Query (Name, Title, Bio, Specialties, Skills)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName =
          tailor.name.toLowerCase().includes(query) ||
          tailor.nameAr.includes(query);
        const matchesTitle =
          tailor.title.toLowerCase().includes(query) ||
          tailor.titleAr.includes(query);
        const matchesBio =
          tailor.bio.toLowerCase().includes(query) ||
          tailor.bioAr.includes(query);
        const matchesSpecialties =
          tailor.specialties.some((s) => s.toLowerCase().includes(query)) ||
          tailor.specialtiesAr.some((s) => s.includes(query));
        const matchesSkills =
          tailor.skills.some((s) => s.toLowerCase().includes(query)) ||
          tailor.skillsAr.some((s) => s.includes(query));
        const matchesShop =
          tailor.currentShopName?.toLowerCase().includes(query) ||
          tailor.currentShopNameAr?.includes(query);

        if (
          !matchesName &&
          !matchesTitle &&
          !matchesBio &&
          !matchesSpecialties &&
          !matchesSkills &&
          !matchesShop
        ) {
          return false;
        }
      }

      // 2. City Filter
      if (filters.city !== 'all') {
        if (tailor.city.toLowerCase() !== filters.city.toLowerCase()) {
          return false;
        }
      }

      // 3. Area Filter
      if (filters.area !== 'all') {
        if (tailor.area.toLowerCase() !== filters.area.toLowerCase()) {
          return false;
        }
      }

      // 4. Distance Filter
      if (filters.distanceKm < 999 && tailor.distanceKm) {
        if (tailor.distanceKm > filters.distanceKm) {
          return false;
        }
      }

      // 5. Specialty Filter (Multi-select: Tailor must possess at least one of selected)
      if (filters.specialties.length > 0) {
        const hasSpecialty = filters.specialties.some(
          (sel) =>
            tailor.specialties.includes(sel as any) ||
            tailor.primarySpecialty === sel
        );
        if (!hasSpecialty) return false;
      }

      // 6. Experience Filter (Clear labeling: e.g. 5+ years)
      if (filters.minExperienceYears > 0) {
        if (tailor.yearsOfExperience < filters.minExperienceYears) {
          return false;
        }
      }

      // 7. Rating Filter
      if (filters.ratingMin > 0) {
        if (tailor.metrics.rating < filters.ratingMin) {
          return false;
        }
      }

      // 8. Availability Filter (Demo Profile State)
      if (filters.availability !== 'all') {
        if (tailor.availability !== filters.availability) {
          return false;
        }
      }

      // 9. Current Shop Status Filter
      if (filters.shopStatus !== 'all') {
        if (filters.shopStatus === 'has_shop') {
          if (!tailor.currentShopId) return false;
        } else if (filters.shopStatus === 'independent') {
          if (tailor.workType !== 'independent' && tailor.currentShopId) return false;
        } else if (filters.shopStatus === 'shop_based') {
          if (tailor.workType !== 'shop_based') return false;
        }
      }

      // 10. Languages Filter
      if (filters.languages.length > 0) {
        const hasLang = filters.languages.some((l) =>
          tailor.languages.includes(l as any)
        );
        if (!hasLang) return false;
      }

      // 11. Work Type Filter
      if (filters.workType !== 'all') {
        if (tailor.workType !== filters.workType) {
          return false;
        }
      }

      // 12. Verified Tailor Filter (Only display if true in data)
      if (filters.verifiedOnly) {
        if (!tailor.trust.isVerifiedTailor) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  // Sorting Engine (Recommended is a sorting mode; tailors are never labeled as objectively "best")
  const sortedTailors = useMemo(() => {
    const list = [...filteredTailors];
    switch (filters.sort) {
      case 'highest_rated':
        return list.sort((a, b) => b.metrics.rating - a.metrics.rating);
      case 'most_experienced':
        return list.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
      case 'most_reviewed':
        return list.sort((a, b) => b.metrics.reviewCount - a.metrics.reviewCount);
      case 'nearest':
        return list.sort((a, b) => (a.distanceKm || 999) - (b.distanceKm || 999));
      case 'recently_active':
        return list.sort((a, b) => b.completedWorksCount - a.completedWorksCount);
      case 'recommended':
      default:
        // Balanced recommendation score based on rating, orders & verification
        return list.sort((a, b) => {
          const scoreA =
            a.metrics.rating * 20 +
            (a.trust.isVerifiedTailor ? 10 : 0) +
            Math.min(a.completedWorksCount / 100, 15);
          const scoreB =
            b.metrics.rating * 20 +
            (b.trust.isVerifiedTailor ? 10 : 0) +
            Math.min(b.completedWorksCount / 100, 15);
          return scoreB - scoreA;
        });
    }
  }, [filteredTailors, filters.sort]);

  // Paginated Results
  const totalPages = Math.ceil(sortedTailors.length / itemsPerPage);
  const paginatedTailors = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedTailors.slice(start, start + itemsPerPage);
  }, [sortedTailors, currentPage]);

  // Reset to page 1 whenever filters change
  const handleFiltersChange = (newFilters: TailorFilterState) => {
    setIsLoading(true);
    setFilters(newFilters);
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 200);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setSelectedCityInput('all');
    handleFiltersChange(initialTailorFilterState);
    showToast({
      title: isRtl ? 'تمت إعادة ضبط جميع الفلاتر' : 'All filters reset',
      type: 'info',
    });
  };

  // Primary Search Header Submission
  const handlePrimarySearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFiltersChange({
      ...filters,
      searchQuery: searchInput,
      city: selectedCityInput,
    });
  };

  // Toggle Save Tailor in localStorage
  const handleToggleSave = (tailor: Tailor) => {
    const isSaved = savedTailorIds.includes(tailor.id);
    const next = isSaved
      ? savedTailorIds.filter((id) => id !== tailor.id)
      : [...savedTailorIds, tailor.id];

    setSavedTailorIds(next);
    try {
      localStorage.setItem('khayyat_saved_tailors', JSON.stringify(next));
    } catch {
      // Safe fallback
    }

    const tailorName = isRtl ? tailor.nameAr : tailor.name;
    showToast({
      title: !isSaved
        ? isRtl
          ? `تم حفظ الحرفي ${tailorName} في قائمة مفضلاتك`
          : `Saved ${tailorName} to your favorites`
        : isRtl
        ? `تمت إزالة ${tailorName} من المفضلة`
        : `Removed ${tailorName} from favorites`,
      type: 'success',
    });
  };

  // Active Filter Badges list
  const activeFilterTags = useMemo(() => {
    const tags: { id: string; label: string; onRemove: () => void }[] = [];

    if (filters.searchQuery) {
      tags.push({
        id: 'search',
        label: `"${filters.searchQuery}"`,
        onRemove: () => {
          setSearchInput('');
          handleFiltersChange({ ...filters, searchQuery: '' });
        },
      });
    }

    if (filters.city !== 'all') {
      const cityObj = saudiCitiesData.find((c) => c.id === filters.city);
      tags.push({
        id: 'city',
        label: isRtl ? cityObj?.nameAr || filters.city : cityObj?.name || filters.city,
        onRemove: () => {
          setSelectedCityInput('all');
          handleFiltersChange({ ...filters, city: 'all', area: 'all' });
        },
      });
    }

    if (filters.area !== 'all') {
      tags.push({
        id: 'area',
        label: filters.area,
        onRemove: () => handleFiltersChange({ ...filters, area: 'all' }),
      });
    }

    if (filters.distanceKm < 999) {
      tags.push({
        id: 'distance',
        label: `${filters.distanceKm} km`,
        onRemove: () => handleFiltersChange({ ...filters, distanceKm: 999 }),
      });
    }

    filters.specialties.forEach((spec) => {
      tags.push({
        id: `spec_${spec}`,
        label: spec,
        onRemove: () =>
          handleFiltersChange({
            ...filters,
            specialties: filters.specialties.filter((s) => s !== spec),
          }),
      });
    });

    if (filters.minExperienceYears > 0) {
      tags.push({
        id: 'exp',
        label: `${filters.minExperienceYears}+ ${isRtl ? 'سنوات خبرة' : 'years experience'}`,
        onRemove: () => handleFiltersChange({ ...filters, minExperienceYears: 0 }),
      });
    }

    if (filters.ratingMin > 0) {
      tags.push({
        id: 'rating',
        label: `${filters.ratingMin}+ ★`,
        onRemove: () => handleFiltersChange({ ...filters, ratingMin: 0 }),
      });
    }

    if (filters.availability !== 'all') {
      tags.push({
        id: 'avail',
        label: filters.availability === 'available'
          ? (isRtl ? 'متاح' : 'Available')
          : filters.availability === 'busy'
          ? (isRtl ? 'مشغول' : 'Busy')
          : (isRtl ? 'متاح قريباً' : 'Available Soon'),
        onRemove: () => handleFiltersChange({ ...filters, availability: 'all' }),
      });
    }

    if (filters.shopStatus !== 'all') {
      tags.push({
        id: 'shopStatus',
        label: filters.shopStatus === 'independent'
          ? (isRtl ? 'حرفي مستقل' : 'Independent')
          : (isRtl ? 'في مشغل' : 'Shop-based'),
        onRemove: () => handleFiltersChange({ ...filters, shopStatus: 'all' }),
      });
    }

    filters.languages.forEach((lang) => {
      tags.push({
        id: `lang_${lang}`,
        label: lang,
        onRemove: () =>
          handleFiltersChange({
            ...filters,
            languages: filters.languages.filter((l) => l !== lang),
          }),
      });
    });

    if (filters.verifiedOnly) {
      tags.push({
        id: 'verified',
        label: isRtl ? 'موثق فقط' : 'Verified Only',
        onRemove: () => handleFiltersChange({ ...filters, verifiedOnly: false }),
      });
    }

    return tags;
  }, [filters, isRtl]);

  const activeFilterCount = activeFilterTags.length;

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* 1. Breadcrumb Bar */}
      <div className="border-b border-[#E6E2DB] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: t.navigation.home, onClick: onNavigateHome },
              { label: isRtl ? 'خيّاطو المملكة' : 'Tailors & Karigars' },
            ]}
          />
        </div>
      </div>

      {/* 2. Page Header & Hero Search */}
      <section className="bg-radial from-[#FAF6F0] via-[#FAF9F6] to-[#FAF9F6] border-b border-[#E6E2DB] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#EDE4D5] text-xs font-semibold text-[#916F3E] mb-3">
            <Scissors className="w-3.5 h-3.5" />
            <span>{isRtl ? 'المعمار الحرفي للثوب السعودي' : 'The Artisans Behind the Garment'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#121316] font-display mb-3">
            {isRtl ? 'ابحث عن أمهر الخيّاطين ومعلّمي التفصيل' : 'Find Skilled Tailors Near You'}
          </h1>

          <p className="text-sm sm:text-base text-[#65625D] leading-relaxed mb-8">
            {isRtl
              ? 'اكتشف معلّمي الحرفة والكاريغار حسب التخصص، وسنوات الخبرة، ومعرض الأعمال، والتقييمات، وحالة التوفر.'
              : 'Discover professional karigars by specialty, experience, portfolio, ratings and availability.'}
          </p>

          {/* Primary Search Box */}
          <form
            onSubmit={handlePrimarySearchSubmit}
            className="bg-white p-2 rounded-2xl border border-[#E6E2DB] shadow-md flex flex-col md:flex-row items-center gap-2 text-start"
          >
            {/* Specialty / Keyword Input */}
            <div className="relative flex-1 w-full flex items-center">
              <Search className="w-4 h-4 absolute start-3.5 text-[#8E8B85]" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={
                  isRtl
                    ? 'ما الذي تبحث عنه؟ (ثوب سعودي، دقلة، جبة، قلاب مقوى...)'
                    : 'What are you looking for? (Saudi Thobe, Jubba, Dagla...)'
                }
                className="w-full text-xs sm:text-sm py-2.5 ps-10 pe-3 bg-transparent text-[#121316] placeholder-[#8E8B85] focus:outline-none"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="p-1.5 text-[#8E8B85] hover:text-[#121316]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* City Selector */}
            <div className="relative w-full md:w-52 shrink-0 border-t md:border-t-0 md:border-s border-[#E6E2DB] ps-0 md:ps-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5">
                <MapPin className="w-4 h-4 text-[#916F3E] shrink-0" />
                <select
                  value={selectedCityInput}
                  onChange={(e) => setSelectedCityInput(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#121316] focus:outline-none cursor-pointer pe-6"
                >
                  <option value="all">{isRtl ? 'جميع المدن' : 'All Cities'}</option>
                  {saudiCitiesData.map((c) => (
                    <option key={c.id} value={c.id}>
                      {isRtl ? c.nameAr : c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Find Tailors CTA */}
            <Button
              type="submit"
              variant="gold"
              size="md"
              className="w-full md:w-auto shrink-0"
              icon={<Search className="w-4 h-4" />}
            >
              {isRtl ? 'بحث عن خيّاطين' : 'Find Tailors'}
            </Button>
          </form>

          {/* Quick Specialty Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-[#65625D]">
            <span className="text-[11px] text-[#8E8B85] font-medium me-1">
              {isRtl ? 'أمثلة سريعة:' : 'Quick Searches:'}
            </span>
            {quickSearchShortcuts.map((sc) => {
              const isSelected = filters.specialties.includes(sc.label);
              return (
                <button
                  key={sc.label}
                  onClick={() => {
                    const next = isSelected
                      ? filters.specialties.filter((s) => s !== sc.label)
                      : [...filters.specialties, sc.label];
                    handleFiltersChange({ ...filters, specialties: next });
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-[#FAF6F0] text-[#916F3E] border-[#C5A880] font-semibold'
                      : 'bg-white text-[#65625D] border-[#E6E2DB] hover:border-[#C5A880]/50'
                  }`}
                >
                  {isRtl ? sc.labelAr : sc.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Discovery Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 items-start">
          {/* Desktop Filter Sidebar (280px) */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-24 bg-white p-5 rounded-2xl border border-[#E6E2DB] shadow-xs">
            <TailorDiscoveryFilters
              filters={filters}
              onChange={handleFiltersChange}
              onReset={handleResetFilters}
              totalCount={filteredTailors.length}
            />
          </aside>

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            {/* Filter / Sort Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-[#E6E2DB] shadow-xs mb-5 flex flex-wrap items-center justify-between gap-3">
              {/* Results Count & Mobile Trigger */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E6E2DB] bg-[#FAF9F6] text-xs font-semibold text-[#121316] cursor-pointer hover:bg-[#F2EFE9]"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#916F3E]" />
                  <span>{isRtl ? 'الفلاتر' : 'Filters'}</span>
                  {activeFilterCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#916F3E] text-white text-[10px] flex items-center justify-center font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <div className="text-xs text-[#65625D]">
                  {isRtl ? (
                    <>
                      عرض <span className="font-bold text-[#121316]">{sortedTailors.length}</span> من معلّمي التفصيل
                    </>
                  ) : (
                    <>
                      Showing <span className="font-bold text-[#121316]">{sortedTailors.length}</span> skilled tailors
                    </>
                  )}
                </div>
              </div>

              {/* Sort & View Mode Switcher */}
              <div className="flex items-center gap-3">
                {/* Sort Dropdown (Do NOT label as objectively "best", Recommended is only a sorting mode) */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[#8E8B85] hidden sm:inline">{isRtl ? 'الترتيب:' : 'Sort:'}</span>
                  <div className="relative">
                    <select
                      value={filters.sort}
                      onChange={(e) =>
                        handleFiltersChange({
                          ...filters,
                          sort: e.target.value as TailorSortOption,
                        })
                      }
                      className="bg-[#FAF9F6] border border-[#E6E2DB] rounded-lg px-3 py-1.5 pe-7 text-xs font-semibold text-[#121316] focus:outline-none focus:border-[#C5A880] appearance-none cursor-pointer"
                    >
                      <option value="recommended">{isRtl ? 'الموصى به' : 'Recommended'}</option>
                      <option value="highest_rated">{isRtl ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
                      <option value="most_experienced">{isRtl ? 'الأكثر خبرة' : 'Most Experienced'}</option>
                      <option value="most_reviewed">{isRtl ? 'الأكثر مراجعات' : 'Most Reviewed'}</option>
                      <option value="nearest">{isRtl ? 'الأقرب مسافة' : 'Nearest'}</option>
                      <option value="recently_active">{isRtl ? 'الأكثر طلباً' : 'Recently Active'}</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#8E8B85] absolute end-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center p-0.5 bg-[#FAF9F6] rounded-lg border border-[#E6E2DB]">
                  <button
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                    className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-white text-[#916F3E] shadow-2xs font-semibold'
                        : 'text-[#8E8B85] hover:text-[#121316]'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    title="List View"
                    className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-white text-[#916F3E] shadow-2xs font-semibold'
                        : 'text-[#8E8B85] hover:text-[#121316]'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    title="Map Preview"
                    className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                      viewMode === 'map'
                        ? 'bg-white text-[#916F3E] shadow-2xs font-semibold'
                        : 'text-[#8E8B85] hover:text-[#121316]'
                    }`}
                  >
                    <MapIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Bar */}
            {activeFilterTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-5 pb-3 border-b border-[#E6E2DB]">
                <span className="text-[11px] text-[#8E8B85] font-medium me-1">
                  {isRtl ? 'الفلاتر النشطة:' : 'Active Filters:'}
                </span>

                {activeFilterTags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1 bg-white border border-[#E6E2DB] rounded-md px-2 py-0.5 text-xs text-[#121316]"
                  >
                    <span>{tag.label}</span>
                    <button
                      onClick={tag.onRemove}
                      className="text-[#8E8B85] hover:text-[#121316] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#916F3E] hover:underline ms-2 cursor-pointer"
                >
                  {isRtl ? 'مسح الكل' : 'Clear All'}
                </button>
              </div>
            )}

            {/* Optional Map View Mode */}
            {viewMode === 'map' && (
              <div className="mb-6 bg-white p-4 rounded-2xl border border-[#E6E2DB] shadow-xs">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#916F3E]" />
                    <span className="font-bold text-[#121316]">
                      {isRtl ? 'خريطة مواقع معلّمي التفصيل والمشاغل' : 'Craftsmen Atelier Map'}
                    </span>
                  </div>
                  <span className="text-[#8E8B85]">
                    {filters.city !== 'all' ? filters.city : (isRtl ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia')}
                  </span>
                </div>
                <div className="h-72 rounded-xl overflow-hidden border border-[#E6E2DB]">
                  <MapPlaceholder
                    title={isRtl ? 'مشاغل ومعلّمو التفصيل' : 'Tailor & Atelier Hubs'}
                    address={isRtl ? 'مواقع معتمدة للقياس والتفصيل' : 'Verified Tailoring Locations'}
                    city={filters.city !== 'all' ? filters.city : 'Riyadh'}
                    district={filters.area !== 'all' ? filters.area : 'Central'}
                    className="h-full"
                  />
                </div>
              </div>
            )}

            {/* Results Grid / List / Empty State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[1, 2, 3, 4].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : paginatedTailors.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E6E2DB] p-8">
                <EmptyState
                  title={isRtl ? 'لا يوجد خيّاطون مطابقون لهذا البحث' : 'No Tailors Matched Your Filters'}
                  description={
                    isRtl
                      ? 'جرّب توسيع نطاق البحث أو إزالة بعض التخصصات والخيارات للوصول إلى أمهر الحرفيين.'
                      : 'Try broadening your search query, increasing distance radius, or clearing some specialty filters.'
                  }
                  actionLabel={isRtl ? 'إعادة ضبط الفلاتر' : 'Reset All Filters'}
                  onAction={handleResetFilters}
                />
              </div>
            ) : (
              <div
                className={
                  viewMode === 'list'
                    ? 'space-y-4'
                    : 'grid grid-cols-1 md:grid-cols-2 gap-5'
                }
              >
                {paginatedTailors.map((tailor) => (
                  <TailorCard
                    key={tailor.id}
                    tailor={tailor}
                    isSaved={savedTailorIds.includes(tailor.id)}
                    onToggleSave={handleToggleSave}
                    onViewProfile={onNavigateToTailorProfile}
                    onSelectShop={onNavigateToShopProfile}
                    onContactTailor={(t) => {
                      setActiveModalTailor(t);
                      setModalMode('contact');
                    }}
                    onBookTailor={(t) => {
                      setActiveModalTailor(t);
                      setModalMode('book');
                    }}
                    onViewPortfolioItem={(t) => {
                      if (onNavigateToTailorProfile) onNavigateToTailorProfile(t);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      <Drawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title={isRtl ? 'تصفية خيّاطي المملكة' : 'Filter Tailors & Karigars'}
      >
        <div className="p-4">
          <TailorDiscoveryFilters
            filters={filters}
            onChange={handleFiltersChange}
            onReset={handleResetFilters}
            totalCount={filteredTailors.length}
          />
          <div className="pt-6 border-t border-[#E6E2DB] mt-6">
            <Button
              variant="gold"
              className="w-full"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              {isRtl
                ? `عرض النتائج (${filteredTailors.length})`
                : `Show Results (${filteredTailors.length})`}
            </Button>
          </div>
        </div>
      </Drawer>

      {/* Contact / Booking Modal */}
      <TailorContactModal
        isOpen={!!activeModalTailor}
        onClose={() => setActiveModalTailor(null)}
        tailor={activeModalTailor}
        mode={modalMode}
      />
    </div>
  );
};
