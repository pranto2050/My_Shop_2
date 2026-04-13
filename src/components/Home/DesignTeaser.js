'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import styles from './DesignTeaser.module.css';
import { designs } from '../../../data/designs';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const DesignTeaser = () => {
  const displayDesigns = designs.slice(0, 6);
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className={`${styles.section} ${isVisible ? styles.revealed : ''}`}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Left Column - Editorial Text */}
          <div className={styles.textContent}>
            <span className={styles.label}>INSPIRATION</span>
            <h2 className={styles.heading}>এক্সক্লুসিভ ফার্নিচার ডিজাইন</h2>
            <div className={styles.divider}></div>
            <p className={styles.description}>
              আমাদের সুদক্ষ কারিগরদের তৈরি আধুনিক ও ক্লাসিক ডিজাইনের এক অপূর্ব সংগ্রহ। 
              আপনার ঘরের সৌন্দর্য বাড়াতে বেছে নিন আপনার পছন্দের ডিজাইন।
            </p>
            <Link href="/design-gallery" className={styles.button}>
              সকল ডিজাইন দেখুন <FaArrowRight className={styles.icon} />
            </Link>
          </div>

          {/* Right Column - 3x2 Grid */}
          <div className={styles.grid}>
            {displayDesigns.map((design) => (
              <div key={design.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={design.image} 
                    alt={design.name} 
                    fill 
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.badge}>{design.material}</span>
                    <h3 className={styles.cardTitle}>{design.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignTeaser;
