'use client';

import { Layout } from '@/components/Layout';
import { AdminBlogList } from '@/components/AdminBlogList';
import { useState } from 'react';
import { BlogEditor } from '@/components/BlogEditor';
import { AdminAuth } from '@/components/AdminAuth';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/types/blog';

export default function AdminPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    router.push('/admin/login');
  };

  const handleSave = () => {
    // 刷新页面以获取最新数据
    router.refresh();
  };

  return (
    <AdminAuth>
      <Layout>
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsEditing(true);
                setEditingPost(null);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Post
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {isEditing ? (
          <BlogEditor
            post={editingPost}
            onClose={() => {
              setIsEditing(false);
              setEditingPost(null);
            }}
            onSave={handleSave}
          />
        ) : (
          <AdminBlogList
            onEditPost={(post) => {
              setEditingPost(post);
              setIsEditing(true);
            }}
          />
        )}
      </Layout>
    </AdminAuth>
  );
} 