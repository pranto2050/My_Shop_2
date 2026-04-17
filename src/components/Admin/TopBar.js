'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from './context/AdminContext'
import { FaBell, FaMagnifyingGlass, FaChevronDown, FaRightFromBracket, FaBars } from 'react-icons/fa6'
import styles from './TopBar.module.css'

export default function TopBar() {
  const { activePanel, logout, toggleSidebar } = useAdmin()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }
    return date.toLocaleDateString('bn-BD', options)
  }

  const panelNames = {
    dashboard: 'ড্যাশবোর্ড',
    products: 'পণ্য তালিকা',
    'add-product': 'নতুন পণ্য যোগ',
    categories: 'ক্যাটাগরি ব্যবস্থাপনা',
    gallery: 'ফটো গ্যালারি',
    designs: 'ডিজাইন গ্যালারি',
    export: 'ডেটা Export'
  }

  const formattedTime = formatTime(time).split('|')

  return (
    <header className={styles.topBar}>
      <div className={styles.leftZone}>
        <button className={styles.hamburger} onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className={styles.breadcrumb}>
          <span className={styles.shopName}>মা ফার্নিচার</span>
          <span className={styles.separator}>›</span>
          <span className={styles.adminText}>অ্যাডমিন</span>
          <span className={styles.separator}>›</span>
          <span className={styles.currentPanel}>{panelNames[activePanel] || 'ড্যাশবোর্ড'}</span>
        </div>
      </div>

      <div className={styles.centerZone}>
        <div className={styles.liveClock}>
          {formatTime(time).replace(',', ' |')}
        </div>
      </div>

      <div className={styles.rightZone}>
        <button className={styles.iconBtn}>
          <FaBell />
          <span className={styles.badge}>3</span>
        </button>
        
        <button className={styles.iconBtn}>
          <FaMagnifyingGlass />
        </button>

        <div className={styles.divider} />

        <div className={styles.profilePill}>
          <div className={styles.avatar}>A</div>
          <span className={styles.adminName}>Admin</span>
          <FaChevronDown size={12} />
        </div>

        <button className={styles.logoutBtn} onClick={logout}>
          <FaRightFromBracket />
          <span>লগআউট</span>
        </button>
      </div>
    </header>
  )
}
