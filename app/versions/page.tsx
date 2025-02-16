'use client';

import { Layout } from '@/components/Layout';
import { VersionCard } from '@/components/VersionCard';
import { MindMap } from '@/components/MindMap';
import { Version, versionHistory } from '@/types/version';
import { generateVersionMindMap } from '@/data/versionMindMap';
import Link from 'next/link';
import { useState, useMemo } from 'react';

type GroupedVersions = [string, Version[]][];

export default function VersionsPage() {
  const [filter, setFilter] = useState<'all' | 'category' | 'status'>('all');
  const versionMindMap = generateVersionMindMap();

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

      Object.values(groups).forEach(versions => {
        versions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });

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

      Object.values(groups).forEach(versions => {
        versions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      });

      return Object.entries(groups).sort((a, b) => {
        const order = ['completed', 'in-progress', 'planned'];
        return order.indexOf(a[0]) - order.indexOf(b[0]);
      });
    }

    return [['all', [...versionHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )]];
  }, [filter]);

  const formatGroupTitle = (group: string) => {
    return group.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Development Timeline
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track our AI-guided development journey
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Development Progress Overview</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
              <MindMap data={versionMindMap} />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Version History
              </h2>
              <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === 'all'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('category')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === 'category'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  By Category
                </button>
                <button
                  onClick={() => setFilter('status')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === 'status'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
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
                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
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