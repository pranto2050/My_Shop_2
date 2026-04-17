'use client';

import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES, Product, calculateDiscount } from '../../lib/adminData';

interface ProductModalProps {
  isOpen: boolean;
  initialProduct?: Product | null;
  onClose: () => void;
  onSave: (payload: Omit<Product, 'id' | 'discount' | 'reviews'> & { id?: string; discount: number }) => void;
}

interface ProductFormState {
  name: string;
  category: (typeof CATEGORIES)[number];
  price: number;
  originalPrice: number;
  stock: number;
  woodType: Product['woodType'];
  status: Product['status'];
  badge: Product['badge'];
}

const initialForm: ProductFormState = {
  name: '',
  category: CATEGORIES[0],
  price: 0,
  originalPrice: 0,
  stock: 0,
  woodType: 'সেগুন' as Product['woodType'],
  status: 'স্বাভাবিক' as Product['status'],
  badge: '' as Product['badge'],
};

export default function ProductModal({ isOpen, initialProduct, onClose, onSave }: ProductModalProps) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!isOpen) return;
    if (initialProduct) {
      setForm({
        name: initialProduct.name,
        category: initialProduct.category as (typeof CATEGORIES)[number],
        price: initialProduct.price,
        originalPrice: initialProduct.originalPrice,
        stock: initialProduct.stock,
        woodType: initialProduct.woodType,
        status: initialProduct.status,
        badge: initialProduct.badge,
      });
      return;
    }
    setForm(initialForm);
  }, [isOpen, initialProduct]);

  const computedDiscount = useMemo(() => calculateDiscount(form.price, form.originalPrice), [form.price, form.originalPrice]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#121212] shadow-2xl transition-all scale-in-center">
        {/* Header */}
        <div className="relative px-8 py-6 bg-linear-to-r from-white/5 to-transparent border-b border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C49A6C]">Product Form</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {initialProduct ? 'পণ্য সম্পাদনা করুন' : 'নতুন পণ্য যোগ করুন'}
          </h3>
        </div>

        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">পণ্যের নাম</label>
              <input 
                className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-[#C49A6C]/20 focus:border-[#C49A6C]/30 transition-all" 
                placeholder="পণ্যের নাম লিখুন..."
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">ক্যাটাগরি</label>
              <div className="relative">
                <select 
                  className="appearance-none w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-[#C49A6C]/20 focus:border-[#C49A6C]/30 transition-all cursor-pointer" 
                  value={form.category} 
                  onChange={(e) => setForm({ ...form, category: e.target.value as (typeof CATEGORIES)[number] })}
                >
                  {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">বিক্রয় মূল্য (৳)</label>
              <input 
                type="number" 
                min={0} 
                className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-[#C49A6C]/20 focus:border-[#C49A6C]/30 transition-all" 
                value={form.price} 
                onChange={(e) => setForm({ ...form, price: Number(e.target.value || 0) })} 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">আসল মূল্য (৳)</label>
              <input 
                type="number" 
                min={0} 
                className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-[#C49A6C]/20 focus:border-[#C49A6C]/30 transition-all" 
                value={form.originalPrice} 
                onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value || 0) })} 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">স্টক পরিমাণ</label>
              <input 
                type="number" 
                min={0} 
                className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-[#C49A6C]/20 focus:border-[#C49A6C]/30 transition-all" 
                value={form.stock} 
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value || 0) })} 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">কাঠের ধরন</label>
              <div className="relative">
                <select 
                  className="appearance-none w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-[#C49A6C]/20 focus:border-[#C49A6C]/30 transition-all cursor-pointer" 
                  value={form.woodType} 
                  onChange={(e) => setForm({ ...form, woodType: e.target.value as Product['woodType'] })}
                >
                  <option value="সেগুন">সেগুন</option>
                  <option value="মেহগনি">মেহগনি</option>
                  <option value="গামারি">গামারি</option>
                  <option value="ওক">ওক</option>
                  <option value="-">-</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">স্ট্যাটাস</label>
              <div className="relative">
                <select 
                  className="appearance-none w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-[#C49A6C]/20 focus:border-[#C49A6C]/30 transition-all cursor-pointer" 
                  value={form.status} 
                  onChange={(e) => setForm({ ...form, status: e.target.value as Product['status'] })}
                >
                  <option value="জনপ্রিয়">জনপ্রিয়</option>
                  <option value="স্বাভাবিক">স্বাভাবিক</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">ব্যাজ</label>
              <div className="relative">
                <select 
                  className="appearance-none w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-[#C49A6C]/20 focus:border-[#C49A6C]/30 transition-all cursor-pointer" 
                  value={form.badge} 
                  onChange={(e) => setForm({ ...form, badge: e.target.value as Product['badge'] })}
                >
                  <option value="">নেই</option>
                  <option value="নতুন">নতুন</option>
                  <option value="জনপ্রিয়">জনপ্রিয়</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-[#C49A6C]/10 border border-[#C49A6C]/20 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#C49A6C] animate-pulse" />
              <p className="text-sm font-bold text-[#C49A6C]">অটোমেটিক ডিসকাউন্ট গণনা</p>
            </div>
            <span className="text-xl font-black text-[#C49A6C]">{computedDiscount}%</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-white/5 border-t border-white/5 flex justify-end gap-3">
          <button 
            className="px-6 py-2.5 rounded-xl border border-white/10 text-sm font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all" 
            onClick={onClose}
          >
            বাতিল
          </button>
          <button
            className="px-8 py-2.5 rounded-xl bg-[#C49A6C] text-[#1c1c1c] text-sm font-black shadow-lg shadow-[#C49A6C]/20 hover:scale-[1.02] active:scale-95 transition-all"
            onClick={() => {
              if (!form.name.trim()) return;
              onSave({
                id: initialProduct?.id,
                name: form.name.trim(),
                category: form.category,
                price: form.price,
                originalPrice: form.originalPrice,
                stock: form.stock,
                woodType: form.woodType,
                status: form.status,
                badge: form.badge,
                discount: computedDiscount,
              });
            }}
          >
            সংরক্ষণ করুন
          </button>
        </div>
      </div>
    </div>
  );
}
