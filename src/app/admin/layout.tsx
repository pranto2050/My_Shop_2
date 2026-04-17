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
    <div className={`${hindSiliguri.className} relative min-h-screen bg-[#0f0f0f] text-white`}>
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#8B5E3C]/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-[#C49A6C]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#8B5E3C]/10 blur-3xl" />
      </div>
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="relative lg:pl-65">
        <Header title={title} lowStockCount={lowStockCount} />
        <main className="p-4 md:p-8">
          <div className="mx-auto max-w-350">{children}</div>
        </main>
      </div>
    </div>
  );
}
