'use client'

import React, { useRef } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { products } from '../../../data/products';
import ProductCard from '../Product/ProductCard';
import styles from './BestsellerTrack.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const BestsellerTrack = ({ onProductClick }) => {
  const [ref, isVisible] = useScrollReveal();
  const scrollRef = useRef(null);
  const bestsellers = products.filter(p => p.isBestseller);
  const featured = bestsellers[0];
  const others = bestsellers.slice(1);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 250 : scrollLeft + 250;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className={`${styles.bestsellerSection} ${isVisible ? styles.revealed : ''}`}>
      <div className={styles.sectionNumber}>01</div>
      
      <div className={styles.container}>
        <header className={styles.header}>
          <div className="ruled-heading" />
          <span className="label-caps">BEST SELLERS</span>
          <h2 className="heading-lg">সর্বাধিক বিক্রিত পণ্য</h2>
          <div className={styles.badgeRow}>
            <span className={styles.countBadge}>{bestsellers.length}টি পণ্য</span>
          </div>
        </header>

        <div className={styles.layout}>
          {/* LEFT: FEATURED CARD */}
          <div className={styles.featuredArea}>
            <div className={styles.featuredCard} onClick={() => onProductClick(featured)}>
              <div className={styles.imageWrapper}>
                <Image src={featured.image} alt={featured.name} fill className={styles.featuredImage} />
                <div className={styles.rankBadge}>#1 বিক্রিত</div>
              </div>
              <div className={styles.infoBar}>
                <div className={styles.infoContent}>
                  <h3 className={styles.featuredName}>{featured.name}</h3>
                  <p className={styles.featuredPrice}>৳{featured.price.toLocaleString()}</p>
                </div>
                <button className={styles.orderBtn}>অর্ডার করুন</button>
              </div>
            </div>
          </div>

          {/* RIGHT: SCROLL TRACK */}
          <div className={styles.trackArea}>
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={() => scroll('left')}>
              <FaChevronLeft />
            </button>
            <div className={styles.scrollTrack} ref={scrollRef}>
              {others.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  variant="compact" 
                  onClick={onProductClick}
                />
              ))}
            </div>
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={() => scroll('right')}>
              <FaChevronRight />
            </button>
            <div className={styles.gradientLeft} />
            <div className={styles.gradientRight} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestsellerTrack;
