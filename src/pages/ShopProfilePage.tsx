import React, { useMemo, useEffect } from 'react';
import { mockShops } from '../data/mock/shops';
import { mockServices } from '../data/mock/services';
import { mockTailors } from '../data/mock/tailors';
import { mockPortfolio } from '../data/mock/portfolio';
import { mockReviews } from '../data/mock/reviews';
import { mockFabrics } from '../data/mock/fabrics';
import { Shop } from '../types';
import { ShopProfileView } from '../components/marketplace/ShopProfileView';
import { EmptyState } from '../components/ui/EmptyState';
import { Store } from 'lucide-react';
import { useLanguage } from '../localization/LanguageContext';

export interface ShopProfilePageProps {
  shopSlug?: string;
  shopId?: string;
  onNavigateHome?: () => void;
  onNavigateShops?: () => void;
  onSelectShop?: (shop: Shop) => void;
  onStartBooking?: (params: { shopId?: string; serviceId?: string; tailorId?: string }) => void;
}

export const ShopProfilePage: React.FC<ShopProfilePageProps> = ({
  shopSlug,
  shopId,
  onNavigateHome,
  onNavigateShops,
  onSelectShop,
  onStartBooking,
}) => {
  const { isRtl } = useLanguage();

  // Find shop from slug, id, or fallback to first shop
  const currentShop: Shop | undefined = useMemo(() => {
    if (shopSlug) {
      const found = mockShops.find((s) => s.slug === shopSlug);
      if (found) return found;
    }
    if (shopId) {
      const found = mockShops.find((s) => s.id === shopId);
      if (found) return found;
    }
    // Check URL pathname/search as fallback if props are not explicitly passed
    try {
      const pathParts = window.location.pathname.split('/');
      const slugIndex = pathParts.indexOf('shops');
      if (slugIndex !== -1 && pathParts[slugIndex + 1]) {
        const urlSlug = pathParts[slugIndex + 1];
        const found = mockShops.find((s) => s.slug === urlSlug || s.id === urlSlug);
        if (found) return found;
      }

      const params = new URLSearchParams(window.location.search);
      const querySlug = params.get('shop') || params.get('slug');
      if (querySlug) {
        const found = mockShops.find((s) => s.slug === querySlug || s.id === querySlug);
        if (found) return found;
      }
    } catch {
      // safe fallback
    }

    return mockShops[0];
  }, [shopSlug, shopId]);

  // Keep browser URL sync-ready for /shops/:shopSlug
  useEffect(() => {
    if (currentShop && typeof window !== 'undefined') {
      try {
        const currentPath = window.location.pathname;
        if (!currentPath.includes(currentShop.slug)) {
          window.history.replaceState(null, '', `/shops/${currentShop.slug}`);
        }
      } catch {
        // Safe fallback in restricted environments
      }
    }
  }, [currentShop]);

  if (!currentShop) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          icon={<Store className="w-8 h-8" />}
          title={isRtl ? 'المشغل غير موجود' : 'Atelier Not Found'}
          description={
            isRtl
              ? 'تعذر العثور على المشغل المطلوب في قاعدة البيانات. يمكنك استكشاف المشاغل الأخرى المتاحة.'
              : 'The requested tailoring shop could not be found. Please explore our curated list of ateliers.'
          }
          actionLabel={isRtl ? 'استعراض كافة المشاغل' : 'Browse All Ateliers'}
          onAction={onNavigateShops}
        />
      </div>
    );
  }

  // Filter tailors associated with this shop or relevant city
  const shopTailors = useMemo(() => {
    const direct = mockTailors.filter((t) => t.currentShopId === currentShop.id);
    if (direct.length > 0) return direct;
    return mockTailors.filter((t) => t.city.toLowerCase() === currentShop.location.city.toLowerCase()).slice(0, 3);
  }, [currentShop]);

  // Filter portfolio items for this shop
  const shopPortfolio = useMemo(() => {
    const direct = mockPortfolio.filter((p) => p.shopId === currentShop.id);
    if (direct.length > 0) return direct;
    return mockPortfolio.slice(0, 6);
  }, [currentShop]);

  // Filter reviews for this shop
  const shopReviews = useMemo(() => {
    const direct = mockReviews.filter((r) => r.targetId === currentShop.id);
    if (direct.length > 0) return direct;
    return mockReviews.slice(0, 4);
  }, [currentShop]);

  // Similar shops (same city, excluding current shop)
  const similarShops = useMemo(() => {
    return mockShops
      .filter((s) => s.id !== currentShop.id && s.location.city === currentShop.location.city)
      .slice(0, 3);
  }, [currentShop]);

  return (
    <ShopProfileView
      shop={currentShop}
      services={mockServices}
      fabrics={mockFabrics}
      tailors={shopTailors}
      portfolioItems={shopPortfolio}
      reviews={shopReviews}
      similarShops={similarShops}
      onNavigateHome={onNavigateHome}
      onNavigateShops={onNavigateShops}
      onSelectShop={onSelectShop}
      onStartBooking={onStartBooking}
    />
  );
};
