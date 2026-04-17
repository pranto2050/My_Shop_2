'use client'

import React, { useState, useMemo } from 'react';
import styles from './page.module.css';
import { designs } from '../../../data/designs';
import { categories } from '../../../data/categories';
import ProductCard from '../../components/Product/ProductCard';
import ProductDrawer from '../../components/Product/ProductDrawer';

const DesignGalleryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 20;

  // Calculate pagination
  const totalPages = Math.ceil(designs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDesigns = useMemo(() => {
    return designs.slice(indexOfFirstItem, indexOfLastItem);
  }, [indexOfFirstItem, indexOfLastItem]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDrawer = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDrawer = () => {
    setSelectedProduct(null);
  };

  return (
    <main className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>ডিজাইন গ্যালারি</h1>
          <p className={styles.subtext}>
            আমাদের নিজস্ব কারিগর দ্বারা তৈরি আধুনিক ও রুচিশীল ফার্নিচার ডিজাইন সমূহ।
          </p>
        </div>

        <div className={styles.grid}>
          {currentDesigns.map((design) => {
            const categoryName = categories.find(c => c.id === design.category)?.name || design.category;
            const productData = {
              ...design,
              category: categoryName
            };
            return (
              <ProductCard 
                key={design.id} 
                product={productData} 
                onClick={openProductDrawer}
              />
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`${styles.pageBtn} ${currentPage === index + 1 ? styles.pageBtnActive : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className={styles.pageBtn}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &raquo;
            </button>
          </div>
        )}

        {designs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--bark-soft)' }}>
            <p>বর্তমানে কোনো ডিজাইন প্রদর্শনীর জন্য নেই।</p>
          </div>
        )}
      </div>

      {selectedProduct && <ProductDrawer product={selectedProduct} onClose={closeProductDrawer} />}
    </main>
  );
};

export default DesignGalleryPage;
