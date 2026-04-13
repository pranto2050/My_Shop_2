'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import * as Icons from 'react-icons/fa6';
import ProductCard from '../Product/ProductCard';
import styles from './CategorySection.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CategorySection = ({ category, products, index, onProductClick }) => {
  const [ref, isVisible] = useScrollReveal();
  const scrollRef = useRef(null);

  const CategoryIcon = ({ iconName, ...props }) => {
    const IconComponent = Icons[iconName] || Icons.FaQuestion;
    return <IconComponent {...props} />;
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 300 : scrollLeft + 300;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const bgClass = index % 3 === 0 ? styles.bgParchment : index % 3 === 1 ? styles.bgParchment2 : styles.bgParchment3;

  return (
    <section ref={ref} className={`${styles.section} ${bgClass} ${isVisible ? styles.revealed : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.sectionNumber}>{index.toString().padStart(2, '0')}</div>
            <div className={styles.categoryInfo}>
              <CategoryIcon iconName={category.icon} size={60} className={styles.categoryIcon} />
              <div className={styles.titleBlock}>
                <span className="label-caps">CATEGORY</span>
                <h2 className="heading-md">{category.name}</h2>
                <span className={styles.countBadge}>{products.length}টি পণ্য</span>
              </div>
            </div>
          </div>
          <div className={styles.headerRight}>
            <Link href={`/category/${category.id}`} className={styles.viewAllLink}>
              সকল {category.name} দেখুন <FaArrowRight />
            </Link>
          </div>
        </div>

        <div className={styles.trackArea}>
          <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={() => scroll('left')}>
            <FaChevronLeft />
          </button>
          <div className={styles.scrollTrack} ref={scrollRef}>
            {products.map(product => (
              <div key={product.id} className={styles.productWrapper}>
                <ProductCard 
                  product={product} 
                  onClick={onProductClick}
                />
              </div>
            ))}
          </div>
          <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={() => scroll('right')}>
            <FaChevronRight />
          </button>
        </div>

        <div className={styles.footer}>
          <Link href={`/category/${category.id}`} className={styles.outlineBtn}>
            আরও পণ্য দেখুন
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
