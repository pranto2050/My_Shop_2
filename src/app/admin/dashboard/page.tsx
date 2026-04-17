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
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 shadow-sm">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-slate-50/50 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
                System Active
              </span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Real-time Sync Enabled</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-4">স্বাগতম, অ্যাডমিন 👋</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              আপনার ফার্নিচার শোরুমের ইনভেন্টরি এবং পারফরম্যান্স রিয়েল-টাইমে মনিটর করুন। আজকের ড্যাশবোর্ড আপডেট এখানে।
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all shadow-sm">
              View Reports
            </button>
            <button className="px-8 py-4 rounded-2xl bg-[#8B5E3C] text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-[#8B5E3C]/20 hover:scale-105 active:scale-95 transition-all">
              Add New Product
            </button>
          </div>
        </div>
      </div>

      {lowStockItems.length > 0 && (
        <div className="group relative overflow-hidden rounded-[2rem] border border-red-100 bg-red-50/50 p-6 text-red-600 shadow-sm backdrop-blur-sm transition-all hover:bg-red-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-red-500 shadow-sm border border-red-100">
                <AlertTriangle className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <p className="font-black tracking-tight text-lg leading-none">{lowStockItems.length}টি পণ্য লো-স্টক অবস্থায় আছে</p>
                <p className="text-xs text-red-400 font-bold uppercase tracking-widest mt-1">Stock replenishment recommended</p>
              </div>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest bg-white text-red-500 px-6 py-3 rounded-xl shadow-sm hover:bg-red-500 hover:text-white transition-all border border-red-100">
              Fix Now
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="মোট পণ্য" value={String(products.length)} icon={<PackageSearch className="h-7 w-7" />} />
        <StatCard title="মোট ক্যাটাগরি" value={String(CATEGORIES.length)} icon={<Layers3 className="h-7 w-7" />} />
        <StatCard title="লো স্টক আইটেম" value={String(lowStockItems.length)} icon={<Boxes className="h-7 w-7" />} colorClass="text-red-500" subtitle={`${((lowStockItems.length / products.length) * 100).toFixed(0)}% Low Stock`} />
        <StatCard title="মোট স্টক মূল্য" value={`৳${totalStockValue.toLocaleString('en-IN')}`} icon={<Wallet className="h-7 w-7" />} colorClass="text-emerald-500" subtitle="Estimated Value" />
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <div className="rounded-[3rem] bg-white border border-slate-100 p-10 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">ক্যাটাগরি অনুযায়ী পণ্য</h2>
            <div className="h-2 w-2 rounded-full bg-[#8B5E3C] shadow-[0_0_10px_rgba(139,94,60,0.5)]" />
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={productsByCategory} 
                  dataKey="count" 
                  nameKey="category" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={140}
                  innerRadius={100}
                  paddingAngle={8}
                >
                  {productsByCategory.map((entry, index) => (
                    <Cell key={`pie-${entry.category}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#fff" strokeWidth={4} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '24px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', color: '#1e293b' }}
                  itemStyle={{ fontWeight: '800', fontSize: '12px' }}
                  formatter={(value) => [`${value} টি`, 'পণ্য']} 
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[3rem] bg-white border border-slate-100 p-10 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">ক্যাটাগরি অনুযায়ী স্টক</h2>
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-slate-100" />
              <div className="h-2 w-2 rounded-full bg-slate-200" />
              <div className="h-2 w-2 rounded-full bg-[#8B5E3C]" />
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productsByCategory}>
                <XAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} interval={0} angle={-15} textAnchor="end" height={70} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc', radius: 16 }}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '24px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', color: '#1e293b' }}
                  formatter={(value) => [`${value} টি`, 'স্টক']} 
                />
                <Bar dataKey="stock" fill="#8B5E3C" radius={[12, 12, 12, 12]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <div className="rounded-[3rem] bg-white border border-slate-100 p-10 shadow-sm">
          <h3 className="mb-8 text-xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            লো স্টক অ্যালার্ট
          </h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {lowStockItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                <Boxes className="h-16 w-16 opacity-20 mb-4" />
                <p className="text-sm font-black uppercase tracking-widest">সব পণ্য পর্যাপ্ত আছে</p>
              </div>
            ) : (
              lowStockItems.map((product) => (
                <div key={product.id} className="group flex items-center justify-between rounded-[2rem] border border-slate-50 bg-slate-50/50 p-6 transition-all hover:bg-white hover:border-red-100 hover:shadow-lg hover:shadow-red-500/5">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-red-500 shadow-sm group-hover:scale-110 transition-transform border border-red-500/5">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-base font-black text-slate-900 leading-none mb-1">{product.name}</p>
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-full bg-red-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 border border-red-100 shadow-sm">
                      {product.stock} ইউনিট
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[3rem] bg-white border border-slate-100 p-10 shadow-sm">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">সাম্প্রতিক অ্যাক্টিভিটি</h3>
            <div className="flex items-center gap-4 bg-slate-50 px-5 py-2.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">অ্যালার্ট লিমিট</span>
              <input
                type="number"
                min={1}
                value={threshold}
                onChange={(e) => {
                  const next = Math.max(1, Number(e.target.value || 5));
                  setThreshold(next);
                  saveLowStockThreshold(next);
                }}
                className="w-14 bg-transparent text-xs font-black text-[#8B5E3C] focus:outline-none"
              />
            </div>
          </div>
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {recentActivity.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                <PackageSearch className="h-16 w-16 opacity-20 mb-4" />
                <p className="text-sm font-black uppercase tracking-widest">কোনো আপডেট নেই</p>
              </div>
            ) : (
              recentActivity.map((entry) => (
                <div key={entry.id} className="relative pl-10 pb-8 border-l-2 border-slate-50 last:pb-0 last:border-0">
                  <div className="absolute left-[-6px] top-0 h-3 w-3 rounded-full bg-[#8B5E3C] border-2 border-white shadow-sm" />
                  <div className="rounded-[2rem] border border-slate-50 bg-slate-50/50 p-6 transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm">
                    <p className="text-sm font-black text-slate-900 leading-tight mb-2">{entry.action}</p>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed">{entry.details}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
                        {new Date(entry.timestamp).toLocaleString('bn-BD')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
