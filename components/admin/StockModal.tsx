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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#121212] shadow-2xl transition-all scale-in-center">
        {/* Header */}
        <div className="relative px-8 py-6 bg-linear-to-r from-white/5 to-transparent border-b border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C49A6C]">Stock Control</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">স্টক আপডেট করুন</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">{product.name}</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">টাইপ</label>
            <div className="relative">
              <select 
                className="appearance-none w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-[#C49A6C]/20 focus:border-[#C49A6C]/30 transition-all cursor-pointer" 
                value={type} 
                onChange={(e) => setType(e.target.value as 'add' | 'remove')}
              >
                <option value="add">যোগ করুন (+)</option>
                <option value="remove">বিয়োগ করুন (-)</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">পরিমাণ</label>
            <input 
              type="number" 
              min={1} 
              className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-[#C49A6C]/20 focus:border-[#C49A6C]/30 transition-all" 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))} 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">নোট (ঐচ্ছিক)</label>
            <input 
              className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-3 text-sm text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-[#C49A6C]/20 focus:border-[#C49A6C]/30 transition-all" 
              placeholder="কি কারণে স্টক আপডেট করছেন?"
              value={note} 
              onChange={(e) => setNote(e.target.value)} 
            />
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
            onClick={() => onSubmit({ type, quantity, note: note.trim() })}
          >
            আপডেট করুন
          </button>
        </div>
      </div>
    </div>
  );
}
