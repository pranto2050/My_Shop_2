'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] text-[#a0a0a0]">
      Admin লোড হচ্ছে...
    </div>
  );
}
