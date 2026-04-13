'use client'

import React, { useState } from 'react';
import CinematicHero from '../components/Home/CinematicHero';
import SmartSearchBlock from '../components/Home/SmartSearchBlock';
import BestsellerTrack from '../components/Home/BestsellerTrack';
import CategoryBento from '../components/Home/CategoryBento';
import CategorySection from '../components/Home/CategorySection';
import WoodTypesGrid from '../components/Home/WoodTypesGrid';
import DesignTeaser from '../components/Home/DesignTeaser';
import GalleryTeaser from '../components/Home/GalleryTeaser';
import OrderSteps from '../components/Home/OrderSteps';
import ContactBlock from '../components/Home/ContactBlock';
import ProductDrawer from '../components/Product/ProductDrawer';
import { categories } from '../../data/categories';
import { products } from '../../data/products';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProductDrawer = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDrawer = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <CinematicHero />
      <SmartSearchBlock />
      <BestsellerTrack onProductClick={openProductDrawer} />
      <CategoryBento />
      
      {categories.map((cat, index) => {
        const catProducts = products.filter(p => p.category === cat.id);
        if (catProducts.length === 0) return null;
        
        return (
          <CategorySection 
            key={cat.id} 
            category={cat} 
            products={catProducts} 
            index={index + 2}
            onProductClick={openProductDrawer}
          />
        );
      })}

      <WoodTypesGrid />
      <DesignTeaser />
      <GalleryTeaser />
      <OrderSteps />
      <ContactBlock />

      {selectedProduct && (
        <ProductDrawer 
          product={selectedProduct} 
          onClose={closeProductDrawer} 
        />
      )}
    </>
  );
}
