'use client';

import { Bell, UserCircle2 } from 'lucide-react';

interface HeaderProps {
  title: string;
  lowStockCount: number;
}

export default function Header({ title, lowStockCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 px-6 py-5 backdrop-blur-xl md:px-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Overview</span>
            <span className="h-1 w-1 rounded-full bg-slate-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B5E3C]">Dashboard</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Low Stock Badge */}
          <div className="hidden sm:flex items-center gap-2.5 rounded-full border border-red-100 bg-red-50 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 shadow-sm">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </div>
            লো স্টক: {lowStockCount}
          </div>

          <div className="h-8 w-px bg-slate-100 hidden sm:block" />

          {/* User Profile */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="text-right hidden md:block">
              <p className="text-xs font-black text-slate-900 leading-none">Admin User</p>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">Administrator</p>
            </div>
            <div className="relative">
              <div className="h-11 w-11 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 transition-all group-hover:border-[#8B5E3C] group-hover:bg-[#8B5E3C]/5">
                <UserCircle2 className="h-6 w-6 text-slate-400 group-hover:text-[#8B5E3C] transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
