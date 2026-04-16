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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-xl border border-[#3a3a3a] bg-[#1a1a1a] p-5 shadow-2xl">
        <h3 className="text-xl font-semibold text-white">স্টক আপডেট</h3>
        <p className="mt-1 text-sm text-[#a0a0a0]">{product.name}</p>

        <label className="mt-4 block text-sm text-[#d0d0d0]">টাইপ
          <select className="mt-1 w-full rounded-md border border-[#3a3a3a] bg-[#101010] px-3 py-2 text-white" value={type} onChange={(e) => setType(e.target.value as 'add' | 'remove')}>
            <option value="add">যোগ করুন (+)</option>
            <option value="remove">বিয়োগ করুন (-)</option>
          </select>
        </label>

        <label className="mt-3 block text-sm text-[#d0d0d0]">পরিমাণ
          <input type="number" min={1} className="mt-1 w-full rounded-md border border-[#3a3a3a] bg-[#101010] px-3 py-2 text-white" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))} />
        </label>

        <label className="mt-3 block text-sm text-[#d0d0d0]">নোট (ঐচ্ছিক)
          <input className="mt-1 w-full rounded-md border border-[#3a3a3a] bg-[#101010] px-3 py-2 text-white" value={note} onChange={(e) => setNote(e.target.value)} />
        </label>

        <div className="mt-5 flex justify-end gap-2">
          <button className="rounded-md border border-[#3b3b3b] px-4 py-2 text-sm text-[#d8d8d8]" onClick={onClose}>বাতিল</button>
          <button
            className="rounded-md bg-[#8B5E3C] px-4 py-2 text-sm font-medium text-white hover:bg-[#9d6d48]"
            onClick={() => onSubmit({ type, quantity, note: note.trim() })}
          >
            আপডেট করুন
          </button>
        </div>
      </div>
    </div>
  );
}
