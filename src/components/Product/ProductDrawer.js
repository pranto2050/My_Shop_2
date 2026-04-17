'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaCopy, FaStar, FaWhatsapp, FaMinus, FaPlus, FaCheckCircle } from 'react-icons/fa';
import { useToast } from '../Admin/context/ToastContext';
import styles from './ProductDrawer.module.css';

const ProductDrawer = ({ product, onClose }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isClosing, setIsClosing] = useState(false);
  const { addToast } = useToast();

  const images = product.gallery || [product.image];

  // Prevent background scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400); // match animation duration
  };

  const handleCopyInfo = () => {
    const priceStr = typeof product.price === 'number' ? `৳${product.price.toLocaleString()}` : product.price;
    const text = `Product: ${product.name}\nID: ${product.id}\nPrice: ${priceStr}`;
    navigator.clipboard.writeText(text);
    addToast('পণ্যের তথ্য কপি করা হয়েছে!', 'success');
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(product.id);
    addToast('Product ID copied!', 'success');
  };

  const handleWhatsApp = () => {
    const priceStr = typeof product.price === 'number' ? `৳${(product.price * quantity).toLocaleString()}` : product.price;
    const message = `হ্যালো মা ফার্নিচার, আমি এই পণ্যটি অর্ডার করতে চাই:
${product.name}
ID: ${product.id}
পরিমাণ: ${quantity} টি
মূল্য: ${priceStr}`;
    window.open(`https://wa.me/8801979728818?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className={`${styles.overlay} ${isClosing ? styles.fadeOut : ''}`} onClick={handleClose}>
      <div 
        className={`${styles.drawer} ${isClosing ? styles.slideOut : ''}`} 
        onClick={e => e.stopPropagation()}
      >
        
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.productId}>{product.id}</span>
            <button className={styles.iconBtn} onClick={handleCopyId} title="Copy ID">
              <FaCopy />
            </button>
          </div>
          <div className={styles.headerCenter}>পণ্যের বিবরণ</div>
          <button className={styles.closeBtn} onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className={styles.contentArea}>
          
          {/* IMAGE SECTION */}
          <div className={styles.imageSection}>
            <div className={styles.mainImageWrapper}>
              <Image 
                src={images[activeImage]} 
                alt={product.name} 
                fill 
                className={styles.mainImage}
              />
            </div>
            
            {images.length > 1 && (
              <div className={styles.thumbnailRow}>
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`${styles.thumbnailWrapper} ${activeImage === idx ? styles.activeThumb : ''}`}
                    onClick={() => setActiveImage(idx)}
                  >
                    <Image src={img} alt={`Thumbnail ${idx}`} fill className={styles.thumbnail} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS SECTION */}
          <div className={styles.detailsSection}>
            <h2 className={styles.productName}>{product.name}</h2>
            
            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < Math.floor(product.rating || 5) ? 'var(--honey)' : 'var(--linen-dark)'} />
                ))}
              </div>
              <span className={styles.reviewCount}>({product.reviews || 0} রিভিউ)</span>
            </div>

            <div className={styles.priceBlock}>
              <div className={styles.currentPrice}>
                {typeof product.price === 'number' ? `৳${product.price.toLocaleString()}` : product.price}
              </div>
              {product.oldPrice && typeof product.oldPrice === 'number' && (
                <div className={styles.oldPriceRow}>
                  <span className={styles.oldPrice}>৳{product.oldPrice.toLocaleString()}</span>
                  {product.discount && <span className={styles.discountBadge}>{product.discount} ছাড়</span>}
                </div>
              )}
            </div>

            <div className={styles.divider}></div>

            {/* SPECS GRID */}
            <div className={styles.specsGrid}>
              <div className={styles.specRow}>
                <div className={styles.specLabel}>উপাদান</div>
                <div className={styles.specValue}>{product.material || 'সেগুন কাঠ'}</div>
              </div>
              <div className={styles.specRow}>
                <div className={styles.specLabel}>ফিনিশ</div>
                <div className={styles.specValue}>{product.finish || 'ম্যাট / গ্লসি'}</div>
              </div>
              <div className={styles.specRow}>
                <div className={styles.specLabel}>মাপ</div>
                <div className={styles.specValue}>{product.dimensions || 'স্ট্যান্ডার্ড'}</div>
              </div>
              <div className={styles.specRow}>
                <div className={styles.specLabel}>রঙ</div>
                <div className={styles.specValue}>{product.color || 'ন্যাচারাল উড'}</div>
              </div>
              <div className={styles.specRow}>
                <div className={styles.specLabel}>ওয়ারেন্টি</div>
                <div className={styles.specValue}>{product.warranty || '১ বছর'}</div>
              </div>
              <div className={styles.specRow}>
                <div className={styles.specLabel}>স্টক</div>
                <div className={`${styles.specValue} ${styles.inStock}`}>
                  <FaCheckCircle className={styles.stockIcon} /> পাওয়া যাচ্ছে
                </div>
              </div>
            </div>

            <div className={styles.description}>
              {product.description || 'উন্নত মানের কাঠ দিয়ে তৈরি মজবুত এবং আকর্ষণীয় ডিজাইনের ফার্নিচার। আধুনিক রুচিশীল মানুষের জন্য উপযুক্ত।'}
            </div>

            <div className={styles.quantitySection}>
              <span className={styles.quantityLabel}>পরিমাণ:</span>
              <div className={styles.quantityControls}>
                <button className={styles.qtyBtn} onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <FaMinus />
                </button>
                <span className={styles.qtyValue}>{quantity.toString().padStart(2, '0')}</span>
                <button className={styles.qtyBtn} onClick={() => handleQuantityChange(1)} disabled={quantity >= 10}>
                  <FaPlus />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className={styles.bottomBar}>
          <button className={styles.waOrderBtn} onClick={handleWhatsApp}>
            <FaWhatsapp className={styles.waOrderIcon} />
            WhatsApp এ অর্ডার করুন
          </button>
          <button className={styles.copyInfoLink} onClick={handleCopyInfo}>
            <FaCopy /> তথ্য কপি করুন
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDrawer;
