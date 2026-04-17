'use client'

import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaEnvelope, FaClock } from 'react-icons/fa';
import { storeInfo } from '../../../data/stor info';
import { getWhatsAppUrl } from '../../utils/storeUtils';
import styles from './ContactBlock.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const ContactBlock = () => {
  const [ref, isVisible] = useScrollReveal();

  const mainPhone = storeInfo.callNumbers.numbers[0];
  const waNumber = storeInfo.whatsapp.number;

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
                  <p>{storeInfo.showroomAddress.address}</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <FaPhoneAlt className={styles.icon} />
                </div>
                <div className={styles.infoText}>
                  <h4>ফোন</h4>
                  <p>{mainPhone}</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <FaClock className={styles.icon} />
                </div>
                <div className={styles.infoText}>
                  <h4>{storeInfo.openingHours.label}</h4>
                  <p>{storeInfo.openingHours.schedule[0]}</p>
                </div>
              </div>
            </div>
            
            <a href={getWhatsAppUrl(waNumber)} target="_blank" rel="noopener noreferrer" className={styles.waButton}>
              <FaWhatsapp className={styles.waIcon} />
              {storeInfo.whatsapp.label} এ মেসেজ দিন
            </a>
          </div>

          {/* Right Column - Map Placeholder */}
          <div className={styles.mapCol}>
            <div className={`${styles.mapCard} double-border`}>
              <div className={styles.mapContent}>
                <FaMapMarkerAlt className={styles.mapIconBig} />
                <h3>মা ফার্নিচার</h3>
                <p>{storeInfo.showroomAddress.address.split(',')[0] + ', ' + storeInfo.showroomAddress.address.split(',')[1]}</p>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(storeInfo.showroomAddress.address)}`} 
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
