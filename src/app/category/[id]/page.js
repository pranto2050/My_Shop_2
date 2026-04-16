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

  const categoryKey = useMemo(() => {
    const rawId = params?.id;
    if (Array.isArray(rawId)) {
      return rawId[0]?.toLowerCase() || '';
    }
    return decodeURIComponent(rawId || '').toLowerCase();
  }, [params]);

  const category = useMemo(() => {
    return categories.find(
      (item) => item.id.toLowerCase() === categoryKey || item.slug.toLowerCase() === categoryKey
    );
  }, [categoryKey]);

  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return products.filter((product) => product.category === category.id);
  }, [category]);

  const openProductDrawer = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDrawer = () => {
    setSelectedProduct(null);
  };

  if (!category) {
    return (
      <section className={`${styles.page} section-py`}>
        <div className="container">
          <div className={styles.emptyState}>
            <span className="label-caps">Category</span>
            <h1 className="heading-md">This category does not exist</h1>
            <p className="body-text">Please go back to the home page and choose a valid category.</p>
            <Link href="/" className={styles.backLink}>
              <FaArrowLeftLong /> Go Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.page} section-py`}>
      <div className="container">
        <header className={styles.header}>
          <Link href="/" className={styles.backLink}>
            <FaArrowLeftLong /> Back
          </Link>
          <span className="label-caps">Category</span>
          <h1 className="heading-lg">{category.name}</h1>
          <p className="body-text">Showing {categoryProducts.length} products from this category.</p>
        </header>

        {categoryProducts.length > 0 ? (
          <div className={styles.grid}>
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} onClick={openProductDrawer} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2 className="heading-md">No products found yet</h2>
            <p className="body-text">Products for this category will appear here when added.</p>
          </div>
        )}
      </div>

      {selectedProduct && <ProductDrawer product={selectedProduct} onClose={closeProductDrawer} />}
    </section>
  );
}
