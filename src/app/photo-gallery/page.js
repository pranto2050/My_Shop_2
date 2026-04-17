'use client'

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { gallery } from '../../../data/gallery';
import { categories } from '../../../data/categories';

const PhotoGalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredGallery = useMemo(() => {
    if (activeFilter === 'all') return gallery;
    return gallery.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const filterOptions = [
    { id: 'all', name: 'সবগুলো' },
    ...categories.map(cat => ({ id: cat.id, name: cat.name }))
  ];

  return (
    <main className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>ফটো গ্যালারি</h1>
          <p className={styles.subtext}>
            মা ফার্নিচার থেকে গ্রাহকদের বাসায় সরবরাহ করা কিছু উন্নত মানের ফার্নিচারের বাস্তব ছবি।
          </p>
        </div>

        <div className={styles.filterBar}>
          {filterOptions.map(option => (
            <button
              key={option.id}
              className={`${styles.filterBtn} ${activeFilter === option.id ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>

        <div className={styles.masonry}>
          {filteredGallery.map((item) => {
            const categoryName = categories.find(c => c.id === item.category)?.name || item.category;
            return (
              <div key={item.id} className={styles.masonryItem}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.caption}
                    width={600}
                    height={800}
                    className={styles.image}
                    unoptimized={true}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.categoryTag}>{categoryName}</span>
                    <p className={styles.caption}>{item.caption}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredGallery.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--bark-soft)' }}>
            <p>এই ক্যাটাগরিতে বর্তমানে কোনো ছবি নেই।</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default PhotoGalleryPage;
