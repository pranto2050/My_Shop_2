'use client'

import React from 'react';
import { useToast } from '../Admin/context/ToastContext';
import { FaCircleInfo as FaInfoCircle, FaCircleCheck as FaCheckCircle, FaCircleExclamation as FaExclamationCircle, FaXmark as FaTimes } from 'react-icons/fa6';
import styles from './ToastStack.module.css';

const ToastStack = () => {
  const { toasts, removeToast } = useToast();

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <FaCheckCircle />;
      case 'error': return <FaExclamationCircle />;
      default: return <FaInfoCircle />;
    }
  };

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          <span className={styles.icon}>{getIcon(toast.type)}</span>
          <p className={styles.message}>{toast.message}</p>
          <button className={styles.closeBtn} onClick={() => removeToast(toast.id)}>
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastStack;
