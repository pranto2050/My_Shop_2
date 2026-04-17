'use client'

import { useState } from 'react'
import { useAdmin } from './context/AdminContext'
import { FaPlus, FaMagnifyingGlass, FaFilter, FaPencil, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import ConfirmDialog from '../UI/ConfirmDialog'
import ProductDetailsModal from './ProductDetailsModal'
import styles from './ProductsPanel.module.css'

export default function ProductsPanel() {
  const { products, categories, setPanel, dispatch, currentPage, itemsPerPage } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all') // all, in-stock, out-of-stock, featured, top-selling
  const [deleteId, setDeleteId] = useState(null)
  const [viewingProduct, setViewingProduct] = useState(null)

  // Filtering logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    
    let matchesStatus = true
    if (filterStatus === 'in-stock') matchesStatus = product.inStock
    if (filterStatus === 'out-of-stock') matchesStatus = !product.inStock
    if (filterStatus === 'featured') matchesStatus = product.featured
    if (filterStatus === 'top-selling') matchesStatus = product.topSelling

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch({ type: 'SET_PAGE', payload: page })
    }
  }

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

  const toggleStatus = (id, field) => {
    const product = products.find(p => p.id === id)
    if (product) {
      dispatch({ 
        type: 'UPDATE_PRODUCT', 
        payload: { ...product, [field]: !product[field] } 
      })
    }
  }

  return (
    <div className={styles.productsPanel}>
      <ConfirmDialog 
        isOpen={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        message="আপনি কি নিশ্চিত যে আপনি এই পণ্যটি মুছে ফেলতে চান?"
      />
      <ProductDetailsModal 
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
        onEdit={handleEdit}
      />
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>পণ্য তালিকা</h1>
          <span className={styles.badge}>{filteredProducts.length}</span>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <FaMagnifyingGlass />
            <input 
              type="text" 
              placeholder="পণ্য খুঁজুন..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={() => setPanel('add-product')} className={styles.addBtn}>
            <FaPlus /> নতুন পণ্য যোগ করুন
          </button>
        </div>
      </header>

      <div className={styles.filterToolbar}>
        <div className={styles.filterScroll}>
          <button 
            className={`${styles.filterPill} ${filterStatus === 'all' ? styles.active : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            সব পণ্য
          </button>
          <button 
            className={`${styles.filterPill} ${filterStatus === 'in-stock' ? styles.active : ''}`}
            onClick={() => setFilterStatus('in-stock')}
          >
            স্টকে আছে
          </button>
          <button 
            className={`${styles.filterPill} ${filterStatus === 'featured' ? styles.active : ''}`}
            onClick={() => setFilterStatus('featured')}
          >
            ফিচার্ড
          </button>
          <button 
            className={`${styles.filterPill} ${filterStatus === 'top-selling' ? styles.active : ''}`}
            onClick={() => setFilterStatus('top-selling')}
          >
            সেরা বিক্রিত
          </button>
          <div className={styles.divider} />
          <select 
            className={styles.catSelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">সকল ক্যাটাগরি</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <span>ছবি</span>
          <span>আইডি ও নাম</span>
          <span>ক্যাটাগরি</span>
          <span>মূল্য</span>
          <span>অবস্থা</span>
          <span>অ্যাকশন</span>
        </div>
        <div className={styles.rows}>
          {currentItems.map(product => (
            <div 
              key={product.id} 
              className={styles.row}
              onClick={() => setViewingProduct(product)}
            >
              <div className={styles.thumbCell}>
                <img src={product.image} alt={product.name} className={styles.thumb} />
              </div>
              <div className={styles.infoCell}>
                <span className={styles.idPill}>{product.id}</span>
                <h3 className={styles.prodName}>{product.name}</h3>
              </div>
              <div className={styles.catCell}>
                <span className={styles.catPill}>{product.category}</span>
              </div>
              <div className={styles.priceCell}>
                ৳{product.price.toLocaleString('bn-BD')}
              </div>
              <div className={styles.statusCell} onClick={(e) => e.stopPropagation()}>
                <div className={styles.toggles}>
                  <div className={styles.toggleGroup}>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={product.inStock} 
                        onChange={() => toggleStatus(product.id, 'inStock')}
                      />
                      <span className={styles.slider}></span>
                    </label>
                    <span className={styles.toggleLabel}>স্টক</span>
                  </div>
                  <div className={styles.toggleGroup}>
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={product.featured} 
                        onChange={() => toggleStatus(product.id, 'featured')}
                      />
                      <span className={styles.slider}></span>
                    </label>
                    <span className={styles.toggleLabel}>ফিচার্ড</span>
                  </div>
                </div>
              </div>
              <div className={styles.actionCell} onClick={(e) => e.stopPropagation()}>
                <button onClick={() => handleEdit(product)} className={styles.editBtn}>
                  <FaPencil /> সম্পাদনা
                </button>
                <button onClick={() => handleDelete(product.id)} className={styles.deleteBtn}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={styles.pageBtn}
          >
            <FaChevronLeft /> আগে
          </button>
          
          <div className={styles.pageNumbers}>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`${styles.numBtn} ${currentPage === i + 1 ? styles.activePage : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={styles.pageBtn}
          >
            পরে <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}
