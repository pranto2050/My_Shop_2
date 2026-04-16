'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { categories } from '../../../data/categories';
import styles from './SmartSearchBlock.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const SmartSearchBlock = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [ref, isVisible] = useScrollReveal();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (query.trim()) params.set('q', query.trim());
    if (category) params.set('category', category);
    if (minPrice) params.set('min', minPrice);
    if (maxPrice) params.set('max', maxPrice);

    const queryString = params.toString();
    router.push(queryString ? `/search?${queryString}` : '/search');
  };

  return (
    <section ref={ref} className={`${styles.searchSection} ${isVisible ? styles.revealed : ''}`}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <span className={styles.label}>SEARCH</span>
            <h2 className={styles.heading}>খুঁজে নিন আপনার পছন্দের আসবাব</h2>
            <p className={styles.subtext}>
              আমাদের হাজারো পণ্যের সংগ্রহ থেকে আপনার প্রয়োজনীয় ফার্নিচারটি খুঁজে বের করুন মুহূর্তেই।
            </p>
          </div>

          <div className={styles.rightCol}>
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <div className={styles.row1}>
                <input 
                  type="text" 
                  placeholder="পণ্যের নাম বা ID লিখুন..." 
                  className={styles.textInput}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className={styles.row2}>
                <select 
                  className={styles.select}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">ক্যাটাগরি</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>

                <select 
                  className={styles.select}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                >
                  <option value="">সর্বনিম্ন ৳</option>
                  <option value="2000">২,০০০</option>
                  <option value="5000">৫,০০০</option>
                  <option value="10000">১০,০০০</option>
                </select>

                <select 
                  className={styles.select}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                >
                  <option value="">সর্বোচ্চ ৳</option>
                  <option value="20000">২০,০০০</option>
                  <option value="50000">৫০,০০০</option>
                  <option value="100000">১,০০,০০০</option>
                </select>

                <button type="submit" className={styles.searchBtn}>
                  খুঁজুন <FaSearch />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartSearchBlock;
