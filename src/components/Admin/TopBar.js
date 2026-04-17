'use client'

import { useState, useEffect, useRef } from 'react'
import { useAdmin } from './context/AdminContext'
import { 
  FaBell, 
  FaMagnifyingGlass, 
  FaChevronDown, 
  FaRightFromBracket, 
  FaBars,
  FaUser,
  FaGear,
  FaCheckDouble,
  FaClock
} from 'react-icons/fa6'
import styles from './TopBar.module.css'

export default function TopBar() {
  const { activePanel, logout, toggleSidebar, setPanel, dispatch, searchQuery } = useAdmin()
  const [time, setTime] = useState(new Date())
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const searchInputRef = useRef(null)
  const notificationRef = useRef(null)
  const profileRef = useRef(null)

  // Mock notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'নতুন অর্ডার', desc: 'অর্ডার #123456 প্রাপ্ত হয়েছে', time: '২ মিনিট আগে', unread: true },
    { id: 2, title: 'পণ্য স্টক আউট', desc: 'সোফা সেট স্টক আউট হয়ে গেছে', time: '১ ঘণ্টা আগে', unread: true },
    { id: 3, title: 'পেমেন্ট কনফার্ম', desc: 'বিকাশ পেমেন্ট সফল হয়েছে', time: '৩ ঘণ্টা আগে', unread: false },
  ])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    
    // Click outside listener
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      clearInterval(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchActive])

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

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive)
    if (isSearchActive) {
      dispatch({ type: 'SET_SEARCH', payload: '' })
    }
  }

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value })
    if (activePanel !== 'products' && e.target.value.length > 0) {
      setPanel('products')
    }
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const panelNames = {
    dashboard: 'ড্যাশবোর্ড',
    products: 'পণ্য তালিকা',
    'add-product': 'নতুন পণ্য যোগ',
    categories: 'ক্যাটাগরি ব্যবস্থাপনা',
    gallery: 'ফটো গ্যালারি',
    designs: 'ডিজাইন গ্যালারি',
    export: 'ডেটা Export',
    profile: 'প্রোফাইল',
    settings: 'সেটিংস'
  }

  const unreadCount = notifications.filter(n => n.unread).length

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
        <div className={`${styles.searchWrapper} ${isSearchActive ? styles.searchWrapperActive : ''}`}>
          <button className={styles.iconBtn} onClick={handleSearchToggle}>
            <FaMagnifyingGlass />
          </button>
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="নাম বা আইডি দিয়ে খুঁজুন..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className={styles.dropdownContainer} ref={notificationRef}>
          <button 
            className={styles.iconBtn} 
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowProfile(false)
            }}
          >
            <FaBell />
            {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <div className={styles.dropdownHeader}>
                <h3>নোটিফিকেশন</h3>
                <button className={styles.clearAll} onClick={markAllRead}>
                  <FaCheckDouble /> সব পড়া হয়েছে
                </button>
              </div>
              <div className={styles.notificationList}>
                {notifications.map(notif => (
                  <div key={notif.id} className={`${styles.notificationItem} ${notif.unread ? styles.unread : ''}`}>
                    <span className={styles.notifTitle}>{notif.title}</span>
                    <span className={styles.notifDesc}>{notif.desc}</span>
                    <span className={styles.notifTime}><FaClock size={10} /> {notif.time}</span>
                  </div>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <button className={styles.viewAll}>সব নোটিফিকেশন দেখুন</button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.divider} />

        <div className={styles.profileWrapper} ref={profileRef}>
          <button 
            className={styles.profilePill} 
            onClick={() => {
              setShowProfile(!showProfile)
              setShowNotifications(false)
            }}
          >
            <div className={styles.avatar}>A</div>
            <span className={styles.adminName}>অ্যাডমিন</span>
            <FaChevronDown size={12} className={showProfile ? styles.rotate : ''} />
          </button>

          {showProfile && (
            <div className={styles.profileDropdown}>
              <button 
                className={styles.profileItem}
                onClick={() => {
                  setPanel('profile')
                  setShowProfile(false)
                }}
              >
                <FaUser /> আমার প্রোফাইল
              </button>
              <button 
                className={styles.profileItem}
                onClick={() => {
                  setPanel('settings')
                  setShowProfile(false)
                }}
              >
                <FaGear /> সেটিংস
              </button>
              <button className={`${styles.profileItem} ${styles.logout}`} onClick={logout}>
                <FaRightFromBracket /> লগআউট
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

