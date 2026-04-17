'use client'

import { useState, useEffect } from 'react'
import styles from './StatCard.module.css'

export default function StatCard({ 
  icon, 
  number, 
  label, 
  trend, 
  color, 
  bgTint, 
  watermark,
  progress = 75
}) {
  const [displayNumber, setDisplayNumber] = useState(0)
  const [fillWidth, setFillWidth] = useState(0)

  useEffect(() => {
    // Count up animation
    let start = 0
    const end = parseInt(number)
    if (start === end) {
      setDisplayNumber(end)
    } else {
      let timer = setInterval(() => {
        start += Math.ceil(end / 20)
        if (start >= end) {
          setDisplayNumber(end)
          clearInterval(timer)
        } else {
          setDisplayNumber(start)
        }
      }, 50)
    }

    // Progress bar animation
    setTimeout(() => setFillWidth(progress), 100)
  }, [number, progress])

  return (
    <div className={styles.card}>
      <div className={styles.woodTexture} />
      <div className={styles.watermark}>{watermark}</div>
      
      <div className={styles.topRow}>
        <div className={styles.iconBox} style={{ background: bgTint, color: color }}>
          {icon}
        </div>
        {trend && (
          <div className={`${styles.trendBadge} ${trend.startsWith('+') ? styles.trendUp : styles.trendDown}`}>
            {trend}
          </div>
        )}
      </div>

      <div className={styles.mainNumber}>{displayNumber}</div>
      <div className={styles.label}>{label}</div>

      <div className={styles.progressContainer}>
        <div className={styles.progressInfo}>
          <span className={styles.progressPercent}>{progress}%</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${fillWidth}%`, background: color }}
          />
        </div>
      </div>
    </div>
  )
}
