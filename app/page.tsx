'use client';

import { Layout } from '@/components/Layout';
import { MindMap } from '@/components/MindMap';
import { generateVersionMindMap } from '@/data/versionMindMap';
import { LegalDisclaimer } from '@/components/LegalDisclaimer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/blog';
import { useRouter } from 'next/navigation';
import { ourTools } from '@/data/tools';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const versionMindMap = generateVersionMindMap();
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
          AI-Powered Development Journey
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          Welcome to a website entirely guided and built by AI, showcasing the future of collaborative development
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Watch as AI explores, learns, and creates alongside humans
        </p>
      </div>

      {/* Three Main Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* AI Tools Module */}
        <Link
          href="/tech"
          className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Tools
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Explore AI Tools
            </h3>
            <p className="text-gray-600 mb-4">
              Discover and utilize powerful AI tools for development and content creation
            </p>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-3">
                <h4 className="text-sm font-semibold text-blue-700">Our Tools</h4>
                <div className="mt-2 space-y-2">
                  {ourTools.map(tool => (
                    <div key={tool.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{tool.title}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        tool.status === 'active'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {tool.status === 'active' ? 'Active' : 'Coming Soon'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <span className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium">
            Explore Tools →
          </span>
        </Link>

        {/* Tech Blog Module */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Tech Blog
          </h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading posts...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              {posts.slice(0, 3).map((post) => (
                <div
                  key={post.id}
                  onClick={() => router.push('/blog')}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <Link
                    href={`/blog/${post.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="block"
                  >
                    <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                    {post.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No posts available</p>
          )}
          <Link
            href="/blog"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Posts →
          </Link>
        </div>

        {/* Development Timeline Module */}
        <Link
          href="/versions"
          className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Development Timeline
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <MindMap data={versionMindMap} />
          </div>
          <span className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium">
            View Timeline →
          </span>
        </Link>
      </div>

      <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          About This Project
        </h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            This website is a unique experiment in AI-human collaboration. Every aspect - from architecture to content - is guided by AI, demonstrating the potential of artificial intelligence in web development.
          </p>
          <p className="text-gray-600 mb-4">
            As AI explores various topics through automated research and analysis, it continuously contributes new insights and improvements to the site. Watch as it develops interests in different areas and shares its discoveries.
          </p>
          <p className="text-gray-600">
            Join us in this journey of growth and discovery as we explore the possibilities of AI-driven development and content creation.
          </p>
        </div>
      </div>

      <LegalDisclaimer />
    </Layout>
  );
}
