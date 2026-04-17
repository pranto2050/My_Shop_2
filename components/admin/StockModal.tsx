'use client';

import { useEffect, useState } from 'react';
import type { Product } from '../../lib/adminData';

interface StockModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSubmit: (payload: { type: 'add' | 'remove'; quantity: number; note: string }) => void;
}

export default function StockModal({ isOpen, product, onClose, onSubmit }: StockModalProps) {
  const [type, setType] = useState<'add' | 'remove'>('add');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setType('add');
    setQuantity(1);
    setNote('');
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md rounded-xl border border-[#454545] bg-[#1a1a1a]/95 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#9f9f9f]">Stock Update</p>
        <h3 className="mt-1 text-xl font-semibold text-white">স্টক আপডেট</h3>
        <p className="mt-1 text-sm text-[#a0a0a0]">{product.name}</p>

        <label className="mt-4 block text-sm text-[#d0d0d0]">টাইপ
          <select className="mt-1 w-full rounded-md border border-[#4a4a4a] bg-[#101010] px-3 py-2 text-white outline-none transition focus:border-[#8B5E3C]" value={type} onChange={(e) => setType(e.target.value as 'add' | 'remove')}>
            <option value="add">যোগ করুন (+)</option>
            <option value="remove">বিয়োগ করুন (-)</option>
          </select>
        </label>

        <label className="mt-3 block text-sm text-[#d0d0d0]">পরিমাণ
          <input type="number" min={1} className="mt-1 w-full rounded-md border border-[#4a4a4a] bg-[#101010] px-3 py-2 text-white outline-none transition focus:border-[#8B5E3C]" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))} />
        </label>

        <label className="mt-3 block text-sm text-[#d0d0d0]">নোট (ঐচ্ছিক)
          <input className="mt-1 w-full rounded-md border border-[#4a4a4a] bg-[#101010] px-3 py-2 text-white outline-none transition focus:border-[#8B5E3C]" value={note} onChange={(e) => setNote(e.target.value)} />
        </label>

        <div className="mt-5 flex justify-end gap-2">
          <button className="rounded-md border border-[#4a4a4a] px-4 py-2 text-sm text-[#d8d8d8] transition hover:bg-[#252525]" onClick={onClose}>বাতিল</button>
          <button
            className="rounded-md bg-linear-to-r from-[#8B5E3C] to-[#7d5436] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_16px_rgba(139,94,60,0.3)] transition hover:brightness-110"
            onClick={() => onSubmit({ type, quantity, note: note.trim() })}
          >
            আপডেট করুন
          </button>
        </div>
      </div>
    </div>
  );
}
