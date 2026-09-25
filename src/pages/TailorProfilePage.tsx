import React, { useState, useMemo } from 'react';
import {
  Award,
  Briefcase,
  MapPin,
  Calendar,
  MessageSquare,
  Bookmark,
  Share2,
  ExternalLink,
  Languages,
  CheckCircle2,
  Clock,
  Scissors,
  Star,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Eye,
  Sparkles,
  Building2,
  HelpCircle,
  X,
  Phone,
} from 'lucide-react';

import { Tailor, TailorPortfolioThumbnail, TailorServiceItem, Shop } from '../types';
import { mockTailors } from '../data/mock/tailors';
import { mockShops } from '../data/mock/shops';
import { useLanguage } from '../localization/LanguageContext';
import { useToast } from '../components/feedback/Toast';

// UI Components
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Rating } from '../components/ui/Rating';
import { PriceDisplay } from '../components/ui/PriceDisplay';
import { VerificationBadge } from '../components/trust/VerificationBadge';
import { TailorContactModal } from '../components/marketplace/TailorContactModal';
import { MapPlaceholder } from '../components/location/MapPlaceholder';
import { TailorCard } from '../components/marketplace/TailorCard';

export interface TailorProfilePageProps {
  tailorSlug?: string;
  tailorId?: string;
  onNavigateHome?: () => void;
  onNavigateTailors?: () => void;
  onNavigateDesigns?: () => void;
  onNavigateShop?: (shopSlug: string) => void;
  onSelectTailor?: (tailor: Tailor) => void;
  onStartBooking?: (params: { tailorId?: string; shopId?: string }) => void;
}

export const TailorProfilePage: React.FC<TailorProfilePageProps> = ({
  tailorSlug,
  tailorId,
  onNavigateHome,
  onNavigateTailors,
  onNavigateDesigns,
  onNavigateShop,
  onSelectTailor,
  onStartBooking,
}) => {
  const { t, isRtl } = useLanguage();
  const { showToast } = useToast();

  // Resolve current tailor by slug or id, fallback to first tailor
  const tailor = useMemo<Tailor>(() => {
    if (tailorSlug) {
      const found = mockTailors.find((t) => t.slug === tailorSlug || t.id === tailorSlug);
      if (found) return found;
    }
    if (tailorId) {
      const found = mockTailors.find((t) => t.id === tailorId);
      if (found) return found;
    }
    return mockTailors[0];
  }, [tailorSlug, tailorId]);

  // Resolve associated shop if applicable
  const associatedShop = useMemo<Shop | undefined>(() => {
    if (!tailor.currentShopId && !tailor.currentShopSlug) return undefined;
    return mockShops.find(
      (s) => s.id === tailor.currentShopId || s.slug === tailor.currentShopSlug
    );
  }, [tailor]);

  // Saved Tailors state in localStorage
  const [isSaved, setIsSaved] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('khayyat_saved_tailors');
      const list = saved ? JSON.parse(saved) : ['tailor_01'];
      return list.includes(tailor.id);
    } catch {
      return false;
    }
  });

  // Contact / Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'contact' | 'book'>('contact');
  const [selectedService, setSelectedService] = useState<TailorServiceItem | null>(null);

  // Portfolio Lightbox State
  const [activePortfolioItem, setActivePortfolioItem] = useState<TailorPortfolioThumbnail | null>(null);
  const [portfolioTab, setPortfolioTab] = useState<string>('all');

  // Review Rating Filter State
  const [reviewFilterRating, setReviewFilterRating] = useState<number>(0);

  // Similar Tailors (Same city or similar primary specialty, excluding current)
  const similarTailors = useMemo(() => {
    return mockTailors
      .filter((t) => t.id !== tailor.id && (t.city === tailor.city || t.primarySpecialty === tailor.primarySpecialty))
      .slice(0, 3);
  }, [tailor]);

  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;
  const name = isRtl ? tailor.nameAr : tailor.name;
  const title = isRtl ? tailor.titleAr : tailor.title;
  const primarySpec = isRtl ? tailor.primarySpecialtyAr : tailor.primarySpecialty;
  const shopName = isRtl ? tailor.currentShopNameAr : tailor.currentShopName;
  const city = isRtl ? tailor.cityAr : tailor.city;
  const area = isRtl ? tailor.areaAr : tailor.area;

  // Toggle Save Tailor
  const handleToggleSave = () => {
    try {
      const saved = localStorage.getItem('khayyat_saved_tailors');
      const list: string[] = saved ? JSON.parse(saved) : [];
      let next: string[];
      if (isSaved) {
        next = list.filter((id) => id !== tailor.id);
      } else {
        next = [...list, tailor.id];
      }
      localStorage.setItem('khayyat_saved_tailors', JSON.stringify(next));
      setIsSaved(!isSaved);

      showToast({
        title: !isSaved
          ? isRtl
            ? `تم حفظ الحرفي ${name} في المفضلة`
            : `Saved ${name} to favorite tailors`
          : isRtl
          ? `تمت إزالة ${name} من المفضلة`
          : `Removed ${name} from favorites`,
        type: 'success',
      });
    } catch {
      setIsSaved(!isSaved);
    }
  };

  // Share Profile
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast({
          title: isRtl ? 'تم نسخ رابط ملف الحرفي إلى الحافظة' : 'Profile link copied to clipboard',
          type: 'success',
        });
      });
    } else {
      showToast({
        title: isRtl ? 'تم نسخ الرابط' : 'Link copied',
        type: 'success',
      });
    }
  };

  // Availability Badge
  const getAvailabilityBadge = () => {
    switch (tailor.availability) {
      case 'available':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E5638] bg-[#F2F7F4] px-3 py-1 rounded-full border border-[#CDE3D5]">
            <span className="w-2 h-2 rounded-full bg-[#1E5638] animate-pulse" />
            {isRtl ? tailor.availabilityLabelAr || 'متاح لاستقبال الطلبات' : tailor.availabilityLabel || 'Available for Commissions'}
          </span>
        );
      case 'busy':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A5B18] bg-[#FDF8EE] px-3 py-1 rounded-full border border-[#F3DFC1]">
            <Clock className="w-3.5 h-3.5 text-[#8A5B18]" />
            {isRtl ? tailor.availabilityLabelAr || 'مشغول حالياً (حجز مسبق)' : tailor.availabilityLabel || 'Currently Busy (Book Ahead)'}
          </span>
        );
      case 'available_soon':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2C4875] bg-[#F0F4FA] px-3 py-1 rounded-full border border-[#C8D7EC]">
            <Clock className="w-3.5 h-3.5 text-[#2C4875]" />
            {isRtl ? tailor.availabilityLabelAr || 'متاح قريباً' : tailor.availabilityLabel || 'Available Soon'}
          </span>
        );
    }
  };

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    if (!tailor.tailorReviews) return [];
    if (reviewFilterRating === 0) return tailor.tailorReviews;
    return tailor.tailorReviews.filter((r) => r.rating === reviewFilterRating);
  }, [tailor.tailorReviews, reviewFilterRating]);

  // Filtered portfolio
  const filteredPortfolio = useMemo(() => {
    if (!tailor.portfolioThumbnails) return [];
    if (portfolioTab === 'all') return tailor.portfolioThumbnails;
    return tailor.portfolioThumbnails.filter((item) => item.category === portfolioTab);
  }, [tailor.portfolioThumbnails, portfolioTab]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-16">
      {/* 1. Breadcrumb Bar */}
      <div className="border-b border-[#E6E2DB] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb
            items={[
              { label: t.navigation.home, onClick: onNavigateHome },
              { label: isRtl ? 'خيّاطو المملكة' : 'Tailors & Karigars', onClick: onNavigateTailors },
              { label: name },
            ]}
          />
        </div>
      </div>

      {/* 2. Profile Hero (Craftsperson Focus — Different from Shop Profile) */}
      <section className="bg-radial from-[#FAF6F0] via-[#FAF9F6] to-[#FAF9F6] border-b border-[#E6E2DB] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Identity & Avatar */}
            <div className="flex items-start sm:items-center gap-5">
              <div className="relative shrink-0">
                <Avatar
                  name={name}
                  src={tailor.avatarUrl}
                  size="xl"
                  isVerified={tailor.trust.isVerifiedTailor}
                  className="w-20 h-20 sm:w-24 sm:h-24 ring-4 ring-white shadow-md text-2xl"
                />
                {tailor.trust.badgeLevel === 'master_artisan' && (
                  <span
                    title={isRtl ? 'معلّم حرفي معتمد' : 'Master Artisan Certified'}
                    className="absolute -bottom-1 -end-1 bg-[#121316] text-[#C5A880] p-1.5 rounded-full border-2 border-white shadow-xs"
                  >
                    <Award className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <div>
                {/* Badges & Availability */}
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  {tailor.trust.isVerifiedTailor && (
                    <VerificationBadge type="verified_tailor" size="sm" />
                  )}
                  {tailor.trust.isPhysicalLocationVerified && (
                    <span className="text-[11px] font-medium text-[#1E5638] bg-[#F2F7F4] px-2 py-0.5 rounded border border-[#CDE3D5] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{isRtl ? 'حرفي تم تدقيقه' : 'Verified Profile'}</span>
                    </span>
                  )}
                  {getAvailabilityBadge()}
                </div>

                {/* Professional Name */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121316] font-display tracking-tight mb-1">
                  {name}
                </h1>

                {/* Title & Primary Specialty */}
                <p className="text-sm sm:text-base text-[#65625D] font-medium mb-2">
                  {title}
                </p>

                {/* Quick Meta: Experience, Rating, Shop, Location */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#65625D]">
                  {/* Experience */}
                  <span className="inline-flex items-center gap-1 font-semibold text-[#121316]">
                    <Award className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{tailor.yearsOfExperience} {t.common.years} {t.common.experience}</span>
                  </span>

                  <span>·</span>

                  {/* Rating */}
                  <div className="inline-flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#916F3E] text-[#916F3E]" />
                    <span className="font-bold text-[#121316]">{tailor.metrics.rating}</span>
                    <span className="text-[#8E8B85]">({tailor.metrics.reviewCount} {t.common.reviews})</span>
                  </div>

                  <span>·</span>

                  {/* Current Shop */}
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#8E8B85]" />
                    {shopName ? (
                      tailor.currentShopSlug ? (
                        <button
                          onClick={() => onNavigateShop && onNavigateShop(tailor.currentShopSlug!)}
                          className="font-medium text-[#121316] hover:text-[#916F3E] underline decoration-[#C5A880] cursor-pointer"
                        >
                          {shopName}
                        </button>
                      ) : (
                        <span className="font-medium text-[#121316]">{shopName}</span>
                      )
                    ) : (
                      <span className="font-medium text-[#65625D]">
                        {isRtl ? 'حرفي مستقل' : 'Independent Artisan'}
                      </span>
                    )}
                  </span>

                  <span>·</span>

                  {/* Location */}
                  <span className="inline-flex items-center gap-1 text-[#8E8B85]">
                    <MapPin className="w-3.5 h-3.5 text-[#916F3E]" />
                    <span>{area ? `${area}, ` : ''}{city}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions (Hero right side) */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              {/* Save Button */}
              <button
                onClick={handleToggleSave}
                title={isSaved ? 'Saved to favorites' : 'Save tailor'}
                className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-[#FAF6F0] border-[#C5A880] text-[#916F3E]'
                    : 'bg-white border-[#E6E2DB] text-[#65625D] hover:text-[#121316] hover:border-[#B8B4AC]'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#916F3E]' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? (isRtl ? 'محفوظ' : 'Saved') : (isRtl ? 'حفظ' : 'Save')}</span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                title="Share profile"
                className="p-2.5 rounded-xl border border-[#E6E2DB] bg-white text-[#65625D] hover:text-[#121316] hover:border-[#B8B4AC] text-xs font-semibold transition-all cursor-pointer flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">{isRtl ? 'مشاركة' : 'Share'}</span>
              </button>

              {/* Contact Button */}
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setModalMode('contact');
                  setIsModalOpen(true);
                }}
                icon={<MessageSquare className="w-4 h-4" />}
              >
                {isRtl ? 'استفسار' : 'Contact'}
              </Button>

              {/* Primary Book Fitting CTA */}
              <Button
                variant="gold"
                size="md"
                onClick={() => {
                  if (onStartBooking) {
                    onStartBooking({ tailorId: tailor.id, shopId: tailor.currentShopId });
                  } else {
                    setModalMode('book');
                    setIsModalOpen(true);
                  }
                }}
                icon={<Calendar className="w-4 h-4" />}
              >
                {isRtl ? 'حجز موعد تفصيل' : 'Book with Tailor'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Profile Grid Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Left/Center Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* 3. Professional Identity & Philosophy ("This is the person who actually makes the garment") */}
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E6E2DB] shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Scissors className="w-4 h-4 text-[#916F3E]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#121316]">
                  {isRtl ? 'الهوية الحرفية وفلسفة الحياكة' : 'The Craftsman’s Philosophy'}
                </h2>
              </div>

              {/* Quote Banner */}
              <blockquote className="p-4 rounded-xl bg-[#FAF9F6] border-s-4 border-[#916F3E] text-sm text-[#3D3B37] leading-relaxed italic mb-5">
                &ldquo;{isRtl ? tailor.philosophyAr || tailor.bioAr : tailor.philosophy || tailor.bio}&rdquo;
              </blockquote>

              {/* Concise Professional Bio */}
              <div className="text-xs sm:text-sm text-[#4A4742] leading-relaxed space-y-2">
                <p>{isRtl ? tailor.bioAr : tailor.bio}</p>
              </div>

              {/* Fast Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#F2EFE9] text-xs">
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB]">
                  <span className="block text-[11px] text-[#8E8B85] mb-0.5">{isRtl ? 'سنوات الخبرة' : 'Experience'}</span>
                  <span className="text-base font-bold text-[#121316] tabular-nums">{tailor.yearsOfExperience} {t.common.years}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB]">
                  <span className="block text-[11px] text-[#8E8B85] mb-0.5">{isRtl ? 'أثواب منجزة' : 'Orders Made'}</span>
                  <span className="text-base font-bold text-[#121316] tabular-nums">{tailor.completedWorksCount.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB]">
                  <span className="block text-[11px] text-[#8E8B85] mb-0.5">{isRtl ? 'نسبة الالتزام' : 'On-Time'}</span>
                  <span className="text-base font-bold text-[#1E5638] tabular-nums">{tailor.metrics.onTimeDeliveryRate}%</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB]">
                  <span className="block text-[11px] text-[#8E8B85] mb-0.5">{isRtl ? 'يبدأ من' : 'Starts At'}</span>
                  <span className="text-base font-bold text-[#916F3E] tabular-nums">{tailor.startingPriceSar} {t.common.sar}</span>
                </div>
              </div>
            </section>

            {/* 8. Skills & Specialties (Primary clearly separated from additional) */}
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E6E2DB] shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#121316] mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#916F3E]" />
                <span>{isRtl ? 'التخصصات والمهارات الحرفية' : 'Skills & Specialties'}</span>
              </h2>

              {/* Primary Specialty Showcase */}
              <div className="mb-5 p-4 rounded-xl bg-[#FAF6F0] border border-[#EDE4D5]">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#916F3E] block mb-1">
                  {isRtl ? 'التخصص الرئيسي الحرفي' : 'Primary Master Specialty'}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[#121316]">
                    {primarySpec}
                  </span>
                  <span className="text-xs text-[#916F3E] font-medium bg-white px-2 py-0.5 rounded border border-[#EDE4D5]">
                    {isRtl ? 'خبرة معتمدة' : 'Signature Cut'}
                  </span>
                </div>
              </div>

              {/* All Specialties (Zero-Pill discipline: unboxed metadata or clean tags) */}
              <div className="mb-5">
                <span className="block text-xs font-semibold text-[#65625D] mb-2">
                  {isRtl ? 'الموديلات والتصاميم المتقنة' : 'Garment Silhouettes & Styles'}
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {(isRtl ? tailor.specialtiesAr : tailor.specialties).map((spec, i) => (
                    <span
                      key={i}
                      className="bg-[#FAF9F6] text-[#24262E] px-3 py-1 rounded-lg border border-[#E6E2DB] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specific Craftsmanship Skills */}
              <div>
                <span className="block text-xs font-semibold text-[#65625D] mb-2">
                  {isRtl ? 'فنيات القص والتشطيب اليدوي' : 'Cutting & Finishing Mastery'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {(isRtl ? tailor.skillsAr : tailor.skills).map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF9F6] border border-[#F2EFE9] text-[#121316]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#916F3E] shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 11. Portfolio Section (Categorized with Lightbox) */}
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E6E2DB] shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#121316] flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#916F3E]" />
                    <span>{isRtl ? 'معرض الأعمال والتشطيبات' : 'Craftsmanship Portfolio'}</span>
                  </h2>
                  <p className="text-xs text-[#8E8B85] mt-0.5">
                    {isRtl ? 'عينات حقيقية من حياكة وتفصيل المعلّم' : 'Actual garment details executed by this artisan'}
                  </p>
                </div>

                {onNavigateDesigns && (
                  <button
                    onClick={onNavigateDesigns}
                    className="text-xs font-semibold text-[#916F3E] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'استعراض كل التصاميم في المنصة' : 'Explore Design Feed'}</span>
                  </button>
                )}

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap gap-1 bg-[#FAF9F6] p-1 rounded-lg border border-[#E6E2DB] text-xs">
                  {[
                    { id: 'all', label: isRtl ? 'الكل' : 'All' },
                    { id: 'thobe', label: isRtl ? 'أثواب' : 'Thobes' },
                    { id: 'collar', label: isRtl ? 'قلابات' : 'Collars' },
                    { id: 'cuff', label: isRtl ? 'أكمام وكبك' : 'Cuffs' },
                    { id: 'embroidery', label: isRtl ? 'تطريز' : 'Embroidery' },
                    { id: 'dagla', label: isRtl ? 'دقلات' : 'Dagla' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setPortfolioTab(tab.id)}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        portfolioTab === tab.id
                          ? 'bg-white text-[#916F3E] font-bold shadow-2xs'
                          : 'text-[#65625D] hover:text-[#121316]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {filteredPortfolio.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActivePortfolioItem(item)}
                    className="group rounded-xl border border-[#E6E2DB] hover:border-[#C5A880] p-4 bg-[#FAF9F6] transition-all cursor-pointer flex flex-col justify-between h-44 text-start hover:shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#916F3E] mb-1.5">
                        <span>{isRtl ? item.categoryLabelAr : item.categoryLabel}</span>
                        <Eye className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-xs font-bold text-[#121316] group-hover:text-[#916F3E] transition-colors line-clamp-2 mb-1">
                        {isRtl ? item.titleAr : item.title}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-[#E6E2DB]/60">
                      <span className="block text-[10px] text-[#8E8B85]">
                        {isRtl ? 'ملاحظة القماش / الحشوة:' : 'Fabric / Interlining:'}
                      </span>
                      <span className="text-[11px] font-medium text-[#4A4742] line-clamp-1">
                        {isRtl ? item.fabricNoteAr : item.fabricNote}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 12. Services & Work Types */}
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E6E2DB] shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#121316] mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#916F3E]" />
                <span>{isRtl ? 'الخدمات المتاحة والتفصيل' : 'Tailoring Services & Rates'}</span>
              </h2>

              <div className="space-y-3">
                {tailor.servicesOffered?.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 rounded-xl border border-[#E6E2DB] bg-[#FAF9F6] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-[#121316]">
                          {isRtl ? service.titleAr : service.title}
                        </h3>
                        <span className="text-[11px] text-[#8E8B85] bg-white px-2 py-0.5 rounded border border-[#E6E2DB]">
                          {service.durationDays} {isRtl ? 'أيام عمل' : 'days turnaround'}
                        </span>
                      </div>
                      <p className="text-xs text-[#65625D] max-w-md">
                        {isRtl ? service.descriptionAr : service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E6E2DB]">
                      <div className="text-end">
                        <PriceDisplay amount={service.priceSar} suffix={t.common.perThobe} size="sm" />
                      </div>
                      <Button
                        variant="gold"
                        size="sm"
                        onClick={() => {
                          setSelectedService(service);
                          setModalMode('book');
                          setIsModalOpen(true);
                        }}
                      >
                        {isRtl ? 'حجز الخدمة' : 'Request Service'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. Experience & Career Timeline */}
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E6E2DB] shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#121316] mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#916F3E]" />
                <span>{isRtl ? 'المسيرة المهنية وسجل الخبرات' : 'Career Timeline & Experience'}</span>
              </h2>

              <div className="relative ps-6 border-s-2 border-[#E6E2DB] space-y-6">
                {tailor.workHistory?.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -start-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#916F3E] border-2 border-white" />

                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <h3 className="text-sm font-bold text-[#121316]">
                        {isRtl ? item.roleAr : item.role}
                      </h3>
                      <span className="text-xs font-semibold text-[#916F3E]">
                        {isRtl ? item.periodAr : item.period}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-[#65625D] mb-2">
                      {isRtl ? item.shopNameAr : item.shopName} · {isRtl ? item.locationAr : item.location}
                    </p>

                    <ul className="space-y-1 text-xs text-[#65625D]">
                      {(isRtl ? item.highlightsAr : item.highlights).map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <span className="text-[#916F3E]">·</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 13. Reviews & Testimonials */}
            <section className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E6E2DB] shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E6E2DB]">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#121316] flex items-center gap-2">
                    <Star className="w-4 h-4 fill-[#916F3E] text-[#916F3E]" />
                    <span>{isRtl ? 'آراء وتقييمات العملاء' : 'Customer Reviews & Feedback'}</span>
                  </h2>
                  <p className="text-xs text-[#8E8B85] mt-0.5">
                    {isRtl
                      ? `تقييمات مخصصة لحياكة وتفصيل ${name} مباشرة`
                      : `Verified customer feedback specifically on ${name}'s craftsmanship`}
                  </p>
                </div>

                {/* Rating Filter Chips */}
                <div className="flex flex-wrap gap-1 text-xs">
                  <button
                    onClick={() => setReviewFilterRating(0)}
                    className={`px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                      reviewFilterRating === 0
                        ? 'bg-[#121316] text-[#FAF9F6] border-[#121316] font-semibold'
                        : 'bg-[#FAF9F6] text-[#65625D] border-[#E6E2DB]'
                    }`}
                  >
                    {isRtl ? 'الكل' : 'All'}
                  </button>
                  {[5, 4, 3].map((r) => (
                    <button
                      key={r}
                      onClick={() => setReviewFilterRating(r)}
                      className={`px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                        reviewFilterRating === r
                          ? 'bg-[#121316] text-[#FAF9F6] border-[#121316] font-semibold'
                          : 'bg-[#FAF9F6] text-[#65625D] border-[#E6E2DB]'
                      }`}
                    >
                      {r} ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                  <p className="text-xs text-[#8E8B85] text-center py-6">
                    {isRtl ? 'لا توجد مراجعات بهذا التصنيف' : 'No reviews match this rating filter'}
                  </p>
                ) : (
                  filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-xl border border-[#E6E2DB] bg-[#FAF9F6] space-y-2 text-start"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#121316]">
                            {isRtl ? rev.authorNameAr : rev.authorName}
                          </span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] text-[#1E5638] bg-[#F2F7F4] px-1.5 py-0.5 rounded border border-[#CDE3D5] flex items-center gap-0.5">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              <span>{isRtl ? 'طلب مؤكد' : 'Verified Order'}</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#8E8B85]">
                          {isRtl ? rev.dateAr : rev.date}
                        </span>
                      </div>

                      {/* Stars & Garment Type */}
                      <div className="flex items-center gap-2 text-xs">
                        <Rating score={rev.rating} size="sm" />
                        <span className="text-[11px] text-[#916F3E] font-medium">
                          {isRtl ? rev.garmentTypeAr : rev.garmentType}
                        </span>
                      </div>

                      {/* Review Text */}
                      <p className="text-xs text-[#4A4742] leading-relaxed">
                        &ldquo;{isRtl ? rev.commentAr : rev.comment}&rdquo;
                      </p>

                      {/* Tailor Response if present */}
                      {rev.tailorResponse && (
                        <div className="mt-2.5 p-3 rounded-lg bg-white border border-[#E6E2DB] text-xs">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#916F3E] mb-1">
                            <span>{isRtl ? 'رد المعلّم:' : 'Tailor Response:'}</span>
                          </div>
                          <p className="text-[#65625D]">
                            {isRtl ? rev.tailorResponseAr : rev.tailorResponse}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Right Column (1 Col) */}
          <aside className="space-y-6">
            {/* 5. Rating Summary Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#E6E2DB] shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] mb-3">
                {isRtl ? 'تقييم الحرفي' : 'Craftsman Rating'}
              </h3>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl font-extrabold text-[#121316] font-display">
                  {tailor.metrics.rating}
                </span>
                <div>
                  <div className="flex text-[#916F3E] mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= Math.round(tailor.metrics.rating)
                            ? 'fill-[#916F3E]'
                            : 'text-[#E6E2DB]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#8E8B85]">
                    {tailor.metrics.reviewCount} {isRtl ? 'تقييماً معتمداً' : 'verified reviews'}
                  </span>
                </div>
              </div>

              {/* Rating Distribution Bars */}
              {tailor.ratingDistribution && (
                <div className="space-y-1.5 pt-3 border-t border-[#F2EFE9] text-xs">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = (tailor.ratingDistribution as any)[stars] || 0;
                    const pct = Math.round((count / tailor.metrics.reviewCount) * 100) || 0;
                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="w-6 text-end text-[#8E8B85] font-medium">{stars} ★</span>
                        <div className="flex-1 h-2 bg-[#FAF9F6] rounded-full overflow-hidden border border-[#E6E2DB]">
                          <div
                            className="h-full bg-[#916F3E] rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-8 text-end text-[#8E8B85] tabular-nums">{count}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 10. Current Shop Affiliation Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#E6E2DB] shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] mb-3 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#916F3E]" />
                <span>{isRtl ? 'المشغل الحالي' : 'Current Atelier'}</span>
              </h3>

              {associatedShop ? (
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-[#121316]">
                      {isRtl ? associatedShop.nameAr : associatedShop.name}
                    </h4>
                    <p className="text-xs text-[#65625D] mt-0.5 line-clamp-2">
                      {isRtl ? associatedShop.taglineAr : associatedShop.tagline}
                    </p>
                  </div>

                  <div className="text-xs text-[#8E8B85] space-y-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#916F3E]" />
                      <span>{associatedShop.location.district}, {associatedShop.location.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8E8B85]" />
                      <span>{associatedShop.operatingHours.openTime} – {associatedShop.operatingHours.closeTime}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={() => onNavigateShop && onNavigateShop(associatedShop.slug)}
                      icon={<ExternalLink className="w-3.5 h-3.5" />}
                    >
                      {isRtl ? 'عرض صفحة المشغل' : 'View Atelier Profile'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#EDE4D5] text-xs">
                  <span className="font-bold text-[#916F3E] block mb-1">
                    {isRtl ? 'حرفي مستقل / معلّم خاص' : 'Independent Master Artisan'}
                  </span>
                  <p className="text-[#65625D] leading-relaxed">
                    {isRtl
                      ? 'يعمل بشكل مستقل ويستقبل طلبات القياس الخاصة والتعاون مع المشاغل المعتمدة.'
                      : 'Accepts direct bespoke private commissions and collaborates with premier ateliers.'}
                  </p>
                </div>
              )}
            </div>

            {/* 14. Availability & Working Hours */}
            <div className="bg-white p-5 rounded-2xl border border-[#E6E2DB] shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#916F3E]" />
                <span>{isRtl ? 'أوقات العمل واستقبال القياس' : 'Working Schedule'}</span>
              </h3>

              <div className="space-y-2 text-xs">
                {tailor.workingSchedule?.map((sched, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 border-b border-[#F2EFE9] last:border-b-0"
                  >
                    <span className="font-medium text-[#121316]">
                      {isRtl ? sched.daysAr : sched.days}
                    </span>
                    <span className="text-[#65625D]">
                      {isRtl ? sched.hoursAr : sched.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 15. Spoken Languages */}
            <div className="bg-white p-5 rounded-2xl border border-[#E6E2DB] shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] mb-3 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-[#916F3E]" />
                <span>{isRtl ? 'لغات التواصل' : 'Spoken Languages'}</span>
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {(isRtl ? tailor.languagesAr : tailor.languages).map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E6E2DB] text-xs font-medium text-[#121316]"
                  >
                    {lang}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-[#8E8B85] mt-2">
                {isRtl
                  ? 'لغات التواصل أثناء جلسات القياس والتشطيب'
                  : 'Direct communication languages during fittings'}
              </p>
            </div>

            {/* 16. Atelier Location Map Preview */}
            <div className="bg-white p-5 rounded-2xl border border-[#E6E2DB] shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#121316] mb-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#916F3E]" />
                <span>{isRtl ? 'موقع الاستوديو / المشغل' : 'Fitting Location'}</span>
              </h3>

              <div className="h-44 rounded-xl overflow-hidden border border-[#E6E2DB] mb-3">
                <MapPlaceholder
                  title={name}
                  address={isRtl ? 'استوديو وورشة التفصيل' : 'Bespoke Tailoring Studio'}
                  city={city}
                  district={area || 'Central'}
                  className="h-full"
                />
              </div>

              <div className="text-xs text-[#65625D] space-y-1">
                <p className="font-semibold text-[#121316]">
                  {area ? `${area}, ` : ''}{city}
                </p>
                <p className="text-[#8E8B85]">
                  {isRtl ? 'مواقف سيارات وخدمة صف السيارات متاحة' : 'Valet & client parking available'}
                </p>
              </div>
            </div>

            {/* 17. Direct Contact / Inquire Action */}
            <div className="p-5 rounded-2xl bg-[#121316] text-[#FAF9F6] shadow-sm space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A880] block">
                {isRtl ? 'بدء طلب التفصيل' : 'Commissioning Inquiry'}
              </span>
              <h4 className="text-base font-bold text-white">
                {isRtl ? `احجز جلسة قياس مع ${name}` : `Book a Fitting with ${name}`}
              </h4>
              <p className="text-xs text-[#A8A49D] leading-relaxed">
                {isRtl
                  ? 'اختر الخدمة والموديل، وحدد موعداً في المشغل أو اطلب خدمة القياس المنزلية VIP.'
                  : 'Select your garment style, pick a date at the salon or request a private home measurement.'}
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <Button
                  variant="gold"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setModalMode('book');
                    setIsModalOpen(true);
                  }}
                  icon={<Calendar className="w-4 h-4" />}
                >
                  {isRtl ? 'طلب موعد قياس' : 'Book Fitting Session'}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent text-white border-[#3D404D] hover:bg-white/10"
                  onClick={() => {
                    setModalMode('contact');
                    setIsModalOpen(true);
                  }}
                  icon={<MessageSquare className="w-3.5 h-3.5" />}
                >
                  {isRtl ? 'إرسال استفسار مباشر' : 'Send Message'}
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* 18. Similar Tailors / Other Master Karigars */}
        {similarTailors.length > 0 && (
          <section className="mt-14 pt-10 border-t border-[#E6E2DB]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#121316] font-display">
                  {isRtl ? 'معلّمون آخرون قد يناسبون طلبك' : 'Other Skilled Craftsmen You May Like'}
                </h2>
                <p className="text-xs text-[#65625D] mt-0.5">
                  {isRtl
                    ? `حرفيون متميزون في نفس المدينة أو تخصص ${primarySpec}`
                    : `Skilled tailors in the same city or specializing in ${primarySpec}`}
                </p>
              </div>

              {onNavigateTailors && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNavigateTailors}
                  icon={<ChevronIcon className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  {isRtl ? 'عرض جميع الخيّاطين' : 'View All Tailors'}
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {similarTailors.map((st) => (
                <TailorCard
                  key={st.id}
                  tailor={st}
                  onViewProfile={(sel) => {
                    if (onSelectTailor) onSelectTailor(sel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onSelectShop={onNavigateShop}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Portfolio Lightbox Modal */}
      {activePortfolioItem && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActivePortfolioItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full border border-[#E6E2DB] shadow-2xl p-6 text-start relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePortfolioItem(null)}
              className="absolute top-4 end-4 p-1.5 rounded-lg text-[#8E8B85] hover:text-[#121316] hover:bg-[#FAF9F6]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase font-bold tracking-wider text-[#916F3E] block mb-1">
              {isRtl ? activePortfolioItem.categoryLabelAr : activePortfolioItem.categoryLabel}
            </span>

            <h3 className="text-base font-bold text-[#121316] mb-3">
              {isRtl ? activePortfolioItem.titleAr : activePortfolioItem.title}
            </h3>

            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E6E2DB] text-xs space-y-2 mb-4">
              <div>
                <span className="font-semibold text-[#8E8B85] block text-[11px]">
                  {isRtl ? 'تفاصيل القماش المستخدم:' : 'Fabric Details:'}
                </span>
                <span className="font-bold text-[#121316]">
                  {isRtl ? activePortfolioItem.fabricNoteAr : activePortfolioItem.fabricNote}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#8E8B85] block text-[11px]">
                  {isRtl ? 'حرفي التنفيذ والقص:' : 'Craftsman:'}
                </span>
                <span className="font-bold text-[#916F3E]">{name}</span>
              </div>
            </div>

            <Button
              variant="gold"
              size="sm"
              className="w-full"
              onClick={() => {
                setActivePortfolioItem(null);
                setModalMode('book');
                setIsModalOpen(true);
              }}
            >
              {isRtl ? 'طلب تفصيل مماثل لهذا العمل' : 'Commission Similar Garment'}
            </Button>
          </div>
        </div>
      )}

      {/* Contact & Booking Modal */}
      <TailorContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedService(null);
        }}
        tailor={tailor}
        mode={modalMode}
        selectedService={selectedService}
      />
    </div>
  );
};
