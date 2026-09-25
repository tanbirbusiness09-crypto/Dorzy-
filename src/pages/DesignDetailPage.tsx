import React, { useState, useMemo } from 'react';
import {
  Bookmark,
  Share2,
  Play,
  Pause,
  Maximize2,
  X,
  Sparkles,
  MapPin,
  Clock,
  Scissors,
  CheckCircle2,
  ShieldCheck,
  Star,
  Eye,
  Store,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Check,
  MessageSquare,
  Building2,
} from 'lucide-react';
import { mockPortfolio } from '../data/mock/portfolio';
import { mockShops } from '../data/mock/shops';
import { mockTailors } from '../data/mock/tailors';
import { PortfolioItem, Shop, Tailor } from '../types';
import { useLanguage } from '../localization/LanguageContext';
import { useToast } from '../components/feedback/Toast';

// UI Components
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Rating } from '../components/ui/Rating';
import { PriceDisplay } from '../components/ui/PriceDisplay';
import { DesignCard } from '../components/marketplace/DesignCard';
import { TailoringArt } from '../components/marketplace/TailoringArtPlaceholder';
import { InspirationOrderModal } from '../components/marketplace/InspirationOrderModal';

export interface DesignDetailPageProps {
  designSlug?: string;
  designId?: string;
  onNavigateHome?: () => void;
  onNavigateDesigns?: () => void;
  onNavigateCreator?: (creatorType: 'tailor' | 'shop', slug: string) => void;
  onSelectDesign?: (design: PortfolioItem) => void;
  onStartBooking?: (params: { designId?: string; shopId?: string; tailorId?: string }) => void;
}

export const DesignDetailPage: React.FC<DesignDetailPageProps> = ({
  designSlug,
  designId,
  onNavigateHome,
  onNavigateDesigns,
  onNavigateCreator,
  onSelectDesign,
  onStartBooking,
}) => {
  const { isRtl } = useLanguage();
  const { showToast } = useToast();

  // Find design by slug or id, fallback to first
  const design: PortfolioItem = useMemo(() => {
    if (designSlug) {
      const match = mockPortfolio.find((d) => d.slug === designSlug || d.id === designSlug);
      if (match) return match;
    }
    if (designId) {
      const match = mockPortfolio.find((d) => d.id === designId || d.slug === designId);
      if (match) return match;
    }
    // Check URL path as fallback
    try {
      const pathParts = window.location.pathname.split('/');
      const designIndex = pathParts.indexOf('designs');
      if (designIndex !== -1 && pathParts[designIndex + 1]) {
        const urlSlug = pathParts[designIndex + 1];
        const match = mockPortfolio.find((d) => d.slug === urlSlug || d.id === urlSlug);
        if (match) return match;
      }
    } catch {}

    return mockPortfolio[0];
  }, [designSlug, designId]);

  // Gallery and media state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savesCount, setSavesCount] = useState(design.savesCount || design.likesCount || 0);
  const [isInspirationModalOpen, setIsInspirationModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const title = isRtl ? design.titleAr : design.title;
  const category = isRtl ? design.categoryAr : design.category;
  const style = isRtl ? design.styleAr : design.style;
  const city = isRtl ? design.cityAr : design.city;
  const district = isRtl ? design.districtAr : design.district;
  const description = isRtl ? design.descriptionAr || design.shortDescriptionAr : design.description || design.shortDescription;
  const creatorName = isRtl ? design.creatorNameAr : design.creatorName;
  const creatorTitle = isRtl ? design.creatorTitleAr : design.creatorTitle;
  const fabricDetails = isRtl ? design.fabricDetailsAr : design.fabricDetails;
  const fabricOrigin = isRtl ? design.fabricOriginAr : design.fabricOrigin;
  const collarStyle = isRtl ? design.collarStyleAr : design.collarStyle;
  const cuffStyle = isRtl ? design.cuffStyleAr : design.cuffStyle;
  const pocketStyle = isRtl ? design.pocketStyleAr : design.pocketStyle;
  const stitchingType = isRtl ? design.stitchingTypeAr : design.stitchingType;
  const embroideryDetails = isRtl ? design.embroideryDetailsAr : design.embroideryDetails;
  const occasion = isRtl ? design.occasionAr : design.occasion;

  const imagesList = design.images && design.images.length > 0 ? design.images : [design.imageUrl || ''];
  const currentMediaUrl = imagesList[selectedImageIndex] || design.imageUrl;

  // Find creator details (shop or tailor)
  const creatorShop = useMemo(() => {
    if (design.shopSlug || design.shopId) {
      return mockShops.find((s) => s.slug === design.shopSlug || s.id === design.shopId);
    }
    return undefined;
  }, [design]);

  const creatorTailor = useMemo(() => {
    if (design.tailorSlug || design.tailorId) {
      return mockTailors.find((t) => t.slug === design.tailorSlug || t.id === design.tailorId);
    }
    return undefined;
  }, [design]);

  // Related designs from the same creator or same category
  const relatedDesigns = useMemo(() => {
    return mockPortfolio
      .filter((d) => d.id !== design.id && (d.category === design.category || d.creatorId === design.creatorId))
      .slice(0, 3);
  }, [design]);

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    setSavesCount((prev) => (!isSaved ? prev + 1 : Math.max(0, prev - 1)));
    showToast({
      type: !isSaved ? 'success' : 'info',
      title: !isSaved ? (isRtl ? 'تم حفظ التصميم' : 'Design Saved') : (isRtl ? 'تمت الإزالة' : 'Removed from Saved'),
      description: title,
    });
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        showToast({
          type: 'success',
          title: isRtl ? 'تم نسخ الرابط' : 'Link Copied',
          description: isRtl ? 'يمكنك الآن مشاركة التصميم عبر وسائل التواصل' : 'Link copied to clipboard',
        });
      });
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `${title} - ${isRtl ? 'تفصيل خياطة من منصة خيّاط' : 'Bespoke tailoring design on Khayyat'}: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#121316]">
      {/* 1. TOP BREADCRUMB NAVIGATION */}
      <div className="bg-[#FAF9F6] border-b border-[#E6E2DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <Breadcrumb
            items={[
              { label: isRtl ? 'الرئيسية' : 'Home', onClick: onNavigateHome },
              { label: isRtl ? 'تصاميم الخياطة' : 'Designs', onClick: onNavigateDesigns },
              { label: title },
            ]}
          />
        </div>
      </div>

      {/* 2. MAIN DETAIL HERO CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: MEDIA GALLERY (7 Cols on LG) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Media Viewer */}
            <div className="relative aspect-[4/3] rounded-2xl bg-[#121316] overflow-hidden border border-[#D4D0C7] shadow-lg group select-none">
              {design.mediaType === 'video' && isVideoPlaying ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white p-6 relative">
                  <div className="text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#916F3E] text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                      <Play className="w-6 h-6 fill-current ms-1" />
                    </div>
                    <div className="font-semibold text-sm">
                      {isRtl ? 'عرض فيديو الحرفية والتفصيل' : 'Simulating Tailoring Craft Video'}
                    </div>
                    <p className="text-xs text-[#8E8B85] max-w-sm">
                      {isRtl
                        ? 'مقطع استعراض نزلة الكتف وانسيابية القماش بحركة 360 درجة'
                        : '360° Drape and shoulder pitch review by master artisan'}
                    </p>
                    <button
                      onClick={() => setIsVideoPlaying(false)}
                      className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold cursor-pointer"
                    >
                      {isRtl ? 'إيقاف مؤقت' : 'Pause Video'}
                    </button>
                  </div>
                </div>
              ) : (
                <img
                  src={currentMediaUrl}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
              )}

              {/* Video Play Overlay */}
              {design.mediaType === 'video' && !isVideoPlaying && (
                <button
                  type="button"
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/35 hover:bg-black/25 transition-colors cursor-pointer group/btn"
                >
                  <div className="w-16 h-16 rounded-full bg-[#121316]/90 border-2 border-[#C5A880] text-[#C5A880] flex items-center justify-center shadow-xl group-hover/btn:scale-110 group-hover/btn:bg-[#916F3E] group-hover/btn:text-white transition-all">
                    <Play className="w-6 h-6 fill-current ms-1" />
                  </div>
                  {design.videoDuration && (
                    <span className="absolute bottom-4 end-4 bg-[#121316]/85 backdrop-blur-md text-[#FAF9F6] text-xs font-semibold px-2.5 py-1 rounded-md">
                      {design.videoDuration}
                    </span>
                  )}
                </button>
              )}

              {/* Lightbox Zoom Trigger */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                title={isRtl ? 'تكبير الصورة' : 'Full Screen Zoom'}
                className="absolute top-4 end-4 p-2.5 rounded-xl bg-[#121316]/80 hover:bg-[#121316] text-[#FAF9F6] backdrop-blur-md transition-colors cursor-pointer shadow-md"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Quality & Origin Floating Tag */}
              <div className="absolute bottom-4 start-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-[#121316]/85 backdrop-blur-md text-[#C5A880] text-xs font-semibold border border-[#C5A880]/30 shadow-md">
                  {category}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[#121316] text-xs font-medium shadow-md">
                  {style}
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {imagesList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      setIsVideoPlaying(false);
                    }}
                    className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#916F3E] ring-2 ring-[#C5A880]/40 shadow-sm'
                        : 'border-[#E6E2DB] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`${title} angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Craftsmanship Highlights Banner */}
            <div className="p-4 bg-white rounded-xl border border-[#E6E2DB] shadow-xs flex items-center justify-between text-xs text-[#65625D]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span className="font-semibold text-[#121316]">
                  {isRtl ? 'حرفية معتمدة عبر المنصة' : 'Verified Tailoring Standard'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#8E8B85]">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {isRtl
                    ? `مدة التفصيل المعتادة: ${design.turnaroundDays || 5} أيام`
                    : `Est. Turnaround: ${design.turnaroundDays || 5} business days`}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DESIGN INFO & ACTIONS (5 Cols on LG) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Titles & Badges */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#916F3E] uppercase tracking-wider">
                    {category}
                  </span>
                  <span className="text-[#D4D0C7]">·</span>
                  <span className="text-xs text-[#65625D]">{style}</span>
                </div>

                {/* Availability Badge */}
                <Badge variant={design.isAvailableForOrder ? 'verified' : 'gold'}>
                  {design.isAvailableForOrder
                    ? isRtl
                      ? 'متاح للطلب'
                      : 'Available to Order'
                    : isRtl
                    ? 'إلهام وتراث'
                    : 'Inspiration Only'}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#121316] leading-tight">
                {title}
              </h1>

              {/* City and Metrics */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#65625D]">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>
                    {city}
                    {district ? ` · ${district}` : ''}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#C5A880] fill-[#C5A880]" />
                  <span className="font-bold text-[#121316] tabular-nums">{design.rating.toFixed(2)}</span>
                  {design.reviewCount && (
                    <span className="text-[#8E8B85]">({design.reviewCount} {isRtl ? 'تقييم' : 'reviews'})</span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-[#8E8B85]" />
                  <span className="tabular-nums">
                    {design.viewsCount.toLocaleString()} {isRtl ? 'مشاهدة' : 'views'}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-white border border-[#E6E2DB] shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8E8B85] block">
                  {isRtl ? 'السعر المبدئي للتفصيل' : 'Starting Tailoring Price'}
                </span>
                <div className="text-2xl font-bold font-display text-[#121316]">
                  <span className="tabular-nums">{design.priceSar}</span>{' '}
                  <span className="text-sm font-normal text-[#65625D]">{isRtl ? 'ر.س' : 'SAR'}</span>
                </div>
              </div>

              <div className="text-end text-[11px] text-[#8E8B85]">
                {isRtl ? 'شامل ضريبة القيمة المضافة 15%' : 'Includes 15% Saudi VAT'}
              </div>
            </div>

            {/* Primary Action Button: "Use as Inspiration" */}
            <div className="space-y-2.5">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center shadow-md py-3 text-sm font-semibold"
                onClick={() => {
                  if (onStartBooking) {
                    onStartBooking({
                      designId: design.id,
                      shopId: design.shopId || creatorShop?.id,
                      tailorId: design.tailorId || creatorTailor?.id,
                    });
                  } else {
                    setIsInspirationModalOpen(true);
                  }
                }}
              >
                <Sparkles className="w-4 h-4 me-2 text-[#FAF9F6]" />
                <span>
                  {design.isAvailableForOrder
                    ? isRtl
                      ? 'طلب تفصيل هذا التصميم'
                      : 'Request This Design for Order'
                    : isRtl
                    ? 'استخدم كمرجع وإلهام لطلبك'
                    : 'Use as Inspiration for Order'}
                </span>
              </Button>

              {/* Secondary Actions (Save & Share) */}
              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleToggleSave}
                  className={`justify-center ${
                    isSaved ? 'bg-[#C5A880]/15 text-[#916F3E] border-[#C5A880]' : ''
                  }`}
                >
                  <Bookmark className={`w-4 h-4 me-1.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span>
                    {isSaved
                      ? isRtl
                        ? 'محفوظ'
                        : 'Saved'
                      : isRtl
                      ? `حفظ (${savesCount})`
                      : `Save (${savesCount})`}
                  </span>
                </Button>

                <Button variant="outline" size="md" onClick={handleShare} className="justify-center">
                  {isCopied ? <Check className="w-4 h-4 me-1.5 text-[#1E5638]" /> : <Share2 className="w-4 h-4 me-1.5" />}
                  <span>{isCopied ? (isRtl ? 'تم النسخ!' : 'Copied!') : isRtl ? 'مشاركة' : 'Share'}</span>
                </Button>
              </div>
            </div>

            {/* Description Paragraph */}
            {description && (
              <div className="p-4 bg-white rounded-xl border border-[#E6E2DB] shadow-xs">
                <h3 className="text-xs font-bold text-[#121316] uppercase tracking-wider mb-2">
                  {isRtl ? 'عن هذا التصميم' : 'About This Design'}
                </h3>
                <p className="text-xs sm:text-sm text-[#65625D] leading-relaxed">
                  {description}
                </p>
              </div>
            )}

            {/* Sartorial Specifications Breakdown */}
            <div className="bg-white rounded-xl border border-[#E6E2DB] shadow-xs p-4 sm:p-5 space-y-3">
              <h3 className="text-xs font-bold text-[#121316] uppercase tracking-wider border-b border-[#E6E2DB] pb-2 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-[#916F3E]" />
                <span>{isRtl ? 'المواصفات الحرفية والهندسية' : 'Sartorial Anatomy & Details'}</span>
              </h3>

              <div className="space-y-2 text-xs">
                {/* Fabric */}
                <div className="flex items-start justify-between gap-3 py-1 border-b border-[#F5F2EB]">
                  <span className="font-semibold text-[#121316] shrink-0">
                    {isRtl ? 'القماش والمنسوج:' : 'Fabric & Mill:'}
                  </span>
                  <span className="text-end text-[#65625D]">
                    {fabricDetails}
                    {fabricOrigin ? ` (${fabricOrigin})` : ''}
                  </span>
                </div>

                {/* Collar */}
                <div className="flex items-start justify-between gap-3 py-1 border-b border-[#F5F2EB]">
                  <span className="font-semibold text-[#121316] shrink-0">
                    {isRtl ? 'ستايل القلاب:' : 'Collar Style:'}
                  </span>
                  <span className="text-end text-[#65625D]">{collarStyle}</span>
                </div>

                {/* Cuff */}
                <div className="flex items-start justify-between gap-3 py-1 border-b border-[#F5F2EB]">
                  <span className="font-semibold text-[#121316] shrink-0">
                    {isRtl ? 'ستايل الكبك:' : 'Cuff Style:'}
                  </span>
                  <span className="text-end text-[#65625D]">{cuffStyle}</span>
                </div>

                {/* Pocket */}
                {pocketStyle && (
                  <div className="flex items-start justify-between gap-3 py-1 border-b border-[#F5F2EB]">
                    <span className="font-semibold text-[#121316] shrink-0">
                      {isRtl ? 'المخبأ والجيوب:' : 'Pocket Style:'}
                    </span>
                    <span className="text-end text-[#65625D]">{pocketStyle}</span>
                  </div>
                )}

                {/* Stitching */}
                {stitchingType && (
                  <div className="flex items-start justify-between gap-3 py-1 border-b border-[#F5F2EB]">
                    <span className="font-semibold text-[#121316] shrink-0">
                      {isRtl ? 'دقة الخياطة:' : 'Stitching Needlework:'}
                    </span>
                    <span className="text-end text-[#65625D]">{stitchingType}</span>
                  </div>
                )}

                {/* Embroidery */}
                {embroideryDetails && (
                  <div className="flex items-start justify-between gap-3 py-1 border-b border-[#F5F2EB]">
                    <span className="font-semibold text-[#121316] shrink-0">
                      {isRtl ? 'التطريز والحليات:' : 'Embroidery & Zari:'}
                    </span>
                    <span className="text-end text-[#65625D]">{embroideryDetails}</span>
                  </div>
                )}

                {/* Occasion */}
                {occasion && (
                  <div className="flex items-start justify-between gap-3 py-1">
                    <span className="font-semibold text-[#121316] shrink-0">
                      {isRtl ? 'المناسبة المقترحة:' : 'Recommended Occasion:'}
                    </span>
                    <span className="text-end text-[#65625D]">{occasion}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Creator Profile Showcase Card */}
            <div className="bg-[#FAF9F6] rounded-xl border border-[#C5A880]/50 p-4 sm:p-5 shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#916F3E] mb-3">
                {isRtl ? 'صاحب العمل والحِرفي المنفذ' : 'Crafted By Creator'}
              </div>

              <div className="flex items-start gap-3.5">
                <Avatar
                  src={design.creatorAvatar}
                  name={creatorName}
                  size="lg"
                  isVerified={design.isVerified}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm sm:text-base font-bold text-[#121316] truncate">
                      {creatorName}
                    </h4>
                    {design.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-[#916F3E] font-medium mt-0.5">
                    {creatorTitle ||
                      (design.creatorType === 'tailor'
                        ? isRtl
                          ? 'معلّم خياطة أول'
                          : 'Master Bespoke Artisan'
                        : isRtl
                        ? 'مشغل خياطة معتمد'
                        : 'Bespoke Atelier')}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-[#65625D] mt-1.5">
                    <Rating score={design.creatorRating} size="sm" />
                    <span className="text-[#8E8B85]">
                      ({design.creatorReviewCount} {isRtl ? 'تقييم' : 'reviews'})
                    </span>
                  </div>

                  {design.shopName && design.creatorType === 'tailor' && (
                    <div className="mt-2 text-xs text-[#65625D] flex items-center gap-1">
                      <Store className="w-3.5 h-3.5 text-[#8E8B85]" />
                      <span>{isRtl ? design.shopNameAr : design.shopName}</span>
                    </div>
                  )}

                  {/* Actions to visit creator */}
                  <div className="mt-3.5 flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onNavigateCreator?.(design.creatorType, design.creatorSlug)}
                    >
                      <span>
                        {design.creatorType === 'tailor'
                          ? isRtl
                            ? 'عرض ملف الخياط'
                            : 'View Tailor Profile'
                          : isRtl
                          ? 'عرض المشغل'
                          : 'View Atelier'}
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsInspirationModalOpen(true)}
                    >
                      <MessageSquare className="w-3.5 h-3.5 me-1" />
                      <span>{isRtl ? 'مراسلة المشغل' : 'Contact'}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SIMILAR / RELATED DESIGNS SECTION */}
        {relatedDesigns.length > 0 && (
          <section className="mt-16 pt-10 border-t border-[#E6E2DB] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[#916F3E] uppercase tracking-wider">
                  {isRtl ? 'تصاميم مقترحة' : 'More Like This'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[#121316]">
                  {isRtl ? 'أعمال وحرفية مشابهة قد تعجبك' : 'Related Sartorial Works'}
                </h2>
              </div>

              <Button variant="outline" size="sm" onClick={onNavigateDesigns}>
                <span>{isRtl ? 'استكشاف جميع التصاميم' : 'Explore All Designs'}</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDesigns.map((rel) => (
                <DesignCard
                  key={rel.id}
                  design={rel}
                  onSelectDesign={onSelectDesign}
                  onSelectCreator={onNavigateCreator}
                  onUseAsInspiration={(d) => setIsInspirationModalOpen(true)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 4. LIGHTBOX ZOOM MODAL */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 end-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] relative flex flex-col items-center">
            <img
              src={currentMediaUrl}
              alt={title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center text-[#FAF9F6]">
              <h3 className="font-display font-bold text-lg">{title}</h3>
              <p className="text-xs text-[#A8A49D] mt-0.5">{fabricDetails} · {collarStyle}</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. INSPIRATION ORDER MODAL */}
      <InspirationOrderModal
        isOpen={isInspirationModalOpen}
        onClose={() => setIsInspirationModalOpen(false)}
        design={design}
        onNavigateCreator={onNavigateCreator}
      />
    </div>
  );
};
