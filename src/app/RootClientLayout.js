'use client'

import { AdminProvider } from '../components/Admin/context/AdminContext';
import { ToastProvider } from '../components/Admin/context/ToastContext';

export default function RootClientLayout({ children }) {
  return (
    <AdminProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AdminProvider>
  );
}
