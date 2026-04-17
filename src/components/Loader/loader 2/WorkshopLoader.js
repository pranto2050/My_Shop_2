'use client'

import React, { useEffect, useState } from 'react';
import styles from './WorkshopLoader.module.css';

const WorkshopLoader = ({ isExiting }) => {
  const [loadingText, setLoadingText] = useState('আপনার স্বপ্নের আসবাবপত্র তৈরি হচ্ছে...');
  const [currentStage, setCurrentStage] = useState(0); // 0: Delivery, 1: Assembly, 2: Finishing
  
  useEffect(() => {
    const messages = [
      'আপনার স্বপ্নের আসবাবপত্র তৈরি হচ্ছে...',
      'কাঠ বাছাই করা হচ্ছে...',
      'পরিমাপ এবং নকশা চলছে...',
      'নিখুঁতভাবে কাটা হচ্ছে...',
      'অংশগুলো জোড়া দেওয়া হচ্ছে...',
      'রং এবং ফিনিশিং চলছে...',
      'কিছুক্ষণ অপেক্ষা করুন...',
      'আপনার জন্য বিশেষ কিছু আসছে...'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setLoadingText(messages[i]);
      setCurrentStage((prev) => (prev + 1) % 3);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.loaderOverlay} ${isExiting ? styles.exiting : ''}`}>
      <div className={styles.loaderContent}>
        {/* SHOP BRANDING */}
        <div className={styles.branding}>
          <h1 className={styles.shopName}>মা ফার্নিচার</h1>
          <div className={styles.brandSubtitle}>প্রিমিয়াম হস্তনির্মিত আসবাবপত্র</div>
        </div>

        {/* WORKSHOP SCENE */}
        <div className={styles.workshopScene}>
          {/* Workshop Floor/Ground */}
          <div className={styles.workshopFloor}></div>
          
          {/* Workbench */}
          <div className={styles.workbench}>
            <div className={styles.workbenchTop}></div>
            <div className={styles.workbenchLegs}>
              <span></span><span></span>
            </div>
          </div>

          {/* Worker 1: The Carrier */}
          <div className={`${styles.worker} ${styles.workerCarrier}`}>
            <div className={styles.workerHead}>
              <div className={styles.hair}></div>
              <div className={styles.glasses}></div>
            </div>
            <div className={styles.workerBody}>
              <div className={styles.apron}></div>
            </div>
            <div className={styles.workerArms}>
              <div className={styles.armLeft}></div>
              <div className={styles.armRight}></div>
            </div>
            <div className={styles.workerLegs}>
              <div className={styles.legLeft}></div>
              <div className={styles.legRight}></div>
            </div>
            {/* Carrying Log */}
            <div className={styles.carriedLog}></div>
          </div>

          {/* Worker 2: The Builder */}
          <div className={`${styles.worker} ${styles.workerBuilder}`}>
            <div className={styles.workerHead}>
              <div className={styles.hair}></div>
              <div className={styles.glasses}></div>
            </div>
            <div className={styles.workerBody}>
              <div className={styles.apron}></div>
            </div>
            <div className={styles.workerArms}>
              <div className={styles.armLeft}></div>
              <div className={styles.armRight}></div>
            </div>
            <div className={styles.workerLegs}>
              <div className={styles.legLeft}></div>
              <div className={styles.legRight}></div>
            </div>
            {/* Tool in Hand */}
            <div className={styles.handTool}></div>
          </div>

          {/* Furniture being built */}
          <div className={`${styles.furnitureBuild} ${styles[`stage${currentStage}`]}`}>
            <div className={styles.chairPart1}></div>
            <div className={styles.chairPart2}></div>
            <div className={styles.chairPart3}></div>
            <div className={styles.chairPart4}></div>
            <div className={styles.chairPart5}></div>
          </div>

          {/* Sparks/Sawdust from working */}
          <div className={styles.workshopEffects}>
            {[...Array(12)].map((_, i) => (
              <div key={i} className={styles.spark} style={{ '--delay': `${i * 0.1}s`, '--left': `${40 + (Math.random() * 40)}%` }}></div>
            ))}
          </div>
        </div>

        {/* LOADING STATE */}
        <div className={styles.loadingInfo}>
          <p className={styles.statusText}>{loadingText}</p>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* BACKGROUND ACCENTS */}
      <div className={styles.bgGrain}></div>
      <div className={styles.vignette}></div>
    </div>
  );
};

export default WorkshopLoader;
