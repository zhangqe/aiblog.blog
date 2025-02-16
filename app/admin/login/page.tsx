'use client';

import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { hashPassword } from '@/utils/crypto';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [debug, setDebug] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setDebug('');

    if (attempts >= 5) {
      setError('Too many attempts. Please try again later.');
      setIsLoading(false);
      return;
    }

    try {
      // 计算输入的用户名和密码的哈希值
      const usernameHash = hashPassword(formData.username);
      const passwordHash = hashPassword(formData.password);

      // 添加调试信息
      setDebug(`
Input Username: ${formData.username}
Username Hash: ${usernameHash}
Stored Username Hash: ${process.env.NEXT_PUBLIC_ADMIN_USERNAME_HASH}

Input Password: ${formData.password}
Password Hash: ${passwordHash}
Stored Password Hash: ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH}
      `);

      // 与存储的哈希值比较
      if (usernameHash === process.env.NEXT_PUBLIC_ADMIN_USERNAME_HASH &&
          passwordHash === process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH) {
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminLoginTime', new Date().toISOString());
        router.push('/admin');
      } else {
        setAttempts(prev => prev + 1);
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }

    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Admin Login
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || attempts >= 5}
            className={`w-full px-4 py-2 text-white rounded-md ${
              isLoading || attempts >= 5
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {attempts > 0 && (
          <p className="mt-4 text-sm text-gray-500">
            Remaining attempts: {5 - attempts}
          </p>
        )}

        {debug && (
          <pre className="mt-8 p-4 bg-gray-100 rounded-md text-xs overflow-auto">
            {debug}
          </pre>
        )}
      </div>
    </Layout>
  );
} 