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
  জনপ্রিয়: 'bg-[#8B5E3C]/25 text-[#E9C7A6] border-[#8B5E3C]/50',
  নতুন: 'bg-[#1d4ed8]/25 text-[#c7ddff] border-[#1d4ed8]/50',
  স্বাভাবিক: 'bg-[#3d3d3d]/40 text-[#d0d0d0] border-[#5a5a5a]',
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
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-[#3a3a3a] bg-[#1a1a1a]/95 p-4 shadow-[0_10px_26px_rgba(0,0,0,0.28)] md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8a8a]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="নাম বা আইডি দিয়ে সার্চ করুন"
              className="w-full rounded-lg border border-[#4b4b4b] bg-[#101010] py-2 pl-9 pr-3 text-sm text-white outline-none transition focus:border-[#8B5E3C]"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-[#4b4b4b] bg-[#101010] px-3 py-2 text-sm text-white outline-none transition focus:border-[#8B5E3C]"
          >
            <option value="সব">সব ক্যাটাগরি</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#8B5E3C] to-[#7d5436] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_18px_rgba(139,94,60,0.32)] transition hover:brightness-110"
        >
          <Plus className="h-4 w-4" />
          নতুন পণ্য যোগ করুন
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#3a3a3a] bg-[#1a1a1a]/95 shadow-[0_10px_26px_rgba(0,0,0,0.28)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-[#111111] text-[#bdbdbd]">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">পণ্যের নাম</th>
                <th className="px-4 py-3 text-left">ক্যাটাগরি</th>
                <th className="px-4 py-3 text-left">মূল্য</th>
                <th className="px-4 py-3 text-left">ছাড় %</th>
                <th className="px-4 py-3 text-left">স্টক</th>
                <th className="px-4 py-3 text-left">কাঠ</th>
                <th className="px-4 py-3 text-left">ব্যাজ</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item.id} className="border-t border-[#2e2e2e] text-[#f5f5f5] transition hover:bg-[#202020]">
                  <td className="px-4 py-3 text-[#d8b28d]">{item.id}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-[#cfcfcf]">{item.category}</td>
                  <td className="px-4 py-3">৳{item.price.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">{item.discount}%</td>
                  <td className="px-4 py-3">{item.stock}</td>
                  <td className="px-4 py-3">{item.woodType}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <span className={`rounded border px-2 py-0.5 text-xs ${statusClass[item.status] || statusClass['স্বাভাবিক']}`}>
                        {item.status}
                      </span>
                      {item.badge ? (
                        <span className={`rounded border px-2 py-0.5 text-xs ${statusClass[item.badge] || statusClass['স্বাভাবিক']}`}>
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        className="rounded-md border border-[#3f3f3f] p-2 text-[#d9d9d9] hover:bg-[#2a2a2a]"
                        onClick={() => {
                          setEditingProduct(item);
                          setModalOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-md border border-[#5a2b2b] p-2 text-[#ffc7c7] hover:bg-[#3a1f1f]"
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

        <div className="flex items-center justify-between border-t border-[#2e2e2e] bg-[#141414] p-3 text-sm text-[#bfbfbf]">
          <p>মোট {filtered.length}টি পণ্য</p>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="rounded-md border border-[#4a4a4a] px-3 py-1 transition hover:bg-[#222] disabled:opacity-40"
            >
              পূর্ববর্তী
            </button>
            <span className="rounded-md bg-[#1f1f1f] px-2 py-1 text-xs">{page} / {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="rounded-md border border-[#4a4a4a] px-3 py-1 transition hover:bg-[#222] disabled:opacity-40"
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
