'use client'

import React, { useState, useEffect } from 'react';
import { ToastProvider } from '../context/ToastContext';
import { AdminProvider } from '../context/AdminContext';
import WorkshopLoader from '../components/Loader/WorkshopLoader';
import TickerBanner from '../components/Layout/TickerBanner';
import SiteHeader from '../components/Layout/SiteHeader';
import SiteFooter from '../components/Layout/SiteFooter';
import FloatingWA from '../components/UI/FloatingWA';
import ScrollTop from '../components/UI/ScrollTop';
import ToastStack from '../components/UI/ToastStack';

export default function RootClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsLoading(false), 650);
    }, 4200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastProvider>
      <AdminProvider>
        {isLoading && <WorkshopLoader isExiting={isExiting} />}
        <TickerBanner />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <FloatingWA />
        <ScrollTop />
        <ToastStack />
      </AdminProvider>
    </ToastProvider>
  );
}
