'use client';

import { useEffect, useMemo, useState } from 'react';
import { Filter, RefreshCcw } from 'lucide-react';
import StockModal from '../../../../components/admin/StockModal';
import {
  Product,
  StockHistoryItem,
  addActivity,
  getLowStockThreshold,
  getProducts,
  getStockHistory,
  initializeAdminData,
  saveProducts,
  saveStockHistory,
} from '../../../../lib/adminData';

const stockStatus = (stock: number) => {
  if (stock < 5) return { label: '🔴 লো স্টক', className: 'bg-red-500/10 text-red-400 border-red-500/20' };
  if (stock <= 20) return { label: '🟡 মধ্যম', className: 'bg-orange-500/10 text-orange-400 border-orange-500/20' };
  return { label: '🟢 পর্যাপ্ত', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
};

export default function StockManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stockHistory, setStockHistory] = useState<StockHistoryItem[]>([]);
  const [showLowOnly, setShowLowOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [threshold, setThreshold] = useState(5);

  useEffect(() => {
    initializeAdminData();
    setProducts(getProducts());
    setStockHistory(getStockHistory());
    setThreshold(getLowStockThreshold());
  }, []);

  const filteredProducts = useMemo(
    () => (showLowOnly ? products.filter((item) => item.stock < threshold) : products),
    [products, showLowOnly, threshold],
  );

  const applyStockUpdate = (payload: { type: 'add' | 'remove'; quantity: number; note: string }) => {
    if (!selectedProduct) return;

    const nextProducts = products.map((item) => {
      if (item.id !== selectedProduct.id) return item;
      const nextStock = payload.type === 'add' ? item.stock + payload.quantity : Math.max(0, item.stock - payload.quantity);
      return { ...item, stock: nextStock };
    });

    const historyItem: StockHistoryItem = {
      id: crypto.randomUUID(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      category: selectedProduct.category,
      type: payload.type,
      quantity: payload.quantity,
      note: payload.note,
      timestamp: new Date().toISOString(),
    };

    const nextHistory = [historyItem, ...stockHistory];

    setProducts(nextProducts);
    setStockHistory(nextHistory);
    saveProducts(nextProducts);
    saveStockHistory(nextHistory);
    addActivity(
      'স্টক আপডেট',
      `${selectedProduct.name} (${selectedProduct.id}) ${payload.type === 'add' ? '+' : '-'}${payload.quantity}`,
    );

    setModalOpen(false);
    setSelectedProduct(null);
  };


  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Action Bar */}
      <div className="flex items-center justify-between rounded-[2rem] border border-white/5 bg-[#121212]/40 p-6 shadow-2xl backdrop-blur-md transition-all hover:bg-[#121212]/60">
        <label className="group flex items-center gap-3 cursor-pointer">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={showLowOnly}
              onChange={(e) => setShowLowOnly(e.target.checked)}
              className="peer h-5 w-5 opacity-0 absolute cursor-pointer"
            />
            <div className={`h-5 w-5 rounded-lg border border-white/10 transition-all peer-checked:bg-[#C49A6C] peer-checked:border-[#C49A6C] flex items-center justify-center ${showLowOnly ? 'bg-[#C49A6C]' : 'bg-white/5'}`}>
              {showLowOnly && <div className="h-2 w-2 rounded-full bg-[#1c1c1c]" />}
            </div>
          </div>
          <span className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors">Show Low Stock Only</span>
          <Filter className={`h-4 w-4 transition-colors ${showLowOnly ? 'text-[#C49A6C]' : 'text-slate-500'}`} />
        </label>

        <button
          onClick={() => {
            setProducts(getProducts());
            setStockHistory(getStockHistory());
          }}
          className="inline-flex items-center gap-2.5 rounded-2xl border border-white/5 bg-white/5 px-5 py-2.5 text-sm font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white hover:border-white/10"
        >
          <RefreshCcw className="h-4 w-4" />
          রিফ্রেশ করুন
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#121212]/40 shadow-2xl backdrop-blur-md transition-all hover:bg-[#121212]/60">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-white/5">
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">পণ্যের নাম</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">ক্যাটাগরি</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">বর্তমান স্টক</th>
                <th className="px-6 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">স্ট্যাটাস</th>
                <th className="px-6 py-5 text-right text-[10px] font-bold uppercase tracking-widest text-slate-500">আপডেট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((item) => {
                const status = stockStatus(item.stock);
                return (
                  <tr key={item.id} className="group transition-colors hover:bg-white/5">
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-white group-hover:text-[#C49A6C] transition-colors">{item.name}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-semibold text-slate-400">{item.category}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-sm font-bold ${item.stock < 5 ? 'text-red-400' : 'text-slate-200'}`}>{item.stock}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${status.className}`}>{status.label}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => {
                          setSelectedProduct(item);
                          setModalOpen(true);
                        }}
                        className="inline-flex items-center justify-center rounded-xl bg-[#C49A6C]/10 border border-[#C49A6C]/20 px-4 py-2 text-xs font-bold text-[#C49A6C] hover:bg-[#C49A6C] hover:text-[#1c1c1c] transition-all"
                      >
                        Update Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* History Section */}
      <section className="rounded-[2.5rem] border border-white/5 bg-[#121212]/40 p-8 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-white tracking-tight">Stock History</h3>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Last 10 Activities</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stockHistory.slice(0, 10).map((entry) => (
            <div key={entry.id} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-[#C49A6C]/20">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-white leading-tight mb-1">{entry.productName}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">{entry.category}</p>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center justify-center rounded-lg px-2 py-1 text-[10px] font-bold ${entry.type === 'add' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {entry.type === 'add' ? '+' : '-'}{entry.quantity}
                    </span>
                    {entry.note && <span className="text-xs text-slate-400 font-medium italic">"{entry.note}"</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                    {new Date(entry.timestamp).toLocaleString('bn-BD', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {stockHistory.length === 0 && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-500">
              <RefreshCcw className="h-10 w-10 opacity-10 mb-4 animate-spin-slow" />
              <p className="text-sm font-medium">No stock activity recorded yet</p>
            </div>
          )}
        </div>
      </section>

      <StockModal
        isOpen={modalOpen}
        product={selectedProduct}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={applyStockUpdate}
      />
    </div>
  );
}
