import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './FloatingWA.module.css';

const FloatingWA = () => {
  return (
    <a 
      href="https://wa.me/8801979728818" 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.waButton}
      aria-label="Contact on WhatsApp"
    >
      <div className={styles.pulse} />
      <FaWhatsapp className={styles.icon} />
      <span className={styles.tooltip}>অর্ডার করতে ক্লিক করুন</span>
    </a>
  );
};

export default FloatingWA;
