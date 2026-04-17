'use client'

import { useState } from 'react'
import { useAdmin } from './context/AdminContext'
import { FaFileExport, FaCopy, FaDownload, FaCheck, FaInfoCircle, FaBox, FaLayerGroup, FaCamera, FaPalette } from 'react-icons/fa6'
import styles from './ExportPanel.module.css'

export default function ExportPanel() {
  const { products, categories, gallery, designs } = useAdmin()
  const [copiedId, setCopiedId] = useState(null)

  const dataTypes = [
    {
      id: 'products',
      label: 'পণ্য তালিকা',
      data: products,
      icon: <FaBox />,
      count: products.length,
      filename: 'products.js'
    },
    {
      id: 'categories',
      label: 'ক্যাটাগরি',
      data: categories,
      icon: <FaLayerGroup />,
      count: categories.length,
      filename: 'categories.js'
    },
    {
      id: 'gallery',
      label: 'ফটো গ্যালারি',
      data: gallery,
      icon: <FaCamera />,
      count: gallery.length,
      filename: 'gallery.js'
    },
    {
      id: 'designs',
      label: 'ডিজাইন গ্যালারি',
      data: designs,
      icon: <FaPalette />,
      count: designs.length,
      filename: 'designs.js'
    }
  ]

  const handleCopy = (id, data) => {
    const jsonStr = JSON.stringify(data, null, 2)
    const exportStr = `export const ${id} = ${jsonStr}`
    navigator.clipboard.writeText(exportStr)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDownload = (id, data, filename) => {
    const jsonStr = JSON.stringify(data, null, 2)
    const exportStr = `export const ${id} = ${jsonStr}`
    const blob = new Blob([exportStr], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={styles.exportPanel}>
      <header className={styles.header}>
        <h1 className={styles.title}>ডেটা Export</h1>
      </header>

      <div className={styles.grid}>
        {dataTypes.map(type => (
          <div key={type.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.iconBox}>{type.icon}</div>
              <div className={styles.cardInfo}>
                <h3>{type.label}</h3>
                <span>{type.count}টি আইটেম</span>
              </div>
            </div>
            <div className={styles.cardBtns}>
              <button 
                onClick={() => handleCopy(type.id, type.data)} 
                className={`${styles.copyBtn} ${copiedId === type.id ? styles.copied : ''}`}
              >
                {copiedId === type.id ? <><FaCheck /> কপি হয়েছে</> : <><FaCopy /> JSON কপি করুন</>}
              </button>
              <button 
                onClick={() => handleDownload(type.id, type.data, type.filename)} 
                className={styles.downloadBtn}
              >
                <FaDownload /> ফাইল ডাউনলোড
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.instructions}>
        <div className={styles.instrHeader}>
          <FaInfoCircle />
          <h2>কিভাবে ডেটা আপডেট করবেন?</h2>
        </div>
        <ol className={styles.instrList}>
          <li>প্রথমে আপনি যে ডেটা আপডেট করতে চান তার <strong>JSON কপি করুন</strong> বাটনে ক্লিক করুন।</li>
          <li>আপনার প্রোজেক্টের <code>data/</code> ফোল্ডারে যান।</li>
          <li>সংশ্লিষ্ট ফাইলটি (যেমন: <code>products.js</code>) খুলুন।</li>
          <li>ফাইলের সমস্ত লেখা মুছে ফেলুন এবং কপি করা ডেটাটি সেখানে পেস্ট (Paste) করুন।</li>
          <li>ফাইলটি সেভ করুন। আপনার ওয়েবসাইট নতুন ডেটা সহ আপডেট হয়ে যাবে।</li>
        </ol>
        <p className={styles.warning}>
          দ্রষ্টব্য: এটি একটি ফ্রন্ট-এন্ড প্রোজেক্ট হওয়ায় সরাসরি ফাইলে রাইট করার অনুমতি নেই। 
          ম্যানুয়ালি ফাইল আপডেট করা আবশ্যক।
        </p>
      </div>
    </div>
  )
}
