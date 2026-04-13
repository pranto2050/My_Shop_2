'use client'

import React, { useEffect, useState } from 'react';
import styles from './WorkshopLoader.module.css';

const WorkshopLoader = ({ isExiting }) => {
  const [dots, setDots] = useState([true, false, false]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDots(prev => {
        const next = [...prev];
        const activeIndex = next.indexOf(true);
        next[activeIndex] = false;
        next[(activeIndex + 1) % 3] = true;
        return next;
      });
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles only on the client to avoid hydration mismatch
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      dx: `${(Math.random() - 0.5) * 50}px`,
      left: `${Math.random() * 200 + 40}px`,
      bgColor: ['var(--honey)', 'var(--walnut)', 'var(--walnut-soft)'][Math.floor(Math.random() * 3)],
      delay: `${i * 0.12}s`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className={`${styles.loaderContainer} ${isExiting ? styles.exiting : ''}`}>
      <div className={styles.sceneContainer}>
        {/* WORKSHOP FLOOR */}
        <div className={styles.workshopFloor} />

        {/* WORKBENCH */}
        <div className={styles.workbench}>
          <div className={styles.workbenchTop} />
          <div className={`${styles.workbenchLeg} ${styles.legLeft}`} />
          <div className={`${styles.workbenchLeg} ${styles.legRight}`} />
          
          {/* CHAIR ASSEMBLY ON WORKBENCH */}
          <div className={styles.chairAssembly}>
            <div className={`${styles.chairPart} ${styles.chairPart1}`} style={{ width: '8px', height: '40px', backgroundColor: 'var(--walnut)' }} />
            <div className={`${styles.chairPart} ${styles.chairPart2}`} style={{ width: '8px', height: '40px', backgroundColor: 'var(--walnut)' }} />
            <div className={`${styles.chairPart} ${styles.chairPart3}`} style={{ width: '8px', height: '55px', backgroundColor: 'var(--walnut-deep)' }} />
            <div className={`${styles.chairPart} ${styles.chairPart4}`} style={{ width: '65px', height: '12px', backgroundColor: 'var(--honey)' }} />
            <div className={`${styles.chairPart} ${styles.chairPart5}`} style={{ width: '65px', height: '9px', backgroundColor: 'var(--honey-light)' }} />
          </div>

          {/* SAWDUST PARTICLES */}
          {particles.map((p) => (
            <div 
              key={p.id} 
              className={styles.sawdust} 
              style={{ 
                '--dx': p.dx,
                left: p.left,
                backgroundColor: p.bgColor,
                animationDelay: p.delay
              }} 
            />
          ))}
        </div>

        {/* WORKER 1 — THE CARRIER */}
        <div className={styles.worker1}>
          <svg width="100" height="170" viewBox="0 0 100 170">
            {/* Head */}
            <circle cx="50" cy="40" r="22" fill="#E8C49A" />
            <circle cx="44" cy="38" r="2" fill="#3B1F0C" />
            <circle cx="56" cy="38" r="2" fill="#3B1F0C" />
            <path d="M44 48 Q50 54 56 48" stroke="#3B1F0C" strokeWidth="1.5" fill="none" />
            <ellipse cx="50" cy="20" rx="20" ry="10" fill="var(--sienna)" />
            {/* Body */}
            <rect x="36" y="62" width="28" height="38" rx="4" fill="var(--walnut)" />
            <path d="M45 62 L50 70 L55 62" fill="var(--parchment)" />
            {/* Arms carrying planks */}
            <rect x="25" y="80" width="8" height="30" fill="#E8C49A" transform="rotate(-30, 30, 80)" />
            <rect x="67" y="80" width="8" height="30" fill="#E8C49A" transform="rotate(30, 70, 80)" />
          </svg>
          <div className={`${styles.leg} ${styles.legLeft}`} />
          <div className={`${styles.leg} ${styles.legRight}`} />
          
          {/* PLANKS */}
          <div className={styles.planks}>
            <div className={styles.plank} style={{ width: '120px', backgroundColor: 'var(--honey)' }} />
            <div className={styles.plank} style={{ width: '110px', backgroundColor: 'var(--walnut-soft)', marginLeft: '3px' }} />
            <div className={styles.plank} style={{ width: '100px', backgroundColor: 'var(--honey-light)', marginLeft: '6px' }} />
          </div>
        </div>

        {/* WORKER 2 — THE BUILDER */}
        <div className={styles.worker2}>
          <svg width="100" height="180" viewBox="0 0 100 180">
            {/* Head */}
            <circle cx="50" cy="40" r="23" fill="#D4A876" />
            <circle cx="44" cy="38" r="1.5" fill="#3B1F0C" />
            <circle cx="56" cy="38" r="1.5" fill="#3B1F0C" />
            <line x1="42" y1="34" x2="48" y2="36" stroke="#3B1F0C" strokeWidth="1" />
            <line x1="58" y1="34" x2="52" y2="36" stroke="#3B1F0C" strokeWidth="1" />
            <line x1="45" y1="50" x2="55" y2="50" stroke="#3B1F0C" strokeWidth="1" />
            {/* Body with Apron */}
            <rect x="35" y="63" width="30" height="40" rx="4" fill="var(--moss)" />
            <rect x="42" y="75" width="16" height="12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {/* Working Arm */}
            <g className={styles.builderArm}>
              <rect x="65" y="70" width="8" height="35" fill="#D4A876" rx="4" />
              <rect x="65" y="100" width="12" height="6" fill="var(--walnut-deep)" rx="1" /> {/* Mallet */}
            </g>
          </svg>
        </div>

        {/* DUST MOTES */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={styles.dustMote} 
            style={{ 
              left: `${20 + i * 15}%`, 
              bottom: `${40 + i * 5}%`,
              animationDelay: `${i * 0.8}s`
            }} 
          />
        ))}
      </div>

      <div className={styles.loaderUI}>
        <div className={styles.shopName}>
          <span>মা ফার্নিচার</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--walnut)">
            <path d="M3 21h18v-2H3v2zm3-4h12v-2H6v2zm3-4h6v-2H9v2zm3-4h3V7h-3v2z" />
          </svg>
        </div>
        
        <div className={styles.messageContainer}>
          <div className={`${styles.message} ${styles.messageA}`}>কারিগর কাজ করছেন...</div>
          <div className={`${styles.message} ${styles.messageB}`}>Building your dream furniture...</div>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill}>
            <div className={styles.woodChip} />
          </div>
        </div>

        <div className={styles.stepIndicator}>
          <div className={`${styles.dot} ${styles.dotActive1}`} />
          <div className={`${styles.dot} ${styles.dotActive2}`} />
          <div className={`${styles.dot} ${styles.dotActive3}`} />
        </div>
      </div>
    </div>
  );
};

export default WorkshopLoader;
