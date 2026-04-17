'use client'

import { AdminProvider } from '../context/AdminContext'
import { ToastProvider } from '../context/ToastContext'

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AdminProvider>
  )
}
