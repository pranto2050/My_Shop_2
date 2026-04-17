'use client'

import { useState } from 'react'
import { useAdmin } from './context/AdminContext'
import { FaPlus, FaTrash, FaImage, FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import styles from './PhotoGalleryPanel.module.css'

export default function PhotoGalleryPanel() {
  const { gallery, dispatch } = useAdmin()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'শোরুম',
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newImage = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }
    dispatch({ type: 'ADD_GALLERY', payload: newImage })
    setFormData({ title: '', url: '', category: 'শোরুম', description: '' })
    setIsFormOpen(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('আপনি কি এই ছবিটি গ্যালারি থেকে মুছে ফেলতে চান?')) {
      dispatch({ type: 'DELETE_GALLERY', payload: id })
    }
  }

  return (
    <div className={styles.galleryPanel}>
      <header className={styles.header}>
        <h1 className={styles.title}>ফটো গ্যালারি</h1>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)} 
          className={styles.addBtn}
        >
          {isFormOpen ? <FaChevronUp /> : <FaPlus />} নতুন ছবি যোগ
        </button>
      </header>

      {isFormOpen && (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>শিরোনাম*</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>ছবির URL*</label>
                <input 
                  type="text" 
                  name="url" 
                  value={formData.url} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>ক্যাটাগরি</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="শোরুম">শোরুম</option>
                  <option value="ওয়ার্কশপ">ওয়ার্কশপ</option>
                  <option value="ডেলিভারি">ডেলিভারি</option>
                  <option value="ইভেন্ট">ইভেন্ট</option>
                  <option value="টিম">টিম</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>বিবরণ</label>
                <input 
                  type="text" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            
            <div className={styles.previewArea}>
              {formData.url ? (
                <div className={styles.previewImage}>
                  <img src={formData.url} alt="Preview" />
                </div>
              ) : (
                <div className={styles.previewPlaceholder}>
                  <FaImage />
                  <span>ছবির প্রিভিউ এখানে দেখা যাবে</span>
                </div>
              )}
              <button type="submit" className={styles.submitBtn}>
                গ্যালারিতে যোগ করুন
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {gallery.map(item => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageBox}>
              <img src={item.url} alt={item.title} loading="lazy" />
              <div className={styles.overlay}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <span className={styles.cardCat}>{item.category}</span>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className={styles.deleteBtn}
                  title="মুছে ফেলুন"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
