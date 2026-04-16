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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-2xl rounded-xl border border-[#3a3a3a] bg-[#1a1a1a] p-5 shadow-2xl">
        <h3 className="mb-4 text-xl font-semibold text-white">{initialProduct ? 'পণ্য সম্পাদনা' : 'নতুন পণ্য যোগ করুন'}</h3>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="text-sm text-[#d0d0d0]">নাম
            <input className="mt-1 w-full rounded-md border border-[#3a3a3a] bg-[#101010] px-3 py-2 text-white" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="text-sm text-[#d0d0d0]">ক্যাটাগরি
            <select className="mt-1 w-full rounded-md border border-[#3a3a3a] bg-[#101010] px-3 py-2 text-white" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as (typeof CATEGORIES)[number] })}>
              {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <label className="text-sm text-[#d0d0d0]">মূল্য
            <input type="number" min={0} className="mt-1 w-full rounded-md border border-[#3a3a3a] bg-[#101010] px-3 py-2 text-white" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value || 0) })} />
          </label>
          <label className="text-sm text-[#d0d0d0]">মূল মূল্য
            <input type="number" min={0} className="mt-1 w-full rounded-md border border-[#3a3a3a] bg-[#101010] px-3 py-2 text-white" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value || 0) })} />
          </label>
          <label className="text-sm text-[#d0d0d0]">স্টক
            <input type="number" min={0} className="mt-1 w-full rounded-md border border-[#3a3a3a] bg-[#101010] px-3 py-2 text-white" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value || 0) })} />
          </label>
          <label className="text-sm text-[#d0d0d0]">কাঠ
            <select className="mt-1 w-full rounded-md border border-[#3a3a3a] bg-[#101010] px-3 py-2 text-white" value={form.woodType} onChange={(e) => setForm({ ...form, woodType: e.target.value as Product['woodType'] })}>
              <option value="সেগুন">সেগুন</option>
              <option value="মেহগনি">মেহগনি</option>
              <option value="গামারি">গামারি</option>
              <option value="ওক">ওক</option>
              <option value="-">-</option>
            </select>
          </label>
          <label className="text-sm text-[#d0d0d0]">স্ট্যাটাস
            <select className="mt-1 w-full rounded-md border border-[#3a3a3a] bg-[#101010] px-3 py-2 text-white" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Product['status'] })}>
              <option value="জনপ্রিয়">জনপ্রিয়</option>
              <option value="স্বাভাবিক">স্বাভাবিক</option>
            </select>
          </label>
          <label className="text-sm text-[#d0d0d0]">ব্যাজ
            <select className="mt-1 w-full rounded-md border border-[#3a3a3a] bg-[#101010] px-3 py-2 text-white" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value as Product['badge'] })}>
              <option value="">নেই</option>
              <option value="নতুন">নতুন</option>
              <option value="জনপ্রিয়">জনপ্রিয়</option>
            </select>
          </label>
        </div>

        <p className="mt-3 text-sm text-[#C49A6C]">অটো ছাড়: {computedDiscount}%</p>

        <div className="mt-5 flex justify-end gap-2">
          <button className="rounded-md border border-[#3b3b3b] px-4 py-2 text-sm text-[#d8d8d8]" onClick={onClose}>বাতিল</button>
          <button
            className="rounded-md bg-[#8B5E3C] px-4 py-2 text-sm font-medium text-white hover:bg-[#9d6d48]"
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
