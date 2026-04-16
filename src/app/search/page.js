'use client'

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { categories } from '../../../data/categories';
import { products } from '../../../data/products';
import ProductCard from '../../components/Product/ProductCard';
import ProductDrawer from '../../components/Product/ProductDrawer';
import styles from './page.module.css';

const toNumberOrNull = (value) => {
  if (value === null || value === undefined || String(value).trim() === '') {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const query = useMemo(() => (searchParams.get('q') || '').trim().toLowerCase(), [searchParams]);
  const selectedCategory = useMemo(() => (searchParams.get('category') || '').trim(), [searchParams]);

  const minMax = useMemo(() => {
    const min = toNumberOrNull(searchParams.get('min'));
    const max = toNumberOrNull(searchParams.get('max'));

    if (min !== null && max !== null && min > max) {
      return { minPrice: max, maxPrice: min };
    }

    return { minPrice: min, maxPrice: max };
  }, [searchParams]);

  const categoryInfo = useMemo(() => {
    if (!selectedCategory) return null;
    return categories.find((cat) => cat.id === selectedCategory) || null;
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query);

      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesMin = minMax.minPrice === null || product.price >= minMax.minPrice;
      const matchesMax = minMax.maxPrice === null || product.price <= minMax.maxPrice;

      return matchesQuery && matchesCategory && matchesMin && matchesMax;
    });
  }, [query, selectedCategory, minMax]);

  const openProductDrawer = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDrawer = () => {
    setSelectedProduct(null);
  };

  return (
    <section className={`${styles.page} section-py`}>
      <div className="container">
        <header className={styles.header}>
          <Link href="/" className={styles.backLink}>
            <FaArrowLeftLong /> ফিরে যান
          </Link>

          <span className="label-caps">সার্চ</span>
          <h1 className="heading-lg">সার্চ রেজাল্ট</h1>
          <p className="body-text">মোট {filteredProducts.length}টি পণ্য পাওয়া গেছে।</p>

          <div className={styles.filterRow}>
            {query && <span className={styles.filterChip}>কিওয়ার্ড: {searchParams.get('q')}</span>}
            {categoryInfo && <span className={styles.filterChip}>ক্যাটাগরি: {categoryInfo.name}</span>}
            {minMax.minPrice !== null && (
              <span className={styles.filterChip}>সর্বনিম্ন: ৳{minMax.minPrice.toLocaleString()}</span>
            )}
            {minMax.maxPrice !== null && (
              <span className={styles.filterChip}>সর্বোচ্চ: ৳{minMax.maxPrice.toLocaleString()}</span>
            )}
          </div>
        </header>

        {filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onClick={openProductDrawer} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateInner}>
              <span className={styles.emptyLabel}>কোনো মিল পাওয়া যায়নি</span>
              <h2 className="heading-md">কোনো পণ্য পাওয়া যায়নি</h2>
              <p className="body-text">নাম, আইডি, ক্যাটাগরি বা দাম পরিবর্তন করে আবার চেষ্টা করুন।</p>
              <Link href="/search" className={styles.clearBtn}>সব ফিল্টার রিসেট করুন</Link>
            </div>
          </div>
        )}
      </div>

      {selectedProduct && <ProductDrawer product={selectedProduct} onClose={closeProductDrawer} />}
    </section>
  );
}
