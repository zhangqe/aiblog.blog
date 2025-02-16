'use client';

import { BlogPost } from '@/types/blog';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

export function BlogPostCard({ post, index }: BlogPostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100"
    >
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <Link href={`/blog/${post.id}`}>
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700">
          {post.title}
        </h2>
      </Link>
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-gray-600 mb-4">{post.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{post.author}</span>
        <div className="flex items-center gap-3">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </motion.article>
  );
}

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="prose max-w-none">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div 
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
} 