'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSearch, FaBars, FaTimes, FaWhatsapp, FaPhoneAlt, FaChevronDown } from 'react-icons/fa';
import * as Icons from 'react-icons/fa6';
import { categories } from '../../../data/categories';
import { storeInfo } from '../../../data/stor info';
import { getTelUrl, getWhatsAppUrl } from '../../utils/storeUtils';
import styles from './SiteHeader.module.css';

const SiteHeader = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const mainPhone = storeInfo.callNumbers.numbers[0];
  const waNumber = storeInfo.whatsapp.number;

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const CategoryIcon = ({ iconName, ...props }) => {
    const IconComponent = Icons[iconName] || Icons.FaQuestion;
    return <IconComponent {...props} />;
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* ZONE LEFT — Brand */}
        <Link href="/" className={styles.brand}>
          <div className={styles.logoMark}>
            <svg width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 2L2 12V28H10V18H28V28H36V12L19 2Z" stroke="var(--walnut)" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M10 18H28" stroke="var(--walnut)" strokeWidth="2"/>
            </svg>
          </div>
          <div className={styles.brandText}>
            <h1 className={styles.shopName}>মা ফার্নিচার</h1>
            <span className={styles.tagline}>{storeInfo.showroomAddress.address}</span>
          </div>
        </Link>

        {/* ZONE CENTER — Navigation (desktop) */}
        <nav className={styles.navDesktop}>
          <Link href="/" className={styles.navLink}>হোম</Link>
          <div 
            className={styles.navLinkDropdown}
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            পণ্য সমূহ <FaChevronDown className={styles.chevron} />
            {isMegaMenuOpen && (
              <div className={styles.megaMenu}>
                <div className={styles.megaMenuGrid}>
                  {categories.map((cat) => (
                    <Link key={cat.id} href={`/category/${cat.id}`} className={styles.categoryCard}>
                      <div className={styles.categoryIcon}>
                        <CategoryIcon iconName={cat.icon} size={30} />
                      </div>
                      <span className={styles.categoryName}>{cat.name}</span>
                      <span className={styles.productCount}>{cat.count}টি পণ্য</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/photo-gallery" className={styles.navLink}>ফটো গ্যালারি</Link>
          <Link href="/design-gallery" className={styles.navLink}>ডিজাইন গ্যালারি</Link>
          <Link href="/order-process" className={styles.navLink}>অর্ডার প্রক্রিয়া</Link>
          <Link href="/contact" className={styles.navLink}>যোগাযোগ</Link>
        </nav>

        {/* ZONE RIGHT — Actions */}
        <div className={styles.actions}>
          <button 
            className={`${styles.iconBtn} ${isSearchOpen ? styles.searchActive : ''}`} 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            {isSearchOpen ? <FaTimes /> : <FaSearch />}
          </button>
          <div className={styles.divider} />
          <a href={getTelUrl(mainPhone)} className={styles.phoneLink}>
            <FaPhoneAlt size={14} /> {mainPhone}
          </a>
          <div className={styles.divider} />
          <a href={getWhatsAppUrl(waNumber)} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
            <FaWhatsapp /> {storeInfo.whatsapp.label}
          </a>
          <button className={styles.hamburger} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      <div className={`${styles.searchOverlay} ${isSearchOpen ? styles.searchOverlayOpen : ''}`}>
        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <FaSearch className={styles.searchIcon} />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="পণ্য বা আইডি দিয়ে সার্চ করুন..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchSubmitBtn}>খুঁজুন</button>
          </form>
          <p className={styles.searchHint}>উদাহরণ: "খাট", "MF-101", "সোফা"</p>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>হোম</Link>
          <div className={styles.mobileAccordion}>
            <span className={styles.mobileAccordionTitle}>পণ্য সমূহ</span>
            <div className={styles.mobileAccordionContent}>
              {categories.map((cat) => (
                <Link key={cat.id} href={`/category/${cat.id}`} onClick={() => setIsMobileMenuOpen(false)}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/photo-gallery" onClick={() => setIsMobileMenuOpen(false)}>ফটো গ্যালারি</Link>
          <Link href="/design-gallery" onClick={() => setIsMobileMenuOpen(false)}>ডিজাইন গ্যালারি</Link>
          <Link href="/order-process" onClick={() => setIsMobileMenuOpen(false)}>অর্ডার প্রক্রিয়া</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>যোগাযোগ</Link>
        </nav>
        <div className={styles.mobileContact}>
          <a href={getTelUrl(mainPhone)} className={styles.phoneLink}>{mainPhone}</a>
          <a href={getWhatsAppUrl(waNumber)} className={styles.waBtn}>{storeInfo.whatsapp.label} এ মেসেজ দিন</a>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
