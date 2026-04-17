'use client'

import React, { useEffect, useState } from 'react';
import styles from './WorkshopLoader.module.css';

const WorkshopLoader = ({ isExiting }) => {
  const [loadingText, setLoadingText] = useState('আপনার স্বপ্নের আসবাবপত্র তৈরি হচ্ছে...');
  
  useEffect(() => {
    const messages = [
      'আপনার স্বপ্নের আসবাবপত্র তৈরি হচ্ছে...',
      'Crafting your dream furniture...',
      'নির্ভুলতা এবং ভালোবাসা দিয়ে...',
      'Made with precision and love...',
      'কিছুক্ষণ অপেক্ষা করুন...',
      'Wait a moment...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setLoadingText(messages[i]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.loaderOverlay} ${isExiting ? styles.exiting : ''}`}>
      <div className={styles.loaderContent}>
        {/* LOGO AREA */}
        <div className={styles.logoContainer}>
          <div className={styles.logoCircle}>
            <svg viewBox="0 0 100 100" className={styles.mainIcon}>
              {/* Stylized Chair/Furniture Icon */}
              <path 
                d="M30 70 L30 30 L70 30 L70 70 M30 50 L70 50 M40 70 L40 90 M60 70 L60 90" 
                fill="none" 
                stroke="var(--walnut)" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className={styles.pathAnimation}
              />
            </svg>
            <div className={styles.rings}>
              <div className={styles.ring}></div>
              <div className={styles.ring}></div>
              <div className={styles.ring}></div>
            </div>
          </div>
          <h1 className={styles.shopName}>মা ফার্নিচার</h1>
        </div>

        {/* LOADING STATE */}
        <div className={styles.loadingInfo}>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
            <div className={styles.sawdustContainer}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={styles.sawdustParticle} style={{ '--delay': `${i * 0.2}s`, '--left': `${i * 12.5}%` }}></div>
              ))}
            </div>
          </div>
          <p className={styles.statusText}>{loadingText}</p>
        </div>
      </div>
      
      {/* BACKGROUND ACCENTS */}
      <div className={styles.bgGrain}></div>
    </div>
  );
};

export default WorkshopLoader;
