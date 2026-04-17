'use client'

import { useAdmin } from '../context/AdminContext'
import AdminShell from '../AdminShell'
import DashboardPanel from '../DashboardPanel'
import ProductsPanel from '../ProductsPanel'
import ProductForm from '../ProductForm'
import CategoriesPanel from '../CategoriesPanel'
import PhotoGalleryPanel from '../PhotoGalleryPanel'
import DesignGalleryPanel from '../DesignGalleryPanel'
import ExportPanel from '../ExportPanel'

export default function DashboardPage() {
  const { activePanel } = useAdmin()

  const renderPanel = () => {
    switch (activePanel) {
      case 'dashboard':
        return <DashboardPanel />
      case 'products':
        return <ProductsPanel />
      case 'add-product':
        return <ProductForm />
      case 'categories':
        return <CategoriesPanel />
      case 'gallery':
        return <PhotoGalleryPanel />
      case 'designs':
        return <DesignGalleryPanel />
      case 'export':
        return <ExportPanel />
      default:
        return <DashboardPanel />
    }
  }

  return (
    <AdminShell>
      {renderPanel()}
    </AdminShell>
  )
}
