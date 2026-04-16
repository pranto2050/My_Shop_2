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
    <div className={`${hindSiliguri.className} min-h-screen bg-[#0f0f0f] text-white`}>
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="lg:pl-65">
        <Header title={title} lowStockCount={lowStockCount} />
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
