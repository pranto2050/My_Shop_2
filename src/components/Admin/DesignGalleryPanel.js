'use client'

import { useState } from 'react'
import { useAdmin } from './context/AdminContext'
import { FaPlus, FaTrash, FaImage, FaChevronDown, FaChevronUp, FaStar } from 'react-icons/fa6'
import styles from './DesignGalleryPanel.module.css'

export default function DesignGalleryPanel() {
  const { designs, dispatch } = useAdmin()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    category: 'বেডরুম',
    style: 'আধুনিক',
    material: 'সেগুন কাঠ',
    tags: '',
    popular: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newDesign = {
      ...formData,
      id: `DSG-${Math.floor(1000 + Math.random() * 9000)}`,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    }
    dispatch({ type: 'ADD_DESIGN', payload: newDesign })
    setFormData({
      name: '',
      image: '',
      category: 'বেডরুম',
      style: 'আধুনিক',
      material: 'সেগুন কাঠ',
      tags: '',
      popular: false
    })
    setIsFormOpen(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('আপনি কি এই ডিজাইনটি মুছে ফেলতে চান?')) {
      dispatch({ type: 'DELETE_DESIGN', payload: id })
    }
  }

  return (
    <div className={styles.designPanel}>
      <header className={styles.header}>
        <h1 className={styles.title}>ডিজাইন গ্যালারি</h1>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)} 
          className={styles.addBtn}
        >
          {isFormOpen ? <FaChevronUp /> : <FaPlus />} নতুন ডিজাইন যোগ
        </button>
      </header>

      {isFormOpen && (
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>ডিজাইন নাম*</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>ছবির URL*</label>
                <input 
                  type="text" 
                  name="image" 
                  value={formData.image} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>ক্যাটাগরি</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="বেডরুম">বেডরুম</option>
                  <option value="ডাইনিং">ডাইনিং</option>
                  <option value="ড্রয়িং">ড্রয়িং</option>
                  <option value="অফিস">অফিস</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>স্টাইল</label>
                <select name="style" value={formData.style} onChange={handleChange}>
                  <option value="আধুনিক">আধুনিক</option>
                  <option value="ক্লাসিক">ক্লাসিক</option>
                  <option value="রয়্যাল">রয়্যাল</option>
                  <option value="মিনিমালিস্ট">মিনিমালিস্ট</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>উপাদান</label>
                <input 
                  type="text" 
                  name="material" 
                  value={formData.material} 
                  onChange={handleChange} 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>ট্যাগ (কমা দিয়ে লিখুন)</label>
                <input 
                  type="text" 
                  name="tags" 
                  value={formData.tags} 
                  onChange={handleChange} 
                  placeholder="যেমন: আধুনিক, সেগুন, খাট"
                />
              </div>
              <div className={styles.checkboxGroup}>
                <label className={styles.switch}>
                  <input 
                    type="checkbox" 
                    name="popular" 
                    checked={formData.popular} 
                    onChange={handleChange} 
                  />
                  <span className={styles.slider}></span>
                </label>
                <span>জনপ্রিয় ডিজাইন</span>
              </div>
            </div>
            
            <div className={styles.previewArea}>
              {formData.image ? (
                <div className={styles.previewImage}>
                  <img src={formData.image} alt="Preview" />
                </div>
              ) : (
                <div className={styles.previewPlaceholder}>
                  <FaImage />
                </div>
              )}
              <button type="submit" className={styles.submitBtn}>
                ডিজাইন যোগ করুন
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {designs.map(item => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageBox}>
              <img src={item.image} alt={item.name} loading="lazy" />
              {item.popular && (
                <div className={styles.popularBadge} title="জনপ্রিয়">
                  <FaStar />
                </div>
              )}
              <div className={styles.overlay}>
                <span className={styles.id}>{item.id}</span>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <span className={styles.cardCat}>{item.category} • {item.style}</span>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className={styles.deleteBtn}
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
