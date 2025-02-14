'use client';

import { PageNode } from '@/types/page';
import Link from 'next/link';
import { useState } from 'react';

interface TreeNavigationProps {
  node: PageNode;
  level?: number;
}

export function TreeNavigation({ node, level = 0 }: TreeNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="ml-4">
      <div className="flex items-center gap-2">
        {node.children && node.children.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}
        <Link
          href={node.path}
          className="py-1 px-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <span className="font-medium">{node.title}</span>
          {level === 0 && (
            <span className="ml-2 text-sm text-gray-500">{node.description}</span>
          )}
        </Link>
      </div>
      {isExpanded && node.children && (
        <div className="mt-1">
          {node.children.map((child) => (
            <TreeNavigation key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
} 