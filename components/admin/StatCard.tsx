'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  colorClass?: string;
}

export default function StatCard({ title, value, subtitle, icon, colorClass = 'text-[#8B5E3C]' }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 shadow-inner transition-transform duration-500 group-hover:rotate-12 ${colorClass}`}>
            {icon}
          </div>
          {subtitle && (
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600 border border-emerald-100">
              {subtitle}
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</p>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 h-1.5 w-full bg-slate-50 group-hover:bg-[#8B5E3C]/10 transition-colors" />
    </div>
  );
}
