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
        return 'bg-green-50 text-green-700 border-green-200 shadow-green-100';
      case 'in-progress':
        return 'bg-blue-50 text-blue-700 border-blue-200 shadow-blue-100';
      case 'planned':
        return 'bg-gray-50 text-gray-700 border-gray-200 shadow-gray-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 shadow-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'foundation':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'feature':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'enhancement':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {version.title}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(version.status)}`}>
                {version.status}
              </span>
              <span className={`px-3 py-1 text-xs rounded-full border ${getCategoryColor(version.category)}`}>
                {version.category}
              </span>
              <span className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded-full border border-gray-200">
                v{version.version}
              </span>
            </div>
          </div>
          <span className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full border border-blue-100 whitespace-nowrap">
            {formattedDate}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{version.description}</p>
        
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900">New Features:</h4>
          <ul className="space-y-2">
            {version.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.1 }}
                className="flex items-center text-gray-600 text-sm"
              >
                <svg
                  className="w-4 h-4 mr-2 text-green-500 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{feature}</span>
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
                  className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  {page === '/' ? 'Home' : page.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {version.screenshot && (
          <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={version.screenshot}
              alt={`Version ${version.version} screenshot`}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
} 