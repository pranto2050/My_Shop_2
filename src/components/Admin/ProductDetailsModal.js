'use client'

import { FaXmark, FaPencil } from 'react-icons/fa6'
import styles from './ProductDetailsModal.module.css'

export default function ProductDetailsModal({ product, onClose, onEdit }) {
  if (!product) return null

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaXmark />
        </button>

        <div className={styles.content}>
          {/* Left Side: Product Photo */}
          <div className={styles.imageSection}>
            <img src={product.image} alt={product.name} className={styles.mainImage} />
          </div>

          {/* Right Side: Product Information */}
          <div className={styles.infoSection}>
            <header className={styles.header}>
              <span className={styles.idBadge}>{product.id}</span>
              <h1 className={styles.title}>{product.name}</h1>
              {product.nameEn && <p className={styles.titleEn}>{product.nameEn}</p>}
              
              <div className={styles.priceArea}>
                <span className={styles.price}>৳{product.price?.toLocaleString('bn-BD')}</span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>৳{product.originalPrice?.toLocaleString('bn-BD')}</span>
                )}
              </div>
            </header>

            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>ক্যাটাগরি</span>
                <span className={styles.specValue}>{product.category}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>উপাদান</span>
                <span className={styles.specValue}>{product.material || 'N/A'}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>মাপ</span>
                <span className={styles.specValue}>{product.size || 'N/A'}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>রঙ</span>
                <span className={styles.specValue}>{product.color || 'N/A'}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>ফিনিশ</span>
                <span className={styles.specValue}>{product.finish || 'N/A'}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>ওয়ারেন্টি</span>
                <span className={styles.specValue}>{product.warranty || 'N/A'}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>অবস্থা</span>
                <span className={styles.specValue}>{product.inStock ? 'স্টকে আছে' : 'স্টক আউট'}</span>
              </div>
            </div>

            <div className={styles.description}>
              <h3 className={styles.descTitle}>বিস্তারিত বিবরণ</h3>
              <p className={styles.descText}>{product.description || 'কোনো বিবরণ দেওয়া হয়নি।'}</p>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className={styles.tags}>
                {product.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <footer className={styles.footer}>
          <button onClick={() => { onEdit(product); onClose(); }} className={styles.editBtn}>
            <FaPencil /> সম্পাদনা করুন
          </button>
        </footer>
      </div>
    </div>
  )
}
