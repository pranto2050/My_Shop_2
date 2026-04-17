'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, LogOut, Menu, Package, Warehouse, X } from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

const navItems = [
  { href: '/admin/dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
  { href: '/admin/products', label: 'পণ্য ব্যবস্থাপনা', icon: Package },
  { href: '/admin/stock', label: 'স্টক ব্যবস্থাপনা', icon: Warehouse },
];

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <button
        className="fixed left-6 top-6 z-50 rounded-2xl bg-white p-3 text-slate-600 shadow-xl border border-slate-100 lg:hidden hover:scale-110 active:scale-95 transition-all"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200 bg-white px-5 py-8 transition-all duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo */}
        <div className="mb-12 px-2">
          <div className="flex items-center gap-3.5 group cursor-default">
            <div className="relative h-12 w-12 rounded-2xl bg-[#8B5E3C] flex items-center justify-center text-2xl shadow-lg shadow-[#8B5E3C]/20">
              🪵
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900 leading-none">মা ফার্নিচার</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin Panel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-2">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-4">Dashboard</p>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#8B5E3C] text-white shadow-lg shadow-[#8B5E3C]/20'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                  }`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Section */}
        <div className="absolute bottom-8 left-5 right-5">
          <div className="mb-6 rounded-[2rem] bg-slate-50 p-6 border border-slate-100">
            <p className="text-xs font-bold text-slate-900 mb-1">সাপোর্ট প্রয়োজন?</p>
            <p className="text-[10px] text-slate-500 leading-relaxed mb-4">আমাদের সাথে যোগাযোগ করুন যেকোনো সমস্যার জন্য।</p>
            <button className="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
              Help Center
            </button>
          </div>
          <button
            onClick={() => router.push('/')}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-50 border border-red-100 px-4 py-4 text-sm font-black text-red-500 transition-all hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20"
          >
            <LogOut className="h-4 w-4" />
            লগআউট
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
