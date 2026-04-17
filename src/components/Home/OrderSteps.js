'use client'

import React from 'react';
import { FaWhatsapp, FaChair, FaTools, FaTruck, FaComments } from 'react-icons/fa';
import { storeInfo } from '../../../data/stor info';
import { getWhatsAppUrl } from '../../utils/storeUtils';
import styles from './OrderSteps.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const steps = [
  {
    id: 1,
    title: 'পছন্দ করুন',
    desc: 'আমাদের গ্যালারি থেকে আপনার পছন্দের ডিজাইনটি নির্বাচন করুন।',
    icon: <FaChair />
  },
  {
    id: 2,
    title: 'যোগাযোগ করুন',
    desc: 'WhatsApp এ আমাদের সাথে কথা বলে বিস্তারিত জানুন এবং অর্ডার কনফার্ম করুন।',
    icon: <FaComments />
  },
  {
    id: 3,
    title: 'তৈরি প্রক্রিয়া',
    desc: 'আমাদের দক্ষ কারিগররা আপনার ফার্নিচারটি নিখুঁতভাবে তৈরি করবে।',
    icon: <FaTools />
  },
  {
    id: 4,
    title: 'ডেলিভারি',
    desc: 'আপনার ঠিকানায় নিরাপদে পৌঁছে যাবে আপনার স্বপ্নের আসবাবপত্র।',
    icon: <FaTruck />
  }
];

const OrderSteps = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className={`${styles.section} ${isVisible ? styles.revealed : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>অর্ডার করার সহজ প্রক্রিয়া</h2>
          <p className={styles.subtext}>মাত্র ৪টি ধাপে পেয়ে যান আপনার স্বপ্নের ফার্নিচার</p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={step.id} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.id}</div>
              <div className={styles.iconWrapper}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              
              {/* Connector line - handled by CSS mostly, but this helps spacing */}
              {index < steps.length - 1 && <div className={styles.connector}></div>}
            </div>
          ))}
        </div>

        <div className={styles.ctaBanner}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaText}>এখনই WhatsApp এ অর্ডার করুন — {storeInfo.whatsapp.number}</h3>
            <a href={getWhatsAppUrl(storeInfo.whatsapp.number)} target="_blank" rel="noopener noreferrer" className={styles.waButton}>
              <FaWhatsapp className={styles.waIcon} />
              অর্ডার করুন
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSteps;
