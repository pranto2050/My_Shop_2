'use client'

import React from 'react';
import OrderSteps from '../../components/Home/OrderSteps';
import styles from './page.module.css';

const OrderProcessPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heading}>অর্ডার করার প্রক্রিয়া</h1>
          <p className={styles.subtext}>
            মা ফার্নিচার থেকে আপনার পছন্দের ফার্নিচার অর্ডার করা এখন আরও সহজ। নিচের ধাপগুলো অনুসরণ করুন।
          </p>
        </div>
      </div>
      
      <OrderSteps />

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.faqHeading}>সাধারণ জিজ্ঞাসা</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>ডেলিভারি খরচ কত?</h3>
              <p>আপনার লোকেশন এবং ফার্নিচারের পরিমাণের উপর ভিত্তি করে ডেলিভারি খরচ নির্ধারিত হয়। সাধারণত কুষ্টিয়ার মধ্যে ডেলিভারি চার্জ আলোচনা সাপেক্ষে কমানো হয়।</p>
            </div>
            <div className={styles.faqItem}>
              <h3>অর্ডার কনফার্ম করতে কি অগ্রিম টাকা দিতে হয়?</h3>
              <p>হ্যাঁ, অর্ডার কনফার্ম করার জন্য মোট মূল্যের একটি নির্দিষ্ট অংশ (সাধারণত ২০-৩০%) অগ্রিম প্রদান করতে হয়। বাকি টাকা ডেলিভারি নেওয়ার সময় প্রদান করবেন।</p>
            </div>
            <div className={styles.faqItem}>
              <h3>পণ্য কি কাস্টমাইজ করা যাবে?</h3>
              <p>অবশ্যই! আমরা আপনার পছন্দমতো কাঠ, রং এবং সাইজ অনুযায়ী ফার্নিচার তৈরি করে থাকি।</p>
            </div>
            <div className={styles.faqItem}>
              <h3>তৈরি করতে কতদিন সময় লাগে?</h3>
              <p>সাধারণত অর্ডার কনফার্ম করার ১০-১৫ দিনের মধ্যে আমরা ডেলিভারি দিয়ে থাকি। তবে ডিজাইনের জটিলতা ভেদে সময় কম-বেশি হতে পারে।</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderProcessPage;
