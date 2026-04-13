'use client'

import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaClock } from 'react-icons/fa';
import styles from './ContactBlock.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const ContactBlock = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} id="contact" className={`${styles.section} wood-grain ${isVisible ? styles.revealed : ''}`}>
      <div className={styles.container}>
        <div className={styles.layout}>
          
          {/* Left Column - Contact Info */}
          <div className={styles.infoCol}>
            <span className={styles.label}>যোগাযোগ</span>
            <h2 className={styles.heading}>আমাদের শোরুমে আসুন</h2>
            <div className={styles.divider}></div>
            
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <FaMapMarkerAlt className={styles.icon} />
                </div>
                <div className={styles.infoText}>
                  <h4>ঠিকানা</h4>
                  <p>সাতারপাড়া বাজার, দৌলতপুর, কুষ্টিয়া</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <FaPhoneAlt className={styles.icon} />
                </div>
                <div className={styles.infoText}>
                  <h4>ফোন</h4>
                  <p>+880 1729 728818</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <FaClock className={styles.icon} />
                </div>
                <div className={styles.infoText}>
                  <h4>খোলার সময়</h4>
                  <p>প্রতিদিন সকাল ৯:০০ টা - রাত ৯:০০ টা</p>
                </div>
              </div>
            </div>
            
            <a href="https://wa.me/8801979728818" target="_blank" rel="noopener noreferrer" className={styles.waButton}>
              <FaWhatsapp className={styles.waIcon} />
              WhatsApp এ মেসেজ দিন
            </a>
          </div>

          {/* Right Column - Map Placeholder */}
          <div className={styles.mapCol}>
            <div className={`${styles.mapCard} double-border`}>
              <div className={styles.mapContent}>
                <FaMapMarkerAlt className={styles.mapIconBig} />
                <h3>মা ফার্নিচার</h3>
                <p>সাতারপাড়া বাজার, দৌলতপুর</p>
                <a 
                  href="https://maps.google.com/?q=Daulatpur,Kushtia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.mapLink}
                >
                  গুগল ম্যাপে দেখুন
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactBlock;
