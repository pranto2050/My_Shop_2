'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from './context/AdminContext'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import WorkshopLoader from '../Loader/WorkshopLoader'
import styles from './AdminShell.module.css'

export default function AdminShell({ children }) {
  const { isAuthenticated, isLoading: authLoading } = useAdmin()
  const [isPanelLoading, setIsPanelLoading] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    // Show loader for at least 1.5 seconds for admin panel feel
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsPanelLoading(false)
      }, 800)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (authLoading || !isAuthenticated || isPanelLoading) {
    return <WorkshopLoader isExiting={isExiting} />
  }

  return (
    <div className={styles.shell}>
      <TopBar />
      <div className={styles.mainWrapper}>
        <Sidebar />
        <main className={`${styles.content} custom-scrollbar`}>
          {children}
        </main>
      </div>
    </div>
  )
}
