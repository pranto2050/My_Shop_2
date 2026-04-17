'use client';

import { useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import ProductModal from '../../../../components/admin/ProductModal';
import {
  CATEGORIES,
  Product,
  addActivity,
  generateProductId,
  getProducts,
  initializeAdminData,
  saveProducts,
} from '../../../../lib/adminData';

const PAGE_SIZE = 10;

const statusClass: Record<string, string> = {
  জনপ্রিয়: 'bg-orange-50 text-orange-600 border-orange-100',
  নতুন: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  স্বাভাবিক: 'bg-slate-50 text-slate-600 border-slate-100',
};

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('সব');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    initializeAdminData();
    setProducts(getProducts());
  }, []);

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesKeyword =
        keyword.length === 0 ||
        product.name.toLowerCase().includes(keyword) ||
        product.id.toLowerCase().includes(keyword);
      const matchesCategory = categoryFilter === 'সব' || product.category === categoryFilter;
      return matchesKeyword && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages, page]);

  const handleDelete = (id: string) => {
    const target = products.find((item) => item.id === id);
    if (!target) return;
    const ok = window.confirm(`আপনি কি ${target.name} মুছে ফেলতে চান?`);
    if (!ok) return;
    const next = products.filter((item) => item.id !== id);
    setProducts(next);
    saveProducts(next);
    addActivity('পণ্য মুছে ফেলা', `${target.name} (${target.id}) অপসারণ করা হয়েছে`);
  };

  const handleSaveProduct = (
    payload: Omit<Product, 'id' | 'discount' | 'reviews'> & { id?: string; discount: number },
  ) => {
    if (payload.id) {
      const next = products.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              ...payload,
              id: payload.id,
            }
          : item,
      );
      setProducts(next); 
      saveProducts(next);
      addActivity('পণ্য আপডেট', `${payload.name} (${payload.id}) আপডেট করা হয়েছে`);
    } else {
      const newId = generateProductId(products);
      const nextProduct: Product = {
        id: newId,
        reviews: 0,
        ...payload,
      };
      const next = [nextProduct, ...products];
      setProducts(next);
      saveProducts(next);
      addActivity('নতুন পণ্য যোগ', `${nextProduct.name} (${nextProduct.id}) যোগ করা হয়েছে`);
    }

    setEditingProduct(null);
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Action Bar */}
      <div className="flex flex-col gap-6 rounded-[3rem] bg-white border border-slate-100 p-8 shadow-sm md:flex-row md:items-center md:justify-between transition-all hover:shadow-md">
        <div className="flex flex-1 flex-col gap-4 md:flex-row">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#8B5E3C]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="নাম বা আইডি দিয়ে সার্চ করুন..."
              className="w-full rounded-[2rem] border border-slate-100 bg-slate-50/50 py-4 pl-12 pr-6 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-4 focus:ring-[#8B5E3C]/5 focus:border-[#8B5E3C]/20 transition-all"
            />
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none w-full md:w-56 rounded-[2rem] border border-slate-100 bg-slate-50/50 px-6 py-4 text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-[#8B5E3C]/5 focus:border-[#8B5E3C]/20 transition-all cursor-pointer"
            >
              <option value="সব">সব ক্যাটাগরি</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-slate-300">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-3 rounded-[2rem] bg-[#8B5E3C] px-10 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-[#8B5E3C]/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Plus className="h-5 w-5" />
          নতুন পণ্য যোগ
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-[3rem] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ID</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">পণ্যের বিবরণ</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ক্যাটাগরি</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">মূল্য</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">স্টক</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">কাঠের ধরন</th>
                <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ব্যাজ</th>
                <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginated.map((item) => (
                <tr key={item.id} className="group transition-colors hover:bg-slate-50/30">
                  <td className="whitespace-nowrap px-8 py-6">
                    <span className="text-xs font-black text-slate-300 tracking-tighter">#{item.id}</span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-900 group-hover:text-[#8B5E3C] transition-colors leading-none mb-1.5">{item.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Discount: {item.discount}%</p>
                  </td>
                  <td className="whitespace-nowrap px-8 py-6">
                    <span className="text-xs font-bold text-slate-600">{item.category}</span>
                  </td>
                  <td className="whitespace-nowrap px-8 py-6">
                    <span className="text-sm font-black text-slate-900 tracking-tight">৳{item.price.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="whitespace-nowrap px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${item.stock < 5 ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500'}`} />
                      <span className={`text-sm font-black ${item.stock < 5 ? 'text-red-600' : 'text-slate-900'}`}>{item.stock}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-8 py-6 text-xs font-bold text-slate-500">{item.woodType}</td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest ${statusClass[item.status] || statusClass['স্বাভাবিক']}`}>
                        {item.status}
                      </span>
                      {item.badge && (
                        <span className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest ${statusClass[item.badge] || statusClass['স্বাভাবিক']}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <button
                        className="h-11 w-11 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-[#8B5E3C] hover:border-[#8B5E3C]/20 hover:shadow-lg transition-all"
                        onClick={() => {
                          setEditingProduct(item);
                          setModalOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="h-11 w-11 flex items-center justify-center rounded-2xl bg-red-50 border border-red-100 text-red-400 hover:text-red-600 hover:bg-red-100 transition-all"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-6 border-t border-slate-50 bg-slate-50/20 px-10 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            মোট <span className="text-[#8B5E3C] text-xs">{filtered.length}</span>টি পণ্য পাওয়া গেছে
          </p>
          <div className="flex items-center gap-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              পূর্ববর্তী
            </button>
            <div className="flex h-10 w-20 items-center justify-center rounded-2xl bg-[#8B5E3C] text-white text-xs font-black shadow-lg shadow-[#8B5E3C]/20">
              {page} / {totalPages}
            </div>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 transition-all hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
            >
              পরবর্তী
            </button>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={modalOpen}
        initialProduct={editingProduct}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
