'use client'

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { categories } from '../../../../data/categories';
import { products } from '../../../../data/products';
import ProductCard from '../../../components/Product/ProductCard';
import ProductDrawer from '../../../components/Product/ProductDrawer';
import styles from './page.module.css';

export default function CategoryPage() {
  const params = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categorySlug = useMemo(() => {
    const rawId = params?.id;
    if (typeof rawId !== 'string') return '';
    return decodeURIComponent(rawId).trim().toLowerCase();
  }, [params]);

  const categoryInfo = useMemo(() => {
    if (!categorySlug) return null;
    return (
      categories.find(
        (cat) => cat.id.toLowerCase() === categorySlug || cat.slug.toLowerCase() === categorySlug
      ) || null
    );
  }, [categorySlug]);

  const filteredProducts = useMemo(() => {
    if (!categoryInfo) return [];
    return products.filter((product) => product.category === categoryInfo.id);
  }, [categoryInfo]);

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

          <span className="label-caps">ক্যাটাগরি</span>
          <h1 className="heading-lg">{categoryInfo ? categoryInfo.name : 'ক্যাটাগরি পাওয়া যায়নি'}</h1>
          <p className="body-text">
            মোট {filteredProducts.length}টি পণ্য পাওয়া গেছে।
          </p>
        </header>

        {filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onClick={openProductDrawer} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2 className="heading-md">এই ক্যাটাগরিতে এখনো পণ্য যোগ করা হয়নি</h2>
            <p className="body-text">অন্যান্য ক্যাটাগরি দেখে নিতে পারেন।</p>
            <Link href="/" className={styles.backLink}>হোমে ফিরে যান</Link>
          </div>
        )}
      </div>

      {selectedProduct && <ProductDrawer product={selectedProduct} onClose={closeProductDrawer} />}
    </section>
  );
}
