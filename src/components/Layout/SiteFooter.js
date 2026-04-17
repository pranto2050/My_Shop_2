import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaYoutube, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { storeInfo } from '../../../data/stor info';
import { getTelUrl, getWhatsAppUrl } from '../../utils/storeUtils';
import styles from './SiteFooter.module.css';

const SiteFooter = () => {
  // Helper function to get numbers for links
  const getCleanNumber = (num) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.split('').map(char => {
      const index = bengaliDigits.indexOf(char);
      return index !== -1 ? index : char;
    }).join('').replace(/\s+/g, '');
  };

  const mainPhone = storeInfo.callNumbers.numbers[0];
  const waNumber = storeInfo.whatsapp.number;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand & About */}
          <div className={styles.brandSection}>
            <h2 className={styles.footerLogo}>মা ফার্নিচার</h2>
            <p className={styles.aboutText}>
              কুষ্টিয়া দৌলতপুরের প্রিমিয়াম হস্তনির্মিত আসবাবপত্র। আমরা বিশ্বাস করি গুণগত মান এবং আধুনিক ডিজাইনের সমন্বয়ে আপনার ঘরকে করে তুলবে আরও সুন্দর।
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}><FaFacebook /></a>
              <a href="#" className={styles.socialIcon}><FaYoutube /></a>
              <a href={`https://wa.me/${getCleanNumber(waNumber).replace('+', '')}`} className={styles.socialIcon}><FaWhatsapp /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linkSection}>
            <h3 className={styles.sectionTitle}>দ্রুত লিঙ্ক</h3>
            <ul className={styles.links}>
              <li><Link href="/">হোম</Link></li>
              <li><Link href="/products">পণ্য সমূহ</Link></li>
              <li><Link href="/photo-gallery">ফটো গ্যালারি</Link></li>
              <li><Link href="/design-gallery">ডিজাইন গ্যালারি</Link></li>
              <li><Link href="/order-process">অর্ডার প্রক্রিয়া</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className={styles.linkSection}>
            <h3 className={styles.sectionTitle}>ক্যাটাগরি</h3>
            <ul className={styles.links}>
              <li><Link href="/category/sofa">সোফা সেট</Link></li>
              <li><Link href="/category/bed">বিছানা</Link></li>
              <li><Link href="/category/dining">ডাইনিং টেবিল</Link></li>
              <li><Link href="/category/almirah">আলমারি</Link></li>
              <li><Link href="/category/wardrobe">ওয়ার্ডরোব</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactSection}>
            <h3 className={styles.sectionTitle}>যোগাযোগ</h3>
            <ul className={styles.contactInfo}>
              <li>
                <FaMapMarkerAlt className={styles.icon} />
                <span>{storeInfo.showroomAddress.address}</span>
              </li>
              <li>
                <FaPhoneAlt className={styles.icon} />
                <span>{mainPhone}</span>
              </li>
              <li>
                <FaWhatsapp className={styles.icon} />
                <span>{waNumber}</span>
              </li>
              <li>
                <FaEnvelope className={styles.icon} />
                <span>info@mafurniture.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © ২০২৪ মা ফার্নিচার। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className={styles.developer}>
            <Link href="/admin">অ্যাডমিন লগইন</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
