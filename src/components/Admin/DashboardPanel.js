'use client'

import { useState } from 'react'
import { useAdmin } from './context/AdminContext'
import { FaBox, FaLayerGroup, FaPalette, FaCamera, FaPlus, FaImage, FaFileExport, FaPencil, FaTrash } from 'react-icons/fa6'
import StatCard from './StatCard'
import ConfirmDialog from '../UI/ConfirmDialog'
import styles from './DashboardPanel.module.css'

export default function DashboardPanel() {
  const { products, categories, designs, gallery, setPanel, dispatch } = useAdmin()
  const [deleteId, setDeleteId] = useState(null)

  const stats = [
    {
      id: 1,
      label: 'মোট পণ্য',
      number: products.length,
      icon: <FaBox />,
      color: 'var(--walnut)',
      bgTint: 'rgba(59, 31, 12, 0.1)',
      watermark: '📦',
      trend: '+৫ এই সপ্তাহে'
    },
    {
      id: 2,
      label: 'ক্যাটাগরি',
      number: categories.length,
      icon: <FaLayerGroup />,
      color: 'var(--honey)',
      bgTint: 'rgba(212, 136, 42, 0.1)',
      watermark: '🗂️',
      trend: 'সকল সক্রিয়'
    },
    {
      id: 3,
      label: 'ডিজাইন',
      number: designs.length,
      icon: <FaPalette />,
      color: 'var(--sienna)',
      bgTint: 'rgba(160, 82, 45, 0.1)',
      watermark: '🎨',
      trend: '+১২ নতুন'
    },
    {
      id: 4,
      label: 'গ্যালারি',
      number: gallery.length,
      icon: <FaCamera />,
      color: 'var(--moss)',
      bgTint: 'rgba(107, 142, 35, 0.1)',
      watermark: '📸',
      trend: '+৩ আপডেট'
    }
  ]

  const recentProducts = products.slice(0, 6)

  const handleEdit = (product) => {
    dispatch({ type: 'SET_EDITING_PRODUCT', payload: product })
    setPanel('add-product')
  }

  const handleDelete = (id) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    dispatch({ type: 'DELETE_PRODUCT', payload: deleteId })
    setDeleteId(null)
  }

  return (
    <div className={styles.dashboard}>
      <ConfirmDialog 
        isOpen={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        message="আপনি কি নিশ্চিত যে আপনি এই পণ্যটি মুছে ফেলতে চান?"
      />
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>ড্যাশবোর্ড</h1>
          <p className={styles.date}>{new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        {stats.map(stat => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className={styles.quickActions}>
        <button onClick={() => setPanel('add-product')} className={styles.actionBtn}>
          <FaPlus /> নতুন পণ্য
        </button>
        <button onClick={() => setPanel('designs')} className={styles.actionBtn}>
          <FaPalette /> নতুন ডিজাইন
        </button>
        <button onClick={() => setPanel('gallery')} className={styles.actionBtn}>
          <FaImage /> ছবি যোগ
        </button>
        <button onClick={() => setPanel('export')} className={styles.actionBtn}>
          <FaFileExport /> Export
        </button>
      </div>

      <section className={styles.recentSection}>
        <h2 className={styles.sectionTitle}>সম্প্রতি যোগ করা পণ্য</h2>
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <span>পণ্য</span>
            <span>ক্যাটাগরি</span>
            <span>মূল্য</span>
            <span>স্টক</span>
            <span>অ্যাকশন</span>
          </div>
          <div className={styles.rows}>
            {recentProducts.map(product => (
              <div key={product.id} className={styles.row}>
                <div className={styles.productInfo}>
                  <img src={product.image} alt={product.name} className={styles.thumb} />
                  <div>
                    <span className={styles.id}>{product.id}</span>
                    <h3 className={styles.name}>{product.name}</h3>
                  </div>
                </div>
                <div className={styles.category}>
                  <span className={styles.categoryPill}>{product.category}</span>
                </div>
                <div className={styles.price}>
                  ৳{product.price.toLocaleString('bn-BD')}
                </div>
                <div className={styles.stock}>
                  <span className={product.inStock ? styles.inStock : styles.outOfStock}>
                    {product.inStock ? '✅ স্টকে আছে' : '❌ স্টক শেষ'}
                  </span>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(product)} className={styles.editBtn} title="সম্পাদনা">
                    <FaPencil />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className={styles.deleteBtn} title="মুছে ফেলুন">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
