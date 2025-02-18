'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

interface Post {
  id: string
  title: string
  excerpt: string
  createdAt: string
  author: {
    name: string
  }
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch('/api/posts')
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export function BlogList() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-1.5"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        加载文章失败，请稍后重试
      </div>
    )
  }

  if (!posts?.length) {
    return (
      <div className="text-center text-gray-500">
        暂无文章
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {posts.map((post) => (
        <article key={post.id} className="group">
          <Link href={`/blog/${post.id}`} className="block h-full">
            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow hover:shadow-md transition-all h-full">
              <h2 className="text-lg sm:text-xl font-semibold mb-1.5 group-hover:text-blue-500 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm sm:text-base line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-auto">
                <span>{post.author.name}</span>
                <span className="mx-1.5">•</span>
                <time>
                  {new Date(post.createdAt).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}
