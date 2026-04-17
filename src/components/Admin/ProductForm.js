'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from './context/AdminContext'
import { FaArrowLeft, FaCopy, FaImage, FaXmark } from 'react-icons/fa6'
import styles from './ProductForm.module.css'

export default function ProductForm() {
  const { editingProduct, categories, setPanel, dispatch } = useAdmin()
  const isEditing = !!editingProduct

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    nameEn: '',
    category: '',
    price: '',
    originalPrice: '',
    image: '',
    extraImages: ['', ''],
    material: '',
    finish: '',
    size: '',
    color: '',
    weight: '',
    warranty: '',
    description: '',
    tags: [],
    inStock: true,
    featured: false,
    topSelling: false,
    isNew: true
  })

  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEditing) {
      setFormData({
        ...editingProduct,
        extraImages: editingProduct.extraImages || ['', ''],
        tags: editingProduct.tags || []
      })
    } else {
      // Auto-generate ID for new product
      const newId = `PRD-${Math.floor(1000 + Math.random() * 9000)}`
      setFormData(prev => ({ ...prev, id: newId }))
    }
  }, [editingProduct, isEditing])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const tag = tagInput.trim().replace(',', '')
      if (tag && !formData.tags.includes(tag)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
        setTagInput('')
      }
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (isEditing) {
        dispatch({ type: 'UPDATE_PRODUCT', payload: formData })
      } else {
        dispatch({ type: 'ADD_PRODUCT', payload: formData })
      }
      setLoading(false)
      setPanel('products')
    }, 1000)
  }

  const calculateDiscount = () => {
    if (!formData.price || !formData.originalPrice) return 0
    const price = parseFloat(formData.price)
    const original = parseFloat(formData.originalPrice)
    if (original <= price) return 0
    return Math.round(((original - price) / original) * 100)
  }

  return (
    <div className={styles.formContainer}>
      <header className={styles.header}>
        <button onClick={() => setPanel('products')} className={styles.backBtn}>
          <FaArrowLeft />
        </button>
        <div>
          <h1 className={styles.title}>
            {isEditing ? 'পণ্য সম্পাদনা করুন' : 'নতুন পণ্য যোগ করুন'}
          </h1>
          <p className={styles.subtitle}>সকল * চিহ্নিত তথ্য আবশ্যক</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          {/* Section A: Identity */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>পরিচিতি (Identity)</h2>
            <div className={styles.inputGroup}>
              <label>পণ্য ID*</label>
              <div className={styles.idWrapper}>
                <input 
                  type="text" 
                  name="id" 
                  value={formData.id} 
                  readOnly 
                  className={styles.idInput}
                />
                <button type="button" className={styles.copyBtn} title="Copy ID">
                  <FaCopy />
                </button>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>পণ্য নাম (বাংলা)*</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="যেমন: সেগুন কাঠের খাট"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>English Name*</label>
              <input 
                type="text" 
                name="nameEn" 
                value={formData.nameEn} 
                onChange={handleChange} 
                placeholder="e.g. Teak Wood Bed"
                required
                className={styles.enInput}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>ক্যাটাগরি*</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required
              >
                <option value="">নির্বাচন করুন</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </section>

          {/* Section B: Pricing */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>মূল্য (Pricing)</h2>
            <div className={styles.priceRow}>
              <div className={styles.inputGroup}>
                <label>বিক্রয় মূল্য* (৳)</label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange} 
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>আসল মূল্য (৳)</label>
                <input 
                  type="number" 
                  name="originalPrice" 
                  value={formData.originalPrice} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            {calculateDiscount() > 0 && (
              <div className={styles.discountBadge}>
                {calculateDiscount()}% ছাড় (Live Preview)
              </div>
            )}
          </section>

          {/* Section C: Images */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>ছবি (Images)</h2>
            <div className={styles.imageInputRow}>
              <div className={styles.inputGroup}>
                <label>মূল ছবি URL*</label>
                <input 
                  type="text" 
                  name="image" 
                  value={formData.image} 
                  onChange={handleChange} 
                  required
                  placeholder="https://..."
                />
              </div>
              <div className={styles.previewBox}>
                {formData.image ? (
                  <img src={formData.image} alt="Preview" />
                ) : (
                  <FaImage />
                )}
              </div>
            </div>
            <div className={styles.extraImages}>
              {formData.extraImages.map((url, idx) => (
                <div key={idx} className={styles.inputGroup}>
                  <label>অতিরিক্ত ছবি {idx + 1}</label>
                  <input 
                    type="text" 
                    value={url} 
                    onChange={(e) => {
                      const newImages = [...formData.extraImages]
                      newImages[idx] = e.target.value
                      setFormData(prev => ({ ...prev, extraImages: newImages }))
                    }}
                    placeholder="https://..."
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Section D: Details */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>বিবরণ (Details)</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.inputGroup}>
                <label>উপাদান</label>
                <input type="text" name="material" value={formData.material} onChange={handleChange} placeholder="যেমন: সেগুন কাঠ" />
              </div>
              <div className={styles.inputGroup}>
                <label>ফিনিশ</label>
                <input type="text" name="finish" value={formData.finish} onChange={handleChange} placeholder="যেমন: ল্যাকার পালিশ" />
              </div>
              <div className={styles.inputGroup}>
                <label>মাপ</label>
                <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="যেমন: ৫' x ৭'" />
              </div>
              <div className={styles.inputGroup}>
                <label>রঙ</label>
                <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="যেমন: আখরোট" />
              </div>
            </div>
          </section>

          {/* Section E: Extended Description */}
          <section className={`${styles.section} ${styles.fullWidth}`}>
            <h2 className={styles.sectionTitle}>বিস্তারিত বিবরণ</h2>
            <div className={styles.inputGroup}>
              <label>বিবরণ*</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                required 
                rows="5"
              ></textarea>
            </div>
            <div className={styles.inputGroup}>
              <label>ট্যাগ (Tags)</label>
              <div className={styles.tagsContainer}>
                {formData.tags.map(tag => (
                  <span key={tag} className={styles.tagPill}>
                    {tag} <FaXmark onClick={() => removeTag(tag)} />
                  </span>
                ))}
                <input 
                  type="text" 
                  value={tagInput} 
                  onChange={(e) => setTagInput(e.target.value)} 
                  onKeyDown={handleAddTag}
                  placeholder="ট্যাগ লিখে এন্টার দিন..."
                />
              </div>
            </div>
          </section>

          {/* Section F: Status Toggles */}
          <section className={`${styles.section} ${styles.fullWidth}`}>
            <h2 className={styles.sectionTitle}>অবস্থা (Status)</h2>
            <div className={styles.togglesRow}>
              <div className={styles.toggleItem}>
                <label className={styles.switch}>
                  <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} />
                  <span className={styles.slider}></span>
                </label>
                <span>স্টকে আছে</span>
              </div>
              <div className={styles.toggleItem}>
                <label className={styles.switch}>
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                  <span className={styles.slider}></span>
                </label>
                <span>ফিচার্ড</span>
              </div>
              <div className={styles.toggleItem}>
                <label className={styles.switch}>
                  <input type="checkbox" name="topSelling" checked={formData.topSelling} onChange={handleChange} />
                  <span className={styles.slider}></span>
                </label>
                <span>সেরা বিক্রিত</span>
              </div>
              <div className={styles.toggleItem}>
                <label className={styles.switch}>
                  <input type="checkbox" name="isNew" checked={formData.isNew} onChange={handleChange} />
                  <span className={styles.slider}></span>
                </label>
                <span>নতুন পণ্য</span>
              </div>
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <p className={styles.hint}>* চিহ্নিত তথ্য আবশ্যক</p>
          <div className={styles.footerBtns}>
            <button type="button" onClick={() => setPanel('products')} className={styles.cancelBtn}>
              বাতিল করুন
            </button>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'সংরক্ষণ হচ্ছে...' : 'পণ্য সংরক্ষণ করুন →'}
            </button>
          </div>
        </footer>
      </form>
    </div>
  )
}
