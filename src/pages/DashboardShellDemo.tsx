import React, { useState } from 'react';
import { useLanguage } from '../localization/LanguageContext';
import { useRole } from '../components/role/RoleContext';
import { useToast } from '../components/feedback/Toast';
import { DashboardHeader } from '../components/navigation/DashboardHeader';
import { Sidebar } from '../components/navigation/Sidebar';
import { DataTable } from '../components/ui/DataTable';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { TrustMetric } from '../components/trust/TrustMetric';
import { Scissors, Calendar, Users, TrendingUp, Sparkles } from 'lucide-react';

export const DashboardShellDemo: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const { activeRole, openRoleModal } = useRole();
  const { showToast } = useToast();
  const [activeMenuId, setActiveMenuId] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Orders data
  const orders = [
    { id: 'ORD-1081', customer: 'Fahad Al-Otaibi', service: 'Royal Saudi Thobe', fabric: 'Toyobo 5000', status: 'In Cutting', date: 'Today, 2:30 PM', price: '380 SAR' },
    { id: 'ORD-1082', customer: 'Bander Al-Dossary', service: 'Winter Dagla', fabric: 'British Wool', status: 'Fitting Ready', date: 'Yesterday', price: '850 SAR' },
    { id: 'ORD-1083', customer: 'Nasser Al-Subaie', service: 'Kuwaiti Summer Thobe', fabric: 'Shikibo Soft', status: 'Delivered', date: '2 days ago', price: '320 SAR' },
    { id: 'ORD-1084', customer: 'Mohammed Al-Ghamdi', service: 'Royal Bisht', fabric: 'Ghat Fine Wool', status: 'Embroidering Zari', date: '3 days ago', price: '1,600 SAR' },
  ];

  const columns = [
    { key: 'id', header: isRtl ? 'الطلب' : 'Order', sortable: true },
    { key: 'customer', header: isRtl ? 'العميل' : 'Customer', sortable: true },
    { key: 'service', header: isRtl ? 'الموديل' : 'Garment' },
    { key: 'fabric', header: isRtl ? 'القماش' : 'Fabric' },
    {
      key: 'status',
      header: isRtl ? 'الحالة' : 'Status',
      accessor: (row: any) => (
        <Badge variant={row.status === 'Delivered' ? 'verified' : 'gold'} size="xs">
          {row.status}
        </Badge>
      ),
    },
    { key: 'price', header: isRtl ? 'المبلغ' : 'Total', align: 'end' as const },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-[#FAF9F6] text-start">
      {/* Dashboard Top Header */}
      <DashboardHeader
        title={
          activeRole === 'shop_owner'
            ? isRtl ? 'لوحة إدارة المشغل والطلبات' : 'Atelier Production Hub'
            : activeRole === 'tailor'
            ? isRtl ? 'لوحة تحكم معلّم التفصيل' : 'Master Artisan Workbench'
            : activeRole === 'admin'
            ? isRtl ? 'إشراف المنصة والتحقق التجاري' : 'Platform Oversight Console'
            : isRtl ? 'بوابة العميل ومقاساتي' : 'Client Orders & Measurements'
        }
        breadcrumbs={[
          { label: isRtl ? 'الرئيسية' : 'Home' },
          { label: isRtl ? 'لوحة العمل' : 'Workspace' },
          { label: activeMenuId },
        ]}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Desktop & Collapsible Sidebar */}
        <Sidebar
          activeId={activeMenuId}
          onSelect={setActiveMenuId}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          className="hidden md:flex shrink-0"
        />

        {/* Dashboard Main Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          {/* Welcome Card */}
          <div className="p-6 bg-[#121316] text-white rounded-2xl border border-[#24262E] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A880] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isRtl ? 'نظام خيّاط للتفصيل الرقمي' : 'KHAYYAT Sartorial OS'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#FAF9F6]">
                {isRtl ? 'أهلاً بك في فضاء العمل المخصص' : `Welcome to your ${activeRole.replace('_', ' ')} workspace`}
              </h2>
              <p className="text-xs text-[#A8A49D] mt-1">
                {isRtl
                  ? 'هذا العرض يوضح كيفية تكامل الشريط الجانبي والترويسة مع مختلف أدوار المنصة.'
                  : 'Demonstrating how the Sidebar, Header, and Data Table scale across Customer, Shop Owner, Tailor, and Admin roles.'}
              </p>
            </div>

            <Button variant="gold" size="sm" onClick={openRoleModal}>
              {isRtl ? 'تبديل الدور للمعاينة' : 'Switch Role View'}
            </Button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB]">
              <TrustMetric
                icon={<Scissors className="w-4 h-4" />}
                label={isRtl ? 'طلبات تفصيل جارية' : 'Active Bespoke Orders'}
                value={14}
              />
            </div>

            <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB]">
              <TrustMetric
                icon={<Calendar className="w-4 h-4" />}
                label={isRtl ? 'مواعيد قياس اليوم' : "Today's Fittings"}
                value={5}
              />
            </div>

            <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB]">
              <TrustMetric
                icon={<TrendingUp className="w-4 h-4" />}
                label={isRtl ? 'إجمالي المبيعات' : 'Volume Delivered'}
                value="48,200"
                suffix={t.common.sar}
              />
            </div>

            <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E6E2DB]">
              <TrustMetric
                icon={<Users className="w-4 h-4" />}
                label={isRtl ? 'معلّمو التفصيل النشطون' : 'Resident Tailors'}
                value={8}
              />
            </div>
          </div>

          {/* Live Data Table Specimen */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#121316]">
                {isRtl ? 'سجل الطلبات الحالية' : 'Active Production Queue'}
              </h3>
              <span className="text-xs text-[#8E8B85]">
                {isRtl ? 'محدث تلقائياً' : 'Live Sync'}
              </span>
            </div>

            <DataTable
              data={orders}
              columns={columns}
              keyExtractor={(row) => row.id}
              itemsPerPage={4}
              rowActions={[
                {
                  label: isRtl ? 'تفاصيل القياس' : 'Measurements',
                  onClick: (row) =>
                    showToast({
                      type: 'info',
                      title: `Measurements for ${row.customer}`,
                      description: `Thobe length: 145cm, Collar: Royal Stiff 4.5cm`,
                    }),
                },
              ]}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
