'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './GalleryTeaser.module.css';
import { gallery } from '../../../data/gallery';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const GalleryTeaser = () => {
  // Using all available images from gallery
  const displayImages = gallery.slice(0, 9);
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className={`${styles.section} ${isVisible ? styles.revealed : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>আমাদের কাজের গ্যালারি</h2>
          <p className={styles.subtext}>গ্রাহকদের বাসায় আমাদের তৈরি ফার্নিচার</p>
        </div>

        <div className={styles.masonry}>
          {displayImages.map((item) => (
            <div key={item.id} className={styles.masonryItem}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.caption}
                  width={600}
                  height={800}
                  className={styles.image}
                  unoptimized={true} // Unsplash URLs might need this or domains configured in next.config.js
                />
                <div className={styles.overlay}>
                  <p className={styles.caption}>{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/photo-gallery" className={styles.button}>
            আরও ছবি দেখুন
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryTeaser;
