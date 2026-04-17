'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Boxes, Layers3, PackageSearch, Wallet } from 'lucide-react';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import StatCard from '../../../../components/admin/StatCard';
import {
  CATEGORIES,
  Product,
  getActivityHistory,
  getLowStockThreshold,
  getProducts,
  initializeAdminData,
  saveLowStockThreshold,
} from '../../../../lib/adminData';

const PIE_COLORS = ['#8B5E3C', '#C49A6C', '#A86F46', '#6E4C35', '#A57B5B', '#BA8758', '#D6A36F', '#8C6A4D', '#B18564', '#9A6F4E'];

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [threshold, setThreshold] = useState(5);

  useEffect(() => {
    initializeAdminData();

    const sync = () => {
      setProducts(getProducts());
      setThreshold(getLowStockThreshold());
    };

    sync();
    window.addEventListener('ma_furniture_products_updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('ma_furniture_products_updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const totalStockValue = useMemo(
    () => products.reduce((sum, product) => sum + product.price * product.stock, 0),
    [products],
  );

  const lowStockItems = useMemo(
    () => products.filter((product) => product.stock < threshold),
    [products, threshold],
  );

  const productsByCategory = useMemo(() => {
    return CATEGORIES.map((category) => ({
      category,
      count: products.filter((product) => product.category === category).length,
      stock: products
        .filter((product) => product.category === category)
        .reduce((sum, product) => sum + product.stock, 0),
    }));
  }, [products]);

  const recentActivity = useMemo(() => getActivityHistory().slice(0, 5), [products]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[#3a3a3a] bg-[#161616]/90 p-4 shadow-[0_10px_26px_rgba(0,0,0,0.28)]">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#9f9f9f]">Overview</p>
        <h2 className="mt-1 text-xl font-semibold text-white">স্বাগতম, অ্যাডমিন</h2>
        <p className="mt-1 text-sm text-[#a9a9a9]">আজকের স্টক এবং ক্যাটাগরি পারফরম্যান্স দ্রুত দেখুন।</p>
      </div>

      {lowStockItems.length > 0 ? (
        <div className="flex items-center gap-2 rounded-xl border border-[#6b2b2b] bg-linear-to-r from-[#3b1e1e] to-[#281616] px-4 py-3 text-[#ffd6d6] shadow-[0_10px_22px_rgba(0,0,0,0.25)]">
          <AlertTriangle className="h-5 w-5" />
          <p>{lowStockItems.length}টি পণ্য লো-স্টক অবস্থায় আছে</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="মোট পণ্য" value={String(products.length)} icon={<PackageSearch className="h-5 w-5" />} />
        <StatCard title="মোট ক্যাটাগরি" value={String(CATEGORIES.length)} icon={<Layers3 className="h-5 w-5" />} />
        <StatCard title="লো স্টক আইটেম" value={String(lowStockItems.length)} icon={<Boxes className="h-5 w-5" />} colorClass="text-[#ef4444]" />
        <StatCard title="মোট স্টক মূল্য" value={`৳${totalStockValue.toLocaleString('en-IN')}`} icon={<Wallet className="h-5 w-5" />} colorClass="text-[#22c55e]" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-xl border border-[#343434] bg-[#1a1a1a]/95 p-4 shadow-[0_10px_26px_rgba(0,0,0,0.28)]">
          <h2 className="mb-4 text-lg font-semibold">ক্যাটাগরি অনুযায়ী পণ্য</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={productsByCategory} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={110}>
                  {productsByCategory.map((entry, index) => (
                    <Cell key={`pie-${entry.category}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} টি`, 'পণ্য']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-[#343434] bg-[#1a1a1a]/95 p-4 shadow-[0_10px_26px_rgba(0,0,0,0.28)]">
          <h2 className="mb-4 text-lg font-semibold">ক্যাটাগরি অনুযায়ী স্টক</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productsByCategory}>
                <XAxis dataKey="category" tick={{ fill: '#a0a0a0', fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={70} />
                <YAxis tick={{ fill: '#a0a0a0', fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${value} টি`, 'স্টক']} />
                <Bar dataKey="stock" fill="#C49A6C" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-xl border border-[#5f2f2f] bg-[#1b1b1b]/95 p-4 shadow-[0_10px_26px_rgba(0,0,0,0.28)]">
          <h3 className="mb-3 text-base font-semibold text-[#ffcece]">লো স্টক অ্যালার্ট তালিকা</h3>
          <div className="space-y-2">
            {lowStockItems.length === 0 ? (
              <p className="text-sm text-[#a0a0a0]">লো স্টক নেই।</p>
            ) : (
              lowStockItems.map((product) => (
                <div key={product.id} className="flex items-center justify-between rounded-lg border border-[#4a3030] bg-[#211414] px-3 py-2">
                  <div>
                    <p className="text-sm text-white">{product.name}</p>
                    <p className="text-xs text-[#c9a5a5]">{product.category}</p>
                  </div>
                  <span className="rounded bg-[#ef4444]/20 px-2 py-1 text-xs text-[#ffc9c9]">{product.stock} ইউনিট</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-[#343434] bg-[#1a1a1a]/95 p-4 shadow-[0_10px_26px_rgba(0,0,0,0.28)]">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold">Recent Activity</h3>
            <label className="flex items-center gap-2 text-xs text-[#a0a0a0]">
              Threshold
              <input
                type="number"
                min={1}
                value={threshold}
                onChange={(e) => {
                  const next = Math.max(1, Number(e.target.value || 5));
                  setThreshold(next);
                  saveLowStockThreshold(next);
                }}
                className="w-16 rounded-md border border-[#4a4a4a] bg-[#101010] px-2 py-1 text-white"
              />
            </label>
          </div>
          <div className="space-y-2">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-[#a0a0a0]">কোনো আপডেট নেই।</p>
            ) : (
              recentActivity.map((entry) => (
                <div key={entry.id} className="rounded-lg border border-[#3a3a3a] bg-[#111] px-3 py-2">
                  <p className="text-sm text-white">{entry.action}</p>
                  <p className="text-xs text-[#a0a0a0]">{entry.details}</p>
                  <p className="mt-1 text-[11px] text-[#777]">{new Date(entry.timestamp).toLocaleString('bn-BD')}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
