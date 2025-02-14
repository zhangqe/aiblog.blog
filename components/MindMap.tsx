'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export interface MindMapNode {
  id: string;
  title: string;
  description?: string;
  status?: 'completed' | 'in-progress' | 'planned';
  children?: MindMapNode[];
}

interface MindMapProps {
  data: MindMapNode;
  level?: number;
  defaultExpanded?: boolean;
}

interface NodeProps {
  node: MindMapNode;
  level: number;
  defaultExpanded?: boolean;
}

function Node({ node, level, defaultExpanded = false }: NodeProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0 ? true : defaultExpanded);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 border-blue-300';
      case 'planned':
        return 'bg-gray-100 border-gray-300';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className={`ml-${level * 4}`}>
      <div className="flex items-center gap-1 mb-1">
        {node.children && node.children.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-3 h-3 flex items-center justify-center text-xs text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}
        <div 
          className={`py-0.5 px-2 rounded text-sm border ${getStatusColor(node.status)} hover:shadow-sm transition-shadow`}
        >
          <span className="font-medium text-gray-800">{node.title}</span>
          {node.description && (
            <span className="ml-2 text-xs text-gray-500">{node.description}</span>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && node.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-4 border-l border-gray-200 pl-2 space-y-1"
          >
            {node.children.map((child) => (
              <Node 
                key={child.id} 
                node={child} 
                level={level + 1}
                defaultExpanded={defaultExpanded}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MindMap({ data, level = 0, defaultExpanded = false }: MindMapProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <Node node={data} level={level} defaultExpanded={defaultExpanded} />
    </div>
  );
} 