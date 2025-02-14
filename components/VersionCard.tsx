'use client';

import { Version } from '@/types/version';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface VersionCardProps {
  version: Version;
  index: number;
}

export function VersionCard({ version, index }: VersionCardProps) {
  // 格式化日期
  const formattedDate = new Date(version.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'foundation':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'feature':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'enhancement':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{version.title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-500">Version {version.version}</span>
            <span className={`px-2 py-0.5 text-xs rounded-full border ${getStatusColor(version.status)}`}>
              {version.status}
            </span>
            <span className={`px-2 py-0.5 text-xs rounded-full border ${getCategoryColor(version.category)}`}>
              {version.category}
            </span>
          </div>
        </div>
        <span className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full whitespace-nowrap">
          {formattedDate}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{version.description}</p>
      
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-900">New Features:</h4>
        <ul className="space-y-2">
          {version.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + i * 0.1 }}
              className="flex items-center text-gray-600"
            >
              <svg
                className="w-4 h-4 mr-2 text-green-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      {version.relatedPages && version.relatedPages.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Related Pages:</h4>
          <div className="flex flex-wrap gap-2">
            {version.relatedPages.map((page) => (
              <Link
                key={page}
                href={page}
                className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              >
                {page === '/' ? 'Home' : page.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {version.screenshot && (
        <div className="mt-4 rounded-md overflow-hidden">
          <img
            src={version.screenshot}
            alt={`Version ${version.version} screenshot`}
            className="w-full h-auto"
          />
        </div>
      )}
    </motion.div>
  );
} 