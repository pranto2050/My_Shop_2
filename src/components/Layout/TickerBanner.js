import React from 'react';
import styles from './TickerBanner.module.css';

const TickerBanner = () => {
  const content = "🪵 বিনামূল্যে হোম ডেলিভারি (কুষ্টিয়া)  ✦  কাস্টম ফার্নিচার অর্ডার নেওয়া হয় ✦ সেগুন, মেহগনি ও গামারি বিশেষজ্ঞ ✦ ১ বছর ওয়ারেন্টি সকল পণ্যে ✦ ইনস্টলেশন সার্ভিস ফ্রি 🪵";
  
  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.tickerContent}>
        <span>{content}</span>
        <span>{content}</span>
      </div>
    </div>
  );
};

export default TickerBanner;
