'use client';

import { Layout } from '@/components/Layout';
import { VersionCard } from '@/components/VersionCard';
import { MindMap } from '@/components/MindMap';
import { Version, versionHistory } from '@/types/version';
import { timelineMindMap } from '@/data/mindMaps';
import Link from 'next/link';
import { useState, useMemo } from 'react';

type GroupedVersions = [string, Version[]][];

export default function VersionsPage() {
  const [filter, setFilter] = useState<'all' | 'category' | 'status'>('all');

  const groupedVersions = useMemo<GroupedVersions>(() => {
    if (filter === 'category') {
      const groups = versionHistory.reduce((acc, version) => {
        const category = version.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(version);
        return acc;
      }, {} as Record<string, Version[]>);

      return Object.entries(groups).sort((a, b) => {
        const order = ['foundation', 'feature', 'enhancement'];
        return order.indexOf(a[0]) - order.indexOf(b[0]);
      });
    }

    if (filter === 'status') {
      const groups = versionHistory.reduce((acc, version) => {
        const status = version.status;
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(version);
        return acc;
      }, {} as Record<string, Version[]>);

      return Object.entries(groups).sort((a, b) => {
        const order = ['completed', 'in-progress', 'planned'];
        return order.indexOf(a[0]) - order.indexOf(b[0]);
      });
    }

    return [['all', versionHistory]];
  }, [filter]);

  const formatGroupTitle = (group: string) => {
    return group.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Development Timeline</h1>
            <p className="text-xl text-gray-600">
              Track our AI-guided development journey
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Development Progress Overview</h2>
            <MindMap data={timelineMindMap} />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Version History</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('category')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === 'category'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  By Category
                </button>
                <button
                  onClick={() => setFilter('status')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === 'status'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  By Status
                </button>
              </div>
            </div>
          </div>

          {groupedVersions.map(([group, versions]) => (
            <div key={group} className="mb-12">
              {filter !== 'all' && (
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {formatGroupTitle(group)}
                </h3>
              )}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {versions.map((version: Version, index: number) => (
                  <VersionCard
                    key={version.id}
                    version={version}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
} 