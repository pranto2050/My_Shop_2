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
        className="fixed left-4 top-4 z-40 rounded-md border border-[#4a4a4a] bg-[#151515]/90 p-2 text-[#C49A6C] backdrop-blur lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-65 transform border-r border-[#3a3a3a] bg-linear-to-b from-[#262626] to-[#1c1c1c] px-4 py-5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 rounded-xl border border-[#3a3a3a] bg-[#1b1b1b]/70 px-3 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-linear-to-br from-[#C49A6C] to-[#8B5E3C] p-2 text-lg shadow-[0_8px_18px_rgba(139,94,60,0.45)]">🪵</div>
            <div>
              <p className="text-lg font-semibold text-white">মা ফার্নিচার</p>
              <p className="text-xs text-[#b9b9b9]">Admin Panel</p>
            </div>
          </div>
        </div>

        <p className="mb-2 px-2 text-[11px] uppercase tracking-[0.18em] text-[#8f8f8f]">Navigation</p>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive
                    ? 'bg-linear-to-r from-[#8B5E3C] to-[#7a5133] text-white shadow-[0_10px_20px_rgba(139,94,60,0.35)]'
                    : 'text-[#e1e1e1] hover:bg-[#2a2a2a]'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-[#b6b6b6] group-hover:text-[#e8d0b7]'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-4 right-4">
          <button
            onClick={() => router.push('/')}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#5a3b2c] bg-[#2e201a] px-3 py-2.5 text-sm text-[#ffdfcc] transition hover:bg-[#3a241d]"
          >
            <LogOut className="h-4 w-4" />
            লগআউট
          </button>
        </div>
      </aside>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-20 bg-black/55 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
    </>
  );
}
