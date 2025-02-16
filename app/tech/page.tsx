'use client';

import { Layout } from '@/components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Tool } from '@/types/tool';
import { ourTools, recommendedTools } from '@/data/tools';

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{tool.title}</h3>
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            tool.status === 'active'
              ? 'bg-green-50 text-green-600'
              : 'bg-gray-50 text-gray-600'
          }`}
        >
          {tool.status === 'active' ? 'Active' : 'Coming Soon'}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{tool.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={tool.link}
        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          tool.status === 'active'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
        onClick={(e) => tool.status !== 'active' && e.preventDefault()}
      >
        {tool.status === 'active' ? (
          <>
            访问工具
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </>
        ) : (
          '即将推出'
        )}
      </Link>
    </motion.div>
  );
}

export default function TechPage() {
  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AI Tools Hub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          探索我们的 AI 工具集合，以及推荐的优质 AI 工具
        </p>
      </div>

      <div className="space-y-12">
        {/* 我们的工具 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Our Tools
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ourTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* 推荐工具 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Recommended Tools
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
} 