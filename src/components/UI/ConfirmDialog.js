'use client'

import { FaTriangleExclamation } from 'react-icons/fa6'
import styles from './ConfirmDialog.module.css'

export default function ConfirmDialog({ 
  isOpen, 
  title = 'আপনি কি নিশ্চিত?', 
  message = 'এই কাজটি আর পরিবর্তন করা যাবে না।', 
  onConfirm, 
  onCancel,
  confirmText = 'হ্যাঁ, মুছে দিন',
  cancelText = 'না, বাতিল'
}) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconBox}>
          <FaTriangleExclamation />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.btns}>
          <button onClick={onCancel} className={styles.cancelBtn}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className={styles.confirmBtn}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
