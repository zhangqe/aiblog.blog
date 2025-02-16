'use client';

import { BlogPost } from '@/types/blog';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AdminBlogListProps {
  onEditPost: (post: BlogPost) => void;
}

export function AdminBlogList({ onEditPost }: AdminBlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

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
      console.log('Admin: Fetched posts:', data);
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

  const handleDelete = async (postId: string) => {
    if (deleteConfirm === postId) {
      try {
        const response = await fetch(`/api/blog/delete?id=${postId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Failed to delete post');
        }

        // 刷新文章列表
        await fetchPosts();
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Delete error:', error);
      }
    } else {
      setDeleteConfirm(postId);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-500">加载文章中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-start"
        >
          <div>
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">{post.description}</p>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEditPost(post)}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              编辑
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              className={`px-3 py-1 rounded-md transition-colors ${
                deleteConfirm === post.id
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              {deleteConfirm === post.id ? '确认删除' : '删除'}
            </button>
          </div>
        </motion.div>
      ))}
      
      {posts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          暂无博客文章
        </div>
      )}
    </div>
  );
} 