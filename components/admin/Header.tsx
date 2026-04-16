'use client';

import { Bell, UserCircle2 } from 'lucide-react';

interface HeaderProps {
  title: string;
  lowStockCount: number;
}

export default function Header({ title, lowStockCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#2c2c2c] bg-[#0f0f0f]/95 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white md:text-2xl">{title}</h1>
          <p className="text-sm text-[#a0a0a0]">মা ফার্নিচার অ্যাডমিন প্যানেল</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-[#3b2420] bg-[#2a1c19] px-3 py-2 text-sm text-[#ffd7d2]">
            <Bell className="h-4 w-4" />
            <span>লো স্টক: {lowStockCount}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#2c2c2c] bg-[#1a1a1a] px-3 py-2">
            <UserCircle2 className="h-6 w-6 text-[#C49A6C]" />
            <div>
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-[#a0a0a0]">মা ফার্নিচার</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
