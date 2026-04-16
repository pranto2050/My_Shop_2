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
  if (stock < 5) return { label: '🔴 লো স্টক', className: 'bg-[#ef4444]/25 text-[#ffcbcb] border-[#ef4444]/50' };
  if (stock <= 20) return { label: '🟡 মধ্যম', className: 'bg-[#f59e0b]/20 text-[#ffe0a8] border-[#f59e0b]/50' };
  return { label: '🟢 পর্যাপ্ত', className: 'bg-[#22c55e]/20 text-[#cfffdc] border-[#22c55e]/50' };
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
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-xl border border-[#2e2e2e] bg-[#1a1a1a] p-4">
        <label className="flex items-center gap-2 text-sm text-[#d6d6d6]">
          <input
            type="checkbox"
            checked={showLowOnly}
            onChange={(e) => setShowLowOnly(e.target.checked)}
            className="h-4 w-4 accent-[#8B5E3C]"
          />
          <Filter className="h-4 w-4" />
          Show Low Stock Only
        </label>

        <button
          onClick={() => {
            setProducts(getProducts());
            setStockHistory(getStockHistory());
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-[#3a3a3a] px-3 py-2 text-sm text-[#cfcfcf] hover:bg-[#262626]"
        >
          <RefreshCcw className="h-4 w-4" />
          রিফ্রেশ
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#2e2e2e] bg-[#1a1a1a]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#111111] text-[#bdbdbd]">
              <tr>
                <th className="px-4 py-3 text-left">পণ্যের নাম</th>
                <th className="px-4 py-3 text-left">ক্যাটাগরি</th>
                <th className="px-4 py-3 text-left">বর্তমান স্টক</th>
                <th className="px-4 py-3 text-left">স্ট্যাটাস</th>
                <th className="px-4 py-3 text-left">আপডেট</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item) => {
                const status = stockStatus(item.stock);
                return (
                  <tr key={item.id} className="border-t border-[#2b2b2b] text-[#f5f5f5]">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3 text-[#cecece]">{item.category}</td>
                    <td className="px-4 py-3">{item.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded border px-2 py-0.5 text-xs ${status.className}`}>{status.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setSelectedProduct(item);
                          setModalOpen(true);
                        }}
                        className="rounded-lg bg-[#8B5E3C] px-3 py-1.5 text-xs text-white hover:bg-[#9d6d48]"
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

      <section className="rounded-xl border border-[#2e2e2e] bg-[#1a1a1a] p-4">
        <h3 className="mb-3 text-lg font-semibold">Stock History (Last 10)</h3>
        <div className="space-y-2">
          {stockHistory.slice(0, 10).map((entry) => (
            <div key={entry.id} className="rounded-lg border border-[#2f2f2f] bg-[#111111] px-3 py-2">
              <p className="text-sm text-white">
                {entry.productName} <span className="text-[#c8c8c8]">({entry.category})</span>
              </p>
              <p className="text-xs text-[#d8d8d8]">
                পরিবর্তন: <span className={entry.type === 'add' ? 'text-[#57db7f]' : 'text-[#ff9c9c]'}>{entry.type === 'add' ? '+' : '-'}{entry.quantity}</span>
                {entry.note ? ` | ${entry.note}` : ''}
              </p>
              <p className="text-[11px] text-[#777]">{new Date(entry.timestamp).toLocaleString('bn-BD')}</p>
            </div>
          ))}
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
