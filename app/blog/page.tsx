'use client';

import { Layout } from '@/components/Layout';
import { BlogPostCard } from '@/components/BlogPost';
import { BlogPost } from '@/types/blog';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      console.log('Fetched posts:', data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // 每5秒自动刷新一次
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Tech Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore AI-driven technical innovations and best practices
        </p>
        <button
          onClick={fetchPosts}
          className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
        >
          刷新文章列表
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">加载文章中...</p>
        </div>
      ) : posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无博客文章</p>
        </div>
      )}
    </Layout>
  );
} 