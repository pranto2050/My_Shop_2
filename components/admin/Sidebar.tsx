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
        className="fixed left-4 top-4 z-40 rounded-md border border-[#3b3b3b] bg-[#1a1a1a] p-2 text-[#C49A6C] lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-65 transform border-r border-[#333] bg-[#242424] px-4 py-5 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="h-10 w-10 rounded-lg bg-linear-to-br from-[#C49A6C] to-[#8B5E3C] p-2 text-lg">🪵</div>
          <div>
            <p className="text-lg font-semibold text-white">মা ফার্নিচার</p>
            <p className="text-xs text-[#a0a0a0]">Admin Panel</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-[#8B5E3C] text-white shadow-[0_8px_16px_rgba(139,94,60,0.35)]'
                    : 'text-[#d7d7d7] hover:bg-[#2d2d2d]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-4 right-4">
          <button
            onClick={() => router.push('/')}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#4a2f24] bg-[#2b1d18] px-3 py-2 text-sm text-[#ffdfcc] hover:bg-[#3a241d]"
          >
            <LogOut className="h-4 w-4" />
            লগআউট
          </button>
        </div>
      </aside>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
    </>
  );
}
