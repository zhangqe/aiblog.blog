'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { FaUser } from 'react-icons/fa'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-500">
            AI博客
          </Link>
          
          <div>
            {session ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/dashboard" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
                >
                  管理面板
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
                >
                  退出
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500"
              >
                <FaUser />
                <span>管理员登录</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
