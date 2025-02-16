'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AdminAuthProps {
  children: React.ReactNode;
}

export function AdminAuth({ children }: AdminAuthProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 检查登录状态
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const loginTime = localStorage.getItem('adminLoginTime');

    // 如果未登录且不在登录页面，重定向到登录页
    if (!isLoggedIn && pathname !== '/admin/login') {
      router.push('/admin/login');
      return;
    }

    // 检查登录是否过期（2小时）
    if (loginTime) {
      const loginDate = new Date(loginTime);
      const now = new Date();
      const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);

      if (hoursDiff > 2) {
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminLoginTime');
        router.push('/admin/login');
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
} 