import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './localization/LanguageContext';
import { RoleProvider } from './components/role/RoleContext';
import { ToastProvider } from './components/feedback/Toast';
import { AppShell } from './components/layout/AppShell';
import { MarketplaceHome } from './pages/MarketplaceHome';
import { ShopDiscoveryPage } from './pages/ShopDiscoveryPage';
import { ShopProfilePage } from './pages/ShopProfilePage';
import { TailorDiscoveryPage } from './pages/TailorDiscoveryPage';
import { TailorProfilePage } from './pages/TailorProfilePage';
import { DesignDiscoveryPage } from './pages/DesignDiscoveryPage';
import { DesignDetailPage } from './pages/DesignDetailPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { DashboardTabId } from './components/dashboard/CustomerDashboardLayout';
import { BookingPage } from './pages/BookingPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import {
  Layers,
  Store,
  Search,
  LayoutDashboard,
  UserCheck,
  Scissors,
  User,
  Sparkles,
  Palette,
  Calendar,
} from 'lucide-react';
import { mockShops } from './data/mock/shops';
import { mockTailors } from './data/mock/tailors';
import { mockPortfolio } from './data/mock/portfolio';
import { mockServices } from './data/mock/services';
import { createBookingFromDraft, mockBookingScenarios } from './data/mock/booking';
import { Shop, Tailor, PortfolioItem, Booking } from './types';

export default function App() {
  const [viewMode, setViewMode] = useState<
    | 'marketplace'
    | 'shops'
    | 'shop-profile'
    | 'tailors'
    | 'tailor-profile'
    | 'designs'
    | 'design-detail'
    | 'booking'
    | 'booking-success'
    | 'order-detail'
    | 'design-system'
    | 'dashboard'
  >('marketplace');
  const [activeRoute, setActiveRoute] = useState('home');
  const [dashboardTab, setDashboardTab] = useState<DashboardTabId>('overview');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedShop, setSelectedShop] = useState<Shop>(mockShops[0]);
  const [selectedTailor, setSelectedTailor] = useState<Tailor>(mockTailors[0]);
  const [selectedDesign, setSelectedDesign] = useState<PortfolioItem>(mockPortfolio[0]);
  const [bookingParams, setBookingParams] = useState<{
    shopId?: string;
    tailorId?: string;
    serviceId?: string;
    designId?: string;
  }>({});
  const [activeBooking, setActiveBooking] = useState<Booking>(() =>
    createBookingFromDraft(mockBookingScenarios[0].draft)
  );

  // Handle URL path initialization
  useEffect(() => {
    try {
      const pathname = window.location.pathname;
      const params = new URLSearchParams(window.location.search);

      // Customer Dashboard routes check
      if (pathname.startsWith('/dashboard')) {
        setViewMode('dashboard');
        if (pathname.startsWith('/dashboard/orders/')) {
          const ordId = pathname.replace('/dashboard/orders/', '').split('/')[0];
          setSelectedOrderId(ordId);
          setDashboardTab('orders');
        } else if (pathname === '/dashboard/orders') {
          setDashboardTab('orders');
          setSelectedOrderId(null);
        } else if (pathname === '/dashboard/bookings') {
          setDashboardTab('bookings');
          setSelectedOrderId(null);
        } else if (pathname === '/dashboard/measurements') {
          setDashboardTab('measurements');
          setSelectedOrderId(null);
        } else if (pathname === '/dashboard/favorites' || pathname === '/dashboard/designs') {
          setDashboardTab('favorites');
          setSelectedOrderId(null);
        } else if (pathname === '/dashboard/addresses') {
          setDashboardTab('addresses');
          setSelectedOrderId(null);
        } else if (pathname === '/dashboard/notifications') {
          setDashboardTab('notifications');
          setSelectedOrderId(null);
        } else if (pathname === '/dashboard/profile' || pathname === '/dashboard/settings') {
          setDashboardTab('profile');
          setSelectedOrderId(null);
        } else {
          setDashboardTab('overview');
          setSelectedOrderId(null);
        }
        return;
      }

      // Booking routes check
      if (pathname === '/booking/success') {
        setViewMode('booking-success');
        return;
      }
      if (pathname.startsWith('/booking')) {
        setBookingParams({
          shopId: params.get('shop') || undefined,
          tailorId: params.get('tailor') || undefined,
          serviceId: params.get('service') || undefined,
          designId: params.get('design') || undefined,
        });
        setViewMode('booking');
        return;
      }
      if (pathname.startsWith('/orders/')) {
        const ordId = pathname.replace('/orders/', '').split('/')[0];
        setSelectedOrderId(ordId);
        setViewMode('order-detail');
        return;
      }

      // Designs route check
      if (pathname.startsWith('/designs/')) {
        const slug = pathname.replace('/designs/', '').split('/')[0];
        if (slug) {
          const matched = mockPortfolio.find((d) => d.slug === slug || d.id === slug);
          if (matched) {
            setSelectedDesign(matched);
            setViewMode('design-detail');
            setActiveRoute('designs');
            return;
          }
        }
      } else if (pathname === '/designs') {
        setViewMode('designs');
        setActiveRoute('designs');
        return;
      }

      // Tailors route check
      if (pathname.startsWith('/tailors/')) {
        const slug = pathname.replace('/tailors/', '').split('/')[0];
        if (slug) {
          const matched = mockTailors.find((t) => t.slug === slug || t.id === slug);
          if (matched) {
            setSelectedTailor(matched);
            setViewMode('tailor-profile');
            setActiveRoute('tailors');
            return;
          }
        }
      } else if (pathname === '/tailors') {
        setViewMode('tailors');
        setActiveRoute('tailors');
        return;
      }

      // Shops route check
      if (pathname.startsWith('/shops/')) {
        const slug = pathname.replace('/shops/', '').split('/')[0];
        if (slug) {
          const matched = mockShops.find((s) => s.slug === slug || s.id === slug);
          if (matched) {
            setSelectedShop(matched);
            setViewMode('shop-profile');
            setActiveRoute('shops');
            return;
          }
        }
      } else if (pathname === '/shops') {
        setViewMode('shops');
        setActiveRoute('shops');
        return;
      }

      // Search Query Param check (?design=slug or ?tailor=slug or ?shop=slug)
      const queryDesign = params.get('design') || params.get('portfolio');
      if (queryDesign) {
        const matched = mockPortfolio.find((d) => d.slug === queryDesign || d.id === queryDesign);
        if (matched) {
          setSelectedDesign(matched);
          setViewMode('design-detail');
          setActiveRoute('designs');
          return;
        }
      }

      const queryTailor = params.get('tailor');
      if (queryTailor) {
        const matched = mockTailors.find((t) => t.slug === queryTailor || t.id === queryTailor);
        if (matched) {
          setSelectedTailor(matched);
          setViewMode('tailor-profile');
          setActiveRoute('tailors');
          return;
        }
      }

      const queryShop = params.get('shop');
      if (queryShop) {
        const matched = mockShops.find((s) => s.slug === queryShop || s.id === queryShop);
        if (matched) {
          setSelectedShop(matched);
          setViewMode('shop-profile');
          setActiveRoute('shops');
        }
      }
    } catch {
      // Safe fallback in restricted environments
    }
  }, []);

  // Handle global route changes
  const handleNavigate = (route: string) => {
    setActiveRoute(route);
    if (route === 'designs') {
      setViewMode('designs');
      try {
        window.history.pushState({}, '', '/designs');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'tailors') {
      setViewMode('tailors');
      try {
        window.history.pushState({}, '', '/tailors');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'shops' || route === 'explore') {
      setViewMode('shops');
      try {
        window.history.pushState({}, '', '/shops');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'home') {
      setViewMode('marketplace');
      try {
        window.history.pushState({}, '', '/');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'design-system') {
      setViewMode('design-system');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'booking') {
      handleStartBooking({});
    } else if (route === 'dashboard') {
      setViewMode('dashboard');
      setDashboardTab('overview');
      setSelectedOrderId(null);
      try {
        window.history.pushState({}, '', '/dashboard');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'orders') {
      setViewMode('dashboard');
      setDashboardTab('orders');
      setSelectedOrderId(null);
      try {
        window.history.pushState({}, '', '/dashboard/orders');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'bookings') {
      setViewMode('dashboard');
      setDashboardTab('bookings');
      setSelectedOrderId(null);
      try {
        window.history.pushState({}, '', '/dashboard/bookings');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'measurements') {
      setViewMode('dashboard');
      setDashboardTab('measurements');
      setSelectedOrderId(null);
      try {
        window.history.pushState({}, '', '/dashboard/measurements');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'favorites') {
      setViewMode('dashboard');
      setDashboardTab('favorites');
      setSelectedOrderId(null);
      try {
        window.history.pushState({}, '', '/dashboard/favorites');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'profile') {
      setViewMode('dashboard');
      setDashboardTab('profile');
      setSelectedOrderId(null);
      try {
        window.history.pushState({}, '', '/dashboard/profile');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setViewMode('marketplace');
    }
  };

  // Handle opening an individual shop profile
  const handleSelectShop = (shop: Shop) => {
    setSelectedShop(shop);
    setViewMode('shop-profile');
    setActiveRoute('shops');
    try {
      window.history.pushState({}, '', `/shops/${shop.slug}`);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectShopBySlug = (slug: string) => {
    const matched = mockShops.find((s) => s.slug === slug || s.id === slug);
    if (matched) {
      handleSelectShop(matched);
    } else {
      handleNavigate('shops');
    }
  };

  // Handle opening an individual tailor profile
  const handleSelectTailor = (tailor: Tailor) => {
    setSelectedTailor(tailor);
    setViewMode('tailor-profile');
    setActiveRoute('tailors');
    try {
      window.history.pushState({}, '', `/tailors/${tailor.slug}`);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle opening an individual design detail
  const handleSelectDesign = (design: PortfolioItem) => {
    setSelectedDesign(design);
    setViewMode('design-detail');
    setActiveRoute('designs');
    try {
      window.history.pushState({}, '', `/designs/${design.slug}`);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cross-entity navigation handler (e.g. from design to creator)
  const handleSelectCreator = (creatorType: 'tailor' | 'shop', slug: string) => {
    if (creatorType === 'tailor') {
      const matched = mockTailors.find((t) => t.slug === slug || t.id === slug);
      if (matched) {
        handleSelectTailor(matched);
      } else {
        handleNavigate('tailors');
      }
    } else {
      const matched = mockShops.find((s) => s.slug === slug || s.id === slug);
      if (matched) {
        handleSelectShop(matched);
      } else {
        handleNavigate('shops');
      }
    }
  };

  // Step 09: Customer Booking Flow Handlers
  const handleStartBooking = (params: {
    shopId?: string;
    tailorId?: string;
    serviceId?: string;
    designId?: string;
  }) => {
    setBookingParams(params);
    setViewMode('booking');
    setActiveRoute('booking');
    const query = new URLSearchParams();
    if (params.shopId) query.set('shop', params.shopId);
    if (params.tailorId) query.set('tailor', params.tailorId);
    if (params.serviceId) query.set('service', params.serviceId);
    if (params.designId) query.set('design', params.designId);
    const qs = query.toString();
    try {
      window.history.pushState({}, '', `/booking${qs ? `?${qs}` : ''}`);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSuccess = (booking: Booking) => {
    setActiveBooking(booking);
    setViewMode('booking-success');
    setActiveRoute('booking');
    try {
      window.history.pushState({}, '', '/booking/success');
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setViewMode('dashboard');
    setDashboardTab('orders');
    try {
      window.history.pushState({}, '', `/dashboard/orders/${orderId}`);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitBooking = () => {
    setViewMode('marketplace');
    setActiveRoute('home');
    try {
      window.history.pushState({}, '', '/');
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <RoleProvider>
        <ToastProvider>
          {/* Top Environment Switcher Bar for Step 10 Validation */}
          <div className="bg-[#121316] text-[#FAF9F6] border-b border-[#24262E] px-4 py-2 flex items-center justify-between text-xs select-none z-50 overflow-x-auto">
            <div className="flex items-center gap-2 shrink-0 me-3">
              <span className="font-display font-bold text-[#C5A880]">KHAYYAT</span>
              <span className="text-[#8E8B85]">·</span>
              <span className="text-[#A8A49D] hidden sm:inline">
                Step 10 Customer Dashboard + Order Tracking + Account Experience
              </span>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center p-0.5 bg-[#24262E] rounded-lg border border-[#3D404D] shrink-0 overflow-x-auto">
              {/* Home */}
              <button
                onClick={() => handleNavigate('home')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                  viewMode === 'marketplace'
                    ? 'bg-[#121316] text-[#FAF9F6] font-semibold shadow-xs'
                    : 'text-[#A8A49D] hover:text-[#FAF9F6]'
                }`}
              >
                <Store className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden md:inline">Home</span>
              </button>

              {/* Step 10 /dashboard CTA */}
              <button
                onClick={() => handleNavigate('dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                  viewMode === 'dashboard' || viewMode === 'order-detail'
                    ? 'bg-[#916F3E] text-[#FAF9F6] font-semibold shadow-xs'
                    : 'text-[#C5A880] hover:text-[#FAF9F6]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="font-semibold">/dashboard (Step 10)</span>
              </button>

              {/* Step 09 /booking */}
              <button
                onClick={() => handleStartBooking({})}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                  viewMode === 'booking' || viewMode === 'booking-success'
                    ? 'bg-[#121316] text-[#FAF9F6] font-semibold shadow-xs'
                    : 'text-[#A8A49D] hover:text-[#FAF9F6]'
                }`}
              >
                <Scissors className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden lg:inline">/booking</span>
              </button>

              {/* /designs */}
              <button
                onClick={() => handleNavigate('designs')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                  viewMode === 'designs'
                    ? 'bg-[#121316] text-[#FAF9F6] font-semibold shadow-xs'
                    : 'text-[#A8A49D] hover:text-[#FAF9F6]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden sm:inline">/designs</span>
              </button>

              {/* /shops */}
              <button
                onClick={() => handleNavigate('shops')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                  viewMode === 'shops'
                    ? 'bg-[#121316] text-[#FAF9F6] font-semibold shadow-xs'
                    : 'text-[#A8A49D] hover:text-[#FAF9F6]'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden lg:inline">/shops</span>
              </button>

              {/* /tailors */}
              <button
                onClick={() => handleNavigate('tailors')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                  viewMode === 'tailors'
                    ? 'bg-[#121316] text-[#FAF9F6] font-semibold shadow-xs'
                    : 'text-[#A8A49D] hover:text-[#FAF9F6]'
                }`}
              >
                <Scissors className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden lg:inline">/tailors</span>
              </button>

              {/* Design System */}
              <button
                onClick={() => handleNavigate('design-system')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                  viewMode === 'design-system'
                    ? 'bg-[#121316] text-[#FAF9F6] font-semibold shadow-xs'
                    : 'text-[#A8A49D] hover:text-[#FAF9F6]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="hidden xl:inline">Tokens</span>
              </button>
            </div>
          </div>

          {/* Render corresponding Shell & View */}
          {viewMode === 'marketplace' ? (
            <AppShell activeRoute={activeRoute} onNavigate={handleNavigate}>
              <MarketplaceHome
                onNavigate={handleNavigate}
                onSelectShop={handleSelectShop}
                onSelectTailor={handleSelectTailor}
                onSelectDesign={handleSelectDesign}
                onStartBooking={handleStartBooking}
              />
            </AppShell>
          ) : viewMode === 'booking' ? (
            <BookingPage
              initialShopId={bookingParams.shopId}
              initialTailorId={bookingParams.tailorId}
              initialServiceId={bookingParams.serviceId}
              initialDesignId={bookingParams.designId}
              onBookingSuccess={handleBookingSuccess}
              onExitBooking={handleExitBooking}
            />
          ) : viewMode === 'booking-success' ? (
            <BookingSuccessPage
              booking={activeBooking}
              onViewOrder={handleViewOrder}
              onBackToShop={(shopId) => handleSelectShopBySlug(shopId)}
              onBackToMarketplace={() => handleNavigate('home')}
            />
          ) : viewMode === 'order-detail' ? (
            <OrderDetailPage
              orderId={selectedOrderId || undefined}
              booking={activeBooking}
              onNavigateHome={() => handleNavigate('home')}
              onNavigateDashboard={() => {
                setViewMode('dashboard');
                setDashboardTab('overview');
              }}
              onNavigateOrders={() => {
                setViewMode('dashboard');
                setDashboardTab('orders');
              }}
              onNavigateShops={() => handleNavigate('shops')}
              onNavigateTailor={(tailorId) => {
                const matched = mockTailors.find((t) => t.id === tailorId || t.slug === tailorId);
                if (matched) handleSelectTailor(matched);
              }}
              onStartBooking={(params) => handleStartBooking(params || {})}
            />
          ) : viewMode === 'dashboard' ? (
            <CustomerDashboardPage
              initialTab={dashboardTab}
              initialOrderId={selectedOrderId || undefined}
              onNavigateHome={() => handleNavigate('home')}
              onNavigateShop={(shopId) => handleSelectShopBySlug(shopId)}
              onNavigateTailor={(tailorId) => {
                const matched = mockTailors.find((t) => t.id === tailorId || t.slug === tailorId);
                if (matched) handleSelectTailor(matched);
              }}
              onStartBooking={(params) => handleStartBooking(params || {})}
            />
          ) : viewMode === 'designs' ? (
            <AppShell activeRoute="designs" onNavigate={handleNavigate}>
              <DesignDiscoveryPage
                onNavigateToDesignDetail={handleSelectDesign}
                onNavigateToCreator={handleSelectCreator}
                onNavigateHome={() => handleNavigate('home')}
              />
            </AppShell>
          ) : viewMode === 'design-detail' ? (
            <AppShell activeRoute="designs" onNavigate={handleNavigate}>
              <DesignDetailPage
                designSlug={selectedDesign.slug}
                designId={selectedDesign.id}
                onNavigateHome={() => handleNavigate('home')}
                onNavigateDesigns={() => handleNavigate('designs')}
                onNavigateCreator={handleSelectCreator}
                onSelectDesign={handleSelectDesign}
                onStartBooking={handleStartBooking}
              />
            </AppShell>
          ) : viewMode === 'shops' ? (
            <AppShell activeRoute="shops" onNavigate={handleNavigate}>
              <ShopDiscoveryPage onNavigateToShopProfile={handleSelectShop} />
            </AppShell>
          ) : viewMode === 'shop-profile' ? (
            <AppShell activeRoute="shops" onNavigate={handleNavigate}>
              <ShopProfilePage
                shopSlug={selectedShop.slug}
                shopId={selectedShop.id}
                onNavigateHome={() => handleNavigate('home')}
                onNavigateShops={() => handleNavigate('shops')}
                onSelectShop={handleSelectShop}
                onStartBooking={handleStartBooking}
              />
            </AppShell>
          ) : viewMode === 'tailors' ? (
            <AppShell activeRoute="tailors" onNavigate={handleNavigate}>
              <TailorDiscoveryPage
                onNavigateToTailorProfile={handleSelectTailor}
                onNavigateToShopProfile={handleSelectShopBySlug}
                onNavigateHome={() => handleNavigate('home')}
              />
            </AppShell>
          ) : viewMode === 'tailor-profile' ? (
            <AppShell activeRoute="tailors" onNavigate={handleNavigate}>
              <TailorProfilePage
                tailorSlug={selectedTailor.slug}
                tailorId={selectedTailor.id}
                onNavigateHome={() => handleNavigate('home')}
                onNavigateTailors={() => handleNavigate('tailors')}
                onNavigateDesigns={() => handleNavigate('designs')}
                onNavigateShop={handleSelectShopBySlug}
                onSelectTailor={handleSelectTailor}
                onStartBooking={handleStartBooking}
              />
            </AppShell>
          ) : (
            <AppShell activeRoute="design-system" onNavigate={handleNavigate}>
              <DesignSystemPage />
            </AppShell>
          )}
        </ToastProvider>
      </RoleProvider>
    </LanguageProvider>
  );
}

