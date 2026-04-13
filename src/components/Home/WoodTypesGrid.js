'use client'

import React from 'react';
import styles from './WoodTypesGrid.module.css';
import { GiWoodPile } from 'react-icons/gi';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const woodTypes = [
  {
    id: 'teak',
    name: 'সেগুন কাঠ',
    desc: 'দীর্ঘস্থায়ী এবং প্রিমিয়াম ফিনিশ সহ সেরা মানের সেগুন কাঠ, যা প্রজন্মের পর প্রজন্ম টিকে থাকে।',
    badge: 'প্রিমিয়াম'
  },
  {
    id: 'mahogany',
    name: 'মেহগনি কাঠ',
    desc: 'গাঢ় লালচে আভা এবং মজবুত কাঠামোর জন্য মেহগনি কাঠ আমাদের গ্রাহকদের অন্যতম পছন্দ।',
    badge: 'জনপ্রিয়'
  },
  {
    id: 'gamari',
    name: 'গামারি কাঠ',
    desc: 'হালকা ওজনের কিন্তু অত্যন্ত টেকসই, যা আধুনিক ও ছিমছাম ডিজাইনের জন্য উপযুক্ত।',
    badge: 'টেকসই'
  },
  {
    id: 'oak',
    name: 'ওক কাঠ',
    desc: 'আকর্ষণীয় টেক্সচার এবং মজবুত গঠনের জন্য বিশ্বব্যাপী সমাদৃত একটি চমৎকার কাঠ।',
    badge: 'ক্লাসিক'
  }
];

const WoodTypesGrid = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className={`${styles.section} wood-grain ${isVisible ? styles.revealed : ''}`}>
      <div className={styles.container}>
        <h2 className={styles.heading}>আমাদের কাঠের মান</h2>
        
        <div className={styles.grid}>
          {woodTypes.map((wood) => (
            <div key={wood.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <GiWoodPile className={styles.icon} />
              </div>
              <h3 className={styles.name}>{wood.name}</h3>
              <p className={styles.desc}>{wood.desc}</p>
              <span className={styles.badge}>{wood.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WoodTypesGrid;
