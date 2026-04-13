'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import styles from './CinematicHero.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CinematicHero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [ref, isVisible] = useScrollReveal({ threshold: 0.05 });

  
  const slides = [
    {
      id: 1,
      label: "FEATURED COLLECTION",
      h1: "আপনার ঘর",
      h2: "হোক আরও",
      h3: "সুন্দর",
      desc: "উন্নত মানের সেগুন ও মেহগনি কাঠের তৈরি আসবাবপত্র দিয়ে সাজান আপনার স্বপ্নের বাড়ি। মা ফার্নিচার দিচ্ছে স্থায়িত্ব আর আভিজাত্যের নিশ্চয়তা।",
      price: "৳২,৫০০",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200",
      rating: "4.9"
    },
    {
      id: 2,
      label: "PREMIUM SEATING",
      h1: "আরামদায়ক",
      h2: "সোফা",
      h3: "কালেকশন",
      desc: "আধুনিক ডিজাইন আর সেরা মানের ফোমের সমন্বয়ে তৈরি আমাদের সোফা সেটগুলো আপনার লিভিং রুমে আনবে রাজকীয় আভিজাত্য।",
      price: "৳৪৫,০০০",
      image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=1200",
      rating: "4.8"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section ref={ref} className={`${styles.hero} wood-grain ${isVisible ? styles.revealed : ''}`}>
      <div className={styles.outerGrid}>
        {/* Left strip (decorative) */}
        <div className={styles.leftStrip}>
          <div className={styles.verticalText}>মা ফার্নিচার ২০২৪</div>
          <div className={styles.verticalLine} />
        </div>

        {/* Main area */}
        <div className={styles.mainArea}>
          <div className={styles.contentColumn}>
            <div className={styles.sectionLabel}>
              <span className={styles.line} />
              {slides[activeSlide].label}
            </div>

            <div className={styles.headingBlock}>
              <h2 className={styles.h1}>{slides[activeSlide].h1}</h2>
              <h2 className={styles.h2}>{slides[activeSlide].h2}</h2>
              <h2 className={styles.h3}>{slides[activeSlide].h3}</h2>
              <svg className={styles.handwrittenUnderline} viewBox="0 0 200 20" fill="none">
                <path d="M5 15 Q50 5 100 15 T195 10" stroke="var(--honey)" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </div>

            <p className={styles.description}>{slides[activeSlide].desc}</p>

            <div className={styles.priceBlock}>
              <div className={styles.priceLabel}>শুরু মাত্র</div>
              <div className={styles.priceValue}>{slides[activeSlide].price}</div>
              <div className={styles.priceSuffix}>থেকে</div>
            </div>

            <div className={styles.ctaRow}>
              <button className={styles.primaryBtn}>
                পণ্য সংগ্রহ দেখুন <FaArrowRight />
              </button>
              <button className={styles.outlineBtn}>ডিজাইন গ্যালারি</button>
            </div>

            <div className={styles.trustRow}>
              <span>⭐ ৪.৯ রেটিং</span>
              <span className={styles.dot} />
              <span>১০+ বছর</span>
              <span className={styles.dot} />
              <span>৫০০+ পণ্য</span>
            </div>

            <div className={styles.sliderControls}>
              <div className={styles.segments}>
                {slides.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`${styles.segment} ${activeSlide === idx ? styles.activeSegment : ''}`} 
                    onClick={() => setActiveSlide(idx)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <Image 
                src={slides[activeSlide].image}
                alt="Furniture"
                fill
                className={styles.heroImage}
                priority
              />
              
              <div className={styles.cardA}>
                <div className={styles.cardAContent}>
                  <span className={styles.cardAName}>সেগুন কাঠের রাজকীয় সোফা</span>
                  <span className={styles.cardAPrice}>৳৪৫,০০০</span>
                  <button className={styles.cardAWA}>
                    <FaArrowRight />
                  </button>
                </div>
              </div>

              <div className={styles.cardB}>
                <div className={styles.ratingValue}>{slides[activeSlide].rating}</div>
                <div className={styles.stars}>★★★★★</div>
              </div>

              <div className={styles.decorativeCircle} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
