'use client'

import { useState } from 'react'
import { useAdmin } from './context/AdminContext'
import { FaPlus, FaPencil, FaTrash, FaCheck } from 'react-icons/fa6'
import ConfirmDialog from '../UI/ConfirmDialog'
import styles from './CategoriesPanel.module.css'

export default function CategoriesPanel() {
  const { categories, products, dispatch } = useAdmin()
  const [editingId, setEditingId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    icon: '',
    color: '#D4882A'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEdit = (category) => {
    setEditingId(category.id)
    setFormData(category)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      dispatch({ type: 'UPDATE_CATEGORY', payload: { ...formData, id: editingId } })
    } else {
      const newId = categories.length + 1
      dispatch({ type: 'ADD_CATEGORY', payload: { ...formData, id: newId } })
    }
    resetForm()
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({ name: '', nameEn: '', icon: '', color: '#D4882A' })
  }

  const handleDelete = (id) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    dispatch({ type: 'DELETE_CATEGORY', payload: deleteId })
    setDeleteId(null)
  }

  const getProductCount = (categoryName) => {
    return products.filter(p => p.category === categoryName).length
  }

  return (
    <div className={styles.categoriesPanel}>
      <ConfirmDialog 
        isOpen={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        message="আপনি কি নিশ্চিত যে আপনি এই ক্যাটাগরি মুছে ফেলতে চান? এটি ক্যাটাগরির পণ্যগুলো মুছে ফেলবে না।"
      />
      <header className={styles.header}>
        <h1 className={styles.title}>ক্যাটাগরি ম্যানেজমেন্ট</h1>
      </header>

      <div className={styles.grid}>
        {/* Left: Form */}
        <div className={styles.formCol}>
          <div className={styles.formCard}>
            <h2 className={styles.cardTitle}>
              {editingId ? 'ক্যাটাগরি সম্পাদনা' : 'নতুন ক্যাটাগরি যোগ করুন'}
            </h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>নাম (বাংলা)*</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="যেমন: খাট"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>English Name*</label>
                <input 
                  type="text" 
                  name="nameEn" 
                  value={formData.nameEn} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. Bed"
                  className={styles.enInput}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>আইকন (Emoji or Class)</label>
                <input 
                  type="text" 
                  name="icon" 
                  value={formData.icon} 
                  onChange={handleChange} 
                  placeholder="যেমন: 🛏️"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>রঙ</label>
                <div className={styles.colorPicker}>
                  <input 
                    type="color" 
                    name="color" 
                    value={formData.color} 
                    onChange={handleChange} 
                  />
                  <span>{formData.color}</span>
                </div>
              </div>
              <div className={styles.formBtns}>
                {editingId && (
                  <button type="button" onClick={resetForm} className={styles.cancelBtn}>
                    বাতিল
                  </button>
                )}
                <button type="submit" className={styles.submitBtn}>
                  {editingId ? 'আপডেট করুন' : 'ক্যাটাগরি যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: List */}
        <div className={styles.listCol}>
          <div className={styles.listHeader}>
            <span>ক্যাটাগরি</span>
            <span>পণ্য সংখ্যা</span>
            <span>অ্যাকশন</span>
          </div>
          <div className={styles.list}>
            {categories.map(cat => (
              <div key={cat.id} className={styles.row}>
                <div className={styles.catInfo}>
                  <div 
                    className={styles.iconBox} 
                    style={{ background: cat.color + '20', color: cat.color }}
                  >
                    {cat.icon || '📁'}
                  </div>
                  <div>
                    <h3 className={styles.catName}>{cat.name}</h3>
                    <span className={styles.catNameEn}>{cat.nameEn}</span>
                  </div>
                </div>
                <div className={styles.count}>
                  {getProductCount(cat.name)}টি পণ্য
                </div>
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(cat)} className={styles.editBtn}>
                    <FaPencil />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className={styles.deleteBtn}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
