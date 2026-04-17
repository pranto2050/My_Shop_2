'use client'

import React from 'react';
import ContactBlock from '../../components/Home/ContactBlock';
import styles from './page.module.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaClock } from 'react-icons/fa';

const ContactPage = () => {
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
              <h3>শোরুমের ঠিকানা</h3>
              <p>সাতারপাড়া বাজার, দৌলতপুর, কুষ্টিয়া</p>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.iconBox}><FaPhoneAlt /></div>
              <h3>সরাসরি কল করুন</h3>
              <p>+৮৮০ ১৭২৯৭২৮৮১৮</p>
              <p>+৮৮০ ১৯২৯৭২৮৮১৮</p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}><FaWhatsapp /></div>
              <h3>WhatsApp মেসেজ</h3>
              <p>+৮৮০ ১৯২৯৭২৮৮১৮</p>
              <a href="https://wa.me/8801929728818" target="_blank" rel="noopener noreferrer" className={styles.waLink}>সরাসরি মেসেজ দিন</a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}><FaClock /></div>
              <h3>খোলা থাকার সময়</h3>
              <p>প্রতিদিন: সকাল ৯:০০ - রাত ৯:০০</p>
              <p>শুক্রবার: সকাল ১০:০০ - রাত ৯:০০</p>
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
                href="https://www.google.com/maps/search/?api=1&query=সাতারপাড়া+বাজার+দৌলতপুর+কুষ্টিয়া" 
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
