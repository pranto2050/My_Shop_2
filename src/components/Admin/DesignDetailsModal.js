'use client'

import { FaXmark, FaTrash, FaStar } from 'react-icons/fa6'
import styles from './DesignDetailsModal.module.css'

export default function DesignDetailsModal({ design, onClose, onDelete }) {
  if (!design) return null

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
          <div className={styles.imageSection}>
            <img src={design.image} alt={design.name} className={styles.mainImage} />
          </div>

          <div className={styles.infoSection}>
            <header className={styles.header}>
              <span className={styles.idBadge}>{design.id}</span>
              <h1 className={styles.title}>{design.name}</h1>
              {design.popular && (
                <div className={styles.popularBadge}>
                  <FaStar /> জনপ্রিয় ডিজাইন
                </div>
              )}
            </header>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>ক্যাটাগরি</span>
                <span className={styles.detailValue}>{design.category}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>স্টাইল</span>
                <span className={styles.detailValue}>{design.style}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>উপাদান</span>
                <span className={styles.detailValue}>{design.material || 'N/A'}</span>
              </div>
            </div>

            {design.tags && design.tags.length > 0 && (
              <div className={styles.tags}>
                {design.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <footer className={styles.footer}>
          <button 
            onClick={() => { onDelete(design.id); onClose(); }} 
            className={styles.deleteBtn}
          >
            <FaTrash /> ডিজাইনটি মুছে ফেলুন
          </button>
        </footer>
      </div>
    </div>
  )
}
