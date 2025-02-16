'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            AIBlog
          </Link>
          <div className="flex space-x-1">
            <Link 
              href="/blog" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/blog'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Blog
            </Link>
            <Link 
              href="/versions" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/versions'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Timeline
            </Link>
            <Link 
              href="/tech" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/tech'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Insights
            </Link>
            <Link 
              href="/admin" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/admin'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Admin
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isHomePage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Home
            </Link>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8"
        >
          {children}
        </motion.div>
      </main>

      <footer className="mt-auto border-t border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            Version {process.env.NEXT_PUBLIC_VERSION || '0.0.1'} - 
            Last updated: {new Date(process.env.NEXT_PUBLIC_LAST_UPDATED || '').toLocaleString('en-US')}
          </p>
        </div>
      </footer>
    </div>
  );
} 