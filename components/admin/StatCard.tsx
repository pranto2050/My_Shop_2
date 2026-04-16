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
    <div className="rounded-xl border border-[#2e2e2e] bg-[#1a1a1a] p-5 shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-[#a0a0a0]">{title}</p>
        <span className={`rounded-lg bg-[#242424] p-2 ${colorClass}`}>{icon}</span>
      </div>
      <h3 className="text-2xl font-semibold text-white">{value}</h3>
      {subtitle ? <p className="mt-2 text-xs text-[#a0a0a0]">{subtitle}</p> : null}
    </div>
  );
}
