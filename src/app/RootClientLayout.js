'use client'

import { usePathname } from 'next/navigation';
import { AdminProvider } from '../components/Admin/context/AdminContext';
import { ToastProvider } from '../components/Admin/context/ToastContext';
import SiteHeader from '../components/Layout/SiteHeader';
import SiteFooter from '../components/Layout/SiteFooter';
import TickerBanner from '../components/Layout/TickerBanner';
import FloatingWA from '../components/UI/FloatingWA';
import ScrollTop from '../components/UI/ScrollTop';
import ToastStack from '../components/UI/ToastStack';

export default function RootClientLayout({ children }) {
  const pathname = usePathname();
  
  // Ensure we don't show header/footer on admin pages
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <AdminProvider>
      <ToastProvider>
        {!isAdminPage && <TickerBanner />}
        {!isAdminPage && <SiteHeader />}
        <main>{children}</main>
        {!isAdminPage && <SiteFooter />}
        {!isAdminPage && <FloatingWA />}
        {!isAdminPage && <ScrollTop />}
        <ToastStack />
      </ToastProvider>
    </AdminProvider>
  );
}
