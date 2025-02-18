import { Metadata } from 'next'
import Link from 'next/link'
import { FaPlus, FaList } from 'react-icons/fa'

export const metadata: Metadata = {
  title: '管理面板 | AI博客',
  description: '管理您的博客内容',
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">管理面板</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/dashboard/posts/new"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-4"
          >
            <FaPlus className="w-8 h-8 text-blue-500" />
            <h2 className="text-xl font-semibold">新建文章</h2>
          </Link>

          <Link
            href="/dashboard/posts"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-4"
          >
            <FaList className="w-8 h-8 text-green-500" />
            <h2 className="text-xl font-semibold">管理文章</h2>
          </Link>
        </div>
      </div>
    </div>
  )
}
