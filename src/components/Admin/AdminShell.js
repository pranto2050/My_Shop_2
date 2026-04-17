'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from './context/AdminContext'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import styles from './AdminShell.module.css'

export default function AdminShell({ children }) {
  const { isAuthenticated, isLoading } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--parchment)',
        color: 'var(--walnut)'
      }}>
        Loading Admin...
      </div>
    )
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
