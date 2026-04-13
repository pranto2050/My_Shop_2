'use client'

import React from 'react';
import Link from 'next/link';
import * as Icons from 'react-icons/fa6';
import { categories } from '../../../data/categories';
import styles from './CategoryBento.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CategoryBento = () => {
  const [ref, isVisible] = useScrollReveal();
  const CategoryIcon = ({ iconName, ...props }) => {
    const IconComponent = Icons[iconName] || Icons.FaQuestion;
    return <IconComponent {...props} />;
  };

  return (
    <section ref={ref} className={`${styles.section} ${isVisible ? styles.revealed : ''}`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className="label-caps">COLLECTIONS</span>
          <h2 className="heading-lg">আমাদের পণ্য সংগ্রহ</h2>
        </header>

        <div className={styles.bentoGrid}>
          {categories.slice(0, 10).map((cat, index) => (
            <Link 
              key={cat.id} 
              href={`/category/${cat.id}`} 
              className={`${styles.bentoItem} ${index === 0 ? styles.largeItem : ''}`}
            >
              <div className={styles.content}>
                <div className={styles.iconWrapper}>
                  <CategoryIcon iconName={cat.icon} size={index === 0 ? 100 : 60} className={styles.icon} />
                </div>
                <div className={styles.textWrapper}>
                  <h3 className={index === 0 ? styles.largeName : styles.name}>{cat.name}</h3>
                  <span className={styles.countBadge}>{cat.count}টি পণ্য</span>
                  {index === 0 && <span className={styles.viewBtn}>দেখুন →</span>}
                </div>
              </div>
              <div className={styles.background} style={{ backgroundImage: `url(${cat.image})` }} />
              <div className={styles.overlay} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBento;
