'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AdminProvider } from '../components/Admin/context/AdminContext';
import { ToastProvider } from '../components/Admin/context/ToastContext';
import SiteHeader from '../components/Layout/SiteHeader';
import SiteFooter from '../components/Layout/SiteFooter';
import TickerBanner from '../components/Layout/TickerBanner';
import FloatingWA from '../components/UI/FloatingWA';
import ScrollTop from '../components/UI/ScrollTop';
import ToastStack from '../components/UI/ToastStack';
import WorkshopLoader from '../components/Loader/WorkshopLoader';

export default function RootClientLayout({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  
  // Ensure we don't show header/footer on admin pages
  const isAdminPage = pathname?.startsWith('/admin');

  useEffect(() => {
    // Show loader for at least 2 seconds or until page is ready
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 800); // Wait for exit animation
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AdminProvider>
      <ToastProvider>
        {isLoading && <WorkshopLoader isExiting={isExiting} />}
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
