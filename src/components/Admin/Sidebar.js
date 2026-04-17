'use client'

import { useAdmin } from './context/AdminContext'
import { 
  FaBoxOpen, 
  FaPlus, 
  FaFolder, 
  FaImages, 
  FaPalette, 
  FaDownload, 
  FaRightFromBracket,
  FaPhone,
  FaWhatsapp
} from 'react-icons/fa6'
import { MdDashboard } from 'react-icons/md'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const { activePanel, setPanel, products, categories, gallery, designs, sidebarOpen, logout } = useAdmin()

  const navItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: <MdDashboard />, section: 'প্রধান' },
    { id: 'products', label: 'পণ্য তালিকা', icon: <FaBoxOpen />, section: 'পণ্য ব্যবস্থাপনা', badge: products.length },
    { id: 'add-product', label: 'নতুন পণ্য যোগ', icon: <FaPlus />, section: 'পণ্য ব্যবস্থাপনা' },
    { id: 'categories', label: 'ক্যাটাগরি', icon: <FaFolder />, section: 'পণ্য ব্যবস্থাপনা', badge: categories.length },
    { id: 'gallery', label: 'ফটো গ্যালারি', icon: <FaImages />, section: 'গ্যালারি', badge: gallery.length },
    { id: 'designs', label: 'ডিজাইন গ্যালারি', icon: <FaPalette />, section: 'গ্যালারি', badge: designs.length },
    { id: 'export', label: 'ডেটা Export', icon: <FaDownload />, section: 'সিস্টেম' },
  ]

  const sections = ['প্রধান', 'পণ্য ব্যবস্থাপনা', 'গ্যালারি', 'সিস্টেম']

  return (
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
      <div className={styles.shopInfo}>
        <div className={styles.avatar}>মা</div>
        <div className={styles.shopText}>
          <span className={styles.shopTitle}>মা ফার্নিচার</span>
          <span className={styles.shopLocation}>সাতারপাড়া, দৌলতপুর</span>
          <div className={styles.onlineStatus}>
            <div className={styles.dot} />
            <span className={styles.statusText}>সক্রিয়</span>
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        {sections.map(section => (
          <div key={section} className={styles.navSection}>
            <div className={styles.sectionLabel}>{section}</div>
            {navItems.filter(item => item.section === section).map(item => (
              <div 
                key={item.id} 
                className={`${styles.navItem} ${activePanel === item.id ? styles.active : ''}`}
                onClick={() => setPanel(item.id)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {item.badge > 0 && <span className={styles.badge}>{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}

        <div className={styles.navSection}>
          <div 
            className={styles.navItem}
            onClick={logout}
          >
            <span className={styles.navIcon}><FaRightFromBracket /></span>
            <span className={styles.navLabel}>লগআউট</span>
          </div>
        </div>
      </nav>

      <div className={styles.footer}>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <FaPhone size={12} color="var(--honey)" />
            <span>+8801729728818</span>
          </div>
          <div className={styles.contactItem}>
            <FaWhatsapp size={12} color="var(--moss)" />
            <span>+8801979728818</span>
          </div>
        </div>
        <div className={styles.version}>v1.0.0 | মা ফার্নিচার</div>
      </div>
    </aside>
  )
}
