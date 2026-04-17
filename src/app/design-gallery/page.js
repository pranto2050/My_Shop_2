'use client'

import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { designs } from '../../../data/designs';
import { categories } from '../../../data/categories';

const DesignGalleryPage = () => {
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
          {designs.map((design) => {
            const categoryName = categories.find(c => c.id === design.category)?.name || design.category;
            return (
              <div key={design.id} className={styles.designCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={design.image}
                    alt={design.name}
                    fill
                    className={styles.image}
                    unoptimized={true}
                  />
                </div>
                <div className={styles.content}>
                  <span className={styles.category}>{categoryName} • {design.id}</span>
                  <h3 className={styles.designName}>{design.name}</h3>
                  <p className={styles.description}>{design.description}</p>
                  
                  <div className={styles.footer}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>উপাদান</span>
                      <span className={styles.infoValue}>{design.material}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>মূল্য</span>
                      <span className={`${styles.infoValue} ${styles.priceValue}`}>{design.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {designs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--bark-soft)' }}>
            <p>বর্তমানে কোনো ডিজাইন প্রদর্শনীর জন্য নেই।</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default DesignGalleryPage;
