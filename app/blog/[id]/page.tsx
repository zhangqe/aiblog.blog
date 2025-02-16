'use client';

import { BlogPost } from '@/types/blog';
import MarkdownContent from '@/app/components/MarkdownContent';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">加载文章中...</p>
        </div>
      </Layout>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-600 space-x-4 mb-4">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </Layout>
  );
} 