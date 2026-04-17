'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  colorClass?: string;
}

export default function StatCard({ title, value, subtitle, icon, colorClass = 'text-[#C49A6C]' }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#343434] bg-[#1a1a1a]/95 p-5 shadow-[0_10px_26px_rgba(0,0,0,0.32)] transition hover:-translate-y-0.5 hover:border-[#5a4638]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#8B5E3C] via-[#C49A6C] to-transparent opacity-80" />
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[#b6b6b6]">{title}</p>
        <span className={`rounded-lg border border-[#3a3a3a] bg-[#242424] p-2 shadow-[0_8px_14px_rgba(0,0,0,0.2)] ${colorClass}`}>{icon}</span>
      </div>
      <h3 className="text-2xl font-semibold text-white md:text-[28px]">{value}</h3>
      {subtitle ? <p className="mt-2 text-xs text-[#a5a5a5]">{subtitle}</p> : null}
    </div>
  );
}
