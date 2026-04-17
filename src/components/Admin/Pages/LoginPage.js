'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '../context/AdminContext'
import { FaEye, FaEyeSlash, FaArrowRight, FaLock, FaHouseUser } from 'react-icons/fa6'
import styles from './AdminPage.module.css'

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, login, isLoading } = useAdmin()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    setTimeout(() => {
      const success = login(password)
      if (success) {
        router.push('/admin/dashboard')
      } else {
        setError(true)
        setLoading(false)
      }
    }, 800)
  }

  if (isLoading) return null
  if (isAuthenticated) return null

  return (
    <main className={styles.adminPage}>
      <div className={styles.woodTexture} />
      
      <div className={styles.gateCard}>
        <div className={styles.topBand} />
        
        <div className={styles.cardBody}>
          <div className={styles.logoSection}>
            <div className={styles.logoIcon}>
              <FaHouseUser />
            </div>
            <h1 className={styles.shopName}>মা ফার্নিচার</h1>
            <span className={styles.adminLabel}>অ্যাডমিন প্যানেল</span>
            <div className={styles.divider} />
          </div>

          <div className={styles.welcomeText}>
            <h2>স্বাগতম 👋</h2>
            <p>আপনার অ্যাডমিন প্যানেলে প্রবেশ করতে পাসওয়ার্ড দিন।</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <label htmlFor="password">
              <FaLock style={{ marginRight: '8px' }} /> পাসওয়ার্ড
            </label>
            <div className={`${styles.inputWrapper} ${error ? styles.shake : ''}`}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && (
              <span className={styles.errorMsg}>
                ❌ ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।
              </span>
            )}
            
            <span className={styles.hint}>
              ডিফল্ট পাসওয়ার্ড: mafurniture2024
            </span>

            <button 
              type="submit" 
              className={styles.loginBtn}
              disabled={loading}
            >
              {loading ? (
                <>যাচাই হচ্ছে...</>
              ) : (
                <>
                  প্রবেশ করুন <FaArrowRight />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
