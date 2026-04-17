'use client'

import { useState } from 'react'
import { useAdmin } from './context/AdminContext'
import { FaUser, FaLock, FaCamera, FaEnvelope, FaPhone, FaCheck, FaRotateLeft } from 'react-icons/fa6'
import styles from './ProfileSettingsPanel.module.css'

export default function ProfileSettingsPanel() {
  const { activePanel } = useAdmin()
  const [activeTab, setActiveTab] = useState(activePanel === 'settings' ? 'security' : 'profile')
  
  // Profile State
  const [profileData, setProfileData] = useState({
    name: 'অ্যাডমিন',
    email: 'admin@mafurniture.com',
    phone: '01700000000',
    avatar: 'A'
  })

  // Password State
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const [message, setMessage] = useState({ type: '', text: '' })

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    // Mock save
    setMessage({ type: 'success', text: 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে!' })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwords.new !== passwords.confirm) {
      setMessage({ type: 'error', text: 'নতুন পাসওয়ার্ড মিলছে না!' })
      return
    }
    // Mock save
    setMessage({ type: 'success', text: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!' })
    setPasswords({ current: '', new: '', confirm: '' })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>অ্যাকাউন্ট সেটিংস</h1>
        <p className={styles.subtitle}>আপনার প্রোফাইল এবং নিরাপত্তা সেটিংস পরিচালনা করুন</p>
      </header>

      <div className={styles.layout}>
        {/* Sidebar Tabs */}
        <aside className={styles.sidebar}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.active : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> আমার প্রোফাইল
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'security' ? styles.active : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <FaLock /> নিরাপত্তা (পাসওয়ার্ড)
          </button>
        </aside>

        {/* Main Content Area */}
        <main className={styles.mainContent}>
          {message.text && (
            <div className={`${styles.alert} ${styles[message.type]}`}>
              {message.type === 'success' ? <FaCheck /> : <FaRotateLeft />}
              {message.text}
            </div>
          )}

          {activeTab === 'profile' ? (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>প্রোফাইল তথ্য</h2>
                <p>আপনার ব্যক্তিগত তথ্য এখানে আপডেট করুন</p>
              </div>

              <form className={styles.form} onSubmit={handleProfileSubmit}>
                <div className={styles.avatarSection}>
                  <div className={styles.avatarLarge}>{profileData.avatar}</div>
                  <button type="button" className={styles.changeAvatarBtn}>
                    <FaCamera /> ছবি পরিবর্তন করুন
                  </button>
                </div>

                <div className={styles.grid}>
                  <div className={styles.formGroup}>
                    <label>নাম</label>
                    <div className={styles.inputWrapper}>
                      <FaUser className={styles.inputIcon} />
                      <input 
                        type="text" 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        placeholder="আপনার নাম লিখুন"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>ইমেইল</label>
                    <div className={styles.inputWrapper}>
                      <FaEnvelope className={styles.inputIcon} />
                      <input 
                        type="email" 
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        placeholder="আপনার ইমেইল লিখুন"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>ফোন নম্বর</label>
                    <div className={styles.inputWrapper}>
                      <FaPhone className={styles.inputIcon} />
                      <input 
                        type="tel" 
                        value={profileData.phone} 
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        placeholder="আপনার ফোন নম্বর লিখুন"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className={styles.saveBtn}>পরিবর্তন সংরক্ষণ করুন</button>
              </form>
            </section>
          ) : (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>নিরাপত্তা সেটিংস</h2>
                <p>আপনার অ্যাকাউন্ট সুরক্ষিত রাখতে পাসওয়ার্ড পরিবর্তন করুন</p>
              </div>

              <form className={styles.form} onSubmit={handlePasswordSubmit}>
                <div className={styles.formGroup}>
                  <label>বর্তমান পাসওয়ার্ড</label>
                  <div className={styles.inputWrapper}>
                    <FaLock className={styles.inputIcon} />
                    <input 
                      type="password" 
                      value={passwords.current}
                      onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                      placeholder="বর্তমান পাসওয়ার্ড লিখুন"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>নতুন পাসওয়ার্ড</label>
                  <div className={styles.inputWrapper}>
                    <FaLock className={styles.inputIcon} />
                    <input 
                      type="password" 
                      value={passwords.new}
                      onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                      placeholder="নতুন পাসওয়ার্ড লিখুন"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                  <div className={styles.inputWrapper}>
                    <FaLock className={styles.inputIcon} />
                    <input 
                      type="password" 
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                      placeholder="আবার নতুন পাসওয়ার্ড লিখুন"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className={styles.saveBtn}>পাসওয়ার্ড পরিবর্তন করুন</button>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
