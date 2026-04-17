'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Hind_Siliguri } from 'next/font/google';
import Sidebar from '../../../components/admin/Sidebar';
import Header from '../../../components/admin/Header';
import { getLowStockThreshold, getProducts, initializeAdminData } from '../../../lib/adminData';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
});

const titleMap: Record<string, string> = {
  '/admin/dashboard': 'ড্যাশবোর্ড',
  '/admin/products': 'পণ্য ব্যবস্থাপনা',
  '/admin/stock': 'স্টক ব্যবস্থাপনা',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lowStockCount, setLowStockCount] = useState(0);

  const title = useMemo(() => titleMap[pathname] || 'অ্যাডমিন', [pathname]);

  useEffect(() => {
    initializeAdminData();

    const syncLowStock = () => {
      const products = getProducts();
      const threshold = getLowStockThreshold();
      setLowStockCount(products.filter((item) => item.stock < threshold).length);
    };

    syncLowStock();
    window.addEventListener('ma_furniture_products_updated', syncLowStock);
    window.addEventListener('storage', syncLowStock);

    return () => {
      window.removeEventListener('ma_furniture_products_updated', syncLowStock);
      window.removeEventListener('storage', syncLowStock);
    };
  }, []);

  return (
    <div className={`${hindSiliguri.className} relative min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#8B5E3C]/20 selection:text-[#8B5E3C]`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#8B5E3C 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="flex relative z-10">
        {/* Sidebar Spacer for Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0" />

        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen min-w-0">
          <Header title={title} lowStockCount={lowStockCount} />
          <main className="flex-1 p-4 md:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto lg:mx-0">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
