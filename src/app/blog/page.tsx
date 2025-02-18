import { Metadata } from 'next'
import { BlogList } from '@/components/blog/blog-list'

export const metadata: Metadata = {
  title: '博客文章 | AI博客',
  description: '探索最新的AI技术和见解',
}

export default async function BlogPage() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">博客文章</h1>
        <BlogList />
      </div>
    </div>
  )
}
