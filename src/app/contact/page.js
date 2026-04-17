'use client'

import React from 'react';
import ContactBlock from '../../components/Home/ContactBlock';
import { storeInfo } from '../../../data/stor info';
import { getWhatsAppUrl } from '../../utils/storeUtils';
import styles from './page.module.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaClock } from 'react-icons/fa';

const ContactPage = () => {
  const waNumber = storeInfo.whatsapp.number;

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heading}>আমাদের সাথে যোগাযোগ করুন</h1>
          <p className={styles.subtext}>
            আপনার স্বপ্নের ফার্নিচার নিয়ে যেকোনো প্রশ্ন বা অর্ডারের জন্য সরাসরি আমাদের সাথে কথা বলুন।
          </p>
        </div>
      </div>

      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.iconBox}><FaMapMarkerAlt /></div>
              <h3>{storeInfo.showroomAddress.label}</h3>
              <p>{storeInfo.showroomAddress.address}</p>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.iconBox}><FaPhoneAlt /></div>
              <h3>{storeInfo.callNumbers.label}</h3>
              {storeInfo.callNumbers.numbers.map((num, idx) => (
                <p key={idx}>{num}</p>
              ))}
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}><FaWhatsapp /></div>
              <h3>{storeInfo.whatsapp.label}</h3>
              <p>{waNumber}</p>
              <a href={getWhatsAppUrl(waNumber)} target="_blank" rel="noopener noreferrer" className={styles.waLink}>{storeInfo.directMessageLabel}</a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}><FaClock /></div>
              <h3>{storeInfo.openingHours.label}</h3>
              {storeInfo.openingHours.schedule.map((time, idx) => (
                <p key={idx}>{time}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <ContactBlock />

      <section className={styles.mapSection}>
        <div className={styles.container}>
          <div className={styles.mapWrapper}>
            {/* Embedded Google Maps Placeholder */}
            <div className={styles.mapPlaceholder}>
              <FaMapMarkerAlt size={40} color="var(--walnut)" />
              <p>Google Maps এ আমাদের অবস্থান দেখতে শোরুমে আসুন</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeInfo.showroomAddress.address)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.mapBtn}
              >
                Google Maps এ দেখুন
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
