'use client'

import React from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaCopy, FaStar, FaArrowRight } from 'react-icons/fa';
import { useToast } from '../Admin/context/ToastContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, variant = 'standard', onClick }) => {
  const { addToast } = useToast();

  const handleCopyId = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(product.id);
    addToast(`Product ID ${product.id} copied!`, 'success');
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const message = `হ্যালো মা ফার্নিচার, আমি এই পণ্যটি সম্পর্কে জানতে চাই: ${product.name} (ID: ${product.id})`;
    window.open(`https://wa.me/8801979728818?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (variant === 'compact') {
    return (
      <div className={styles.compactCard} onClick={() => onClick(product)}>
        <div className={styles.compactImageWrapper}>
          <Image src={product.image} alt={product.name} fill className={styles.image} />
        </div>
        <div className={styles.compactInfo}>
          <h3 className={styles.compactName}>{product.name}</h3>
          <p className={styles.compactPrice}>
            {typeof product.price === 'number' ? `৳${product.price.toLocaleString()}` : product.price}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.card} wood-grain`} onClick={() => onClick(product)}>
      {/* IMAGE ZONE */}
      <div className={styles.imageZone}>
        <Image src={product.image} alt={product.name} fill className={styles.image} />
        <div className={styles.overlay} />
        
        {/* BADGES */}
        <div className={styles.badges}>
          {product.oldPrice && typeof product.price === 'number' && (
            <span className={`${styles.badge} ${styles.saleBadge}`}>৳{(product.oldPrice - product.price).toLocaleString()} ছাড়</span>
          )}
          {product.isNew && <span className={`${styles.badge} ${styles.newBadge}`}>নতুন</span>}
          {product.isBestseller && <span className={`${styles.badge} ${styles.hotBadge}`}>🔥 জনপ্রিয়</span>}
        </div>

        {/* PRODUCT ID */}
        <div className={styles.productId}>{product.id}</div>

        {/* HOVER ACTION ROW */}
        <div className={styles.hoverActions}>
          <button className={styles.actionBtn} onClick={handleWhatsApp} title="Order on WhatsApp">
            <FaWhatsapp />
          </button>
          <button className={styles.actionBtn} onClick={handleCopyId} title="Copy Product ID">
            <FaCopy />
          </button>
          <span className={styles.detailsText}>বিস্তারিত দেখুন</span>
        </div>
      </div>

      {/* CARD BODY */}
      <div className={styles.cardBody}>
        <span className={styles.categoryTag}>{product.category}</span>
        <h3 className={styles.productName}>{product.name}</h3>
        
        <div className={styles.ratingRow}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < Math.floor(product.rating || 5) ? 'var(--honey)' : 'var(--linen-dark)'} />
            ))}
          </div>
          <span className={styles.reviewCount}>({product.reviews || 0})</span>
        </div>

        <div className={styles.priceRow}>
          <div className={styles.prices}>
            <span className={styles.currentPrice}>
              {typeof product.price === 'number' ? `৳${product.price.toLocaleString()}` : product.price}
            </span>
            {product.oldPrice && typeof product.oldPrice === 'number' && (
              <span className={styles.oldPrice}>৳{product.oldPrice.toLocaleString()}</span>
            )}
          </div>
          {product.discount && <span className={styles.discountBadge}>{product.discount}</span>}
        </div>

        <button className={styles.viewDetailsBtn}>
          বিস্তারিত দেখুন <FaArrowRight className={styles.arrow} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
